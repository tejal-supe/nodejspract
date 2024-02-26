const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const {GraphQLSchema , GraphQLObjectType, GraphQLList , GraphQLString, GraphQLInt,GraphQLNonNull} = require("graphql")
const app = express()

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "J. R. R. Tolkien" },
  { id: 3, name: "Brent Weeks" },
];

const books = [
  { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
  { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
  { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
  { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
  { id: 5, name: "The Two Towers", authorId: 2 },
  { id: 6, name: "The Return of the King", authorId: 2 },
  { id: 7, name: "The Way of Shadows", authorId: 3 },
  { id: 8, name: "Beyond the Shadows", authorId: 3 },
];

const AuthorType = new GraphQLObjectType({
  name:"Author",
  description:"Author of the books",
  fields:()=>({
    id:{type:GraphQLNonNull(GraphQLInt)},
    name:{type:GraphQLNonNull(GraphQLString)},
    books:{
      type : new GraphQLList(BookType),
      resolve:(author)=>{
        return books.filter(b => b.authorId === author.id)
      }
    }
    
  })
})
const BookType = new GraphQLObjectType({
  name:"book",
  description:"Book written by author",
  fields:()=>({
    id:{type:GraphQLNonNull(GraphQLInt)},
    name:{type:GraphQLNonNull(GraphQLString)},
    authorId:{type:GraphQLNonNull(GraphQLInt)},
    author:{type : AuthorType,
    resolve:(book)=>{
      return authors.find(author => author.id === book.authorId)
    }
    }
  })
})

//rooot queryy

const RootQuery = new GraphQLObjectType({
  name:"Query",
  description:"Root Query",
  fields:()=>({
    book:{
      type: BookType,
      description:"Book",
      args:{
        id : {type:GraphQLInt}
      },
      resolve:(parent,arguments)=>books.find(book => book.id === arguments.id)
    },
    author:{
      type:AuthorType,
      description:"Author",
      args:{
        id:{type :  GraphQLInt}
      },
      resolve:(parent,argument)=>authors.find(auth => auth.id === argument.id)
    },
    books:{
      type: new GraphQLList(BookType),
      description:"List of Books",
      resolve:()=>books
    },
    authors:{
      type: new GraphQLList(AuthorType),
      description:"List of Authors",
      resolve:()=>authors
    }
  })
})

const RootMutation   = new GraphQLObjectType({
  name :"Mutations",
  description:"Root Mutation",
  fields:()=>({
    addBook:{
      type:BookType,
      description:"Add a book",
      args:{
        name:{type:GraphQLNonNull(GraphQLString)},
        authorId:{type:GraphQLNonNull(GraphQLInt)}
      },
      resolve:(parent,args)=>{
        const book = {id:books.length+1,name:args.name , authorId:args.authorId}
        books.push(book)
        return book
      }
    },
    addAuthor:{
      type:AuthorType,
      description:"Add a author",
      args:{
        name:{type:GraphQLNonNull(GraphQLString)},
      },
      resolve:(parent,args)=>{
        const author = {id:authors.length+1,name:args.name }
        authors.push(author)
        return author
      }
    }
  })
})
const schemaBooks = new GraphQLSchema({
  query:RootQuery,
  mutation:RootMutation
})

//helloworld
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HeloWorld",
        fields: () =>
        ({
            message: {
                type: GraphQLString,
                resolve:()=>'Hello World'}
        })
    })
})
app.use(
  "/graphql",
    graphqlHTTP({
      schema:schemaBooks,
    graphiql: true,
  })
);
app.listen(5000,()=>console.log("Server is running"))