angular.module('starter.secondController', [])
.controller('HealthFitnessOverviewCtrl', function($scope, $state,HealthFitnessOverviewService){
$scope.showError = false;
$scope.showSuccess = true;
	var issueDate = localStorage.getItem('issueDate');
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

		var stdata = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}
	HealthFitnessOverviewService.HealthFitnessOverviewServiceFn(stdata).success(function(response){

	if(response.Status.IsSuccess == true){

	$scope.response = response.FitnessLevel;
	if($scope.response.FitnessLevelStatus != null ){

	var healthStatus = $scope.response.FitnessLevelStatus.toUpperCase()
	
	switch(healthStatus) {
		case 'BRONZE':
			$('.active-image').css('left','11%');
			break;
		case 'SILVER':
			$('.active-image').css('left','33%');
			break;
		case 'GOLD':
			$('.active-image').css('left','55%');
			break;
		case 'PLATINUM':
			$('.active-image').css('left','76%');
			break;
		default:
			$('.active-image').css('left','0px');
	}
	}	
	else{
		$('.active-image').css('display','none');
	}
	}
	else{
		$scope.showError = true;		
		$scope.showSuccess = false;
		$('ion-content').css('background','#0079c2')
	}
    }).error(function(){});

	$scope.healthOverview = function(){
		$state.go('app.myhealthoverviewdetails');
	};	
	
	$scope.fitnessSummary = function(){
		$state.go('app.fitnesSummary');
	};
	
	$scope.offerAnsSavings = function(){
		$state.go('app.offersAndSavings');
	};
	$scope.healthTips = function(){
		$state.go('app.healthTipsList');
	}
	$scope.screeningPrevention = function(){
		$state.go('app.screeningPrevention');
	}
	

	
})
.controller('MyHealthOverviewDetailsCtrl', function($scope, $state){
		  
	  $scope.healthDetails = [
		{ title: 'Alcohol use', status: "true" },
		{ title: 'Blood Sugar', status: "true" },
		{ title: 'Cholestrol', status: "false" },
		{ title: 'Stress', status: "true" },
		{ title: 'Tobacco use', status: "false" },
		{ title: 'BMI', status: "true" },
		{ title: 'Nutrition', status: "false" },
		{ title: 'Blood pressure', status: "true" }
	  ];
	  
	  $scope.labels = ["Download Sales", "In-Store Sales"];
		$scope.data = [400, 500];
	
})

