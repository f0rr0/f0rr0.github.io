"use client";

import { motion, MotionConfig, LayoutGroup } from "motion/react";
import { useId, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { DisclosureChevron } from "@/components/ui/collapsible";
import {
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  resumeCompanyStageLabels,
  resumeRoleMarkerLabels,
} from "@/content/resume";
import type { LogoAsset, ResumeExperience, ResumeRole } from "@/content/resume";

function CompanyLogo({
  logo,
}: Readonly<{
  logo: LogoAsset;
}>) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm ring-1 ring-border ${logo.tileClassName}`}
      aria-hidden="true"
    >
      <img
        alt=""
        className={`object-contain ${logo.imageClassName ?? "h-5 w-7"}`}
        src={logo.src}
      />
    </div>
  );
}

function BulletLogo({
  logo,
}: Readonly<{
  logo: LogoAsset;
}>) {
  return (
    <span
      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-border ${logo.tileClassName}`}
      aria-hidden="true"
      title={logo.alt}
    >
      <img
        alt=""
        className={`object-contain ${
          logo.bulletImageClassName ?? logo.imageClassName ?? "h-4 w-5"
        }`}
        src={logo.src}
      />
    </span>
  );
}

function RoleMarkers({ role }: Readonly<{ role: ResumeRole }>) {
  return role.markers?.map((marker) => (
    <Badge
      variant="outline"
      className={
        marker === "leadership"
          ? "border-leadership-border bg-leadership-background text-leadership-foreground"
          : "border-hands-on-border bg-hands-on-background text-hands-on-foreground"
      }
      key={marker}
      title={marker === "leadership" ? role.leadershipScope : undefined}
    >
      {resumeRoleMarkerLabels[marker]}
    </Badge>
  ));
}

