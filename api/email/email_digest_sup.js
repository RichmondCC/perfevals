var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/perfevals';
mongoose.connect(dburl);
require('../data/evals.model.js');
var Eval = mongoose.model('Eval');

var nodemailer = require('nodemailer');
var smtpConfig = {
  host: '10.5.0.2',
  // host: 'rccdc02.ad.richmondcc.edu',
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
};
// var smtpConfig = {
//   host: 'smtp.office365.com',
//   port: 25,
//   secure: false,
//   auth: {
//     user: 'evals@richmondcc.edu',
//     pass: 'MkxcJN3RfYM9'
//   },
//   requireTLS: true
// };
var transporter = nodemailer.createTransport(smtpConfig);

  // Supervisor
Eval
  .aggregate({
    $match:{
      $or:[
        {"acknowledgements.emp_date": null},
        {"acknowledgements.sup_date": null}
      ]}},{
        $group: {
          _id: "$supervisor_name",
           "employees": {
             $push: {
               "name": "$name"
             }
           }
         }
       }
     )
  //
  // Eval
  //   .aggregate([
  //     {$match: {$and: [
  //       {$or:[
  //         {'acknowledgements.emp_date': ''},
  //         {'acknowledgements.emp_date': ''}]
  //       },
  //       {'acknowledgements.verify_date': ''}
  //     ]}},
      //   {$and: [
      //   {$or: [
      //     {
      //       'acknowledgements.emp_date': ''
      //     },
      //     {
      //       'acknowledgements.sup_date': ''
      //     }
      //   ]},
      //   {
      //     'acknowledgements.verify_date': ''
      //   }
      // ]}},
      // {$group: {
      //   _id: "$supervisor",
      //   employees: {
      //     $push: {
      //       name: "$name"
      //     }}}}])
    .exec(function(err, results) {
      if (err) {
        console.log("Error: ", err);
      } else {
        for(var i = 0; i < results.length; i++){
          var message = {
            from: 'noreply@richmondcc.edu'
          };
          if(results[i]._id === 'wdmcinnis' || results[i]._id === 'nothing' ){
            message.to = 'it@richmondcc.edu';
          } else {
            // message.to = 'ragaddy@richmondcc.edu';
            message.to = results[i]._id + '@richmondcc.edu';
          }
          message.subject = 'Performance Evaluation: Supervisor Alerts';
          message.text = 'Hello ' + results[i]._id + ',\n\n';
          // message.text += 'Good Morning! This is your weekly digest of employee evaluations that are not completed.\n';
          message.text += 'The following employees have performance evaluations requiring your attention:\n';
          for(var j = 0; j < results[i].employees.length; j++){
            message.text += results[i].employees[j].name + '\n';
          }
          message.text += '\nThank You!\nRichmondCC HR Department';
          // message.html = '<pre>' + message.text + '</pre>\n\n';
          // console.log(i + ' ' + JSON.stringify(message, undefined, 2));
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