.controller('fitnesSummaryCtrl', function($scope, $state,HealthFitnessOverviewService){
	
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

		var stdata = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate,
			 "policyNumber":policyNumber
			}
	HealthFitnessOverviewService.HealthFitnessOverviewServiceFn(stdata).then(function(response){

		$scope.pointsEarned = 0;
		if(response.data.TotalPointsSummary != undefined){
			$scope.points = response.data.TotalPointsSummary;
			$scope.myDataSource.data = [];

			for(var i=0;i<5;i++){
				$scope.myDataSource.data.push({"value": $scope.points[i].TotalPoints});
			}		
			for(var j = 0;j<response.data.TotalPointsSummary.length;j++){		
				$scope.pointsEarned +=  parseInt(response.data.TotalPointsSummary[j].TotalPoints);
			}
		}
		


			
	});
	
	
	$scope.imgSrc = ["img/icons/icon_points-sleep2.svg","img/icons/icon_points-steps2.svg","img/icons/icon_points-hydration2.svg","img/icons/icon_points-calbrnd2.svg","img/icons/icon_points-heartrate2.svg"]
	$scope.myDataSource = {
		   "chart": {
				showBorder : "0",
				borderThickness : "0",
				canvasBgColor : 'none',
				//showValues : 0,
				showYAxisValues : 0,
				bgColor : '#0079c2',
				"bgAlpha": "100",
				//borderThickness : "10",
				"paletteColors": "#01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe ",
				//"usePlotGradientColor" : 1,
				"plotGradientColor":"#009fff",
				showAlternateHGridColor : 0,
				divLineColor : '#0079c2',
				plotSpacePercent : '50',
				valueFontColor : '#01e9fe ',
				borderColor : "#ffffff"

		   },

		   "annotations": {

			  "autoScale": "0",

			  "scaleImages": "1",

			  "origW": "400",

			  "origH": "300",

			  "groups": [

				 {

					"id": "user-images",

					"items": [

					   {

						  "id": "John-user-icon",

						  "type": "image",

						  "url": "img/icons/icon_points-steps.svg",

						  "x": "$xaxis.label.0.x - 1",

						  "y": "$xaxis.label.0.y - 1"

					   },

					   {

						  "id": "martha-user-icon",

						  "type": "image",

						  "url": "img/icons/icon_points-heartrate.svg",

						  "x": "$xaxis.label.1.x - 10",

						  "y": "$xaxis.label.1.y - 10"

					   },

					   {

						  "id": "Phillips-user-icon",

						  "type": "image",

						  "url": "img/icons/icon_points-calbrnd.svg",

						  "x": "$xaxis.label.2.x - 10",

						  "y": "$xaxis.label.2.y - 10"

					   },

					   {

						  "id": "Terrin-user-icon",

						  "type": "image",

						  "url": "img/icons/icon_points-sleep.svg",

						  "x": "$xaxis.label.3.x - 10",

						  "y": "$xaxis.label.3.y - 10"

					   },

					   {

						  "id": "Tom-user-icon",

						  "type": "image",

						  "url": "img/icons/icon_points-hydration.svg",

						  "x": "$xaxis.label.4.x - 10",

						  "y": "$xaxis.label.4.y - 10"

					   }
					   

					]

				 }

			  ]

		   }
		};
		
		
})

.controller('bloodPressureCtrl', function($scope,  $state,bloodPressureDetailsGraphService){
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

		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,
			 "policyNumber":policyNumber
			}
	



	bloodPressureDetailsGraphService.getAllIndividualDetails(stdata).success(function(response){
		$scope.bpDetails = {
				heathCreditsGained : parseInt(response.data.healthCreditsGained),
				maxHealthCredits : parseInt(response.data.maxHealthCredits),
				currentBpSys : parseInt(response.data.currentBpSys),
				currentBpDia : parseInt(response.data.currentBpDia),
				pulseValue : parseInt(response.data.pulseValue)
		};
		
	var weekView = response.data.bpValues.slice(response.data.bpValues.length-7);
	
	$scope.data = [],$scope.dates=[];
	var locMonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep', 'Oct', 'Nov', 'Dec'];
	for(var i =0;i<weekView.length;i++){
		$scope.data.push({"y":(i+1)+'.1','a':weekView[i].systolic_bp,'b':weekView[i].diastolic_bp});
		var dayMonth = new Date(weekView[i].effective_datetime);
		var finalDay = dayMonth.getDate()+" "+locMonth[dayMonth.getMonth()];
		$scope.dates.push(finalDay);
	}

 $scope.datesLength = 100 / $scope.dates.length;
		Morris.Area({
		element: 'area-example',
		axes : false,
		grid : false,
		data: $scope.data,
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Series A', 'Series B']
	  });
    }).error(function(){});

	
	
})

.controller('bloodPressureSecondCtrl', function($scope,  $state,getBPDetials ){
	$scope.doRefresh = function () {
		console.log("in tr ctrl");
		$state.go($state.current, {}, {reload: true});
	  };
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
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,
			"policyNumber": policyNumber			
			}


  $scope.bpDetails = [];
  getBPDetials.getAllBPDetails(stdata).success(function(response) {
  $scope.bpDetailsSecond = {
				heathCreditsGained : parseInt(response.data.healthCreditsGained),
				maxHealthCredits : parseInt(response.data.maxHealthCredits),
				currentBpSys : parseInt(response.data.currentBpSys),
				currentBpDia : parseInt(response.data.currentBpDia),
				pulseValue : parseInt(response.data.pulseValue)
		};
  		
      var stepsDetailsForDisplay = response.data;
           var weeklyView = stepsDetailsForDisplay.bpValues;
      while (weeklyView.length) {
          var weeklyViewArr = weeklyView.splice(0, 7);
          $scope.bpDetails.push(weeklyViewArr);
      }
  }).error(function(response) {});

			
})

