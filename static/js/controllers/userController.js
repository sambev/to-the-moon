/*
 * User controller.  Controls basic user information and CRUD operations
 */
userApp.controller('userController', function( $scope, UserService ){
    $scope.users = UserService.getUsers();
    $scope.total_miles = UserService.initTotalMiles();

    /*
     * @method addMiles
     * @param user_id {Int} id of the user to add too
     * @param miles {Int} amount of miles
     */
    $scope.addMiles = function(user_id, miles) {
        UserService.addMiles(user_id, miles);
        $scope.total_miles += parseInt(miles);
        var inputs = document.getElementsByClassName('add_miles');
        for (var i = inputs.length - 1; i >= 0; i--) {
            inputs[i].value = '';
        };
    }
});