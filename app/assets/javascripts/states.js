function City(attributes) {
  this.name = attributes.name;
  this.id = attributes.id;
  this.state_name = attributes.state.name
  this.state_id = attributes.state.id
}

$(function(){
  City.templateSource = $("#entry-template").html()
  City.template = Handlebars.compile(City.templateSource)
})

City.prototype.renderLI = function(){
  return City.template(this)
}

$(function(){
  $("form#new_city").on("submit", function(e) {
    e.preventDefault()
    var $form = $(this);
    var action = $form.attr("action")
    var params = $form.serialize()

    $.ajax({
      url: action,
      method: "POST",
      data: params,
      dataType: "json"
    })
    .success(function(json){
      var city = new City(json);
      debugger
      var cityLi = city.renderLI()
      $("div#new_city").append(cityLi)
    })
  })
})