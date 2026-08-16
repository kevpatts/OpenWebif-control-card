function t(t,e,s,r){var i,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(o<3?i(n):o>3?i(e,s,n):i(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(e,t))}return t}toString(){return this.cssText}};const n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,b=u.trustedTypes,f=b?b.emptyScript:"",g=u.reactiveElementPolyfillSupport,v=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);void 0!==r&&c(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:i}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);i?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(s)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of r){const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=s.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(void 0!==r&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=s.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=r;const o=i.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){if(void 0!==t){const o=this.constructor;if(!1===r&&(i=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??_)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==i||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,s,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,g?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,x=w.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,O=document,U=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,q=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,W=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),L=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,F=O.createTreeWalker(O,129);function K(t,e){if(!q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,r=[];let i,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===N?"!--"===c[1]?n=H:void 0!==c[1]?n=R:void 0!==c[2]?(W.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=i??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?D:z):n===D||n===z?n=j:n===H||n===R?n=N:(n=j,i=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===N?s+P:l>=0?(r.push(a),s.slice(0,l)+S+s.slice(l)+k+d):s+k+(-2===l?e:d)}return[K(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Z{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,o=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(S)){const e=l[o++],s=r.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),r.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:i}),r.removeAttribute(t));if(W.test(r.tagName)){const t=r.textContent.split(k),e=t.length-1;if(e>0){r.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],U()),F.nextNode(),a.push({type:2,index:++i});r.append(t[e],U())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(k,t+1));)a.push({type:7,index:i}),t+=k.length-1}i++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,r){if(e===L)return e;let i=void 0!==r?s._$Co?.[r]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(t),i._$AT(t,s,r)),void 0!==r?(s._$Co??=[])[r]=i:s._$Cl=i),void 0!==i&&(e=Q(t,i._$AS(t,e.values),i,r)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??O).importNode(e,!0);F.currentNode=r;let i=F.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new rt(i,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(i=F.nextNode(),o++)}return F.currentNode=O,r}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>q(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Y(r,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const i of t)r===e.length?e.push(s=new G(this.O(U()),this.O(U()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,r){const i=this.strings;let o=!1;if(void 0===i)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const r=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=Q(this,r[s+n],e,n),a===L&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends X{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??B)===L)return;const s=this._$AH,r=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==B&&(s===B||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const it=w.litHtmlPolyfillSupport;it?.(Z,G),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const r=s?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=s?.renderBefore??null;r._$litPart$=i=new G(e.insertBefore(U(),t),t,void 0,s??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_},lt=(t=ct,e,s)=>{const{kind:r,metadata:i}=s;let o=globalThis.litPropertyMetadata.get(i);if(void 0===o&&globalThis.litPropertyMetadata.set(i,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===r){const{name:r}=s;return{set(s){const i=e.get.call(this);e.set.call(this,s),this.requestUpdate(r,i,t,!0,s)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=s;return function(s){const i=this[r];e.call(this,s),this.requestUpdate(r,i,t,!0,s)}}throw Error("Unsupported decorator location: "+r)};function ht(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const r=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),r?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function dt(t){return ht({...t,state:!0,attribute:!1})}const pt={"4seven":"4seven","5action":"5action","5hd":"channel5","5plus1":"channel5plus1","5select":"5select","5star":"5star","5starplus1":"5starplus1","5usa":"5usa","5usaplus1":"5usaplus1",aljazeeraeng:"aljazeera",arirangtv:"arirang",bbcalbahd:"bbcalba",bbcasiannet:"bbcradioasiannetwork",bbcfourhd:"bbcfour",bbcnewshd:"bbcnews",bbconecihd:"bbcone",bbconeeasthd:"bbcone",bbconeemidhd:"bbcone",bbconelonhd:"bbcone",bbconenehd:"bbcone",bbconenihd:"bbconenorthernireland",bbconenwhd:"bbcone",bbconescothd:"bbconescotland",bbconesehd:"bbcone",bbconesohd:"bbcone",bbconeswhd:"bbcone",bbconewalhd:"bbconewales",bbconewmhd:"bbcone",bbconewsthd:"bbcone",bbconeykshd:"bbcone",bbcparlhd:"bbcparliament",bbcr1:"bbcradio1",bbcr1x:"bbcradio1xtra",bbcr2:"bbcradio2",bbcr3:"bbcradio3",bbcr4:"bbcradio4",bbcr5l:"bbcradio5live",bbcr5sx:"bbcradio5sportsextra",bbcr6music:"bbcradio6music",bbcradio4ex:"bbcradio4extra",bbcrb1hd:"bbcredbutton",bbcrcymru:"bbcradiocymru",bbcrcymru2:"bbcradiocymru2",bbcrfoyle:"bbcradiofoyle",bbcrlondon:"bbcradiolondon",bbcrngaid:"bbcradionangaidheal",bbcrscot:"bbcradioscotland",bbcrulster:"bbcradioulster",bbcrwales:"bbcradiowales",bbcscothd:"bbcscotland",bbcthreehd:"bbcthree",bbctwohd:"bbctwo",bbctwonihd:"bbctwonorthernireland",bbctwowalhd:"bbctwowales",bbcworldsv:"bbcradioworldservice",bfbsradio:"bfbsuk",blaze:"blaze",bloomberghd:"bloomberg",capital:"capitalfm",capitalxtra:"capitalxtra",cbbchd:"bbccbbc",cbeebieshd:"bbccbeebies",challenge:"challenge",channel4hd:"channel4",channel4plus1:"channel4plus1",classicfm:"classicfm",cnbc:"cnbc",courttv:"courttv",cula4:"cula4",daystarhd:"daystartv",dmax:"dmax",dmaxplus1:"dmaxplus1",e4:"e4",e4extra:"e4extra",e4plus1:"e4plus1",film4:"filmfour",film4plus1:"filmfourplus1",foodnetwork:"foodnetwork",foodnetworkplus1:"foodnetworkplus1",france24eng:"france24",freesatinfo:"freesat",gbnewshd:"gbnews",godtv:"godtv",goldradio:"goldradio",heart:"heart",hobbymaker:"hobbymaker",idealworld:"idealworld",itv1londonhd:"itv1",itv1plus1london:"itv1plus1",itv2hd:"itv2",itv2plus1:"itv2plus1",itv3hd:"itv3",itv3plus1:"itv3plus1",itv4hd:"itv4",itv4plus1:"itv4plus1",jewellerymaker:"jewellerymaker",lbc:"lbc",legend:"legend",legendxtra:"legendxtra",legendxtraplus1:"legendxtraplus1",more4:"more4",more4plus1:"more4plus1",nhkworldjapan:"nhkworldjapan",pbsamerica:"pbsamerica",questhd:"quest",questplus1:"questplus1",questred:"questred",questredplus1:"questredplus1",qvcbeauty:"qvcbeauty",qvcextra:"qvcextra",qvchd:"qvchd",qvcstylehd:"qvcstylehd",radiox:"radiox-clivebesle",really:"really",revelation:"revelationtv",rte2:"rte2",rte2fm:"rte2fm",rte2plus1:"rte2plus1",rtegold:"rtegold",rtelyric:"rtelyricfm",rtelyricfm:"rtelyricfm",rtenews:"rtenews",rteone:"rteone",rteoneplus1:"rteoneplus1",rteradio1:"rteradio1",rteraidionagaeltachta:"rteraidionagaeltachta",rternag:"rteraidionagaeltachta",s4chd:"s4c",saorviewinformation:"saorview",skyarts:"skyarts",skymixhd:"skymix",skynews:"skynews",smoothradiouk:"smoothradio",sonlifetv:"sonlifetv",talkingpicstv:"talkingpicturestv",talksport:"talksport",tg4:"tg4",tg4plus1:"tg4plus1",thatstv:"thatstv",titheanoireachtais:"oireachtastv",tjchd:"tjc",tlchd:"tlc",tlcplus1:"tlcplus1",togethertv:"togethertv",trtworld:"trtworld",truecrime:"truecrime",truecrimeplus1:"truecrimeplus1",truecrimextr:"truecrimextra",virginmedia1:"virginmediaone",virginmedia2:"virginmediatwo",virginmedia3:"virginmediathree",virginmedia4:"virginmediafour",virginradio:"virginradio"};function ut(t,e){const s=function(t){const e=function(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\+1/g,"plus1").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}(t);return e?pt[e]?pt[e]:e.endsWith("plus1")&&pt[e.slice(0,-5)]?pt[e.slice(0,-5)]:e:null}(t);if(!s)return[];return(e?[".dark.svg",".default.svg",".default.png"]:[".default.svg",".light.svg",".default.png"]).map(t=>`https://cdn.jsdelivr.net/gh/picons/picons@master/build-source/logos/${s}${t}`)}let bt=class extends nt{constructor(){super(...arguments),this._filter="",this._bouquet=""}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={columns:4,show_search:!0,title:"TV",...t}}getCardSize(){return 8}_channelsEntityId(){return this._config.channels_entity?this._config.channels_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_channels"))}_currentEntityId(){return this._config.current_entity?this._config.current_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_current_programme"))}_channels(){const t=this._channelsEntityId();return t&&this.hass.states[t]&&this.hass.states[t].attributes.channels||[]}_bouquets(){const t=new Set;for(const e of this._channels())e.bouquet&&t.add(e.bouquet);return Array.from(t).sort()}_filtered(){let t=this._channels();if(this._bouquet&&(t=t.filter(t=>t.bouquet===this._bouquet)),this._filter){const e=this._filter.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e))}return t}_currentSref(){const t=this._currentEntityId(),e=t?this.hass.states[t]?.attributes:void 0;return e?.service_reference}_isDark(){return!!this.hass.themes?.darkMode}async _zap(t){try{await this.hass.callService("openwebif_control","zap",{service_reference:t.sref})}catch(t){console.error("openwebif-control-card: zap failed",t)}}_onPiconError(t,e,s){const r=t.target;s+1<e.length?(r.src=e[s+1],r.dataset.idx=String(s+1)):r.classList.add("failed")}render(){if(!this._config||!this.hass)return B;if(!this._channelsEntityId())return I`<ha-card
        ><div class="empty">
          No OpenWebif Control channels sensor found. Install and configure the
          <a href="https://github.com/kevpatts/OpenWebif-control"
            >OpenWebif Control</a
          >
          integration.
        </div></ha-card
      >`;const t=this._filtered(),e=this._currentSref(),s=this._bouquets(),r=this._isDark();return I`
      <ha-card>
        <div class="header">
          <div class="title">${this._config.title}</div>
          ${this._config.show_search?I`<input
                class="search"
                type="search"
                placeholder="Search channels…"
                .value=${this._filter}
                @input=${t=>this._filter=t.target.value}
              />`:B}
        </div>

        ${s.length>1?I`<div class="chips">
              <button
                class="chip ${""===this._bouquet?"active":""}"
                @click=${()=>this._bouquet=""}
              >
                All
              </button>
              ${s.map(t=>I`<button
                  class="chip ${this._bouquet===t?"active":""}"
                  @click=${()=>this._bouquet=t}
                  title=${t}
                >
                  ${t.replace(/ - All channels$/,"")}
                </button>`)}
            </div>`:B}

        <div
          class="grid"
          style="--owc-cols:${this._config.columns}"
        >
          ${t.map(t=>this._renderTile(t,t.sref===e,r))}
        </div>
        ${0===t.length?I`<div class="empty">No channels match.</div>`:B}
      </ha-card>
    `}_renderTile(t,e,s){const r=ut(t.name,s);return I`
      <button
        class="tile ${e?"active":""}"
        @click=${()=>this._zap(t)}
        title=${t.name}
      >
        <div class="logo">
          ${r.length?I`<img
                src=${r[0]}
                data-idx="0"
                loading="lazy"
                alt=${t.name}
                @error=${t=>this._onPiconError(t,r,0)}
              />`:B}
          <span class="fallback">${t.name}</span>
        </div>
        <div class="name">${t.name}</div>
      </button>
    `}};bt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new o(s,t,r)})`
    :host {
      --owc-gap: 10px;
      --owc-radius: 14px;
      --owc-tile-bg: var(--card-background-color, #1c1c1c);
      --owc-tile-border: var(--divider-color, rgba(255, 255, 255, 0.1));
      --owc-accent: var(--primary-color, #03a9f4);
      --owc-text: var(--primary-text-color, #fff);
      --owc-subtle: var(--secondary-text-color, #9e9e9e);
    }
    ha-card {
      padding: 16px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .search {
      flex: 0 1 220px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-tile-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      font-size: 0.9rem;
      outline: none;
    }
    .search:focus {
      border-color: var(--owc-accent);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-tile-border);
      background: transparent;
      color: var(--owc-subtle);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chip:hover {
      color: var(--owc-text);
    }
    .chip.active {
      background: var(--owc-accent);
      border-color: var(--owc-accent);
      color: var(--text-primary-color, #fff);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(var(--owc-cols, 4), 1fr);
      gap: var(--owc-gap);
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 14px 8px 10px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-tile-border);
      background: var(--owc-tile-bg);
      cursor: pointer;
      transition: transform 0.12s ease, border-color 0.12s ease,
        box-shadow 0.12s ease;
      color: var(--owc-text);
      font: inherit;
    }
    .tile:hover {
      transform: translateY(-2px);
      border-color: var(--owc-accent);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    }
    .tile.active {
      border-color: var(--owc-accent);
      box-shadow: 0 0 0 2px var(--owc-accent) inset;
    }
    .logo {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo img {
      max-width: 88%;
      max-height: 88%;
      object-fit: contain;
    }
    .logo img.failed {
      display: none;
    }
    .logo img.failed + .fallback,
    .logo:has(img.failed) .fallback {
      display: block;
    }
    .fallback {
      display: none;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: center;
      color: var(--owc-text);
      padding: 0 4px;
    }
    /* When no img at all, show fallback */
    .logo:not(:has(img)) .fallback {
      display: block;
    }
    .name {
      font-size: 0.72rem;
      color: var(--owc-subtle);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--owc-subtle);
    }
    a {
      color: var(--owc-accent);
    }
  `,t([ht({attribute:!1})],bt.prototype,"hass",void 0),t([dt()],bt.prototype,"_config",void 0),t([dt()],bt.prototype,"_filter",void 0),t([dt()],bt.prototype,"_bouquet",void 0),bt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("openwebif-control-card")],bt),window.customCards=window.customCards||[],window.customCards.push({type:"openwebif-control-card",name:"OpenWebif Control Card",description:"Sky Q-style channel grid for Enigma2/OpenWebif receivers (companion to the OpenWebif Control integration).",preview:!0,documentation:"https://github.com/kevpatts/OpenWebif-control-card"}),console.info("%c OPENWEBIF-CONTROL-CARD %c v0.3.0 ","background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px","background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");export{bt as OpenWebifControlCard};
