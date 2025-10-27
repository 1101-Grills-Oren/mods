allClasses={}
allFunctions=[]
jsearcherversion="0.5.4"
viewing=""

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
    try {
    if((window.location.hash=="")||(window.location.hash=="#")){
        loadListOfAllClasses()
        document.body.innerHTML+="<div>HTML elements at https://developer.mozilla.org/en-US/docs/Web/HTML/Reference</div>"
        document.body.innerHTML+="<div>JS code at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference</div>"
        document.body.innerHTML+="<div>CSS code at https://developer.mozilla.org/en-US/docs/Web/CSS/Reference</div>"
        document.getElementById('searchClasses').oninput=function(value){updateListOfAllClasses(value.target.value)}
        
    }
    else
        if(window.location.hash.includes('class_')){
            try{
            loadClassHtml(window.location.hash.slice(7))
            } catch (error) {
              setTo404Page("Class \""+window.location.hash.slice(7)+"\" does not exist!");
              
            }
        }
        if(window.location.hash.includes('package_')){
            try{
            loadPackage(window.location.hash.slice(9))
            } catch (error) {
              setTo404Page("Package \""+window.location.hash.slice(9)+"\" does not exist!");
              
            }
        }
    } catch (error) {
      setTo404Page(error);
      
    }
}
window.onhashchange=function(hash){
    try {
    if((window.location.hash=="")||(window.location.hash=="#")){
        loadListOfAllClasses()
        document.body.innerHTML+="<div>HTML elements at https://developer.mozilla.org/en-US/docs/Web/HTML/Reference</div>"
        document.body.innerHTML+="<div>JS code at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference</div>"
        document.body.innerHTML+="<div>CSS code at https://developer.mozilla.org/en-US/docs/Web/CSS/Reference</div>"
        document.getElementById('searchClasses').oninput=function(value){updateListOfAllClasses(value.target.value)}
    }
    else
        if(window.location.hash.includes('class_')){
            try{
            loadClassHtml(window.location.hash.slice(7))
            } catch (error) {
              setTo404Page("Class \""+window.location.hash.slice(7)+"\" does not exist!");
              
            }
        }
        if(window.location.hash.includes('package_')){
            try{
            loadPackage(window.location.hash.slice(9))
            } catch (error) {
              setTo404Page("Package \""+window.location.hash.slice(9)+"\" does not exist!");
              
            }
        }
    } catch (error) {
      setTo404Page(error);
      
    }
}
function loadAllFunctionsOfClass(classname){
    window.location.hash=classname
    document.body.innerHTML="<div class=title>"+"Java Searcher V"+jsearcherversion+" - Currently viewing "+viewing+"</div>"+nextRun(values=>{return values[7].split('::')[0]==classname})
}
function loadListOfAllClasses(searchName){
    if(searchName==undefined){
        searchName=""
    }
    listClassesHTML=""
    for(let i=0;i<allClassesList.length;i++){
        if(allClassesList[i][1][1][0][4].toLowerCase().includes(searchName.toLowerCase())){
            listClassesHTML+=getClassHtml(allClassesList[i][0].slice(0,allClassesList[i][0].length-5))
        }
    }
    
    document.body.innerHTML="<div class=title>"+"Java Searcher V"+jsearcherversion+" - Currently viewing "+viewing+"</div>"+"<div id=\"searchholder\"><input type=\"text\" id=\"searchClasses\" name=\"Search\" placeholder=\"Search...\"></div>"+"<div id=\"classList\">"+listClassesHTML+"</div>"
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
    
    document.body.innerHTML="<div class=title>"+"Java Searcher V"+jsearcherversion+" - Currently viewing "+viewing+"</div>"+"<div id=\"classList\">"+listClassesHTML+"</div>"+"<div id=\"packageList\">"+listPackagesHTML+"</div>"
    
}
standardClasses={
    "lang":{
        "AbstractMethodError":0,
        "Appendable":0,
        "ArithmeticException":0,
        "ArrayIndexOutOfBoundsException":0,
        "ArrayStoreException":0,
        "AssertionError":0,
        "AutoCloseable":0,
        "Boolean":0,
        "BootstrapMethodError":0,
        "Byte":0,
        "Character":0,
        "Character.Subset":0,
        "Character.UnicodeBlock":0,
        "Character.UnicodeScript":0,
        "CharSequence":0,
        "Class":0,
        "ClassCastException":0,
        "ClassCircularityError":0,
        "ClassFormatError":0,
        "ClassLoader":0,
        "ClassNotFoundException":0,
        "ClassValue":0,
        "Cloneable":0,
        "CloneNotSupportedException":0,
        "Comparable":0,
        "Deprecated":0,
        "Double":0,
        "Enum":0,
        "Enum.EnumDesc":0,
        "EnumConstantNotPresentException":0,
        "Error":0,
        "Exception":0,
        "ExceptionInInitializerError":0,
        "Float":0,
        "FunctionalInterface":0,
        "IllegalAccessError":0,
        "IllegalAccessException":0,
        "IllegalArgumentException":0,
        "IllegalCallerException":0,
        "IllegalMonitorStateException":0,
        "IllegalStateException":0,
        "IllegalThreadStateException":0,
        "IncompatibleClassChangeError":0,
        "IndexOutOfBoundsException":0,
        "InheritableThreadLocal":0,
        "InstantiationError":0,
        "InstantiationException":0,
        "Integer":0,
        "InternalError":0,
        "InterruptedException":0,
        "Iterable":0,
        "LayerInstantiationException":0,
        "LinkageError":0,
        "Long":0,
        "MatchException":0,
        "Math":0,
        "Module":0,
        "ModuleLayer":0,
        "ModuleLayer.Controller":0,
        "NegativeArraySizeException":0,
        "NoClassDefFoundError":0,
        "NoSuchFieldError":0,
        "NoSuchFieldException":0,
        "NoSuchMethodError":0,
        "NoSuchMethodException":0,
        "NullPointerException":0,
        "Number":0,
        "NumberFormatException":0,
        "Object":0,
        "OutOfMemoryError":0,
        "Override":0,
        "Package":0,
        "Process":0,
        "ProcessBuilder":0,
        "ProcessBuilder.Redirect":0,
        "ProcessBuilder.Redirect.Type":0,
        "ProcessHandle":0,
        "ProcessHandle.Info":0,
        "Readable":0,
        "Record":0,
        "ReflectiveOperationException":0,
        "Runnable":0,
        "Runtime":0,
        "Runtime.Version":0,
        "RuntimeException":0,
        "RuntimePermission":0,
        "SafeVarargs":0,
        "ScopedValue":0,
        "ScopedValue.Carrier":0,
        "SecurityException":0,
        "SecurityManager":0,
        "Short":0,
        "StackOverflowError":0,
        "StackTraceElement":0,
        "StackWalker":0,
        "StackWalker.Option":0,
        "StakWalker.StackFrame":0,
        "StrictMath":0,
        "String":0,
        "StringBuffer":0,
        "StringBuilder":0,
        "StringIndexOutOfBoundsException":0,
        "StringTemplate":0,
        "StringTemplate.Processor":0,
        "StringTemplate.Processor.Linkage":0,
        "SuppressWarnings":0,
        "System":0,
        "System.Logger":0,
        "System.Logger.Level":0,
        "System.LoggerFinder":0,
        "Thread":0,
        "Thread.Builder":0,
        "Thread.Builder.OfPlatform":0,
        "Thread.Builder.OfVirtual":0,
        "Thread.State":0,
        "Thread.UncaughtExceptionHandler":0,
        "ThreadDeath":0,
        "ThreadGroup":0,
        "ThreadLocal":0,
        "Throwable":0,
        "TypeNotPresentException":0,
        "UnknownError":0,
        "UnsatisfiedLinkError":0,
        "UnsupportedClassVersionError":0,
        "UsupportedOperationException":0,
        "VerifyError":0,
        "VirtualMachineError":0,
        "Void":0,
        "WrongThreadException":0
    }
}
standardClassesList={}
function toList(value,previous){
    let returnList={}
    let entries=Object.entries(value)
    for(let i=0;i<entries.length;i++){
        if(entries[i][1]==0){
            returnList[entries[i][0]]=previous+"/"+entries[i][0]
        }else{
            let otherEntries=Object.entries(toList(entries[i][1],previous+"/"+entries[i][0]))
            console.log(otherEntries)
            for(let j=0;j<otherEntries.length;j++){
                returnList[otherEntries[j][0]]=otherEntries[j][1]
            }
        }
    }
    return returnList
}
standardClassesList=toList(standardClasses,"java")
function getFieldDescriptor(typename){
    if(typename=='byte'){
        return "B"
    }else if(typename=='char'){
        return "C"
    }else if(typename=='double'){
        return "D"
    }else if(typename=='float'){
        return "F"
    }else if(typename=='int'){
        return "I"
    }else if(typename=='long'){
        return "J"
    }else if(typename=='short'){
        return "S"
    }else if(typename=='boolean'){
        return "Z"
    }else if(typename=='void'){
        return "V"
    }else if(typename.slice(-3)=='...'){
        return "["+getFieldDescriptor(typename.slice(0,-3))
    }else if(typename.slice(-1)==']'){
        return "["+getFieldDescriptor(typename.slice(0,typename.lastIndexOf("[")))
    }else{
        if(standardClassesList[typename]!=undefined){
            return "L"+standardClassesList[typename].replaceAll(".","$")+";"
        }else if(allClasses[typename+".java"]!=undefined){
            return "L"+allClasses[typename+".java"][0].replaceAll(".","/")+"/"+allClasses[typename+".java"][1][0][4].replaceAll(".","$")+";"
        }else{
            return ""
        }
    }
}

