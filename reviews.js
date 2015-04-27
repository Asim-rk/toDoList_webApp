/**
 * Created by Asim on 28-Apr-15.
 */

(function(){
angular.module('reviewModule', ['ngMaterial', 'firebase'])
    .controller('reviewController', function($firebaseArray) {
        this.userReviews = new Firebase("https://tdo.firebaseio.com/UserReviews");
        this.reviews = $firebaseArray(this.userReviews);

        this.message = {
            face:'/images/60.jpeg' ,
            stars: 5
        };

        this.post = function () {

            if (this.message) {

                // adding the object into the array index (that is currently on in angular repeat)
                this.reviews.$add(this.message);
                this.message = {
                    stars: 5
                };
            }
        };


    });
}) ();

