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

Meteor.publish("challenges", function () {
    return Challenges.find({ createdBy: this.userId });
});

Meteor.publish("singleChallenge", function(challengeId){
    return Challenges.find({_id: challengeId});
});