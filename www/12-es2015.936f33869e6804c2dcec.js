(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{sKp9:function(t,n,e){"use strict";e.r(n),e.d(n,"MainTemplatePageModule",function(){return f});var o=e("ofXK"),i=e("3Pt+"),c=e("TEn/"),r=e("tyNb"),s=e("mrSG"),a=e("fXoL"),l=e("K2vf"),b=e("YbYh");let p=(()=>{class t{constructor(t,n,e,o,i){this.mdlCtrl=t,this.cusHttp=n,this.toast=e,this.router=o,this.loadingController=i}ngOnInit(){console.log(this.template_data)}onPreviewMe(){window.open("https://m.me/"+this.template_data.fb_page_id,"_blank")}useTemplate(){return Object(s.a)(this,void 0,void 0,function*(){var t=yield this.loadingController.create({message:"Please wait ...."});yield t.present(),this.cusHttp.post(`template/use?project_id=${this.template_data.project_id}&template_name=${this.template_data.name}`,{}).subscribe(n=>Object(s.a)(this,void 0,void 0,function*(){yield t.dismiss(),this.cusHttp.get("project/item-list?project_id="+n.project_id).subscribe(t=>{console.log(t),this.onDismiss(),this.router.navigate(["t","automate"],{queryParams:t})},t=>{console.log(t),this.toast.presentToast(this.cusHttp.httpErrRes(t))})}),n=>Object(s.a)(this,void 0,void 0,function*(){yield t.dismiss(),this.toast.presentToast(this.cusHttp.httpErrRes(n))}))})}onDismiss(){this.mdlCtrl.dismiss()}}return t.\u0275fac=function(n){return new(n||t)(a.Mb(c.H),a.Mb(l.a),a.Mb(b.a),a.Mb(r.g),a.Mb(c.G))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-preview-template"]],decls:22,vars:4,consts:[[1,"c-exit"],[3,"click"],["slot","icon-only","name","close-circle-outline"],[1,"c-template"],[1,"profile"],[3,"src"],[1,"txt"],[1,"title"],[1,"subtitle"],[1,"desc"],[1,"bottom-btns"],["color","primary",3,"click"]],template:function(t,n){1&t&&(a.Pb(0,"ion-content"),a.Pb(1,"ion-buttons",0),a.Pb(2,"ion-button",1),a.Xb("click",function(){return n.onDismiss()}),a.Nb(3,"ion-icon",2),a.Ob(),a.Ob(),a.Pb(4,"div"),a.Pb(5,"div",3),a.Pb(6,"div",4),a.Nb(7,"img",5),a.Ob(),a.Pb(8,"div",6),a.Pb(9,"p",7),a.tc(10),a.Ob(),a.Pb(11,"p",8),a.tc(12),a.Ob(),a.Pb(13,"p",9),a.tc(14),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Pb(15,"ion-footer"),a.Pb(16,"div",10),a.Pb(17,"ion-buttons"),a.Pb(18,"ion-button",11),a.Xb("click",function(){return n.useTemplate()}),a.tc(19," Use "),a.Ob(),a.Pb(20,"ion-button",11),a.Xb("click",function(){return n.onPreviewMe()}),a.tc(21," Preview in messenger "),a.Ob(),a.Ob(),a.Ob(),a.Ob()),2&t&&(a.Ab(7),a.gc("src",n.template_data.temp_img,a.nc),a.Ab(3),a.vc("",n.template_data.name," "),a.Ab(2),a.vc("",n.template_data.created_by," "),a.Ab(2),a.vc("",n.template_data.description," "))},directives:[c.i,c.f,c.e,c.l,c.j],styles:[".c-exit[_ngcontent-%COMP%]{position:absolute;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.c-exit[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{background:hsla(0,0%,100%,.6);border-radius:25px;margin:8px}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]{margin-bottom:10px}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{text-align:start;font-weight:300;margin:15px 12px 0;font-size:23px;line-height:normal}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{text-align:start;font-weight:100;margin-left:12px;margin-right:12px;margin-top:5px;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:normal}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{margin:5px 12px;text-align:left}.c-template[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{height:350px;overflow:hidden}.c-template[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.bottom-btns[_ngcontent-%COMP%]{margin:10px}.bottom-btns[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:50%;height:30px}"]}),t})();function g(t,n){1&t&&a.Nb(0,"ion-progress-bar",23)}function d(t,n){if(1&t){const t=a.Qb();a.Pb(0,"ion-col",16),a.Pb(1,"div",24),a.Xb("click",function(){a.mc(t);const e=n.$implicit;return a.bc().onPreview(e)}),a.Pb(2,"div",25),a.Pb(3,"div",26),a.Pb(4,"div",27),a.Pb(5,"div",28),a.Nb(6,"img",29),a.Ob(),a.Pb(7,"div",20),a.Pb(8,"p",21),a.tc(9),a.Ob(),a.Pb(10,"p",30),a.tc(11),a.Ob(),a.Pb(12,"p",31),a.tc(13),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Pb(14,"div",32),a.Pb(15,"div",27),a.Pb(16,"div",20),a.Pb(17,"p",21),a.tc(18),a.Ob(),a.Pb(19,"p",30),a.tc(20),a.Ob(),a.Pb(21,"p",31),a.tc(22),a.Ob(),a.Ob(),a.Ob(),a.Pb(23,"ion-button",33),a.tc(24,"Preview"),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Ob()}if(2&t){const t=n.$implicit;a.Ab(6),a.gc("src",t.temp_img,a.nc),a.Ab(3),a.uc(t.name),a.Ab(2),a.vc("By ",t.created_by,""),a.Ab(2),a.uc(t.description),a.Ab(5),a.uc(t.name),a.Ab(2),a.vc("By ",t.created_by,""),a.Ab(2),a.uc(t.description)}}const m=function(){return["/p"]};let u=(()=>{class t{constructor(t,n,e,o,i){this.loadingController=t,this.router=n,this.modalController=e,this.toast=o,this.cusHttp=i,this.isProgressLoading=!1,this.template_data=new Array}ngOnInit(){this.onCType(null)}onPreview(t){return Object(s.a)(this,void 0,void 0,function*(){console.log(t);const n=yield this.modalController.create({component:p,cssClass:"modal-rad",componentProps:{template_data:t}});return yield n.present()})}onBlankProj(){return Object(s.a)(this,void 0,void 0,function*(){var t=yield this.loadingController.create({message:"Please wait ...."});yield t.present(),this.cusHttp.post("project/create",{}).subscribe(n=>Object(s.a)(this,void 0,void 0,function*(){yield t.dismiss(),console.log(n),this.router.navigate(["t"],{queryParams:{project_id:n.project_id}})}),n=>Object(s.a)(this,void 0,void 0,function*(){yield t.dismiss(),this.toast.presentToast(this.cusHttp.httpErrRes(n))}))})}onCType(t){let n="";n=null==t?"all":t.detail.value,this.isProgressLoading=!0,this.cusHttp.get("template/list?sort_type="+n).subscribe(t=>{this.isProgressLoading=!1,this.template_data=t.data,console.log(t)},t=>{this.toast.presentToast(this.cusHttp.httpErrRes(t))})}}return t.\u0275fac=function(n){return new(n||t)(a.Mb(c.G),a.Mb(r.g),a.Mb(c.H),a.Mb(b.a),a.Mb(l.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-list-template"]],decls:45,vars:4,consts:[["type","indeterminate",4,"ngIf"],[1,"c-container"],[1,"content"],[1,"c-menu-view"],["size","default"],["color","primary",1,"c-view-proj",3,"routerLink"],["value","all",3,"ionChange"],["value","all"],["value","new"],["value","trending"],["value","business"],["value","marketing"],["value","faqs"],["value","e-commerce"],["value","concierge"],["value","recommendations"],["size","12","size-sm","12","size-md","auto","size-lg","auto"],[1,"c-blank-proj","blank-color",3,"click"],[1,"c-blank-proj1"],["src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAABmJLR0QA/wD/AP+gvaeTAAAAyElEQVRoge3asQ3CQBBE0TlE5AbcAzGl0As1uBc6MTE9uAHSJSEwhwOCu0Vj/ZdhWYy+ZCcnSwAylYyRiLhIGleXllLKLWO7u4iY49OcsXvIGPkX4lwR54o4V8S5Is4Vca6Ic0WcK+JcfR0QvQ9zro13TpKG1e+npEfjjak+dDpu3DRKOjcerg0dNsb6wq4fy13HbT2Wi6R7452Md25p/H+/4VC2A+JcEeeKOFfEuSLOFXGuiHNFnCviXG0dEPUwqfpqL2kXQKIXHpE6Lr3ozeoAAAAASUVORK5CYII="],[1,"txt"],[1,"title"],["size","12","size-sm","12","size-md","auto","size-lg","auto",4,"ngFor","ngForOf"],["type","indeterminate"],[1,"flip-card",3,"click"],[1,"flip-card-inner"],[1,"flip-card-front"],[1,"c-template"],[1,"profile"],[3,"src"],[1,"subtitle"],[1,"desc1"],[1,"flip-card-back"],["fill","outline","color","dark",1,"btn-connect"]],template:function(t,n){1&t&&(a.sc(0,g,1,0,"ion-progress-bar",0),a.Pb(1,"ion-content"),a.Pb(2,"div",1),a.Pb(3,"div",2),a.Pb(4,"div",3),a.Pb(5,"ion-buttons",4),a.Pb(6,"ion-button",5),a.tc(7," View my projects "),a.Ob(),a.Ob(),a.Pb(8,"ion-segment",6),a.Xb("ionChange",function(t){return n.onCType(t)}),a.Pb(9,"ion-segment-button",7),a.Pb(10,"ion-label"),a.tc(11,"All"),a.Ob(),a.Ob(),a.Pb(12,"ion-segment-button",8),a.Pb(13,"ion-label"),a.tc(14,"New"),a.Ob(),a.Ob(),a.Pb(15,"ion-segment-button",9),a.Pb(16,"ion-label"),a.tc(17,"Trending"),a.Ob(),a.Ob(),a.Pb(18,"ion-segment-button",10),a.Pb(19,"ion-label"),a.tc(20,"Business"),a.Ob(),a.Ob(),a.Pb(21,"ion-segment-button",11),a.Pb(22,"ion-label"),a.tc(23,"Marketing"),a.Ob(),a.Ob(),a.Pb(24,"ion-segment-button",12),a.Pb(25,"ion-label"),a.tc(26,"FAQs"),a.Ob(),a.Ob(),a.Pb(27,"ion-segment-button",13),a.Pb(28,"ion-label"),a.tc(29,"E-commerce"),a.Ob(),a.Ob(),a.Pb(30,"ion-segment-button",14),a.Pb(31,"ion-label"),a.tc(32,"Concierge"),a.Ob(),a.Ob(),a.Pb(33,"ion-segment-button",15),a.Pb(34,"ion-label"),a.tc(35,"Recommendations"),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Pb(36,"ion-row"),a.Pb(37,"ion-col",16),a.Pb(38,"div",17),a.Xb("click",function(){return n.onBlankProj()}),a.Pb(39,"div",18),a.Nb(40,"img",19),a.Pb(41,"div",20),a.Pb(42,"p",21),a.tc(43,"Blank project"),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.sc(44,d,25,7,"ion-col",22),a.Ob(),a.Ob(),a.Ob(),a.Ob()),2&t&&(a.gc("ngIf",n.isProgressLoading),a.Ab(6),a.gc("routerLink",a.jc(3,m)),a.Ab(38),a.gc("ngForOf",n.template_data))},directives:[o.j,c.i,c.f,c.e,c.L,r.h,c.w,c.M,c.x,c.q,c.u,c.h,o.i,c.s],styles:[".c-container[_ngcontent-%COMP%], .content[_ngcontent-%COMP%]{text-align:-webkit-center}.content[_ngcontent-%COMP%]{background-color:#f3f2f2;width:100%;justify-content:center;padding-bottom:30px;max-width:1500px}.toolbar[_ngcontent-%COMP%]   .toolbar-icon[_ngcontent-%COMP%]{width:50px;background:#fff;border-radius:25px;padding:4px;margin-left:10px}.c-menu-view[_ngcontent-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.c-menu-view[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]{overflow:auto;display:-webkit-inline-box}.c-menu-view[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%]{min-width:auto}.blank-color[_ngcontent-%COMP%]{background-color:#208ef0;color:#fff}.c-blank-proj[_ngcontent-%COMP%]{cursor:pointer;overflow:hidden;border-radius:10px;height:380px;width:260px;display:flex;justify-content:center;align-items:center;margin-left:5px;margin-top:15px;margin-bottom:15px}.c-blank-proj[_ngcontent-%COMP%]   .c-blank-proj1[_ngcontent-%COMP%]{text-align:center}.c-blank-proj[_ngcontent-%COMP%]   .c-blank-proj1[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{text-align:start;font-weight:300;margin-left:12px;margin-right:12px;margin-top:15px;font-size:23px;line-height:normal}.c-template[_ngcontent-%COMP%]{cursor:pointer;overflow:hidden;background-color:#fff;border-radius:10px;height:380px;width:260px;margin-left:5px;margin-top:15px;margin-bottom:15px}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{text-align:start;font-weight:500;margin:15px 12px 0;font-size:23px;line-height:normal}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{text-align:start;font-weight:100;margin-left:12px;margin-right:12px;margin-top:5px;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:normal}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{height:245px;margin:5px 12px;text-align:left;overflow:auto}.c-template[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .desc1[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-align:left;margin:5px 12px}.c-template[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{height:250px}.c-template[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:-webkit-fill-available}.btn-connect[_ngcontent-%COMP%]{position:absolute;transform:translate(-44%,-185%)}.btn-item-menu[_ngcontent-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;position:absolute;top:30px;right:10px}.c-view-proj[_ngcontent-%COMP%]{height:50px;margin-top:10px}.flip-card[_ngcontent-%COMP%]{background-color:transparent;height:380px;width:260px;border:1px solid #f1f1f1;perspective:1000px}.flip-card-inner[_ngcontent-%COMP%]{position:relative;width:100%;height:100%;text-align:center;transition:transform .8s;transform-style:preserve-3d}.flip-card[_ngcontent-%COMP%]:hover   .flip-card-inner[_ngcontent-%COMP%]{transform:rotateY(180deg)}.flip-card-back[_ngcontent-%COMP%], .flip-card-front[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden}.flip-card-back[_ngcontent-%COMP%]{transform:rotateY(180deg)}"]}),t})();var P=e("ZX4M");const O=[{path:"",pathMatch:"full",redirectTo:"templates"},{path:"",component:(()=>{class t{constructor(t,n,e){this.cusHttp=t,this.router=n,this.popCtrl=e}ngOnInit(){}onMenu(t){return Object(s.a)(this,void 0,void 0,function*(){const n=yield this.popCtrl.create({component:P.a,event:t,componentProps:{buttons:["Projects","Logout"]}});yield n.present(),n.onDidDismiss().then(t=>Object(s.a)(this,void 0,void 0,function*(){console.log(t);const n=t.data;if(n)switch(console.log(n),n.name){case"Projects":this.router.navigateByUrl("p");break;case"Logout":this.cusHttp.onLogoutUser()}}))})}}return t.\u0275fac=function(n){return new(n||t)(a.Mb(l.a),a.Mb(r.g),a.Mb(c.K))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-main-template"]],decls:9,vars:0,consts:[["color","primary",1,"toolbar"],["slot","start","src","../../../assets/icon/favicon.png",1,"toolbar-icon"],["slot","end"],[3,"click"],["slot","icon-only","name","ellipsis-vertical-outline"]],template:function(t,n){1&t&&(a.Pb(0,"ion-toolbar",0),a.Nb(1,"img",1),a.Pb(2,"ion-title"),a.tc(3,"Retailgate"),a.Ob(),a.Pb(4,"ion-buttons",2),a.Pb(5,"ion-button",3),a.Xb("click",function(t){return n.onMenu(t)}),a.Nb(6,"ion-icon",4),a.Ob(),a.Ob(),a.Ob(),a.Pb(7,"ion-content"),a.Nb(8,"ion-router-outlet"),a.Ob())},directives:[c.D,c.B,c.f,c.e,c.l,c.i,c.t],styles:[".toolbar[_ngcontent-%COMP%]   .toolbar-icon[_ngcontent-%COMP%]{width:50px;background:#fff;border-radius:25px;padding:4px;margin-left:10px}"]}),t})(),children:[{path:"templates",component:u}]}];let h=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(n){return new(n||t)},imports:[[r.i.forChild(O)],r.i]}),t})(),f=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(n){return new(n||t)},imports:[[o.b,i.e,c.E,h]]}),t})()}}]);