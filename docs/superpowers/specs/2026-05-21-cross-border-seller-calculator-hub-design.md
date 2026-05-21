# Cross-Border Seller Calculator Hub Product Spec

Date: 2026-05-21

## Decision

Build an English SEO-focused calculator hub for cross-border ecommerce sellers. The site should help sellers calculate real profit, marketplace fees, payment fees, break-even ad spend, and target selling price before listing or sourcing products.

The first product direction is not an AI copywriting tool. It is a practical calculation site where users enter numbers and get deterministic outputs they can trust, compare, copy, and reuse.

Working product name: Seller Margin Tools.

## Core Bet

Small sellers do not only need advice. They need fast answers to money questions:

- How much will I actually keep after platform fees, payment fees, shipping, fulfillment, ads, and creator commissions?
- What selling price do I need to hit a target margin?
- How much ad spend can I afford before the product becomes unprofitable?
- Which channel is more profitable for this product: TikTok Shop, Etsy, Shopify, PayPal checkout, Stripe checkout, or another marketplace?

This is harder for ChatGPT to replace than generic title optimization because the value comes from structured inputs, transparent formulas, repeatable calculations, page-specific SEO, and optional export.

## Target Audience

Primary audience:
- Small ecommerce sellers in the US and international sellers targeting US buyers.
- TikTok Shop, Etsy, Shopify, and direct-to-consumer sellers.
- New sellers validating product margins before buying inventory.

Secondary audience:
- Ecommerce agencies and virtual assistants who repeatedly calculate pricing and profit for clients.
- Content creators teaching ecommerce who need linkable calculators.
- Affiliate marketers comparing payment or seller tools.

## MVP Positioning

Tagline:
Calculate real seller profit before fees surprise you.

Positioning:
Seller Margin Tools is a practical calculator hub for ecommerce sellers who need to understand marketplace fees, payment processing fees, shipping, ads, affiliate commissions, and break-even margins before they list a product.

The site should feel like a serious utility, not a SaaS landing page. The first screen should show an actual calculator.

## MVP Pages

Required pages for first launch:

1. Home
   - Explains the calculator hub.
   - Links to the primary calculators.
   - Shows one short example of hidden fees reducing margin.

2. TikTok Shop Fee Calculator
   - Primary SEO page.
   - Calculates net profit after referral fee, affiliate commission, ad spend, fulfillment, shipping, COGS, and other costs.

3. Etsy Fee Calculator
   - Calculates listing fee, transaction fee, payment processing fee, optional Offsite Ads fee, shipping cost, COGS, and net profit.

4. Shopify Profit Calculator
   - Calculates product profit for a Shopify/DTC order after COGS, card processing, shipping, packaging, app/order costs, and ad spend.

5. PayPal Fee Calculator
   - Calculates payment fee and net amount received from a sale.

6. Stripe Fee Calculator
   - Calculates payment fee and net amount received from a sale.

7. Break-even ROAS Calculator
   - Calculates maximum ad spend per order and break-even ROAS from contribution margin.

8. Product Pricing Calculator
   - Calculates required selling price for a target profit margin.

Required trust/legal pages:
- About
- Contact
- Privacy Policy
- Terms of Use
- Affiliate Disclosure
- Disclaimer

## SEO Page Template

Each calculator page should include:

- H1 matching the primary keyword.
- Short intro under 80 words.
- Calculator above the fold.
- Result panel with profit, margin, fees, and break-even values.
- Formula explanation.
- Example calculation.
- Fee/rate source section.
- Last updated date.
- FAQ section.
- Internal links to related calculators.
- Reserved ad slot areas for future AdSense, hidden or visually subtle before approval.

## Primary Keywords

Initial keyword cluster:

- tiktok shop fee calculator
- tiktok shop profit calculator
- tiktok shop affiliate commission calculator
- tiktok shop seller fee calculator
- etsy fee calculator
- etsy profit calculator
- shopify profit calculator
- shopify margin calculator
- paypal fee calculator
- stripe fee calculator
- break even roas calculator
- product pricing calculator

Keyword approach:
- Start with long-tail commercial intent.
- Avoid generic calculator keywords.
- Build topical authority around ecommerce fees and seller profitability.
- Use calculator pages as the main traffic assets and guides as support pages.

## Calculation Principles

All calculators must:

- Show formulas in plain English.
- Keep fee rates editable by users.
- Store default rates in a single configuration file.
- Display last updated date for default rates.
- Avoid claiming tax, legal, accounting, or platform policy advice.
- Encourage sellers to verify final rates in their own seller/payment account.

Use decimal-safe arithmetic where practical. Display money values to two decimal places.

## Shared Output Metrics

Where relevant, calculator result panels should show:

