import React from 'react';
import { useState, useEffect } from 'react';
import {AiTwotoneDelete} from 'react-icons/Ai'


export default function MovieTable (props) {
    const ApiAdress = props.address;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    const deleteItem = (itemId) => {
      const addresToDelete = ApiAdress + "/" + itemId;
      console.log(addresToDelete);
      const req = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      };
      fetch(addresToDelete, req)
          .then(data => {
              console.log(data)
              window.location.reload();
          });
    }

    useEffect(() => {
        fetch(ApiAdress)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
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
        <table>
            <tbody>
                <tr>
                        <td>title</td><td>release date</td><td>rating</td><td>director</td><td>genere</td><td>select</td>
                </tr>

                {items.map(item => (

                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{new Date(item.release_date).toLocaleDateString()}</td>
                        <td>{item.rating}</td>
                        <td>{item.director}</td>
                        <td>{item.genere}</td>
                        <td><button onClick={() => deleteItem(item.id)}><AiTwotoneDelete /></button></td>
                    </tr>

                ))}
            </tbody>
        </table>
        );
      }
}