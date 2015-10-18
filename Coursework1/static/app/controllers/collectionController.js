app.controller("collectionController", ["$scope", "dataService", function ($scope, dataService) {
    dataService.getCollection(0, 10).$promise.then(function (result) {
            $scope.collection = result.results;
        });
    }
]);