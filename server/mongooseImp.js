import mongoose from "mongoose";
import {Schema} from "mongoose";
import faker from "faker";



console.log("-----------------------------mongoose-----------------------------")

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test',err=>{
    if (err) throw err;
    console.log('Successfully connected');
});


// let noIdSchema = new Schema({name: String}, {_id:false}); //this will remove the _id key from this schema
let Person = {};
function init_userSchema(){
    let nameSchema = new Schema, noMiddleName = false;
    if(noMiddleName) nameSchema.add({first:String, last:String})     //you can use Schema.add to add specific fields to the schema
    else nameSchema.add({first:String, middle:String, last:String}) 

    
    let userSchema = new Schema({
//validation can be (required,match,enum); enum will set a list of choices for that value.; also validate gives you the chance to validate based on a custom function & an error message.  
        fullName: {type: String, required: true, match: /^[a-z]*$/, validate:[ str=>(str.length>=4), "custom validator didn't pass..."] }, 
        name: nameSchema,
        age: Number, //numbers can be validate with (min,max) validator to force a value to be between two numbers
        someDate: Date,
        createdAt: {type: Date, default: Date.now},
        isActive: {type:Boolean, default:true}
    });
    
    Person = mongoose.model("Person",userSchema,"People"); //People is the used collection

    userSchema.path("fullName").required(true,"Opps! you must supply a fullName");
}
init_userSchema();




function populate_people(){
    for(let i=0; i<100; i++){
        let person = new Person({
            fullName: faker.name.firstName(),
            name: {first:faker.name.firstName(), middle:faker.name.lastName(), last:faker.name.lastName()},
            age: faker.random.number({min:1,max:80}),
            someDate: faker.date.past(),
            isActive: faker.random.boolean()
        })
        person.save().then(_=>console.log('Saved'));
    }
}

function validate(){
    let person = new Person({
        fullName: "ahmed",
        age: 0,
        isActive: false
    });
    return person.save().catch(error=>error);
}

function find(){
    // return Person.find({age:{$gte:70,$lt:75}});
    // return Person.where("age").gte(70).lt(75).where("isActive",false); //same as above but with the where statement
    // return Person.findOne({age:1});
    // return Person.findById("5b8581284e105e3994686441");
}

function update(){
    // return Person.update( {fullName:"Yazmin"} , {isActive:true});
    return Person.findOne({fullName:"Yazmin"}).update({isActive:false});

}




console.log("----------------------------------------------------------")




export default {
    populate_people,
    find,
    update,
    validate
}


// db.People.find({age:1}); get all age=1
// .find( { age: { $in: [ 5, 15 ] } } ) // age is in array
// db.People.find({age:1}).count(); get count of age=1
// db.People.drop(); //drop collection
// db.People.deleteMany({}); //delete all records
// db.People.find({age: {$gt:70, $lt:73} }, {age:true,isActive:true} ); //return only (age,isActive) fields where: (73>value>70)
// db.People.find({age: {$gt:70, $lt:73} }, {age:false} ); //return all but the age field
// .sort({age:1})  //means sort by age
// .limit(5) //means limit by 5

// db.People.update({isActive:true},{$set:{tags:["one","two"]}}); //update all isActive=True with set array
// db.People.find({isActive:true, tags:{$in: ["three"]} }); //find all isActive & with a tag three 
// db.People.find({isActive:true, tags:{$in: [ /^..ree$/ ]} }); //find all isActive & rejex a tag (..ree)