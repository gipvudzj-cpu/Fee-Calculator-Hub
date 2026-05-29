const assert = require("node:assert/strict");
const {
  createHomeSankeyModel,
  createRibbonPath,
} = require("../sankey-renderer.js");

const model = createHomeSankeyModel({
  grossRevenue: 30,
  netProfit: 8.2,
  cogs: 8,
  affiliateCommission: 3,
  referralFee: 1.8,
  shippingAds: 9,
});

assert.equal(model.nodes.length, 7, "home sankey node count");
assert.equal(model.links.length, 6, "home sankey link count");
assert.equal(model.links[0].id, "profit", "profit link is first");
assert.equal(model.links[0].source, "source", "profit link source");
assert.equal(model.links[0].target, "profit", "profit link target");
assert.ok(model.links[0].width > model.links[2].width, "profit flow is wider than COGS for this sample");
assert.ok(model.links.find((link) => link.id === "shippingAds").width > model.links.find((link) => link.id === "referralFee").width, "shipping plus ads flow is wider than platform fees");

const splitNode = model.nodes.find((node) => node.id === "costs");
const costsLink = model.links.find((link) => link.id === "costs");
const cogsLink = model.links.find((link) => link.id === "cogs");
const profitLink = model.links.find((link) => link.id === "profit");
const sourceNode = model.nodes.find((node) => node.id === "source");
const profitLabel = model.labels.find((label) => label.id === "profit");
assert.ok(Math.abs((profitLink.y0 + profitLink.width / 2) - (costsLink.y0 - costsLink.width / 2)) < 1e-9, "profit and cost trunks touch at the source with no middle gap");
assert.ok(Math.abs((profitLink.y1 + profitLink.width / 2) - (costsLink.y1 - costsLink.width / 2)) < 1e-9, "profit and cost trunks touch at the split side with no middle gap");
assert.ok(Math.abs(sourceNode.height - (profitLink.width + costsLink.width)) < 1e-9, "source node height matches stacked trunk widths without extra gap");
assert.ok(splitNode.x1 > splitNode.x0, "cost split node is visible like the reference");
assert.equal(splitNode.height, costsLink.width, "cost split node is flush with the trunk height");
assert.equal(costsLink.x1, splitNode.x0, "cost trunk ends at the split bar");
assert.equal(cogsLink.x0, splitNode.x1, "cost branches start at the split bar");
assert.ok(profitLabel.x < sourceNode.x0, "gross profit label sits to the left of the source bar like the reference");
const cogsPath = createRibbonPath(cogsLink);
const cogsStartTop = Number(cogsPath.match(/^M\d+(\.\d+)? ([\d.]+)/)[2]);
assert.equal(Math.abs(cogsLink.y0 - cogsStartTop), cogsLink.width / 2, "branch starts with its full Sankey width at the split bar");

const childCostLinks = model.links.filter((link) => ["cogs", "affiliateCommission", "referralFee", "shippingAds"].includes(link.id) && link.width > 0);
const childTop = Math.min(...childCostLinks.map((link) => link.y0 - link.width / 2));
const childBottom = Math.max(...childCostLinks.map((link) => link.y0 + link.width / 2));
assert.ok(childTop >= splitNode.y0 - 1e-9, "child cost branches do not protrude above the split node");
assert.ok(childBottom <= splitNode.y1 + 1e-9, "child cost branches do not protrude below the split node");

const path = createRibbonPath(model.links[0]);
assert.match(path, /^M\d+(\.\d+)? /, "ribbon path starts with move command");
assert.match(path, / C /, "ribbon path contains cubic curves");
assert.match(path, / Z$/, "ribbon path closes");

const zeroCommission = createHomeSankeyModel({
  grossRevenue: 30,
  netProfit: 20,
  cogs: 10,
  affiliateCommission: 0,
  referralFee: 0,
  shippingAds: 0,
});

assert.equal(zeroCommission.links.find((link) => link.id === "affiliateCommission").width, 0, "zero affiliate flow has no width");
assert.equal(zeroCommission.links.find((link) => link.id === "referralFee").width, 0, "zero platform fee flow has no width");

const fakeTarget = {
  ownerDocument: {},
  innerHTML: "",
};

const { renderHomeSankeyDiagram } = require("../sankey-renderer.js");
renderHomeSankeyDiagram(fakeTarget, {
  grossRevenue: 30,
  netProfit: 8.2,
  cogs: 8,
  affiliateCommission: 3,
  referralFee: 1.8,
  shippingAds: 9,
});

assert.ok(!fakeTarget.innerHTML.includes("sankey-sale-bubble"), "renderer does not output the old circular source bubble");
assert.ok(fakeTarget.innerHTML.includes("Gross Profit"), "renderer includes the left source label");
assert.ok(fakeTarget.innerHTML.includes('data-link-id="profit"'), "renderer exposes stable link ids for browser QA");
assert.ok(fakeTarget.innerHTML.includes('data-node-id="source"'), "renderer exposes stable node ids for browser QA");
assert.ok(!fakeTarget.innerHTML.includes("Gross Profit</tspan>\n                            <tspan class=\"sankey-svg-value\" dx=\"8\" data-sankey=\"profit\">-$"), "gross profit source label is positive");

console.log("Sankey renderer tests passed.");
