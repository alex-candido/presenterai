tree src/
src/
├── actions
│   ├── auth-actions.ts
│   ├── document-actions.ts
│   ├── generation-actions.ts
│   ├── presentation-actions.ts
│   └── user-actions.ts
├── app
│   ├── (admin)
│   │   └── admin
│   │       ├── layout.tsx
│   │       └── (routes)
│   │           ├── dashboard
│   │           │   └── page.tsx
│   │           ├── documents
│   │           │   ├── [id]
│   │           │   │   ├── edit
│   │           │   │   │   └── page.tsx
│   │           │   │   └── page.tsx
│   │           │   ├── new
│   │           │   │   └── page.tsx
│   │           │   └── page.tsx
│   │           ├── generations
│   │           │   ├── [id]
│   │           │   │   ├── edit
│   │           │   │   │   └── page.tsx
│   │           │   │   └── page.tsx
│   │           │   ├── new
│   │           │   │   └── page.tsx
│   │           │   └── page.tsx
│   │           ├── presentations
│   │           │   ├── [id]
│   │           │   │   ├── edit
│   │           │   │   │   └── page.tsx
│   │           │   │   └── page.tsx
│   │           │   ├── new
│   │           │   │   └── page.tsx
│   │           │   └── page.tsx
│   │           ├── settings
│   │           │   ├── account
│   │           │   │   └── page.tsx
│   │           │   ├── appearance
│   │           │   │   └── page.tsx
│   │           │   ├── notifications
│   │           │   │   └── page.tsx
│   │           │   └── profile
│   │           │       └── page.tsx
│   │           └── users
│   │               ├── [id]
│   │               │   ├── edit
│   │               │   │   └── page.tsx
│   │               │   └── page.tsx
│   │               ├── new
│   │               │   └── page.tsx
│   │               └── page.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...all]
│   │   │       └── route.ts
│   │   └── v1
│   │       ├── dashboard
│   │       │   └── route.ts
│   │       ├── documents
│   │       │   ├── [id]
│   │       │   │   └── route.ts
│   │       │   ├── metrics
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       ├── generations
│   │       │   ├── [id]
│   │       │   │   └── route.ts
│   │       │   ├── metrics
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       ├── presentations
│   │       │   ├── [id]
│   │       │   │   └── route.ts
│   │       │   ├── metrics
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       └── users
│   │           ├── [id]
│   │           │   └── route.ts
│   │           ├── metrics
│   │           │   └── route.ts
│   │           └── route.ts
│   ├── (app)
│   │   └── app
│   │       ├── layout.tsx
│   │       └── (routes)
│   │           ├── documents
│   │           │   └── page.tsx
│   │           ├── generate
│   │           │   └── [id]
│   │           │       └── page.tsx
│   │           ├── page.tsx
│   │           ├── presentations
│   │           │   └── [id]
│   │           │       └── page.tsx
│   │           └── settings
│   │               ├── account
│   │               │   └── page.tsx
│   │               └── profile
│   │                   └── page.tsx
│   ├── (auth)
│   │   └── auth
│   │       ├── layout.tsx
│   │       └── (routes)
│   │           ├── forgot-password
│   │           │   └── page.tsx
│   │           ├── reset-password
│   │           │   └── page.tsx
│   │           ├── sign-in
│   │           │   └── page.tsx
│   │           └── sign-up
│   │               └── page.tsx
│   ├── favicon.ico
│   ├── global-error.tsx
│   ├── global-not-found.tsx
│   ├── (landing)
│   │   └── landing
│   │       ├── layout.tsx
│   │       └── (routes)
│   │           ├── docs
│   │           │   ├── layout.tsx
│   │           │   └── [slug]
│   │           │       └── page.tsx
│   │           ├── legal
│   │           │   ├── layout.tsx
│   │           │   └── [slug]
│   │           │       └── page.tsx
│   │           └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── base
│   │   ├── base-hero.tsx
│   │   ├── base-logo.tsx
│   │   └── index.ts
│   ├── custom
│   │   └── index.ts
│   ├── emails
│   │   ├── index.ts
│   │   ├── reset-email.tsx
│   │   └── verification-email.tsx
│   ├── layouts
│   │   ├── index.ts
│   │   ├── layout-app.tsx
│   │   ├── layout-aside.tsx
│   │   ├── layout-container.tsx
│   │   ├── layout-footer.tsx
│   │   ├── layout-header.tsx
│   │   ├── layout-main.tsx
│   │   ├── layout-nav-end.tsx
│   │   └── layout-nav-start.tsx
│   ├── pages
│   │   ├── admin
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard-documents-summary-section.tsx
│   │   │   │   ├── dashboard-generations-summary-section.tsx
│   │   │   │   ├── dashboard-header.tsx
│   │   │   │   ├── dashboard-presentations-summary-section.tsx
│   │   │   │   ├── dashboard-recent-activity-section.tsx
│   │   │   │   ├── dashboard-stats-section.tsx
│   │   │   │   ├── dashboard-user-summary-section.tsx
│   │   │   │   └── index.ts
│   │   │   ├── documents
│   │   │   │   ├── documents-details.tsx
│   │   │   │   ├── documents-form.tsx
│   │   │   │   ├── documents-header.tsx
│   │   │   │   ├── documents-list-section.tsx
│   │   │   │   ├── documents-stats-section.tsx
│   │   │   │   └── index.ts
│   │   │   ├── generate
│   │   │   │   ├── generate-details.tsx
│   │   │   │   ├── generate-form.tsx
│   │   │   │   ├── generate-header.tsx
│   │   │   │   ├── generate-list-section.tsx
│   │   │   │   ├── generate-stats-section.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout
│   │   │   │   ├── admin-layout-aside.tsx
│   │   │   │   ├── admin-layout-footer.tsx
│   │   │   │   ├── admin-layout-header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── presentations
│   │   │   │   ├── index.ts
│   │   │   │   ├── presentations-details.tsx
│   │   │   │   ├── presentations-Form.tsx
│   │   │   │   ├── presentations-header.tsx
│   │   │   │   ├── presentations-list-section.tsx
│   │   │   │   └── presentations-stats-section.tsx
│   │   │   ├── settings
│   │   │   │   ├── account
│   │   │   │   │   ├── admin-settings-account-header.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── appearance
│   │   │   │   │   ├── admin-settings-appearence-header.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── notifications
│   │   │   │   │   ├── admin-settings-notifications-header.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── profile
│   │   │   │       ├── admin-settings-profile-header.tsx
│   │   │   │       └── index.ts
│   │   │   └── users
│   │   │       ├── index.ts
│   │   │       ├── users-details.tsx
│   │   │       ├── users-Form.tsx
│   │   │       ├── users-header.tsx
│   │   │       ├── users-list-section.tsx
│   │   │       └── users-stats-section.tsx
│   │   ├── app
│   │   │   ├── documents
│   │   │   │   ├── app-documents-header.tsx
│   │   │   │   ├── app-documents-item.tsx
│   │   │   │   ├── app-documents-list.tsx
│   │   │   │   ├── app-documents-toolbar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── generate
│   │   │   │   ├── app-generate-header.tsx
│   │   │   │   ├── app-generate-outline-panel.tsx
│   │   │   │   ├── app-generate-settings-panel.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout
│   │   │   │   ├── app-layout-aside.tsx
│   │   │   │   ├── app-layout-footer.tsx
│   │   │   │   ├── app-layout-header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── presentations
│   │   │   │   ├── app-presentations-header.tsx
│   │   │   │   ├── app-presentations-sidebar.tsx
│   │   │   │   ├── app-presentations-tools.tsx
│   │   │   │   ├── app-presentations-workspace.tsx
│   │   │   │   └── index.ts
│   │   │   ├── root
│   │   │   │   ├── app-form-controls.tsx
│   │   │   │   ├── app-form-header.tsx
│   │   │   │   ├── app-form-input.tsx
│   │   │   │   ├── app-form-mode.tsx
│   │   │   │   ├── app-form.tsx
│   │   │   │   ├── app-header.tsx
│   │   │   │   ├── app-recents.tsx
│   │   │   │   ├── app-suggestions.tsx
│   │   │   │   └── index.ts
│   │   │   └── settings
│   │   │       ├── account
│   │   │       │   ├── app-settings-account-header.tsx
│   │   │       │   └── index.ts
│   │   │       └── profile
│   │   │           ├── app-settings-profile-header.tsx
│   │   │           └── index.ts
│   │   ├── auth
│   │   │   ├── forgot-password
│   │   │   │   ├── forgot-password-form.tsx
│   │   │   │   ├── forgot-password-section.tsx
│   │   │   │   ├── forgot-password-success.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout
│   │   │   │   ├── auth-layout-background.tsx
│   │   │   │   ├── auth-layout-header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── reset-password
│   │   │   │   ├── index.ts
│   │   │   │   ├── reset-password-form.tsx
│   │   │   │   ├── reset-password-section.tsx
│   │   │   │   └── reset-password-success.tsx
│   │   │   ├── root
│   │   │   │   ├── auth-hero.tsx
│   │   │   │   ├── auth-social-buttons.tsx
│   │   │   │   └── index.ts
│   │   │   ├── sign-in
│   │   │   │   ├── agree-terms-label.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── sign-in-form.tsx
│   │   │   │   └── sign-in-section.tsx
│   │   │   └── sign-up
│   │   │       ├── agree-terms-label.tsx
│   │   │       ├── index.ts
│   │   │       ├── sign-up-form.tsx
│   │   │       ├── sign-up-section.tsx
│   │   │       └── sign-up-success.tsx
│   │   ├── error
│   │   │   └── root
│   │   │       ├── index.ts
│   │   │       └── status-page.tsx
│   │   ├── landing
│   │   │   ├── docs
│   │   │   │   ├── layout
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── landing-docs-layout-header.tsx
│   │   │   │   │   └── landing-docs-layout-sidebar.tsx
│   │   │   │   └── root
│   │   │   │       ├── index.ts
│   │   │   │       └── landing-docs-content.tsx
│   │   │   ├── home
│   │   │   │   ├── index.ts
│   │   │   │   ├── landing-home-faq.tsx
│   │   │   │   ├── landing-home-features.tsx
│   │   │   │   ├── landing-home-hero.tsx
│   │   │   │   ├── landing-home-pricing.tsx
│   │   │   │   └── landing-home-testimonials.tsx
│   │   │   ├── layout
│   │   │   │   ├── index.ts
│   │   │   │   ├── landing-actions-menu.tsx
│   │   │   │   ├── landing-cta-menu.tsx
│   │   │   │   ├── landing-layout-footer.tsx
│   │   │   │   ├── landing-layout-header.tsx
│   │   │   │   ├── landing-mobile-menu.tsx
│   │   │   │   ├── landing-nav-menu.tsx
│   │   │   │   └── landing-user-menu.tsx
│   │   │   └── terms
│   │   │       └── root
│   │   │           ├── index.ts
│   │   │           ├── landing-terms-content.tsx
│   │   │           └── landing-terms-header.tsx
│   │   ├── loading
│   │   │   └── root
│   │   │       └── index.ts
│   │   └── not-found
│   │       └── root
│   │           └── index.ts
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── index.ts
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── config
│   ├── client-envs.ts
│   ├── endpoints.ts
│   ├── icons.ts
│   ├── messages.ts
│   ├── routes.ts
│   └── server-envs.ts
├── content
│   ├── docs
│   │   └── getting-started.mdx
│   └── legal
│       ├── privacy-policy.mdx
│       └── terms-of-service.mdx
├── hooks
│   ├── index.ts
│   ├── use-documents.ts
│   ├── use-form.ts
│   ├── use-generation.ts
│   ├── use-mobile.ts
│   ├── use-presentations.ts
│   └── use-users.ts
├── lib
│   ├── api
│   │   └── index.ts
│   └── utils
│       ├── cn.ts
│       ├── index.ts
│       └── proxy.ts
├── providers
│   ├── admin
│   │   ├── admin-dashboard-provider.tsx
│   │   ├── admin-documents-provider.tsx
│   │   ├── admin-generations-provider.tsx
│   │   ├── admin-presentations-provider.tsx
│   │   ├── admin-users-provider.tsx
│   │   └── index.ts
│   ├── app
│   │   ├── app-documents-provider.tsx
│   │   ├── app-generate-provider.tsx
│   │   ├── app-presentations-provider.tsx
│   │   ├── app-provider.tsx
│   │   └── index.ts
│   ├── auth
│   │   └── auth-sign-up-provider.tsx
│   ├── index.tsx
│   └── next
│       ├── index.ts
│       ├── react-query-provider.tsx
│       └── theme-provider.tsx
├── proxys
│   ├── admin.ts
│   ├── auth.ts
│   ├── docs.ts
│   ├── global.ts
│   ├── index.ts
│   └── legal.ts
├── proxy.ts
├── schemas
│   ├── auth-schema.ts
│   ├── document-schema.ts
│   ├── generation-schema.ts
│   ├── index.ts
│   ├── presentation-schema.ts
│   └── user-schema.ts
├── server
│   ├── auth
│   │   ├── client.ts
│   │   └── index.ts
│   ├── brevo
│   │   ├── index.ts
│   │   └── transactions.ts
│   ├── db
│   │   ├── document.ts
│   │   ├── generation.ts
│   │   ├── presentation.ts
│   │   └── user.ts
│   ├── mastra
│   │   ├── agents.ts
│   │   ├── client.ts
│   │   ├── prompts.ts
│   │   ├── tools.ts
│   │   └── workflows.ts
│   ├── prisma
│   │   └── index.ts
│   └── resend
│       └── index.ts
├── styles
│   └── globals.css
└── types
    ├── auth.d.ts
    ├── document.d.ts
    ├── generation.d.ts
    ├── presentation.d.ts
    └── user.d.ts

143 directories, 322 files