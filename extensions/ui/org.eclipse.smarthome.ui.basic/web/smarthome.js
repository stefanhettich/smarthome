!function(a){"use strict";function b(a){var b=new RegExp("(?:^"+a+"|;s*"+a+")=(.*?)(?:;|$)","g"),c=b.exec(document.cookie);return null===c?null:c[1]}function c(){return b("api_key")}function d(a){var b=document.createElement("div");return b.innerHTML=a,b.childNodes}function e(a,b){b instanceof NodeList?[].slice.call(b).forEach(function(b){a.appendChild(b)}):a.appendChild(b)}function f(a){var b=a,c="undefined"!=typeof b.type?b.type:"GET",d="undefined"!=typeof b.data?b.data:"",e="undefined"!=typeof b.headers?b.headers:{},f=new XMLHttpRequest;f.open(c,b.url,!0);for(var g in e)f.setRequestHeader(g,e[g]);return f.onload=function(){return f.status<200||f.status>400?void("function"==typeof b.error&&b.error(f)):void("function"==typeof b.callback&&b.callback(f))},f.onerror=function(){"function"==typeof b.error&&b.error(f)},f.send(d),f}function g(a,b){var c=document.getElementById(a).innerHTML;return c.replace(/\{([\w]+)\}/,function(a,c){return"undefined"!=typeof b[c]?b[c]:""})}function h(){var a=this;a.level=0,a.push=function(b){a.level++,history.pushState({page:b},document.title.textContent)},a.replace=function(a,b){history.replaceState({page:a},document.title.textContent,b)},window.addEventListener("popstate",function(b){a.level--,E.UI.navigate(b.state.page,!1)},!1)}function i(b){function c(a){a=a||window.event,27===a.keyCode&&i.hide()}function f(){document.addEventListener("keydown",c)}function h(){document.removeEventListener("keydown",c)}var i=this;i.templateId="template-modal",i.text=g(i.templateId,{content:b}),i.show=function(){e(document.body,d(i.text)),i.bg=document.querySelector(a.modal),i.container=i.bg.querySelector(a.modalContainer),E.UI.currentModal=i,i.bg.addEventListener("click",function(){i.hide()}),i.container.addEventListener("click",function(a){a.stopPropagation()}),f()},i.hide=function(){document.body.querySelector(a.modal).remove(),delete E.UI.currentModal,h()}}function j(a,b){var c,d=this,e=!1;d.lock=!1,d.call=function(){c=arguments,d.lock||(e=!1,a.apply(null,c),d.lock=!0,setTimeout(function(){e||a.apply(null,c),d.lock=!1},b))},d.finish=function(){e=!0}}function k(a,b){function c(a){a.widget.setVisible(a.visibility)}var d=this;d.queue=[],d.timeout=null,d.processEvents=function(){for(d.timeout=null;0!==d.queue.length;)c(d.queue[0]),d.queue=d.queue.slice(1)},d.push=function(c){d.queue.length>b||(d.queue.push(c),null===d.timeout?d.timeout=setTimeout(d.processEvents,a):(clearTimeout(d.timeout),d.timeout=setTimeout(d.processEvents,a)))}}function l(b){var c=this,d=!1;c.parentNode=b,c.formRow=b.parentNode,c.item=c.parentNode.getAttribute(a.itemAttribute),c.id=c.parentNode.getAttribute(a.idAttribute),c.icon=c.parentNode.parentNode.querySelector(a.formIcon),c.visible=!c.formRow.classList.contains(a.formRowHidden),null!==c.icon&&(c.iconName=c.icon.getAttribute(a.iconAttribute)),c.reloadIcon=function(a){null!==c.icon&&c.icon.setAttribute("src","/icon/"+c.iconName+"?state="+a+"&format="+E.UI.iconType)},c.setVisible=function(b){b?c.formRow.classList.remove(a.formRowHidden):c.formRow.classList.add(a.formRowHidden),c.visible=b},c.setValue=function(a,b){c.reloadIcon(b),d?d=!1:c.setValuePrivate(a,b)},c.setValuePrivate=function(){},c.supressUpdate=function(){d=!0}}function m(a,b){b&&l.call(this,a);var c=this;if(c.image=a.querySelector("img"),c.updateInterval=parseInt(a.getAttribute("data-update-interval"),10),0!==c.updateInterval){c.url=c.image.getAttribute("src").replace(/\d+$/,"");var d=setInterval(function(){return 0===c.image.clientWidth?void clearInterval(d):void c.image.setAttribute("src",c.url+Math.random().toString().slice(2))},1e3*c.updateInterval)}}function n(a){l.call(this,a);var b=this;b.setValuePrivate=function(b){a.innerHTML=b}}function o(b){l.call(this,b);var c=this;c.value=c.parentNode.querySelector(a.formValue),c.count=1*c.parentNode.getAttribute("data-count"),c.reset=function(){c.buttons.forEach(function(b){b.classList.remove(a.buttonActiveClass)})},c.onclick=function(){var b=this.getAttribute("data-value")+"";1!==c.count&&(c.reset(),this.classList.add(a.buttonActiveClass)),c.parentNode.dispatchEvent(D("control-change",{item:c.item,value:b})),c.supressUpdate()},c.valueMap={},c.buttons=[].slice.call(c.parentNode.querySelectorAll(a.controlButton)),c.setValuePrivate=function(b){null!==c.value&&(c.value.innerHTML=b),1!==c.count&&(c.reset(),void 0!==c.valueMap&&void 0!==c.valueMap[b]&&c.valueMap[b].classList.add(a.buttonActiveClass))},c.buttons.forEach.call(c.buttons,function(a){var b=a.getAttribute("data-value")+"";c.valueMap[b]=a,a.addEventListener("click",c.onclick)})}function p(b){function c(a){if(a.stopPropagation(),"input"===a.target.tagName.toLowerCase()){var b=a.target.getAttribute("value");d.parentNode.dispatchEvent(D("control-change",{item:d.item,value:b})),setTimeout(function(){d.modal.hide()},300)}}l.call(this,b);var d=this,e=b.getAttribute("data-value-map");d.value=null,d.valueNode=b.parentNode.querySelector(a.formValue),null!==e?d.valueMap=JSON.parse(e):d.valueMap={},d.showModal=function(){var b=d.parentNode.querySelector(a.selectionRows).innerHTML;d.modal=new i(b),d.modal.show();var e=[].slice.call(d.modal.container.querySelectorAll(a.formRadio));if(null!==d.value){var f=[].slice.call(d.modal.container.querySelectorAll("input[type=radio]"));f.forEach(function(a){a.value===d.value?a.checked=!0:a.checked=!1})}e.forEach(function(a){componentHandler.upgradeElement(a,"MaterialRadio"),a.addEventListener("click",c)})},d.setValuePrivate=function(a){d.value=""+a,void 0!==d.valueMap[a]?d.valueNode.innerHTML=d.valueMap[a]:d.valueNode.innerHTML=""},d.parentNode.parentNode.addEventListener("click",d.showModal)}function q(b){function c(a){i.parentNode.dispatchEvent(D("control-change",{item:i.item,value:a}))}function d(a,b){g=!1,k=!0,h=setTimeout(function(){g=!0,c(a)},j),b.stopPropagation(),b.preventDefault()}function e(a,b){clearTimeout(h),k&&(k=!1,c(g?"STOP":a),b.stopPropagation(),b.preventDefault())}function f(a){c("STOP"),a.stopPropagation(),a.preventDefault()}l.call(this,b);var g,h,i=this,j=300,k=!1;i.buttonUp=i.parentNode.querySelector(a.rollerblind.up),i.buttonDown=i.parentNode.querySelector(a.rollerblind.down),i.buttonStop=i.parentNode.querySelector(a.rollerblind.stop),i.hasValue="true"===i.parentNode.getAttribute("data-has-value"),i.valueNode=i.parentNode.parentNode.querySelector(a.formValue),i.setValuePrivate=function(a){i.hasValue&&("DOWN"===a?a="100":"UP"===a&&(a="0"),i.valueNode.innerHTML=a)};var m=e.bind(null,"UP"),n=d.bind(null,"UP"),o=e.bind(null,"DOWN"),p=d.bind(null,"DOWN");i.buttonUp.addEventListener("touchstart",n),i.buttonUp.addEventListener("mousedown",n),i.buttonUp.addEventListener("touchend",m),i.buttonUp.addEventListener("mouseup",m),i.buttonUp.addEventListener("mouseleave",m),i.buttonDown.addEventListener("touchstart",p),i.buttonDown.addEventListener("mousedown",p),i.buttonDown.addEventListener("touchend",o),i.buttonDown.addEventListener("mouseup",o),i.buttonDown.addEventListener("mouseleave",o),i.buttonStop.addEventListener("mousedown",f),i.buttonStop.addEventListener("touchstart",f)}function r(b){function c(a,b){var c=d.value+(a===!0?d.step:-d.step);c=c>d.max?d.max:c,c=c<d.min?d.min:c,d.parentNode.dispatchEvent(D("control-change",{item:d.item,value:c})),d.value=c,b.stopPropagation(),b.preventDefault()}l.call(this,b);var d=this;d.up=d.parentNode.querySelector(a.setpoint.up),d.down=d.parentNode.querySelector(a.setpoint.down),d.value=d.parentNode.getAttribute("data-value"),d.max=parseFloat(d.parentNode.getAttribute("data-max")),d.min=parseFloat(d.parentNode.getAttribute("data-min")),d.step=parseFloat(d.parentNode.getAttribute("data-step")),d.value=isNaN(parseFloat(d.value))?0:parseFloat(d.value),d.valueNode=d.parentNode.parentNode.querySelector(a.formValue),d.setValuePrivate=function(a,b){d.value=1*b,d.valueNode.innerHTML=a};var e=c.bind(null,!0),f=c.bind(null,!1);d.up.addEventListener("mousedown",e),d.up.addEventListener("touchstart",e),d.down.addEventListener("mousedown",f),d.down.addEventListener("touchstart",f)}function s(b,c,d){function e(a){var b=a.r,c=a.g,d=a.b;b/=255,c/=255,d/=255;var e,f,g=Math.max(b,c,d),h=Math.min(b,c,d),i=g,j=g-h;if(f=0===g?0:j/g,g===h)e=0;else{switch(g){case b:e=(c-d)/j+(c<d?6:0);break;case c:e=(d-b)/j+2;break;case d:e=(b-c)/j+4}e/=6}return{h:e,s:f,v:i}}function f(a){var b=a.h,c=a.s,d=a.v,e=(2-c)*d,f=e<1?e:2-e;return{h:b,s:0===f?0:c*d/f,l:e/2}}function g(a){var b;b=void 0!==a.touches?{x:a.touches[0].pageX-p.colorpicker.offsetLeft,y:a.touches[0].pageY-p.colorpicker.offsetTop}:F.eventLayerXY&&F.pointerEvents?{x:a.layerX,y:a.layerY}:{x:a.pageX-p.colorpicker.offsetLeft,y:a.pageY-p.colorpicker.offsetTop};var c=p.image.clientWidth/2,d=b.x-c,e=b.y-c,g=e*e+d*d;if(g>c*c){var h=1-Math.abs(c/Math.sqrt(g));b.x-=d*h,b.y-=e*h}p.handle.style.left=b.x/p.image.clientWidth*100+"%",p.handle.style.top=b.y/p.image.clientWidth*100+"%";var i=d>=0?(2*Math.PI-Math.atan(e/d)+Math.PI/2)/(2*Math.PI):(2*Math.PI-Math.atan(e/d)-Math.PI/2)/(2*Math.PI),j={h:isNaN(i)?0:i,s:Math.sqrt(g)/c,v:1},k=f(j);p.hsvValue={h:j.h,s:j.s,v:p.slider.value/100},k.l=k.l<.5?.5:k.l,p.background.style.background="hsl("+360*k.h+", 100%, "+Math.round(100*k.l)+"%)"}function h(a){var b=e(a);p.slider.value=100*b.v;var c=50+Math.round(b.s*Math.cos(2*Math.PI*b.h)*50),d=50+Math.round(b.s*Math.sin(2*Math.PI*b.h)*50);p.handle.style.top=c+"%",p.handle.style.left=d+"%",b.v=1;var f=s.hsv2rgb(b);p.background.style.background="rgb("+Math.round(f.r)+","+Math.round(f.g)+","+Math.round(f.b)+")"}function i(){null!==p.interval&&(clearInterval(p.interval),p.interval=null),window.removeEventListener("mouseup",i)}function k(a){p.interval=setInterval(function(){d(p.hsvValue)},300),E.changeListener.pause(),window.addEventListener("mouseup",i),g(a),d(p.hsvValue),a.stopPropagation()}function l(a){(void 0!==a.touches||1&a.buttons)&&(g(a),a.stopPropagation(),a.preventDefault())}function m(a){null!==p.interval&&(clearInterval(p.interval),p.interval=null),E.changeListener.resume(),window.removeEventListener("mouseup",i),a.stopPropagation()}function n(){p.hsvValue.v=p.slider.value/100,E.changeListener.pause(),p.debounceProxy.call()}function o(){p.hsvValue.v=p.slider.value/100,p.debounceProxy.call(),p.debounceProxy.finish(),E.changeListener.resume()}var p=this;p.container=b,p.value=c,p.hsvValue=e(c),p.interval=null,p.colorpicker=p.container.querySelector(a.colorpicker.colorpicker),p.image=p.container.querySelector(a.colorpicker.image),p.background=p.container.querySelector(a.colorpicker.background),p.handle=p.container.querySelector(a.colorpicker.handle),p.slider=p.container.querySelector(a.colorpicker.slider),p.button=p.container.querySelector(a.controlButton),componentHandler.upgradeElement(p.button,"MaterialButton"),componentHandler.upgradeElement(p.button,"MaterialRipple"),p.debounceProxy=new j(function(){d(p.hsvValue)},200),p.slider.addEventListener("change",n),p.slider.addEventListener("touchend",o),p.slider.addEventListener("mouseup",o),p.image.addEventListener("mousedown",l),p.image.addEventListener("mousemove",l),p.image.addEventListener("touchmove",l),p.image.addEventListener("touchstart",l),p.image.addEventListener("touchend",m),p.image.addEventListener("mouseup",m),p.image.addEventListener("mousedown",k),p.image.addEventListener("touchstart",k),h(c)}function t(b){function c(a){return{r:parseInt(a.substr(1,2),16),g:parseInt(a.substr(3,2),16),b:parseInt(a.substr(5,2),16)}}function d(a){k.parentNode.dispatchEvent(D("control-change",{item:k.item,value:a}))}function e(a){j=setInterval(function(){d(a)},m)}function f(){clearInterval(j)}function h(){k.modal=new i(g("template-colorpicker")),k.modal.show(),k.modal.container.classList.add(a.colorpicker.modalClass),k.modalControl=new s(k.modal.container,k.value,function(a){k.value=s.hsv2rgb(a),d(Math.round(360*a.h%360)+","+Math.round(100*a.s%100)+","+Math.round(100*a.v))}),k.modal.container.querySelector(a.colorpicker.button).addEventListener("click",function(){k.modal.hide()})}l.call(this,b);var j,k=this,m=300;k.value=c(k.parentNode.getAttribute("data-value")),k.buttonUp=k.parentNode.querySelector(a.colorpicker.up),k.buttonDown=k.parentNode.querySelector(a.colorpicker.down),k.buttonPick=k.parentNode.querySelector(a.colorpicker.pick),k.setValue=function(a){var b=a.split(","),c={h:b[0]/360,s:b[1]/100,v:b[2]/100};k.value=s.hsv2rgb(c)};var n=e.bind(null,"INCREASE"),o=e.bind(null,"DECREASE");k.buttonUp.addEventListener("touchstart",n),k.buttonUp.addEventListener("mousedown",n),k.buttonUp.addEventListener("mouseleave",f),k.buttonUp.addEventListener("touchend",f),k.buttonUp.addEventListener("mouseup",f),k.buttonDown.addEventListener("touchstart",o),k.buttonDown.addEventListener("mousedown",o),k.buttonDown.addEventListener("touchend",f),k.buttonDown.addEventListener("mouseup",f),k.buttonDown.addEventListener("mouseleave",f),k.buttonPick.addEventListener("click",h)}function u(a){l.call(this,a);var b=this;b.input=b.parentNode.querySelector("input[type=checkbox]"),b.input.addEventListener("change",function(){b.parentNode.dispatchEvent(D("control-change",{item:b.item,value:b.input.checked?"ON":"OFF"})),b.supressUpdate()}),b.setValuePrivate=function(a){var c="ON"===a;b.input.checked=c,c?b.parentNode.MaterialSwitch.on():b.parentNode.MaterialSwitch.off()}}function v(a){function b(){e.parentNode.dispatchEvent(D("control-change",{item:e.item,value:e.input.value})),e.supressUpdate()}function c(){null!==f&&clearTimeout(f),e.locked=!0,E.changeListener.pause()}function d(){e.debounceProxy.call(),setTimeout(function(){E.changeListener.resume()},5),f=setTimeout(function(){e.locked=!1},300)}l.call(this,a);var e=this;e.input=e.parentNode.querySelector("input[type=range]"),e.locked=!1,function(){var a=parseInt(e.input.getAttribute("data-state"),10);isNaN(a)?e.input.value=0:e.input.value=a,e.input.MaterialSlider&&e.input.MaterialSlider.change()}(),e.debounceProxy=new j(function(){b()},200),e.input.addEventListener("change",function(){e.debounceProxy.call()}),e.setValuePrivate=function(a,b){return e.locked?void e.reloadIcon(b):(e.input.value=b,void e.input.MaterialSlider.change())};var f=null;e.input.addEventListener("touchstart",c),e.input.addEventListener("mousedown",c),e.input.addEventListener("touchend",d),e.input.addEventListener("mouseup",d)}function w(b){l.call(this,b);var c=this;c.target=b.getAttribute("data-target"),c.container=b.parentNode.querySelector(a.formValue),c.setValuePrivate=function(a){null!==c.container&&(c.container.innerHTML=a)},b.parentNode.addEventListener("click",function(){E.UI.navigate(c.target,!0)})}function x(a){f({type:"POST",url:"/rest/items/"+a.detail.item+"?api_key="+c(),data:a.detail.value,headers:{"Content-Type":"text/plain"}})}function y(b){function c(a){document.querySelector("title").innerHTML=a,g.layoutTitle.innerHTML=a}function d(a){var b=a.documentElement,d=[];if("page"===b.tagName){[].forEach.call(b.childNodes,function(a){a instanceof Text||d.push(a)}),c(d[0].textContent);for(var e=document.querySelector(".page-content");e.firstChild;)e.removeChild(e.firstChild);e.insertAdjacentHTML("beforeend",d[1].textContent)}}var e={Loading:1,Idle:2},g=this,i=e.Idle,j=new h;g.page=document.body.getAttribute("data-page-id"),g.sitemap=document.body.getAttribute("data-sitemap"),g.destination=null,g.root=b,g.loading=g.root.querySelector(a.uiLoadingBar),g.layoutTitle=document.querySelector(a.layoutTitle),g.iconType=document.body.getAttribute(a.iconTypeAttribute),g.upgradeComponents=function(){var b=componentHandler.upgradeElement;[].slice.call(document.querySelectorAll(a.formControls)).forEach(function(a){switch(a.getAttribute("data-control-type")){case"setpoint":case"rollerblind":case"colorpicker":case"buttons":[].slice.call(a.querySelectorAll("button")).forEach(function(a){b(a,"MaterialButton"),b(a,"MaterialRipple")});break;case"checkbox":b(a,"MaterialSwitch");break;case"slider":b(a.querySelector("input[type=range]"),"MaterialSlider")}})},g.showLoadingBar=function(){g.loading.style.display="block"},g.hideLoadingBar=function(){g.loading.style.display=""},g.navigateCallback=function(a){i=e.Idle,g.pushState&&j.push(g.page),d(a.responseXML),g.pushState&&j.replace(g.newPage,g.destination),g.page=g.newPage,g.upgradeComponents(),g.initControls(),g.hideLoadingBar(),g.sitemap!==g.page?(g.header.classList.remove("navigation-home"),g.header.classList.add("navigation-page")):(g.header.classList.add("navigation-home"),g.header.classList.remove("navigation-page")),E.changeListener.navigate(g.page)},g.navigate=function(a,b){i===e.Idle&&(i=e.Loading,g.pushState=void 0===b||b===!0,g.newPage=a,g.showLoadingBar(),g.destination="/basicui/app?w="+a+"&sitemap="+E.UI.sitemap,f({url:g.destination+"&subscriptionId="+E.subscriptionId+"&__async=true",callback:g.navigateCallback}),void 0!==E.UI.currentModal&&E.UI.currentModal.hide())},g.initControls=function(){function b(a){void 0!==E.dataModelLegacy[a.item]&&void 0!==E.dataModelLegacy[a.item].widgets||(E.dataModelLegacy[a.item]={widgets:[]}),E.dataModelLegacy[a.item].widgets.push(a),E.dataModel[a.id]=a}E.dataModel={},E.dataModelLegacy={},[].forEach.call(document.querySelectorAll(a.formControls),function(a){switch(a.getAttribute("data-control-type")){case"setpoint":b(new r(a));break;case"rollerblind":b(new q(a));break;case"buttons":b(new o(a));break;case"selection":b(new p(a));break;case"checkbox":b(new u(a));break;case"slider":b(new v(a));break;case"chart":case"image":b(new m(a,!0));break;case"image-link":b(new m(a,!1));case"text-link":case"group":b(new w(a));break;case"text":b(new n(a));break;case"colorpicker":b(new t(a));break;case"video":case"webview":case"mapview":b(new l(a))}a.addEventListener("control-change",x)})},j.replace(g.page,document.location.href),function(){g.header=document.querySelector(a.layoutHeader),g.sitemap!==g.page&&(g.header.classList.remove("navigation-home"),g.header.classList.add("navigation-page")),document.querySelector(a.backButton).addEventListener("click",function(){j.level>0?history.back():location.href=location.origin+"/basicui/app?sitemap="+E.UI.sitemap})}()}function z(){this.paused=!1,this.pause=function(){this.paused=!0},this.resume=function(){this.paused=!1}}function A(a){z.call(this);var b=this;b.navigate=function(){};var d=a+"?api_key="+c();a.indexOf("?")!==-1&&(d=a+"&api_key="+c()),b.source=new EventSource(d),b.source.addEventListener("event",function(a){if(!b.paused){var c,d=JSON.parse(a.data);if(d.widgetId in E.dataModel){if("string"==typeof d.label&&d.label.indexOf("[")!==-1&&d.label.indexOf("]")!==-1){var e=d.label.indexOf("[");c=d.label.substr(e+1,d.label.lastIndexOf("]")-(e+1))}else c=d.item.state;if(void 0!==E.dataModel[d.widgetId]){var f=E.dataModel[d.widgetId];f.visible!==d.visibility?E.UI.layoutChangeProxy.push({widget:f,visibility:d.visibility}):f.setValue(c,d.item.state)}}}})}function B(){function a(a){function b(a){a.forEach(function(a){if(void 0!==a.item){var b=a.item.name,c=a.item.state;E.dataModelLegacy[b].widgets.forEach(function(a){"NULL"!==c&&a.setValue(c,c)})}})}try{a=JSON.parse(a)}catch(c){return}a.leaf?b(a.widgets):a.widgets.forEach(function(a){b(a.widgets)})}function b(){var e=Math.random().toString(16).slice(2);d.request=f({url:"/rest/sitemaps/"+d.sitemap+"/"+d.page+"?_="+e+"&api_key="+c(),headers:{"X-Atmosphere-Transport":"long-polling"},callback:function(c){d.paused||a(c.responseText),setTimeout(function(){b()},1)},error:function(){setTimeout(function(){b()},1e3)}})}z.call(this);var d=this;d.sitemap=document.body.getAttribute("data-sitemap"),d.page=document.body.getAttribute("data-page-id"),d.navigate=function(a){d.request.abort(),d.page=a,b()},d.pause=function(){d.request.abort(),d.paused=!0},d.resume=function(){d.paused=!1,b()},b()}function C(){var a=this;a.startSubscriber=function(b){var c,d,e,f,g,h;try{c=JSON.parse(b.responseText)}catch(i){return}if("CREATED"===c.status){try{d=c.context.headers.Location[0]}catch(i){return}e=d.split("/"),g=e[e.length-1],f=document.body.getAttribute("data-sitemap"),h=document.body.getAttribute("data-page-id"),E.subscriptionId=g,F.eventSource?A.call(a,d+"?sitemap="+f+"&pageid="+h):B.call(a)}},f({url:"/rest/sitemaps/events/subscribe?api_key="+c(),type:"POST",callback:a.startSubscriber})}var D,E={dataModel:{}},F={eventLayerXY:function(){var a;return a=void 0===document.createEvent?new MouseEvent(null):document.createEvent("MouseEvent"),void 0!==a.layerX}(),pointerEvents:void 0!==document.createElement("div").style.pointerEvents,customEvent:function(){var a=!0;try{new CustomEvent("event",{})}catch(b){a=!1}return a}(),elementRemove:void 0!==Element.prototype.remove,flexbox:void 0!==document.createElement("div").style.flexBasis,flexboxLegacy:function(){var a=document.createElement("div");return void 0!==a.style.boxDirection||void 0!==a.style.webkitBoxDirection}(),eventSource:"EventSource"in window};!function(){D=F.customEvent?function(a,b){return new CustomEvent(a,{detail:b})}:function(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,!0,!1,b),c},F.elementRemove||(Element.prototype.remove=function(){this.parentNode.removeChild(this)}),!F.flexbox&&F.flexboxLegacy&&document.documentElement.classList.add("flexbox-legacy")}(),s.hsv2rgb=function(a){var b,c,d,e=a.h,f=a.s,g=a.v,h=Math.floor(6*e),i=6*e-h,j=g*(1-f),k=g*(1-i*f),l=g*(1-(1-i)*f);switch(h%6){case 0:b=g,c=l,d=j;break;case 1:b=k,c=g,d=j;break;case 2:b=j,c=g,d=l;break;case 3:b=j,c=k,d=g;break;case 4:b=l,c=j,d=g;break;case 5:b=g,c=j,d=k}return{r:255*b,g:255*c,b:255*d}},document.addEventListener("DOMContentLoaded",function(){E.UI=new y(document),E.UI.layoutChangeProxy=new k(100,50),E.UI.initControls(),E.changeListener=new C})}({itemAttribute:"data-item",idAttribute:"data-widget-id",iconAttribute:"data-icon",iconTypeAttribute:"data-icon-type",controlButton:"button",buttonActiveClass:"mdl-button--accent",modal:".mdl-modal",modalContainer:".mdl-modal__content",selectionRows:".mdl-form__selection-rows",formControls:".mdl-form__control",formRowHidden:"mdl-form__row--hidden",formValue:".mdl-form__value",formRadio:".mdl-radio",formRadioControl:".mdl-radio__button",formIcon:".mdl-form__icon img",uiLoadingBar:".ui__loading",layoutTitle:".mdl-layout-title",layoutHeader:".mdl-layout__header",backButton:".navigation__button-back",rollerblind:{up:".mdl-form__rollerblind--up",down:".mdl-form__rollerblind--down",stop:".mdl-form__rollerblind--stop"},setpoint:{up:".mdl-form__setpoint--up",down:".mdl-form__setpoint--down"},colorpicker:{up:".mdl-form__colorpicker--up",down:".mdl-form__colorpicker--down",pick:".mdl-form__colorpicker--pick",modalClass:"mdl-modal--colorpicker",image:".colorpicker__image",handle:".colorpicker__handle",slider:".colorpicker__brightness",background:".colorpicker__background",colorpicker:".colorpicker",button:".colorpicker__buttons > button"}});