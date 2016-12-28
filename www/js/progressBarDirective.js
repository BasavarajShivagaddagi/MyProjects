angular.module('starter.directives', [])

.directive('progressBarDirective',function(){
	return {
    restrict: 'E',
    controller:'fitBitCalendarCtrl',
    templateUrl: 'templates/roundedProgressBarTemplate.html'

  };

})

.directive('roundBar',function(){
	return {
		restrict : 'EA',
		controller : 'roundBarCtrl',
		templateUrl : 'templates/roundBar.html'
	}
})
.directive('roundProgressBar',function(){
	return {
		restrict : 'EA',
		controller : 'roundProgressBarCtrl',
		templateUrl : 'templates/roundProgressBarTemp.html'
	}
})
.directive('roundProgressBarEffAge',function(){
	return {
		restrict : 'EA',
		controller : 'roundProgressBarEffAgeCtrl',
		template : '<div class="roundProgressBarEffAge"></div>'
	}
})
.directive('roundProgressBarSteps',function(){
	return {
		restrict : 'EA',
		controller : 'roundProgressBarStepsCtrl',
		template : '<div  class="roundProgressBarSteps"></div>'
	}
})