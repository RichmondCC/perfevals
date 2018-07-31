var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/perfevals';
mongoose.connect(dburl);
require('../data/evals.model.js');
var Eval = mongoose.model('Eval')

var nodemailer = require('nodemailer');
var smtpConfig = {
  host: '10.1.0.100',
  port: 25,
  secure: false
};
var transporter = nodemailer.createTransport(smtpConfig);

// Employee
// Eval
//   .aggregate([
//     {$match: {
//         'acknowledgements.emp_date': ''
//       }
//     },
//     {$group: {
//       _id: "$username",
//       evals: {
//         $push: {
//           years: "$years"
//         }}}}])
//   .exec(function(err, results) {
//     if (err) {
//       console.log("Error: ", err);
//     } else {
//       for(var i = 0; i < results.length; i++){
//         var message = {
//           from: 'noreply@richmondcc.edu'
//         };
//         message.to = 'ragaddy@richmondcc.edu';//results[i]._id + '@richmondcc.edu';
//         message.subject = 'Performance Evaluation: Employee Alerts';
//         message.text = 'Hello ' + results[i]._id + ',\n\n';
//         for(var j = 0; j < results[i].evals.length; j++){
//           message.text += 'You have not yet completed your ' + results[i].evals[j].years + ' performance evaluation.\n';
//         }
//         message.text += '\nThank You!\nThe IT Department';
//         message.html = '<pre>' + message.text + '</pre>';
//       }
//       transporter.sendMail(message, function(err, info){
//         if(err){
//           console.log('Error: ', err);
//         } else {
//           console.log('Good!', results);
//         }
//       });
//     }
//   });

  // Supervisor
Eval
  .aggregate({
    $match:{
      $or:[
        {"acknowledgements.emp_date": null },
        {"acknowledgements.sup_date": null}
      ]}},{
        $group: {
          _id: "$supervisor",
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
          message.to = 'ragaddy@richmondcc.edu';//results[i]._id + '@richmondcc.edu';
          message.subject = 'Performance Evaluation: Supervisor Alerts';
          // message.text = 'Hello ' + results[i]._id + ',\n\n';
          message.text += 'Good Morning! This is your weekly digest of employee evaluations that are not completed.\n';
          message.text += 'The following employees have performance evaluations requiring your attention:\n';
          for(var j = 0; j < results[i].employees.length; j++){
            message.text += results[i].employees[j].name + '\n';
          }
          message.text += '\nThank You!\nRichmondCC HR Department';
          message.html = '<pre>' + message.text + '</pre>\n\n';
          console.log(i + ' ' + JSON.stringify(message, undefined, 2));
        }
        // transporter.sendMail(message, function(err, info){
        //   if(err){
        //     console.log('Error: ', err);
        //   } else {
        //     console.log('Good!', results);
        //   }
        // });
      }
    });

    // Next-Level
    // Eval
    //   .aggregate([
    //     {$match: {$and: [
    //       {
    //         'acknowledgements.verify_date': {$ne: ''}
    //       },
    //       {
    //         'acknowledgements.nl_date': ''
    //       }
    //     ]}},
    //     {$group: {
    //       _id: "$next_level",
    //       employees: {
    //         $push: {
    //           name: "$name"
    //         }}}}])
    //   .exec(function(err, results) {
    //     if (err) {
    //       console.log("Error: ", err);
    //     } else {
    //       for(var i = 0; i < results.length; i++){
    //         var message = {
    //           from: 'noreply@richmondcc.edu'
    //         };
    //         message.to = 'ragaddy@richmondcc.edu';//results[i]._id + '@richmondcc.edu';
    //         message.subject = 'Performance Evaluation: Next-Level Supervisor Alerts';
    //         message.text = 'Hello ' + results[i]._id + ',\n\n';
    //         message.text += 'The following indirect reports have performance evaluations requiring your attention:\n';
    //         for(var j = 0; j < results[i].employees.length; j++){
    //           message.text += results[i].employees[j].name + '\n';
    //         }
    //         message.text += '\nThank You!\nThe IT Department';
    //         message.html = '<pre>' + message.text + '</pre>';
    //       }
    //       transporter.sendMail(message, function(err, info){
    //         if(err){
    //           console.log('Error: ', err);
    //         } else {
    //           console.log('Good!', results);
    //         }
    //       });
    //     }
    //   });
