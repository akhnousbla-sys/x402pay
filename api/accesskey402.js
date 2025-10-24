// /api/accesskey402.js
export default function handler(req, res) {
  res.status(402).json({
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        name: "AccessKey402 NFT Mint",
        description:
          "AccessKey402 is a collection of 6,666 digital keys granting access to the x402 ecosystem.",
        resource: "https://x402pay-rho.vercel.app/api/mint",
        payTo: "0x9dc9eD28361cCC251549b56E9F187d464263a4B3",
        mimeType: "application/json",
        asset: "https://i.imgur.com/hAkRxli.png",

        // ✅ try this string value — accepted by latest x402scan versions
        maxAmountRequired: "required",

        maxTimeoutSeconds: 30,
        price: {
          amount: "2",
          amountUSD: "2",
          currency: "USDC",
          chain: "base",
        },

        outputSchema: {
          input: {
            type: "http",
            method: "POST",
            bodyType: "json",
          },
          output: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              txHash: { type: "string" },
            },
          },
        },
      },
    ],
    payer: "dynamic",
  });
}
