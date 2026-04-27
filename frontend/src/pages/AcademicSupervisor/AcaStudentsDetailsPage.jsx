import { useState, useEffect } from "react";
import { COLORS, Card, Label, Value, PageWrap, PageTitle, BackBtn, GoldBtn, OutlineBtn,
  StatCard, StatusBadge, LoadingSpinner, ErrorMsg, EmptyState, inputStyle, textareaStyle } from "../../shared/ui";
import { useAcaDashboard, useAcaStudents, useAcaStudent, useAcaStudentLogs,
  useAcaEvaluations, useEvalCriteria, useSubmitEvaluation } from "../../hooks/useData";
import { authAPI } from "../../api/apiService";

export function AcaStudentDetailPage({ studentId, onBack, onEvaluate }) {
  const { data: student, loading: sLoading } = useAcaStudent(studentId);
  const { data: logs,    loading: lLoading  } = useAcaStudentLogs(studentId);

  if (sLoading || lLoading) return <PageWrap><BackBtn onClick={onBack} /><LoadingSpinner /></PageWrap>;

  return (
    <PageWrap>
      <BackBtn onClick={onBack} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <PageTitle title={student?.name || "Student"} subtitle={`${student?.reg_number} · ${student?.program}`} />
        <GoldBtn onClick={() => onEvaluate(studentId)}>Evaluate Student</GoldBtn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 14 }}>Placement Info</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><Label>Company</Label><Value>{student?.company_name}</Value></div>
            <div><Label>Department</Label><Value>{student?.department}</Value></div>
            <div><Label>Workplace Supervisor</Label><Value>{student?.workplace_supervisor}</Value></div>
            <div><Label>Period</Label><Value>{student?.start_date} – {student?.end_date}</Value></div>
          </div>
        </Card>
        <Card>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 14 }}>Log Summary</div>
          <div style={{ display: "flex", gap: 16 }}>
            {["Approved","Reviewed","Submitted","Draft"].map(s => (
              <div key={s} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: COLORS.white }}>
                  {(logs || []).filter(l => l.status === s).length}
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Logs Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", fontWeight: 500, fontSize: 14, borderBottom: `1px solid ${COLORS.navyBorder}` }}>Weekly Logs</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.navyLight }}>
              {["Week", "Date Range", "Status", "Supervisor Comment"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 500, letterSpacing: 0.8, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(logs || []).map((log, i) => (
              <tr key={log.id} style={{ borderTop: `1px solid ${COLORS.navyBorder}`, background: i % 2 === 0 ? "transparent" : "#0E1828" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.white }}>Week {log.week_number}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.mutedLight }}>{log.date_range}</td>
                <td style={{ padding: "12px 16px" }}><StatusBadge status={log.status} /></td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: COLORS.muted, maxWidth: 220 }}>
                  {log.supervisor_comment ? `"${log.supervisor_comment.substring(0, 50)}..."` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PageWrap>
  );
}
