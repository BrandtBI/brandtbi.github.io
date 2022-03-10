(function () {

    var myConnector = tableau.makeConnector();
	myConnector.init = function(initCallback) {
	initCallback();
	tableau.submit();
	};

    myConnector.getSchema = function (schemaCallback) {

    };

	myConnector.getSchema = function (schemaCallback) {
	var cols = [
        { id : "city_id", alias : "City ID", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_name", alias : "City Name", columnRole: "dimension", dataType : tableau.dataTypeEnum.string},
        { id : "city_coord.lat", alias : "Latitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.geometry},
        { id : "city_coord_lon", alias : "Longitude", columnRole: "dimension", dataType : tableau.dataTypeEnum.geometry},
        { id : "list_dt", alias : "Time of Data", columnRole: "dimension", dataType : tableau.dataTypeEnum.datetime},
        { id : "list_main_temp", alias : "Temparture", columnRole: "dimension", dataType : tableau.dataTypeEnum.float},
        
		// { id : "CITY_ID", alias : "CITY_ID", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
		// { id : "DATE", alias : "DATE", dataType : tableau.dataTypeEnum.date },
		// { id : "CITY", alias : "CITY", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
		// { id : "DESCRIPTION", alias : "DESCRIPTION", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
		// { id : "ICON", alias : "ICON", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
		// { id : "CLOUD", alias : "CLOUD", columnRole: "measure", dataType : tableau.dataTypeEnum.float },
		// { id : "DEGREES", alias : "DEGREES", dataType : tableau.dataTypeEnum.float },
		// { id : "MAIN", alias : "MAIN", dataType : tableau.dataTypeEnum.string }
		];

	var tableInfo = {
		id : "WeatherFeed",
		alias : "5 Day Weather Forecast",
		columns : cols
		};
	
	schemaCallback([tableInfo]);
	};

	myConnector.getData = function(table, doneCallback) {
	
	var tableData = [];	
		
	//Sanford	
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=44.3668&lon=100.3538&units=imperial&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
        var list = data.list,
            tableData = [];
			var city = data.city;
			//for each result write entry
			for (i = 0; i < list.length; i++) {
            tableData.push({
                "city_id":city.id,
                "city_name":city.name,
                "city_coord_lat":city.coord.lat,
                "city_coord_lon":city.coord.lon,
                "list.dt":list[i].dt,
                "list_main_temp":list[i].main[0].temp,
                                // "CITY_ID": city.id,
				// "CITY" : city.name,
				// 'DATE': new Date(list[i].dt * 1000),
				// 'MAIN': list[i].weather[0].main,
				// 'DESCRIPTION': list[i].weather[0].description,
				// 'ICON': list[i].weather[0].icon,
				// 'DEGREES': list[i].deg,
				// 'CLOUD': list[i].clouds
				});
			}

			table.appendRows(tableData);
			
		});

	// //Baltimore	
    // $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily/?id=4347778&units=imperial&appid=09bf011b56073de6cff36d95fcc99f44", function(data) {
    //     var list = data.list,
    //         tableData = [];
	// 		var city = data.city;
	// 		//for each result write entry
	// 		for (i = 0; i < list.length; i++) {
    //         tableData.push({
    //             "CITY_ID": city.id,
	// 			"CITY" : city.name,
	// 			'DATE': new Date(list[i].dt * 1000),
	// 			'MAIN': list[i].weather[0].main,
	// 			'DESCRIPTION': list[i].weather[0].description,
	// 			'ICON': list[i].weather[0].icon,
	// 			'DEGREES': list[i].deg,
	// 			'CLOUD': list[i].clouds
	// 			});
	// 		}

	// 		table.appendRows(tableData);
	// 		//doneCallback();
    //    });	
        doneCallback();
	};
	
    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Weather Forecast Feed";
        tableau.submit();
    });
});
})();
        