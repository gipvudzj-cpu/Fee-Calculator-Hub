const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modalTitle");
const modalKicker = document.querySelector("#modalKicker");
const modalBody = document.querySelector("#modalBody");
const toast = document.querySelector(".toast");

const panelContent = {
    dashboard: {
        kicker: "Dashboard",
        title: "Seller Performance Snapshot",
        body: `
            <p>This window summarizes what a seller would see after connecting their storefront.</p>
            <ul>
                <li>3 listings need title improvements.</li>
                <li>12 reviews are waiting for reply drafts.</li>
                <li>German and Spanish translations are ready for review.</li>
            </ul>
            <div class="modal-actions">
                <button type="button" data-action="generate-listing">Optimize top listing</button>
                <button type="button" data-action="open-history">View activity</button>
            </div>
        `
    },
    listings: {
        kicker: "Listings",
        title: "Listing Queue",
        body: `
            <p>Open, score, and improve marketplace listings from one clean queue.</p>
            <ul>
                <li>Reusable Insulated Water Bottle - SEO score 92.</li>
                <li>Travel Cutlery Set - SEO score 78.</li>
                <li>Foldable Storage Bin - SEO score 84.</li>
            </ul>
            <div class="modal-actions">
                <button type="button" data-action="copy-title">Copy best title</button>
                <button type="button" data-action="export-listing">Export listing</button>
            </div>
        `
    },
    reviews: {
        kicker: "Reviews",
        title: "Review Inbox",
        body: `
            <p>Reply to praise, complaints, and delivery issues without sounding robotic.</p>
            <ul>
                <li>1 damaged package issue needs a thoughtful response.</li>
                <li>4 positive reviews can receive quick thank-you replies.</li>
                <li>2 product questions should be routed to the listing FAQ.</li>
            </ul>
            <div class="modal-actions">
                <button type="button" data-action="draft-reply">Edit reply draft</button>
                <button type="button" data-action="schedule-reply">Schedule reply</button>
            </div>
        `
    },
    translation: {
        kicker: "Translation",
        title: "Marketplace Localization",
        body: `
            <p>Translate listings by market while preserving search keywords and buyer intent.</p>
            <ul>
                <li>Spanish: adapt gym and travel terms for Amazon US shoppers.</li>
                <li>German: shorten title for marketplace readability.</li>
                <li>French: keep premium tone for Shopify product page.</li>
            </ul>
            <div class="modal-actions">
                <button type="button" data-action="translate-listing">Open translator</button>
            </div>
        `
    },
    insights: {
        kicker: "Insights",
        title: "Keyword and Conversion Insights",
        body: `
            <p>Turn listing data into specific next actions for product, copy, and reviews.</p>
            <ul>
                <li>"Leakproof bottle" is the strongest intent keyword.</li>
                <li>"Gift for hikers" could become a new seasonal angle.</li>
                <li>Delivery damage appears in 6 percent of low-star reviews.</li>
            </ul>
            <div class="modal-actions">
                <button type="button" data-action="competitor-scan">Run competitor scan</button>
            </div>
        `
    }
};

