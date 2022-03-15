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
        { id:"units", alias:"Unit", dataType: tableau.dataTypeEnum.string},
        { id:"forecastGenerator", alias:"Forecast Generator", dataType: tableau.dataTypeEnum.string},
        { id:"generatedAt", alias:"Generated At", dataType:tableau.dataTypeEnum.datetime},
        { id:"updatedTime", alias:"Updated Time", dataType:tableau.dataTypeEnum.datetime},
        { id:"validTimes", alias:"Valid Times", dataType: tableau.dataTypeEnum.datetime},
        { id:"number", alias:"Day Number", dataType: tableau.dataTypeEnum.int},
        { id:"name", alias:"Day", dataType: tableau.dataTypeEnum.string},
        { id:"startTime", alias:"Start Time", dataType:tableau.dataTypeEnum.datetime},
        //
        { id:"shortForecast", alias:"Short Description", dataType:tableau.dataTypeEnum.string}
    ];
    var tableSchema= {
        id: "NOAAWeatherDB",
        alias: "NOAA Weather 7-day Forecast",
        columns: cols
    };
    schemaCallback([tableSchema]);
    };

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.weather.gov/gridpoints/ABR/50,52/forecast", function(resp) {
        var feat = resp,
        tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                //"geometry":feat[i].geometry,
                //"coordinates":feat[i].geometry.coordinates(0,0),
                "units":feat[i].properties.units,
                "forecastGenerator":feat[i].properties.forecastGenerator,
                "generatedAt":feat[i].properties.generatedAt,
                "updatedTime":feat[i].properties.updatedTime,
                "validTimes":feat[i].properties.validTimes,
                "number":feat[i].periods.number,
                "name":feat[i].periods.name,
                "startTime":feat[i].periods.startTime,
                "shortForecast":feat[i].periods.shortForecast
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
    tableau.connectionName = "NOAAWeatherDB";
    tableau.submit();
    });
});
