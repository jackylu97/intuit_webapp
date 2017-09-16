$(document).ready(function(){
  var income;

  $("#income").submit(function(event){
    income = $("input").val();
    income = parseInt(income)

    // if typeOf(income) == 'number':
    //   alert("invalid income, try again!");
    //   return

    $("#first").addClass("hide");
    $("#rest").removeClass("hide");
    event.preventDefault();
    console.log(income);
  });
}
);
