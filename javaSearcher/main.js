allClasses={}
allFunctions=[]
onFinishedGetClasses=async function(){
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
    if(window.location.hash=="")
        document.body.innerHTML=nextRun(values=>{return values[7].includes('RecipeBookResults')})
    else
        if(window.location.hash.includes('class_'))
            loadClassHtml(window.location.hash.slice(7))

}
window.onhashchange=function(hash){
    if(window.location.hash=="")
        document.body.innerHTML=nextRun(values=>{return values[7].includes('RecipeBookResults')})
    else
        if(window.location.hash.includes('class_'))
            loadClassHtml(window.location.hash.slice(7))
}
function loadAllFunctionsOfClass(classname){
    window.location.hash=classname
    document.body.innerHTML=nextRun(values=>{return values[7].split('::')[0]==classname})
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
    
    
        newHTML+="</div><div class=\"classPackage\">package "+allClasses[classname+".java"][0]+"</div>"+loadVariables(allClasses[classname+'.java'][2])+nextRun(values=>{return values[7].split('::')[0]==classname})
    
    document.body.innerHTML=newHTML
}
fetching=fetch("1_20_1_fabric_classes.json").then(response=>{response.json().then(responseb=>{allClasses=responseb;onFinishedGetClasses()});})
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
    if(variableName.includes('<')){
        variableName=splitWhileRespectingBracketsAndQuotes(variableName.replaceAll("<"," <")," ",["<",">"])
        variableArgs=variableName[1].replaceAll(' <',"<")
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
