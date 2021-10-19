import { combineReducers } from 'redux';
import { createBrowserHistory, History } from 'history';
import { connectRouter } from 'connected-react-router';
import home from './homeReducer';
import auth from './authReducer';
import login from './loginReducer';

export const history: History = createBrowserHistory();
const rootReducer = combineReducers({
  home,
  auth,
  login,
  router: connectRouter(history),
});

export default rootReducer;
