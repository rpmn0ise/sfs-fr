module.exports = function (eleventyConfig) {
  const yaml = require("js-yaml");

  // Allow global data files written in YAML (e.g. src/_data/faq.yaml)
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Static assets copied as-is to the output directory
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon.ico": "favicon.ico" });

  // Tutos collection, sorted by publication date (most recent first)
  eleventyConfig.addCollection("tutos", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/tutos/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Human readable date filter, e.g. 3 juillet 2026
  eleventyConfig.addFilter("dateFr", function (dateObj) {
    const mois = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    const d = new Date(dateObj);
    return `${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}`;
  });

  // W3C date filter for sitemap.xml
  eleventyConfig.addFilter("dateW3C", function (dateObj) {
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  // Category label helper shared across templates
  eleventyConfig.addFilter("categoryLabel", function (slug) {
    const labels = {
      orbite: "Orbite",
      atterrissage: "Atterrissage",
      optimisation: "Optimisation",
      modding: "Modding"
    };
    return labels[slug] || slug;
  });

  eleventyConfig.addFilter("limit", function (arr, n) {
    return arr.slice(0, n);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "xml", "txt"]
  };
};
