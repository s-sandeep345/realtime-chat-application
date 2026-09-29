import axios from "axios";
export const api=axios.create({baseURL:"https://example.com/api",timeout:10000});
export const authApi={login:async(email:string,password:string)=>({email,password,token:"mock-token"}),register:async(name:string,email:string,password:string)=>({name,email,password,token:"mock-token"})};