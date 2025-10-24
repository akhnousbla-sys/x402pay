// /api/mint.js
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Method not allowed" });

  const { wallet, txHash } = req.body;

  if (!wallet || !txHash)
    return res.status(400).json({ success: false, error: "Missing data" });

  const filePath = "paid.json";
  let payments = [];
  if (fs.existsSync(filePath)) {
    payments = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  payments.push({ wallet, txHash, date: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

  return res.status(200).json({ success: true, message: "Payment saved" });
}
