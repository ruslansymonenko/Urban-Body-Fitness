import fs from 'fs'

let usersList = [];

function saveUserToFile (userInfo) {
    
    fs.readFile('static/json/users.json', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(typeof(JSON.parse(data)));
    })
}

export const getUsers = (req, res) => {
    res.status(200).json(usersList);
}

export const addUser = (req, res) => {
    const user = {
        ...req.body
    }
    usersList.push(user);
    saveUserToFile();
    // fs.writeFile("static/json/users.json", JSON.stringify(usersList), (err) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    // })
    res.status(201).json({usersList});
}