var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars');

var path = require("path")
app.use(express.static("static"))

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs'); // określenie silnika szablonów

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var context = {
    subject: "ćwiczenie 4 - dane z tablicy, select", 
    fields:[
        {name:"title"},
        {name:"author"},
        {name:"lang"}        
    ], 
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
   ]  
 }


app.get("/", function (req, res) { 
    res.render('index04.hbs', context);
    console.log(context.books[1]["title"])
})

app.get('/index041.hbs', (req, res) => {
    var context2 = {
        books:[]
    }
    console.log(req.query.wybor)
    switch(req.query.wybor){
        case "title":
            for(let i = 0; i < context["books"].length; i++)
                context2["books"].push({ks: context.books[i]["title"]})
            console.log(context2)
                break;
        case "author":
            for(let i = 0; i < context["books"].length; i++)
                context2["books"].push({ks: context.books[i]["author"]})
            break;
        case "lang":
            for(let i = 0; i < context["books"].length; i++)
                context2["books"].push({ks: context.books[i]["lang"]})
            break;
        case undefined:
            context2["books"].push({ks: "Nie wybrano żadnej książki !!!"})
    }
    res.render('index041.hbs', context2);
});