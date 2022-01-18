module.exports = function (app) {
  var plugin = {}
  var unsubscribes =[]

  plugin.id = 'lionriver-helper';
  plugin.name = 'Lionriver helper plugin';
  plugin.description = 'API for Lionriver App towards SK';

  plugin.start = function (options, restartPlugin) {
    // Here we put our plugin logic
    app.debug('Plugin started');

    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.crossTrackError",
      handlePutCourseData,
      "Lionriver")
      
    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.nextPoint.position",
      handlePutCourseData,
      "Lionriver")
      
    app.registerPutHandler("vessels.self",
      "nnavigation.courseGreatCircle.nextPoint.distance",
      handlePutCourseData,
      "Lionriver")
      
    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.nextPoint.bearingTrue",
      handlePutCourseData,
      "Lionriver")

    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.nextPoint.velocityMadeGood",
      handlePutCourseData,
      "Lionriver")

    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.bearingTrackTrue",
      handlePutCourseData,
      "Lionriver")

    app.registerPutHandler("vessels.self",
      "navigation.courseGreatCircle.nextPoint.estimatedTimeOfArrival",
      handlePutCourseData,
      "Lionriver")

    app.registerPutHandler("vessels.self",
      "performance.polarSpeedRatio",
      handlePutCourseData,
      "Lionriver")
  };

  const handlePutCourseData= (context, path, value, cb) => {
    let val= [ {path, value} ];  
    app.handleMessage(plugin.id, {updates: [ {values: val} ] });
    return { state: 'COMPLETED', resultStatus: 200, statusCode: 200 }
  }

  plugin.stop = function () {
    // Here we put logic we need when the plugin stops
    app.debug('Plugin stopped');
  };

  plugin.schema = {
    // The plugin schema
  };

  return plugin;
};