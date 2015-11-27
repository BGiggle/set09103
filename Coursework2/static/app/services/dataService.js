app.factory("dataService", [
    "$resource", function ($resource) {

        function getCollection(start, end, filter) {
            return $resource('/getCollection/', { start: start, end: end, filter: filter}).get();
        }

        function getGame(id) {
            return $resource('/getGame/', { id: id }).get();
        }

        return {
            getCollection: getCollection,
            getGame: getGame
        }
    }
]);