app.directive("sameValueValidate", function(){
	
	return {
    require: 'ngModel',
	scope: {
		valueToCompare : "="
	},
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
		return modelValue == scope.valueToCompare;
      };
    }
  };
	
})