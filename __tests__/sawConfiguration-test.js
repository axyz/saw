// __tests__/sawConfiguration-test.js
jest.dontMock('../saw.js');

describe('saw', function () {

  beforeEach(function () {
    this.saw = require('../saw.js');
  });

  afterEach(function () {
    delete this.saw;
  });

  describe('configure() with a not available API Adapter', function () {

    it('should throw an error if no API Adapter is available', function () {
      expect(this.saw.configure).toThrow("A valid SCORM API Adapter can not be found in the window or in the window.opener");
      expect(this.saw.isInitialized()).toBe(false);
    });
  });

  describe('initialize() with an available API Adapter', function () {

    it('should be initialized after init invocation if the adapted is defined in the current window', function () {
      window.API = {};
      this.saw.initialize();
      expect(this.saw.isInitialized()).toBe(true);
    });

    it('should be initialized after init invocation if the API is defined in the window.opener', function () {
      var opener = window.opener;
      var parent = {};
      // building the nested parent structure with max level of deep in parent search
      for(var i = 0; i++; i <= 7){
        parent = { 'parent': parent };
      }
      window.parent = parent;
      window.opener = {};
      window.opener.API = {};

      this.saw.initialize();
      expect(this.saw.isInitialized()).toBe(true);
      window.opener = opener;
    });
  });
});