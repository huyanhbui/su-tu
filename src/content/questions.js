// Ngân hàng câu hỏi. `level` bám theo ba mức độ nhận thức của GDPT 2018:
//   nhan-biet | thong-hieu | van-dung
// Chính `level` là thứ làm nên biểu đồ "lỗ hổng kiến thức" trong Teacher Dashboard —
// giáo viên thấy học sinh yếu ở MỨC TƯ DUY nào, không chỉ thấy điểm số.

export const QUESTIONS = [
  {
    id: "Q01",
    cardId: "N01",
    topic: "bach-dang-938",
    level: "nhan-biet",
    stem: "Trận Bạch Đằng năm 938 do ai trực tiếp chỉ huy?",
    choices: ["Lê Hoàn", "Ngô Quyền", "Trần Hưng Đạo", "Dương Đình Nghệ"],
    answer: 1,
    explain:
      "Ngô Quyền chỉ huy trận Bạch Đằng năm 938. Lê Hoàn chỉ huy trận Bạch Đằng " +
      "năm 981, còn Trần Hưng Đạo chỉ huy trận năm 1288 — ba trận khác nhau trên " +
      "cùng một dòng sông.",
  },
  {
    id: "Q02",
    cardId: "N01",
    topic: "bach-dang-938",
    level: "thong-hieu",
    stem: "Vì sao Ngô Quyền chọn sông Bạch Đằng làm nơi quyết chiến với quân Nam Hán?",
    choices: [
      "Vì đây là con sông rộng nhất miền Bắc",
      "Vì sông có chế độ thủy triều lên xuống mạnh, cho phép giấu bãi cọc dưới nước",
      "Vì quân Nam Hán không biết đường nào khác để vào nước ta",
      "Vì kinh đô Cổ Loa nằm ngay bên bờ sông",
    ],
    answer: 1,
    explain:
      "Biên độ thủy triều lớn là điều kiện then chốt: khi triều lên, bãi cọc bịt sắt " +
      "chìm hoàn toàn nên hạm đội địch vượt qua mà không hay biết; khi triều rút, cọc " +
      "nhô lên và trở thành cái bẫy. Ngô Quyền đã biến quy luật tự nhiên thành vũ khí.",
  },
  {
    id: "Q03",
    cardId: "N01",
    topic: "bach-dang-938",
    level: "van-dung",
    stem:
      "Ý nghĩa lịch sử lớn nhất của chiến thắng Bạch Đằng năm 938 là gì?",
    choices: [
      "Mở rộng lãnh thổ Đại Việt về phía Nam",
      "Buộc nhà Nam Hán phải triều cống hằng năm",
      "Chấm dứt hơn một nghìn năm Bắc thuộc, mở ra thời kỳ độc lập lâu dài",
      "Đưa Phật giáo trở thành quốc giáo",
    ],
    answer: 2,
    explain:
      "Đây là điểm mấu chốt thường được hỏi trong đề thi. Chiến thắng năm 938 không " +
      "chỉ đánh bại một cuộc xâm lược mà chấm dứt hẳn thời kỳ Bắc thuộc kéo dài hơn " +
      "một nghìn năm, mở ra kỷ nguyên độc lập tự chủ.",
  },
];

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

export const LEVEL_LABEL = {
  "nhan-biet": "Nhận biết",
  "thong-hieu": "Thông hiểu",
  "van-dung": "Vận dụng",
};

export const XP_PER_CORRECT = { "nhan-biet": 10, "thong-hieu": 20, "van-dung": 30 };
