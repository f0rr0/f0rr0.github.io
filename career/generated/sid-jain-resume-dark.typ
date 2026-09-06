#set document(
  title: "Sid Jain Resume",
  author: "Sid Jain",
  keywords: (
    "Senior Full-Stack Engineer",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Next.js",
    "Hono",
    "Redis",
    "AWS CDK",
    "React Native",
    "Vercel AI SDK",
    "Mastra",
    "LangGraph",
    "LangChain",
    "Temporal",
    "Trigger.dev",
    "Chromium",
    "CI/CD",
  ),
)
#set page(
  paper: "us-legal",
  margin: 0.58in,
  fill: rgb("#1a1918"),
)
#set text(font: "Source Sans 3", size: 10pt, fill: rgb("#a8a29e"), lang: "en")
#set par(leading: 0.625em, justify: false)

#let background = rgb("#1a1918")
#let strong = rgb("#e7e5e4")
#let muted = rgb("#a8a29e")
#let accent = rgb("#d97706")
#let rule-color = rgb("#3a3836")
#let t(
  s,
  fill: muted,
  font: "Source Sans 3",
  size: 10pt,
  weight: "regular",
  style: "normal",
  kerning: true,
) = text(
  font: font,
  fill: fill,
  size: size,
  weight: weight,
  style: style,
  kerning: kerning,
  s,
)
#let logo-tile(
  path,
  fill: background,
  size: 30pt,
  image-width: 21pt,
  image-height: 15pt,
  dy: 0pt,
) = rect(
  width: size,
  height: size,
  radius: size / 2,
  fill: fill,
  stroke: 0.75pt + rule-color,
)[#align(center + horizon)[#move(dy: dy)[#image(
  path,
  width: image-width,
  height: image-height,
  fit: "contain",
)]]]
#let profile-photo(path, size: 36pt) = image(
  path,
  width: size,
  height: size,
  fit: "contain",
)

