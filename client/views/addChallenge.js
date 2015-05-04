Template.addChallenge.events({
    'submit form': function(event, template){
        event.preventDefault();
        var _name = event.target.name.value;
        var _userId = Meteor.userId();
        var challenge = {createdBy: _userId, createdAt: new Date(), name: _name };
        Challenges.insert(challenge);
        event.target.name.value = "";
    }
});