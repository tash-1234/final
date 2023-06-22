const  express = require('express');
const session = require("express-session");
const app = express();
const conn = require("./conn.js")
const path = require("path")
const multer = require("multer");

const crypt5 = require("./crypt.js");
const formidable = require("formidable");
const { isSet } = require('util/types');
const port = 3000;

//using the session middleware
app.use(session({ secret: 'keyboard cat',
 cookie: { maxAge: 60000 },
 resave:false,
 saveUninitialized:false,
}
 ));
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message = {};
    next();
});



// const checkFileType = function (file, cb) {
//     //Allowed file extensions
//     const fileTypes = /jpeg|jpg|png|gif|svg/;
  
//     //check extension names
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
//     const mimeType = fileTypes.test(file.mimetype);
  
//     if (mimeType && extName) {
//       return cb(null, true);
//     } else {
//       cb("Error: You can Only Upload Images!!");
//     }
  
//   }


// //multer configuration
// //Setting storage engine
// const storageEngine = multer.diskStorage({
//     destination: "./images",
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}--${file.originalname}`);
//     },
// });


//   //initializing multer
// const upload = multer({
//     storage: storageEngine,
//     limits: { fileSize: 1000000 },
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     },
// });
// app.use(upload.array());

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


//end 
conn.connect(function(err){
    if (err) {
        console.log(err);
}});



app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));

app.get("/tenants",(req,res)=>{
    res.render("index");
});

app.get("/add_property",function(req,resp){
    if (!req.session.user) {
        resp.redirect("login");
    }
    resp.render("add_property")
});



app.post("/add_property",function(req,resp){


    if (!req.session.user) {
        resp.redirect("login");
    }
    const name = req.body.name;
    const bed = req.body.bed;
    const type = req.body.type;
    const bath = req.body.bath;
    const location = req.body.location;
    const cost = req.body.cost;
    const user_id = req.body.owner_id;
    const map = req.body.maps_link;
    const desc = req.body.desc;

     const query = `INSERT INTO property (
             owner_id, property_name,
             property_type, property_location,
             property_desc, property_maps,property_cost,
             property_bedrooms, property_bathrooms,
             property_photos) VALUES ('${user_id}',
            '${name}', '${type}', '${location}',
            '${desc}', '${map}', '${cost}', '${bed}', '${bath}', 'default.png')`;
    conn.query(query,function(err,result){
    if (err) {
       console.log(err);
    }else{
        resp.redirect("/add_property");
    }
 });

});


app.post("/update_property",function(req,resp){
    const name = req.body.name;
    const bed = req.body.bed;
    const type = req.body.type;
    const bath = req.body.bath;
    const location = req.body.location;
    const cost = req.body.cost;
    const user_id = req.body.owner_id;
    const map = req.body.maps_link
    const desc = req.body.desc;

     const query = `UPDATE property (
             SET owner_id = ${user_id},
             property_name='${name}',
             property_type='${type}',
             property_location='${location}',
             property_desc='${desc}',
             property_maps='${map}',
             property_cost='${cost}',
             property_bedrooms='${bed}',
             property_bathrooms='${bath}',
            )`;
    conn.query(query,function(err,result){
    if (err) {
        resp.redirect("/edit_property")
    }else{
        resp.redirect("/edit_property");
    }
 });

});


app.get("/property",function(req,resp){
        if (req.session.user) {
            const query = `SELECT property.* from property`;
            conn.query(query,function(err,props){
                if (err) {
                    console.log(err);
                }else{
                    resp.render("property",{
                        props:props,
                        user:req.session.user
                    });
                }
             });
            
        }else{
            resp.redirect("login");
        }

});


app.post("/approve",function(req,resp){
    $id = req.body.id;
    const query = `UPDATE property set approved='yes' where property_id='${id}' `;
    conn.query(query,function(err,props){
        resp.redirect("property");
    });

});

app.post("/disapprove",function(req,resp){
    $id = req.body.id;
    const query = `UPDATE property set approved='no' where property_id='${id}' `;

  conn.query(query,function(err,props){
     resp.redirect("property");
   });

});


app.get("/add_payment",function(req,resp){

    if (!req.session.user) {
        resp.redirect("login");
    }

    const id = 1;
    const query = `SELECT * from property where property_id='${id}' `;

  conn.query(query,function(err,props){
     resp.render("add_payment",{
      props:props
     });

     delete req.session.success;
     delete req.session.info;
     delete req.session.error;
   });

});


app.post("/add_lease",function(req,resp){
    const prop_id  = 1;
    const  user_id = 1;
    const amount  = req.body.amount;
    const end_date  = req.body.end_date;
    const start_date  = req.body.start_date;
    const query = `
    INSERT INTO property_leases
    (property_id,user_id,amount_paid,start_date,end_date)
     values('${prop_id}','${user_id}','${amount}','${start_date}','${end_date}')`;

    conn.query(query,function(err,result){
            resp.redirect("back");
    });

});



app.get("/payments",function(req,resp){

    if (!req.session.user) {
        resp.redirect("login");
    }
    const query = `SELECT property_leases.*,property.*,
    datediff(property_leases.end_date,property_leases.start_date) as days from property_leases 
    join property on property.property_id=property_leases.property_id 
    join users on users.user_id=property_leases.user_id
    where property.owner_id=${1} `;

  conn.query(query,function(err,payments){
     resp.render("payments",{
      payments:payments
     });

     delete req.session.success;
     delete req.session.info;
     delete req.session.error;
   });

});




app.get("/my_payments",function(req,resp){

    if (!req.session.user) {
        resp.redirect("login");
    }
    const query = `SELECT property_leases.*,property.*,
    datediff(property_leases.end_date,property_leases.start_date) as days from property_leases 
    join property on property.property_id=property_leases.property_id 
    join users on users.user_id=property_leases.user_id
    where property_leases.user_id=${1} `;

  conn.query(query,function(err,payments){
     resp.render("payments",{
      payments:payments
     });

     delete req.session.success;
     delete req.session.info;
     delete req.session.error;
   });

});



app.post("/add_like",function(req,resp){
    let prop_id  = req.body.property_id;
    let  user_id = req.body.user_id;

    if (user_id!=null||prop_id!=null) {
        let query = `
        INSERT INTO property_likes
        (property_id,user_id)
         values('${prop_id}','${user_id}')`;
    
        conn.query(query,function(err,result){
                req.session.message={
                    success:"Property Liked Successfully"
                };
                resp.redirect("back");
        });
        
    }else{
        req.session.message={
           error :"Missing Some Parameters"
        };
        resp.redirect("back");
    }
   

});



app.post("/add_comment",function(req,resp){
    let prop_id  = req.body.property_id;
    let user_id = req.session.user.user_id;
    let comment_body = req.body.comment_body;

    let query = `
    INSERT INTO property_comments
    (property_id,user_id,comment_message)
     values('${prop_id}','${user_id}','${comment_body}')`;

    conn.query(query,function(err,result){
           resp.redirect("back");
           
    });

});






app.get("/comments",function(req,resp){

    if (!req.session.user) {
        resp.redirect("login");
    }
    let prop_id = req.query.property;
    let query = `SELECT * from property_comments join users on users.user_id=property_comments.user_id   where property_id='${prop_id}'`;

     conn.query(query,function(err,comments){
        resp.render("comments",{
        comments:comments,
        property_id:prop_id
    });

     delete req.session.success;
     delete req.session.info;
     delete req.session.error;
   });

});






app.get('/',function(req,resp){
    conn.query("SELECT * from users",function(err,result){
       if (err) {
        resp.send({error:err});
       }else{
        resp.send(result)
       }
    });


});



app.get("/login",function(req,res,next){
    if(req.session.user){
        res.redirect("property");
    }else{
        res.render("login",{
            user:null
        });
    }
});


app.post('/register',function(req,resp){

    const name = req.body.name;
    const contact = req.body.contact;
    const role = req.body.role;
    const password = crypt5(req.body.password);
 
     conn.query(`INSERT INTO users(full_name,contact,password,role) 
     values('${name}',
     '${contact}',
     '${password}', 
     '${role}'
     )`,function(err,users){
        if (err) {
         resp.send(err);
        }else{
            resp.redirect("register")
        }
    
 
    });
 
 });

app.post('/login',function(req,resp){

    const username = req.body.username;
    const password = crypt5(req.body.password);
 
     conn.query(`SELECT * from users where password='${password}' and contact='${username}' `,function(err,users){
        if (err) {
         resp.redirect("login");
        }else{

            if (users.length>0) {
                req.session.success = "Logged in successfully";
                req.session.user = users[0];
                resp.send({
                    message:"success"
                });
            }else{
                resp.send({
                    message:"failed"
                });
            }
        }});
     });
 

 app.get("/register",function(req,resp,next){

    if (req.session.user) {
        resp.redirect("property");
    }else{
        resp.render("register");
    }
    
    // delete req.session.success;
    // delete req.session.info;
    // delete req.session.error;
 });







app.listen(port, function(){
    console.log(`app running at ${port} `);
});