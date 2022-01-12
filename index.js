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
      "navigation.courseGreatCircle.nextPoint.velocityMadeGood",
      handlePutCourseData)

  };

  const handlePutCourseData= (context, path, value, cb) => {

    let val= [ {path, value} ];  

    app.debug(`****** Sending Delta: ******`);
    app.debug(JSON.stringify(val));

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