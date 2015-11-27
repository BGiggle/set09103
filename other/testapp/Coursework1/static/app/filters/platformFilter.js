app.filter('platforms', function () {
    return function (input) {
  
        if (input) {
            var result = input[0].name;
            for (var i = 1; i < input.length; i++) {
                result += ", " + input[i].name;
            }
            return result;
        }
    };
});