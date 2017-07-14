$(document).ready(function() {

   $("#my-menu").mmenu({
   	extensions: [ 'pagedim-black' ],
   	navbar: {
   	title: '<div class="logo m-logo"><a href="#">Portland</a></div>'
   	}
   });

   var API = $('#my-menu').data('mmenu');

		API.bind('open:finish', function(){
			$('.hamburger').addClass('is-active');
		});
		API.bind('close:finish', function(){
			$('.hamburger').removeClass('is-active');
	});

});

