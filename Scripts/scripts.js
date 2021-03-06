// console.log('JS is sourced Dawg');

/////////////Global Variables///////////////////////////////////////////////////////////////////////////////////
var students = [];
var jsonUrl = 'http://devjana.net/pi/pi_students.json';
var currentPerson = -1;
var seconds = 0;


//JQuery is properly sourced
$(document).ready(function(){
  // console.log('JQuery is sourced');

/////////////Timer///////////////////////////////////////////////////////////////////////////////////
var timer = function() {
  var totalSeconds = 0;
  var  clock = setInterval(setTime, 1000);
   function setTime(){
    ++totalSeconds;
    var seconds = totalSeconds;
    console.log(seconds);
    if(totalSeconds % 10 === 0){
      // console.log('HOORAY');
      currentPerson++;
      displayCurrentStudent();
    }
  }
};

timer();
console.log(seconds);



///////////Display Student INFO on DOM////////////////////////////////////////////////////////////////////////////
  var displayCurrentStudent = function(){
    // console.log('In displayCurrentStudents', students[currentPerson]);

    var student = students[currentPerson];

    var display = '<strong>' + student.first_name + ' ' + student.last_name + ':</strong>' + '<br>' + student.info;

    // console.log(currentPerson + '/' +students.length);
    var counter = currentPerson + 1 + '/' + students.length;

    //added fadeIn and fadeOut to display on DOM
    $('#counter').fadeOut('slow', function(){
      //stuff that happens after fad eout
      $('#counter').fadeIn().html(counter);
    });

    $('#displayClickedStudent').fadeOut('slow', function(){
      $('#displayClickedStudent').html(display).fadeIn();
    });

  };


/////////////Next/Prev Buttons///////////////////////////////////////////////////////////////////////////////////
    $('#nextButton').on('click',function(){
      currentPerson ++;
      if (currentPerson >= students.length) {
        currentPerson = 0;
      }
      // console.log(currentPerson + ' Student Name: ' + students[currentPerson].first_name + ' ' + students[currentPerson].last_name);

      displayCurrentStudent();
    });

    $('#prevButton').on('click',function(){
      console.log('Clicked prevStudent!');
      currentPerson --;
      if (currentPerson < 0) {
        currentPerson = students.length - 1;
      }
      // console.log(currentPerson + ' Student Name: ' + students[currentPerson].first_name + ' ' + students[currentPerson].last_name);

      displayCurrentStudent();
    });


/////////////Display all Students in buttons & save data (the index #, specifically) in the buttons////////////////
    //need a for loop to loop through students and append to the DOM
    var allStudentButtons = function() {
      for (var i = 0; i < students.length; i++) {
        // var newHeader = document.createElement('button');

        //creating buttons for all students that also store data, in this case the data being stored is the 'position', or index, of each student
        var button = $("<button/>");

        button.data('index', i );
        button.html(students[i].first_name); //add in innerHMTL
        button.on('click', studentButtonClick); //adding a listener, if this happens: do this... remember, studentButtonClick is also a function found below!! Functions should ALWAYS stay outside the loop!!!

        $('#studentsOutput').append(button);
        // console.log(button.data('index'));
      }
    };


////////Function for allStudentButtons loop/////////////////////////////////////////////////////////////////////
  var studentButtonClick = function() {
    var index = $(this).data('index'); //created a key (named index) to recall that value from allStudentButtons function
    // console.log('Student index:', $(this).data('index'));
    // console.log(students[index].first_name);

    //set currentPerson to the index number
    currentPerson = index;

    displayCurrentStudent();
  };


/////////////AJAX Server Connection///////////////////////////////////////////////////////////////////////////
  //get data from the server using AJAX
  $.ajax({
    url:jsonUrl,
    dataType: 'JSON',
    success: function(data){
      console.log('in AJAX success: ', data.students);

      //loop through each student and push them into the students array
      for (var i = 0; i < data.students.length; i++) {
        students.push(data.students[i]);
      }
      //log shows that the global students array is now properly filling
      // console.log('Global students array: ', students);

      allStudentButtons();

    }
  }); //end AJAX
//////////////////////Counter////////////////////////////////////////////////////////////////////////////////

}); //end document ready
