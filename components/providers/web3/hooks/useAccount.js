import { useState, useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x5095B5F5B9cE6f9700a7c44781b667eC1657d2cc": true,
};

export const handler = (web3, provider) => () => {
  const { mutate, data, ...rest } = useSWR(
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);
  return {
    account: {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
