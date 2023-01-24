import {createAction, props} from '@ngrx/store';

export const addUser = createAction('[login component] adduser',props<{username:string,Id:number}>());
export const removeUser = createAction('[header component] removeuser');
