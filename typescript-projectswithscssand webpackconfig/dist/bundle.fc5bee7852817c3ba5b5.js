(()=>{"use strict";class e{constructor(e,t,n,s){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const i=document.importNode(this.templateElement.content,!0);this.element=i.firstElementChild,s&&(this.element.id=s),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLength),null!=e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}var n;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(n||(n={}));class s{constructor(e,t,n,s,i){this.id=e,this.title=t,this.description=n,this.people=s,this.status=i}}class i{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}class r extends i{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new r),this.instance}addProject(e,t,i){const r=new s(Math.random().toString(),e,t,i,n.Active);this.projects.push(r),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const a=r.getInstance();class l extends e{get persons(){return 1===this.project.people?"1 person":`${this.project.people} persons`}constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("DragEnd")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler.bind(this)),this.element.addEventListener("dragend",this.dragEndHandler.bind(this))}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons+" assigned",this.element.querySelector("p").textContent=this.project.description}}class o extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");a.moveProject(t,"active"===this.type?n.Active:n.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler.bind(this)),this.element.addEventListener("dragleave",this.dragLeaveHandler.bind(this)),this.element.addEventListener("drop",this.dropHandler.bind(this)),a.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===n.Active:e.status===n.Finished));this.assignedProjects=t,this.renderProjects()}))}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+" PROJECTS"}renderProjects(){document.getElementById(`${this.type}-projects-list`).innerHTML="";for(const e of this.assignedProjects)new l(this.element.querySelector("ul").id,e)}}new class extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler.bind(this))}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value,n=this.descriptionInputElement.value,s=this.peopleInputElement.value,i={value:n,required:!0,minLength:5},r={value:+s,required:!0,min:1,max:5};return t({value:e,required:!0})&&t(i)&&t(r)?[e,n,+s]:void alert("Invalid input, please try again!")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,s]=t;a.addProject(e,n,s),this.clearInputs()}}},new o("active"),new o("finished")})();