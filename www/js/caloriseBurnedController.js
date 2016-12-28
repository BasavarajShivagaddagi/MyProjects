angular.module('starter.caloriseBurnedController',[])
//Calories Burned controller

//calories burned summary list

.controller('caloriesSummaryListCtrl', function($scope,caloriesSummaryListDataService,$rootScope) {
		var d = new Date();
		month = (d.getMonth()+1)
		var year = d.getFullYear();
		
   		var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var getdat = date.getDate();
		var maindat= 0;
		if(getdat.length > 1){
			maindat = date.getDate();
		}else {
			maindat = '0'+date.getDate();
		}
		
		var effectiveDate = (date.getMonth() + 1) + "-" + maindat + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var stdata = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate,
			 "PointsTableName": "Calories",
			 "policyNumber":policyNumber,
       "MonthYear" : month+""+year
			}

var data = {}
 var d = new Date();
 //var cueDate = d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear();

var ActivityArrDateTime = [],ActivityArrDateTimeValue = [];
var stepsOnGraph = 0;$scope.stepsOnGraphsc = 0;

   caloriesSummaryListDataService.caloriesSummaryListDataServiceFn(stdata).success(function(response) {

   		
       var setpSum = response.FitnessPoints.slice(response.FitnessPoints.length-7);
   	  	
          for( var i =  0 ; i < setpSum.length ; i++){
            	   stepsOnGraph+=  setpSum[i].Value;
						 //ActivityArrDateTime.push(response.FitnessPoints[i].ActivityDateTime.slice(0,9));
						  var d = new Date(setpSum[i].ActivityDateTime);
						  ActivityArrDateTime.push({"day" : d.getDate() , "value" : d.getDate()+","+months[d.getMonth()]});

                        ActivityArrDateTimeValue.push(setpSum[i].Value);

            }
           
           $scope.stepsOnGraphsc = stepsOnGraph;

            $scope.chartVal = ActivityArrDateTime;   

$scope.lenghts = 200 / $scope.chartVal.length;
  
new Morris.Line({

  element: 'area-example',

  data: [
   { day: '26,Sep', value: ActivityArrDateTimeValue[0]},
    { day: '27,Sep', value: ActivityArrDateTimeValue[1] },
    { day: '28,Sep', value: ActivityArrDateTimeValue[2] },
    { day: '29,Sep', value: ActivityArrDateTimeValue[3] },
    { day: '30,Sep', value: ActivityArrDateTimeValue[4] },
     {day: '31,Sep', value: ActivityArrDateTimeValue[5] },
    { day: '1,Oct', value: ActivityArrDateTimeValue[6]}   
  ],
  xkey: 'day',
 
  ykeys: ['value'],

  labels: ['day'],
  grid:false,
  axes:false

});
$rootScope.steps = ActivityArrDateTimeValue[6];

        }).error(function(response) {
           
        });



})

//calorise burned summary days list


.controller('caloriesSummaryDaysListCtrl', function(caloriesSummaryListDataService,$scope){
	var d = new Date();
		month = (d.getMonth()+1)
		var year = d.getFullYear();
	   	var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var getdat = date.getDate();
		var maindat= 0;
		if(getdat.length > 1){
			maindat = date.getDate();
		}else {
			maindat = '0'+date.getDate();
		}
		
		var effectiveDate = (date.getMonth() + 1) + "-" + maindat + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		
  var stdata =  {
      "UniqueId": uniqueid,
      "IssueDate": issueDate,
      "EffectiveDate": effectiveDate,
       "PointsTableName": "Calories",
       "policyNumber":policyNumber,
       "MonthYear" : month+""+year
      }
  $scope.newArr=[];
caloriesSummaryListDataService.caloriesSummaryListDataServiceFn(stdata).success(function(response){          
  $scope.stepsDetailsForDisplay = response;
  console.log($scope.stepsDetailsForDisplay);
  var weeklyView = $scope.stepsDetailsForDisplay.FitnessPoints;
  while(weeklyView.length) {   
      $scope.weeklyViewArr = weeklyView.splice(0,7);
      $scope.newArr.push($scope.weeklyViewArr);
    }

}).error(function(response) {}); 

})

//calories calenadar

.controller('caloriesCalendarCtrl', function($scope,LoaderService,caloriesCalendarDataService){

		var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var getdat = date.getDate();
		var maindat= 0;
		if(getdat.length > 1){
			maindat = date.getDate();
		}else {
			maindat = '0'+date.getDate();
		}
		
		var effectiveDate = (date.getMonth() + 1) + "-" + maindat + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var stdata = 	{}
 $scope.months = [];
 $scope.getDetails = function(month) {
   var mon = month <= 9 ? '0'+month : month;
   var yr = date.getFullYear();
   var monyr = mon+""+yr
   console.log(monyr);

   stdata =   {
      "UniqueId": uniqueid,
      "IssueDate": issueDate,
      "EffectiveDate": effectiveDate,
       "PointsTableName": "Steps",
       "policyNumber":policyNumber,
       "IsDateRangeOff": true,
        "MonthYear" : monyr
      }
     caloriesCalendarDataService.caloriesCalendarDataServiceFn(stdata).success(function(response) {
     
         $scope.displayResponse = {};
         var getDated = [];
         if (response.Status.IsSuccess) {
             var count = 0;
             for (var i = 0; i < response.FitnessPoints.length; i++) {
                 var n = {};
                 n.date = new Date(response.FitnessPoints[i].ActivityDateTime).getDate();
                 n.active = response.FitnessPoints[i].Value > 0 ? 'yes' : 'no';
                 count = response.FitnessPoints[i].Value > 0 ? count + 1 : count;
                 getDated.push(n);
             }
             $scope.displayResponse.status = true;
             $scope.displayResponse.finalDate = getDated;
         } else {
             $scope.displayResponse.status = false;
             $scope.displayResponse.message = response.Status.Message;
         }
     }).error(function(response) {

     });
 }
 $scope.options = {
 	 initialSlide:  (date.getMonth() - 1 ),
     direction: 'horizontal',
     slidesPerView: '3',
     showPager: 'false',
     pagination: 'false',
     loop: true
 };

 $scope.roundedProgressBarDetails = {
     "max": "100",
     "cur": "50",
     "steps": "1250"
 };

 $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
     // data.slider is the instance of Swiper
     $scope.slider = data.slider;
 });

 $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
     console.log('Slide change is beginning');
 });

 $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
     // note: the indexes are 0-based
     if (data.activeIndex == 11) {
         data.activeIndex = -1;
         $scope.activeMonth = 0;
     } else {
         $scope.activeMonth = data.activeIndex + 1;
     }
     $scope.getDetails(data.activeIndex + 2);
 });
 $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

})

