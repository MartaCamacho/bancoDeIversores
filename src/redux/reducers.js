import { SET_USER_LOGGED, SET_USER } from "./actions";

const initialState = {
    logged: false,
    user: ''
};

function useReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_USER_LOGGED:
            return {...state, logged: action.payload};
        default:
            return state;
    }
}

export default useReducer;