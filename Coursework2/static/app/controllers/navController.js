app.controller("navController", [ "$scope", function ($scope) {

    $scope.links = [
        {
            title: "Home",
            link: "#/"
        },
        {
            title: "About",
            link: "#/About"
        },
        {
            title: "Platforms",
            link: "#/Platforms"
        },
    ];

    }
]);