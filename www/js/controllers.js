angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
	
		// var logged_User = sessionStorage.getItem('userData');
		// logged_User = JSON.parse(logged_User);
		// $scope.user = logged_User.UserEmailId;
		// console.log($scope.user);

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.logout = function() {
            sessionStorage.clear();
            $state.go('login');
        };	
		
		$scope.gotoAlerts = function(){
			$state.go('app.alerts');
		};

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('HealthTipsListCtrl', function($scope, $stateParams, $state,healthTipsListDataService,LoaderService) {
   healthTipsListDataService.healthTipsListDataServiceFn().success(function(response) {
            // LoaderService.hide();
            $scope.lists = response;

        }).error(function(response) {
           
            // LoaderService.hide();
        });
		
		$scope.displayHealthTips = function(hdate, heading, content, imgUrl){
     
			$state.go('app.healthTips',{"hdate":hdate, "heading" : heading, "content" : content,"imgUrl" : imgUrl});
		};
		
    // $scope.displayHealthTips = function(hdate,heading,content){
    // $state.go('app.healthTips');

  // }
})
.controller('HealthTipsCtrl', function($scope,healthTipsDataService,LoaderService, $stateParams) {

		console.log($stateParams);
		$scope.heading = $stateParams.heading;
		$scope.content = $stateParams.content;
		$scope.hdate = $stateParams.hdate;
    $scope.imgUrl = $stateParams.imgUrl;
   
})
.controller('AlertsCtrl', function($scope,alertsDataService,LoaderService) {

 alertsDataService.alertsDataServiceFn().success(function(response) {
            // LoaderService.hide();
             $scope.alertDetails =  response;
        }).error(function(response) {
             // LoaderService.hide();
        });

    $scope.showNotifications = function(){
        document.getElementsByClassName("notifications")[0].style.backgroundColor = "#fff";
        document.getElementsByClassName("reminders")[0].style.backgroundColor = "#387ef5";
        document.getElementsByClassName("notifications")[0].style.color = "#387ef5";
        document.getElementsByClassName("reminders")[0].style.color = "#fff";
    }
    $scope.showReminders = function(){
		document.getElementsByClassName("notifications")[0].style.backgroundColor = "#387ef5";
       document.getElementsByClassName("reminders")[0].style.backgroundColor = "#fff";
       document.getElementsByClassName("notifications")[0].style.color = "#fff";
       document.getElementsByClassName("reminders")[0].style.color = "#387ef5";
    }
})
.controller('OffersAndSavingsCtrl', function($scope,offersAndSavingsDataService,LoaderService) {
  offersAndSavingsDataService.offersAndSavingsDataServiceFn().success(function(response) {
            // LoaderService.hide();
             $scope.lists =  response;
        }).error(function(response) {
             // LoaderService.hide();
        });


  $scope.displayHealthTips = function(hdate,heading,content){
    $state.go('app.healthTips');

  }
    
})


.controller('homeCtrl', function($scope, LoaderService, $state, newsFeedService) {
		var logged_User = sessionStorage.getItem('userData');
		logged_User = JSON.parse(logged_User);
		$scope.user = logged_User.UserEmailId;
		$scope.phoneNumber = logged_User.UsrPhoneNum;
		console.log($scope.user);
		console.log($scope.phoneNumber);
        // LoaderService.show();
        newsFeedService.newsFeedView().success(function(response) {
            // LoaderService.hide();
            $scope.feeds = response;
            for (var i = 0; i < response.length; i++) {
                var dateFromJson = $scope.feeds[i].newsFeedDate;
                var regexPattern = /\d+/g;
                var timestamp_conversion = $scope.Date = dateFromJson.match(regexPattern)[0];
                $scope.feeds[i].newsFeedDate = timestamp_conversion;
            }
        }).error(function(response) {
            $scope.myvalue = true;
            // LoaderService.hide();
        });
		$scope.gotoMyProfile = function(){
		$state.go('app.myProfile');
		};
		$scope.gotoMyPolicy = function(){
			$state.go('app.myPolicies');
		};
		
		$scope.gotoMyFitDevice = function(){
			$state.go('app.myFitDevice');
		};
		
		$scope.gotoMyhealthOverview = function(){
			$state.go('app.healthfitness');
		};
		
		$scope.viewNewsDetails = function(newsID, MessageBody, newsFeedDate, Headline){
			$state.go('app.newsDetails',{"newsID":newsID, "MessageBody" : MessageBody, "newsFeedDate" : newsFeedDate, "Headline" : Headline});
		};
})

