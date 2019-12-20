/* eslint-disable no-undef */
$(document).ready(function() {
  let counter = 140;
  $("textarea").keyup(function() {
    const length = $(this).val().length;
    let newLength = counter - length;
    $(this).siblings(".counter").text(newLength);
    if (newLength < 0) {
      $(this).siblings(".counter").css('color', 'red');
    } else {
      $(this).siblings(".counter").css('color', 'black');
    }
  });

  $(window).scroll(function() {
    if (window.scrollY === 0) {
      $(".header-padding span").show();
      $("#back-to-top").hide();
    } else {
      $(".header-padding span").hide();
      $("#back-to-top").show();
    }
  });

  $("#back-to-top").click(function() {
    $(".header-padding span").hide();
    $('html, body').animate({
      scrollTop: '0px'
    }, 300);
  });
});