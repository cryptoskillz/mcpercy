module.exports = function(eleventyConfig) {
   eleventyConfig.addPassthroughCopy({
    "assets/pdf": "assets/pdf"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/images": "assets/images"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/css": "assets/css"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/js": "assets/js"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/fonts": "assets/fonts"
  });
    eleventyConfig.addPassthroughCopy({
    "assets/webfonts": "assets/webfonts"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/vendor": "assets/vendor"
  });
  eleventyConfig.addPassthroughCopy({
    "assets/scss": "assets/scss"
  });
    

  eleventyConfig.addPassthroughCopy({
    "robots.txt": "robots.txt"
  });

  };