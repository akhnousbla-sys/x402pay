// /api/mint.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const wallet =
    body.wallet ||
    body.payer ||
    body.from ||
    body.payerAddress ||
    body?.meta?.payer?.address ||
    body?.metadata?.payer ||
    req.headers["x-payer-address"] ||
    req.headers["x-wallet"] ||
    req.headers["x-from"];

  if (!wallet || !/^0x[0-9a-fA-F]{40}$/.test(wallet)) {
    return res.status(400).json({
      success: false,
      error: "Invalid or missing wallet address.",
    });
  }

  try {
    // ⚙️ Call Thirdweb API to mint directly to user
    const response = await fetch("https://api.thirdweb.com/v1/contracts/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": process.env.THIRDWEB_SECRET_KEY,
      },
      body: JSON.stringify({
        chainId: 8453, // Base mainnet
        calls: [
          {
            contractAddress: "0x2a461561fA187969500da78dBE029626fF767CCD", // your Thirdweb contract
            functionName: "mintTo",
            args: [wallet, 1], // mint 1 NFT to payer wallet
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: "Thirdweb mint failed",
        details: data,
      });
    }

    return res.status(200).json({
      success: true,
      message: `NFT minted on Base for ${wallet}`,
      tx: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Mint failed",
    });
  }
}
