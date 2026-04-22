import { useState, useEffect } from "react";

function AdminProfile() {
  const [saved, setSaved] = useState(false);
  return (
    <PW>
      <PT title="Profile & Settings" />
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        <Card cls="text-center !py-6">
          <div className="w-14 h-14 rounded-full bg-[#1A2540] border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold text-lg mx-auto mb-3">AD</div>
          <div className="text-xs font-medium text-white">Administrator</div>
          <div className="text-[10px] text-purple-400 mt-1">System Administrator</div>
        </Card>
        <Card cls="col-span-3">
          {saved && <div className="bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-xs rounded-lg px-3 py-2 mb-4">✓ Saved.</div>}
          <div className="text-sm font-medium text-purple-400 mb-4">Account Information</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Inp label="First Name" defaultValue="System" /><Inp label="Last Name" defaultValue="Administrator" />
            <Inp label="Email" defaultValue="admin@iles.mak.ac.ug" /><Inp label="Role" defaultValue="Administrator" disabled />
          </div>
          <GBtn onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000)}}>Save Changes</GBtn>
        </Card>
      </div>
    </PW>
  );
}