# MarginPath Money River Redesign Spec

Date: 2026-05-22

## Decision

Rename the seller calculator hub from Seller Margin Tools to MarginPath.

Use the first confirmed homepage direction:

- Calculator-first homepage.
- MarginPath brand and logo system.
- Money River visual instead of bar charts.
- English as the default language.
- Simplified Chinese as the second launch language.
- United States as the default market, with the region model still prepared for UK, Canada, Australia, EU, and Southeast Asia.

The redesign should make the site feel like a real ecommerce finance utility, not an AI-written explainer page. The first screen should show an actual calculator and a visual money path from sale price to fees, costs, and net profit.

## Reference Direction

The Mergo profit calculator reference is useful for three things:

- It puts the calculator interaction first.
- It makes the output visible while users are entering numbers.
- It treats fee math as a working tool, not as a long article.

MarginPath should not copy the reference page visually. It should take the same utility-first discipline and add a stronger brand, clearer fee visualization, multilingual structure, and better SEO page scaffolding.

## Brand

### Site Name

MarginPath

Rationale:

- It suggests a journey from selling price to real margin.
- It fits the Money River visual direction.
- It is broader than only marketplace fees, so it can support pricing, ROAS, payment fees, and future comparison tools.
- It sounds less generic than Seller Margin Tools.

### Company Name

Northstar Commerce Labs

Rationale:

- It sounds like a practical ecommerce tools company rather than a single calculator page.
- It can hold future tools beyond MarginPath.
- It avoids vague AI-brand language.

### Logo Direction

Use a compact mark that combines:

- A path or folded route shape.
- A subtle margin/check motif.
- Dark green base color.
- Bright green accent.
- White secondary stroke.

The logo should work in:

- Header at 32-40px.
- Mobile favicon-style square.
- Footer.
- Social preview card.

Avoid:

- Generic calculator icons.
- Robot, spark, or AI motifs.
- Abstract gradient blob logos.

## Homepage Structure

### Header

Header contents:

- MarginPath logo and wordmark.
- Small company line: "by Northstar Commerce Labs" or hidden on very small screens.
- Primary navigation:
  - TikTok Shop
  - Etsy
  - Shopify
  - Payment Fees
  - ROAS
  - Pricing
- Market selector:
  - US active.
  - UK, Canada, Australia, EU, Southeast Asia visible but marked "coming soon" or disabled until configured.
- Language selector:
  - English active.
  - Simplified Chinese active.
  - Spanish, Portuguese, German, French reserved for later, not presented as active translations in version 1.

### Hero

Hero layout:

- Left side: concise headline and direct value proposition.
- Right side: calculator plus result summary and Money River visual.
- No oversized marketing hero.
- No long paragraph explaining every feature.
- Keep the first interaction above the fold on desktop and mobile.

Recommended headline style:

- "See what is left after marketplace fees."
- Supporting copy: "Enter price, product cost, shipping, ads, and commission. MarginPath shows the path from gross sale to net profit."

Avoid:

- "Advanced AI-powered ecommerce profitability optimization."
- "Comprehensive solution for entrepreneurs."
- Long explanatory paragraphs before the calculator.

### Hero Calculator

Default calculator:

- TikTok Shop US order snapshot.

Initial inputs:

- Item price.
- Product cost.
- Shipping and fulfillment.
- Referral fee rate.
- Creator commission rate.
- Ad spend.

Initial outputs:

- Net profit.
- Profit margin.
- Total fee stack.
- Maximum ad spend before loss.

The homepage calculator should remain compact. Full details belong on the TikTok Shop calculator page.

### Money River Visual

Money River replaces the current bar chart idea.

Purpose:

- Show money moving from gross sale to deductions and final profit.
- Make fee changes feel visible and concrete.
- Reduce reliance on text explanations.

Recommended desktop visual:

- Starting node: Gross sale, for example "$30.00".
- Branches:
  - Platform fee.
  - Creator or affiliate commission.
  - Product, shipping, and fulfillment costs.
  - Ads and refund allowance.
  - Net profit.
