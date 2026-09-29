import {useState} from "react";
import {Eye,EyeOff,MessageCircle} from "lucide-react";
import {useStore} from "../store";
import type {FormEvent} from "react";
export default function Login(){const[email,setEmail]=useState("alex@example.com"),[password,setPassword]=useState("password123"),[show,setShow]=useState(false),[error,setError]=useState("");
 const setState=useStore;const submit=(e:FormEvent)=>{e.preventDefault();if(!email.includes("@")||password.length<6){setError("Enter a valid email and password.");return}setState.setState({user:{id:"u1",name:"Alex Johnson",email,avatar:"https://i.pravatar.cc/150?img=12",online:true,bio:"Frontend developer"}})};
 return <div className="min-h-screen grid place-items-center bg-slate-100 px-4 dark:bg-slate-950"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">
 <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-600 text-white"><MessageCircle/></div><h1 className="text-center text-2xl font-bold">Welcome back</h1><p className="mt-2 text-center text-sm text-slate-500">Demo authentication</p>
 {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
 <label className="mt-5 block text-sm font-medium">Email<input value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border p-3 outline-none dark:border-slate-700 dark:bg-slate-800"/></label>
 <label className="mt-4 block text-sm font-medium">Password<div className="relative"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border p-3 pr-11 outline-none dark:border-slate-700 dark:bg-slate-800"/><button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-5 text-slate-500">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
 <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white">Sign in</button></form></div>}
