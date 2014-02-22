/*
 * UserService, used for tracking everything about users
 * Thus far this includes: id, name, distance
 * @class UserService
 */
userApp.factory('UserService', function( $http ) {
    var UserService = {
        /*
         * @property users
         * @type {Array} - array of user objects
         * TODO don't fake this out
         */
        users: [],

        /*
         * @property total_distance
         * @type {Int} - total amount of distance for this user group
         * Maybe this doesn't actually belong on this service
         */
        total_distance: 0,

        /*
         * @method initTotalDistance - initialize the total amount of distance
         * @return {Int} - total amount of distance between users
         */
        initTotalDistance: function() {
            for (var i = this.users.length - 1; i >= 0; i--) {
                this.total_distance += parseInt(this.users[i].distance);
            };
            return this.total_distance;
        },

        /*
         * @method getUsers - get all users on this service
         * @return {Array} - array of all users
         */
        getUsers: function() {
            var req = $http({ method: 'GET', url: '/teams/' });
            req.success(function( data, status, headers, config ){
                UserService.users = data.users;
            });
            return req;
        },

        /*
         * @method addDistance - add some distance to a specific user, increent total
         *                    distance
         * @param user_id
         * @type {Int} - id of the user to add distance
         *
         * @param distance
         * @type {Int} - distance to add to the user
         */
        addDistance: function(user_id, distance) {
            console.log(distance);
            for (var i = this.users.length - 1; i >= 0; i--) {
                if (this.users[i].id == user_id) {
                    var put_data = {
                        'name': this.users[i].name,
                        'distance': distance
                    };
                    this.users[i].distance += parseInt(distance);
                    $http({ method: 'PUT', url: '/users/', data: put_data })
                        .success(function( data, status, headers, config ) {
                            console.log(data);
                        });
                }
            };
            // Recalculate total
            this.total_distance += parseInt(distance);
        },

        updateDistances: function() {
            for (var i = this.users.length - 1; i >= 0; i--) {
                this.users[i]
            };
        }
    }

    return UserService;
})