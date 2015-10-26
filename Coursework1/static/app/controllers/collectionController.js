app.controller("collectionController", ["$scope", "dataService", "$uibModal", function ($scope, dataService, $uibModal) {
    dataService.getCollection(0, 10).$promise.then(function (result) {
        $scope.collection = result.results;
    });

    $scope.openGame = function (game) {
        dataService.getGame(game.id).$promise.then(function (s) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/static/app/templates/gameModal.html',
                controller: 'gameModalController',
                size: "lg",
                resolve: {
                    game: function () {
                        return s.results;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                
            }, function () {
               
            });
        });
    }

}
]);