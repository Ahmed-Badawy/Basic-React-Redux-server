import { GraphQLInt, GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import person from "../mongoose/personModel"; 

    let personFromMongoDBObjectType = new GraphQLObjectType({
        name: "Person",
        fields: _=>({ fullName:{type:GraphQLString}, age:{type:GraphQLInt}, isActive:{type:GraphQLBoolean} })
    })
    
    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "Query",
            fields: ()=>({
                people:{ 
                    type: new GraphQLList(personFromMongoDBObjectType), 
                    // resolve: _=> [{_id:"hello",fullName:"ahmed",age:22}]
                    resolve: _=>{
                        return new Promise((resolve,reject)=>{
                            person.find({},function (err, docs){
                                resolve(docs);
                            });
                        })
                    }
                },
            })
        }),
    });


export default schema;