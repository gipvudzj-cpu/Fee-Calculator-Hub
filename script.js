const rates = window.SellerRates;
const calculators = window.SellerCalculators;
const pageData = window.SellerCalculatorPages || {};
const regionIds = rates.regions.map((region) => region.id).sort((a, b) => b.length - a.length);

let activeRegionId = getActiveRegionId(rates.defaultRegion);

const fieldDefaultAliases = {
    percentageFee: ["checkoutRate", "domesticCardRate"],
    fixedFee: ["fixedFee", "domesticFixedFee"],
    offsiteAdsRate: ["offsiteAdsLowVolumeRate"],
    platformFeeRate: ["referralFeeRate"],
    paymentFeeRate: ["domesticCardRate", "paymentProcessingRate"]
};

function findRegion(regionId) {
    return rates.regions.find((region) => region.id === regionId) || rates.regions[0];
}

function getActiveRegionId(regionId) {
    const requested = findRegion(regionId);

    if (requested && requested.status === "active") {
        return requested.id;
    }

    const active = rates.regions.find((region) => region.status === "active");
    return active ? active.id : rates.defaultRegion;
}

function getRegion(regionId = activeRegionId) {
    return findRegion(regionId);
}

function getPlatformFamily(platformKey) {
    const regionId = regionIds.find((id) => platformKey.endsWith(id));
    return regionId ? platformKey.slice(0, -regionId.length) : platformKey;
}

function getPlatformKeyForRegion(defaultPlatformKey, regionId = activeRegionId) {
    const defaultPlatform = rates.platforms[defaultPlatformKey] || {};

    if (defaultPlatform.regionId === regionId) {
        return defaultPlatformKey;
    }

    const regionalKey = `${getPlatformFamily(defaultPlatformKey)}${regionId}`;
    return rates.platforms[regionalKey] ? regionalKey : defaultPlatformKey;
}

function getPlatformForRegion(defaultPlatformKey, regionId = activeRegionId) {
    const platformKey = getPlatformKeyForRegion(defaultPlatformKey, regionId);
    return rates.platforms[platformKey] || {};
}

function resolveFieldDefaultInfo(defaultPlatformKey, fieldName) {
    const platform = getPlatformForRegion(defaultPlatformKey);
    const keys = [fieldName].concat(fieldDefaultAliases[fieldName] || []);
    const matchedKey = keys.find((key) => Object.prototype.hasOwnProperty.call(platform, key));

    return matchedKey ? { found: true, value: platform[matchedKey] } : { found: false };
}

function resolveFieldDefault(defaultPlatformKey, fieldName, fallbackValue) {
    const resolved = resolveFieldDefaultInfo(defaultPlatformKey, fieldName);
    return resolved.found ? resolved.value : fallbackValue;
}

function applyResolvedRateDefaults(form, defaultPlatformKey) {
    form.querySelectorAll("input[name]").forEach((field) => {
        const resolved = resolveFieldDefaultInfo(defaultPlatformKey, field.name);

        if (!resolved.found || field.type === "checkbox") {
            return;
        }

        field.value = resolved.value;
    });
}

function formatMoney(value, region = getRegion()) {
    return `${region.symbol}${calculators.money(value).toFixed(2)}`;
}

