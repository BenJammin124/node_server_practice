import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const hostname = "127.0.0.1";
const port = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "about.html");
      } else if (req.url === "/contact-me") {
        filePath = path.join(__dirname, "contact-me.html");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    const data = await fs.readFile("./404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
