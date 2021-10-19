import produce from 'immer';
import { ActionType, getType, createReducer } from 'typesafe-actions';
import rootAction from '@/actions';
import { ILoginState } from '@/types/AuthTypes';

export type ILoginActions = ActionType<typeof rootAction.authActions>;
export const defaultLoginState: ILoginState = { loading: false, error: false };

const login = createReducer<ILoginState, ILoginActions>(defaultLoginState)
  .handleType(getType(rootAction.authActions.loginThunkAsync.success), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = false;
    })
  )
  .handleType(getType(rootAction.authActions.loginThunkAsync.failure), (state, action) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.error = true;
    })
  );

export default login;