function formatPercent(value) {
    return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

function formatValue(value, type, region) {
    if (type === "money") {
        return formatMoney(value, region);
    }

    if (type === "percent") {
        return formatPercent(value);
    }

    if (type === "number") {
        return calculators.money(value).toFixed(2);
    }

    return String(value ?? "");
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function headerHtml() {
    return `
        <header class="site-header">
            <a class="brand" href="index.html" aria-label="Seller Margin Tools home">
                <span class="brand-mark">SM</span>
                <span>
                    <strong>Seller Margin Tools</strong>
                    <small>Fee calculators for ecommerce sellers</small>
                </span>
            </a>
            <button class="menu-button" type="button" data-action="toggle-menu" aria-expanded="false" aria-controls="siteNav">Menu</button>
            <nav class="site-nav" id="siteNav" aria-label="Primary navigation">
                <a href="tiktok-shop-fee-calculator.html">TikTok Shop</a>
                <a href="etsy-fee-calculator.html">Etsy</a>
                <a href="shopify-profit-calculator.html">Shopify</a>
                <a href="break-even-roas-calculator.html">Break-even ROAS</a>
                <a href="about.html">About</a>
                <label class="region-control">
                    <span>Region</span>
                    <select data-region-select aria-label="Default rate region"></select>
                </label>
            </nav>
        </header>
    `;
}

function footerHtml() {
    return `
        <footer class="site-footer">
            <div>
                <strong>Seller Margin Tools</strong>
                <p>Calculate real seller profit before fees surprise you.</p>
            </div>
            <nav aria-label="Footer navigation">
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="terms-of-use.html">Terms</a>
                <a href="affiliate-disclosure.html">Affiliate Disclosure</a>
                <a href="disclaimer.html">Disclaimer</a>
            </nav>
        </footer>
    `;
}

function hydrateSharedLayout() {
    document.querySelectorAll("[data-shared-header]").forEach((target) => {
        target.outerHTML = headerHtml();
    });

    document.querySelectorAll("[data-shared-footer]").forEach((target) => {
        target.outerHTML = footerHtml();
    });
}

function hydrateRegionSelectors() {
    document.querySelectorAll("[data-region-select]").forEach((select) => {
        select.innerHTML = rates.regions.map((region) => {
            const suffix = region.status === "active" ? "" : ` (${region.status})`;
            const disabled = region.status === "active" ? "" : " disabled";
            return `<option value="${escapeHtml(region.id)}"${disabled}>${escapeHtml(region.name + suffix)}</option>`;
        }).join("");
        select.value = activeRegionId;
    });
}

function readForm(form) {
    const values = {};

    form.querySelectorAll("input, select, textarea").forEach((field) => {
        if (!field.name) {
            return;
        }

        values[field.name] = field.type === "checkbox" ? field.checked : Number(field.value);
    });

    return values;
}

function formatDate(dateText) {
    const date = new Date(`${dateText}T00:00:00Z`);

    if (Number.isNaN(date.getTime())) {
        return dateText;
    }

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    });
}

function updateRateMeta(defaultPlatformKey) {
    const platform = getPlatformForRegion(defaultPlatformKey);
    const region = getRegion(platform.regionId);
    const caveat = platform.notes || "Verify rates in your own seller or payment account before making decisions.";
    const source = platform.sourceUrl && platform.sourceLabel
        ? ` | <a href="${escapeHtml(platform.sourceUrl)}" rel="nofollow">Source: ${escapeHtml(platform.sourceLabel)}</a>`
        : "";

    document.querySelectorAll("[data-rate-meta]").forEach((target) => {
        target.innerHTML = `${escapeHtml(region.name)} default market | Editable rates | Last updated ${escapeHtml(formatDate(rates.ratesLastUpdated))}${source} | ${escapeHtml(caveat)}`;
    });
}

function renderHomeCalculator() {
    const form = document.querySelector("[data-home-calculator]");
    const resultCard = document.querySelector("[data-home-results]");
    const defaultPlatformKey = getPlatformKeyForRegion("tiktokShopUS");

    if (!form || !resultCard) {
        return;
    }

    const platform = rates.platforms[defaultPlatformKey];
    const region = getRegion(platform.regionId);

    applyResolvedRateDefaults(form, defaultPlatformKey);

    function render() {
        const values = readForm(form);
        const result = calculators.calculateTikTokShop({
            ...values,
            fulfillmentCost: values.combinedShippingCost,
            shippingLabelCost: 0,
            packagingCost: 0,
            otherCosts: 0,
            refundAllowanceRate: 0
        });

        resultCard.querySelector(".result-primary").textContent = formatMoney(result.netProfit, region);
        resultCard.querySelector("[data-result='profitMargin']").textContent = formatPercent(result.profitMargin);
        resultCard.querySelector("[data-result='totalFees']").textContent = formatMoney(result.totalFees, region);
        resultCard.querySelector("[data-result='maxAdSpendBeforeLoss']").textContent = formatMoney(result.maxAdSpendBeforeLoss, region);
    }

    form.oninput = render;
    render();
    updateRateMeta(defaultPlatformKey);
}

