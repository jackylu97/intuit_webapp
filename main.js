$(document).ready(function(){
  var income;

  $("#income").submit(function(event){
    $("#first").addClass("hide");
    $("#rest").removeClass("hide");
    event.preventDefault();
    income = $("input").val();
    console.log(income);
  });
}
);
