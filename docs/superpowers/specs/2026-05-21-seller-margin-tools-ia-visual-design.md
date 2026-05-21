# Seller Margin Tools Information Architecture and Visual Design

Date: 2026-05-21

## Decision

Use the "hub with calculator snapshot" direction for version 1.

The homepage should behave like a useful calculator immediately, while still introducing Seller Margin Tools as a broader ecommerce fee and profit calculator hub. The default market is the United States, with TikTok Shop as the strongest first calculator route. The page architecture must still support future UK, Canada, Australia, EU, and Southeast Asia rate configurations.

This design replaces the current ListingPilot AI demo dashboard with a public English utility site for cross-border sellers.

## Design Goals

- Make the first screen useful without asking users to read a landing page.
- Present Seller Margin Tools as a serious utility, not an AI product or SaaS dashboard.
- Support search intent for marketplace and payment fee calculators.
- Make default rates transparent, editable, dated, and source-linked.
- Keep the UI compact, trustworthy, and fast on mobile.
- Use a structure that can add more countries and marketplaces without redesigning the site.

## Homepage Structure

### Header

The homepage uses a public website header rather than a dashboard sidebar.

Header items:

- Logo: `Seller Margin Tools`
- Calculators
- Countries
- Fee Sources
- About
- Contact
- Region selector: `United States`

The region selector is part of the product context, not a language selector. It controls default fee assumptions, currency display, rate source links, and last-updated metadata.

### First Screen

The first screen should show a compact real calculator, not a marketing hero.

Recommended H1:

`Seller Fee Calculators for Ecommerce Profit Margins`

Recommended supporting copy:

`Calculate real seller profit after marketplace fees, payment fees, shipping, ads, commissions, and product costs.`

First-screen layout on desktop:

- Left column:
  - Short positioning text.
  - Country selector.
  - Marketplace selector, defaulting to `TikTok Shop`.
  - A small trust strip: `United States defaults · Rates editable · Last updated May 21, 2026`.
- Middle column:
  - Quick margin calculator inputs:
    - Item price.
    - Buyer-paid shipping.
    - Seller discount.
    - Product cost / COGS.
    - Marketplace fee rate.
    - Affiliate or commission rate.
    - Shipping / fulfillment cost.
    - Ad spend per order.
  - CTA button: `Calculate margin`.
- Right column:
  - Results summary:
    - Net profit.
    - Profit margin.
    - Total fees.
    - Max ad spend before loss.
  - Link to the full calculator page:
    - `Open full TikTok Shop calculator`.

The homepage snapshot should not try to include every advanced field. It is a fast entry point and route into the full calculator pages.

### Calculator Directory

Below the first screen, show calculator cards grouped by seller workflow.

Primary calculators:

- TikTok Shop Fee Calculator.
- Etsy Fee Calculator.
- Shopify Profit Calculator.
- PayPal Fee Calculator.
- Stripe Fee Calculator.
- Break-even ROAS Calculator.
- Product Pricing Calculator.

Card content:

- Calculator name.
- One-sentence use case.
- Region availability label.
- Link text such as `Calculate fees`.

Recommended grouping:

- Marketplace fees: TikTok Shop, Etsy.
- Store profit: Shopify, Product Pricing.
- Payment fees: PayPal, Stripe.
- Advertising math: Break-even ROAS.

### Hidden Fee Example

Add one short example section after the calculator cards.

Purpose:

Show how a profitable-looking order can shrink after fees, COGS, shipping, affiliate commission, and ads.

Format:

- A compact table, not a long story.
- Example sale price, fee line items, costs, ad spend, and final net profit.
- A short note: `Headline platform fees are only one part of seller margin.`

### Trust and Content Sections

Homepage lower sections:

- Why sellers use these calculators.
- How rates and formulas work.
- Fee sources and update dates.
- Related calculators.
- FAQ.
- Disclaimer note.

These sections support SEO and trust, but must stay below the useful calculator experience.

## TikTok Shop Fee Calculator Page Structure

TikTok Shop is the primary SEO page for the first release.

### Page Header

H1:

`TikTok Shop Fee Calculator`

Intro should stay under 80 words and explain that referral fees are not the full cost. Mention creator commission, ad spend, fulfillment, shipping, COGS, and returns.

Metadata strip:

- `Default market: United States`
- `Rates are editable`
- `Last updated: May 21, 2026`
- Link to fee sources.

### Calculator Area

Desktop layout:

- Left side: input form.
- Right side: sticky or visually anchored result panel.

Input sections:

- Revenue:
  - Item price.
  - Buyer-paid shipping.
  - Seller discount.
- Product costs:
  - Product cost / COGS.
  - Fulfillment cost.
  - Shipping label cost.
  - Packaging cost.
  - Other per-order costs.
- Marketplace and selling fees:
  - Referral fee rate.
  - New seller promotion toggle.
  - Optional promotion rate field.
  - Affiliate commission rate.
  - Refund allowance percentage.
- Advertising:
  - Ad spend per order.

Result panel:

- Net profit.
- Profit margin.
- Total fees.
- Total costs.
- Creator commission cost.
- Profit before ads.
- Profit after ads.
- Max ad spend before loss.
- Effective fee rate.

If break-even ad spend is zero or negative, show a warning state:

`This product is unprofitable before ads.`

### Breakdown and Explanation

Below the calculator:

