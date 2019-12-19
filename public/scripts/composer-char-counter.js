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
});