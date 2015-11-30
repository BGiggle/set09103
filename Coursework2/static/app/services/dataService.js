app.factory("dataService", [
    "$resource", function ($resource) {

        function getGames(start, end, filter) {
            return $resource('/Games/', { start: start, end: end, filter: filter}).get();
        }

        function getGame(id) {
            return $resource('/Game/', { id: id }).get();
        }
        
        function login(email, password){
             return $resource('/Login/', { email: email, password: password}).get();
        }
        
        function register(email, password){
             return $resource('/Register/', { email: email, password: password}).get();
        }
        
        function getPlatforms(email, password){
             return $resource('/Platforms/').get();
        }

        return {
            getGames: getGames,
            getGame: getGame,
            login: login,
            register: register,
            getPlatforms: getPlatforms
        }
    }
]);