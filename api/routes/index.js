var express = require('express');
var router = express.Router();
var passport = require('passport');

var ctrlEvals = require('../controllers/evals.controllers.js');
var ctrlProfDev = require('../controllers/profdev.controllers.js');
var ctrlObjectives = require('../controllers/objectives.controllers.js');

// Logins
router.post('/login', passport.authenticate('ldapauth', {
    session: false
  }), function(req, res) {
    res.json({valid: true});
  });

// Verify
router
  .route('/verify/:evalId')
  .put(ctrlEvals.evalsVerify);

  // Save pip
  router
    .route('/savepip/:evalId')
    .put(ctrlEvals.evalsVerify);

  // Supervisors
  router
    .route('/supervisors/')
    .get(ctrlEvals.evalsSupers);

  // Relevant Evaluations
  router
    .route('/relEvals/:username')
    .get(ctrlEvals.evalsGetRelevant);

  // Get Current Evaluation
  router
    .route('/currEval/:username')
    .get(ctrlEvals.evalsGetCurrent);

// Admin Evaluations
router
  .route('/adminEvals')
  .get(ctrlEvals.evalsGetAdmin);

// Save Form - Employee
router
  .route('/empEvals/:evalId')
  .put(ctrlEvals.evalsUpdateEmp);

// Save Form - Supervisor
router
  .route('/supEvals/:evalId')
  .put(ctrlEvals.evalsUpdateSup);

// Save Form - Next Level
router
  .route('/nlEvals/:evalId')
  .put(ctrlEvals.evalsUpdateNl);

  // Save Form - Admin
  router
    .route('/adminEvals/:evalId')
    .put(ctrlEvals.evalsUpdateAdmin);

    // Save Form - Admin
    router
      .route('/replace/:replaceType')
      .post(ctrlEvals.evalsReplaceAdmin);

    // generate - Admin
    router
      .route('/generateEvals')
      .put(ctrlEvals.generateEvals);

    // countEvals - Admin
    router
      .route('/count/:years')
      .get(ctrlEvals.evalsCountAdmin);

// Unlock Eval - Admin
router
  .route('/adminUnlockEval/:evalId/:type')
  .put(ctrlEvals.evalsUnlockAdmin);

router
  .route('/evals')
  .post(ctrlEvals.evalsAddAdmin);

router
  .route('/evals/:evalId')
  .get(ctrlEvals.evalsGetEval)
  .delete(ctrlEvals.evalsDeleteAdmin);

// Training
router
  .route('/evals/:evalId/training')
  .get(ctrlProfDev.profdevGetAll)
  .post(ctrlProfDev.profdevAddOne);

router
  .route('/evals/:evalId/training/:trainingId')
  .get(ctrlProfDev.profdevGetOne)
  .put(ctrlProfDev.profdevUpdateOne)
  .delete(ctrlProfDev.profdevDeleteOne);

// Objectives
router
  .route('/evals/:evalId/objectives')
  .get(ctrlObjectives.objectivesGetAll)
  .post(ctrlObjectives.objectivesAddOne);

router
  .route('/evals/:evalId/objectives/:objectiveId')
  .get(ctrlObjectives.objectivesGetOne)
  .put(ctrlObjectives.objectivesUpdateOne)
  .delete(ctrlObjectives.objectivesDeleteOne);

module.exports = router;
