import {createReducer, on} from '@ngrx/store';
import { Friends, User } from '../../models';
import {addFriends, addOneFriend, addUser,removeUser} from './user.actions';

export interface UserStore extends User {
    sessionId:string;
    friends: Friends[]
}

export const InitialUserStore:UserStore = {
    sessionId: '',
    Id: 0,
    username: '',
    friends:[],
}

export const UserReducer = createReducer(
    InitialUserStore,
    on(addUser, (state,{username,Id}) => ({...state, username:username,Id:Id})),
    on(addFriends,(state,{friends}) => ({...state, friends: friends})),
    on(addOneFriend,(state,{friend}) =>({...state, friends:[...state.friends,friend]}) ),
    on(removeUser,() => InitialUserStore)
);