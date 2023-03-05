import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../utils/store';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TAuthActions } from '../actions/auth';
import { TWsActions, TWsAuthActions } from '../actions/ws';

type TApplicationActions = 
  | TIngredientsActions
  | TOrderActions
  | TAuthActions
  | TWsActions
  | TWsAuthActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;