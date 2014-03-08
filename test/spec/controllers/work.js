'use strict';

describe('Controller: WorkCtrl', function () {

  // load the controller's module
  beforeEach(module('dmbaughmancomApp'));

  var WorkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkCtrl = $controller('WorkCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
