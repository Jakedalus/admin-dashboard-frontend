import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import courseReducer from './reducers/courseReducer';

const reducer = combineReducers({
	users   : userReducer,
	courses : courseReducer
});

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
