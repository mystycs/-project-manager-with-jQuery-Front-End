$(function () {
  $.getJSON("http://104.236.196.127:9306/project_manager",
        function(data){
          $.each(data, function(i,project){
            content = '<h2><a href="/categories/' + project.id + '"</a>' + project.title + '</h2>';
            content += '<li>'
            //content += '<a href="/categories/' + project.projects.id + '"</a>' ;
            content += '</li>'
            $(content).appendTo("#project-data");
          });
        });
});




//alert("test");
