allClasses={}
allFunctions=[]
onFinishedGetClasses=async function(){
    allClassesList=Object.entries(allClasses)
    let allClassesB={}
    for(let i=0;i<allClassesList.length;i++){
        if(allClassesList[i][0].slice(allClassesList[i][0].length-5,allClassesList[i][0].length)=='.java'){
            allClassesB[allClassesList[i][0]]=allClassesList[i][1]
        }
    }
    allClasses=allClassesB
    allClassesList=Object.entries(allClasses)
    for(let i=0;i<allClassesList.length;i++){
        currentFile=allClassesList[i][0]
        console.log("Loading "+currentFile)
        current=allClassesList[i][1]
        
        for(let j=0;j< current[3].length;j++){
            m=current[3][j]
            //m[7]=currentFile.split(0,currentFile.length-5)+"::"+m[7]
            allFunctions.push(m)
        }
    }
    if((window.location.hash=="")||(window.location.hash=="#"))
        loadListOfAllClasses()
    else
        if(window.location.hash.includes('class_'))
            loadClassHtml(window.location.hash.slice(7))
        if(window.location.hash.includes('package_'))
            loadPackage(window.location.hash.slice(9))
}
window.onhashchange=function(hash){
    if((window.location.hash=="")||(window.location.hash=="#"))
        loadListOfAllClasses()
    else
        if(window.location.hash.includes('class_'))
            loadClassHtml(window.location.hash.slice(7))
        if(window.location.hash.includes('package_'))
            loadPackage(window.location.hash.slice(9))
}
function loadAllFunctionsOfClass(classname){
    window.location.hash=classname
    document.body.innerHTML="<div class=title>Java Searcher V0.5.3 - Currently viewing 1.20.1 Fabric Class List</div>"+nextRun(values=>{return values[7].split('::')[0]==classname})
}
function loadListOfAllClasses(searchName){
    if(searchName==undefined){
        searchName="Render"
    }
    listClassesHTML=""
    for(let i=0;i<allClassesList.length;i++){
        if(allClassesList[i][1][1][0][4].toLowerCase().includes(searchName.toLowerCase())){
            listClassesHTML+=getClassHtml(allClassesList[i][0].slice(0,allClassesList[i][0].length-5))
        }
    }
    
    document.body.innerHTML="<div class=title>Java Searcher V0.5.3 - Currently viewing 1.20.1 Fabric Class List</div>"+"<div id=\"searchholder\"><input type=\"text\" id=\"searchClasses\" name=\"Search\" placeholder=\"Search...\"></div>"+"<div id=\"classList\">"+listClassesHTML+"</div>"
    document.getElementById('searchClasses').oninput=function(value){updateListOfAllClasses(value.target.value)}
}
function loadPackage(packageName){
    if(packageName==undefined){
        packageName="net.minecraft"
    }
    listClassesHTML=""
    listPackagesHTML=""
    subpackages=[]
    for(let i=0;i<allClassesList.length;i++){
        if(allClassesList[i][1][0]==(packageName)){
            listClassesHTML+=getClassHtml(allClassesList[i][0].slice(0,allClassesList[i][0].length-5))
        }else if(allClassesList[i][1][0].includes(packageName)){
            if(allClassesList[i][1][0].replaceAll(packageName,"").split(".").length==2){
                if(subpackages.includes(allClassesList[i][1][0])==false){
                    subpackages.push(allClassesList[i][1][0])
                    listPackagesHTML+="<div class=\"packageHolder\"><a href='#package_"+allClassesList[i][1][0]+"'>"+allClassesList[i][1][0]+"</a></div>"
                }
            }
        }
    }
    
    document.body.innerHTML="<div class=title>Java Searcher V0.5.3 - Currently viewing 1.20.1 Fabric Class List</div>"+"<div id=\"classList\">"+listClassesHTML+"</div>"+"<div id=\"packageList\">"+listPackagesHTML+"</div>"
    
}
function updateListOfAllClasses(searchName,max){
    if(searchName==undefined){
        searchName="Render"
    }
    if(max==undefined){
        max=20
    }
    listClassesHTML=""
    numLoaded=0
    for(let i=0;i<allClassesList.length;i++){
        if(numLoaded<max){
        if(allClassesList[i][1][1][0][4].toLowerCase().includes(searchName.toLowerCase())){
            listClassesHTML+=getClassHtml(allClassesList[i][0].slice(0,allClassesList[i][0].length-5))
            numLoaded+=1
        }
        }else{
            i=allClassesList.length
        }
    }
    
    document.getElementById("classList").innerHTML=listClassesHTML
}
function getClassHtml(classname){
    console.log(classname)
    newHTML="<div class=\"classInfo\">"+
        allClasses[classname+".java"][1][0][0]+" "
    if(allClasses[classname+".java"][1][0][1])
        newHTML+="static "
    if(allClasses[classname+".java"][1][0][2])
        newHTML+="abstract "
    newHTML+=allClasses[classname+".java"][1][0][3]+" "
        +splitVariableTextIntoHtml(allClasses[classname+".java"][1][0][4])
    if(allClasses[classname+".java"][1][1][0]!=''){
        newHTML+=" extends "
        {let list=[]
        for(let i=0;i<allClasses[classname+".java"][1][1].length;i++){
            list.push(splitVariableTextIntoHtml(allClasses[classname+".java"][1][1][i]))
        }
        newHTML+=list.join(', ')}
    }
    if(allClasses[classname+".java"][1][2][0]!=''){
        newHTML+=" implements "
        {let list=[]
        for(let i=0;i<allClasses[classname+".java"][1][2].length;i++){
            list.push(splitVariableTextIntoHtml(allClasses[classname+".java"][1][2][i]))
        }
        newHTML+=list.join(', ')}
    }
    
    
        newHTML+="</div><div class=\"classPackage\">package <a href='#package_"+allClasses[classname+".java"][0]+"'>"+allClasses[classname+".java"][0]+"</a></div>"
    return newHTML
}
function loadClassHtml(classname){
    if(window.location.hash!="#class_"+classname)
        window.location.hash="class_"+classname
    newHTML="<div class=\"classInfo\">"+
        allClasses[classname+".java"][1][0][0]+" "
    if(allClasses[classname+".java"][1][0][1])
        newHTML+="static "
    if(allClasses[classname+".java"][1][0][2])
        newHTML+="abstract "
    newHTML+=allClasses[classname+".java"][1][0][3]+" "
        +splitVariableTextIntoHtml(allClasses[classname+".java"][1][0][4])
    if(allClasses[classname+".java"][1][1][0]!=''){
        newHTML+=" extends "
        {let list=[]
        for(let i=0;i<allClasses[classname+".java"][1][1].length;i++){
            list.push(splitVariableTextIntoHtml(allClasses[classname+".java"][1][1][i]))
        }
        newHTML+=list.join(', ')}
    }
    if(allClasses[classname+".java"][1][2][0]!=''){
        newHTML+=" implements "
        {let list=[]
        for(let i=0;i<allClasses[classname+".java"][1][2].length;i++){
            list.push(splitVariableTextIntoHtml(allClasses[classname+".java"][1][2][i]))
        }
        newHTML+=list.join(', ')}
    }
    
    
        newHTML+="</div><div class=\"classPackage\">package <a href='#package_"+allClasses[classname+".java"][0]+"'>"+allClasses[classname+".java"][0]+"</a></div>"+loadVariables(allClasses[classname+'.java'][2])+nextRun(values=>{return values[7].split('::')[0]==classname})
    
    document.body.innerHTML="<div class=title>Java Searcher V0.5.3 - Currently viewing 1.20.1 Fabric Class List</div>"+newHTML
}
if(window.location.search.length<2){
fetching=fetch("1_20_1_fabric_classes.json").then(response=>{response.json().then(responseb=>{allClasses=responseb;onFinishedGetClasses()});})
}else{fetching=fetch(window.location.search.slice(1)).then(response=>{response.json().then(responseb=>{allClasses=responseb;onFinishedGetClasses()});})
}
function splitWhileRespectingBracketsAndQuotes(inputValue,splitChar=' ',brackets=['[<({',']>)}']){
    if(brackets){
        
    }else{
        brackets=['[<({',']>)}']
    }
    output=[""]
    depth=0
    isInString=0
    for(let index=0;index<inputValue.length;index++){
        i=inputValue[index]
        if('\'"'.includes(i)){
            if(isInString==None){
                isInString=i
                depth+=1
            }
            else{
                if(i==isInString){
                    if(inputValue[index-1]!='\\'){
                        isInString=0
                        depth-=1
                    }
                }
            }
        }
        if(isInString==0){
            if(brackets[0].includes(i))
                depth+=1
            if(brackets[1].includes(i))
                depth-=1
        }
        if(depth<0)
            depth=0
        if(depth==0){
            if(i==splitChar)
                output.push('')
            else
                output[output.length-1]+=i
        }
        else
            output[output.length-1]+=i
    }
    return output
}





