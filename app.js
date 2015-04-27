/**
 * Created by Asim Raza Khan on 21-Apr-15.
 */


var app = angular.module('toDo', ['reviews', 'ngMaterial', 'firebase']);
app.controller('ListController', function($scope, $firebaseArray) {


    // creates an object that hold the array property of undoing (how many time) 'X' many times.
    this.unDoneRecords = new Firebase("https://tdo.firebaseio.com/unDoneRecords");
    // in unDoneRecords object make an array of unDoneValue.
    this.unDoneArray = $firebaseArray(this.unDoneRecords);
    this.unDoneArray.unDoneValue = 0;

    // creates an object of name todo_list in the firebase server.
    this.ref = new Firebase("https://tdo.firebaseio.com/todo-list");


    this.name = "todo-list";
    this.inc = 0;


    /*this.pageLd = function(){
     if (ref == undefined){
     this.pageLd = true
     }
     }*/


    // creates an array of name list the the todo_list object.
    this.list = $firebaseArray(this.ref);
    this.listItem = undefined;


    // add text and isCompleted property as an object in the array of list on firebase.
    this.add = function () {

        if (this.listItem) {

            // adding the object into the array index (that is currently on in angular repeat)
            this.list.$add({
                text: this.listItem,
                isCompleted: false,
                isHide: false,
                unDoneValue: this.unDoneArray[0].unDoneValue
            });
            this.listItem = undefined;
        }
    };

    // hide the selected index of the array.
    this.clear = function () {

        for (var item = 0; item < this.list.length; item++) {
            debugger;
            if (this.list[item].isCompleted === true) {
                this.list[item].isHide = true;
                this.list[item].unDoneValue ++;
                this.list.$save(item);
            }
            /*if(this.list[item].unDoneValue === 1){
                this.index = item;
            }*/
        }

    };


    /*// create a new list object on firebase.
    this.clearList = function () {

        // creating the property to check werther to go on to the next list.
        // this.list.$add(this.isCleared = true);

        // creates a new object in todo_list object.
        this.ref = new Firebase("https://tdo.firebaseio.com/todo-list" + ++this.inc);
        this.list = $firebaseArray(this.ref);

        // the value of the unDoneValue object incremented.
        this.unDoneArray[0].unDoneValue += 1;
        this.unDoneArray.$save(0);


    };*/

    // un hide the hidden index of the array.
    this.undo = function () {

        /*var lowest = this.list[this.index].unDoneValue;

        for(var i=0; i<this.list.length; i++){
            debugger;
            if(this.list[i].unDoneValue < lowest && this.list[i].unDoneValue !=0){
                lowest = this.list[i].unDoneValue;
                this.list.$save(i);
            }
        }*/

        for (var i = 0; i < this.list.length; i++) {
            debugger;
            if (this.list[i].unDoneValue === 1) {
                this.list[i].isHide = false;
                this.list[i].unDoneValue = this.unDoneArray[0].unDoneValue;
                this.list.$save(i);
            } else if(this.list[i].unDoneValue != 0){
                this.list[i].unDoneValue --;
                this.list.$save(i);

            }
        }

        /*var lowest = 1;
        for (var i = 0; i < this.list.length; i++) {

            for (var j = i+1; j < this.list.length; j++) {
                debugger;
                if((this.list[i].unDoneValue < this.list[j].unDoneValue) && this.list[j].isHide == true) {
                    lowest = this.list[i].unDoneValue;
                }

            }

        }
        for (var i = 0; i < this.list.length; i++) {

            if (this.list[i].unDoneValue === lowest) {
                this.list[i].isHide = false;
                this.list[i].unDoneValue = this.unDoneArray[0].unDoneValue;
                this.list.$save(i);
            }
        }*/

    };


    /*// clears the the object todo_list.
     this.clearList = function($rootScope){
     $rootScope.ref.$remove();
     var fredRef = new Firebase('https://mytdo.firebaseio.com/todo-list');
     fredRef.remove();
     }*/





});

var reviews = angular.module('reviews', ['ngMaterial']);
    reviews.controller('ReviewController', function() {
        this.review = new Firebase("https://tdo.firebaseio.com/reviews");
        this.reviews = $firebaseArray(this.review);

        this.messages = undefined;

        this.add = function () {

            if (this.messages) {

                // adding the object into the array index (that is currently on in angular repeat)
                this.reviews.$add(this.messages);
                this.messages = undefined;
            }
        };

        this.messages = {
            who: 'Asim',
            star: 5
        };
    });













