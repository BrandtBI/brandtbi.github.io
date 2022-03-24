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

	myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;
        
      // If we are in the auth phase we only want to show the UI needed for auth
      if (tableau.phase == tableau.phaseEnum.authPhase) {
        $("#getvenuesbutton").css('display', 'none');
      }

      //if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
        // If the API that WDC is using has an endpoint that checks
        // the validity of an access token, that could be used here.
        // Then the WDC can call tableau.abortForAuth if that access token
        // is invalid.
     //   "issuer": "https://cxone.niceincontact.com",
      //  "authorization_endpoint": "https://cxone.niceincontact.com/auth/authorize"
     // }

        var accessToken = Cookies.get("accessToken");
        console.log("Access token is '" + accessToken + "'");
        var hasAuth = (accessToken && accessToken.length > 0) || tableau.password.length > 0;
        updateUIWithAuthState(hasAuth);   

        initCallback();
        
        // If we are not in the data gathering phase, we want to store the token
        // This allows us to access the token in the data gathering phase
            if (tableau.phase == tableau.phaseEnum.interactivePhase || tableau.phase == tableau.phaseEnum.authPhase) {
            if (hasAuth) {
            tableau.password = accessToken;

            if (tableau.phase == tableau.phaseEnum.authPhase) {
              // Auto-submit here if we are in the auth phase
              tableau.submit()
            }

            return;
            }
        }
    };
 
        myConnector.getData = function(table, doneCallback) {   
            var tableData = [];
            
        $.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-21&endDate=2022-03-22&fields=contactId%2CmasterContactId", function(data) {
            var completedContacts = data.completedContacts;
            tableData = [];
            //for each result write entry
            for (var i = 0, len = completedContacts.length; i < len; i++) {
                tableData.push({
                    "contactID":completedContacts[i].contactID,
                    "masterContactID": completedContacts[i].masterContactID    
                    });
            }    
        }); 
            
        table.appendRows(tableData);
        doneCallback();
    };
    }); 
    

        tableau.registerConnector(myConnector);

        $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Completed Contacts";
            tableau.submit();
        });
    });