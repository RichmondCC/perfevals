var express = require('express');
var router = express.Router();
var passport = require('passport');

var ctrlEvals = require('../controllers/evals.controllers.js');
var ctrlProfDev = require('../controllers/profdev.controllers.js');
var ctrlObjectives = require('../controllers/objectives.controllers.js');
var ctrlJobDesc = require('../controllers/jobDesc.controllers.js');
var ctrlAdmins = require('../controllers/admins.controllers.js');

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

// Admin Print All Evaluations
router
  .route('/adminEvals/:years')
  .get(ctrlEvals.evalsPrintAllAdmin);

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

// Toggle Faculty - Admin
router
    .route('/adminToggleFac/:evalId')
    .put(ctrlEvals.evalsFacToggleAdmin);

router
  .route('/evals')
  .post(ctrlJobDesc.evalsAddAdmin);

router
  .route('/evals/:evalId')
  .get(ctrlEvals.evalsGetEval)
  .delete(ctrlJobDesc.evalsDeleteAdmin);

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

// Job Descriptions
router
  .route('/evals/:evalId/jobDesc')
  //.get(ctrlJobDesc.jobDescGetAll)
  .post(ctrlJobDesc.jobDescAddOne);

router
  .route('/evals/:evalId/jobDesc/:jobDescId')
  .put(ctrlJobDesc.jobDescUpdateOne)
  .delete(ctrlJobDesc.jobDescDeleteOne);

// Admins
router
  .route('/4@7@_admins')
  .get(ctrlAdmins.getAdmins)
  .put(ctrlAdmins.updateAdmins);

router
  .route('/uniqueYears')
  .get(ctrlEvals.evalsGetYears);

module.exports = router;
