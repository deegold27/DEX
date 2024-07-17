



import React from "react";
import Eth from "../eth.svg"
import { Link } from "react-router-dom";
import { injected,walletConnect} from 'wagmi/connectors'
import { ConnectKitButton,ChainIcon } from "connectkit";

import { Menu, Dropdown, Button } from 'antd';


import {useAccount, chains, useConfig } from "wagmi";


function Header(props){
  const { chain } = useAccount();
  const { chains } = useConfig();
  const {address, isConnected, connect} = props;

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <a href="https://www.aliyun.com">Disconnect Wallet</a>,
      key: '1',
    },

  ]
//const {} = props;



return (

    <header>
    <div className="leftH">
  {/*    <img src={Logo} alt="logo" className="logo" />*/}
  <h1>WCS</h1>
  <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
</div>
<div className="rightH">
   {/*     <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>*/}
 {/* <Chains/>*/}
  <ChainIcon id={chain?.id} unsupported={chains.find((c) => c.id === chain?.id) === undefined}/>



        
  {/*   <Dropdown menu={{items}} trigger={['click']} className="connectButton"  placement="bottom" arrow={{ pointAtCenter: false }}>
<Button>
  
 {/* {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}</Button>    */}

    {/*</Dropdown>*/}
       {/* <div className="connectButton" onClick={() => connect({ connector: walletConnect() })}>
        {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}
        </div>*/}
         <ConnectKitButton />
      </div>
</header>


)

}


export default Header;