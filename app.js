/**
 * Created by Asim Raza Khan on 21-Apr-15.
 */


var app = angular.module('toDo', ['ngMaterial', 'firebase']);

    /*app.factory("severCheck", function($rootScope, $firebaseArray) {

        // creates an object of name todo_list in the firebase server.
        $rootScope.ref = new Firebase("https://tdo.firebaseio.com/todo-list0");
        $rootScope.inc = 0;

        // creates an array of name list the the todo_list object.
        $rootScope.list = $firebaseArray($rootScope.ref);

        while ($rootScope.list.isCleared = true) {
            $rootScope.inc++;
            $rootScope.ref = new Firebase("https://tdo.firebaseio.com/todo-list" + $rootScope.inc);
        }


        // this uses AngularFire to create the synchronized array
        return $firebaseArray($rootScope.ref);
    });*/

/*app.factory('objectCheck', function(){

    // creates an object of name todo_list in the firebase server.
    this.ref = new Firebase("https://tdo.firebaseio.com/todo-list0");
    this.inc = 0;

    // creates an array of name list the the todo_list object.
    this.list = $firebaseArray(this.ref);

    while (this.list.isCleared = true) {
        this.inc++;
        this.ref = new Firebase("https://tdo.firebaseio.com/todo-list" + this.inc);
    }


    // this uses AngularFire to create the synchronized array
    return $firebaseArray(this.ref);
});*/


app.controller('ListController', function($scope, $firebaseArray) {


    // creates an object that hold the array property of undoing (how many time) 'X' many times.
    this.unDoneRecords = new Firebase("https://tdo.firebaseio.com/unDoneRecords");
    // in unDoneRecords object make an array of unDoneValue.
    this.unDoneArray = $firebaseArray(this.unDoneRecords);

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

    this.clear = function () {

        for (var item = 0; item < this.list.length; item++) {
            if (this.list[item].isCompleted === true) {
                this.list[item].isHide = true;
                this.list[item].unDoneValue ++;
                this.list.$save(item);

            }
        }

    };


    // create a new list object on firebase.
    this.clearList = function () {

        // creating the property to check werther to go on to the next list.
        // this.list.$add(this.isCleared = true);

        // creates a new object in todo_list object.
        this.ref = new Firebase("https://tdo.firebaseio.com/todo-list" + ++this.inc);
        this.list = $firebaseArray(this.ref);

        // the value of the unDoneValue object incremented.
        this.unDoneArray[0].unDoneValue += 1;
        this.unDoneArray.$save(0);


    };

    this.undo = function () {
        var lowest = 0;
        for (var i = 0; i < this.list.length; i++) {
            for (var j = 0; j < this.list.length; j++) {
                if ((this.list[j].unDoneValue <= this.list[i].unDoneValue) && this.list[j].isHide == true) {
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
        }
    };


    /*// clears the the object todo_list.
     this.clearList = function($rootScope){
     $rootScope.ref.$remove();
     var fredRef = new Firebase('https://mytdo.firebaseio.com/todo-list');
     fredRef.remove();
     }*/





});














