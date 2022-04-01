import fetch from "node-fetch";

/////////// Retrieve keys from GitHub and save as variables.
    
    var accessKeySecret = 
        async function(){
            await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
            owner: 'brandtbi',
            repo: 'brandtbi.github.io',
            secret_name: 'incaccesskeys'
            })
        }
    console.log("Got here");
    
    var accessKeyId = 
        async function(){
            await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
                owner: 'brandtbi',
                repo: 'brandtbi.github.io',
                secret_name: 'incaccesskeyid'
            })
    }
/////////// InContact Post
        
        const url='https://na1.nice-incontact.com/authentication/v1/token/access-key';
        let data ={
            "accessKeyId": accessKeyId,
            "accessKeySecret": accessKeySecret
        }
        let fetchData ={
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify(data),
                headers:{
                        'content-Type':'application/json'
                }
        }
        fetch(url, fetchData)    
            .then(function(){
                console.log(response.access_token);
            }
            
        );