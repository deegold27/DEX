import axios from "axios";
  const config = {
    headers: {
"Authorization": "Bearer "" ",
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
