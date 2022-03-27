import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Network, TokenInfo } from "./types";
import { useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  font-family: "DM Sans", sans-serif;
  font-size: 18px;
  padding: 12px 32px;
  margin: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  border-radius: 50px;

  background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
  border: 0;
  color: white !important;
`;

const Helper = styled.div`
  color: white;
  font-size: 16px;
  text-align: center;
`;
const polyGonNetwork: Network = {
  chainId: "0x89",
  rpcUrls: ["https://rpc-mainnet.matic.network/"],
  chainName: "Matic Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  blockExplorerUrls: ["https://polygonscan.com/"]
};

const henkakuToken: TokenInfo = {
  type: "ERC20",
  options: {
    address: "0xd59FFEE93A55F67CeD0F56fa4A991d4c8c8f5C4E",
    symbol: "HENKAKU",
    decimals: 18,
    image:
      "https://raw.githubusercontent.com/henkaku-center/shiniri/main/public/henkakuToken.png"
  }
};

const AddHenkakuToken: React.VFC = () => {
  const context = useWeb3React();
  const { library } = context;

  const addHenkakuToken = async () => {
    if (!library) {
      return;
    }
    try {
      const wasAdded = await library.provider.request({
        method: "wallet_watchAsset",
        params: henkakuToken
      });

      if (wasAdded) {
        alert("Wow Epic! Go back to discord / これで全てが終了だおめでとう");
      }
    } catch (e) {
      console.log(e);
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`);
    }
  };

  return (
    <Button onClick={addHenkakuToken}>
      Add henkaku token / Henkakuトークンを追加する
    </Button>
  );
};

const AddPolygonNetwork: React.VFC = () => {
  const context = useWeb3React();
  const { library } = context;

  const addPolygonNetwork = async () => {
    if (!library) {
      return;
    }
    try {
      await library.provider.request({
        method: "wallet_addEthereumChain",
        params: [polyGonNetwork]
      });
    } catch (e) {
      console.log(e);
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`);
    }
  };
  return (
    <Button onClick={addPolygonNetwork}>
      Add Polygon Network / Polygonのネットワークに接続する
    </Button>
  );
};

const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({});
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();
  const onClick = () => {
    console.log(injectedConnector);
    activate(injectedConnector);
  };

  useEffect(() => {
    console.log(chainId, account, active);
  }, [account]);

  return (
    <>
      {active ? (
        ""
      ) : (
        <Helper>
          <p>
            You are not connected to Metamask <br />{" "}
            Metamaskに繋がっていないようだ
          </p>
          <Button type="button" onClick={onClick}>
            Connect Metamask / Metamaskに接続する
          </Button>
        </Helper>
      )}
      {active && chainId != 137 ? (
        <Helper>
          <p>
            Now, connected to Metamask <br /> Metamaskにはつながったようだ
          </p>
          <p>
            You are not connected to Polygon Netowrk. Switch or add polygon
            network <br />{" "}
            ただ、ポリゴンのネットワークにはつながっていないようだ
          </p>
          <AddPolygonNetwork />
        </Helper>
      ) : (
        ""
      )}

      {active && chainId == 137 ? (
        <Helper>
          <p>
            Add Henkaku Token to your Metamask / 最後だ。Henkaku
            Tokenを追加してくれ
          </p>
          <AddHenkakuToken />
        </Helper>
      ) : (
        ""
      )}
    </>
  );
};

export { ConnectWallet, AddHenkakuToken, AddPolygonNetwork };
