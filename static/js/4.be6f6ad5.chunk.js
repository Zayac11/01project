(this.webpackJsonp01project=this.webpackJsonp01project||[]).push([[4],{292:function(e,a,t){"use strict";t.d(a,"a",(function(){return u}));var s=t(20),n=t(21),i=t(23),r=t(22),o=t(0),c=t.n(o),l=t(9),m=t(11),g=function(e){return{isAuth:e.auth.isAuth}},u=function(e){var a=function(a){Object(i.a)(o,a);var t=Object(r.a)(o);function o(){return Object(s.a)(this,o),t.apply(this,arguments)}return Object(n.a)(o,[{key:"render",value:function(){return this.props.isAuth?c.a.createElement(e,this.props):c.a.createElement(l.a,{to:"/login"})}}]),o}(c.a.Component);return Object(m.b)(g)(a)}},293:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__15XnY",active:"Dialogs_active__Ap9xp",dialogsItems:"Dialogs_dialogsItems__SssmW",dialog:"Dialogs_dialog__34NCm",messages:"Dialogs_messages__1pP-7",message:"Dialogs_message__UtrQr"}},301:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),i=t(128),r=t(293),o=t.n(r),c=t(14),l=function(e){return n.a.createElement("div",{className:o.a.dialog},n.a.createElement("img",{src:"https://vignette.wikia.nocookie.net/avatar/images/f/f4/3%D1%8521_%D0%90%D0%B0%D0%BD%D0%B3.jpg/revision/latest?cb=20110327121409&path-prefix=ru",alt:"avatar"}),n.a.createElement(c.b,{to:"/dialogs/"+e.id,activeClassName:o.a.active},e.name))},m=function(e){return n.a.createElement("div",{className:o.a.message},e.message)},g=t(85),u=t(88),d=t(129),p=t(37),f=Object(g.a)(50),b=Object(d.a)({form:"dialogAddMessageForm"})((function(e){return n.a.createElement("form",{onSubmit:e.handleSubmit},n.a.createElement(u.a,{placeholder:"Enter your message",name:"newMessageBody",component:p.b,validate:[g.b,f]}),n.a.createElement("div",null,n.a.createElement("button",null,"Send message")))})),v=function(e){var a=e.dialogsData.map((function(e){return n.a.createElement(l,{name:e.name,key:e.id,id:e.id})})),t=e.messagesData.map((function(e){return n.a.createElement(m,{message:e.message,key:e.id})}));return n.a.createElement("div",{className:o.a.dialogs},n.a.createElement("div",{className:o.a.dialogsItems},a),n.a.createElement("div",{className:o.a.messages},t,n.a.createElement("div",null,n.a.createElement(b,{onSubmit:function(a){e.addMessage(a.newMessageBody)}}))))},_=t(11),D=t(292),E=t(8),h=Object(E.d)(Object(_.b)((function(e){return{dialogsData:e.dialogsPage.dialogsData,messagesData:e.dialogsPage.messagesData,newMessageText:e.dialogsPage.newMessageText}}),(function(e){return{addMessage:function(a){e(Object(i.a)(a))}}})),D.a)(v);a.default=h}}]);
//# sourceMappingURL=4.be6f6ad5.chunk.js.map