import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { io } from 'socket.io-client';
import { removeUser } from "../state";



@Injectable({
    providedIn: 'root',
   })
export class SocketioService {

    private socket:any;
    private userId:string = '';
    private users:any = [];
  
    constructor(private store:Store<any>) {
        
      }
  
    setupSocketConnection(username:string) {
    
        this.socket = io('http://localhost:3002');
        this.socket.auth = {username};
    
        this.getUsers();
        this.newUsersConnected();
        this.RecieveMessage();
    }

    newUsersConnected(){
        
        
        this.socket.on("user connected", (user:any) => {
            const exist = this.users.find((i:any) => i.username == user.username);
            if(exist != undefined){
                this.users.forEach((i:any) => {
                    if(i.username == user.username){
                        i.userID = user.userID ;

                    }
                })
            }
            else{
                this.users.push(user);
            }
           
            
            console.log(this.users);
          });
    }
 
    getUsers(){
        this.socket.on("users", (users:any) => {
            console.log('usuario connectado');
            users.forEach((user:any) => {
              user.self = user.userID === this.socket.id;
            if(user.self == false){
                this.userId = user.userID;
            }
            });
            // put the current user first, and then sort by username
            this.users = users.sort((a:any, b:any) => {
              if (a.self) return -1;
              if (b.self) return 1;
              if (a.username < b.username) return -1;
              return a.username > b.username ? 1 : 0;
            });
            console.log(this.users);
          });
     
    }
    sendMessage(content:string){
        console.log(this.userId);
        this.socket.emit("private_message", {
            content,
            to: this.userId,
          });
    }
    RecieveMessage(){
        this.socket.on("private_message", ({ content, from }:any) => {
            console.log(content);
            console.log(from);
            for (let i = 0; i < this.users.length; i++) {
            const user:any = this.users[i];
              if (user.userID === from) {
                user.messages.push({
                  content,
                  fromSelf: false,
                });
                if (user.userID !== this.socket.id) {
                  user.hasNewMessages = true;
                }
                break;
              }

            console.log(user);
            }

          });
    }
  }