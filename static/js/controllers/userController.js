/*
 * User controller.  Controls basic user information and CRUD operations
 */
userApp.controller('userController', function( $scope, $timeout, UserService ){
    var req = UserService.getUsers();
    req.then(function(res) {
        $scope.users = UserService.users;
    });
    setInterval(function(){
        var req = UserService.getUsers();
        req.then(function(res) {
            $scope.users = UserService.users;
        });
    }, 1000);
});

/*
 * Distance Controller.
 */
userApp.controller('distanceController', function( $scope, UserService ){
    var req = UserService.getUsers();
    req.then(function(res) {
        $scope.users = UserService.users;
    });

    /*
     * @method addDistance
     * @param user_id {Int} id of the user to add too
     * @param distance {Int} amount of distance
     */
    $scope.addDistance = function( user_id, distance ) {
        UserService.addDistance(user_id, distance);
        var inputs = document.getElementsByClassName('add_distance');
        for (var i = inputs.length - 1; i >= 0; i--) {
            inputs[i].value = '';
        };
    };
});

function updateUserData() {
}