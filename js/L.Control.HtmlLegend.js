!function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";var n=function(){function e(e,t){var i=[],n=!0,a=!1,l=void 0;try{for(var o,r=e[Symbol.iterator]();!(n=(o=r.next()).done)&&(i.push(o.value),!t||i.length!==t);n=!0);}catch(e){a=!0,l=e}finally{try{!n&&r.return&&r.return()}finally{if(a)throw l}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();L.Control.HtmlLegend=L.Control.extend({_map:null,_activeLayers:0,_alwaysShow:!1,options:{position:"topright",legends:[],collapseSimple:!1,detectStretched:!1,collapsedOnInit:!1,defaultOpacity:1,visibleIcon:"leaflet-html-legend-icon-eye",hiddenIcon:"leaflet-html-legend-icon-eye-slash",toggleIcon:"leaflet-html-legend-icon-eye"},onAdd:function(e){return this._map=e,this._container=L.DomUtil.create("div","leaflet-control leaflet-bar leaflet-html-legend"),L.DomEvent.disableClickPropagation(this._container),L.DomEvent.disableScrollPropagation(this._container),this.render(),this._container},render:function(){L.DomUtil.empty(this._container),this.options.legends.forEach(this._renderLegend,this),this._checkVisibility()},addLegend:function(e){this.options.legends.push(e),this._map&&this._renderLegend(e)},_renderLegend:function(e){var t=this;if(e.elements){var i=e.elements,n="legend-block";this.options.detectStretched&&3===i.length&&""!==i[0].label&&""===i[1].label&&""!==i[2].label&&(n+=" legend-stretched");var a=L.DomUtil.create("div",n,this._container);if(this.options.collapseSimple&&1===i.length&&!i[0].label)return this._addElement(i[0].html,e.name,i[0].style,a),void this._connectLayer(a,e);if(e.name){var l=L.DomUtil.create("h4",null,a);L.DomUtil.create("div","legend-caret",l),L.DomUtil.create("span",null,l).innerHTML=e.name,this.options.collapsedOnInit&&L.DomUtil.addClass(l,"closed"),L.DomEvent.on(l,"click",function(){L.DomUtil.hasClass(l,"closed")?L.DomUtil.removeClass(l,"closed"):L.DomUtil.addClass(l,"closed")},this)}var o=L.DomUtil.create("div","legend-elements",a);i.forEach(function(e){t._addElement(e.html,e.label,e.style,o)},this),this._connectLayer(a,e)}},_addElement:function(e,t,i,a){var l=L.DomUtil.create("div","legend-row",a),o=L.DomUtil.create("span","symbol",l);i&&Object.entries(i).forEach(function(e){var t=n(e,2),i=t[0],a=t[1];o.style[i]=a}),o.innerHTML=e,t&&(L.DomUtil.create("label",null,l).innerHTML=t)},_updateOpacity:function(e,t){"function"==typeof e.setOpacity?e.setOpacity(t):"function"==typeof e.setStyle&&e.setStyle({opacity:t})},_connectLayer:function(e,t){var i=this,n=t.layer;if(!n)return void(this._alwaysShow=!0);var a=n.opacity||this.options.defaultOpacity||1;this._updateOpacity(n,a),this._map.hasLayer(n)?this._activeLayers+=1:e.style.display="none",e.classList.add("layer-control");var l=L.DomUtil.create("i","visibility-toggle "+this.options.toggleIcon,e);l.dataset.visibileOpacity=a,L.DomEvent.on(l,"click",function(e){var t=e.target;L.DomUtil.hasClass(t,"disabled")?(L.DomUtil.removeClass(t,"disabled"),i._updateOpacity(n,t.dataset.visibileOpacity)):(L.DomUtil.addClass(t,"disabled"),i._updateOpacity(n,0))});var o=L.DomUtil.create("span","opacity-slider",e);L.DomUtil.create("span","slider-label",o).innerHTML="Transparency:",L.DomUtil.create("i",this.options.visibleIcon,o);var r=L.DomUtil.create("input",null,o);r.type="range",r.min=0,r.max=1,r.step=.1,r.onchange=function(e){var t=1-e.target.value||0;i._updateOpacity(n,t),l.dataset.visibileOpacity=t,L.DomUtil.removeClass(l,"disabled")},r.value=1-a,L.DomUtil.create("i",this.options.hiddenIcon,o),this._map.on("layeradd",function(t){t.layer===n&&(i._activeLayers+=1,e.style.display="",i._checkVisibility())}).on("layerremove",function(t){t.layer===n&&(i._activeLayers-=1,e.style.display="none",i._checkVisibility())})},_checkVisibility:function(){this._alwaysShow||this._activeLayers?this._container.style.display="":this._container.style.display="none"}}),L.control.htmllegend=function(e){return new L.Control.HtmlLegend(e)}}]);
//# sourceMappingURL=L.Control.HtmlLegend.js.map
