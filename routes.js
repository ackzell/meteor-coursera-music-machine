Router.configure({
  layoutTemplate: 'layout',
  template: 'welcome'
});

Router.route('/', function () {
  this.render('welcome');
});

Router.route('/machine', function () {
  this.render('home');
});

Router.route('/(.*)', {
  action: function() {
    Router.go('/');
  }
});
