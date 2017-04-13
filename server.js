const axios=require("axios")
const key="9802aeacb9704950a603fd818f5f32f7"
let Id1="";
let foto= 'https://pbs.twimg.com/profile_images/798967560620408835/W6TIC3qB.jpg';
let grupo='1'
let candidatos='1'
let confidence="0.5"
let mode="matchFace"


//Instancia que hace las peticiones hacia la URL de la API
var detect = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect',
  headers: {'Content-Type': 'application/json','Ocp-Apim-Subscription-Key':key}
});



var identify = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify',
  headers: {'Content-Type': 'application/json','Ocp-Apim-Subscription-Key':key}
});

var identify = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify',
  headers: {'Content-Type': 'application/json','Ocp-Apim-Subscription-Key':key}
});

var person = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups',
  headers: {'Ocp-Apim-Subscription-Key':key}
});



detect.post('/',`{url:"${foto}"}`)
.then(response => {
	Id1=response.data[0].faceId;
	console.log("ID:"+Id1)
	return identify.post('/',`{personGroupId:'${grupo}',faceIds:['${Id1}'],maxNumOfCandidatesReturned:'${candidatos}',confidenceThreshold:'0.5'}`);
	
})
.then (response=> {
	personId=response.data[0].candidates[0].personId;
	let peticion = '/' + grupo + '/persons/' + personId;
	return person.get(peticion);

}).then(response => {
	persona=response.data.name;
	console.log("Hello "+persona);
})
.catch(response=>{
	console.log(response.response.data.error);
})



