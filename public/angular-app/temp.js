$scope.saveForm = function(evalId))) {
  var form = {};
  if (!(angular.isUndefined(mainForm.description_name))) {
    form.description_name = mainForm.description_name.value;
  }
  if (!(angular.isUndefined(mainForm.reviewed_date))) {
    form.reviewed_date = mainForm.reviewed_date.value;
  }
  if (!(angular.isUndefined(mainForm.updated_date))) {
    form.updated_date = mainForm.updated_date.value;
  }
  if (!(angular.isUndefined(mainForm.emp_job_duties))) {
    form.duties_emp_rating = mainForm.emp_job_duties.value;
  }
  if (!(angular.isUndefined(mainForm.sup_job_duties))) {
    form.duties_sup_rating = mainForm.sup_job_duties.value;
  }
  if (!(angular.isUndefined(mainForm.emp_teamwork))) {
    form.team_emp_rating = mainForm.emp_teamwork.value;
  }
  if (!(angular.isUndefined(mainForm.sup_teamwork))) {
    form.team_sup_rating = mainForm.sup_teamwork.value;
  }
  if (!(angular.isUndefined(mainForm.emp_dependability))) {
    form.dep_emp_rating = mainForm.emp_dependability.value;
  }
  if (!(angular.isUndefined(mainForm.sup_dependability))) {
    form.dep_sup_rating = mainForm.sup_dependability.value;
  }
  if (!(angular.isUndefined(mainForm.emp_judgement))) {
    form.jdg_emp_rating = mainForm.emp_judgement.value;
  }
  if (!(angular.isUndefined(mainForm.sup_judgement))) {
    form.jdg_sup_rating = mainForm.sup_judgement.value;
  }
  if (!(angular.isUndefined(mainForm.emp_ethics))) {
    form.ethic_emp_rating = mainForm.emp_ethics.value;
  }
  if (!(angular.isUndefined(mainForm.sup_ethics))) {
    form.ethic_sup_rating = mainForm.sup_ethics.value;
  }
  if (!(angular.isUndefined(mainForm.emp_adaptability))) {
    form.adapt_emp_rating = mainForm.emp_adaptability.value;
  }
  if (!(angular.isUndefined(mainForm.sup_adaptability))) {
    form.adapt_sup_rating = mainForm.sup_adaptability.value;
  }
  if (!(angular.isUndefined(mainForm.emp_communication))) {
    form.comm_emp_rating = mainForm.emp_communication.value;
  }
  if (!(angular.isUndefined(mainForm.sup_communication))) {
    form.comm_sup_rating = mainForm.sup_communication.value;
  }
  if (!(angular.isUndefined(mainForm.emp_inclusiveness))) {
    form.inc_emp_rating = mainForm.emp_inclusiveness.value;
  }
  if (!(angular.isUndefined(mainForm.sup_inclusiveness))) {
    form.inc_sup_rating = mainForm.sup_inclusiveness.value;
  }
  if (!(angular.isUndefined(mainForm.emp_innovation))) {
    form.inn_emp_rating = mainForm.emp_innovation.value;
  }
  if (!(angular.isUndefined(mainForm.sup_innovation))) {
    form.inn_sup_rating = mainForm.sup_innovation.value;
  }
  if (!(angular.isUndefined(mainForm.emp_advising))) {
    form.adv_emp_rating = mainForm.emp_advising.value;
  }
  if (!(angular.isUndefined(mainForm.sup_advising))) {
    form.adv_sup_rating = mainForm.sup_advising.value;
  }
  if (!(angular.isUndefined(mainForm.certificate_license))) {
    form.certificate_license = mainForm.certificate_license.value;
  }
  if (!(angular.isUndefined(mainForm.cert_lic_date))) {
    form.cert_lic_date = mainForm.cert_lic_date.value;
  }
  if (!(angular.isUndefined(mainForm.additional_date))) {
    form.additional_date = mainForm.additional_date.value;
  }
  if (!(angular.isUndefined(mainForm.emp_date))) {
    form.emp_date = mainForm.emp_date.value;
  }
  if (!(angular.isUndefined(mainForm.emp_comment))) {
    form.emp_comment = mainForm.emp_comment.value;
  }
  if (!(angular.isUndefined(mainForm.sup_date))) {
    form.sup_date = mainForm.sup_date.value;
  }
  if (!(angular.isUndefined(mainForm.sup_comment))) {
    form.sup_comment = mainForm.sup_comment.value;
  }
  if (!(angular.isUndefined(mainForm.final_meeting))) {
    /* final_meeting = mainForm.final_meeting.value; */
  }
  if (!(angular.isUndefined(mainForm.nl_date))) {
    form.nl_date = mainForm.nl_date.value;
  }
  if (!(angular.isUndefined(mainForm.nl_comment))) {
    form.nl_comment = mainForm.nl_comment.value;
  }
  evalDataFactory.saveForm(evalId, form)
    .then(function(response))) {
      console.log(response);
    })
    .catch(function(err))) {
      console.log(err);
    });
};
