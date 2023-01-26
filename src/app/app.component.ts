import { Component, OnDestroy } from '@angular/core';
import { SocketioService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {


   
   
  constructor(private socket:SocketioService) {

  }


  ngOnDestroy(){
    this.socket.disconneted();
   
  }


}
