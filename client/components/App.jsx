import React from 'react';
import MovieTable from './MovieTable.jsx';
import AddMovie from './AddMovie.js';
const ApiAdress = "http://localhost:8888/movies"; //this address needs to be edited in case of hosting the server on a different computer.




export default function App () {

    return(
        <div>
            <h1> Best Movies Ever.</h1>
   
            <MovieTable address={ApiAdress}/>
            <AddMovie address={ApiAdress}/>

            

        </div>
        
    );

}