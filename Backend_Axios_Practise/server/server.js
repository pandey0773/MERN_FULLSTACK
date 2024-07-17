const express = require('express');
const connectDb = require('./db/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const NewUsers = require('../schema/modal');

/// always use app.use after--> const app = express();
const app = express();
app.use(cors())
app.use(bodyParser())

// code will goes here////////////////////////

app.get('/app', (req, res) => {
    res.status(200).json({ message: 'server is running properly' })
})

app.post('/app/userdata', async (req, res) => {
    try {

        let User = new NewUsers()

        User.dob = req?.body?.dob;
        User.email = req?.body?.email;
        User.firstName = req?.body?.firstName;
        User.gender = req?.body?.gender;
        User.lastName = req?.body?.lastName;
        User.password = req?.body?.password;

        const response = await User.save();

        res.status(200).json({ saveData: response })
        console.log(response)
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/app/getAllUserData', async (req, res) => {
    try {
        const response = await NewUsers.find({});
        res.status(200).json(response)
        // setTimeout(()=>{

        // },2000)

    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/app/delete/:id', async (req, res) => {
    try {
        const particularuUserID = req.params.id
        console.log(particularuUserID)
        await NewUsers.findByIdAndDelete(particularuUserID)
        res.status(200).json({ message: 'User Deleted Successfully' })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.patch('/UpdateUserData/:id', async (req, res) => {debugger
    try {
        const id = req?.params?.id
        const updatedUserData = req?.body
        console.log(id, updatedUserData)
        const updatedUser = await NewUsers.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(400).json(error);
    }
})

////////////////////////////////////////////


const PORT = 7000;

connectDb()
app.listen(PORT, console.log(`server is runing on ${PORT} port`))