- Gross revenue
- Total fees
- Total costs
- Net profit
- Profit margin
- ROI
- Break-even ad spend
- Break-even ROAS
- Target selling price

Definitions:

- Gross revenue = item price + buyer-paid shipping - seller discount
- Total fees = platform fees + payment processing fees + affiliate or ad platform fees
- Total costs = COGS + shipping cost + fulfillment cost + packaging + other per-order costs
- Net profit = gross revenue - total fees - total costs - ad spend
- Profit margin = net profit / gross revenue
- ROI = net profit / COGS
- Break-even ad spend = gross revenue - platform/payment fees - COGS - shipping - fulfillment - other costs
- Break-even ROAS = gross revenue / break-even ad spend

If break-even ad spend is zero or negative, show that the product is unprofitable before ads.

## TikTok Shop Fee Calculator

Purpose:
Help TikTok Shop sellers understand real order profit after referral fees, creator affiliate commission, ad spend, fulfillment, shipping, and product cost.

Inputs:
- Item price
- Buyer-paid shipping
- Seller discount
- Product cost / COGS
- Referral fee rate
- New seller promotion toggle
- Affiliate commission rate
- Ad spend per order
- Fulfillment cost
- Shipping label cost
- Packaging cost
- Other per-order costs
- Refund allowance percentage

Default assumptions:
- Default referral fee rate should be configurable.
- Use 6% as the initial US baseline only if verified before launch.
- Include an optional new seller promotion rate field rather than hard-coding a promotion.
- Affiliate commission defaults to 0%, but common example presets can include 10%, 15%, and 20%.

Formula:
- Fee base = item price + buyer-paid shipping - seller discount
- Referral fee = fee base * referral fee rate
- Affiliate commission = fee base * affiliate commission rate
- Refund allowance = fee base * refund allowance percentage
- Net profit = fee base - referral fee - affiliate commission - ad spend - fulfillment cost - shipping label cost - packaging cost - COGS - other costs - refund allowance

Page-specific outputs:
- Effective fee rate
- Creator commission cost
- Profit before ads
- Profit after ads
- Max ad spend before loss

Content angle:
"The headline platform fee is not the full cost. Affiliate commission, ads, fulfillment, shipping, and returns can change a profitable-looking product into a loss."

## Etsy Fee Calculator

Purpose:
Help Etsy sellers calculate fees and profit after listing fee, transaction fee, payment processing, Offsite Ads, shipping, and product costs.

Inputs:
- Item price
- Shipping charged to buyer
- Seller discount
- Quantity sold
- Product cost / COGS
- Shipping label cost
- Packaging cost
- Listing fee
- Transaction fee rate
- Payment processing percentage
- Payment processing fixed fee
- Offsite Ads toggle
- Offsite Ads rate
- Currency conversion fee toggle

Default assumptions:
- Etsy listing fee default: $0.20.
- Etsy transaction fee default: 6.5% of the total order amount.
- Etsy payment processing varies by country and must remain editable.
- Offsite Ads rate defaults should include 15% and 12% options.

Formula:
- Order total = item price + shipping charged to buyer - seller discount
- Listing fees = listing fee * quantity sold
- Transaction fee = order total * transaction fee rate
- Payment fee = order total * processing rate + processing fixed fee
- Offsite Ads fee = order total * Offsite Ads rate when enabled
- Net profit = order total - listing fees - transaction fee - payment fee - Offsite Ads fee - shipping label cost - packaging cost - COGS

## Shopify Profit Calculator

Purpose:
Help Shopify and DTC sellers understand order-level profit after product cost, processing, shipping, packaging, app/order costs, and ad spend.

Inputs:
- Item price
- Shipping charged to buyer
- Discount
- COGS
- Payment processing percentage
- Payment processing fixed fee
- Shipping label cost
- Packaging cost
- App/order cost
- Ad spend per order
- Return allowance percentage

Formula:
- Revenue = item price + shipping charged to buyer - discount
- Payment fee = revenue * processing percentage + processing fixed fee
- Return allowance = revenue * return allowance percentage
- Net profit = revenue - payment fee - COGS - shipping label cost - packaging cost - app/order cost - ad spend - return allowance

## PayPal Fee Calculator

Purpose:
Help sellers estimate payment fee and net amount from a PayPal transaction.

Inputs:
- Transaction amount
- Percentage fee
- Fixed fee
- International/cross-border fee
- Currency conversion percentage

Formula:
- Base fee = transaction amount * percentage fee + fixed fee
- Cross-border fee = transaction amount * cross-border percentage
- Currency conversion fee = transaction amount * currency conversion percentage
- Net received = transaction amount - base fee - cross-border fee - currency conversion fee

## Stripe Fee Calculator