#align(left)[
  #grid(
    columns: (36pt, auto, 1fr),
    gutter: 12pt,
    align: top,
    [#profile-photo("/public/resume/sid-jain-profile-avatar.png")],
    [#box(height: 36pt)[#align(left + horizon)[#t(
      "Sid Jain ",
      fill: strong,
      font: "Literata",
      size: 36pt,
      weight: "bold",
      style: "normal",
    )]]],
    [#align(right)[#box(height: 36pt)[#align(right + horizon)[#box(
      height: 32pt,
    )[
      #set par(leading: 0.422em)
      #align(right)[
        #link("mailto:sid_26@outlook.com")[#t(
          " sid_26@outlook.com",
          fill: accent,
          font: "Source Sans 3",
          size: 7.5pt,
          weight: "medium",
          style: "normal",
        )]
        #linebreak()
        #link("https://linkedin.com/in/f0rr0")[#t(
          "linkedin.com/in/f0rr0",
          fill: accent,
          font: "Source Sans 3",
          size: 7.5pt,
          weight: "medium",
          style: "normal",
        )]
        #linebreak()
        #link("https://github.com/f0rr0")[#t(
          "github.com/f0rr0",
          fill: accent,
          font: "Source Sans 3",
          size: 7.5pt,
          weight: "medium",
          style: "normal",
        )]
      ]
    ]]]]],
  )
  #v(3pt)
  #block[
    #set par(leading: 0.625em)
    #t(
      "Senior full-stack engineer based in Mumbai with 10+ years in web and mobile. Built Namefi's AI buyer-research workflow, cutting days of manual work to about five minutes per domain, and Memorang's CMS backend and editing interface.",
      fill: muted,
      font: "Source Sans 3",
      size: 10pt,
      weight: "regular",
      style: "normal",
    )
  ]


  #v(6pt)
  #t(
    "Skills",
    fill: strong,
    font: "Literata",
    size: 15pt,
    weight: "bold",
    style: "normal",
  )
  #v(3pt)

  #block[
    #set par(leading: 0.625em)
    #t(
      "TypeScript · React · Node.js · PostgreSQL · Next.js · Hono · Redis · AWS CDK · React Native · Vercel AI SDK · Mastra · LangGraph · LangChain · Temporal · Trigger.dev · Chromium · CI/CD",
      fill: muted,
      font: "Source Sans 3",
      size: 10pt,
      weight: "regular",
      style: "normal",
    )
  ]


  #block(breakable: false)[

    #v(6pt)
    #t(
      "Experience",
      fill: strong,
      font: "Literata",
      size: 15pt,
      weight: "bold",
      style: "normal",
    )
    #v(9pt)


    #block(breakable: false)[
      #grid(
        columns: (30pt, 1fr),
        gutter: 12pt,
        align: top,
        [#move(dy: -0.75pt)[#logo-tile(
          "/public/resume/logos/namefi.png",
          fill: rgb("#0f1714"),
          size: 30pt,
          image-width: 21pt,
          image-height: 15pt,
          dy: 0pt,
        )]],
        [
          #grid(
            columns: (auto, auto),
            gutter: 5pt,
            align: horizon,
            [#t(
              "Namefi",
              fill: strong,
              font: "Literata",
              size: 12pt,
              weight: "bold",
              style: "normal",
              kerning: false,
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#242220"),
              stroke: 0.75pt + rgb("#57534e"),
            )[#t(
              "Early-stage",
              fill: rgb("#c7c2bd"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )
          #v(-3.75pt)
          #t(
            "ICANN-accredited registrar building AI products for domain ownership and sales.",
            fill: muted,
            font: "Source Sans 3",
            size: 9pt,
            weight: "regular",
            style: "italic",
          )

          #v(3pt)
          #grid(
            columns: (1fr, auto),
            gutter: 12pt,
            [#grid(
              columns: (auto, auto),
              gutter: 4pt,
              align: horizon,
              [#t(
                "Senior Full Stack Engineer",
                fill: strong,
                font: "Source Sans 3",
                size: 10pt,
                weight: "medium",
                style: "normal",
              )],
              [#box(
                inset: (x: 4pt, y: 3pt),
                radius: 8pt,
                fill: rgb("#2d2418"),
                stroke: 0.75pt + rgb("#9a6a2b"),
              )[#t(
                "Hands-on",
                fill: rgb("#f0b85f"),
                font: "Source Sans 3",
                size: 7.5pt,
                weight: "medium",
                style: "normal",
              )]],
            )],
            [#t(
              "Mumbai / Remote · Jan 2025 - Present",
              fill: muted,
              font: "Source Sans 3",
              size: 8.25pt,
              weight: "regular",
              style: "normal",
            )],
          )

          #v(2.25pt)

          #grid(
            columns: (6pt, 1fr),
            gutter: 6pt,
            align: top,
            [#t(
              "·",
              fill: accent,
              font: "Source Sans 3",
              size: 10pt,
              weight: "bold",
              style: "normal",
            )],
            [#t(
              "Built Namefi Outbound, an AI tool that finds potential domain buyers and their contact details, then drafts outreach messages. Reduced this work from days to about five minutes per domain.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
          )
          #v(1.5pt)

          #grid(
            columns: (6pt, 1fr),
            gutter: 6pt,
            align: top,
            [#t(
              "·",
              fill: accent,
              font: "Source Sans 3",
              size: 10pt,
              weight: "bold",
              style: "normal",
            )],
            [#t(
              "Led migration to a new monorepo with Next.js, Hono, and shared developer tooling. Built server-rendered and statically generated pages, Privy/wallet authentication, domain registration, checkout, and payment integrations.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
          )
          #v(1.5pt)

          #grid(
            columns: (6pt, 1fr),
            gutter: 6pt,
            align: top,
            [#t(
              "·",
              fill: accent,
              font: "Source Sans 3",
              size: 10pt,
              weight: "bold",
              style: "normal",
            )],
            [#t(
              "Replaced Airflow with Temporal for domain operations; built Temporal workflows for listing ingestion and Namefi Studio's logo and video generation.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
          )
          #v(1.5pt)

          #grid(
            columns: (6pt, 1fr),
            gutter: 6pt,
            align: top,
            [#t(
              "·",
              fill: accent,
              font: "Source Sans 3",
              size: 10pt,
              weight: "bold",
              style: "normal",
            )],
            [#t(
              "Used traces and evals to reduce repeated buyer searches through progressive model escalation and shared evidence; reused completed model results on retry to avoid duplicate spend.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
          )
          #v(1.5pt)

          #grid(
            columns: (6pt, 1fr),
            gutter: 6pt,
            align: top,
            [#t(
              "·",
              fill: accent,
              font: "Source Sans 3",
              size: 10pt,
              weight: "bold",
              style: "normal",
            )],
            [#t(
              "Built an internal analytics agent with Vercel AI SDK tools for Google Analytics, Twitter Analytics, and PostHog; integrated Exa search. Developed AI usage metering.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
          )

        ],
      )
    ]

  ]
  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/memorang.png",
        fill: rgb("#ffffff"),
        size: 30pt,
        image-width: 21pt,
        image-height: 15pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: (auto, auto),
          gutter: 5pt,
          align: horizon,
          [#t(
            "Memorang",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
          [#box(
            inset: (x: 4pt, y: 3pt),
            radius: 8pt,
            fill: rgb("#242220"),
            stroke: 0.75pt + rgb("#57534e"),
          )[#t(
            "Growth-stage",
            fill: rgb("#c7c2bd"),
            font: "Source Sans 3",
            size: 7.5pt,
            weight: "medium",
            style: "normal",
          )]],
        )
        #v(-3.75pt)
        #t(
          "AI-assisted educational content platform for structured curricula and assessments.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Lead Full Stack Engineer",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2a2429"),
              stroke: 0.75pt + rgb("#7a6171"),
            )[#t(
              "Leadership",
              fill: rgb("#e3bfd7"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Mumbai / Remote · Apr 2024 - Jan 2025",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Built EdWrite's CMS backend, TanStack Table data grid, and shared UI components with designers.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Versioned content schemas so exam formats could evolve without breaking client apps or services; defined TOEFL schemas with ETS subject-matter experts.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Shipped a media recommender using embeddings and pgvector similarity search, with LangChain self-querying to generate metadata filters from natural-language queries.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Built AI-assisted question, audio, and image generation with expert review and publishing approval.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Led two CMS engineers and a Flow-to-TypeScript migration using codemods and AI-assisted refactoring.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/yuppies.png",
        fill: rgb("#171220"),
        size: 30pt,
        image-width: 21pt,
        image-height: 12pt,
        dy: 0.75pt,
      )]],
      [
        #grid(
          columns: auto,
          gutter: 5pt,
          align: horizon,
          [#t(
            "Product engineering engagements",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
        )
        #v(-3.75pt)
        #t(
          "Client work through Yuppies Tech.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Self-employed",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2a2429"),
              stroke: 0.75pt + rgb("#7a6171"),
            )[#t(
              "Leadership",
              fill: rgb("#e3bfd7"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Mumbai / Remote · Jan 2021 - Apr 2024",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(2.25pt)
        #t(
          "Full-stack and mobile engineering with client product teams and their CTOs or engineering leads.",
          fill: muted,
          font: "Source Sans 3",
          size: 10pt,
          weight: "regular",
          style: "normal",
        )
        #v(2.25pt)

        #grid(
          columns: (21pt, 1fr),
          gutter: 7.5pt,
          align: top,
          [#move(dy: -0.5pt)[#logo-tile(
            "/public/resume/logos/veera.png",
            fill: rgb("#111111"),
            size: 21pt,
            image-width: 15pt,
            image-height: 12pt,
            dy: 0.75pt,
          )]],
          [#t(
              "Veera Browser: ",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )#t(
              "led a Chromium-based Android browser through Play Store launch, maintaining C++ and Java patches, upstream updates, and release tooling. Later established the iOS platform and release setup.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
        )
        #v(1.5pt)

        #grid(
          columns: (21pt, 1fr),
          gutter: 7.5pt,
          align: top,
          [#move(dy: -0.5pt)[#logo-tile(
            "/public/resume/logos/texts-icon.png",
            fill: rgb("#f3f6ff"),
            size: 21pt,
            image-width: 15pt,
            image-height: 15pt,
            dy: 0pt,
          )]],
          [#t(
              "Texts: ",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )#t(
              "shipped the Facebook Messenger integration in TypeScript and Electron; reverse-engineered Messenger's undocumented interfaces and implemented MQTT transport, typed Thrift codecs, message synchronization, and media handling.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
        )
        #v(1.5pt)

        #grid(
          columns: (21pt, 1fr),
          gutter: 7.5pt,
          align: top,
          [#move(dy: -0.5pt)[#logo-tile(
            "/public/resume/logos/zebpay-mark.png",
            fill: rgb("#12202a"),
            size: 21pt,
            image-width: 15pt,
            image-height: 15pt,
            dy: 0pt,
          )]],
          [#t(
              "ZebPay: ",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )#t(
              "modernized iOS and Android apps and release pipelines; shipped exchange and payment features, wallet integrations, and country-specific KYC.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
        )
        #v(1.5pt)

        #grid(
          columns: (21pt, 1fr),
          gutter: 7.5pt,
          align: top,
          [#move(dy: -0.5pt)[#logo-tile(
            "/public/resume/logos/mitsubishi-mark.png",
            fill: rgb("#211816"),
            size: 21pt,
            image-width: 15pt,
            image-height: 12pt,
            dy: -1.5pt,
          )]],
          [#t(
              "Mitsubishi Motors: ",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )#t(
              "built MiAR's native iOS and iPadOS apps and React WebAR experience, optimizing 3D vehicle assets for mobile devices and building photo-contest tooling.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
        )
        #v(1.5pt)

        #grid(
          columns: (21pt, 1fr),
          gutter: 7.5pt,
          align: top,
          [#move(dy: -0.5pt)[#logo-tile(
            "/public/resume/logos/airbus.png",
            fill: rgb("#17213a"),
            size: 21pt,
            image-width: 15pt,
            image-height: 6pt,
            dy: 0pt,
          )]],
          [#t(
              "Airbus Tripset: ",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )#t(
              "built the React Native app and backend integrating Airbus and Amadeus APIs, travel guidance, itineraries, and notifications, with Milkinside as design partner.",
              fill: muted,
              font: "Source Sans 3",
              size: 10pt,
              weight: "regular",
              style: "normal",
            )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/kult.png",
        fill: rgb("#211722"),
        size: 30pt,
        image-width: 21pt,
        image-height: 9pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: (auto, auto),
          gutter: 5pt,
          align: horizon,
          [#t(
            "Kult",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
          [#box(
            inset: (x: 4pt, y: 3pt),
            radius: 8pt,
            fill: rgb("#242220"),
            stroke: 0.75pt + rgb("#57534e"),
          )[#t(
            "0 → 1",
            fill: rgb("#c7c2bd"),
            font: "Source Sans 3",
            size: 7.5pt,
            weight: "medium",
            style: "normal",
          )]],
        )
        #v(-3.75pt)
        #t(
          "Consumer beauty and skincare commerce.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Head of Mobile Engineering",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2a2429"),
              stroke: 0.75pt + rgb("#7a6171"),
            )[#t(
              "Leadership",
              fill: rgb("#e3bfd7"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Mumbai · Jan 2020 - Jan 2021",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Led 10 mobile engineers building native Android and iOS apps in Kotlin and Swift, working with product and interaction designers.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Designed backend-driven UI architecture for dynamic layouts and rich animations; built and optimized product-listing and product-detail screens.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Defined API contracts with backend engineers and established mobile CI/CD, analytics, deep linking, and error monitoring.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/yilu.png",
        fill: rgb("#101827"),
        size: 30pt,
        image-width: 21pt,
        image-height: 12pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: (auto, auto),
          gutter: 5pt,
          align: horizon,
          [#t(
            "Yilu",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
          [#box(
            inset: (x: 4pt, y: 3pt),
            radius: 8pt,
            fill: rgb("#242220"),
            stroke: 0.75pt + rgb("#57534e"),
          )[#t(
            "0 → 1",
            fill: rgb("#c7c2bd"),
            font: "Source Sans 3",
            size: 7.5pt,
            weight: "medium",
            style: "normal",
          )]],
        )
        #v(-3.75pt)
        #t(
          "Smart travel platform built for Lufthansa Group with BCG Digital Ventures.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Founding Engineer",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2a2429"),
              stroke: 0.75pt + rgb("#7a6171"),
            )[#t(
              "Leadership",
              fill: rgb("#e3bfd7"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Berlin · Nov 2018 - Dec 2019",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Designed the native mobile architecture and release automation, built Terraform-managed AWS infrastructure, and shipped iOS and Android features for Eurowings.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Joined as the first engineering hire; led a five-developer full-stack team and partnered with the CTO on hiring.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/8fit.png",
        fill: rgb("#102018"),
        size: 30pt,
        image-width: 21pt,
        image-height: 15pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: (auto, auto),
          gutter: 5pt,
          align: horizon,
          [#t(
            "8fit",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
          [#box(
            inset: (x: 4pt, y: 3pt),
            radius: 8pt,
            fill: rgb("#242220"),
            stroke: 0.75pt + rgb("#57534e"),
          )[#t(
            "Growth-stage",
            fill: rgb("#c7c2bd"),
            font: "Source Sans 3",
            size: 7.5pt,
            weight: "medium",
            style: "normal",
          )]],
        )
        #v(-3.75pt)
        #t(
          "Fitness and nutrition platform later acquired by Withings.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Senior Software Engineer",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Berlin · Nov 2017 - Oct 2018",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Architected a hybrid Apple TV fitness app.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Built cross-platform mobile features across JavaScript, Swift, Objective-C, Java, and Kotlin.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/housing-mini.png",
        fill: rgb("#ffdf30"),
        size: 30pt,
        image-width: 21pt,
        image-height: 30pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: (auto, auto),
          gutter: 5pt,
          align: horizon,
          [#t(
            "Housing",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
          [#box(
            inset: (x: 4pt, y: 3pt),
            radius: 8pt,
            fill: rgb("#242220"),
            stroke: 0.75pt + rgb("#57534e"),
          )[#t(
            "Late-stage",
            fill: rgb("#c7c2bd"),
            font: "Source Sans 3",
            size: 7.5pt,
            weight: "medium",
            style: "normal",
          )]],
        )
        #v(-3.75pt)
        #t(
          "Indian real estate search and transaction platform.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Software Development Engineer II",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Mumbai · Oct 2016 - Oct 2017",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Led Housing's React Native app architecture, sharing JavaScript across iOS and Android.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Designed its state management, reactive data flows, offline persistence, and component-driven UI. Also built automated testing and release systems covering diagnostics, signed builds, beta distribution, and over-the-air updates.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Contributed to Housing.com's Progressive Web App for users on slow and inconsistent network connections.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]

  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/bridg.png",
        fill: rgb("#211916"),
        size: 30pt,
        image-width: 21pt,
        image-height: 12pt,
        dy: 0.75pt,
      )]],
      [
        #grid(
          columns: auto,
          gutter: 5pt,
          align: horizon,
          [#t(
            "Earlier Consulting and Startup Work",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
        )
        #v(-3.75pt)
        #t(
          "Bridg, 1mg, HornOk, Volkno, Meriad, and self-employed work.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: (auto, auto),
            gutter: 4pt,
            align: horizon,
            [#t(
              "Software Engineer and Consultant",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
            [#box(
              inset: (x: 4pt, y: 3pt),
              radius: 8pt,
              fill: rgb("#2d2418"),
              stroke: 0.75pt + rgb("#9a6a2b"),
            )[#t(
              "Hands-on",
              fill: rgb("#f0b85f"),
              font: "Source Sans 3",
              size: 7.5pt,
              weight: "medium",
              style: "normal",
            )]],
          )],
          [#t(
            "Los Angeles / India · 2015 - 2016",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )

        #v(2.25pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Built web and mobile products for email and customer-data tools, real-time medical consultations, and connected fleet management using JavaScript, Java, and Ruby on Rails.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )
        #v(1.5pt)

        #grid(
          columns: (6pt, 1fr),
          gutter: 6pt,
          align: top,
          [#t(
            "·",
            fill: accent,
            font: "Source Sans 3",
            size: 10pt,
            weight: "bold",
            style: "normal",
          )],
          [#t(
            "Mentored 1mg's mobile team on hybrid app architecture and modern development tooling.",
            fill: muted,
            font: "Source Sans 3",
            size: 10pt,
            weight: "regular",
            style: "normal",
          )],
        )

      ],
    )
  ]




  #block(breakable: false)[

    #v(24pt)
    #t(
      "Education",
      fill: strong,
      font: "Literata",
      size: 15pt,
      weight: "bold",
      style: "normal",
    )
    #v(9pt)


    #block(breakable: false)[
      #grid(
        columns: (30pt, 1fr),
        gutter: 12pt,
        align: top,
        [#move(dy: -0.75pt)[#logo-tile(
          "/public/resume/logos/ucla.png",
          fill: rgb("#2774ae"),
          size: 30pt,
          image-width: 21pt,
          image-height: 9pt,
          dy: 0pt,
        )]],
        [
          #grid(
            columns: auto,
            gutter: 5pt,
            align: horizon,
            [#t(
              "University of California, Los Angeles",
              fill: strong,
              font: "Literata",
              size: 12pt,
              weight: "bold",
              style: "normal",
              kerning: false,
            )],
          )
          #v(-3.75pt)
          #t(
            "Bachelor of Science.",
            fill: muted,
            font: "Source Sans 3",
            size: 9pt,
            weight: "regular",
            style: "italic",
          )

          #v(3pt)
          #grid(
            columns: (1fr, auto),
            gutter: 12pt,
            [#grid(
              columns: auto,
              gutter: 4pt,
              align: horizon,
              [#t(
                "Computer Science and Engineering",
                fill: strong,
                font: "Source Sans 3",
                size: 10pt,
                weight: "medium",
                style: "normal",
              )],
            )],
            [#t(
              "Los Angeles, CA · 2013 - 2016",
              fill: muted,
              font: "Source Sans 3",
              size: 8.25pt,
              weight: "regular",
              style: "normal",
            )],
          )



        ],
      )
    ]

  ]
  #v(9pt)

  #block(breakable: false)[
    #grid(
      columns: (30pt, 1fr),
      gutter: 12pt,
      align: top,
      [#move(dy: -0.75pt)[#logo-tile(
        "/public/resume/logos/dps-rk-puram.png",
        fill: rgb("#016b2f"),
        size: 30pt,
        image-width: 21pt,
        image-height: 27pt,
        dy: 0pt,
      )]],
      [
        #grid(
          columns: auto,
          gutter: 5pt,
          align: horizon,
          [#t(
            "Delhi Public School, R. K. Puram",
            fill: strong,
            font: "Literata",
            size: 12pt,
            weight: "bold",
            style: "normal",
            kerning: false,
          )],
        )
        #v(-3.75pt)
        #t(
          "High School.",
          fill: muted,
          font: "Source Sans 3",
          size: 9pt,
          weight: "regular",
          style: "italic",
        )

        #v(3pt)
        #grid(
          columns: (1fr, auto),
          gutter: 12pt,
          [#grid(
            columns: auto,
            gutter: 4pt,
            align: horizon,
            [#t(
              "Computer Science, Physics, Chemistry, Math",
              fill: strong,
              font: "Source Sans 3",
              size: 10pt,
              weight: "medium",
              style: "normal",
            )],
          )],
          [#t(
            "New Delhi, India · 2011 - 2013",
            fill: muted,
            font: "Source Sans 3",
            size: 8.25pt,
            weight: "regular",
            style: "normal",
          )],
        )



      ],
    )
  ]


]
