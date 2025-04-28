import axios from "axios";

const agent = axios.create({
  baseURL: "https://localhost:7131/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default agent;
