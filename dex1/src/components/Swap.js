
import { Input, Popover, Radio, Modal, message, Collapse, Button, Flex } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React , {useState, useEffect} from "react";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import {useAccount, chains, useConfig } from "wagmi";
import { response } from "express";


function Swap(props){

  const { chainId } = useAccount();
  console.log({chainId})
  const {isConnected, address} = props;

    const [slippage, setSlippage] = useState(2.5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTokens, setFilteredTokens] = useState([]);
    const [tokenOneAmount, setTokenOneAmount] = useState(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
 const [tokenList,setTokenList]= useState([]);
   const [tokenOne, setTokenOne] = useState(null); //tokenList[0]
    const [tokenTwo, setTokenTwo] = useState(null);//tokenList[1]
    const [isOpen,setIsOpen] = useState(false)
const [changeToken, setChangeToken] = useState(1);
const [prices,setPrices]= useState({}) //{}
const [tokenButton,setTokenButton] = useState('');

  const [txDetails , setTxDetails]= useState({
    to: null,
    data: null,
    value: null
  })


  const { Panel } = Collapse;
  const { Search } = Input;

  const {data, sendTransaction} = useSendTransaction({
    request: {
      from: address,
      to: (txDetails?.to),
      data: (txDetails?.data),
      value: (txDetails?.value),
    }
  })



 
   useEffect(() => {
 if(txDetails?.to && isConnected){
  sendTransaction();


 }

   },[txDetails])




useEffect(() => {
  if (tokenOne && tokenTwo) {
    //fetchTokenPrice(tokenOne.address, tokenTwo.address);
  //getSpotPriceofTokensByAddresses(tokenOne?.address.toString(),tokenTwo?.address.toString())
  }
}, [tokenOne, tokenTwo]);






// const url = `https://cors-anywhere.herokuapp.com/https://api.1inch.dev/swap/v6.0/${chainId}/tokens`;
const url =`https://api.1inch.dev/swap/v6.0/${chainId}/tokens`
//const url = "https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/ethereum.json"

const config = {
  headers: {
"Authorization": "Bearer """
},
  params: {}
};
  
{/*
 const fetchTokenList = async () =>  {
 try {
    const response = await  axios.get(url,config );
    
   const tokens = Object.entries(response?.data.tokens).map(([key, token]) => ({
      ...token,
      id: key
    }));
    //const tokens = response.data.tokens
console.log("token loaded",response.data.tokens);


//    const theList = response?.data?.tokens;
    setTokenList(tokens);
     setFilteredTokens(tokens);
     if(tokens.length > 1) {
    setTokenOne(tokens[0]);
    setTokenTwo(tokens[1]);

   // fetchTokenPrice(tokenOne?.address,tokenTwo?.address)
    fetchTokenPrice(tokens[0].address,tokens[1].address)
     }
   // getSpotPriceofTokensByAddresses(tokens?.address.toString(),tokens?.address.toString())
    //getSpotPriceofTokensByAddresses([tokens[0].address, tokens[1].address]);
   
  } catch (error) {
    console.error(error);
  }   
 }

*/}







//  const [tokens, setTokens] = useState([]);
  //const [error, setError] = useState(null);

 useEffect(() => {
    const fetchTokens = async () => {
     // const { chainId } = useAccount();
      try {
        const response = await axios.get(`http://localhost:3001/tokenlist?chainId=${chainId}`); //tokenlist?chainId=${chainId} Adjust the URL to match your backend endpoint
     //   if (!response.ok) {
       //   throw new Error('Network response was not ok');
        //}
        if (!chainId) {
          console.error('chainId is not defined');
          return;
        }
  

        console.log("fetchtoken",response?.data.tokens)
        const tokens = response.data.tokens;
    //    setTokens(data.tokens);
    setFilteredTokens(response?.data.tokens);
    setTokenList(response?.data.tokens);
    if (tokens.length > 1) {
      setTokenOne(tokens[0]);
      setTokenTwo(tokens[1]);
    }
    
      } catch (error) {
    //    setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }


    };
 if (chainId) {
      fetchTokens();
    }
 //   fetchTokens();
  }, [chainId]);

 //useEffect(() => {
  //fetchTokenList(); 
//  getSpotPriceofTokensByAddresses(tokenOne?.address.toString(), tokenTwo?.address.toString())
//}, [fetchTokenList])

  
  
useEffect(() => {
  if (tokenOne && tokenTwo) {
    const fetchPrices = async () => {
     
      try {
        const response = await axios.get(`http://localhost:3001/tokenPrices?chainId=${chainId}&tokenOneAddress=${tokenOne.address}&tokenTwoAddress=${tokenTwo.address}`);
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching token prices:', error);
    
      }
    }
    fetchPrices();
  }
},[tokenOne, tokenTwo, chainId])









{/*
const fetchTokenPrice = async (tokenOneAddress, tokenTwoAddress) => {
 // const { tokenOneAddress, tokenTwoAddress } = req.query;

  const addresses = `${tokenOneAddress},${tokenTwoAddress}`;
  const config = {
    headers: {
      "Authorization": "Bearer """,
      "X-Requested-With": "XMLHttpRequest",
    },
    params: {
    
      addresses: addresses,
       "currency": "USD"
      
    }
  };

  try {
    //  const url = `https://cors-anywhere.herokuapp.com/https://api.1inch.dev/price/v1.1/${chainID}/`;
      const url = `https://api.1inch.dev/price/v1.1/${chainId}/`;
   // const addresses = `${tokenOneAddress},${tokenTwoAddress}`;  
    const response = await axios.get(url, config);
     console.log('Token prices:', response.data);
    setPrices(response.data);
   
  

 
  } catch (error) {
    console.error('Error fetching token price:', error);
  }
};

*/}


const handleSearch = (e) => {
  //setSearchTerm(event.target.value);
  const value = e.target.value;
    setSearchTerm(value);
  if (e.target.value === '') {
 //   setSearchTerm(value);
    setFilteredTokens([]);
  } else {
    const searchResult = tokenList.filter(token =>
      token.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      token.address.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTokens(searchResult);
  }
};




{/*const fetchTokenPrice = async () => {
  try {
    const response = await axios.get('/tokenPrice', {
      params: {
        address: '0xYourTokenAddress' // Replace with the actual token address
      }
    });
    setPrice(response.data.price);
  } catch (error) {
    console.error('Error fetching token price:', error);
  }
};
*/}
//useEffect(() => {
  //fetchTokenPrice();
  //fetchTokens()
 // fetchTokenList();
//}, []);


// approve 1inch first - if allowance is 0 = 1inch is not allowed
     // aprove /allow 1incthe transaction -- allows 1 inch to use first .

//

async function fetchDexSwap(){

  const allowance = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.1inch.io/v6.0/${chainId}/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)
  
  if(allowance.data.allowance === "0"){
    const approve = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.1inch.io/v6.0/${chainId}/approve/transaction?tokenAddress=${tokenOne.address}`)

    setTxDetails(approve.data);
    console.log("not approved")
    return
}

   const tx = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.1inch.io/v6.0/${chainId}/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
    )
    let decimals = Number(`1E${tokenTwo.decimals}`)
    setTokenTwoAmount((Number(tx.data.toTokenAmount)/decimals).toFixed(2));

    setTxDetails(tx.data.tx);

}



function changeAmount(e){
setTokenOneAmount(e.target.value);
if(e.target.value && prices){
  setTokenTwoAmount((e.target.value * (prices[tokenOne?.address] / prices[tokenTwo?.address]).toFixed(6)).toFixed(2))
} else {
  setTokenTwoAmount(null)
}

}

    
    function handleSlippageChange(e) {
        setSlippage(e.target.value);
      }

function handleButtonChange(e){
  setTokenButton(e.target.value)
}


      function switchTokens(){

setTokenOneAmount(null);
setTokenTwoAmount(null);
//setPrices({});
const one = tokenOne;
const two = tokenTwo;

setTokenOne(two);
setTokenTwo(one);
//fetchTokenPrice(two.address,one.address)
//fetchTokens(two.address,one.address)
      }

function openModal(asset){
  setChangeToken(asset);
  setIsOpen(true); 
}


//function modifyToken(i){
  //if (changeToken === 1){
    //setTokenOne(tokenList[i]);
    
  //} else {
    //setTokenTwo(tokenList[i])
  //}
  //setIsOpen(false)
//}


function modifyToken(i) {
  //setPrices(null);
  //setTokenOneAmount(null);
  //setTokenTwoAmount(null);
  const selectedToken = tokenList[i];
  if (changeToken === 1) {
    setTokenOne(selectedToken);
    //   fetchTokenPrice(selectedToken.address,tokenTwo.address);
  } else {
    
    setTokenTwo(selectedToken);
    //fetchTokenPrice(tokenOne.address, selectedToken.address);
  }
  setIsOpen(false);
 
  // Call fetchTokenPrice with the selected token addresses
  
 // getSpotPriceofTokensByAddresses(tokenOne?.address.toString(),tokenTwo?.address.toString())
}


    const settings = (
        <>
          <div>Slippage Tolerance</div>
          <div>
            <Radio.Group value={slippage} onChange={handleSlippageChange}>
              <Radio.Button value={0.5}>0.5%</Radio.Button>
              <Radio.Button value={2.5}>2.5%</Radio.Button>
              <Radio.Button value={5}>5.0%</Radio.Button>
            </Radio.Group>
          </div>
        </>
      );





      const conversionRate = tokenOne && tokenTwo && prices[tokenOne?.address] && prices[tokenTwo?.address]
      ? (prices[tokenOne?.address] / prices[tokenTwo?.address]).toFixed(6)
      : null;

return (

<>
 <Modal
  open={isOpen}
  footer={null}
  onCancel={() => setIsOpen(false)}
  title="Select a token"

> 

<Search placeholder="Search by token or address" onChange={handleSearch}   id="modalsearch" size="small" className="modalsearch"/> {/*//onSearch={onSearch} enterButton*/}
<div className="modalContent">
 <div className="group">
<div className="eachbutton" >
<Flex gap="small" wrap>
{tokenList?.slice(0, 7)?.map ((e,i) => {
return (
<div className="tokenbutton" onChange={ handleButtonChange}>

 <Button type="primary" value={e.name}  onClick={() => modifyToken(i)} >
 <img src={e.logoURI} alt={e.symbol} className="tokenLogoButton" />
 {e.symbol}</Button>

</div>
 )} )}
  </Flex>
</div>

 </div>
 
 {/* {tokenList.map((e,i) => {

    return (
      <div 
      className="tokenChoice"
      key={i}
      onSearch={handleSearch}
      value={searchTerm}
     onClick={() => modifyToken(i)} 
      >
        
<img src={e.logoURI} alt={e.symbol} className="tokenLogo" />
<div className="tokeChoiceNames">
  <div className="tokenName">{e.name}</div>
  <div className="tokenTicker">{e.symbol}</div>
</div>
</div>
    );
  })}
*/}
    
        
          {tokenList || filteredTokens.length > 0 ? (
            filteredTokens.map((e, i) => (
              <div
                className="tokenChoice"
                key={i}
                onSearch={handleSearch}
                value={searchTerm}
                onClick={() => modifyToken(i)}
              >
                <img src={e.logoURI} alt={e.symbol} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.symbol}</div>
                </div>
              </div>
            ))
          ) : (
            tokenList.map((e,i) => {

              return (
                <div 
                className="tokenChoice"
                key={i}
                onSearch={handleSearch}
                value={searchTerm}
               onClick={() => modifyToken(i)} 
                >
                  
          <img src={e.logoURI} alt={e.symbol} className="tokenLogo" />
          <div className="tokeChoiceNames">
            <div className="tokenName">{e.name}</div>
            <div className="tokenTicker">{e.symbol}</div>
          </div>
          </div>
              );
            }))}
          
        </div>


</Modal>



    <div className="tradeBox">
    <div className="tradeBoxHeader">
      <h4>Swap</h4>
      <Popover
        content={settings}
        title="Settings"
        trigger="click"
        placement="bottomRight"
      >
        <SettingOutlined className="cog" />
      </Popover>
    </div>
  
    <div className="inputs">
        <Input
            placeholder="0"
           value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
          />
         
          <Input placeholder="0"  value={tokenTwoAmount} disabled={true} />
       
          <div className="switchButton" onClick={switchTokens} >
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne"  onClick={() => openModal(1)}>



          {tokenOne && (
            <>
              <img src={tokenOne.logoURI} alt="assetOneLogo" className="assetLogo" />
              <span>{tokenOne.symbol}</span>
            
            </>
          )}
         {/*   <img src={tokenOne?.logoURI} alt="assetOneLogo" className="assetLogo" />
            {tokenOne?.symbol} */}
            <DownOutlined />
          </div>
         
         
          <span>USD Price: {prices ? `$${prices[tokenOne?.address]}` : 'Loading...'}</span>
       <span>   {prices[tokenTwo?.address] ? `$${prices[tokenTwo.address]}` : 'Loading...'}</span>
   {/*{conversionRate && (
            <p>
              1 {tokenOne?.symbol} = {conversionRate} {tokenTwo?.symbol}
            </p>
   
          )}
       */}
          <div className="assetTwo" onClick={() => openModal(2)}>
       


{tokenTwo && (
            <>
              <img src={tokenTwo.logoURI} alt="assetOneLogo" className="assetLogo" />
              <span>{tokenTwo.symbol}</span>
            
            </>
            
          )}
            <DownOutlined />
         <div>
         
          </div>  
            
          </div>
          
</div>
{ prices && tokenTwoAmount &&     (
<Collapse  className="custom-collapse">

   <Panel header={conversionRate && (
            <span>
              1 {tokenOne?.symbol} = {conversionRate} {tokenTwo?.symbol}
            </span>
   
          )} key="1">
           <div className="custom-panel-content">
            <span className="estimatedfee">Estimated amount: </span>
            <span> 23303033 </span>
          </div>
          <div className="custom-panel-content">
            <span className="estimatedfee">Gas: </span>
            <span> 23303033 </span>
          </div>
          <div className="custom-panel-content">
            <span className="estimatedfee">Fee: </span>
            <span> 23303033 </span>
          </div>
          <div className="custom-panel-content">
            <span className="estimatedfee">Route: </span>
            <span> 23303033 </span>
          </div>
        </Panel>
      </Collapse>

        )}
<div className="swapButton" disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap} >Swap</div>
</div>

</>
);

}

export default Swap;
