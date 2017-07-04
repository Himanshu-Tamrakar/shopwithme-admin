import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './allProducts.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  name as HeaderImages
} from '../headerImages/headerImages'
import {
  Products
} from '../../../api/products'
import {
  Sellers
} from '../../../api/sellers'


class AllProducts {
  constructor($scope, $reactive, $timeout, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.product_details = {
      'product_name': null,
      'product_image': null,
      'seller_name': null,
      'seller_image': null,
      'actual_price': null,
      'offer_price': null,
      'redirect_url': null
    }

    this.saved_product_details = {
      '_id': null,
      'product_name': null,
      'product_image': null,
      'seller_name': null,
      'seller_image': null,
      'actual_price': null,
      'offer_price': null,
      'redirect_url': null
    }

    $timeout(function() {
      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 10);

    this.helpers({
      allProducts() {
        return Products.find({})
      }
    })
  }

  insert() {
    if (this.product_details.redirect_url && this.product_details.seller_image && this.product_details.seller_name && this.product_details.product_name && this.product_details.product_image && this.product_details.actual_price && this.product_details.offer_price) {
      Products.insert(this.product_details, function(error) {
        if (!error) {
          $('#add-product').modal('close');
        }
      })
    } else {

    }
  }

  delete(id) {
    if (id) {
      Products.remove({
        '_id': id
      })
    }
  }

  initialize(product) {
    this.saved_product_details = {
      '_id': product._id,
      'product_name': product.product_name,
      'product_image': product.product_image,
      'seller_name': product.seller_name,
      'seller_image': product.seller_image,
      'actual_price': product.actual_price,
      'offer_price': product.offer_price,
      'redirect_url': product.redirect_url
    }
  }

  update() {
    if (this.saved_product_details._id) {
      Products.update({
        '_id': this.saved_product_details._id
      }, {
        $set: {
          'product_name': this.saved_product_details.product_name,
          'product_image': this.saved_product_details.product_image,
          'seller_name': this.saved_product_details.seller_name,
          'seller_image': this.saved_product_details.seller_image,
          'actual_price': this.saved_product_details.actual_price,
          'offer_price': this.saved_product_details.offer_price,
          'redirect_url': this.saved_product_details.redirect_url
        }
      }, function(error) {
        if(!error) {
          $('#update-product').modal('close');
        }
      })
    }
  }

}


const name = 'allProducts';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
  controller: AllProducts
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('allProducts', {
    url: '/allProducts',
    template: '<all-products></all-products>'
  });
}
