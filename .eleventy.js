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

   eleventyConfig.addNunjucksAsyncFilter("jsmin", async (code, callback) => {
    try {
      const minified = await Terser.minify(code);
      return callback(null, minified.code);
    } catch (err) {
      console.error("Error during terser minify:", err);
      return callback(err, code);
    }
  });

  };