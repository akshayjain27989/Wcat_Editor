#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2);//removing elements at index 0 and 1 which are file names and 

let flags = [];//commands in wcat
let filenames = [];//file names
let secondaryArguments = [];//for secondary arguments of a specific command
let Data = [];// for adding new data

//console.log(process.argv);

for (let i of arguments) {
    
    if (i[0] == "-") {
        flags.push(i);
    } else if (i[0] == "#") {
        secondaryArguments.push(i.slice(1));
    } else if (i[0] == ">") {
        Data.push(i.slice(1));
    }
    else {
        filenames.push(i);
    }
}
// console.log(flags);
// console.log(filenames);

// if(flags.length == 0 && filenames.length!=0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }else{
//     for(let flag of flags){
//         if(flag == "-rs"){
//             for(let file of filenames){
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 // let fileDataArray = fileData.split(" ");
//                 // console.log(fileDataArray);

//                 console.log(fileData.split(" ").join(" "));
//             }
//         }
//     }
// }

// if(flag == "-rsc"){
        //     let tempString = "";
        //     for(let character of fileData){
        //         if( (character.charCodeAt(0)>=65 && character.charCodeAt(0)<=90)||
        //          (character.charCodeAt(0)>=97 && character.charCodeAt(0)<=122)){
        //              tempString+=character;
        //          }
        //     }
        //     fileData=tempString;
        // }

//better way 

for (let file of filenames) {
    let fileData = fs.readFileSync(file, "utf-8");
    for (let flag of flags) {
        
        if (flag == "-rs") {
            
            fileData = fileData.split(" ").join("");
        }
        if (flag == "-rn") {
            fileData = removeAll(fileData,"\r\n");
        }
        if (flag == "-rsc") {
            for (let remove of secondaryArguments) {
                fileData = removeAll(fileData, remove);
            }
        }
        if (flag == "-w") {
            for (let newData of Data) {
                fileData += " " + newData;
            }
            fs.writeFileSync(file, fileData);
        }
        if(flag == '-s'){
           // console.log(fileData);
            let ans =addSequence(fileData);
            console.log(ans.join("\r\n"));
            //console.log(ans);
        }
        if(flag == "-sn"){
            let ans = addSequenceTnle(fileData);
            console.log(ans);
        }
        if(flag=="-rel"){
            let ans = removeExtraLine(fileData);
            console.log(ans);
        }

    }
   //console.log(fileData);
}

function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function addSequence(content){
    
    let arr=content.split("\r\n");
    //console.log(arr,"hello");
    for(let i=0 ; i<arr.length;i++){
        //console.log("*"+" " +arr[i]);
        arr[i]= (i+1)+". "+arr[i];
        
    }
    return arr;
}

function addSequenceTnle(content){
    let arr=content.split("\r\n");
    let count =1;
    for(let i=0 ; i<arr.length;i++){
        if(arr[i]!=""){
            arr[i]=(count+1) +" " + arr[i];
            count++;
        }
        
    }
    return arr;
}

function removeExtraLine(filedata){
    let contentArr = filedata.split("\r\n");
    let data= [];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            data.push(contentArr[i]);
        }
    }
    return data;
}