- Line thickness or track length should roughly reflect the relative amount.
- Color coding:
  - Revenue: green.
  - Platform/payment fees: blue.
  - Creator/affiliate/ad fees: rose.
  - Product/shipping costs: amber.
  - Net profit: strong green.

Recommended mobile visual:

- Use a stacked vertical money path or compact receipt flow.
- Keep labels short.
- Do not force a wide diagram into a narrow viewport.

Interaction:

- The Money River updates when calculator inputs change.
- Negative profit should turn the final profit branch red and show a plain warning.
- Hover or tap can reveal exact values in a later version, but not required for the first redesign.

### Secondary Visuals

Use supporting image-like modules in the homepage and calculator pages:

1. Product box plus money chips
   - Good for explaining product cost, shipping, ads, and creator commission.
   - Use as smaller illustration cards, not the main hero visual.

2. Seller receipt
   - Good for mobile and fee breakdown sections.
   - Shows sale, fees, costs, ads, and final amount left.

3. Scenario cards
   - Good for educational examples.
   - Example: "10% creator commission" versus "higher ads plus returns".

Avoid:

- Generic stock photos of people with laptops.
- Decorative abstract illustrations unrelated to fees.
- Dark, blurred, atmosphere-only ecommerce images.

### Calculator Directory

The homepage should still include the first calculator cluster:

- TikTok Shop Fee Calculator.
- Etsy Fee Calculator.
- Shopify Profit Calculator.
- PayPal Fee Calculator.
- Stripe Fee Calculator.
- Break-even ROAS Calculator.
- Product Pricing Calculator.

Each card should include:

- Short title.
- 1-line use case.
- Small platform icon or simple visual tag.
- Region availability indicator when relevant.

### Trust and Source Section

Add a compact section below the tool directory:

- Last updated date.
- "Rates are editable."
- "Verify final rates in your platform account."
- Links to source pages on calculator detail pages.

Do not over-explain disclaimers on the homepage. Keep legal details in the disclaimer and source sections.

## TikTok Shop Fee Calculator Page

### Page Goal

Make this the primary SEO and utility page for:

- TikTok Shop fee calculator.
- TikTok Shop profit calculator.
- TikTok Shop seller fee calculator.
- TikTok Shop affiliate commission calculator.

### Above The Fold

Layout:

- Header.
- H1.
- Short intro under 70 words.
- Calculator form.
- Result panel.
- Money River or seller receipt visual.
- Source/update metadata.

Recommended H1:

"TikTok Shop Fee Calculator"

Recommended intro:

"Estimate TikTok Shop profit after referral fees, creator commission, ads, shipping, fulfillment, product cost, packaging, and refunds."

### Calculator Layout

Desktop:

- Left: inputs grouped by revenue, fees, costs, ads/returns.
- Right: sticky result summary.
- Below or beside result: Money River visual.

Mobile:

- H1 and short intro.
- Result summary appears near top after a few essential inputs.
- Inputs stack in clean groups.
- Fee flow appears as compact receipt or vertical Money River.

### Inputs

Keep the existing TikTok inputs, but group them more clearly:

Revenue:

- Item price.
- Buyer-paid shipping.
- Seller discount.

Marketplace and creator fees:

- Referral fee rate.
- New seller promotion toggle.
- New seller promotion rate.
- Creator/affiliate commission rate.

Costs:

- Product cost / COGS.
- Shipping label cost.
- Fulfillment cost.
- Packaging cost.
- Other per-order costs.

Risk and ads:

- Ad spend per order.
- Refund allowance percentage.

### Outputs

Primary:

- Net profit.
- Profit margin.
- Profit before ads.
- Max ad spend before loss.

Secondary:

- Gross revenue.
- Referral fee.
- Creator commission.
- Refund allowance.
- Total fees.
- Total costs.
- Effective fee rate.

### Visual Breakdown

Use two visual components:

- Money River for the main calculation.
- Seller receipt for line-by-line detail.

