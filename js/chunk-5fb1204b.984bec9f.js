(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fb1204b"],{"1b29":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-page"},[e("search",{ref:"searchBox",on:{finished:t.toSearchResult,switchView:t.switchView},scopedSlots:t._u([{key:"default",fn:function(){return[e("span",{staticClass:"cancel",on:{click:t.back}},[t._v("取消")])]},proxy:!0}])}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"hot"},[e("h4",[t._v("热搜榜")]),e("ul",{staticClass:"hot-search-box"},t._l(t.hotWords,(function(s,i){return e("li",{key:i,staticClass:"hot-search",on:{click:function(e){return t.searchHotWords(s.searchWord)}}},[e("div",{staticClass:"index",class:t.isTop3(i)},[t._v(t._s(i+1))]),e("div",{staticClass:"word",class:t.isTop3(i)},[t._v(" "+t._s(s.searchWord)+" "),s.iconUrl?e("img",{staticClass:"icon",class:{special:5===s.iconType},attrs:{src:s.iconUrl,alt:""}}):t._e()])])})),0)])],1)},o=[],n=e("5530"),a=e("2934"),c=e("e832"),r=e("5880"),h={name:"SearchPage",data:function(){return{hotWords:[],show:!0}},created:function(){this.getHotSearch()},mounted:function(){this.SET_CACHE_VIEWS("SearchPage")},components:{Search:c["a"]},methods:Object(n["a"])(Object(n["a"])({},Object(r["mapMutations"])(["SET_CACHE_VIEWS","REMOVE_CACHE_VIEWS"])),{},{back:function(){this.$router.push("/discover").catch((function(t){return t}))},getHotSearch:function(){var t=this;Object(a["d"])().then((function(s){t.hotWords=s.data}))},isTop3:function(t){return t<=2?"top3":""},toSearchResult:function(t){this.$router.push({path:"/search/".concat(t)}).catch((function(t){return t}))},switchView:function(t){this.show=t},searchHotWords:function(t){this.$refs.searchBox.setKeywords(t),this.$refs.searchBox.finished(t)}}),activated:function(){this.$refs.searchBox.setKeywords("")},beforeRouteLeave:function(t,s,e){t.meta.index>s.meta.index?this.SET_CACHE_VIEWS("SearchPage"):this.REMOVE_CACHE_VIEWS("SearchPage"),e()}},u=h,l=(e("cabf"),e("2877")),f=Object(l["a"])(u,i,o,!1,null,"5da4e351",null);s["default"]=f.exports},6260:function(t,s,e){"use strict";e("c443")},c443:function(t,s,e){},cabf:function(t,s,e){"use strict";e("ff48")},e832:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search"},[e("div",{staticClass:"search-head"},[e("form",{staticClass:"search-form",attrs:{action:"javascript:void 0"},on:{submit:t.finished}},[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.keywords,expression:"keywords",modifiers:{trim:!0}}],ref:"input",staticClass:"searchBox",attrs:{type:"search",placeholder:"音乐/歌手"},domProps:{value:t.keywords},on:{input:[function(s){s.target.composing||(t.keywords=s.target.value.trim())},t.getSuggestion],blur:[t.blur,function(s){return t.$forceUpdate()}],focus:t.focus}})]),t._t("default"),e("span",{staticClass:"icon-search icon-in-input"})],2),e("div",{directives:[{name:"show",rawName:"v-show",value:this.showFlag,expression:"this.showFlag"}],staticClass:"suggest"},[e("ul",t._l(t.suggestion,(function(s,i){return e("li",{key:i,staticClass:"keyword-box",on:{click:function(e){return t.fastSearch(s.keyword)}}},[e("span",{staticClass:"icon-search icon-in-list"}),e("span",{staticClass:"keyword"},[t._v(t._s(s.keyword))])])})),0)])])},o=[],n=e("2934"),a={name:"Search",data:function(){return{keywords:"",suggestion:[],showFlag:!1}},props:{value:String},methods:{getSuggestion:function(){var t=this;this.keywords?Object(n["k"])({type:"mobile",keywords:this.keywords}).then((function(s){t.suggestion=s.result.allMatch})):this.suggestion=[]},finished:function(){this.$emit("finished",this.keywords)},blur:function(){var t=this;s&&clearTimeout(s);var s=setTimeout((function(){t.showFlag=!1,t.$emit("switchView",!0)}),20)},focus:function(){this.showFlag=!!this.keywords,this.$emit("switchView",!this.keywords),this.getSuggestion()},blurInput:function(){this.$refs.input.blur()},setKeywords:function(t){this.keywords=t},fastSearch:function(t){this.$emit("finished",t)}},watch:{keywords:function(){this.showFlag=!!this.keywords,this.$emit("switchView",!this.keywords)}}},c=a,r=(e("6260"),e("2877")),h=Object(r["a"])(c,i,o,!1,null,"7fb4f504",null);s["a"]=h.exports},ff48:function(t,s,e){}}]);