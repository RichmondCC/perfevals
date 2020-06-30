var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

var formidable = require('formidable');
var fs = require('fs');

var _addJobDesc = function(fields, res, eval, file_name){
    var numJobDesc = eval.job_description.job_desc.length;
    var baseDate = new Date(fields.effectiveDate);
    var concludeDate = ((baseDate.getMonth() + 1) 
                       + '/' + (baseDate.getDate() - 1) 
                       + '/' + baseDate.getFullYear());
    if(numJobDesc > 0){
      eval.job_description.job_desc[numJobDesc - 1].conclude_date = concludeDate;
    }
    eval.job_description.job_desc.push({
      file_name: file_name,
      effective_date: fields.effectiveDate,
      conclude_date: fields.concludeDate
    });
    eval.save(function(err, evalUpdated){
      if(err){
        res
          .status(500)
          .json({err: true, msg: 'Could not save changes to eval.'});
      } else {
        res
          .status(200)
          .json(evalUpdated);
      }
    });
  };
  
  module.exports.jobDescAddOne = function(req, res){
    var evalId = req.params.evalId;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      try {
          // Get file name and path from upload form
          var oldPath = files.file.path;
          var oldName = files.file.name;

          // Code to generate timestamp for file name uniqueness
          var dateTime = new Date();
          var timeStamp = '_' + dateTime.getFullYear() + '-'
                        + (dateTime.getMonth() + 1) + '-'
                        + dateTime.getDate() + '_'
                        + dateTime.getHours() + ':'
                        + (dateTime.getMinutes() + '').padStart(2, '0') + ':'
                        + (dateTime.getSeconds() + '').padStart(2, '0');
          
          // Extract file name and extension
          var oldFileExt = oldName.substring(oldName.lastIndexOf('.'));

          // Create a prefix for the filename from the employee first and last name
          var newFileNamePrefix = fields.name.replace(' ', '_').toLowerCase();
          
          // Concatenate new file name
          var newFileName = newFileNamePrefix + timeStamp + oldFileExt;

          // Set new path using file system path and generated file name
          var newPath = './public/uploads/' + newFileName;

      } catch(err){
          console.log(err);
      } finally {
          if(typeof oldPath === 'string'){
              fs.rename(oldPath, newPath, function(err){
                  if(err){
                      res
                        .status(500)
                        .json({err: true, msg: err});
                  } else {
                    Eval
                    .findById(evalId)
                    .select('job_description.job_desc')
                    .exec(function(err, eval){
                      var response = {};
                      if(err){
                        response.status = 500;
                        response.message = {err: true, msg: err};//err;
                      } else if(!eval) {
                        response.status = 404;
                        response.message = {err: true, msg: 'Eval id not found ' + evalId};
                      }
                      if (eval){
                        _addJobDesc(fields, res, eval, newFileName);
                      } else {
                        res
                          .status(response.status)
                          .json(response.message);
                      }
                    });
                    // res
                    //   .status(200)
                    //   .json({err: false, msg: 'File uploaded successfully!'});
                  }
              });
          } else {
              res
                .status(500)
                .json({err: true, msg: 'You must select a file to upload!'});
          }
      }

    });
  };
    
  module.exports.jobDescUpdateOne = function(req, res){
    var evalId = req.params.evalId;
    var jobDescId = req.params.jobDescId;

    Eval
      .findById(evalId)
      .select('job_description.job_desc')
      .exec(function(err, eval){
        var response = {
          status: 200,
          message: {}
        };
        if(err){
          response.status = 500;
          response.message = err;
        } else if(!eval) {
          response.status = 404;
          response.message = {
            "message" : "evalId not found " + evalId
          };
        } else {
          thisJobDesc = eval.job_description.job_desc.id(jobDescId);
          if(!thisJobDesc){
            response.status = 404;
            response.message = {
              "message" : "jobDescId not found " + jobDescId
            };
          }
          if(response.status !== 200){
            res
              .status(response.status)
              .json(response.message);
          } else {
            thisJobDesc.effective_date = req.body.effectiveDate;
            thisJobDesc.conclude_date = req.body.concludeDate;
      
            eval.save(function(err, updatedEval){
              if(err){
                res
                  .status(500)
                  .json(err);
              } else {
                res
                  .status(200)
                  .json(updatedEval);
              }
            });
          }
        }
      });
  };
  
  module.exports.jobDescDeleteOne = function(req, res){
    var evalId = req.params.evalId;
    var jobDescId = req.params.jobDescId;
  
    Eval
      .findById(evalId)
      .select('job_description.job_desc')
      .exec(function(err, eval){
        var response = {
          status: 200,
          message: {}
        };
        if(err){
          response.status = 500;
          response.message = err;
        } else if(!eval) {
          response.status = 404;
          response.message = {
            "message" : "evalId not found " + evalId
          };
        } else {
            thisJobDesc = eval.job_description.job_desc.id(jobDescId);
          if(!thisJobDesc){
            response.status = 404;
            response.message = {
              "message" : "jobDescId not found " + jobDescId
            };
          }
          if(response.status !== 200){
            res
              .status(response.status)
              .json(response.message);
          } else {
            thisJobDesc.remove();
            fs.unlinkSync('./public/uploads/' + thisJobDesc.file_name);
            eval.save(function(err, updatedEval){
              if(err){
                res
                  .status(500)
                  .json(err);
              } else {
                res
                  .status(200)
                  .json(updatedEval);
              }
            });
          }
        }
      });
  };

