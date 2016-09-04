console.log('JS is sourced Dawg');


/////////////Global Variables////////////////
var currentIndex = 0;
var theData;
var jsonUrl = 'http://devjana.net/pi/pi_students.json';


//JQuery is properly sourced
$(document).ready(function(){
  console.log('JQuery is sourced');


  /////////////AJAX Server Connection////////////////
  //get data from the server using AJAX
  $.ajax({
    url:jsonUrl,
    dataType: 'JSON',
    success: function(data){
      // console.log('in AJAX success: ', data.students);
      theData = data;
      displayStudents();
    } //END AJAX Success
  }); //END AJAX


  /////////////Previous and Next Buttons////////////////
  $('#nextButton').on('click',function(){
    currentIndex++;
    if(currentIndex >= theData.students.length){
      currentIndex = 0;
    }
    displayStudents();
  }); //end nextButton

  $('#previousButton').on('click',function(){
    currentIndex--;
    if(currentIndex < 0){
      currentIndex = theData.students.length -1;
    }
    displayStudents();
  }); //end previousButton

  /////////////Display Students on DOM////////////////
  var displayStudents = function(){
    $('#studentsOutput').empty();


    var nameOut = theData.students[ currentIndex ].first_name + " " + theData.students[ currentIndex ].last_name;
    // format record number

    var adjustedIndex = currentIndex +1;
    var counterOut = adjustedIndex + "/" + theData.students.length;
    /// - create element append - ///
    // format output
    var newHeader = document.createElement('h2');
    newHeader.textContent=nameOut;
    var newParagraph = document.createElement('p');
    newParagraph.textContent= counterOut;
    // display output
    $("#studentsOutput").append( newHeader );
    $("#studentsOutput").append( newParagraph );
  }; // end display student

});





// /////////////NextStudent////////////////
// var nextStudent = function (){
//   console.log('in clickButton');
//   $('#nextButton').on('click',function(){
//     console.log('Clicked nextStudent!');
//     i++;
//
//     if(i >= students.length) {
//       i = 0;
//     }
//       // $('#displayClickedStudent').append(students[i].first_name);
//
//
//   });
// };
