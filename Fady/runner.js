$(function() {



	// $('body').append(" <div id=\"tools\"> ABC ABC </div>" );

$( "#dialog-confirm" ).dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "Delete all items": function() {
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });


$( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });


$( "#places" ).slider({
      range: "min",
      value: 2,
      min: 1,
      step: 1,
      max: 10,
      slide: function( event, ui ) {
        $( "#aPlaces" ).val( "#" + ui.value );
      }
    });
    $( "#aPlaces" ).val( "#" + $( "#places" ).slider( "value" ) );
    t1=60;t2=120;

    $( "#time" ).slider({
      range: true,
      value: 30,
      min: 30,
      step: 15,
      max: 360,
      values: [ t1, t2 ],
      slide: function( event, ui ) {
        $( "#aTime" ).val( "min " + ui.values[ 0 ] + " - min " + ui.values[ 1 ] );
        t1=ui.values[0], t2=ui.values[1]
      }
    });
    $( "#aTime" ).val( "min " + $( "#time" ).slider( "values", 0 ) +
      " - min " + $( "#time" ).slider( "values", 1 ) );

    $( "#format" ).buttonset();

    var checkFun = function() {
	  checked=[];
	  checked[0] = $( "#indor:checked" ).is(':checked');
	  // alert(checked[0],checked[1]);
	  checked[1] = $( "#outdor:checked" ).is(':checked');
	  return checked
	};

// $( "input[type=submit], a, button" )
$( "#confirm" )
      .button()
      .click(function( event ) {
        // event.preventDefault();
        z=checkFun()
        text = $( "#aTime" ).val() +" - "+ $( "#aPlaces" ).val() +" - "+t1+t2+" \n indor: " +z[0] +" - outdor: "+ z[1];
        window.alert(text + "\n" );
      });


// WAPI
    var place = 'natural history museum';        
    var myWidget = new panoramio.PhotoWidget('wapiblock', {'tag': place}, myOptions);
    myWidget.setPosition(0);
    var myOptions = {
      'width': 150,
      'height': 150
    };

});
