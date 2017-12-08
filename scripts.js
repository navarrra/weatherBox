$(document).ready(function(){

  //variables for menu
  var $menuTab = $("#menutab");
  var $menuList = $('.overlay');
  var $menuItems = $("li");
  var $signUp = $(".signupbtn");
  var $cancel = $(".cancel");

  //click on icon show and hide menu
  $menuTab.click(function(){
    $menuTab.toggleClass("rotate");//rotate icon on click
    $menuList.toggleClass("showmenu"); //show menu
    //blur background of main content
  });

  //click on list item hidemenu
  $menuItems.on("click", function(){
    $menuList.toggleClass("showmenu");//hide menu
    $menuTab.toggleClass("rotate");// rotate icon back
  });

  //click on signup to show signup box
  $signUp.on("click",function(){
    $(".signup").show("slow");
  })


  //hide sign up
  $cancel.click(function(){
    $(".signup").hide("slow");
  });

  //Search button
  $(".searchBtn").click(getWeather);

  $(".backbtn, .home").click(function(){
    $(".searchResults").addClass("hideSearchresults");
    $(".welcomepage").show();
    $(".searchbox").val("");

  });

  //CF buttons
  $("#cbutton").click(function(){
    //turn on Cbutton turn off fbutton
    $(this).addClass("onbtn").val("on");
      $("#fbutton").removeClass("onbtn").val("off");
      //turn on fbutton turn off cbutton
      $("#fbutton").click(function(){
        $(this).addClass("onbtn").val("on");
          $("#cbutton").removeClass("onbtn").val("off");
    });
  });

  var apiKey = "72524e825328238b";
  var fcButton;

  //ajax request to connect to api
  function getWeather(city){
  // var urls = [/*"http://api.openweathermap.org/data/2.5/forecast?"*/, "http://api.openweathermap.org/data/2.5/weather?"];
  var weatherCity = "http://api.wunderground.com/api/"
  var city =   $(".searchbox").val() + ".json";
  var conditions = "/conditions" + "/q/";
  var forecast = "/forecast" + "/q/";

  $.ajax({
    url: weatherCity + apiKey + conditions + city,
    success: function(data){
      var temp = document.getElementById("temp_f");
      var cityName = document.getElementById("city");
      var description = ["weather", "icon_url", "precip_today_in"];

        //if statement for metric and imperial unit assignment
      if($("#fbutton").val()==="on"){
         fcButton = temp.innerHTML = Math.round(data.current_observation.temp_f) + '°';
      }else{
         fcButton = temp.innerHTML = Math.round(data.current_observation.temp_c) + '°';
      }

        //background switch statement
        var background = data.current_observation.icon;
        switch(background){

            case 'clear':
            case 'sunny':
            case 'mostlysunny': /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('http://allswalls.com/images/clear-sky-wallpaper-3.jpg')");
                break;
            case 'partlycloudy':
            case 'partlysunny': /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('https://aujasus.files.wordpress.com/2011/04/amazon-and-the-cloud.jpg')");
                break;
            case 'scatteredclouds':  /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('https://images.freeimages.com/images/large-previews/c1a/blue-sky-and-clouds-1400674.jpg')");
                break;
            case 'mostlycloudy':
            case 'overcast': /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('https://img00.deviantart.net/fa39/i/2015/052/6/1/broken_clouds_by_leo_6tos-d8ixdlv.jpg')");
                break;
            case 'sleet':
            case 'rain':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.pinimg.com/736x/3c/88/a4/3c88a4c7142345ccf72b69afd51301a9--rainy-morning-iphone-wallpaper.jpg')");
                break;
            case 'tstorms':
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.pinimg.com/736x/ca/3b/ff/ca3bff05bbaa2a87865de9a1668c6884--lightning-storms-lightning-strikes.jpg')");
                break;
            case 'snow':
            case 'flurries': /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('https://arch5541.files.wordpress.com/2012/11/snow.jpg')");
                break;
            case 'fog':
            case 'hazy': /*consolelog temp*/
              console.log("1");    $(".searchResults").css("background-image", "url('https://i.imgur.com/dsQ2LMh.jpg')");
                break; /*consolelog temp*/
            default:$(".searchResults").css("background-image", "url('https://i.imgur.com/dsQ2LMh.jpg')");
            console.log('2');

        };//end of switch state


        console.log("success", data);

        //hide welcome page after search
        $(".welcomepage").hide();

        //show results after search
        $(".searchResults").removeClass("hideSearchresults");


        //data displayed from object results for city and current temp
         cityName.innerHTML = data.current_observation.display_location.full;

          //loop through weather array
        $.each(data.current_observation, function(i){
            $.each(description, function(j){
                if(description[j]==[i]){
                    document.getElementById(description[j]).innerHTML = data.current_observation[i];
                    if(description[j]=="icon_url"){
                      var icon = data.current_observation.icon_url;
                      //append icon
                      console.log(data.current_observation.icon_url);
                      $("#icon_url").prepend("<img src='" + icon + "'>" );
                    };
                };
            });
          });//end of loop

            //started 5 day forcast api call
              $(".fiveday").click(function(){
                  $("#current").animate({"left": "-100%"});

                $.ajax({
                  url: weatherCity + apiKey + forecast + city,
                  success: function(data){
                    console.log(data);
                    var forecastDate= data.forecast.simpleforecast.forecastday;
                    var forecast = data.forecast.simpleforecast.forecastday;
                    var day = ["weekday_short", "icon_url"];
                    
                    for(var i = 1 ; i < forecastDate.length; i++){
                        // console.log(forecastDate[i]);
                         var days = forecastDate[i].date.weekday_short;
                        $("#weekday_short").append("<div><h3>"+ days + "</h3></div>");
                    };




                    // $.each(forecast, function(i){
                    //   console.log(forecast[i]);
                    //   if(forecast[i]=="weekday_short"){
                    //     console.log('winner');
                    //   }
                    //
                    //
                    // });
                },
              });
            });



      }, //end of success

    });//end of ajax

}; //end of getWeather function

  });
