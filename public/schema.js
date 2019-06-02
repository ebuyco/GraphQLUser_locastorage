"use strict";

var graphql = require('graphql');

var axios = require('axios');

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList;
var CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: function resolve(parentValue, args) {
          return axios.get("http://localhost:3000/companies/".concat(parentValue.id, "/users")).then(function (res) {
            return res.data;
          });
        }
      }
    };
  }
});
var UserType = new GraphQLObjectType({
  name: 'User',
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      firstName: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      company: {
        type: CompanyType,
        resolve: function resolve(parentValue, args) {
          return axios.get("http://localhost:3000/companies/".concat(parentValue.companyId)).then(function (res) {
            return res.data;
          });
        }
      }
    };
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
        // return _.find(users, { id: args.id});
        return axios.get("http://localhost:3000/users/".concat(args.id)).then(function (resp) {
          return resp.data;
        });
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parentValue, args) {
        return axios.get("http://localhost:3000/companies/".concat(args.id)).then(function (resp) {
          return resp.data;
        });
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});