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
        
        $.ajax({
            type:"GET",    
            //url:'https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID',
            accept:'application/json',
            beforeSend:function(xhr){
                xhr.setRequestHeader('Accept','application/json');
                xhr.setRequestHeader('Authorization','bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjYzLCJpY0FnZW50SWQiOjIwNzg2NDA1LCJzdWIiOiJ1c2VyOjIwNzg2NDA1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW5jb250YWN0LmNvbSIsImljQlVJZCI6NDU5NTk2NCwiZ2l2ZW5fbmFtZSI6IlN0ZXBoYW5pZSIsImF1ZCI6IkRldmVsb3BlclBvcnRhbEBOSUNFaW5Db250YWN0IEluYy4iLCJuYW1lIjoic3RlcGhhbmllLmRhdmlzQGJyYW5kdGluZm8uY29tIiwidGVuYW50SWQiOiIxMWU5ZWJlNC05YmNiLThiOWUtODEwNy0wMDUwNTZhMTQwNzQiLCJmYW1pbHlfbmFtZSI6IkRhdmlzIiwiaWNDbHVzdGVySWQiOiJDMTQiLCJuYmYiOjE2NDg0OTQ2MjYsImljU2NvcGUiOiIxLDIsNCw1LDYsNyw4LDEwLDEyIiwiaWF0IjoxNjQ4NDk0NjI2LCJleHAiOjE2NDg0OTgyMjZ9.aWM0VANiiLMKqM6TzVljtJQXloknIF0UNoVqMVOTTHj3So3BAx4daKEnHccTOamG-CoVfcQ6QluVaqmu-g_77GjW80HJZRXAm2vksxyRzc0A4faMUm8iK-tR1zefJQssXMX-DdXZPNUMdbwX9lgBQMrbOEhGJ9KO9yVvfEKO2zrACDHMfBZ_JA35WleNCJFdPzMFZfSRV8oo1xByu3tNByhueWyBhEdt1rip2ZHkEJMRBzRjMYzf49NcIb1hic48wr9zVVk80nttquJCB1nUh7wi5BT_KGXkS94Nk4jO-_md5nE2DidoZtmIFrMCtlE6E6OtXyaRVfs5QQGY6Q_72w')
                    },
            });
        $.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",function(data){
            var contacts = data.completedContacts;
            tableData = [];
            //for each result write entry
            for (var i = 0, len = contacts.length; i < len; i++) {
                tableData.push({
                    "contactID":contacts[i].contactID,
                    "masterContactID": contacts[i].masterContactID    
                });
            }    
                    
        table.appendRows(tableData);
        doneCallback();
    });
};
        tableau.registerConnector(myConnector);

        $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Completed Contacts"
        })
        
        tableau.submit();
        });
    });