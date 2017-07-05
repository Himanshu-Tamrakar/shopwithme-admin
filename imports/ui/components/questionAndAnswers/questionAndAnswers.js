import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './questionAndAnswers.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Meteor
} from 'meteor/meteor';
import {
  QAS
} from '../../../api/qas'


class QuestionAndAnswers {
  constructor($scope, $reactive, $timeout, $state, $q) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

    this.qAndA = {
      'question': null,
      'answer': null
    }
    this.savedQAndA = {
      '_id': null,
      'question': null,
      'answer': null
    }

    $timeout(function() {
      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 10);

    this.helpers({
      allQandA() {
        return QAS.find({})
      }
    })

  }

  insert() {
    if (this.qAndA.question && this.qAndA.answer) {
      QAS.insert(this.qAndA, function(error) {
        if (!error) {
          $('#question').val(null);
          $('#answer').val(null);
        }
      })
    }
  }

  delete(id) {
    if (id) {
      QAS.remove({
        '_id': id
      })
    }
  }

  initialize(qas) {
    this.savedQAndA._id = qas._id;
    this.savedQAndA.question = qas.question;
    this.savedQAndA.answer = qas.answer;
  }

  update() {
    QAS.update({
      '_id': this.savedQAndA._id
    }, {
      $set: {
        'question': this.savedQAndA.question,
        'answer': this.savedQAndA.answer
      }
    }, function(error) {
      if(!error) {
        $('#update-qanda').modal('close');
      }
    })
  }

}


const name = 'questionAndAnswers';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
  controller: QuestionAndAnswers
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('questionAndAnswers', {
    url: '/questionAndAnswers',
    template: '<question-and-answers></question-and-answers>'
  });
}
