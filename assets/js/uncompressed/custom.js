// Apply "active" class to nav link for current page
$(function(){
       $(".nav li a").each(function(){
       	var thisObj = $(this);
       	console.log(window.location.pathname);
       	console.log(thisObj.attr("href"));
           if (thisObj.attr("href") == window.location.pathname){
                   thisObj.parent().addClass("active");
           }
       });
});

$('.carousel').carousel();