function getFunctionDescriptor(funct){
    rettype=funct[6]
    args=funct[8]
    retval=""
    retval+=getFieldDescriptor(funct[7].split("::")[0])+" "+funct[7].split("::")[1]
    retval+='('
    for(let i=0;i<args.length;i++){
        if(args[i][1]!=""){
            if(args[i][0]!=""){
                retval+=getFieldDescriptor(args[i][0])
            }
        }
    }
    retval+=')'
    retval+=getFieldDescriptor(funct[6])
    return retval
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
    newHTML="<div class=\"classInfo\"><code>"+
        allClasses[classname+".java"][1][0][0]+" "
    if(allClasses[classname+".java"][1][0][1])
        newHTML+="static "
    if(allClasses[classname+".java"][1][0][2])
        newHTML+="abstract "
    newHTML+=allClasses[classname+".java"][1][0][3]+" "
    if(allClasses[classname+".java"][1][0][3]!='record')
        newHTML+=splitVariableTextIntoHtml(allClasses[classname+".java"][1][0][4])
    else{
        let n=splitWhileRespectingBracketsAndQuotes(allClasses[classname+".java"][1][0][4].replaceAll('(',' ('),' ')
        let m=splitWhileRespectingBracketsAndQuotes(n[1].slice(1,n[1].length-1),',')
        newHTML+=splitVariableTextIntoHtml(n[0])+"("
        let o=[]
        for(let index=0;index<m.length;index++){
            if(m[index][0]==' ')
                m[index]=m[index].slice(1)
            o.push(splitVariableTextIntoHtml(splitWhileRespectingBracketsAndQuotes(m[index],' ')[0])+" "+splitWhileRespectingBracketsAndQuotes(m[index],' ').slice(1).join(' '))
        }
        newHTML+=o.join(', ')+")"
    }
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
    
    
        newHTML+="</code></div><div class=\"classPackage\">package <a href='#package_"+allClasses[classname+".java"][0]+"'>"+allClasses[classname+".java"][0]+"</a></div>"
    return newHTML
}
function loadClassHtml(classname){
    if(window.location.hash!="#class_"+classname)
        window.location.hash="class_"+classname
    newHTML="<div class=\"classInfo\"><code>"+
        allClasses[classname+".java"][1][0][0]+" "
    if(allClasses[classname+".java"][1][0][1])
        newHTML+="static "
    if(allClasses[classname+".java"][1][0][2])
        newHTML+="abstract "
    newHTML+=allClasses[classname+".java"][1][0][3]+" "
    if(allClasses[classname+".java"][1][0][3]!='record')
        newHTML+=splitVariableTextIntoHtml(allClasses[classname+".java"][1][0][4])
    else{
        let n=splitWhileRespectingBracketsAndQuotes(allClasses[classname+".java"][1][0][4].replaceAll('(',' ('),' ')
        let m=splitWhileRespectingBracketsAndQuotes(n[1].slice(1,n[1].length-1),',')
        newHTML+=splitVariableTextIntoHtml(n[0])+"("
        let o=[]
        for(let index=0;index<m.length;index++){
            if(m[index][0]==' ')
                m[index]=m[index].slice(1)
            o.push(splitVariableTextIntoHtml(splitWhileRespectingBracketsAndQuotes(m[index],' ')[0])+" "+splitWhileRespectingBracketsAndQuotes(m[index],' ').slice(1).join(' '))
        }
        newHTML+=o.join(', ')+")"
    }
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
    
    
        newHTML+="</code></div><div class=\"classPackage\">package <a href='#package_"+allClasses[classname+".java"][0]+"'>"+allClasses[classname+".java"][0]+"</a></div>"+loadVariables(allClasses[classname+'.java'][2])+nextRun(values=>{return values[7].split('::')[0]==classname})
    
    document.body.innerHTML="<div class=title>"+"Java Searcher V"+jsearcherversion+" - Currently viewing "+viewing+"</div>"+newHTML
}
function getLoadedName(filename){
    //"1_20_1_fabric_classes.json"
    let x=filename.split('/')
    x=x[x.length-1]
    x=x.split('.')
    x=x.slice(0,x.length-1).join('.')
    return x
}
function setTo404Page(error){
    document.body.innerHTML="Error! "+error
}



