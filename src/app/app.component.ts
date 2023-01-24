import { Component } from '@angular/core';
import {io} from "socket.io-client";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  url = "http://localhost:3002";

   socket = io(this.url,{autoConnect:false});
   
   
  constructor() {
    this.socket.auth = {username:"John", id:1};
    this.socket.connect();
  }


  sendMessage(){
    var content = "test message";
    const id= "9jIOgE3fkcIJvc52AAAD";
    this.socket.emit("private_message", {
      content,
      to: id ,
    });
  }


}
