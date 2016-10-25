$(function() {
  $.getJSON( window.location.href + ".json",
    function(data) {
        title = '<h2>Project: ' + data.project.title + '</h2>';
        $(title).appendTo("#title");

        description = '<h3>Description: ' + data.project.description + '</h3>';
        $(description).appendTo("#description");

        postedBy = '<h5>Project By: ' + data.user + '</h5>' ;
        $(postedBy).appendTo("#postedBy");
    });
});
