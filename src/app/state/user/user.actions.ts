import {createAction, props} from '@ngrx/store';
import { Friends } from '../../models';

export const addUser = createAction('[login component] adduser',props<{username:string,Id:number}>());
export const addFriends = createAction('[chat component] addfriend',props<{friends:Friends[]}>());
export const addOneFriend = createAction('[chat component] addOneFriend',props<{friend:Friends}>());
export const removeUser = createAction('[header component] removeuser');
