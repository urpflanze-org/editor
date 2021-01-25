(self.webpackChunk_genbs_urpflanze_gui=self.webpackChunk_genbs_urpflanze_gui||[]).push([[908],{51748:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var o=n(67294),a=n(14310),i=n(31631),u=n(87990);class s extends a.ZP.Control{constructor(e,t,n,a,i=a[0].key,u){super(t),this.emitter=e,this.key=t,this.component=({value:e,onChange:t})=>o.createElement("select",{defaultValue:i,ref:e=>{e&&e.addEventListener("pointerdown",(e=>e.stopPropagation()))},onChange:e=>t(e.target.value)},a.map((e=>o.createElement("option",{key:e.key,value:e.key},e.label))));const s=n.data[t]||i;n.data[t]=s,this.props={value:s,onChange:e=>{this.setValue(e),this.emitter.trigger("process"),u&&u(e)}}}setValue(e){this.props.value=e,this.putData(this.key,e),this.update()}}const r=s;var c=n(8838);class p extends a.ZP.Component{constructor(e,t,n=u.di){super(e),this.dynamicFunctions=t,this.outputType=n,this.component=Node,this.maxInputs=Math.max.apply(null,this.dynamicFunctions.map((e=>e.inputs))),this.setInputFromDynamicFunction=this.setInputFromDynamicFunction.bind(this)}getInputsFromFunctions(e){const t=(0,i.indexOfObjectProperty)(this.dynamicFunctions,"key",e);return t>=0?this.dynamicFunctions[t].inputs:0}builder(e){const t=new a.ZP.Output("result","out",this.outputType);e.addControl(new r(this.editor,"dynamic_function",e,this.dynamicFunctions,e.data.dynamic_function,this.setInputFromDynamicFunction.bind(null,e))),this.setInputFromDynamicFunction(e,e.data.dynamic_function),e.addOutput(t)}getCurrentDynamicFunction(e){return e.data.dynamic_function&&e.data.dynamic_function.length>0?e.data.dynamic_function:null}setInputFromDynamicFunction(e,t){const n=this.getInputsFromFunctions(t);for(let t=1;t<=this.maxInputs;t++){const o="input_"+t;t<=n?this.addInput(e,o,["x","y","z","a","b","c"][t-1]):this.removeInput(e,o)}e.update()}addInput(e,t,n){if(!e.inputs.has(t)){const o=new a.ZP.Input(t,n,u.di);o.addControl(new c.Z(this.editor,t,e)),e.addInput(o)}}removeInput(e,t){if(e.inputs.has(t)){const n=e.inputs.get(t);n.connections.slice().map(this.editor.removeConnection.bind(this.editor)),e.removeInput(n)}}getInputValue(e,t,n){return t[n]&&t[n].length>0?t[n][0]:e.data[n]}code(e,t,n){}}const l=p},87038:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51748);const MathFunctions=[{key:"abs",label:"abs",inputs:1},{key:"sin",label:"sin",inputs:1},{key:"cos",label:"cos",inputs:1},{key:"tan",label:"tan",inputs:1},{key:"atan",label:"atan",inputs:1},{key:"atan2",label:"atan2",inputs:2},{key:"ceil",label:"ceil",inputs:1},{key:"floor",label:"floor",inputs:1},{key:"log",label:"log",inputs:1},{key:"min",label:"min",inputs:2},{key:"max",label:"max",inputs:2},{key:"pow",label:"pow",inputs:2},{key:"round",label:"round",inputs:1},{key:"random",label:"random",inputs:0},{key:"sqrt",label:"sqrt",inputs:1}];class MathComponent extends _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super("Math",MathFunctions)}worker(node,inputs,outputs){const math_function=this.getCurrentDynamicFunction(node);if(math_function){const input_count=this.getInputsFromFunctions(math_function),x=this.getInputValue(node,inputs,"input_1"),y=this.getInputValue(node,inputs,"input_2");let result;switch(math_function){case"abs":result=`Math.abs(${x})`;break;case"sin":result=`Math.sin(${x})`;break;case"cos":result=`Math.cos(${x})`;break;case"tan":result=`Math.tan(${x})`;break;case"atan":result=`Math.atan(${x})`;break;case"atan2":result=`Math.atan2(${y}, ${x})`;break;case"ceil":result=`Math.ceil(${x})`;break;case"floor":result=`Math.floor(${x})`;break;case"log":result=`Math.log(${x})`;break;case"min":result=`Math.min(${x}, ${y})`;break;case"max":result=`Math.max(${x}, ${y})`;break;case"pow":result=`Math.round(${x}, ${y})`;break;case"round":result=`Math.round(${x})`;break;case"random":result="Math.random()";break;case"sqrt":result=`Math.sqrt(${x})`}(0==input_count||1==input_count&&"number"==typeof x||2==input_count&&"number"==typeof x&&"number"==typeof y)&&(result=eval(result)),outputs.result=result}}}const __WEBPACK_DEFAULT_EXPORT__=MathComponent},44908:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51748);const OperationFunctions=[{key:"add",label:"Add",inputs:2},{key:"sub",label:"Subtract",inputs:2},{key:"mul",label:"Multiply",inputs:2},{key:"div",label:"Divide",inputs:2},{key:"mod",label:"Modulus ",inputs:2},{key:"pow",label:"Power",inputs:2}];class OperationComponent extends _DynamicComponent__WEBPACK_IMPORTED_MODULE_0__.Z{constructor(){super("Operation",OperationFunctions)}worker(node,inputs,outputs){const dynamic_function=this.getCurrentDynamicFunction(node);if(dynamic_function){let operator="+";switch(dynamic_function){case"add":operator="+";break;case"div":operator="/";break;case"mul":operator="*";break;case"sub":operator="-";break;case"mod":operator="%";break;case"pow":operator="**"}const input_1=this.getInputValue(node,inputs,"input_1"),input_2=this.getInputValue(node,inputs,"input_2");let result;result="number"==typeof input_1&&"number"==typeof input_2?eval(`${input_1} ${operator} ${input_2}`):`(${input_1} ${operator} ${input_2})`,outputs.result=result}}}const __WEBPACK_DEFAULT_EXPORT__=OperationComponent},8838:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var o=n(67294),a=n(14310);class i extends a.ZP.Control{constructor(e,t,n,a=!1){super(t),this.emitter=e,this.key=t,this.component=({value:e,onChange:t})=>o.createElement("input",{type:"number",value:e,ref:e=>{e&&e.addEventListener("pointerdown",(e=>e.stopPropagation()))},onChange:e=>t(+e.target.value)});const i=n.data[t]||0;n.data[t]=i,this.props={readonly:a,value:i,onChange:e=>{this.setValue(e),this.emitter.trigger("process")}}}setValue(e){this.props.value=e,this.putData(this.key,e),this.update()}}const u=i},87990:(e,t,n)=>{"use strict";n.d(t,{Rx:()=>a,VD:()=>u,aN:()=>s,di:()=>c,a:()=>p,Z_:()=>i});var o=n(14310);const a=new o.ZP.Socket("Number"),i=new o.ZP.Socket("String"),u=new o.ZP.Socket("Variable"),s=new o.ZP.Socket("Vector2"),r=(new o.ZP.Socket("Boolean"),new o.ZP.Socket("Any")),c=new o.ZP.Socket("NumberOrVariable"),p=new o.ZP.Socket("NumberOrVariableOrVector");a.combineWith(r),u.combineWith(r),s.combineWith(r),i.combineWith(r),a.combineWith(c),u.combineWith(c),a.combineWith(p),u.combineWith(p),s.combineWith(p),c.combineWith(p)},86908:(e,t,n)=>{"use strict";n.d(t,{Z:()=>G});var o=n(67294),a=n(14310),i=n(79907),u=n(96919),s=n(99247),r=n(10527),c=n(9986),p=n(87990),l=n(8838);class d extends a.ZP.Component{constructor(){super("Number")}builder(e){const t=new a.ZP.Output("value","Output",p.Rx),n=new l.Z(this.editor,"value",e);e.addControl(n),e.addOutput(t)}worker(e,t,n){n.value=e.data.value}code(e,t,n){}}const _=d;class h extends a.ZP.Component{constructor(){super("Vector")}builder(e){const t=new a.ZP.Output("value","Output",p.aN),n=new a.ZP.Input("x","x",p.di);n.addControl(new l.Z(this.editor,"x",e)),e.addInput(n);const o=new a.ZP.Input("y","y",p.di);o.addControl(new l.Z(this.editor,"y",e)),e.addInput(o),e.addOutput(t)}worker(e,t,n){const o=t.x&&t.x.length>0?t.x[0]:e.data.x,a=t.y&&t.y.length>0?t.y[0]:e.data.y;n.value=`[${o}, ${a}]`}code(e,t,n){}}const m=h;class y extends a.ZP.Control{constructor(e,t,n,a=!1){super(t),this.emitter=e,this.key=t,this.component=({value:e,onChange:t})=>o.createElement("input",{type:"text",value:e,ref:e=>{e&&e.addEventListener("pointerdown",(e=>e.stopPropagation()))},onChange:e=>t(e.target.value)});const i=n.data[t]||"";n.data[t]=i,this.props={readonly:a,value:i,onChange:e=>{this.setValue(e),this.emitter.trigger("process")}}}setValue(e){this.props.value=e,this.putData(this.key,e),this.update()}}const b=y;class k extends a.ZP.Component{constructor(){super("Noise")}builder(e){const t=new a.ZP.Output("value","Noise",p.Rx),n=new a.ZP.Input("seed","seed",p.Z_);n.addControl(new b(this.editor,"seed",e)),e.addInput(n);const o=new a.ZP.Input("x","x",p.di);o.addControl(new l.Z(this.editor,"x",e)),e.addInput(o);const i=new a.ZP.Input("y","y",p.di);i.addControl(new l.Z(this.editor,"y",e)),e.addInput(i);const u=new a.ZP.Input("z","z",p.di);u.addControl(new l.Z(this.editor,"z",e)),e.addInput(u),e.addOutput(t)}worker(e,t,n){const o=t.seed&&t.seed.length>0?t.seed[0]:e.data.seed,a=t.x&&t.x.length>0?t.x[0]:e.data.x,i=t.y&&t.y.length>0?t.y[0]:e.data.y,u=t.z&&t.z.length>0?t.z[0]:e.data.z;n.value=`context.noise(${o&&o.length>0?`'${o}'`:"'random'"}, ${a}, ${i}, ${u})`}code(){}}const w=k,x=[{key:"repetition.index",label:"Current index"},{key:"repetition.offset",label:"Current offset"},{key:"repetition.row.index",label:"Current row index"},{key:"repetition.row.offset",label:"Current row offset"},{key:"repetition.col.index",label:"Current col index"},{key:"repetition.col.offset",label:"Current col offset"},{key:"repetition.angle",label:"Current angle"},{key:"repetition.count",label:"Count"},{key:"repetition.col.count",label:"Count col"},{key:"repetition.row.count",label:"Count row"}];class f extends a.ZP.Component{constructor(){super("Repetition")}builder(e){x.forEach((t=>{e.addOutput(new a.ZP.Output(t.key,t.label,p.VD))}))}worker(e,t,n){x.forEach((t=>{e.outputs[t.key].connections.length>0&&(n[t.key]=t.key)}))}code(e,t,n){}}const g=f,v=[{key:"shape_loop.current_index",label:"Current index"},{key:"shape_loop.current_angle",label:"Current angle"},{key:"shape_loop.current_offset",label:"Current offset"},{key:"shape_loop.count",label:"Count"}];class C extends a.ZP.Component{constructor(){super("ShapeLoop")}builder(e){v.forEach((t=>{e.addOutput(new a.ZP.Output(t.key,t.label,p.VD))}))}worker(e,t,n){v.forEach((t=>{e.outputs[t.key].connections.length>0&&(n[t.key]=t.key)}))}code(e,t,n){}}const P=C;class Z extends a.ZP.Component{constructor(){super("Vertex")}builder(e){const t=new a.ZP.Output("x","x",p.Rx),n=new a.ZP.Output("y","y",p.Rx);e.addOutput(t),e.addOutput(n)}worker(e,t,n){n.x="vertex[0]",n.y="vertex[1]"}}const O=Z,I=[{key:"shape.getAngleFromMatrixRepetition(repetition)",label:"Matrix angle"},{key:"shape.getDistanceFromMatrixRepetition(repetition)",label:"Matrix distance"}];class E extends a.ZP.Component{constructor(){super("Shape")}builder(e){I.forEach((t=>{e.addOutput(new a.ZP.Output(t.key,t.label,p.VD))}))}worker(e,t,n){I.forEach((t=>{e.outputs[t.key].connections.length>0&&(n[t.key]=t.key)}))}code(e,t,n){}}const N=E;class $ extends a.ZP.Component{constructor(){super("Output")}builder(e){const t=e.data.bVector,n=e.data.canbVector;if(t){const t=new a.ZP.Input("input_x","x value",p.di),n=new a.ZP.Input("input_y","y value",p.di);e.addInput(t),e.addInput(n)}else{const t=new a.ZP.Input("input","return value",n?p.a:p.di);e.addInput(t)}}worker(e,t,n){null!=t.input&&t.input.length>0&&(e.data.return_value=t.input[0]),t.input_x&&t.input_x.length>0&&t.input_y&&t.input_y.length>0&&(e.data.return_value=`[${t.input_x[0]},${t.input_y[0]}]`)}code(e,t,n){e.data.return_value&&n(`${e.data.return_value}`)}}const M=$;class V extends a.ZP.Component{constructor(){super("OutputVertex")}builder(e){const t=new a.ZP.Input("input_x","x value",p.di),n=new a.ZP.Input("input_y","y value",p.di);e.addInput(t),e.addInput(n)}worker(e,t,n){null!=t.input&&t.input.length>0&&(e.data.return_value=t.input[0]),t.input_x&&t.input_x.length>0&&t.input_y&&t.input_y.length>0&&(e.data.return_value=`(function(){ \n                vertex[0] = ${t.input_x[0]}; \n                vertex[1] = ${t.input_y[0]};\n            }).call(this)`)}code(e,t,n){e.data.return_value&&n(`${e.data.return_value}`)}}const D=V;class S extends a.ZP.Component{constructor(){super("OutputHSL")}builder(e){const t=new a.ZP.Input("input_h","hue",p.di),n=new a.ZP.Input("input_s","saturation",p.di),o=new a.ZP.Input("input_l","luminosity",p.di),i=new a.ZP.Input("input_a","alpha",p.di);e.addInput(t),e.addInput(n),e.addInput(o),e.addInput(i)}worker(e,t,n){if(t.input_h&&t.input_h.length>0&&t.input_s&&t.input_s.length>0&&t.input_l&&t.input_l.length>0&&t.input_a&&t.input_a.length>0){const n=`hsla(\${${t.input_h[0]}}, \${${t.input_s[0]}}%, \${${t.input_l[0]}}%, \${${t.input_a[0]}})`;e.data.return_value="`"+n+"`",console.log(e.data.return_value)}}code(e,t,n){e.data.return_value&&n(`${e.data.return_value}`)}}const F=S;class R extends a.ZP.Component{constructor(){super("Time")}builder(e){const t=new a.ZP.Output("time","Current time (ms)",p.VD),n=new a.ZP.Output("mstime","Current time (s)",p.VD);e.addOutput(t),e.addOutput(n)}worker(e,t,n){n.time="time",n.mstime="(time / 1000)"}code(){}}const T=R;var L=n(87038);const A=[{key:"Math.PI",label:"PI"},{key:"(Math.PI * 2)",label:"PI2"},{key:"Math.LN2",label:"LN2"},{key:"Math.LN10",label:"LN10"},{key:"Math.SQRT1_2",label:"SQRT1_2"},{key:"Math.SQRT2",label:"SQRT2"}];class W extends a.ZP.Component{constructor(){super("Math Constant")}builder(e){A.forEach((t=>{e.addOutput(new a.ZP.Output(t.key,t.label,p.VD))}))}worker(e,t,n){A.forEach((t=>{e.outputs[t.key].connections.length>0&&(n[t.key]=t.key)}))}code(e,t,n){}}const z=W;var B=n(44908);const q=class extends i.NB{render(){const{node:e,bindSocket:t,bindControl:n}=this.props,{outputs:a,controls:u,inputs:s,selected:r}=this.state;return o.createElement("div",{className:`ui-node node ${r}`},o.createElement("div",{className:"title"},e.name),a.map((e=>o.createElement("div",{className:"output",key:e.key},o.createElement("div",{className:"output-title"},e.name),o.createElement(i.sk,{type:"output",socket:e.socket,io:e,innerRef:t})))),u.map((e=>o.createElement(i.oT,{className:"control",key:e.key,control:e,innerRef:n}))),s.map((e=>o.createElement("div",{className:"input",key:e.key},o.createElement(i.sk,{type:"input",socket:e.socket,io:e,innerRef:t}),!e.showControl()&&o.createElement("div",{className:"input-title"},e.name),e.showControl()&&o.createElement(i.oT,{className:"input-control",control:e.control,innerRef:n})))))}},J={Number:new _,Vector:new m,Operation:new B.Z,Math:new L.Z,MathConstant:new z,Noise:new w,Shape:new N,Repetition:new g,Time:new T},K=new O,U=new D,H=new P,Q=["Time","Repetition","Output","OutputVertex","OutputHSL"];async function X(e,t,n){const o=new a.ZP.NodeEditor("mandala-ui@0.1.0",e);o.use(c.Z),o.use(s.Z),o.use(u.Z),o.use(i.ZP,{component:q}),o.use(r.ZP,{searchBar:!0,delay:100});const p=new a.ZP.Engine("mandala-ui@0.1.0");n.bColor?J.OutputHSL=new F:J.Output=new M,Object.keys(J).forEach((e=>{o.register(J[e]),p.register(J[e])})),n.shapeLoop&&(o.register(H),p.register(H)),n.bVertexCallback&&(o.register(K),p.register(K),o.register(U),p.register(U)),await async function(e,t,n){if(e.clear(),t)await e.fromJSON(t);else if(n.bVertexCallback){const t=await U.createNode(),n=await K.createNode();n.position=[-500,0],n.output=[500,0],e.addNode(n),e.addNode(t)}else{const t=n.bColor?await J.OutputHSL.createNode():await J.Output.createNode({bVector:n.bVector,canbVector:n.canbVector}),o=await J.Repetition.createNode(),a=await J.Time.createNode();if(a.position=[0,0],o.position=[0,120],t.position=[1e3,100],e.addNode(t),e.addNode(a),e.addNode(o),n.shapeLoop){const t=await H.createNode();t.position=[400,60],e.addNode(t)}}}(o,t,n);try{o.view.resize()}catch(e){}return c.Z.zoomAt(o,o.nodes),o.on("nodecreate",(e=>{if(Q.includes(e.name)){if(o.nodes.some((t=>t.name===e.name))){const t=o.nodes.find((t=>t.name===e.name));return o.selectNode(t),!1}}})),o.on(["process","nodecreated","noderemoved","connectioncreated","connectionremoved"],(async()=>{await p.abort(),await p.process(o.toJSON())})),o.on("zoom",(({source:e})=>"dblclick"!==e)),o.trigger("process"),{editor:o,engine:p,getCode:()=>(0,s.R)(p,o.toJSON())}}var j=function(e,t,n,o){return new(n||(n=Promise))((function(a,i){function u(e){try{r(o.next(e))}catch(e){i(e)}}function s(e){try{r(o.throw(e))}catch(e){i(e)}}function r(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}r((o=o.apply(e,t||[])).next())}))};const G=o.memo((e=>{const[t,n]=o.useState(0);return o.useEffect((()=>{n(t+1)}),[e.initialReteState,e.options]),o.createElement("div",{key:t,"data-key":t,className:"visual-editor"},o.createElement("div",{ref:function(t){return j(this,void 0,void 0,(function*(){if(t&&t.parentNode){const n=e.initialReteState&&e.initialReteState.length>0?JSON.parse(e.initialReteState):null,o=yield X(t.parentNode,n,e.options);o.editor.on(["process","nodecreated","noderemoved","connectioncreated","connectionremoved"],(()=>{setTimeout((()=>j(this,void 0,void 0,(function*(){const t=JSON.stringify(o.editor.toJSON()),n={raw:yield o.getCode(),state:t};e.setReteAnimation(n)}))))})),n&&setTimeout((()=>j(this,void 0,void 0,(function*(){e.setReteAnimation({raw:yield o.getCode(),state:JSON.stringify(o.editor.toJSON())})}))))}}))}}))}))}}]);