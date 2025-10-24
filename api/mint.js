// /api/mint.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // body may be empty or have nested metadata
  const body = req.body || {};

  // Try many possible keys where x402scan or the payment system might include payer/wallet
  const possibleWallets = [
    body.wallet,
    body.payer,
    body.from,
    body.payerAddress,
    // nested metadata patterns
    (body.meta && body.meta.payer && body.meta.payer.address),
    (body.metadata && body.metadata.payer),
    // query param fallback
    (req.query && req.query.wallet),
    // common custom headers
    req.headers["x-payer-address"],
    req.headers["x-wallet"],
    req.headers["x-from"],
  ];

  // first defined and truthy wallet
  const wallet = possibleWallets.find(Boolean);

  // Basic Ethereum address validation: 0x + 40 hex chars
  function isValidEthAddress(addr) {
    if (typeof addr !== "string") return false;
    return /^0x[0-9a-fA-F]{40}$/.test(addr.trim());
  }

  if (!wallet || !isValidEthAddress(wallet)) {
    // Return helpful error + short debug info to find where payer is located.
    return res.status(400).json({
      success: false,
      error: "No valid wallet address found in request. Expected a 0x... Ethereum address.",
      debug: {
        bodyKeys: Object.keys(body || {}),
        headersPreview: {
          "x-payer-address": req.headers["x-payer-address"] || null,
          "x-wallet": req.headers["x-wallet"] || null,
          "x-from": req.headers["x-from"] || null,
        }
      }
    });
  }

  // Simulate a transaction hash for testing. Replace with real mint logic later.
  const fakeTx = "0x" + Math.random().toString(16).slice(2, 22) + "mint" + Date.now().toString(16);

  // Successful simulated mint response
  return res.status(200).json({
    success: true,
    message: `NFT minted (simulated) for ${wallet}`,
    txHash: fakeTx,
  });
}
