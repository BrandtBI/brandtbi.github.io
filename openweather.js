(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "city_id", alias : "City ID", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_name", alias : "City Name", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_coord_lat", alias : "Latitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.float},
        { id : "city_coord_lon", alias : "Longitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.float},
        { id : "list_dt", alias : "Time of Data", columnRole: "dimension", dataType : tableau.dataTypeEnum.datetime},
        { id : "list_main_temp", alias : "Temperature", columnRole: "dimension", dataType : tableau.dataTypeEnum.float}
    ];

	var tableInfo = {
		id : "WeatherFeed",
		alias : "5 Day Weather Forecast",
		columns : cols
		};
	
	schemaCallback([tableInfo]);
	};

	myConnector.getData = function(table, doneCallback) {
	//var tableData = [];	
	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=44.3668&lon=100.3538&units=imperial&appid=0bed9dddd956dff3252a42b41eccad89", function(resp) {
        //var list = data.list;
        //var city = data.city;
        var feat = resp.features,
        tableData = [];
    //for each result write entry
        for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
            "city_id":feat[i].city.id,
            "city_name":feat[i].city.name,
            "city_coord_lat":feat[i].coord.lat,
            "city_coord_lon":feat[i].coord.lon,
            "list_dt":feat[i].dt,
            "list_main_temp":feat[i].main.temp
            // "city_id":feat[i]["City ID"],
            // "city_name":feat[i]["City Name"],
            // "city_coord_lat":feat[i]["Latitude"],
            // "city_coord_lon":feat[i]["Longitude"],
            // "list_dt":feat[i]["Time of Data"],
            // "list_main_temp":feat[i]["Temperature"]
            
            // "city_id":city[i].city.id,
            // "city_name":city[i].city.name,
            // "city_coord_lat":city[i].coord.lat,
            // "city_coord_lon":city[i].coord.lon,
            // "list_dt":list[i].dt,
            // "list_main_temp":list[i].main.temp
        });
        }    
    
    	table.appendRows(tableData);
		doneCallback();
		});
	};
	

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WeatherFeed";
        tableau.submit();
    });
});
})();

        