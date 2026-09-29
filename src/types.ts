export type User={id:string;name:string;email:string;avatar:string;online:boolean;lastSeen?:string;bio?:string};
export type Reaction={emoji:string;userIds:string[]};
export type Message={
 id:string;chatId:string;senderId:string;text:string;createdAt:string;
 status:"sending"|"sent"|"delivered"|"read"|"failed";edited?:boolean;deleted?:boolean;
 replyTo?:{id:string;text:string;senderName:string};
 attachment?:{name:string;size:number;type:string;progress?:number};
 reactions:Reaction[];
};
export type Chat={id:string;type:"direct"|"group";name:string;avatar:string;members:User[];lastMessage?:Message;unreadCount:number};