module.exports.evalsAddAdmin = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err){
      console.log(err);
      res
        .status(200)
        .json({err: true, msg: 'Error parsing form.'});
    }
    if(files.file){
        // Get file name and path from upload form
        var oldPath = files.file.path;
        var oldName = files.file.name;

        // Code to generate timestamp for file name uniqueness
        var dateTime = new Date();
        var timeStamp = '_' + dateTime.getFullYear() + '-'
                      + (dateTime.getMonth() + 1) + '-'
                      + dateTime.getDate() + '_'
                      + dateTime.getHours() + ':'
                      + (dateTime.getMinutes() + '').padStart(2, '0') + ':'
                      + (dateTime.getSeconds() + '').padStart(2, '0');
        
        // Extract file name and extension
        var oldFileExt = oldName.substring(oldName.lastIndexOf('.'));

        // Create a prefix for the filename from the employee first and last name
        var newFileNamePrefix = fields.name.replace(' ', '_').toLowerCase();
        
        // Concatenate new file name
        var newFileName = newFileNamePrefix + timeStamp + oldFileExt;

        // Set new path using file system path and generated file name
        var newPath = './public/uploads/' + newFileName;

        fs.renameSync(oldPath, newPath);
        fields.job_description = {job_desc: {file_name: newFileName, effective_date: fields.effective_date}};
    }
    // Add required aknowledgement and delete unecessary effective_date
    fields.acknowledgements = {emp_date: '', sup_date: '', nl_date: ''};
    delete fields.effective_date;

    // Create the evaluation
    Eval
    .create(fields, function(err, eval) {
      if (err) {
        res
          .status(200)
          .json({err: true, msg: 'Evaluation could not be created.'});
      } else {
        res
          .status(200)
          .json({err: false, msg: 'Evaluation has been created.', data: eval});
      }
    });
  });
};    

module.exports.evalsDeleteAdmin = function(req, res) {
  var evalId = req.params.evalId;

  Eval
    .findByIdAndRemove(evalId)
    .exec(function(err, eval) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        var files = eval.job_description.job_desc;
        for(i=0; i<files.length; i++){
          fs.unlinkSync('./public/uploads/' + files[i].file_name);
        }
        res
          .status(204)
          .json({});
      }
    });
};
