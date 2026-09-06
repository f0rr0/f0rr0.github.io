# Sid Jain — career source and website blueprint

Approved direction and source inventory · 6 September 2026

This is the editorial source inventory behind the website and résumé cleanup. It is not public copy in its entirety or a new runtime content system. The existing TypeScript résumé source holds the implemented public wording; the review sets below retain additional material for later role-specific editing.

Audit baseline: local HEAD and fetched `origin/next` both at `8d7768fa9c08f4c4b5763b2c076120bf27749a84`. The cleanup updates the overlapping résumé source, regenerates its Typst/PDF outputs, and aligns website identity and machine-readable exports. LinkedIn and draft-article publication remain outside this implementation.

## 1. The direction

**Senior full-stack engineer. Frontend/mobile depth, with recent production AI work.**

Use the work to establish that positioning. Backend and infrastructure experience already appear at Yilu and in earlier engagements; AI is not the beginning of Sid's full-stack career. Keep the chronology in the experience section rather than compressing it into the summary.

### Copy standard — agreed editorial direction

- The public profile is a hiring advertisement, not a biography or a record of this review. Human and machine-facing versions share approved facts and positioning, but need not use identical copy. LLM-specific guidance is useful when it improves navigation, interpretation, or attribution.
- Keep the editing conversation and evidence-review diary out of published formats. Retain concise, relevant agent notes; do not apply a blanket ban on instructions or qualifications. State useful qualifications within the claim itself, such as “about five minutes.” Use past-tense contribution statements rather than project-status updates.
- Every public line should answer one of these: what role fits, what Sid built, what changed, what technical depth it demonstrates, or where the work can be inspected. Do not publish a separate ledger telling readers how to assess the claims.
- Every line must establish fit, identify a contribution, or show a result. Delete routine engineering duties presented as distinguishing qualities.
- Prefer concrete verbs and objects: what was built, who uses it, or what changed. Sector lists and capability slogans do not supply that information.
- Use a short summary with selected evidence, not a career recap. Team formation and contracting arrangements belong in the relevant entry.
- Do not explain “full-stack” again in a tagline. Name and role are enough for the homepage heading.
- Do not retain internal project names, even in this source document. Public product names need enough context to explain what they do.
- Impact can be a shipped capability, adoption, or a measured improvement. Use numbers only with a defensible baseline and scope; brevity does not justify removing a necessary qualification.
- These rules apply to all reader-facing copy. The detailed fact inventory is reference material, not text to publish wholesale.

### LLM publishing guidelines — research and application

Reviewed 6 September 2026. The distinction is **shared facts, audience-specific help**. These examples demonstrate publishing choices, not proven improvements in hiring or retrieval.

