app.filter('platforms', function () {
    return function (input) {
        if (input) {
            if (input === "None") return "";
            input = angular.fromJson(input);

            var result = input[0].name;
            for (var i = 1; i < input.length; i++) {
                result += ", " + input[i].name;
            }
            return result;
        }
    };
}).filter('dateString', ["$filter", function ($filter) {
    return function (input, format) {
        var date = new Date(input);
        return $filter('date')(date, format);

    };
}]);