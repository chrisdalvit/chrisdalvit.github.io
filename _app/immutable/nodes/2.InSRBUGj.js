import{s as J,f as z,n as P}from"../chunks/scheduler.DypdDQBO.js";import{S as K,i as N,e as u,s as x,t as S,c as d,a as $,d as m,f as D,b as M,r,g as O,h as a,j as B,k as Q,l as R,m as U,n as W,o as X,p as Y,q as F}from"../chunks/index.DBuc8BnP.js";import{G as Z}from"../chunks/GirdLayout.BxArHPta.js";function ee(h){let e,s,t,l,o,c,_,f=h[0].title+"",v,y,n,i,k=h[0].description+"",C,b,w,I,L,V;return{c(){e=u("div"),s=u("div"),t=u("img"),o=x(),c=u("div"),_=u("h2"),v=S(f),y=x(),n=u("div"),i=u("p"),C=S(k),b=x(),w=u("div"),I=u("a"),L=S("More"),this.h()},l(g){e=d(g,"DIV",{class:!0});var p=$(e);s=d(p,"DIV",{class:!0});var j=$(s);t=d(j,"IMG",{src:!0,alt:!0,class:!0}),j.forEach(m),o=D(p),c=d(p,"DIV",{class:!0});var E=$(c);_=d(E,"H2",{class:!0});var q=$(_);v=M(q,f),q.forEach(m),y=D(E),n=d(E,"DIV",{class:!0});var A=$(n);i=d(A,"P",{class:!0});var G=$(i);C=M(G,k),G.forEach(m),A.forEach(m),b=D(E),w=d(E,"DIV",{class:!0});var H=$(w);I=d(H,"A",{class:!0,href:!0});var T=$(I);L=M(T,"More"),T.forEach(m),H.forEach(m),E.forEach(m),p.forEach(m),this.h()},h(){z(t.src,l=h[0].image)||r(t,"src",l),r(t,"alt","Tile header"),r(t,"class","svelte-1vclssu"),r(s,"class","header svelte-1vclssu"),r(_,"class","svelte-1vclssu"),r(i,"class","svelte-1vclssu"),r(n,"class","content-description svelte-1vclssu"),r(I,"class","article-link svelte-1vclssu"),r(I,"href",V=h[0].url),r(w,"class","link-container svelte-1vclssu"),r(c,"class","content svelte-1vclssu"),r(e,"class","container svelte-1vclssu")},m(g,p){O(g,e,p),a(e,s),a(s,t),a(e,o),a(e,c),a(c,_),a(_,v),a(c,y),a(c,n),a(n,i),a(i,C),a(c,b),a(c,w),a(w,I),a(I,L)},p(g,[p]){p&1&&!z(t.src,l=g[0].image)&&r(t,"src",l),p&1&&f!==(f=g[0].title+"")&&B(v,f),p&1&&k!==(k=g[0].description+"")&&B(C,k),p&1&&V!==(V=g[0].url)&&r(I,"href",V)},i:P,o:P,d(g){g&&m(e)}}}function te(h,e,s){let{article:t={title:"",description:"",image:"",url:""}}=e;return h.$$set=l=>{"article"in l&&s(0,t=l.article)},[t]}class se extends K{constructor(e){super(),N(this,e,te,ee,J,{article:0})}}function ae(h){let e,s,t="Hi!",l,o,c=`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
            including versions of Lorem Ipsum.`,_,f,v,y;return v=new se({props:{article:{title:"Sodoku Solver",description:"Description of my Sudoku solver project",image:"images/sudoku_image.png",url:"/sudoku-solver"}}}),{c(){e=u("div"),s=u("h1"),s.textContent=t,l=x(),o=u("p"),o.textContent=c,_=x(),f=u("div"),Q(v.$$.fragment),this.h()},l(n){e=d(n,"DIV",{class:!0,slot:!0});var i=$(e);s=d(i,"H1",{class:!0,"data-svelte-h":!0}),F(s)!=="svelte-1tm9zxh"&&(s.textContent=t),l=D(i),o=d(i,"P",{class:!0,"data-svelte-h":!0}),F(o)!=="svelte-1hmj7dy"&&(o.textContent=c),_=D(i),f=d(i,"DIV",{});var k=$(f);R(v.$$.fragment,k),k.forEach(m),i.forEach(m),this.h()},h(){r(s,"class","title svelte-1wsu471"),r(o,"class","svelte-1wsu471"),r(e,"class","overview svelte-1wsu471"),r(e,"slot","center")},m(n,i){O(n,e,i),a(e,s),a(e,l),a(e,o),a(e,_),a(e,f),U(v,f,null),y=!0},p:P,i(n){y||(W(v.$$.fragment,n),y=!0)},o(n){X(v.$$.fragment,n),y=!1},d(n){n&&m(e),Y(v)}}}function re(h){let e,s;return e=new Z({props:{$$slots:{center:[ae]},$$scope:{ctx:h}}}),{c(){Q(e.$$.fragment)},l(t){R(e.$$.fragment,t)},m(t,l){U(e,t,l),s=!0},p(t,[l]){const o={};l&1&&(o.$$scope={dirty:l,ctx:t}),e.$set(o)},i(t){s||(W(e.$$.fragment,t),s=!0)},o(t){X(e.$$.fragment,t),s=!1},d(t){Y(e,t)}}}class oe extends K{constructor(e){super(),N(this,e,null,re,J,{})}}export{oe as component};
