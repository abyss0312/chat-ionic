import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectuserName } from "../state";

@Injectable()
export class UserService {


  constructor(private store: Store<any>) {}

  getCurrentValue(): Observable<string> {
    return this.store.select(selectuserName);
      
  }

}