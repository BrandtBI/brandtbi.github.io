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
        tableData = [];
        $.ajax({
            type:"GET",    
            url:"https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",
            accept:'application/json',
            beforeSend:function(xhr){
                xhr.setRequestHeader('Accept','application/json');
                xhr.setRequestHeader('Authorization','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjYzLCJpY0FnZW50SWQiOjIwNzg2NDA1LCJzdWIiOiJ1c2VyOjIwNzg2NDA1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW5jb250YWN0LmNvbSIsImljQlVJZCI6NDU5NTk2NCwiZ2l2ZW5fbmFtZSI6IlN0ZXBoYW5pZSIsImF1ZCI6IkRldmVsb3BlclBvcnRhbEBOSUNFaW5Db250YWN0IEluYy4iLCJuYW1lIjoic3RlcGhhbmllLmRhdmlzQGJyYW5kdGluZm8uY29tIiwidGVuYW50SWQiOiIxMWU5ZWJlNC05YmNiLThiOWUtODEwNy0wMDUwNTZhMTQwNzQiLCJmYW1pbHlfbmFtZSI6IkRhdmlzIiwiaWNDbHVzdGVySWQiOiJDMTQiLCJuYmYiOjE2NDg0Nzc0NjEsImljU2NvcGUiOiIxLDIsNCw1LDYsNyw4LDEwLDEyIiwiaWF0IjoxNjQ4NDc3NDYxLCJleHAiOjE2NDg0ODEwNjF9.tzmpYAWPv-CRx2MZXNw8XNh4kvcZpw2UDuMRZGBk1DYIg3Cz4e22p-nJkNWysktWvWu8N-s8iSv5olrb0x-7NPtzlDyAfk8whqhgp5URfKNRxeoaA2Zi2QzOMRarbfIzrSFV9deVo0rEi_Rl-ETMfySte0HmXwVk8Vu8hQ9cwIijpEgvu_nHKfKWWWPKWMswOzIYGBqvMZapi7cif9fYW8dPzP4hB8_DWy8Tm5VnEMu5l9_e9axkAfdTjGTDY231NmnOIZiS3JupyycGogeac8USiUOvwH3mUOg5FxXJhtulxKU0z_6nJiq6qH4RRGWH70QmOr7HgBwj0UlYn4ArWw')
                    },
            success : function(data){
               if(data.completedContacts){
                var contacts = data.completedContacts;
                
            //for each result write entry
            var ii;
            for (ii = 0; ii <contacts.length; ++i) {
                tableData.push({
                    "contactID":contacts[i].contactID,
                    "masterContactID": contacts[i].masterContactID    
                    });
            }    
                    
        table.appendRows(tableData);
        doneCallback();
    }

    },

    
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