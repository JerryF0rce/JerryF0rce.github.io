$(document).ready(function(){
	$('.owl-carousel').owlCarousel({
		items: 4,
		margin: 60,
  	 	responsive:{ 
  	 	0:{
  	 		items:2
  	 	},
  	 	600:{
  	 		items:3
  	 	},
  	 	1000:{
  	 		items:4
  	 	}
  	 }
  	});
});


$(function () {
 
  $("#rateYo1").rateYo({
    rating: 4,
    starWidth: "15px",
    normalFill: "#ccc",
    ratedFill: "#ffcc33",
    spacing: "5px",
    fullStar: true,
  });
 
});

$(function () {
 
  $("#rateYo2").rateYo({
    rating: 3,
    starWidth: "15px",
    normalFill: "#ccc",
    ratedFill: "#ffcc33",
    spacing: "5px",
    fullStar: true,
  });
 
});

$(function () {
 
  $("#rateYo3").rateYo({
    rating: 5,
    starWidth: "15px",
    normalFill: "#ccc",
    ratedFill: "#ffcc33",
    spacing: "5px",
    fullStar: true,
  });
 
});

$(function () {
 
  $("#rateYo4").rateYo({
    rating: 4,
    starWidth: "15px",
    normalFill: "#ccc",
    ratedFill: "#ffcc33",
    spacing: "5px",
    fullStar: true,
  });
 
});

$(function () {
    $("row").slice(0, 1).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".none:hidden").slice(0, 1).slideDown();
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
});
