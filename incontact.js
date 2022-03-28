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
            url:"https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-26&endDate=2022-03-27&fields=contactId%2CmasterContactId",
            //accept:"application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader('Accept','application/json');
                xhr.setRequestHeader('Authorization','Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjYzLCJpY0FnZW50SWQiOjIwNzg2NDA1LCJzdWIiOiJ1c2VyOjIwNzg2NDA1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW5jb250YWN0LmNvbSIsImljQlVJZCI6NDU5NTk2NCwiZ2l2ZW5fbmFtZSI6IlN0ZXBoYW5pZSIsImF1ZCI6IkRldmVsb3BlclBvcnRhbEBOSUNFaW5Db250YWN0IEluYy4iLCJuYW1lIjoic3RlcGhhbmllLmRhdmlzQGJyYW5kdGluZm8uY29tIiwidGVuYW50SWQiOiIxMWU5ZWJlNC05YmNiLThiOWUtODEwNy0wMDUwNTZhMTQwNzQiLCJmYW1pbHlfbmFtZSI6IkRhdmlzIiwiaWNDbHVzdGVySWQiOiJDMTQiLCJuYmYiOjE2NDg1MDIwNDEsImljU2NvcGUiOiIxLDIsNCw1LDYsNyw4LDEwLDEyIiwiaWF0IjoxNjQ4NTAyMDQxLCJleHAiOjE2NDg1MDU2NDF9.hV3u-QCZeNea-tlMZVJdEYcq2sFpQWHN_sxC49XZR7KRExNNsb0MWtcvcCaXqyhe8Aw4CU1jTO6ORRa9swZgwasAWOAO4cJU3eyBmpq0JWBTZU4BeCGXWAu84NNLCaHHhLnjJEcAwa-ckVlFOV_fGsFZOZDHxm690nMBdpgPN3ZFCureSM9dHOeH6x2SzQHLNYAPkJmKBvQeE7JAHqDrEyyfe17xXjJ5uUYjJuhrWYSpXna93YUsRKaVEP32dlJgKVy9ZZJxfHv2dmDk3NUnGP3Y2_13203Eh8hC4ANazvQNO5WIHay7BSdd0Og816Vh1W9s3FagLNptHjf11dyevg')
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