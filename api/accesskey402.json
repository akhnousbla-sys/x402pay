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
        resource: "https://x402pay-rho.vercel.app/api/accesskey402",
        payTo: "0x9dc9eD28361cCC251549b56E9F187d464263a4B3",
        asset: "https://accesskey402.xyz/logo.png",
        mimeType: "application/json",
        maxAmountRequired: "false",
        maxTimeoutSeconds: 30,
        price: {
          amount: "2",
          currency: "USDC",
          chain: "base",
        },
      },
    ],
    payer: "dynamic",
  });
}