.controller('myProfileCtrl', function($scope, $state, LoaderService, myProfileService) {
		console.log("My Profile Page");
		
		var logged_User = sessionStorage.getItem('userData');
		logged_User = JSON.parse(logged_User);
		$scope.user = logged_User.UserEmailId;
		$scope.phoneNumber = logged_User.UsrPhoneNum;
		console.log($scope.user);
		console.log($scope.phoneNumber);
		
		
		
	  // LoaderService.show();
        myProfileService.myProfileView().success(function(response) {
            // LoaderService.hide();
			$scope.profile = response.data;
					$scope.profile1 = response.data.policyData;
					
					for (var i = 0, l = $scope.profile1.length; i < l; i++) 
					{
					// console.log($scope.profile1[i].Count);
					// console.log($scope.profile1[i].Policy_Status);
					}
			$scope.getCornersCol = function(value){
				switch(value){
					case "I" : return "rcorners1"; break;
					case "S" : 
					case "P" : return "rcorners2"; break;
					case "T" : return "rcorners3"; break;
					
					}
			}
			
			
            // for (var i = 0; i < response.length; i++) {
                // var dateFromJson = $scope.profile[i].newsFeedDate;
                // var regexPattern = /\d+/g;
                // var timestamp_conversion = $scope.Date = dateFromJson.match(regexPattern)[0];
                // $scope.profile[i].newsFeedDate = timestamp_conversion;
            // }
        }).error(function(response) {
            $scope.myvalue = true;
            // LoaderService.hide();
        });
		
		
		
		
		
		$scope.gotoMyPolicy = function(){
			$state.go('app.myPolicies');
		};
		$scope.gotoPointsStatement = function(){
			$state.go('app.pointsStatement');
		};
})
.controller('LoginCtrl', function($scope, authenticationSvc, $ionicPopup, $state, $http, $ionicSideMenuDelegate, onlineStatus, LoaderService) {

    $ionicSideMenuDelegate.canDragContent(false);
    $scope.userCred = {
            //remember: false,
            username: "",
            password: "",
            //submitted:false
        }
        //$scope.isLoggedIn = false;	
    $scope.loginUser = function() {
        console.log("login user");
        //console.log($scope.userCred.remember);			
        if ($scope.userCred.remember) {
            localStorage.username = $scope.userCred.username;
            console.log($scope.userCred.username);
            localStorage.password = $scope.userCred.password;
            console.log($scope.userCred.password);
            login(localStorage.username, localStorage.password);
        } else if (localStorage.username != "" && localStorage.password != "" && localStorage.password != undefined &&
            localStorage.username != undefined) {
            console.log("in local storage");
            login(localStorage.username, localStorage.password);
        } else {
            //console.log($scope.userCred.submitted);
            if ($scope.userCred.submitted) {
                login($scope.userCred.username, $scope.userCred.password);
            } else {
                $state.go('login');
            }
        }
    }

    function login(username, password) {
        // LoaderService.show();
        authenticationSvc.login(username, password).success(function(data) {
            console.log("----" + JSON.stringify(data));
            // LoaderService.hide();
            if (data.IsSuccess) {
                var userData = {
                    UniqueId: data.UniqueId,
                    UserEmailId: data.UserEmailId,
                    UserName: data.UserName,
                    UsrPhoneNum: data.UsrPhoneNum
                };
                sessionStorage.setItem('userData', JSON.stringify(userData));
                $state.go('app.home');
            } else {
                if (data.Message == "User account is not yet activated. Awaiting OTP validation.") {
				console.log("error");
                    $scope.errorMessage = "User account is not yet activated. Awaiting OTP validation.";
                }
            }
        }).error(function(data) {
		console.log("error1")
            // LoaderService.hide();
          if (data.Message == "Login failed.") {
				console.log("error");
                    $scope.errorMessage = "Login failed.";
                }
        });
    }
    $scope.loginUser();
    $scope.signup = function() {
        $state.go('app.signup');
    };
	
	$scope.forgotpass = function() {
        $state.go('app.forgotpassword');
    }


})
.controller('SignupCtrl', function($scope, $state, $ionicPopup,LoaderService,$ionicSideMenuDelegate, $http){

	console.log("SignUp FitBit!!!");	
	$scope.sign= {};	
	$scope.sign.UserPwd = "";
	$scope.submitSignUP = function(){		
	
console.log("SignUp INNNN!!!");	
		
		var formData = {
			UsrPhoneNum : $scope.sign.UsrPhoneNum,
			UserEmailId : $scope.sign.UserEmailId,
			UserPwd : $scope.sign.UserPwd,
			Address : $scope.sign.Address,
			Country : $scope.sign.Country,
			ZipCode : $scope.sign.ZipCode
			
		};
		console.log("SignUp INNNN!!!");	
			// LoaderService.show();
			$http({							
				method : "POST",
				 url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/UserRegistration',
				data : formData,	
				dataType: "json",
				headers : {'Content-Type': 'application/json'}				
			})
			.success(function(data){
			console.log("SUCCESS");	
				// LoaderService.hide();
				if(data.IsSuccess){	
				console.log("IF PART");	
					var alertPopup = $ionicPopup.alert({
                     title: 'Success',
                     template: "User registered successfully"
                    });			
					sessionStorage.setItem('UserEmailId',formData.UserEmailId);							
					$state.go('app.regconfirm');
				}else{
				console.log("ELSE PART");	
					if(data.Message == "Username is already registered." ){
						$scope.errorMessage = "Username is already registered.";
					}else if(data.Message == "Please enter valid username/password." ){
						$scope.errorMessage = "Please enter valid username/password.";
					}
				}	
			})
			.error(function(error){
			console.log("ERROR!!!");	
				// LoaderService.hide();
				$scope.errorMessage = "Service unavailable";
			});		 
	
	}
	$scope.gotologin = function(){
		$state.go('login');
	};	
	$scope.login = function(){
		$state.go('login');
	}
})

