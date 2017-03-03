var express = require('express');
  var router = express.Router();
    var multer = require('multer');

var upload = multer({dest: "./uploads"});

    var http = require('http');
var url  = require('url');
var fs   = require('fs');

var expressValidator = require('express-validator');

var BodyParser = require('body-parser');

var session = require('express-session');

var path = require('path');

var mongojs= require('mongojs');

var db = mongojs('se',['users']);

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/images");
var conn = mongoose.connection;

var gfs;


var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

conn.once("open", function(){
  gfs = Grid(conn.db);
  app.get("/", function(req,res){
    res.render("home");
  });

  app.post("/pic", upload.single("avatar"), function(req, res){
    var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
   
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
console.log(req.filenamee);
}

	)})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);

      	var username = Usess;
		var Password = Psess;
console.log(username);
console.log(Password);

	db.users.update({username,Password},{$set:{pp:req.file.originalname}});

	res.render('createP');


  });

  app.post('/screenshot',upload.single("avatar"),function(req,res){

	 var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
   
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){
console.log(req.filenamee);
}

	)})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);

      	var username = Usess;
		var Password = Psess;
console.log(username);
console.log(Password);

	db.users.update({username,Password},{$push:{sc:req.file.originalname}});

	res.render('createP');


  });



  app.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  app.get("/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });
});


var uploading = multer({
  dest: __dirname + '../public/uploads/',
});

router.post('/upload', function(req, res) {

})

module.exports = router;


var app = express();

var Usess;
var Psess;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(function(req,res,next){ res.locals.errors=null; next(); });

app.use(function(req,res,next){ res.locals.error=null; next(); });

app.use(function(req,res,next){ res.locals.add=null; next(); });

app.use(function(req,res,next){ res.locals.done=null; next(); });

app.use(function(req,res,next){ res.locals.names=null; next(); });

app.use(function(req,res,next){ res.locals.oneUser=null; next(); });


app.set('trust proxy', 1) 
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))



app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.'),
		root  = namespace.shift(),
		formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift()+']';

		}
		return{
			param : formParam,
			msg : msg,
			value: value
		};
	}
}));

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({extended: false}));


app.get('/',function(req,res){
	res.render('index2'); 
});

app.get('/register',function(req,res){
	res.render('index');
})


app.get('/login',function(req,res){

	res.render('index3');

})




app.post('/users/add',function(req,res){

req.checkBody('User_Name', 'user name is required').notEmpty();
req.checkBody('Password', 'Password is required').notEmpty();

var errors = req.validationErrors();

if (errors) {
	res.render('index',{
		title: 'sd',
		errors : errors
	}); 


}else{

	var User =  {
		username: req.body.User_Name,
		Password: req.body.Password,
		works : [],
		name: "",
		pp : null,
		sc:[]
	}
	

	db.users.insert(User,function(err,res){
		if(err){


		}

	})

	res.render('success');


};
});



app.post('/tp',function(req,res){

	var tri = false;
	req.checkBody('User_Name', 'user name is required').notEmpty();
	req.checkBody('Password', 'Password is required').notEmpty();

	var errors = req.validationErrors();
	var error = false;

	if (errors) {
		res.render('index3',{
			error: false,
			errors : errors
		}); 

	}else{
		var username = req.body.User_Name;
		var Password = req.body.Password;

		function cb(callback){
			db.users.find({username,Password},function (err,res) {

				if (err){

				}
				if (res.length!=0){
			tri = true;
		}else{
			tri = false;

		}

		callback();



	})
		}



		cb(t);


		function t(){
			if(!tri){
				res.render('index3',{
					error: true,
					errors : null

				});
			}else{
				res.render('portofolio');

				Usess = username;
				Psess = Password;	
			
		}	
	}

}

});


app.get('/view',function(req,res){

var names = [];
	var username = 'karim';
	var Password = 'labib';

	function cb(callback){
			db.users.find().forEach(function (err,doc) {

				if (err){

				}
				
		callback(doc);
		
		


	})

		}


cb(t);

		function t(username){
		if(username!=null){
		names.push(username);
		}else{
		res.render('summary',{
			names:names
		});
	}
		}	

	})


app.post('/port',function(req,res){
	res.render('createP');
})	

app.post('/add',function(req,res){
	res.render('createP',{
		add : true
	});
})

/*app.post('/screenshot',function(req,res){

	var username = Usess;
	var Password = Psess;


	db.users.update({username,Password},{$push:{sc:req.body.img}});

	res.render('createP');

})
*/
app.post('/link',function(req,res){

	var username = Usess;
	var Password = Psess;


	db.users.update({username,Password},{$push:{works:req.body.link}});

	res.render('createP');

})

app.post('/create',function(req,res){

	var username = Usess;
	var Password = Psess;


	db.users.update({username,Password},{$set:{name:req.body.name}});

	res.render('createP');

})




app.post('/creating',function(req,res){

	res.render('createP',{
		done:true
	});

})

app.listen(4000, function(){
	console.log('kolo');
})


