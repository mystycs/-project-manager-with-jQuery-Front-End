$(function () {
  $.getJSON("/project_manager",
        function(data){
          $.each(data, function(i,cat){
            content = '<h2><a href="/categories/' + cat.id + '"</a>' + cat.title + '</h2>';
            content += '<ul>'
            $.each(cat.projects, function(j, proj) {
              content += '<li>';
              content +=  '<a href="/categories/' + cat.id + '/projects/' + proj.id +'">' + proj.title + '</a>';
              content +=  '<ol>' + proj.description + '</ol>';
              content += '</li>';
                });
            content += '</ul>'
            $(content).appendTo("#project-data");
          });
        });
});




//alert("test");
