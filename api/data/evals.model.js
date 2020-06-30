var mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

var objectiveSchema = new mongoose.Schema({
		objective: String,
		goals: String,
		progress: String,
		results: String
});

var profdevSchema = new mongoose.Schema({
		activity: String,
		hours: String,
		comments: String
});

var jobDescSchema = new mongoose.Schema({
	file_name: String,
	effective_date: String,
	conclude_date: String
});

var evalSchema = new mongoose.Schema({
	years: String,
	name: String,
    coll_id: String,
	title: String,
	division: String,
	department: String,
	faculty: {
		type: Boolean,
		default: false
	},
	username: String,
	supervisor: String,
	supervisor_name: String,
	next_level: String,
	next_level_name: String,
	job_description: {
		admin_desc_link: String,
		job_desc:  [jobDescSchema],
		reviewed_date: String,
		updated_date: String
	},
	core_skills: {
		duties: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		teamwork: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		dependability: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		judgement: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		ethics: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		adaptability: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		communication: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		inclusiveness: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		innovation: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		},
		advising: {
			employee_rating: String,
			employee_comment: String,
			supervisor_rating: String,
			supervisor_comment: String
		}
	},
	observation: {
		date: String,
		courseCode: String,
		stuEvalRating: String,
		scheduled: {
			type: Boolean,
			default: false
		},
		scheduledDate: String,
		firstYear: {
			type: Boolean,
			default: false
		},
		yearsInstructor: String,
  		moodle: {
  			moodleOnline: {
				type: Boolean,
				default: false
			},
			moodleICR: {
				type: Boolean,
				default: false
			},
			moodleSyllabus: {
				type: Boolean,
				default: false
			},
			moodleRoster: {
				type: Boolean,
				default: false
			},
		},
		goals: {
			rating: String,
			comment: String
		},
		presentation: {
			rating: String,
			comment: String
		},
		expertise: {
			rating: String,
			comment: String
		},
		thinking: {
			rating: String,
			comment: String
		},
		management: {
			rating: String,
			comment: String
		},
		involvement: {
			rating: String,
			comment: String
		},
		attitude: String,
		visitation: String,
		strengths: String,
		suggestions: String,
		onlCommunication: {
			rating: String,
			comment: String
		},
		onlQnA: {
			rating: String,
			comment: String
		},
		onlFeedback: {
			rating: String,
			comment: String
		},
		onlSchedule: {
			rating: String,
			comment: String
		},
		onlCalendar: {
			rating: String,
			comment: String
		},
		onlParticipation: {
			rating: String,
			comment: String
		},
		onlInstruction: {
			rating: String,
			comment: String
		},
		onlAssessment: {
			rating: String,
			comment: String
		},
		onlLinks: {
			rating: String,
			comment: String
		},
		onlContent: {
			rating: String,
			comment: String
		},
		onlUseful: {
			rating: String,
			comment: String
		},
		onlGrammar: {
			rating: String,
			comment: String
		},
		onlICR: {
			rating: String,
			comment: String
		},
	},
	performance_improvement_plan: {
		pip_steps: String,
		pip_results: String,
	},
	objectives: [objectiveSchema],
	professional_development: {
		certificate_license: String,
		cert_lic_date: String,
		additional_date: String
	},
	prof_dev_activities: [profdevSchema],
	acknowledgements: {
		emp_saved: {
			type: String,
			default: undefined
		},
		emp_comment: String,
		emp_date: {
			type: String,
			default: undefined
		},
		sup_saved: {
			type: String,
			default: undefined
		},
		sup_comment: String,
		sup_date: {
			type: String,
			default: undefined
		},
		emp_meeting_comments: String,
		sup_meeting_comments: String,
		verify_date: {
			type: String,
			default: undefined
		},
		eval_super: String,
		eval_nl: String,
		nl_date: {
			type: String,
			default: undefined
		},
		nl_comment: String
	}
});

mongoose.model('Eval', evalSchema);//, 'evals'); <--Defaults to lowercase plural of model name
