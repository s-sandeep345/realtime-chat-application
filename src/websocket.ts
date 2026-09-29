export type SocketEvent={type:string;payload?:unknown};
export class ChatSocket{
 private timer?:number;private online=true;
 connect(onEvent:(e:SocketEvent)=>void){this.online=true;this.timer=window.setInterval(()=>{if(Math.random()<.08){this.online=false;onEvent({type:"connection",payload:{status:"reconnecting"}});window.setTimeout(()=>{this.online=true;onEvent({type:"connection",payload:{status:"connected"}})},900)}},5000)}
 send(event:SocketEvent){if(this.online)console.debug("WS",event)}
 disconnect(){if(this.timer)window.clearInterval(this.timer)}
}