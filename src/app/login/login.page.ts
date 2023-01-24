import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketioService } from '../services';
import { addUser,selectuserName, selectUser} from '../state';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user$:Observable<string> = new Observable<string>()
  private socket: SocketioService;
  login: any = { username: '', pass: '' };

  constructor(private store:Store<any>, private socketService:SocketioService) { 

    this.socket = socketService;
  }

  ngOnInit() {
  
    this.user$ = this.store.select(selectuserName);
  }

 async Login() {

  this.socket.setupSocketConnection(this.login.username);
  //this.socket.sendMessage('hola soy el evento');

    //this.store.dispatch(addUser({username:"john",Id:1}));
 }

 async Test(){

 }

}
