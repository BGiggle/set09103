﻿app.factory("dataService", [
    "$resource", function ($resource) {

        function getCollection(start, end) {
            return $resource('/getCollection/', { start: start, end: end }).get();
        }

        return {
            getCollection: getCollection
        }
    }
]);