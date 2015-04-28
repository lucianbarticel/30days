/**
 * Created by jedibee-dev on 4/28/2015.
 */
Template.listChallenges.helpers({
   challenges: function(){
       Challenges.find();
   }
});