/**
 * Created by jedibee-dev on 4/29/2015.
 */

Meteor.subscribe("steps");
	Template.singleChallenge.rendered = function(){
}

Template.singleChallenge.helpers({
	steps: function(){
		return Steps.find({challenge: this._id});
	}
});