import random
random.seed(0)
analyzed={}
analyzedcompressed={}
def splitWhileRespectingBrackets(inputValue,splitChar=' ',brackets=['[{<(',']}>)'],involveHistory=False):
    output=[""]
    depth=0
    history=" "*(1-involveHistory)
    ind=-1
    for i in inputValue:
        ind+=1
#        print(i,end="")
        depthc=0
        if(i in brackets[0]):
            #print(i,end="")
            depth+=1
            history+=i
            depthc=1
        if(i in brackets[1]):
            if((involveHistory==False)|(history[-1]==brackets[0][brackets[1].index(i)])):
               if(involveHistory):
                  history=history[:-1]
               depth-=1
               depthc=1
        if(depth==0):
            if(i==splitChar):
                output.append('')
            else:
                output[-1]+=i
            if((splitChar=='')&(depthc==1)):
               output.append('')
        else:
            output[-1]+=i
    return output
def splitWhileRespectingBracketsAndQuotes(inputValue,splitChar=' ',brackets=['[<({',']>)}']):
    output=[""]
    depth=0
    isInString=None
    for index in range(inputValue.__len__()):
        i=inputValue[index]
        if(i in '\'"'):
            if(isInString==None):
                isInString=i
                depth+=1
            else:
                if(i==isInString):
                    if(inputValue[index-1]!='\\'):
                        isInString=None
                        depth-=1
        if(isInString==None):
            if(i in brackets[0]):
                depth+=1
            if(i in brackets[1]):
                depth-=1
        if(depth<0):
            depth=0
        if(depth==0):
            if(i==splitChar):
                output.append('')
            else:
                output[-1]+=i
        else:
            output[-1]+=i
    return output
def removeExtraSpaces(input):
    if(input==""):
        return input
    elif(input[0]==' '):
        return removeExtraSpaces(input[1:])
    elif(input[0]=='\t'):
        return removeExtraSpaces(input[1:])
    elif(input[-1]==' '):
        return removeExtraSpaces(input[:-1])
    else:
        return input

codecMap={
   'Codec.STRING':"String",
   'Codec.DOUBLE':'Double',
   'Codec.BOOLEAN':'Boolean',
   'Codec.INTEGER':'Integer',
   "ProtocolCodecs.DIRECTION":"Direction",
   "ProtocolCodecs.VECTOR2F":"Vector2f",
   "ProtocolCodecs.VECTOR3F":"Vector3f",
   "ProtocolCodecs.COLOR_LIGHT":"ColorLight",
   "ProtocolCodecs.COLOR":"Color",
   "ProtocolCodecs.COLOR_ARRAY":"Color[]",
   "ProtocolCodecs.SIZE":"Size",
   "ProtocolCodecs.RANGE":"Range",
   "ProtocolCodecs.RANGEB":"Rangeb",
   "ProtocolCodecs.RANGEF":"Rangef",
   "ProtocolCodecs.RANGE_VECTOR2F":"RangeVector2f",
   "ProtocolCodecs.RANGE_VECTOR3F":"RangeVector3f",
   "ProtocolCodecs.INITIAL_VELOCITY":"InitialVelocity",
   "ProtocolCodecs.UV_MOTION":"UVMotion",
   "ProtocolCodecs.INTERSECTION_HIGHLIGHT":"IntersectionHighlight",
   "ProtocolCodecs.SAVED_MOVEMENT_STATES":"SavedMovementStates",
   "ProtocolCodecs.CONTEXT_MENU_ITEM":"ContextMenuItem",
   "ProtocolCodecs.MARKER":"MapMarker",
   "ProtocolCodecs.ITEM_ANIMATION_CODEC":"ItemAnimation",
   "ProtocolCodecs.RAIL_POINT_CODEC":"RailPoint",
   "ProtocolCodecs.RAIL_CONFIG_CODEC":"RailConfig"
}

def throwIfEmpty(inputV):
   def wrap(codec):
      retval=inputV(codec)
      if(retval==None):
         print("Codec None:"+codec)
      return retval
      
   return wrap  
@throwIfEmpty
def getTypeFromCodec(codec):
   if(codec[0]=='('):
      codec=codec[1:]
   if(codec in codecMap):
      return codecMap[codec]
   elif codec.split('.')[-1]=='CODEC':
      return ".".join(codec.split('.')[:-1])
   elif 'new' in codec:
      if("new MapCodec<>" in codec):
         if (codec.index("new MapCodec<>")==0):
            return "HashMap<"+getTypeFromCodec(
               splitWhileRespectingBrackets(codec[codec.index("(")+1:-1],',')[0]
               )+">"
      if("new ArrayCodec<>" in codec):
         if (codec.index("new ArrayCodec<>")==0):
            return getTypeFromCodec(
               splitWhileRespectingBrackets(codec[codec.index("(")+1:-1],',')[0]
            )+"[]"
      if("new EnumCodec<>" in codec):
         if (codec.index("new EnumCodec<>")==0):
            return codec[codec.index("(")+1:-7]
      if("new MergedEnumMapCodec<>" in codec):
         if (codec.index("new MergedEnumMapCodec<>")==0):
            n=splitWhileRespectingBrackets(codec[codec.index("(")+1:-1],",")
            return "Map<"+n[0][0:-6]+","+getTypeFromCodec(n[4])+">"
      if(1):
         #print("Attempting to generate codec")
         t=f"TEMP_{int(random.random()*6000)}"
         analyze(codec,t)
         return t
      #print('unknown',codec)
   else:

      print("unknown codec \""+codec+"\"")
      throw(Exception)
@throwIfEmpty
def getCodecFromType(typed):
   if(typed in {codecMap[i]:i for i in codecMap}):
      return {codecMap[i]:i for i in codecMap}[typed]
   if(typed[-2:]=='[]'):
      return "new ArrayCodec<>("+getCodecFromType(typed[:-2])+","+typed+"::new)"
   if(typed.isalnum()):
      return typed+".CODEC"
   if("{" in typed):

      #print("stacked",typed)
      rval=ezcodectojson(typed)
      print(rval)
      if(rval[0:5]=='Asset'):
         rval=splitWhileRespectingBracketsAndQuotes(rval,'.',["(",")"])
         print(rval)
         rval[1]="builder("+",".join(splitWhileRespectingBracketsAndQuotes(rval[1][8:-1],",")[0:-5])+")"
         rval[0]="BuilderCodec"
         rval=".".join(rval)
      return rval.replace("\n","\n\t")
   if("Map<" in typed):
      if typed.index("Map<")==0:
         a,b=splitWhileRespectingBrackets(typed[4:-1],",",["[{(",")}]"])
         return "new EnumMapCodec<>("+a+","+b+")"
   if("HashMap<" in typed):
      if typed.index("HashMap<")==0:
         a=typed[8:-1]
         return "new MapCodec<>("+getCodecFromType(a)+",HashMap::new)"
   if("Holder<" in typed):
      if typed.index("Holder<")==0:
         return "new StoredCodec<>("+typed[7:-1]+".HOLDER_CODEC_KEY)"
   #print(typed)
   #print("unknown codec \""+codec+"\"")
