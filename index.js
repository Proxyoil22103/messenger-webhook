const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const VERIFY_TOKEN = "proxyoille_verify_tok_456";

app.use(bodyParser.json());

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    console.log("Webhook verification failed ❌");
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  console.log("Received webhook event:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});