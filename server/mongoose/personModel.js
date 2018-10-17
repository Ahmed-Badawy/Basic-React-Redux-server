import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/test',err=>{
    if (err) throw err;
    console.log('Successfully connected');
});
let dbObj = mongoose.connection;
let Schema = mongoose.Schema;
// create a schema
let personSchema = new Schema({ fullName: String, age: Number, isActive: Boolean }, {collection:"People"});
// we need to create a model using it
let person = mongoose.model('person', personSchema);


export default person;