- Line-by-line fee breakdown table.
- Plain English formula.
- Example calculation.
- Fee and rate source section.
- Last updated date.
- FAQ.
- Related calculators:
  - Break-even ROAS Calculator.
  - Product Pricing Calculator.
  - Shopify Profit Calculator.
  - Stripe Fee Calculator.

## Multi-Country and Region Selector

The country selector controls fee defaults and source metadata. It does not lock users out of editing rates.

### Available States

Version 1:

- United States: active default.

Planned regions:

- United Kingdom.
- Canada.
- Australia.
- European Union.
- Southeast Asia.

For regions not yet configured, show one of two states:

- `Coming soon`, when the calculator should not present defaults.
- `Use custom rates`, when the calculator can still work with manually entered fee rates.

### Placement

Use the selector in three places:

- Top navigation, as global context.
- Calculator page header, near the H1 or metadata strip.
- Rate assumptions area, near editable default fee fields.

### Behavior

When the user changes region:

- Update default rates.
- Update currency symbol when applicable.
- Update source links.
- Update last-updated metadata.
- Preserve user-entered custom values where reasonable, or clearly offer reset to defaults.

When the user edits a rate:

- Mark the field or assumptions strip as `Custom rate`.
- Keep the formula transparent.
- Do not imply the custom value is an official platform rate.

## Navigation Structure

### Desktop Navigation

Top navigation:

- Seller Margin Tools
- Calculators
- Countries
- Fee Sources
- About
- Contact
- United States selector

Calculators dropdown:

- TikTok Shop Fee Calculator.
- Etsy Fee Calculator.
- Shopify Profit Calculator.
- PayPal Fee Calculator.
- Stripe Fee Calculator.
- Break-even ROAS Calculator.
- Product Pricing Calculator.

Countries dropdown:

- United States.
- United Kingdom.
- Canada.
- Australia.
- European Union.
- Southeast Asia.

### Footer Navigation

Footer groups:

- Calculators.
- Countries.
- Resources.
- Legal.

Legal links:

- Privacy Policy.
- Terms of Use.
- Affiliate Disclosure.
- Disclaimer.

## Visual Style

The visual style should feel like a serious financial utility for sellers.

### Personality

- Practical.
- Trustworthy.
- Compact.
- Plain-spoken.
- Data-forward.

### Palette

Recommended palette:

- Background: white and very light neutral gray.
- Text: dark neutral ink.
- Muted text: gray-green neutral.
- Primary accent: teal or green for calculation actions and positive values.
- Warning: amber for caution or rate caveats.
- Loss state: red for negative profit.
- Info/source links: restrained blue.

Avoid a one-note green interface. Teal should be an accent, not the entire visual system.

### Components

Use:

- 8px radius cards and panels.
- Thin borders.
- Minimal shadows.
- Dense form sections.
- Clear result panels.
- Tables for fee breakdowns.
- Small metadata strips for sources and update dates.
- Inline warnings for unverifiable or user-edited rates.

Avoid:

- AI branding.
- Oversized hero sections.
- Decorative illustrations.
- Dashboard sidebars.
- Gradient orb backgrounds.
- Product mockup art unrelated to fee calculation.
- Marketing cards nested inside larger cards.

## Mobile Layout

Mobile users should be able to calculate before reading long content.

Mobile order:

1. Compact header with logo, menu, and country selector.
2. H1 and short intro.
3. Calculator inputs.
4. Result summary.
5. Fee breakdown.
6. Related calculators.
7. Formula and example.
8. FAQ.
9. Source and disclaimer sections.

Mobile rules:

- Inputs are single-column.
- Result summary appears immediately after the main inputs.
- Keep top result metrics to four items:
  - Net profit.
  - Margin.
  - Total fees.
  - Max ad spend.
- Use collapsible sections for formula, FAQ, and detailed source notes.
- Keep country selection visible near the calculator title, not buried only in the menu.

## Replacing the Current Demo Dashboard

The current project is a ListingPilot AI demo dashboard. Version 1 should replace that demo with the real Seller Margin Tools public site.

Remove or replace:

- `ListingPilot AI` branding.
- Dashboard sidebar.
- Dashboard / Listings / Reviews / Translation / Insights navigation.
- AI Listing Optimizer workspace.
- Product Brief form.
- AI Listing Preview.
- Product bottle illustration.
- Review Reply Assistant.
- Listing, translation, review, and AI modal copy.
- `AI engine online` status language.

Reusable design ideas:

- Light neutral background.
- Teal accent color.
- 8px border radius.
- Responsive grid approach.
- Compact panel styling where appropriate.

Do not preserve the app-shell dashboard structure. The new site needs a public top navigation and SEO page layout.

## First Implementation Implications

This design implies these implementation priorities:

- Replace the current single-page demo with a real static site structure.
- Create a shared public layout: header, footer, calculator page shell, legal page shell.
- Add a centralized rate configuration file.
- Keep calculator formulas separate from UI code.
- Build the homepage and TikTok Shop calculator first.
- Add remaining calculator pages using the same template.
- Update smoke tests to assert calculator and SEO page requirements instead of demo dashboard content.

## Acceptance Criteria

The design is ready for implementation when:

- The homepage starts with a real compact calculator snapshot.
- TikTok Shop has a full dedicated calculator page structure.
- Country and region context is designed into the navigation and calculator metadata.
- Default rates are visibly editable and dated.
- The visual direction is a serious utility, not a dashboard or SaaS landing page.
- Mobile layout prioritizes calculator use before long-form content.
- The old ListingPilot AI demo dashboard replacement scope is explicit.
