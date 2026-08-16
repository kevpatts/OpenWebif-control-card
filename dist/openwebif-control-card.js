function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,b=u.trustedTypes,f=b?b.emptyScript:"",g=u.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},m=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??m)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const y=globalThis,x=t=>t,A=y.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,q=document,O=()=>q.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,N=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,F=q.createTreeWalker(q,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===z?"!--"===c[1]?n=R:void 0!==c[1]?n=N:void 0!==c[2]?(I.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=o??z,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?D:H):n===D||n===H?n=j:n===R||n===N?n=z:(n=j,o=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===z?s+P:l>=0?(i.push(a),s.slice(0,l)+S+s.slice(l)+k+d):s+k+(-2===l?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=G.createElement(c,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=l[r++],s=i.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),F.nextNode(),a.push({type:2,index:++o});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=q.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??q).importNode(e,!0);F.currentNode=i;let o=F.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=q,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends Y{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===W)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=y.litHtmlPolyfillSupport;ot?.(G,X),(y.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(O(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:m},lt=(t=ct,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function dt(t){return ht({...t,state:!0,attribute:!1})}const pt={"4seven":"4seven","5action":"5action","5hd":"channel5","5plus1":"channel5plus1","5select":"5select","5star":"5star","5starplus1":"5starplus1","5usa":"5usa","5usaplus1":"5usaplus1",aljazeeraeng:"aljazeera",arirangtv:"arirang",bbcalbahd:"bbcalba",bbcasiannet:"bbcradioasiannetwork",bbcfourhd:"bbcfour",bbcnewshd:"bbcnews",bbconecihd:"bbcone",bbconeeasthd:"bbcone",bbconeemidhd:"bbcone",bbconelonhd:"bbcone",bbconenehd:"bbcone",bbconenihd:"bbconenorthernireland",bbconenwhd:"bbcone",bbconescothd:"bbconescotland",bbconesehd:"bbcone",bbconesohd:"bbcone",bbconeswhd:"bbcone",bbconewalhd:"bbconewales",bbconewmhd:"bbcone",bbconewsthd:"bbcone",bbconeykshd:"bbcone",bbcparlhd:"bbcparliament",bbcr1:"bbcradio1",bbcr1x:"bbcradio1xtra",bbcr2:"bbcradio2",bbcr3:"bbcradio3",bbcr4:"bbcradio4",bbcr5l:"bbcradio5live",bbcr5sx:"bbcradio5sportsextra",bbcr6music:"bbcradio6music",bbcradio4ex:"bbcradio4extra",bbcrb1hd:"bbcredbutton",bbcrcymru:"bbcradiocymru",bbcrcymru2:"bbcradiocymru2",bbcrfoyle:"bbcradiofoyle",bbcrlondon:"bbcradiolondon",bbcrngaid:"bbcradionangaidheal",bbcrscot:"bbcradioscotland",bbcrulster:"bbcradioulster",bbcrwales:"bbcradiowales",bbcscothd:"bbcscotland",bbcthreehd:"bbcthree",bbctwohd:"bbctwo",bbctwonihd:"bbctwonorthernireland",bbctwowalhd:"bbctwowales",bbcworldsv:"bbcradioworldservice",bfbsradio:"bfbsuk",blaze:"blaze",bloomberghd:"bloomberg",capital:"capitalfm",capitalxtra:"capitalxtra",cbbchd:"bbccbbc",cbeebieshd:"bbccbeebies",challenge:"challenge",channel4hd:"channel4",channel4plus1:"channel4plus1",classicfm:"classicfm",cnbc:"cnbc",courttv:"courttv",cula4:"cula4",daystarhd:"daystartv",dmax:"dmax",dmaxplus1:"dmaxplus1",e4:"e4",e4extra:"e4extra",e4plus1:"e4plus1",film4:"filmfour",film4plus1:"filmfourplus1",foodnetwork:"foodnetwork",foodnetworkplus1:"foodnetworkplus1",france24eng:"france24",freesatinfo:"freesat",gbnewshd:"gbnews",godtv:"godtv",goldradio:"goldradio",heart:"heart",hobbymaker:"hobbymaker",idealworld:"idealworld",itv1londonhd:"itv1",itv1plus1london:"itv1plus1",itv2hd:"itv2",itv2plus1:"itv2plus1",itv3hd:"itv3",itv3plus1:"itv3plus1",itv4hd:"itv4",itv4plus1:"itv4plus1",jewellerymaker:"jewellerymaker",lbc:"lbc",legend:"legend",legendxtra:"legendxtra",legendxtraplus1:"legendxtraplus1",more4:"more4",more4plus1:"more4plus1",nhkworldjapan:"nhkworldjapan",pbsamerica:"pbsamerica",questhd:"quest",questplus1:"questplus1",questred:"questred",questredplus1:"questredplus1",qvcbeauty:"qvcbeauty",qvcextra:"qvcextra",qvchd:"qvchd",qvcstylehd:"qvcstylehd",radiox:"radiox-clivebesle",really:"really",revelation:"revelationtv",rte2:"rte2",rte2fm:"rte2fm",rte2plus1:"rte2plus1",rtegold:"rtegold",rtelyric:"rtelyricfm",rtelyricfm:"rtelyricfm",rtenews:"rtenews",rteone:"rteone",rteoneplus1:"rteoneplus1",rteradio1:"rteradio1",rteraidionagaeltachta:"rteraidionagaeltachta",rternag:"rteraidionagaeltachta",s4chd:"s4c",saorviewinformation:"saorview",skyarts:"skyarts",skymixhd:"skymix",skynews:"skynews",smoothradiouk:"smoothradio",sonlifetv:"sonlifetv",talkingpicstv:"talkingpicturestv",talksport:"talksport",tg4:"tg4",tg4plus1:"tg4plus1",thatstv:"thatstv",titheanoireachtais:"oireachtastv",tjchd:"tjc",tlchd:"tlc",tlcplus1:"tlcplus1",togethertv:"togethertv",trtworld:"trtworld",truecrime:"truecrime",truecrimeplus1:"truecrimeplus1",truecrimextr:"truecrimextra",virginmedia1:"virginmediaone",virginmedia2:"virginmediatwo",virginmedia3:"virginmediathree",virginmedia4:"virginmediafour",virginradio:"virginradio"},ut=new Map,bt=new Map;function ft(t,e){const s=`${e?"d":"l"}:${t}`,i=ut.get(s);if(i)return i;const o=function(t){const e=function(t){return t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\+1/g,"plus1").replace(/\+/g,"plus").replace(/[^a-z0-9]/g,"")}(t);return e?pt[e]?pt[e]:e.endsWith("plus1")&&pt[e.slice(0,-5)]?pt[e.slice(0,-5)]:e:null}(t);if(!o)return ut.set(s,[]),[];const r=(e?[".dark.svg",".default.svg",".default.png"]:[".default.svg",".light.svg",".default.png"]).map(t=>`https://cdn.jsdelivr.net/gh/picons/picons@master/build-source/logos/${o}${t}`);return ut.set(s,r),r}const gt="owc-favourites";function vt(t,e){const s=new Set(t);return s.has(e)?s.delete(e):s.add(e),function(t){try{localStorage.setItem(gt,JSON.stringify([...t]))}catch{}}(s),s}const _t="openwebif_control";let mt=class extends nt{constructor(){super(...arguments),this._bouquet="",this._bouquetInitialised=!1,this._favs=new Set,this._epg=new Map,this._loadingEpg=!1,this._windowStart=0,this._epgBouquetLoaded=""}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={rows:8,hours:3,slot_minutes:30,title:"TV Guide",...t}}getCardSize(){return(this._config?.rows||8)+2}connectedCallback(){super.connectedCallback(),this._favs=function(){try{const t=localStorage.getItem(gt);if(!t)return new Set;const e=JSON.parse(t);return new Set(Array.isArray(e)?e:[])}catch{return new Set}}();const t=Math.floor(Date.now()/1e3);this._windowStart=t-t%1800}updated(t){(t.has("hass")||t.has("_bouquet"))&&this._loadEpg()}_channelsEntityId(){return this._config.channels_entity?this._config.channels_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_channels"))}_currentEntityId(){return this._config.current_entity?this._config.current_entity:Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_current_programme"))}_allChannels(){const t=this._channelsEntityId();return t&&this.hass.states[t]&&this.hass.states[t].attributes.channels||[]}_bouquets(){const t=new Set;for(const e of this._allChannels())e.bouquet&&t.add(e.bouquet);return Array.from(t).sort()}_ensureDefaultBouquet(){if(this._bouquetInitialised)return;const t=this._bouquets();if(!t.length)return;const e=t.find(t=>!/all channels/i.test(t)&&!/last scanned/i.test(t))||t[0];this._bouquet=e,this._bouquetInitialised=!0}_visibleChannels(){let t=this._allChannels();return"__fav__"===this._bouquet?t=t.filter(t=>this._favs.has(t.sref)):this._bouquet&&(t=t.filter(t=>t.bouquet===this._bouquet)),t}_currentSref(){const t=this._currentEntityId();return t?this.hass.states[t]?.attributes?.service_reference:void 0}_bouquetRefs(){const t=this._channelsEntityId();return t&&this.hass.states[t]?.attributes?.bouquet_refs||{}}_epgBouquetRefs(){const t=this._bouquetRefs(),e=Object.keys(t);if(this._bouquet&&"__fav__"!==this._bouquet)return t[this._bouquet]?[t[this._bouquet]]:[];if("__fav__"===this._bouquet){const e=new Set;for(const t of this._allChannels())this._favs.has(t.sref)&&t.bouquet&&e.add(t.bouquet);const s=[...e].filter(e=>!/all channels/i.test(e)&&t[e]);return s.map(e=>t[e])}const s=e.find(t=>!/all channels/i.test(t)&&!/last scanned/i.test(t));return s?[t[s]]:e.length?[t[e[0]]]:[]}async _loadEpg(){const t=this._epgBouquetRefs();if(!t.length||this._loadingEpg)return;const e=t.join("|");if(e!==this._epgBouquetLoaded){this._loadingEpg=!0,this._epgBouquetLoaded=e;try{const e=new Map,s=await Promise.all(t.map(t=>this.hass.callService(_t,"get_epg",{bouquet_reference:t,hours:this._config.hours||3},void 0,!1,!0).catch(()=>{}))),i=new Set;for(const t of s){const s=t?.response?.events||t?.events||[];for(const t of s){if(!t.sref)continue;const s=`${t.sref}:${t.begin}`;if(i.has(s))continue;i.add(s);const o=e.get(t.sref)||[];o.push(t),e.set(t.sref,o)}}for(const t of e.values())t.sort((t,e)=>t.begin-e.begin);this._epg=e}catch(t){console.error("openwebif-control-card: get_epg failed",t)}finally{this._loadingEpg=!1}}}async _zap(t){try{await this.hass.callService(_t,"zap",{service_reference:t})}catch(t){console.error("openwebif-control-card: zap failed",t)}}async _record(t){if(null!=t.id)try{await this.hass.callService(_t,"add_timer",{service_reference:t.sref,event_id:t.id})}catch(t){console.error("openwebif-control-card: add_timer failed",t)}}_toggleFav(t,e){e.stopPropagation(),this._favs=vt(this._favs,t)}_onPiconLoad(t,e){const s=t.target;s.src&&function(t,e){bt.set(t,e)}(e,s.src)}_onPiconError(t,e,s){const i=t.target;s+1<e.length?i.src=e[s+1]:i.classList.add("failed")}render(){if(!this._config||!this.hass)return B;if(!this._channelsEntityId())return L`<ha-card
        ><div class="empty">
          No OpenWebif Control channels sensor found. Install and configure the
          <a href="https://github.com/kevpatts/OpenWebif-control"
            >OpenWebif Control</a
          >
          integration (v0.2.0+).
        </div></ha-card
      >`;this._ensureDefaultBouquet();const t=this._visibleChannels(),e=!!this.hass.themes?.darkMode,s=this._currentSref(),i=this._config.rows||8,o=this._config.hours||3,r=this._config.slot_minutes||30,n=60*o*6,a=(Math.floor(Date.now()/1e3)-this._windowStart)/60*6;return L`
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
            ${this._bouquets().map(t=>L`<button
                class="tab ${this._bouquet===t?"active":""}"
                @click=${()=>this._bouquet=t}
                title=${t}
              >
                ${t.replace(/ - All channels$/,"")}
              </button>`)}
          </div>
        </div>

        <div class="timeline-controls">
          <button
            class="nav"
            @click=${()=>this._windowStart-=60*r}
            title="Earlier"
          >
            ‹
          </button>
          <span class="range"
            >${this._fmtTime(this._windowStart)} –
            ${this._fmtTime(this._windowStart+3600*o)}</span
          >
          <button
            class="nav"
            @click=${()=>this._windowStart+=60*r}
            title="Later"
          >
            ›
          </button>
          ${this._loadingEpg?L`<span class="loading">loading guide…</span>`:B}
        </div>

        <div class="guide" style="--rows:${i}; --row-h:${56}px">
          <!-- time header -->
          <div class="time-header" style="width:${n}px">
            ${this._timeTicks(o,r)}
          </div>

          <!-- scrollable body -->
          <div class="body" style="max-height:${56*i}px">
            ${0===t.length?L`<div class="empty">
                  ${"__fav__"===this._bouquet?"No favourites yet — tap the ☆ on a channel to add one.":"No channels."}
                </div>`:t.map(t=>this._renderRow(t,e,t.sref===s,n))}
            ${a>=0&&a<=n?L`<div
                  class="nowline"
                  style="left:calc(var(--chan-w) + ${a}px)"
                ></div>`:B}
          </div>
        </div>

        ${this._selected?this._renderDetail(this._selected):B}
      </ha-card>
    `}_renderRow(t,e,s,i){const o=ft(t.name,e),r=(n=t.name,bt.get(n));var n;const a=r?[r,...o.filter(t=>t!==r)]:o,c=this._epg.get(t.sref)||[],l=this._favs.has(t.sref);return L`
      <div class="row ${s?"active":""}">
        <div class="chan" @click=${()=>this._zap(t.sref)}>
          <button
            class="star ${l?"on":""}"
            @click=${e=>this._toggleFav(t.sref,e)}
            title=${l?"Remove favourite":"Add favourite"}
          >
            ${l?"★":"☆"}
          </button>
          <div class="chan-logo">
            ${a.length?L`<img
                  src=${a[0]}
                  loading="lazy"
                  alt=${t.name}
                  @load=${e=>this._onPiconLoad(e,t.name)}
                  @error=${t=>this._onPiconError(t,a,0)}
                />`:B}
            <span class="chan-fallback">${t.name}</span>
          </div>
        </div>
        <div class="track" style="width:${i}px">
          ${c.map(t=>this._renderEvent(t,i))}
        </div>
      </div>
    `}_renderEvent(t,e){const s=6*((t.begin-this._windowStart)/60),i=6*(t.duration/60);if(s+i<0||s>e)return B;const o=Math.max(0,s),r=Math.min(i+Math.min(0,s),e),n=this._selected?.id===t.id&&this._selected?.sref===t.sref;return L`
      <button
        class="event ${n?"selected":""}"
        style="left:${o}px; width:${Math.max(r,12)}px"
        @click=${()=>this._selected=t}
        title=${t.title}
      >
        <span class="ev-time">${this._fmtTime(t.begin)}</span>
        <span class="ev-title">${t.title}</span>
      </button>
    `}_renderDetail(t){return L`
      <div class="detail">
        <div class="detail-main">
          <div class="detail-time">
            ${this._fmtTime(t.begin)} –
            ${this._fmtTime(t.begin+t.duration)} · ${t.sname}
          </div>
          <div class="detail-title">${t.title}</div>
          ${t.shortdesc?L`<div class="detail-desc">${t.shortdesc}</div>`:B}
        </div>
        <div class="detail-actions">
          <button @click=${()=>this._zap(t.sref)}>Watch</button>
          ${null!=t.id?L`<button @click=${()=>this._record(t)}>Record</button>`:B}
          <button class="ghost" @click=${()=>this._selected=void 0}>
            Close
          </button>
        </div>
      </div>
    `}_timeTicks(t,e){const s=[],i=60*t/e;for(let t=0;t<=i;t++){const i=this._windowStart+t*e*60;s.push(L`<span
          class="tick"
          style="left:${t*e*6}px"
          >${this._fmtTime(i)}</span
        >`)}return s}_fmtTime(t){return new Date(1e3*t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}};mt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)})`
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
      overflow-x: auto;
      overflow-y: hidden;
    }
    .time-header {
      position: relative;
      height: 22px;
      margin-left: var(--chan-w);
      border-bottom: 1px solid var(--owc-border);
    }
    .tick {
      position: absolute;
      top: 0;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      transform: translateX(-2px);
    }
    .body {
      position: relative;
      overflow-y: auto;
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
      z-index: 2;
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
    .chan-logo:not(:has(img)) .chan-fallback,
    .chan-logo:has(img.failed) .chan-fallback {
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
      z-index: 3;
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
    a {
      color: var(--owc-accent);
    }
  `,t([ht({attribute:!1})],mt.prototype,"hass",void 0),t([dt()],mt.prototype,"_config",void 0),t([dt()],mt.prototype,"_bouquet",void 0),t([dt()],mt.prototype,"_favs",void 0),t([dt()],mt.prototype,"_epg",void 0),t([dt()],mt.prototype,"_loadingEpg",void 0),t([dt()],mt.prototype,"_selected",void 0),t([dt()],mt.prototype,"_windowStart",void 0),mt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("openwebif-control-card")],mt),window.customCards=window.customCards||[],window.customCards.push({type:"openwebif-control-card",name:"OpenWebif Control Card",description:"Sky Q-style EPG timeline grid for Enigma2/OpenWebif receivers (companion to the OpenWebif Control integration).",preview:!0,documentation:"https://github.com/kevpatts/OpenWebif-control-card"}),console.info("%c OPENWEBIF-CONTROL-CARD %c v0.4.0 ","background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px","background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");export{mt as OpenWebifControlCard};
