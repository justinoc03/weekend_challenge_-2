console.log('JS is sourced Dawg');

//JQuery is properly sourced
$(document).ready(function(){
  console.log('JQuery is sourced');
});

/////////////Global Variables////////////////
var students = [];
var jsonUrl = 'http://devjana.net/pi/pi_students.json';

/////////////Display Students on DOM////////////////

var displayStudents = function(){
  console.log('In displayStudents', students);

  //need a for loop to loop through students and append to the DOM
  for (var i = 0; i < students.length; i++) {


    var newHeader = document.createElement('button');
    newHeader.textContent = students[i].first_name;

    $('#studentsOutput').append(newHeader);
  }
  studentButton();
  nextStudent();
};

/////////////clickButton////////////////

var studentButton = function (){
  console.log('in clickButton');
  $('#studentsOutput').on('click',function(){
    console.log('Clicked studentButton!');


  });
};

var nextStudent = function (){
  console.log('in clickButton');
  $('#nextButton').on('click',function(){
    console.log('Clicked nextStudent!');

    for (var i = 0; i <students.length; i++) {
      $('#displayClickedStudent').append(students[i].first_name);
    }

  });
};


/////////////AJAX Server Connection////////////////

//get data from the server using AJAX
$.ajax({
  url:jsonUrl,
  dataType: 'JSON',
  success: function(data){
    // console.log('in AJAX success: ', data.students);

    //loop through each student and push them into the students array
    for (var i = 0; i < data.students.length; i++) {
      students.push(data.students[i]);
    }
    //log shows that the global students array is now properly filling
    // console.log('Global students array: ', students);

    displayStudents();

  }

});
