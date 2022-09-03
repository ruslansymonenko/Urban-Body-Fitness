let usersList = [
    {userName: 'Ruslan', userPhone: '38099123123',}
]

export const getUsers = (req, res) => {
    res.status(200).json(usersList);
}