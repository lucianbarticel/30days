Template.addStep.events({
	'submit form': function(event, template){
        event.preventDefault();
        var _body = event.target.body.value;
        var _userId = Meteor.userId();
        var _challenge = event.target.challenge.value;
        var step = {createdBy: _userId, createdAt: new Date(), body: _body, challenge:_challenge };
        Steps.insert(step);
    }
})