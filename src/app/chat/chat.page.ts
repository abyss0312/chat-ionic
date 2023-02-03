import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friends } from '../models';
import { SocketioService } from '../services';
import { selectuserFriends } from '../state';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  friends:Friends[] =[];

  constructor(private store:Store<any>,private socketservice:SocketioService, private route: Router) { }

  ngOnInit() {

    this.socketservice.getUsers();
    this.socketservice.newUsersConnected();
    this.store.select(selectuserFriends).subscribe(friend => {

        this.friends = friend;
    });
  }

  goToChat(item:Friends){
    this.route.navigate(['/chat-page'], { state: item });
    //this.socketservice.disconneted();
  }

}
