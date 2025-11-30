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
        "annotation":{
            "Annotation":0,
            "AnnotationFormatError":0,
            "AnnotationTypeMismatchException":0,
            "Documented":0,
            "ElementType":0,
            "IncompleteAnnotationException":0,
            "Inherited":0,
            "Native":0,
            "Repeatable":0,
            "Retention":0,
            "RetentionPolicy":0,
            "Target":0
        },
        "constant":{
            "ClassDesc":0,
            "Constable":0,
            "ConstantDesc":0,
            "ConstantDescs":0,
            "DirectMethodHandleDesc":0,
            "DirectMethodHandleDesc.Kind":0,
            "DynamicCallSiteDesc":0,
            "DynamicConstantDesc":0,
            "MethodHandleDesc":0,
            "MethodTypeDesc":0,
            "ModuleDesc":0,
            "PackageDesc":0
        },
        "instrument":{
            "ClassDefinition":0,
            "ClassFileTransformer":0,
            "IllegalClassFormateException":0,
            "Instrumentation":0,
            "UnmodifiableClassException":0,
            "UnmodifiableModuleException":0
        },
        "invoke":{
            "CallSite":0,
            "ConstantBootstraps":0,
            "ConstantCallSite":0,
            "LambdaConversionException":0,
            "LambdaMetafactory":0,
            "MethodHandle":0,
            "MethodHandleInfo":0,
            "MethodHandleProxies":0,
            "MethodHandles":0,
            "MethodHandles.Lookup":0,
            "MethodHandles.Lookup.ClassOption":0,
            "MethodType":0,
            "MutableCallSite":0,
            "SerializedLambda":0,
            "StringConcatException":0,
            "StringConcatFactory":0,
            "SwitchPoint":0,
            "TypeDescriptor":0,
            "TypeDescriptor.OfField":0,
            "TypeDescriptor.OfMethod":0,
            "VarHandle":0,
            "VarHandle.AccessMode":0,
            "VarHandle.VarHandleDesc":0,
            "VolatileCallSite":0,
            "WrongMethodTypeException":0
        },
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
    },
    "util":{
        "stream":{
            "BaseStream":0,
            "Collector":0,
            "Collector.Characteristics":0,
            "Collectors":0,
            "DoubleStream":0,
            "DoubleStream.Builder":0,
            "DoubleStream.DoubleMapMultiConsumer":0,
            "IntStream":0,
            "IntStream.Builder":0,
            "IntStream.IntMapMultiConsumer":0,
            "LongStream":0,
            "LongStream.Builder":0,
            "LongStream.LongMultiMapConsumer":0,
            "Stream":0,
            "Stream.Builder":0,
            "StreamSupport":0
        },
        "concurrent":{
            "AbstractExecutorService":0,
            "ArrayBlockingQueue":0,
            "BlockingDeque":0,
            "BlockingQueue":0,
            "BrokenBarrierException":0,
            "Callable":0,
            "CancellationException":0,
            "CompletableFuture":0,
            "CompletableFuture.AsynchronousCompletionTask":0,
            "CompletionException":0,
            "CompletionService":0,
            "CompletionStage":0,
            "ConcurrentHashMap":0,
            "ConcurrentHashMap.KeySetView":0,
            "ConcurrentLinkedDeque":0,
            "ConcurrentLinkedQueue":0,
            "ConcurrentMap":0,
            "ConcurrentNavigableMap":0,
            "ConcurrentSkipListMap":0,
            "ConcurrentSkipListSet":0,
            "CopyOnWriteArrayList":0,
            "CopyOnWriteArraySet":0,
            "CountDownLatch":0,
            "CountedCompleter":0,
            "CyclicBarrier":0,
            "Delayed":0,
            "DelayQueue":0,
            "Exchanger":0,
            "ExecutionException":0,
            "Executor":0,
            "ExecutorCompletionService":0,
            "Executors":0,
            "ExecutorService":0,
            "Flow":0,
            "Flow.Processor":0,
            "Flow.Publisher":0,
            "Flow.Subscriber":0,
            "Flow.Subscription":0,
            "ForkJoinPool":0,
            "ForkJoinPool.ForkJoinWorkerThreadFactory":0,
            "ForkJoinPool.ManagedBlocker":0,
            "ForkJoinTask":0,
            "ForkJoinWorkerThread":0,
            "Future":0,
            "Future.State":0,
            "FutureTask":0,
            "LinkedBlockingDeque":0,
            "LinkedBlockingQueue":0,
            "LinkedTransferQueue":0,
            "Phaser":0,
            "PriorityBlockingQueue":0,
            "RecursiveAction":0,
            "RecursiveTask":0,
            "RejectedExecutionException":0,
            "RejectedExecutionHandler":0,
            "RunnableFuture":0,
            "RunnableScheduledFuture":0,
            "ScheduledExecutorService":0,
            "ScheduledFuture":0,
            "ScheduledThreadPoolExecutor":0,
            "Semaphore":0,
            "StructuredTaskScopePREVIEW":0,
            "StructuredTaskScope.ShutdownOnFailurePREVIEW":0,
            "StructuredTaskScope.ShutdownOnSuccessPREVIEW":0,
            "StructuredTaskScope.SubtaskPREVIEW":0,
            "StructuredTaskScope.Subtask.StatePREVIEW":0,
            "StructureViolationExceptionPREVIEW":0,
            "SubmissionPublisher":0,
            "SynchronousQueue":0,
            "ThreadFactory":0,
            "ThreadLocalRandom":0,
            "ThreadPoolExecutor":0,
            "ThreadPoolExecutor.AbortPolicy":0,
            "ThreadPoolExecutor.CallerRunsPolicy":0,
            "ThreadPoolExecutor.DiscardOldestPolicy":0,
            "ThreadPoolExecutor.DiscardPolicy":0,
            "TimeoutException":0,
            "TimeUnit":0,
            "TransferQueue":0,
            "AbstractExecutorService":0,
            "ArrayBlockingQueue":0,
            "BlockingDeque":0,
            "BlockingQueue":0,
            "BrokenBarrierException":0,
            "Callable":0,
            "CancellationException":0,
            "CompletableFuture":0,
            "CompletableFuture.AsynchronousCompletionTask":0,
            "CompletionException":0,
            "CompletionService":0,
            "CompletionStage":0,
            "ConcurrentHashMap":0,
            "ConcurrentHashMap.KeySetView":0,
            "ConcurrentLinkedDeque":0,
            "ConcurrentLinkedQueue":0,
            "ConcurrentMap":0,
            "ConcurrentNavigableMap":0,
            "ConcurrentSkipListMap":0,
            "ConcurrentSkipListSet":0,
            "CopyOnWriteArrayList":0,
            "CopyOnWriteArraySet":0,
            "CountDownLatch":0,
            "CountedCompleter":0,
            "CyclicBarrier":0,
            "Delayed":0,
            "DelayQueue":0,
            "Exchanger":0,
            "ExecutionException":0,
            "Executor":0,
            "ExecutorCompletionService":0,
            "Executors":0,
            "ExecutorService":0,
            "Flow":0,
            "Flow.Processor":0,
            "Flow.Publisher":0,
            "Flow.Subscriber":0,
            "Flow.Subscription":0,
            "ForkJoinPool":0,
            "ForkJoinPool.ForkJoinWorkerThreadFactory":0,
            "ForkJoinPool.ManagedBlocker":0,
            "ForkJoinTask":0,
            "ForkJoinWorkerThread":0,
            "Future":0,
            "Future.State":0,
            "FutureTask":0,
            "LinkedBlockingDeque":0,
            "LinkedBlockingQueue":0,
            "LinkedTransferQueue":0,
            "Phaser":0,
            "PriorityBlockingQueue":0,
            "RecursiveAction":0,
            "RecursiveTask":0,
            "RejectedExecutionException":0,
            "RejectedExecutionHandler":0,
            "RunnableFuture":0,
            "RunnableScheduledFuture":0,
            "ScheduledExecutorService":0,
            "ScheduledFuture":0,
            "ScheduledThreadPoolExecutor":0,
            "Semaphore":0,
            "StructuredTaskScope":0,
            "StructuredTaskScope.ShutdownOnFailure":0,
            "StructuredTaskScope.ShutdownOnSuccess":0,
            "StructuredTaskScope.Subtask":0,
            "StructuredTaskScope.Subtask.State":0,
            "StructureViolationException":0,
            "SubmissionPublisher":0,
            "SynchronousQueue":0,
            "ThreadFactory":0,
            "ThreadLocalRandom":0,
            "ThreadPoolExecutor":0,
            "ThreadPoolExecutor.AbortPolicy":0,
            "ThreadPoolExecutor.CallerRunsPolicy":0,
            "ThreadPoolExecutor.DiscardOldestPolicy":0,
            "ThreadPoolExecutor.DiscardPolicy":0,
            "TimeoutException":0,
            "TimeUnit":0,
            "TransferQueue":0
        },
        "function":{
            "BiConsumer":0,
            "BiFunction":0,
            "BinaryOperator":0,
            "BiPredicate":0,
            "BooleanSupplier":0,
            "Consumer":0,
            "DoubleBinaryOperator":0,
            "DoubleConsumer":0,
            "DoubleFunction":0,
            "DoublePredicate":0,
            "DoubleSupplier":0,
            "DoubleToIntFunction":0,
            "DoubleToLongFunction":0,
            "DoubleUnaryOperator":0,
            "Function":0,
            "IntBinaryOperator":0,
            "IntConsumer":0,
            "IntFunction":0,
            "IntPredicate":0,
            "IntSupplier":0,
            "IntToDoubleFunction":0,
            "IntToLongFunction":0,
            "IntUnaryOperator":0,
            "LongBinaryOperator":0,
            "LongConsumer":0,
            "LongFunction":0,
            "LongPredicate":0,
            "LongSupplier":0,
            "LongToDoubleFunction":0,
            "LongToIntFunction":0,
            "LongUnaryOperator":0,
            "ObjDoubleConsumer":0,
            "ObjIntConsumer":0,
            "ObjLongConsumer":0,
            "Predicate":0,
            "Supplier":0,
            "ToDoubleBiFunction":0,
            "ToDoubleFunction":0,
            "ToIntBiFunction":0,
            "ToIntFunction":0,
            "ToLongBiFunction":0,
            "ToLongFunction":0,
            "UnaryOperator":0
        },
        "random":{
            "RandomGenerator":0,
            "RandomGenerator.ArbitrarilyJumpableGenerator":0,
            "RandomGenerator.JumpableGenerator":0,
            "RandomGenerator.LeapableGenerator":0,
            "RandomGenerator.SplittableGenerator":0,
            "RandomGenerator.StreamableGenerator":0,
            "RandomGeneratorFactory":0
        },
        "regex":{
            "Matcher":0,
            "MatchResult":0,
            "Pattern":0,
            "PatternSyntaxException":0
        },
        "zip":{
            "Adler32":0,
            "CheckedInputStream":0,
            "CheckedOutputStream":0,
            "Checksum":0,
            "CRC32":0,
            "CRC32C":0,
            "DataFormatException":0,
            "Deflater":0,
            "DeflaterInputStream":0,
            "DeflaterOutputStream":0,
            "GZIPInputStream":0,
            "GZIPOutputStream":0,
            "Inflater":0,
            "InflaterInputStream":0,
            "InflaterOutputStream":0,
            "ZipEntry":0,
            "ZipError":0,
            "ZipException":0,
            "ZipFile":0,
            "ZipInputStream":0,
            "ZipOutputStream":0
        },
        "AbstractCollection":0,
        "AbstractList":0,
        "AbstractMap":0,
        "AbstractMap.SimpleEntry":0,
        "AbstractMap.SimpleImmutableEntry":0,
        "AbstractQueue":0,
        "AbstractSequentialList":0,
        "AbstractSet":0,
        "ArrayDeque":0,
        "ArrayList":0,
        "Arrays":0,
        "Base64":0,
        "Base64.Decoder":0,
        "Base64.Encoder":0,
        "BitSet":0,
        "Calendar":0,
        "Calendar.Builder":0,
        "Collection":0,
        "Collections":0,
        "Comparator":0,
        "ConcurrentModificationException":0,
        "Currency":0,
        "Date":0,
        "Deque":0,
        "Dictionary":0,
        "DoubleSummaryStatistics":0,
        "DuplicateFormatFlagsException":0,
        "EmptyStackException":0,
        "Enumeration":0,
        "EnumMap":0,
        "EnumSet":0,
        "EventListener":0,
        "EventListenerProxy":0,
        "EventObject":0,
        "FormatFlagsConversionMismatchException":0,
        "FormatProcessorPREVIEW":0,
        "Formattable":0,
        "FormattableFlags":0,
        "Formatter":0,
        "Formatter.BigDecimalLayoutForm":0,
        "FormatterClosedException":0,
        "GregorianCalendar":0,
        "HashMap":0,
        "HashSet":0,
        "Hashtable":0,
        "HexFormat":0,
        "IdentityHashMap":0,
        "IllegalFormatCodePointException":0,
        "IllegalFormatConversionException":0,
        "IllegalFormatException":0,
        "IllegalFormatFlagsException":0,
        "IllegalFormatPrecisionException":0,
        "IllegalFormatWidthException":0,
        "IllformedLocaleException":0,
        "InputMismatchException":0,
        "IntSummaryStatistics":0,
        "InvalidPropertiesFormatException":0,
        "Iterator":0,
        "LinkedHashMap":0,
        "LinkedHashSet":0,
        "LinkedList":0,
        "List":0,
        "ListIterator":0,
        "ListResourceBundle":0,
        "Locale":0,
        "Locale.Builder":0,
        "Locale.Category":0,
        "Locale.FilteringMode":0,
        "Locale.IsoCountryCode":0,
        "Locale.LanguageRange":0,
        "LongSummaryStatistics":0,
        "Map":0,
        "Map.Entry":0,
        "MissingFormatArgumentException":0,
        "MissingFormatWidthException":0,
        "MissingResourceException":0,
        "NavigableMap":0,
        "NavigableSet":0,
        "NoSuchElementException":0,
        "Objects":0,
        "Observable":0,
        "Observer":0,
        "Optional":0,
        "OptionalDouble":0,
        "OptionalInt":0,
        "OptionalLong":0,
        "PrimitiveIterator":0,
        "PrimitiveIterator.OfDouble":0,
        "PrimitiveIterator.OfInt":0,
        "PrimitiveIterator.OfLong":0,
        "PriorityQueue":0,
        "Properties":0,
        "PropertyPermission":0,
        "PropertyResourceBundle":0,
        "Queue":0,
        "Random":0,
        "RandomAccess":0,
        "ResourceBundle":0,
        "ResourceBundle.Control":0,
        "Scanner":0,
        "SequencedCollection":0,
        "SequencedMap":0,
        "SequencedSet":0,
        "ServiceConfigurationError":0,
        "ServiceLoader":0,
        "ServiceLoader.Provider":0,
        "Set":0,
        "SimpleTimeZone":0,
        "SortedMap":0,
        "SortedSet":0,
        "Spliterator":0,
        "Spliterator.OfDouble":0,
        "Spliterator.OfInt":0,
        "Spliterator.OfLong":0,
        "Spliterator.OfPrimitive":0,
        "Spliterators":0,
        "Spliterators.AbstractDoubleSpliterator":0,
        "Spliterators.AbstractIntSpliterator":0,
        "Spliterators.AbstractLongSpliterator":0,
        "Spliterators.AbstractSpliterator":0,
        "SplittableRandom":0,
        "Stack":0,
        "StringJoiner":0,
        "StringTokenizer":0,
        "Timer":0,
        "TimerTask":0,
        "TimeZone":0,
        "TooManyListenersException":0,
        "TreeMap":0,
        "TreeSet":0,
        "UnknownFormatConversionException":0,
        "UnknownFormatFlagsException":0,
        "UUID":0,
        "Vector":0,
        "WeakHashMap":0
    }
}

//e=document.createElement('span');e.id='datalists';e.innerHTML='<datalist id="fullclasslist"><option>option here!</option></datalist>';document.head.appendChild(e)
//<input class="long-input" list="fullclasslist">
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
    typename=typename.split("<")[0]
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
            return "L"+standardClassesList[typename].replaceAll(".","$").split("<")[0]+";"
        }else if(allClasses[typename+".java"]!=undefined){
            return "L"+allClasses[typename+".java"][0].replaceAll(".","/").split("<")[0]+"/"+allClasses[typename+".java"][1][0][4].replaceAll(".","$").split("<")[0]+";"
        }else{
            return "err"
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