.controller('myPoliciesCtrl', function($scope, LoaderService, $state, myPolicyService) {
		$scope.myvalue = false;
		$scope.myvalue1 = false;
		var logged_User = sessionStorage.getItem('userData');
		logged_User = JSON.parse(logged_User);
		$scope.user = logged_User.UserEmailId;
		console.log($scope.user);
	
	
        // LoaderService.show();
        myPolicyService.myPolicyView().success(function(response) {
            // LoaderService.hide();
			if(response.data.policiesData.length !==0){
				 $scope.policies = response.data.policiesData;
			//console.log($scope.policies);
			
			
			$scope.getCornersCol = function(value){
				switch(value){
					case "I" : return "status1"; break;
					case "S" : 
					case "P" : return "status2"; break;
					case "T" : return "status3"; break;
					
					}
			}
			
			$scope.getCornersCol1 = function(value){
				switch(value){
					case "I" : return "amount1"; break;
					case "S" : 
					case "P" : return "amount2"; break;
					case "T" : return "amount3"; break;
					
					}
			}
				}
				else {
					$scope.myvalue1 = true;
					}
           
        }).error(function(response) {
            $scope.myvalue = true;
            // LoaderService.hide();
        });
		$scope.gotoMyProfile = function(){
			$state.go('app.myProfile');	
		};
		$scope.viewPolicyDetails = function(policyNumber){
		var issueDate = new Date(policyNumber.policy_issue_date);
		console.log(issueDate);
		issueDate = (issueDate.getMonth() + 1) + "-" + issueDate.getDate()  + "-" +issueDate.getFullYear();
		localStorage.setItem('issueDate', issueDate);
		localStorage.setItem('policyNumber', policyNumber.policy_number);
			$state.go('app.myPoliciesDetails', {"policyNumber" : policyNumber.policy_number});
		};
})

