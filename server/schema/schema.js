const graphql=require('graphql');
const Post=require('../models/posts');
const Author=require('../models/author');



const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
}=graphql;


const PostType= new GraphQLObjectType({
    name:'Post',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        title:{type:GraphQLString},
        company:{type:GraphQLString},
        dateposted:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                //console.log(parent);
                //return _.find(authors,{id:parent.authorsid});
                return Author.findById(parent.authorId);
            }

        }
    })
});

const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        book:{
            type:new GraphQLList(PostType),
            resolve(parent,args){
                //return _.filter(books,{authorsid:parent.id});
                return Post.find({
                    authorId:parent.id
                });
            }
        }
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        post:{
            type:PostType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from database
                //return _.find(books,{id:args.id});
                return Post.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id});
                return Author.findById(args.id);
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
                return Author.find({});
            }
        },
        post:{
            type:new GraphQLList(PostType),
            resolve(parent,args){
                console.log(parent);
                //return books;
                return Post.find({});
            }
        }
    }
});
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addPost:{
            type:PostType,
            args:{
                id:{type:GraphQLID},
                name:{type:new GraphQLNonNull(GraphQLString)},
                title:{type:new GraphQLNonNull(GraphQLString)},
                company:{type:new GraphQLNonNull(GraphQLString)},
                dateposted:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let post=new Post({
                    name:args.name,
                    genre:args.genre,
                    title:args.title,
                    company:args.company,
                    dateposted:args.dateposted,
                    authorId:args.authorId
                });
                return post.save();
            }
        }
    }
});
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});