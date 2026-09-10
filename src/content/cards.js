// Nội dung thẻ bài — biên soạn tay, KHÔNG sinh tự động.
// Mọi thẻ PHẢI có `battle` và `source`. Bạch Đằng có ba trận (938 / 981 / 1288)
// nên không bao giờ được ghi "Bạch Đằng" mà không nói rõ trận nào.
//
// `hucau` là lời cảnh báo, không phải trang trí: thẻ nào có trường này là nhân
// vật KHÔNG có trong chính sử. Trang thẻ hiện nó ra thành một khung riêng, ngay
// trên phần lịch sử. Sản phẩm này dạy lịch sử; bịa một cái tên rồi để học sinh
// tưởng là thật thì hỏng đúng thứ mình đang bán.
//
// `artTam: true` nghĩa là thẻ đó đang mượn tranh khắc gỗ Henri Oger (1908-09,
// thuộc phạm vi công cộng) làm ảnh tạm, chưa có tranh chính thức của nhóm.
// `npm run check` và trang /health đều liệt kê ra để không ai quên trước lúc in.
//
// Hai trường khác nhau, đừng lẫn:
//   `source`     — hiện cho học sinh và ban giám khảo đọc. Chỉ ghi điều đã đúng.
//   `reviewNote` — ghi chú nội bộ cho nhóm, KHÔNG BAO GIỜ hiện ra màn hình.
// Trước đây ghi chú "cần đối chiếu trước khi in" nằm chung trong `source` nên
// hiện thẳng lên trang thẻ — ban giám khảo đọc được lời tự thú rằng nội dung
// chưa ai kiểm. Chạy `npm run check` để xem những ghi chú còn tồn đọng.