.controller('bloodPressureDetailsCtrl', function($scope, $state,bloodPressureDetailsService){

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

		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,
			"policyNumber": policyNumber			
			}


bloodPressureDetailsService.getAllIndividualDetails(stdata).success(function(response){
	console.log(response);
	console.log(stdata);
	$scope.bpDetails = response.data;

	$scope.bpValues = [170,160,150,140,130,120,110,100,90,80,70];
	$scope.verticalValues = [40,50,60,70,80,90,100];
	$scope.healthCreditsGained = parseInt($scope.bpDetails.healthCreditsGained);
	var sysVal,diaVal;
	sysVal = $scope.bpDetails.currentBpSys;
	diaVal = $scope.bpDetails.currentBpDia;
	//var bpStatus;
	if((sysVal > 70 && sysVal < 90) && (diaVal > 40 && diaVal < 60)){
		$('.a4 img').css('bottom','2px');

	}
	if((sysVal > 91 && sysVal < 120) && (diaVal > 61 && diaVal < 80)){
		$('.a4 img').css({'bottom':'25%','left':'10%'});

	}
	if((sysVal > 121 && sysVal < 140) && (diaVal > 81 && diaVal < 90)){
		$('.a4 img').css({'bottom':'48%','left':'17%'});

	}
	if((sysVal > 141 && sysVal < 170) && (diaVal > 91 && diaVal < 100)){
		$('.a4 img').css({'top':'11%','left':'23%'});

	}


    }).error(function(){});

	 $scope.doRefresh = function () {
		console.log("in tr ctrl");
		$state.go($state.current, {}, {reload: true});
	  };
	 
	
	
	
	/***********************************************/
		
})
.controller('roundBarCtrl', function($scope,getBPDetials, $rootScope){
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

		var bpData = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,
			"policyNumber": policyNumber			
			}

	
	$.fn.drawColsLine = function drawLine(data, colour, cols) {

		var el = $(this);

		function calculate(data, index, d) {
				var valueRatio = data[index] / 100 * d;
				return d - valueRatio;
		};

		data['sorted'] = data.sort(function(a, b) {
				return parseFloat(a.x, 10) - parseFloat(b.x, 10);
		});

		data['y'] = new Array();

		for (var i = 0; i < data['sorted'].length; i++) {
				data['y'][i] = data['sorted'][i].y;
		}

		var canvas = el[0],
				ctx = canvas.getContext('2d');

		var t = 0;
		var interval = setInterval(function() {
				var x = ((canvas.width / cols.length) + parseInt(cols.css('margin-left')) / 2) * t + ((canvas.width / (cols.length * 2)) - parseInt(cols.css('margin-left')));
				var y = calculate(data['y'], t, canvas.height);
				ctx.lineTo(x, y);
				ctx.strokeStyle = colour;
				ctx.moveTo(x, y);
				ctx.stroke();
				t = t + 1;
				if (t > data['sorted'].length) {
						clearInterval(interval);
				}
		}, 800 / data['sorted'].length);
	};

	$.fn.drawLine = function drawLine(data, colour) {

		function calculate(data, index, d, max) {
				var valueRatio = data[index] / max * d - 10;
				return d - valueRatio;
		};

		function getMax(data) {
				return Math.max.apply(null, data);
		}

		data['sorted'] = data.sort(function(a, b) {
				return parseFloat(a.x, 10) - parseFloat(b.x, 10);
		});
		data['x'] = new Array();
		data['y'] = new Array();

		for (var i = 0; i < data['sorted'].length; i++) {
				data['x'][i] = data['sorted'][i].x;
				data['y'][i] = data['sorted'][i].y;
		}

		var canvas = $(this)[0],
				ctx = canvas.getContext('2d'),
				maxx = getMax(data['x']),
				maxy = getMax(data['y']);

		setTimeout(function() {
				var t = 0;
				var interval = setInterval(function() {
						var x = canvas.width - calculate(data['x'], t, canvas.width, maxx);
						var y = calculate(data['y'], t, canvas.height, maxy);
						ctx.lineTo(x, y);
						ctx.strokeStyle = colour;
						ctx.moveTo(x, y);
						ctx.stroke();
						t = t + 1;
						if (t > data['sorted'].length) {
								clearInterval(interval);
						}
				}, 800 / data['sorted'].length);
		}, 500);
	};

	getBPDetials.getAllBPDetails(bpData).then(function(response){
		console.log(response);
		var valSys = parseInt(response.data.data.currentBpSys);		
		$scope.displayValSys = Math.round(valSys/2.3);

		var valDia = parseInt(response.data.data.currentBpDia);		
		$scope.displayValDia = Math.round(valDia/1.8);
		console.log($scope.displayValDia);
		var valPulse = parseInt(response.data.data.pulseValue) || 0;
		$scope.displayValPulse = Math.round(valPulse/3);
		$scope.gotData = true;
		setTimeout(function(){
		if($scope.gotData){
			var data1 = [{
			    x: 50.11,
			    y: 12.31
			}, {
			    x: 9.34,
			    y: 10.34
			}, {
			    x: 5.26,
			    y: 10.26
			}, {
			    x: 16,
			    y: 9
			}, {
			    x: 12.21,
			    y: 8.21
			}, {
			    x: 18.41,
			    y: 13.41
			}, {
			    x: 25.43,
			    y: 14.43
			}, {
			    x: 2.31,
			    y: 23.31
			}, {
			    x: 19.41,
			    y: 13.41
			}, {
			    x: 18.4,
			    y: 11.4
			}, {
			    x: 45.34,
			    y: 28.34
			}, {
			    x: 36.21,
			    y: 15.21
			}];

			var linegraph = $('.line-only').find('canvas');
			linegraph.drawLine(data1, linegraph.css('border-color'));
			var $container = $('#container');

			var $window = $(window);
			var rings = $('.ring-chart');
			var columns = $('.column-chart');
			var bars = $('.bar-chart');
			var colline = $('.line-column-chart');

			var data = new Array();

			rings.each(function() {
			    var chart = $(this);
			    var win_height_padded = $window.height() * 1.1;
			    var scrolled = $window.scrollTop();
			    var offsetTop = chart.parents('.chart-wrap').offset().top;
			    var offsetBottom = chart.parents('.chart-wrap').offset().top + parseInt(chart.parents('.chart-wrap').outerHeight());
			    /* Clipping */
			    var width = chart.width();
			    var height = chart.height();
			    var clipmask = 'rect(0,' + width + 'px,' + height + 'px,' + width / 2 + 'px)';
			    var clipfill = 'rect(0,' + width / 2 + 'px,' + height + 'px,0)';
			    chart.find('.mask').css({
			        'clip': clipmask
			    });
			    chart.find('.mask').find('.fill').css({
			        'clip': clipfill
			    });

			    if (scrolled + win_height_padded > offsetTop) {
			        /* Percentage */
			        var per = parseInt(chart.attr('data-progress'));
			        
			        var csshalf = {
			            '-webkit-transform': 'rotate(' + 180 * per / 100 + 'deg)',
			            'transform': 'rotate(' + 180 * per / 100 + 'deg)'
			        };
			        var cssfull = {
			            '-webkit-transform': 'rotate(' + 360 * per / 100 + 'deg)',
			            'transform': 'rotate(' + 360 * per / 100 + 'deg)'
			        };
			        setTimeout(function() {
			            chart.find('.mask.full').css(csshalf);
			            chart.find('.fill').css(csshalf);
			            chart.find('.fix').css(cssfull);
			        }, 500);
			    } else if (scrolled + win_height_padded < offsetTop) {
			        var cssempty = {
			            '-webkit-transform': 'rotate(0deg)',
			            'transform': 'rotate(0deg)'
			        };
			        setTimeout(function() {
			            chart.find('.mask.full').css(cssempty);
			            chart.find('.fill').css(cssempty);
			            chart.find('.fix').css(cssempty);
			        }, 0);
			    }
			});
			}
		
		},100)
		
	},function(err){
		console.log(err);
	});		

})

