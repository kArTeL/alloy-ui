AUI.add("aui-carousel",function(j){var O=j.Lang,r="activeIndex",C="animationTime",y="contentBox",p=".",s="duration",n="intervalTime",f="itemSelector",M="node",q="nodeMenu",G="nodeMenuItemSelector",l="opacity",v="playing",w=" ",b="carousel",e=j.getClassName,g=e(b,"item"),i=e(b,"item","active"),L=e(b,"item","transition"),m=e(b,"menu","active"),D=e(b,"menu","index"),J=e(b,"menu","item"),k=e(b,"menu","next"),I=e(b,"menu","play"),d=e(b,"menu","pause"),K=e(b,"menu","prev"),H=[J,D].join(w),N=[J,D,m].join(w),E=75,B=0.5,c=p+D,x=p+k,t=p+d,P=p+I,o=[P,t].join(),a=p+K,h=new j.Template("<menu>",'<li><a class="',J," ",I,'"></a></li>','<li><a class="',J," ",K,'"></a></li>','<tpl for="items">','<li><a class="',J,' {[ $i == parent.activeIndex ? "',N,'" : "',H,'" ]}">{$index}</a></li>',"</tpl>",'<li><a class="',J," ",k,'"></a></li>',"</menu>"),F=j.Widget.UI_SRC,u={src:F};var z=j.Component.create({NAME:b,ATTRS:{activeIndex:{value:0,setter:"_setActiveIndex"},animationTime:{value:0.5},flick:{validator:O.isObject,value:{}},intervalTime:{value:0.75},itemSelector:{value:">*"},nodeMenu:{value:null,setter:"_setNodeMenu"},nodeMenuItemSelector:{value:p+J},playing:{value:true}},prototype:{animation:null,nodeSelection:null,nodeMenu:null,initializer:function(){var A=this;A.animation=new j.Anim({duration:A.get(C),to:{opacity:1}});},renderUI:function(){var A=this;A._updateNodeSelection();A.nodeMenu=A.get(q);A._updateMenuNodes();},bindUI:function(){var A=this;A.after({activeIndexChange:A._afterActiveIndexChange,animationTimeChange:A._afterAnimationTimeChange,itemSelectorChange:A._afterItemSelectorChange,intervalTimeChange:A._afterIntervalTimeChange,nodeMenuItemSelector:A._afterNodeMenuItemSelectorChange,playingChange:A._afterPlayingChange});A._bindMenu();A._bindItemGestures();if(A.get(v)===true){A._afterPlayingChange({prevVal:false,newVal:true});}},syncUI:function(){var A=this;A._uiSetActiveIndex(A.get(r));},item:function(Q){var A=this;A.set(r,Q);},next:function(){var A=this;A._updateIndexNext();},pause:function(){var A=this;A.set(v,false);},play:function(){var A=this;A.set(v,true);},prev:function(){var A=this;A._updateIndexPrev();},_afterActiveIndexChange:function(Q){var A=this;A._uiSetActiveIndex(Q.newVal,{prevVal:Q.prevVal,animate:A.get(v),src:Q.src});},_afterAnimationTimeChange:function(Q){var A=this;A.animation.set(s,Q.newVal);},_afterItemSelectorChange:function(Q){var A=this;A._updateNodeSelection();},_afterNodeMenuItemSelectorChange:function(Q){var A=this;A.nodeMenuItemSelector=Q.newVal;A._updateMenuNodes();},_afterIntervalTimeChange:function(Q){var A=this;A._clearIntervalRotationTask();A._createIntervalRotationTask();},_afterPlayingChange:function(S){var A=this;var V=A.nodeMenu.one(o);var R=S.newVal;var U=d;var Q=I;var T="_clearIntervalRotationTask";if(R){U=I;Q=d;T="_createIntervalRotationTask";}A[T]();if(V){V.replaceClass(U,Q);}},_bindMenu:function(){var A=this;var Q=A.nodeMenu;var R=A.get(G);Q.delegate("click",A._onClickDelegate,R,A);A.nodeMenuItemSelector=R;},_bindItemGestures:function(){var A=this;var Q=A.get(y);var S=Q.all(p+g);var R=j.mix(A.get("flick")||{},{minDistance:E,minVelocity:B});S.on("flick",A._onFlickHandler,R,A);},_clearIntervalRotationTask:function(){var A=this;clearInterval(A._intervalRotationTask);},_createIndexRandom:function(){var Q=this;var A=Math.random()*Q.nodeSelection.size();return Math.ceil(A)-1;},_createIntervalRotationTask:function(){var A=this;A._clearIntervalRotationTask();A._intervalRotationTask=setInterval(function(){A._updateIndexNext({animate:true});},A.get(n)*1000);},_onAnimationEnd:function(S,T,R,Q,U){var A=this;if(R){R.removeClass(L);}T.setStyle(l,1);},_onAnimationStart:function(S,T,R,Q,U){var A=this;T.addClass(i);if(Q){Q.addClass(m);}if(R){R.replaceClass(i,L);}if(U){U.removeClass(m);}},_onClickDelegate:function(R){var A=this;var Q;var S=R.currentTarget;R.preventDefault();if(S.hasClass(D)){Q=A._onMenuItemClick;}else{if(S.hasClass(K)){Q=A._updateIndexPrev;}else{if(S.hasClass(k)){Q=A._updateIndexNext;}else{if(S.test(o)){Q=A._onMenuPlayClick;}}}}if(Q){Q.apply(A,arguments);}},_onFlickHandler:function(R){var A=this;if(R.flick.axis=="x"){var Q;var S=R.flick.distance;if(S<0){Q=A._updateIndexNext;}else{if(S>0){Q=A._updateIndexPrev;}}if(Q){Q.apply(A,arguments);}}},_onMenuItemClick:function(R){var A=this;R.preventDefault();var Q=A.menuNodes.indexOf(R.currentTarget);A.set(r,Q,u);},_onMenuPlayClick:function(Q){var A=this;this.set(v,!this.get(v));},_renderMenu:function(){var A=this;var Q=h.render({activeIndex:A.get(r),items:A.nodeSelection.getDOM()});A.get(y).appendChild(Q);return Q;},_setActiveIndex:function(R){var Q=this;if(R=="rand"){R=Q._createIndexRandom();}else{var A=Math.min(R,Q.nodeSelection.size());R=Math.max(A,-1);}return R;},_setNodeMenu:function(Q){var A=this;return j.one(Q)||A._renderMenu();},_uiSetActiveIndex:function(S,X){var Z=this;var W=null;var U=null;var aa=null;var A=null;var Y=Z.nodeSelection.item(S);var V=Z.menuNodes;var Q=V.item(S);Z.animation.set(M,Y);Y.addClass(i);Y.setStyle(l,1);if(X&&!O.isUndefined(X.prevVal)){var T=X.prevVal;U=V.item(T);W=Z.nodeSelection.item(T);W.replaceClass(i,L);W.setStyle(l,0);Z.animation.stop();}aa=Z.animation.on("start",function(ab){Z._onAnimationStart(ab,Y,W,Q,U);aa.detach();});A=Z.animation.on("end",function(ab){Z._onAnimationEnd(ab,Y,W,Q,U);A.detach();});if(X){var R=X.animate;if(R){Z.animation.run();}else{Z.animation.fire("start");Z.animation.fire("end");}if(X.src==F&&R){Z._createIntervalRotationTask();}}},_updateIndexNext:function(Q){var A=this;var S=A.nodeSelection.size()-1;var R=A.get(r)+1;if(R>(S)){R=0;}if(Q){Q.src=F;}A.set(r,R,Q);},_updateIndexPrev:function(Q){var A=this;var R=A.get(r)-1;if(R<0){R=A.nodeSelection.size()-1;}if(Q){Q.src=F;}A.set(r,R,Q);},_updateMenuNodes:function(){var A=this;A.menuNodes=A.nodeMenu.all(c);},_updateNodeSelection:function(){var A=this;var Q=A.get(f);var R=A.get(y).all(Q);R.addClass(g);A.nodeSelection=R;},_intervalRotationTask:null}});j.Carousel=z;},"@VERSION@",{requires:["aui-base","aui-template","anim"],skinnable:true});
