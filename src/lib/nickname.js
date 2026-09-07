// Kiểm tra biệt danh: chặn việc học sinh vô tình nhập họ tên thật.
//
// Đây không phải chuyện thẩm mỹ. Dự án cam kết không thu thập dữ liệu định danh
// (Nghị định 13/2023/NĐ-CP về dữ liệu cá nhân của người chưa thành niên), và cam
// kết đó chỉ đứng vững nếu ứng dụng thực sự ngăn được ô nhập biến thành ô họ tên.
// Ba từ trở lên gần như chắc chắn là họ tên đầy đủ của người Việt.
export function nameProblem(v) {
  const s = (v || "").trim();
  if (s.length < 2) return "Biệt danh cần ít nhất 2 ký tự.";
  if (s.length > 16) return "Biệt danh tối đa 16 ký tự.";
  if (s.split(/\s+/).length >= 3) return "Nghe như họ tên thật — hãy dùng biệt danh.";
  return null;
}

export function classProblem(v) {
  const s = (v || "").trim();
  if (!s) return "Nhập mã lớp do giáo viên cung cấp.";
  if (s.length > 8) return "Mã lớp tối đa 8 ký tự.";
  return null;
}

export const normalizeClass = (v) => (v || "").trim().toUpperCase().slice(0, 8);
