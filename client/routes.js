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