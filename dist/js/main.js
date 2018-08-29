$(document).ready(function() {
  // aos anims
  AOS.init({
   duration: 1200
  });

  // mobile menu
  $(".hamburger-container").click(function() {
    $("#menu").slideToggle();
  });

  $(window).resize(function() {
    if (window.innerWidth > 1024) {
      $("#menu").removeAttr("style");
    }
  });

  var topBar = $(".hamburger li:nth-child(1)"),
    middleBar = $(".hamburger li:nth-child(2)"),
    bottomBar = $(".hamburger li:nth-child(3)");

  $(".hamburger-container").on("click", function() {
    if (middleBar.hasClass("rot-45deg")) {
      topBar.removeClass("rot45deg");
      middleBar.removeClass("rot-45deg");
      bottomBar.removeClass("hidden");
    } else {
      bottomBar.addClass("hidden");
      topBar.addClass("rot45deg");
      middleBar.addClass("rot-45deg");
    }
  });

  // logos fade carousel
  $('.slider').slick({
    dots: false,
    prevArrow: false,
    nextArrow: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    fade: true
  });
  // end
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAvLyBhb3MgYW5pbXNcbiAgQU9TLmluaXQoe1xuICAgZHVyYXRpb246IDEyMDBcbiAgfSk7XG5cbiAgLy8gbW9iaWxlIG1lbnVcbiAgJChcIi5oYW1idXJnZXItY29udGFpbmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCIjbWVudVwiKS5zbGlkZVRvZ2dsZSgpO1xuICB9KTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEwMjQpIHtcbiAgICAgICQoXCIjbWVudVwiKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XG4gICAgfVxuICB9KTtcblxuICB2YXIgdG9wQmFyID0gJChcIi5oYW1idXJnZXIgbGk6bnRoLWNoaWxkKDEpXCIpLFxuICAgIG1pZGRsZUJhciA9ICQoXCIuaGFtYnVyZ2VyIGxpOm50aC1jaGlsZCgyKVwiKSxcbiAgICBib3R0b21CYXIgPSAkKFwiLmhhbWJ1cmdlciBsaTpudGgtY2hpbGQoMylcIik7XG5cbiAgJChcIi5oYW1idXJnZXItY29udGFpbmVyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKG1pZGRsZUJhci5oYXNDbGFzcyhcInJvdC00NWRlZ1wiKSkge1xuICAgICAgdG9wQmFyLnJlbW92ZUNsYXNzKFwicm90NDVkZWdcIik7XG4gICAgICBtaWRkbGVCYXIucmVtb3ZlQ2xhc3MoXCJyb3QtNDVkZWdcIik7XG4gICAgICBib3R0b21CYXIucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdHRvbUJhci5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIHRvcEJhci5hZGRDbGFzcyhcInJvdDQ1ZGVnXCIpO1xuICAgICAgbWlkZGxlQmFyLmFkZENsYXNzKFwicm90LTQ1ZGVnXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbG9nb3MgZmFkZSBjYXJvdXNlbFxuICAkKCcuc2xpZGVyJykuc2xpY2soe1xuICAgIGRvdHM6IGZhbHNlLFxuICAgIHByZXZBcnJvdzogZmFsc2UsXG4gICAgbmV4dEFycm93OiBmYWxzZSxcbiAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBzcGVlZDogNTAwLFxuICAgIGZhZGU6IHRydWVcbiAgfSk7XG4gIC8vIGVuZFxufSk7XG4iXX0=
