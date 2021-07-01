import React from 'react';
import MovieTable from './MovieTable.jsx';
import AddMovie from './AddMovie.js';
import SingleView from './SingleView.js';
import {Typography} from '@material-ui/core';
import '@fontsource/roboto';

import {useState} from 'react';

const ApiAdress = "http://localhost:8888/movies"; //this address needs to be edited in case of hosting the server on a different computer.




export default function App () {
    const [view,setView] = useState(-1);
    return(
        <div>
            
            <Typography variant="h2"> Best Movies Ever.</Typography>
            {view == -1 ? 
                <div>
                    <MovieTable address={ApiAdress} setView={setView}/> <br/>
                    <AddMovie address={ApiAdress}/>
                </div> 
                :  
                <SingleView viewNum={view} address={ApiAdress} setView={setView}/> 
            }

            
            

            

        </div>
        
    );

}