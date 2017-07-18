import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './headerImages.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
    Meteor
} from 'meteor/meteor';
import {
    Images
} from '../../../api/images'


class HeaderImages {
    constructor($scope, $reactive, $timeout, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.scope = $scope;
        this.timeout = $timeout;
        this.state = $state;

        this.imageUrl = null;
        this.imageType = null;
        this.savedImage = {
            '_id': null,
            'imageUrl': null,
            'imageType': null
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
            allImages() {
                return Images.find({})
            }
        })

    }

    insert() {
        console.log(this.imageUrl + this.imageType);
        if (this.imageUrl && this.imageType) {
            Images.insert({
                'imageUrl': this.imageUrl,
                'type': this.imageType
            }, function(error) {
                if (!error) {
                    console.log('inserted');
                    document.getElementById('img').value = null
                }
            })
        }
    }

    delete(id) {
        if (id) {
            Images.remove({
                '_id': id
            })
        }
    }

    initialize(image) {
        this.savedImage._id = image._id;
        this.savedImage.imageUrl = image.imageUrl
        this.savedImage.imageType = image.type
    }

    update() {
        Images.update({
            '_id': this.savedImage._id
        }, {
            $set: {
                'imageUrl': this.savedImage.imageUrl
            }
        }, function(error) {
            if (!error) {
                $('#update-header-image').modal('close');
            }
        })
    }

}


const name = 'headerImages';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ngMaterial
]).component(name, {
    template,
    controllerAs: name,
    controller: HeaderImages
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('headerImages', {
        url: '/headerImages',
        template: '<header-images></header-images>',
        resolve: {
            currentUser($q, $state) {
                if (Meteor.userId() === null) {
                    $state.go('login')
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}
