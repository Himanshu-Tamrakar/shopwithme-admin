import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './allSellers.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  Sellers
} from '../../../api/sellers'


class AllSellers {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.seller_details = {
      'name': null,
      'image': null
    }

    this.savedSellerDetails = {
      '_id': null,
      'name': null,
      'image': null
    }

    $timeout(function() {
      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 10);

    this.helpers({
      allSellers() {
        return Sellers.find({})
      }
    })
  }

  insert() {
    if (this.seller_details.name && this.seller_details.image) {
      Sellers.insert(this.seller_details, function(error) {
        if (!error) {
          document.getElementById('seller_name').value = null;
          document.getElementById('seller_image').value = null;
        }
      })
    }
  }

  delete(id) {
    if (id) {
      Sellers.remove({
        '_id': id
      })
    }
  }

  initialize(seller) {
    this.savedSellerDetails._id = seller._id;
    this.savedSellerDetails.name = seller.name;
    this.savedSellerDetails.image = seller.image;
  }

  update() {
    if (this.savedSellerDetails.name && this.savedSellerDetails.image) {
      Sellers.update({
        '_id': this.savedSellerDetails._id
      }, {
        $set: {
          'name': this.savedSellerDetails.name,
          'image': this.savedSellerDetails.image
        }
      }, function(error) {
        if(!error) {
          $('#update-seller').modal('close');
        }
      })
    }
  }
}


const name = 'allSellers';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
  controller: AllSellers
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('allSellers', {
    url: '/allSellers',
    template: '<all-sellers></all-sellers>'
  });
}
