import { useEffect, useState } from "react";

// "Hỏi Sử Quan" box. It sends the question to /api/hoi.
// When offline it renders nothing, so the offline card page stays the same.
// It never throws: every failure becomes a short message in the box.
export default function HoiSuQuan({ cardId, moKhoa }) {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!online) return null;

  async function hoi(e) {
    e.preventDefault();
    const cau = q.trim();
    if (busy || !cau) return;
    setBusy(true);
    setErr(null);
    setAnswer(null);
    try {
      const r = await fetch("/api/hoi", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cardId, question: cau, moKhoa }),
        signal: AbortSignal.timeout(25000),
      });
      // The reply may not be JSON (for example an HTML page under `npm run dev`).
      let data = null;
      try { data = await r.json(); } catch { data = null; }
      if (r.ok && data?.answer) setAnswer(data.answer);
      else setErr(data?.error || "Sử Quan đang bận, em thử lại sau nhé.");
    } catch {
      setErr("Không kết nối được Sử Quan. Em thử lại sau nhé.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h2>Hỏi Sử Quan</h2>
      <p className="muted sm">Hỏi điều em muốn biết về thẻ này. Sử Quan chỉ trả lời dựa trên nội dung của thẻ.</p>
      <form onSubmit={hoi} className="form">
        <input value={q} onChange={(e) => { setQ(e.target.value); setErr(null); }}
               placeholder="vd: Nhân vật này nổi tiếng vì điều gì?" maxLength={200}
               autoComplete="off" aria-label="Câu hỏi cho Sử Quan" />
        {err && <p className="err">{err}</p>}
        <button className="btn" type="submit" disabled={busy || !q.trim()}>
          {busy ? "Sử Quan đang nghĩ…" : "Hỏi"}
        </button>
      </form>
      {answer && (
        <div className="explain">
          <strong>Sử Quan</strong>
          <p>{answer}</p>
        </div>
      )}
      <p className="src">Câu trả lời do AI (Gemini) tạo ra từ nội dung thẻ. Hãy đối chiếu với sách giáo khoa.</p>
    </section>
  );
}
