const express=require('express');
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs'); // told server that we are using ejs
app.set('views',path.join(__dirname,'views')); //use to join views folder properly
app.use(express.urlencoded()); //use to parse the data which was send by browser(MIDDLEWARE)

app.use(express.static('assets')); //axcessing static folder assets


//----fetching data fron DB and display to list
app.get('/',function(req,res){
    // {}=>all data to fetch and store into variable name contacts
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in finding DB');
            return;
        }

        return res.render('home',{
            title:'My Contact Page',
            contact_list:contacts
        });
    });
    
    
});

app.get('/practice',function(req,res){
    return res.render('practice',
    {
        title:'Playground page'
    });
});

//----fetching data from browser using URI and store it into DB
app.post('/create-contact',function(req,res){
    //contact fetch and store into newContact variable
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating a contact");
            return;
        }
        console.log('*****',newContact);

        return res.redirect('/');// redirect to the home page
    });

    
});

// ----deleting Contact----
app.get('/delete-contact',function(req,res){
    //console.log(req.params);
    let id=req.query.id;

    //only one argument pass coz we just want to delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting a contact");
            return;
        }
        return res.redirect('/');
    });
    
});


//sending data to port and also checking error
app.listen(8000,function(err){
    if(err){
        console.log("Error is found",err);
        return;
    }
    console.log("server is up and running");
});