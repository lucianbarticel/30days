Template.listSteps.events({
	'click .removeStep': function(event, template){
        event.preventDefault();
        Steps.remove(this._id);
    },
    'keyup .editStep': function(event, template){
        Steps.update(this._id, {$set: {body: event.target.value}});
    }
})