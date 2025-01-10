const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/social');
mongoose.connection.once('open',()=>{
    console.log('connected to database');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));
app.use('login',graphqlHTTP({
    
}));

app.listen(5000,()=>{
    console.log('server running at 127.0.0.1:5000');
});