import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import CardPage from "./pages/CardPage";
import Me from "./pages/Me";
import Board from "./pages/Board";
import Teacher from "./pages/Teacher";

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
        <Route path="*" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}
