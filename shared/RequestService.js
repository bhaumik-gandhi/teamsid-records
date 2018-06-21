import axios from 'axios';

const SERVER_URL = "https://v2.teamsid.com/api/";
var request = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true
});

export default request;