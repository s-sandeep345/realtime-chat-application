import type {Chat,Message,User} from "../types";
export const currentUser:User={id:"u1",name:"Sandeep",email:"sandeep@example.com",avatar:"https://i.pravatar.cc/150?img=12",online:true,bio:"Frontend developer"};
export const users:User[]=[
 currentUser,
 {id:"u2",name:"Sarah Wilson",email:"sarah@example.com",avatar:"https://i.pravatar.cc/150?img=47",online:true,bio:"Product designer"},
 {id:"u3",name:"David Miller",email:"david@example.com",avatar:"https://i.pravatar.cc/150?img=68",online:false,lastSeen:"Today at 8:42 AM"},
 {id:"u4",name:"Emma Davis",email:"emma@example.com",avatar:"https://i.pravatar.cc/150?img=44",online:true},
 {id:"u5",name:"John Smith",email:"john@example.com",avatar:"https://i.pravatar.cc/150?img=11",online:false,lastSeen:"Yesterday"}
];
const mk=(id:string,c:string,s:string,t:string,mins:number):Message=>({id,chatId:c,senderId:s,text:t,createdAt:new Date(Date.now()-mins*60000).toISOString(),status:"read",reactions:[]});
export const seedMessages:Message[]=[
 mk("m1","c1","u2","Hey Alex! How is the new chat project going?",80),
 mk("m2","c1","u1","Going well! I'm working on the real-time messaging now.",76),
 mk("m3","c1","u2","Nice! Don't forget typing indicators and read receipts.",72),
 mk("m4","c1","u1","Absolutely. I also added optimistic updates.",68),
 mk("m5","c1","u2","Perfect 🚀 Let me know if you need anything.",65),
 mk("m6","c2","u3","Can we review the API contract today?",120),
 mk("m7","c2","u1","Sure, 3 PM works for me.",115),
 mk("m8","c3","u4","Welcome everyone! This is our project group.",240),
 mk("m9","c3","u5","Thanks! Happy to be here.",230),
 mk("m10","c3","u1","Let's keep updates in this group.",225)
];
export const chats:Chat[]=[
 {id:"c1",type:"direct",name:"Sarah Wilson",avatar:users[1].avatar,members:[currentUser,users[1]],lastMessage:seedMessages[4],unreadCount:2},
 {id:"c2",type:"direct",name:"David Miller",avatar:users[2].avatar,members:[currentUser,users[2]],lastMessage:seedMessages[5],unreadCount:0},
 {id:"c3",type:"group",name:"Project Team",avatar:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150",members:[currentUser,users[3],users[4]],lastMessage:seedMessages[9],unreadCount:5}
];