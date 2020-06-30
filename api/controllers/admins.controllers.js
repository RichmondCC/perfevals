var fs = require('fs');

module.exports.getAdmins = function(req, res){
    var data = fs.readFileSync('api/data/admins.json', 'utf-8');
    res.send(data);

};

module.exports.updateAdmins = function(req, res){
    fs.writeFileSync('api/data/admins.json', JSON.stringify(req.body));
    var data = fs.readFileSync('api/data/admins.json', 'utf-8');
    res.send(data);

};