/**
 * Created by Asim Raza Khan on 28-Apr-15.
 */

(function(){
angular.module('closeAll', ['firebase'])
    .controller('closeAllOpen', function($firebaseArray){

        // run for loop only once counter.
        this.countFor = 0;

        // loop that checks the isEditing property and set it to false and shows the list item.
        if(this.countFor === 0) {
            debugger;
            for (var item = 0; item < this.list.length; item++) {
                console.log('in for loop');
                if (this.list[item].isEditing == true) {
                    console.log('in if');
                    this.list[item].isEditing = false;
                    this.list[item].isHide = false;
                    this.list.$save(item);
                }
            }
            this.countFor++;
        }

    })
}) ();

