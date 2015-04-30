/**
 * Created by Asim Raza Khan on 21-Apr-15.
 */

(function(){
    var app = angular.module('toDo', ['reviewModule', 'ngMaterial', 'firebase']);

    app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

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

        // loop that checks the isEditing property and set it to false and shows the list item.
        this.check = function(){
            for (var item = 0; item < this.list.length; item++) {
                if (this.list[item].isEditing == true) {
                    console.log("is true");
                    this.list[item].isEditing = false;
                    this.list[item].isHide = false;
                    this.list.$save(item);
                }
            }
        };



        this.listItem = undefined;
        this.editText = undefined;


        // add text and isCompleted property as an object in the array of list on firebase.
        this.add = function () {

            if (this.listItem) {

                // adding the object into the array index (that is currently on in angular repeat)
                this.list.$add({
                    text: this.listItem,
                    isCompleted: false,
                    isHide: false,
                    isEditing: false,
                    unDoneValue: this.unDoneArray[0].unDoneValue
                });
                this.listItem = undefined;
            }
        };


        // editing the particular item on the list
        this.editing = function(item){
            this.editText = item.text;
            item.isEditing = true;
            item.isHide = true;
            /*this.editText = item.text;*/
            this.list.$save(item);
        };


        // edited the particular item on the list
        this.edited = function(item){
            if(item.text) {
                item.isEditing = false;
                item.isHide = false;
                this.list.$save(item);
            }else {
                item.isEditing = false;
                item.isHide = false;
                item.text = this.editText;
                this.list.$save(item);
            }

        };

        // hide the selected index of the array.
        this.clear = function () {

            for (var item = 0; item < this.list.length; item++) {
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

})();


(function(){
    angular.module('reviewModule', ['ngMaterial', 'firebase'])
        .controller('reviewController', function($firebaseArray) {
            this.userReviews = new Firebase("https://tdo.firebaseio.com/UserReviews");
            this.reviews = $firebaseArray(this.userReviews);

            this.message = {
                stars: 5
            };

            this.post = function () {

                if (this.message.who && this.message.suggestion) {

                    // adding the object into the array index (that is currently on in angular repeat)
                    this.reviews.$add(this.message);
                    this.message = {
                        stars: 5
                    };
                }
            };


        });
}) ();