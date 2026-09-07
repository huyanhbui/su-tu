import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import CardPage from "./pages/CardPage";
import Me from "./pages/Me";
import Board from "./pages/Board";
import Teacher from "./pages/Teacher";
import Health from "./pages/Health";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/c/:cardId" element={<CardPage />} />
        <Route path="/me" element={<Me />} />
        <Route path="/board/:classCode" element={<Board />} />
        <Route path="/t" element={<Teacher />} />
        <Route path="/t/:classCode" element={<Teacher />} />
        {/* Trang tự kiểm tra cho nhóm làm dự án, không quảng cáo cho học sinh. */}
        <Route path="/health" element={<Health />} />
        <Route path="*" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}
