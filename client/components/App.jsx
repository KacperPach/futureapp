import React from 'react';
import MovieTable from './MovieTable.jsx';
import AddMovie from './AddMovie.js';
import AddImage from './AddImage.js';
import SingleView from './SingleView.js';
import {Typography} from '@material-ui/core';
import '@fontsource/roboto';

import {useState} from 'react';

const ApiAddressMovies = "http://localhost:8888/movies"; //this address needs to be edited in case of hosting the server on a different computer.
const ApiAddressImages = "http://localhost:8888/image";


/* 
    THINGS TO FIX

    1. Better materialUi integration.
    2. Add Redux/ React router
    




*/



export default function App () {
    const [view,setView] = useState(-1);
    return(
        <div>
            
            <Typography variant="h2"> Best Movies Ever.</Typography>
            {view == -1 ? 
                <div>
                    <MovieTable address={ApiAddressMovies} setView={setView}/> <br/>
                    <AddMovie address={ApiAddressMovies}/>
                </div> 
                :  
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <SingleView viewNum={view} address={ApiAddressMovies} setView={setView}/> 
                <AddImage viewNum={view} address={ApiAddressImages}/>
                </div> 
            }

            
            

            

        </div>
        
    );

}