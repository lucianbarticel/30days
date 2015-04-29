Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home', controller: 'MainController'});

MainController = RouteController.extend({
  action: function() {
  	this.render('home', {
	    data: function () {
	      return { posts: ['post red', 'post blue'] }
	    }
  	});
  }
});

Router.route('/about', {name: 'about', controller: 'AboutController'});

AboutController = RouteController.extend({
    action: function(){
        this.render('aboutView',{
            data: function(){
                return { message: "whatever" }
            }
        });
    }
});

Router.route('/challenge/:_id', {name: "challenge", controller: 'ChallengeController'});

ChallengeController = RouteController.extend({
    waitOn: function(){
        return Meteor.subscribe("singleChallenge", this.params._id);
    },
    action: function(){
        this.render('singleChallenge',{
            data: function(){
                return Challenges.findOne({_id: this.params._id});
            }
        });
    }
})