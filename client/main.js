import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
    Meteor
} from 'meteor/meteor';
import {
    name as ShopWithMe
} from '../imports/ui/components/shopwithme/shopwithme';


function onReady() {
    angular.bootstrap(document, [
        ShopWithMe
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
