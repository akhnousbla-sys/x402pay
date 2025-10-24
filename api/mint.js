// /api/mint.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const possibleWallets = [
    body.wallet,
    body.payer,
    body.from,
    body.payerAddress,
    body.meta && body.meta.payer && body.meta.payer.address,
    body.metadata && body.metadata.payer,
    req.query && req.query.wallet,
    req.headers["x-payer-address"],
    req.headers["x-wallet"],
    req.headers["x-from"],
  ];

  const wallet = possibleWallets.find(Boolean);

  function isValidEthAddress(addr) {
    if (typeof addr !== "string") return false;
    return /^0x[0-9a-fA-F]{40}$/.test(addr.trim());
  }

  if (!wallet || !isValidEthAddress(wallet)) {
    return res.status(400).json({
      success: false,
      error: "No valid wallet address found in request.",
      received: {
        bodyKeys: Object.keys(body || {}),
        headersPreview: {
          "x-payer-address": req.headers["x-payer-address"] || null,
          "x-wallet": req.headers["x-wallet"] || null,
        },
      },
    });
  }

  const fakeTx =
    "0x" + Math.random().toString(16).slice(2, 22) + "mint" + Date.now().toString(16);

  return res.status(200).json({
    success: true,
    message: `NFT minted (simulated) for ${wallet}`,
    txHash: fakeTx,
  });
}
