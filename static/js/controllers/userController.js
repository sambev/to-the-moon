function getUsers( $scope, UserService ) {
    var req = UserService.getUsers();
    var total_distance = 0;
    req.then(function(res) {
        $scope.users = UserService.users;
        for (var i = UserService.users.length - 1; i >= 0; i--) {
            total_distance += +UserService.users[i].distance;
        };
        console.log(total_distance);
        if (total_distance != progressMiles && total_distance != 0) {
            progressMiles = total_distance;
            buildMap();
        }
    });
}


/*
 * User controller.  Controls basic user information and CRUD operations
 */
userApp.controller('userController', function( $scope, $timeout, UserService ){
    getUsers( $scope, UserService );

    $scope.currentTab = 'profile'

    // View Controls //////////////////
    $scope.goToTab = function (tabName) {
        $scope.currentTab = tabName;
    }

    setInterval(function(){
        getUsers( $scope, UserService );
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
        $scope.add_distance = '';
    };
});