.controller('NewsFeedCtrl', function($scope,newsFeedService,LoaderService, $state){
 
        newsFeedService.newsFeedView().success(function(response) {
           
            $scope.feeds = response;
            for (var i = 0; i < response.length; i++) {
                var dateFromJson = $scope.feeds[i].newsFeedDate;
                var regexPattern = /\d+/g;
                var timestamp_conversion = $scope.Date = dateFromJson.match(regexPattern)[0];
                $scope.feeds[i].newsFeedDate = timestamp_conversion;
            }
        }).error(function(response) {
            $scope.myvalue = true;
           
        });
		$scope.viewNewsDetails = function(newsID, MessageBody, newsFeedDate, Headline){
			$state.go('app.newsDetails',{"newsID":newsID, "MessageBody" : MessageBody, "newsFeedDate" : newsFeedDate, "Headline" : Headline});
		};
})
.controller('EarnMorePointsCtrl', function($scope,LoaderService,earnMorePointsDataService){
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
		var earnPointsData = {
		"uniqueId": uniqueid,
		"issueDate": issueDate,
		"effectiveDate": effectiveDate,
		"policyNumber":policyNumber,
		};
  earnMorePointsDataService.earnMorePointsDataServiceFn(earnPointsData).success(function(response) {
            $scope.earnMorePointsResponse = response.data;
        }).error(function(response) {  
           
        });
    $scope.displayHealthTips = function(hdate,heading,content){
        $state.go('app.healthTips');
    }
})

.controller('newsDetailsCtrl', function($scope,LoaderService, $stateParams){
  		$scope.Headline = $stateParams.Headline;
		$scope.MessageBody = $stateParams.MessageBody;
		$scope.newsFeedDate = $stateParams.newsFeedDate;
})
.controller('myPoliciesDetailsCtrl', function($scope, LoaderService, $stateParams, $state, myPolicyDetailsService) {
	
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		$scope.user = logged_User.UserEmailId;	
        // LoaderService.show();
		
        myPolicyDetailsService.myPolicyDetailsView(logged_User.UniqueId, $stateParams.policyNumber).success(function(response) {
			$scope.getCornersCol1 = function(value){
				switch(value){
					case "I" : return "amount1"; break;
					case "S" : 
					case "P" : return "amount2"; break;
					case "T" : return "amount3"; break;
					
					}
			}
            // LoaderService.hide();
			$scope.policyDetails = response.data;
        }).error(function(response) {
            // LoaderService.hide();
        });
	$scope.gotoPremiumSavings = function(){
		$state.go('app.premiersavings');
		};
		
		
		$scope.gotoMyhealthOverview = function(){
			$state.go('app.healthfitness');
		};

})

