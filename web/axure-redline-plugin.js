"use strict";function jQueryWait(){"undefined"==typeof jQuery?setTimeout(function(){jQueryWait()},50):parseInt(jQuery.fn.jquery)!=jqueryMajorVersion?setTimeout(function(){jQueryWait()},50):onLoadFunction()}function onLoadFunction(){checkToolPermitted(),"complete"!==document.readyState?setTimeout(function(){onLoadFunction()},50):(checkState(),initTool(),buildCSSAttributesList(),documentClone=$("body").clone(!0),enableRedline(),setZoom())}function checkToolPermitted(){var e=window.parent.location.href,t="",o="";/redline=business/.test(e)?toolPermitted=!1:(t=e.replace(/\.com(\/)?/,".com?redline=dev"),o=e.replace(/\.com(\/)?/,".com?redline=business"),$(".business-url").val(o),$(".dev-url").val(t))}function checkState(){var e=getCookie("axure-tool-enabled"),t=getCookie("axure-tool-zoom");""!=e&&1==e?enableTool=!0:""!=e&&0==e?enableTool=!1:setCookie("axure-tool-enabled","1",1),""!=t&&(documentZoom=parseFloat(t),previousZoom=100)}function initTool(){var e,t,o,s=0,l=0,r=0,a=0,n=0,i=0,d=0,m=0,c=!1,f=!1;labelInternalElements(),$(".redline-layer").hide(),$(".redline-tool-wrapper").show(),$("#top-control-panel").show(),$("#top-control-panel *").show(),$("#redline-panel").show(),$("#redline-panel *").show(),$("#base").wrap('<div class="zoom-wrapper"></div>'),$("#base").addClass("redline-layer"),$(".zoom-wrapper").addClass("redline-layer"),$("#base *").not("script, style").each(function(){e=$(this),void 0===t&&void 0===o&&(t=e,o=e),s=e.outerWidth(),l=e.outerHeight(),d=e[0].scrollWidth,m=e[0].scrollHeight,r=e.offset().top,a=e.offset().left,$.contains(t[0],e[0])||(c=!1),$.contains(o[0],e[0])||(f=!1),c?e.width()>n&&e.addClass("redline-layer"):n=n<a+s?a+s:n,d>s&&!c&&s>0&&(c=!0,t=e),f?e.height()>i&&e.addClass("redline-layer"):i=i<r+l?r+l:i,m>l&&!f&&l>0&&(f=!0,o=e)}),$(".zoom-wrapper").attr("style","width:"+(n+2*zoomWrapperPadding)+"px !important;height:"+(i+2*zoomWrapperPadding)+"px !important;"),$("#base").attr("style","width: "+n+"px !important; height: "+i+"px !important;"),("transparent"==$("#base").css("background-color")||$("#base").css("background-color").search(/rgba\(\d+,\s\d+,\s\d+,\s0\)/)>=0)&&$("#base").css("background-color","#FFFFFF"),$(document).scrollTop(zoomWrapperPadding-($(window).innerHeight()-i)/2),$(document).scrollLeft(zoomWrapperPadding-($(window).innerWidth()-n)/2)}function bindListeners(){$("#top-control-panel").on("change",".switch",function(){enableTool=$(".toggle-switch").prop("checked"),enableRedline()}),$("body").on("mouseover","*",function(e){e.stopImmediatePropagation(),elementHover($(this))}),$("body").on("click","*",function(e){e.stopPropagation(),$(this).hasClass("zoom-wrapper")||"base"==$(this).attr("id")?closeRedline():elementClick($(this))}),$("#base *").on("scroll",function(){closeRedline()}),$("#redline-panel").on("click","#menu-tab-column > div",function(e){e.stopImmediatePropagation(),$("#redline-panel").toggleClass("redline-panel-exposed")}),$(document).on("keydown",function(e){switch(e.keyCode){case 27:closeRedline();break;case 187:e.ctrlKey&&(e.preventDefault(),documentZoom+=10,setZoom());break;case 189:e.ctrlKey&&(e.preventDefault(),documentZoom-=10,setZoom())}}),$("#redline-panel-menu-column").on("mouseup","input, textarea",function(){$(this).select()}),$("#top-control-panel").on("click",".zoom-control-button",function(){clearRedline(),getZoom(),"+"==$(this).children().text()?documentZoom+=10:documentZoom-=10,setZoom()}),$("#top-control-panel").on("focus","#zoom-value",function(){$(this).select()}),$("#redline-panel").on("click",".color-swatch",function(){var e=$(this).data("swatch").split("-"),t=e[0]+"-attributes",o="input";e.shift(),e.forEach(function(e){o+="-"+e}),$("."+t+" #"+o).val(cycleColorFormat($("."+t+" #"+o).val()))}),$("#top-control-panel").on("blur keypress","#zoom-value",function(e){13==e.keyCode?($(this).blur(),getZoom(),setZoom()):void 0===e.keyCode&&(getZoom(),setZoom())}),$(document).on("dialogopen","*",function(e){var t,o;e.stopImmediatePropagation(),(t=$(this)).parent().find(".ui-button").html('<span class="ui-icon ui-icon-closethick">close</span>'),o=documentZoom,documentZoom=100,setZoom(),t.parent().offset({top:elementPosition.top+5,left:elementPosition.left}),documentZoom=o,setZoom(),preventDialogInteraction()}),$("body .annotation").on("mousedown","*",function(e){var t,o;e.stopPropagation(),o=documentZoom,documentZoom=100,setZoom(),$(this).hasClass("annnoteimage")?t=$(this):$(this).hasClass("annnoteline")&&(t=$(this).parent().parent().find(".annnoteimage")),(elementPosition=t.offset()).top+=t.height(),documentZoom=o,setZoom();try{$(this).trigger("click")}catch(e){$(this).trigger("click")}$(this).trigger("click"),$(".ui-dialog").hide()}),$("#redline-panel").on("click",".pseudo-tabs .tab",function(){$(".active-tab").removeClass("active-tab"),$(this).addClass("active-tab"),$(".active-attributes").removeClass("active-attributes"),$(".pseudo-wrapper."+$(this).text()+"-attributes").addClass("active-attributes")})}function labelInternalElements(){$(".redline-tool-wrapper *").addClass("redline-layer"),$(".annotation, .annotation *").addClass("no-interact"),preventDialogInteraction()}function preventDialogInteraction(){$(".ui-dialog, .ui-dialog *").addClass("no-interact")}function buildCSSAttributesList(){var e=document.styleSheets,t=void 0,o=void 0,s=void 0,l=void 0,r=void 0;documentCSSList={};for(var a in e)try{for(var n in e[a].cssRules){l=!1;for(var i in pseudoClasses)try{!l&&RegExp(pseudoClasses[i].axureName).test(e[a].cssRules[n].selectorText)&&(l=!0,pseudoClasses[i].axureName.length?(s=new RegExp("\\."+pseudoClasses[i].axureName),t=e[a].cssRules[n].selectorText.replace(s,"").trim()):t=e[a].cssRules[n].selectorText.trim(),o=e[a].cssRules[n].cssText.replace(/^.*{/,"").replace("}","").trim(),t in documentCSSList||(documentCSSList[t]={}),r={},o.split(";").forEach(function(e){e.length&&(r[e.split(":")[0].trim()]=e.split(":")[1].trim())}),documentCSSList[t][pseudoClasses[i].keyName]=r)}catch(e){}}}catch(e){}console.log(documentCSSList)}function enableRedline(){enableTool?(setZoom(),$(".ui-dialog").remove(),$("*").not(".annotation, .annotation *").off(),bindListeners(),setTimeout(function(){$(".zoom-wrapper *").not("script, style, .annotation *").css("cursor","pointer")},0),$(".toggle-switch").prop("checked",!0),setCookie("axure-tool-enabled","1",1)):(setCookie("axure-tool-enabled","0",1),setTimeout(function(){$("html body").remove(),$("html").append(documentClone.clone(!0)),$(".toggle-switch").prop("checked",!1),bindListeners(),closeRedline(),setZoom()},250))}function elementHover(e){enableTool&&(isRedlineElement(hoveredElement=e)&&"base"!=hoveredElement.attr("id")?hoveredElement.hasClass("flicker-prevent")||clearRedline():(clearRedline(),setMeasurements(),highlightHoverElement(),hoveredElement[0]==selectedElement[0]?highlightSelectElement():""!=selectedElement&&(measureInterElementDistance(),drawInterElementMarkers())))}function elementClick(e){enableTool&&(isRedlineElement(e)||(selectedElement=e,clearRedline(),setMeasurements(),highlightSelectElement(),updateRedlinePanel(selectedElement)))}function isRedlineElement(e){return!(!e.hasClass("redline-layer")&&!e.hasClass("no-interact"))}function highlightHoverElement(){elemMeas.width=hoveredElement.outerWidth()*(documentZoom/100),elemMeas.height=hoveredElement.outerHeight()*(documentZoom/100),elemMeas.offsetTop=hoveredElement.offset().top,elemMeas.offsetLeft=hoveredElement.offset().left,$(".hover-layer").show(),$(".hover-o-layer").show(),$("#t-hover").width(elemMeas.width+borderThickness),$("#b-hover").width(elemMeas.width),$("#r-hover").height(elemMeas.height),$("#l-hover").height(elemMeas.height),$("#t-hover").offset({top:elemMeas.offsetTop-borderThickness,left:elemMeas.offsetLeft-borderThickness}),$("#b-hover").offset({top:elemMeas.offsetTop+elemMeas.height,left:elemMeas.offsetLeft-borderThickness}),$("#r-hover").offset({top:elemMeas.offsetTop,left:elemMeas.offsetLeft+elemMeas.width}),$("#l-hover").offset({top:elemMeas.offsetTop,left:elemMeas.offsetLeft-borderThickness}),$("#to-hover").width(($("#base").innerWidth()-2*borderThickness)*(documentZoom/100)),$("#bo-hover").width(($("#base").innerWidth()-2*borderThickness)*(documentZoom/100)),$("#ro-hover").height(($("#base").innerHeight()-2*borderThickness)*(documentZoom/100)),$("#lo-hover").height(($("#base").innerHeight()-2*borderThickness)*(documentZoom/100)),$("#to-hover").offset({top:elemMeas.offsetTop-borderThickness,left:$("#base").offset().left}),$("#bo-hover").offset({top:elemMeas.offsetTop+elemMeas.height,left:$("#base").offset().left}),$("#ro-hover").offset({top:$("#base").offset().top,left:elemMeas.offsetLeft+elemMeas.width}),$("#lo-hover").offset({top:$("#base").offset().top,left:elemMeas.offsetLeft-borderThickness})}function highlightSelectElement(){elemSelectMeas.width=selectedElement.outerWidth()*(documentZoom/100),elemSelectMeas.height=selectedElement.outerHeight()*(documentZoom/100),elemSelectMeas.offsetTop=selectedElement.offset().top,elemSelectMeas.offsetLeft=selectedElement.offset().left,$(".select-layer").show(),$("#t-select").width(elemSelectMeas.width+borderThickness),$("#b-select").width(elemSelectMeas.width),$("#r-select").height(elemSelectMeas.height),$("#l-select").height(elemSelectMeas.height),$("#t-select").offset({top:elemSelectMeas.offsetTop-borderThickness,left:elemSelectMeas.offsetLeft-borderThickness}),$("#b-select").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height,left:elemSelectMeas.offsetLeft-borderThickness}),$("#r-select").offset({top:elemSelectMeas.offsetTop,left:elemSelectMeas.offsetLeft+elemSelectMeas.width}),$("#l-select").offset({top:elemSelectMeas.offsetTop,left:elemSelectMeas.offsetLeft-borderThickness}),$("#t-dimension").show(),$("#r-dimension").show(),$("#t-dimension > span").show(),$("#r-dimension > span").show(),dimensionMarkerWidth=$(".dimension-layer").width(),dimensionMarkerHeight=$(".dimension-layer").height(),$("#t-dimension > span").text(Math.round(selectedMeasurements.width)),$("#r-dimension > span").text(Math.round(selectedMeasurements.height)),$("#t-dimension").offset({top:elemSelectMeas.offsetTop-dimensionMarkerHeight-labelSpacing,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2-dimensionMarkerWidth/2}),$("#r-dimension").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2-dimensionMarkerHeight/2,left:elemSelectMeas.offsetLeft+elemSelectMeas.width+labelSpacing})}function measureInterElementDistance(){$.each(interElemMeas,function(e){interElemMeas[e]=0}),elemMeas.offsetTop>elemSelectMeas.offsetTop+elemSelectMeas.height?(interElemMeas.bottom=Math.abs(elemSelectMeas.offsetTop+elemSelectMeas.height-elemMeas.offsetTop),interElemMeas.trueBottom=Math.abs(selectedMeasurements.offsetTop+selectedMeasurements.height-hoveredMeasurements.offsetTop)):elemSelectMeas.offsetTop>elemMeas.offsetTop+elemMeas.height?(interElemMeas.top=Math.abs(elemMeas.offsetTop+elemMeas.height-elemSelectMeas.offsetTop),interElemMeas.trueTop=Math.abs(hoveredMeasurements.offsetTop+hoveredMeasurements.height-selectedMeasurements.offsetTop)):elemSelectMeas.offsetTop>elemMeas.offsetTop&&elemSelectMeas.offsetTop+elemSelectMeas.height>elemMeas.offsetTop+elemMeas.height?(interElemMeas.top=Math.abs(elemMeas.offsetTop-elemSelectMeas.offsetTop),interElemMeas.trueTop=Math.abs(hoveredMeasurements.offsetTop-selectedMeasurements.offsetTop)):elemSelectMeas.offsetTop<elemMeas.offsetTop&&elemSelectMeas.offsetTop+elemSelectMeas.height<elemMeas.offsetTop+elemMeas.height?(interElemMeas.bottom=Math.abs(elemMeas.offsetTop+elemMeas.height-(elemSelectMeas.offsetTop+elemSelectMeas.height)),interElemMeas.trueBottom=Math.abs(hoveredMeasurements.offsetTop+hoveredMeasurements.height-(selectedMeasurements.offsetTop+selectedMeasurements.height))):(interElemMeas.top=elemSelectMeas.offsetTop-elemMeas.offsetTop,interElemMeas.bottom=elemMeas.offsetTop+elemMeas.height-(elemSelectMeas.offsetTop+elemSelectMeas.height),interElemMeas.trueTop=selectedMeasurements.offsetTop-hoveredMeasurements.offsetTop,interElemMeas.trueBottom=hoveredMeasurements.offsetTop+hoveredMeasurements.height-(selectedMeasurements.offsetTop+selectedMeasurements.height)),elemSelectMeas.offsetLeft>elemMeas.offsetLeft+elemMeas.width?(interElemMeas.left=Math.abs(elemMeas.offsetLeft+elemMeas.width-elemSelectMeas.offsetLeft),interElemMeas.trueLeft=Math.abs(elemMeas.offsetLeft+hoveredMeasurements.width-selectedMeasurements.offsetLeft)):elemMeas.offsetLeft>elemSelectMeas.offsetLeft+elemSelectMeas.width?(interElemMeas.right=Math.abs(elemSelectMeas.offsetLeft+elemSelectMeas.width-elemMeas.offsetLeft),interElemMeas.trueRight=Math.abs(selectedMeasurements.offsetLeft+selectedMeasurements.width-hoveredMeasurements.offsetLeft)):elemSelectMeas.offsetLeft>elemMeas.offsetLeft&&elemSelectMeas.offsetLeft+elemSelectMeas.width>elemMeas.offsetLeft+elemMeas.width?(interElemMeas.left=Math.abs(elemMeas.offsetLeft-elemSelectMeas.offsetLeft),interElemMeas.trueLeft=Math.abs(hoveredMeasurements.offsetLeft-selectedMeasurements.offsetLeft)):elemSelectMeas.offsetLeft<elemMeas.offsetLeft&&elemSelectMeas.offsetLeft+elemSelectMeas.width<elemMeas.offsetLeft+elemMeas.width?(interElemMeas.right=Math.abs(elemMeas.offsetLeft+elemMeas.width-(elemSelectMeas.offsetLeft+elemSelectMeas.width)),interElemMeas.trueRight=Math.abs(hoveredMeasurements.offsetLeft+hoveredMeasurements.width-(selectedMeasurements.offsetLeft+selectedMeasurements.width))):(interElemMeas.left=elemSelectMeas.offsetLeft-elemMeas.offsetLeft,interElemMeas.right=elemMeas.offsetLeft+elemMeas.width-(elemSelectMeas.offsetLeft+elemSelectMeas.width),interElemMeas.trueLeft=selectedMeasurements.offsetLeft-hoveredMeasurements.offsetLeft,interElemMeas.trueRight=hoveredMeasurements.offsetLeft+hoveredMeasurements.width-(selectedMeasurements.offsetLeft+selectedMeasurements.width))}function drawInterElementMarkers(){dimensionMarkerWidth=$(".dimension-layer").width(),dimensionMarkerHeight=$(".dimension-layer").height(),$(".dimension-layer").hide(),0!=interElemMeas.top&&($("#t-measure").show(),$("#t-measure").height(Math.abs(interElemMeas.top)-borderThickness),interElemMeas.top>0?$("#t-measure").offset({top:elemSelectMeas.offsetTop-interElemMeas.top,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2}):$("#t-measure").offset({top:elemSelectMeas.offsetTop,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2}),$("#t-dimension").show(),$("#t-dimension > span").show(),$("#t-dimension > span").text(Math.round(Math.abs(interElemMeas.trueTop))),$("#t-dimension").offset({top:elemSelectMeas.offsetTop-interElemMeas.top/2-dimensionMarkerHeight/2,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2+labelSpacing})),0!=interElemMeas.right&&($("#r-measure").show(),$("#r-measure").width(Math.abs(interElemMeas.right)-borderThickness),interElemMeas.right>0?$("#r-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2,left:elemSelectMeas.offsetLeft+elemSelectMeas.width}):$("#r-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2,left:elemSelectMeas.offsetLeft+elemSelectMeas.width+interElemMeas.right}),$("#r-dimension").show(),$("#r-dimension > span").show(),$("#r-dimension > span").text(Math.round(Math.abs(interElemMeas.trueRight))),$("#r-dimension").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2-dimensionMarkerHeight-labelSpacing,left:elemSelectMeas.offsetLeft+elemSelectMeas.width+interElemMeas.right/2-dimensionMarkerWidth/2})),0!=interElemMeas.bottom&&($("#b-measure").show(),$("#b-measure").height(Math.abs(interElemMeas.bottom)-borderThickness),interElemMeas.bottom>0?$("#b-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2}):$("#b-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height+interElemMeas.bottom,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2}),$("#b-dimension").show(),$("#b-dimension > span").show(),$("#b-dimension > span").text(Math.round(Math.abs(interElemMeas.trueBottom))),$("#b-dimension").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height+interElemMeas.bottom/2-dimensionMarkerHeight/2,left:elemSelectMeas.offsetLeft+elemSelectMeas.width/2+labelSpacing})),0!=interElemMeas.left&&($("#l-measure").show(),$("#l-measure").width(Math.abs(interElemMeas.left)-borderThickness),interElemMeas.left>0?$("#l-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2,left:elemSelectMeas.offsetLeft-interElemMeas.left}):$("#l-measure").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2,left:elemSelectMeas.offsetLeft}),$("#l-dimension").show(),$("#l-dimension > span").show(),$("#l-dimension > span").text(Math.round(Math.abs(interElemMeas.trueLeft))),$("#l-dimension").offset({top:elemSelectMeas.offsetTop+elemSelectMeas.height/2-dimensionMarkerHeight-labelSpacing,left:elemSelectMeas.offsetLeft-interElemMeas.left/2-dimensionMarkerWidth/2}))}function updateRedlinePanel(e){if(elementCSS={},console.log(e),e[0].id.length)for(var t in pseudoClasses)pseudoClasses[t].keyName in documentCSSList["#"+e[0].id]&&(pseudoClasses[t].keyName in elementCSS||(elementCSS[pseudoClasses[t].keyName]={}),elementCSS[pseudoClasses[t].keyName]=JSON.parse(JSON.stringify(compileElementCSS(e,pseudoClasses[t]))));else elementCSS.default=JSON.parse(JSON.stringify(compileElementCSS(e,pseudoClasses.default)));console.log(elementCSS),clearRedlinePanel(),appendRedlinePanel(),$("#redline-panel").addClass("redline-panel-exposed")}function compileElementCSS(e,t){var o=JSON.parse(JSON.stringify(cssProperties)),s=void 0,l=void 0,r=void 0;return"default"===t.keyName?$.each(o,function(s){$.each(o[s],function(a){if("_content"==a)o[s][a]=e.text().trim();else{l=e.css(a).replace(/rgba\(\d+,\s\d+,\s\d+,\s0\)/,"transparent");try{r=documentCSSList["#"+e[0].id][t.keyName][a].replace(/rgba\(\d+,\s\d+,\s\d+,\s0\)/,"transparent")}catch(e){r=""}r.length?o[s][a]=r:o[s][a]=l}})}):$.each(o,function(s){$.each(o[s],function(l){if("_content"==l)o[s][l]=e.text().trim();else try{o[s][l]=documentCSSList["#"+e[0].id][t.keyName][l].replace(/rgba\(\d+,\s\d+,\s\d+,\s0\)/,"transparent")}catch(e){o[s][l]=""}})}),o.styles["border-top"]=o.styles["border-top-style"]+" "+o.styles["border-top-width"]+" "+o.styles["border-top-color"],o.styles["border-right"]=o.styles["border-right-style"]+" "+o.styles["border-right-width"]+" "+o.styles["border-right-color"],o.styles["border-bottom"]=o.styles["border-bottom-style"]+" "+o.styles["border-bottom-width"]+" "+o.styles["border-bottom-color"],o.styles["border-left"]=o.styles["border-left-style"]+" "+o.styles["border-left-width"]+" "+o.styles["border-left-color"],o.styles["border-top-style"]="",o.styles["border-right-style"]="",o.styles["border-bottom-style"]="",o.styles["border-left-style"]="",o.styles["border-top-width"]="",o.styles["border-right-width"]="",o.styles["border-bottom-width"]="",o.styles["border-left-width"]="",o.styles["border-top-color"]="",o.styles["border-right-color"]="",o.styles["border-bottom-color"]="",o.styles["border-left-color"]="",o.styles["border-style"]="",o.styles["border-width"]="",o.styles["border-color"]="",s=o.styles["border-top"],""!=s&&s==o.styles["border-right"]&&s==o.styles["border-bottom"]&&s==o.styles["border-left"]?(o.styles["border-top"]="",o.styles["border-right"]="",o.styles["border-bottom"]="",o.styles["border-left"]="",o.styles["border-style"]=selectedElement.css("border-top-style"),"none"!=o.styles["border-style"]&&(o.styles["border-width"]=selectedElement.css("border-top-width"),o.styles["border-color"]=selectedElement.css("border-top-color"),o.styles.border=o.styles["border-style"]+" "+o.styles["border-width"]+" "+o.styles["border-color"])):(o.styles["border-style"]="",o.styles["border-width"]="",o.styles["border-color"]=""),""!=(s=o.styles["border-top-left-radius"])&&s==o.styles["border-top-right-radius"]&&s==o.styles["border-bottom-right-radius"]&&s==o.styles["border-bottom-left-radius"]&&(o.styles["border-radius"]=o.styles["border-top-right-radius"],o.styles["border-top-left-radius"]="",o.styles["border-top-right-radius"]="",o.styles["border-bottom-right-radius"]="",o.styles["border-bottom-left-radius"]=""),o.text["font-family"]=o.text["font-family"].replace('"',"").split(",")[0],o}function appendRedlinePanel(){var e=void 0,t=void 0;(t=extractParentName()).length&&$("#redline-panel-menu-column").append('<div class="redline-layer component-name-wrapper"><p class="redline-layer">parent component name:</p><input class="redline-layer" value="'+t+'" readonly="readonly"></div>'),$("#redline-panel-menu-column").append('<div class="pseudo-tabs redline-layer"></div>'),$.each(elementCSS,function(t){$(".pseudo-tabs").append('<div class="'+t+" tab redline-layer"+("default"===t?" active-tab":"")+'"><span class="redline-layer">'+t+"</span></div>"),$("#redline-panel-menu-column").append('<div class="redline-layer pseudo-wrapper '+t+"-attributes "+("default"===t?"active-attributes":"")+'"></div>'),$.each(elementCSS[t],function(o){$(".pseudo-wrapper:last").append('<div class="redline-layer redline-panel-section"></div>'),$(".redline-panel-section:last").append('<b class="redline-layer"><p class="redline-layer">'+o.toUpperCase()+"</p></b>"),$.each(elementCSS[t][o],function(o,s){if(void 0!==s&&s.length>0&&s.indexOf("none")<0&&"0px"!=s&&!/initial/.test(s)){if(rgbaReg.test(s)&&"transparent"!=s){var l=void 0,r=void 0;/rgba/.test(s)?(l=Math.round(100*Number(s.match(rgbaReg)[0].match(/\d\.\d+/)[0]))/100,r=(r=s.match(rgbaReg)[0].replace(" ","").replace(/rgba\((\d+),(\d+),(\d+),(\d?\.\d+)\)/,"rgba($1, $2, $3, !*!)")).replace("!*!",l),s=s.replace(rgbaReg,r)):r=s.match(rgbaReg)[0],e='<span class="redline-layer color-swatch" data-swatch="'+t+"-"+o.replace("_","")+'" style="background-color: '+r+';"></span>'}else e="";$(".redline-panel-section:last").append('<p class="redline-layer">'+o.replace("_","")+":"+e+"</p>"),"_content"!=o?$(".redline-panel-section:last").append('<input class="redline-layer" id="input-'+o.replace("_","")+'" value="'+s+'" readonly="readonly"></input>'):($(".redline-panel-section:last").append('<textarea class="redline-layer" readonly="readonly"></textarea>'),$(".redline-panel-section textarea").text(s))}}),$(".redline-panel-section:last p").length<=1&&$(".redline-panel-section:last").remove()}),elementCSS.default.text._content.length<1&&$('p:contains("TEXT")').parent().parent().remove(),"0px"==elementCSS.default.styles["border-top-width"]&&($('p:contains("border-color")').next().remove(),$('p:contains("border-color")').remove())})}function clearRedline(){$(".hover-layer").hide(),$(".hover-o-layer").hide(),$(".dimension-layer").hide(),$(".measure-layer").hide()}function closeRedline(){clearRedline(),$(".select-layer").hide(),$("#redline-panel").removeClass("redline-panel-exposed"),selectedElement="",clearRedlinePanel()}function clearRedlinePanel(){$("#redline-panel-menu-column > *").remove()}function setCookie(e,t,o){var s=new Date;s.setTime(s.getTime()+24*o*60*60*1e3);var l="expires="+s.toUTCString();document.cookie=e+"="+t+"; "+l}function getCookie(e){for(var t=e+"=",o=document.cookie.split(";"),s=0;s<o.length;s++){for(var l=o[s];" "==l.charAt(0);)l=l.substring(1);if(0==l.indexOf(t))return l.substring(t.length,l.length)}return""}function setZoom(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=$(".zoom-wrapper #base").width(),o=$(".zoom-wrapper #base").height(),s=0===$("body").scrollTop()?$("html").scrollTop():$("body").scrollTop(),l=0===$("body").scrollLeft()?$("html").scrollLeft():$("body").scrollLeft();documentZoom=documentZoom<=0?1:documentZoom,$("#zoom-value").val(documentZoom+"%"),$(".zoom-wrapper #base").css("transform","scale("+documentZoom/100+")"),e||($(".zoom-wrapper").attr("style","width: "+(t*(documentZoom/100)+2*zoomWrapperPadding)+"px !important; height: "+(o*(documentZoom/100)+2*zoomWrapperPadding)+"px !important;"),$("html, body").scrollTop(s+(o*(documentZoom/100)-o*(previousZoom/100))/2),$("html, body").scrollLeft(l+(t*(documentZoom/100)-t*(previousZoom/100))/2),selectedElement&&highlightSelectElement()),previousZoom=documentZoom,setCookie("axure-tool-zoom",documentZoom,1)}function getZoom(){documentZoom=parseInt($("#zoom-value").val())}function cycleColorFormat(e){var t="",o=void 0,s=void 0,l="";switch(rgbaReg.test(e)?(l=e.replace(rgbaReg,"!*!"),e=e.match(rgbaReg)[0]):hexReg.test(e)&&(l=e.replace(hexReg,"!*!"),e=e.match(hexReg)[0]),!0){case/rgba/.test(e):o=e.match(/(\d\.\d+)|\d+/g),t="#";for(var r=0;r<3;r++)t+=("0"+Number(o[r]).toString(16).toUpperCase()).slice(-2);t+=" "+100*Number(o[3])+"%";break;case/%/.test(e):o=e.replace("#","").slice(0,6).match(/\w{2}/g),s=Number(e.replace(/#\w{6}\s/,"").replace("%",""))/100,t="rgba("+parseInt(o[0],16)+", "+parseInt(o[1],16)+", "+parseInt(o[2],16)+", "+s+")";break;case/rgb\(/.test(e):o=e.replace(",","").match(/\d+/g),t="#",o.forEach(function(e){t+=("0"+Number(e).toString(16).toUpperCase()).slice(-2)});break;case/#/.test(e):o=e.replace("#","").match(/\w{2}/g),t="rgb("+parseInt(o[0],16)+", "+parseInt(o[1],16)+", "+parseInt(o[2],16)+")"}return l.replace("!*!",t)}function setMeasurements(){var e=documentZoom;documentZoom=100,setZoom(!0);try{selectedMeasurements={width:selectedElement.width(),height:selectedElement.height(),offsetTop:selectedElement.offset().top,offsetLeft:selectedElement.offset().left}}catch(e){selectedMeasurements={width:0,height:0,offsetTop:0,offsetLeft:0}}try{hoveredMeasurements={width:hoveredElement.width(),height:hoveredElement.height(),offsetTop:hoveredElement.offset().top,offsetLeft:hoveredElement.offset().left}}catch(e){hoveredMeasurements={width:0,height:0,offsetTop:0,offsetLeft:0}}documentZoom=e,setZoom(!0)}function extractParentName(){for(var e="",t=!1,o=selectedElement;!t;)try{o.data("label")?(e=o.data("label").trim(),t=!0):"base"===o.attr("id")?t=!0:o=o.parent()}catch(e){t=!0}return e}var pageHTML='<div class="redline-tool-wrapper redline-layer"><div class="flicker-prevent hover-layer" id="t-hover"></div><div class="flicker-prevent hover-layer" id="r-hover"></div><div class="flicker-prevent hover-layer" id="b-hover"></div><div class="flicker-prevent hover-layer" id="l-hover"></div><div class="flicker-prevent hover-o-layer" id="to-hover"></div><div class="flicker-prevent hover-o-layer" id="ro-hover"></div><div class="flicker-prevent hover-o-layer" id="bo-hover"></div><div class="flicker-prevent hover-o-layer" id="lo-hover"></div><div class="flicker-prevent select-layer" id="t-select"></div><div class="flicker-prevent select-layer" id="r-select"></div><div class="flicker-prevent select-layer" id="b-select"></div><div class="flicker-prevent select-layer" id="l-select"></div><div class="flicker-prevent dimension-layer" id="t-dimension"><span class="flicker-prevent"></span></div><div class="flicker-prevent dimension-layer" id="r-dimension"><span class="flicker-prevent"></span></div><div class="flicker-prevent dimension-layer" id="b-dimension"><span class="flicker-prevent"></span></div><div class="flicker-prevent dimension-layer" id="l-dimension"><span class="flicker-prevent"></span></div><div class="flicker-prevent measure-layer" id="t-measure"></div><div class="flicker-prevent measure-layer" id="r-measure"></div><div class="flicker-prevent measure-layer" id="b-measure"></div><div class="flicker-prevent measure-layer" id="l-measure"></div><div id="top-control-panel"><div class="zoom-controls"><div class="zoom-control-button"><span>–</span></div><input id="zoom-value" type="text" name=""><div class="zoom-control-button"><span>+</span></div></div><div class="links-wrapper"><label>Business: <input class="business-url" value="" disabled="disabled" type="url"></label><label>Dev: <input class="dev-url" value="" disabled="disabled" type="url"></label></div><div class="redline-tool-enabler"><div>Redline Tool Enable:</div><div class="switch"><input id="toggle-enable" class="toggle-switch" type="checkbox"><label for="toggle-enable"></label></div></div></div><div id="redline-panel"><div id="menu-tab-column"><div><div><div></div><div></div><div></div></div></div></div><div id="redline-panel-menu-column"></div></div></div>',pageCSS='<style>body{overflow:scroll;width:100vw;height:100vh}body .ui-dialog{padding:0!important;border:1px solid #555!important;border-radius:3px!important}body .ui-dialog *{color:#555}body .ui-dialog-titlebar{border:none!important;background-color:#555!important}body .ui-dialog-titlebar button{border-radius:3px!important;outline:none!important}body .ui-button-icon-only .ui-icon{top:0!important;left:0!important}body .ui-corner-all{border-radius:0}body .ui-dialog-content{padding:10px!important}.zoom-wrapper{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background-color:#333;background-image:-webkit-repeating-radial-gradient(center center,rgba(0,0,0,.2),rgba(0,0,0,.2) 1px,transparent 0,transparent 100%);background-image:repeating-radial-gradient(center center,rgba(0,0,0,.2),rgba(0,0,0,.2) 1px,transparent 0,transparent 100%);background-size:10px 10px}.zoom-wrapper #base{position:relative;-webkit-transform-origin:center;transform-origin:center}.redline-tool-wrapper .redline-layer{font-family:Lato,sans-serif}.redline-tool-wrapper .redline-tool-enabler{font-size:16px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;color:#fff}.redline-tool-wrapper .redline-tool-enabler .switch{margin-left:10px}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch{position:absolute;visibility:hidden;margin-left:-9999px}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch+label{position:relative;display:block;width:60px;height:28px;padding:2px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:all .15s ease-in-out;border-radius:28px;outline:none;background-color:#ddd}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch+label:after,.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch+label:before{position:absolute;display:block;content:"";transition:all .15s ease-in-out}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch+label:before{top:2px;right:2px;bottom:2px;left:2px;border-radius:28px;background-color:#fff}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch+label:after{top:4px;bottom:4px;left:4px;width:24px;border-radius:50%;background-color:#ddd}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch:checked+label{background-color:#4edec2}.redline-tool-wrapper .redline-tool-enabler .switch .toggle-switch:checked+label:after{margin-left:32px;background-color:#4edec2}.redline-tool-wrapper #redline-panel,.redline-tool-wrapper #top-control-panel{opacity:.9}.redline-tool-wrapper #top-control-panel{position:fixed;z-index:7;top:0;left:0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;box-sizing:border-box;width:100%;height:60px;padding:0 30px;background-color:#111}.redline-tool-wrapper #top-control-panel,.redline-tool-wrapper #top-control-panel .zoom-controls{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.redline-tool-wrapper #top-control-panel .zoom-controls{width:150px}.redline-tool-wrapper #top-control-panel .zoom-controls div{font-size:22px;font-weight:700;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;box-sizing:border-box;width:25px;height:25px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#fff;border-radius:50%;background-color:#4edec2}.redline-tool-wrapper #top-control-panel .zoom-controls input{width:60px;height:25px;text-align:center;border:none;border-radius:12px;outline:none}.redline-tool-wrapper #redline-panel{position:fixed;z-index:6;top:60px;left:calc(100% - 25px);display:-webkit-box;display:-ms-flexbox;display:flex;width:290px;height:100%;transition:all .1s ease-in-out}.redline-tool-wrapper #redline-panel #menu-tab-column{width:20px;height:100%}.redline-tool-wrapper #redline-panel #menu-tab-column>div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:100%;height:40px;margin-top:65px;cursor:pointer;border-radius:20px 0 0 20px;background-color:#111}.redline-tool-wrapper #redline-panel #menu-tab-column>div>div>div{width:12px;height:2px;margin:3px 0 3px 7px;background-color:#fff}.redline-tool-wrapper #redline-panel #redline-panel-menu-column{font-size:12px;overflow-y:auto;box-sizing:border-box;width:270px;height:100%;padding:0;color:#fff;background-color:#111}.redline-tool-wrapper #redline-panel #redline-panel-menu-column .redline-panel-section{margin-top:20px}.redline-tool-wrapper #redline-panel #redline-panel-menu-column .redline-panel-section:last-of-type p:last-of-type+*{margin-bottom:20px}.redline-tool-wrapper #redline-panel #redline-panel-menu-column p{position:relative;z-index:1;width:100%;height:15px;margin:10px 0 0}.redline-tool-wrapper #redline-panel #redline-panel-menu-column p .color-swatch{position:absolute;top:15px;right:0;box-sizing:border-box;width:25px;height:25px;cursor:pointer;border-left:1px solid #111;border-radius:0 3px 3px 0}.redline-tool-wrapper #redline-panel #redline-panel-menu-column input{height:25px}.redline-tool-wrapper #redline-panel #redline-panel-menu-column input,.redline-tool-wrapper #redline-panel #redline-panel-menu-column textarea{font-size:12px;box-sizing:border-box;width:100%;margin-top:0;padding:4px 5px;cursor:text;border:none;border-radius:3px}.redline-tool-wrapper #redline-panel #redline-panel-menu-column textarea{height:50px;resize:none}.redline-tool-wrapper .redline-panel-exposed{-webkit-transform:translateX(-265px);transform:translateX(-265px)}.redline-tool-wrapper .dimension-layer,.redline-tool-wrapper .hover-layer,.redline-tool-wrapper .hover-o-layer,.redline-tool-wrapper .measure-layer,.redline-tool-wrapper .select-layer{position:absolute;display:none;width:0;height:0}.redline-tool-wrapper .hover-layer{z-index:4;border:1px solid #4860ff;border-right:none;border-bottom:none}.redline-tool-wrapper .hover-o-layer{z-index:3;border:1px dashed #4860ff;border-right:none;border-bottom:none}.redline-tool-wrapper .select-layer{z-index:5;border:1px solid #e89a28;border-right:none;border-bottom:none}.redline-tool-wrapper .dimension-layer{font-size:10px;font-weight:700;z-index:6;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-width:30px;min-height:20px;padding:0;letter-spacing:1px;color:#fff;border-radius:5px;background-color:#e89a28}.redline-tool-wrapper .measure-layer{z-index:2;border:1px solid #e89a28;border-right:none;border-bottom:none}.redline-tool-wrapper .pseudo-tabs{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;height:25px;padding:0}.redline-tool-wrapper .pseudo-tabs,.redline-tool-wrapper .pseudo-tabs .tab{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;box-sizing:border-box}.redline-tool-wrapper .pseudo-tabs .tab{-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;max-width:50%;height:100%;margin:0 1px;cursor:pointer;color:#555;border-radius:3px 3px 0 0;background-color:#fff}.redline-tool-wrapper .pseudo-tabs .tab:first-of-type{margin-left:20px}.redline-tool-wrapper .pseudo-tabs .tab:last-of-type{margin-right:20px}.redline-tool-wrapper .pseudo-tabs .active-tab{color:#fff;border-width:1px 1px 0;border-style:solid;border-color:#fff;background-color:#111}.redline-tool-wrapper .pseudo-tabs .default{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.redline-tool-wrapper .pseudo-tabs .hover{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.redline-tool-wrapper .pseudo-tabs .disabled{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.redline-tool-wrapper .pseudo-wrapper{display:none;box-sizing:border-box;width:100%;margin-top:-1px;padding:0 20px;border-top:1px solid #fff}.redline-tool-wrapper .active-attributes{display:block}.component-name-wrapper{box-sizing:border-box;width:100%;margin-bottom:31px;padding:0 20px}.component-name-wrapper *{width:100%}.links-wrapper label{color:#fff}.links-wrapper input{font-size:12px;box-sizing:border-box;height:25px;margin-right:15px;padding:4px 5px;cursor:text;border:none;border-radius:3px;outline:none;background-color:#fff}</style>',jqueryURL='<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"><\/script>',fontURL='<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">',jqueryMajorVersion="3",pseudoClasses={hover:{pseudoName:"Hover",axureName:"mouseOver",keyName:"hover"},disabled:{pseudoName:"Disabled",axureName:"disabled",keyName:"disabled"},default:{pseudoName:"Default",axureName:"",keyName:"default"}},rgbaReg=/rgb(a)?\(\d+,(\s)?\d+,(\s+)\d+(,(\s+)?\d(\.\d+)?)?\)/,hexReg=/#([a-fA-F]|\d){6}((\s+)?\d{1,3}%)?/,toolPermitted=void 0,enableTool=void 0,cssProperties=void 0,documentZoom=void 0,previousZoom=void 0,zoomWrapperPadding=void 0,borderThickness=void 0,labelSpacing=void 0,hoveredElement=void 0,selectedElement=void 0,elemMeas=void 0,elemSelectMeas=void 0,interElemMeas=void 0,dimensionMarkerWidth=void 0,dimensionMarkerHeight=void 0,documentClone=void 0,elementPosition=void 0,selectedMeasurements=void 0,hoveredMeasurements=void 0,documentCSSList=void 0,elementCSS=void 0;toolPermitted=!0,enableTool=!0,previousZoom=documentZoom=100,zoomWrapperPadding=1e3,borderThickness=1,labelSpacing=5,hoveredElement="",selectedElement="",elemMeas={width:0,height:0,offsetTop:0,offsetLeft:0},elemSelectMeas={width:0,height:0,offsetTop:0,offsetLeft:0},interElemMeas={top:0,right:0,bottom:0,left:0,trueTop:0,trueRight:0,trueBottom:0,trueLeft:0},dimensionMarkerWidth=0,dimensionMarkerHeight=0,cssProperties={properties:{width:"",height:""},styles:{"background-color":"",opacity:"",outline:"","border-top":"","border-right":"","border-bottom":"","border-left":"","border-top-style":"","border-right-style":"","border-bottom-style":"","border-left-style":"","border-top-width":"","border-right-width":"","border-bottom-width":"","border-left-width":"","border-top-color":"","border-right-color":"","border-bottom-color":"","border-left-color":"","border-style":"","border-width":"","border-color":"","border-top-left-radius":"",border:"","border-top-right-radius":"","border-bottom-right-radius":"","border-bottom-left-radius":"","border-radius":"","box-shadow":""},text:{"font-family":"","font-size":"","font-weight":"","line-height":"","text-align":"",color:"",_content:""}},document.write(fontURL),document.write(pageHTML),document.write(pageCSS),window.jQuery?parseInt(jQuery.fn.jquery)!=jqueryMajorVersion?(document.write(jqueryURL),jQueryWait()):onLoadFunction():(document.write(jqueryURL),jQueryWait());