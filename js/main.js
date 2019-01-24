var MenuModel = Backbone.Model.extend({
	url: 'db/menu.json'
});
var menu = new MenuModel();
var AppView = Backbone.View.extend ({
// el - stands for element. Every view has an element associated with HTML content, will be rendered. 
el: '.todays-menu-wrapper',

// It's the first function called when this view is instantiated.
initialize: function() {
	 this.render(); 
},

today: '',

events: {
	'click .btn-show-menu': 'fetchMenu' 
},

filterMenu: function(data){
	var data = data.toJSON();
	var mealType = $('.select-meal').val(); //lunch/dinner
	var menuType = $('.select-menu').val(); //veg/nonveg
	var filterMealType = _.where(data, {'mealType':mealType});

	var prefer = filterMealType[0]['menuType'][menuType];

	todaysMenu = prefer[Math.floor(Math.random()*10)];
	$('.show-todays-menu').removeClass('hide').text('').text(todaysMenu);
	$('.did-not-like-menu').removeClass('hide');
},

fetchMenu: function(e){
		var that = this;
		e.preventDefault();
		$('.did-not-like-menu').addClass('hide');
		if(!$('.menu-form').valid()) return false;
		menu.fetch({ 
		url: "db/menu.json", 
		success: function(data) {
			that.filterMenu(data);
			},
		error: function(){
			 console.log('There was some error in loading and processing the JSON file');
		}
	});
},

validateMenuForm: function(){
	$('.menu-form').validate();
},

render: function() {
	var today = moment().format('dddd');
	$('.today').text(today);
	this.today = today
	this.validateMenuForm()
}
});
var appView = new AppView();