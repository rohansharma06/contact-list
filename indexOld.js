
//---- Here we are using local system storage

const express=require('express');
const path=require('path');

const app=express();

app.set('view engine','ejs'); // told server that we are using ejs
app.set('views',path.join(__dirname,'views')); //use to join views folder properly
app.use(express.urlencoded()); //use to parse the data which was send by browser(MIDDLEWARE)

app.use(express.static('assets')); //axcessing static folder assets

var contactList=[
    {
        name:"Rohan Sharma",
        phone:"1234567890"
    },
    {
        name:"Aman Rai",
        phone:"1111111111"
    },
    {
        name:"Ayush Singh",
        phone:"222222222"
    }
]

app.get('/',function(req,res){
    
    return res.render('home',{
        title:'My Contact Page',
        contact_list:contactList
    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',
    {
        title:'Playground page'
    });
});

app.post('/create-contact',function(req,res){
    //console.log(req.body);
    contactList.push(req.body);

    return res.redirect('/'); // redirect to the home page
});

// ----deleting Contact----
app.get('/delete-contact/:phone',function(req,res){
    //console.log(req.params);
    let phone=req.params.phone;

    let contactIndex=contactList.findIndex(contact => contact.phone==phone);

    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('/');
});


//sending data to port and also checking error
app.listen(8000,function(err){
    if(err){
        console.log("Error is found",err);
        return;
    }
    console.log("server is up and running");
});