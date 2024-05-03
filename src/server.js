const app = require('./app');
const fs = require('fs')
const https = require("https")
const http = require("http")

const port = process.env.PORT || 8080;

const server = process.env.NODE_ENV === 'production' ? https.createServer({
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
}, app) : http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});