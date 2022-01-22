const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {Pool} = require('pg');

// Ingresar Parametros de la base de datos
const pool = new Pool({
    user: '',
    host: '',
    password: '',
    database: '',
    port: 5432
});

app.listen(3000, ()=>{
    console.log('escuchando puerto 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/inventario', (req, res)=>{
    try {
        pool.query('select store_name, products.product_id, products.product_name, quantity from products join stocks on products.product_id = stocks.product_id join stores on stores.store_id = stocks.store_id  join categories on categories.category_id = products.category_id join brands on brands.brand_id = products.brand_id where store_name= coalesce ($1, store_name) and category_name= coalesce ($2, category_name) and brand_name = coalesce ($3, brand_name)', [
            req.query.store == "null" ? null : `${req.query.store}`, 
            req.query.categorie == "null" ? null : `${req.query.categorie}`, 
            req.query.brand == "null" ? null : `${req.query.brand}`
        ],
        (err, data) => {
            if (err) {
                console.log('index.js -/inventario - ' + err);
            } else {
                console.log('get -/inventario');
               // `${req.query.store}`, `${req.query.categorie}`, `${req.query.brand}`
            }
            console.log(req.query.store + req.query.categorie + req.query.brand);
            //`${req.query.store}`
            res.send(data.rows);
        })
    }
    catch (error) {
        console.log('error intentando conectarse con la base de datos - /inventario - ' + error);
    }
});

app.get('/stores', (req, res)=>{
    try {
        pool.query('select store_name from stores;',
        (err, data) => {
            if (err) {
                console.log('index.js -/stores - ' + err);
            } else {
                console.log('get -/stores');
                // console.log(data.rows);
            }
            res.send(data.rows);
        })
    }
    catch (error) {
        console.log('error intentando conectarse con la base de datos - /stores - ' + error);
    }
});

app.get('/categories', (req, res)=>{
    try {
        pool.query('select category_name from categories;',
        (err, data) => {
            if (err) {
                console.log('index.js -/categories - ' + err);
            } else {
                console.log('get -/categories');
                // console.log(data.rows);
            }
            res.send(data.rows);
        })
    }
    catch (error) {
        console.log('error intentando conectarse con la base de datos - /categories - ' + error);
    }
});

app.get('/brands', (req, res)=>{
    try {
        pool.query('select brand_name from brands;',
        (err, data) => {
            if (err) {
                console.log('index.js -/brands - ' + err);
            } else {
                console.log('get -/brands');
                // console.log(data.rows);
            }
            res.send(data.rows);
        })
    }
    catch (error) {
        console.log('error intentando conectarse con la base de datos - /brands - ' + error);
    }
});