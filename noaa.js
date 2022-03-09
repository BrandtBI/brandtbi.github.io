
// { "$schema": "https://json-schema.org/draft/2020-12/schema" }

// (function () {
//     var myConnector = tableau.makeConnector();

//     myConnector.getSchema = function (schemaCallback) {
//         var cols=[
//             {
//                 "id": "tableau.dataTypeEnum.string",
//                 "type": "Feature",
//                 "properties": {
//                   "geometry": 
//                     {"type":"polygon",
//                     "coordinates":[
//                    [ 
//                     {"type": "tableau.dataTypeEnum.float"},
//                     {"type": "tableau.dataTypeEnum.float"}
//                    ]
//                 ]
//                 }},
//                   "units": "tableau.dataTypeEnum.string",
//                   "forecastGenerator": "tableau.dataTypeEnum.string",
//                   "generatedAt": "tableau.dataTypeEnum.string($date-time)",
//                   "updateTime": "tableau.dataTypeEnum.string($date-time)",
//                   "elevation": {
//                     "value": "tableau.dataTypeEnum.numberFormat",
//                     "maxValue": "tableau.dataTypeEnum.numberFormat",
//                     "minValue": "tableau.dataTypeEnum.numberFormat",
//                     "unitCode": "tableau.dataTypeEnum.string",
//                     "qualityControl": "tableau.dataTypeEnum.string"
//                   },
//                   "periods":
//                         [{
//                       "number": "tableau.dataTypeEnum.numberFormat",
//                       "name": "tableau.dataTypeEnum.string",
//                       "startTime": "tableau.dataTypeEnum.string($date-time)",
//                       "endTime": "tableau.dataTypeEnum.string($date-time)",
//                       "isDaytime": "tableau.dataTypeEnum.boolean",
//                       "temperatureTrend": "tableau.dataTypeEnum.string",
//                       "windDirection": "tableau.dataTypeEnum.string",
//                       "shortForecast": "tableau.dataTypeEnum.string",
//                       "detailedForecast": "tableau.dataTypeEnum.string"
//                          }]
//                  } ] //end of cols
//     };

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
    })();

 
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "NOAA Weather Feed";
        tableau.submit();
    });
});

    

myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id:'id', alias:'ID', dataType: tableau.dataTypeEnum.string},
        //{ id:'geometry', alias:'Geometry',dataype: tableau.dataTypeEnum.geometry},
        //{ id:'units', alias:'Unit', dataType: tableau.dataTypeEnum.string},
        //{ id:'forecastGenerator', alias:'Forecast Generator', dataType: tableau.dataTypeEnum.string},
        //{ id:'generatedat', alias:'Generated At', dataype:tableau.dataTypeEnum.datetime},
        //{ id:'updatedTime', alias:'Updated Time', dataType:tableau.dataTypeEnum.datetime},
        //{ id:'validTimes', alias:'Valid Times', dataType: tableua.dataTypeEnum.}
        //{ id:'number', alias:'Day Number', dataype: tableau.dataTypeEnum.int},
        //{ id:'name', alias:'Day', dataType: tableau.dataTypeEnum.string},
        //{ id:'strartTime', alaias:'Start Time', dataType:tableau.dataTypeEnum.datetime},
        //
        //
        { id:'shortForecast', alias:'Short Description', dataType:tableau.dataTypeEnum.string}
        //
        //
     ];

    var tableSchema = {
        id: "NOAAWeatherDB",
        alias: "NOAA Weather 7-day Forecast",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.weather.gov/gridpoints/ABR/50,52/forecast", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                //"geometry": feat[i].geometry,
                //"units": feat[i].properties.units,
                //"forecastGenerator": feat[i].properties.forecastGenerator,
                //"generatedat":feat[i].properties.generatedat,
                //"updatedTime":feat[i].properties.updatedTime,
                //"number":feat[i].properties.number,
                //"name":feat[i].properties.name,
                //"startTime":feat[i].properties.startTime,
                //"shortForecast":feat[i].properties.shortForecast
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};