if(window.location.search.length<2){
fetching=fetch("1_20_1_fabric_classes.json").then(response=>{response.json().then(responseb=>{allClasses=responseb;onFinishedGetClasses()}).catch((err) => {
    setTo404Page("Loading File \""+"1_20_1_fabric_classes.json"+"\" does not exist!");
  });
}).catch((err) => {
    setTo404Page("Loading File \""+"1_20_1_fabric_classes.json"+"\" does not exist!");
  });
    viewing=getLoadedName("1_20_1_fabric_classes.json")
}else{fetching=fetch(window.location.search.slice(1)).then(response=>{response.json().then(responseb=>{allClasses=responseb;onFinishedGetClasses()}).catch((err) => {
    setTo404Page("Loading File \""+window.location.search.slice(1)+"\" does not exist!");
  });}).catch((err) => {
    setTo404Page("Loading File \""+window.location.search.slice(1)+"\" does not exist!");
  });
      viewing=getLoadedName(window.location.search.slice(1))
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
            if(isInString==0){
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
    try{
    while(variableName[0]==' '){
        variableName=variableName.slice(1)
    }
    console.log(variableName)
    if(variableName.split(' ')[0]=='final'){
        return "final"+" "+splitVariableTextIntoHtml(variableName.split(' ').slice(1).join(' '))
    }
    else if(variableName[0]=='@'){
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
        }else if(standardClassesList[variableName]!=undefined){
            //"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/AssertionError.html"
            //return "<a onclick=\"loadClassHtml('"+variableName+"')\">"+variableName+"</a>"
            return "<a href=\"https://docs.oracle.com/en/java/javase/21/docs/api/java.base/"+standardClassesList[variableName].replaceAll("$",".")+".html\">"+variableName+"</a>"
        }else if(variableName.slice(-3)=='...'){
            return splitVariableTextIntoHtml(variableName.slice(0,-3))+"..."
        }else if(variableName.slice(-2)=='[]'){
            return splitVariableTextIntoHtml(variableName.slice(0,-2))+"[]"
        }
        return variableName
    }
    } catch (error) {
      setTo404Page("Error splitting variable text into html!"+error);
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