Purpose:
Help sellers estimate Stripe processing fees and net received.

Inputs:
- Transaction amount
- Percentage fee
- Fixed fee
- International card percentage
- Currency conversion percentage
- Dispute allowance optional field

Formula:
- Processing fee = transaction amount * percentage fee + fixed fee
- International fee = transaction amount * international percentage
- Currency conversion fee = transaction amount * conversion percentage
- Net received = transaction amount - processing fee - international fee - currency conversion fee

## Break-even ROAS Calculator

Purpose:
Help sellers know the minimum ROAS needed before ads lose money.

Inputs:
- Selling price
- COGS
- Platform fee percentage
- Payment fee percentage
- Fixed payment fee
- Shipping cost
- Fulfillment cost
- Packaging cost
- Other per-order costs

Formula:
- Revenue = selling price
- Non-ad costs = COGS + platform fee + payment fee + fixed payment fee + shipping + fulfillment + packaging + other costs
- Break-even ad spend = revenue - non-ad costs
- Break-even ROAS = revenue / break-even ad spend

If break-even ad spend is negative or zero, display:
"This product is not profitable before ad spend."

## Product Pricing Calculator

Purpose:
Help sellers calculate required selling price for a desired margin.

Inputs:
- Product cost / COGS
- Shipping cost
- Fulfillment cost
- Packaging cost
- Other fixed per-order costs
- Platform percentage fee
- Payment percentage fee
- Fixed payment fee
- Target profit margin

Formula:
- Fixed costs = COGS + shipping + fulfillment + packaging + other fixed costs + fixed payment fee
- Percentage cost rate = platform fee rate + payment percentage fee
- Required price = fixed costs / (1 - percentage cost rate - target margin)

If denominator is zero or negative, show:
"Target margin is not reachable with these fee rates."

## Data and Rate Configuration

Default fee rates must live in one configuration file, not scattered through UI code.

Recommended structure:

```json
{
  "ratesLastUpdated": "2026-05-21",
  "platforms": {
    "tiktokShopUS": {
      "referralFeeRate": 0.06,
      "newSellerPromoRate": 0.03,
      "notes": "Verify in TikTok Shop Seller Center before launch."
    },
    "etsyUS": {
      "listingFee": 0.2,
      "transactionFeeRate": 0.065,
      "paymentProcessingRate": 0.03,
      "paymentProcessingFixedFee": 0.25,
      "offsiteAdsLowVolumeRate": 0.15,
      "offsiteAdsHighVolumeRate": 0.12
    },
    "stripeUS": {
      "domesticCardRate": 0.029,
      "domesticFixedFee": 0.3
    },
    "paypalUS": {
      "checkoutRate": 0.0349,
      "fixedFee": 0.49
    }
  }
}
```

The implementation must allow these defaults to be overridden by the user in the calculator UI.

## Source Strategy

Use official sources whenever possible:

- Etsy fee defaults should cite Etsy Help because Etsy publishes listing fees, transaction fees, advertising fees, payment processing rules, and currency conversion fee rules.
- Stripe fee defaults should cite Stripe pricing.
- PayPal fee defaults should cite PayPal merchant/business fees.
- TikTok Shop fee defaults should cite TikTok Shop Seller Center or Seller University when accessible. If the exact official page is not publicly accessible, cite third-party sources only as market context and add a visible warning to verify in Seller Center.
- Ecommerce market context can cite Shopify's global ecommerce report.
- Tool-site traffic examples can cite Similarweb pages, clearly labeled as estimates.

Reference links checked for this spec:

- Similarweb Traffic and Engagement documentation: https://support.similarweb.com/hc/en-us/articles/115004606345-View-Traffic-Engagement
- iLovePDF Similarweb traffic page: https://www.similarweb.com/website/ilovepdf.com/
- FreeConvert Similarweb traffic page: https://www.similarweb.com/website/freeconvert.com/
- JSON Formatter Similarweb traffic page: https://www.similarweb.com/website/jsonformatter.org/
- Shopify global ecommerce report: https://www.shopify.com/blog/global-ecommerce-sales
- Etsy seller fee help page: https://help.etsy.com/hc/en-gb/articles/115014483627-What-are-the-Fees-and-Taxes-for-Selling-on-Etsy
- Stripe pricing page: https://stripe.com/us/pricing
- PayPal business fees page: https://www.paypal.com/business/paypal-business-fees
- TikTok Shop US seller terms page: https://seller-us.tiktok.com/university/essay?article_type=agreement&from=other&identity=1&knowledge_id=1331308753078058&role=1

## Monetization Roadmap

Phase 1:
- No intrusive ads.
- Build useful calculators and original explanations first.
- Add affiliate disclosure page even before affiliate links are active.

