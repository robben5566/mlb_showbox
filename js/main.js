(function ($) {
	"use strict";

    jQuery(document).ready(function(){
        SelectTeam();
        ShowBox(); 
    });


    jQuery(window).load(function(){

        
    });
    
    function SelectTeam() {
        $('#league-select').change(function(){
            var league = $('#league-select :selected').text();
            
            if($('#league-select :selected').val()==0){
                $('#team-select').empty();
            } else {
                $.getJSON('js/' + league + '.json', function(datas){
                    var html = "";
                    $.each(datas, function(index, data){
                        html += '<option value="' + data.Name + '">' + data.Name + '</option>';
                    })

                    $('#team-select').empty().append(html);
                    html = "";
                })
            }                        
        });
    }
    
    function ShowBox() {
        $('#team-select').change(function(){
            $('.readme').remove();
            var team = $('#team-select :selected').text();
            $.getJSON("js/test.json", function(datas){
                var html = "";
                var result = "";
                var diff = "";
                
                $.each(datas, function(index, data){
                    if(data.Away==team) {
                        result = data.Away_Win>0 ? "away_win" : "away_lose";
                        diff = data.Away_Win>0 ? "客" : "主";
                        
                        html += '<tr class="' + result + '"><th>' + data.date.substr(5,6) + '</th>' + '<th><strong>' + data.Away + '</strong></th>' + '<th>' + data.Away_Score + ' - ' + data.Home_Score + '</th>' + '<th>' + data.Home + '</th>' + '<th>' + diff + Math.abs(data.Away_Win) + '</th></tr>';  
                    }
                    if(data.Home==team) {
                        result = data.Home_Win>0 ? "home_win" : "home_lose";
                        diff = data.Away_Win>0 ? "客" : "主";
                        
                        html += '<tr class="' + result + '"><th>' + data.date.substr(5,6) + '</th>' + '<th>' + data.Away + '</th>' + '<th>' + data.Away_Score + ' - ' + data.Home_Score + '</th>' + '<th><strong>' + data.Home + '</strong></th>' + '<th>' + diff + Math.abs(data.Away_Win) + '</th></tr>';  
                    }
                    
                       
                }); 
                $('#temp').empty().append(html);
                html = "";
                //document.getElementById("temp").innerHTML = html;
            });
        });
    }

}(jQuery));	