function splitVariableTextIntoHtml(variableName){

    while(variableName[0]==' '){
        variableName=variableName.slice(1)
    }
    console.log(variableName)
    if(variableName[0]=='@'){
        return variableName.split(' ')[0]+" "+splitVariableTextIntoHtml(variableName.split(' ').slice(1).join(' '))
    }
    else if(variableName.slice(0,8)=='volatile'){
        return variableName.split(' ')[0]+" "+splitVariableTextIntoHtml(variableName.split(' ').slice(1).join(' '))
    }
    else if(splitWhileRespectingBracketsAndQuotes(variableName," ",["<",">"]).length!=1){
        let v=splitWhileRespectingBracketsAndQuotes(variableName," ",["<",">"])
        return v[0]+" "+v[1]+" "+splitVariableTextIntoHtml(v[2])
    }
    else if(variableName.includes('<')){
        variableName=splitWhileRespectingBracketsAndQuotes(variableName.replaceAll("<"," <")," ",["<",">"])
        variableArgs=variableName[1].replaceAll(' <',"<").replaceAll(", ",",")
        variableArgs=variableArgs.slice(1,variableArgs.length-1)
        variableName=variableName[0]
        variableArgs=splitWhileRespectingBracketsAndQuotes(variableArgs,',',"")
        let final=splitVariableTextIntoHtml(variableName)+"&#60"
        let finalB=[]
        for(let i=0;i<variableArgs.length;i++){
            finalB.push(splitVariableTextIntoHtml(variableArgs[i]))
        }
        final+=finalB.join(', ')+"&#62"
        return final
        
    }else{
        if(allClasses[variableName+".java"]!=undefined){
            //return "<a onclick=\"loadClassHtml('"+variableName+"')\">"+variableName+"</a>"
            return "<a href=\"#class_"+variableName+"\">"+variableName+"</a>"
        }
        return variableName
    }
}





