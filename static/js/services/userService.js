/*
 * UserService, used for tracking everything about users
 * Thus far this includes: id, name, miles
 * @class UserService
 */
userApp.factory('UserService', function() {
    var UserService = {
        /*
         * @property users
         * @type {Array} - array of user objects
         * TODO don't fake this out
         */
        users: [
                    {
                        'id': 1,
                        'name': 'Sean Brown',
                        'miles': 10
                    },
                    {
                        'id': 2,
                        'name': 'Dean Cheesman',
                        'miles': 9
                    },
                    {
                        'id': 3,
                        'name': 'Chris Crosby',
                        'miles': 20
                    },
                    {
                        'id': 4,
                        'name': 'Sam Beveridge',
                        'miles': 1
                    }
                ],



        /*
         * @property total_miles
         * @type {Int} - total amount of miles for this user group
         * Maybe this doesn't actually belong on this service
         */
        total_miles: 0,
        goal_miles: 1000,

        /*
         * @method initTotalMiles - initialize the total amount of miles
         * @return {Int} - total amount of miles between users
         */
        initTotalMiles: function() {
            for (var i = this.users.length - 1; i >= 0; i--) {
                this.total_miles += parseInt(this.users[i].miles);
            };
            return this.total_miles;
        },

        /*
         * @method getUsers - get all users on this service
         * @return {Array} - array of all users
         */
        getUsers: function() {
            return this.users;
        },

        /*
         * @method addMiles - add some miles to a specific user, increment total
         *                    miles
         * @param user_id
         * @type {Int} - id of the user to add miles
         *
         * @param miles
         * @type {Int} - miles to add to the user
         */
        addMiles: function(user_id, miles) {
            for (var i = this.users.length - 1; i >= 0; i--) {
                if (this.users[i].id == user_id) {
                    this.users[i].miles += parseInt(miles);
                }
            };
            // Recalculate total
            this.total_miles += parseInt(miles);
        }
    }

    return UserService;
})