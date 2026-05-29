(function attachSankeyRenderer(root, factory) {
    const api = factory();

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }

    root.MarginPathSankeyRenderer = api;
})(typeof window !== "undefined" ? window : globalThis, function createSankeyRenderer() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const chart = {
        width: 1220,
        height: 650,
        sourceX: 238,
        splitX: 675,
        sinkX: 1140,
        nodeWidth: 23,
        stackGap: 18
    };

    function clampNumber(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function round(value) {
        return Math.round(value * 10) / 10;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function toAmount(value) {
        return Math.max(0, Number(value || 0));
    }

    function createWidth(value, total, min, max) {
        if (toAmount(value) <= 0) {
            return 0;
        }

        const safeTotal = Math.max(Number(total || 0), 1);
        return round(clampNumber((toAmount(value) / safeTotal) * 360, min, max));
    }

    function sumNumbers(values) {
        return values.reduce((total, value) => total + value, 0);
    }

    function createNode(id, x, y, height, type, width = chart.nodeWidth) {
        return {
            id,
            type,
            x0: round(x),
            x1: round(x + width),
            y0: round(y),
            y1: round(y + height),
            height: round(height),
            centerY: round(y + height / 2)
        };
    }

    function createLink(id, source, target, value, width, y0, y1, type, position = {}) {
        return {
            id,
            source: source.id,
            target: target.id,
            value: round(value),
            width: round(width),
            type,
            x0: position.x0 === undefined ? source.x1 : round(position.x0),
            x1: position.x1 === undefined ? target.x0 : round(position.x1),
            y0: round(y0),
            y1: round(y1)
        };
    }

    function createHomeSankeyModel(input) {
        const grossRevenue = toAmount(input.grossRevenue);
        const profit = toAmount(input.netProfit);
        const cogs = toAmount(input.cogs);
        const affiliateCommission = toAmount(input.affiliateCommission);
        const referralFee = toAmount(input.referralFee);
        const shippingAds = toAmount(input.shippingAds);
        const totalOutflow = cogs + affiliateCommission + referralFee + shippingAds;
        const total = Math.max(grossRevenue, profit + totalOutflow, totalOutflow, 1);

        const profitWidth = createWidth(profit, total, 34, 172);
        const cogsWidth = createWidth(cogs, total, 30, 96);
        const affiliateWidth = createWidth(affiliateCommission, total, 18, 58);
        const referralWidth = createWidth(referralFee, total, 16, 46);
        const shippingWidth = createWidth(shippingAds, total, 30, 108);
        const childCostWidth = cogsWidth + affiliateWidth + referralWidth + shippingWidth;
        const costsWidth = round(Math.max(createWidth(totalOutflow, total, 112, 252), childCostWidth));
        const sourceHeight = round(profitWidth + costsWidth);
        const sourceY = round((chart.height - sourceHeight) / 2 - 72);
        const profitSourceY = round(sourceY + profitWidth / 2);
        const costsSourceY = round(sourceY + profitWidth + costsWidth / 2);

        const source = createNode("source", chart.sourceX, sourceY, sourceHeight, "source");
        const profitNode = createNode("profit", chart.sinkX, 70, profitWidth, "profit");
        const splitY = profitNode.y1;
        const costsNode = createNode("costs", chart.splitX, splitY, costsWidth, "cost");

        const cogsNode = createNode("cogs", chart.sinkX, 350 - cogsWidth / 2, cogsWidth, "cost");
        const affiliateNode = createNode("affiliateCommission", chart.sinkX, 438 - affiliateWidth / 2, affiliateWidth, "cost");
        const referralNode = createNode("referralFee", chart.sinkX, 500 - referralWidth / 2, referralWidth, "cost");
        const shippingNode = createNode("shippingAds", chart.sinkX, 574 - shippingWidth / 2, shippingWidth, "shipping");

        const branchWidths = [
            ["cogs", cogsWidth],
            ["affiliateCommission", affiliateWidth],
            ["referralFee", referralWidth],
            ["shippingAds", shippingWidth]
        ].filter(([, width]) => width > 0);
        const branchTotalWidth = Math.max(sumNumbers(branchWidths.map(([, width]) => width)), 1);
        let splitCursor = costsNode.y0 + Math.max((costsWidth - branchTotalWidth) / 2, 0);
        const stackCenters = {};
        branchWidths.forEach(([key, width]) => {
            if (width <= 0) {
                stackCenters[key] = splitCursor;
                return;
            }

            stackCenters[key] = round(splitCursor + width / 2);
            splitCursor += width;
        });

        ["cogs", "affiliateCommission", "referralFee", "shippingAds"].forEach((key) => {
            if (stackCenters[key] === undefined) {
                stackCenters[key] = costsNode.centerY;
            }
        });

        const links = [
            createLink("profit", source, profitNode, profit, profitWidth, profitSourceY, profitNode.centerY, "profit"),
            createLink("costs", source, costsNode, totalOutflow, costsWidth, costsSourceY, costsNode.centerY, "costs"),
            createLink("cogs", costsNode, cogsNode, cogs, cogsWidth, stackCenters.cogs, cogsNode.centerY, "cost"),
            createLink("affiliateCommission", costsNode, affiliateNode, affiliateCommission, affiliateWidth, stackCenters.affiliateCommission, affiliateNode.centerY, "cost"),
            createLink("referralFee", costsNode, referralNode, referralFee, referralWidth, stackCenters.referralFee, referralNode.centerY, "cost"),
            createLink("shippingAds", costsNode, shippingNode, shippingAds, shippingWidth, stackCenters.shippingAds, shippingNode.centerY, "shipping")
        ];

        const nodes = [source, profitNode, costsNode, cogsNode, affiliateNode, referralNode, shippingNode];
        const labels = [
            { id: "profit", label: "Gross Profit", value: profit, x: source.x0 - 218, y: source.centerY - 18, kind: "source" },
            { id: "grossRevenue", label: "Net Sales", value: grossRevenue, x: profitNode.x0 - 188, y: profitNode.centerY + 5, kind: "positive" },
            { id: "totalOutflow", label: "Costs", value: totalOutflow, x: costsNode.x1 + 28, y: costsNode.centerY - 38, kind: "negative" },
            { id: "cogs", label: "COGS", value: cogs, x: cogsNode.x0 - 146, y: cogsNode.centerY + 5, kind: "negative" },
            { id: "affiliateCommission", label: "Affiliate Commission", value: affiliateCommission, x: affiliateNode.x0 - 314, y: affiliateNode.centerY + 5, kind: "negative" },
            { id: "referralFee", label: "Platform Fees", value: referralFee, x: referralNode.x0 - 232, y: referralNode.centerY + 5, kind: "negative" },
            { id: "shippingAds", label: "Shipping + Ads", value: shippingAds, x: shippingNode.x0 - 236, y: shippingNode.centerY + 5, kind: "negative" }
        ];

        return { width: chart.width, height: chart.height, nodes, links, labels };
    }

    function createRibbonPath(link) {
        const curve = round((link.x1 - link.x0) * 0.48);
        const x0 = round(link.x0);
        const x1 = round(link.x1);
        const c0 = round(x0 + curve);
        const c1 = round(x1 - curve);
        const half = round(link.width / 2);
        const startHalf = half;
        const y0Top = round(link.y0 - startHalf);
        const y0Bottom = round(link.y0 + startHalf);
        const y1Top = round(link.y1 - half);
        const y1Bottom = round(link.y1 + half);

        return [
            `M${x0} ${y0Top}`,
            `C ${c0} ${y0Top} ${c1} ${y1Top} ${x1} ${y1Top}`,
            `L ${x1} ${y1Bottom}`,
            `C ${c1} ${y1Bottom} ${c0} ${y0Bottom} ${x0} ${y0Bottom}`,
            "Z"
        ].join(" ");
    }

    function defaultFormatMoney(value) {
        return `$${toAmount(value).toFixed(2)}`;
    }

    function defaultFormatSignedMoney(value) {
        return `-$${toAmount(value).toFixed(2)}`;
    }

    function createLabelValue(label, formatters) {
        if (label.id === "grossRevenue" || label.kind === "positive" || label.kind === "source") {
            return formatters.formatMoney(label.value);
        }

        return formatters.formatSignedMoney(-label.value);
    }

    function renderHomeSankeyDiagram(target, input, options) {
        if (!target || !target.ownerDocument) {
            return null;
        }

        const model = createHomeSankeyModel(input);
        const formatters = {
            formatMoney: options && options.formatMoney ? options.formatMoney : defaultFormatMoney,
            formatSignedMoney: options && options.formatSignedMoney ? options.formatSignedMoney : defaultFormatSignedMoney
        };

        target.innerHTML = `
            <svg class="sankey-rendered-svg alluvial-flow" viewBox="0 0 ${model.width} ${model.height}" role="img" aria-label="Profit flow Sankey diagram">
                <defs>
                    <linearGradient id="sankeyProfitGradient" x1="0" x2="1">
                        <stop offset="0" stop-color="#31d487" stop-opacity="0.98"/>
                        <stop offset="0.58" stop-color="#23a76c" stop-opacity="0.94"/>
                        <stop offset="1" stop-color="#17624a" stop-opacity="0.98"/>
                    </linearGradient>
                    <linearGradient id="sankeyCostGradient" x1="0" x2="1">
                        <stop offset="0" stop-color="#7b3241" stop-opacity="0.92"/>
                        <stop offset="1" stop-color="#dc4349" stop-opacity="0.94"/>
                    </linearGradient>
                    <linearGradient id="sankeyShippingGradient" x1="0" x2="1">
                        <stop offset="0" stop-color="#7b3241" stop-opacity="0.82"/>
                        <stop offset="1" stop-color="#d98c20" stop-opacity="0.94"/>
                    </linearGradient>
                    <filter id="sankeySoftShadow" x="-12%" y="-35%" width="124%" height="170%">
                        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.25"/>
                    </filter>
                </defs>
                <g class="sankey-links" filter="url(#sankeySoftShadow)">
                    ${model.links.filter((link) => link.width > 0).map((link) => `<path class="sankey-link sankey-link-${escapeHtml(link.id)} sankey-link-${escapeHtml(link.type)}" data-flow="${escapeHtml(link.id)}" data-link-id="${escapeHtml(link.id)}" d="${createRibbonPath(link)}"></path>`).join("")}
                </g>
                <g class="sankey-nodes">
                    ${model.nodes.filter((node) => node.height > 0 && node.x1 > node.x0).map((node) => `<rect class="sankey-node sankey-node-${escapeHtml(node.id)} sankey-node-${escapeHtml(node.type)}" data-node-id="${escapeHtml(node.id)}" x="${node.x0}" y="${node.y0}" width="${round(node.x1 - node.x0)}" height="${node.height}" rx="0"></rect>`).join("")}
                </g>
                <g class="sankey-labels">
                    ${model.labels.filter((label) => label.value > 0).map((label) => `
                        <text class="sankey-svg-label sankey-svg-label-${escapeHtml(label.kind)}" x="${label.x}" y="${label.y}">
                            <tspan>${escapeHtml(label.label)}</tspan>
                            <tspan class="sankey-svg-value" dx="8" data-sankey="${escapeHtml(label.id)}">${escapeHtml(createLabelValue(label, formatters))}</tspan>
                        </text>
                    `).join("")}
                </g>
            </svg>
        `;

        return model;
    }

    return {
        createHomeSankeyModel,
        createRibbonPath,
        renderHomeSankeyDiagram
    };
});