.controller('myFitDeviceCtrl', function($scope,$state,$http, fitbitAuthService){
	$scope.fitbitAddDevice = function(){
		var fitbitUrl ="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=227S8T&redirect_uri=fitbit%3A%2F%2F&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=31536000"

			var ref = window.open(fitbitUrl, '_blank', 'location=yes');
			console.log(ref);
			ref.addEventListener('loadstart', function(event) {
			  console.log(event)
			 
			localStorage.setItem('myURl', event.url);
			 //alert("1"+event.url);
			});

			ref.addEventListener('loadstop',  function(event) {
			 //console.log(event)
			 //alert("2"+event.url);

			localStorage.setItem('myURl', event.url);
			});

			 ref.addEventListener('loaderror',function(event) {
			 var accessToken = (/access_token=([^\&]*)/g).exec(event.url)

			 if(accessToken){
			accessToken = accessToken[1];
			var date = new Date();
			var logged_User = JSON.parse(sessionStorage.getItem('userData'));
			var uniqueid  = logged_User.UniqueId;

			var data = 

			 {
				"uniqueId" : uniqueid,
				"deviceName": "",
				"deviceId": "",
				"userId": "",
				"accessToken": accessToken,
				"refreshToken": "",
				"expiryDate": (date.getFullYear() + 1)+ "-" + (date.getMonth() + 1) + "-" + date.getDate(),
				"registeredDate": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
				"userName": "",
				"Password":""
			}

			var req = {
			 method: 'GET',
			 url: 'https://api.fitbit.com/1/user/-/devices.json',
			 headers: {
			   'Authorization': "Bearer " + accessToken
			 }
			}

			$http(req).then(function(response){
				var dat = response.data[0];
				data.deviceId = dat.id;
				data.deviceName = dat.deviceVersion;

				req.url = "https://api.fitbit.com/1/user/-/profile.json";

				$http(req).then(function(response){
					dat = response.data;
					data.userId = dat.user.encodedId;

					fitbitAuthService.getAllIndividualDetails(data).then(function(response){
					  	console.log(response);
					  	ref.close();
				   });
				})
			

			})

			 //alert("3"+accessToken);
			 localStorage.setItem('accessToken', accessToken);

			  
			  
			 }


			});

}

})
.controller('newAssessmentCtrl', function($scope,$state, $http, newAssessmentService){
	$scope.myvalue = false;
	
	$scope.activityNames = [
		{"ActivityId" : 100004, "SubactivityId" : "100004B" , "Sub_Activity_Name" : "Nutrition Assessment"},
		{"ActivityId" : 100004, "SubactivityId" : "100004A" , "Sub_Activity_Name" : "DENTAL ASSESMENT"},
		{"ActivityId" : 100004, "SubactivityId" : "100004C" , "Sub_Activity_Name" : "Mentally WellBeing"}
	];
	$scope.activityName = $scope.activityNames[0];
	$scope.changedValue=function(item){
		$scope.activityName = item;
    }    
	
	$scope.dateChanged = function(item){
		console.log(item);
		$scope.activityDate = item;
	}
	$scope.selectionChange = function(){ 
	console.log( $scope.activityDate);
		var aDate = new Date($scope.activityDate);
		aDate = (aDate.getMonth() + 1) + "-" + aDate.getDate() + "-" + aDate.getFullYear()
		var item = angular.copy($scope.activityName);
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		item.UniqueId = uniqueid;
		item.EffectiveDate = aDate;
		console.log(item);
		newAssessmentService.newAssessmentView(item).then(function(response){
			console.log(response);
			console.log("Submitted");
			$scope.myvalue = true;
		})
		
	}
})
.controller('newVaccinationCtrl', function($scope,$state, $http, newVaccinationService){
	$scope.myvalue = false;
	console.log("newVaccinationCtrl")
		$scope.activityNames = [
		{"ActivityId" : 100006, "SubactivityId" : "100006A" , "Sub_Activity_Name" : "FLU VACCINATION"},
		{"ActivityId" : 100006, "SubactivityId" : "100006B" , "Sub_Activity_Name" : "PNUEMONOCAL"},
		{"ActivityId" : 100006, "SubactivityId" : "100006C" , "Sub_Activity_Name" : "HPV"}
	];
	$scope.activityName = $scope.activityNames[0];
	$scope.changedValue=function(item){
		$scope.activityName = item;
    }    
	
	$scope.dateChanged = function(item){
		console.log(item);
		$scope.activityDate = item;
	}
	$scope.selectionChange = function(){ 
	console.log( $scope.activityDate);
		var aDate = new Date($scope.activityDate);
		aDate = (aDate.getMonth() + 1) + "-" + aDate.getDate() + "-" + aDate.getFullYear()
		var item = angular.copy($scope.activityName);
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		item.UniqueId = uniqueid;
		item.EffectiveDate = aDate;
		console.log(item);
		newVaccinationService.newVaccinationView(item).then(function(response){
			console.log(response);
			console.log("Submitted");
			$scope.myvalue = true;
		})
		
	}
})
.controller('newDeclarationCtrl', function($scope,$state, $http, nonSmokerDeclarationService){
	$scope.myvalue = false;
	console.log("newDeclarationCtrl");
	$scope.activityNames = [
		{"ActivityId" : 100007, "SubactivityId" : "100007A" , "Sub_Activity_Name" : "Smoker Declaration"},
		{"ActivityId" : 100007, "SubactivityId" : "100007B" , "Sub_Activity_Name" : "SMOKER TEST"}
	];
	$scope.activityName = $scope.activityNames[0];
	$scope.changedValue=function(item){
		$scope.activityName = item;
    }    
	
	$scope.dateChanged = function(item){
		console.log(item);
		$scope.activityDate = item;
	}
	$scope.selectionChange = function(){ 
	console.log( $scope.activityDate);
		var aDate = new Date($scope.activityDate);
		aDate = (aDate.getMonth() + 1) + "-" + aDate.getDate() + "-" + aDate.getFullYear()
		var item = angular.copy($scope.activityName);
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		item.UniqueId = uniqueid;
		item.EffectiveDate = aDate;
		console.log(item);
		nonSmokerDeclarationService.nonSmokerDeclarationView(item).then(function(response){
			console.log(response);
			console.log("Submitted");
			$scope.myvalue = true;
		})
		
	}
})

