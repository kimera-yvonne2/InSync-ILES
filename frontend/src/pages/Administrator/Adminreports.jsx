import { useState, useEffect } from "react";

function AdminReports({ data }) {
  const total = data.students.length;
  const evs = data.evaluations;
  const scores = evs.map(ev=>ev.criteria.filter(c=>c.score!==null).reduce((a,c)=>a+c.score,0));
  const avg = scores.length>0 ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  const gradeA = scores.filter(s=>s>=80).length;
  const approved = data.logs.filter(l=>l.status==="Approved").length;
  const totalLogs = data.logs.length;
  const compRate = totalLogs>0?Math.round((approved/totalLogs)*100):0;

  return (
    <PW>
      <PT title="Reports & Analytics" sub="Aggregated statistics for the current cohort" />
      <div className="flex gap-3 mb-5">
        <StatCard label="Completion Rate" value={`${compRate}%`}     sub="logs approved on time"    color="text-emerald-400" />
        <StatCard label="Average Score"   value={`${avg}%`}          sub="across all evaluations"   color="text-amber-400"   />
        <StatCard label="Top Grade (A)"   value={gradeA}             sub="students with distinction" color="text-blue-400"   />
        <StatCard label="Total Cohort"    value={total}              sub="students this period"      color="text-white"      />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium text-white mb-3">Score Distribution</div>
          {[{range:"80-100",grade:"A",min:80,max:100},{range:"70-79",grade:"B",min:70,max:79},{range:"60-69",grade:"C",min:60,max:69},{range:"0-59",grade:"F",min:0,max:59}].map(g=>{
            const cnt = scores.filter(s=>s>=g.min&&s<=g.max).length;
            return (
              <div key={g.grade} className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">{g.range} — Grade {g.grade}</span><span className="text-white">{cnt} students</span></div>
                <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{width:`${total>0?(cnt/total)*100:0}%`}} />
                </div>
              </div>
            );
          })}
        </Card>
        <Card>
          <div className="text-sm font-medium text-white mb-3">Students Overview</div>
          {data.students.map(s=>{
            const ev = data.evaluations.find(e=>e.studentId===s.id);
            const tot = ev?ev.criteria.filter(c=>c.score!==null).reduce((a,c)=>a+c.score,0):null;
            const myLogs = data.logs.filter(l=>l.studentId===s.id);
            const appd = myLogs.filter(l=>l.status==="Approved").length;
            return (
              <div key={s.id} className="flex justify-between items-center py-2.5 border-b border-[#1F2E4A] last:border-0">
                <div><div className="text-xs text-white">{s.name}</div><div className="text-[10px] text-slate-500">{appd}/13 logs approved</div></div>
                <div className="text-right">{tot!==null?<div className="font-serif text-lg text-amber-400">{tot}/100</div>:<div className="text-xs text-slate-600">No eval</div>}</div>
              </div>
            );
          })}
        </Card>
      </div>
    </PW>
  );
}
