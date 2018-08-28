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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIkFPUy5pbml0KHtcbiBkdXJhdGlvbjogMTIwMFxufSk7XG5cblxuZnVuY3Rpb24gb3dsSW5pdGlhbGl6ZSgpIHtcbiAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgJCgnLmxvZ29zLWNhcm91c2VsJykub3dsQ2Fyb3VzZWwoKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkKCcubG9nb3MtY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCgnZGVzdHJveScpO1xuICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKGUpIHtcbiAgIG93bEluaXRpYWxpemUoKTtcbn0pO1xuXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgb3dsSW5pdGlhbGl6ZSgpO1xufSk7XG4iXX0=
