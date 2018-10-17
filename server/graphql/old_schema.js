import { GraphQLInt, GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';

let counter = 42;
let personObjectType = new GraphQLObjectType({
    name: "Person",
    fields: _=>({age: {type:GraphQLInt}, name:{type:GraphQLString} })
})
let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: ()=>({
            counter:{ type: GraphQLInt, resolve: _=>counter },
            message:{ type: GraphQLString, resolve: _=>"Hello World" },
            list: { type: new GraphQLList(GraphQLInt), resolve: _=>[11,22,33]  },
            list2: { type: new GraphQLList(personObjectType), resolve: _=>[{age:11,name:"Ahmed"},{age:12,name:"Ali"},{age:13}]  }
        })
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: ()=>({
            incrementCounter:{ type: GraphQLInt, resolve: _=> ++counter }
        })
    })
});


export default schema;