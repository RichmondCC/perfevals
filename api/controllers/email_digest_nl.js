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

    // Next-Level
    Eval
      .aggregate([{
          $match: {
            $and: [{
                'acknowledgements.verify_date': {
                  $ne: ''
                }
              },
              {
                'acknowledgements.nl_date': ''
              }
            ]
          }
        },
        {
          $group: {
            _id: "$next_level_name",
            employees: {
              $push: {
                name: "$name"
              }
            }
          }
        }
      ])      .exec(function(err, results) {
        if (err) {
          //console.log("Error: ", err);
        } else {
          for(var i = 0; i < results.length; i++){
            var message = {
              from: 'noreply@richmondcc.edu'
            };
            if(results[i]._id === 'wdmcinnis' || results[i]._id === 'nothing' ){
              message.to = 'ragaddy@richmondcc.edu';
            } else {
              message.to = 'ragaddy@richmondcc.edu';
              // message.to = results[i]._id + '@richmondcc.edu';
            }
            message.subject = 'Performance Evaluation: Next-Level Supervisor Alerts';
            message.text = 'Hello ' + results[i]._id + ',\n\n';
            message.text += 'The following indirect reports have performance evaluations requiring your attention:\n';
            for(var j = 0; j < results[i].employees.length; j++){
              message.text += results[i].employees[j].name + '\n';
            }
            message.text += '\nThank You!\nThe RichmondCC HR Department';
            // message.html = '<pre>' + message.text + '</pre>';
            if(results[i]._id !== 'wdmcinnis'){
              transporter.sendMail(message, function(err, info){
                if(err){
                  //console.log('Error: ', err);
                  mongoose.connection.close();
                } else {
                  //console.log('Good!', results);
                  mongoose.connection.close();
                }
              });
            }
          }
        }
      });
