var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

// Get all professional development activities for a specific evaluation
module.exports.profdevGetAll = function(req, res){
  var evalId = req.params.evalId;
  console.log('GET evalId', evalId);

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
  console.log('GET profdevId ' + profdevId + ' for evalId' + evalId);

  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      console.log('Returned eval', eval);
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

var _addProfDev = function(req, res, eval){
  eval.prof_dev_activities.push({
    activity: req.body.prof_dev_activity,
		hours: req.body.prof_dev_time,
		comments: req.body.prof_dev_comments
  });
  eval.save(function(err, evalUpdated){
    if(err){
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(evalUpdated.prof_dev_activities[evalUpdated.prof_dev_activities.length -1]);
    }

  });
};

module.exports.profdevAddOne = function(req, res){
  var evalId = req.params.evalId;
  console.log('GET evalId', evalId);

  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      var response = {};
      if(err){
        console.log('EvalId not found in database', evalId);
        response.status = 500;
        response.message = err;
      } else if(!eval) {
        console.log('EvalId not found: ' + evalId);
        response.status = 404;
        response.message = {"message": "EvalId not found: " + evalId};
      }
      if(eval){
        _addProfDev(req, res, eval);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

module.exports.profdevUpdateOne = function(req, res){
  var evalId = req.params.evalId;
  var profdevId = req.params.trainingId;
  console.log('GET profdevId ' + profdevId + ' for evalId' + evalId);

  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      console.log('Returned eval', eval);
      var profdev = eval.prof_dev_activities.id(profdevId);
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
          "message": "evalId not found" + evalId
        };
      } else {
        thisProfDev = eval.prof_dev_activities.id(profdevId);
        if(!thisProfDev){
          response.status = 404;
          response.message = {
            "message": "profdevId not found" + profdevId
          };
        }
        if(response.status !== 200){
          res
            .status(response.status)
            .json(response.message);
        } else {
          thisProfDev.activity = req.body.prof_dev_activity;
      		thisProfDev.hours = req.body.prof_dev_time;
      		thisProfDev.comments = req.body.prof_dev_comments;

          eval.save(function(err, updatedEval){
            if(err){
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json({});
            }
          });
        }
      }
    });
};

module.exports.profdevDeleteOne = function(req, res){
  var evalId = req.params.evalId;
  var profdevId = req.params.trainingId;
  console.log(req.params);

  Eval
    .findById(evalId)
    .select('prof_dev_activities')
    .exec(function(err, eval){
      console.log('Returned eval', eval);
      var profdev = eval.prof_dev_activities.id(profdevId);
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
          "message": "evalId not found" + evalId
        };
      } else {
        thisProfDev = eval.prof_dev_activities.id(profdevId);
        if(!thisProfDev){
          response.status = 404;
          response.message = {
            "message": "profdevId not found" + profdevId
          };
        }
        if(response.status !== 200){
          res
            .status(response.status)
            .json(response.message);
        } else {
          thisProfDev.remove();
          eval.save(function(err, updatedEval){
            if(err){
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json({});
            }
          });
        }
      }
    });
};
