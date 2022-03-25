//////////////////////////////////////////////////////////////////
////// InContact API
/////  
/////  Created by Stephanie Davis
/////  Created on 3/24/2022
/////  Modified on 
//////////////////////////////////////////////////////////////////
//var token='';

(function () {

    var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
    // // // //    $.ajax({
    // // // //        url:"https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",
    // // // //         type:"GET",
    // // // //         headers:{
    // // // //             'Autjorization': 'Token' + JSON.parse(tableau.connectionDate)['apiKey']
    // // // //         },
    // // // //         success : function(response){
    // // // //             var flatten = objectFlatten(response)
    // // // //             var columns = []
    // // // //             for (var key in flatten) {
    // // // //                 var id = key.replace(/[^A-Za-z0-9_]+/g, '')
    // // // //                 columns.push({
    // // // //                     id: id,
    // // // //                     alias: key,
    // // // //                     dataType: tableauType(flatten[key])
    // // // //                 })
    // // // //             }
    // // // //         }
    // // // //     })


        var cols = [
            { id : "contactID", alias: "Contact ID", dataType : tableau.dataTypeEnum.int},
            { id : "masterContactID", alias: "Master ID", dataType : tableau.dataTypeEnum.int}
        ];

	var tableSchema = {
		id : "inContact",
		alias : "Completed Contacts",
		columns : cols,
        // incrementColumnId: "date"
		};
    
	schemaCallback([tableSchema]);
    };

 
    myConnector.getData = function(table, doneCallback) {   
        $.ajax({
                url:"https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",
                type:"GET",
                headers:{
                        'Authorization': 'Token' + JSON.parse(tableau.connectionDate)['apiKey']
                    },
            success : function(response){
                var completedContacts = data.completedContacts;
                tableData = [];
            //for each result write entry
            for (var i = 0, len = completedContacts.length; i < len; i++) {
                tableData.push({
                    "contactID":completedContacts[i].contactID,
                    "masterContactID": completedContacts[i].masterContactID    
                    });
            }    
                    
        table.appendRows(tableData);
        doneCallback();
    },
    }); 
    
    };
        tableau.registerConnector(myConnector);

        $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Completed Contacts";
            tableau.connectionData = JSON.stringify({
                'apiKey' : $("api.Key").val(),
            });  
            })
            tableau.submit();
        });
    });