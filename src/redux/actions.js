export const SET_USER = 'SET_USER';
export const SET_USER_LOGGED = 'SET_USER_LOGGED';

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user
    });
};

export const setLogged = isLogged => dispatch => {
    dispatch({
        type: SET_USER_LOGGED,
        payload: isLogged
    });
};