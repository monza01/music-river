(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ded4236"],{1057:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-title"},[t.needBackBtn?n("div",{staticClass:"icon",class:t.iconName,on:{click:t.back}}):t._e(),n("h3",{staticClass:"the-title"},[t._v(t._s(t.pageTitle))])])},a=[],i={name:"PageTitle",props:{iconName:{type:String,default:"icon-angle-left"},pageTitle:{type:String,default:"页面标题"},needBackBtn:{type:Boolean,default:!0},backTo:String},methods:{back:function(){this.backTo?this.$router.push(this.backTo):this.$router.back()}}},o=i,c=(n("8806"),n("2877")),r=Object(c["a"])(o,s,a,!1,null,"3a185879",null);e["a"]=r.exports},"1e85":function(t,e,n){},"41bc":function(t,e,n){"use strict";n("1e85")},"477b":function(t,e,n){},"6ba9":function(t,e,n){"use strict";n("477b")},8806:function(t,e,n){"use strict";n("d98b")},a04e:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMAyrLsKt5MFFL0tn/51XJeIPDFn4VZLg4H55x2ZUDPRBvir5eLSDIlwLw22dKSfGqqp4+kbTw5QEIRrAAABGpJREFUeNrE1+lyokAUBeCDYEDciCK4IG5RkxiXODrn/d9sqpLUBFoaVDqd7z/F5XTf5jbuZDmt4zx+5IdG012MeivoMXXqhyazNDrbtoWfdd4ZzGd2HRs/pNet8iru6BXKrfwNb+BGIVRqV3irwXYMVSKDd5lPtL9e9H4uH77BUoYByrAXLOuxhfs9xFRgHuBOPgVqQyiqa+1SmfkUgnBrcvaUG3+VCjWFjlx1PrsEUi1eo2FW486mwWKNPRKcAT9UITNkPrd1Djy7j0/eOPIPhslcx6yvg4TLHLG/7COLtYuZY/71VH/7fV4jmyFP8n1vIYc1Mijl2gCwrvA/A5mq0n46Bii02nUo8ewByzd+qyDLI7PNfA/XcWQlGFZUY8LwhvdvRjaud5Kk+MaUOi5VmCXe93ET26+xWIQLO2ZZ2LhZ0GWhB4j2zDCIcJdlzAKvEPSYoWLhTlOX+aZIW894aYcSCpYBggMvGBOU4jPHoPgHVAlR0olyMVL+1ijqhCjtoUYZFykvFG08KLCqUmJYsACm0CXKN6KPhOmMoiUUsA1K7ZFwpKgNBSY1yjnJHUhRCwq0rj4IDxRslS2/nJfoFQqaNsozmK+f8xPuoTS7xnxmTgBDlBawyJs8gJmHssIBi7jyACKUVmehrjSAA7QU4OPLtMEUM0B5bRY6yeagI1RYsIgjuwiOoUSv0jSZx5LchAyoY1uTXuvpz0tWKR18GUuGQLXC9ThdijmR7dcAP6vvnZ1Tvb6WTUIuNAsb4pSgmcOU2hSaHZnyDt3iX16BvuQU0mbNtBCaTcQhQbfot/egX+ocVj85L6HbM1Ns6GYwaQbtmkx6hnZVYRjRzmRSDO1qTGpCu3/F2+tyokAQBeDDVQi4iHdFV+MVNW5tyiTn/d9s/22FGUmEIc33AnQx1cD0YVjgQVzYdhc4yoZVlN4FKcR1+VkMcRYLIC5X50bSBi1/EiJThwbS9mz5UdjTQgxpoZojSbPUKE/ajgU2pPlqjiOtow1ppfXbXoMdi94hLGDRFsImDgvSHoQNWJRBWMCWt+hTr+1O3LLlTtzrkZ0wm0XhAbJ8Pc4RZrPlVvSpiD8gy6biBFl7qiLImlMVQJSbUhH7EBVRFa4gadKlyllCUkLNTLYZd9R4B0h6oubiGod0hw4eNZ5R4yUwsByQ5OvIKPKer1HTeVM5Dx/yjssIdUyjmP/d8KBbY790+hY/e6uyT9K9BKimt2XdGewz75qvUMHimaydB7LEKZniIZ3FE3VLmN4D8hId8S1/7pBmBaDPMvE3K3EYdlniiAr+spxn7xIXd7hBdmKpHDCoQJP2t4v389jtrTuTKdwgev0d8ktvRi8mc31UlczYoBDVjZs85gOF8DIEqGmfswGbI+rLUhpyIhhxbzRyPcKUb7O22xkK0RI2eygkS3CuZzTJ/ZWzgpdsjcYd/lgPXn23wg8ZZyd+LcwzFz9qMrqeZrzL2iYuZEw+kuF807+kcTrzulY+iJJlD3X8A5gc4z0r1falAAAAAElFTkSuQmCC"},d98b:function(t,e,n){},ede4:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page container"},[s("alert",{ref:"alert",attrs:{text:t.alertText,"alert-type":t.alertType}}),s("div",{staticClass:"login-header"},[s("page-title",{attrs:{pageTitle:"MUSIC RIVER","icon-name":"icon-angle-left"}})],1),t._m(0),s("login-form",{on:{loginClicked:t.toLogin}}),s("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading"},[s("img",{attrs:{src:n("a04e"),alt:""}})])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logo-container"},[n("h1",{staticClass:"logo"},[t._v("M")])])}],i=n("5530"),o=n("1057"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("div",{staticClass:"info"},[t._v("登录")]),n("div",{staticClass:"account-box"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.accountInfo,expression:"accountInfo",modifiers:{trim:!0}}],ref:"accountInput",class:{focused:t.isFocused(0)},attrs:{type:t.currentType,placeholder:t.currentPlaceholder},domProps:{value:t.accountInfo},on:{focus:function(e){return t.handleFocus(0)},blur:[t.handleBlur,function(e){return t.$forceUpdate()}],input:[function(e){e.target.composing||(t.accountInfo=e.target.value.trim())},t.inputChange]}}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.accountInfo,expression:"this.accountInfo"}],staticClass:"icon-cancel",on:{click:function(e){return e.preventDefault(),t.clearValue(0)}}})]),n("div",{staticClass:"pwd-box"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],ref:"pwdInput",class:{focused:t.isFocused(1)},attrs:{type:"password",placeholder:"密码"},domProps:{value:t.password},on:{focus:function(e){return t.handleFocus(1)},blur:[t.handleBlur,function(e){return t.$forceUpdate()}],input:[function(e){e.target.composing||(t.password=e.target.value.trim())},t.inputChange],keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitData(e)}}}),n("span",{directives:[{name:"show",rawName:"v-show",value:this.password,expression:"this.password"}],staticClass:"icon-cancel",on:{click:function(e){return e.preventDefault(),t.clearValue(1)}}})]),n("div",{staticClass:"toggle-type",on:{click:t.toggleType}},[n("span",{staticClass:"icon-exchange"}),t._v(" "+t._s(t.toggleText)+" ")]),n("div",{staticClass:"login-btn",class:{valid:t.valid},on:{click:t.submitData}},[t._v(" 登录 ")])])},r=[],l=/^1[3456789]\d{9}$/,u=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,d={name:"LoginForm",data:function(){return{phoneType:!0,focusedInput:-1,accountInfo:"",password:"",valid:!1,showAlert:!1,clicked:!1}},computed:{currentPlaceholder:function(){return this.phoneType?"请输入手机号":"请输入邮箱"},toggleText:function(){return this.phoneType?"使用邮箱登录":"使用手机号登录"},currentType:function(){return this.phoneType?"tel":"email"},isFocused:function(){return function(t){return this.focusedInput===t}}},methods:{toggleType:function(){this.phoneType=!this.phoneType,this.accountInfo="",this.password=""},handleFocus:function(t){this.focusedInput=t},handleBlur:function(){this.focusedInput=-1},clearValue:function(t){0===t?(this.$refs.accountInput.focus(),this.accountInfo=""):(this.$refs.pwdInput.focus(),this.password="")},inputChange:function(){this.phoneType?this.valid=l.test(this.accountInfo)&&this.password.length>=6:this.valid=u.test(this.accountInfo)&&this.password.length>=6},submitData:function(){this.$emit("loginClicked",{accountInfo:this.accountInfo,password:this.password,type:this.phoneType?"phone":"email",valid:this.valid})}}},h=d,p=(n("41bc"),n("2877")),f=Object(p["a"])(h,c,r,!1,null,"1f54b9d8",null),g=f.exports,m=n("4e1c"),v=n("c24f"),w=n("5880"),y={name:"Login",components:{PageTitle:o["a"],LoginForm:g,Alert:m["a"]},data:function(){return{alertText:"登录成功 ！",alertType:"success",loading:!1}},methods:Object(i["a"])(Object(i["a"])({},Object(w["mapActions"])(["manageUser"])),{},{toLogin:function(t){var e=this;t.valid?this.loading||("phone"===t.type?(this.loading=!0,Object(v["h"])({phone:t.accountInfo,password:t.password}).then((function(t){e.success(t),e.loading=!1})).catch((function(t){e.error(t),e.loading=!1}))):(this.loading=!0,Object(v["g"])({email:t.accountInfo,password:t.password}).then((function(t){e.success(t),e.loading=!1})).catch((function(t){e.error(t),e.loading=!1})))):(this.alertType="warn",this.alertText="账号或密码格式不正确 ！",this.$refs.alert.show())},success:function(t){200===t.code?(this.manageUser({status:!0,id:t.account.id,avatar:t.profile.avatarUrl}),this.$cookies.set("userCookie",t.cookie),this.$router.push("/profile").catch((function(t){return t}))):(this.alertType="warn",this.alertText=t.msg,this.$refs.alert.show())},error:function(t){this.alertType="warn",this.alertText=t.msg,this.$refs.alert.show()}})},A=y,T=(n("6ba9"),Object(p["a"])(A,s,a,!1,null,null,null));e["default"]=T.exports}}]);