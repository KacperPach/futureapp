import React from 'react';
import { useState, useEffect } from 'react';
import {AiTwotoneDelete} from 'react-icons/Ai';
import './styles/style.css';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer} from '@material-ui/core';


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
        <TableContainer component={Paper}>

        <Table>
            
                <TableHead>
                  <TableRow>
                    <TableCell>Tytuł</TableCell><TableCell>Data wydania</TableCell><TableCell>Ocena</TableCell><TableCell>Reżyser</TableCell><TableCell>Gatunek</TableCell><TableCell>Usuń</TableCell><TableCell>Edytuj</TableCell><TableCell>zdjęcie</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {items.map(item => (

                    <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{new Date(item.release_date).toLocaleDateString()}</TableCell>
                        <TableCell>{item.rating}</TableCell>
                        <TableCell>{item.director}</TableCell>
                        <TableCell>{item.genere}</TableCell>
                        <TableCell><Button onClick={() => deleteItem(item.id)}><AiTwotoneDelete /></Button></TableCell>
                        <TableCell><Button onClick={() => props.setView(item.id)}>Edytuj</Button></TableCell>
                        <TableCell className='defaultIMG' style={{ backgroundImage: `url(./image/${item.id})` }}></TableCell>
                    </TableRow>

                ))}
                </TableBody>
            
        </Table>

        </TableContainer>
        );
      }
}