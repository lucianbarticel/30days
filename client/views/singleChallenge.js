/**
 * Created by jedibee-dev on 4/29/2015.
 */

var trackTestDep = new Tracker.Dependency();

Tracker.autorun(function(){
	trackTestDep.depend();
})

Template.singleChallenge.rendered = function(){
	Meteor.subscribe("steps");
	Meteor.call("get_user_email", this.data.createdBy, function(error, result){
		Session.set('thisUserEmail', result);
	})
}

Template.singleChallenge.helpers({
	steps: function(){
		return Steps.find({challenge: this._id});
	},
	creatorEmail: function(){
		return Session.get('thisUserEmail');
	}
});

Template.singleChallenge.events({
	'click #startChallenge': function(){
		Challenges.update({_id: this._id}, {$set: {startedAt: new Date()}})
		trackTestDep.changed();
	}
});