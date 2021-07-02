import React from 'react';
import { useState } from 'react';
import {useForm} from "react-hook-form";

export default function AddImage(props) {
    const {register, handleSubmit, errors} = useForm();
    const [imgPreview, changeImage] = useState();



    const sendPhoto = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0] );
        const req = {
            method: 'POST',
            body: formData
        }
        fetch(props.address + '/' +  props.viewNum, req );

    }

    return (
        <div>
            <form onSubmit={handleSubmit(sendPhoto)}>
                <input type="file"  {...register('image')}></input> <br/>
                <input type='submit'></input>
            </form>
        </div>
    );
}