const mongoose = require('mongoose')
const URI_ = 'mongodb+srv://pandey0773:JDDtMEXctv6Ms1v3@cluster0.p9kpfwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDb = async()=>{
    try {
       await mongoose.connect(URI_)
       console.log('connected to db')
    } catch (error) {
        console.log("not connected to db",error)
    }
}
    module.exports = connectDb;