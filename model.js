/* Motor explicable v0.1. Reglas demostrativas, no modelo de impago. */
(function(root){
const clamp=n=>Math.max(0,Math.min(100,n));
const mean=a=>a.reduce((s,n)=>s+n,0)/a.length;
function analyze(p){
 const docs=p.docs||[], d=docs.filter(x=>x.confirmed), issues=[];
 const byMonth={};
 d.filter(x=>x.month&&['ventas','billetera','banco'].includes(x.type)&&Number(x.income)>0).forEach(x=>{(byMonth[x.month]??=[]).push(x)});
 const months=Object.keys(byMonth).sort();
 const entries=months.map(m=>{const a=byMonth[m]; if(a.length>1)issues.push({title:'Fuentes del mismo mes',detail:`${m}: hay ${a.length} fuentes. Se usa el mayor ingreso, sin sumarlas, para evitar contar una venta dos veces.`}); if(a.length>1&&Math.max(...a.map(x=>+x.income))>Math.min(...a.map(x=>+x.income))*1.25)issues.push({title:'Ingresos por conciliar',detail:`${m}: las fuentes difieren más del 25 %. Confirma si cubren las mismas ventas.`});return {month:m,income:Math.max(...a.map(x=>+x.income)),expense:a.some(x=>x.expense!==''&&x.expense!=null)?Math.max(...a.filter(x=>x.expense!==''&&x.expense!=null).map(x=>+x.expense)):null};});
 const seen=new Set(); docs.forEach(x=>{let key=x.fingerprint||x.name+'|'+x.size;if(seen.has(key))issues.push({title:'Posible archivo repetido',detail:x.name+' aparece más de una vez. Revísalo antes de compartir.'});seen.add(key)});
 d.forEach(x=>{if(+x.expense>+x.income&&+x.income>0)issues.push({title:'Gastos superiores a ingresos',detail:`${x.name}: confirma los montos y el periodo. Esto requiere explicación, no implica rechazo.`});if(x.month&&x.month>new Date().toISOString().slice(0,7))issues.push({title:'Fecha futura',detail:x.name+': revisa el mes registrado.'});});
 const types=new Set(d.map(x=>x.type)), income=entries.length?mean(entries.map(x=>x.income)):null;
 const complete=entries.filter(x=>x.expense!==null), net=complete.length?mean(complete.map(x=>x.income-x.expense)):null;
 const X=d.length?Math.min(100,40+20*Math.min(types.size,3)):null;
 const F=entries.length?Math.min(100,40+10*entries.length):null;
 const cv=entries.length>=2?Math.sqrt(mean(entries.map(x=>(x.income-income)**2)))/income:null;
 const S=cv===null?null:clamp(100*(1-cv));
 const C=complete.length>=2?clamp(100*net/mean(complete.map(x=>x.income))/.4):null;
 const V=docs.length?100*d.length/docs.length:null,T=d.length?Math.min(100,months.length/6*100):null,D=d.length?Math.min(100,types.size/4*100):null,K=d.length?Math.max(0,100-20*issues.length):null;
 const PIS=[X,F,S,C].every(x=>x!==null)?.2*X+.3*F+.3*S+.2*C:null,EC=V!==null?.35*V+.25*(T||0)+.2*(D||0)+.2*(K||0):null;
 const next=[];if(!d.length)next.push('Revisa y confirma al menos una evidencia de tu actividad.');if(entries.length<2)next.push('Agrega registros de ingresos de al menos dos meses diferentes.');if(complete.length<2)next.push('Completa los gastos de dos meses para explicar lo que queda después de trabajar.');if(types.size<3)next.push('Puedes complementar con compras a proveedores o comprobantes de ventas.');if(issues.length)next.push('Aclara las diferencias señaladas antes de compartir.');
 return {X,F,S,C,V,T,D,K,PIS,EC,issues,entries,income,net,next,confirmed:d.length,total:docs.length,months:months.length,types:types.size};
}
root.RaizModel={analyze};if(typeof module!=='undefined')module.exports={analyze};
})(typeof window!=='undefined'?window:globalThis);
