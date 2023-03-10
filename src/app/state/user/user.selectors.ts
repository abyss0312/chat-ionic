import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStore } from "./user.reducer";


export const selectUser = createFeatureSelector<UserStore>('user');


export const selectuserName = createSelector(
    selectUser,
    (state:UserStore) => state.username
);
export const selectuserActive = createSelector(
    selectUser,
    (state:UserStore) => state.isActive
);

export const selectuserId = createSelector(
    selectUser,
    (state:UserStore) => state.Id
);
export const selectuserSession = createSelector(
    selectUser,
    (state:UserStore) => state.sessionId
);
export const selectuserFriends = createSelector(
    selectUser,
    (state:UserStore) => state.friends
);

export const selectuserMessage = createSelector(
    selectUser,
    (state:UserStore) => state.messages
);