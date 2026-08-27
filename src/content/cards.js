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
    art: "/art/n01.jpg",
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
];

export const CARD_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));
