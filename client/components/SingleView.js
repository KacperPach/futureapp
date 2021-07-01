import React from 'react';
import { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";
import {RiArrowGoBackFill} from 'react-icons/Ri';
import {Typography} from '@material-ui/core';


export default function SinleView (props) {
    const ApiAdress = props.address + '/' + props.viewNum;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const {register, handleSubmit, errors} = useForm();
    
    const onSubmit = (data) => {
        const req = {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(ApiAdress, req)
            .then(res => res.json())
            .then(data => {
                console.log(data); window.location.reload();
            });
    };

    useEffect(() => {
        fetch(ApiAdress)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result[0]);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {

            
          
   
        return (
        

        <div>
            <button onClick={() => props.setView(-1)}><RiArrowGoBackFill/> </button>
            <Typography variant="h4">Edit: {items.title}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nazwa filmu" defaultValue={items.title} {...register('title',{required: true})} /> <br/>
                <input type="date" defaultValue={items.release_date !== undefined ? items.release_date.slice(0,10) : null // this is caused by 'defaultValue' needing a specific string format like "2001-11-27", and api returing undefinded for the first second sometimes 
                } {...register('release_date',{required: true})} /><br/>
                <input type="number" placeholder="ocena" max={5} min={1} defaultValue={items.rating} {...register('rating',{required: true})} /><br/>
                <input type="text" placeholder="Imie i nazwiso reżysera" defaultValue={items.director} {...register('director',{required: true, pattern: {value: /^[A-Za-z]/i}})} /><br/>
                <input type="text" placeholder="Gatunek" defaultValue={items.genere}{...register('genere',{required: true})} /><br/>
                <input type="submit"/>

            </form>
        </div>

    );
    }
}