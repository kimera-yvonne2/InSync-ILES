import { useState, useEffect } from "react";

function AdminCriteria({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", weight:"" });
  const total = data.criteria.reduce((s,c)=>s+c.weight,0);
  const handleAdd = () => {
    const w = parseFloat(form.weight);
    if (!form.name||!w||total+w>100) return;
    setData(d=>({...d,criteria:[...d.criteria,{id:Date.now(),name:form.name,weight:w}]}));
    setForm({name:"",weight:""}); setModal(false);
  };
  const handleDel = (id) => setData(d=>({...d,criteria:d.criteria.filter(c=>c.id!==id)}));

  return (
    <PW>
      <div className="flex justify-between items-start mb-7">
        <PT title="Evaluation Criteria" sub="Define criteria and weights used for student evaluations" />
        <GBtn onClick={()=>setModal(true)}>+ Add Criterion</GBtn>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-3xl">
        <div className="col-span-2">
          <Card>
            <div className="text-sm font-medium text-amber-400 mb-4">Current Criteria</div>
            {data.criteria.length===0 ? <p className="text-slate-500 text-xs">No criteria defined yet.</p>
              : data.criteria.map(c=>(
              <div key={c.id} className="flex justify-between items-center py-3 border-b border-[#1F2E4A] last:border-0">
                <div><div className="text-xs font-medium text-white">{c.name}</div></div>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl text-amber-400">{c.weight}%</span>
                  <DBtn onClick={()=>handleDel(c.id)}>Remove</DBtn>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1F2E4A]">
              <span className="text-xs text-slate-400 font-medium">Total Weight</span>
              <span className={`font-serif text-2xl ${total===100?"text-emerald-400":"text-amber-400"}`}>{total}%</span>
            </div>
            {total!==100 && <div className="text-[10px] text-amber-400 mt-1">⚠ Weights must sum to exactly 100%.</div>}
          </Card>
        </div>
        <Card>
          <div className="text-sm font-medium text-white mb-3">Weight Used</div>
          <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-500">Used</span><span className="text-white">{total}/100%</span></div>
          <div className="h-2 bg-[#0B1120] rounded-full overflow-hidden mb-3">
            <div className={`h-full rounded-full transition-all ${total===100?"bg-emerald-500":"bg-amber-500"}`} style={{width:`${Math.min(total,100)}%`}} />
          </div>
          <div className="text-[10px] text-slate-500">{100-total}% remaining</div>
        </Card>
      </div>
      {modal && (
        <Modal title="Add Evaluation Criterion" onClose={()=>setModal(false)}>
          <Inp label="Criterion Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Communication Skills" />
          <Inp label="Weight (%) *" type="number" min={1} max={100-total} value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder={`Max: ${100-total}%`} />
          {parseFloat(form.weight)>0 && total+parseFloat(form.weight)>100 && <div className="text-[10px] text-red-400 mb-2">⚠ Would exceed 100% total.</div>}
          <div className="flex gap-2 mt-2">
            <GBtn onClick={handleAdd} disabled={!form.name||!form.weight||total+parseFloat(form.weight||0)>100}>Add Criterion</GBtn>
            <OBtn onClick={()=>setModal(false)}>Cancel</OBtn>
          </div>
        </Modal>
      )}
    </PW>
  );
}