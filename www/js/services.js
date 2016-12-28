angular.module('starter.services', [])

.factory('newsFeedService', function($http) {
    
    var service = {};
     service.newsFeedView = function() {
        return $http({
            method: 'GET',
			//url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
			url: "data/newsFeed.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('newsFeedDetailsService', function($http) {
    
    var service = {};
     service.newsFeedDetailsView = function() {
        return $http({
            method: 'GET',
			//url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
			url: "data/newsFeed.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})


// .factory('PostSignupData', function($http, $q) {

        // var service = {};
        // service.submitSignup = function(signup) {
            // return $http({
                // method: 'POST',
                // url: 'http://172.16.0.217/EnterpriseServices/kudosmobileservice/KudoMobileService.svc/Registration',
                // cache: false,
                // headers: {
                    // 'Content-Type': 'x-www-form-urlencoded'
                // }, // set the headers so angular passing info as form data (not request payload)
                // data: signup
            // });
        // };
        // return service;
		// })

.factory('LoaderService',function($ionicLoading){
  var service = {};
  service.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
    });
  };

  service.hide = function(){
    $ionicLoading.hide();
  };
  return service;
})
.factory('onlineStatus', ["$window", "$rootScope", function($window, $rootScope) {
        var onlineStatus = {};

        onlineStatus.onLine = $window.navigator.onLine;

        onlineStatus.isOnline = function() {
            return onlineStatus.onLine;
        }

        $window.addEventListener("online", function() {
            onlineStatus.onLine = true;
            $rootScope.$digest();
        }, true);

        $window.addEventListener("offline", function() {
            onlineStatus.onLine = false;
            $rootScope.$digest();
        }, true);

        return onlineStatus;
    }])
	
.factory("authenticationSvc", ['$rootScope','$http', '$q', '$window',function($rootScope,$http, $q, $window) {
var userData;
var service = {};

    service.login =  function(username, password) {
  //  var deferred = $q.defer();	
    return  $http({
			method : "GET",
			// url : 'http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/kudologin?Username='+Username+'&Password='+Password,
			
			url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/Login?username='+username+'&password='+password ,
			
			headers: {
					'Content-Type': 'application/json'
			}		
			})		
		//return deferred.promise;
	};
	service.logout = function() {
		//var deferred = $q.defer();
		$window.sessionStorage["userData"] = null;
		userData = null;
		//return deferred.promise;
	}
  return service;
 
}])
.factory('healthTipsListDataService', function($http) {
    
    var service = {};
     service.healthTipsListDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "data/healthTipsList.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('healthTipsDataService', function($http) {
    
    var service = {};
     service.healthTipsDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "data/healthTips.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory("HealthFitnessOverviewService", ['$rootScope','$http', '$q', '$window',function($rootScope,$http, $q, $window) {

	var service = {};

		service.getFitnessDetails =  function() {
	  //  var deferred = $q.defer();	
		/* return  $http({
				method : "GET",
				// url : 'http://172.16.0.217/EnterpriseServices/kudosmobileservice/KudoMobileService.svc/kudologin?Username='+Username+'&Password='+Password,
				url : 'http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/kudologin?Username='+Username+'&Password='+Password,
				headers: {
						'Content-Type': 'application/json'
				}		
				})		
			//return deferred.promise; */
			var data = [
				{ title: 'Reggae', id: 1},
				{ title: 'Chill', id: 2 },
				{ title: 'Dubstep', id: 3 },
				{ title: 'Indie', id: 4 },
				{ title: 'Rap', id: 5 },
				{ title: 'Cowbell', id: 6 }
			  ];
			return data;
		}; 
		
	  return service;
 
}])
.factory('earnPointsService',function($http,$q){
  var service = {};
  service.getAllPointsDetails = function(){
    return  $http({
        method  : 'GET',
		url: 'https://api.myjson.com/bins/4mo0s', // https://api.myjson.com/bins/3biho
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  };
  return service;
})

.factory('premierSavingsService',function($http,$q){
  var service = {};
  service.getAllSavingServices = function(){
    return  $http({
        method  : 'GET',
		url: 'https://api.myjson.com/bins/4mo0s', // https://api.myjson.com/bins/3biho
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  };
  
  service.getPremiumPieChartValues = function(){
	  
	  return $http({
		  method : 'GET',
		  url : 'https://api.myjson.com/bins/4xcig', //https://api.myjson.com/bins/3ozwo / //https://api.myjson.com/bins/1b8ps
		  headers : {'content-type' : 'application/x-www-form-urlencoded'}
	  })
	  
  };
  
  service.getPremiumSaved = function(){
	 return $http({
		 method : 'GET',
		 url : 'https://api.myjson.com/bins/3ozwo'
	 })
  };
  
  return service;
})

.factory('myPolicyService', function($http) {
    
    var service = {};
     service.myPolicyView = function() {
	 
	 
	 var logged_User = sessionStorage.getItem('userData');
		logged_User = JSON.parse(logged_User);
		logged_User = logged_User.UniqueId;
		console.log(logged_User);
	 
	 
        return $http({
            method: 'GET',
			url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/policies/uniqueId="+logged_User,
			//url: "data/myPolicy.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('myPolicyDetailsService', function($http) {
    
    var service = {};
     service.myPolicyDetailsView = function(uniqueID, policyNumber) {
	 	 
        return $http({
            method: 'GET',
			url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/policyDetails/"+ uniqueID +"/" + policyNumber,
			//url: "data/myPolicy.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('alertsDataService', function($http) {
    
    var service = {};
     service.alertsDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "data/alerts.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('offersAndSavingsDataService', function($http) {
    
    var service = {};
     service.offersAndSavingsDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "data/offersAndSavings.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
// .factory('newsFeedDataService', function($http) {
    
    // var service = {};
     // service.newsFeedDataServiceFn = function() {
        // return $http({
            // method: 'GET',
            // //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            // url: "data/offersAndSavings.json",
            // headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
            // } // set the headers so angular passing info as form data (not request payload)
        // })
    // }
    // return service;
// })
.factory('earnMorePointsDataService', function($http) {
    
    var service = {};
     service.earnMorePointsDataServiceFn = function(earnPointsData) {
        return $http({
            method: 'POST',
            url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/earnMorePoints",
            headers: {
                'Content-Type': 'application/json'
            },
			data: earnPointsData
        })
    }
    return service;
})
.factory('premierSavingIndividualDetailsService', function($http, $q){
	var service = {};
	service.getAllIndividualDetails = function(urlParam){		
		return $http({
			method : 'GET',
			url : 'https://api.myjson.com/bins/2ym7s'
		})
	};
	
	service.getChartValues = function(){
		return $http({
			method : 'GET',
			url : 'https://api.myjson.com/bins/2ym7s'
		})
	};
	
	return service;
})

.factory('fitBitCalendarDataService', function($http) {
    var service = {};
     service.fitBitCalendarDataServiceFn = function(stdata) {
  
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                 'Content-Type': 'application/json'
            },
            data: stdata
        })
    }
    return service;


})

.factory('heartRateCalendarDataService', function($http) {
    var service = {};
     service.heartRateCalendarDataServiceFn = function(stdata) {
      
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                 'Content-Type': 'application/json'
            },
            data: stdata
        })
    }
    return service;


})

.factory('caloriesCalendarDataService', function($http) {
    var service = {};
     service.caloriesCalendarDataServiceFn = function(stdata) {
              return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                 'Content-Type': 'application/json'
            },
            data: stdata
        })
    }
    return service;


})


.factory('stepsSummaryListDataService', function($http) {
    
    var service = {};
     service.stepsSummaryListDataServiceFn = function(stdata) {
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
// set the headers so angular passing info as form data (not request payload)
        })
    }
    service.stepsSummaryListGraphDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "https://api.myjson.com/bins/59o9g",
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('heartSummaryListDataService', function($http) {
    
    var service = {};
     service.heartSummaryListDataServiceFn = function(stdata) {
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
// set the headers so angular passing info as form data (not request payload)
        })
    }
    service.heartSummaryListGraphDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "https://api.myjson.com/bins/59o9g",
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})


.factory('caloriesSummaryListDataService', function($http) {
    
    var service = {};
     service.caloriesSummaryListDataServiceFn = function(stdata) {
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
// set the headers so angular passing info as form data (not request payload)
        })
    }
    service.caloriesSummaryListGraphDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "https://api.myjson.com/bins/59o9g",
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})



.factory('BloodPressureDetailsService', function($http, $q){
		
	var service = {};
	
	service.getAllBPValues = function(){
		return $http({	
			method : 'GET',
			url : 'https://api.myjson.com/bins/2379w'
		});
	};		
	return service;
	
})
.factory('pointsSummaryService', function($http, $q){
    //var getUniqueId = JSON.parse(sessionStorage.getItem('userData'));
     
    var service = {};
   
    service.pointsSummaryServiceFn = function(data){
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/FitnessPointstable',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
          "UniqueId": data.UniqueId,
          "IssueDate": data.IssueDate,
          "EffectiveDate": data.EffectiveDate,
          "IsDateRangeOff": true
        }

        });
    };      
    return service;
    
})
.factory('HealthFitnessOverviewService', function($http, $q){
    //var getUniqueId = JSON.parse(sessionStorage.getItem('userData'));
     
    var service = {};
   
    service.HealthFitnessOverviewServiceFn = function(stdata){
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/FitnessPointstable',
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
        });
    };      
    return service;
    
})
.factory('screeningAndPreventionDetailsService', function($http, $q){
        
     var service = {};
   
    service.screeningAndPreventionDetails = function(screeningPreventionDate){
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/FitnessPointsTable',
            headers: {
                'Content-Type': 'application/json'
            },
            data:screeningPreventionDate
        });
    };      
    return service;

})

