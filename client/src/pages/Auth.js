import axios from "axios";

async function getAccesstoken(){
    return axios.get('http://localhost:8080/token/')
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
};

const Client = {getAccesstoken};
export default Client;