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
        Challenges.remove(this._id);
    },
    'keyup .editChallenge': function(event, template){
        console.log(event.target.value);
        Challenges.update(this._id, {$set: {name: event.target.value}});
    }
})