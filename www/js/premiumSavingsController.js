angular.module('starter.premiumSavingsController', [])

.controller('premierSavingsCtrl',function($scope, premierSavingsService, $state,getPdata,$rootScope){
	$scope.myvalue1 = false;
   		var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var effectiveDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		
		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,
			 "policyNumber":policyNumber
			}
$rootScope.formatsForSavings = "";
	$scope.labels = [];
	$scope.data = [];
	$scope.colors = ['#FFAC1E', '#93ED7C', '#F92E88', '#00BAFF'];
	//  For diaplying list with color bixes
	premierSavingsService.getAllSavingServices().then(function(response){
		$scope.descriptions = response.data;
	});

	// Showing values for pie chart
	getPdata.getAllIndividualDetails(stdata).then(function(response){
		if(response && (response.status == true || response.status == 200))
		{

		$rootScope.formatsForSavings = 'Premium saved '+response.data.data.totalSavings+'% / ';
		$rootScope.formatsForSavings+= 'max '+response.data.data.maxPercent+'%\n';
		$rootScope.formatsForSavings+= 'Health credits '+response.data.data.creditsGained;
	     
	premierSavingsService.getPremiumPieChartValues().then(function(response){
			
		$scope.maindata = response.data;
		angular.forEach(response.data,function(value,key){
					
		}); 
		var datas = [{"label":"BMI","value":250},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":250}];
		
		function graphDonut(colors) {
			var donut = Morris.Donut({
				element: 'pchart',
				colors : colors,
				data   :datas,
				formatter: function (x) { return $scope.formatsForSavings }
				}).on('click', function(i, row){
								  //alert(i);
				 if(i==0){
						$state.go('app.bmiSavings');
					}
					else if(i==1) {
						$state.go('app.cholestrolSavings');
					}
					else if(i==2) {
						$state.go('app.bpSavings');
					}
					else if(i==3) {
						$state.go('app.fitnessReward');
					}
					else {
						$state.go('app.premiersavings');
					}
				});
				donut.select(8);
		}
		graphDonut( ['#FFAC1E', '#93ED7C', '#F92E88', '#00BAFF'] );										
	});

	}
	else{
			$scope.myvalue1 = true;
	}
	});
	
		$scope.data = {};
		  $scope.data.bgColors = [];
		  $scope.data.currentPage = 0;

		  for (var i = 0; i < 10; i++) {
			$scope.data.bgColors.push("bgColor_" + i);
		  }

		  var setupSlider = function() {
			//some options to pass to our slider
			$scope.data.sliderOptions = {
			  initialSlide: 0,
			  direction: 'horizontal', //or vertical
			  speed: 300 //0.3s transition
			};

			//create delegate reference to link with slider
			$scope.data.sliderDelegate = null;

			//watch our sliderDelegate reference, and use it when it becomes available
			$scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
			  if (newVal != null) {
				$scope.data.sliderDelegate.on('slideChangeEnd', function() {
				  $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
				  //use $scope.$apply() to refresh any content external to the slider
				  $scope.$apply();
				});
			  }
			});
		  };

		  setupSlider();
		  
		  $scope.changeIndex = function(ind){
			  $scope.data.sliderDelegate.activeIndex = ind;
			 
		  }
		
})
.controller('premierSavingIndividualDetailsCtrl', function($scope, $stateParams,$state, premierSavingIndividualDetailsService, premierSavingsService){
	var urlParam = $stateParams.savingId;

	premierSavingIndividualDetailsService.getAllIndividualDetails(urlParam).then(function(response){
		var datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		var selectedIndex = 0;
		selectedIndex = urlParam;
		var origionalColors = ['#FFAC1E', '#93ED7C', '#F92E88', '#00BAFF','#000000'];
		
		$scope.presentColor = origionalColors[selectedIndex];
		graphDonut();
		
		function graphDonut() {
		 var donut = Morris.Donut({
				element: 'chart',
				colors : origionalColors,
				data   :datas,
				formatter: function (x) { return x }
				}).on('click', function(i, row){
				
				  $state.go('app.premierSavingIndividualDetails', {"savingId": i});
				});
				
				
				donut.select(selectedIndex);			
		}
			
		});
				
	premierSavingsService.getPremiumPieChartValues().then(function(response){
		$scope.maindata = response.data;	
	});

	$scope.attrs = {
			//"caption": "Sales - 2012 v 2013",
			//"numberprefix": "$",
			"plotgradientcolor": "",
			"bgcolor": "FFFFFF",
			"showalternatehgridcolor": "0",
			"divlinecolor": "CCCCCC",
			"showvalues": "0",
			"showcanvasborder": "0",
			"canvasborderalpha": "0",
			"canvasbordercolor": "CCCCCC",
			"canvasborderthickness": "1",
			"yaxismaxvalue": "25",
			"captionpadding": "30",
			"linethickness": "1",
			"yaxisvaluespadding": "15",
			"legendshadow": "0",
			"legendborderalpha": "0",
			"palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
			"showborder": "0"
		};

		$scope.categories = [
			{
				"category": [				
					{
						"label": "Mar"
					},
					{
						"label": "Apr"
					},
					{
						"label": "May"
					},
					{
						"label": "Jun"
					},
					{
						"label": "Jul"
					},
					{
						"label": "Aug"
					},
					{
						"label": "Sep"
					}
				]
			}
		];

		$scope.dataset = [
			{
				"data": [
					{
						"value": "25.3"
					},
					{
						"value": "25"
					},
					{
						"value": "23.5"
					},
					{
						"value": "23"
					},
					{
						"value": "22.5"
					},
					{
						"value": "22"
					},
					{
						"value": "15"
					}
				]
			},
			{
				//"seriesname": "2012",
				"data": [
					{
						"value": "18.5"
					},
					{
						"value": "18.5"
					},
					{
						"value": "18.5"
					},
					{
						"value": "18.5"
					},
					{
						"value": "18.5"
					},
					{
						"value": "18.5"
					}
					,
					{
						"value": "18.5"
					}
				]
			}
		];
		
})
.controller('bmiSavingsCtrl', function($scope, $stateParams,$state, bmiSavingsService, myProfileService,$rootScope,getFitnessData){
		$scope.showError = false;
		$scope.showSuccess = true;
	    var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var effectiveDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		$scope.categories = [];
		$scope.dataset = [];
		var currentUW,issueUW,bmiCat = {"category":[]}, bmiData = {"data":[]};
		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,			
			 "policyNumber":policyNumber
			}
		

	
	var urlParam = $stateParams.savingId;
	var d,n,disMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	
	bmiSavingsService.getAllIndividualDetails(stdata).then(function(response){
		
		if(response && (response.status == true || response.status == 200))
		{

		for(var i =0;i<response.data.data.values.length;i++){
			bmiData.data.push({"value":response.data.data.values[i].bmi});
			d = new Date(response.data.data.values[i].log_date);
    		bmiCat.category.push({"label":disMonths[d.getMonth()]});
		}
		$scope.categories.push(bmiCat);
		$scope.dataset.push(bmiData);
		
		currentUW = response.data.data.currentUW;
		issueUW = response.data.data.issueUW;
		
		if(issueUW.trim() == "PP"){
			$('.pre-p').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "P"){
			$('.pre').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SP"){
			$('.st-plus').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "S"){
		
			$('.st').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SS"){
			$('.sub-st').css({'background':'#f2b133','color':'#fff'});
		}

		if(currentUW.trim() == "PP"){
			$('.pre-p').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css('margin-top','-25px');
		}
		else if(currentUW.trim() == "P"){
			$('.pre').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'20%'});
		}
		else if(currentUW.trim() == "SP"){
			$('.st-plus').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'40%'});
		}
		else if(currentUW.trim() == "S"){
			
			$('.st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'60%'});
		}
		else if(currentUW.trim() == "SS"){
			$('.sub-st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'80%'});
		}
		$scope.heathCreditsGained = parseInt(response.data.data.healthCreditsGained);
		$scope.maxHealthCredits = parseInt(response.data.data.maxHealthCredits);
		$scope.bmiNextCredit = parseInt(response.data.data.bmiNextCredit);
		
		
		$scope.colors = ['#F2B133', '#93ED7C', '#F92E88', '#00BAFF'];
		
		//var datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		$scope.datas = [{"label":"BMI","value":response.data.data.savedPercent.toFixed(2)+'% / max '+response.data.data.maxPercent+'%'},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		var selectedIndex = 0;
		selectedIndex = urlParam;
		var origionalColors = ['#FFAC1E', '#0F6F99', '#0F6F99', '#0F6F99','#0F6F99'];
				
		$scope.presentColor = '#F2B133';
		graphDonut();
		//$scope.$apply();
		function graphDonut() {
		 var donut = Morris.Donut({
				element: 'bmichart',
				colors : origionalColors,
				data   :$scope.datas,
				formatter: function (x) { return x }
				}).on('click', function(i, row){
					
					if(i==0){
						$state.go('app.bmiSavings');
					}
					else if(i==1) {
						$state.go('app.cholestrolSavings');
					}
					else if(i==2) {
						$state.go('app.bpSavings');
					}
					else if(i==3) {
						$state.go('app.fitnessReward');
					}
					else {
						$state.go('app.premiersavings');
					}
				  
				});
				//console.log(selectedIndex);
				
				donut.select(0);			
		}
			$scope.attrs = {
			
			"plotgradientcolor": "",
			"bgcolor": "FFFFFF",
			"showalternatehgridcolor": "0",
			"divlinecolor": "CCCCCC",
			"showvalues": "0",
			"showcanvasborder": "0",
			"canvasborderalpha": "0",
			"canvasbordercolor": "CCCCCC",
			"canvasborderthickness": "1",
			"yaxismaxvalue": "25",
			"captionpadding": "30",
			"linethickness": "1",
			"yaxisvaluespadding": "15",
			"legendshadow": "0",
			"legendborderalpha": "0",
			"palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
			"showborder": "0"
		};
	}
	else{
		$scope.showError = true;
		$scope.showSuccess = false;
		$('ion-content').css('background','#0079c2')
	}
		});

		
	
})
.controller('fitnessRewardCtrl', function($scope, $state, getFitnessData,HealthFitnessOverviewService){
		$scope.showError = false;
		$scope.showSuccess = true;
		var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var effectiveDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		
		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,			
			 "policyNumber":policyNumber
			}


	getFitnessData.getAllIndividualDetails(stdata).then(function(response){
	if(response && (response.status == true || response.status == 200))
	{
	$scope.healthCreditsGained = response.data.data.healthCreditsGained;
	$scope.maxHealthCredits = response.data.data.maxHealthCredits;
		if(response.status == 200){
			$scope.fitSecSaved = response.data.data.savedPercent;
			$scope.fteSecMax = response.data.data.maxPercent;
		if(response.data.data.fitnessLevel.FitnessLevelStatus != null){
			
			var healthStatus = response.data.data.fitnessLevel.FitnessLevelStatus.toUpperCase();
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
	
		$scope.pointsEarned = 0;
		$scope.points = response.data.data.totalPointsSummary;
	
		$scope.myDataSource.data = [];

		for(var i=0;i<5;i++){
			$scope.myDataSource.data.push({"value": $scope.points[i].TotalPoints});
		}
		for(var j = 0;j<response.data.data.totalPointsSummary.length;j++){			
			$scope.pointsEarned +=  parseInt(response.data.data.totalPointsSummary[j].TotalPoints);
		}
		$scope.colors = ['#F2B133', '#93ED7C', '#00BAFF', '#F92E88'];
		
		$scope.datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":$scope.fitSecSaved+'% / max '+$scope.fteSecMax+"%"}];
		var selectedIndex = 0;
		var origionalColors = ['#0F6F99', '#195B98', '#0F6F99', '#F92E88'];
				
		$scope.presentColor = '#F92E88';
		graphDonut();
		
		function graphDonut() {
		 var donut = Morris.Donut({
				element: 'chartfitness',
				colors : origionalColors,
				data   :$scope.datas,
				formatter: function (x) { return x }
				}).on('click', function(i, row){
				
				  if(i==0){
						$state.go('app.bmiSavings');
					}
					else if(i==1) {
						$state.go('app.cholestrolSavings');
					}
					else if(i==2) {
						$state.go('app.bpSavings');
					}
					else if(i==3) {
						$state.go('app.fitnessReward');
					}
					else {
						$state.go('app.premiersavings');
					}
				});
							
				donut.select(3);			
		}
	}
	else{
		$scope.showError = true;
		$scope.showSuccess = false;
		$('ion-content').css('background','#0079c2')
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
				bgColor : '#ffffff',
				"bgAlpha": "100",
				"canvasBgColor":"#1790e1",
				canvasBgAlpha : "0",
				canvasBgAngle : "60",
				canvasBgRatio : "0,0,0",
				//borderThickness : "10",
				"paletteColors": "#01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe , #01e9fe ",
				//"usePlotGradientColor" : 1,
				"plotGradientColor":"#009fff",
				showAlternateHGridColor : 0,
				divLineColor : '#fff',
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

.controller('cholestrolSavingsCtrl', function($scope, $state, cholestrolSavingsService){
	$scope.showError = false;
	$scope.showSuccess = true;
	$scope.dataset = [],$scope.categories=[];
	
	     var issueDate = localStorage.getItem('issueDate');
        var policyNumber = localStorage.getItem('policyNumber');
        var date = new Date();
        var effectiveDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
        var logged_User = JSON.parse(sessionStorage.getItem('userData'));
        var uniqueid  = logged_User.UniqueId;
        
        var stdata =    {
            "uniqueId": uniqueid,
            "issueDate": issueDate,
            "effDate": effectiveDate,           
             "policyNumber":policyNumber
            }
	var d,n,disMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
cholestrolSavingsService.getAllIndividualDetails(stdata).then(function(response){
console.log(response);
if(response && (response.status == true || response.status == 200))
{
$scope.healthCreditsGained = parseInt(response.data.data.healthCreditsGained);
$scope.maxHealthCredits = response.data.data.maxHealthCredits;
$scope.cholestNextCredit = response.data.data.cholestNextCredit;
		$scope.chlResponse=[], $scope.chlResponseDates=[];

		var ds = {data:[]},cs = {category:[]};
		for(var i =0;i<response.data.data.cholestMonthlyData.length;i++){

			ds.data.push({"value" : response.data.data.cholestMonthlyData[i].avg});
			
		 	d = new Date(response.data.data.cholestMonthlyData[i].pgdate_part);
  			n = d.getMonth();
  			
  			if(n == 0){
    		 		n=disMonths[0];
    		 }else if(n == 1){n=disMonths[1];}else if(n == 2){n=disMonths[2];}else if(n == 3){n=disMonths[3];}else if(n == 4){n=disMonths[4];}else if(n == 5){n=disMonths[5];}else if(n == 6){n=disMonths[6];}else if(n == 7){n=disMonths[7];}else if(n == 8){n=disMonths[8];}else if(n == 9){n=disMonths[9];}else if(n == 10){n=disMonths[10];}else if(n == 11){n=disMonths[11];}

    		 cs.category.push({"label" : n});
  			$scope.chlResponseDates.push(n);

		}
		$scope.dataset.push(ds);
		$scope.categories.push(cs);
		var currentUW = response.data.data.currentUW;
		var issueUW = response.data.data.issueUW;
		
		if(issueUW.trim() == "PP"){
			$('.pre-p').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "P"){
			$('.pre').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SP"){
			$('.st-plus').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "S"){
		
			$('.st').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SS"){
			$('.sub-st').css({'background':'#f2b133','color':'#fff'});
		}

		if(currentUW.trim() == "PP"){
			$('.pre-p').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css('margin-top','-25px');
		}
		else if(currentUW.trim() == "P"){
			$('.pre').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'20%'});
		}
		else if(currentUW.trim() == "SP"){
			$('.st-plus').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'40%'});
		}
		else if(currentUW.trim() == "S"){
			
			$('.st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'60%'});
		}
		else if(currentUW.trim() == "SS"){
			$('.sub-st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'80%'});
		}
		$scope.colors = ['#F2B133', '#93ED7C', '#F92E88', '#00BAFF'];
		
		//var datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		$scope.datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":response.data.data.savedPercent.toFixed(2)+"% / max "+response.data.data.maxPercent+"%"},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		var selectedIndex = 0;
		//selectedIndex = urlParam;
		var origionalColors = ['#1A5C99', '#93ED7C', '#0F6F99', '#006999'];
				
		$scope.presentColor = '#93ED7C';
		graphDonut();
		//$scope.$apply();
		function graphDonut() {
		 var donut = Morris.Donut({
				element: 'chlchart',
				colors : origionalColors,
				data   :$scope.datas,
				formatter: function (x) { return x }
				}).on('click', function(i, row){
					
					if(i==0){
						$state.go('app.bmiSavings');
					}
					else if(i==1) {
						$state.go('app.cholestrolSavings');
					}
					else if(i==2) {
						$state.go('app.bpSavings');
					}
					else if(i==3) {
						$state.go('app.fitnessReward');
					}
					else {
						$state.go('app.premiersavings');
					}
				  
				});
				//console.log(selectedIndex);
				
				donut.select(1);			
		}
	}else {
		$scope.showError = true;
		$scope.showSuccess = false;
		$('ion-content').css('background','#0079c2')
	}
	});
				
	$scope.attrs = {
			//"caption": "Sales - 2012 v 2013",
			//"numberprefix": "$",
			"plotgradientcolor": "",
			"bgcolor": "FFFFFF",
			"showalternatehgridcolor": "0",
			"divlinecolor": "CCCCCC",
			"showvalues": "0",
			"showcanvasborder": "0",
			"canvasborderalpha": "0",
			"canvasbordercolor": "CCCCCC",
			"canvasborderthickness": "1",
			"yaxismaxvalue": "25",
			"captionpadding": "30",
			"linethickness": "1",
			"yaxisvaluespadding": "15",
			"legendshadow": "0",
			"legendborderalpha": "0",
			"palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
			"showborder": "0"
		};

		
})

.controller('bpSavingsCtrls', function($scope,$state, fitnessRewardService){
		$scope.showError = false;
		$scope.showSuccess = true;
		var disMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	    var issueDate = localStorage.getItem('issueDate');
   		var policyNumber = localStorage.getItem('policyNumber');
		var date = new Date();
		var effectiveDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		
		var stdata = 	{
			"uniqueId": uniqueid,
			"issueDate": issueDate,
			"effDate": effectiveDate,			
			 "policyNumber":policyNumber
			}



	$scope.dataset = [],$scope.categories=[];
	fitnessRewardService.getAllIndividualDetails(stdata).then(function(response){
		
	if(response && (response.status == true || response.status == 200)){
		$scope.bpdatas = response.data.data;	

		var ds = {data:[]},newds = {data:[]}, cs = {category:[]};
		for(var i =0;i<response.data.data.bpMonthlyData.length;i++){

			ds.data.push({"value" : response.data.data.bpMonthlyData[i].diastolic_bp});
			newds.data.push({"value" : response.data.data.bpMonthlyData[i].systolic_bp});
			
		 	d = disMonths[response.data.data.bpMonthlyData[i].pgdate_part] || "";
		 	
  			cs.category.push({"label" : d});
  			
		}
		
		$scope.dataset.push(ds);
		$scope.dataset.push(newds);

		$scope.categories.push(cs);
		
		var currentUW = response.data.data.currentUW;
		var issueUW = response.data.data.issueUW;
		
		if(issueUW.trim() == "PP"){
			$('.pre-p').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "P"){
			$('.pre').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SP"){
			$('.st-plus').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "S"){
		
			$('.st').css({'background':'#f2b133','color':'#fff'});
		}
		else if(issueUW.trim() == "SS"){
			$('.sub-st').css({'background':'#f2b133','color':'#fff'});
		}

		if(currentUW.trim() == "PP"){
			$('.pre-p').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css('margin-top','-25px');
		}
		else if(currentUW.trim() == "P"){
			$('.pre').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'20%'});
		}
		else if(currentUW.trim() == "SP"){
			$('.st-plus').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'40%'});
		}
		else if(currentUW.trim() == "S"){
			
			$('.st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'60%'});
		}
		else if(currentUW.trim() == "SS"){
			$('.sub-st').css({'background':'#00A652','color':'#fff'});
			$('.pre-img').css({'margin-top':'-25px','margin-left':'80%'});
		}
		
		$scope.colors = ['#F2B133', '#93ED7C', '#F92E88', '#00BAFF'];
		
		//var datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":250},{"label":"Fitness Reward Saving","value":100}];
		$scope.datas = [{"label":"BMI","value":300},{"label":"Cholestrol","value":250},{"label":"Blood Pressure","value":$scope.bpdatas.savedPercent.toFixed(2)+"% / max "+$scope.bpdatas.maxPercent+' %'},{"label":"Fitness Reward Saving","value":100}];
		var selectedIndex = 0;
		//selectedIndex = urlParam;
		var origionalColors = ['#1A5C99', '#006999', '#00BAFF', '#006999'];
				
		$scope.presentColor = '#93ED7C';
		graphDonut();
		//$scope.$apply();
		function graphDonut() {
		 var donut = Morris.Donut({
				element: 'pbpchart',
				colors : origionalColors,
				data   :$scope.datas,
				formatter: function (x) { return x }
				}).on('click', function(i, row){
					
					if(i==0){
						$state.go('app.bmiSavings');
					}
					else if(i==1) {
						$state.go('app.cholestrolSavings');
					}
					else if(i==2) {
						$state.go('app.bpSavings');
					}
					else if(i==3) {
						$state.go('app.fitnessReward');
					}
					else {
						$state.go('app.premiersavings');
					}
				  
				});
				//console.log(selectedIndex);
				
				donut.select(2);			
		}
		
		}else{
		$scope.showError = true;
		$scope.showSuccess = false;
		$('ion-content').css('background','#0079c2')
	}	
	});
				
	$scope.attrs = {
			//"caption": "Sales - 2012 v 2013",
			//"numberprefix": "$",
			"plotgradientcolor": "",
			"bgcolor": "FFFFFF",
			"showalternatehgridcolor": "0",
			"divlinecolor": "CCCCCC",
			"showvalues": "0",
			"showcanvasborder": "0",
			"canvasborderalpha": "0",
			"canvasbordercolor": "CCCCCC",
			"canvasborderthickness": "1",
			"yaxismaxvalue": "25",
			"captionpadding": "30",
			"linethickness": "1",
			"yaxisvaluespadding": "15",
			"legendshadow": "0",
			"legendborderalpha": "0",
			"palettecolors": "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
			"showborder": "0"
		};

		
});