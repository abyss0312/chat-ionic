import {createReducer, on} from '@ngrx/store';
import { Friends, Messages, User } from '../../models';
import {addFriends, addMessage, addOneFriend, addUser,connectedFriend,removeUser} from './user.actions';

export interface UserStore extends User {
    sessionId:string;
    friends: Friends[],
    isActive:boolean,
    messages:Messages[],

}

export const InitialUserStore:UserStore = {
    sessionId: '',
    Id: 0,
    username: '',
    friends:[],
    isActive:false,
    messages:[]
}

export const UserReducer = createReducer(
    InitialUserStore,
    on(addUser, (state,{username,Id,isActive}) => ({...state, username:username,Id:Id,isActive:isActive})),
    on(addMessage,(state,{message})  => {
        const index = state.messages.findIndex(mes => mes.id == mes.id);
        let newArray:Messages[] = [...state.messages];
        if(index < 0){
             //making a new array
            newArray = [{id:message.id,message:[message.message]}];//changing value in the new array
        }
        else{
             //making a new array
             const newArr = newArray.map(obj => {
                if (obj.id === message.id) {
                  return {...obj, message: [...obj.message,message.message]};
                }
              
                return obj;
              });  
            newArray[index] = newArr[index];
            
        }
        return {
            ...state,
            messages:newArray,
        };
    }),
    on(addFriends,(state,{friends}) => ({...state, friends: friends})),
    on(addOneFriend,(state,{friend}) =>({...state, friends:[...state.friends,friend]}) ),
    on(connectedFriend,(state,{connected,id}) => {
            let friends:Friends[] = [...state.friends];
            const newFriendConnected = friends.map(obj => {
                if (obj.userID === id) {
                    obj.connected = connected;
                  return obj ;
                }
              
                return obj;
              }); 
              friends = newFriendConnected;
        return {
            ...state,
            friends:friends
        }
    }),
    on(removeUser,() => InitialUserStore)
);