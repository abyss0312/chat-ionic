import { Component, OnInit } from '@angular/core';
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

  friends$:Observable<Friends[]> = new Observable<Friends[]>();

  constructor(private store:Store<any>,private socketservice:SocketioService) { }

  ngOnInit() {
    this.socketservice.newUsersConnected();
    this.friends$ = this.store.select(selectuserFriends);
  }

}
