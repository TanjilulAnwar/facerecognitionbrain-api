const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const knex =require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db= knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:true,
  }
});

/*db.select('*').from ('users').then(data=>
{ console.log(data);
	});*/


const app = express();
app.use(bodyParser.json());
app.use(cors());

const database={
	users:[
	{
		id:'123',
		name:'john',
		email:'john@gmail.com',
		password:'cookies',
		entries:0,
		joined: new Date()
	},
	{
		id:'456',
		name:'jack',
		email:'jack@gmail.com',
		password:'pasta',
		entries:0,
		joined: new Date()
	}

	]
}

app.get('/',(req,res)=>{
	res.send("it's working!");
})


app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});

////////////
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
///////////////////






app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})


app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



 app.listen(process.env.PORT || 3000,()=>{
 	console.log(`app is running on ${process.env.PORT}`)
 })
 /*

/-->res = this is working
/signin-->post =success/fail
/register-->post=user
/profile/:userId-->Get =user
/image-->PUT-->user



 */