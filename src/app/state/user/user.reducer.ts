import {createReducer, on} from '@ngrx/store';
import { Friends, Messages, User } from '../../models';
import {addFriends, addMessage, addOneFriend, addUser,removeUser} from './user.actions';

export interface UserStore extends User {
    sessionId:string;
    friends: Friends[],
    isActive:boolean,
    messages:Messages[]
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
    on(addMessage,(state,{message}) => ({
        ...state,
        messages: state.messages.map(mes => {
            
        })
    })),
    on(addFriends,(state,{friends}) => ({...state, friends: friends})),
    on(addOneFriend,(state,{friend}) =>({...state, friends:[...state.friends,friend]}) ),
    on(removeUser,() => InitialUserStore)
);