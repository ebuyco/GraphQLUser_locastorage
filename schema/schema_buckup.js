
const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');

const  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// Static List of Users
// const users = [
//     {id : '23', firstName: 'Bill', age: 20},
//     {id: '47', firstName: 'Samantha', age: 21}
// ]


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLString}},
            resolve(parentValue, args) {
                // Data request comment
                // return _.find (users,{ id: args.id});

              return axios.get(`http://localhost:3000/users/${args.id}`)
              .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

