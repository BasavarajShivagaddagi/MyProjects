// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.secondController','angular-svg-round-progressbar','ng-fusioncharts',  'highcharts-ng','starter.directives','starter.heartRateController','starter.caloriseBurnedController','starter.waterLogController','starter.hoursSleptController','starter.premiumSavingsController','starter.stepsController'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-thin-left');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
	
	.state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
	
	.state('app.myProfile', {
      url: '/myProfile',
      views: {
        'menuContent': {
          templateUrl: 'templates/myProfile.html',
          controller: 'myProfileCtrl'
        }
      }
    })
  .state('app.healthfitness', {
      url: '/healthfitness',
      views: {
        'menuContent': {
          templateUrl: 'templates/healthfitness.html',
          controller: 'HealthFitnessOverviewCtrl'
        }
      }
    })
	.state('app.myhealthoverviewdetails', {
      url: '/myhealthoverviewdetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/myhealthoverviewdetails.html',
          controller: 'MyHealthOverviewDetailsCtrl'
        }
      }
    })
	.state('app.healthTipsList', {
    url: '/healthTipsList',
    views: {
      'menuContent': {
        templateUrl: 'templates/healthTipsList.html',
        controller: 'HealthTipsListCtrl'
      }
    }
  })
  .state('app.healthTips', {
    url: '/healthTips',
    views: {
      'menuContent': {
        templateUrl: 'templates/healthTips.html',
        controller: 'HealthTipsCtrl'
      }
    },
	  params: {
		'heading': 'some default', 
		'content': 'some default',
		'hdate': 'some default',
    'imgUrl': 'some default'
		}
  })
  .state('app.alerts', {
    url: '/alerts',
    views: {
      'menuContent': {
        templateUrl: 'templates/alerts.html',
        controller: 'AlertsCtrl'
      }
    }
  })
  .state('app.offersAndSavings', {
    url: '/offersAndSavings',
    views: {
      'menuContent': {
        templateUrl: 'templates/offersAndSavings.html',
        controller: 'OffersAndSavingsCtrl'
      }
    }
  })
   .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      }
    }
  })
   .state('app.newsFeed', {
    url: '/newsFeed',
    views: {
      'menuContent': {
        templateUrl: 'templates/newsFeed.html',
        controller: 'NewsFeedCtrl'
      }
    }
  })
   .state('app.earnMorePoints', {
    url: '/earnMorePoints',
    views: {
      'menuContent': {
        templateUrl: 'templates/earnMorePoints.html',
        controller: 'EarnMorePointsCtrl'
      }
    }
  })
   .state('login', {
        url: "/login",
        templateUrl: "login.html",
        controller: 'LoginCtrl'
    })
	.state('app.premiersavings', {
    url: '/premiersavings',
    views: {
      'menuContent': {
        templateUrl: 'templates/premiersavings.html',
        controller: 'premierSavingsCtrl'
      }
    }
  })

	.state('app.myPolicies', {
      url: '/myPolicies',
      views: {
        'menuContent': {
          templateUrl: 'templates/myPolicies.html',
          controller: 'myPoliciesCtrl'
        }
      }
    })
	
	.state('app.newsDetails', {
      url: '/newsDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/newsDetails.html',
          controller: 'newsDetailsCtrl'
        }
      },
	  params: {
		'newsID': 'some default', 
		'MessageBody': 'some default',
		'newsFeedDate': 'some default',
		'Headline': 'some default'
		}
    })
  .state('app.fitBitCalendar', {
      url: '/fitBitCalendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/fitBitCalendar.html',
          controller: 'fitBitCalendarCtrl'
        }
      }
    })
  
  .state('app.HeartRateCalendar', {
      url: '/HeartRateCalendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/HeartRateCalendar.html',
          controller: 'heartRateCalendarCtrl'
        }
      }
    })
  
  .state('app.caloriesCalendar', {
      url: '/caloriesCalendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/caloriesCalendar.html',
          controller: 'caloriesCalendarCtrl'
        }
      }
    })
  
	
	.state('app.premierSavingIndividualDetails', {
      url: '/premierSavingIndividualDetails/saving/:savingId',
      views: {
        'menuContent': {
          templateUrl: 'templates/premierSavingIndividualDetails.html',
          controller: 'premierSavingIndividualDetailsCtrl'
        }
      }
    })
	.state('app.myPoliciesDetails', {
      url: '/myPoliciesDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/myPoliciesDetails.html',
          controller: 'myPoliciesDetailsCtrl'
        }
      },
	  params: {
		'policyNumber': ''
		}
    })
	
	.state('app.fitnesSummary', {
      url: '/fitnesSummary',
      views: {
        'menuContent': {
          templateUrl: 'templates/fitnesSummary.html',
          controller: 'fitnesSummaryCtrl'
        }
      }
    })
	
	.state('app.bloodPressure', {
      url: '/bloodPressure',
      views: {
        'menuContent': {
          templateUrl: 'templates/bloodPressure.html',
          controller: 'bloodPressureCtrl'
        }
      }
    })
   
    .state('app.stepsSummaryDaysList', {
      url: '/stepsSummaryDaysList',
      views: {
        'menuContent': {
          templateUrl: 'templates/stepsSummaryDaysList.html',
          controller: 'stepsSummaryDaysListCtrl'
        }
      }
    })
    .state('app.stepsSummaryList', {
      url: '/stepsSummaryList',
      views: {
        'menuContent': {
          templateUrl: 'templates/stepsSummaryList.html',
          controller: 'stepsSummaryListCtrl'
        }
      }
    })
  
  .state('app.caloriesBurnedSummaryDaysList', {
      url: '/caloriesBurnedSummaryDaysList',
      views: {
        'menuContent': {
          templateUrl: 'templates/caloriesBurnedSummaryDaysList.html',
          controller: 'caloriesSummaryDaysListCtrl'
        }
      }
    })
  
   .state('app.caloriesBurnedSummaryList', {
      url: '/caloriesBurnedSummaryList',
      views: {
        'menuContent': {
          templateUrl: 'templates/caloriesBurnedSummaryList.html',
          controller: 'caloriesSummaryListCtrl'
        }
      }
    })
  
   .state('app.HeartRateSummaryDaysList', {
      url: '/HeartRateSummaryDaysList',
      views: {
        'menuContent': {
          templateUrl: 'templates/HeartRateSummaryDaysList.html',
          controller: 'heartRateSummaryDaysListCtrl'
        }
      }
    })
   .state('app.HeartRateSummaryList', {
      url: '/HeartRateSummaryList',
      views: {
        'menuContent': {
          templateUrl: 'templates/HeartRateSummaryList.html',
          controller: 'heartSummaryListCtrl'
        }
      }
    })
	
	.state('app.myFitDevice', {
      url: '/myFitDevice',
      views: {
        'menuContent': {
          templateUrl: 'templates/myFitDevice.html',
          controller: 'myFitDeviceCtrl'
        }
      }
    })
	
	.state('app.bloodPressureSecond', {
      url: '/bloodPressureSecond',
      views: {
        'menuContent': {
          templateUrl: 'templates/bloodPressureSecond.html',
          controller: 'bloodPressureSecondCtrl'
        }
      }
    })
	
	.state('app.bloodPressureDetails', {
      url: '/bloodPressureDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/bloodPressureDetails.html',
          controller: 'bloodPressureDetailsCtrl'
        }
      }
    })

  .state('app.pointsStatement', {
      url: '/pointsStatement',
      views: {
        'menuContent': {
          templateUrl: 'templates/pointsStatement.html',
          controller: 'pointsStatementCtrl'
        }
      }
    })
	.state('app.bmiMeasurements', {
      url: '/bmiMeasurements',
      views: {
        'menuContent': {
          templateUrl: 'templates/bmiMeasurements.html',
          controller: 'bmiMeasurementsCtrl'
        }
      }
    })

	.state('app.screeningPrevention', {
      url: '/screeningPrevention',
      views: {
        'menuContent': {
          templateUrl: 'templates/screeningPrevention.html',
          controller: 'screeningPreventionCtrl'
        }
      }
    })

	.state('app.newAssessment', {
      url: '/newAssessment',
      views: {
        'menuContent': {
          templateUrl: 'templates/newAssessment.html',
          controller: 'newAssessmentCtrl'
        }
      }
    })
	
	.state('app.newVaccination', {
      url: '/newVaccination',
      views: {
        'menuContent': {
          templateUrl: 'templates/newVaccination.html',
          controller: 'newVaccinationCtrl'
        }
      }
    })
	
	.state('app.newDeclaration', {
      url: '/newDeclaration',
      views: {
        'menuContent': {
          templateUrl: 'templates/newDeclaration.html',
          controller: 'newDeclarationCtrl'
        }
      }
    })
	
	.state('app.documentsSubmit', {
      url: '/documentsSubmit',
      views: {
        'menuContent': {
          templateUrl: 'templates/documentsSubmit.html',
          controller: 'documentsSubmitCtrl'
        }
      }
    })
    .state('app.preventiveHealthChecks', {
      url: '/preventiveHealthChecks',
      views: {
        'menuContent': {
          templateUrl: 'templates/preventiveHealthChecks.html',
          controller: 'preventiveHealthChecksCtrl'
        }
      }
    })
     .state('app.assessments', {
      url: '/assessments',
      views: {
        'menuContent': {
          templateUrl: 'templates/assessments.html',
          controller: 'assessmentsCtrl'
        }
      }
    })
      .state('app.vaccinations', {
      url: '/vaccinations',
      views: {
        'menuContent': {
          templateUrl: 'templates/vaccinations.html',
          controller: 'vaccinationsCtrl'
        }
      }
    })
    .state('app.nonSmokerDeclaration', {
      url: '/nonSmokerDeclaration',
      views: {
        'menuContent': {
          templateUrl: 'templates/nonSmokerDeclaration.html',
          controller: 'nonSmokerDeclarationCtrl'
        }
      }
    })

	.state('app.bmiSavings', {
      url: '/bmiSavings',
      views: {
        'menuContent': {
          templateUrl: 'templates/bmiSavings.html',
          controller: 'bmiSavingsCtrl'
        }
      }
    })
	.state('app.regconfirm', {
      url: '/regConfirmation',
      views: {
        'menuContent': {
          templateUrl: 'templates/regConfirmation.html',
          controller: 'RegConfirmCtrl'
        }
      }
    })
	.state('app.forgotpassword', {
      url: '/forgotpassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgotpassword.html',
          controller: 'ForgotPassCtrl'
        }
      }
    })
	.state('app.newpassword', {
      url: '/newpassword',
      views: {
        'menuContent': {
          templateUrl: 'templates/newpassword.html',
          controller: 'NewPasswordCtrl'
        }
      }
    })
	.state('app.fitnessReward', {
      url: '/fitnessReward',
      views: {
        'menuContent': {
          templateUrl: 'templates/fitnessReward.html',
          controller: 'fitnessRewardCtrl'
        }
      }
    })
	.state('app.cholestrolSavings', {
      url: '/cholestrolSavings',
      views: {
        'menuContent': {
          templateUrl: 'templates/cholestrolSavings.html',
          controller: 'cholestrolSavingsCtrl'
        }
      }
    })
	
	.state('app.bpSavings', {
      url: '/bpSavings',
      views: {
        'menuContent': {
          templateUrl: 'templates/bpSavings.html',
          controller: 'bpSavingsCtrls'
        }
      }
    }) 
     .state('app.hoursSleptSummaryList', {
      url: '/hoursSleptSummaryList',
      views: {
        'menuContent': {
          templateUrl: 'templates/hoursSleptSummaryList.html',
          controller: 'hoursSleptSummaryListCtrl'
        }
      }
    })
     .state('app.hoursSleptSummaryDaysList', {
      url: '/hoursSleptSummaryDaysList',
      views: {
        'menuContent': {
          templateUrl: 'templates/hoursSleptSummaryDaysList.html',
          controller: 'hoursSleptSummaryDaysListCtrl'
        }
      }
    })
 .state('app.sleepCalendar', {
      url: '/sleepCalendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/sleepCalendar.html',
          controller: 'sleepCalendarCtrl'
        }
      }
    })
   .state('app.waterLogSummaryList', {
      url: '/waterLogSummaryList',
      views: {
        'menuContent': {
          templateUrl: 'templates/waterLogSummaryList.html',
          controller: 'waterLogSummaryListCtrl'
        }
      }
    })
  
  .state('app.waterLogSummaryDaysList', {
      url: '/waterLogSummaryDaysList',
      views: {
        'menuContent': {
          templateUrl: 'templates/waterLogSummaryDaysList.html',
          controller: 'waterLogSummaryDaysListCtrl'
        }
      }
    })
   .state('app.waterCalendar', {
      url: '/waterCalendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/waterCalendar.html',
          controller: 'waterCalendarCtrl'
        }
      }
    })
	;
	
  $urlRouterProvider.otherwise('/login');
  });
 
  // if none of the above states are matched, use this as the fallback
  


