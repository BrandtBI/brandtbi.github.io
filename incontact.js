//////////////////////////////////////////////////////////////////
////// InContact API
/////  
/////  Created by Stephanie Davis
/////  Created on 3/24/2022
/////  Modified on 
//////////////////////////////////////////////////////////////////

(function () {

    var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function (schemaCallback) {
       
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
       // var lastdate = parseInt(table.incrementValue || -1);
        var tableData=[];
    
        
	$.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-21&endDate=2022-03-22&fields=contactID%2CmasterContactID", function(data) {
        var daily = data.completedContacts;
       tableData = [];
      //for each result write entry
       for (var i = 0, len = completedContacts.length; i < len; i++) {
       tableData.push({
            "contactID":completedContacts[i].contactID,
            "masterContactID": completedContacts[i].masterContactID    
            
            ///"date":(new Date(daily[i].dt*1000).toLocaleString()), 
          });
        }    
    
     	table.appendRows(tableData);
        doneCallback();
  }); 
  };

    tableau.registerConnector(myConnector);

	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Completed Contacts";
        tableau.submit();
    });
});
})();