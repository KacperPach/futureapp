import React from "react";
import {useForm} from "react-hook-form";
import {Button} from '@material-ui/core';

export default function AddMovie (props) 
{

    const {register, handleSubmit, errors} = useForm();
    const address = props.address;

    const onSubmit = (data) => {

        const req = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(address, req)
            .then(res => res.json())
            .then(data => {
                console.log(data); window.location.reload();
            });
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nazwa filmu" {...register('title',{required: true})} /> <br/>
                <input type="date"  {...register('release_date',{required: true})} /><br/>
                <input type="number" placeholder="ocena" max={5} min={1} {...register('rating',{required: true})} /><br/>
                <input type="text" placeholder="Imie i nazwiso reżysera" {...register('director',{required: true, pattern: {value: /^[A-Za-z]/i}})} /><br/>
                <input type="text" placeholder="Gatunek" {...register('genere',{required: true})} /><br/>
                <input type="submit"/>

            </form>
        </div>

    );
}