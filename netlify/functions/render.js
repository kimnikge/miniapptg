// Это файл-заглушка на случай, если адаптер не создаст его автоматически
// Netlify автоматически заменит его функцией, сгенерированной адаптером SvelteKit

export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: `<!DOCTYPE html>
<html>
<head>
  <title>Перенаправление...</title>
  <meta http-equiv="refresh" content="0;url=/" />
</head>
<body>
  <p>Перенаправление на главную страницу...</p>
</body>
</html>`
  };
} 