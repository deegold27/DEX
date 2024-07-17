const express = require("express");

const app = express();

const axios = require("axios");


require("dotenv").config();
const port = 3001 //3001;


const cors = require("cors");


app.use(
    cors({
    origin:"http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//    credentials: true, // 
}));

app.use(express.json());

//app.use(express.static(path.join(__dirname, '..', 'build')));



const tokens = {};  // To store tokens for each chain
const validChains = [1, 56, 137];
const maxRetries = 5;
const delayBetweenRetries = 2000; // 2 seconds

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchTokensForChain = async (chain, retries = 0) => {
  const url = `https://api.1inch.dev/swap/v6.0/${chain}/tokens`;
  const config = {
    headers: {
      "Authorization": `Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs`, // Use environment variable for authorization key
    }
  };

  try {
    const response = await axios.get(url, config);
    tokens[chain] = Object.entries(response.data.tokens).map(([key, token]) => ({
      ...token,
      id: key
    }));
  } catch (error) {
    if (error.response && error.response.status === 429 && retries < maxRetries) {
      console.warn(`Rate limit exceeded for chain ${chain}. Retrying in ${delayBetweenRetries / 1000} seconds...`);
      await delay(delayBetweenRetries);
      await fetchTokensForChain(chain, retries + 1);
    } else {
      console.error(`Error fetching tokens for chain ${chain}:`, error.message || error);
    }
  }
};

const fetchTokensForChains = async () => {
  for (const chain of validChains) {
    await fetchTokensForChain(chain);
  }
  console.log('Tokens loaded for all chains');
};

// Fetch tokens when the server starts
fetchTokensForChains();
app.get('/tokenlist', (req, res) => {
  const { chainId } = req.query;
//  if (!chainId || !tokens[chainId]) {
  //  return res.status(400).json({ error: 'Invalid or missing chainId' });
  //}
  console.log({tokens})
  res.json({ tokens: tokens[chainId] });
});





const fetchTokenPrice = async (chainId, tokenOneAddress, tokenTwoAddress) => {
  const addresses = `${tokenOneAddress},${tokenTwoAddress}`;
  const config = {
    headers: {
      "Authorization": "Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs",
      "X-Requested-With": "XMLHttpRequest",
    },
    params: {
      addresses: addresses,
      currency: "USD"
    }
  };

  try {
    const url = `https://api.1inch.dev/price/v1.1/${chainId}/${addresses}`;
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
};



app.get('/tokenPrices', async (req, res) => {
  const { chainId, tokenOneAddress, tokenTwoAddress } = req.query;

  if (!chainId || !tokenOneAddress || !tokenTwoAddress) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const prices = await fetchTokenPrice(chainId, tokenOneAddress, tokenTwoAddress);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching token prices' });
  }
});


{/*

app.get('/tokenlist', async (req, res, next) => {
  const { chainId } = req.query;
  const chains = [1, 56, 137];
  const urls = chains.map(chain => `https://api.1inch.dev/swap/v6.0/${chain}/tokens`);
  const config = {
    headers: {

      "Authorization": `Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs`, // Use environment variable for authorization key
      "X-Requested-With": "XMLHttpRequest"
    }
  };
console.log("axios", config)
 
try {
  const responses = await Promise.all(urls.map(url => axios.get(url, config)));
  chains.forEach((chain, index) => {
    tokens[chain] = Object.entries(responses[index].data.tokens).map(([key, token]) => ({
      ...token,
      id: key
    }));
  });
  console.log('Tokens loaded for all chains');
} catch (error) {
  console.error('Error fetching tokens:', error.message || error);
}
}


);

*/}

{/*
app.get("/tokenlist", async (req,res,next) => {
//const { chainId } = useAccount(); 

const {chainId} = req.query;
 //res.header('Access-Control-Allow-Origin', "*");

 const chains = [1,56,137]
 const url= `https://api.1inch.dev/swap/v6.0/${chains}/tokens`

// const url= `https://api.1inch.dev/swap/v6.0/137/tokens`

 
 const config = {
  headers: {
    "Authorization": "Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs",  //process.env.1INCH_KEY
   //"X-Requested-With": "XMLHttpRequest",
//Enable credentials (cookies, authorization headers, etc.)
  },

};
console.log("Axios config:", config);


try {
  const response = await  axios.get(url,config );
  
 const tokens = Object.entries(response?.data.tokens).map(([key, token]) => ({
    ...token,
    id: key
  }));
  //const tokens = response.data.tokens
  res.json({tokens});
 // res.send({tokens})
console.log("token loaded",response.data.tokens);
} catch(error){
  console.error("Error fetching tokens:", error.message || error);
  res.status(500).json({ error: 'Failed to fetch tokens' });
}

next();
}
 
)*/}

//);

{/* 
app.get('/tokenPrice', async (req, res) => {
    
    const { tokenOneAddress, tokenTwoAddress } = req.query;
    if (!tokenOneAddress || !tokenTwoAddress) {
        return res.status(400).json({ error: 'Token addresses are required' });
      }
  
    const url = `https://api.1inch.dev/price/v1.1/${chainId}/`;
    const addresses = `${tokenOneAddress},${tokenTwoAddress}`;
    const config = {
      headers: {
        "Authorization": "Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs",
        "X-Requested-With": "XMLHttpRequest",
   // Enable credentials (cookies, authorization headers, etc.)
      },
      params: {
        addresses: addresses,
        "currency": "USD"

      }
    };
  
    try {
      const response = await axios.get(url, config);
    
      const priceInUSD = response?.data.price;
      res.json({ price: priceInUSD });
      console.log(response?.data)
      const tokenPrices = response.data;
      // Access the price for tokenOneAddress and tokenTwoAddress
    
    } catch (error) {
      console.error('Error fetching token price:', error);
      res.status(500).json({ error: 'Error fetching token price' });
    }
  });*/}
   
  




{/*app.get('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});*/}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });