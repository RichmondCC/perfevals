var formidable = require('formidable');
var mongoose = require('mongoose');
var Eval = mongoose.model('Eval');

module.exports.evalsSupers = function(req, res) {
  Eval
    .distinct("supervisor")
    .exec(function(err, supers) {
      var response = {
        status: 200,
        json: {}
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = supers;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsGetRelevant = function(req, res) {
  var username = req.params.username;
  var d = new Date();
  d = new Date(d.setMonth(d.getMonth() + 6));
  var thisYear = d.getFullYear();
  var yearOpts = [
    (thisYear - 1) + '-' + (thisYear),
    (thisYear - 2) + '-' + (thisYear - 1),
    (thisYear - 3) + '-' + (thisYear - 2),
    ];
  Eval
    .find({
      years: {$in: yearOpts},
      $or: [{
          'username': username
        },
        {
          'supervisor': username
        },
        {
          'next_level': username
        }
      ]
    })
    .sort('-years')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: {}
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = eval;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsGetCurrent = function(req, res) {
  var username = req.params.username;
  var d = new Date();
  var thisYear = d.getFullYear();
  var yearOpt = (thisYear - 1) + '-' + (thisYear);
  Eval
    .find({years: yearOpt, 'username': username})
    .exec(function(err, eval) {
      var response = {};
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = eval;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsGetEval = function(req, res) {
  var evalId = req.params.evalId;

  Eval
    .findById(evalId)
    .exec(function(err, eval) {
      var response = {};
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = eval;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsUpdateEmp = function(req, res) {
  var evalId = req.params.evalId;

  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: eval
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "evalId not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        eval.core_skills.duties.employee_rating = req.body.duties_emp_rating;
        eval.core_skills.duties.employee_comment = req.body.duties_emp_comment;
        eval.core_skills.teamwork.employee_rating = req.body.team_emp_rating;
        eval.core_skills.teamwork.employee_comment = req.body.team_emp_comment;
        eval.core_skills.dependability.employee_rating = req.body.dep_emp_rating;
        eval.core_skills.dependability.employee_comment = req.body.dep_emp_comment;
        eval.core_skills.judgement.employee_rating = req.body.jdg_emp_rating;
        eval.core_skills.judgement.employee_comment = req.body.jdg_emp_comment;
        eval.core_skills.ethics.employee_rating = req.body.ethic_emp_rating;
        eval.core_skills.ethics.employee_comment = req.body.ethic_emp_comment;
        eval.core_skills.adaptability.employee_rating = req.body.adapt_emp_rating;
        eval.core_skills.adaptability.employee_comment = req.body.adapt_emp_comment;
        eval.core_skills.communication.employee_rating = req.body.comm_emp_rating;
        eval.core_skills.communication.employee_comment = req.body.comm_emp_comment;
        eval.core_skills.inclusiveness.employee_rating = req.body.inc_emp_rating;
        eval.core_skills.inclusiveness.employee_comment = req.body.inc_emp_comment;
        eval.core_skills.innovation.employee_rating = req.body.inn_emp_rating;
        eval.core_skills.innovation.employee_comment = req.body.inn_emp_comment;
        eval.core_skills.advising.employee_rating = req.body.adv_emp_rating;
        eval.core_skills.advising.employee_comment = req.body.adv_emp_comment;
        eval.professional_development.certificate_license = req.body.certificate_license;
        eval.professional_development.cert_lic_date = req.body.cert_lic_date;
        eval.professional_development.additional_date = req.body.additional_date;
        eval.acknowledgements.emp_date = req.body.emp_date;
        eval.acknowledgements.emp_saved = req.body.emp_saved;
        eval.acknowledgements.emp_comment = req.body.emp_comment;
        eval.acknowledgements.final_meeting = req.body.final_meeting;
        eval.save(function(err, updatedEval) {
          if (err) {
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
    });
};

module.exports.evalsUpdateSup = function(req, res) {
  var evalId = req.params.evalId;

  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: eval
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "evalId not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        eval.job_description.reviewed_date = req.body.reviewed_date;
        eval.job_description.updated_date = req.body.updated_date;
        eval.core_skills.duties.supervisor_rating = req.body.duties_sup_rating;
        eval.core_skills.duties.supervisor_comment = req.body.duties_sup_comment;
        eval.core_skills.teamwork.supervisor_rating = req.body.team_sup_rating;
        eval.core_skills.teamwork.supervisor_comment = req.body.team_sup_comment;
        eval.core_skills.dependability.supervisor_rating = req.body.dep_sup_rating;
        eval.core_skills.dependability.supervisor_comment = req.body.dep_sup_comment;
        eval.core_skills.judgement.supervisor_rating = req.body.jdg_sup_rating;
        eval.core_skills.judgement.supervisor_comment = req.body.jdg_sup_comment;
        eval.core_skills.ethics.supervisor_rating = req.body.ethic_sup_rating;
        eval.core_skills.ethics.supervisor_comment = req.body.ethic_sup_comment;
        eval.core_skills.adaptability.supervisor_rating = req.body.adapt_sup_rating;
        eval.core_skills.adaptability.supervisor_comment = req.body.adapt_sup_comment;
        eval.core_skills.communication.supervisor_rating = req.body.comm_sup_rating;
        eval.core_skills.communication.supervisor_comment = req.body.comm_sup_comment;
        eval.core_skills.inclusiveness.supervisor_rating = req.body.inc_sup_rating;
        eval.core_skills.inclusiveness.supervisor_comment = req.body.inc_sup_comment;
        eval.core_skills.innovation.supervisor_rating = req.body.inn_sup_rating;
        eval.core_skills.innovation.supervisor_comment = req.body.inn_sup_comment;
        eval.core_skills.advising.supervisor_rating = req.body.adv_sup_rating;
        eval.core_skills.advising.supervisor_comment = req.body.adv_sup_comment;
        eval.performance_improvement_plan.pip_steps = req.body.pip_steps;
        eval.performance_improvement_plan.pip_results = req.body.pip_results;
        eval.professional_development.certificate_license = req.body.certificate_license;
        eval.professional_development.cert_lic_date = req.body.cert_lic_date;
        eval.professional_development.additional_date = req.body.additional_date;
        eval.acknowledgements.sup_date = req.body.sup_date;
        eval.acknowledgements.sup_saved = req.body.sup_saved;
        eval.acknowledgements.sup_comment = req.body.sup_comment;
          // Full-time Faculty
      eval.observation.date = req.body.obs_date;
      eval.observation.courseCode = req.body.obs_courseCode;
      eval.observation.stuEvalRating = req.body.obs_stuEvalRating;
      eval.observation.scheduled = req.body.obs_scheduled;
      eval.observation.scheduledDate = req.body.obs_scheduledDate;
      eval.observation.firstYear = req.body.obs_firstYear;
      eval.observation.yearsInstructor = req.body.obs_yearsInstructor;
      eval.observation.moodle.moodleOnline = req.body.obs_moodleOnline;
      eval.observation.moodle.moodleICR = req.body.obs_moodleICR;
      eval.observation.moodle.moodleSyllabus = req.body.obs_moodleSyllabus;
      eval.observation.moodle.moodleRoster = req.body.obs_moodleRoster;
      eval.observation.goals.rating = req.body.obs_goals_rating;
      eval.observation.goals.comment = req.body.obs_goals_comment;
      eval.observation.presentation.rating = req.body.obs_presentation_rating;
      eval.observation.presentation.comment = req.body.obs_presentation_comment;
      eval.observation.expertise.rating = req.body.obs_expertise_rating;
      eval.observation.expertise.comment = req.body.obs_expertise_comment;
      eval.observation.thinking.rating = req.body.obs_thinking_rating;
      eval.observation.thinking.comment = req.body.obs_thinking_comment;
      eval.observation.management.rating = req.body.obs_management_rating;
      eval.observation.management.comment = req.body.obs_management_comment;
      eval.observation.involvement.rating = req.body.obs_involvement_rating;
      eval.observation.involvement.comment = req.body.obs_involvement_comment;
      eval.observation.attitude = req.body.obs_attitude,
      eval.observation.visitation = req.body.obs_visitation,
      eval.observation.strengths = req.body.obs_strengths;
      eval.observation.suggestions = req.body.obs_suggestions;
      eval.observation.onlCommunication.rating = req.body.obs_onlCommunication_rating;
      eval.observation.onlCommunication.comment = req.body.obs_onlCommunication_comment;
      eval.observation.onlQnA.rating = req.body.obs_onlQnA_rating;
      eval.observation.onlQnA.comment = req.body.obs_onlQnA_comment;
      eval.observation.onlFeedback.rating = req.body.obs_onlFeedback_rating;
      eval.observation.onlFeedback.comment = req.body.obs_onlFeedback_comment;
      eval.observation.onlSchedule.rating = req.body.obs_onlSchedule_rating;
      eval.observation.onlSchedule.comment = req.body.obs_onlSchedule_comment;
      eval.observation.onlCalendar.rating = req.body.obs_onlCalendar_rating;
      eval.observation.onlCalendar.comment = req.body.obs_onlCalendar_comment;
      eval.observation.onlParticipation.rating = req.body.obs_onlParticipation_rating;
      eval.observation.onlParticipation.comment = req.body.obs_onlParticipation_comment;
      eval.observation.onlInstruction.rating = req.body.obs_onlInstruction_rating;
      eval.observation.onlInstruction.comment = req.body.obs_onlInstruction_comment;
      eval.observation.onlAssessment.rating = req.body.obs_onlAssessment_rating;
      eval.observation.onlAssessment.comment = req.body.obs_onlAssessment_comment;
      eval.observation.onlLinks.rating = req.body.obs_onlLinks_rating;
      eval.observation.onlLinks.comment = req.body.obs_onlLinks_comment;
      eval.observation.onlContent.rating = req.body.obs_onlContent_rating;
      eval.observation.onlContent.comment = req.body.obs_onlContent_comment;
      eval.observation.onlUseful.rating = req.body.obs_onlUseful_rating;
      eval.observation.onlUseful.comment = req.body.obs_onlUseful_comment;
      eval.observation.onlGrammar.rating = req.body.obs_onlGrammar_rating;
      eval.observation.onlGrammar.comment = req.body.obs_onlGrammar_comment;
      eval.observation.onlICR.rating = req.body.obs_onlICR_rating;
      eval.observation.onlICR.comment = req.body.obs_onlICR_comment;

        eval.save(function(err, updatedEval) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(updatedEval);
          }
        });
      }
    });
};

module.exports.evalsVerify = function(req, res) {
  var evalId = req.params.evalId;
  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: eval
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "evalId not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        eval.performance_improvement_plan.pip_steps = req.body.pip_steps;
        eval.acknowledgements.verify_date = req.body.verify_date;
        eval.acknowledgements.emp_meeting_comments = req.body.emp_meeting_comments;
        eval.acknowledgements.sup_meeting_comments = req.body.sup_meeting_comments;
        eval.acknowledgements.eval_super = req.body.eval_super;
        eval.save(function(err, updatedEval) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(updatedEval);
          }
        });
      }
    });
};

module.exports.savePip = function(req, res) {
  var evalId = req.params.evalId;
  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: eval
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "evalId not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        eval.performance_improvement_plan.pip_steps = req.body.pip_steps;
        eval.save(function(err, updatedEval) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(updatedEval);
          }
        });
      }
    });
};

module.exports.evalsUpdateNl = function(req, res) {
  var evalId = req.params.evalId;

  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, eval) {
      var response = {
        status: 200,
        json: eval
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "evalId not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        eval.acknowledgements.eval_nl = req.body.eval_nl;
        eval.acknowledgements.nl_date = req.body.nl_date;
        eval.acknowledgements.nl_comment = req.body.nl_comment;
        eval.save(function(err, updatedEval) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(updatedEval);
          }
        });
      }
    });
};

module.exports.evalsGetAdmin = function(req, res) {

  Eval
    .find()
    .exec(function(err, evals) {
      var response = {};
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = evals;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsPrintAllAdmin = function(req, res) {
  var years = req.params.years;

  Eval
    .find({years: years})
    .exec(function(err, evals) {
      var response = {};
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = evals;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsCountAdmin = function(req, res) {
  var years = req.params.years;

  Eval
    .find({'years': years})
    .exec(function(err, evals) {
      var response = {};
      if (err) {
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = evals.length;
      }
      res
        .status(response.status)
        .json(response.json);
    });
};

module.exports.evalsGetYears = function(req, res){
  Eval
    .find()
    .distinct('years', function(err, years){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Could not retrieve years from database.'});
      } else {
        res
          .status(200)
          .json({err: false, msg: 'Unique years retreived.', years: years});
      }
    });
};

module.exports.generateEvals = function(req, res) {
  var fromYear = req.body.fromYear;
  var toYear = req.body.toYear;
  Eval
    .find({years: fromYear}, function(err, evals){
      if(err){
        console.log(err);
      } else {
        for(var i = 0; i < evals.length; i++){
          Eval
            .create({
              years: toYear,
              
            })
        }
      }

  });
  Eval
    .find({
      years: fromYear
    })
    .exec(function(err, evals) {
      var response = {};
      if (err) {
        console.log(err);
        response.status = 500;
        response.json = err;
      } else {
        response.status = 200;
        response.json = {msg: 'message did not change'};//evals;
        resArray = [];
        for(var i = 0; i < evals.length; i++){
          var lastJobDesc = evals[i].job_description.job_desc.length -1;
          Eval
            .create({
              years: toYear,
              name: evals[i].name,
              coll_id: evals[i].coll_id,
              title: evals[i].title,
              division: evals[i].division,
              department: evals[i].department,
              faculty: evals[i].faculty,
              username: evals[i].username,
              supervisor: evals[i].supervisor,
              supervisor_name: evals[i].supervisor_name,
              next_level: evals[i].next_level,
              next_level_name: evals[i].next_level_name,
              job_description: {
                job_desc: {
                  file_name: evals[i].job_description.job_desc[lastJobDesc].file_name,
                  // file_name: evals[i].job_description.admin_desc_link,
                  effective_date: evals[i].job_description.job_desc[lastJobDesc].effective_date,
                  // effective_date: '7/01/2020'
                }
              },
              acknowledgements: {
                emp_date: '',
                sup_date: '',
                nl_date: '',
              }
            },
          function(err, newEval){
            if(err){
              console.log(err);
            } else {
                resArray.push(newEval);
            }
          });
        }
        res
          .status(response.status)
          .json(resArray);
      }
    });
};

module.exports.evalsReplaceAdmin = function(req, res) {
  var replace_type = req.params.replaceType;
  if(replace_type === 'supervisor'){
    var current_supervisor = req.body.current_supervisor;
    var new_supervisor = req.body.new_supervisor;
    var new_supervisor_name = req.body.new_supervisor_name;
    var search = {supervisor: current_supervisor};

  } else if(replace_type === 'next_level'){
    var current_nl = req.body.current_nl;
    var new_nl = req.body.new_nl;
    var new_nl_name = req.body.new_nl_name;
    var search = {next_level: current_nl};
  }
  Eval
    .find(search)
    .select('-objectives -prof_dev_activities')
    .exec(function(err, evals) {
      var response = {
        status: 200,
        json: evals
      };
      if (err) {
        response.status = 500;
        response.json = err;
      } else if (!eval) {
        response.status = 404;
        response.json = {
          "message": "Evals not found"
        };
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.json);
      } else {
        for(var i = 0; i < evals.length; i++){
          if(replace_type === 'supervisor'){
            evals[i].supervisor = new_supervisor;
            evals[i].supervisor_name = new_supervisor_name;
          } else if(replace_type === 'next_level'){
            evals[i].next_level = new_nl;
            evals[i].next_level_name = new_nl_name;
          }
          evals[i].save(function(err, updatedEval){
            if(err){
              response.status = 500;
              response.json = err;
            } else {
              response.status = 204;
              response.json = {};
            }

          });
        }
        res
          .status(response.status)
          .json(response.json);
        }
      });
  };


// module.exports.evalsAddAdmin = function(req, res) {
//   Eval
//     .create({
//       years: req.body.years,
//       name: req.body.name,
//       coll_id: req.body.coll_id,
//       title: req.body.title,
//       division: req.body.division,
//       department: req.body.department,
//       faculty: req.body.faculty,
//       username: req.body.username,
//       supervisor: req.body.supervisor,
//       supervisor_name: req.body.supervisor_name,
//       next_level: req.body.next_level,
//       next_level_name: req.body.next_level_name,
//       job_description: {
//         admin_desc_link: req.body.job_description.admin_desc_link
//       },
//       acknowledgements: {
//         emp_date: '',
//         sup_date: '',
//         nl_date: '',
//       }
//     }, function(err, eval) {
//       if (err) {
//         res
//           .status(400)
//           .json(err);
//       } else {
//         res
//           .status(201)
//           .json(eval);
//       }

//     });

// };

module.exports.evalsUpdateAdmin = function(req, res) {
  var evalId = req.params.evalId;
  var data = req.body;
  // for(key in req.body){
  //   console.log('key: ' + key + ' | value: ' + req.body[key]);
  // }
  Eval
    .findById(evalId)
    .select('-objectives -prof_dev_activities -job_desc')
    .exec(function(err, eval){
      if(err){
        res
          .status(200)
          .json({err: true, msg: 'Server error.'});
      } else if(!eval){
        res
          .status(200)
          .json({err: true, msg: 'Could not find that evaluation.'})
      } else {
        for(key in data){
          // console.log('key: ' + key + ' | value: ' + req.body[key]);
          eval[key] = data[key];
        }
        eval.save(function(err, updateEval){
          if(err){
            res
              .status(200)
              .json({err: true, msg: 'Could not save changes to the database.'});
          } else {
            res
              .status(200)
              .json({err: false, msg: 'Evaluation updated.', eval: updateEval});
          }
        });
  
      }
      // console.log('orig: ', eval);
      // for(key in data){
      //   // console.log('key: ' + key + ' | value: ' + req.body[key]);
      //   eval[key] = data[key];
      // }
      // console.log('update: ', eval);


    });
  // var form = new formidable.IncomingForm();
  // form.parse(req, function(err, fields, files){
  //   console.log(err);
  //   console.log(fields);

  // });

  // Eval
  //   .findById(evalId)
  //   .select('-objectives -prof_dev_activities')
  //   .exec(function(err, eval) {
  //     var response = {
  //       status: 200,
  //       json: eval
  //     };
  //     if (err) {
  //       response.status = 500;
  //       response.json = err;
  //     } else if (!eval) {
  //       response.status = 404;
  //       response.json = {
  //         "message": "evalId not found"
  //       };
  //     }
  //     if (response.status !== 200) {
  //       res
  //         .status(response.status)
  //         .json(response.json);
  //     } else {
  //       eval.name = req.body.name;
  //       eval.coll_id = req.body.coll_id;
  //       eval.title = req.body.title;
  //       eval.division = req.body.division;
  //       eval.department = req.body.department;
  //       //eval.faculty = req.body.faculty;
  //       eval.username = req.body.username;
  //       eval.supervisor = req.body.supervisor;
  //       eval.supervisor_name = req.body.supervisor_name;
  //       eval.next_level = req.body.next_level;
  //       eval.next_level_name = req.body.next_level_name;
  //       eval.job_description.admin_desc_link = req.body.admin_desc_link;
  //       eval.save(function(err, updatedEval) {
  //         if (err) {
  //           res
  //             .status(500)
  //             .json(err);
  //         } else {
  //           res
  //             .status(204)
  //             .json(updatedEval);
  //         }
  //       });
  //     }
  //   });
};

module.exports.evalsUnlockAdmin = function(req, res) {
    var evalId = req.params.evalId;
    var type = req.params.type;

    Eval
        .findById(evalId)
        .select('-objectives -prof_dev_activities')
        .exec(function(err, eval) {
            var response = {
                status: 200,
                json: eval
            };
            if (err) {
                response.status = 500;
                response.json = err;
            } else if (!eval) {
                response.status = 404;
                response.json = {
                    "message": "evalId not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.json);
            } else {
                if(type === 'emp' || type === 'emp'){
                    eval.acknowledgements.emp_date = '';
                }
                if(type === 'sup' || type === 'emp'){
                    eval.acknowledgements.sup_date = '';
                    eval.acknowledgements.eval_super = '';
                }
                if(type === 'meet' || type === 'sup' || type === 'emp'){
                    eval.acknowledgements.verify_date = '';
                }
                if(type === 'nl' || type === 'meet' || type === 'sup' || type === 'emp'){
                    eval.acknowledgements.nl_date = '';
                    eval.acknowledgements.eval_nl = '';

                }
                eval.save(function(err, updatedEval) {
                    if (err) {
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
        });
};

module.exports.evalsFacToggleAdmin = function(req, res) {
    var evalId = req.params.evalId;

    Eval
        .findById(evalId)
        .select('-objectives -prof_dev_activities')
        .exec(function(err, eval) {
            var response = {
                status: 200,
                json: eval
            };
            if (err) {
                response.status = 500;
                response.json = err;
            } else if (!eval) {
                response.status = 404;
                response.json = {
                    "message": "evalId not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.json);
            } else {
                eval.faculty = !eval.faculty;
                eval.save(function(err, updatedEval) {
                    if (err) {
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
        });
};

// module.exports.evalsDeleteAdmin = function(req, res) {
//   var evalId = req.params.evalId;

//   Eval
//     .findByIdAndRemove(evalId)
//     .exec(function(err, eval) {
//       if (err) {
//         res
//           .status(404)
//           .json(err);
//       } else {
//         res
//           .status(204)
//           .json({});
//       }
//     });
// };
