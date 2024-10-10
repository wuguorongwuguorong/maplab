
document.addEventListener("DOMContentLoaded", async function () {
let singaporeMap = L.map('map');


singaporeMap.setView([1.3521, 103.8198], 13);


let tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(singaporeMap);

var topoTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});




let mallsLayerGroup = L.layerGroup();
mallsLayerGroup.addTo(singaporeMap);

let mallsResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/malls.json");
for (let malls of mallsResponse.data) {
    
    let marker = L.marker(malls.coordinates);
    marker.addTo(mallsLayerGroup);
    marker.bindPopup(`<h1>${malls.name}</h1>`)
}

let hdbLayerGroup = L.layerGroup();
hdbLayerGroup.addTo(singaporeMap);

let hdbResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/hdb.json");
for (let hdb of hdbResponse.data) {
    console.log(hdbResponse)
    let marker = L.marker(hdb.coordinates);
    marker.addTo(hdbLayerGroup);
    marker.bindPopup(`<h1>${hdb.name}</h1>`)
}

let overlays ={
    "MALLS" : mallsLayerGroup,
    "HDB"   : hdbLayerGroup
}

let layerControl = L.control.layers(overlays);
layerControl.addTo(singaporeMap);




});