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
  {
    id: "Q04", cardId: "N02", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Ai là người đánh đuổi quân Nam Hán năm 931, giành lại quyền tự chủ trước khi Ngô Quyền lên nắm quyền?",
    choices: ["Khúc Thừa Dụ", "Dương Đình Nghệ", "Kiều Công Tiễn", "Lê Hoàn"],
    answer: 1,
    explain:
      "Dương Đình Nghệ đem quân từ Ái Châu ra đánh đuổi quân Nam Hán năm 931 và tự xưng " +
      "Tiết độ sứ. Ông cũng chính là bố vợ của Ngô Quyền.",
  },
  {
    id: "Q05", cardId: "N03", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao Ngô Quyền phải hạ thành Đại La, giết Kiều Công Tiễn trước khi quân Nam Hán kéo sang?",
    choices: [
      "Vì Kiều Công Tiễn nắm giữ toàn bộ lương thảo của quân ta",
      "Vì cần dứt điểm mối hoạ bên trong, tránh bị đánh cả trước lẫn sau khi giặc tới",
      "Vì thành Đại La là nơi duy nhất có thể đóng cọc",
      "Vì Kiều Công Tiễn là chủ soái của hạm đội Nam Hán",
    ],
    answer: 1,
    explain:
      "Kiều Công Tiễn là kẻ cầu viện Nam Hán. Nếu để hắn còn sống khi hạm đội địch tới, " +
      "quân ta sẽ bị kẹp giữa hai gọng kìm. Xử lý nội hoạ trước rồi mới dồn toàn lực ra " +
      "cửa Bạch Đằng là một quyết định chiến lược, không phải chuyện trả thù cá nhân.",
  },
  {
    id: "Q06", cardId: "N04", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Chủ soái hạm đội Nam Hán tử trận trong trận Bạch Đằng năm 938 là ai?",
    choices: ["Lưu Nghiễm", "Thoát Hoan", "Lưu Hoằng Tháo", "Ô Mã Nhi"],
    answer: 2,
    explain:
      "Lưu Hoằng Tháo, con vua Nam Hán Lưu Nghiễm, tử trận tại Bạch Đằng năm 938. " +
      "Thoát Hoan và Ô Mã Nhi là tướng nhà Nguyên trong cuộc kháng chiến thế kỷ XIII — " +
      "khác thời đại hoàn toàn.",
  },
  {
    id: "Q07", cardId: "D01", topic: "bach-dang-938", level: "van-dung",
    stem:
      "Sông Bạch Đằng ba lần được chọn làm nơi quyết chiến (938, 981, 1288). Điều này cho thấy điều gì về nghệ thuật quân sự của cha ông ta?",
    choices: [
      "Cha ông ta chỉ biết đánh thuỷ chiến, không giỏi đánh trên bộ",
      "Biết chọn địa thế và lợi dụng quy luật tự nhiên để bù lại chênh lệch lực lượng",
      "Quân phương Bắc chỉ có một con đường duy nhất để vào nước ta",
      "Bạch Đằng là con sông duy nhất đủ sâu cho thuyền chiến",
    ],
    answer: 1,
    explain:
      "Đây là dạng câu hỏi vận dụng thường gặp. Điểm mấu chốt: quân ta luôn ít hơn và " +
      "yếu hơn về khí tài, nên phải lấy địa thế và quy luật thuỷ triều làm lợi thế. " +
      "Cùng một dòng sông, ba thế hệ đều biết khai thác đúng điểm mạnh đó.",
  },
  {
    id: "Q08", cardId: "S01", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao quân ta phải giả thua và rút chạy trong giai đoạn đầu của trận Bạch Đằng năm 938?",
    choices: [
      "Vì quân ta thực sự bị đánh bại trong hiệp đầu",
      "Vì cần chờ quân tiếp viện từ Ái Châu kéo ra",
      "Để nhử hạm đội địch vượt qua bãi cọc đúng lúc triều đang lên",
      "Vì thuyền của quân ta nhỏ hơn nên không thể giao chiến trực diện",
    ],
    answer: 2,
    explain:
      "Giả thua là một phần của kế hoạch. Bãi cọc chỉ phát huy tác dụng nếu địch đã ở " +
      "phía trong khi nước rút — nên phải dụ được hạm đội vượt qua bãi cọc lúc triều lên. " +
      "Rút chạy ở đây là hành động chủ động, không phải bị động.",
  },
];

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

export const LEVEL_LABEL = {
  "nhan-biet": "Nhận biết",
  "thong-hieu": "Thông hiểu",
  "van-dung": "Vận dụng",
};

export const XP_PER_CORRECT = { "nhan-biet": 10, "thong-hieu": 20, "van-dung": 30 };
