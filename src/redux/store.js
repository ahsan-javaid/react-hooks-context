import React from 'react';
const initialState ={
    episodes: [],
    favs: []
};
let url = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
export const Store = React.createContext(initialState);


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
             return {...state, episodes: action.payload};
        case 'ADD_FAV':
            return {...state, favs: [...state.favs, action.payload]};
        case 'REM_FAV':
            return {...state, favs: action.payload};
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}