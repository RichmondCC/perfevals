var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

module.exports.objectivesGetAll = function(req, res){
  var evalId = req.params.evalId;
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
  // console.log(req.body);
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
  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      var response = {};
      if(err){
        response.status = 500;
        response.message = err;
      } else if(!eval) {
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
  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Error finding evaluation.'});
      } else {
        if(!eval){
          res
            .status(200)
            .json({err: true, msg: 'could not find evaluation.'});
          } else {
            objectiveToUpdate = eval.objectives.id(objectiveId);
            for([key, value] of Object.entries(req.body)){
              objectiveToUpdate[key] = value;
            }
            eval.save(function(err, updatedEval){
              if(err){
                res
                .status(200)
                .json({err: true, msg: 'could not update evaluation.'});    
              } else {
                res
                .status(200)
                .json({err: false, msg: 'Objective updated.', objectives: updatedEval.objectives});  
              }
            });
          }
      }
    });
};

module.exports.objectivesDeleteOne = function(req, res){
  var evalId = req.params.evalId;
  var objectiveId = req.params.objectiveId;
  Eval
    .findById(evalId)
    .select('objectives')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Error finding evaluation.'});
      } else if(!eval) {
        res
          .status(200)
          .json({err: true, msg: 'Could not find evaluation.'});
      } else {
        objectiveToDelete = eval.objectives.id(objectiveId);
        if(!objectiveToDelete){
          res
            .status(200)
            .json({err: true, msg: 'Could not find objective.'});
          } else {
            objectiveToDelete.remove();
            eval.save(function(err, updatedEval){
              if(err){
                res
                  .status(200)
                  .json({err: true, msg: 'Could not delete objective.'});
                } else {
                  res
                    .status(200)
                    .json({err: false, msg: 'Objective deleted sucessfully.', objectives: updatedEval.objectives});
                }
            });
          }
      }      
    });
};
