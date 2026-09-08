# Face-motion generation archive

This directory preserves the generated drafts and rejected variants recovered from the September 7 worktree snapshot. Archiving is not approval: these are **not** the site's active portraits.

- [Exact-transfer trials](face-motion-exact-transfer/size-check/): untouched 816×816 PNG candidates, including the upward, downward and right-side framing experiments.
- [Reference-parity experiments](face-motion-reference-parity/): individual transition masters, multi-panel sequences, endpoint trials and rejected overshoot variants.
- [Generation inputs and prompts](../../tmp/imagegen/): Sid identity references, pose-reference preparations, chroma-keyed derivatives, reference strips and per-frame prompts. These references include generated derivatives; they are not all original photographs.
- [Original pose-reference assets](../../downloads/dahbiahmed-face-motion/): downloaded from https://dahbiahmed.com/; reference photography depicts Ahmed Dahbi, not Sid. Included for comparison and provenance, not represented as our generated work.
- [Current runtime assets](../../public/resume/face-motion/v13/): the reference-person set currently used by the preview.

Earlier published Sid endpoint/transition versions remain in this PR's commit history (before `c2a4466`). The raw drafts here were previously untracked and therefore absent from the PR diff.

The previous ignored `build/` contact sheets and browser recordings were not present in the recovery snapshot. They can be regenerated from the preserved sources; they are not claimed as recovered originals.

`inventory.json` records the archived image paths, byte sizes and SHA-256 hashes. Original generated pixels are preserved. No credentials or API logs belong in this archive.
