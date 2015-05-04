/**
 * Created by jedibee-dev on 4/28/2015.
 */

Meteor.subscribe("challenges");

Template.listChallenges.helpers({
   challenges: function(){
       return Challenges.find();
   }
});

Template.listChallenges.events({
    'click .removeChallenge': function(event, template){
        Meteor.call('remove_challenge', this._id);
    },
    'keyup .editChallenge': function(event, template){
        Challenges.update(this._id, {$set: {name: event.target.value}});
    }
})