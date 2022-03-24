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
       //// var lastdate = parseInt(table.incrementValue || -1);
       //// var tableData=[];
        var url = "https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-21&endDate=2022-03-22&fields=contactId%2CmasterContactId%2CmediaTypeName%2CskillId%2CskillName%2CcampaignId%2CcampaignName";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjIxNCwiaWNBZ2VudElkIjoyMDA3NTAwNywic3ViIjoidXNlcjoyMDA3NTAwNyIsImlzcyI6Imh0dHBzOi8vYXBpLmluY29udGFjdC5jb20iLCJpY0JVSWQiOjQ1OTU5NjQsImdpdmVuX25hbWUiOiJTdGVwaGVuIiwiYXVkIjoiRGV2ZWxvcGVyUG9ydGFsQE5JQ0VpbkNvbnRhY3QgSW5jLiIsIm5hbWUiOiJzdGVwaGVuLnNsb3R0ZXJAYnJhbmR0aW5mby5jb20iLCJ0ZW5hbnRJZCI6IjExZTllYmU0LTliY2ItOGI5ZS04MTA3LTAwNTA1NmExNDA3NCIsImZhbWlseV9uYW1lIjoiU2xvdHRlciIsImljQ2x1c3RlcklkIjoiQzE0IiwibmJmIjoxNjQ4MTI5NTk2LCJpY1Njb3BlIjoiMSwyLDQsNSw2LDcsOCwxMCwxMiIsImlhdCI6MTY0ODEyOTU5NiwiZXhwIjoxNjQ4MTMzMTk2fQ.DKDYqR2ydXXzbpRbbsW86AeNxIGde_YRKCjGTcRPgpRiNSS2o7wG7hsWkWhnGS0lv8CeMG8mYytRzLKHDpfSs24mg-5iYRIDekmalPFfyHGQo6ip1hw4NrNzy6tUMg_3BIZglnJ6z9vuCUT7V8HKZY1WDAAcJJB7b7OSY4gh4fSHXbYvV7wbAsIooMZfmYwK_rCmTIWBh35EgAKyiuLUmrQNym2AlC4kmy0UsBr23ZhuFuZSTT_YRN3DZukux3rLqnsLwrWvZ04xczSAQ3cfIVs79K-_8tOgRg_B2aIT7Lgm_OSvAeJ1Q6DaqIAB7hjxaryuW5po5pZuJ3oPTaDqqA");
        xhr.onreadystatechange = function (data) {
          if (xhr.readyState === 4) {
            var daily = data.completedContacts;
            tableData = [];
           //for each result write entry
            for (var i = 0, len = completedContacts.length; i < len; i++) {
            tableData.push({
                 "contactID":completedContacts[i].contactID,
                 "masterContactID": completedContacts[i].masterContactID    
                });
             }    
        }; 
            //  console.log(xhr.status);
           //   console.log(xhr.responseText);
         //  }};
        // xhr.send();
   	table.appendRows(tableData);
    doneCallback();
  };}; 
 })

    tableau.registerConnector(myConnector);

	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Completed Contacts";
        tableau.submit();
    });
});
//})();




// // 	////////////$.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-21&endDate=2022-03-22&fields=contactID%2CmasterContactID", function(data) {
// //         var daily = data.completedContacts;
// //        tableData = [];
// //       //for each result write entry
// //        for (var i = 0, len = completedContacts.length; i < len; i++) {
// //        tableData.push({
// //             "contactID":completedContacts[i].contactID,
// //             "masterContactID": completedContacts[i].masterContactID    
            
// //             ///"date":(new Date(daily[i].dt*1000).toLocaleString()), 
// //           });
// //         }    
    
// //      	table.appendRows(tableData);
// //         doneCallback();
// //   }); 
// //   };

// //     tableau.registerConnector(myConnector);

// // 	$(document).ready(function () {
// //     $("#submitButton").click(function () {
// //         tableau.connectionName = "Completed Contacts";
// //         tableau.submit();
// //     });
// // });
// // })();