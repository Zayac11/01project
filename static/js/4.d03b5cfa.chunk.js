(this.webpackJsonp01project=this.webpackJsonp01project||[]).push([[4],{295:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__12Lp6",active:"Dialogs_active__1aVXh",dialogsItems:"Dialogs_dialogsItems__2D7zr",dialog:"Dialogs_dialog__1XzUo",messages:"Dialogs_messages__WLERb",message:"Dialogs_message__wBIto"}},300:function(e,a,t){"use strict";t.r(a);var s=t(130),n=t(0),i=t.n(n),o=t(295),l=t.n(o),r=t(16),c=function(e){return i.a.createElement("div",{className:l.a.dialog},i.a.createElement("img",{src:"https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru",alt:"avatar"}),i.a.createElement(r.b,{to:"/dialogs/"+e.id,activeClassName:l.a.active},e.name))},m=function(e){return i.a.createElement("div",{className:l.a.message},e.message)},g=t(67),d=t(89),u=t(131),v=t(25),b=Object(g.a)(50),f=Object(u.a)({form:"dialogAddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement(d.a,{placeholder:"Enter your message",name:"newMessageBody",component:v.b,validate:[g.b,b]}),i.a.createElement("div",null,i.a.createElement("button",null,"Send message")))})),D=function(e){var a=e.dialogsData.map((function(e){return i.a.createElement(c,{name:e.name,key:e.id,id:e.id})})),t=e.messagesData.map((function(e){return i.a.createElement(m,{message:e.message,key:e.id})}));return i.a.createElement("div",{className:l.a.dialogs},i.a.createElement("div",{className:l.a.dialogsItems},a),i.a.createElement("div",{className:l.a.messages},t,i.a.createElement("div",null,i.a.createElement(f,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}}))))},E=t(14),_=t(34),p=t(10),h=function(e){return{isAuth:e.auth.isAuth}};var j=t(9),k=Object(j.d)(Object(E.b)((function(e){return{dialogsData:e.dialogsPage.dialogsData,messagesData:e.dialogsPage.messagesData}}),{sendMessage:s.a.sendMessage}),(function(e){return Object(E.b)(h)((function(a){var t=a.isAuth,s=Object(_.a)(a,["isAuth"]);return t?i.a.createElement(e,s):i.a.createElement(p.a,{to:"/login"})}))}))(D);a.default=k}}]);
//# sourceMappingURL=4.d03b5cfa.chunk.js.map