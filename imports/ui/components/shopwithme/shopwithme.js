import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
// import ngSanitize from 'angular-sanitize';
import uiRouter from '@uirouter/angularjs';
import template from './shopwithme.html';
import {
    Meteor
} from 'meteor/meteor';

import {
  name as Navigation
} from '../navigation/navigation';
import {
  name as Home
} from '../home/home';

class ShopWithMe {
  constructor($scope, $reactive, $rootScope, $timeout, $state, $interval) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.rootScope = $rootScope;
  }
}
const name = 'shopwithme';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Navigation,
  Home
]).component(name, {
  template,
  controllerAs: name,
  controller: ShopWithMe
}).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  'ngInject';

  $stateProvider.state('shopwithme', {
      abstract: true,
      template: '<shopwithme></shopwithme>'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/home');
}
