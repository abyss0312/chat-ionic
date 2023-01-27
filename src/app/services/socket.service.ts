import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { io } from 'socket.io-client';
import { ChatModel } from "../models";
import { addFriends, addMessage, addOneFriend, connectedFriend, removeUser } from "../state";
import { getCurrentTime } from "../utils";



@Injectable({
    providedIn: 'root',
   })
export class SocketioService {

    private socket:any;
    private userId:string = '';
    private users:any = [];
  
    constructor(private store:Store<any>) {

      this.socket = io('http://localhost:3002',{autoConnect:false});
    }
  
    setupSocketConnection(username:string) {
    
       
        this.socket.auth = {username};
        this.socket.connect();
        this.getUsers();
        this.usersDisconected();
    

    }

    newUsersConnected(){
        
        
        this.socket.on("user connected", (user:any) => {
            const exist = this.users.find((i:any) => i.username == user.username);
            user.connected = true;
            if(exist != undefined){
                this.users.forEach((i:any) => {

                    if(i.username == user.username){
                        i.userID = user.userID ;

                    }
                })
            }
            else{
               
                this.store.dispatch(addOneFriend({friend:user}));
                this.users = [...this.users,user];
            }
           
            
           
          });


    }

    usersDisconected(){
      this.socket.on("disconnect_user", (value:any) => {
        console.log(value);
          this.store.dispatch(connectedFriend({connected:false,id:value.id}))
      });
    }

    disconneted(){
      this.socket.disconnect();
    }
 
    getUsers(){
        this.socket.on("users", (users:any) => {
            console.log('usuario connectado');
            users.forEach((user:any) => {
              user.self = user.userID === this.socket.id;
              user.connected = true;
            if(user.self == false){
                this.userId = user.userID;
                
                this.users.push(user);
            }
            });
       
            this.store.dispatch(addFriends({friends:this.users}));
           
          });
     
    }
    sendMessage(content:string,id:string){
        console.log(this.userId);
        this.socket.emit("private_message", {
            content,
            to: id,
          });
    }
    RecieveMessage(){
        this.socket.on("private_message", ({ content, from }:any) => {
            console.log(content);
            console.log(from);
            var chat:ChatModel = {
              content:content,
              self:false,
              time:getCurrentTime()
            }
            for (let i = 0; i < this.users.length; i++) {
              console.log(this.users[i]);
            const user:any = this.users[i];
              if (user.userID === from) {
                console.log('hey')
                this.store.dispatch(addMessage({message:{id:from,message:chat}}))

                if (user.userID !== this.socket.id) {
                 // user.hasNewMessages = true;
                }
                break;
              }
            }

          });
    }
  }