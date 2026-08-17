function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,b=globalThis,f=b.trustedTypes,g=f?f.emptyScript:"",_=b.reactiveElementPolyfillSupport,v=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??w)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,_?.({ReactiveElement:y}),(b.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,q="?"+C,P=`<${q}>`,O=document,M=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,R="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,L=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,D=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,F=O.createTreeWalker(O,129);function K(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===U?"!--"===c[1]?n=N:void 0!==c[1]?n=j:void 0!==c[2]?(D.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=r??U,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?L:'"'===c[3]?I:H):n===I||n===H?n=L:n===N||n===j?n=U:(n=L,r=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===U?s+P:l>=0?(i.push(a),s.slice(0,l)+k+s.slice(l)+C+h):s+C+(-2===l?e:h)}return[K(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=X.createElement(c,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=l[o++],s=i.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),F.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===q)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===W)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(X,Y),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class at extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:w},ht=(t=dt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const bt={"4seven":"4seven","5action":"5action","5hd":"channel5","5plus1":"channel5plus1","5select":"5select","5star":"5star","5starplus1":"5starplus1","5usa":"5usa","5usaplus1":"5usaplus1",aljazeeraeng:"aljazeera",arirangtv:"arirang",bbcalbahd:"bbcalba",bbcasiannet:"bbcradioasiannetwork",bbcfourhd:"bbcfour",bbcnewshd:"bbcnews",bbconecihd:"bbcone",bbconeeasthd:"bbcone",bbconeemidhd:"bbcone",bbconelonhd:"bbcone",bbconenehd:"bbcone",bbconenihd:"bbconenorthernireland",bbconenwhd:"bbcone",bbconescothd:"bbconescotland",bbconesehd:"bbcone",bbconesohd:"bbcone",bbconeswhd:"bbcone",bbconewalhd:"bbconewales",bbconewmhd:"bbcone",bbconewsthd:"bbcone",bbconeykshd:"bbcone",bbcparlhd:"bbcparliament",bbcr1:"bbcradio1",bbcr1x:"bbcradio1xtra",bbcr2:"bbcradio2",bbcr3:"bbcradio3",bbcr4:"bbcradio4",bbcr5l:"bbcradio5live",bbcr5sx:"bbcradio5sportsextra",bbcr6music:"bbcradio6music",bbcradio4ex:"bbcradio4extra",bbcrb1hd:"bbcredbutton",bbcrcymru:"bbcradiocymru",bbcrcymru2:"bbcradiocymru2",bbcrfoyle:"bbcradiofoyle",bbcrlondon:"bbcradiolondon",bbcrngaid:"bbcradionangaidheal",bbcrscot:"bbcradioscotland",bbcrulster:"bbcradioulster",bbcrwales:"bbcradiowales",bbcscothd:"bbcscotland",bbcthreehd:"bbcthree",bbctwohd:"bbctwo",bbctwonihd:"bbctwonorthernireland",bbctwowalhd:"bbctwowales",bbcworldsv:"bbcradioworldservice",bfbsradio:"bfbsuk",blaze:"blaze",bloomberghd:"bloomberg",capital:"capitalfm",capitalxtra:"capitalxtra",cbbchd:"bbccbbc",cbeebieshd:"bbccbeebies",challenge:"challenge",channel4hd:"channel4",channel4plus1:"channel4plus1",classicfm:"classicfm",cnbc:"cnbc",courttv:"courttv",cula4:"cula4",daystarhd:"daystartv",dmax:"dmax",dmaxplus1:"dmaxplus1",e4:"e4",e4extra:"e4extra",e4plus1:"e4plus1",film4:"filmfour",film4plus1:"filmfourplus1",foodnetwork:"foodnetwork",foodnetworkplus1:"foodnetworkplus1",france24eng:"france24",freesatinfo:"freesat",gbnewshd:"gbnews",godtv:"godtv",goldradio:"goldradio",heart:"heart",hobbymaker:"hobbymaker",idealworld:"idealworld",itv1londonhd:"itv1",itv1plus1london:"itv1plus1",itv2hd:"itv2",itv2plus1:"itv2plus1",itv3hd:"itv3",itv3plus1:"itv3plus1",itv4hd:"itv4",itv4plus1:"itv4plus1",jewellerymaker:"jewellerymaker",lbc:"lbc",legend:"legend",legendxtra:"legendxtra",legendxtraplus1:"legendxtraplus1",more4:"more4",more4plus1:"more4plus1",nhkworldjapan:"nhkworldjapan",pbsamerica:"pbsamerica",questhd:"quest",questplus1:"questplus1",questred:"questred",questredplus1:"questredplus1",qvcbeauty:"qvcbeauty",qvcextra:"qvcextra",qvchd:"qvchd",qvcstylehd:"qvcstylehd",radiox:"radiox-clivebesle",really:"really",revelation:"revelationtv",rte2:"rte2",rte2fm:"rte2fm",rte2plus1:"rte2plus1",rtegold:"rtegold",rtelyric:"rtelyricfm",rtelyricfm:"rtelyricfm",rtenews:"rtenews",rteone:"rteone",rteoneplus1:"rteoneplus1",rteradio1:"rteradio1",rteraidionagaeltachta:"rteraidionagaeltachta",rternag:"rteraidionagaeltachta",s4chd:"s4c",saorviewinformation:"saorview",skyarts:"skyarts",skymixhd:"skymix",skynews:"skynews",smoothradiouk:"smoothradio",sonlifetv:"sonlifetv",talkingpicstv:"talkingpicturestv",talksport:"talksport",tg4:"tg4",tg4plus1:"tg4plus1",thatstv:"thatstv",titheanoireachtais:"oireachtastv",tjchd:"tjc",tlchd:"tlc",tlcplus1:"tlcplus1",togethertv:"togethertv",trtworld:"trtworld",truecrime:"truecrime",truecrimeplus1:"truecrimeplus1",truecrimextr:"truecrimextra",virginmedia1:"virginmediaone",virginmedia2:"virginmediatwo",virginmedia3:"virginmediathree",virginmedia4:"virginmediafour",virginradio:"virginradio"},ft=new Map,gt=new Map,_t=new Set;function vt(t,e){const s=`${e?"d":"l"}:${t}`,i=ft.get(s);if(i)return i;const r=function(t){const e=function(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\+1/g,"plus1").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}(t);return e?bt[e]?bt[e]:e.endsWith("plus1")&&bt[e.slice(0,-5)]?bt[e.slice(0,-5)]:e:null}(t);if(!r)return ft.set(s,[]),[];const o=(e?[".dark.svg",".default.svg",".default.png"]:[".default.svg",".light.svg",".default.png"]).map(t=>`https://cdn.jsdelivr.net/gh/picons/picons@master/build-source/logos/${r}${t}`);return ft.set(s,o),o}const mt="owc-favourites";function wt(t,e){const s=new Set(t);return s.has(e)?s.delete(e):s.add(e),function(t){try{localStorage.setItem(mt,JSON.stringify([...t]))}catch{}}(s),s}let $t=class extends at{setConfig(t){this._config={...t}}_emit(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_valueChanged(t,e){const s=e.target;let i=s.value;"number"===s.type&&(i=""===i?void 0:Number(i));const r={...this._config,[t]:i};""!==i&&void 0!==i||delete r[t],this._config=r,this._emit(r)}_sensorOptions(t){return this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&e.endsWith(t)):[]}render(){if(!this._config)return V;const t=this._sensorOptions("_channels"),e=this._sensorOptions("_current_programme");return B`
      <div class="form">
        <label>
          <span>Title</span>
          <input
            type="text"
            .value=${this._config.title??"TV Guide"}
            @input=${t=>this._valueChanged("title",t)}
          />
        </label>

        <label>
          <span>Visible rows</span>
          <input
            type="number"
            min="1"
            max="30"
            .value=${String(this._config.rows??8)}
            @input=${t=>this._valueChanged("rows",t)}
          />
        </label>

        <label>
          <span>Hours visible</span>
          <input
            type="number"
            min="1"
            max="12"
            .value=${String(this._config.hours??3)}
            @input=${t=>this._valueChanged("hours",t)}
          />
        </label>

        <label>
          <span>Time tick (minutes)</span>
          <input
            type="number"
            min="10"
            max="60"
            step="5"
            .value=${String(this._config.slot_minutes??30)}
            @input=${t=>this._valueChanged("slot_minutes",t)}
          />
        </label>

        <label>
          <span>Channels sensor (optional)</span>
          <select
            @change=${t=>this._valueChanged("channels_entity",t)}
          >
            <option value="">Auto-detect</option>
            ${t.map(t=>B`<option
                value=${t}
                ?selected=${this._config.channels_entity===t}
              >
                ${t}
              </option>`)}
          </select>
        </label>

        <label>
          <span>Current-programme sensor (optional)</span>
          <select
            @change=${t=>this._valueChanged("current_entity",t)}
          >
            <option value="">Auto-detect</option>
            ${e.map(t=>B`<option
                value=${t}
                ?selected=${this._config.current_entity===t}
              >
                ${t}
              </option>`)}
          </select>
        </label>
      </div>
    `}};var yt;$t.styles=n`
    .form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color, #fff);
    }
    label span {
      color: var(--secondary-text-color, #9e9e9e);
      font-size: 0.8rem;
    }
    input,
    select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color, #fff);
      font-size: 0.9rem;
    }
  `,t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([ut()],$t.prototype,"_config",void 0),$t=t([lt("openwebif-control-card-editor")],$t);const xt="openwebif_control",At="undefined"!=typeof document?document.createElement("textarea"):null;function St(t){return t?At?(At.innerHTML=t,At.value):t:""}let Et=yt=class extends at{constructor(){super(...arguments),this._bouquet="",this._bouquetInitialised=!1,this._favs=new Set,this._epg=new Map,this._loadingEpg=!1,this._windowStart=0,this._epgBouquetLoaded="",this._epgLoadingKey="",this._epgCache=new Map,this._lastSig=""}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={rows:8,hours:3,slot_minutes:30,title:"TV Guide",...t}}static getConfigElement(){return document.createElement("openwebif-control-card-editor")}static getStubConfig(){return{type:"custom:openwebif-control-card",title:"TV Guide"}}getCardSize(){return(this._config?.rows||8)+2}connectedCallback(){super.connectedCallback(),this._favs=function(){try{const t=localStorage.getItem(mt);if(!t)return new Set;const e=JSON.parse(t);return new Set(Array.isArray(e)?e:[])}catch{return new Set}}();const t=Math.floor(Date.now()/1e3);this._windowStart=t-t%1800}_relevantSig(){const t=this._channelsEntityId(),e=this._currentEntityId(),s=this._recordingsEntityId(),i=t?this.hass.states[t]:void 0,r=e?this.hass.states[e]:void 0,o=s?this.hass.states[s]:void 0;return[i?.state,i?.attributes.channels?.length,r?.attributes.service_reference,o?.state,this._bouquet,this._loadingEpg?"L":"",this._epg.size,this._selected?`${this._selected.sref}:${this._selected.begin}`:"",!!this.hass.themes?.darkMode].join("|")}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("_bouquet")||t.has("_selected")||t.has("_epg")||t.has("_loadingEpg")||t.has("_favs")||t.has("_windowStart"))return this._lastSig=this._relevantSig(),!0;if(t.has("hass")){const t=this._relevantSig();return t!==this._lastSig&&(this._lastSig=t,!0)}return!0}willUpdate(t){!this._bouquetInitialised&&this.hass&&this._allChannels().length&&this._ensureDefaultBouquet()}updated(t){(t.has("_bouquet")||!this._epgBouquetLoaded&&this._bouquet&&"__rec__"!==this._bouquet&&this._allChannels().length)&&this._loadEpg()}_channelsEntityId(){return this._config.channels_entity?this._config.channels_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_channels"))}_currentEntityId(){return this._config.current_entity?this._config.current_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_current_programme"))}_allChannels(){const t=this._channelsEntityId();return t&&this.hass.states[t]&&this.hass.states[t].attributes.channels||[]}_bouquets(){const t=new Set;for(const e of this._allChannels())e.bouquet&&t.add(e.bouquet);return Array.from(t).sort()}_ensureDefaultBouquet(){if(this._bouquetInitialised)return;const t=this._bouquets();if(!t.length)return;const e=t.find(t=>!/all channels/i.test(t)&&!/last scanned/i.test(t))||t[0];this._bouquet=e,this._bouquetInitialised=!0}_visibleChannels(){let t=this._allChannels();return"__fav__"===this._bouquet?t=t.filter(t=>this._favs.has(t.sref)):this._bouquet&&(t=t.filter(t=>t.bouquet===this._bouquet)),t}_currentSref(){const t=this._currentEntityId();return t?this.hass.states[t]?.attributes?.service_reference:void 0}_recordingsEntityId(){return Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_recordings"))}_recordings(){const t=this._recordingsEntityId();return t&&this.hass.states[t]&&this.hass.states[t].attributes.recordings||[]}_bouquetRefs(){const t=this._channelsEntityId();return t&&this.hass.states[t]?.attributes?.bouquet_refs||{}}_epgBouquetRefs(){const t=this._bouquetRefs(),e=Object.keys(t);if(this._bouquet&&"__fav__"!==this._bouquet)return t[this._bouquet]?[t[this._bouquet]]:[];if("__fav__"===this._bouquet){const e=new Set;for(const t of this._allChannels())this._favs.has(t.sref)&&t.bouquet&&e.add(t.bouquet);const s=[...e].filter(e=>!/all channels/i.test(e)&&t[e]);return s.map(e=>t[e])}const s=e.find(t=>!/all channels/i.test(t)&&!/last scanned/i.test(t));return s?[t[s]]:e.length?[t[e[0]]]:[]}async _loadEpg(){if("__rec__"===this._bouquet)return;const t=this._epgBouquetRefs();if(!t.length)return this._epg=new Map,this._epgBouquetLoaded="",void(this._loadingEpg=!1);const e=t.join("|"),s=this._epgCache.get(e);if(s&&Date.now()-s.at<yt.EPG_TTL_MS)return this._epg=s.data,this._epgBouquetLoaded=e,void(this._loadingEpg=!1);if((e!==this._epgBouquetLoaded||!this._epg.size||this._loadingEpg)&&(!this._loadingEpg||this._epgLoadingKey!==e)){this._loadingEpg=!0,this._epgLoadingKey=e;try{const s=new Map,i=await Promise.all(t.map(t=>this.hass.callService(xt,"get_epg",{bouquet_reference:t,hours:this._config.hours||3},void 0,!1,!0).catch(()=>{}))),r=new Set;for(const t of i){const e=t?.response?.events||t?.events||[];for(const t of e){if(!t.sref)continue;const e=`${t.sref}:${t.begin}`;if(r.has(e))continue;r.add(e),t.title=St(t.title),t.shortdesc&&(t.shortdesc=St(t.shortdesc));const i=s.get(t.sref)||[];i.push(t),s.set(t.sref,i)}}for(const t of s.values())t.sort((t,e)=>t.begin-e.begin);this._epg=s,this._epgBouquetLoaded=e,this._epgCache.set(e,{at:Date.now(),data:s})}catch(t){console.error("openwebif-control-card: get_epg failed",t)}finally{this._loadingEpg=!1,this._epgLoadingKey=""}}}async _zap(t){try{await this.hass.callService(xt,"zap",{service_reference:t})}catch(t){console.error("openwebif-control-card: zap failed",t)}}async _record(t){if(null!=t.id)try{await this.hass.callService(xt,"add_timer",{service_reference:t.sref,event_id:t.id})}catch(t){console.error("openwebif-control-card: add_timer failed",t)}}_toggleFav(t,e){e.stopPropagation(),this._favs=wt(this._favs,t)}_onPiconLoad(t,e){const s=t.target;s.classList.add("loaded"),s.src&&function(t,e){gt.set(t,e)}(e,s.src)}_onPiconError(t,e,s,i){const r=t.target;if(i+1<s.length)r.dataset.idx=String(i+1),r.src=s[i+1];else{!function(t){_t.add(t)}(e),r.classList.add("failed");const t=r.parentElement;t&&t.classList.add("no-picon")}}render(){if(!this._config||!this.hass)return V;if(!this._channelsEntityId())return B`<ha-card
        ><div class="empty">
          No OpenWebif Control channels sensor found. Install and configure the
          <a href="https://github.com/kevpatts/OpenWebif-control"
            >OpenWebif Control</a
          >
          integration (v0.2.0+).
        </div></ha-card
      >`;const t=this._visibleChannels(),e=!!this.hass.themes?.darkMode,s=this._currentSref(),i=this._config.rows||8,r=this._config.hours||3,o=this._config.slot_minutes||30,n=60*r*6,a=(Math.floor(Date.now()/1e3)-this._windowStart)/60*6;return B`
      <ha-card>
        <div class="topbar">
          <div class="title">${this._config.title}</div>
          <div class="tabs">
            <button
              class="tab ${"__fav__"===this._bouquet?"active":""}"
              @click=${()=>this._bouquet="__fav__"}
              title="Favourites"
            >
              ★ Favourites
            </button>
            <button
              class="tab ${"__rec__"===this._bouquet?"active":""}"
              @click=${()=>this._bouquet="__rec__"}
              title="Recordings"
            >
              📼 Recordings
            </button>
            ${this._bouquets().map(t=>B`<button
                class="tab ${this._bouquet===t?"active":""}"
                @click=${()=>this._bouquet=t}
                title=${t}
              >
                ${t.replace(/ - All channels$/,"")}
              </button>`)}
          </div>
        </div>

        ${"__rec__"===this._bouquet?this._renderRecordings():this._renderGuideBlock(t,e,s,i,r,o,n,a)}
        ${this._selected?this._renderDetail(this._selected):V}
      </ha-card>
    `}_renderGuideBlock(t,e,s,i,r,o,n,a){return B`
        <div class="timeline-controls">
          <button
            class="nav"
            @click=${()=>this._windowStart-=60*o}
            title="Earlier"
          >
            ‹
          </button>
          <span class="range"
            >${this._fmtTime(this._windowStart)} –
            ${this._fmtTime(this._windowStart+3600*r)}</span
          >
          <button
            class="nav"
            @click=${()=>this._windowStart+=60*o}
            title="Later"
          >
            ›
          </button>
          ${this._loadingEpg?B`<span class="loading">loading guide…</span>`:V}
        </div>

        <div
          class="guide"
          style="--rows:${i}; --row-h:${56}px; max-height:${56*i+24}px"
        >
          <!-- one scroll container: header row + channel rows share the same
               horizontal + vertical scroll -->
          <div class="scroller" style="--track-w:${n}px">
            <!-- sticky time header, scrolls horizontally with the tracks -->
            <div class="time-header">
              <div class="corner"></div>
              <div class="ticks" style="width:${n}px">
                ${this._timeTicks(r,o)}
              </div>
            </div>

            ${0===t.length?B`<div class="empty">
                  ${"__fav__"===this._bouquet?"No favourites yet — tap the ☆ on a channel to add one.":"No channels."}
                </div>`:B`<div class="rows">
                  ${a>=0&&a<=n?B`<div
                        class="nowline"
                        style="left:calc(var(--chan-w) + ${a}px)"
                      ></div>`:V}
                  ${t.map(t=>this._renderRow(t,e,t.sref===s,n))}
                </div>`}
          </div>
        </div>
    `}_parseLength(t){if(!t)return 0;const e=t.split(":").map(t=>parseInt(t,10));return e.some(t=>isNaN(t))?0:2===e.length?60*e[0]+e[1]:3===e.length?3600*e[0]+60*e[1]+e[2]:0}_fmtDuration(t){if(!t)return"";const e=Math.floor(t/3600),s=Math.floor(t%3600/60),i=t%60,r=t=>String(t).padStart(2,"0");return e?`${e}:${r(s)}:${r(i)}`:`${s}:${r(i)}`}async _playRecording(t,e){if(t.serviceref)try{await this.hass.callService(xt,"play_recording",{service_reference:t.serviceref,...null!=e?{position_percent:Math.round(e)}:{}})}catch(t){console.error("openwebif-control-card: play_recording failed",t)}}_scrubPct(t){const e=t.currentTarget.getBoundingClientRect();return Math.max(0,Math.min(100,(t.clientX-e.left)/e.width*100))}_onScrubberMove(t){const e=t.currentTarget.querySelector(".rec-scrub-fill");e&&(e.style.width=`${this._scrubPct(t)}%`)}_onScrubberClick(t,e){this._playRecording(e,this._scrubPct(t))}_renderRecordings(){const t=this._recordings();return t.length?B`
      <div class="rec-list">
        ${t.map(t=>{const e=this._parseLength(t.length);return B`<div class="rec-row">
            <div class="rec-info">
              <div class="rec-title" title=${t.name||""}>${t.name}</div>
              <div class="rec-meta">
                ${[t.channel,t.begin,t.size].filter(Boolean).join(" · ")}
              </div>
              ${t.description?B`<div class="rec-desc">${t.description}</div>`:V}
            </div>
            <div class="rec-scrub-wrap">
              <button
                class="rec-play"
                title="Play from start"
                @click=${()=>this._playRecording(t,0)}
                ?disabled=${!t.serviceref}
              >
                ▶
              </button>
              <div
                class="rec-scrubber"
                title="Click to start playback from that point"
                @mousemove=${t=>this._onScrubberMove(t)}
                @click=${e=>this._onScrubberClick(e,t)}
              >
                <div class="rec-scrub-fill"></div>
                <div class="rec-scrub-dur">${this._fmtDuration(e)}</div>
              </div>
            </div>
          </div>`})}
      </div>
    `:B`<div class="empty">No recordings found.</div>`}_renderRow(t,e,s,i){var r;const o=(r=t.name,_t.has(r))?[]:vt(t.name,e),n=function(t){return gt.get(t)}(t.name),a=n?[n,...o.filter(t=>t!==n)]:o,c=this._epg.get(t.sref)||[],l=this._favs.has(t.sref);return B`
      <div class="row ${s?"active":""}">
        <div class="chan" @click=${()=>this._zap(t.sref)}>
          <button
            class="star ${l?"on":""}"
            @click=${e=>this._toggleFav(t.sref,e)}
            title=${l?"Remove favourite":"Add favourite"}
          >
            ${l?"★":"☆"}
          </button>
          <div class="chan-logo ${a.length?"":"no-picon"}">
            ${a.length?B`<img
                  src=${a[0]}
                  data-idx="0"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  @load=${e=>this._onPiconLoad(e,t.name)}
                  @error=${e=>this._onPiconError(e,t.name,a,0)}
                />`:V}
            <span class="chan-fallback">${t.name}</span>
          </div>
        </div>
        <div class="track" style="width:${i}px">
          ${c.map(t=>this._renderEvent(t,i))}
        </div>
      </div>
    `}_renderEvent(t,e){const s=6*((t.begin-this._windowStart)/60),i=6*(t.duration/60);if(s+i<0||s>e)return V;const r=Math.max(0,s),o=Math.min(i+Math.min(0,s),e),n=this._selected?.id===t.id&&this._selected?.sref===t.sref;return B`
      <button
        class="event ${n?"selected":""}"
        style="left:${r}px; width:${Math.max(o,12)}px"
        @click=${()=>this._selected=t}
        title=${t.title}
      >
        <span class="ev-time">${this._fmtTime(t.begin)}</span>
        <span class="ev-title">${t.title}</span>
      </button>
    `}_renderDetail(t){return B`
      <div class="detail">
        <div class="detail-main">
          <div class="detail-time">
            ${this._fmtTime(t.begin)} –
            ${this._fmtTime(t.begin+t.duration)} · ${t.sname}
          </div>
          <div class="detail-title">${t.title}</div>
          ${t.shortdesc?B`<div class="detail-desc">${t.shortdesc}</div>`:V}
        </div>
        <div class="detail-actions">
          <button @click=${()=>this._zap(t.sref)}>Watch</button>
          ${null!=t.id?B`<button @click=${()=>this._record(t)}>Record</button>`:V}
          <button class="ghost" @click=${()=>this._selected=void 0}>
            Close
          </button>
        </div>
      </div>
    `}_timeTicks(t,e){const s=[],i=60*t/e;for(let t=0;t<=i;t++){const i=this._windowStart+t*e*60;s.push(B`<span
          class="tick"
          style="left:${t*e*6}px"
          >${this._fmtTime(i)}</span
        >`)}return s}_fmtTime(t){return new Date(1e3*t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}};Et.EPG_TTL_MS=3e5,Et.styles=n`
    :host {
      --owc-radius: 10px;
      --owc-accent: var(--primary-color, #03a9f4);
      --owc-text: var(--primary-text-color, #fff);
      --owc-subtle: var(--secondary-text-color, #9e9e9e);
      --owc-tile-bg: var(--card-background-color, #1c1c1c);
      --owc-border: var(--divider-color, rgba(255, 255, 255, 0.1));
      --chan-w: 128px;
    }
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .tab {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-border);
      background: transparent;
      color: var(--owc-subtle);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tab:hover {
      color: var(--owc-text);
    }
    .tab.active {
      background: var(--owc-accent);
      border-color: var(--owc-accent);
      color: var(--text-primary-color, #fff);
    }
    .timeline-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      color: var(--owc-subtle);
      font-size: 0.85rem;
    }
    .nav {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
    }
    .loading {
      font-style: italic;
    }
    .guide {
      overflow: auto;
      position: relative;
    }
    .scroller {
      position: relative;
      width: calc(var(--chan-w) + var(--track-w));
    }
    .time-header {
      display: flex;
      position: sticky;
      top: 0;
      z-index: 5;
      height: 22px;
      background: var(--card-background-color, #161b22);
      border-bottom: 1px solid var(--owc-border);
    }
    .corner {
      width: var(--chan-w);
      min-width: var(--chan-w);
      position: sticky;
      left: 0;
      z-index: 6;
      background: var(--card-background-color, #161b22);
      border-right: 1px solid var(--owc-border);
    }
    .ticks {
      position: relative;
      height: 100%;
    }
    .tick {
      position: absolute;
      top: 4px;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      transform: translateX(-2px);
    }
    .rows {
      position: relative;
    }
    .row {
      display: flex;
      height: var(--row-h);
      border-bottom: 1px solid var(--owc-border);
    }
    .row.active .chan {
      box-shadow: inset 3px 0 0 var(--owc-accent);
    }
    .chan {
      width: var(--chan-w);
      min-width: var(--chan-w);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px;
      cursor: pointer;
      position: sticky;
      left: 0;
      /* Above the now-line so the line disappears behind the channel column. */
      z-index: 4;
      background: var(--owc-tile-bg);
      border-right: 1px solid var(--owc-border);
    }
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      color: var(--owc-subtle);
      padding: 0;
      line-height: 1;
    }
    .star.on {
      color: gold;
    }
    .chan-logo {
      position: relative;
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .chan-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      /* Hidden until it successfully decodes, so no broken-image flash. */
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .chan-logo img.loaded {
      opacity: 1;
    }
    .chan-logo img.failed {
      display: none;
    }
    .chan-fallback {
      display: none;
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--owc-text);
      text-align: center;
    }
    /* Show the text tile only when there is genuinely no picon. */
    .chan-logo.no-picon .chan-fallback {
      display: block;
    }
    .track {
      position: relative;
      height: 100%;
    }
    .event {
      position: absolute;
      top: 4px;
      bottom: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding: 2px 8px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      cursor: pointer;
      overflow: hidden;
      text-align: left;
      font: inherit;
      transition: border-color 0.12s ease, background 0.12s ease;
    }
    .event:hover {
      border-color: var(--owc-accent);
    }
    .event.selected {
      border-color: var(--owc-accent);
      box-shadow: 0 0 0 1px var(--owc-accent) inset;
    }
    .ev-time {
      font-size: 0.65rem;
      color: var(--owc-subtle);
    }
    .ev-title {
      font-size: 0.78rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nowline {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--owc-accent);
      /* Below the sticky channel column (z 4) but above event tiles. */
      z-index: 1;
      pointer-events: none;
    }
    .detail {
      margin-top: 10px;
      padding: 12px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .detail-time {
      font-size: 0.75rem;
      color: var(--owc-subtle);
      margin-bottom: 4px;
    }
    .detail-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .detail-desc {
      margin-top: 6px;
      font-size: 0.85rem;
      color: var(--owc-subtle);
      max-width: 640px;
    }
    .detail-actions {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .detail-actions button {
      padding: 8px 16px;
      border-radius: 999px;
      border: none;
      background: var(--owc-accent);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font-size: 0.85rem;
    }
    .detail-actions button.ghost {
      background: transparent;
      border: 1px solid var(--owc-border);
      color: var(--owc-subtle);
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--owc-subtle);
    }
    .rec-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 2px;
    }
    .rec-row {
      border: 1px solid var(--owc-border);
      border-radius: var(--owc-radius);
      background: var(--owc-tile-bg);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .rec-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .rec-title {
      font-weight: 600;
      color: var(--owc-text);
    }
    .rec-meta {
      font-size: 0.72rem;
      color: var(--owc-subtle);
    }
    .rec-desc {
      font-size: 0.8rem;
      color: var(--owc-subtle);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .rec-scrub-wrap {
      display: flex;
      align-items: stretch;
      gap: 10px;
    }
    .rec-play {
      flex: 0 0 auto;
      width: 38px;
      border-radius: 8px;
      border: none;
      background: var(--owc-accent);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font-size: 0.9rem;
    }
    .rec-play[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    /* The scrubber represents the original recorded timeline. Click anywhere
       to start playback from roughly that point. */
    .rec-scrubber {
      position: relative;
      flex: 1;
      height: 38px;
      border-radius: 8px;
      background: linear-gradient(
        var(--owc-border),
        var(--owc-border)
      );
      background-color: rgba(127, 127, 127, 0.12);
      cursor: pointer;
      overflow: hidden;
      border: 1px solid var(--owc-border);
    }
    .rec-scrubber:hover .rec-scrub-fill {
      opacity: 0.35;
    }
    .rec-scrub-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0;
      background: var(--owc-accent);
      opacity: 0;
      transition: opacity 0.12s ease;
    }
    .rec-scrubber:hover::after {
      /* subtle progress preview handled by fill; keep marker simple */
    }
    .rec-scrub-dur {
      position: absolute;
      right: 8px;
      bottom: 4px;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      pointer-events: none;
    }
    a {
      color: var(--owc-accent);
    }
  `,t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([ut()],Et.prototype,"_config",void 0),t([ut()],Et.prototype,"_bouquet",void 0),t([ut()],Et.prototype,"_favs",void 0),t([ut()],Et.prototype,"_epg",void 0),t([ut()],Et.prototype,"_loadingEpg",void 0),t([ut()],Et.prototype,"_selected",void 0),t([ut()],Et.prototype,"_windowStart",void 0),Et=yt=t([lt("openwebif-control-card")],Et),window.customCards=window.customCards||[],window.customCards.push({type:"openwebif-control-card",name:"OpenWebif Control Card",description:"Sky Q-style EPG timeline grid for Enigma2/OpenWebif receivers (companion to the OpenWebif Control integration).",preview:!0,documentation:"https://github.com/kevpatts/OpenWebif-control-card"}),console.info("%c OPENWEBIF-CONTROL-CARD %c v0.4.0 ","background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px","background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");export{Et as OpenWebifControlCard};
