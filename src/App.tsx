import {useEffect} from "react";
import {Navigate,Route,Routes} from "react-router-dom";
import {useStore} from "./store";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
export default function App(){const{user,theme}=useStore();useEffect(()=>{document.documentElement.classList.toggle("dark",theme==="dark")},[theme]);return <Routes><Route path="/login" element={user?<Navigate to="/" replace/>:<Login/>}/><Route path="/*" element={user?<ChatPage/>:<Navigate to="/login" replace/>}/></Routes>}