import json
def analyze(input,field):
    a=(splitWhileRespectingBracketsAndQuotes("".join([removeExtraSpaces(i) for i in input.split("\n")]),".",['[(',')]']))
    if(a[0]=='AssetBuilderCodec'):
        codecbuildertype="AssetBuilderCodec.builder"
        b=splitWhileRespectingBrackets(a[1][8:-1],',',['[(',')]'])
        fields=[]
        parent=""
        if(b.__len__()==7):
         codecclass=b[0]
         classconstructor=b[1]
         classidfield=removeExtraSpaces(b[4].split('->')[1].replace(removeExtraSpaces(b[4].split('->')[0])+".",""))
         classextradatafield=removeExtraSpaces(b[6].split('->')[1].replace(removeExtraSpaces(b[6].split('->')[0])+".",""))
        if(b.__len__()==8):
         codecclass=b[0]
         classconstructor=b[1]
         classidfield=removeExtraSpaces(b[5].split('->')[1].replace(removeExtraSpaces(b[5].split('->')[0])+".",""))
         classextradatafield=removeExtraSpaces(b[7].split('->')[1].replace(removeExtraSpaces(b[7].split('->')[0])+".",""))
         fields=analyzed[removeExtraSpaces(b[2])][0]['fields']
         parent=removeExtraSpaces(b[2])


        afterdecode=""
        #for i in ['codecclass','classconstructor','classidfield','classextradatafield']:
        #    print(i+":",vars()[i])
        basemetadata=[]
        
        currentField=None
        for i in a[2:]:
            #print(i[:i.index('(')])
            type=i[:i.index('(')]
            body=i[i.index('(')+1:-1]
            if(type=='metadata'):
                if(currentField==None):
                    basemetadata.append(body)
                else:
                    currentField[3].append(body)
            elif('appendInherited' in type):
               bodyparts=splitWhileRespectingBrackets(body,',',['[(',')]'])
               try:
                  v=[removeExtraSpaces(i) for i in splitWhileRespectingBrackets(bodyparts[0][bodyparts[0].index('(')+1:-1],',',['([{','}])'])]
                  key=v[0]
                  codec=v[1]
               except Exception:
                  print([removeExtraSpaces(i) for i in splitWhileRespectingBrackets(bodyparts[0][bodyparts[0].index('(')+1:-1],',')])
                  bleh
               fieldinclass=removeExtraSpaces(bodyparts[2].split('->')[1].replace(removeExtraSpaces(bodyparts[2].split('->')[0])+".",""))
               fieldtype=""
               #print("\n".join(bodyparts))
               if(type[0]=='<'):
                  fieldtype=type[type.index('<')+1:type.index('>')]
               else:
                  fieldtype=getTypeFromCodec(codec)
                  if(fieldtype.count("<")>fieldtype.count(">")):
                     fieldtype+=">"
               currentField=[key,fieldtype,fieldinclass,[],[],"",[]]
            elif('append' in type):
               bodyparts=splitWhileRespectingBrackets(body,',',['[(',')]'])
               try:
                  v=[removeExtraSpaces(i) for i in splitWhileRespectingBrackets(bodyparts[0][bodyparts[0].index('(')+1:-1],',')]
                  key=v[0]
                  codec=v[1]
               except Exception:
                  print([removeExtraSpaces(i) for i in splitWhileRespectingBrackets(bodyparts[0][bodyparts[0].index('(')+1:-1],',')])
                  bleh
               fieldinclass=removeExtraSpaces(bodyparts[2].split('->')[1].replace(removeExtraSpaces(bodyparts[2].split('->')[0])+".",""))
               fieldtype=""
               #print("\n".join(bodyparts))
               if(type[0]=='<'):
                  fieldtype=type[type.index('<')+1:type.index('>')]
               else:
                  fieldtype=getTypeFromCodec(codec)
                  if(fieldtype.count("<")>fieldtype.count(">")):
                     fieldtype+=">"
               currentField=[key,fieldtype,fieldinclass,[],[],"",[]]
            elif(type=='addValidator'):
               if(currentField==None):
                  throw(Exception)
               else:
                  currentField[4].append(body)
            elif(type=='add'):
               if(currentField==None):
                  throw(Exception)
               else:
                  fields.append(currentField)
                  currentField=None
            elif(type=='documentation'):
               if(currentField==None):
                  docs=json.loads(body)
               else:
                  #print(body)
                  currentField[5]=json.loads(body)
            elif(type=='addValidatorLate'):
               currentField[6].append(body)
               #print(body)
            elif(type=='afterDecode'):
               afterdecode=body
            elif type=='build':
               analyzed[field]=[{'metadata':[compressmetadata(i) for i in basemetadata],'constructor':classconstructor,'class':codecclass,'extradatafield':classextradatafield,'idfield':classidfield,'afterdecode':afterdecode,'fields':fields}]
               if(parent!=""):
                  analyzed[field][0]['parent']=parent
               analyzed[field][0]['buildtype']=codecbuildertype
               return [fields,basemetadata,codecclass,classconstructor,classextradatafield,classidfield,afterdecode]
            else:
               print('Unknown type \''+type+"'")
               break
    elif(a[0]=='BuilderCodec'):
        b=splitWhileRespectingBrackets(removeExtraSpaces(a[1])[a[1].index('(')+1:-1],',',['[(',')]'])
        fields=[]
        classconstructor=""
        codecclass=""
        docs=""
        parent=""
        codecbuildertype=""
        if(a[1][:a[1].index('(')]=="builder"):
         codecbuildertype="BuilderCodec.builder"
         if(b.__len__()==2):
          codecclass=b[0]
          classconstructor=b[1]
         if(b.__len__()==3):
          codecclass=b[0]
          classconstructor=b[1]
          fields=analyzed[removeExtraSpaces(b[2])][0]['fields']
          parent=removeExtraSpaces(b[2])
        elif(a[1][:a[1].index('(')]=="abstractBuilder"):
         codecbuildertype="BuilderCodec.abstractBuilder"
         if(b.__len__()==1):
          codecclass=b[0]
          classconstructor=""
         if(b.__len__()==2):
          codecclass=b[0]
          classconstructor=""
          fields=analyzed[removeExtraSpaces(b[1])][0]['fields']
          parent=removeExtraSpaces(b[1])


        afterdecode=""
        #for i in ['codecclass','classconstructor','classidfield','classextradatafield']:
        #    print(i+":",vars()[i])
        basemetadata=[]
        
        currentField=None
        for i in a[2:]:
            #print(i[:i.index('(')])
            #print(i)
            type=i[:i.index('(')]
            body=i[i.index('(')+1:-1]
            if(type=='metadata'):
                if(currentField==None):
                    basemetadata.append(body)
                else:
                    currentField[3].append(body)
            elif('append' in type):
               bodyparts=splitWhileRespectingBrackets(body,',',['[(',')]'])
               key,codec=[removeExtraSpaces(i) for i in splitWhileRespectingBrackets(bodyparts[0][bodyparts[0].index('(')+1:-1],',',['[(',')]'])]
               fieldinclass=removeExtraSpaces(bodyparts[2].split('->')[1].replace(removeExtraSpaces(bodyparts[2].split('->')[0])+".",""))
               fieldtype=""
               #print("\n".join(bodyparts))
               if(type[0]=='<'):
                  fieldtype=type[type.index('<')+1:type.index('>')]
                  if(fieldtype.count("<")>fieldtype.count(">")):
                     fieldtype+=">"
               else:
                  fieldtype=getTypeFromCodec(codec)
                  if(fieldtype.count("<")>fieldtype.count(">")):
                     fieldtype+=">"
               currentField=[key,fieldtype,fieldinclass,[],[],"",[]]
            elif(type=='addValidator'):
               if(currentField==None):
                  throw(Exception)
               else:
                  currentField[4].append(body)
            elif(type=='add'):
               if(currentField==None):
                  throw(Exception)
               else:
                  fields.append(currentField)
                  currentField=None
            elif(type=='documentation'):
               if(currentField==None):
                  docs=json.loads(body)
               else:
                  currentField[5]=json.loads(body)
            elif(type=='addValidatorLate'):
               currentField[6].append(body)
               #print(body)
            elif(type=='afterDecode'):
               afterdecode=body
            elif type=='build':
               analyzed[field]=[{'metadata':"",'constructor':removeExtraSpaces(classconstructor),'class':codecclass,'afterdecode':afterdecode,"documentation":docs,'fields':fields}]
               if(parent!=""):
                  analyzed[field][0]['parent']=parent
               analyzed[field][0]['buildtype']=codecbuildertype
               return analyzed[field][0]
            else:
               print('Unknown type \''+type+"'")
               break
            
        #print(fields)
        return "Error!"
        #return [fields,basemetadata,codecclass,classconstructor,classextradatafield,classidfield,afterdecode]
    else:
       print("Unknown Codec Type \""+a[0]+"\"")
       throw

def compressmetadata(mdata):
   if(mdata=='UIDefaultCollapsedState.UNCOLLAPSED'):
      return "UncollapsedByDefault"
   elif(mdata[0:4]=='new '):
      if('UIEditorSectionStart' in mdata):
         return "StartSection_"+mdata[mdata.index('(')+1:-1]
      elif('UIEditorPreview' in mdata):
         return "PreviewType_"+mdata.replace('new UIEditorPreview(UIEditorPreview.PreviewType.',"")[:-1]
      elif('UIRebuildCaches' in mdata):
         return mdata[mdata.index('(')+1:-1].replace(",",'+')
      elif('UIEditor' in mdata):
         return mdata[mdata.index('(')+5:-1]
      #new UIRebuildCaches(UIRebuildCaches.ClientCache.ITEM_ICONS)
      elif('UISidebarButtons' in mdata):
         #print('\n'.join(splitWhileRespectingBrackets(mdata[mdata.index('(')+1:-1],',')))
         return 'SidebarButtons['+','.join([
            compressmetadata(removeExtraSpaces(i))
            for i in 
            splitWhileRespectingBrackets(mdata[mdata.index('(')+1:-1],',')])+']'
      elif('UICreateButtons' in mdata):
         #print('\n'.join(splitWhileRespectingBrackets(mdata[mdata.index('(')+1:-1],',')))
         return 'CreateButtons['+','.join([
            compressmetadata(removeExtraSpaces(i))
            for i in 
            splitWhileRespectingBrackets(mdata[mdata.index('(')+1:-1],',')])+']'
      elif('UIButton' in mdata):
         #print(mdata+"\n\n\n")
         return "Button("+mdata[mdata.index('(')+1:-1]+")"
      else:
         return mdata
      
   else:
      return mdata

