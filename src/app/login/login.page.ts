import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Friends } from '../models';
import { SocketioService } from '../services';
import { UserService } from '../services/user.service';
import { addUser,selectuserName, selectUser, selectuserFriends, addFriends} from '../state';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user$:Observable<string> = new Observable<string>()
  friend$:Observable<Friends[]> = new  Observable<any[]>();
  private socket: SocketioService;
  login: any = { username: '', pass: '' };

  constructor(private store:Store<any>, private socketService:SocketioService) { 

    this.socket = socketService;
  }

  ngOnInit() {
  
    this.user$ = this.store.select(selectuserName);
    this.friend$ = this.store.select(selectuserFriends);
  }

 async Login() {
  

  this.socket.setupSocketConnection(this.login.username);

  //this.socket.sendMessage('hola soy el evento');

    //this.store.dispatch(addUser({username:"john",Id:1}));
 }

 async Test(){

 }

}