Phase 2:
- Apply for AdSense only after calculators, legal pages, contact page, and original content exist.
- Add affiliate links for Shopify, ecommerce tools, accounting tools, shipping tools, and seller software only where relevant.

Phase 3:
- Add optional paid features:
  - Save calculation history.
  - Export CSV/PDF.
  - Compare multiple marketplaces.
  - Batch product margin calculator from CSV.
  - White-label calculator widget for ecommerce agencies.

## Technical Design

First version:
- Static site or lightweight frontend app.
- No account system.
- No database.
- Calculations run client-side.
- Fee defaults stored in a single JSON or JS config module.
- Calculator logic separated from UI for testing.

Recommended file responsibilities:
- Calculator formulas: pure functions.
- Rate config: default fee data and source metadata.
- Page content: SEO copy, FAQ, source links, examples.
- UI: form fields, result panels, validation messages.

Testing:
- Unit tests for each formula.
- Smoke test to ensure each calculator page includes required inputs, outputs, FAQ, and source metadata.
- Manual mobile/desktop browser check before launch.

## Design Requirements

The site should feel like a serious utility:

- Calculator visible immediately.
- Clean results panel.
- Plain language labels.
- No oversized hero.
- No vague AI branding.
- No account wall for basic tools.
- Fast mobile layout.
- Source and update date visible near the calculator.

Visual personality:
- Practical, trustworthy, compact.
- White/light neutral background.
- Green/teal accents are acceptable, but avoid one-note color themes.
- Tables and formula cards should be easy to scan.

## Competitive Notes

Large tool categories prove demand:
- Similarweb estimates iLovePDF at hundreds of millions of monthly visits and reports organic search as its top traffic source.
- Similarweb estimates FreeConvert at tens of millions of monthly visits.
- JSON formatter tools still draw millions of monthly visits despite being simple utilities.

Open-source references:
- IT Tools shows how to organize many small tools with good UX.
- CyberChef shows the value of composable transformations.
- Web Check shows the appeal of one input producing a rich report.
- Stirling PDF shows that practical document tools can become a large utility suite.

For this project, the best lesson is not to copy their broad scope. The best lesson is to start with a narrow utility cluster and make each tool genuinely useful.

## Risks and Mitigations

Risk: Fee rates change.
Mitigation: Make all rates configurable, display update date, and keep rate data centralized.

Risk: TikTok Shop official fee pages may be difficult to access publicly.
Mitigation: Use configurable defaults, cite accessible context sources, and tell users to verify in Seller Center before making decisions.

Risk: SEO competition is already present.
Mitigation: Start with TikTok Shop and marketplace-specific long-tail pages rather than generic calculator pages.

Risk: Users distrust calculations.
Mitigation: Show formula, line-by-line fee breakdown, examples, and source links.

Risk: The site becomes a generic calculator farm.
Mitigation: Keep the first cluster focused on seller profitability and cross-link only related ecommerce tools.

## Launch Scope

Version 1 should include:

- Home page.
- TikTok Shop Fee Calculator.
- Etsy Fee Calculator.
- Shopify Profit Calculator.
- PayPal Fee Calculator.
- Stripe Fee Calculator.
- Break-even ROAS Calculator.
- Product Pricing Calculator.
- About, Contact, Privacy Policy, Terms, Affiliate Disclosure, Disclaimer.
- Shared layout, navigation, and footer.
- Rate config file.
- Formula tests.
- Basic SEO metadata.

Version 1 should not include:

- User accounts.
- Payment subscriptions.
- Server-side uploads.
- Saved history.
- CSV import.
- AI chat.
- Real-time platform integrations.

## Acceptance Criteria

The product spec is complete when:

- Each MVP calculator has defined inputs, outputs, and formula.
- The primary SEO direction is TikTok Shop seller fee/profit calculation.
- Fee defaults are centralized and editable.
- Trust pages are included.
- User-facing disclaimers are planned.
- The first implementation can be built as a static or lightweight frontend app without backend dependencies.

The first implementation is complete when:

- All calculator pages work on desktop and mobile.
- Formula tests pass.
- Each page includes source/update metadata.
- Pages can be deployed to a static host.
- No calculator depends on ChatGPT or external AI APIs.

## Open Decisions

1. Final domain/brand name.
   - Default for now: Seller Margin Tools.

2. Whether to replace the current demo dashboard or create a fresh site.
   - Recommendation: replace the demo dashboard with the real calculator hub.

3. Initial implementation stack.
   - Recommendation: start with simple static HTML/CSS/JS in this workspace, then move to Vite/TypeScript when the local Node environment is available.

4. Country focus.
   - Recommendation: US-first, because Stripe, PayPal, Etsy, Shopify, and TikTok Shop US queries have clearer commercial intent and source availability.
