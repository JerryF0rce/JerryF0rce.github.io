$(document).ready(function() {

   $("#my-menu").mmenu({
   	extensions: [ 'pagedim-black' ],
   	navbar: {
   	title: ' '
   	}
   });

   var API = $('#my-menu').data('mmenu');

		API.bind('open:start', function(){
			$('.hamburger').addClass('is-active');
		});
		API.bind('close:before', function(){
			$('.hamburger').removeClass('is-active');
	});

});

