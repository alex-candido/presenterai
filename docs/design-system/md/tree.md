tree src/
src/
├── actions
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
│   │           │   └── page.tsx
│   │           ├── generations
│   │           │   ├── [id]
│   │           │   │   ├── edit
│   │           │   │   │   └── page.tsx
│   │           │   │   └── page.tsx
│   │           │   ├── new
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
│   │           ├── presentations
│   │           │   └── [id]
│   │           │       └── page.tsx
│   │           ├── settings
│   │           │   ├── account
│   │           │   │   └── page.tsx
│   │           │   └── profile
│   │           │       └── page.tsx
│   │           └── start
│   │               └── page.tsx
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
│   ├── (docs)
│   │   └── docs
│   │       ├── layout.tsx
│   │       └── [slug]
│   │           └── page.tsx
│   ├── favicon.ico
│   ├── global-error.tsx
│   ├── global-not-found.tsx
│   ├── (landing)
│   │   └── landing
│   │       ├── layout.tsx
│   │       └── (routes)
│   │           └── home
│   │               └── page.tsx
│   ├── layout.tsx
│   ├── (legal)
│   │   └── legal
│   │       ├── layout.tsx
│   │       └── [slug]
│   │           └── page.tsx
│   ├── loading.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── base
│   │   ├── base-dropdown-user-menu.tsx
│   │   ├── base-hero.tsx
│   │   ├── base-logo.tsx
│   │   └── index.ts
│   ├── content
│   │   ├── docs
│   │   │   └── getting-started.mdx
│   │   └── legal
│   │       ├── privacy-policy.mdx
│   │       └── terms-of-service.mdx
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
│   │   ├── layout-bottom-banner.tsx
│   │   ├── layout-container.tsx
│   │   ├── layout-footer.tsx
│   │   ├── layout-header.tsx
│   │   ├── layout-main.tsx
│   │   ├── layout-nav-end.tsx
│   │   ├── layout-nav-start.tsx
│   │   ├── layout-section.tsx
│   │   └── layout-top-banner.tsx
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
│   │   │   ├── root
│   │   │   │   ├── admin-actions-menu.tsx
│   │   │   │   └── index.ts
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
│   │   │   │   ├── app-actions-menu.tsx
│   │   │   │   └── index.ts
│   │   │   ├── settings
│   │   │   │   ├── account
│   │   │   │   │   ├── app-settings-account-header.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── profile
│   │   │   │       ├── app-settings-profile-header.tsx
│   │   │   │       └── index.ts
│   │   │   └── start
│   │   │       ├── app-form-controls.tsx
│   │   │       ├── app-form-header.tsx
│   │   │       ├── app-form-input.tsx
│   │   │       ├── app-form-mode.tsx
│   │   │       ├── app-form-section.tsx
│   │   │       ├── app-header-section.tsx
│   │   │       ├── app-recents-section.tsx
│   │   │       ├── app-suggestions-section.tsx
│   │   │       └── index.ts
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
│   │   ├── docs
│   │   │   ├── layout
│   │   │   │   ├── docs-layout-header.tsx
│   │   │   │   ├── docs-layout-sidebar.tsx
│   │   │   │   └── index.ts
│   │   │   └── root
│   │   │       ├── docs-content.tsx
│   │   │       └── index.ts
│   │   ├── error
│   │   │   └── root
│   │   │       ├── index.ts
│   │   │       └── status-page.tsx
│   │   ├── landing
│   │   │   ├── home
│   │   │   │   ├── index.ts
│   │   │   │   ├── landing-home-faq.tsx
│   │   │   │   ├── landing-home-features.tsx
│   │   │   │   ├── landing-home-hero.tsx
│   │   │   │   ├── landing-home-pricing.tsx
│   │   │   │   └── landing-home-testimonials.tsx
│   │   │   ├── layout
│   │   │   │   ├── index.ts
│   │   │   │   ├── landing-layout-app-entry-banner.tsx
│   │   │   │   ├── landing-layout-footer.tsx
│   │   │   │   └── landing-layout-header.tsx
│   │   │   └── root
│   │   │       ├── index.ts
│   │   │       ├── landing-actions-menu.tsx
│   │   │       ├── landing-cta-menu.tsx
│   │   │       ├── landing-mobile-menu.tsx
│   │   │       └── landing-nav-menu.tsx
│   │   ├── loading
│   │   │   └── root
│   │   │       └── index.ts
│   │   ├── not-found
│   │   │   └── root
│   │   │       └── index.ts
│   │   └── terms
│   │       └── root
│   │           ├── index.ts
│   │           ├── terms-content.tsx
│   │           └── terms-header.tsx
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
├── hooks
│   ├── index.ts
│   ├── use-auth.ts
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
│   ├── auth.ts
│   ├── global.ts
│   └── index.ts
├── proxy.ts
├── schemas
│   ├── auth-schema.ts
│   ├── document-schema.ts
│   ├── generation-schema.ts
│   ├── index.ts
│   ├── presentation-schema.ts
│   ├── start-schema.ts
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

150 directories, 327 files