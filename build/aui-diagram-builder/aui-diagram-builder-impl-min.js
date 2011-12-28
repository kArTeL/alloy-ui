AUI.add("aui-diagram-builder-impl",function(aC){var ar=aC.Lang,d=ar.isArray,a1=ar.isBoolean,O=ar.isObject,a5=ar.isString,ax=aC.WidgetStdMod,bf=aC.Array,ap="activeElement",ac="availableField",af="availableFields",F="backspace",an="boolean",z="boundary",t="boundingBox",bb="builder",aw="cancel",ay="canvas",aR="click",a6="closeEvent",L="closeMessage",a8="condition",T="connector",m="connectors",aA="content",W="controls",aO="controlsToolbar",U="createDocumentFragment",aM="data",ah="delete",aK="deleteConnectorsMessage",r="deleteNodesMessage",aU="description",M="diagram",az="diagram-builder",aG="diagramNode",a9="diagram-node-manager",H="diagram-node",aY="dragNode",ae="dragging",I="editEvent",R="editMessage",X="editing",aT="end",a="esc",a0="field",u="fields",aE="fieldsDragConfig",aB="fork",al="graphic",aZ="height",aI="highlightBoundaryStroke",S="highlightDropZones",c="highlighted",aQ="id",w="join",Z="keydown",aD="label",C="lock",v="mouseenter",ao="mouseleave",q="name",s="node",aJ="p1",aH="p2",f="parentNode",o="pencil",aN="radius",au="records",n="recordset",k="region",bc="rendered",Q="required",a4="selected",aX="shape",ag="shapeBoundary",j="shapeInvite",P="showSuggestConnector",Y="source",aL="start",am="state",y="stroke",aW="suggest",aP="suggestConnectorOverlay",l="target",K="task",p="transition",ab="transitions",g="type",at="visible",V="width",E="xy",D="zIndex",be="-",i=".",aa="",h="#",N="_",B=aC.getClassName,x=B(M,bb,W),a3=B(M,bb,a0),aq=B(M,s),b=B(M,s,aA),aS=B(M,s,X),ad=B(M,s,aD),bd=B(M,s,a4),aV=B(M,s,aX,z),e=B(M,s,aW,T),av=function(bi,A){var bh=d(bi)?bi:bi.get(t).getXY();return[bh[0]+A[0],bh[1]+A[1]];},ba=function(bj,bi){var bh=bi[0]-bj[0],A=bi[1]-bj[1];return Math.sqrt(bh*bh+A*A);},ak=function(br,bp){var bn=br.hotPoints,bm=bp.hotPoints,bu=br.get(t).getXY(),bs=bp.get(t).getXY(),bj,bh,bk,bi,bt=Infinity,bl=[[0,0],[0,0]];for(bk=0,bj=bn.length;bk<bj;bk++){var bq=bn[bk],bw=av(bu,bq);for(bi=0,bh=bm.length;bi<bh;bi++){var bo=bm[bi],bv=av(bs,bo),A=ba(bv,bw);if(A<bt){bl[0]=bq;bl[1]=bo;bt=A;}}}return bl;},aF=function(A,bi){var bh=d(bi)?bi:bi.getXY();var bj=d(A)?A:A.getXY();return bf.map(bj,function(bl,bk){return Math.max(0,bl-bh[bk]);});},J=function(A){return aC.instanceOf(A,aC.Connector);},a7=function(A){return aC.instanceOf(A,aC.DataSet);},ai=function(A){return aC.instanceOf(A,aC.DiagramBuilderBase);},a2=function(A){return aC.instanceOf(A,aC.DiagramNode);};var G=aC.Component.create({NAME:az,ATTRS:{connector:{setter:"_setConnector",value:null},fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:O},graphic:{valueFn:function(){return new aC.Graphic();},validator:O},highlightDropZones:{validator:a1,value:true},strings:{value:{addNode:"Add node",cancel:"Cancel",deleteConnectorsMessage:"Are you sure you want to delete the selected connector(s)?",deleteNodesMessage:"Are you sure you want to delete the selected node(s)?",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},showSuggestConnector:{validator:a1,value:true},suggestConnectorOverlay:{value:null,setter:"_setSuggestConnectorOverlay"}},EXTENDS:aC.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{editingConnector:null,editingNode:null,publishedSource:null,publishedTarget:null,selectedConnector:null,selectedNode:null,initializer:function(){var A=this;A.after({render:A.syncConnectionsUI});A.on({cancel:A._onCancel,"drag:drag":A._onDrag,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});aC.DiagramNodeManager.on({publishedSource:function(bh){A.publishedTarget=null;A.publishedSource=bh.publishedSource;}});A.handlerKeyDown=aC.getDoc().on(Z,aC.bind(A._afterKeyEvent,A));A.dropContainer.delegate(aR,aC.bind(A._onNodeClick,A),i+aq);A.dropContainer.delegate(v,aC.bind(A._onNodeMouseEnter,A),i+aq);A.dropContainer.delegate(ao,aC.bind(A._onNodeMouseLeave,A),i+aq);},renderUI:function(){var A=this;aC.DiagramBuilder.superclass.renderUI.apply(this,arguments);A._renderGraphic();},syncUI:function(){var A=this;aC.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();A.connector=A.get(T);},syncConnectionsUI:function(){var A=this;A.get(u).each(function(bh){bh.syncConnectionsUI();});},clearFields:function(){var bh=this;var A=[];bh.get(u).each(function(bi){A.push(bi);});bf.each(A,function(bi){bi.destroy();});A=bh.editingConnector=bh.editingNode=bh.selectedNode=null;},closeEditProperties:function(){var A=this;var bh=A.editingNode;var bi=A.tabView;bi.selectTab(aC.DiagramBuilder.FIELDS_TAB);bi.disableTab(aC.DiagramBuilder.SETTINGS_TAB);if(bh){bh.get(t).removeClass(aS);}A.editingConnector=A.editingNode=null;},connect:function(bh,bj,bi){var A=this;if(a5(bh)){bh=aC.Widget.getByNode(h+aC.DiagramNode.buildNodeId(bh));}if(a5(bj)){bj=aC.Widget.getByNode(h+aC.DiagramNode.buildNodeId(bj));}if(bh&&bj){bh.connect(bj.get(q),bi);}return A;},connectAll:function(bh){var A=this;bf.each(bh,function(bi){if(bi.hasOwnProperty(Y)&&bi.hasOwnProperty(l)){A.connect(bi.source,bi.target,bi.connector);}});return A;},createField:function(bh){var A=this;if(!a2(bh)){bh.builder=A;bh.bubbleTargets=A;bh=new (A.getFieldClass(bh.type||s))(bh);}return bh;},deleteSelectedConnectors:function(){var bh=this;var A=bh.getStrings();var bi=bh.getSelectedConnectors();if(bi.length&&confirm(A[aK])){bf.each(bi,function(bj){var bk=bj.get(p);aC.DiagramNode.getNodeByName(bk.source).disconnect(bk);});bh.stopEditing();}},deleteSelectedNode:function(){var bh=this;var A=bh.getStrings();var bi=bh.selectedNode;if(bi&&!bi.get(Q)&&confirm(A[r])){bi.close();bh.editingNode=bh.selectedNode=null;bh.stopEditing();}},destructor:function(bh){var A=this;A.get(aP).destroy();},eachConnector:function(bh){var A=this;A.get(u).each(function(bi){bi.get(ab).each(function(bj){bh.call(A,bi.getConnector(bj),bj,bi);});});},editConnector:function(bh){var A=this;if(bh){var bi=A.tabView;A.closeEditProperties();bi.enableTab(aC.DiagramBuilder.SETTINGS_TAB);bi.selectTab(aC.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(n,bh.getProperties());A.editingConnector=A.selectedConnector=bh;}},editNode:function(bi){var A=this;
if(bi){var bh=A.tabView;A.closeEditProperties();bh.enableTab(aC.DiagramBuilder.SETTINGS_TAB);bh.selectTab(aC.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(n,bi.getProperties());bi.get(t).addClass(aS);A.editingNode=A.selectedNode=bi;}},getFieldClass:function(bi){var A=this;var bh=aC.DiagramBuilder.types[bi];if(bh){return bh;}else{aC.log("The field type: ["+bi+"] couldn't be found.");return null;}},getNodesByTransitionProperty:function(bj,bi){var A=this;var bh=[];A.get(u).each(function(bk){bk.get(ab).each(function(bl){if(bl[bj]===bi){bh.push(bk);return false;}});});return bh;},getSelectedConnectors:function(){var A=this;var bh=[];A.eachConnector(function(bi){if(bi.get(a4)){bh.push(bi);}});return bh;},getSourceNodes:function(bh){var A=this;return A.getNodesByTransitionProperty(l,bh.get(q));},hideSuggestConnetorOverlay:function(bj,bh){var A=this;A.connector.hide();A.get(aP).hide();try{A.fieldsDrag.dd.set(C,false);}catch(bi){}},isAbleToConnect:function(){var A=this;return !!(A.publishedSource&&A.publishedTarget);},isFieldsDrag:function(bh){var A=this;return(bh===A.fieldsDrag.dd);},plotField:function(bh){var A=this;if(!bh.get(bc)){bh.render(A.dropContainer);}},select:function(bh){var A=this;A.unselectNodes();A.selectedNode=bh.set(a4,true).focus();},showSuggestConnetorOverlay:function(bi){var A=this;A.get(aP).set(E,bi||A.connector.get(aH)).show().get(t).addClass(e);try{A.fieldsDrag.dd.set(C,true);}catch(bh){}},stopEditing:function(){var A=this;A.unselectConnectors();A.unselectNodes();A.closeEditProperties();},toJSON:function(){var A=this;var bh={nodes:[]};A.get(u).each(function(bj){var bi={transitions:[]};bf.each(bj.SERIALIZABLE_ATTRS,function(bk){bi[bk]=bj.get(bk);});bj.get(ab).each(function(bl){var bk=bj.getConnector(bl);bl.connector=bk.toJSON();bi.transitions.push(bl);});bh.nodes.push(bi);});return bh;},unselectConnectors:function(){var A=this;bf.each(A.getSelectedConnectors(),function(bh){bh.set(a4,false);});},unselectNodes:function(){var A=this;var bh=A.selectedNode;if(bh){bh.set(a4,false);}A.selectedNode=null;},_afterKeyEvent:function(bh){var A=this;if(bh.hasModifier()||aC.getDoc().get(ap).test(":input,td")){return;}if(bh.isKey(a)){A._onEscKey(bh);}else{if(bh.isKey(F)||bh.isKey(ah)){A._onDeleteKey(bh);}}},_onCancel:function(bh){var A=this;A.closeEditProperties();},_onDeleteKey:function(bh){var A=this;A.deleteSelectedConnectors();A.deleteSelectedNode();bh.halt();},_onDrag:function(bi){var A=this;var bh=bi.target;if(A.isFieldsDrag(bh)){var bj=aC.Widget.getByNode(bh.get(aY));bj.alignTransitions();bf.each(A.getSourceNodes(bj),function(bk){bk.alignTransitions();});}},_onDragEnd:function(bi){var A=this;var bh=bi.target;var bj=aC.Widget.getByNode(bh.get(aY));if(bj&&A.isFieldsDrag(bh)){bj.set(E,bj.getLeftTop());}},_onDropHit:function(bi){var A=this;var bh=bi.drag;if(A.isAvailableFieldsDrag(bh)){var bk=bh.get(s).getData(ac);var bj=A.addField({xy:aF(bh.lastXY,A.dropContainer),type:bk.get(g)});A.select(bj);}},_onEscKey:function(bh){var A=this;A.hideSuggestConnetorOverlay();A.stopEditing();bh.halt();},_onCanvasClick:function(bh){var A=this;A.stopEditing();A.hideSuggestConnetorOverlay();},_onNodeClick:function(bh){var A=this;var bi=aC.Widget.getByNode(bh.currentTarget);A.select(bi);A._onNodeEdit(bh);},_onNodeEdit:function(bh){var A=this;if(!bh.target.ancestor(i+b,true)){return;}var bi=aC.Widget.getByNode(bh.currentTarget);if(bi){A.editNode(bi);}},_onNodeMouseEnter:function(bh){var A=this;var bi=aC.Widget.getByNode(bh.currentTarget);bi.set(c,true);},_onNodeMouseLeave:function(bi){var A=this;var bh=A.publishedSource;var bj=aC.Widget.getByNode(bi.currentTarget);if(!bh||!bh.boundaryDragDelegate.dd.get(ae)){bj.set(c,false);}},_onSave:function(bi){var A=this;var bh=A.editingNode;var bj=A.editingConnector;var bk=A.propertyList.get(n);if(bh){bf.each(bk.get(au),function(bl){var bm=bl.get(aM);bh.set(bm.attributeName,bm.value);});}else{if(bj){bf.each(bk.get(au),function(bl){var bm=bl.get(aM);bj.set(bm.attributeName,bm.value);});}}},_onSuggestConnectorNodeClick:function(bj){var A=this;var bk=bj.currentTarget.getData(ac);var bh=A.connector;var bi=A.addField({type:bk.get(g),xy:bh.toCoordinate(bh.get(aH))});A.hideSuggestConnetorOverlay();A.publishedSource.connectNode(bi);},_renderGraphic:function(){var A=this;var bh=A.get(al);bh.render(A.get(ay));aC.one(bh.get(s)).on(aR,aC.bind(A._onCanvasClick,A));},_setConnector:function(bi){var A=this;if(!J(bi)){var bh=A.get(ay).getXY();bi=new aC.Connector(aC.merge({builder:A,graphic:A.get(al),lazyDraw:true,p1:bh,p2:bh,shapeHover:null,showName:false},bi));}return bi;},_setFieldsDragConfig:function(bi){var A=this;var bh=A.dropContainer;return aC.merge({bubbleTargets:A,container:bh,dragConfig:{plugins:[{cfg:{constrain:bh},fn:aC.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:aC.Plugin.DDWinScroll}]},nodes:i+aq},bi||{});},_setSuggestConnectorOverlay:function(bi){var A=this;if(!bi){var bh=aC.getDoc().invoke(U);bf.each(A.get(af),function(bk){var bj=bk.get(s);bh.appendChild(bj.clone().setData(ac,bj.getData(ac)));});bi=new aC.Overlay({bodyContent:bh,render:true,visible:false,zIndex:10000});bi.get(t).delegate(aR,aC.bind(A._onSuggestConnectorNodeClick,A),i+a3);}return bi;},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new aC.DD.Delegate(A.get(aE));}}});aC.DiagramBuilder=G;aC.DiagramBuilder.types={};var aj=aC.Component.create({NAME:a9,EXTENDS:aC.Base});aC.DiagramNodeManager=new aj();var bg=aC.Component.create({NAME:H,UI_ATTRS:[c,q,Q,a4],ATTRS:{builder:{validator:ai},connectors:{valueFn:"_createDataSet",writeOnce:true},controlsToolbar:{validator:O,valueFn:"_valueControlsToolbar"},description:{value:aa,validator:a5},graphic:{writeOnce:true,validator:O},height:{value:60},highlighted:{validator:a1,value:false},name:{valueFn:function(){var A=this;return A.get(g)+(++aC.Env._uidx);},validator:a5},required:{value:false,validator:a1},selected:{value:false,validator:a1},shapeBoundary:{validator:O,valueFn:"_valueShapeBoundary"},highlightBoundaryStroke:{validator:O,value:{weight:7,color:"#484B4C",opacity:0.25}},shapeInvite:{validator:O,value:{radius:12,type:"circle",stroke:{weight:6,color:"#ff6600",opacity:0.8},fill:{color:"#ffd700",opacity:0.8}}},strings:{value:{closeMessage:"Close",connectMessage:"Connect",description:"Description",editMessage:"Edit",name:"Name",type:"Type"}},tabIndex:{value:1},transitions:{value:null,writeOnce:true,setter:"_setTransitions"},type:{value:s,validator:a5},width:{value:60},zIndex:{value:100}},EXTENDS:aC.Overlay,CIRCLE_POINTS:[[35,20],[28,33],[14,34],[5,22],[10,9],[24,6],[34,16],[31,30],[18,35],[6,26],[7,12],[20,5],[33,12],[34,26],[22,35],[9,30],[6,16],[16,6],[30,9],[35,22],[26,34],[12,33],[5,20],[12,7],[26,6],[35,18],[30,31],[16,34],[6,24],[9,10],[22,5],[34,14],[33,28],[20,35],[7,28],[6,14],[18,5],[31,10],[34,24],[24,34],[10,31],[5,18],[14,6],[28,8],[35,20],[28,33],[14,34],[5,22],[10,8],[25,6],[34,16],[31,30],[18,35],[6,26],[8,12],[20,5],[33,12],[33,27],[22,35],[8,30],[6,15],[16,6],[30,9],[35,23],[26,34],[12,32],[5,20],[12,7],[27,7],[35,18],[29,32],[15,34]],DIAMOND_POINTS:[[30,5],[35,10],[40,15],[45,20],[50,25],[55,30],[50,35],[45,40],[40,45],[35,50],[30,55],[25,50],[20,45],[15,40],[10,35],[5,30],[10,25],[15,20],[20,15],[25,10]],SQUARE_POINTS:[[5,5],[10,5],[15,5],[20,5],[25,5],[30,5],[35,5],[40,5],[50,5],[55,5],[60,5],[65,5],[65,10],[65,15],[65,20],[65,25],[65,30],[65,35],[65,40],[65,45],[65,50],[65,55],[65,60],[65,65],[60,65],[55,65],[50,65],[45,65],[40,65],[35,65],[30,65],[25,65],[20,65],[15,65],[10,65],[5,65],[5,60],[5,55],[5,50],[5,45],[5,40],[5,35],[5,30],[5,25],[5,20],[5,15],[5,10]],getNodeByName:function(A){return aC.Widget.getByNode(h+aC.DiagramNode.buildNodeId(A));
},buildNodeId:function(A){return aG+N+a0+N+A.replace(/[^a-z0-9.:_\-]/ig,"_");},prototype:{LABEL_TEMPLATE:'<div class="'+ad+'">{label}</div>',boundary:null,hotPoints:[[0,0]],CONTROLS_TEMPLATE:'<div class="'+x+'"></div>',SERIALIZABLE_ATTRS:[aU,q,Q,g,V,aZ,D,E],initializer:function(){var A=this;A.after({"dataset:remove":aC.bind(A._afterDataSetRemove,A),render:A._afterRender});A.on({nameChange:A._onNameChange});A.publish({connectDrop:{defaultFn:A.connectDrop},connectEnd:{defaultFn:A.connectEnd},connectMove:{defaultFn:A.connectMove},connectOutTarget:{defaultFn:A.connectOutTarget},connectOverTarget:{defaultFn:A.connectOverTarget},connectStart:{defaultFn:A.connectStart},boundaryMouseEnter:{},boundaryMouseLeave:{}});A.get(t).addClass(aq+be+A.get(g));},destructor:function(){var A=this;A.eachConnector(function(bh,bi,bj){bj.removeTransition(bh.get(p));});A.invite.destroy();A.get(al).destroy();A.get(bb).removeField(A);},addTransition:function(bi){var A=this;var bh=A.get(ab);bi=A.prepareTransition(bi);if(!bh.containsKey(bi.uid)){bi.uid=aC.guid();bh.add(bi.uid,bi);}return bi;},alignTransition:function(bi){var A=this;var bj=aC.DiagramNode.getNodeByName(bi.target);if(bj){var bh=ak(A,bj);bi=aC.merge(bi,{sourceXY:bh[0],targetXY:bh[1]});A.getConnector(bi).setAttrs({p1:av(A,bi.sourceXY),p2:av(bj,bi.targetXY)});}},alignTransitions:function(){var A=this;A.get(ab).each(aC.bind(A.alignTransition,A));},close:function(){var A=this;return A.destroy();},connect:function(bl,bj){var A=this;bl=A.addTransition(bl);var bh=null;var bm=aC.DiagramNode.getNodeByName(bl.target);if(bm){if(!A.isTransitionConnected(bl)){var bi=A.get(bb);var bk=ak(A,bm);aC.mix(bl,{sourceXY:bk[0],targetXY:bk[1]});bh=new aC.Connector(aC.merge({builder:bi,graphic:bi.get(al),transition:bl},bj));A.get(m).add(bl.uid,bh);}}A.alignTransition(bl);return bh;},connectDrop:function(bh){var A=this;A.connectNode(bh.publishedTarget);},connectEnd:function(bk){var A=this;var bj=bk.target;var bh=A.get(bb);var bi=bh.publishedSource;if(!bh.isAbleToConnect()&&bh.get(P)&&bh.connector.get(at)){bh.showSuggestConnetorOverlay();}else{bh.connector.hide();bi.invite.set(at,false);}if(bh.get(S)){bh.get(u).each(function(bl){bl.set(c,false);});}},connectMove:function(bj){var A=this;var bi=A.get(bb);var bk=bj.mouseXY;A._constrainMouseXY(bk,A._canvasRegion);bi.connector.set(aH,bk);if(bi.publishedTarget){var bh=A.invite;var bl=bh.get(aN)||0;if(!bh.get(at)){bh.set(at,true);}bh.setXY([bk[0]-bl,bk[1]-bl]);}},connectNode:function(bi){var bh=this;var A=bh.boundaryDragDelegate.dd;bh.connect(bh.prepareTransition({sourceXY:aF(A.startXY,bh.get(t)),target:bi.get(q),targetXY:aF(A.mouseXY,bi.get(t))}));},connectOutTarget:function(bi){var A=this;var bh=A.get(bb);bh.publishedTarget=null;bh.publishedSource.invite.set(at,false);},connectOverTarget:function(bi){var A=this;var bh=A.get(bb);if(bh.publishedSource!==A){bh.publishedTarget=A;}},connectStart:function(bj){var A=this;var bh=A.get(bb);var bi=bh.get(ay);A._canvasRegion=bi.get(k);bh.connector.show().set(aJ,bj.startXY);if(bh.get(S)){bh.get(u).each(function(bk){bk.set(c,true);});}aC.DiagramNodeManager.fire("publishedSource",{publishedSource:A});},disconnect:function(bh){var A=this;if(A.isTransitionConnected(bh)){A.removeTransition(bh);}},eachConnector:function(bj){var A=this;var bk=[],bh=[].concat(A.get(m).values),bi=bh.length;bf.each(A.get(bb).getSourceNodes(A),function(bl){bl.get(m).each(function(bm){if(A.get(q)===bm.get(p).target){bk.push(bl);bh.push(bm);}});});bf.each(bh,function(bl,bm){bj.call(A,bl,bm,(bm<bi)?A:bk[bm-bi]);});bh=bk=null;return bh;},getConnector:function(bh){var A=this;return A.get(m).item(bh.uid);},getContainer:function(){var A=this;return(A.get(bb).dropContainer||A.get(t).get(f));},getLeftTop:function(){var A=this;return aF(A.get(t),A.getContainer());},getProperties:function(){var A=this;var bh=A.getPropertyModel();bf.each(bh,function(bk){var bj=A.get(bk.attributeName),bi=ar.type(bj);if(bi===an){bj=String(bj);}bk.value=bj;});return bh;},getPropertyModel:function(){var bh=this;var A=bh.getStrings();return[{attributeName:aU,editor:new aC.TextAreaCellEditor(),name:A[aU]},{attributeName:q,editor:new aC.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[q]},{attributeName:g,editor:false,name:A[g]}];},isBoundaryDrag:function(bh){var A=this;return(bh===A.boundaryDragDelegate.dd);},isTransitionConnected:function(bh){var A=this;return A.get(m).containsKey(bh.uid);},prepareTransition:function(bi){var A=this;var bh={source:A.get(q),target:null,uid:aC.guid()};if(a5(bi)){bh.target=bi;}else{if(O(bi)){bh=aC.merge(bh,bi);}}return bh;},removeTransition:function(bh){var A=this;return A.get(ab).removeKey(bh.uid);},renderShapeBoundary:function(){var A=this;var bh=A.boundary=A.get(al).addShape(A.get(ag));return bh;},renderShapeInvite:function(){var A=this;var bh=A.invite=A.get(bb).get(al).addShape(A.get(j));bh.set(at,false);return bh;},syncConnectionsUI:function(){var A=this;A.get(ab).each(function(bh){A.connect(bh,bh.connector);});},_afterDataSetRemove:function(bi){var A=this;var bh=bi.target;if(bh===A.get(ab)){A.get(m).removeKey(bi.prevVal.uid);}else{if(bh===A.get(m)){bi.prevVal.destroy();}}},_afterRender:function(bh){var A=this;A.setStdModContent(ax.BODY,aa,ax.AFTER);A._renderGraphic();A._renderControls();A._renderLabel();A._uiSetHighlighted(A.get(c));},_bindBoundaryEvents:function(){var A=this;A.boundary.detachAll().on({mouseenter:aC.bind(A._onBoundaryMouseEnter,A),mouseleave:aC.bind(A._onBoundaryMouseLeave,A)});},_constrainMouseXY:function(bh,bi){var A=this;if(bh[0]<=bi.left){bh[0]=bi.left;}if(bh[0]>=bi.right){bh[0]=bi.right;}if(bh[1]>=bi.bottom){bh[1]=bi.bottom;}if(bh[1]<=bi.top){bh[1]=bi.top;}},_createDataSet:function(){var A=this;return new aC.DataSet({bubbleTargets:A});},_handleCloseEvent:function(bh){var A=this;A.get(bb).deleteSelectedNode();},_handleConnectStart:function(bh){var A=this;A.fire("connectStart",{startXY:bh});},_handleConnectMove:function(bi){var A=this;var bh=A.get(bb);A.fire("connectMove",{mouseXY:bi,publishedSource:bh.publishedSource});
},_handleConnectEnd:function(){var A=this;var bh=A.get(bb);var bi=bh.publishedSource;var bj=bh.publishedTarget;if(bi&&bj){A.fire("connectDrop",{publishedSource:bi,publishedTarget:bj});}A.fire("connectEnd",{publishedSource:bi});},_handleConnectOutTarget:function(bj){var A=this;var bh=A.get(bb);var bi=bh.publishedSource;if(bi){A.fire("connectOutTarget",{publishedSource:bi});}},_handleConnectOverTarget:function(){var A=this;var bh=A.get(bb);var bi=bh.publishedSource;if(bi){A.fire("connectOverTarget",{publishedSource:bi});}},_handleEditEvent:function(bh){var A=this;A.get(bb).editNode(A);},_onBoundaryDrag:function(bh){var A=this;A._handleConnectMove(A.boundaryDragDelegate.dd.mouseXY);},_onBoundaryDragEnd:function(bh){var A=this;A._handleConnectEnd();bh.target.get(aY).show();},_onBoundaryDragStart:function(bh){var A=this;A._handleConnectStart(A.boundaryDragDelegate.dd.startXY);bh.target.get(aY).hide();},_onBoundaryMouseEnter:function(bh){var A=this;A.fire("boundaryMouseEnter",{domEvent:bh});A._handleConnectOverTarget();},_onBoundaryMouseLeave:function(bh){var A=this;A.fire("boundaryMouseLeave",{domEvent:bh});A._handleConnectOutTarget();},_onNameChange:function(bh){var A=this;A.eachConnector(function(bi,bj,bk){var bl=bi.get(p);bl[(A===bk)?Y:l]=bh.newVal;bi.set(p,bl);});},_renderControls:function(){var A=this;var bh=A.get(t);A.controlsNode=aC.Node.create(A.CONTROLS_TEMPLATE).appendTo(bh);},_renderControlsToolbar:function(bh){var A=this;A.controlsToolbar=new aC.Toolbar(A.get(aO)).render(A.controlsNode);A._uiSetRequired(A.get(Q));},_renderGraphic:function(){var A=this;A.set(al,new aC.Graphic({height:A.get(aZ),render:A.bodyNode,width:A.get(V)}));A.renderShapeInvite();A.renderShapeBoundary().addClass(aV);A._bindBoundaryEvents();A._setupBoundaryDrag();},_renderLabel:function(){var A=this;A.labelNode=aC.Node.create(ar.sub(A.LABEL_TEMPLATE,{label:A.get("name")}));A.get("contentBox").placeAfter(A.labelNode);},_setTransitions:function(bi){var A=this;if(!a7(bi)){var bh=A._createDataSet();aC.Array.each(bi,function(bk){var bj=aC.guid();bk=O(bk)?aC.mix(bk,{uid:bj}):{uid:bj,target:bk};bh.add(bj,A.prepareTransition(bk));});bi=bh;}return bi;},_setupBoundaryDrag:function(){var A=this;var bh=A.get(bb);A.boundaryDragDelegate=new aC.DD.Delegate({bubbleTargets:A,container:A.bodyNode,nodes:i+aV,dragConfig:{useShim:false,plugins:[{cfg:{constrain:(bh?bh.get(ay):null)},fn:aC.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:aC.Plugin.DDWinScroll},{cfg:{borderStyle:"0px",moveOnEnd:false,resizeFrame:false},fn:aC.Plugin.DDProxy}]},on:{"drag:drag":aC.bind(A._onBoundaryDrag,A),"drag:end":aC.bind(A._onBoundaryDragEnd,A),"drag:start":aC.bind(A._onBoundaryDragStart,A)}});aC.Do.after(A._bindBoundaryEvents,A.boundaryDragDelegate.dd,"_unprep",A);},_uiSetHighlighted:function(bi){var A=this;if(A.get(bc)){var bh=bi?A.get(aI):A.get(ag+i+y);if(bh){A.boundary.set(y,bh);}}},_uiSetName:function(bi){var A=this;var bh=A.get(t);bh.set(aQ,aC.DiagramNode.buildNodeId(bi));if(A.get("rendered")){A.labelNode.setContent(bi);}},_uiSetRequired:function(bj){var bi=this;var bh=bi.getStrings();var A=bi.controlsToolbar;if(A){if(bj){A.remove(a6);}else{A.add({handler:aC.bind(bi._handleCloseEvent,bi),icon:aw,id:a6,title:bh[L]});}}},_uiSetSelected:function(bh){var A=this;A.get(t).toggleClass(bd,bh);if(bh&&!A.controlsToolbar){A._renderControlsToolbar();}},_uiSetXY:function(bi){var A=this;var bh=A.getContainer().getXY();this._posNode.setXY([bi[0]+bh[0],bi[1]+bh[1]]);},_valueControlsToolbar:function(bi){var bh=this;var A=bh.getStrings();return{activeState:false,children:[{handler:aC.bind(bh._handleEditEvent,bh),icon:o,id:I,title:A[R]},{handler:aC.bind(bh._handleCloseEvent,bh),icon:aw,id:a6,title:A[L]}]};},_valueShapeBoundary:function(){var A=this;return{height:41,type:"rect",stroke:{weight:7,color:"transparent",opacity:0},width:41};}}});aC.DiagramNode=bg;aC.DiagramBuilder.types[s]=aC.DiagramNode;aC.DiagramNodeState=aC.Component.create({NAME:H,ATTRS:{height:{value:40},type:{value:am},width:{value:40}},EXTENDS:aC.DiagramNode,prototype:{hotPoints:aC.DiagramNode.CIRCLE_POINTS,renderShapeBoundary:function(){var A=this;var bh=A.boundary=A.get(al).addShape(A.get(ag));bh.translate(5,5);return bh;},_valueShapeBoundary:function(){var A=this;return{radius:15,type:"circle",stroke:{weight:7,color:"transparent",opacity:0}};}}});aC.DiagramBuilder.types[am]=aC.DiagramNodeState;aC.DiagramNodeCondition=aC.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:a8},width:{value:60}},EXTENDS:aC.DiagramNodeState,prototype:{hotPoints:aC.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:function(){var A=this;var bh=A.boundary=A.get(al).addShape(A.get(ag));bh.translate(10,10);bh.rotate(45);return bh;},_valueShapeBoundary:aC.DiagramNode.prototype._valueShapeBoundary}});aC.DiagramBuilder.types[a8]=aC.DiagramNodeCondition;aC.DiagramNodeStart=aC.Component.create({NAME:H,ATTRS:{type:{value:aL}},EXTENDS:aC.DiagramNodeState});aC.DiagramBuilder.types[aL]=aC.DiagramNodeStart;aC.DiagramNodeEnd=aC.Component.create({NAME:H,ATTRS:{type:{value:aT}},EXTENDS:aC.DiagramNodeState});aC.DiagramBuilder.types[aT]=aC.DiagramNodeEnd;aC.DiagramNodeJoin=aC.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:w},width:{value:60}},EXTENDS:aC.DiagramNodeState,prototype:{hotPoints:aC.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:aC.DiagramNodeCondition.prototype.renderShapeBoundary,_valueShapeBoundary:aC.DiagramNode.prototype._valueShapeBoundary}});aC.DiagramBuilder.types[w]=aC.DiagramNodeJoin;aC.DiagramNodeFork=aC.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:aB},width:{value:60}},EXTENDS:aC.DiagramNodeState,prototype:{hotPoints:aC.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:aC.DiagramNodeCondition.prototype.renderShapeBoundary,_valueShapeBoundary:aC.DiagramNode.prototype._valueShapeBoundary}});aC.DiagramBuilder.types[aB]=aC.DiagramNodeFork;aC.DiagramNodeTask=aC.Component.create({NAME:H,ATTRS:{height:{value:70},type:{value:K},width:{value:70}},EXTENDS:aC.DiagramNodeState,prototype:{hotPoints:aC.DiagramNode.SQUARE_POINTS,renderShapeBoundary:function(){var A=this;
var bh=A.boundary=A.get(al).addShape(A.get(ag));bh.translate(8,8);return bh;},_valueShapeBoundary:function(){var A=this;return{height:55,type:"rect",stroke:{weight:7,color:"transparent",opacity:0},width:55};}}});aC.DiagramBuilder.types[K]=aC.DiagramNodeTask;},"@VERSION@",{requires:["aui-data-set","aui-diagram-builder-base","aui-diagram-builder-connector","overlay"],skinnable:true});