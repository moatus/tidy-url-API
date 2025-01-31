const express = require('express');
const { TidyURL } = require('tidy-url');
const app = express();

app.use(express.json());

app.post('/clean', (req, res) => {
  const urls = Array.isArray(req.body.urls) ? req.body.urls : [req.body.urls];
  const results = urls.map(url => {
    try {
      const cleaned = TidyURL.clean(url);
      return { original: url, cleaned: cleaned.url };
    } catch (error) {
      return { original: url, error: "Invalid URL" };
    }
  });
  res.json(results);
});

app.listen(4301, () => {
  console.log('URL cleaner service running on port 4301');
});
