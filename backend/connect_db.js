const mongoose = require('mongoose');


const CONNECTDATABASE = async ()=>{
    try {
        const con = await mongoose.connect( process.env.CONNECTION_STRING)

        console.log(`Database is connected successfully!`);
        console.log(`Root url to access: http://${con.connection.host}:${process.env.PORT}`);

    } 
    catch (error) 
    {

        console.log(`Database is not connected! ${error}`);
        
        
    }
}

module.exports =  CONNECTDATABASE ;