const actionContent = {
    "marketplace-menu": {
        kicker: "Marketplace",
        title: "Choose Marketplace",
        body: `
            <p>Select where the generated listing should be optimized.</p>
            <div class="modal-actions">
                <button type="button" data-set-marketplace="Amazon US">Amazon US</button>
                <button type="button" data-set-marketplace="Shopify">Shopify</button>
                <button type="button" data-set-marketplace="Etsy">Etsy</button>
                <button type="button" data-set-marketplace="TikTok Shop">TikTok Shop</button>
            </div>
        `
    },
    "language-menu": {
        kicker: "Language",
        title: "Choose Output Language",
        body: `
            <p>Set the language for the next generated or translated listing.</p>
            <div class="modal-actions">
                <button type="button" data-set-language="English">English</button>
                <button type="button" data-set-language="中文">中文</button>
                <button type="button" data-set-language="Spanish">Spanish</button>
                <button type="button" data-set-language="German">German</button>
                <button type="button" data-set-language="French">French</button>
            </div>
        `
    },
    notifications: {
        kicker: "Notifications",
        title: "Recent Alerts",
        body: `
            <ul>
                <li>New low-star review detected for Insulated Water Bottle.</li>
                <li>Keyword opportunity found: leakproof gym bottle.</li>
                <li>Translation review is ready for German listing.</li>
            </ul>
        `
    },
    "profile-menu": {
        kicker: "Profile",
        title: "Account Window",
        body: `
            <p>MJ Store Ops is connected to Amazon US, Shopify, and Etsy demo stores.</p>
            <div class="modal-actions">
                <button type="button" data-action="notifications">Open alerts</button>
                <button type="button" data-action="open-history">View workspace history</button>
            </div>
        `
    },
    "open-history": {
        kicker: "History",
        title: "Recent AI Runs",
        body: `
            <ul>
                <li>Generated Amazon title for insulated bottle.</li>
                <li>Translated product description into Spanish.</li>
                <li>Drafted reply for damaged delivery box review.</li>
            </ul>
        `
    },
    "brief-help": {
        kicker: "Help",
        title: "Writing a Better Product Brief",
        body: `
            <p>Use concrete product facts, buyer use cases, and constraints. The stronger the brief, the sharper the listing.</p>
            <ul>
                <li>Add materials, dimensions, and standout benefits.</li>
                <li>Include words customers already search for.</li>
                <li>Pick one tone so the copy stays consistent.</li>
            </ul>
        `
    },
    "keyword-cleaner": {
        kicker: "Keyword Tool",
        title: "Cleaned Keyword Set",
        body: `
            <p>Duplicate and low-intent terms were removed from the keyword field.</p>
            <ul>
                <li>stainless steel bottle</li>
                <li>leakproof travel bottle</li>
                <li>cold drink bottle</li>
                <li>gym water bottle</li>
            </ul>
        `
    },
    "competitor-scan": {
        kicker: "Competitor Scan",
        title: "Top Competitor Patterns",
        body: `
            <p>Winning listings lead with practical use cases before technical specifications.</p>
            <ul>
                <li>Most top titles mention leakproof and stainless steel.</li>
                <li>Buyers respond to travel, gym, and work scenarios.</li>
                <li>Packaging complaints should be addressed in support replies.</li>
            </ul>
        `
    },
    "image-prompts": {
        kicker: "Image Prompts",
        title: "Product Image Prompt Pack",
        body: `
            <p>Use these prompts to create consistent listing visuals.</p>
            <ul>
                <li>Studio product shot on white background with cap detail.</li>
                <li>Lifestyle shot in gym bag side pocket.</li>
                <li>Infographic showing cold retention and leakproof lid.</li>
            </ul>
        `
    },
    "copy-title": {
        kicker: "Copied",
        title: "Title Ready to Paste",
        body: `
            <p>The optimized title has been copied into this window for review:</p>
            <p><strong>Reusable Insulated Water Bottle, Leakproof Stainless Steel Travel Cup for Gym, Work, and Outdoor Trips</strong></p>
        `
    },
    "export-listing": {
        kicker: "Export",
        title: "Listing Export Options",
        body: `
            <p>Choose the format for moving listing copy into your store workflow.</p>
            <div class="modal-actions">
                <button type="button" data-action="export-csv">CSV</button>
                <button type="button" data-action="export-doc">Document</button>
                <button type="button" data-action="export-shopify">Shopify CSV</button>
            </div>
        `
    },
    "translate-listing": {
        kicker: "Translation",
        title: "Spanish Listing Draft",
        body: `
            <p><strong>Title:</strong> Botella de agua reutilizable de acero inoxidable, a prueba de fugas, ideal para gimnasio, trabajo y viajes.</p>
            <p><strong>Note:</strong> Search terms were localized instead of translated word for word.</p>
        `
    },
    "open-product": {
        kicker: "Product",
        title: "Reusable Insulated Water Bottle",
        body: `
            <p>This product window brings together listing copy, review signals, and marketplace readiness.</p>
            <ul>
                <li>Primary audience: commuters, gym shoppers, and travelers.</li>
                <li>Main promise: cold drinks with a leakproof lid.</li>
                <li>Next action: add packaging reassurance to the description.</li>
            </ul>
        `
    },
    "draft-reply": {
        kicker: "Review Reply",
        title: "Editable Reply Draft",
        body: `
            <p>Thank you for the helpful feedback. We are glad the bottle is working well, and we are sorry the delivery box arrived damaged. Please contact us so we can make this right.</p>
            <div class="modal-actions">
                <button type="button" data-action="approve-reply">Approve reply</button>
                <button type="button" data-action="schedule-reply">Schedule reply</button>
            </div>
        `
    },
    "approve-reply": {
        kicker: "Approved",
        title: "Reply Approved",
        body: "<p>The reply is approved and ready to publish from the seller account.</p>"
    },
    "schedule-reply": {
        kicker: "Schedule",
        title: "Schedule Reply",
        body: `
            <p>Pick a publishing window that matches your support hours.</p>
            <div class="modal-actions">
                <button type="button" data-schedule="Today 4:00 PM">Today 4:00 PM</button>
                <button type="button" data-schedule="Tomorrow 9:00 AM">Tomorrow 9:00 AM</button>
                <button type="button" data-schedule="Friday 2:00 PM">Friday 2:00 PM</button>
            </div>
        `
    },
    "tab-amazon": {
        kicker: "Amazon",
        title: "Amazon Listing View",
        body: "<p>Amazon view prioritizes title clarity, backend keywords, bullet order, and review response speed.</p>"
    },
    "tab-shopify": {
        kicker: "Shopify",
        title: "Shopify Product Page View",
        body: "<p>Shopify view prioritizes brand tone, product story, conversion copy, and collection page snippets.</p>"
    },
    "tab-etsy": {
        kicker: "Etsy",
        title: "Etsy Listing View",
        body: "<p>Etsy view prioritizes handmade-friendly wording, tags, gift angles, and concise shipping reassurance.</p>"
    },
    "export-csv": {
        kicker: "Export",
        title: "CSV Export Prepared",
        body: "<p>A CSV export would include title, bullets, description, keywords, marketplace, and language columns.</p>"
    },
    "export-doc": {
        kicker: "Export",
        title: "Document Export Prepared",
        body: "<p>A document export would package the title, bullets, description, and review reply draft for team review.</p>"
    },
    "export-shopify": {
        kicker: "Export",
        title: "Shopify CSV Prepared",
        body: "<p>A Shopify-ready CSV would map the generated copy into product title, body HTML, tags, and SEO fields.</p>"
    }
};

