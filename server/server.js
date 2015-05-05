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
        minDate.setDate(currentDate.getDate() -3 );
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
                activityStep.stepId = steps[step]._id;
                activityStep.body = steps[step].body;
                var routine = Routines.findOne({stepId: steps[step]._id, stepDate: createdAt});
                activityStep.checked = routine ? routine.checked : false;
                activityStep.challengeId = challengeId;
                activity.push(activityStep);
            }
        }

        return activity;
    }
})