/* eslint-disable no-undef */
/* eslint-disable indent */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Append textare text to the article
  const createTweetElement = function(data) {
    const calculateAge = moment(data.created_at).fromNow();
    console.log(calculateAge);
    let $tweet = $('<article>').addClass('tweet').append(`<header><img class="profile-icon" src="${data.user.avatars}" /><div class="name">${data.user.name}</div><div class="username">${data.user.handle}</div></header><div class="tweetText">${data.content.text}</div><footer><date>${calculateAge}</date><div class="social-media-icons"><ul><li><i class="fas fa-flag"></i></li><li><i class="fas fa-retweet"></i></li><li><i class="fas fa-heart"></i></li></ul></div></footer>`);
    return $tweet;
  };

  //Prepend the newTweet to the tweet container
  const renderTweet = function(tweet) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  };

  //Render each tweet in the data array
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      renderTweet(tweet);
    }
  };

  //Validate that the textarea input is valid
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

  //Display the compose tweet section on the nav button click
  $('#write-tweet').click(function() {
    $("#new-tweet").slideToggle();
    $("textarea").focus();
  });

  //Scroll to top of the new tweet box
  $('#write-tweet').click(function() {
    $('html, body').animate({
      scrollTop: $("#new-tweet").offset().top - $("nav").height()
    }, 1000);
  });

  //Animate the down arrow on the write a new tweet button
  const loop = function() {
    $('#write-tweet').animate({
      'top': '40'
    }, {
      duration: 1000,
      complete: function() {
        $('#write-tweet').animate({
          top: '25'
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

  //Taken from Stackoverflow - textarea resizes to fit text height
  $('textarea').on('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
});