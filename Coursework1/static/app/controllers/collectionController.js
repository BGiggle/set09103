app.controller("collectionController", ["$scope", "dataService", "$uibModal", function ($scope, dataService, $uibModal) {

    $scope.orderByFields = [{ display: "Name", searchTerm: "name" }, { display: "Release Date", searchTerm: "original_release_date" }];
    $scope.direction = [{ display: "Ascending", direction: "ASC" }, { display: "Descending", direction: "DESC" }];
    $scope.itemsPerPage = [10, 25, 50, 100];

    $scope.filter = {
        orderBy: "name",
        direction: "ASC"
    }

    $scope.page = {
        pageSize : 10
    }

        $scope.getPage = function (start, end) {
        $scope.isLoading = true;
        dataService.getCollection(start, end, $scope.filter).$promise.then(function (result) {
            $scope.collection = result.games;
            $scope.page.totalItems = result.total;
            $scope.isLoading = false;
        });
    }

    $scope.getPage(0, 10);

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

    $scope.changePage = function (pageNumber) {
        var pageStart = pageNumber * $scope.page.pageSize - $scope.page.pageSize;
        $scope.getPage(pageStart, pageStart + $scope.page.pageSize);
    }

    $scope.search = function () {
        $scope.page.currentPage = 0;
        $scope.getPage(0, $scope.page.pageSize);
    }

}
]);