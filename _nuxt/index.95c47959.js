import{n as $,r as g,H as y,g as b,o as r,c as l,a as n,F as m,x as A,J as k,t as f,K as P,L as N,M as E,p as T,e as V,_ as S,N as M,O,v as L,P as U,b as v,w as Q,s as D,d as F,z as j,A as q}from"./entry.f94fe60e.js";import{u as w}from"./characterStore.4907d571.js";import{_ as H}from"./nuxt-link.bbd62683.js";const J=e=>(T("data-v-72171de5"),e=e(),V(),e),K=J(()=>n("div",{class:"pagination__title"},"Страницы:",-1)),R={class:"pagination__list"},G=["onClick"],W=["onClick"],X=["onClick"],Y=$({__name:"Pagination",setup(e){const a=w(),t=g(1),o=g("..."),s=y(()=>a.totalPages),c=g(!1),d=y(()=>{const _=s.value;return _<=3?Array.from({length:_},(C,i)=>i+1):[1,2,3]}),h=y(()=>{const _=s.value,C=Array.from({length:_},(i,B)=>B+1);return _<=3?[]:C.slice(3,_)});function u(){c.value=!c.value}function p(){c.value=!1}function I(_){t.value=_,p()}function z(_){I(_),p()}return b(t,_=>{_>=1&&_<=3?o.value="...":o.value=String(_),a.fetchCharacters(_)}),(_,C)=>(r(),l("div",{class:"pagination",onClick:p},[K,n("ul",R,[(r(!0),l(m,null,A(d.value,i=>(r(),l("li",{key:i},[n("button",{onClick:B=>I(i),class:k([{"pagination__button--active":t.value===i},"pagination__button"])},f(i),11,G)]))),128)),n("li",{class:k([{"pagination__item--active":c.value},"pagination__item"])},[n("button",{onClick:P(u,["stop"]),class:"pagination__button"},f(c.value?"▲":`${o.value}`),9,W),N(n("ul",{class:"pagination__dropdown",onClick:C[0]||(C[0]=P(()=>{},["stop"]))},[(r(!0),l(m,null,A(h.value,i=>(r(),l("li",{key:i,class:"pagination__dropdown-item"},[n("button",{onClick:B=>z(i),class:k([{"pagination__button--active":t.value===i},"pagination__button"])},f(i),11,X)]))),128))],512),[[E,c.value]])],2)])]))}});const Z=S(Y,[["__scopeId","data-v-72171de5"]]),tt=["onSubmit"],et=$({__name:"SearchBar",setup(e){const a=w(),t=g(""),o=g("all");let s=null;M(()=>{const u=localStorage.getItem("searchQuery"),p=localStorage.getItem("selectedStatus");u&&(t.value=u),p&&(o.value=p),a.fetchCharactersBySearchAndStatus(t.value,o.value)}),b(t,u=>{localStorage.setItem("searchQuery",u),a.fetchCharactersBySearchAndStatus(u,o.value)}),b(o,u=>{localStorage.setItem("selectedStatus",u),a.fetchCharactersBySearchAndStatus(t.value,u)});const c=()=>{s!==null&&clearTimeout(s),s=setTimeout(()=>{a.fetchCharactersBySearchAndStatus(t.value,o.value)},500)},d=u=>{u.preventDefault(),a.fetchCharactersBySearchAndStatus(t.value,o.value)},h=()=>{t.value="",a.fetchCharacters(),s!==null&&clearTimeout(s)};return(u,p)=>(r(),l("form",{onSubmit:P(d,["prevent"]),class:"search-bar"},[N(n("input",{type:"text","onUpdate:modelValue":p[0]||(p[0]=I=>t.value=I),placeholder:"Введите имя персонажа...",class:"search-input",onInput:c},null,544),[[O,t.value]]),t.value?(r(),l("span",{key:0,class:"clear-input",onClick:h}," ⮾ ")):L("",!0)],40,tt))}});const at=S(et,[["__scopeId","data-v-9f3f9f6c"]]),x=e=>(T("data-v-e94a6297"),e=e(),V(),e),st={class:"sort-select"},nt=x(()=>n("label",{for:"status-select"},"Фильтровать по статусу:",-1)),ot=x(()=>n("option",{value:"all"},"All",-1)),ct=x(()=>n("option",{value:"Alive"},"Alive",-1)),rt=x(()=>n("option",{value:"Dead"},"Dead",-1)),lt=x(()=>n("option",{value:"unknown"},"unknown",-1)),_t=[ot,ct,rt,lt],ut=$({__name:"SortSelect",setup(e){const a=w(),t=g("all"),o=s=>{t.value=s,a.fetchCharactersBySearchAndStatus(a.searchQuery,s)};return M(()=>{const s=localStorage.getItem("selectedStatus");s&&(t.value=s,a.fetchCharactersBySearchAndStatus(a.searchQuery,s))}),b(t,s=>{localStorage.setItem("selectedStatus",s)}),(s,c)=>(r(),l("div",st,[nt,N(n("select",{id:"status-select","onUpdate:modelValue":c[0]||(c[0]=d=>t.value=d),onChange:c[1]||(c[1]=d=>o(t.value))},_t,544),[[U,t.value]])]))}});const it=S(ut,[["__scopeId","data-v-e94a6297"]]),dt={};function ht(e,a){const t=Z,o=at,s=it;return r(),l(m,null,[v(t),v(o),v(s)],64)}const pt=S(dt,[["render",ht]]),vt=e=>(T("data-v-9b2e020f"),e=e(),V(),e),mt={class:"card-image"},ft=["src"],St={class:"card-content"},gt={class:"episode-list"},Ct=vt(()=>n("h3",null,"Список эпизодов с участием:",-1)),yt=$({__name:"CharacterItem",props:{character:{type:Object,required:!0,default:()=>{}}},setup(e){const a=e,t=s=>{const c=s.split("/");return c[c.length-1]},o=y(()=>{const s=a.character.status;return{Dead:"status-dead",Alive:"status-alive",unknown:"status-unknown"}[s]||"status-default"});return(s,c)=>{const d=H;return r(),l(m,null,[v(d,{to:`/character/${e.character.id}`},{default:Q(()=>[n("div",mt,[n("img",{class:"card-image__item",src:e.character.image,alt:"image character"},null,8,ft),n("span",{class:k(D(o))},f(e.character.status),3)])]),_:1},8,["to"]),n("div",St,[n("h2",null,f(e.character.name)+" ("+f(e.character.species)+")",1),n("div",gt,[Ct,n("ul",null,[(r(!0),l(m,null,A(e.character.episode.slice(0,5),(h,u)=>(r(),l("li",{key:u},[v(d,{to:`/episode/${t(h)}`},{default:Q(()=>[F(f(h),1)]),_:2},1032,["to"])]))),128))])])])],64)}}});const $t=S(yt,[["__scopeId","data-v-9b2e020f"]]),xt=j(()=>q(()=>import("./Loader.7943f505.js"),["./Loader.7943f505.js","./entry.f94fe60e.js","./Loader.00b8ada3.css"],import.meta.url).then(e=>e.default||e)),It={key:0},kt={class:"card-container"},bt={key:0,class:"not-found"},At=$({__name:"CharacterList",setup(e){const a=w();a.fetchCharacters();const t=y(()=>a.selectedStatus==="all"?a.characters:a.characters.filter(o=>o.status===a.selectedStatus));return(o,s)=>{const c=xt,d=$t;return r(),l(m,null,[D(a).isLoading?(r(),l("div",It,[v(c)])):L("",!0),n("div",kt,[(r(!0),l(m,null,A(t.value,h=>(r(),l("div",{class:"card",key:h.id},[v(d,{character:h},null,8,["character"])]))),128)),t.value.length===0&&!D(a).isLoading?(r(),l("div",bt,"Ничего не найдено")):L("",!0)])],64)}}});const wt=S(At,[["__scopeId","data-v-64570cb8"]]),Bt={};function Pt(e,a){const t=pt,o=wt;return r(),l(m,null,[v(t),v(o)],64)}const Tt=S(Bt,[["render",Pt]]);export{Tt as default};
