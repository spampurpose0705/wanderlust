const mongoose = require("mongoose");
const initialiseddata = require("./data");
const listning = require("../models/listing");

main().then((res) =>{
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB = async () =>{
    await listning.deleteMany({});
    initialiseddata.data = initialiseddata.data.map((obj) => ({ ...obj, owner: "68fced438f868d7e0de14d9f" }));
    await listning.insertMany(initialiseddata.data);
};

initDB();

console.log("data was initialised.");