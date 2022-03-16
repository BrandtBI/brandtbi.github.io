// 


(function () {
    /////////// ABERDEEN
        var myConnector = tableau.makeConnector();
        
        myConnector.getSchema = function (schemaCallback) {
           
            var aberdeenCols = [
            { id : "city", alias : "City", dataType : tableau.dataTypeEnum.string},
            { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
            { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
            { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
            { id : "day", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
            { id : "min", alias : "Min Temp",  dataType : tableau.dataTypeEnum.datetime},
            { id : "max", alias : "Max Temp",  dataType : tableau.dataTypeEnum.float},
            { id : "moonPhase", alias : "Moon Phase",  dataType : tableau.dataTypeEnum.float},
            { id : "humidity", alias : "Humidity", dataType : tableau.dataTypeEnum.float},
            { id : "windSpeed", alias : "Wind Speed", dataType : tableau.dataTypeEnum.float},
            { id : "pop", alias : "Rain Probability", dataType : tableau.dataTypeEnum.float},
            { id : "rain", alias : "Rain Volume", dataType : tableau.dataTypeEnum.float},
            { id : "snow", alias : "Snow Volume", dataType : tableau.dataTypeEnum.float},
            { id : "description", alias : "Weather Description", dataType : tableau.dataTypeEnum.string},
            { id : "icon", alias : "Icon", dataType : tableau.dataTypeEnum.string}
           ];
    
        var tableSchema = {
            id : "aberdeen",
            alias : "Aberdeen Forecast",
            columns : aberdeenCols
            };
        
        //schemaCallback([tableSchema]);
    //	};
    
        // myConnector.getData = function(table, doneCallback) {
        //     let lat = -98.486481;
        //     let lon = 45.464699;
        //     let city = "aberdeen";
        // $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
        //    // var city = data.city;
        //     var daily = data.daily,
        //    // var feat = resp.features,
        //     tableData = [];
        //   //for each result write entry
        //   //  for (var i = 0, len = feat.length; i < len; i++) {
        //    for (var i = 0, len = daily.length; i < len; i++) {
        //    tableData.push({
                
        //         "city":city,
        //         "lat":lat,
        //         "lon":lon,    
        //         "dt":daily[i].dt, 
        //         "temp":daily[i].temp.day,
        //         "min":daily[i].temp.min,
        //         "max":daily[i].temp.max,
        //         "moonPhase":daily[i].moon_phase,
        //         "windSpeed":daily[i].wind_speed,
        //         "description":daily[i].weather.description,
        //         "icon":daily[i].weather.icon
                
        //     });
        //     }    
        
        //      table.appendRows(tableData);
        //      doneCallback();
        //      });
        //  };
     
        //  tableau.registerConnector(myConnector);
        // })();
        
        //     $(document).ready(function () {
        //     $("#submitButton").click(function () {
        //         tableau.connectionName = "Aberdeen";
        //         tableau.submit();
        //     });
        // });
    
    
    ///////// CUSTER
    
        var custerCols = [
        { id : "city", alias : "City", dataType : tableau.dataTypeEnum.string},
        { id : "lat", alias : "Latitude",  dataType : tableau.dataTypeEnum.float},
        { id : "lon", alias : "Longitude",  dataType : tableau.dataTypeEnum.float},
        { id : "dt", alias : "Time Forecasted",  dataType : tableau.dataTypeEnum.datetime},
        { id : "day", alias : "Temperature",  dataType : tableau.dataTypeEnum.float},
        { id : "min", alias : "Min Temp",  dataType : tableau.dataTypeEnum.datetime},
        { id : "max", alias : "Max Temp",  dataType : tableau.dataTypeEnum.float},
        { id : "moonPhase", alias : "Moon Phase",  dataType : tableau.dataTypeEnum.float},
        { id : "humidity", alias : "Humidity", dataType : tableau.dataTypeEnum.float},
        { id : "windSpeed", alias : "Wind Speed", dataType : tableau.dataTypeEnum.float},
        { id : "pop", alias : "Rain Probability", dataType : tableau.dataTypeEnum.float},
        { id : "rain", alias : "Rain Volume", dataType : tableau.dataTypeEnum.float},
        { id : "snow", alias : "Snow Volume", dataType : tableau.dataTypeEnum.float},
        { id : "description", alias : "Weather Description", dataType : tableau.dataTypeEnum.string},
        { id : "icon", alias : "Icon", dataType : tableau.dataTypeEnum.string}
       ];
    
    var tableSchema = {
        id : "custer",
        alias : "Custer Forecast",
        columns : custerCols
        };
    
    schemaCallback([tableSchema]);
    };
       
    
        myConnector.getData = function(table, doneCallback) {
            if (table.tableInfo.id == "aberdeen"){
                let lat = -98.486481;
                let lon = 45.464699;
                let city = "aberdeen";
            }
            else if (table.tableInfo.id == "custer"){
                let lon = -103.598808;
                let lat = -43.766651;
                let city = "custer";
            }
               
            //$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=44.36832&lon=-100.350967&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
               $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {  
            
                var daily = data.daily,
               // var feat = resp.features,
                tableData = [];
              //for each result write entry
              //  for (var i = 0, len = feat.length; i < len; i++) {
               for (var i = 0, len = daily.length; i < len; i++) {
               tableData.push({
                    
                    "city":city,
                    "lat":lat,
                    "lon":lon,    
                    "dt":daily[i].dt, 
                    "temp":daily[i].temp.day,
                    "min":daily[i].temp.min,
                    "max":daily[i].temp.max,
                    "moonPhase":daily[i].moon_phase,
                    "windSpeed":daily[i].wind_speed,
                    "description":daily[i].weather.description,
                    "icon":daily[i].weather.icon
                    
                });
                }    });




    //             if (table.tableInfo.id == "custer"){
    // myConnector.getData = function(table, doneCallback) {
    //         // let lon = -103.598808;
    //         // let lat = -43.766651;
    //         // let city = "custer";
    //     $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=43.766651&lon=-103.598808&units=imperial&exclude=current,minutely,hourly,alerts&lang=en&appid=0bed9dddd956dff3252a42b41eccad89", function(data) {
    //        // var city = data.city;
    //         var daily = data.daily,
    //        // var feat = resp.features,
    //         tableData = [];
    //       //for each result write entry
    //       //  for (var i = 0, len = feat.length; i < len; i++) {
    //        for (var i = 0, len = daily.length; i < len; i++) {
    //        tableData.push({
                
    //             "city":city,
    //             "lat":lat,
    //             "lon":lon,    
    //             "dt":daily[i].dt, 
    //             "temp":daily[i].temp.day,
    //             "min":daily[i].temp.min,
    //             "max":daily[i].temp.max,
    //             "moonPhase":daily[i].moon_phase,
    //             "windSpeed":daily[i].wind_speed,
    //             "description":daily[i].weather.description,
    //             "icon":daily[i].weather.icon
                
    //         });
    //         }    
    //         });
    //     }};
        
            table.appendRows(tableData);
            doneCallback();
         
        tableau.registerConnector(myConnector);
    };});
    
        $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Daily Weather";
            tableau.submit();
        });
    });
    
    