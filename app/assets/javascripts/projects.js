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


          if (task.completed == false) {
            //  printTask = '<br>' + (i + 1) + ': ' + task.task + ' - <a href="/tasks/' + task.id + '/completed?category_id=' + data.category.id + '&amp;project_id=' + data.project.id + '">Mark Completed</a>' + '<br>';
            printTask = '<br>' + (i + 1) + ': ' + task.task + ' - <a href="#" onclick="markCompleted(' + task.id + ',' + data.category.id + ',' + data.project.id + ')">Mark Completed</a>' + '<br>';
          } else {
            printTask = '<br>' + (i + 1) + ': ' + task.task + ' - <b>Completed</b>' + '<br>';
          }


          $(printTask).appendTo("#showTasks");

        });

        $.each(data.comments, function(j, comment) {

          printComment = '<br>' + (j + 1) + ': ' + comment.comment + ' - ' + ' <a href="#" onclick="deleteComment(' + comment.id + ',' + data.category.id + ',' + data.project.id + ')">Delete</a>' + '<br>';

          $(printComment).appendTo("#showComments");

        });

      });
  });

}
$(document).on('turbolinks:load', documentready);






function loadTasks() {
  $.getJSON(window.location.href + ".json",
    function(data) {
      $.each(data.tasks, function(i, task) {

        if (task.completed == false) {
          //  printTask = '<br>' + (i + 1) + ': ' + task.task + ' - <a href="/tasks/' + task.id + '/completed?category_id=' + data.category.id + '&amp;project_id=' + data.project.id + '">Mark Completed</a>' + '<br>';
          printTask = '<br>' + (i + 1) + ': ' + task.task + '<a href="#" onclick="markCompleted(' + task.id + ',' + data.category.id + ',' + data.project.id + ')">Mark Completed</a>' + '<br>';
        } else {
          printTask = '<br>' + (i + 1) + ': ' + task.task + ' - <b>Completed</b>' + '<br>';
        }
        $(printTask).appendTo("#showTasks");

      });
    });
};


function loadComments() {
  $.getJSON(window.location.href + ".json",
    function(data) {
      $.each(data.comments, function(j, comment) {

        printComment = '<br>' + (j + 1) + ': ' + comment.comment + ' - ' + ' <a href="#" onclick="deleteComment(' + comment.id + ',' + data.category.id + ',' + data.project.id + ')">Delete</a>' + '<br>';

        $(printComment).appendTo("#showComments");

      });
    });
};

function markCompleted(taskid, categoryid, projectid) {
  event.preventDefault();

  var url = 'http://' + window.location.host + '/tasks/' + taskid + '/completed';
  // + '/completed?category_id=' categoryid '&amp;project_id=' + projectid;

  $.ajax({
    url: url,
    type: 'GET',
    data: 'category_id=' + categoryid + '&project_id=' + projectid,
    success: function(data) {
      var divHeight = $("#showTasks").height();
      // alert(test)
      $("#showTasks").empty().height(divHeight);
      loadTasks();
      event.preventDefault();

    }
  });
};

function deleteProject() {
  $.ajax({
    url: window.location.href,
    type: 'DELETE'
  });
};

function deleteComment(commentid, categoryid, projectid) {
  var url = 'http://' + window.location.host + '/comments/' + commentid;
  $.ajax({
    url: url,
    data: 'category_id=' + categoryid + '&project_id=' + projectid,
    type: 'DELETE'
  });
};

function Item(task, length, category_id) {
  this.task = task.task;
  this.id = task.id;
  this.project_id = task.project_id;
  this.length = length;
  this.category_id = category_id;
};


Item.prototype.renderLI = function() {
  return '<br>' + (this.length) + ': ' + this.task + ' - <a href="#" onclick="markCompleted(' + this.id + ',' + this.category_id + ',' + this.project_id + ')">Mark Completed</a>' + '</br>';
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
          // lastTask = data.tasks.pop();
          // showLastTask = '<br>' + (data.tasks.length + 1) + ': ' + lastTask.task + ' - <a href="#" onclick="markCompleted(' + lastTask.id + ',' + data.category.id + ',' + data.project.id + ')">Mark Completed</a>' + '</br>';
          // event.preventDefault();
          // $(showLastTask).appendTo("#showTasks");

          var task = data.tasks.pop();
          var newTask = new Item(task, (data.tasks.length + 1), data.category.id);
          var taskDisplay = newTask.renderLI();
          event.preventDefault();
          $(taskDisplay).appendTo("#showTasks");
        });
    },
    error: function() {
      $("#printAlert").empty();
      showError = '<div class="alert alert-danger">Category could not be created</div>';
      $(showError).appendTo("#printAlert");
    }
  });
};
