Challenges.allow({
    insert: function (userId, doc) {
        return doc.createdBy == userId;
    },
    remove: function (userId, doc) {
        return doc.createdBy == userId;
    },
    update: function(userId, doc){
        return doc.createdBy == userId;
    }
})

Steps.allow({
    insert: function (userId, doc) {
        return doc.createdBy == userId;
    },
    remove: function (userId, doc) {
        return doc.createdBy == userId;
    },
    update: function(userId, doc){
        return doc.createdBy == userId;
    }
})

Routines.allow({
    insert: function (userId, doc) {
        return doc.createdBy == userId;
    },
    update: function(userId, doc){
        return doc.createdBy == userId;
    }
})

Meteor.publish("challenges", function () {
    return Challenges.find({ createdBy: this.userId });
});

Meteor.publish("singleChallenge", function(challengeId){
    return Challenges.find({_id: challengeId});
});

Meteor.publish("steps", function(){
    return Steps.find({createdBy: this.userId});
})

Meteor.publish("routines", function(){
    return Routines.find({createdBy: this.userId});
})

Meteor.methods({
    'get_user_email': function(id){
        return Meteor.users.findOne({_id: id}).emails[0].address;
    },
    'remove_challenge': function(challengeId){
        check(challengeId, String);
        var challenge = Challenges.findOne(challengeId);
        if(!challenge || this.userId !== challenge.createdBy)
            return false;
        Steps.remove({challenge: challengeId});
        Challenges.remove(challengeId);
        return true;
    },
    'get_challenge_routines': function(challengeId){
        check(challengeId, String);
        var challenge = Challenges.findOne(challengeId);
        if(!challenge || this.userId !== challenge.createdBy)
            return false;
        var starDate = challenge.startedAt;
        if(!starDate)
            return false;
        var challengeRoutines = [];
        var currentDate = new Date(); 
        var minDate = new Date();
        minDate.setDate(currentDate.getDate() -12 );
        for(var i=0; i<30; i++){
            var routine = new Object();
            //get routines date
            var thisDate = new Date();
            thisDate.setDate(challenge.startedAt.getDate() + i);
            routine.date = thisDate;
            routine.challengeId = challengeId;
            routine.disabled = thisDate <= currentDate && thisDate >= minDate ? '' : 'disabled';
            challengeRoutines.push(routine);
        }
        return challengeRoutines;
    },
    'get_routine_activity': function(challengeId, createdAt){
        check(challengeId, String);
        var challenge = Challenges.findOne(challengeId);
        if(!challenge || this.userId !== challenge.createdBy)
            return false;
        if(!createdAt)
            return false;
        var activity = [];
        var steps = Steps.find({challenge:challengeId}).fetch();
        if(steps.length){
            for(var step in steps){
                var activityStep = new Object();
                var stepActivity = get_step_activity(steps[step]._id, createdAt);
                activityStep.stepId = steps[step]._id;
                activityStep.body = steps[step].body;
                activityStep.checked = stepActivity ? true : false;
                activityStep.challengeId = challengeId;
                activity.push(activityStep);
            }
        }
        return activity;
    },
    'set_step_activity': function(_userId, _stepDate, _stepId){
        //check if there is any activity for this step on this date
        var stepActivity = get_step_activity(_stepId, _stepDate);
        if (!stepActivity){
            var routine = {createdBy: _userId, stepDate: _stepDate, stepId: _stepId, checked: true };
            Routines.insert(routine, function(err, records){
                console.log("new routine added");
            });
        }else{
            //make sure this works!!
            Routines.update(stepActivity._id, {$set: {checked: stepActivity.checked}}, function(err, records){
                console.log("new routine updated");
            });
        }

    }
})

function get_step_activity (stepId, stepDate){
    var createdAtNew = new Date(stepDate.getFullYear()+"-"+(stepDate.getMonth()+1)+"-"+stepDate.getDate());
    var createdAtTomorrow = new Date(stepDate.getFullYear()+"-"+(stepDate.getMonth()+1)+"-"+(stepDate.getDate()+1));
    var activity = Routines.findOne({stepId: stepId, stepDate: {$gte: createdAtNew, $lt: createdAtTomorrow}}) || false;

    return activity;
}