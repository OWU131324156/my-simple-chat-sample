const http = require('node:http');

const port = Number(process.env.PORT) || 8080;

const page = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>日時</title>
    <style>
      :root { color-scheme: light; font-family: system-ui, sans-serif; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #fff0f5; color: #493640; }
      main { text-align: center; padding: 2rem; }
      h1 { font-size: 1rem; font-weight: 500; opacity: .7; }
      time { font-size: clamp(2rem, 8vw, 5rem); font-variant-numeric: tabular-nums; }
    </style>
  </head>
  <body>
    <main>
      <h1>現在の日時（日本時間）</h1>
      <time id="datetime" aria-live="off"></time>
    </main>
    <script>
      const formatter = new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric', month: 'long', day: 'numeric',
        weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit',
        hourCycle: 'h23'
      });
      const output = document.querySelector('#datetime');
      function updateDateTime() {
        const now = new Date();
        output.dateTime = now.toISOString();
        output.textContent = formatter.format(now);
      }
      updateDateTime();
      setInterval(updateDateTime, 1000);
    </script>
  </body>
</html>`;

const server = http.createServer((request, response) => {
  if (request.url !== '/') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(page);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`日時表示を http://localhost:${port} で開けます`);
});