def decompressmetadata(mdata):
   if('UIEditor.' in mdata):
      return "new UIEditor(new "+mdata+")"
   if(mdata=="UncollapsedByDefault"):
      return 'UIDefaultCollapsedState.UNCOLLAPSED'
   elif(mdata[0:13]=='StartSection_'):
      return "new UIEditorSectionStart("+mdata[13:]+")"
   elif(mdata[0:12]=='PreviewType_'):
      return 'new UIEditorPreview(UIEditorPreview.PreviewType.'+mdata[12:]+")"
   elif(mdata[0:15]=='UIRebuildCaches'):
      return 'new UIRebuildCaches('+mdata.replace("+",",")+')'
   else:
      return mdata

def compressvalidator(v,codecclass):
   if(v=="() -> "+codecclass.replace(".class","")+".VALIDATOR_CACHE.getValidator().late()"):
      return "LateValidator_"+codecclass.replace(".class","")
   return "NonNull" if v=='Validators.nonNull()' else v
def decompressvalidator(v,codecclass):
   if(v==("LateValidator_"+codecclass.replace(".class",""))):
      return "() -> "+codecclass.replace(".class","")+".VALIDATOR_CACHE.getValidator().late()"
   return 'Validators.nonNull()' if v=="NonNull" else v
def jsontoezcodec(fields,basemetadata,codecclass,classconstructor,classextradatafield,classidfield,afterdecode,codec):
   output="{\n"
   for field in fields:
      key,fieldtype,fieldinclass,metadata,validators,documentation,validatorslate=field
      if('(' in fieldinclass):
         fieldinclass=fieldinclass[fieldinclass.index(')')+1:]
      output+=f"\t{key}:{fieldinclass}({fieldtype+">"*(fieldtype.count("<")-fieldtype.count(">")) if fieldtype[0:5]!='TEMP_' else (jsontoezcodec(*[analyzed[fieldtype][0][k] if k in analyzed[fieldtype][0] else "" for k in ['fields','metadata','class','constructor','extradatafield','idfield','afterdecode']],fieldtype)).replace("\n","\n\t")})\
{"".join(["@"+compressvalidator(v,codecclass) for v in validators])}\
{"".join(["%"+compressvalidator(v,codecclass) for v in validatorslate])}\
{"".join(["#"+compressmetadata(v) for v in metadata])}\
{"!\"" if documentation!="" else ""}{documentation.replace("\\","\\\\").replace("\"","\\\"")}{"\"" if documentation!="" else ""},\n"
   
   output=output[:-2]+'\n}'
   completeoutput=""
   completeoutput+=classconstructor[:-5]#json.dumps({'metadata':[compressmetadata(i) for i in basemetadata],'constructor':classconstructor,'class':codecclass,'extradatafield':classextradatafield,'idfield':classidfield,'afterdecode':afterdecode})
   #completeoutput+=#'\n'
   completeoutput+=output
   #print('\n\n'.join(splitWhileRespectingBrackets(completeoutput,"",['[{(',')}]'])))
   analyzedcompressed[codec]=completeoutput
   return (completeoutput)
def splitforeach(splitt,list,func=lambda a,b:a.split(b)):
   old=[]
   new=[splitt]
   for i in list:
      old=new
      new=[]
      for j in old:
         for k in func(j,i):
            new.append(k)
   return new
def splitentrymods(entrymods,chr):
   rval=[i for i in splitWhileRespectingBracketsAndQuotes(entrymods,chr,["([","])"])]
   return [rval[0]]+[chr+i for i in rval[1:]]
def ezcodectojson(cdec):
   t=removeExtraSpaces(cdec[:cdec.index("{")])
   parent=None
   if("<" in t):
      parent=t.split("<")[1]
      t=t.split("<")[0]
   codecBuilderBase=""
   if(parent==None):
      codecBuilderBase=f"""AssetBuilderCodec.builder(
         {t}.class,
         {t}::new,
         Codec.STRING,
         ({t[0].lower()+t[1:]}, s) -> {t[0].lower()+t[1:]}.id = s,
         {t[0].lower()+t[1:]} -> {t[0].lower()+t[1:]}.id,
         ({t[0].lower()+t[1:]}, data) -> {t[0].lower()+t[1:]}.extraData = data,
         {t[0].lower()+t[1:]} -> {t[0].lower()+t[1:]}.extraData
      )"""
   else:
      codecBuilderBase=f"""AssetBuilderCodec.builder(
         {t}.class,
         {t}::new,
         {getCodecFromType(parent)},
         Codec.STRING,
         ({t[0].lower()+t[1:]}, s) -> {t[0].lower()+t[1:]}.id = s,
         {t[0].lower()+t[1:]} -> {t[0].lower()+t[1:]}.id,
         ({t[0].lower()+t[1:]}, data) -> {t[0].lower()+t[1:]}.extraData = data,
         {t[0].lower()+t[1:]} -> {t[0].lower()+t[1:]}.extraData
      )"""
   cdecbase=cdec
   cdec=splitWhileRespectingBracketsAndQuotes(cdec[cdec.index("{"):],"",["{","}"])[0]
   #print("\n\n\n\n\n",cdec,"\n\n\n\n\n")
   spl=[i for i in splitWhileRespectingBracketsAndQuotes(cdec[cdec.index("{")+1:-1],",",['[{(',')}]']) if i!=""]
   #print("\n\n".join(spl))
   fields=[]
   for i in spl:
      i=removeExtraSpaces(i)
      if(i.replace("\n","")!=""):
         c=splitWhileRespectingBracketsAndQuotes(i,":",['[{(',')}]'])
         key=c[0].replace("\n","").replace("\t","")
         i=(":".join(c[1:]))
         var=i[:i.index("(")]
         i=i[i.index("("):]
         c=splitWhileRespectingBrackets(i,"",['(',')'])
         vartype=getCodecFromType(c[0][1:-1])
         if(vartype==None):
            print(c[0])
            nope
         #print(vartype)
         i="".join(c[1:])
         metadata=[]
         validators=[]
         documentation=""
         validatorslate=[]
         i=splitforeach(i,"#!@%",lambda a,b:splitentrymods(a,b))[1:]
         for j in i:
            if(j[0]=='!'):
               documentation=j[1:]
            if(j[0]=='#'):
               metadata.append(decompressmetadata(j[1:]))
            if(j[0]=='@'):
               validators.append(decompressvalidator(j[1:],t))
            if(j[0]=='%'):
               validatorslate.append(decompressvalidator(j[1:],t))
         fields+=[[key,vartype,var,metadata,validators,documentation,validatorslate]]
   #print("\n\n\n\n\n\n",fields[0],"\n\n\n\n\n\n")
   #print(codecBuilderBase+"".join([fieldtoJAVAcode(i,t[0].lower()+t[1:]) for i in fields]))
   return codecBuilderBase+"".join([fieldtoJAVAcode(i,t[0].lower()+t[1:]) for i in fields])+".build()"
         #key,fieldtype,fieldinclass,metadata,validators,documentation,validatorslate
         #print(i)
def fieldtoJAVAcode(fieldinfo,ttouse):
   #print(fieldinfo)
   retval=""
   
   retval+=f""".{[i if i=="" else "<"+i+">" for i in [getTypeFromCodec(fieldinfo[1]) if "(" not in fieldinfo[1] else ""]][0]}appendInherited(
   \tnew KeyedCodec<>(\n\t\t{fieldinfo[0]},\n\t\t{fieldinfo[1]}),\n\t({ttouse}, {ttouse[0]}) -> {ttouse}.{fieldinfo[2]} = {ttouse[0]},\n\t{ttouse} -> {ttouse}.{fieldinfo[2]},\n\t({ttouse}, parent) -> {ttouse}.{fieldinfo[2]} = parent.{fieldinfo[2]}
    )\n"""
   for i in fieldinfo[3]:
      retval+=f".metadata({i})\n"
   for i in fieldinfo[4]:
      retval+=f".addValidator({i})\n"
   for i in fieldinfo[6]:
      retval+=f".addValidatorLate({i})\n"
   if(fieldinfo[5]!=""):
      retval+=f".documentation({fieldinfo[5]})\n"
   retval+=".add()\n"
   return retval

