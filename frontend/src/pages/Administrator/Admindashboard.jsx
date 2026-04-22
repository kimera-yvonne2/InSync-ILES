import { useState, useEffect } from "react";

function AdminDashboard({ data, onNav }) {
  const unplaced = data.students.filter(s=>!data.placements.find(p=>p.studentId===s.id));
  return (
    <PW>
      <div className="mb-7"><p className="text-slate-500 text-xs mb-1">System Overview</p><h1 className="font-serif text-2xl text-white">Administrator Dashboard</h1></div>
      <div className="flex gap-3 mb-5">
        <StatCard label="Total Students"    value={data.students.length}    sub="registered interns"    color="text-white"       />
        <StatCard label="Active Placements" value={data.placements.length}  sub="currently active"      color="text-emerald-400" />
        <StatCard label="Total Logs"        value={data.logs.length}        sub="all time"              color="text-blue-400"    />
        <StatCard label="Evaluations Done"  value={data.evaluations.length} sub="completed"             color="text-amber-400"   />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium text-white mb-3">Logs by Status</div>
          {["Draft","Submitted","Reviewed","Approved"].map(st=>{
            const count = data.logs.filter(l=>l.status===st).length;
            return (
              <div key={st} className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">{st}</span><span className="text-white">{count}</span></div>
                <div className="h-1.5 bg-[#0B1120] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{width:`${data.logs.length>0?(count/data.logs.length)*100:0}%`}} />
                </div>
              </div>
            );
          })}
        </Card>
        {unplaced.length>0 ? (
          <Card cls="border-amber-900/30">
            <div className="text-sm font-medium text-amber-400 mb-2">⚠ Unplaced Students</div>
            <p className="text-xs text-slate-400 mb-3">{unplaced.length} student(s) have no placement assigned.</p>
            <OBtn onClick={()=>onNav("placements")} cls="!text-[10px] !py-1.5">Manage Placements →</OBtn>
          </Card>
        ) : (
          <Card>
            <div className="text-sm font-medium text-white mb-3">Quick Links</div>
            {[["users","Manage Users"],["placements","Manage Placements"],["logs","View All Logs"],["criteria","Setup Criteria"]].map(([page,label])=>(
              <button key={page} onClick={()=>onNav(page)} className="block w-full text-left text-xs text-amber-400 hover:text-amber-300 py-2 border-b border-[#1F2E4A] last:border-0">{label} →</button>
            ))}
          </Card>
        )}
      </div>
    </PW>
  );
}