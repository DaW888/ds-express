var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars');

var path = require("path")
app.use(express.static("static"))

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs',
helpers:{
    shortTitle: function(title){
        return title.substring(0, 10)+"...";
    },
    innyHelper: function(title){
        title = title.split(" ")
        title2 = ''
        for(i=0; i<title.length; i++){
            title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1)
            title2 += title[i]+" "
        }
        return title2

    },
    innyHelper2: function (title) {
        title2 = ''
        for (i = 0; i < title.length; i++) {
            if (title[i+1] == ' ') {
                title2 += title[i]; i++
                title2 += title[i]
            }  else if (i == title.length - 1) {
                title2 += title[i]
            } else
                title2 += title[i] + "-"
        }
        return title2
    } 
} 
}));
app.set('view engine', 'hbs');

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var context = require("./data/data03.json")
console.log(context)

app.get("/", function (req, res) { 
    res.render('index03.hbs', context);
})
