const fs = require("fs");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];
let Data = [];
let findData = "";
let replaceData = "";

for (let i of arguments) {
    
    if (i[0] == "-") {
        flags.push(i);
    } else if (i[0] == "#") {
        secondaryArguments.push(i.slice(1));
    } else if (i[0] == ">") {
        Data.push(i.slice(1));
    }else if(i[0]+i[1] == "f-"){
        findData=i.slice(2);
    }else if(i[0]+i[1] == 'r-'){
        replaceData=i.slice(2);
    }
    else {
        filenames.push(i);
    }
}

for (let file of filenames) {

    if(!fs.existsSync(file)){
        console.log("File not present");
        
        for(flag of flags){
            if (flag == "-w") {
                let fileData="";
                for (let newData of Data) {
                    fileData += " " + newData;
                }
                fs.writeFileSync(file, fileData);
                console.log('New File is created and Data is added to the new file');
            }
        }
        continue;
    }

    let fileData = fs.readFileSync(file, "utf-8");
    if(flags.length==0){
        console.log(fileData);
    }

    for (let flag of flags) {
        
        if (flag == "-rs") {
            fileData = removeAll(fileData," ");
            console.log(fileData);
        }
        if (flag == "-rn") {
            fileData = removeAll(fileData,"\n");
            console.log(fileData);
        }
        if (flag == "-rsc") {
            for (let remove of secondaryArguments) {
                fileData = removeAll(fileData, remove);
            }
            console.log(fileData);
        }
        if (flag == "-w") {
            fileData+= '\n';
            for (let newData of Data) {
                fileData += " " + newData;
            }
            fs.writeFileSync(file, fileData);
            console.log('Data is added to the new file');
        }
        if(flag == '-s'){
            let ans =addSequence(fileData);
            console.log(ans.join("\n"));
        }
        if(flag == "-sn"){
            let ans = addSequenceNumbers(fileData);
            for(let i=0;i<ans.length;i++){
                console.log(ans[i]);
            }
        }
        if(flag=="-rel"){
            let ans = removeExtraLine(fileData);
            for(let i=0;i<ans.length;i++){
                console.log(ans[i]);
            }
        }
        if(flag=="-fr"){
            fileData = findAndReplace(fileData , findData , replaceData);
            console.log(fileData);
        }
        if(flag == '-U'){
            fileData = fileData.toUpperCase();
            console.log(fileData);
        }
        if(flag == 'L'){
            fileData = fileData.toLowerCase();
            console.log(fileData);
        }
    }
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function findAndReplace( data , findData , replaceData){
    let dataArr = data.split(findData);
    let Data = dataArr.join(replaceData);
    return Data;
}

function addSequence(content){
    let arr=content.split("\n");
    
    for(let i=0 ; i<arr.length;i++){
        arr[i]= (i+1)+". "+arr[i];
    }
    return arr;
}

function addSequenceNumbers(content){
    let arr=content.split("\n");
    let count =1;
    for(let i=0 ; i<arr.length;i++){
        if(arr[i]!=""){
            arr[i]=(count) +" " + arr[i];
            count++;
        }
    }
    return arr;
}

function removeExtraLine(filedata){
    let contentArr = filedata.split("\n");
    let data= [];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}