nextRun=((searchFunction)=>
{
    HTMLbaked="<div>"
    for(let index=0;index<allFunctions.length;index++){
    let i= allFunctions[index]
    if(searchFunction(i)){
        {
        n=""
        if(i[0]!=null)
            n=i[0]+" "
        else
            n=''
        if(i[1])
            n="@Override "+n
        if(i[2])
            n="@Nullable "+n
        if(i[3])
            n+="static "
        if(i[4])
            n+="final "
        if(i[5])
            n+="abstract "
        n+=i[6]+" "
        n+=i[7]+"("
        {
        let k=[]
            for(let jndex=0; jndex<i[8].length;jndex++)
                if(i[8][jndex][0]!="")
                    k.push(i[8][jndex][0]+" "+i[8][jndex][1])
        n+=k.join(', ')+")"
        }
        console.log('\t'+n)
        }
        {
        n=""
        if(i[0]!=null)
            n=i[0]+" "
        else
            n=''
        if(i[1])
            n="@Override "+n
        if(i[2])
            n="@Nullable "+n
        if(i[3])
            n+="static "
        if(i[4])
            n+="final "
        if(i[5])
            n+="abstract "
        n+=splitVariableTextIntoHtml(i[6])+" "
        n+=splitVariableTextIntoHtml(i[7].split('::')[0])+"::"+i[7].split('::')[1].replaceAll('<',"&#60").replaceAll('>',"&#62")+"("
        {
        let k=[]
            for(let jndex=0; jndex<i[8].length;jndex++)
                if(i[8][jndex][0]!="")
                    k.push(splitVariableTextIntoHtml(i[8][jndex][0])+" "+i[8][jndex][1].replaceAll('<',"&#60").replaceAll('>',"&#62"))
        n+=k.join(', ')+")"
        }
        HTMLbaked+="<div class=\"classFunction\">"+n+"</div>"
        }
        
    }
    
}
HTMLbaked+='</div>'
    return HTMLbaked}
)
loadVariables=((variableList)=>
{
    let HTMLbaked="<div>"
    for(let index=0;index<variableList.length;index++){
    let i= variableList[index]
    {
        {
        //[access,isOverride,isNullable,isStatic,isFinal,variableType,name]
        n=""
        if(i[0]!=null)
            n=i[0]+" "
        else
            n=''
        if(i[1])
            n="@Override "+n
        if(i[2])
            n="@Nullable "+n
        if(i[3])
            n+="static "
        if(i[4])
            n+="final "
        n+=splitVariableTextIntoHtml(i[5])+" "
        n+=splitVariableTextIntoHtml(i[6].split('::')[0])+""
        
        HTMLbaked+="<div class=\"classVariable\">"+n+"</div>"
        }
        
    }
    
}
HTMLbaked+='</div>'
    return HTMLbaked}
)