function renderCalculatorPage() {
    const calculatorKey = document.body.dataset.calculator;
    const config = pageData[calculatorKey];

    if (!calculatorKey || !config) {
        return;
    }

    const form = document.querySelector("[data-calculator-form]");
    const results = document.querySelector("[data-calculator-results]");
    const platformKey = getPlatformKeyForRegion(config.defaultPlatform);
    const platform = rates.platforms[platformKey] || {};
    const region = getRegion(platform.regionId);
    const sourceText = platform.notes || "Verify rates in your own seller or payment account before making decisions.";

    if (!form || !results || typeof calculators[config.formulaName] !== "function") {
        return;
    }

    setText("[data-calculator-title]", config.title);
    setText("[data-calculator-intro]", config.intro);
    setText("[data-formula-copy], [data-calculator-formula]", config.formula);
    setText("[data-example-copy], [data-calculator-example]", config.example);
    setHtml("[data-source-copy], [data-fee-sources]", `<p><a href="${escapeHtml(platform.sourceUrl)}" rel="nofollow">${escapeHtml(platform.sourceLabel)}</a>. ${escapeHtml(sourceText)}</p>`);
    updateRateMeta(platformKey);

    form.innerHTML = `
        <div class="field-grid">
            ${config.fields.map(([name, label, value, type]) => {
                const defaultValue = resolveFieldDefault(platformKey, name, value);

                if (type === "checkbox") {
                    return `<label class="checkbox-field"><input name="${escapeHtml(name)}" type="checkbox" ${defaultValue ? "checked" : ""}><span>${escapeHtml(label)}</span></label>`;
                }

                return `<label><span>${escapeHtml(label)}</span><input name="${escapeHtml(name)}" type="number" step="0.001" value="${escapeHtml(defaultValue)}"></label>`;
            }).join("")}
        </div>
    `;

    renderFaq(config.faq || []);

    function render() {
        const values = readForm(form);
        const result = calculators[config.formulaName](values);
        const [primary, ...secondary] = config.results;
        const warning = renderWarnings(result);

        results.innerHTML = `
            <p class="eyebrow">Estimated result</p>
            <strong class="result-primary">${formatValue(result[primary[0]], primary[2], region)}</strong>
            <span>${escapeHtml(primary[1])}</span>
            ${warning}
            <dl class="metric-list">
                ${secondary.map(([name, label, type]) => `
                    <div>
                        <dt>${escapeHtml(label)}</dt>
                        <dd>${formatValue(result[name], type, region)}</dd>
                    </div>
                `).join("")}
            </dl>
        `;

        renderBreakdownTable(config.results, result, region);
    }

    form.oninput = render;
    render();
}

function renderWarnings(result) {
    const messages = [];

    if (result.profitableBeforeAds === false) {
        messages.push("This product is not profitable before ad spend.");
    }

    if (result.reachable === false) {
        messages.push("Target margin is not reachable with these fee rates.");
    }

    if (
        messages.length === 0 &&
        Object.prototype.hasOwnProperty.call(result, "maxAdSpendBeforeLoss") &&
        result.maxAdSpendBeforeLoss <= 0
    ) {
        messages.push("There is no room for ad spend before this order loses money.");
    }

    return messages.map((message) => `<p class="warning-text">${escapeHtml(message)}</p>`).join("");
}

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((target) => {
        target.textContent = value;
    });
}

function setHtml(selector, value) {
    document.querySelectorAll(selector).forEach((target) => {
        target.innerHTML = value;
    });
}

function renderFaq(items) {
    const html = items.map(([question, answer]) => `
        <details>
            <summary>${escapeHtml(question)}</summary>
            <p>${escapeHtml(answer)}</p>
        </details>
    `).join("");

    setHtml("[data-faq-list], [data-calculator-faq]", html);
}

function renderBreakdownTable(resultConfig, result, region) {
    const rows = resultConfig.map(([name, label, type]) => `
        <tr>
            <th scope="row">${escapeHtml(label)}</th>
            <td>${formatValue(result[name], type, region)}</td>
        </tr>
    `).join("");
    const html = `<table class="breakdown-table" data-breakdown-table><tbody>${rows}</tbody></table>`;

    document.querySelectorAll("[data-breakdown-table]").forEach((target) => {
        target.innerHTML = `<tbody>${rows}</tbody>`;
    });

    document.querySelectorAll("[data-fee-breakdown]").forEach((target) => {
        target.innerHTML = html;
    });
}

function bindMenu() {
    document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action='toggle-menu']");

        if (!button) {
            return;
        }

        const nav = document.getElementById("siteNav");
        const expanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!expanded));

        if (nav) {
            nav.classList.toggle("open", !expanded);
        }
    });
}

function bindRegionSelectors() {
    document.addEventListener("change", (event) => {
        const select = event.target.closest("[data-region-select]");

        if (!select) {
            return;
        }

        const nextRegion = findRegion(select.value);

        if (!nextRegion || nextRegion.status !== "active") {
            hydrateRegionSelectors();
            return;
        }

        activeRegionId = nextRegion.id;
        hydrateRegionSelectors();
        renderHomeCalculator();
        renderCalculatorPage();
    });
}

hydrateSharedLayout();
hydrateRegionSelectors();
bindMenu();
bindRegionSelectors();
renderHomeCalculator();
renderCalculatorPage();
