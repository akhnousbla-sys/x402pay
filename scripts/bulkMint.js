import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import fs from "fs";

async function main() {
  // Connect to Thirdweb using your secret key and Base network
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.THIRDWEB_SECRET_KEY, "base");

  // Your NFT contract address
  const contract = await sdk.getContract("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913");

  // Read the wallets that paid from paid.json
  const payments = JSON.parse(fs.readFileSync("paid.json", "utf8"));

  // Mint NFT for each wallet
  for (const user of payments) {
    await contract.erc721.mintTo(user.wallet, {
      name: "AccessKey402",
      description: "Access Key NFT for x402 ecosystem",
      image: "ipfs://QmYourImageHashHere", // ⚠️ replace with your IPFS image link
    });

    console.log(`✅ Minted NFT to ${user.wallet}`);
  }

  console.log("🎉 All NFTs minted successfully!");
}

// Run script
main().catch((err) => {
  console.error("❌ Error while minting:", err);
});
