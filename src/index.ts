import { serve } from "@hono/node-server";
import { Hono } from "hono";

const DATABASE: string[] = [];

const app = new Hono();

app.get("/", async (c) => {
  return c.html(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Form Action</title>
      </head>
      <body>
        <ul>
          ${DATABASE.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <form action="/add" method="post">
          <input type="text" name="item" placeholder="Enter soemthing">
          <button type="submit">Submit</button>
        </form>
        <script>
          window.onload = () => {
            console.log("JS is Ready");
          };
        </script>
      </body>
    </html>
  `);
});

app.post("/add", async (c) => {
  const body = await c.req.parseBody();
  DATABASE.push(body.item.toString());
  return c.redirect("/");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
