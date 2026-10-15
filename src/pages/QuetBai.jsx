import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CARD_BY_ID } from "../content/cards";

// "Quét bài tập": photo of a history question -> /api/quet -> answer + closest card.
// Practice only: it never writes to the store. The photo is not saved anywhere.
const MAX_SIDE = 1280;

// Shrink the photo to at most 1280 px on the longest side (Vercel body limit is 4.5 MB).
// Returns base64 JPEG without the "data:" prefix.
function shrink(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * k);
      canvas.height = Math.round(img.naturalHeight * k);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8).replace("data:image/jpeg;base64,", ""));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.src = url;
  });
}

export default function QuetBai() {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
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

  const foot = (
    <nav className="foot">
      <Link className="btn ghost" to="/me">Bộ sưu tập</Link>
      <Link className="btn ghost" to="/">Trang chính</Link>
    </nav>
  );

  if (!online) {
    return (
      <div className="page">
        <h1>Quét bài tập</h1>
        <p className="muted">Quét bài tập cần có mạng.</p>
        {foot}
      </div>
    );
  }

  async function chon(e) {
    const file = e.target.files?.[0];
    setErr(null);
    setResult(null);
    setImage(null);
    if (!file) return;
    try {
      setImage(await shrink(file));
    } catch {
      setErr("Không đọc được ảnh này, em chọn ảnh khác nhé.");
    }
  }

  async function hoi() {
    if (busy || !image) return;
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      const r = await fetch("/api/quet", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ image, mimeType: "image/jpeg" }),
        signal: AbortSignal.timeout(30000),
      });
      // The reply may not be JSON (for example an HTML page under `npm run dev`).
      let data = null;
      try { data = await r.json(); } catch { data = null; }
      if (r.ok && typeof data?.giaiThich === "string") setResult(data);
      else setErr(data?.error || "Sử Quan đang bận, em thử lại sau nhé.");
    } catch {
      setErr("Không kết nối được Sử Quan. Em thử lại sau nhé.");
    } finally {
      setBusy(false);
    }
  }

  const card = result?.cardId ? CARD_BY_ID[result.cardId] : null;

  return (
    <div className="page">
      <h1>Quét bài tập</h1>
      <p className="muted sm">Chỉ chụp phần câu hỏi, không chụp tên, mặt hay thông tin cá nhân.</p>
      <div className="form">
        <label>
          Chụp ảnh câu hỏi
          <input type="file" accept="image/*" onChange={chon} />
        </label>
        {image && <img src={`data:image/jpeg;base64,${image}`} alt="Ảnh câu hỏi" />}
        {err && <p className="err">{err}</p>}
        <button className="btn" type="button" onClick={hoi} disabled={busy || !image}>
          {busy ? "Sử Quan đang đọc…" : "Hỏi Sử Quan"}
        </button>
      </div>

      {result && (
        <section>
          {result.cauHoi && (
            <div className="explain">
              <strong>Câu hỏi</strong>
              <p>{result.cauHoi}</p>
            </div>
          )}
          {result.dapAn && (
            <div className="explain">
              <strong>Đáp án</strong>
              <p>{result.dapAn}</p>
            </div>
          )}
          <div className="explain">
            <strong>Giải thích</strong>
            <p>{result.giaiThich}</p>
          </div>
          {card ? (
            <>
              <h2>Thẻ bài gợi ý</h2>
              <div className="cardgrid">
                <Link className="mini" to={`/c/${card.id}`}>
                  <img src={card.art} alt="" />
                  <span>{card.name}</span>
                </Link>
              </div>
            </>
          ) : (
            <p className="muted">Không có thẻ bài nào gần với câu này.</p>
          )}
        </section>
      )}

      <p className="src">Câu trả lời do AI (Gemini) tạo ra, có thể sai. Hãy hỏi lại thầy cô. Ứng dụng không lưu ảnh.</p>
      {foot}
    </div>
  );
}