The table can remain, but it should support the visual story rather than be the only explanation.

### Content Sections

Keep these SEO sections, but rewrite them to sound more human and less AI-generated:

- Formula.
- Example calculation.
- Fee sources.
- FAQ.
- Related calculators.

Tone:

- Short.
- Concrete.
- Uses real numbers.
- No filler claims.

Example copy direction:

"A $30 order does not leave $30. After a 6% referral fee, 10% creator commission, $8 product cost, $5 shipping and fulfillment, and $4 ad spend, the estimated profit is $8.20."

## Multilingual Design

### Version 1 Languages

Active:

- English.
- Simplified Chinese.

Reserved for later:

- Spanish.
- Portuguese.
- German.
- French.

### Default Language

English remains the default because the first SEO market is global sellers targeting the United States.

### Language Selector

Placement:

- Header on desktop.
- Compact menu row on mobile.

Behavior:

- Users can switch between English and Simplified Chinese.
- Language selection should persist in local storage.
- The calculator formulas and numeric results remain the same.
- Labels, headings, helper text, FAQ, navigation, and disclaimers switch language.

Implementation preference:

- Use a language dictionary or translation config.
- Do not duplicate every page into separate uncontrolled files for version 1.
- Keep SEO metadata in English first. Chinese metadata can be added when Chinese routing is finalized.

### Chinese Copy Principle

Chinese should read like a seller tool, not like a literal machine translation.

Example tone, described in English for this spec:

- Ask a concrete order question: "For a 30 USD order, how much profit remains after platform fees, creator commission, shipping, and ads?"
- Avoid stiff machine-translated marketing claims such as: "This advanced tool helps ecommerce entrepreneurs optimize profitability."

Actual Simplified Chinese strings should be authored in the language dictionary during implementation and reviewed in browser.

## Region Selector

### Version 1

Active:

- United States.

Visible but not active:

- United Kingdom.
- Canada.
- Australia.
- European Union.
- Southeast Asia.

### Behavior

- The selector should clearly say when a region is coming soon.
- It should not silently apply US rates to another region.
- Users can still manually edit fee rates even when regional defaults are not active.

### Future Structure

Rate configuration should continue to support:

- Region metadata.
- Currency symbol.
- Platform-specific default rates.
- Last updated date.
- Source URL and caveat text.

## Navigation

Recommended desktop navigation:

- Logo.
- TikTok Shop.
- Etsy.
- Shopify.
- Payment Fees.
- ROAS.
- Pricing.
- Region selector.
- Language selector.

Recommended mobile navigation:

- Logo.
- Compact menu button.
- Menu opens with:
  - calculators grouped by category.
  - market selector.
  - language selector.
  - trust/legal links lower in the menu.

Footer navigation:

- About.
- Contact.
- Privacy Policy.
- Terms.
- Affiliate Disclosure.
- Disclaimer.

## Visual Style

### Overall Feel

Practical, trustworthy, ecommerce-native, and compact.

It should feel like:

- A seller opens it before pricing or sourcing a product.
- The math is visible.
- The brand is clean but not corporate-heavy.
- The page is useful even without reading every paragraph.

### Palette

Recommended dominant colors:

- Paper background: warm off-white.
- Text: deep green-black.
- Primary action: dark commerce green.
- Profit accent: bright green.
- Fee accent: blue.
- Commission/ad accent: rose.
- Cost accent: amber.

Avoid:

- One-note teal or purple palette.
- Dark SaaS dashboard look.
- Beige-only ecommerce template look.
- Decorative gradient orbs.

### Typography

Use clear sans-serif typography.

Rules:

- No negative letter spacing.
- No viewport-scaled font sizes.
- Use compact headings inside tool panels.
- Use large type only for actual page headlines and primary result numbers.

### Components

Core components:

- Calculator panel.
- Result card.
- Money River visual.
- Seller receipt.
- Tool cards.
- Region selector.
- Language selector.
- Source/update strip.
- Warning state for unprofitable calculations.

