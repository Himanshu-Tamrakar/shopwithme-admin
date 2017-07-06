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
  name as Login
} from '../login/login';

class ShopWithMe {
  constructor() {

  }
}
const name = 'shopwithme';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Navigation,
  Login
]).component(name, {
  template,
  controllerAs: name,
  controller: ShopWithMe
}).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider, $qProvider) {
  'ngInject';

  $stateProvider.state('shopwithme', {
      abstract: true,
      template: '<shopwithme></shopwithme>'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/login');

  $qProvider.errorOnUnhandledRejections(false);
}
