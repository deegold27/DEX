
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet, sepolia , base, polygon, gnosis, fantom, optimism ,bsc} from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect, coinbaseWallet } from 'wagmi/connectors';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ConnectKitProvider } from "connectkit";



const queryClient = new QueryClient()
const projectId ='ed587f654fa097d9619205f4ad503b0a'








export const config = createConfig({
  chains: [mainnet,  polygon,bsc, ],
  connectors: [ 
    injected(),
    //walletConnect({ projectId,  }),
    metaMask(),
    coinbaseWallet(),
   // safe(),
  ],  //metaMask(),,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
 
})

//injected({
  //target() { 
 //return { 
   //id: 'windowProvider', 
   //name: 'Window Provider', 
   //provider: window.ethereum, 
 //} 
//},} )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <WagmiProvider config={config}>   
        <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <BrowserRouter>
      <App />
     
      </BrowserRouter>
      </ConnectKitProvider>
      
      </QueryClientProvider>
        </WagmiProvider>
      
  
     </React.StrictMode>
   
   
    
    
  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
