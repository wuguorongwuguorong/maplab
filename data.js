let BIN_ID="66ff5732ad19ca34f8b26050";
let BASE_API_URL="https://api.jsonbin.io/vhttps://api.data.gov.sg/v1/transport/taxi-availability";

async function loadData() {
    let response = await axios.get(`${BASE_API_URL}/b/${BIN_ID}/latest`);
    console.log("response",response)
    console.log("response.data.record",response.data.record)
    return response.data.record;  
}