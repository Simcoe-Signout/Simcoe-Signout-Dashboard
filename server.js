const express = require('express');
const { createServer } = require('vite');

async function startServer() {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
  } else {
    const vite = await createServer({
      server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
