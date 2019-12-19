/* eslint-disable no-undef */
/* eslint-disable indent */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const calculateAge = function(date) {
    const d = new Date();
    const n = d.getTime();
    const days = Math.floor((n - date) / (60 * 60 * 24 * 1000));
    return days;
  };

  const createTweetElement = function(data) {
    let $tweet = $('<article>').addClass('tweet').append(`<header><img class="profile-icon" src="${data.user.avatars}" /><div class="name">${data.user.name}</div><div class="username">${data.user.handle}</div></header><div class="tweetText">${data.content.text}</div><footer><date>${calculateAge(data.created_at)} days ago </date><div class="social-media-icons"><ul><li><i class="fas fa-flag"></i></li><li><i class="fas fa-retweet"></i></li><li><i class="fas fa-heart"></i></li></ul></div></footer>`);
    return $tweet;
  };

  const renderTweet = function(tweet) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  };


  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      renderTweet(tweet);
    }
  };

  const formValidation = function(form) {
    if (form.length > 140) {
      return "This tweet is too long. Please reduce it to 140 characters";
    } else if (form === null) {
      return "Tweet is empty. Please type in a tweet";
    } else if (form === "") {
      return "Tweet is empty. Please type in a tweet";
    } else {
      return true;
    }
  };

  $('#animate').click(function() {
    if ($("#new-tweet").first().is(":hidden")) {
      $("#new-tweet").show("slow");
    } else {
      $("#new-tweet").slideUp();
    }
  });

  $('#animate').click(function() {
    $('html, body').animate({
      scrollTop: $("#new-tweet").offset().top - $("nav").height()
    }, 1000);
  });



  const loop = function() {
    $('#animate').animate({
      'top': '45'
    }, {
      duration: 1000,
      complete: function() {
        $('#animate').animate({
          top: '30'
        }, {
          duration: 1000,
          complete: loop
        });
      }
    });
  };
  loop();


  //Gets the form input and loads the new tweet
  $("#new-tweet form").submit((event) => {
    event.preventDefault();
    let formData = $(event.target).serialize();
    let encoded = encodeURI(formData);
    let validData = $(event.target).find('textarea').val();

    if (formValidation(validData) === true) {
      $.ajax('/tweets', {
          method: 'POST',
          data: encoded
        })
        .then(() => {
          return $.ajax('/tweets', {
            method: 'GET'
          });
        })
        .then((response) => {
          $("#error").hide();
          $('textarea').val('');
          renderTweet(response[response.length - 1]);
        });
    } else {
      $("#error").text(formValidation(validData));
      $("#error").show("slow");
    }
  });


  //Load the tweets from the server
  const loadTweets = function() {
    $.ajax('/tweets', {
        method: 'GET'
      })
      .then((response) => {
        renderTweets(response);
      });
  };
  loadTweets();
});