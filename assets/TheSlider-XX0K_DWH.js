/* empty css                   */import{_ as c,f as _,o as a,c as n,b as t,d as u,w as g,e as f,t as r,q as h,F as b,r as y}from"./index-CrEprENQ.js";const S={name:"TheSliderItem",props:{value:{type:Object,required:!0},newArrivals:{type:String}}},V={class:"plant"},P={class:"plant__img"},x=["src","alt","title"],T={class:"plant__info"},B={class:"plant__newArrivals"};function k(p,s,e,v,m,w){var i,o,d;const l=_("RouterLink");return a(),n("div",V,[t("div",P,[t("img",{src:Array.isArray(e.value.img)?e.value.img[0]:e.value.img,alt:e.value.name,title:e.value.name},null,8,x)]),u(l,{to:{name:"TheSinglePlantPage",params:{id:e.value.id}},class:"plant__name"},{default:g(()=>[f(r(e.value.name||e.value.title),1)]),_:1},8,["to"]),t("div",T,[t("span",null,r(((i=e.value)==null?void 0:i.price)||((o=e.value)==null?void 0:o.data))+" ₴",1),t("span",B,r((d=e.value)==null?void 0:d.status),1)])])}const I=c(S,[["render",k],["__scopeId","data-v-f48c4af1"]]),N={name:"TheSlider",components:{TheSliderItem:I},props:{values:{type:Array,required:!0},title:{type:String},sliderName:{type:String},slidesPerView:{type:Number}},mounted(){h()}},A={class:"slider"},q={class:"slider__container"},E={class:"slider__title"},L=["slides-per-view"],C={class:"swiper-pagination-progressbar",ref:"progressBar"};function F(p,s,e,v,m,w){const l=_("TheSliderItem");return a(),n("section",A,[t("div",q,[t("h2",E,r(e.title),1),t("swiper-container",{ref:"sliderName","slides-per-view":e.slidesPerView,loop:!0,pagination:{type:"progressbar",el:".swiper-pagination-progressbar "},"space-between":"72",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{400:{slidesPerView:1.1,spaceBetween:30},500:{slidesPerView:1.5,spaceBetween:40},700:{slidesPerView:1.8},992:{slidesPerView:2.5,spaceBetween:50},1050:{slidesPerView:3},1572:{slidesPerView:4,spaceBetween:72}}},[(a(!0),n(b,null,y(e.values,i=>(a(),n("swiper-slide",{key:i.id},[u(l,{value:i,"new-arrivals":e.title},null,8,["value","new-arrivals"])]))),128))],8,L),t("div",C,s[0]||(s[0]=[t("span",{class:"swiper-pagination-progressbar-fill"},null,-1)]),512),s[1]||(s[1]=t("div",{class:"swiper-button-prev"},null,-1)),s[2]||(s[2]=t("div",{class:"swiper-button-next"},null,-1))])])}const D=c(N,[["render",F],["__scopeId","data-v-e2264659"]]);export{D as T};
