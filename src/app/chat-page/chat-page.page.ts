import { Component, OnInit } from '@angular/core';
import {Navigation, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatModel } from '../models';
import { SocketioService } from '../services';
import { getCurrentTime } from '../utils';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  id: string ='';
  username:string = '';
  message:string = '';
  messages:ChatModel[] = [];

  constructor(private router: Router, private socket:SocketioService) { 

    let nav: any = this.router.getCurrentNavigation();

    if (nav.extras && nav.extras.state && nav.extras.state.userID) {
      this.id = nav.extras.state.userID;
      this.username = nav.extras.state.username;
    }
  }

  ngOnInit() {

    this.socket.RecieveMessage();
  
  }

  sendMessage(){

    var chat: ChatModel = {
      content:this.message,
      self:true,
      time: getCurrentTime()
    }
    console.log(chat)
    this.socket.sendMessage(this.message,this.id)
    this.messages.push(chat);
 
  }

}
