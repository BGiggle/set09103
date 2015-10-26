app.controller("gameModalController", [
    "$scope", "$modalInstance", "game", "$sce", function ($scope, $modalInstance, game, $sce) {

        $scope.game = game;
        console.log(game)

        $scope.getGameDescription = function () {
            return $sce.trustAsHtml(game.description);
        }
 
        $scope.close = function() {
            $modalInstance.close();
        }
    }
]);