| Source                                                                                                                              | Useful pattern                                                                                     | Application here                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Jeremy Howard’s llms.txt proposal](https://llmstxt.org/)                                                                           | Brief context and interpretation notes before descriptive links; deeper content fetched as needed. | A compact `/llms.txt` guide and a linked `/llms-full.txt` containing the existing career detail.                                                 |
| [Umesh Malik’s personal-site guide](https://umesh-malik.com/llms.txt)                                                               | Explicit navigation to Markdown pages, extended context, and resources for different questions.    | Point to existing JSON résumé and article Markdown routes. No need to copy the MCP, CLI, or advertising infrastructure.                          |
| [Bryson Tang’s LLM profile](https://brysontang.com/llms.txt)                                                                        | Roles, project explanations, technical detail, and FAQs connect skills to work.                    | Preserve detailed engineering scope and career relationships. His lengthy tooling-adoption diary is not a model for Sid’s hiring profile.        |
| [Abhishek Chaudhary on his personal-site implementation](https://abhishekchaudhary.com/blog/does-llms-txt-work-personal-brand-site) | Canonical identity wording and explicit alias disambiguation, plus Markdown navigation.            | Explain that Sid Jain, f0rr0, and yuppiestechdev identify the same person. Do not copy the biography or assume his visibility claims apply here. |
| [Andrew T. Rodriguez’s profile source](https://raw.githubusercontent.com/AndrewTRodriguez/andrewtrodriguez.github.io/main/llms.txt) | Compact, readable education, experience, skills, and links.                                        | Keep dates and titles straightforward; use the structured résumé for chronology instead of encoding everything as prose.                         |

Use these rules:

1. **Keep helpful interpretation.** Explain client versus employer relationships, aliases, employer titles versus overall positioning, and the application-engineering scope of AI work. These resolve realistic reading errors; they are not apologies.
2. **Route questions to evidence.** JSON résumé for dates/titles/skills; full career context for contribution and scope; articles and repositories for engineering reasoning; company pages for product context; Work Log for recent activity.
3. **Preserve technical depth.** The longer machine-facing document may include more implementation detail than the PDF. Its facts must remain consistent with the human-facing copy.
4. **Keep the entry point selective.** Summary, short reading notes, curated links, and up to five recent published articles. Keep all career detail and published article links in the full version.
5. **Prefer machine-readable destinations where available.** Article links use the existing `/blog/{slug}.md` routes. JSON and full-context routes provide structured or plain-text alternatives to HTML/PDF parsing.
6. **Exclude the editing process, not all guidance.** No conversation history, “Sid confirmed this” notes, or broad lists of unclaimed skills. A precise attribution rule or necessary benchmark scope can remain useful.
7. **Test both preservation and separation.** Agent notes must appear in the guide/full context, stay out of résumé/metadata copy, and preserve the same role facts. Check link destinations and exclude draft articles. Passing these checks is not a measured LLM answer-quality result.

This layer helps agents directed to the site. It is not a substitute for readable pages or a promise of search visibility; [Google’s AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) says special AI text files are not required for its search features.

### Role targets

- Primary: senior full-stack and product engineering roles with substantial React/TypeScript work and end-to-end ownership.
- Selective: hands-on lead or staff roles where the evidence supports the company's expectations for technical scope and influence. Do not retroactively assign a Staff title to earlier jobs.
- Adjacent: TypeScript SDK/developer-tooling roles, supported by public library work, protocol integration, and developer tooling—not just by using an SDK.
- Additional specialization: building AI application features, tools, retrieval, evaluation, and durable workflows.
- Not the default pitch: company-wide VP/Head of Engineering, AI research, model training, GPU serving, or inference infrastructure.

“Applied AI” is not automatically a claim to model-training or inference-infrastructure expertise. But it is an ambiguous headline for this profile. Discuss the actual application-layer work and be ready to explain model behavior, tool execution, retrieval choices, evaluation, failure handling, latency, and cost where relevant. Do not claim expertise in areas not worked on.

### Market cross-check

These are role benchmarks, not evidence that a particular résumé caused someone to get hired:

| Benchmark                                                                                                     | What the role asks for                                                                                                                 | What this profile should demonstrate                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vercel — Software Engineer, AI SDK](https://vercel.com/careers/software-engineer-ai-sdk-5474915004)          | TypeScript/frontend fundamentals, SDK design and maintenance, testing, open-source participation, and developer feedback.              | AI SDK integration at Namefi is relevant user experience. Pair it with inspectable TypeScript library APIs, tests, compatibility decisions, documentation, and maintenance evidence. SDK usage alone is not SDK authorship. |
| [Linear — Senior / Staff Fullstack Engineer](https://linear.app/careers/d3bc1ced-3ce4-4086-a050-555055dbb1ff) | End-to-end product features, database-to-UI implementation, React/TypeScript, synchronization, performance, and operational ownership. | Namefi's monorepo/application migration, the Memorang CMS, Texts synchronization/protocol work, and production workflow ownership demonstrate full-stack scope.                                                             |

Inference: the strongest common denominator is product-building depth across the stack. The reviewed Vercel posting includes India among accepted application locations; the Linear posting is limited to Europe and North America. Skill fit and location eligibility must be evaluated separately for each application.

## 2. How to trust and use this document

- **Confirmed:** Sid explicitly supplied or corrected the fact in this conversation. This is first-person evidence, not independent verification.
- **Existing record:** a claim already present in the repository. Preserve it in the working inventory, but do not treat repetition across generated outputs as corroboration.
- **Public evidence:** a linked artifact supports a specific claim. A product page establishes product context; it does not, by itself, establish Sid's contribution.
- **Proposed copy:** an editorial rewrite of those facts, not an additional achievement.
- **Open:** an unresolved detail. Omit it from public claims or use narrower wording until resolved.

Latest corrections override older résumé text and earlier assistant wording. Do not export this document's editorial notes, unapproved alternatives, or unresolved claims into `/llms.txt`, structured data, or the PDF. Existing technical drafts also need their own evidence boundaries: a prototype article does not prove production hardening, and it does not negate Sid's confirmation that a later implementation shipped.

### Decisions already settled

| Topic              | Source decision                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overall identity   | Full-stack engineering first; frontend/mobile depth and production AI work substantiate it.                                                                                                           |
| Namefi title       | Retain **Senior Full Stack Engineer** from the current record.                                                                                                                                        |
| Namefi migration   | Sid confirms **both** leading the migration of existing products and establishing the new foundations. Describe the engineering work without internal naming. Do not infer sole authorship.           |
| Memorang title     | Retain **Lead Full Stack Engineer** from the current record.                                                                                                                                          |
| Memorang team      | **Led two CMS engineers.** Do not inflate the count or explain it through team-size arithmetic.                                                                                                       |
| Memorang search    | Self-querying search and the pgvector media recommender **shipped**. They must not be summarized as only explorations.                                                                                |
| “GraphJS”          | Sid says there was nothing related to GraphJS. Remove it; do not substitute another framework.                                                                                                        |
| Excluded work      | Omit GraphRAG and Neo4j from public career positioning, skills, résumé bullets, and role deep dives, at Sid's explicit request.                                                                       |
| Kult scope         | **Head of Mobile Engineering**; led **10 engineers**, with design and other cross-functional partners separately.                                                                                     |
| Kult platforms     | Native **Kotlin/Android and Swift/iOS**. No Kotlin Multiplatform claim.                                                                                                                               |
| Namefi AI metering | Developed AI usage metering. Do not expand this into a billing or quota-enforcement claim.                                                                                                            |
| Independent work   | **Product engineering engagements** is the accepted heading, with **Self-employed** as the arrangement. Yuppies Tech is secondary contracting-company attribution. No company-founder claim or title. |

## 3. Shared public copy

### Identity and headline

Canonical role label:

> Senior Full-Stack Engineer

Optional expanded LinkedIn headline:

> Senior Full-Stack Engineer | Web, Mobile & AI Products

Keep company-specific titles distinct from this overall profile label.

### Résumé summary

> Senior full-stack engineer based in Mumbai with 10+ years in web and mobile. Built Namefi’s AI buyer-research workflow, cutting days of manual work to about five minutes per domain, and Memorang’s CMS backend and editing interface.

Sid approved this direction and requested technical terminology review. The summary selects two contributions; the experience section covers the full career. Sid confirmed the time-saving claim on 6 September 2026, with discovery conversations involving roughly 40–50 domain sellers as context for the manual workflow. This is first-person evidence, not an independently measured experiment. The claim concerns research, not autonomous outreach or completed sales.

### Technical terminology check

- **Media recommender** names the shipped feature. **Embeddings and pgvector similarity search** explain the retrieval mechanism without implying the model embedded image pixels. [pgvector documentation](https://github.com/pgvector/pgvector) describes vector similarity search in PostgreSQL.
- **LangChain self-querying** means constructing a retrieval query and metadata filters from natural language. It is not arbitrary generated SQL. [LangChain’s query-construction explanation](https://blog.langchain.dev/query-construction/) describes that separation.
- **Semantic search** is established terminology, but it is less informative than naming this feature and mechanism. [Supabase’s explanation](https://supabase.com/docs/guides/ai/semantic-search) distinguishes embedding-based similarity from keyword matching.
- **AI SDK tool calling** describes model-requested calls to application-defined tools. It does not imply training or serving models. [AI SDK documentation](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling) defines tools and their execution.
- Next.js rendering strategies describe different routes/components in one application, not a claim that every route is simultaneously static and dynamically server-rendered.

These references validate terminology, not Sid’s employment history or implementation details. The latter come from his confirmations and the bounded evidence inventory.

### Summary benchmark — public examples and hiring guidance

Reviewed 5–6 September 2026: two public résumés, one personal bio, and a hiring manager's writing guidance. These are writing comparisons, not evidence of recent hires or proof that particular wording improved interview rates. Other authors' outcome claims are self-reported, not independently validated here.

| Source                                                                                           | Observation                                                                                                                                                                                                                                                | Decision for this copy                                                                                                                                      |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Kent C. Dodds — short résumé](https://kentcdodds.com/resume?view=short)                         | A brief summary leads into named tools, adoption claims, and commercial results. The opener still contains broad capability language; the stronger evidence is Testing Library and PayPal tooling below it.                                                | Borrow the proximity of claim and proof, not the abstract opener or another person's scale. Bring one or two identifiable contributions into Sid's summary. |
| [Yash Bhalodi — public CV](https://cv.yashbhalodi.me/)                                           | The record spans React Native, full-stack work, and AI features. Its broad introductory adjectives are less informative than the specific messaging, search, and integration work underneath. Many percentage claims lack measurement context on the page. | Relevant career breadth does not make every writing choice a model. Prefer concrete work; do not manufacture percentages to resemble an “impact” résumé.    |
| [Josh W. Comeau — personal bio](https://www.joshwcomeau.com/about-josh/)                         | The opening gives a time anchor and specific employers. Named libraries and reported usage substantiate the engineering work elsewhere on the page. This is a bio, not a résumé.                                                                           | Keep the introduction short and connect it to inspectable work. Do not copy the autobiographical detail into a résumé summary.                              |
| [Gergely Orosz — Common Resume / CV Mistakes](https://thetechresume.com/samples/common-mistakes) | His guidance explicitly identifies internal jargon, unsupported clichés, and verbosity as problems, and recommends evidence of contribution and results.                                                                                                   | Remove internal naming and process lists. Write for a reader who does not know the projects or Sid's history.                                               |

Editorial conclusion: use **role + selected evidence**. A stronger result is welcome, but a bigger adjective or unsupported number is not evidence. A summary is optional if it merely repeats the heading and the first experience bullets.

**Selected impact:** use the user-confirmed reduction from days of manual research to about five minutes per domain. Its scope includes finding potential buyers, assessing their ability to buy, researching contacts, and preparing outreach drafts. Keep the customer-discovery detail in the Namefi evidence notes. Do not mix this claim with the separate [published cost comparison](https://namefi.io/r/en/blog/progressive-ai-buyer-discovery-method), which is explicitly a single-domain benchmark.

### Homepage

Heading:

> Sid Jain

Role/location line:

> Senior Full-Stack Engineer · Based in Mumbai

Introduction:

> At Namefi, I built an AI workflow that cuts buyer research from days to about five minutes per domain. I also built Memorang’s CMS and media recommender.

No additional slogan or capability list. Link to the published Namefi buyer-discovery account and the résumé; do not present unpublished drafts as supporting case studies.

Footer:

> Sid Jain · Based in Mumbai

Page title / social-image identity:

> Sid Jain — Senior Full-Stack Engineer

Metadata description:

Use the name followed by the shared résumé summary. Metadata and author bio derive from the canonical data rather than carrying a separately maintained positioning claim.

This is intentionally a shared identity, not identical prose on every surface. The homepage should introduce the person, the résumé should establish ownership, and project pages should show engineering decisions.

## 4. Career inventory and proposed role copy

Dates below are carried from the current repository; they have not been independently checked against employment records. Preserve chronology and employment relationships. Present the independent engagements as a distinct working arrangement, not an ordinary employee role at Yuppies and not separate direct employment at each client. Retain Yuppies Tech as the contracting-company attribution in secondary context and employment-history records.

| Period            | Organization                    | Role label                       | Contribution to the career story                                                             |
| ----------------- | ------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| Jan 2025–present  | Namefi                          | Senior Full Stack Engineer       | Full-stack foundations, migration, production workflows, and AI products.                    |
| Apr 2024–Jan 2025 | Memorang                        | Lead Full Stack Engineer         | CMS services and UI, retrieval, design-system work; led two engineers.                       |
| Jan 2021–Apr 2024 | Self-employed                   | Product engineering engagements  | Named product contributions; personal implementation and leadership of supporting engineers. |
| Jan 2020–Jan 2021 | Kult                            | Head of Mobile Engineering       | Ten-engineer mobile leadership with hands-on native architecture and performance work.       |
| Nov 2018–Dec 2019 | Yilu                            | Founding Engineer                | Early product ownership spanning mobile, infrastructure, and a full-stack pod.               |
| Nov 2017–Oct 2018 | 8fit                            | Senior Software Engineer         | Cross-platform engineering and an Apple TV product.                                          |
| Oct 2016–Oct 2017 | Housing                         | Software Development Engineer II | React Native architecture, shared UI/data foundations, and release engineering.              |
| 2015–2016         | Earlier consulting/startup work | Software Engineer and Consultant | Web/mobile delivery across several products and teams.                                       |

### Namefi

**Confirmed additions and corrections**

- Led the migration of existing products into a new monorepo and established its application foundations.
- Set up developer tooling, a Next.js application combining server-side rendering, static generation, and client-side rendering, and the Hono backend.
- Built substantial frontend functionality and the initial Privy/wallet authentication implementation.
- Established initial AI application foundations using Vercel AI SDK, including Exa tool calling.
- Built an internal analytics agent with custom tools for Google Analytics, Twitter Analytics, and PostHog, allowing operators to query Namefi analytics in natural language.
- Conducted extensive discovery conversations with roughly 40–50 domain sellers about buyer research: identifying companies, assessing their ability to buy, finding contacts, and drafting outreach across tens to hundreds of potential buyers per domain.
- Sid confirms that reducing this manual work from days to about five minutes per domain is a defensible result of the AI research workflow. Treat the interviews as first-person discovery evidence about the manual process, not as a controlled timing study. Candidate-company counts are not the same as final ranked leads or contacted buyers.
- Built Namefi Studio: multimodal logo/video generation with multiple generation strategies and a multi-step strategist-to-generation flow. Cost-aware behavior is part of the account; the exact routing or optimization mechanism needs a concrete explanation before making stronger claims.
- Developed AI usage metering.

**Existing work to retain in the source inventory**

- Outbound: customer discovery with domain sellers; buyer research, ranking, fit rationales, decision-maker contacts, and outreach drafts; production delivery and support.
- Outbound quality: model-judged buyer fit, name/product similarity, contact quality, and seller review. Existing numeric claims are recorded separately below.
- Studio: strategy, concepts, generation, validation, animation, and delivery; logos, posters, website mockups, and motion. The older account includes Temporal orchestration, prompt constraints, and manual visual review of domain/TLD fidelity.
- Feed: multi-source listing ingestion, extraction/classification, normalization, concurrent scans, retries, price verification, and auditable outcomes; search and RSS consumption.
- Registrar/commerce: third-party integrations, registration, checkout, payments, analytics, and long-running operational workflows.
- Airflow-to-Temporal migration: declarative/testable workflows, recovery, and expansion to AI and operational work. Do not retain the unmeasured “failures rare” claim as a demonstrated reliability improvement.
- Existing record also describes documentation, static checks, and CI practices for AI-assisted development; retain as supporting developer-tooling context.

**Proposed résumé bullets — review set**

1. Led the migration of Namefi's existing products into a new monorepo, establishing developer tooling, a Next.js application with server-side, static, and client-side rendering, and a Hono backend.
2. Built frontend features and initial Privy/wallet authentication, alongside registrar integrations, domain registration, checkout, payments, and analytics workflows.
3. Established AI SDK and Exa tool-calling foundations; built an internal analytics agent with custom tools for Google Analytics, Twitter Analytics, and PostHog.
4. Built Namefi Outbound, an AI tool that finds potential domain buyers and their contact details, then drafts outreach messages. Reduced this work from days to about five minutes per domain.
5. Built Namefi Studio's multi-step strategy and generation workflows for logos and video, with multiple generation strategies and review of domain-name fidelity.
6. Built Namefi Feed's listing-ingestion and AI-classification workflows, including concurrent processing, retries, and price verification; migrated operational orchestration from Airflow to Temporal.

This is the full review set, not a commitment to six long bullets in the final PDF. After layout review, keep the strongest five for a target role and retain the rest in the web deep dive. For a full-stack role, do not cut the migration/backend/authentication evidence to make room for another AI bullet. A later case study should explain why the migration was needed and the decisions it involved; do not invent a business benefit merely to replace the internal name.

**Evidence and boundaries**

Sid's [published Namefi buyer-discovery article](https://namefi.io/r/en/blog/progressive-ai-buyer-discovery-method) is already useful public evidence of engineering reasoning. It documents progressive model escalation, evidence reuse, evaluation, and a controlled benchmark reporting an 85.2% discovery-cost reduction. Attribute that result to the documented single-domain benchmark; do not claim an 85% reduction across all customers or a sales-conversion improvement.

Still open: which migration pieces other engineers owned, the exact Studio strategy/cost decisions, and the scope/status of metering. These do not block narrower wording above. Avoid “sole architect,” “built everything,” a formally appointed AI leadership title, or shipped billing/quotas claims.

### Memorang

**Confirmed scope**

- Joined as CMS engineering lead; led two other engineers.
- Built the CMS services and led its UI implementation.
- Built the TanStack Table data grid, shared components, and component inventory, working closely with design to establish the design system.
- Built self-querying/filtering work using LangChain and a production media recommender using embeddings, vector similarity, and pgvector. Sid confirms the work shipped.
- Set scope and weekly priorities with the CEO/CTO, discussed architecture with the CTO, coordinated implementation, and presented progress to leadership.
- Worked with SMEs, the CEO, and the TOEFL/ETS team on exam schemas. Describe collaboration accurately; do not imply direct employment by or endorsement from ETS.

**Existing work to retain in the source inventory**

- EdWrite CMS/content APIs, versioned curricula and assessment schemas, question types, content groups, scoring, adaptive practice, and client compatibility.
- Human-in-the-loop question/audio/image generation, SME-informed model evaluation, and client control over publishing.
- Semantic recommendations for supporting media.
- AI-assisted Flow-to-TypeScript migration using codemods/refactoring; compilation and CI improvements. Scope and outcome numbers need a dated basis.
- Cambridge content is in the existing record; TOEFL/ETS collaboration was specifically described in the latest clarification.

**Proposed résumé bullets — review set**

1. Led two CMS engineers; planned scope and architecture with the CTO and weekly priorities with the CEO.
2. Built CMS services and led the UI implementation, including a TanStack Table data grid and a shared component inventory/design system developed with the design team.
3. Shipped a media recommender using embeddings and pgvector similarity search, with LangChain self-querying to generate metadata filters from natural-language queries.
4. Worked with subject-matter experts and the TOEFL/ETS team to model exam content and assessment schemas; built content APIs and human-reviewed AI generation workflows.
5. Led an AI-assisted Flow-to-TypeScript migration using codemods and refactoring, improving the codebase's type coverage and development workflow.

For bullet 5, keep the migration itself from the existing record; quantify build-time or defect improvements only after checking the baseline. Do not expand the management claim into ownership of all backend, frontend, and mobile teams.

**The draft-article reconciliation**

The local semantic-search article explicitly covers early exploratory implementations. Sid's later production confirmation should be reflected in the role description, but not used to rewrite every experimental code path as the shipped system. The case study needs a clear distinction between early experiments, the production implementation, and later recommendations. Authentication/tenant isolation, unsupported filters, evaluation coverage, and retrieval choices must be described from actual implementation evidence, not filled in from generic best practices.

Sid confirmed that the recommender and self-querying shipped in the CMS. Do not infer additional consuming products. The changes between prototypes and production remain a case-study question.

### Product engineering engagements, 2021–2024

**Confirmed working model**

Sid's description: a lead full-stack/mobile engineer and generalist, working directly with product companies' engineering teams and their CTO or Head of Engineering. He hired and led supporting engineers as the workload grew. Yuppies Tech was the company he established for this work, not an employer he joined. Its name is a contracting detail rather than the identity he wants to foreground.

“Mercenaries for hire” conveys the working style conversationally. In a résumé, explain the arrangement through self-employment, direct collaboration with product teams, personal engineering responsibility, and the supporting team he assembled. Then show what he built for named products. The contractual relationship can remain accurate while the product work receives the emphasis.

**Accepted heading and arrangement**

> **Product engineering engagements**  
> Self-employed · Jan 2021–Apr 2024
>
> Full-stack and mobile engineering with client product teams and their CTOs or engineering leads.

The client bullets carry the specifics; this sentence only explains the working arrangement. Omit it if the heading, self-employment label, and company attribution already make that clear. Keep team-building detail here if useful for a target lead role, not in the overall summary.

Keep the contracting company secondary:

> Client work through Yuppies Tech.

The company stays identifiable without appearing in the summary, primary heading, or every client bullet. Sid explicitly chose to omit company-founder claims. On LinkedIn or other forms, preserve the self-employed/company relationship and client attribution; do not force a section heading into an employer field or invent separate direct employment at the clients.

Do not reopen the heading decision or reinstate the earlier lead/founder title proposals. The previous “15 engineers” count stays in the evidence ledger until its meaning and timeframe are clear.

**Selected engagements — concrete contributions within the independent-work period**

| Engagement      | Engineering scope in the existing record                                                                                                                                                                                               | Concise proposed résumé wording                                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Veera Browser   | Android Chromium/Brave-derived work across C++/Java, patch management, browser features, privacy updates, build/release tooling, Play Store launch, and later iOS platform/release setup.                                              | Led a Chromium-based Android browser from initial development through Play Store launch, including upstream patch management, product features, and build/release tooling; later established the iOS platform and release setup. |
| Texts           | Production Messenger integration in TypeScript/Electron; undocumented interfaces, MQTT, Thrift, typed codecs, payload handling, synchronization, groups, attachments, reactions, receipts, typing, and presence.                       | Built Texts' production Facebook Messenger integration by reverse-engineering undocumented protocols and implementing transport, typed serialization, synchronization, and messaging features.                                   |
| ZebPay          | Native-app modernization; store submission blockers; CI/CD; exchange/payment features, wallet integrations, coins/tokens, OTC workflows, and country-specific KYC/document verification.                                               | Modernized ZebPay's iOS/Android apps and release infrastructure; shipped exchange, payment, wallet, and country-specific KYC workflows.                                                                                          |
| Mitsubishi MiAR | Native iOS/iPadOS AR and React-based WebAR; 3D asset optimization, vehicle interaction, photo capture, bilingual content, contest tooling, and vendor/device compatibility work.                                                       | Delivered MiAR across native iOS/iPadOS and WebAR, optimizing 3D vehicle assets and mobile compatibility and building photo-contest administration tools.                                                                        |
| Airbus Tripset  | End-to-end technical delivery through Yuppies, with Milkinside leading design/client communication; React Native app and backend integrations with Airbus/Amadeus, CMS guidance, itineraries, restrictions, alerts, and notifications. | Delivered Airbus Tripset's React Native app and backend services, integrating Airbus/Amadeus data, CMS-managed travel guidance, itineraries, and notifications with design partner Milkinside.                                   |

Do not frame Texts' historical integration as implementation of today's Messenger end-to-end encryption protocol. Keep the account bounded to the protocol/version and payload handling actually worked on. For Veera, distinguish the inspectable initial proof of concept from the later shipped product and build system.

For applications, select client examples by relevance rather than deleting the rest from the source: Texts/Veera are valuable for tooling and platform roles; Airbus demonstrates app-plus-backend delivery; ZebPay demonstrates modernization and release responsibility. Company press or acquisition stories are product context, not personal impact metrics.

### Kult

**Confirmed scope**

Led the entire mobile engineering effort, with 10 engineers building native Kotlin/Android and Swift/iOS applications. The product had rich animations and backend-driven layouts and behavior. Sid contributed directly to architecture and performance-sensitive product-listing/product-detail experiences and coordinated with product/interaction design, SMEs, and backend engineers.

**Proposed résumé bullets**

1. Led 10 engineers across native Android and iOS development, coordinating with product and interaction designers to deliver Kult's dynamic, backend-driven commerce experience.
2. Set the Kotlin/Android and Swift/iOS architecture and contributed hands-on to animation-heavy product-listing and product-detail screens, addressing rendering and interaction performance.
3. Partnered with backend engineers on API contracts supporting multiple layouts and product experiences across both apps.

The existing record also contains CI/CD, release systems, environment configuration, analytics, deep linking, Bugsnag, and SDK integrations. Retain these as supporting mobile-delivery context; they need not crowd the three main bullets.

Do not claim Kotlin Multiplatform, a ten-person group including designers, company-wide backend ownership, or VP-level organizational scope. Preserve the distinction between a functional display title and any formal title required on employment-history forms.

### Yilu

Existing record: first engineering hire; native mobile architecture and release automation; Terraform-managed AWS infrastructure; iOS/Android features for Eurowings; leadership of a five-developer full-stack pod with a PM and designer; hiring partnership with the CTO and early Scrum Master responsibilities.

Proposed bullets:

- As the first engineering hire, built mobile architecture, release automation, and Terraform-managed AWS infrastructure and shipped iOS/Android features for Eurowings.
- Led a five-developer full-stack pod, working with product/design and partnering with the CTO on early engineering hires and delivery practices.

This is important evidence that full-stack and infrastructure responsibility predated the recent AI work. Retain the historical engineering job title “Founding Engineer”: it describes the first engineering hire, not a claim to have founded Yilu.

### 8fit

Existing record: architecture of a hybrid Apple TV fitness app, cross-platform features in JavaScript, Swift, Objective-C, Java, and Kotlin, and historical App Store category rankings.

Proposed bullets:

- Architected a hybrid Apple TV fitness app and built cross-platform features across the mobile/native stack.
- Worked across JavaScript, Swift, Objective-C, Java, and Kotlin to implement product functionality across platforms.

The second bullet is expendable if space is tight. Restore the category-ranking result only with dated supporting evidence; the later Withings acquisition does not establish Sid's individual impact.

### Housing

Existing record: React Native architecture; more than 90% shared JavaScript; state management, reactive data flows, offline persistence, shared components; automated testing, diagnostics, signing, beta distribution, and OTA releases; contributions to the PWA for constrained networks.

Proposed bullets:

- Led architecture for Housing's React Native app, including shared components, state/data flows, and offline persistence across iOS and Android.
- Built automated testing and mobile-release workflows covering signed builds, beta distribution, and over-the-air updates; contributed to the PWA for unreliable networks.

The [Housing engineering article](https://medium.com/engineering-housing/how-we-built-our-react-native-app-3380a33811ac) is an existing public proof link worth retaining. Use it to support specific architecture and release decisions; attach the code-sharing percentage only after checking its exact definition.

### Earlier consulting and startup work

Retain the 2015–2016 grouped entry for Bridg, 1mg, HornOk, Volkno, Meriad, and self-employed work. The existing record describes JavaScript/Java/Ruby on Rails work on email/customer-data tooling, real-time medical consultations, and fleet management, plus mentoring 1mg's mobile team on hybrid architecture and tooling.

Do not infer a precise client-to-feature mapping where the current source only provides a grouped description. A useful compact bullet is:

> Built web and mobile products spanning email/customer-data tools, real-time consultations, and fleet management; mentored 1mg's mobile team on hybrid architecture and development tooling.

### Education and personal details

Retain UCLA, Bachelor of Science in Computer Science and Engineering, 2013–2016, from the existing record. Preserve Delhi Public School, R. K. Puram, 2011–2013, in the full inventory; it is optional on a senior-engineer résumé if space is needed. Keep the current Mumbai location, contact details, and public handles unless Sid changes them.

## 5. Skills: make the organization match the story

| Group                         | Evidence-backed topics to foreground                                                                                                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend and product UI       | TypeScript, JavaScript, React, Next.js, React Native, TanStack Table, component/design systems, rendering strategies, interaction performance, offline/data flows.                                                         |
| Backend and product systems   | Node.js, Hono, PostgreSQL/pgvector, APIs, authentication, third-party integrations, Temporal workflows, monorepo tooling, testing and release automation; AWS/Terraform from earlier work.                                 |
| AI application engineering    | Vercel AI SDK, Mastra, LangGraph, LangChain, tool calling, Exa integration, embeddings, self-querying, vector similarity, multi-step generation, human review, model-based evaluation; Temporal and Trigger.dev workflows. |
| Mobile and platform depth     | Swift, Kotlin, Objective-C, Java, Chromium/C++, browser builds, native integrations, store delivery, protocol investigation and typed serialization.                                                                       |
| Hands-on technical leadership | Scope definition, architecture, implementation, mentoring/team coordination, design partnership, communication with CTO/CEO/product stakeholders, production delivery.                                                     |

This is an inventory, not a claim that every technology is equally current or equally deep. Choose a compact subset for each résumé. Do not add model training, fine-tuning, inference serving, or unperformed production controls for keyword coverage.

The concise Skills section includes Vercel AI SDK, Mastra, LangGraph, LangChain, Temporal, Trigger.dev, AWS CDK, and Redis. Keep Swift, Kotlin, and pgvector in the relevant implementation descriptions rather than the Skills list.

## 6. Public proof: what a reviewer can actually inspect

Before cleanup, the website foregrounded GitHub activity before selected work. The implementation places the professional introduction and published Namefi account first, then open source and writing, then activity. The repository list is now explicitly labelled “Open source,” with the Thrift library replacing the website itself. Substantial technical drafts remain unpublished.

Recommended order within the existing page: introduction → selected professional work → selected technical writing/open source → activity log. This is a content/ordering change, not a request for a redesign or new CMS. Keep the activity log, but do not make a reviewer reconstruct the career from commits or token consumption.

| Asset                                                                                             | Current evidence/status                                                                                                          | Best use and next action                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Namefi buyer-discovery article                                                                    | Public company-site article credited to Sid; includes design reasoning and a bounded benchmark.                                  | Feature now as professional work, with the benchmark caveat stated above. Add a separate application-architecture/migration story when the implementation details can be shared.                       |
| Namefi Studio / analytics / application architecture                                              | Sid-confirmed work; current résumé under-describes the application foundations.                                                  | Prepare one sanitized end-to-end case with UI, backend/tool boundaries, a real failure/recovery path, and Sid's ownership. Do not invent diagrams of architecture not yet established.                 |
| Memorang CMS/search                                                                               | Production shipment confirmed; the local semantic-search article describes early experiments and is still a draft.               | Reconcile prototype vs production, then demonstrate a CMS workflow, data model, retrieval/filtering decision, and review boundary. Do not publish the draft unchanged as proof of production controls. |
| Texts protocol article                                                                            | Local draft covering historical production-integration work and inspectable protocol components.                                 | Strong platform/TypeScript case. Clarify version/scope, personal contribution, and what remains private before publication.                                                                            |
| [Thrift Compact Protocol library](https://github.com/f0rr0/thrift-compact-protocol)               | Public typed TypeScript protocol implementation with schema/codec material.                                                      | Add to the SDK/tooling proof inventory. Show API design and correctness decisions; do not infer external adoption from repository existence.                                                           |
| Veera article                                                                                     | Local draft focused on an initial Chromium/Brave-derived proof of concept, not the complete later production system.             | Add a clearly separated delivery/build-tooling account with evidence. Keep the prototype's limits explicit.                                                                                            |
| [Oliphaunt](https://github.com/f0rr0/oliphaunt)                                                   | Public embedded-PostgreSQL project with broader multi-language/runtime scope than the current “Rust library” résumé description. | Useful developer-tooling depth. Verify release/registry status before calling every SDK production-ready or published; installation examples alone are not release proof.                              |
| [React Native rating component](https://github.com/f0rr0/react-native-rating) and Housing article | Existing public UI/mobile work.                                                                                                  | Preserve as evidence of long-standing frontend/mobile depth; verify any usage or popularity numbers before citing them.                                                                                |
| [Postgres browser proxy](https://github.com/f0rr0/pg-browser-proxy) and this site                 | Public supporting projects in current selected work.                                                                             | Useful secondary tooling/product evidence, behind the strongest professional cases.                                                                                                                    |
| Tranquilo, ZeroClaw, personal-agent and website-revival articles                                  | Local drafts with differing levels of product relevance and evidence.                                                            | Keep as optional writing; do not automatically use the newest draft or an attention-grabbing agent headline as flagship employment proof.                                                              |

The product references already stored for [EdWrite](https://memorang.com/products/edwrite), [Tripset](https://www.airbus.com/en/newsroom/press-releases/2021-03-airbus-launches-tripset-companion-app-to-ease-passenger-travel), [MiAR](https://www.mitsubishimotors.pr/nosotros/noticias/mitsubishi-presenta-ganadores-photocontest-miar), [Veera](https://play.google.com/store/apps/details?id=com.veera.browser), and [Texts](https://texts.com/) are useful context links. They are not independent confirmation of the résumé's ownership claims or metrics.

### Minimum useful case-study structure

1. Product/user problem and the state before the work.
2. Sid's role, collaborators, and boundaries of ownership.
3. One end-to-end path through the interface, backend/data, and external systems.
4. Two or three consequential decisions, including alternatives and trade-offs.
5. A real difficulty: failure mode, constraint, migration risk, performance issue, or quality problem.
6. What shipped, how it was checked, and any measured outcome with its scope.
7. Public artifact or sanitized evidence, plus anything that cannot be shared.

One well-supported case is more useful than multiple nearly identical descriptions of “built an AI agent.” No customer data, credentials, private repositories, or confidential screenshots should be published without authorization.

## 7. Metrics and claims ledger

These claims are not automatically false; they require the stated scope before becoming headline evidence. Cleanup can proceed with non-numeric wording rather than waiting for every number.

| Claim                                                                                                 | Current basis                                                                                              | Publication rule                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Namefi: days to about five minutes per domain                                                         | Sid explicitly confirms the result, informed by discovery conversations with roughly 40–50 domain sellers. | Use as an approximate research-workflow result. The manual scope includes company/buyer assessment, contacts, and outreach drafts. Do not claim a controlled experiment, guaranteed runtime, or sales conversion. |
| Namefi: 50–70 ranked leads; tens to hundreds of potential companies researched                        | The ranked-lead range is from the existing record; Sid confirms the broader candidate-research scope.      | Keep candidate volume, ranked results, contact research, outreach, and converted buyers distinct. Do not use these counts interchangeably.                                                                        |
| Namefi: 85.2% lower discovery cost                                                                    | Published single-domain controlled benchmark in Sid's article.                                             | Explicitly scope to that benchmark and pipeline stage; no across-customer savings claim.                                                                                                                          |
| Feed: nearly 8,000 active listings                                                                    | Existing record, time-sensitive.                                                                           | Add a measurement date or omit the number; distinguish active listings from users or transactions.                                                                                                                |
| Namefi: orchestration failures became rare                                                            | Existing qualitative assertion.                                                                            | Prefer the actual recovery/testing changes unless an incident-rate baseline exists.                                                                                                                               |
| Memorang: tens of thousands of questions; months to days                                              | Existing record.                                                                                           | Define dataset/timeframe and the content-production cycle being measured, including human review.                                                                                                                 |
| Memorang: hundreds of thousands of lines; compilation into single-digit minutes; fewer runtime errors | Existing record.                                                                                           | Confirm migration scope, comparable build conditions, and any error-rate evidence. Do not turn an impression into a measured defect reduction.                                                                    |
| Memorang: three developers managed                                                                    | Contradicted by Sid.                                                                                       | Use “Led two CMS engineers.”                                                                                                                                                                                      |
| Yuppies: 15 engineers                                                                                 | Existing record; current clarification confirms a team but not this number's meaning.                      | Clarify peak concurrent headcount vs cumulative contributors and direct leadership scope. Until then, say built and led a supporting engineering team.                                                            |
| Veera: 4–6-hour builds, near-instant app-layer iteration, roughly two-hour clean release builds       | Existing record.                                                                                           | Distinguish full clean build, cached build, and app-layer iteration; record hardware/cache conditions where available.                                                                                            |
| ZebPay: monthly to weekly releases                                                                    | Existing record, qualified as the stabilization period.                                                    | Retain that period qualifier after confirming the before/after release history.                                                                                                                                   |
| 8fit: No. 1 in 30+ countries, No. 7 in the US                                                         | Existing historical category-ranking claim.                                                                | Need platform, category, countries, and date evidence; not an overall App Store ranking.                                                                                                                          |
| Housing: more than 90% shared JavaScript                                                              | Existing record and related engineering article.                                                           | Verify denominator and period; do not imply 90% of all native/platform code was shared.                                                                                                                           |
| Kult: 10 engineers                                                                                    | Explicitly confirmed by Sid.                                                                               | State 10 engineers; keep designers outside that count. Do not additionally infer all were direct reports.                                                                                                         |
| GitHub stars, contribution volume, package adoption, AI token usage                                   | Dynamic activity/popularity measures, not delivery outcomes.                                               | Date-check any cited counts. Do not use activity or spend as a substitute for quality, adoption, or business impact.                                                                                              |

Also clarify the existing Mitsubishi language description before repeating it: the current source pairs Puerto Rico/Japan stakeholders with English/Brazilian Portuguese content. Do not silently “correct” the language to Spanish or assume the current text is accurate.

## 8. Website and résumé implementation map

Keep the existing flow: approved editorial facts → TypeScript résumé data → existing web/JSON/LLM/PDF outputs. Do not build a Markdown parser or a second résumé configuration. This file is the review brief; the TypeScript source remains the executable source of truth.

| Surface/source                                                                                                                                                                                                                                                                                                                                                                                | Required change after copy review                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Résumé data](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/content/resume.ts)                                                                                                                                                                                                                                                                                                          | Update overall role, summary, target positioning, role bullets, team scope, accuracy notes, strengths, deep dives, role-fit guidance, and public proof. Describe Namefi's migration/Hono/auth work and Memorang's CMS/UI/search. Apply confirmed Kult/Memorang corrections everywhere. Keep the independent-engagement display proposal separate from truthful contracting-company data. |
| [Homepage](</home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/app/(portfolio)/page.tsx>)                                                                                                                                                                                                                                                                                                    | Align hero, introduction, title, description, Open Graph/Twitter titles, and image alt text. Surface professional work before activity.                                                                                                                                                                                                                                                  |
| [Selected-work content](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/content/home.ts)                                                                                                                                                                                                                                                                                                  | Curate professional cases and relevant libraries using the existing page/components where practical. Repository membership alone should not decide the strongest work. Do not link unpublished drafts as public evidence.                                                                                                                                                                |
| [Site identity helpers](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/lib/site.ts)                                                                                                                                                                                                                                                                                                      | Align bio/description and founder wording. Rewrite the complete sentence: replacing the role alone would leave the current `is an` construction grammatically wrong for “Senior…”.                                                                                                                                                                                                       |
| [Résumé exports](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/lib/resume.ts)                                                                                                                                                                                                                                                                                                           | Align JSON skills, LLM context, and the “ask about me” target prompt. Replace the blanket “Verified Context” label with neutral career-context wording. Keep actual current-role data where it is already correct.                                                                                                                                                                       |
| [Structured data](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/lib/structured-data.ts)                                                                                                                                                                                                                                                                                                 | Reorder/update hardcoded `knowsAbout` items to match full-stack-first positioning. Retain the accurate company-specific `jobTitle`; do not replace it with a target job.                                                                                                                                                                                                                 |
| [Footer](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/components/site-footer.tsx) and [social image](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/app/opengraph-image.tsx)                                                                                                                                                                                                      | Replace the separate applied-AI identity strings with the shared full-stack identity and corresponding descriptive copy.                                                                                                                                                                                                                                                                 |
| [PDF generator](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/scripts/build-resume-pdf.ts)                                                                                                                                                                                                                                                                                                  | Update hardcoded PDF keywords as needed; generate the Typst/PDF from the approved résumé data. Do not manually patch generated résumé text.                                                                                                                                                                                                                                              |
| [Typst workflow](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/career/typst/README.md)                                                                                                                                                                                                                                                                                                      | Keep the current workflow. [Generated Typst](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/career/generated/sid-jain-resume-dark.typ) and [public PDF](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/public/resume/sid-jain-resume.pdf) are outputs to regenerate and inspect.                                                                                                       |
| [Memorang draft](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/content/blog/from-jsonb-filters-to-self-querying-media-search/page.mdx), [Texts draft](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/content/blog/facebook-messenger-protocol-stack/page.mdx), and [Veera draft](/home/sid/.codex/worktrees/a6dd/f0rr0.github.io/src/content/blog/building-veera-browser/page.mdx) | Review factual scope with Sid before publication. Preserve genuine prototype limitations and distinguish them from production outcomes.                                                                                                                                                                                                                                                  |

### One non-obvious dependency

The old site identity helper and résumé exporter inferred company founding from a role-title regex. Remove both inferences; Sid explicitly does not want a company-founder claim. The existing experience structure needs only an optional display name: “Product engineering engagements” for the visible heading, “Yuppies Tech” for contracting-company attribution, and “Self-employed” for the arrangement. Do not serialize the heading as a fictitious employer.

### LinkedIn follow-through

Website/résumé are the first implementation scope. Later, carry the same headline, dates, role boundaries, team counts, and company/client structure to LinkedIn. Its Featured section should link to public evidence, not unpublished local drafts. The available public LinkedIn view was limited; the entire logged-in Experience section has not been audited. Request an export or pasted sections before declaring LinkedIn fully reconciled. No LinkedIn changes are made by this blueprint.

## 9. Next steps and acceptance checks

### Implementation decision

The direction is approved for implementation, including **Product engineering engagements**, no company-founder claim, and full-stack-first positioning. Apply the word-economy standard throughout: concrete contributions, no redundant slogan, no career recap in the summary, and no internal naming anywhere in this document.

The following questions can wait for the relevant case study and do not block factual cleanup:

- Namefi migration: which parts did collaborators own, why was the change needed, and what were its important constraints or sequencing decisions?
- Studio: what were the actual generation strategies and cost/quality decision rules?
- Memorang: what changed between the early experiments and the implementation shipped in the CMS?
- Yuppies: what did the 15-engineer figure count, and over what period?
- Metrics: which existing before/after results have records or a reproducible explanation?

Do not ask again whether Namefi's architecture work covered both migration and foundations, whether Memorang search shipped, whether GraphJS was involved, or whether Kult used Kotlin Multiplatform: Sid has answered those.

### Then: apply a small, consistent content change

1. Apply approved copy and confirmed corrections to the existing résumé data and hardcoded identity/export strings.
2. Keep employment titles, self-employed engagement headings, functional scope, and overall target identity distinct. Do not replace accurate titles with AI or executive labels for narrative symmetry, or turn selected engagements into fictional direct-employment entries.
3. Regenerate the PDF through the existing script and check the result alongside the website and machine-readable exports.
4. Curate selected work in the existing homepage structure. Keep substantive article rewrites/publication as a separate, reviewed step.

### Acceptance checks for that implementation

- Homepage, résumé, metadata, footer, social image, JSON résumé, `/llms.txt`, and PDF describe the same full-stack-first profile.
- Namefi describes the monorepo migration, application foundations, and non-AI full-stack work in reader-facing terms; metering is described as an engineering contribution.
- Memorang includes CMS services/UI, design-system/data-grid work, shipped retrieval, and two other engineers.
- Kult consistently says 10 engineers and native Kotlin/Swift, with no Kotlin Multiplatform or company-wide VP/backend claims.
- The independent period is visibly self-employed, with named engagements and concrete contributions. Yuppies remains secondary contracting-company attribution, not the summary or primary heading; clients are not presented as direct employers. No company-founder claim is exported.
- Excluded topics and unsupported metrics do not leak through deep dives, AI prompts, structured data, tags, or generated files.
- Draft articles remain drafts until their evidence and publication scope are reviewed.
- Run relevant existing formatting, type-check, lint, and tests for the actual files changed; regenerate and inspect the selectable-text PDF for page breaks, clipping, and hierarchy.
- Do not use the repository's default `build` script as a casual local check: it includes production database migration and cron configuration. Use non-mutating/local validation paths for this content work.

Implementation updates the local website source and generated résumé, not LinkedIn or public deployment. Blog drafts still require their own factual and publication review.
