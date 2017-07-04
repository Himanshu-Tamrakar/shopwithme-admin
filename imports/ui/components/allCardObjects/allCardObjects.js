import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './allCardObjects.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  CardObjects
} from '../../../api/cardObjects'

class AllCardObjects {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.cardObject_details = {
      'name': null,
      'description': null,
      'url': null,
      'urlType':null,
      'type': null
    }

    this.savesCardObject_details = {
      '_id': null,
      'name': null,
      'description': null,
      'url': null,
      'urlType':null,
      'type': null
    }

    $timeout(function() {
      $(document).ready(function() {
        $('.modal').modal();
      });

      $(document).ready(function() {
        $('select').material_select();
      });

    }, 10);

    this.helpers({
      allCardObjects() {
        return CardObjects.find({})
      }
    })

  }

  insert() {
    if (this.cardObject_details.urlType && this.cardObject_details.name && this.cardObject_details.description && this.cardObject_details.url && this.cardObject_details.type) {
      CardObjects.insert(this.cardObject_details, function(error) {
        if (!error) {
          $('#add-card-objects').modal('close');
        }
      })
    }
  }

  delete(id) {
    if (id) {
      CardObjects.remove({
        '_id': id
      })
    }
  }

  initialize(cardObject) {
    this.savesCardObject_details = {
      '_id': cardObject._id,
      'name': cardObject.name,
      'description': cardObject.description,
      'url': cardObject.url,
      'urlType': cardObject.urlType,
      'type': cardObject.type
    }
  }

  update() {
    if (this.savesCardObject_details._id) {
      CardObjects.update({
        '_id': this.savesCardObject_details._id
      }, {
        $set: {
          'name': this.savesCardObject_details.name,
          'description': this.savesCardObject_details.description,
          'url': this.savesCardObject_details.url,
          'urlType': this.savesCardObject_details.urlType,
          'type': this.savesCardObject_details.type
        }
      }, function(error) {
        if(!error) {
          $('#update-card-objects').modal('close');
        }
      })
    }
  }

}


const name = 'allCardObjects';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
  controller: AllCardObjects
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('allCardObjects', {
    url: '/allCardObjects',
    template: '<all-card-objects></all-card-objects>'
  });
}
