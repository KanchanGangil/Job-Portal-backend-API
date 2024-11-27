const mongoose = require('mongoose')

const connectDb = () => {
    return mongoose.connect(process.env.LOCAL_URL)
        .then(() => {
            console.log("connected to mongodb");
        }).catch((error) => {
            console.log(error);
        })
}
module.exports = connectDb