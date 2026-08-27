// Nội dung thẻ bài — biên soạn tay, KHÔNG sinh tự động.
// Mọi thẻ PHẢI có `battle` và `source`. Bạch Đằng có ba trận (938 / 981 / 1288)
// nên không bao giờ được ghi "Bạch Đằng" mà không nói rõ trận nào.

export const CARDS = [
  {
    id: "N01",
    type: "nhan-vat",
    name: "Ngô Quyền",
    battle: "bach-dang-938",
    years: "897–944",
    art: "/art/n01-ngo-quyen.png",
    menh: "thuy",
    sinhLuc: 5,
    roles: [
      "Thống lĩnh Tĩnh Hải Quân",
      "Anh hùng xứ Đường Lâm",
      "Tiền Ngô Vương",
      "Tổng chỉ huy chiến dịch Bạch Đằng",
    ],
    skills: [
      {
        kind: "kich-hoat",
        name: "Trận Địa Cọc Ngầm",
        text:
          "Khi triều rút hoặc dùng 1 thẻ Mưu Lược hệ Thủy, kích hoạt bẫy cọc. " +
          "Hạm đội địch trong vùng cọc nhận 1 sát thương và bỏ 1 thẻ Né/Trang Bị.",
        history:
          "Cuối năm 938, Ngô Quyền cho đóng hàng nghìn cọc gỗ bịt sắt xuống lòng sông " +
          "Bạch Đằng, ở đoạn nước lên thì ngập kín cọc, nước rút thì cọc nhô lên. Ông " +
          "cho thuyền nhỏ ra khiêu chiến, nhử hạm đội Nam Hán vượt qua bãi cọc lúc " +
          "triều đang lên, rồi phản công đúng lúc triều rút. Thuyền lớn của địch bị cọc " +
          "đâm thủng và mắc cạn. Cơ chế 'triều rút mới kích hoạt' trên thẻ bài chính là " +
          "chi tiết lịch sử này.",
      },
      {
        kind: "thuong-truc",
        name: "Thống Lĩnh Tiền Ngô",
        text:
          "Khi làm Chủ tướng, các Phó tướng được +1 khoảng cách tấn công và rút thêm " +
          "1 thẻ khởi đầu.",
        history:
          "Ngô Quyền vốn là bộ tướng và là con rể của Dương Đình Nghệ — người đã giành " +
          "lại quyền tự chủ cho Tĩnh Hải quân. Khi Kiều Công Tiễn giết Dương Đình Nghệ " +
          "rồi cầu viện Nam Hán, Ngô Quyền từ Ái Châu kéo quân ra, quy tụ được các hào " +
          "trưởng địa phương dưới một quyền chỉ huy thống nhất. Năm 939 ông xưng vương, " +
          "đóng đô ở Cổ Loa.",
      },
    ],
    facts: [
      "Ngô Quyền quê ở Đường Lâm (nay thuộc Hà Nội), là bộ tướng và con rể của Dương Đình Nghệ.",
      "Năm 938 ông chỉ huy quân dân đánh tan hạm đội Nam Hán trên sông Bạch Đằng; chủ tướng địch là Lưu Hoằng Tháo tử trận.",
      "Chiến thắng Bạch Đằng năm 938 chấm dứt hơn một nghìn năm Bắc thuộc, mở ra thời kỳ độc lập lâu dài của dân tộc.",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Tướng quân", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Tiết chế", unlock: "Bối cảnh hai kỹ năng" },
      { xp: 150, label: "Tiền Ngô Vương", unlock: "Sơ đồ trận Bạch Đằng 938" },
    ],
    questions: ["Q01", "Q02", "Q03"],
  },
  // ───────────────────────────────────────────────────────────────────────────
  // CÁC THẺ DƯỚI ĐÂY: phần LỊCH SỬ đã viết xong, phần CƠ CHẾ CHƠI còn trống.
  //
  // Cơ chế chơi (mệnh, sinh lực, kỹ năng) là thiết kế game của nhóm — nằm trên
  // bản in thật. Không tự bịa ra ở đây. Khi có bản thẻ cuối cùng, chép NGUYÊN VĂN
  // luật in trên thẻ vào `text`, phần `history` đã viết sẵn bên dưới.
  // Trang thẻ tự động ẩn mục "Lịch sử đằng sau kỹ năng" khi `skills` còn rỗng.
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "N02",
    type: "nhan-vat",
    name: "Dương Đình Nghệ",
    battle: "bach-dang-938",
    years: "?–937",
    art: "/art/n02-duong-dinh-nghe.png",
    menh: null, sinhLuc: null, roles: ["Tướng cũ của họ Khúc", "Tiết độ sứ Tĩnh Hải quân"],
    skills: [],
    facts: [
      "Năm 931, Dương Đình Nghệ đem quân từ Ái Châu ra đánh đuổi quân Nam Hán, giành lại quyền tự chủ cho Tĩnh Hải quân.",
      "Ông tự xưng Tiết độ sứ và cai quản đất nước trong sáu năm, nuôi dưỡng lực lượng cho thế hệ sau.",
      "Năm 937 ông bị nha tướng Kiều Công Tiễn sát hại — sự kiện trực tiếp châm ngòi cho cuộc xâm lược của Nam Hán năm 938.",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Nha tướng", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Tiết độ sứ", unlock: "Bối cảnh thời họ Khúc" },
    ],
    questions: ["Q04"],
  },
  {
    id: "N03",
    type: "nhan-vat",
    name: "Kiều Công Tiễn",
    battle: "bach-dang-938",
    years: "?–938",
    art: "/art/n03-kieu-cong-tien.png",
    menh: null, sinhLuc: null, roles: ["Nha tướng phản chủ"],
    skills: [],
    facts: [
      "Năm 937, Kiều Công Tiễn giết Dương Đình Nghệ để đoạt quyền Tiết độ sứ.",
      "Bị Ngô Quyền đem quân từ Ái Châu ra hỏi tội, ông cầu cứu vua Nam Hán — mở đường cho quân xâm lược tiến vào nước ta.",
      "Ngô Quyền hạ thành Đại La và giết Kiều Công Tiễn trước khi hạm đội Nam Hán kịp tới, dứt điểm mối hoạ bên trong rồi mới quay ra đối phó giặc ngoài.",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Nha tướng", unlock: "3 sự kiện cơ bản" },
    ],
    questions: ["Q05"],
  },
  {
    id: "N04",
    type: "nhan-vat",
    name: "Lưu Hoằng Tháo",
    battle: "bach-dang-938",
    years: "?–938",
    art: "/art/n04-luu-hoang-thao.png",
    menh: null, sinhLuc: null, roles: ["Vạn Vương nhà Nam Hán", "Chủ soái hạm đội xâm lược"],
    skills: [],
    facts: [
      "Lưu Hoằng Tháo là con vua Nam Hán Lưu Nghiễm, được cử làm chủ soái đem thuỷ quân sang đánh nước ta năm 938.",
      "Vua cha đóng quân ở biên giới để sẵn sàng tiếp ứng, cho thấy Nam Hán coi đây là cuộc xâm lược quy mô lớn chứ không phải một cuộc cướp phá.",
      "Hạm đội của ông tiến vào cửa Bạch Đằng đúng lúc triều lên, bị mắc bẫy cọc khi triều rút; Lưu Hoằng Tháo tử trận tại đây.",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Chủ soái", unlock: "3 sự kiện cơ bản" },
    ],
    questions: ["Q06"],
  },
  {
    id: "D01",
    type: "dia-ly",
    name: "Sông Bạch Đằng",
    battle: "bach-dang-938",
    years: "—",
    art: "/art/d01-song-bach-dang.png",
    menh: null, sinhLuc: null, roles: ["Cửa ngõ đường thuỷ phía Đông Bắc"],
    skills: [],
    facts: [
      "Bạch Đằng là đường thuỷ ngắn nhất để hạm đội phương Bắc tiến vào vùng đồng bằng sông Hồng, nên trở thành cửa ngõ phòng thủ trọng yếu.",
      "Sông có biên độ thuỷ triều lớn: mỗi ngày mực nước chênh nhau vài mét, đủ để nhấn chìm rồi lại phơi ra cả một bãi cọc.",
      "Chính đặc điểm tự nhiên này khiến Bạch Đằng ba lần trở thành nơi quyết chiến — năm 938 (Ngô Quyền), năm 981 (Lê Hoàn) và năm 1288 (Trần Hưng Đạo).",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Địa thế", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Yếu địa", unlock: "So sánh ba trận Bạch Đằng" },
    ],
    questions: ["Q07"],
  },
  {
    id: "S01",
    type: "su-kien",
    name: "Trận Bạch Đằng năm 938",
    battle: "bach-dang-938",
    years: "938",
    art: "/art/s01-tran-bach-dang.png",
    menh: null, sinhLuc: null, roles: ["Trận quyết chiến chiến lược"],
    skills: [],
    facts: [
      "Ngô Quyền cho đóng cọc gỗ bịt sắt xuống lòng sông, chọn khúc nước có biên độ triều lớn làm trận địa.",
      "Quân ta dùng thuyền nhẹ khiêu chiến rồi giả thua, nhử hạm đội Nam Hán vượt qua bãi cọc lúc triều đang lên.",
      "Khi triều rút, quân ta phản công; thuyền lớn của địch bị cọc đâm thủng và mắc cạn, chủ soái Lưu Hoằng Tháo tử trận — chấm dứt hơn một nghìn năm Bắc thuộc.",
    ],
    source: "SGK Lịch sử 10 — cần đối chiếu số bài trước khi in",
    levels: [
      { xp: 0, label: "Diễn biến", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Ý nghĩa", unlock: "Vì sao gọi là trận quyết chiến chiến lược" },
    ],
    questions: ["Q08"],
  },
];

export const CARD_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));
