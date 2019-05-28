"use strict";

var graphql = require('graphql'); // const _ = require('lodash');


var axios = require('axios');

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema; // Static List of Users
// const users = [
//     {id : '23', firstName: 'Bill', age: 20},
//     {id: '47', firstName: 'Samantha', age: 21}
// ]

var UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parentValue, args) {
        // Data request comment
        // return _.find (users,{ id: args.id});
        return axios.get("http://localhost:3000/users/".concat(args.id)).then(function (resp) {
          return resp.data;
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});