(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{DHRE:function(t,n,o){"use strict";o.r(n),o.d(n,"MainProjectPageModule",function(){return p});var e=o("ofXK"),i=o("3Pt+"),c=o("TEn/"),r=o("tyNb"),a=o("mrSG"),b=o("fXoL");let l=(()=>{class t{constructor(t){this.nav=t}ngOnInit(){}onBack(){this.nav.back()}}return t.\u0275fac=function(n){return new(n||t)(b.Mb(c.B))},t.\u0275cmp=b.Gb({type:t,selectors:[["app-connect-fb-page"]],decls:16,vars:0,consts:[["slot","start"],[3,"click"],["slot","icon-only","name","arrow-back"],["details","false","lines","full"],["src","","alt",""],["slot","end"]],template:function(t,n){1&t&&(b.Pb(0,"ion-header"),b.Pb(1,"ion-toolbar"),b.Pb(2,"ion-title"),b.sc(3,"Connect to facebook"),b.Ob(),b.Pb(4,"ion-buttons",0),b.Pb(5,"ion-button",1),b.Xb("click",function(){return n.onBack()}),b.Nb(6,"ion-icon",2),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Pb(7,"ion-content"),b.Pb(8,"ion-list"),b.Pb(9,"ion-item",3),b.Pb(10,"div",0),b.Nb(11,"img",4),b.Pb(12,"h2"),b.sc(13,"My Test Page"),b.Ob(),b.Ob(),b.Pb(14,"ion-button",5),b.sc(15,"Connect to Page"),b.Ob(),b.Ob(),b.Ob(),b.Ob())},directives:[c.h,c.w,c.v,c.d,c.c,c.i,c.f,c.m,c.k],styles:[""]}),t})(),s=(()=>{class t{constructor(t){this.modalController=t}ngOnInit(){}onConnect(){return Object(a.a)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:l});return yield t.present()})}}return t.\u0275fac=function(n){return new(n||t)(b.Mb(c.A))},t.\u0275cmp=b.Gb({type:t,selectors:[["app-list-project"]],decls:31,vars:0,consts:[["color","primary",1,"toolbar"],["slot","start","src","../../../assets/icon/favicon.png",1,"toolbar-icon"],[1,"content"],["size","12","size-sm","12","size-md","auto","size-lg","auto"],[1,"c-blank-proj"],[1,"c-blank-proj1"],["src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAABmJLR0QA/wD/AP+gvaeTAAAAwUlEQVRoge3asQ2CQABG4aexYgF2sHYUdnEGdnETrN2BBWi1JXiFxXHmJ+9LKDDEPy/B5iJIaunUaGcA+tX9DDwabe9uAt6ra2oxem4x8i/GpTIulXGpjEtlXCrjUhmXyrhUxqUqHRANwL3yzhXoVvcL8Kq8MbI5dLoUHuqBW+XhrW6HjX77waFfy0PHlV7LGXhW3mnxm5srf9/PPJStzbhUxqUyLpVxqYxLZVwq41IZl8q4VKUDoj2MfP9rT9LBfADvGhZM9Gt5dgAAAABJRU5ErkJggg=="],[1,"txt"],[1,"title"],[1,"c-blank-proj","template-color"],["src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAABmJLR0QA/wD/AP+gvaeTAAAAyElEQVRoge3asQ3CQBBE0TlE5AbcAzGl0As1uBc6MTE9uAHSJSEwhwOCu0Vj/ZdhWYy+ZCcnSwAylYyRiLhIGleXllLKLWO7u4iY49OcsXvIGPkX4lwR54o4V8S5Is4Vca6Ic0WcK+JcfR0QvQ9zro13TpKG1e+npEfjjak+dDpu3DRKOjcerg0dNsb6wq4fy13HbT2Wi6R7452Md25p/H+/4VC2A+JcEeeKOFfEuSLOFXGuiHNFnCviXG0dEPUwqfpqL2kXQKIXHpE6Lr3ozeoAAAAASUVORK5CYII="],[1,"c-proj"],[1,"profile"],["src","data:image/png;base64,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"],["fill","outline","color","dark",1,"btn-connect"]],template:function(t,n){1&t&&(b.Pb(0,"ion-toolbar",0),b.Nb(1,"img",1),b.Pb(2,"ion-title"),b.sc(3,"Retailgate"),b.Ob(),b.Ob(),b.Pb(4,"ion-content"),b.Pb(5,"div",2),b.Pb(6,"ion-row"),b.Pb(7,"ion-col",3),b.Pb(8,"div",4),b.Pb(9,"div",5),b.Nb(10,"img",6),b.Pb(11,"div",7),b.Pb(12,"p",8),b.sc(13,"Blank project"),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Pb(14,"ion-col",3),b.Pb(15,"div",9),b.Pb(16,"div",5),b.Nb(17,"img",10),b.Pb(18,"div",7),b.Pb(19,"p",8),b.sc(20,"Create from template"),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Pb(21,"ion-col",3),b.Pb(22,"div",4),b.Pb(23,"div",11),b.Pb(24,"div",12),b.Nb(25,"img",13),b.Ob(),b.Pb(26,"div",7),b.Pb(27,"p",8),b.sc(28,"Project 1 "),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Pb(29,"ion-button",14),b.sc(30,"Connect"),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Ob())},directives:[c.w,c.v,c.f,c.o,c.e,c.c],styles:[".content[_ngcontent-%COMP%]{background-color:#f3f2f2;text-align:-webkit-center;width:100%;justify-content:center}.content[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.toolbar[_ngcontent-%COMP%]   .toolbar-icon[_ngcontent-%COMP%]{width:50px;background:#fff;border-radius:25px;padding:4px;margin-left:10px}.c-blank-proj[_ngcontent-%COMP%]{cursor:pointer;overflow:hidden;background-color:#fff;border-radius:10px;height:380px;width:260px;display:flex;justify-content:center;align-items:center;margin-left:5px;margin-top:15px;margin-bottom:15px}.c-blank-proj[_ngcontent-%COMP%]   .c-blank-proj1[_ngcontent-%COMP%]{text-align:center}.c-blank-proj[_ngcontent-%COMP%]   .c-blank-proj1[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{text-align:start;font-weight:750;margin-left:12px;margin-right:12px;margin-top:15px;font-size:23px;line-height:normal}.c-blank-proj[_ngcontent-%COMP%]   .c-proj[_ngcontent-%COMP%]{width:100%;text-align:center}.c-blank-proj[_ngcontent-%COMP%]   .c-proj[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{text-align:start;font-weight:750;margin-left:12px;margin-right:12px;margin-top:15px;font-size:23px;line-height:normal}.c-blank-proj[_ngcontent-%COMP%]   .c-proj[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{background:#e6e5e4;border-radius:60px;padding:10px;height:90px}.btn-connect[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:3%;transform:translate(-50%,-50%)}.template-color[_ngcontent-%COMP%]{background-color:#662063;color:#fff}"]}),t})();const g=[{path:"",pathMatch:"full",redirectTo:"projects"},{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=b.Gb({type:t,selectors:[["app-main-project"]],decls:1,vars:0,template:function(t,n){1&t&&b.Nb(0,"ion-router-outlet")},directives:[c.n],styles:[""]}),t})(),children:[{path:"projects",component:s}]}];let A=(()=>{class t{}return t.\u0275mod=b.Kb({type:t}),t.\u0275inj=b.Jb({factory:function(n){return new(n||t)},imports:[[r.i.forChild(g)],r.i]}),t})(),p=(()=>{class t{}return t.\u0275mod=b.Kb({type:t}),t.\u0275inj=b.Jb({factory:function(n){return new(n||t)},imports:[[e.b,i.e,c.x,A]]}),t})()}}]);