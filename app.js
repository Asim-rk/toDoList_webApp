/**
 * Created by Asim on 21-Apr-15.
 */



var app = angular.module('toDo', ['ngMaterial', 'firebase']);


app.controller('ListController', function($scope, $firebaseArray){
    var ref = new Firebase("https://tdo.firebaseio.com/todo-list");


    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    this.list = $firebaseArray(ref);
    console.log(this.list);
    this.listItem = undefined;
    this.add = function(){
    this.list.$add({text: this.listItem, isCompleted: false});
    this.listItem = undefined;
    };
    this.clear = function(){
        for (var item in this.list) {
            if (item.isCompleted === true){
                this.list.$remove(item);
            }
        }
    };
    this.clearList = function(){
        this.newList = 1;
        this.list = $firebaseArray(new Firebase("https://tdo.firebaseio.com/todo-list"+ ++this.newList));
    };

});





