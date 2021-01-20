function createElement(element) {
    return document.createElement(element);
}
  
function append(element) {
    return document.body.append(element);
}
  
function appendChild(element, child) {
    return element.appendChild(child);
}
  
function setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}

let main_cont = createElement('div')
setAttribute(main_cont,'claas','container-fluid container-lg container-md container-sm container-xl')
append(main_cont)

let banner = createElement('div')
setAttribute(banner,'class',"bg")
appendChild(main_cont,banner)



let banner_name = createElement('h1')
setAttribute(banner_name,'class','text-center')
banner_name.innerText= "GITHUB WEB APP"
appendChild(main_cont,banner_name)

let content = createElement('div')
setAttribute(content,'class','font2')
content.innerText="Want to search GITHUB user's and their repos."
appendChild(main_cont,content)

let src = createElement('div')
setAttribute(src,'class','form-group')
src.innerHTML=`<label for="src" class="font1">Search user's here</label> <br>
<input type="src" class="box" id="src" placeholder="User Name">
<button type="submit" class="btn btn-primary box2" id="button1">Submit</button>`
appendChild(main_cont,src)

let row1 = createElement('div')
setAttribute(row1,'id','row1')
row1.innerHTML=""
appendChild(main_cont,row1)

let row2 = createElement('div')
setAttribute(row2,'id','row2')
row2.innerHTML=""
appendChild(main_cont,row2)

let row3 = createElement('div')
setAttribute(row3,'id','row3')
row3.innerHTML=""
appendChild(main_cont,row3)

let input = document.getElementById("src")
let button1 = document.getElementById("button1")
let contentRow1 = document.getElementById("row1")
let contentRow2 = document.getElementById("row2")
let contentRow3 = document.getElementById("row3")

