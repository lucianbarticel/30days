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
            return "not started yet";
        var challengeRoutines = [];
        for(var i=0; i<30; i++){
            var routine = new Object();
            //get routines date
            var thisDate = new Date();
            thisDate.setDate(challenge.startedAt.getDate() + i);
            routine.date = thisDate;
            //get routines activity
            routine.activity = Routines.findOne({challenge: challengeId, createdAt: thisDate}) || "no activity";
            challengeRoutines.push(routine);
        }
        return challengeRoutines;
    }
})