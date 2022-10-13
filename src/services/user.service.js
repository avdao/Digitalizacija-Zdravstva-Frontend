import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getPacijentBoard = () => {
  return axios.get(API_URL + "pacijent", { headers: authHeader() });
};
const getBolnicaBoard = () => {
  return axios.get(API_URL + "bolnica", { headers: authHeader() });
};

const getKantonBoard = () => {
  console.log(authHeader())

  return axios.get(API_URL + "kanton", { headers: authHeader() });
};

const getDoktorBoard = () => {


  return axios.get(API_URL + "doktor", { headers: authHeader() });
};
const getApotekaBoard = () => {
  return axios.get(API_URL + "apoteka", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};


const UserService = {
  getPublicContent,
  getKantonBoard,
  getApotekaBoard,
  getBolnicaBoard,
  getPacijentBoard,
  getDoktorBoard,

  getAdminBoard,

};
export default UserService;