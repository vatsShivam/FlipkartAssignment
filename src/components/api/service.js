import axios from "axios";

const instance = axios.create({
  baseURL: "https://flipkart-email-mock.now.sh"
});

export default instance;
