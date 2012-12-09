var express = require('express');
var app = express();
                    
function home(req, res) {
    res.redirect('/index.html');
}

app.use(express.static(__dirname + '/public'));

app.get('/', home);

app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);