const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const PRIVATE_KEY = "KIse8-XOB8v-mab0O-iUlwn-cae9x"; // Private key Tripay kamu

app.post("/tripay-callback", (req, res) => {
  const callbackSignature = req.headers["x-callback-signature"];
  const json = JSON.stringify(req.body);
  const signature = crypto.createHmac("sha256", PRIVATE_KEY).update(json).digest("hex");

  if (callbackSignature !== signature) {
    return res.status(403).send("Invalid signature");
  }

  const data = req.body;
  console.log("Tripay Callback Data:", data);

  // Di sini kamu bisa tambahkan logika untuk update status transaksi

  return res.status(200).send("Callback received successfully");
});

app.get("/", (req, res) => {
  res.send("Tripay Webhook is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
