(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-010302fe"],{1057:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-title"},[t.needBackBtn?a("div",{staticClass:"icon",class:t.iconName,on:{click:t.back}}):t._e(),a("h3",{staticClass:"the-title"},[t._v(t._s(t.pageTitle))])])},n=[],l={name:"PageTitle",props:{iconName:{type:String,default:"icon-angle-left"},pageTitle:{type:String,default:"页面标题"},needBackBtn:{type:Boolean,default:!0},backTo:String},methods:{back:function(){this.backTo?this.$router.push(this.backTo):this.$router.back()}}},i=l,r=(a("8806"),a("2877")),o=Object(r["a"])(i,s,n,!1,null,"3a185879",null);e["a"]=o.exports},"18ba":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"playlists container"},[a("page-title",{attrs:{"back-to":"/discover",pageTitle:"歌单广场"}}),a("mini-tab-bar",{ref:"miniTab",staticClass:"mini-tab",attrs:{tags:t.tags,layout:"space-between"},on:{tagClicked:t.changeTag}}),a("transition",[a("keep-alive",[a(t.currentTabComponent,{tag:"component",attrs:{cat:t.currentCat}})],1)],1)],1)},n=[],l=a("5530"),i=a("1057"),r=a("3b67"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{ref:"list",attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},c=[],u=a("ac0d"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-playlists container"},[a("my-scroll",{ref:"myScroll",attrs:{"pull-up":t.pullUpLoad,"remember-scroll":!0},on:{pullUp:t.emitPullUp},scopedSlots:t._u([{key:"scrollContent",fn:function(){return[a("div",{staticClass:"lists scroll-content"},t._l(t.playlists,(function(t,e){return a("song-list-cover",{key:e,attrs:{detail:t}})})),1),a("loader",{directives:[{name:"show",rawName:"v-show",value:t.more,expression:"more"}],staticClass:"the-loader"}),t.more?t._e():a("p",{staticClass:"bottom"},[t._v("到底啦 ！")])]},proxy:!0}])})],1)},d=[],f=a("dcab"),m=a("a827"),y={mixins:[u["c"],u["a"]],name:"CategoryPlaylists",components:{MyScroll:f["a"],SongListCover:m["a"]},props:{playlists:Array,more:{type:Boolean,default:!0},pullUpLoad:{type:Boolean,default:!0}},methods:{emitPullUp:function(){this.$emit("pullUp")}},activated:function(){var t=this;this.bus.$on("coverClicked",(function(e){t.toPlaylistsDetail(e)}))}},h=y,b=(a("6dc1"),a("2877")),g=Object(b["a"])(h,p,d,!1,null,"47cf2c75",null),v=g.exports,C={mixins:[u["b"]],components:{CategoryPlaylists:v}},_=C,T=Object(b["a"])(_,o,c,!1,null,"6b65ce65",null),U=T.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},k=[],x={mixins:[u["b"]],components:{CategoryPlaylists:v}},S=x,O=Object(b["a"])(S,E,k,!1,null,"ead97050",null),$=O.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},j=[],P={mixins:[u["b"]],components:{CategoryPlaylists:v}},L=P,M=Object(b["a"])(L,D,j,!1,null,"aaa8d396",null),w=M.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},A=[],W={mixins:[u["b"]],components:{CategoryPlaylists:v}},R=W,B=Object(b["a"])(R,I,A,!1,null,"d67b1b64",null),F=B.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},V=[],H={mixins:[u["b"]],components:{CategoryPlaylists:v}},z=H,q=Object(b["a"])(z,N,V,!1,null,"20da4fd0",null),J=q.exports,G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("category-playlists",{attrs:{playlists:t.playlistsData,more:t.more,pullUpLoad:t.pullUpLoad},on:{pullUp:t.getMoreData}})},X=[],K={mixins:[u["b"]],components:{CategoryPlaylists:v}},Q=K,Y=Object(b["a"])(Q,G,X,!1,null,"50516686",null),Z=Y.exports,tt=a("5880"),et={name:"Playlists",data:function(){return{tags:["推荐","欧美","华语","流行","摇滚","说唱"],componentsName:["Recommend","EAndA","Mandarin","Popular","Rock","Rap"],currentTag:0}},components:{PageTitle:i["a"],MiniTabBar:r["a"],Recommend:U,EAndA:$,Mandarin:w,Popular:F,Rock:J,Rap:Z},mounted:function(){this.SET_CACHE_VIEWS("Playlists")},methods:Object(l["a"])(Object(l["a"])({},Object(tt["mapMutations"])(["SET_CACHE_VIEWS","REMOVE_CACHE_VIEWS"])),{},{changeTag:function(t){this.currentTag=t}}),computed:{currentCat:function(){return this.currentTag?this.tags[this.currentTag]:"全部"},currentTabComponent:function(){return this.componentsName[this.currentTag]}},beforeRouteLeave:function(t,e,a){t.meta.index>e.meta.index?this.SET_CACHE_VIEWS("Playlists"):this.REMOVE_CACHE_VIEWS("Playlists"),a()}},at=et,st=(a("3f18"),Object(b["a"])(at,s,n,!1,null,"45862cea",null));e["default"]=st.exports},"3b67":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mini-tab-bar",style:t.flexStyle},[t._l(t.tags,(function(e,s){return a("div",{key:s,ref:"tabItems",refInFor:!0,staticClass:"tab-item",class:{current:t.currentTag===s},on:{click:function(e){return t.changeTag(s)}}},[t._v(" "+t._s(e)+" ")])})),a("div",{ref:"border",staticClass:"border",style:t.borderStyle})],2)},n=[],l=a("26a1"),i=Object(l["a"])("transform"),r={name:"MiniTabBar",data:function(){return{currentTag:0,borderWidth:0}},methods:{changeTag:function(t){this.currentTag=t,this.$refs.border.style[i]="translateX(".concat(this.$refs.tabItems[t].offsetLeft,"px)"),this.borderWidth=this.$refs.tabItems[t].offsetWidth,this.$emit("tagClicked",this.currentTag)}},computed:{flexStyle:function(){return"justify-content: ".concat(this.layout)},borderStyle:function(){return"width:".concat(this.borderWidth,"px")}},mounted:function(){this.borderWidth=this.$refs.tabItems[0].offsetWidth},props:{tags:{type:Array,default:function(){return[]}},layout:{type:String,default:"flex-start"}}},o=r,c=(a("5bd8"),a("2877")),u=Object(c["a"])(o,s,n,!1,null,"6fbfc5c6",null);e["a"]=u.exports},"3f18":function(t,e,a){"use strict";a("a98d")},4312:function(t,e,a){"use strict";a("4977")},4977:function(t,e,a){},"5bd8":function(t,e,a){"use strict";a("e826")},"6dc1":function(t,e,a){"use strict";a("806b")},"806b":function(t,e,a){},8806:function(t,e,a){"use strict";a("d98b")},a827:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{on:{click:function(e){return t.coverClicked(t.detail.id)}}},[a("div",{staticClass:"cover"},[t.detail.coverImgUrl?a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.setUrl(t.detail.coverImgUrl,105,105),expression:"setUrl(detail.coverImgUrl, 105, 105)"}],attrs:{alt:""}}):a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.setUrl(t.detail.picUrl,105,105),expression:"setUrl(detail.picUrl, 105, 105)"}],attrs:{alt:""}}),"playCount"===t.subMsgType?a("div",{staticClass:"play-count icon-play"},[t._v(" "+t._s(t.formatPlayCount)+" ")]):a("div",{staticClass:"play-count"},[t._v(t._s(t.detail.updateFrequency))])]),a("div",{staticClass:"title"},[t._v(t._s(t.detail.name))])])},n=[],l=a("fa7d"),i={name:"Cover",props:{detail:Object,subMsgType:{type:String,default:"playCount"}},computed:{formatPlayCount:function(){return Object(l["b"])(this.detail.playCount)}},methods:{coverClicked:function(t){this.bus.$emit("coverClicked",t)}}},r=i,o=(a("4312"),a("2877")),c=Object(o["a"])(r,s,n,!1,null,"2f62ae3a",null);e["a"]=c.exports},a98d:function(t,e,a){},ac0d:function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"d",(function(){return o})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return u}));a("4160"),a("a9e3"),a("159b");var s=a("5530"),n=a("2934"),l=a("5880"),i=36,r={data:function(){return{playlistsData:[],loading:!1,more:!0,total:0,pullUpLoad:!0}},props:{cat:String,default:"全部"},created:function(){this.OFFSET=36,this.getPlaylistsData()},methods:{getPlaylistsData:function(){var t=this;Object(n["b"])({limit:i,cat:this.cat,offset:0}).then((function(e){t.playlistsData=e.playlists,t.total=e.total}))},getMoreData:function(){var t=this;!this.loading&&this.more&&(this.loading=!0,Object(n["b"])({limit:i,cat:this.cat,offset:this.OFFSET}).then((function(e){e.playlists.forEach((function(e){t.playlistsData.push(e)})),t.OFFSET+=i,t.loading=!1,t.more=t.playlistsData.length<t.total,t.pullUpLoad=t.more})))}}},o={data:function(){return{singers:[],time:0,loading:!0}},props:{cat:{type:Number,default:1}},created:function(){this.getTopSingers()},methods:{getTopSingers:function(){var t=this;Object(n["o"])({type:this.cat}).then((function(e){t.singers=e.list.artists,t.time=e.list.updateTime,t.loading=!1}))}},computed:{updateTime:function(){var t=new Date(this.time);return t.getMonth()+1+"月"+t.getDate()+"日"}}},c={methods:{toPlaylistsDetail:function(t){this.$router.push({path:"/playlists/detail/".concat(t),query:{type:"music-lists"}}).catch((function(t){return t}))},toRankDetail:function(t){this.$router.push({path:"/playlists/detail/".concat(t),query:{type:"rank"}}).catch((function(t){return t}))}},deactivated:function(){this.bus.$off(["coverClicked","rankClicked"])}},u={computed:Object(s["a"])({},Object(l["mapGetters"])(["playlist"])),mounted:function(){this.playlist.length>0&&(this.$refs.myScroll.$el.style.padding="0 0 0.5rem 0")}}},d98b:function(t,e,a){},e826:function(t,e,a){}}]);