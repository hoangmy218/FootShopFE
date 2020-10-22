$(document).ready(function () {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 100) {
      $('.top-bar').addClass("sticky");
      $('#top-page').addClass("show-toppage");
    }
    else if ($(window).scrollTop() < 20) {
      $('.top-bar').removeClass("sticky");
      $('#top-page').removeClass("show-toppage");
    }
    var scrollPos = $(document).scrollTop();
    $('#menu a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        currLink.addClass("active");
      }
      else {
        currLink.removeClass("active");
      }
    });
  });

  $('#icon-menu').click(function(){
    $('#menu').toggleClass('show-menu');
});

  $('#top-page').click(function () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});
var $shape1 = $('.shape1'),
  $shape2 = $('.shape2'),
  $shape3 = $('.shape3'),
  $x_axis = $('#x-axis'),
  $y_axis = $('#y-axis'),
  $container = $('.shape-img'),
  container_w = $container.width(),
  container_h = $container.height();

$('#header-img').on('mousemove.parallax', function (event) {
  var pos_x = event.pageX,
    pos_y = event.pageY,
    left = 0,
    top = 0;

  left = container_w / 2 - pos_x;
  top = container_h / 2 - pos_y;

  TweenMax.to(
    $x_axis,
    1,
    {
      css: {
        transform: 'translateX(' + (left * -1) + 'px)'
      },
      ease: Expo.easeOut,
      overwrite: 'all'
    });

  TweenMax.to(
    $y_axis,
    1,
    {
      css: {
        transform: 'translateY(' + (top * -1) + 'px)'
      },
      ease: Expo.easeOut,
      overwrite: 'all'
    });

  TweenMax.to(
    $shape1,
    1,
    {
      css: {
        transform: 'translateX(' + left / 24 + 'px) translateY(' + top / 24 + 'px)'
      },
      ease: Expo.easeOut,
      overwrite: 'all'
    });

  TweenMax.to(
    $shape2,
    1,
    {
      css: {
        transform: 'translateX(' + left / 24 + 'px) translateY(' + top / 24 + 'px)'
      },
      ease: Expo.easeOut,
      overwrite: 'all'
    });

  TweenMax.to(
    $shape3,
    2,
    {
      css: {
        transform: 'translateX(' + left / 24 + 'px) translateY(' + top / 24 + 'px)'
      },
      ease: Expo.easeOut,
      overwrite: 'all'
    });
});
