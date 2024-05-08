import{r as n,u as c,j as r,g as y,h as L,i as D,k as j,P as m,K as h,e as E,C as A,l as K,b as W}from"./index-BrHUzIM7.js";import G from"./Header-SXfB4i5c.js";import{C as _,R as z}from"./Row-CcWCfJaH.js";import{M as J}from"./index-CarWzUjh.js";const N=n.forwardRef(({bsPrefix:o,bg:a="primary",pill:t=!1,text:e,className:s,as:d="span",...l},u)=>{const f=c(o,"badge");return r.jsx(d,{ref:u,...l,className:y(s,f,t&&"rounded-pill",e&&`text-${e}`,a&&`bg-${a}`)})});N.displayName="Badge";const Q=N,S=n.forwardRef(({as:o,bsPrefix:a,variant:t="primary",size:e,active:s=!1,disabled:d=!1,className:l,...u},f)=>{const i=c(a,"btn"),[x,{tagName:q}]=L({tagName:o,disabled:d,...u}),V=q;return r.jsx(V,{...x,...u,ref:f,disabled:d,className:y(l,i,s&&"active",t&&`${i}-${t}`,e&&`${i}-${e}`,u.href&&d&&"disabled")})});S.displayName="Button";const $=S,R=n.forwardRef(({className:o,bsPrefix:a,as:t="div",...e},s)=>(a=c(a,"card-body"),r.jsx(t,{ref:s,className:y(o,a),...e})));R.displayName="CardBody";const T=R,w=n.forwardRef(({className:o,bsPrefix:a,as:t="div",...e},s)=>(a=c(a,"card-footer"),r.jsx(t,{ref:s,className:y(o,a),...e})));w.displayName="CardFooter";const U=w,B=n.forwardRef(({bsPrefix:o,className:a,as:t="div",...e},s)=>{const d=c(o,"card-header"),l=n.useMemo(()=>({cardHeaderBsPrefix:d}),[d]);return r.jsx(D.Provider,{value:l,children:r.jsx(t,{ref:s,...e,className:y(a,d)})})});B.displayName="CardHeader";const X=B,v=n.forwardRef(({bsPrefix:o,className:a,variant:t,as:e="img",...s},d)=>{const l=c(o,"card-img");return r.jsx(e,{ref:d,className:y(t?`${l}-${t}`:l,a),...s})});v.displayName="CardImg";const Y=v,b=n.forwardRef(({className:o,bsPrefix:a,as:t="div",...e},s)=>(a=c(a,"card-img-overlay"),r.jsx(t,{ref:s,className:y(o,a),...e})));b.displayName="CardImgOverlay";const Z=b,k=n.forwardRef(({className:o,bsPrefix:a,as:t="a",...e},s)=>(a=c(a,"card-link"),r.jsx(t,{ref:s,className:y(o,a),...e})));k.displayName="CardLink";const P=k,aa=j("h6"),I=n.forwardRef(({className:o,bsPrefix:a,as:t=aa,...e},s)=>(a=c(a,"card-subtitle"),r.jsx(t,{ref:s,className:y(o,a),...e})));I.displayName="CardSubtitle";const ea=I,F=n.forwardRef(({className:o,bsPrefix:a,as:t="p",...e},s)=>(a=c(a,"card-text"),r.jsx(t,{ref:s,className:y(o,a),...e})));F.displayName="CardText";const ra=F,ta=j("h5"),H=n.forwardRef(({className:o,bsPrefix:a,as:t=ta,...e},s)=>(a=c(a,"card-title"),r.jsx(t,{ref:s,className:y(o,a),...e})));H.displayName="CardTitle";const sa=H,O=n.forwardRef(({bsPrefix:o,className:a,bg:t,text:e,border:s,body:d=!1,children:l,as:u="div",...f},i)=>{const x=c(o,"card");return r.jsx(u,{ref:i,...f,className:y(a,x,t&&`bg-${t}`,e&&`text-${e}`,s&&`border-${s}`),children:d?r.jsx(T,{children:l}):l})});O.displayName="Card";const g=Object.assign(O,{Img:Y,Title:sa,Subtitle:ea,Body:T,Link:P,Text:ra,Header:X,Footer:U,ImgOverlay:Z}),p={badgeStyle:{paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,margin:5},cardStyle:{borderRadius:10},cardTitleStyle:{fontSize:24,fontWeight:700},cardTextStyle:{textAlign:"left"},linkStyle:{textDecoration:"none",padding:10},buttonStyle:{margin:5}},M=o=>{var s;const a=n.useContext(h),t=d=>r.jsx(J,{children:d}),{project:e}=o;return r.jsx(_,{children:r.jsxs(g,{style:{...p.cardStyle,backgroundColor:a==null?void 0:a.cardBackground,borderColor:a==null?void 0:a.cardBorderColor},text:a==null?void 0:a.bsSecondaryVariant,children:[r.jsx(g.Img,{variant:"top",src:e==null?void 0:e.image}),r.jsxs(g.Body,{children:[r.jsx(g.Title,{style:p.cardTitleStyle,children:e.title}),r.jsx(g.Text,{style:p.cardTextStyle,children:t(e.bodyText)})]}),r.jsx(g.Body,{children:(s=e==null?void 0:e.links)==null?void 0:s.map(d=>r.jsx($,{style:p.buttonStyle,variant:"outline-"+(a==null?void 0:a.bsSecondaryVariant),onClick:()=>window.open(d.href,"_blank"),children:d.text},d.href))}),e.tags&&r.jsx(g.Footer,{style:{backgroundColor:a==null?void 0:a.cardFooterBackground},children:e.tags.map(d=>r.jsx(Q,{pill:!0,bg:a==null?void 0:a.bsSecondaryVariant,text:a==null?void 0:a.bsPrimaryVariant,style:p.badgeStyle,children:d},d))})]})})};M.propTypes={project:m.shape({title:m.string.isRequired,bodyText:m.string.isRequired,image:m.string,links:m.arrayOf(m.shape({text:m.string.isRequired,href:m.string.isRequired})),tags:m.arrayOf(m.string)}).isRequired};const C={containerStyle:{marginBottom:25},showMoreStyle:{position:"relative",margin:25}},oa=o=>{var f;const a=n.useContext(h),{header:t}=o,[e,s]=n.useState(null),[d,l]=n.useState(!1);n.useEffect(()=>{fetch(E.projects,{method:"GET"}).then(i=>i.json()).then(i=>s(i)).catch(i=>i)},[]);const u=d&&e?e.length:6;return r.jsxs(r.Fragment,{children:[r.jsx(G,{title:t}),e?r.jsx("div",{className:"section-content-container",children:r.jsxs(A,{style:C.containerStyle,children:[r.jsx(z,{xs:1,sm:1,md:2,lg:3,className:"g-4",children:(f=e.projects)==null?void 0:f.slice(0,u).map(i=>r.jsx(K,{children:r.jsx(M,{project:i})},i.title))}),!d&&r.jsx($,{style:C.showMoreStyle,variant:a==null?void 0:a.bsSecondaryVariant,onClick:()=>l(!0),children:"show more"})]})}):r.jsx(W,{})]})};oa.propTypes={header:m.string.isRequired};export{oa as default};