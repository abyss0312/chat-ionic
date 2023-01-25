import { ChatModel } from "./chat.model";

export interface Messages{
    id:string,
    message:ChatModel[]
}

export interface Message{
    id:string,
    message:ChatModel
}