.factory('myProfileService', function($http) {
    
    var service = {};
     service.myProfileView = function() {
		var logged_User = sessionStorage.getItem('userData');
		logged_User = JSON.parse(logged_User);
		logged_User = logged_User.UniqueId;
		console.log(logged_User);
		
        return $http({
            method: 'GET',
			url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/profile/uniqueId="+logged_User,
			//url: "data/myProfile.json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
// .factory('fitnesSummaryService', function($http) {
    
//     var service = {};
//      service.fitnesSummaryServiceFn = function() {
//         return $http({  
//             method : 'POST',
//             url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/FitnessPointstable',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: {
//               //"UniqueId": getUniqueId.UniqueId,
//               "UniqueId": "900001",
//               "IssueDate": "01-06-2014",
//               "EffectiveDate": "07-04-2015" 
//             }
//         });
//     }
//     return service;
// })

.factory('newAssessmentService', function($http) {
    
    var service = {};
     service.newAssessmentView = function(input) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/SaveAssessmentInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
        });
    }
    return service;
})

.factory('newVaccinationService', function($http) {
    
    var service = {};
     service.newVaccinationView = function(input) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/SaveVaccinationInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
        });
    }
    return service;
})

.factory('getVaccinationService', function($http) {
    
    var service = {};
	service.getVaccinationView = function(vaccinationDate) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetVaccinationInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: vaccinationDate
        });
    }
    return service;
})


