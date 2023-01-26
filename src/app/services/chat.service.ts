import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ChatModel } from "../models";
import { selectuserMessage } from "../state";

@Injectable({
    providedIn:"root"
})
export class ChatService {


    constructor(private store:Store<any>){}


    updateMessageChat(Id:string, newMessage:ChatModel){

        let messages:ChatModel[] = [];
        this.store.select(selectuserMessage).subscribe(mes =>{
             const message = mes.find(id => id.id == Id );
             if(message != undefined){
                messages = message.message;
                messages.push(newMessage);
                
             }
             return messages;
        })
    }
}