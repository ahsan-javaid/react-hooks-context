import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Store} from './redux/store';

function App() {
    const {state, dispatch} = React.useContext(Store);

    React.useEffect(() => {
        console.log("exectuted")
        state.episodes.length == 0 && fetchDataAction();
    })
    const fetchDataAction = async () => {
        const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes
        })
    }

    const toggleFavAction = episode => {
        const inFavs = state.favs.includes(episode);
        console.log("AAA", inFavs)
        if(inFavs) {
            const newFavs = state.favs.filter((fav => fav.id!= episode.id))
            return dispatch({
                type: 'REM_FAV',
                payload: newFavs
            });
        } else {
            return dispatch({
                type: 'ADD_FAV',
                payload: episode
            });
        }

    }

    return (
        <React.Fragment>
            {console.log(state)}
            <header className='header'>
                <h2>Monty Favs App</h2>
                <h4>Favs: {state.favs.length}</h4>
            </header>
            <section className='ep-layout'>
                {state.episodes.map((ele, index) => {
                    return (
                        <section key={ele.id} className='ep-box'>
                            <img src={ele.image ? ele.image.medium : ''} atl={'No image Provided'}/>
                            <div>{ele.name}</div>
                            <section>
                                <div>
                                    Season : {ele.season}, Number: {ele.number}

                                </div>
                                <button type='button' onClick={() => toggleFavAction(ele)}>{state.favs.find((e)=> ele.id === e.id) ? 'Un Fav': 'Fav'}</button>
                            </section>
                        </section>
                    )

                })}
            </section>
        </React.Fragment>
    );
}

export default App;