.factory('getAssessmentInfoService', function($http) {
    
    var service = {};
     service.getAssessmentInfoView = function(assessmentDate) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetAssessmentInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: assessmentDate
        });
    }
    return service;
})

.factory('getSmokerDeclarationInfoService', function($http) {
    
    var service = {};
     service.getSmokerDeclarationInfoView = function(getSmokerDeclarationDate) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetSomkerDeclarationInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: getSmokerDeclarationDate
        });
    }
    return service;
})

.factory('getScreeningPreventionInfoService', function($http) {
    
    var service = {};
     service.getScreeningPreventionInfoView = function(getScreeningPreventionDate) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetScreeningPreventionInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: getScreeningPreventionDate
        });
    }
    return service;
})

.factory('nonSmokerDeclarationService', function($http) {
    
    var service = {};
     service.nonSmokerDeclarationView = function(input) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/SaveSomkerDeclarationInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
        });
    }
    return service;
})

.factory('documentSubmitService', function($http) {
    
    var service = {};
     service.documentSubmitView = function(input) {
        return $http({  
            method : 'POST',
            url : 'http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/SaveScreeningPreventionInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
        });
    }
    return service;
})



.factory('bmiSavingsService', function($http) {
    
    var service = {};

     service.getAllIndividualDetails = function(stdata) {
        return $http({
            method: 'POST',
			// data : datas,
      //url:"http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bmiSavings"
			url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bmiSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('fitnessRewardService', function($http) {
    
    var service = {};
     service.getAllIndividualDetails = function(data) {
        return $http({
            method: 'POST',
			//url: "https://api.myjson.com/bins/493ji",
      url:"http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bpSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data:data // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
// .factory('fitnessRewardService', function($http) {
    
//     var service = {};
//      service.getAllIndividualDetails = function(data) {
//         return $http({
//             method: 'GET',
//             //url: "https://api.myjson.com/bins/493ji",
//       url:"https://api.myjson.com/bins/rcgs",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//     }
//     return service;
// })

.factory('cholestrolSavingsService', function($http) {


    var service = {};
     service.getAllIndividualDetails = function(stdata) {
        return $http({
            method: 'POST',
			url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/cholestSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
 // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('fitbitAuthService', function($http) {
    
    var service = {};
     service.getAllIndividualDetails = function(input) {
        return $http({
            method: 'POST',
      url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/authenticate",
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
 // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('bloodPressureDetailsService', function($http) {
    
    var service = {};
    
     service.getAllIndividualDetails = function(stdata) {
        return $http({
            method: 'POST',
      url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bpSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata
 // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('bloodPressureDetailsGraphService', function($http) {
    
    var service = {};

     service.getAllIndividualDetails = function(data) {
        return $http({
            method: 'POST',
      url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bpSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
 // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})
.factory('getBPDetials', function($http) {
     
    var service = {};
    service.getAllBPDetails = function(data) {
        return $http({
            method: 'POST',
            url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/bpSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data // set the headers so angular passing info as form data (not request payload)
        })

    }

    return service;

})
.factory('getFitnessData', function($http) {
    
    var service = {};
    service.getAllIndividualDetails = function(data) {
        return $http({
            method: 'POST',
            url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/fitnessSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data // set the headers so angular passing info as form data (not request payload)
        })

    }

    return service;

})
.factory('getPdata', function($http) {
    
    var service = {};
    service.getAllIndividualDetails = function(stdata) {
        return $http({
            method: 'POST',
            url: "http://ec2-52-212-51-92.eu-west-1.compute.amazonaws.com:8081/api/premiumSavings",
            headers: {
                'Content-Type': 'application/json'
            },
            data: stdata

 // set the headers so angular passing info as form data (not request payload)
        })

    }

    return service;

})
// service for hours slept - poornima
.factory('hoursSleptSummaryListDataService', function($http) {
    
    var service = {};
     service.hoursSleptSummaryListDataServiceFn = function(stdata) {
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                'Content-Type': 'application/json'
            },
            data:stdata
// set the headers so angular passing info as form data (not request payload)
        })
    }
    service.hoursSleptSummaryListGraphDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "https://api.myjson.com/bins/59o9g",
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('sleepCalendarDataService', function($http) {
    var service = {};
     service.sleepCalendarDataServiceFn = function(stdata) {

        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                 'Content-Type': 'application/json'
            },
            data: stdata // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;


})
.factory('waterLogSummaryListDataService', function($http) {
    
    var service = {};
     service.waterLogSummaryListDataServiceFn = function(stdata) {
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                'Content-Type': 'application/json'
            },
            data:stdata
// set the headers so angular passing info as form data (not request payload)
        })
    }
    service.waterLogSummaryListGraphDataServiceFn = function() {
        return $http({
            method: 'GET',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "https://api.myjson.com/bins/59o9g",
            headers: {
                'Content-Type': 'application/json'
            } // set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;
})

.factory('waterCalendarDataService', function($http) {
    var service = {};
     service.waterCalendarDataServiceFn = function(stdata) {
       
        return $http({
            method: 'POST',
            //url: "http://119.226.216.141/EnterpriseServices/KudosMobileService/KudoMobileService.svc/Highlights",
            url: "http://ec2-52-211-159-149.eu-west-1.compute.amazonaws.com/FitbitService/Fitbit.svc/GetPointsTableForActivity",
            headers: {
                 'Content-Type': 'application/json'
            },
            data: stdata// set the headers so angular passing info as form data (not request payload)
        })
    }
    return service;


});;
//end of hoursslept



