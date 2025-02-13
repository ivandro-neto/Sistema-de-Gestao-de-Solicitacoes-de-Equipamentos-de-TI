import axios from "axios";
import { API_URL_DASHBOARD } from "./base";

export const getTotalsRequests = async () =>{
  try {
    const result = await axios({
      method : "get",
      url : `${API_URL_DASHBOARD}/`
    });
    return result.data
  } catch (error) {
    console.log(error)
    return;
  }
}

export const getTotalsRequestsUser = async (id: string) =>{
  try {
    const result = await axios({
      method : "get",
      url : `${API_URL_DASHBOARD}/users/${id}/requests`
    });
    return result.data
  } catch (error) {
    console.log(error)
    return;
  }
}

export const getTotalsAssignments = async (id: string) =>{
  try {
    const result = await axios({
      method : "get",
      url : `${API_URL_DASHBOARD}/users/${id}/assigns`
    });
    return result.data
  } catch (error) {
    console.log(error)
    return;
  }
}