import{u as h}from"./categories-DSXdPruc.js";import{m as u,a as D,_,o as a,c as n,b as t,F as x,r as P,d,w as m,e as w,t as b,f as r,g as v,h as B}from"./index-CrEprENQ.js";import{P as V}from"./PopUpBag-DbFKedAG.js";import M from"./TheProfile-B9MO9Nie.js";import{u as U}from"./users-ayq1BXwY.js";import"./TheBagsItem-r3fw0yKX.js";import"./TheButtonOrange-BIz4xVJP.js";import"./TheTab-Cripc5QL.js";const T={name:"TheDropdown",props:{toggleDropdown:{type:Function},isDropdownOpen:{type:Boolean}},data(){return{}},computed:{...u(h,["categories"]),isDataExists(){return!!localStorage.getItem("categories")}},methods:{...D(h,["getCategories"])},async created(){this.isDataExists||await this.getCategories()},async mounted(){await this.getCategories()}},H={class:"main"},O={class:"header"},y={class:"header__container"},L={class:"nav"};function $(p,e,c,g,i,o){const l=r("RouterLink");return a(),n("div",H,[t("header",O,[t("div",y,[e[1]||(e[1]=t("span",null,"Категорії",-1)),t("button",{class:"header__close",onClick:e[0]||(e[0]=(...s)=>c.toggleDropdown&&c.toggleDropdown(...s))})])]),t("nav",L,[t("ul",null,[(a(!0),n(x,null,P(p.categories,s=>(a(),n("li",{key:s,class:"nav__item"},[d(l,{to:{name:"TheCatalogPage",params:{category:s}},onClick:c.toggleDropdown},{default:m(()=>[w(b(s),1)]),_:2},1032,["to","onClick"])]))),128))])])])}const Z=_(T,[["render",$],["__scopeId","data-v-56ec21cc"]]),j="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.57143%207.57143H19.4286C19.7442%207.57143%2020%207.31561%2020%207V5.57143C20%205.25582%2019.7442%205%2019.4286%205H4.57143C4.25582%205%204%205.25582%204%205.57143V7C4%207.31561%204.25582%207.57143%204.57143%207.57143ZM4.57143%2013.2857H19.4286C19.7442%2013.2857%2020%2013.0299%2020%2012.7143V11.2857C20%2010.9701%2019.7442%2010.7143%2019.4286%2010.7143H4.57143C4.25582%2010.7143%204%2010.9701%204%2011.2857V12.7143C4%2013.0299%204.25582%2013.2857%204.57143%2013.2857ZM4.57143%2019H19.4286C19.7442%2019%2020%2018.7442%2020%2018.4286V17C20%2016.6844%2019.7442%2016.4286%2019.4286%2016.4286H4.57143C4.25582%2016.4286%204%2016.6844%204%2017V18.4286C4%2018.7442%204.25582%2019%204.57143%2019Z'%20fill='%23272020'/%3e%3c/svg%3e",F="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.81043%202L5.19043%205.63'%20stroke='%23272020'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.1904%202L18.8104%205.63'%20stroke='%23272020'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M2%207.8501C2%206.0001%202.99%205.8501%204.22%205.8501H19.78C21.01%205.8501%2022%206.0001%2022%207.8501C22%2010.0001%2021.01%209.8501%2019.78%209.8501H4.22C2.99%209.8501%202%2010.0001%202%207.8501Z'%20stroke='%23272020'%20stroke-width='1.5'/%3e%3cpath%20d='M3.5%2010L4.91%2018.64C5.23%2020.58%206%2022%208.86%2022H14.89C18%2022%2018.46%2020.64%2018.82%2018.76L20.5%2010'%20stroke='%23272020'%20stroke-width='1.5'%20stroke-linecap='round'/%3e%3c/svg%3e",I="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2012C14.7614%2012%2017%209.76142%2017%207C17%204.23858%2014.7614%202%2012%202C9.23858%202%207%204.23858%207%207C7%209.76142%209.23858%2012%2012%2012Z'%20stroke='%23272020'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M20.5901%2022C20.5901%2018.13%2016.7402%2015%2012.0002%2015C7.26015%2015%203.41016%2018.13%203.41016%2022'%20stroke='%23272020'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",R="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2012C14.7614%2012%2017%209.76142%2017%207C17%204.23858%2014.7614%202%2012%202C9.23858%202%207%204.23858%207%207C7%209.76142%209.23858%2012%2012%2012Z'%20stroke='%23090909'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3.41%2022C3.41%2018.13%207.26%2015%2012%2015C12.96%2015%2013.89%2015.13%2014.76%2015.37'%20stroke='%23090909'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M22%2018C22%2018.75%2021.79%2019.46%2021.42%2020.06C21.21%2020.42%2020.94%2020.74%2020.63%2021C19.93%2021.63%2019.01%2022%2018%2022C16.54%2022%2015.27%2021.22%2014.58%2020.06C14.21%2019.46%2014%2018.75%2014%2018C14%2016.74%2014.58%2015.61%2015.5%2014.88C16.19%2014.33%2017.06%2014%2018%2014C20.21%2014%2022%2015.79%2022%2018Z'%20stroke='%23085500'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16.4404%2018L17.4304%2018.99L19.5604%2017.02'%20stroke='%23085500'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",S={name:"TheHeader",components:{TheDropdown:Z,PopUpBag:V,TheProfile:M},data(){return{isDropdownOpen:!1,isPopUpVisible:!1,isCabinetOpen:!1}},computed:{...u(U,["user"])},methods:{toggleDropdown(){this.isDropdownOpen=!this.isDropdownOpen},togglePopUpBag(){this.isPopUpVisible=!this.isPopUpVisible},toggleCabinet(){this.isCabinetOpen=!this.isCabinetOpen}}},N={class:"header"},E={class:"header__container"},A={key:0,class:"header__overlay"},q={class:"header__logo"},z={class:"header__icons"},G={key:0,class:"header__overlay"},J={key:1,class:"header__overlay"},K={key:2};function Q(p,e,c,g,i,o){const l=r("TheDropdown"),s=r("RouterLink"),C=r("PopUpBag"),k=r("TheProfile");return a(),n("header",N,[t("div",E,[t("div",{class:"header__categories",onClick:e[0]||(e[0]=(...f)=>o.toggleDropdown&&o.toggleDropdown(...f))},e[3]||(e[3]=[t("div",{class:"header__menu"},[t("img",{src:j,alt:"Icon of menu",title:"Menu"})],-1),t("span",null,"Категорії",-1)])),i.isDropdownOpen?(a(),n("div",A,[d(l,{isDropdownOpen:i.isDropdownOpen,toggleDropdown:o.toggleDropdown},null,8,["isDropdownOpen","toggleDropdown"])])):v("",!0),t("div",q,[d(s,{to:{name:"HomePage"}},{default:m(()=>e[4]||(e[4]=[w("КВІТКАРКА ")])),_:1})]),t("div",z,[t("div",{class:"header__icon",onClick:e[1]||(e[1]=(...f)=>o.togglePopUpBag&&o.togglePopUpBag(...f))},e[5]||(e[5]=[t("img",{src:F,alt:"Bag",title:"Bag"},null,-1)])),i.isPopUpVisible?(a(),n("div",G,[d(C,{isPopUpVisible:i.isPopUpVisible,togglePopUpBag:o.togglePopUpBag},null,8,["isPopUpVisible","togglePopUpBag"])])):v("",!0),t("div",{class:"header__icon",onClick:e[2]||(e[2]=(...f)=>o.toggleCabinet&&o.toggleCabinet(...f))},e[6]||(e[6]=[t("img",{src:I,alt:"User profile",title:"User profile"},null,-1)])),i.isCabinetOpen&&!this.user.length?(a(),n("div",J,[d(k,{isCabinetOpen:i.isCabinetOpen,toggleCabinet:o.toggleCabinet},null,8,["isCabinetOpen","toggleCabinet"])])):this.user.length?(a(),n("div",K,[d(s,{to:{name:"TheAccountPage"}},{default:m(()=>e[7]||(e[7]=[t("img",{src:R,alt:"icon",title:"icon"},null,-1)])),_:1})])):v("",!0)])])])}const W=_(S,[["render",Q],["__scopeId","data-v-c0a56815"]]),X="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.57581%209C4.57581%208.17172%204.77783%207.41667%205.18186%206.73485C5.5859%206.05303%206.12882%205.5101%206.81063%205.10606C7.49244%204.70202%208.24748%204.5%209.07576%204.5C9.79292%204.5%2010.4545%204.65404%2011.0606%204.96212C11.6717%205.2702%2012.1767%205.69192%2012.5757%206.22727C12.9747%206.75758%2013.2222%207.35859%2013.3181%208.0303H11.4848C11.3838%207.5101%2011.1035%207.08586%2010.6439%206.75758C10.1843%206.42424%209.66161%206.25758%209.07576%206.25758C8.57071%206.25758%208.11112%206.38131%207.69698%206.62879C7.28285%206.87626%206.95204%207.20707%206.70457%207.62121C6.4571%208.03535%206.33336%208.49495%206.33336%209C6.33336%209.50505%206.4571%209.96465%206.70457%2010.3788C6.95204%2010.7929%207.28285%2011.1237%207.69698%2011.3712C8.11112%2011.6187%208.57071%2011.7424%209.07576%2011.7424C9.66161%2011.7424%2010.1566%2011.5783%2010.5606%2011.25C10.9697%2010.9167%2011.2272%2010.4899%2011.3333%209.9697H13.1666C13.0707%2010.6414%2012.8358%2011.2449%2012.4621%2011.7803C12.0883%2012.3106%2011.6086%2012.7298%2011.0227%2013.0379C10.4419%2013.346%209.79292%2013.5%209.07576%2013.5C8.24748%2013.5%207.49244%2013.298%206.81063%2012.8939C6.12882%2012.4899%205.5859%2011.947%205.18186%2011.2652C4.77783%2010.5833%204.57581%209.82828%204.57581%209ZM9%2017C7.899%2017%206.86366%2016.7929%205.89397%2016.3788C4.92934%2015.9646%204.07834%2015.3914%203.34097%2014.6591C2.60866%2013.9217%202.03291%2013.0707%201.61372%2012.1061C1.19958%2011.1414%200.995041%2010.1061%201.00009%209C1.00514%207.89394%201.21474%206.85859%201.62887%205.89394C2.04806%204.92929%202.62381%204.08081%203.35612%203.34849C4.08844%202.61111%204.93691%202.03535%205.90155%201.62121C6.86619%201.20707%207.899%201%209%201C10.106%201%2011.1414%201.20707%2012.106%201.62121C13.0757%202.03535%2013.9242%202.61111%2014.6515%203.34849C15.3838%204.08081%2015.957%204.92929%2016.3711%205.89394C16.7853%206.85859%2016.9949%207.89394%2016.9999%209C17.005%2010.1061%2016.8004%2011.1414%2016.3863%2012.1061C15.9721%2013.0707%2015.3989%2013.9217%2014.6666%2014.6591C13.9343%2015.3914%2013.0833%2015.9646%2012.1136%2016.3788C11.1439%2016.7929%2010.106%2017%209%2017ZM9%2015.2424C9.86363%2015.2424%2010.6742%2015.0808%2011.4318%2014.7576C12.1894%2014.4343%2012.8535%2013.9874%2013.4242%2013.4167C13.9949%2012.846%2014.4419%2012.1843%2014.7651%2011.4318C15.0883%2010.6742%2015.2474%209.86616%2015.2424%209.00758C15.2373%208.14394%2015.0732%207.33333%2014.7499%206.57576C14.4267%205.81818%2013.9797%205.15404%2013.409%204.58333C12.8383%204.01263%2012.1767%203.56566%2011.4242%203.24242C10.6717%202.91919%209.86363%202.75758%209%202.75758C8.14142%202.75758%207.33588%202.91919%206.58336%203.24242C5.83084%203.56566%205.16924%204.01515%204.59853%204.59091C4.02783%205.16162%203.57834%205.82576%203.25007%206.58333C2.92684%207.33586%202.7627%208.14394%202.75765%209.00758C2.7526%209.86111%202.91169%2010.6667%203.23491%2011.4242C3.55814%2012.1768%204.00511%2012.8384%204.57581%2013.4091C5.15156%2013.9798%205.81569%2014.4293%206.56821%2014.7576C7.32578%2015.0808%208.13637%2015.2424%209%2015.2424Z'%20fill='%23999999'/%3e%3c/svg%3e",Y={name:"TheFooter"};function e2(p,e,c,g,i,o){return e[0]||(e[0]=B('<section class="footer" data-v-cf1fcf6d><div class="footer__container" data-v-cf1fcf6d><div class="footer__wrapp" data-v-cf1fcf6d><span class="footer__logo" data-v-cf1fcf6d>КВІТКАРКА</span><span class="footer__desc" data-v-cf1fcf6d>Наші рослини надихають, наповнюють простір естетикою та затишком.</span></div><div class="footer__items" data-v-cf1fcf6d><div class="footer__item" data-v-cf1fcf6d><h3 data-v-cf1fcf6d>Отримати допомогу</h3><ul class="footer__list" data-v-cf1fcf6d><li data-v-cf1fcf6d>Доставка та оплата</li><li data-v-cf1fcf6d>Повернення та обмін</li><li data-v-cf1fcf6d>Підбір рослини</li></ul></div><div class="footer__item" data-v-cf1fcf6d><h3 data-v-cf1fcf6d>Навігація</h3><ul class="footer__list" data-v-cf1fcf6d><li data-v-cf1fcf6d>Розпродаж</li><li data-v-cf1fcf6d>Новинки</li><li data-v-cf1fcf6d>Топ продажів</li><li data-v-cf1fcf6d>Каталог</li></ul></div><div class="footer__item" data-v-cf1fcf6d><h3 data-v-cf1fcf6d>Контакти</h3><ul class="footer__list" data-v-cf1fcf6d><li data-v-cf1fcf6d>+ 38 086 880 33 22</li><li data-v-cf1fcf6d>+ 38 077 077 00 11</li><li data-v-cf1fcf6d>+ 38 333 232 43 34</li></ul></div><div class="footer__item" data-v-cf1fcf6d><h3 data-v-cf1fcf6d>Підтримка</h3><ul class="footer__list" data-v-cf1fcf6d><li data-v-cf1fcf6d>kvitkarka@gmail.com</li><li data-v-cf1fcf6d>infokvitka@gmail.com</li></ul></div></div></div></section><section class="polite" data-v-cf1fcf6d><div class="polite__container" data-v-cf1fcf6d><div class="polite__wrapp" data-v-cf1fcf6d><div data-v-cf1fcf6d><img src="'+X+'" alt="icon" title="icon" data-v-cf1fcf6d></div><span data-v-cf1fcf6d>Всі права захищені</span></div><div class="polite__items" data-v-cf1fcf6d><span data-v-cf1fcf6d>Умови використання</span><span data-v-cf1fcf6d>Політика конфіденційності</span></div></div></section>',2))}const t2=_(Y,[["render",e2],["__scopeId","data-v-cf1fcf6d"]]),o2={name:"MainLayout",components:{TheHeader:W,TheFooter:t2}},s2={class:"page"},i2={class:"page__main"};function a2(p,e,c,g,i,o){const l=r("TheHeader"),s=r("RouterView"),C=r("TheFooter");return a(),n("div",s2,[d(l),t("main",i2,[d(s)]),d(C)])}const g2=_(o2,[["render",a2],["__scopeId","data-v-63e3f4df"]]);export{g2 as default};
