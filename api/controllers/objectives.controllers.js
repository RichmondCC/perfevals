var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

// Get all objectives for a specific evaluation
module.exports.objectivesGetAll = function(req, res){
  var evalId = req.params.evalId;
  console.log('GET evalId', evalId);

  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var response = {};
      if(err){
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = eval.objectives;
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// Get a specific objective for a specific evaluation
module.exports.objectivesGetOne = function(req, res){
  var evalId = req.params.evalId;
  var objectiveId = req.params.objectiveId;
  console.log('GET objectiveId ' + objectiveId + ' for evalId' + evalId);

  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var objective = eval.objectives.id(objectiveId);
      var response = {};
      if(err){
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = objective;
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _addObjective = function(req, res, eval){
  eval.objectives.push({
    objective: req.body.objective,
		goals: req.body.goals,
  });
  console.log(req.body);
  eval.save(function(err, evalUpdated){
    if(err){
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(evalUpdated.objectives[evalUpdated.objectives.length - 1]);
    }
  });
};

module.exports.objectivesAddOne = function(req, res){
  var evalId = req.params.evalId;
  console.log('GET evalId', evalId);

  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var response = {};
      if(err){
        console.log('Error finding eval');
        response.status = 500;
        response.message = err;
      } else if(!eval) {
        console.log('Eval id not found in database', evalId);
        response.status = 404;
        response.message = {"message": 'Eval id not found ' + evalId};
      }
      if (eval){
        _addObjective(req, res, eval);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

module.exports.objectivesUpdateOne = function(req, res){
  var evalId = req.params.evalId;
  var objectiveId = req.params.objectiveId;
  console.log('GET objectiveId ' + objectiveId + ' for evalId' + evalId);

  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var objective = eval.objectives.id(objectiveId);
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
        thisObjective = eval.objectives.id(objectiveId);
        if(!thisObjective){
          response.status = 404;
          response.message = {
            "message" : "objectiveId not found " + objectiveId
          };
        }
        if(response.status !== 200){
          res
            .status(response.status)
            .json(response.message);
        } else {
          thisObjective.objective =  req.body.objective;
      		thisObjective.goals =  req.body.goals;
      		thisObjective.progress =  req.body.progress;
      		thisObjective.results =  req.body.results;

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

module.exports.objectivesDeleteOne = function(req, res){
  var evalId = req.params.evalId;
  var objectiveId = req.params.objectiveId;
  console.log('GET objectiveId ' + objectiveId + ' for evalId' + evalId);

  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var objective = eval.objectives.id(objectiveId);
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
        thisObjective = eval.objectives.id(objectiveId);
        if(!thisObjective){
          response.status = 404;
          response.message = {
            "message" : "objectiveId not found " + objectiveId
          };
        }
        if(response.status !== 200){
          res
            .status(response.status)
            .json(response.message);
        } else {
          thisObjective.remove();
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