function RoleBlock({
  role,
  expanded,
}: Readonly<{ role: ResumeRole; expanded: boolean }>) {
  return (
    <div className="journey-role">
      <motion.div
        layout="position"
        className="journey-role-title flex min-w-0 flex-wrap items-center gap-2"
      >
        <span className="font-medium text-foreground">{role.title}</span>
        <span className="flex flex-wrap gap-2" hidden={!expanded}>
          <RoleMarkers role={role} />
        </span>
      </motion.div>
      <motion.p
        layout="position"
        className="journey-role-dates text-xs text-muted-foreground"
      >
        <span hidden={!expanded}>{role.location} · </span>
        {role.dates}
      </motion.p>
      <motion.div
        className="journey-role-detail"
        hidden={!expanded}
        initial={false}
        animate={{ opacity: expanded ? 1 : 0 }}
      >
        {role.summary === undefined ? null : (
          <p className="mt-2 text-muted-foreground">{role.summary}</p>
        )}
        {role.bullets !== undefined && role.bullets.length > 0 ? (
          <ul className="mt-2 space-y-2 text-muted-foreground">
            {role.bullets.map((bullet) => {
              const isTextBullet = typeof bullet === "string";
              const text = isTextBullet ? bullet : bullet.text;
              const label = isTextBullet ? undefined : bullet.label;
              const logo = isTextBullet ? undefined : bullet.logo;

              return logo === undefined ? (
                <li
                  key={text}
                  className="relative pl-4 before:absolute before:left-0 before:text-primary before:content-['·']"
                >
                  {text}
                </li>
              ) : (
                <li className="flex gap-2.5" key={text}>
                  <BulletLogo logo={logo} />
                  <span>
                    {label === undefined ? null : (
                      <>
                        <span className="font-medium text-foreground">
                          {label}
                        </span>
                        {": "}
                      </>
                    )}
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </motion.div>
    </div>
  );
}

function ExperienceItem({
  item,
  expanded,
  onToggle,
}: Readonly<{
  item: ResumeExperience;
  expanded: boolean;
  onToggle: () => void;
}>) {
  const fullName = item.displayName ?? item.company;
  const compactName = item.compactName ?? item.company;
  const company = expanded ? fullName : compactName;
  const entryRef = useRef<HTMLLIElement>(null);
  const companyStage =
    item.companyStage === undefined
      ? undefined
      : resumeCompanyStageLabels[item.companyStage];
  return (
    <motion.li ref={entryRef} layout="position" className="journey-entry">
      <motion.div layout="position" className="journey-logo">
        <CompanyLogo logo={item.logo} />
      </motion.div>
      <motion.div layout="position" className="journey-company min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="font-semibold text-foreground">
            <TooltipTrigger
              payload={
                <TooltipContent
                  preview
                  side="left"
                  sideOffset={24}
                  align="start"
                  anchor={entryRef}
                >
                  <p className="font-medium">{fullName}</p>
                  <p className="mt-2 text-muted-foreground">{item.tagline}</p>
                  {item.roles.map((role) => {
                    const bullet = role.bullets?.[0];
                    return (
                      <p
                        className="mt-2 text-muted-foreground"
                        key={role.title}
                      >
                        {role.summary ??
                          (typeof bullet === "string" ? bullet : bullet?.text)}
                      </p>
                    );
                  })}
                </TooltipContent>
              }
              className="min-h-6 cursor-pointer text-start hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-label={`${company}: ${expanded ? "hide details" : "show details"}`}
            >
              {fullName === compactName ? (
                company
              ) : (
                <>
                  <span hidden={expanded}>{compactName}</span>
                  <span hidden={!expanded}>{fullName}</span>
                </>
              )}
            </TooltipTrigger>
          </h3>
          {companyStage === undefined ? null : (
            <Badge
              hidden={!expanded}
              variant="outline"
              title={`Company stage during this role: ${companyStage}`}
            >
              {companyStage}
            </Badge>
          )}
        </div>
      </motion.div>
      <p
        hidden={!expanded}
        className="journey-tagline text-xs text-muted-foreground"
      >
        {item.tagline}
      </p>
      <div className="journey-roles">
        {item.roles.map((role) => (
          <RoleBlock key={role.title} role={role} expanded={expanded} />
        ))}
      </div>
    </motion.li>
  );
}

export function Journey({
  experience,
  education,
  skills,
  action,
}: Readonly<{
  experience: ResumeExperience[];
  education: ResumeExperience[];
  skills: readonly string[];
  action?: React.ReactNode;
}>) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const toggle = () => {
    setExpanded((value) => !value);
  };
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <LayoutGroup>
        <TooltipGroup>
          <section
            className="journey"
            id="journey"
            data-expanded={expanded}
            aria-label="Career history"
          >
            <div className="flex min-h-11 items-center justify-between gap-4">
              <button
                type="button"
                className="site-text-link"
                aria-expanded={expanded}
                aria-controls={contentId}
                onClick={toggle}
              >
                <DisclosureChevron />
                Details
              </button>
              {action}
            </div>
            <div id={contentId}>
              <div hidden={!expanded} className="mt-6">
                <h2 className="section-title">Skills</h2>
                <p className="mt-2 text-muted-foreground">
                  {skills.join(" · ")}
                </p>
              </div>
              <motion.h2 layout="position" className="section-title mt-8">
                Experience
              </motion.h2>
              <ol className="mt-4">
                {experience.map((item) => (
                  <ExperienceItem
                    key={item.company}
                    item={item}
                    expanded={expanded}
                    onToggle={toggle}
                  />
                ))}
              </ol>
              <motion.div layout="position" className="mt-8">
                <h2 className="section-title">Education</h2>
                <ol className="mt-4">
                  {education.map((item) => (
                    <ExperienceItem
                      key={item.company}
                      item={item}
                      expanded={expanded}
                      onToggle={toggle}
                    />
                  ))}
                </ol>
              </motion.div>
            </div>
          </section>
        </TooltipGroup>
      </LayoutGroup>
    </MotionConfig>
  );
}