function openModal(kicker, title, body) {
    modalKicker.textContent = kicker;
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modal.hidden = false;
}

function closeModal() {
    modal.hidden = true;
}

function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        toast.hidden = true;
    }, 2400);
}

function generateListing() {
    const productName = document.querySelector("#productName").value.trim() || "Reusable Insulated Water Bottle";
    const tone = document.querySelector("#tone").value;
    const marketplace = document.querySelector("#marketplace").value;
    const title = `${productName}, Leakproof Stainless Steel Bottle for Gym, Work, Travel, and Daily Hydration`;

    document.querySelector("#listingTitle").textContent = title;
    document.querySelector("#descriptionText").textContent = `A ${tone.toLowerCase()} ${marketplace} listing draft that highlights cold drinks, leakproof carry, and everyday durability for busy shoppers.`;
    document.querySelector("#seoScore").textContent = "94";
    showToast("Listing regenerated with a stronger marketplace angle.");
}

function handlePanelClick(button) {
    document.querySelectorAll('[data-panel]').forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const panel = panelContent[button.dataset.panel];
    openModal(panel.kicker, panel.title, panel.body);
}

function handleAction(action) {
    if (action === "generate-listing") {
        generateListing();
        return;
    }

    if (action === "close-modal") {
        closeModal();
        return;
    }

    const content = actionContent[action];
    if (content) {
        openModal(content.kicker, content.title, content.body);
        return;
    }

    showToast("Window opened.");
}

document.querySelectorAll('[data-panel]').forEach((button) => {
    button.addEventListener("click", () => handlePanelClick(button));
});

document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
});

modal.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    const marketplaceTarget = event.target.closest("[data-set-marketplace]");
    const languageTarget = event.target.closest("[data-set-language]");
    const scheduleTarget = event.target.closest("[data-schedule]");

    if (actionTarget) {
        handleAction(actionTarget.dataset.action);
    }

    if (marketplaceTarget) {
        document.querySelector("[data-action='marketplace-menu']").textContent = marketplaceTarget.dataset.setMarketplace;
        document.querySelector("#marketplace").value = marketplaceTarget.dataset.setMarketplace;
        closeModal();
        showToast(`Marketplace set to ${marketplaceTarget.dataset.setMarketplace}.`);
    }

    if (languageTarget) {
        document.querySelector("[data-action='language-menu']").textContent = languageTarget.dataset.setLanguage;
        closeModal();
        showToast(`Output language set to ${languageTarget.dataset.setLanguage}.`);
    }

    if (scheduleTarget) {
        closeModal();
        showToast(`Reply scheduled for ${scheduleTarget.dataset.schedule}.`);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        closeModal();
    }
});

document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
    });
});