Cards should stay modest, with border radius around 8-12px. Do not nest decorative cards inside larger decorative cards unless a repeated item or actual tool panel needs framing.

## Mobile Layout

Mobile priority order:

1. Logo, region/language access, menu.
2. H1 and one short sentence.
3. Essential calculator inputs.
4. Net profit result.
5. Compact Money River or receipt.
6. More inputs.
7. Formula, example, sources, FAQ, related calculators.

Mobile requirements:

- No horizontal scrolling.
- Calculator fields should not resize the layout on focus.
- Result value must remain readable.
- Money River should become vertical or receipt-style.
- Long labels should wrap cleanly.
- Language and region controls must remain accessible without crowding the header.

## Content Tone

The site should sound like an experienced seller explaining the math plainly.

Use:

- Specific numbers.
- Short sentences.
- Direct fee names.
- Clear caveats.
- "Estimated" where needed.

Avoid:

- AI-flavored adjectives.
- "Comprehensive", "advanced", "seamless", "optimize your profitability" as filler.
- Long paragraphs that restate the same benefit.
- Unsupported promises.

Before:

"Calculate real ecommerce seller profit after marketplace fees, payment fees, shipping, ads, commissions, and product costs."

After:

"Enter a product price and see what is left after fees, shipping, ads, and product cost."

## What To Replace In The Current Demo

Replace:

- "Seller Margin Tools" brand text with "MarginPath".
- "SM" mark with the new route/check logo.
- Current text-heavy homepage sections.
- Current compact hidden-fee table as the primary visual.
- Generic explanatory copy that repeats "calculate real seller profit".
- Bar-chart style visual experiments.

Keep and improve:

- Static HTML/CSS/JS approach.
- Seven calculator pages.
- Centralized rate configuration.
- Formula tests.
- Source and update metadata.
- Legal/trust pages.
- Region-ready architecture.

Add:

- Money River visual component.
- Seller receipt component.
- English/Simplified Chinese language dictionary.
- Language selector.
- MarginPath brand system.
- More concrete homepage examples.

## First Implementation Scope

Implement in the existing static site.

Scope:

- Rename brand to MarginPath.
- Add logo mark in CSS/HTML.
- Redesign homepage around A direction.
- Replace homepage bar/table visual with Money River.
- Add Money River visual to TikTok Shop calculator page.
- Add seller receipt style breakdown to TikTok page.
- Add English/Simplified Chinese language toggle for shared layout, homepage, and calculator UI labels.
- Keep all existing calculators functional.
- Keep US as default region.
- Keep future regions disabled or clearly marked.
- Update smoke tests to check brand, language selector, and Money River presence.

Out of scope for this redesign:

- Full public deployment.
- User accounts.
- Backend translation service.
- AI chat.
- CSV upload.
- Saved history.
- Paid subscriptions.
- Full translations for Spanish, Portuguese, German, or French.

## Acceptance Criteria

The redesign is complete when:

- Homepage shows MarginPath branding.
- Homepage first screen contains a real calculator and Money River visual.
- TikTok Shop page includes calculator, result card, Money River, receipt-style breakdown, formula, example, sources, FAQ, and related calculators.
- English and Simplified Chinese can be selected from the UI.
- Language selection persists locally.
- Calculator math is unchanged and existing formula tests still pass.
- Region selector does not imply unsupported regional rates are active.
- Mobile homepage and TikTok calculator have no horizontal overflow.
- Old demo dashboard language and the Seller Margin Tools brand are removed from the main UI.
- The page reads like a practical seller tool rather than AI-generated marketing copy.

## Implementation Choices

Use these choices for the first implementation:

- Build the Money River as inline SVG driven by the existing calculator result data.
- Reuse the same Money River renderer on the homepage and TikTok Shop calculator page.
- Build the seller receipt as HTML so it is readable, responsive, and easy to test.
- Store English and Simplified Chinese UI strings in a shared language dictionary.
- Keep canonical SEO routes in English for this iteration.
- Do not create separate Chinese URL routes until a later internationalization pass.
