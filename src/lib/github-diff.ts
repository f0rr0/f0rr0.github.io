import type { GitHubFileChangeEvidence } from "@/lib/github-change-evidence";

export const githubFilePatchIsComplete = (file: GitHubFileChangeEvidence) =>
  file.patch !== null &&
  /^@@ /mu.test(file.patch) &&
  (file.patch.match(/^\+/gmu)?.length ?? 0) === file.additions &&
  (file.patch.match(/^-/gmu)?.length ?? 0) === file.deletions;

// Git quotes unusual paths with C escapes, including octal UTF-8 bytes.
const diffPath = (value: string) => {
  if (!value.startsWith('"')) {
    return value;
  }
  const bytes: number[] = [];
  const body = value.slice(1, -1);
  const escapes: Record<string, string> = {
    a: "\u0007",
    b: "\b",
    t: "\t",
    n: "\n",
    v: "\v",
    f: "\f",
    r: "\r",
    '"': '"',
    "\\": "\\",
  };
  for (let index = 0; index < body.length; index += 1) {
    if (body[index] === "\\") {
      const octal = /^[0-7]{3}/u.exec(body.slice(index + 1));
      if (octal !== null) {
        bytes.push(Number.parseInt(octal[0], 8));
        index += 3;
        continue;
      }
      index += 1;
      bytes.push(...Buffer.from(escapes[body[index] ?? ""] ?? ""));
    } else {
      const character = String.fromCodePoint(body.codePointAt(index) ?? 0);
      bytes.push(...Buffer.from(character));
      index += character.length - 1;
    }
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(
    new Uint8Array(bytes)
  );
};

/** Recover JSON-omitted patches only when paths and line counts match. */
export const recoverGitHubDiffPatches = (
  files: readonly GitHubFileChangeEvidence[],
  diff: string
): readonly GitHubFileChangeEvidence[] | null => {
  const patches = new Map<string, { oldPath: string; patch: string }>();
  for (const section of diff.split(/^diff --git /mu).slice(1)) {
    const oldHeader = /^--- (.+)$/mu.exec(section)?.[1];
    const newHeader = /^\+\+\+ (.+)$/mu.exec(section)?.[1];
    const hunk = /^@@ /mu.exec(section);
    if (oldHeader === undefined || newHeader === undefined || hunk === null) {
      continue;
    }
    const oldPath = diffPath(oldHeader);
    const newPath = diffPath(newHeader);
    const filename = (newPath === "/dev/null" ? oldPath : newPath).slice(2);
    if (patches.has(filename)) {
      return null;
    }
    patches.set(filename, {
      oldPath,
      patch: section.slice(hunk.index).replace(/\n$/u, ""),
    });
  }
  const recovered: GitHubFileChangeEvidence[] = [];
  for (const file of files) {
    if (
      githubFilePatchIsComplete(file) ||
      file.additions + file.deletions === 0
    ) {
      recovered.push(file);
      continue;
    }
    const candidate = patches.get(file.filename);
    if (
      candidate === undefined ||
      candidate.oldPath !==
        (file.status === "added"
          ? "/dev/null"
          : `a/${file.previousFilename ?? file.filename}`) ||
      !githubFilePatchIsComplete({ ...file, patch: candidate.patch })
    ) {
      return null;
    }
    recovered.push({ ...file, patch: candidate.patch });
  }
  return recovered;
};
