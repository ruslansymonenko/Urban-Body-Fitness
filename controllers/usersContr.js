import fs from 'fs'

let usersList = [];

function saveUserToFile (userInfo) { 
    let someData = '';
    fs.readFile('static/json/users.json', 'utf-8', (err, data) => {
        if (err) throw err
        someData = JSON.parse(data);
    });
    
}

export const getUsers = (req, res) => {
    fs.readFile("static/json/users.json", (err, data) => {
        if (err) {
            console.log(err)
        } else {  
            console.log(JSON.parse(data))  
            res.status(200).send(data);
        }
    })
}

export const addUser = (req, res) => {
    const user = {
        ...req.body
    }
    usersList.push(user);
    console.log(saveUserToFile(user));
    fs.writeFile("static/json/users.json", JSON.stringify(usersList), (err) => {
        if(err) {
            return console.log(err);
        }
    })
    res.status(201).json({usersList});
}

export const addCards = (req, res) => {
    fs.readFile("static/json/cards.json", (err, data) => {
        if (err) {
            console.log(err)
        } else {  
            console.log(JSON.parse(data))  
            res.status(200).send(data);
        }
    })
}