// .controller('newDeclarationCtrl', function($scope,$state){
  // console.log("newDeclarationCtrl")
// })
.controller('documentsSubmitCtrl', function($scope,$state, $http, documentSubmitService){
	$scope.myvalue = false;
  console.log("documentsSubmitCtrl");
  $scope.docSub = {};
  $scope.dateChanged = function(item){
		console.log(item);
		$scope.EffectiveDate = item;
	}
	$scope.submitDocss = function(item){ 
	console.log(item);
		var aDate = new Date($scope.EffectiveDate);
		item.EffectiveDate = (aDate.getMonth() + 1) + "-" + aDate.getDate() + "-" + aDate.getFullYear()
		
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		item.UniqueId = uniqueid;
		item.ActivityId = 100001;
		item.SubactivityId = "100001A";
		documentSubmitService.documentSubmitView(item).then(function(response){
			console.log(response);
			console.log("Submitted");
			$scope.myvalue = true;
		})
		
	}
})

.controller('roundProgressBarCtrl', function($scope,$location){

 $('.circleSteps').circleProgress({
  value: 0.7,
  size: 1000,
  fill: { color: "#3acbac" },
  color:"#0073b8",
   responsive:"false",   
   thickness:35
}).on('circle-animation-progress', function(e) {
	
	var v = 0;
	var lastSlash = $location.path().lastIndexOf("/");

	switch($location.path().substring(lastSlash+1)){
	case 'preventiveHealthChecks':
		 v = localStorage.getItem("preventionEranedPoint");
		break;
	case 'assessments':
		 v = localStorage.getItem("assesmentsEranedPoint");
		break;
	case 'vaccinations':
		 v = localStorage.getItem("VaccinationEranedPoint");
		break;
	case 'nonSmokerDeclaration':
		 v = localStorage.getItem("SmokerEranedPoint");
		break;
	}
	
  var obj = $(this).data('circle-progress'),
      ctx = obj.ctx,
      s = obj.size,
      
      fill = obj.arcFill;
    ctx1 =  obj.ctx;
  ctx.save();ctx1.save();
  ctx.font = "BOLD " + s / 5.5 + "px sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "#fff";
  ctx.fillText(v, 500, 600);
  ctx.restore();

    ctx1.font = "normal " + s / 9 + "px sans-serif";
  ctx1.textAlign = 'center';
  ctx1.textBaseline = 'hanging';
  ctx1.fillStyle = "#fff"; 
  ctx1.fillText("Earned Points", 500,350);
 
  ctx1.restore();
});

})
.controller('preventiveHealthChecksCtrl', function($scope,getScreeningPreventionInfoService){
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
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var getScreeningPreventionDate = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}

		getScreeningPreventionInfoService.getScreeningPreventionInfoView(getScreeningPreventionDate).then(function(response){
			console.log(response);
			$scope.preventiveHealthChecksDisplay = response.data.ScreeningPreventionList;
		})
})
.controller('assessmentsCtrl', function($scope,getAssessmentInfoService){
console.log("INNNNNNNNNNNNNNN");
           
   console.log(issueDate);
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
		var assessmentDate = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}

		getAssessmentInfoService.getAssessmentInfoView(assessmentDate).then(function(response){
			console.log(response);
			$scope.assessmentsDisplay = response.data.AssessmentList;
		})

})

