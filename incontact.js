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
            //accept:"application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader('Accept','application/json');
                xhr.setRequestHeader('Authorization','Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjYzLCJpY0FnZW50SWQiOjIwNzg2NDA1LCJzdWIiOiJ1c2VyOjIwNzg2NDA1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW5jb250YWN0LmNvbSIsImljQlVJZCI6NDU5NTk2NCwiZ2l2ZW5fbmFtZSI6IlN0ZXBoYW5pZSIsImF1ZCI6IkRldmVsb3BlclBvcnRhbEBOSUNFaW5Db250YWN0IEluYy4iLCJuYW1lIjoic3RlcGhhbmllLmRhdmlzQGJyYW5kdGluZm8uY29tIiwidGVuYW50SWQiOiIxMWU5ZWJlNC05YmNiLThiOWUtODEwNy0wMDUwNTZhMTQwNzQiLCJmYW1pbHlfbmFtZSI6IkRhdmlzIiwiaWNDbHVzdGVySWQiOiJDMTQiLCJuYmYiOjE2NDg1MDAyNTcsImljU2NvcGUiOiIxLDIsNCw1LDYsNyw4LDEwLDEyIiwiaWF0IjoxNjQ4NTAwMjU3LCJleHAiOjE2NDg1MDM4NTd9.EJv6rA5shnQs61ADtnSb2LCJ3J32ROW2T7GmF8DyS1VTCmFWv38Vch9s7U0SDP6cxJwiyK4KaN37nml6B5NPtos8DyT_pwortGLjzizNELCC3J8lxB_iOh8OOkB086ia_iXsKXcTI8w-6zGvlTkCBmdI3bOtZyeT28j4R8InOKq8LQzOFlP8O0ZoCBL2jUVi2Qd3Oko64WrX8FuipcQVTYNzlRbuT-BFvTy_XxG_EkXN4rz2vVrjk-Bhn18MMkRZ-UqSQPvGlxzX2HZiJzBpCM3iDHUg1cslccGH0AZqmZ3B5l9sx7Zb98AzUPtCuNPX99nsnTSyNF1247i64Ag8MA')
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