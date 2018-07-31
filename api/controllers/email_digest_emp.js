var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/perfevals';
mongoose.connect(dburl);
require('../data/evals.model.js');
var Eval = mongoose.model('Eval');

var nodemailer = require('nodemailer');
var smtpConfig = {
  host: '10.1.0.100',
  port: 25,
  secure: false
};
var transporter = nodemailer.createTransport(smtpConfig);

// Employee
Eval
  .aggregate([
    {$match: {
        'acknowledgements.emp_date': ''
      }
    },
    {$group: {
      _id: "$name",
      evals: {
        $push: {
          years: "$years"
        }}}}])
  .exec(function(err, results) {
    if (err) {
      console.log("Error: ", err);
    } else {
      for(var i = 0; i < results.length; i++){
        var message = {
          from: 'noreply@richmondcc.edu'
        };
        if(results[i]._id === 'wdmcinnis' || results[i]._id === 'nothing' ){
          message.to = 'ragaddy@richmondcc.edu';
        } else {
          message.to = 'jfepps@richmondcc.edu';
          // message.to = results[i]._id + '@richmondcc.edu';
        }
        message.subject = 'Performance Evaluation: Employee Alerts';
        message.text = 'Hello ' + results[i]._id + ',\n\n';
        for(var j = 0; j < results[i].evals.length; j++){
          message.text += 'You have not yet completed your ' + results[i].evals[j].years + ' performance evaluation.\n\n';
        }
        message.text += "You can access your evaluations by logging in at:\n";
        message.text += "http://evals.richmondcc.edu/ \n\n";
        message.text += '\nThank You!\nThe RichmondCC HR Department';
        // message.html = '<pre>' + message.text + '</pre>';
        transporter.sendMail(message, function(err, info){
          if(err){
            mongoose.connection.close();
            // console.log('Error: ', err);
          } else {
            mongoose.connection.close();
            // console.log('Good!', results);
          }
        });
      }
    }
  });
