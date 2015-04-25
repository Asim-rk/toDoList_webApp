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


app.controller('ListController', function($scope, $firebaseArray){


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
    this.add = function(){


        // adding the object into the array index (that is currently on in angular repeat)
        this.list.$add({text: this.listItem, isCompleted: false, isHide: false});
        this.listItem = undefined;
        };

        this.clear = function(){
            for (var item=0; item <this.list.length; item++) {
                if (this.list[item].isCompleted === true){
                    this.list[item].isHide = true;
                    this.list[item].$save();
                }
            }
        };


    // create a new list object on firebase.
    this.clearList = function(){

        // creating the property to check werther to go on to the next list.
        // this.list.$add(this.isCleared = true);

        // creates a new object in todo_list object.
        this.ref = new Firebase("https://tdo.firebaseio.com/todo-list"+ ++this.inc);
        this.list = $firebaseArray(this.ref);

    };


    /*// clears the the object todo_list.
    this.clearList = function($rootScope){
        $rootScope.ref.$remove();
        var fredRef = new Firebase('https://mytdo.firebaseio.com/todo-list');
        fredRef.remove();
    }*/




});




