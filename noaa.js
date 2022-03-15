(function () {
    var myConnector = tableau.makeConnector();
    myConnector.init = function(initCallback) {
        initCallback();
        tableau.submit();
        };

myConnector.getSchema = function (schemaCallback) {
    var cols = [
       // { id:"geometry", alias:"Geometry",dataType: tableau.dataTypeEnum.geometry},
      //  {id:"coordinates", alias:"Coordinates", dataType: tableau.dataTypeEnum.float},
      //  { id:"units", alias:"Unit", dataType: tableau.dataTypeEnum.string},
        { id:"forecastGenerator", alias:"Forecast Generator", dataType: tableau.dataTypeEnum.string},
        { id:"generatedAt", alias:"Generated At", dataType:tableau.dataTypeEnum.datetime},
        { id:"updatedTime", alias:"Updated Time", dataType:tableau.dataTypeEnum.datetime},
        { id:"validTimes", alias:"Valid Times", dataType: tableau.dataTypeEnum.datetime},
      //  { id:"number", alias:"Day Number", dataType: tableau.dataTypeEnum.int},
     //   { id:"name", alias:"Day", dataType: tableau.dataTypeEnum.string},
       // { id:"startTime", alias:"Start Time", dataType:tableau.dataTypeEnum.datetime},
        //
     //   { id:"shortForecast", alias:"Short Description", dataType:tableau.dataTypeEnum.string}
    ];
    var tableSchema= {
        id: "NOAAWeather",
        alias: "NOAA Weather 7-day Forecast",
        columns: cols
    };
    schemaCallback([tableSchema]);
    };

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.weather.gov/gridpoints/ABR/50,52/forecast", function(data) {
       // var geometry = data.geometry;
        var properties = data.properties;
       // var periods = data.periods;
        tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = properties.length; i < len; i++) {
            tableData.push({
                //"geometry":feat[i].geometry,
                //"coordinates":feat[i].geometry.coordinates(0,0),
               // "units":feat[i].properties.units,
                "forecastGenerator":properties[i].forecastGenerator,
                "generatedAt":properties[i].generatedAt,
                "updatedTime":properties[i].updatedTime,
                "validTimes":properties[i].validTimes,
               // "number":periods[i].number,
               // "name":periods[i].name,
              //  "startTime":periods[i].startTime,
              /////  "shortForecast":periods[i].shortForecast
                // "geometry":feat[i]["Geometry"],
                // "units":feat[i]["Unit"],
                // "forecastGenerator":feat[i]["Forecast Generatpr"],
                // "generatedat":feat[i]["Generated At"],
                // "updatedTime":feat[i]["Updated Time"],
                // "number":feat[i]["Day Number"],
                // "name":feat[i]["Day"],
                // "startTime":feat[i]["Start Time"],
                // "shortForecast":feat[i]["Short Description"]
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};
tableau.registerConnector(myConnector);
})();
    $(document).ready(function () {
    $("#submitButton").click(function () {
    tableau.connectionName = "NOAAWeather";
    tableau.submit();
    });
});
