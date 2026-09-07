import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import CopyCodeButton from "@/components/mdx/CopyCodeButton";
import {
  getCodeLanguageIconUrl,
  getCodeLanguageName,
} from "@/lib/code-languages";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  "data-github-code-embed"?: string;
  "data-github-href"?: string;
  "data-github-lines"?: string;
  "data-github-owner"?: string;
  "data-github-path"?: string;
  "data-github-repo"?: string;
  "data-language"?: string;
};

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656" />
    </svg>
  );
}

interface LanguageLabelProps {
  className: string;
  language: string;
}

function LanguageLabel({ className, language }: LanguageLabelProps) {
  const iconUrl = getCodeLanguageIconUrl(language);
  const iconStyle = {
    "--code-language-icon": `url("${iconUrl}")`,
  } as CSSProperties;

  return (
    <span className={className}>
      <span
        aria-hidden="true"
        className="code-block-language-icon relative w-4 h-4 flex-none [&::before]:absolute [&::before]:[inset:0] [&::before]:[background:currentColor] [&::before]:content-[''] [&::before]:[mask:var(--code-language-icon)_center_/_contain_no-repeat]"
        style={iconStyle}
      />
      <span>{getCodeLanguageName(language)}</span>
    </span>
  );
}

export default function CodeBlock({
  children,
  ...props
}: Readonly<CodeBlockProps>) {
  const language = props["data-language"] ?? "plaintext";
  const languageName = getCodeLanguageName(language);

  if (props["data-github-code-embed"] === "true") {
    const owner = props["data-github-owner"] ?? "GitHub";
    const repo = props["data-github-repo"] ?? "repository";
    const filePath = props["data-github-path"] ?? "Source";
    const lineLabel = props["data-github-lines"] ?? "Referenced lines";
    const sourceHref = props["data-github-href"] ?? "https://github.com";

    return (
      <figure
        className="code-block min-w-0 overflow-hidden [border:1px_solid_color-mix(in_oklab,_var(--border)_88%,_var(--foreground))] [border-radius:0.875rem] [background:color-mix(in_oklab,_var(--card)_92%,_var(--muted))] [box-shadow:0_1px_2px_rgb(41_37_36_/_8%),_0_16px_38px_-32px_rgb(41_37_36_/_38%)] dark:[box-shadow:0_1px_2px_rgb(0_0_0_/_30%),_0_18px_42px_-30px_rgb(0_0_0_/_85%)] [&_pre[data-theme]]:[max-width:100%] [&_pre[data-theme]]:[margin:0] [&_pre[data-theme]]:overflow-x-auto [&_pre[data-theme]]:[overscroll-behavior-inline:contain] [&_pre[data-theme]]:border-0 [&_pre[data-theme]]:rounded-none [&_pre[data-theme]]:bg-transparent [&_pre[data-theme]]:[padding:0] [&_pre[data-theme]]:[scrollbar-color:color-mix(in_oklab,_var(--muted-foreground)_48%,_transparent)_transparent] [&_pre[data-theme]]:[scrollbar-width:thin] [&_pre[data-theme]:focus-visible]:[outline:2px_solid_var(--ring)] [&_pre[data-theme]:focus-visible]:[outline-offset:-2px] [&_pre[data-theme]::-webkit-scrollbar]:h-3 [&_pre[data-theme]::-webkit-scrollbar-track]:[border-top:1px_solid_color-mix(in_oklab,_var(--border)_72%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-track]:[background:color-mix(in_oklab,_var(--muted)_58%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-thumb]:[border:0.2rem_solid_transparent] [&_pre[data-theme]::-webkit-scrollbar-thumb]:rounded-full [&_pre[data-theme]::-webkit-scrollbar-thumb]:[background:color-mix(in_oklab,_var(--muted-foreground)_52%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-thumb]:[background-clip:padding-box] [&_pre[data-theme]_>_code]:grid [&_pre[data-theme]_>_code]:w-max [&_pre[data-theme]_>_code]:min-w-full [&_pre[data-theme]_>_code]:[padding:1.125rem_0_1.25rem] [&_pre[data-theme]_>_code]:bg-transparent [&_pre[data-theme]_>_code]:text-foreground [&_pre[data-theme]_>_code]:[font-size:0.875rem] [&_pre[data-theme]_>_code]:font-normal [&_pre[data-theme]_>_code]:[line-height:1.5rem] [&_[data-line]]:min-w-full [&_[data-line]]:[padding:0_1.25rem] [&_[data-highlighted-line]]:[background:color-mix(in_oklab,_var(--primary)_10%,_transparent)] [&_[data-highlighted-line]]:[box-shadow:inset_2px_0_0_color-mix(in_oklab,_var(--primary)_82%,_transparent)] [&_[data-highlighted-chars]]:[border-radius:0.25rem] [&_[data-highlighted-chars]]:[background:color-mix(in_oklab,_var(--primary)_15%,_transparent)] [&_[data-highlighted-chars]]:[box-shadow:0_0_0_0.125rem_color-mix(in_oklab,_var(--primary)_15%,_transparent)] max-sm:[&_pre[data-theme]_>_code]:[padding-block:1rem_1.125rem] max-sm:[&_[data-line]]:px-4 github-code-embed [&.github-code-embed]:[margin:1rem_0_2rem] [&_pre[data-theme]]:max-h-128 [&_pre[data-theme]]:overflow-y-auto [&_pre[data-theme]]:[overscroll-behavior:contain] [&_[data-line-number]]:block [&_[data-line-number]]:min-w-full [&_[data-line-number]]:pr-5 [&_[data-line-number]::before]:inline-block [&_[data-line-number]::before]:w-15 [&_[data-line-number]::before]:[margin-right:0.875rem] [&_[data-line-number]::before]:[border-right:1px_solid_color-mix(in_oklab,_var(--border)_78%,_transparent)] [&_[data-line-number]::before]:pr-3 [&_[data-line-number]::before]:[color:color-mix(in_oklab,_var(--muted-foreground)_70%,_transparent)] [&_[data-line-number]::before]:[content:attr(data-line-number)] [&_[data-line-number]::before]:tabular-nums [&_[data-line-number]::before]:text-right [&_[data-line-number]::before]:select-none dark:[&_code[data-theme]]:[color:var(--shiki-dark)] dark:[&_code[data-theme]_span]:[color:var(--shiki-dark)] max-sm:[&_[data-line-number]]:pr-4 max-sm:[&_[data-line-number]::before]:w-14 max-sm:[&_[data-line-number]::before]:[margin-right:0.75rem] max-sm:[&_[data-line-number]::before]:[padding-right:0.65rem] print:shadow-none print:[&_pre[data-theme]]:[max-height:none] print:[&_pre[data-theme]]:overflow-visible print:[&_pre[data-theme]]:whitespace-pre-wrap print:[&_pre[data-theme]_>_code]:[width:auto] print:[&_pre[data-theme]_>_code]:wrap-anywhere"
        data-language={language}
      >
        <pre {...props}>{children}</pre>
        <figcaption className="github-code-embed-toolbar [&.github-code-embed-toolbar]:mt-0 flex min-h-10.5 [margin:0] items-center justify-between gap-4 [border-top:1px_solid_color-mix(in_oklab,_var(--border)_88%,_transparent)] [background:color-mix(in_oklab,_var(--muted)_72%,_var(--card))] [padding:0.35rem_0.5rem_0.35rem_0.65rem] font-sans max-sm:min-h-10 max-sm:gap-1 max-sm:[padding-inline:0.4rem]">
          <a
            aria-label={`View ${owner}/${repo}/${filePath}, ${lineLabel}, on GitHub`}
            className="github-code-embed-source flex [flex:1_1_auto] min-w-0 items-center gap-2 [border-radius:0.5rem] [padding:0.35rem_0.45rem] text-muted-foreground [text-decoration:none] [transition:background-color_150ms_ease,_color_150ms_ease] [&:hover]:[background:color-mix(in_oklab,_var(--card)_75%,_transparent)] [&:hover]:text-foreground [&:focus-visible]:[outline:2px_solid_color-mix(in_oklab,_var(--ring)_42%,_transparent)] [&:focus-visible]:outline-offset-1 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:flex-none [&_svg]:fill-current max-sm:[padding-left:0.35rem]"
            href={sourceHref}
            rel="noreferrer noopener"
            target="_blank"
          >
            <GitHubMark />
            <span className="github-code-embed-source-label overflow-hidden text-ellipsis [font-size:0.75rem] font-normal [line-height:1] whitespace-nowrap">
              {owner}/{repo}/{filePath}
            </span>
          </a>
          <div className="github-code-embed-meta flex flex-none items-center gap-1 text-muted-foreground">
            <LanguageLabel
              className="github-code-embed-language [color:color-mix(in_oklab,_var(--muted-foreground)_88%,_var(--foreground))] [font-size:0.75rem] font-semibold [letter-spacing:0.075em] [line-height:1] uppercase inline-flex items-center gap-1.5 [padding:0_0.4rem] whitespace-nowrap"
              language={language}
            />
            <CopyCodeButton language={languageName} />
          </div>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className="code-block min-w-0 overflow-hidden [border:1px_solid_color-mix(in_oklab,_var(--border)_88%,_var(--foreground))] [border-radius:0.875rem] [background:color-mix(in_oklab,_var(--card)_92%,_var(--muted))] [box-shadow:0_1px_2px_rgb(41_37_36_/_8%),_0_16px_38px_-32px_rgb(41_37_36_/_38%)] dark:[box-shadow:0_1px_2px_rgb(0_0_0_/_30%),_0_18px_42px_-30px_rgb(0_0_0_/_85%)] [&_pre[data-theme]]:[max-width:100%] [&_pre[data-theme]]:[margin:0] [&_pre[data-theme]]:overflow-x-auto [&_pre[data-theme]]:[overscroll-behavior-inline:contain] [&_pre[data-theme]]:border-0 [&_pre[data-theme]]:rounded-none [&_pre[data-theme]]:bg-transparent [&_pre[data-theme]]:[padding:0] [&_pre[data-theme]]:[scrollbar-color:color-mix(in_oklab,_var(--muted-foreground)_48%,_transparent)_transparent] [&_pre[data-theme]]:[scrollbar-width:thin] [&_pre[data-theme]:focus-visible]:[outline:2px_solid_var(--ring)] [&_pre[data-theme]:focus-visible]:[outline-offset:-2px] [&_pre[data-theme]::-webkit-scrollbar]:h-3 [&_pre[data-theme]::-webkit-scrollbar-track]:[border-top:1px_solid_color-mix(in_oklab,_var(--border)_72%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-track]:[background:color-mix(in_oklab,_var(--muted)_58%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-thumb]:[border:0.2rem_solid_transparent] [&_pre[data-theme]::-webkit-scrollbar-thumb]:rounded-full [&_pre[data-theme]::-webkit-scrollbar-thumb]:[background:color-mix(in_oklab,_var(--muted-foreground)_52%,_transparent)] [&_pre[data-theme]::-webkit-scrollbar-thumb]:[background-clip:padding-box] [&_pre[data-theme]_>_code]:grid [&_pre[data-theme]_>_code]:w-max [&_pre[data-theme]_>_code]:min-w-full [&_pre[data-theme]_>_code]:[padding:1.125rem_0_1.25rem] [&_pre[data-theme]_>_code]:bg-transparent [&_pre[data-theme]_>_code]:text-foreground [&_pre[data-theme]_>_code]:[font-size:0.875rem] [&_pre[data-theme]_>_code]:font-normal [&_pre[data-theme]_>_code]:[line-height:1.5rem] [&_[data-line]]:min-w-full [&_[data-line]]:[padding:0_1.25rem] [&_[data-highlighted-line]]:[background:color-mix(in_oklab,_var(--primary)_10%,_transparent)] [&_[data-highlighted-line]]:[box-shadow:inset_2px_0_0_color-mix(in_oklab,_var(--primary)_82%,_transparent)] [&_[data-highlighted-chars]]:[border-radius:0.25rem] [&_[data-highlighted-chars]]:[background:color-mix(in_oklab,_var(--primary)_15%,_transparent)] [&_[data-highlighted-chars]]:[box-shadow:0_0_0_0.125rem_color-mix(in_oklab,_var(--primary)_15%,_transparent)] max-sm:[&_pre[data-theme]_>_code]:[padding-block:1rem_1.125rem] max-sm:[&_[data-line]]:px-4 print:shadow-none print:[&_pre[data-theme]]:overflow-visible print:[&_pre[data-theme]]:whitespace-pre-wrap print:[&_pre[data-theme]_>_code]:[width:auto] print:[&_pre[data-theme]_>_code]:wrap-anywhere"
      data-language={language}
    >
      <pre {...props}>{children}</pre>
      <div className="code-block-toolbar flex min-h-10.5 items-center justify-end gap-1 [border-top:1px_solid_color-mix(in_oklab,_var(--border)_88%,_transparent)] [background:color-mix(in_oklab,_var(--muted)_72%,_var(--card))] [padding:0.35rem_0.5rem_0.35rem_1rem] font-sans max-sm:min-h-10">
        <LanguageLabel
          className="code-block-language [color:color-mix(in_oklab,_var(--muted-foreground)_88%,_var(--foreground))] [font-size:0.75rem] font-semibold [letter-spacing:0.075em] [line-height:1] uppercase inline-flex items-center gap-1.5 [padding:0_0.4rem]"
          language={language}
        />
        <CopyCodeButton language={languageName} />
      </div>
    </div>
  );
}
