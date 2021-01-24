(self.webpackChunk_genbs_urpflanze_gui=self.webpackChunk_genbs_urpflanze_gui||[]).push([[892],{21680:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(67294),r=n(29163),o=n(76383);const i=e=>{const t=e.id||"cb_"+e.name;return a.createElement(s,null,a.createElement(l,{size:e.size||0,id:t,type:"checkbox",onChange:t=>e.onChange(t.target.checked),checked:e.checked}),e.name&&a.createElement("label",{htmlFor:t},e.name))},s=r.ZP.div`
    display: flex;
    align-items: center;
    > label { margin-left: ${o.Z.ms(-1)}; }
    > * { 
        cursor: pointer; 
    }
`,l=r.ZP.input`
    position: relative;
    appearance: none;
    margin: 0;
    border-radius: 2px;
    width: ${e=>o.Z.ms(e.size)};
    height: ${e=>o.Z.ms(e.size)};
    
    border: 1px solid ${o.Z.color("gray-dark")};
    transition: 0.1s border-color ease-out;

    &:after{
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        content: ' ';
        background: ${o.Z.color("gray-dark")};
        transform: scale(.7);
        transform-origin: center center;
        transition: 0.1s background ease-out;
        border-radius: 2px;
    }

    &:checked {
        border-color: ${o.Z.color("primary")};

        &:after{ 
            background: ${o.Z.color("primary")}; 
        }
    }
`},47790:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var a=n(67294),r=n(29163),o=n(76383),i=n(100),s=n(99011),l=n(38166),c=n(62957);const u=r.ZP.div`
	display: none;
	position: absolute;
	z-index: 100;
	height: 100%;
	top: 0;
	background: ${o.Z.palette.get("dark-lighten","hex").lighten(5)};
	cursor: pointer;
`,d=r.ZP.div`
	position: relative;
	height: ${e=>e.small?o.Z.ms(0):e.size?"string"==typeof e.size?e.size:o.Z.ms(e.size):"100%"};
	line-height: ${e=>e.small?o.Z.ms(0):e.size?"string"==typeof e.size?e.size:o.Z.ms(e.size):"inherit"};
	font-size: ${e=>e.small?o.Z.sub(-1):null};
	background: ${o.Z.palette.get("dark","hex")};

	width: 100%;
	&:hover ${u} {
		display: block;
	}
`,m=r.ZP.input`
	display: inline-block;
	width: 100%;
	height: 100%;
	padding: 0 ${o.Z.ms(-1)};
	background: ${o.Z.palette.get("dark","hex").darken(5)};
	border: none;
	color: #fff;
`,g=r.ZP.div`
	position: relative;
	height: 100%;
	opacity: ${e=>e.bDefaultValue?.3:1};
	cursor: ew-resize;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`,p=r.ZP.div`
	height: 100%;
	background: ${o.Z.palette.get("primary","hex")};
	pointer-events: none;
`,v=r.ZP.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
`,h=a.memo((({min:e,max:t,step:n,value:r,small:o,size:h,onChange:f,bDefaultValue:b})=>{const[Z]=(0,c.Z)(),[y,E]=a.useState(!1),k=n.toExponential(1).match(/e(-?[0-9]+)/),x=Math.pow(10,k?-k[1]:0);function w(n,a){return n=(0,i.clamp)(e,t,n),f(n,a),n!==r}function D(a,o=1){w((0,i.clamp)(e,t,Math.round((r+o*n*a)*x)/x),"none")}function z(e){const t=parseFloat(e.replace(/,/g,"."));return!Number.isNaN(t)&&(t==r||w(t,"none"))}const[C,M]=(0,l.Z)({value:r,min:e,max:t,step:n,exp:x,onChange:w,events:{notDrag:()=>{Z.current&&z(Z.current.value)&&E(!1)},dragEnd:e=>{!e&&E(!0)}}});return a.createElement(d,{small:o,size:h},y?a.createElement(m,{ref:Z,defaultValue:r,autoFocus:!0,onKeyDown:e=>"Enter"===e.key&&z(e.target.value)&&E(!1),onFocus:e=>e.target.select()}):a.createElement(a.Fragment,null,a.createElement(u,{style:{left:0},onClick:e=>D(-1,e.shiftKey?10:1)},a.createElement(s.Z,{size:0,rotate:180,name:"arrow-right"})),a.createElement(g,{ref:M,bDefaultValue:b&&C.value===r},a.createElement(p,{style:{width:C.valuePercentage+"%"}}),a.createElement(v,null,C.value.toFixed(Math.log10(x)))),a.createElement(u,{style:{right:0},onClick:e=>D(1,e.shiftKey?10:1)},a.createElement(s.Z,{size:0,name:"arrow-right"}))))}))},84581:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(67294),r=n(62957),o=n(27722);const i=function(e){const[t]=(0,r.Z)();e=e||{};const[n,i]=a.useState({coords:{x:0,y:0},bDrag:!1,time:0}),s=a.useCallback((({target:a,clientX:r,clientY:s})=>{const l=a===(null==t?void 0:t.current);l&&l!=n.bDrag&&(i({coords:{x:r,y:s},bDrag:!0,time:(0,o.zO)()}),e.onDragStart&&e.onDragStart()),l||e.onNotDrag&&e.onNotDrag()}),[t.current,n.bDrag]),l=a.useCallback((({clientX:t,clientY:a})=>{if(n.bDrag){const r=(0,o.zO)()-n.time,s={x:t-n.coords.x,y:a-n.coords.y};r<300&&0==s.x&&0==s.y&&e.onClick&&e.onClick({x:t,y:a}),i({coords:s,bDrag:!1,time:0}),e.onDragEnd&&e.onDragEnd(s,{x:t,y:a},r)}}),[t.current,n.bDrag]),c=a.useCallback((({clientX:t,clientY:a})=>{if(n.bDrag){const r={x:t-n.coords.x,y:a-n.coords.y};i({coords:r,bDrag:!0,time:0}),e.onDrag&&e.onDrag(r,{x:t,y:a})}}),[t.current,n.bDrag]);return a.useEffect((()=>(document.addEventListener("mousedown",s,{passive:!0}),document.addEventListener("mouseup",l,{passive:!0}),document.addEventListener("mousemove",c,{passive:!0}),()=>{document.removeEventListener("mousedown",s),document.removeEventListener("mouseup",l),document.removeEventListener("mousemove",c)})),[t.current,s,c,l]),t}},62957:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(67294);const r=function(e=null){const t=a.useRef(e),n=a.useCallback((e=>{t.current,t.current=e}),[]);return[t,n]}},38166:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(67294),r=n(84581),o=n(27106),i=n(73259),s=n(58416);const l=function({value:e,step:t,vertical:n,exp:l,min:c,max:u,onChange:d,events:m}){const g=(0,s.Sr)(c,u,e,0,100),[p,v]=a.useState({value:e,valuePercentage:g}),h=(0,r.Z)({onNotDrag:()=>{m&&m.notDrag&&m.notDrag()},onDragStart:()=>{m&&m.dragStart&&m.dragStart()},onDrag:e=>{const t=b(e);t.value!=p.value&&(v(t),d(t.value,"slider")),m&&m.drag&&m.drag(e)},onDragEnd:e=>{const t=Math.abs(n?e.y:e.x)>0;t&&d(b(e).value,"none"),m&&m.dragEnd&&m.dragEnd(t)}}),f=(0,o.Z)(h);function b(e){const a=(u-c)/t,r=n?100*-e.y/f.height:100*e.x/f.width,o=(0,s.uZ)(0,100,r+g),i=Math.round(o/100*a);return{value:(0,s.uZ)(c,u,Math.round((c+i*t)*l)/l),valuePercentage:o}}return(0,i.Z)(h,((e,n)=>{const a=-1*Math.sign(e),r=n.shiftKey?10:1,o=(0,s.uZ)(c,u,Math.round((p.value+r*t*a)*l)/l);d(o,"none")})),a.useEffect((()=>{v({value:e,valuePercentage:(0,s.Sr)(c,u,e,0,100)})}),[e]),[p,h,f]}},73259:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(67294);const r=function(e,t){a.useEffect((()=>{function n(n){n.target===e.current&&(n.preventDefault(),t(n.deltaY,n))}return document.addEventListener("wheel",n,{passive:!1}),()=>document.removeEventListener("wheel",n)}),[e.current,t])}},12892:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Z});var a=n(67294),r=n(51512),o=n(62957),i=n(76383),s=n(47790),l=n(79340),c=n(21680);const u={position:"absolute",top:0,right:0,display:"flex",alignItems:"flex-end",flexDirection:"column",gap:i.Z.ms(0),padding:i.Z.ms(1)},d={fontSize:i.Z.ms(1)},m=a.memo((e=>{const t=[l.Z["loop.start"],l.Z["loop.end"],l.Z["loop.inc"]];return a.createElement(a.Fragment,null,a.createElement("div",{style:u},a.createElement("div",{style:d},e.layer.name),t.map((t=>a.createElement("div",{key:t.name,style:{width:i.Z.ms(5),height:i.Z.ms(2),lineHeight:i.Z.ms(2)}},a.createElement(s.Z,{max:t.max,min:t.min,step:t.step,value:e.loopMeta[t.label],onChange:n=>e.setLoopMeta(Object.assign(Object.assign({},e.loopMeta),{[t.label]:n}))})))),a.createElement("div",null,a.createElement(c.Z,{name:"Dynamic",size:1,checked:e.loopMeta.dynamyc,onChange:t=>e.setLoopMeta(Object.assign(Object.assign({},e.loopMeta),{dynamyc:t}))}))))}));var g=n(99011),p=n(27722),v=n(86908);const h=a.memo((e=>a.createElement("div",{style:{width:"100%",height:"100%"}},a.createElement(v.Z,{options:{shapeLoop:!0,bVector:!0},initialReteState:e.initialReteState,setReteAnimation:e.setReteAnimationRef}))));var f=n(63402);const b={position:"absolute",top:0,left:0,padding:i.Z.ms(1)},Z=(0,r.$j)((e=>({scene:e.project.scene})))((e=>{const[t,n]=a.useState({start:0,end:2*Math.PI,inc:2*Math.PI/100,dynamyc:!1}),[r,i]=(0,o.Z)(null),[s,l]=a.useState(null),[{layer:c}]=(0,f.Z)("shape-loop",e.scene,e.layer_id);function u(){var e,n;if(c&&(c.id+"").length>0&&(null===(e=r.current)||void 0===e?void 0:e.raw)&&(null===(n=r.current)||void 0===n?void 0:n.raw.length)){const e={id:c.id,name:"loop",value:Object.assign(Object.assign({},t),{vertex:r.current}),prev_value:c.props.loop};window.opener.postMessage({event:"set-popup-window-value",value:e},location.origin)}}return a.useEffect((()=>{var e,t;if(c&&c.id&&(c.id+"").length>0){const n=c.id?null===(t=null===(e=c.props.loop)||void 0===e?void 0:e.vertex)||void 0===t?void 0:t.state:null;l(n)}}),[null==c?void 0:c.id,null==c?void 0:c.props.loop]),a.useEffect((()=>{function e(e){83===e.keyCode&&(0,p.sn)(e)&&(e.preventDefault(),u())}return window.addEventListener("keydown",e,{passive:!1}),()=>window.removeEventListener("keydown",e)}),[null==c?void 0:c.id,null==c?void 0:c.props.loop,t,r.current]),null===c?null:a.createElement("div",{style:{width:"100vw",height:"100vh"}},a.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},a.createElement("div",{style:b},a.createElement(g.Z,{name:"save",onClick:u,size:2})),a.createElement(h,{initialReteState:s,setReteAnimationRef:i})),a.createElement(m,{loopMeta:t,setLoopMeta:n,loop:!0,scene:e.scene,layer:c}))}))}}]);