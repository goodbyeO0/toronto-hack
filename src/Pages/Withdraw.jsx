import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { ethers, Contract } from "ethers";
import healthItemPurchase from "../artifacts/contracts/HealthItemPurchase.sol/HealthItemPurchase.json";

function WithdrawFunds() {
  const { account, library } = useEthers();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const contractAddress = "0x7d1E59d09729ab9E90330718f53212b8F184d5fB"; // Replace with your contract address

  const handleWithdraw = async () => {
    if (!account || !library) return;

    setIsLoading(true);
    setTxHash("");

    try {
      const provider =
        library || new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      const contract = new Contract(
        contractAddress,
        healthItemPurchase.abi,
        signer
      );

      const tx = await contract.withdraw(); // Call the withdraw function
      setTxHash(tx.hash); // Store the transaction hash

      await tx.wait(); // Wait for the transaction to be mined
      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Error during withdrawal:", error);
      alert("Withdrawal failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Withdraw Funds</h1>

      <div className="text-center">
        <button
          onClick={handleWithdraw}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Withdraw Funds"}
        </button>

        {txHash && (
          <div className="mt-4">
            <p>Transaction Hash:</p>
            <a
              href={`https://puppyscan.shib.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {txHash}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default WithdrawFunds;
