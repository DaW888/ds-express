var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars');
var Datastore = require('nedb')


var path = require("path")
app.use(express.static("static"))

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs',
	extname: '.hbs', 
	partialsDir: "views/partials", 
}));
app.set('view engine', 'hbs');

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var coll1 = new Datastore({
    filename: 'kolekcja2.db',
    autoload: true
});

app.get("/", function (req, res) { 
    res.render('index01.hbs', coll1);
})

app.get('/dane', (req, res) => {
	console.log(req.query.be)
	var obj = {
		ub: req.query.ub == 'on' ? "TAK" : "NIE",
		be: req.query.be == 'on' ? "TAK" : "NIE",
		us: req.query.us == 'on' ? "TAK" : "NIE",
		na: req.query.na == 'on' ? "TAK" : "NIE",
	}
	console.log(obj)

	coll1.insert(obj, function (err, newDoc){
		console.log("dodano dokument (obiekt): ")
		console.log(newDoc)
		console.log(`losowe id dokumentu: ${newDoc._id}`)
	})

	coll1.find({ }, function (err, docs) {
		console.log("----- tablica obiektów pobrana z bazy: \n")
		console.log(docs)
		//console.log("----- sformatowany z wcięciami obiekt JSON: \n")
		//console.log(JSON.stringify({ "docsy": docs }, null, 4))
		res.render('index02.hbs', {'docs': docs});
	});
});

app.get('/modify', function (req, res)  {
	var dzialanie = Object.values(req.query)[0]
	var id = Object.keys(req.query)[0]
	if(dzialanie == 'delete'){
		coll1.remove({ _id: id }, {}, function (err, numRemoved) {
			console.log("usunięto dokumentów: ",numRemoved) 
		});
	}
	console.log(req.query) //daje tak zamaist nazwy
	if(dzialanie == 'edit'){
		coll1.find({ }, function (err, docs) {
			edit = {edit: true}
			console.log(docs.length)
			for (var i = 0; i < docs.length; i++) {
				if(docs[i]._id == id){
					docs[i].edit = true
				}
			}
			console.log(docs)
			res.render('index02.hbs', {'docs': docs})
		});
	}else if (dzialanie == 'apply'){
		coll1.find({ }, function (err, docs) {
			console.log('apppply')
			res.render('index02.hbs', {'docs': docs})
		});
	}else{
		coll1.find({ }, function (err, docs) {
			console.log('weszz3')
			res.render('index02.hbs', {'docs': docs})
		});
	}

});

app.get('/appl', (req, res) => {
	console.log('wszedlem do apple')
	console.log(req.query)
	var dzialanie = Object.values(req.query)[4]
	var id = Object.keys(req.query)[4]
	// var dzialanie2 = Object.values(req.query)[0]
	// if(dzialanie2.length > dzialanie.length){
	// 	dzialanie = dzialanie2
	// 	id = Object.keys(req.query)[0]
	// }
		
	if(dzialanie == 'cancel'){
		coll1.find({ }, function (err, docs) {
			res.render('index02.hbs', {'docs': docs})
		});
	}
	if(dzialanie == 'apply'){
		coll1.update({_id: id}, {ub: req.query.ub, be: req.query.be, us: req.query.us, na:req.query.na}, {}, function (err, numUpdated) {
			console.log("zaktualizowano " + numUpdated)
		 });

		 coll1.find({ }, function (err, docs) {
			res.render('index02.hbs', {'docs': docs})
		});
	// var id = Object.keys(req.query)[0]
	// console.log(req.query.be)
	// console.log(Object.keys(req.query))
	}
});