export function splitExpenses(items) {
  const balances = Object.create(null);
  for (const item of items) {
    const people = [...new Set(item.people.split(',').map(x=>x.trim()).filter(Boolean))];
    if (!people.length) continue;
    const cents = Math.round(Number(item.amount) * 100);
    balances[item.payer] = (balances[item.payer] || 0) + cents;
    const share = Math.floor(cents / people.length), remainder = cents % people.length;
    people.forEach((p,i)=>balances[p]=(balances[p]||0)-share-(i<remainder?1:0));
  }
  const debtors = Object.entries(balances).filter(([,v])=>v<0).map(([name,v])=>({name,cents:-v}));
  const creditors = Object.entries(balances).filter(([,v])=>v>0).map(([name,cents])=>({name,cents}));
  const transfers=[];
  for(const d of debtors) for(const c of creditors) {const cents=Math.min(d.cents,c.cents);if(cents){transfers.push({from:d.name,to:c.name,amount:cents/100});d.cents-=cents;c.cents-=cents;}}
  return {balances:Object.fromEntries(Object.entries(balances)),transfers};
}
export const weightedScore = (scores, weights) => {const total=weights.reduce((a,b)=>a+b,0);return total? scores.reduce((n,s,i)=>n+s*weights[i],0)/total:0;};
export function daysUntil(date, reference) { return Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(reference+'T00:00:00Z'))/86400000); }
export function streak(history, date) { const set=new Set(history);let d=new Date(date+'T12:00:00Z'), n=0;if(!set.has(date))d.setUTCDate(d.getUTCDate()-1);while(set.has(d.toISOString().slice(0,10))){n++;d.setUTCDate(d.getUTCDate()-1);}return n; }
export const readingPercent = (page, total) => total>0 ? Math.min(100,Math.max(0,page/total*100)):0;
export function zoneTime(instant, zone) {const d=new Date(instant);return {time:new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d),date:new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(d),hour:Number(new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',hourCycle:'h23'}).format(d))};}
