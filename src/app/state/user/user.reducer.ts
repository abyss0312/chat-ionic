import {createReducer, on} from '@ngrx/store';
import { User } from '../../models';
import {addUser,removeUser} from './user.actions';

export interface UserStore extends User {
    sessionId:string;
}

export const InitialUserStore:UserStore = {
    sessionId: '',
    Id: 0,
    username: ''
}

export const UserReducer = createReducer(
    InitialUserStore,
    on(addUser, (state,{username,Id}) => ({...state, username:username,Id:Id})),
    on(removeUser,() => InitialUserStore)
);