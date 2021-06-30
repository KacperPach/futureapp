const exp = require('constants');
const express = require('express');
const path = require('path');

const PORT = 8888;
const app = express();
const pool = require("./data/db");

console.log('running on: 127.0.0.1:' + PORT);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.listen(PORT);

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
} );

// dodaj film
app.post('/movies', async (req,res) => {
    try{
        const item = req.body;
        const newItem = await pool.query(
            "INSERT INTO movie_list (title, release_date, rating, director, genere) VALUES ($1, $2, $3, $4, $5)",
            [item.title, new Date(item.release_date), item.rating, item.director, item.genere]
        );
        res.send('success');
    }
    catch (err) {
        res.send(err.detail);
    }

});
//edytuj film 
app.put('/movies/:id', async (req,res) => {
    try {
        const item = req.body;
        const Item = await pool.query(
            "UPDATE movie_list SET title = $2, release_date = $3, rating = $4, director = $5, genere = $6 WHERE id = $1 ",
            [req.params.id,item.title, new Date(item.release_date), item.rating, item.director, item.genere]
        );
        console.log(req.params.id);
        res.send( Item.rows);

    } catch (err) {
        res.send(err);
    }
});
//usuń film 
app.delete('/movies/:id', async (req,res) => {
    try {
        const Item = await pool.query(
            "DELETE FROM movie_list WHERE id = $1"
        );
        res.send('success' );

    } catch (err) {
        res.send(err.detail);
    }
});
//zobacz wszystkie filmy 
app.get('/movies', async (req,res) => {
    try {
        const allItems = await pool.query(
            "SELECT * FROM movie_list"
        );
        res.send(allItems.rows);
    } catch (err) {
        res.send(err.detail);
    }
});
//zobacz jeden wybrany film 
app.get('/movies/:id', async (req,res) => {
    try {
        const Item = await pool.query(
            "SELECT * FROM movie_list WHERE id = $1",
            [req.params.id]
        );
        res.send(Item.rows.length === 0 ? 'wrong id' : Item.rows);

    } catch (err) {
        res.send(err.detail);
    }
});