.controller('bmiMeasurementsCtrl', function($scope){
	
	$scope.doRefresh = function () {
		console.log("in tr ctrl");
		$state.go($state.current, {}, {reload: true});
	  };
	
	Morris.Area({
		element: 'area-example',
		axes : false,
		grid : false,
		data: [
		  { y: '1.1.', a: 100, b: 90 },
		  { y: '2.1.', a: 75,  b: 65 },
		  { y: '3.1.', a: 50,  b: 40 },
		  { y: '4.1.', a: 75,  b: 65 },
		  { y: '5.1.', a: 50,  b: 40 },
		  { y: '6.1.', a: 75,  b: 65 },
		  { y: '7.1.', a: 100, b: 90 } 
		],
		xkey: 'y',
		ykeys: ['a'],
		labels: ['Series A']
	  });
	  
	$scope.dates = ['29, Aug', '30, Aug', '31, Aug', '1, Sep', '2, Sep', '3, Sep', '4, Sep'];
	$scope.datesLength = 100 / $scope.dates.length;
	
	$scope.bimValue = 24;
	
	$scope.bmiValueDisplay = Math.round(($scope.bimValue* 84)/40);
	
	
})
.controller('pointsStatementCtrl', function($scope,pointsSummaryService,$rootScope) {

    //var imgSrc = ["img/icons/icon-Gymworkout.svg","img/icons/icon_points-calbrnd2.svg","img/icons/icon-Gymworkout.svg","img/icons/icon_points-calbrnd2.svg","img/icons/icon-Gymworkout.svg","img/icons/icon_points-calbrnd2.svg"];
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
			"EffectiveDate": effectiveDate			
			}
	var weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep', 'Oct', 'Nov', 'Dec'];
	$scope.dates = [];
	var d = new Date();
	d = new Date(d.setDate(d.getDate()-4));
		for(var i = 0; i< 70; i++){
			d.setDate(d.getDate()+1);
			var arrs = { "day" : weeks[d.getDay()], "date" : d.getDate(),"month" : months[d.getMonth()] };
			
			$scope.dates.push(arrs);							
		} 
	$scope.myActiveSlide = 4;
	$scope.options = {
		direction: 'horizontal',
	     slidesPerView: '7',
	     showPager: 'false',
	     pagination: 'false',
	     loop: false
	};
	$scope.getMonthFromString = function (mon){
   return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}
 
  $scope.$watch('data.slider', function(slider) {

  });

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {

      $scope.activeDay = data.slider.activeIndex + 3;
      var effDate = data.slider.slides[$scope.activeDay].innerText;
      var finalDate = $scope.getMonthFromString(effDate.slice(7,10))+"-"+effDate.slice(4,6)+"-"+"2016";
      $scope.pointsDeatils();

   
 });

 $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
   
 });

 $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
         $scope.activeDay = parseInt(data.slider.activeIndex + 3);        
         var effDate = data.slider.slides[$scope.activeDay].innerText;
         var finalDate = $scope.getMonthFromString(effDate.slice(7,10))+"-"+effDate.slice(4,6)+"-"+"2016";
 		 $rootScope.$apply();
 		 $scope.pointsDeatils();

 });
