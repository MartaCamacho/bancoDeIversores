import { SET_USER_LOGGED, SET_USER } from "./actions";

const initialState = {
    logged: false,
    user: {
        name: 'Marta',
        email: 'm@c.com',
        currency: 'eur',
        holdings: [{
            id: "bitcoin"
        },
        {
            id: "ethereum"
        },
        {
            id: "dogecoin"
        },
        {
            id: "litecoin"
        }]
    }
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