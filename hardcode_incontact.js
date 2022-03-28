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
		columns : cols
        // incrementColumnId: "date"
		};
    
	schemaCallback([tableSchema]);
    };

 
    myConnector.getData = function(table, doneCallback) {   
        
        $.ajax({
            type:'GET',    
            url: "https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",
            dataType:'json',
            //contentType:'application/json'
            //processData:false,
            beforeSend:function(xhr){
                xhr.setRequestHeader('accept','application/json');
                xhr.setRequestHeader('Authorization','Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpY1NQSWQiOjYzLCJpY0FnZW50SWQiOjIwNzg2NDA1LCJzdWIiOiJ1c2VyOjIwNzg2NDA1IiwiaXNzIjoiaHR0cHM6Ly9hcGkuaW5jb250YWN0LmNvbSIsImljQlVJZCI6NDU5NTk2NCwiZ2l2ZW5fbmFtZSI6IlN0ZXBoYW5pZSIsImF1ZCI6IkRldmVsb3BlclBvcnRhbEBOSUNFaW5Db250YWN0IEluYy4iLCJuYW1lIjoic3RlcGhhbmllLmRhdmlzQGJyYW5kdGluZm8uY29tIiwidGVuYW50SWQiOiIxMWU5ZWJlNC05YmNiLThiOWUtODEwNy0wMDUwNTZhMTQwNzQiLCJmYW1pbHlfbmFtZSI6IkRhdmlzIiwiaWNDbHVzdGVySWQiOiJDMTQiLCJuYmYiOjE2NDg1MDY5MDAsImljU2NvcGUiOiIxLDIsNCw1LDYsNyw4LDEwLDEyIiwiaWF0IjoxNjQ4NTA2OTAwLCJleHAiOjE2NDg1MTA1MDB9.YwQzmPZKrQ1Nsea-PTnVShwiI0jpgMcewzn43BqHOAC68iecJEOYtr81dmwl4vO0wMZLSZR-eK8ShdkET6R39K3md0eJVSDXaJm2_Btpib0wMJ_N9MJY_Ddoizciz2Zfl0uRyLBhAPH5rFzk19Yv19TExFc0QDRSeCydzmfO8gmHomYO7TG_PiCMgygAP6n_l7vPjK6XihvSZ_BvTjpaQB-kUVGjbJ68F6ZApdbv_YpNyN5sXS8uYzIY3AFQjQNxMIYGaT_Q3YnOsVolXG1wv2T0xwblwFzeyvlUo9zltoOHujIfbjyhS3MppPJ1ql-mkR8s2nECbeu52d89eMIW3w')
            },
            success: function(data){
      //  });
       /////$.getJSON("https://api-c14.incontact.com/inContactAPI/services/v23.0/contacts/completed?startDate=2022-03-22&endDate=2022-03-23&fields=contactID%2CmasterContactID",function(data){
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