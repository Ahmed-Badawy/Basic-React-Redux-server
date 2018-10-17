/*---------------------------------The New Way to Do---------------------------------*/
var { buildSchema } = require('graphql');
import person from "../mongoose/personModel"; 


//you can define the same thing with the old GraphQLSchema like in here: https://graphql.github.io/graphql-js/constructing-types/


//The GraphQL schema language supports the scalar types of String, Int, Float, Boolean, and ID, so you can use these directly in the schema you pass to buildSchema.
//By default, every type is nullable - it's legitimate to return null as any of the scalar types. Use an exclamation point to indicate a type cannot be nullable, so String! is a non-nullable string. 
//To use a list type, surround the type in square brackets, so [Int] is a list of integers.
// Mutations: any operations that cause writes/updates should be sent explicitly via a mutation not query. Another Point: While query fields are executed in parallel, mutation fields run in series, one after the other.

class Multiplier {
    constructor(basic_number) { this.basic_number = basic_number; }
    double() { return this.mull({num:2}) }
    triple(){ return this.mull({num:3}) }
    mull({num}) { return this.basic_number * num } 
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
input MessageInput {
    content: String!
    author: String!
}
type Multiplier {
    double: Int!
    triple: Int!
    mull(num: Int = 1): Int!  #num defaults to 1
    basic_number: Int!
}
type Message { id: Int!, content: String, author: String }
type PersonType { fullName: String, age: Int }
enum EnumNames{ ONE, TWO, THREE } # this is how we define an enum
type Query {
    quoteOfTheDay(name: EnumNames = ONE): String 
    rollThreeDice: [Int!]                 # this means values inside this array are not allowed to be null
    passingArguments(num:Int!): Float!
    getMull(basic_number: Int): Multiplier
    getMessage(id: Int!): Message
    personFind1(minAge:Int, maxAge: Int): [PersonType]
    personFind2(minAge:Int, maxAge: Int): [PersonType]
}
type Mutation { 
    createMessage(input: MessageInput): Message 
    updateMessage(id: Int!, input: MessageInput): Message
} 
`);
//If you have an API endpoint that alters data, like inserting data into a database or altering data already in a database, you should make this endpoint a Mutation rather than a Query. 
//you will find a number of different mutations that all accept the same input parameters. thats when we use the (input) keyword

var fakeDatabase = { message:{id:1,content:"Hello World",author:"Ahmed Badawy"} };

// The root provides a resolver function for each API endpoint
var root = {
    quoteOfTheDay: ({name})=>`${name}: Salvation lies within`,
    rollThreeDice: () =>[1,2,3],
    passingArguments: ({num}) => { return num*2; },
    getMull: ({basic_number})=>{ return new Multiplier(basic_number || 1); },

//setters & getters & updaters
    getMessage: function ({id}) { return fakeDatabase.message; },
    createMessage: function ({input}) { return {...fakeDatabase.message, content: input.content, author: input.author} },
    updateMessage: function ({id,input}) { return {...fakeDatabase.message, id, content:input.content, author: input.author} },

//Using mongooseDB:-
    //you can return the value directly, EX:-
    personFind2: ({minAge,maxAge})=>{ return person.find({}) },
    //or you can return a promise that you can resolve, EX:- 
    personFind1: ({minAge,maxAge})=>{ return new Promise((resolve,reject)=>{ person.find({}, (err, docs)=>{ resolve(docs) }) }) } 
}; 

//Now The Query will be like that:-
/*
    query one{ # we gave the query the operation name of (one) to make the code less ambiguous. the operation name is optional in case of using just one query.
        passingArguments(num: 5)
        getMull(basic_number: 2) { basic_number, double, triple, mull(num: 7) } # the mull argument is optional. so you can just delete it.
        getMessage(id:1) { ...messageFragment }
    }
    mutation two($var_name: Int = 1){
        createMessage(input:{content:"Hello",author:"Ahmed-Badawy"} ) { ...messageFragment }
        updateMessage(id:$var_name,input:{content:"Hello",author:"Ahmed-Badawy"}){ ...messageFragment }
    }
    fragment messageFragment on Message{ id, content, author } #fragments can be used multiple times to get commonly used values
    query three{ personFind1(minAge:44,maxAge:22){ user_name: fullName,age } } # we used alias to get fullName as user_name
    query four{ personFind2(minAge:44,maxAge:22){ fullName,age } }

//Variables:-  (variables & directives are not needed & I recommend you for not using them.)
{
    "var_name": 4
}
*/

/*------------------------------------------------------------------------------*/


export default { schema, root };