button1.addEventListener("click",function(){
    let inputData= input.value
    originalname = inputData.split(" ").join("")
    console.log(originalname)
    async function getData(){   
        try{
            let apiResponse = await fetch('https://api.github.com/users/'+originalname)
            let apiData = apiResponse.json()
            return apiData;
        }catch(err){
            console.log(err)
        }
        
    };
    getData().then((data)=>{
        console.log(data)
        contentRow1.innerHTML=" "
        if(data.message == "Not Found"){
            let noout = createElement('div')
            setAttribute(noout,'class','font2')
            noout.innerText=inputData + " Sorry, such user does not exist's please try a another name."
            appendChild(contentRow1,noout)
            input.value=" "
        }
        if(data.type =="User"){

            let title = createElement("div")
            setAttribute(title,'class','font2')
            title.innerText=" User Found:-"
            appendChild(contentRow1,title)

            let btn = createElement('a')
            setAttribute(btn, 'href', data.html_url);
            setAttribute(btn, 'target', '_blank')
            appendChild(contentRow1,btn)

            let user = createElement("div")
            setAttribute(user,'class','font1 center2')
            user.innerText=  data.login
            appendChild(btn,user)

            let avatar = createElement("div")
            setAttribute(avatar,'class','font1 center2')
            avatar.innerHTML= '<img src=' + data.avatar_url +' alt="Cinque Terre" class="" width="300" height="200">'
            appendChild(contentRow1,avatar)

            let info =createElement('div')
            appendChild(contentRow1,info)

            let title2 = createElement("div")
            setAttribute(title2,'class','font1')
            title2.innerText= "To get all repos or find repo by name. "
            appendChild(contentRow1,title2)

            let repos = createElement("div")
            setAttribute(repos,'class','')
            repos.innerHTML=`<label for="repos" class="font1">Search repos here</label> <br>
            <label for="repos" class="padding">* repos name are case sensitive/Symbol give a correct repo name if given worng input returns no Repo found.</label>
            <input type="repos" class="box" id="repos" placeholder="Repo name">
            <button type="submit" class="btn btn-primary box2" id="button2">Submit</button>
            <button type="submit" class="btn btn-primary box2" id="button3">list repo</button>`
            appendChild(contentRow1,repos)

            let title3 = createElement("div")
            setAttribute(title3,'class','font1')
            title3.innerText= "To get all files in repos  "
            appendChild(contentRow1,title3)

            let reposf = createElement("div")
            setAttribute(reposf,'class','')
            reposf.innerHTML=`<label for="reposf" class="font1">Search files in repos here</label> <br>
            <label for="reposf" class="padding">* repos name are case sensitive/Symbol give a correct repo name if given worng input returns no Repo found.</label>
            <input type="reposf" class="box" id="reposf" placeholder="Repo name">
            <button type="submit" class="btn btn-primary box2" id="button4">list files</button>`
            appendChild(contentRow1,reposf)


            let input2 = document.getElementById("repos")
            let input3 = document.getElementById("reposf")
            let button2 = document.getElementById("button2")
            let contentRow2 = document.getElementById("row2")
            let contentRow3 = document.getElementById("row3")
            let button3 = document.getElementById("button3")
            let button4 = document.getElementById("button4")
            button3.addEventListener("click",function(){
                contentRow2.innerHTML=" "
                inputData2 = input2.value
                async function getData(){   
                    try{
                        let apiResponse = await fetch('https://api.github.com/users/'+inputData+'/repos' )
                        let apiData = apiResponse.json()
                        return apiData;
                    }catch(err){
                        console.log(err)
                    }
                }; 
                getData().then((data)=>{
                    console.log(data)
                    let output = createElement('div')
                    setAttribute(output,'class','font1')
                    output.innerText="Repos found in "+inputData+' are:-'
                    appendChild(contentRow2,output)
                    for (let i=0;i<data.length;i++){
                        let result = createElement('p')
                        result.innerText= i+1 +". " + data[i].name 
                        appendChild(output,result)
                    }
                })
            })

            button2.addEventListener("click",function(){
                contentRow2.innerHTML=" "
                inputData2 = input2.value
                async function getData(){   
                    try{
                        let apiResponse = await fetch('https://api.github.com/repos/'+inputData+'/'+inputData2 )
                        let apiData = apiResponse.json()
                        return apiData;
                    }catch(err){
                        console.log(err)
                    }
                }; 
                getData().then((data)=>{
                    console.log(data)
                    if(data.message == 'Not Found'){
                        let noout1 =createElement('div')
                        setAttribute(noout1,'class','font1')
                        noout1.innerText=' no repo found in '+inputData
                        appendChild(contentRow2,noout1)
                    }
                    else{
                            if(inputData2==data.name){

                                let result = createElement('div')
                                setAttribute(result,'class','font1')
                                result.innerText= "Repo found in user  " + inputData + " "+ inputData2 
                                appendChild(contentRow2,result)
                            }
                    }
                    
                
                })
                button4.addEventListener("click",function(){
                    contentRow3.innerHTML=" "
                    inputData3 = input3.value
                    async function getData(){   
                        try{
                            let apiResponse = await fetch('https://api.github.com/repos/'+inputData+'/'+inputData3+'/contents?')
                            let apiData = apiResponse.json()
                            return apiData;
                        }catch(err){
                            console.log(err)
                        }
                    }; 
                    getData().then((data)=>{
                        console.log(data)
                        if(data.message == 'Not Found'){
                            let filet =createElement('div')
                            setAttribute(filet,'class','font1')
                            filet.innerText=' no Files found in repo '+inputData3
                            appendChild(contentRow3,filet)
                        }
                        else{
                            let filet =createElement('div')
                            setAttribute(filet,'class','font1')
                            filet.innerText='Files found in repo '+inputData3+' are:-'
                            appendChild(contentRow3,filet)
                            for(let i=0;i<data.length;i++){
                                let result = createElement('div')
                                setAttribute(result,'class','font1')
                                result.innerText= i+1 +". " +data[i].name
                                appendChild(contentRow3,result)
                            }

                        }
                        
                    })
                })

                

})
}
})        
})
    
