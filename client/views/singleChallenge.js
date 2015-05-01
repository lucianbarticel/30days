/**
 * Created by jedibee-dev on 4/29/2015.
 */

Template.singleChallenge.rendered = function(){
	Meteor.subscribe("steps");
	Meteor.call("get_user_email", this.data.createdBy, function(error, result){
		Session.set('thisUserEmail', result);
	});
	Meteor.call("get_challenge_routines", this.data._id, function(error, result){
		Session.set('challengeRoutines', result);
	});
}

Template.singleChallenge.helpers({
	steps: function(){
		return Steps.find({challenge: this._id});
	},
	creatorEmail: function(){
		return Session.get('thisUserEmail');
	},
	routines : function(){
		return Session.get('challengeRoutines');
	},
	currentDate: function(){
		return Session.get('currentActivityDate');
	},
	currentActivity: function(){
		return Session.get('currentActivity');
	}
});

Template.singleChallenge.events({
	'click #startChallenge': function(){
		Challenges.update({_id: this._id}, {$set: {startedAt: new Date()}})
	},
	'change #isPrivate': function(){
		if(this.isPrivate){
			Challenges.update({_id: this._id}, {$set: {isPrivate: false}})	
		}else{
			Challenges.update({_id: this._id}, {$set: {isPrivate: true}})	
		}
	},
	'click .addRoutine': function(){
		Session.set('currentActivityDate', this.date);
		Meteor.call("get_routine_activity", this.challengeId, this.date, function(error, result){
			Session.set('currentActivity', result);
		});
	}
});