if 0:
   #def ezcodectojson(codec)
   n="""AssetBuilderCodec.builder(
            ModelAsset.class,
            ModelAsset::new,
            Codec.STRING,
            (modelAsset, s) -> modelAsset.id = s,
            modelAsset -> modelAsset.id,
            (modelAsset, data) -> modelAsset.extraData = data,
            modelAsset -> modelAsset.extraData
         )
         .metadata(new UIEditorPreview(UIEditorPreview.PreviewType.MODEL))
         .metadata(
            new UISidebarButtons(
               new UIButton("server.assetEditor.buttons.resetModel", "ResetModel"), new UIButton("server.assetEditor.buttons.useModel", "UseModel")
            )
         )
         .metadata(new UICreateButtons(new UIButton("server.assetEditor.buttons.createAndUseModel", "UseModel")))
         .<String>appendInherited(
            new KeyedCodec<>("Model", Codec.STRING), (model, s) -> model.model = s, model -> model.model, (model, parent) -> model.model = parent.model
         )
         .addValidator(CommonAssetValidator.MODEL_CHARACTER)
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("Texture", Codec.STRING), (model, s) -> model.texture = s, model -> model.texture, (model, parent) -> model.texture = parent.texture
         )
         .addValidator(CommonAssetValidator.TEXTURE_CHARACTER)
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("GradientSet", Codec.STRING),
            (model, s) -> model.gradientSet = s,
            model -> model.gradientSet,
            (model, parent) -> model.gradientSet = parent.gradientSet
         )
         .metadata(new UIEditor(new UIEditor.Dropdown("GradientSets")))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("GradientId", Codec.STRING),
            (model, s) -> model.gradientId = s,
            model -> model.gradientId,
            (model, parent) -> model.gradientId = parent.gradientId
         )
         .metadata(new UIEditor(new UIEditor.Dropdown("GradientIds")))
         .add()
         .<String>appendInherited(new KeyedCodec<>("Icon", Codec.STRING), (item, s) -> item.icon = s, item -> item.icon, (item, parent) -> item.icon = parent.icon)
         .addValidator(CommonAssetValidator.ICON_MODEL)
         .metadata(new UIEditor(new UIEditor.Icon("Icons/ModelsGenerated/{assetId}.png", 128, 128)))
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.ITEM_ICONS))
         .add()
         .<AssetIconProperties>appendInherited(
            new KeyedCodec<>("IconProperties", AssetIconProperties.CODEC),
            (item, s) -> item.iconProperties = s,
            item -> item.iconProperties,
            (item, parent) -> item.iconProperties = parent.iconProperties
         )
         .metadata(UIDisplayMode.HIDDEN)
         .add()
         .appendInherited(
            new KeyedCodec<>("Light", ProtocolCodecs.COLOR_LIGHT),
            (model, l) -> model.light = l,
            model -> model.light,
            (model, parent) -> model.light = parent.light
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("PhysicsValues", PhysicsValues.CODEC),
            (model, l) -> model.physicsValues = l,
            model -> model.physicsValues,
            (model, parent) -> model.physicsValues = parent.physicsValues
         )
         .add()
         .<Double>appendInherited(
            new KeyedCodec<>("MinScale", Codec.DOUBLE),
            (modelAsset, d) -> modelAsset.minScale = d.floatValue(),
            modelAsset -> (double)modelAsset.minScale,
            (modelAsset, parent) -> modelAsset.minScale = parent.minScale
         )
         .metadata(new UIEditorSectionStart("Hitbox"))
         .add()
         .appendInherited(
            new KeyedCodec<>("MaxScale", Codec.DOUBLE),
            (modelAsset, d) -> modelAsset.maxScale = d.floatValue(),
            modelAsset -> (double)modelAsset.maxScale,
            (modelAsset, parent) -> modelAsset.maxScale = parent.maxScale
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("EyeHeight", Codec.DOUBLE),
            (model, d) -> model.eyeHeight = d.floatValue(),
            model -> (double)model.eyeHeight,
            (model, parent) -> model.eyeHeight = parent.eyeHeight
         )
         .add()
         .<Box>appendInherited(
            new KeyedCodec<>("HitBox", Box.CODEC),
            (model, o) -> model.boundingBox = o,
            model -> model.boundingBox,
            (model, parent) -> model.boundingBox = parent.boundingBox
         )
         .addValidator(Validators.nonNull())
         .add()
         .appendInherited(
            new KeyedCodec<>("DetailBoxes", new MapCodec<>(new ArrayCodec<>(DetailBox.CODEC, DetailBox[]::new), HashMap::new)),
            (o, i) -> o.detailBoxes = i,
            o -> o.detailBoxes,
            (o, p) -> o.detailBoxes = p.detailBoxes
         )
         .add()
         .<Double>appendInherited(
            new KeyedCodec<>("CrouchOffset", Codec.DOUBLE),
            (model, d) -> model.crouchOffset = d.floatValue(),
            model -> (double)model.crouchOffset,
            (model, parent) -> model.crouchOffset = parent.crouchOffset
         )
         .metadata(new UIEditorSectionStart("Camera"))
         .add()
         .appendInherited(
            new KeyedCodec<>("Camera", CameraSettings.CODEC),
            (model, o) -> model.camera = o,
            model -> model.camera,
            (model, parent) -> model.camera = parent.camera
         )
         .add()
         .<ModelAttachment[]>appendInherited(
            new KeyedCodec<>("DefaultAttachments", new ArrayCodec<>(ModelAttachment.CODEC, ModelAttachment[]::new)),
            (modelAsset, l) -> modelAsset.defaultAttachments = l,
            modelAsset -> modelAsset.defaultAttachments,
            (modelAsset, parent) -> modelAsset.defaultAttachments = parent.defaultAttachments
         )
         .metadata(new UIEditorSectionStart("Attachments"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<Map>appendInherited(
            new KeyedCodec<>("RandomAttachmentSets", new MapCodec<>(new MapCodec<>(ModelAttachment.CODEC, HashMap::new), HashMap::new)),
            (modelAsset, l) -> modelAsset.randomAttachmentSets = l,
            modelAsset -> modelAsset.randomAttachmentSets,
            (modelAsset, parent) -> modelAsset.randomAttachmentSets = parent.randomAttachmentSets
         )
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<Map>appendInherited(
            new KeyedCodec<>("AnimationSets", new MapCodec<>(ModelAsset.AnimationSet.CODEC, HashMap::new)),
            (model, m) -> model.animationSetMap = MapUtil.combineUnmodifiable(model.animationSetMap, m),
            model -> model.animationSetMap,
            (model, parent) -> model.animationSetMap = parent.animationSetMap
         )
         .metadata(new UIEditorSectionStart("Animations"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<ModelParticle[]>appendInherited(
            new KeyedCodec<>("Particles", ModelParticle.ARRAY_CODEC),
            (model, l) -> model.particles = l,
            model -> model.particles,
            (model, parent) -> model.particles = parent.particles
         )
         .metadata(new UIEditorSectionStart("Physics"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<ModelTrail[]>appendInherited(
            new KeyedCodec<>("Trails", MODEL_TRAIL_ARRAY_CODEC),
            (model, l) -> model.trails = l,
            model -> model.trails,
            (model, parent) -> model.trails = parent.trails
         )
         .metadata(new UIEditorSectionStart("Trails"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<Phobia>appendInherited(
            new KeyedCodec<>("Phobia", new EnumCodec<>(Phobia.class)),
            (modelAsset, phobia) -> modelAsset.phobia = phobia,
            modelAsset -> modelAsset.phobia,
            (modelAsset, parent) -> modelAsset.phobia = parent.phobia
         )
         .addValidator(Validators.nonNull())
         .documentation("Enum used to specify if the NPC is part of a phobia (e.g. spider for arachnophobia).")
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("PhobiaModelAssetId", Codec.STRING),
            (modelAsset, s) -> modelAsset.phobiaModelAssetId = s,
            modelAsset -> modelAsset.phobiaModelAssetId,
            (modelAsset, parent) -> modelAsset.phobiaModelAssetId = parent.phobiaModelAssetId
         )
         .documentation("The model to use if the player has the setting with the matching phobia toggled on.")
         .addValidatorLate(() -> ModelAsset.VALIDATOR_CACHE.getValidator().late())
         .add()
         .afterDecode(modelAsset -> {
            if (modelAsset.randomAttachmentSets != null && !modelAsset.randomAttachmentSets.isEmpty()) {
               Map<String, IWeightedMap<String>> weightedRandomAttachmentSets = new Object2ObjectOpenHashMap<>();

               for (Entry<String, Map<String, ModelAttachment>> entry : modelAsset.randomAttachmentSets.entrySet()) {
                  WeightedMap.Builder<String> builder = WeightedMap.builder(ArrayUtil.EMPTY_STRING_ARRAY);

                  for (Entry<String, ModelAttachment> attachmentEntry : entry.getValue().entrySet()) {
                     builder.put(attachmentEntry.getKey(), attachmentEntry.getValue().weight);
                  }

                  weightedRandomAttachmentSets.put(entry.getKey(), builder.build());
               }

               modelAsset.weightedRandomAttachmentSets = weightedRandomAttachmentSets;
            }
         })
         .build();"""

   analyze("""BuilderCodec.abstractBuilder(Interaction.class)
         .appendInherited(
            new KeyedCodec<>("ViewDistance", Codec.DOUBLE),
            (damageEffects, s) -> damageEffects.viewDistance = s,
            damageEffects -> damageEffects.viewDistance,
            (damageEffects, parent) -> damageEffects.viewDistance = parent.viewDistance
         )
         .documentation("Configures the distance in which other players will be able to see the effects of this interaction.")
         .add()
         .<InteractionEffects>appendInherited(
            new KeyedCodec<>("Effects", InteractionEffects.CODEC),
            (interaction, o) -> interaction.effects = o,
            interaction -> interaction.effects,
            (interaction, parent) -> interaction.effects = parent.effects
         )
         .documentation("Sets effects that will be applied whilst the interaction is running.")
         .add()
         .<Float>appendInherited(
            new KeyedCodec<>("HorizontalSpeedMultiplier", Codec.FLOAT),
            (activationEffects, s) -> activationEffects.horizontalSpeedMultiplier = s,
            activationEffects -> activationEffects.horizontalSpeedMultiplier,
            (activationEffects, parent) -> activationEffects.horizontalSpeedMultiplier = parent.horizontalSpeedMultiplier
         )
         .documentation("The multiplier to apply to the horizontal speed of the entity whilst this interaction is running.")
         .metadata(new UIEditor(new UIEditor.FormattedNumber(0.1, null, null)))
         .add()
         .<Float>appendInherited(
            new KeyedCodec<>("RunTime", Codec.FLOAT),
            (activationEffects, s) -> activationEffects.runTime = s,
            activationEffects -> activationEffects.runTime,
            (activationEffects, parent) -> activationEffects.runTime = parent.runTime
         )
         .documentation(
            "The time in seconds this interaction should run for. \n\nIf *Effects.WaitForAnimationToFinish* is set and the length of the animation is longer than the runtime then the interaction will run for longer than the set time."
         )
         .metadata(new UIEditor(new UIEditor.FormattedNumber(0.01, "s", null)))
         .add()
         .<Boolean>appendInherited(
            new KeyedCodec<>("CancelOnItemChange", Codec.BOOLEAN),
            (damageEffects, s) -> damageEffects.cancelOnItemChange = s,
            damageEffects -> damageEffects.cancelOnItemChange,
            (damageEffects, parent) -> damageEffects.cancelOnItemChange = parent.cancelOnItemChange
         )
         .documentation("Whether the interaction will be cancelled when the entity's held item changes.")
         .add()
         .<InteractionRules>appendInherited(new KeyedCodec<>("Rules", InteractionRules.CODEC), (o, i) -> o.rules = i, o -> o.rules, (o, p) -> o.rules = p.rules)
         .documentation("A set of rules that control when this interaction can run.")
         .addValidator(Validators.nonNull())
         .add()
         .<Map<GameMode, InteractionSettings>>appendInherited(
            new KeyedCodec<>(
               "Settings",
               new EnumMapCodec<>(
                  GameMode.class,
                  BuilderCodec.builder(InteractionSettings.class, InteractionSettings::new)
                     .appendInherited(
                        new KeyedCodec<>("AllowSkipOnClick", Codec.BOOLEAN),
                        (settings, s) -> settings.allowSkipOnClick = s,
                        settings -> settings.allowSkipOnClick,
                        (settings, parent) -> settings.allowSkipOnClick = parent.allowSkipOnClick
                     )
                     .documentation("Whether to skip this interaction when another click is sent.")
                     .add()
                     .build()
               )
            ),
            (interaction, o) -> interaction.settings = o,
            interaction -> interaction.settings,
            (interaction, parent) -> interaction.settings = parent.settings
         )
         .documentation("Per a gamemode settings.")
         .add()
         .<InteractionCameraSettings>appendInherited(
            new KeyedCodec<>("Camera", InteractionCameraSettings.CODEC), (o, i) -> o.camera = i, o -> o.camera, (o, p) -> o.camera = p.camera
         )
         .documentation("Configures the camera behaviour for this interaction.")
         .add()
         .build();""","Interaction.ABSTRACT_CODEC")

   analyze("""BuilderCodec.builder(SimpleInteraction.class, SimpleInteraction::new, Interaction.ABSTRACT_CODEC)
         .documentation(
            "A interaction that does nothing other than base interaction features. Can be used for simple delays or triggering animations in between other interactions."
         )
         .<String>appendInherited(
            new KeyedCodec<>("Next", Interaction.CHILD_ASSET_CODEC),
            (interaction, s) -> interaction.next = s,
            interaction -> interaction.next,
            (interaction, parent) -> interaction.next = parent.next
         )
         .documentation("The interactions to run when this interaction succeeds.")
         .addValidatorLate(() -> VALIDATOR_CACHE.getValidator().late())
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("Failed", Interaction.CHILD_ASSET_CODEC),
            (interaction, s) -> interaction.failed = s,
            interaction -> interaction.failed,
            (interaction, parent) -> interaction.failed = parent.failed
         )
         .documentation("The interactions to run when this interaction fails.")
         .addValidatorLate(() -> VALIDATOR_CACHE.getValidator().late())
         .add()
         .build();""","SimpleInteraction.CODEC")

   analyze("""BuilderCodec.builder(BlockFlags.class, BlockFlags::new)
                  .appendInherited(
                     new KeyedCodec<>("IsUsable", Codec.BOOLEAN),
                     (blockFlags, b) -> blockFlags.isUsable = b,
                     blockFlags -> blockFlags.isUsable,
                     (blockFlags, parent) -> blockFlags.isUsable = parent.isUsable
                  )
                  .add()
                  .appendInherited(
                     new KeyedCodec<>("IsStackable", Codec.BOOLEAN),
                     (blockFlags, b) -> blockFlags.isStackable = b,
                     blockFlags -> blockFlags.isStackable,
                     (blockFlags, parent) -> blockFlags.isStackable = parent.isStackable
                  )
                  .add()
                  .build()""","BlockFlags.CODEC")



   m=(r"""AssetBuilderCodec.builder(
            BlockType.class, BlockType::new, Codec.STRING, (t, k) -> t.id = k, t -> t.id, (asset, data) -> asset.data = data, asset -> asset.data
         )
         .documentation("The definition for a block in the game. Can only be defined within an **Item** and not standalone.")
         .<String>appendInherited(
            new KeyedCodec<>("Group", Codec.STRING),
            (blockType, o) -> blockType.group = o,
            blockType -> blockType.group,
            (blockType, parent) -> blockType.group = parent.group
         )
         .documentation(
            "Sets the group for this block. Used by **BlockSets**.\n\nA group of _\"@Tech\"_ will prevent physics from being automatically applied to the block."
         )
         .metadata(new UIEditor(new UIEditor.TextField("BlockGroups")))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("BlockListAssetId", Codec.STRING),
            (blockType, blockListAssetId) -> blockType.blockListAssetId = blockListAssetId,
            blockType -> blockType.blockListAssetId,
            (blockType, parent) -> blockType.blockListAssetId = parent.blockListAssetId
         )
         .addValidator(BlockTypeListAsset.VALIDATOR_CACHE.getValidator())
         .documentation("The name of a BlockList asset, for use  in builder tool brushes")
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("PrefabListAssetId", Codec.STRING),
            (blockType, prefabListAssetId) -> blockType.prefabListAssetId = prefabListAssetId,
            blockType -> blockType.prefabListAssetId,
            (blockType, parent) -> blockType.prefabListAssetId = parent.prefabListAssetId
         )
         .addValidator(PrefabListAsset.VALIDATOR_CACHE.getValidator())
         .documentation("The name of a PrefabList asset, for use  in builder tool brushes")
         .add()
         .<DrawType>appendInherited(
            new KeyedCodec<>("DrawType", new EnumCodec<>(DrawType.class)),
            (blockType, o) -> blockType.drawType = o,
            blockType -> blockType.drawType,
            (blockType, parent) -> blockType.drawType = parent.drawType
         )
         .addValidator(Validators.nonNull())
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS, UIRebuildCaches.ClientCache.BLOCK_TEXTURES, UIRebuildCaches.ClientCache.MODEL_TEXTURES))
         .metadata(new UIEditorSectionStart("Rendering"))
         .add()
         .<BlockTypeTextures[]>appendInherited(
            new KeyedCodec<>("Textures", new ArrayCodec<>(BlockTypeTextures.CODEC, BlockTypeTextures[]::new)),
            (blockType, o) -> blockType.textures = o,
            blockType -> blockType.textures,
            (blockType, parent) -> blockType.textures = parent.textures
         )
         .metadata(new UIPropertyTitle("Block Textures"))
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS, UIRebuildCaches.ClientCache.BLOCK_TEXTURES))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("TextureSideMask", Codec.STRING),
            (blockType, o) -> blockType.textureSideMask = o,
            blockType -> blockType.textureSideMask,
            (blockType, parent) -> blockType.textureSideMask = parent.textureSideMask
         )
         .addValidator(CommonAssetValidator.TEXTURE_ITEM)
         .metadata(new UIPropertyTitle("Block Texture Side Mask"))
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS, UIRebuildCaches.ClientCache.BLOCK_TEXTURES))
         .add()
         .<ShadingMode>appendInherited(
            new KeyedCodec<>("CubeShadingMode", new EnumCodec<>(ShadingMode.class)),
            (blockType, o) -> blockType.cubeShadingMode = o,
            blockType -> blockType.cubeShadingMode,
            (blockType, parent) -> blockType.cubeShadingMode = parent.cubeShadingMode
         )
         .addValidator(Validators.nonNull())
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<CustomModelTexture[]>appendInherited(
            new KeyedCodec<>("CustomModelTexture", new ArrayCodec<>(CustomModelTexture.CODEC, CustomModelTexture[]::new)),
            (blockType, o) -> blockType.customModelTexture = o,
            blockType -> blockType.customModelTexture,
            (blockType, parent) -> blockType.customModelTexture = parent.customModelTexture
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS, UIRebuildCaches.ClientCache.BLOCK_TEXTURES))
         .metadata(new UIPropertyTitle("Block Model Textures"))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("CustomModel", Codec.STRING),
            (blockType, o) -> blockType.customModel = o,
            blockType -> blockType.customModel,
            (blockType, parent) -> blockType.customModel = parent.customModel
         )
         .addValidator(CommonAssetValidator.MODEL_ITEM)
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .metadata(new UIPropertyTitle("Block Model"))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("BlockBreakingDecalId", Codec.STRING),
            (blockType, s) -> blockType.blockBreakingDecalId = s,
            blockType -> blockType.blockBreakingDecalId,
            (blockType, parent) -> blockType.blockBreakingDecalId = parent.blockBreakingDecalId
         )
         .documentation("The block breaking decal defined here defines the decal asset that should be overlaid when this block is damaged")
         .addValidator(BlockBreakingDecal.VALIDATOR_CACHE.getValidator())
         .add()
         .<BlockMaterial>appendInherited(
            new KeyedCodec<>("Material", new EnumCodec<>(BlockMaterial.class)),
            (blockType, o) -> blockType.material = o,
            blockType -> blockType.material,
            (blockType, parent) -> blockType.material = parent.material
         )
         .addValidator(Validators.nonNull())
         .add()
         .<Opacity>appendInherited(
            new KeyedCodec<>("Opacity", new EnumCodec<>(Opacity.class)),
            (blockType, o) -> blockType.opacity = o,
            blockType -> blockType.opacity,
            (blockType, parent) -> blockType.opacity = parent.opacity
         )
         .addValidator(Validators.nonNull())
         .add()
         .<Boolean>appendInherited(
            new KeyedCodec<>("RequiresAlphaBlending", Codec.BOOLEAN),
            (blockType, o) -> blockType.requiresAlphaBlending = o,
            blockType -> blockType.requiresAlphaBlending,
            (blockType, parent) -> blockType.requiresAlphaBlending = parent.requiresAlphaBlending
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<Float>appendInherited(
            new KeyedCodec<>("CustomModelScale", Codec.FLOAT),
            (blockType, o) -> blockType.customModelScale = o,
            blockType -> blockType.customModelScale,
            (blockType, parent) -> blockType.customModelScale = parent.customModelScale
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("CustomModelAnimation", Codec.STRING),
            (blockType, o) -> blockType.customModelAnimation = o,
            blockType -> blockType.customModelAnimation,
            (blockType, parent) -> blockType.customModelAnimation = parent.customModelAnimation
         )
         .addValidator(CommonAssetValidator.ANIMATION_ITEM_BLOCK)
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .metadata(new UIPropertyTitle("Block Model Animation"))
         .add()
         .<ColorLight>appendInherited(
            new KeyedCodec<>("Light", ProtocolCodecs.COLOR_LIGHT),
            (blockType, o) -> blockType.light = o,
            blockType -> blockType.light,
            (blockType, parent) -> blockType.light = parent.light
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .metadata(new UIPropertyTitle("Block Light"))
         .add()
         .appendInherited(
            new KeyedCodec<>("TickProcedure", TickProcedure.CODEC),
            (blockType, v) -> blockType.tickProcedure = v,
            blockType -> blockType.tickProcedure,
            (blockType, parent) -> blockType.tickProcedure = parent.tickProcedure
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("ConnectedBlockRuleSet", ConnectedBlockRuleSet.CODEC),
            (blockType, connectedBlockRuleSet) -> blockType.connectedBlockRuleSet = connectedBlockRuleSet,
            blockType -> blockType.connectedBlockRuleSet,
            (blockType, parent) -> blockType.connectedBlockRuleSet = parent.connectedBlockRuleSet
         )
         .add()
         .<ShaderType[]>appendInherited(
            new KeyedCodec<>("Effect", new ArrayCodec<>(new EnumCodec<>(ShaderType.class), ShaderType[]::new)),
            (blockType, o) -> blockType.effect = o,
            blockType -> blockType.effect,
            (blockType, parent) -> blockType.effect = parent.effect
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("TransitionTexture", Codec.STRING),
            (blockType, o) -> blockType.transitionTexture = o,
            blockType -> blockType.transitionTexture,
            (blockType, parent) -> blockType.transitionTexture = parent.transitionTexture
         )
         .addValidator(CommonAssetValidator.TEXTURE_ITEM)
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS, UIRebuildCaches.ClientCache.BLOCK_TEXTURES))
         .add()
         .<String[]>appendInherited(
            new KeyedCodec<>("TransitionToGroups", new ArrayCodec<>(Codec.STRING, String[]::new).metadata(new UIEditor(new UIEditor.TextField("BlockGroups")))),
            (blockType, o) -> blockType.transitionToGroups = o,
            blockType -> blockType.transitionToGroups,
            (blockType, parent) -> blockType.transitionToGroups = parent.transitionToGroups
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("TransitionToTag", Codec.STRING),
            (blockType, o) -> blockType.transitionToTag = o,
            blockType -> blockType.transitionToTag,
            (blockType, parent) -> blockType.transitionToTag = parent.transitionToTag
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("BlockParticleSetId", Codec.STRING),
            (blockType, s) -> blockType.blockParticleSetId = s,
            blockType -> blockType.blockParticleSetId,
            (blockType, parent) -> blockType.blockParticleSetId = parent.blockParticleSetId
         )
         .documentation(
            "The block particle set defined here defines which particles should be spawned when an entity interacts with this block (like when stepping on it for example)"
         )
         .addValidator(BlockParticleSet.VALIDATOR_CACHE.getValidator())
         .metadata(new UIEditorSectionStart("Particles"))
         .add()
         .appendInherited(
            new KeyedCodec<>("ParticleColor", ProtocolCodecs.COLOR),
            (blockType, s) -> blockType.particleColor = s,
            blockType -> blockType.particleColor,
            (blockType, parent) -> blockType.particleColor = parent.particleColor
         )
         .add()
         .<ModelParticle[]>appendInherited(
            new KeyedCodec<>("Particles", ModelParticle.ARRAY_CODEC),
            (blockType, s) -> blockType.particles = s,
            blockType -> blockType.particles,
            (blockType, parent) -> blockType.particles = parent.particles
         )
         .documentation("The particles defined here will be spawned on top of blocks of this type placed in the world.")
         .metadata(new UIPropertyTitle("Block Particles"))
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .addValidator(Validators.nonNullArrayElements())
         .add()
         .<RandomRotation>appendInherited(
            new KeyedCodec<>("RandomRotation", new EnumCodec<>(RandomRotation.class)),
            (blockType, o) -> blockType.randomRotation = o,
            blockType -> blockType.randomRotation,
            (blockType, parent) -> blockType.randomRotation = parent.randomRotation
         )
         .metadata(new UIEditorSectionStart("Rotation"))
         .addValidator(Validators.nonNull())
         .add()
         .<VariantRotation>appendInherited(
            new KeyedCodec<>("VariantRotation", new EnumCodec<>(VariantRotation.class)),
            (blockType, o) -> blockType.variantRotation = o,
            blockType -> blockType.variantRotation,
            (blockType, parent) -> blockType.variantRotation = parent.variantRotation
         )
         .addValidator(Validators.nonNull())
         .add()
         .appendInherited(
            new KeyedCodec<>("FlipType", new EnumCodec<>(BlockFlipType.class)),
            (blockType, o) -> blockType.flipType = o,
            blockType -> blockType.flipType,
            (blockType, parent) -> blockType.flipType = parent.flipType
         )
         .add()
         .<Rotation>appendInherited(
            new KeyedCodec<>("RotationYawPlacementOffset", new EnumCodec<>(Rotation.class)),
            (blockType, o) -> blockType.rotationYawPlacementOffset = o,
            blockType -> blockType.rotationYawPlacementOffset,
            (blockType, parent) -> blockType.rotationYawPlacementOffset = parent.rotationYawPlacementOffset
         )
         .addValidator(Validators.nonNull())
         .add()
         .<RotatedMountPointsArray>appendInherited(
            new KeyedCodec<>("Seats", RotatedMountPointsArray.CODEC),
            (blockType, o) -> blockType.seats = o,
            blockType -> blockType.seats,
            (blockType, parent) -> blockType.seats = parent.seats
         )
         .metadata(new UIEditorSectionStart("Behaviour"))
         .documentation("The details of the seats on this block.")
         .add()
         .<RotatedMountPointsArray>appendInherited(
            new KeyedCodec<>("Beds", RotatedMountPointsArray.CODEC),
            (blockType, o) -> blockType.beds = o,
            blockType -> blockType.beds,
            (blockType, parent) -> blockType.beds = parent.beds
         )
         .documentation("The details of the beds for this block.")
         .add()
         .appendInherited(
            new KeyedCodec<>("MovementSettings", BlockMovementSettings.CODEC),
            (blockType, o) -> blockType.movementSettings = o,
            blockType -> blockType.movementSettings,
            (blockType, parent) -> blockType.movementSettings = parent.movementSettings
         )
         .add()
         .appendInherited(
            new KeyedCodec<>(
               "Flags",
               BuilderCodec.builder(BlockFlags.class, BlockFlags::new)
                  .appendInherited(
                     new KeyedCodec<>("IsUsable", Codec.BOOLEAN),
                     (blockFlags, b) -> blockFlags.isUsable = b,
                     blockFlags -> blockFlags.isUsable,
                     (blockFlags, parent) -> blockFlags.isUsable = parent.isUsable
                  )
                  .add()
                  .appendInherited(
                     new KeyedCodec<>("IsStackable", Codec.BOOLEAN),
                     (blockFlags, b) -> blockFlags.isStackable = b,
                     blockFlags -> blockFlags.isStackable,
                     (blockFlags, parent) -> blockFlags.isStackable = parent.isStackable
                  )
                  .add()
                  .build()
            ),
            (blockType, o) -> blockType.flags = o,
            blockType -> blockType.flags,
            (blockType, parent) -> blockType.flags = new BlockFlags(parent.flags)
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("Bench", Bench.CODEC),
            (blockType, s) -> blockType.bench = s,
            blockType -> blockType.bench,
            (blockType, parent) -> blockType.bench = parent.bench
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("Gathering", BlockGathering.CODEC),
            (blockType, s) -> blockType.gathering = s,
            blockType -> blockType.gathering,
            (blockType, parent) -> blockType.gathering = parent.gathering
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("PlacementSettings", BlockPlacementSettings.CODEC),
            (blockType, s) -> blockType.placementSettings = s,
            blockType -> blockType.placementSettings,
            (blockType, parent) -> blockType.placementSettings = parent.placementSettings
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("Farming", FarmingData.CODEC),
            (blockType, farming) -> blockType.farming = farming,
            blockType -> blockType.farming,
            (blockType, parent) -> blockType.farming = parent.farming
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("IsDoor", Codec.BOOLEAN),
            (blockType, s) -> blockType.isDoor = s,
            blockType -> blockType.isDoor,
            (blockType, parent) -> blockType.isDoor = parent.isDoor
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("AllowsMultipleUsers", Codec.BOOLEAN),
            (blockType, b) -> blockType.allowsMultipleUsers = b,
            blockType -> blockType.allowsMultipleUsers,
            (blockType, parent) -> blockType.allowsMultipleUsers = parent.allowsMultipleUsers
         )
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("HitboxType", Codec.STRING),
            (blockType, o) -> blockType.hitboxType = o,
            blockType -> blockType.hitboxType,
            (blockType, parent) -> blockType.hitboxType = parent.hitboxType
         )
         .addValidator(BlockBoundingBoxes.VALIDATOR_CACHE.getValidator())
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("InteractionHitboxType", Codec.STRING),
            (blockType, o) -> blockType.interactionHitboxType = o,
            blockType -> blockType.interactionHitboxType,
            (blockType, parent) -> blockType.interactionHitboxType = parent.interactionHitboxType
         )
         .addValidator(BlockBoundingBoxes.VALIDATOR_CACHE.getValidator())
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("InteractionHint", Codec.STRING),
            (blockType, s) -> blockType.interactionHint = s,
            blockType -> blockType.interactionHint,
            (blockType, parent) -> blockType.interactionHint = parent.interactionHint
         )
         .documentation(
            "This property allows to specify custom text that will be displayed underneath the crosshair when the player aims at this block. The value of this property should be a reference to a translation. *{key}* will be replaced with the interaction input binding."
         )
         .add()
         .appendInherited(
            new KeyedCodec<>("DamageToEntities", Codec.INTEGER),
            (blockType, s) -> blockType.damageToEntities = s,
            blockType -> blockType.damageToEntities,
            (blockType, parent) -> blockType.damageToEntities = parent.damageToEntities
         )
         .add()
         .<Map<InteractionType, String>>appendInherited(
            new KeyedCodec<>("Interactions", new EnumMapCodec<>(InteractionType.class, RootInteraction.CHILD_ASSET_CODEC)),
            (item, v) -> item.interactions = MapUtil.combineUnmodifiable(item.interactions, v, () -> new EnumMap<>(InteractionType.class)),
            item -> item.interactions,
            (item, parent) -> item.interactions = parent.interactions
         )
         .addValidator(RootInteraction.VALIDATOR_CACHE.getMapValueValidator())
         .metadata(new UIEditorSectionStart("Interactions"))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("BlockSoundSetId", Codec.STRING),
            (blockType, o) -> blockType.blockSoundSetId = o,
            blockType -> blockType.blockSoundSetId,
            (blockType, parent) -> blockType.blockSoundSetId = parent.blockSoundSetId
         )
         .documentation("Sets the **BlockSoundSet** that will be used for this block for various events e.g. placement, breaking")
         .addValidator(BlockSoundSet.VALIDATOR_CACHE.getValidator())
         .metadata(new UIEditorSectionStart("Sounds"))
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("AmbientSoundEventId", Codec.STRING),
            (blockType, s) -> blockType.ambientSoundEventId = s,
            blockType -> blockType.ambientSoundEventId,
            (blockType, parent) -> blockType.ambientSoundEventId = parent.ambientSoundEventId
         )
         .addValidator(SoundEvent.VALIDATOR_CACHE.getValidator())
         .addValidator(SoundEventValidators.MONO)
         .addValidator(SoundEventValidators.LOOPING)
         .documentation("A looping ambient sound event that emits from this block when placed in the world or held in-hand.")
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("InteractionSoundEventId", Codec.STRING),
            (blockType, s) -> blockType.interactionSoundEventId = s,
            blockType -> blockType.interactionSoundEventId,
            (blockType, parent) -> blockType.interactionSoundEventId = parent.interactionSoundEventId
         )
         .addValidator(SoundEvent.VALIDATOR_CACHE.getValidator())
         .addValidator(SoundEventValidators.MONO)
         .addValidator(SoundEventValidators.ONESHOT)
         .documentation("A oneshot sound event that plays upon interaction with this block.")
         .add()
         .<Boolean>appendInherited(
            new KeyedCodec<>("Looping", Codec.BOOLEAN),
            (blockType, s) -> blockType.isLooping = s,
            blockType -> blockType.isLooping,
            (blockType, parent) -> blockType.isLooping = parent.isLooping
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MODELS))
         .add()
         .<SupportDropType>appendInherited(
            new KeyedCodec<>("SupportDropType", SupportDropType.CODEC),
            (blockType, o) -> blockType.supportDropType = o,
            blockType -> blockType.supportDropType,
            (blockType, parent) -> blockType.supportDropType = parent.supportDropType
         )
         .metadata(new UIEditorSectionStart("Support"))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("MaxSupportDistance", Codec.INTEGER),
            (blockType, i) -> blockType.maxSupportDistance = i,
            blockType -> blockType.maxSupportDistance,
            (blockType, parent) -> blockType.maxSupportDistance = parent.maxSupportDistance
         )
         .addValidator(Validators.range(0, 14))
         .add()
         .<BlockSupportsRequiredForType>appendInherited(
            new KeyedCodec<>("SupportsRequiredFor", new EnumCodec<>(BlockSupportsRequiredForType.class)),
            (blockType, o) -> blockType.blockSupportsRequiredFor = o,
            blockType -> blockType.blockSupportsRequiredFor,
            (blockType, parent) -> blockType.blockSupportsRequiredFor = parent.blockSupportsRequiredFor
         )
         .addValidator(Validators.nonNull())
         .add()
         .<Map<BlockFace, RequiredBlockFaceSupport[]>>appendInherited(
            new KeyedCodec<>(
               "Support",
               new MergedEnumMapCodec<>(
                  BlockFace.class,
                  MergedBlockFaces.class,
                  MergedBlockFaces::getComponents,
                  ArrayUtil::combine,
                  new ArrayCodec<>(RequiredBlockFaceSupport.CODEC, RequiredBlockFaceSupport[]::new)
               )
            ),
            (blockType, o) -> blockType.support = o,
            blockType -> blockType.support,
            (blockType, parent) -> blockType.support = parent.support
         )
         .addValidator(RequiredBlockFaceSupportValidator.INSTANCE)
         .documentation(
            "A set of \"Required Support\" conditions. If met, the block won't fall off from block physics checks.\n*If this field is empty the block is automatically considered supported.*\n"
         )
         .add()
         .appendInherited(
            new KeyedCodec<>(
               "Supporting",
               new MergedEnumMapCodec<>(
                  BlockFace.class,
                  MergedBlockFaces.class,
                  MergedBlockFaces::getComponents,
                  ArrayUtil::combine,
                  new ArrayCodec<>(BlockFaceSupport.CODEC, BlockFaceSupport[]::new)
               )
            ),
            (blockType, o) -> blockType.supporting = o,
            blockType -> blockType.supporting,
            (blockType, parent) -> blockType.supporting = parent.supporting
         )
         .add()
         .documentation("The counter-party to \"Support\". This block offers supporting faces which can match the face requirements of adjacent/nearby blocks.")
         .<Boolean>appendInherited(
            new KeyedCodec<>("IgnoreSupportWhenPlaced", Codec.BOOLEAN),
            (o, i) -> o.ignoreSupportWhenPlaced = i,
            o -> o.ignoreSupportWhenPlaced,
            (o, p) -> o.ignoreSupportWhenPlaced = p.ignoreSupportWhenPlaced
         )
         .documentation("Whether when this block is placed by a player that the support requirements should be ignored.")
         .add()
         .<String[]>append(
            new KeyedCodec<>("Aliases", new ArrayCodec<>(Codec.STRING, String[]::new)), (blockType, o) -> blockType.aliases = o, blockType -> blockType.aliases
         )
         .documentation("Specifies the alternatives names (aliases) for a block type for use in command matching")
         .add()
         .<Color[]>append(new KeyedCodec<>("Tint", ProtocolCodecs.COLOR_ARRAY), (blockType, o) -> {
            blockType.tintUp = o;
            blockType.tintDown = o;
            blockType.tintNorth = o;
            blockType.tintSouth = o;
            blockType.tintWest = o;
            blockType.tintEast = o;
         }, blockType -> null)
         .metadata(new UIEditorSectionStart("Tint"))
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintUp", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintUp = o,
            blockType -> blockType.tintUp,
            (blockType, parent) -> blockType.tintUp = parent.tintUp
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintDown", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintDown = o,
            blockType -> blockType.tintDown,
            (blockType, parent) -> blockType.tintDown = parent.tintDown
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintNorth", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintNorth = o,
            blockType -> blockType.tintNorth,
            (blockType, parent) -> blockType.tintNorth = parent.tintNorth
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintSouth", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintSouth = o,
            blockType -> blockType.tintSouth,
            (blockType, parent) -> blockType.tintSouth = parent.tintSouth
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintWest", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintWest = o,
            blockType -> blockType.tintWest,
            (blockType, parent) -> blockType.tintWest = parent.tintWest
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Color[]>appendInherited(
            new KeyedCodec<>("TintEast", ProtocolCodecs.COLOR_ARRAY),
            (blockType, o) -> blockType.tintEast = o,
            blockType -> blockType.tintEast,
            (blockType, parent) -> blockType.tintEast = parent.tintEast
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>append(new KeyedCodec<>("BiomeTint", Codec.INTEGER), (blockType, o) -> {
            blockType.biomeTintUp = o;
            blockType.biomeTintDown = o;
            blockType.biomeTintNorth = o;
            blockType.biomeTintSouth = o;
            blockType.biomeTintWest = o;
            blockType.biomeTintEast = o;
         }, blockType -> null)
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintUp", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintUp = o,
            blockType -> blockType.biomeTintUp,
            (blockType, parent) -> blockType.biomeTintUp = parent.biomeTintUp
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintDown", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintDown = o,
            blockType -> blockType.biomeTintDown,
            (blockType, parent) -> blockType.biomeTintDown = parent.biomeTintDown
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintNorth", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintNorth = o,
            blockType -> blockType.biomeTintNorth,
            (blockType, parent) -> blockType.biomeTintNorth = parent.biomeTintNorth
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintSouth", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintSouth = o,
            blockType -> blockType.biomeTintSouth,
            (blockType, parent) -> blockType.biomeTintSouth = parent.biomeTintSouth
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintWest", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintWest = o,
            blockType -> blockType.biomeTintWest,
            (blockType, parent) -> blockType.biomeTintWest = parent.biomeTintWest
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<Integer>appendInherited(
            new KeyedCodec<>("BiomeTintEast", Codec.INTEGER),
            (blockType, o) -> blockType.biomeTintEast = o,
            blockType -> blockType.biomeTintEast,
            (blockType, parent) -> blockType.biomeTintEast = parent.biomeTintEast
         )
         .metadata(new UIRebuildCaches(UIRebuildCaches.ClientCache.MAP_GEOMETRY))
         .add()
         .<StateData>appendInherited(new KeyedCodec<>("State", StateData.CODEC), (blockType, s) -> {
            s.copyFrom(blockType.state);
            blockType.state = s;
         }, blockType -> blockType.state, (blockType, parent) -> blockType.state = parent.state)
         .metadata(new UIEditorSectionStart("State"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .<Holder<ChunkStore>>appendInherited(
            new KeyedCodec<>("BlockEntity", new StoredCodec<>(ChunkStore.HOLDER_CODEC_KEY)),
            (blockType, s) -> blockType.blockEntity = s,
            blockType -> blockType.blockEntity,
            (blockType, parent) -> blockType.blockEntity = parent.blockEntity
         )
         .metadata(new UIEditorSectionStart("Components"))
         .metadata(UIDefaultCollapsedState.UNCOLLAPSED)
         .add()
         .appendInherited(
            new KeyedCodec<>("Rail", ProtocolCodecs.RAIL_CONFIG_CODEC), (o, v) -> o.railConfig = v, o -> o.railConfig, (o, p) -> o.railConfig = p.railConfig
         )
         .add()
         .afterDecode(BlockType::processConfig)
         .build();""")


   analyze("""BuilderCodec.builder(SelectInteraction.class, SelectInteraction::new, SimpleInteraction.CODEC)
         .documentation(
            "An interaction that can be used to find entities/blocks within a given area.\n\nThis runs the given `Selector` every tick this interactions runs for, the selector may change the search area over time (based on `RunTime`). e.g. to trace out an arc of a sword swing.\n\nWhen an entity/block is found this interaction will run a set of interactions (as defined by `HitEntity`/`HitBlock`) **per a entity/block**, this will not interrupt the selector and it will continue searching until the select interaction completes.\n\nThis interaction does not wait for any forked interaction chains from `HitEntity`/`HitBlock` to complete before finishing itself."
         )
         .<SelectorType>appendInherited(
            new KeyedCodec<>("Selector", SelectorType.CODEC), (i, o) -> i.selector = o, i -> i.selector, (i, p) -> i.selector = p.selector
         )
         .documentation("The selector to use to find entities and blocks in an area.\nThe selector may be spread over the duration `RunTime`.")
         .addValidator(Validators.nonNull())
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("HitEntity", RootInteraction.CHILD_ASSET_CODEC), (o, i) -> o.hitEntity = i, o -> o.hitEntity, (o, p) -> o.hitEntity = p.hitEntity
         )
         .documentation(
            "The interactions to fork into when an entity is hit by the selector.\nThe hit entity will be the target of the interaction chain.\n\nAn entity cannot be hit multiple times by a single selector."
         )
         .addValidatorLate(() -> RootInteraction.VALIDATOR_CACHE.getValidator().late())
         .add()
         .appendInherited(
            new KeyedCodec<>("HitEntityRules", new ArrayCodec<>(SelectInteraction.HitEntity.CODEC, SelectInteraction.HitEntity[]::new)),
            (o, i) -> o.hitEntityRules = i,
            o -> o.hitEntityRules,
            (o, p) -> o.hitEntityRules = p.hitEntityRules
         )
         .documentation("Tests any hit entity with the given rules, running a fork for the last one matched.\nThis overrides `HitEntity` if any match.")
         .add()
         .<String>appendInherited(
            new KeyedCodec<>("HitBlock", RootInteraction.CHILD_ASSET_CODEC), (o, i) -> o.hitBlock = i, o -> o.hitBlock, (o, p) -> o.hitBlock = p.hitBlock
         )
         .documentation(
            "The interactions to fork into when a block is hit by the selector.\nThe hit block will be the target of the interaction chain.\n\nA block cannot be hit multiple times by a single selector."
         )
         .addValidatorLate(() -> RootInteraction.VALIDATOR_CACHE.getValidator().late())
         .add()
         .<FailOnType>append(new KeyedCodec<>("FailOn", new EnumCodec<>(FailOnType.class)), (o, v) -> o.failOn = v, o -> o.failOn)
         .documentation("Changes what causes the Failed case to run")
         .add()
         .<Boolean>appendInherited(
            new KeyedCodec<>("IgnoreOwner", Codec.BOOLEAN),
            (activationEffects, s) -> activationEffects.ignoreOwner = s,
            activationEffects -> activationEffects.ignoreOwner,
            (activationEffects, parent) -> activationEffects.ignoreOwner = parent.ignoreOwner
         )
         .documentation(
            "Determines whether the owner of the affiliated entity should be ignored in the selection.\n\nFor example, ignoring the thrower of a projectile."
         )
         .add()
         .build();""","SelectInteraction.CODEC")
#print(jsontoezcodec(*[analyzed['BlockType.CODEC'][0][k] if k in analyzed['BlockType.CODEC'][0] else "" for k in ['fields','metadata','class','constructor','extradatafield','idfield','afterdecode']],'BlockType.CODEC'))
def javaToCodec(javacode,codec):
   return jsontoezcodec(*analyze(javacode,codec),codec)
def codecToJava(codec):
   return ezcodectojson(codec)
#potential modder to talk to : 1465373003108843520
#get info via https://devpocket.dev/tools/discord-lookup
