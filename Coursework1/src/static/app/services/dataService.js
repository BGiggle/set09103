app.factory("dataService", [
    "$resource", function ($resource) {

        function getGames(start, end, filter) {
            return $resource('/Games/', { start: start, end: end, filter: filter}).get();
        }

        function getGame(id) {
            return $resource('/Game/', { id: id }).get();
        }

        return {
            getGames: getGames,
            getGame: getGame
        }
    }
]);