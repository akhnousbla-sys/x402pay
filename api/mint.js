// api/accesskey402/mint.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const { wallet } = req.body;
    res.status(200).json({
      success: true,
      message: `NFT minted for ${wallet}`,
      txHash: "0xabc123def456mint789fake",
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
