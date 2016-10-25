// $(function() {
//   $.getJSON( window.location.href + ".json",
//     function(data) {
//         title = '<h2>Project: ' + data.project.title + '</h2>';
//         $(title).appendTo("#title");
//
//         description = '<h3>Description: ' + data.project.description + '</h3>';
//         $(description).appendTo("#description");
//
//         postedBy = '<h5>Project By: ' + data.user + '</h5>' ;
//         $(postedBy).appendTo("#postedBy");
//     });
// });

var documentready = function() {

  $(function() {
    $.getJSON(window.location.href + ".json",
      function(data) {
        content = '<h2>Project: ' + data.project.title + '</h2>';
        content += '<h3>Description: ' + data.project.description + '</h3>';
        content += '<h5>Project By: ' + data.user + '</h5>';
        // content += '<b>' + data.tasks[0].id + '</b>';
        $(content).appendTo("#project-content");


        $.each(data.tasks, function(i, task) {
          printTask = '<br>' + (i + 1) + ': ' + task.task + '<br>';
          $(printTask).appendTo("#showTasks");

        });

      });
  });

}
$(document).on('turbolinks:load', documentready);

function deleteProject() {
  $.ajax({
    url: window.location.href,
    type: 'DELETE'
  });
};

function submitTask(task, categoryid, projectid) {
  $.ajax({
    type: "post",
    url: "/tasks",
    data: 'task=' + task + '&project_id=' + projectid + '&category_id=' + categoryid,
    success: function() {
      $("#printAlert").empty();
      showSuccess = '<div class="alert alert-success">Task successfully created</div>';
      $(showSuccess).appendTo("#printAlert");

      $.getJSON(window.location.href + ".json",
        function(data) {
          lastTask = data.tasks.pop();
          showLastTask = '<h5>' + (data.tasks.length + 1) + ': ' + lastTask.task + '</h5>';
          event.preventDefault();
          $(showLastTask).appendTo("#showTasks");
        });
    },
    error: function() {
      $("#printAlert").empty();
      showError = '<div class="alert alert-danger">Category could not be created</div>';
      $(showError).appendTo("#printAlert");
    }
  });
};