.controller('vaccinationsCtrl', function($scope,getVaccinationService){

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
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var vaccinationDate = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}

		getVaccinationService.getVaccinationView(vaccinationDate).then(function(response){
			console.log(response);
			$scope.vaccinationsDisplay = response.data.VaccinationList;
		})
})

.controller('nonSmokerDeclarationCtrl', function($scope,getSmokerDeclarationInfoService){

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
		var logged_User = JSON.parse(sessionStorage.getItem('userData'));
		var uniqueid  = logged_User.UniqueId;
		var getSmokerDeclarationDate = 	{
			"UniqueId": uniqueid,
			"IssueDate": issueDate,
			"EffectiveDate": effectiveDate
			}

		getSmokerDeclarationInfoService.getSmokerDeclarationInfoView(getSmokerDeclarationDate).then(function(response){
			console.log(response);
			$scope.nonSmokerDeclarationDisplay = response.data.SmokerDeclarations;
		})
})
.controller('roundProgressBarEffAgeCtrl', function($scope){
 $('.roundProgressBarEffAge').circleProgress({
  value: 0.7,
  size: 1000,
  fill: { color: "#AEDC22" },
  color:"#0073b8",
   responsive:"false",   
   thickness:35
}).on('circle-animation-progress', function(e) {
var v = 57;
  var obj = $(this).data('circle-progress'),
      ctx = obj.ctx,
      s = obj.size,
      
      fill = obj.arcFill;
    ctx1 =  obj.ctx;
  ctx.save();ctx1.save();
  ctx.font = "BOLD " + s / 5.5 + "px sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "#fff";
  ctx.fillText(v, 500, 600);
  ctx.restore();

    ctx1.font = "normal " + s / 9 + "px sans-serif";
  ctx1.textAlign = 'center';
  ctx1.textBaseline = 'hanging';
  ctx1.fillStyle = "#fff"; 
  ctx1.fillText("Effective Age", 500,350);
 
  ctx1.restore();
});
   


})
.controller('roundProgressBarStepsCtrl', function($scope,$rootScope){
 $('.roundProgressBarSteps').circleProgress({
  value: 0.7,
  size: 1000,
  fill: { color: "#3acbac" },
  color:"#0073b8",
   responsive:"false",   
   thickness:35
}).on('circle-animation-progress', function(e) {
var v = $rootScope.steps;
  var obj = $(this).data('circle-progress'), ctx = obj.ctx,s = obj.size,fill = obj.arcFill;
   ctx.save();
  ctx.font = "BOLD " + s / 5.5 + "px sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = "#fff";
  ctx.fillText(v, 500, 500);
  ctx.restore();

});



})
.controller('RegConfirmCtrl', function($scope,$ionicPopup,$ionicHistory, LoaderService, $state, $http, $ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	var UserEmailId = sessionStorage.getItem('UserEmailId');
	console.log(UserEmailId);
	   
    $scope.confirmReg = function(OTP) {       
	console.log(OTP);
	// LoaderService.show();
        $http({
                method: "GET",
				// url: 'http://52.74.92.122/EnterpriseServices/KudoService/KudoMobileService.svc/OTP?useremail='+email+'&OTP='+OTP+'&Purpose=Registration',
				
				url: 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/ValidateOTP?username='+UserEmailId+'&OTP='+OTP,
				
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(response) {
				// LoaderService.hide();
				if(response.IsSuccess){	
					var alertPopup = $ionicPopup.alert({
						 title: 'Success',
						 template: "Registration confirmed successfully"
						});	
					//alert('Registration Confirmed Successfully...!!! ');
					$state.go('login');
				}else{
					var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: "Invalid OTP"
                    });	
				}
				
            })
            .error(function(error) {
				// LoaderService.hide();
				var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: "Service unavailable"
				});	
            }); 
    }
	
	$scope.myGoBack = function() {
	// alert("IIII")
		$ionicHistory.goBack();
	};
})
.controller('ForgotPassCtrl', function($scope,$ionicHistory, $ionicPopup,LoaderService, $state, $http, $ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	//var email = sessionStorage.getItem('usermail');
	//console.log(email);
	   
    $scope.confirmEmail = function(username) {       
	console.log(username);
	
	var str = username;
    // var patt = new RegExp("@trianz");
    // var res = patt.test(str);
		
			// LoaderService.show();
			$http({
					method: "GET",
					// url: 'http://52.74.92.122/EnterpriseServices/KudoService/KudoMobileService.svc/Forgotpassword?email='+Email,
					url: 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/ForgotPassword?username='+username,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.success(function(response) {
					// LoaderService.hide();
					if(response.IsSuccess){
						var alertPopup = $ionicPopup.alert({
						 title: 'Success',
						 template: "Email submitted successfully"
						});	
						  //alert('Email Submitted Suucessfully...!!! ');
						  sessionStorage.setItem('username',username);
						  $state.go('app.newpassword');
					}else{
						var alertPopup = $ionicPopup.alert({
						 title: 'Error',
						 template: "Invalid Email"
						});
					}
					
				})
				.error(function(error) {
					// LoaderService.hide();
					var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: "Service unavailable"
					});					 
				//alert('Email Not Submitted...!!');
				}); 
		}       
   
	
	$scope.myGoBack = function() {
		$ionicHistory.goBack();
	};
})
.controller('NewPasswordCtrl', function($scope, $ionicHistory,LoaderService,$ionicPopup, $state, $http, $ionicSideMenuDelegate) {
	$ionicSideMenuDelegate.canDragContent(false);
	var username = sessionStorage.getItem('username');
	console.log(username);
	
	   
    $scope.confirmNewPass = function(Newpassword,OTP) {       
	console.log(Newpassword);
	console.log(OTP);
	// debugger;
	if(Newpassword === undefined || Newpassword === "" || OTP === undefined || OTP === "" ){	
		//alert('hi')	;
		$scope.errorMessage='Please enter all the details';
	}else{
	// LoaderService.show();
        $http({
                method: "POST",
                
				// url: 'http://52.74.92.122/EnterpriseServices/KudoService/KudoMobileService.svc/changepassword?email='+email+'&newPassword='+Newpassword+'&OTP='+OTP+'&Purpose=Forgot',
				
				url: 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/ChangePassword?username='+username+'&OTP='+OTP+'&password='+Newpassword,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function(response) {
				// LoaderService.hide();
				if(response.IsSuccess){			
					var alertPopup = $ionicPopup.alert({
						 title: 'Success',
						 template: "Password changed successfully"
						});
				  //alert('Password Changed Successfully...!!! ');
				  $state.go('login');
				}else{
					var alertPopup = $ionicPopup.alert({
						 title: 'Error',
						 template: "Invalid OTP"
						});
				}
				
            })
            .error(function(error) {
				// LoaderService.hide();
				var alertPopup = $ionicPopup.alert({
                     title: 'Error',
                     template: "Service unavailable"
				});	
             // alert('Password Changed Failed...!!');
            }); 
    }
	}
	
	$scope.myGoBack = function() {
		$ionicHistory.goBack();
	};
})

