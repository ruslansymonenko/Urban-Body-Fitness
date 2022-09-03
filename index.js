import exress from "express"
import path, { dirname } from "path"
import usersRoutes from './routes/users.js'

const app = exress();
const PORT = 3000;
const __dirname = path.resolve();

app.use(exress.static(path.resolve(__dirname, 'static')));

app.use(usersRoutes);

app.get('/style', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'css', 'style.css'));
})

app.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'js', 'script.js'));
})

app.listen(PORT, () => {
    console.log('Server has been started...');
})