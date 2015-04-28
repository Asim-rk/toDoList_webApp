/**
 * Created by Asim on 25-Apr-15.
 */


angular.module('check', ['app', 'ngMaterial', 'firebase'])
    .controller('listCheck', function($scope, $firebaseArray){

    // checking if a new list is created.
    while(this.ref.isCompleted == true){
        this.ref = new Firebase("https://tdo.firebaseio.com/todo-list"+ ++this.inc);
    }

 });



