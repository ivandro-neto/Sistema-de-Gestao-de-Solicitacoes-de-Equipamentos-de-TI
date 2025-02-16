import axios from "axios";
import { API_URL_USER } from "./base";
import { Roles } from "../utils/Roles";

export const login = async (email : string, senha : string) => {
  try{
    const user = await axios({
      method : "post",
      url : `${API_URL_USER}/login`,
      data : {
        email,
        senha
      }
    })
    
    localStorage.removeItem("session")
    localStorage.setItem("session", JSON.stringify(user.data))
  }catch(err){
    console.log(err)
  }
}

export const register = async (nome : string, email : string, senha : string, departamento : string, tipo : string, especialidade : string) => {
  try{
    if (!Roles[tipo]) {
      throw new Error(`Invalid role: ${tipo}`);
    }

    const user = await axios({
      method : "post",
      url : `${API_URL_USER}/register`,
      data : {
        nome,
        email,
        senha,
        tipo : Roles[tipo],
        departamento,
        especialidade
      }
    })
    return user.data
  }catch(err){
    console.log(err)
  }
}

export const logout = () =>{
  localStorage.removeItem("session");
}

export const getUsers = async () =>{
  try {
    const users = await axios({
      method : "get",
      url: `${API_URL_USER}/`
    })
    
    return users.data
  } catch (error) {
    console.log(error)
  }
}
export const getTechUserByEmail = async (email : string) =>{
  try {
    const users = await axios({
      method : "post",
      url: `${API_URL_USER}/`,
      data : email
    })
    if(users.data.tecnico)
      return users.data.tecnico.id
  } catch (error) {
    console.log(error)
  }
}
export const getUserByTechId = async (id : string) =>{
  try {
    const users = await axios({
      method : "get",
      url: `${API_URL_USER}/tech/${id}`
    })
    
    return users.data
  } catch (error) {
    console.log(error)
  }
}
export const getUserById = async (id : string) =>{
  try {
    const users = await axios({
      method : "get",
      url: `${API_URL_USER}/${id}`
    })
    
    return users.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (id: string) =>{
  try {
    
    await axios({
      method : "delete",
      url : `${API_URL_USER}/${id}`,
    })

  } catch (error) {
    console.log(error)
  }
}
export const updatePasswordUser = async (id: string, data: any) =>{
  try {
    
    await axios({
      method : "patch",
      url : `${API_URL_USER}/${id}`,
      data
    })

  } catch (error) {
    console.log(error)
  }
}
export const updateUser = async (id: string, data: any) =>{
  try {
    
   const updatedUser = await axios({
      method : "put",
      url : `${API_URL_USER}/${id}`,
      data
    })
    return updatedUser.data
  } catch (error) {
    console.log(error)
  }
}