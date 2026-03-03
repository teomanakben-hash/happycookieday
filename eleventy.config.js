const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy({"src/admin": "admin"});
  eleventyConfig.addPassthroughCopy({"src/static": "static"});

  // Collections: Products grouped by category
  eleventyConfig.addCollection("allProducts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/products/**/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Collection: Categories
  eleventyConfig.addCollection("allCategories", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/categories/**/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Filter: Get products by category slug
  eleventyConfig.addFilter("byCategory", function (products, categorySlug) {
    if (!products || !categorySlug) return [];
    return products.filter((p) => p.data.category === categorySlug);
  });

  // Filter: Get subcategories by parent
  eleventyConfig.addFilter("byParent", function (categories, parentSlug) {
    if (!categories || !parentSlug) return [];
    return categories.filter((c) => c.data.parent === parentSlug);
  });

  // Filter: Get top-level categories (no parent)
  eleventyConfig.addFilter("topLevel", function (categories) {
    if (!categories) return [];
    return categories.filter((c) => !c.data.parent || c.data.parent === "");
  });

  // Filter: slugify for Turkish characters
  eleventyConfig.addFilter("turkishSlug", function (str) {
    if (!str) return "";
    const charMap = {
      ç: "c", Ç: "C", ğ: "g", Ğ: "G", ı: "i", İ: "I",
      ö: "o", Ö: "O", ş: "s", Ş: "S", ü: "u", Ü: "U",
    };
    return str
      .split("")
      .map((c) => charMap[c] || c)
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
