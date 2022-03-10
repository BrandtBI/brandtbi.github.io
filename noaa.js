(function () {
    var myConnector = tableau.makeConnector();

 
myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id:'geometry', alias:'Geometry',dataype: tableau.dataTypeEnum.geometry},
        { id:'units', alias:'Unit', dataType: tableau.dataTypeEnum.string},
        { id:'forecastGenerator', alias:'Forecast Generator', dataType: tableau.dataTypeEnum.string},
        { id:'generatedat', alias:'Generated At', dataype:tableau.dataTypeEnum.datetime},
        { id:'updatedTime', alias:'Updated Time', dataType:tableau.dataTypeEnum.datetime},
        { id:'validTimes', alias:'Valid Times', dataType: tableua.dataTypeEnum},
        { id:'number', alias:'Day Number', dataype: tableau.dataTypeEnum.int},
        { id:'name', alias:'Day', dataType: tableau.dataTypeEnum.string},
        { id:'strartTime', alaias:'Start Time', dataType:tableau.dataTypeEnum.datetime},
        //
        { id:'shortForecast', alias:'Short Description', dataType:tableau.dataTypeEnum.string}
    ];
    var tableInfo= {
        id: "NOAAWeatherDB",
        alias: "NOAA Weather 7-day Forecast",
        columns: cols
    };
    schemaCallback([tableInfo]);
    };

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.weather.gov/gridpoints/ABR/50,52/forecast", function(resp) {
        var feat = resp,
        tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "geometry": feat[i]["Geometry"],
                "units": feat[i]["Unit"],
                "forecastGenerator": feat[i]["Forecast Generatpr"],
                "generatedat":feat[i]["Generated At"],
                "updatedTime":feat[i]["Updated Time"],
                "number":feat[i]["Day Number"],
                "name":feat[i]["Day"],
                "startTime":feat[i]["Start Time"],
                "shortForecast":feat[i]["Short Description"]
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