export const CARDS = [
  {
    id: "N01",
    type: "nhan-vat",
    name: "Ngô Quyền",
    battle: "bach-dang-938",
    years: "897–944",
    art: "/art/n01-ngo-quyen.jpg",
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
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
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
    artTam: true,   // tranh khắc gỗ Oger dùng tạm — CHƯA có tranh chính thức của nhóm
    menh: null, sinhLuc: null, roles: ["Tướng cũ của họ Khúc", "Tiết độ sứ Tĩnh Hải quân"],
    skills: [],
    facts: [
      "Năm 931, Dương Đình Nghệ đem quân từ Ái Châu ra đánh đuổi quân Nam Hán, giành lại quyền tự chủ cho Tĩnh Hải quân.",
      "Ông tự xưng Tiết độ sứ và cai quản đất nước trong sáu năm, nuôi dưỡng lực lượng cho thế hệ sau.",
      "Năm 937 ông bị nha tướng Kiều Công Tiễn sát hại — sự kiện trực tiếp châm ngòi cho cuộc xâm lược của Nam Hán năm 938.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
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
    art: "/art/n03-kieu-cong-tien.jpg",
    menh: null, sinhLuc: null, roles: ["Nha tướng phản chủ"],
    skills: [],
    facts: [
      "Năm 937, Kiều Công Tiễn giết Dương Đình Nghệ để đoạt quyền Tiết độ sứ.",
      "Bị Ngô Quyền đem quân từ Ái Châu ra hỏi tội, ông cầu cứu vua Nam Hán — mở đường cho quân xâm lược tiến vào nước ta.",
      "Ngô Quyền hạ thành Đại La và giết Kiều Công Tiễn trước khi hạm đội Nam Hán kịp tới, dứt điểm mối hoạ bên trong rồi mới quay ra đối phó giặc ngoài.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
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
    art: "/art/n04-luu-hoang-thao.jpg",
    menh: null, sinhLuc: null, roles: ["Vạn Vương nhà Nam Hán", "Chủ soái hạm đội xâm lược"],
    skills: [],
    facts: [
      "Lưu Hoằng Tháo là con vua Nam Hán Lưu Nghiễm, được cử làm chủ soái đem thuỷ quân sang đánh nước ta năm 938.",
      "Vua cha đóng quân ở biên giới để sẵn sàng tiếp ứng, cho thấy Nam Hán coi đây là cuộc xâm lược quy mô lớn chứ không phải một cuộc cướp phá.",
      "Hạm đội của ông tiến vào cửa Bạch Đằng đúng lúc triều lên, bị mắc bẫy cọc khi triều rút; Lưu Hoằng Tháo tử trận tại đây.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
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
    artTam: true,   // tranh khắc gỗ Oger dùng tạm — CHƯA có tranh chính thức của nhóm
    menh: null, sinhLuc: null, roles: ["Cửa ngõ đường thuỷ phía Đông Bắc"],
    skills: [],
    facts: [
      "Bạch Đằng là đường thuỷ ngắn nhất để hạm đội phương Bắc tiến vào vùng đồng bằng sông Hồng, nên trở thành cửa ngõ phòng thủ trọng yếu.",
      "Sông có biên độ thuỷ triều lớn: mỗi ngày mực nước chênh nhau vài mét, đủ để nhấn chìm rồi lại phơi ra cả một bãi cọc.",
      "Chính đặc điểm tự nhiên này khiến Bạch Đằng ba lần trở thành nơi quyết chiến — năm 938 (Ngô Quyền), năm 981 (Lê Hoàn) và năm 1288 (Trần Hưng Đạo).",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
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
    art: "/art/s01-tran-bach-dang.jpg",
    menh: null, sinhLuc: null, roles: ["Trận quyết chiến chiến lược"],
    skills: [],
    facts: [
      "Ngô Quyền cho đóng cọc gỗ bịt sắt xuống lòng sông, chọn khúc nước có biên độ triều lớn làm trận địa.",
      "Quân ta dùng thuyền nhẹ khiêu chiến rồi giả thua, nhử hạm đội Nam Hán vượt qua bãi cọc lúc triều đang lên.",
      "Khi triều rút, quân ta phản công; thuyền lớn của địch bị cọc đâm thủng và mắc cạn, chủ soái Lưu Hoằng Tháo tử trận — chấm dứt hơn một nghìn năm Bắc thuộc.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
    levels: [
      { xp: 0, label: "Diễn biến", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Ý nghĩa", unlock: "Vì sao gọi là trận quyết chiến chiến lược" },
    ],
    questions: ["Q08"],
  },
  // ───────────────────────────────────────────────────────────────────────────
  // PHÍA NAM HÁN. Bốn thẻ dưới đây dùng tranh nhóm gửi ngày 07/9.
  //
  // Hai thẻ N05, N06 là người CÓ THẬT, chép trong Đại Việt sử ký toàn thư.
  // Hai thẻ N07, N08 là nhân vật HƯ CẤU — xem trường `hucau`. Không trộn lẫn
  // hai loại này với nhau, và không bao giờ viết chuyện hư cấu vào `facts`.
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "N05",
    type: "nhan-vat",
    name: "Lưu Cung",
    battle: "bach-dang-938",
    years: "889–942",
    art: "/art/n05-luu-cung.jpg",
    menh: null, sinhLuc: null,
    roles: [
      "Vua khai quốc nhà Nam Hán",
      "Cha của Lưu Hoằng Tháo",
      "Người quyết định cuộc xâm lược năm 938",
    ],
    skills: [],
    facts: [
      "Lưu Cung — sử sách còn gọi là Lưu Nghiễm — là vua khai quốc nhà Nam Hán, một trong mười nước thời Ngũ đại Thập quốc bên Trung Quốc.",
      "Nghe tin Dương Đình Nghệ bị Kiều Công Tiễn giết, ông cho rằng Tĩnh Hải quân không còn tướng giỏi, liền phong con là Lưu Hoằng Tháo làm Bình Hải tướng quân, Giao Chỉ vương, đem thuỷ quân sang đánh nước ta.",
      "Ông tự đem quân đóng ở biên giới để tiếp ứng. Khi hay tin con tử trận và hạm đội tan vỡ, ông phải thu quân về; từ đó Nam Hán không đem quân sang nước ta lần nào nữa.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
    levels: [
      { xp: 0, label: "Hoàng đế", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Kẻ bại trận", unlock: "Vì sao một quyết định sai kéo đổ cả chiến dịch" },
    ],
  },
  {
    id: "N06",
    type: "nhan-vat",
    name: "Tiêu Ích",
    battle: "bach-dang-938",
    years: "—",
    art: "/art/n06-tieu-ich.jpg",
    menh: null, sinhLuc: null,
    roles: ["Sùng Văn hầu nhà Nam Hán", "Mưu sĩ can gián vua Lưu Cung"],
    skills: [],
    facts: [
      "Tiêu Ích giữ tước Sùng Văn hầu, được vua Nam Hán Lưu Cung hỏi kế trước khi đem quân sang đánh nước ta năm 938.",
      "Ông khuyên nên thăm dò kỹ đường đi, tích đủ lương thảo, tiến quân từ từ và chia nhiều đường thuỷ bộ — cách đánh chậm mà chắc.",
      "Lưu Cung nóng vội, coi thường Ngô Quyền nên không nghe. Kết cục đúng như điều Tiêu Ích lo ngại: hạm đội Nam Hán thua tan tác ở Bạch Đằng.",
    ],
    source: "Biên soạn theo chương trình Lịch sử 10 (GDPT 2018)",
    reviewNote: "Chưa đối chiếu câu chữ và số bài với SGK. Phải có giáo viên Lịch sử duyệt trước khi in thẻ.",
    levels: [
      { xp: 0, label: "Mưu sĩ", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Lời can bỏ ngoài tai", unlock: "Vì sao lời khuyên đúng vẫn có thể không được nghe" },
    ],
  },
  {
    id: "N07",
    type: "nhan-vat",
    name: "Lý Long Câu",
    battle: "bach-dang-938",
    years: "—",
    art: "/art/n07-ly-long-cau.jpg",
    menh: null, sinhLuc: null,
    roles: ["Tướng tiên phong hạm đội Nam Hán"],
    skills: [],
    hucau:
      "Chính sử KHÔNG chép tên vị tướng này. Lý Long Câu chỉ xuất hiện trong " +
      "tiểu thuyết và dã sử về trận Bạch Đằng, không có trong Đại Việt sử ký " +
      "toàn thư cũng như trong SGK. Trong bộ bài, thẻ này đại diện cho đội " +
      "thuyền tiên phong của Nam Hán. Phần dưới đây là những điều sử sách CÓ chép.",
    facts: [
      "Hạm đội Nam Hán tiến vào cửa Bạch Đằng theo đội hình có thuyền đi trước dò đường, thuyền lớn theo sau — và chính lớp đi đầu là lớp sa vào bãi cọc trước tiên.",
      "Sử sách chép khá kỹ về chủ soái Lưu Hoằng Tháo nhưng không ghi tên các tướng dưới quyền ông. Đó là chuyện thường: chính sử phần nhiều chỉ chép người đứng đầu.",
      "Vì vậy khi gặp một cái tên trong truyện hay phim về trận Bạch Đằng, cần hỏi: tên này lấy từ sử, hay do người viết đặt ra?",
    ],
    source: "Bối cảnh biên soạn theo chương trình Lịch sử 10 (GDPT 2018); nhân vật là hư cấu",
    reviewNote: "Nhân vật hư cấu. Nhóm phải quyết định giữ hay bỏ, và nếu giữ thì phải ghi rõ là hư cấu trên thẻ in.",
    levels: [
      { xp: 0, label: "Tướng tiên phong", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Sử và truyện", unlock: "Cách phân biệt sử liệu với hư cấu" },
    ],
  },
  {
    id: "N08",
    type: "nhan-vat",
    name: "Tô Phán",
    battle: "bach-dang-938",
    years: "—",
    art: "/art/n08-to-phan.jpg",
    menh: null, sinhLuc: null,
    roles: ["Tướng chỉ huy lớp thuyền tiếp ứng Nam Hán"],
    skills: [],
    hucau:
      "Chính sử KHÔNG chép tên vị tướng này. Tô Phán chỉ xuất hiện trong tiểu " +
      "thuyết và dã sử về trận Bạch Đằng, không có trong Đại Việt sử ký toàn thư " +
      "cũng như trong SGK. Trong bộ bài, thẻ này đại diện cho lớp thuyền tiếp ứng " +
      "đi sau đội tiên phong. Phần dưới đây là những điều sử sách CÓ chép.",
    facts: [
      "Hạm đội Nam Hán vào cửa Bạch Đằng lúc triều đang lên. Khi triều rút, cả đoàn thuyền bị dồn vào bãi cọc; quân Nam Hán chết quá nửa và chủ soái Lưu Hoằng Tháo tử trận.",
      "Lớp thuyền đi sau cũng không thoát: nước rút xiết đẩy chúng vào bãi cọc, quay ra không kịp.",
      "Sử sách không chép tên một vị tướng nào đi cùng Lưu Hoằng Tháo. Biết rõ đâu là sử, đâu là truyện chính là một kỹ năng của người học sử.",
    ],
    source: "Bối cảnh biên soạn theo chương trình Lịch sử 10 (GDPT 2018); nhân vật là hư cấu",
    reviewNote: "Nhân vật hư cấu. Nhóm phải quyết định giữ hay bỏ, và nếu giữ thì phải ghi rõ là hư cấu trên thẻ in.",
    levels: [
      { xp: 0, label: "Tướng tiếp ứng", unlock: "3 sự kiện cơ bản" },
      { xp: 60, label: "Sử và truyện", unlock: "Cách phân biệt sử liệu với hư cấu" },
    ],
  },
];

export const CARD_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));
