var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

// Get all professional development activities for a specific evaluation
module.exports.profdevGetAll = function(req, res){
  var evalId = req.params.evalId;
  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      var response = {};
      if(err){
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = eval.prof_dev_activities;
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// Get a specific professional development activity for a specific evaluation
module.exports.profdevGetOne = function(req, res){
  var evalId = req.params.evalId;
  var profdevId = req.params.profdevId;
  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      var profdev = eval.prof_dev_activities.id(profdevId);
      var response = {};
      if(err){
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = profdev;
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.profdevAddOne = function(req, res){
  var evalId = req.params.evalId;
  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Could not execute query.'});
      } else if(!eval) {
        res
          .status(200)
          .json({err: true, msg: 'Could not find evaluation.'});
      } else {
        eval.prof_dev_activities.push(req.body);
        eval.save(function(err, updatedEval){
          if(err){
            res
              .status(200)
              .json({err: true, msg: 'Could not save updated evaluation.'});
          } else {
            res
              .status(200)
              .json({err: false, msg: 'Evaluation update.', training: updatedEval.prof_dev_activities});
          }
        });
      }
    });
};

module.exports.profdevUpdateOne = function(req, res){
  var evalId = req.params.evalId;
  var trainingId = req.params.trainingId;
  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Could not execute query.'});
      } else if(!eval){
        res
          .status(200)
          .json({err: true, msg: 'Could not find evaluation.'});
      } else {
        var trainingToUpdate = eval.prof_dev_activities.id(trainingId);
        for([key, value] of Object.entries(req.body)){
          trainingToUpdate[key] = value;
        }
        eval.save(function(err, updatedEval){
          if(err){
            res
              .status(200)
              .json({err: true, msg: 'Could not save updated evaluation.'});
          } else {
            res
              .status(200)
              .json({err: false, msg: 'Evaluation update.', training: updatedEval.prof_dev_activities});
          }
        });
      }
    });
};

module.exports.profdevDeleteOne = function(req, res){
  var evalId = req.params.evalId;
  var trainingId = req.params.trainingId;
  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Could not execute query.'});
      } else if(!eval){
        res
          .status(200)
          .json({err: true, msg: 'Could not find evaluation.'});
      } else {
        var trainingToDelete = eval.prof_dev_activities.id(trainingId);
        trainingToDelete.remove();
        eval.save(function(err, updatedEval){
          if(err){
            res
              .status(200)
              .json({err: true, msg: 'Could not save updated evaluation.'});
          } else {
            res
              .status(200)
              .json({err: false, msg: 'Evaluation update.', training: updatedEval.prof_dev_activities});
          }
        });
      }
    });
};