$scope.pointsDeatils = function(){
 	pointsSummaryService.pointsSummaryServiceFn(stdata).success(function(response){
 			
 			$scope.pointsSummary = response;

		}).error(function(){});
 }


})
.controller('screeningPreventionCtrl', function($scope, $state,screeningAndPreventionDetailsService){
	
	
	          var issueDate = localStorage.getItem('issueDate');
   console.log(issueDate);

		var date = new Date();
		var getdat = date.getDate();
		var maindat= 0;
		if(getdat.length > 1){
			maindat = date.getDate();
		}else {
			maindat = '0'+date.getDate();
		}
		
		var effectiveDate = (date.getMonth() + 1) + "-" + maindat + "-" + date.getFullYear();
		
		console.log(effectiveDate);
		
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var screeningPreventionDate = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}

		screeningAndPreventionDetailsService.screeningAndPreventionDetails(screeningPreventionDate).then(function(response){
			console.log(response);
			$scope.screeningPrevention = response.data.TotalPointsSummary;
			
			
			$scope.preventionScreening = 0;
			$scope.assesments = 0;
			$scope.vaccination = 0;
			$scope.smokerTest= 0;
			
			angular.forEach($scope.screeningPrevention , function(value, key){

				switch(value.ActivityName){
				case "Prevention_Screening":
					$scope.preventionScreening+=value.TotalPoints;
					break;
				case "Assesments":
					$scope.assesments+=value.TotalPoints;
					break;
				case "Vaccination":
					$scope.vaccination+=value.TotalPoints;
					break;
				case "Smoker Test & Dec":
					$scope.smokerTest+=value.TotalPoints;
					break;
				}
			});
			localStorage.setItem("preventionEranedPoint", $scope.preventionScreening);
			localStorage.setItem("assesmentsEranedPoint", $scope.assesments);
			localStorage.setItem("VaccinationEranedPoint", $scope.vaccination);
			localStorage.setItem("SmokerEranedPoint", $scope.smokerTest);
			
			$scope.myDataSource = {
		   "chart": {
				showBorder : "0",
				borderThickness : "0",
				canvasBgColor : 'none',
				showYAxisValues : 0,
				bgColor : '#0079C2',
				"bgAlpha": "100",
				"canvasBgColor":"#1790e1",
				canvasBgAlpha : "0",
				canvasBgAngle : "60",
				canvasBgRatio : "0,0,0",
				"paletteColors": "#01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe ",
				"plotGradientColor":"#009fff",
				showAlternateHGridColor : 0,
				divLineColor : '#0079C2',
				plotSpacePercent : '20',
				valueFontColor : '#FFFFFF',
				borderColor : "#0079C2"

		   },

		   "annotations": {

			  "autoScale": "0",

			  "scaleImages": "1",

			  "origW": "400",

			  "origH": "300",

			  "groups": [
				 {
					"id": "user-images"
				 }
			  ]
		   },

		   data:[{
				label: "Prevention",
				value: $scope.preventionScreening
			},
			{
				label: "Assesments",
				value: $scope.assesments
			},
			{
				label: "Vaccination",
				value: $scope.vaccination
			},
			{
				label: "Smoker Test",
				value: $scope.smokerTest
			}
			]

		};
			
		})
	$scope.doRefresh = function () {
		$state.go($state.current, {}, {reload: true});
	  };
		$scope.screeningAndPreventionDetails = function(val){
			switch(val){
				case 'preventiveHealthChecks':
				$state.go('app.preventiveHealthChecks');
				break;
				case 'assessments':
				$state.go('app.assessments');
				break;
				case 'vaccinations':
				$state.go('app.vaccinations');
				break;
				case 'nonSmokerDeclaration':
				$state.go('app.nonSmokerDeclaration');
				break;
				default:
        			$state.go('app.screeningPrevention');

			}
		}
});
