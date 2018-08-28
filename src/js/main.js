AOS.init({
 duration: 1200
});


function owlInitialize() {
  if ($(window).width() < 768) {
    $('.logos-carousel').owlCarousel();
  }
  else {
    $('.logos-carousel').owlCarousel('destroy');
  }
}

$(document).ready(function(e) {
   owlInitialize();
});

$(window).resize(function() {
   owlInitialize();
});
