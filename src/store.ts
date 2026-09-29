import {create} from "zustand";
import {chats as initialChats,currentUser,seedMessages} from "./data/mock";
import type {Chat,Message,User} from "./types";
type State={
 user:User|null;chats:Chat[];messages:Record<string,Message[]>;activeChatId:string|null;
 theme:"light"|"dark";connected:boolean;typing:Record<string,boolean>;
 setActiveChat:(id:string)=>void;sendMessage:(id:string,text:string,reply?:Message)=>void;
 retryMessage:(id:string,msg:string)=>void;editMessage:(c:string,id:string,t:string)=>void;
 deleteMessage:(c:string,id:string)=>void;reactMessage:(c:string,id:string,e:string)=>void;
 addAttachment:(c:string,f:File)=>void;toggleTheme:()=>void;setTyping:(c:string,v:boolean)=>void;logout:()=>void;
};
const grouped = seedMessages.reduce<Record<string, Message[]>>(
  (acc, message) => {
    (acc[message.chatId] ??= []).push(message);
    return acc;
  },
  {}
);
export const useStore=create<State>((set,get)=>({
 user:currentUser,chats:initialChats,messages:grouped,activeChatId:"c1",theme:"light",connected:true,typing:{},
 setActiveChat:id=>set(s=>({activeChatId:id,chats:s.chats.map(c=>c.id===id?{...c,unreadCount:0}:c)})),
 sendMessage:(chatId,text,reply)=>{
  if(!text.trim())return;const u=get().user!;const id=`local-${Date.now()}`;
  const msg:Message={id,chatId,senderId:u.id,text:text.trim(),createdAt:new Date().toISOString(),status:"sending",reactions:[],
   replyTo:reply?{id:reply.id,text:reply.text,senderName:reply.senderId===u.id?"You":get().chats.find(c=>c.id===chatId)?.name||"User"}:undefined};
  set(s=>({messages:{...s.messages,[chatId]:[...(s.messages[chatId]||[]),msg]}}));
  setTimeout(()=>set(s=>({messages:{...s.messages,[chatId]:(s.messages[chatId]||[]).map(x=>x.id===id?{...x,status:"delivered"}:x)}})),450);
  setTimeout(()=>set(s=>({messages:{...s.messages,[chatId]:(s.messages[chatId]||[]).map(x=>x.id===id?{...x,status:Math.random()<.08?"failed":"read"}:x)}})),1100);
 },
 retryMessage:(c,id)=>{set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,status:"sending"}:x)}}));setTimeout(()=>set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,status:"read"}:x)}})),700)},
 editMessage:(c,id,t)=>set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,text:t,edited:true}:x)}})),
 deleteMessage:(c,id)=>set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,deleted:true,text:"This message was deleted."}:x)}})),
 reactMessage:(c,id,e)=>set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,reactions:[...x.reactions,{emoji:e,userIds:[get().user!.id]}]}:x)}})),
 addAttachment:(c,f)=>{const u=get().user!,id=`file-${Date.now()}`;const msg:Message={id,chatId:c,senderId:u.id,text:"",createdAt:new Date().toISOString(),status:"sending",reactions:[],attachment:{name:f.name,size:f.size,type:f.type,progress:0}};set(s=>({messages:{...s.messages,[c]:[...(s.messages[c]||[]),msg]}}));let p=0;const t=window.setInterval(()=>{p+=20;set(s=>({messages:{...s.messages,[c]:(s.messages[c]||[]).map(x=>x.id===id?{...x,attachment:{...x.attachment!,progress:p},status:p>=100?"read":"sending"}:x)}}));if(p>=100)clearInterval(t)},180)},
 toggleTheme:()=>set(s=>({theme:s.theme==="light"?"dark":"light"})),
 setTyping:(c,v)=>set(s=>({typing:{...s.typing,[c]:v}})),logout:()=>set({user:null})
}));