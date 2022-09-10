import express from "express"
import path, { dirname } from "path"
import usersRoutes from './routes/users.js'

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(usersRoutes);

app.get('/style', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'css', 'style.css'));
})

app.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'js', 'script.js'));
})

app.get('/json', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'json', 'users.json'))
})

app.listen(PORT, () => {
    console.log('Server has been started...');
})