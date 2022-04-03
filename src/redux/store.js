import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import useReducer from './reducers';
import marketReducer from './marketReducer';

const rootReducer = combineReducers({
    useReducer,
    marketReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));