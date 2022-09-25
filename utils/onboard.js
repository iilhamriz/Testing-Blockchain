const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY;
const RPC_URL_RINKEBY = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL_RINKEBY;
const RPC_URL_ETHW = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL_RINKEBY;

import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";
import fortmaticModule from '@web3-onboard/fortmatic'
import Logo from './Logo'

const fortmatic = fortmaticModule({
  apiKey: process.env.NEXT_PUBLIC_FORTMATIC_KEY,
});

const injected = injectedModule();
const coinbaseWallet = coinbaseModule();
const walletConnect = walletConnectModule();

const initOnboard = init({
  wallets: [walletConnect, coinbaseWallet, injected, fortmatic],
  chains: [
    // {
    //   id: '0x1',
    //   token: 'ETH',
    //   label: 'Ethereum Mainnet',
    //   rpcUrl: 'https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    // },
    // {
    //   id: '0x3',
    //   token: 'tROP',
    //   label: 'Ethereum Ropsten Testnet',
    //   rpcUrl: 'https://ropsten.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    // },
    {
      id: "0x4",
      token: "rETH",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: RPC_URL_RINKEBY,
    },
    {
      id: "0x16",
      token: "ETHW",
      label: "Ethereum ETHW Testnet",
      rpcUrl: RPC_URL_ETHW,
    },
    // {
    //   id: '0x89',
    //   token: 'MATIC',
    //   label: 'Matic Mainnet',
    //   rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    // }
  ],
    appMetadata: {
      name: 'Testing',
      icon: Logo,
      description: 'Testing app',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ],
      agreement: {
        version: '1.0.0',
        termsUrl: 'https://www.blocknative.com/terms-conditions',
        privacyUrl: 'https://www.blocknative.com/privacy-policy'
      },
      gettingStartedGuide: 'https://blocknative.com',
      explore: 'https://blocknative.com'
    }
});

export { initOnboard };

// import Onboard from 'bnc-onboard'
// import { onboardOptions } from '../dapp.config'

// export const initOnboard = (subscriptions) => {
//     return Onboard({
//         subscriptions,
//         ...onboardOptions
//     })
// }
