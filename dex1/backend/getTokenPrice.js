import axios from "axios";
  const config = {
    headers: {
"Authorization": "Bearer Dc6PMiiozmna9v3hMqK2s1zFg9wB0CJs",
"X-Requested-With": "XMLHttpRequest",

},
    params: {}
};

export const getSpotPriceofTokensByAddresses = async (addresses) => {


  const url = `https://cors-anywhere.herokuapp.com/https://api.1inch.dev/price/v1.1/1/${addresses.toString()}`;
 

 

let response = await  axios.get(url,config).then((res) => {
    return res.data;
}).catch((err) =>{
    return err;
})
return response;
}