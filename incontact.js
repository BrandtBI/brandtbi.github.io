//////////////////////////////////////////////////////////////////
////// InContact API
/////  
/////  Created by Stephanie Davis
/////  Created on 3/24/2022
/////  Modified on 
//////////////////////////////////////////////////////////////////


(function () {
 
/////////// Retrieve keys from GitHub and save as variables.
    var accessKeySecret = 
        await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
            owner: 'brandtbi',
            repo: 'brandtbi.github.io',
            secret_name: 'incaccesskeys'
        })
        
        var accessKeyId = 
        await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
            owner: 'brandtbi',
            repo: 'brandtbi.github.io',
            secret_name: 'incaccesskeyid'
        })

/////////// InContact Post
    var url = "https://na1.nice-incontact.com/authentication/v1/token/access-key";
    var xhrp = new XMLHttpRequest();
    xhrp.open("POST", url);
    
    xhrp.setRequestHeader("Accept", "application/json");
    xhrp.setRequestHeader("Host", "na1.nice-incontact.com");
    xhrp.setRequestHeader("Content-Type", "application/json");
    //xhrp.setRequestHeader("Authorization", "Bearer ...");
    body = {
        "accessKeyId": accessKeyId,
        "accessKeySecret": accessKeySecret
    };
    xhrp.onreadystatechange = function () {
        if (xhrp.readyState === 4) {  ///https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        const inckey = JSON.parse(xhrp.responseText);
            return{
            'access_token':inckey.response.access_token
            }
        }
        else{
            console.error();
        }
    } 
    //xhrp.send(body);

    


///////// Tableau Connector

    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
    
        var cols = [
                { id : "contactId", alias: "Contact ID", dataType : tableau.dataTypeEnum.int},
                { id : "masterContactId", alias: "Master ID", dataType : tableau.dataTypeEnum.int}
        ];
    
        var tableSchema = {
            id : "inContact",
            alias : "Completed Contacts",
            columns : cols
            // incrementColumnId: "date"
            };
        
        schemaCallback([tableSchema]);
        };
    
     
        myConnector.getData = function(table, doneCallback) {   
            
            $.ajax({
                type:'GET',    
                url: "https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-23&endDate=2022-03-24&fields=contactID%2CmasterContactID",
                dataType:'json',
                //contentType:'application/json'
                //processData:false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader('accept','application/json');
                    xhr.setRequestHeader('Authorization','Bearer' + access_token)
                },
                success: function(data){
          //  });
           /////$.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",function(data){
                var contacts = data.completedContacts;
                tableData = [];
                //for each result write entry
                for (var i = 0, len = contacts.length; i < len; i++) {
                    tableData.push({
                        "contactId":contacts[i].contactId,
                        "masterContactId": contacts[i].masterContactId    
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
                tableau.connectionName = "Completed Contacts"
                tableau.submit();
            });
        });
        })();