import { X402Client } from "@coinbase/x402";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { wallet } = req.body;
    if (!wallet) {
      return res.status(400).json({ success: false, error: "Missing wallet address" });
    }

    // Initialize Coinbase X402 client
    const client = new X402Client({
      apiKey: process.env.COINBASE_API_KEY, // put this in your .env later
      apiSecret: process.env.COINBASE_API_SECRET,
    });

    // Call your on-chain mint logic here
    console.log(`Minting NFT for wallet: ${wallet}`);

    // Dummy success response (replace with your real mint logic)
    return res.status(200).json({
      success: true,
      message: `NFT successfully minted for wallet ${wallet}`,
    });

  } catch (error) {
    console.error("Mint error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
