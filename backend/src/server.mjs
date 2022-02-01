import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, 'build/images')

let storage = multer.diskStorage({
    destination: uploadDir,
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/hello', (req, res) => { res.send("Hello")});

app.post('/hello', (req, res) => { 
    console.log(req.headers);
    res.send(`Hello there ${req.body.name}`);
})

app.post('/test', (req, res) => {
    console.log(req.headers);
})

app.post("/api/uploadFile", upload.single("file"), uploadFile);

function uploadFile(req, res) {
    console.log("File test:", req.body)
    res.status(200).json({ message: "File uploaded."});
}


app.post('/api/removeMovie', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('my-movies');

        let returnVal = await db.collection('movies').deleteOne({name:req.body.name})
        
        if( returnVal.deletedCount == 1) {
            res.status(200).json({message: `Movie ${req.body.name} deleted`});
        }
        else {
            res.status(200).json({message: "Unable to delete movie"});
        }
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})

app.post('/api/addMovie', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('my-movies');

        await db.collection('movies').insertOne( {name:req.body.name, date:req.body.date, actors:req.body.actors, poster:req.body.poster, rating:req.body.rating})
        
        res.status(200).json({message: "Success"});
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})

app.get('/api/movies', async (req, res) => {   
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('my-movies');

        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})

app.listen(8000, () => console.log("listening on port 8000"));
