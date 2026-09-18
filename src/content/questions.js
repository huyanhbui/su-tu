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
    id: "Q09", cardId: "N01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Sau chiến thắng Bạch Đằng năm 938, Ngô Quyền xưng vương và chọn nơi nào làm kinh đô?",
    choices: ["Hoa Lư", "Phong Châu", "Cổ Loa", "Đại La"],
    answer: 2,
    explain:
      "Năm 939 Ngô Quyền xưng vương và đóng đô ở Cổ Loa — kinh đô cũ của An Dương Vương — " +
      "như một cách nối lại quốc thống đã đứt đoạn hơn nghìn năm. Hoa Lư là kinh đô thời Đinh " +
      "và Tiền Lê, còn Đại La phải đến năm 1010 mới được Lý Công Uẩn chọn và đổi tên thành Thăng Long.",
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
    id: "Q04", cardId: "N01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Ai là người đánh đuổi quân Nam Hán năm 931, giành lại quyền tự chủ trước khi Ngô Quyền lên nắm quyền?",
    choices: ["Khúc Thừa Dụ", "Dương Đình Nghệ", "Kiều Công Tiễn", "Lê Hoàn"],
    answer: 1,
    explain:
      "Dương Đình Nghệ đem quân từ Ái Châu ra đánh đuổi quân Nam Hán năm 931 và tự xưng " +
      "Tiết độ sứ. Ông cũng chính là bố vợ của Ngô Quyền.",
  },
  {
    id: "Q10", cardId: "N01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Sau khi đánh đuổi quân Nam Hán năm 931, Dương Đình Nghệ tự xưng chức gì?",
    choices: ["Thái thú", "Hoàng đế", "Đại vương", "Tiết độ sứ"],
    answer: 3,
    explain:
      "Dương Đình Nghệ tự xưng Tiết độ sứ — chức quan đứng đầu Tĩnh Hải quân theo cách gọi của " +
      "phương Bắc — rồi cai quản đất nước trong sáu năm. Ông chưa xưng vương hay xưng đế; phải đến " +
      "Ngô Quyền năm 939 nước ta mới bỏ hẳn danh xưng Tiết độ sứ vốn mang tính lệ thuộc.",
  },
  {
    id: "Q11", cardId: "N03", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao cái chết của Dương Đình Nghệ năm 937 lại dẫn tới cuộc xâm lược của quân Nam Hán năm 938?",
    choices: [
      "Vì nhà Nam Hán được nhà Đường uỷ nhiệm sang thu hồi lại Tĩnh Hải quân",
      "Vì sau khi ông mất, Tĩnh Hải quân không còn lực lượng quân sự nào đáng kể",
      "Vì Kiều Công Tiễn giết ông để đoạt quyền, rồi cầu cứu Nam Hán khi bị Ngô Quyền hỏi tội",
      "Vì Ngô Quyền chủ động đem quân sang đánh Nam Hán trước để trả thù cho bố vợ",
    ],
    answer: 2,
    explain:
      "Nam Hán không tự nhiên kéo sang: chính lời cầu cứu của Kiều Công Tiễn đã cho họ cái cớ và " +
      "cả người dẫn đường. Đây là ví dụ điển hình cho việc mâu thuẫn bên trong biến thành kẽ hở " +
      "để ngoại xâm tràn vào. Cũng cần nhớ nhà Đường đã sụp đổ từ năm 907, không còn uỷ nhiệm cho ai.",
  },
  {
    id: "Q12", cardId: "N01", topic: "bach-dang-938", level: "van-dung",
    stem:
      "Họ Khúc dựng nền tự chủ, Dương Đình Nghệ đánh đuổi Nam Hán năm 931, rồi Ngô Quyền thắng năm 938. Chuỗi sự kiện nối tiếp này cho thấy điều gì về con đường giành độc lập của dân tộc ta đầu thế kỷ X?",
    choices: [
      "Độc lập là kết quả của một quá trình nối tiếp, thế hệ trước chuẩn bị lực lượng cho thế hệ sau",
      "Độc lập chỉ cần một trận đánh lớn là giành được, không cần chuẩn bị lâu dài",
      "Nước ta giành được độc lập chủ yếu vì nhà Nam Hán tự suy yếu rồi rút lui",
      "Chỉ cần thay người đứng đầu là đủ để chấm dứt ách đô hộ phương Bắc",
    ],
    answer: 0,
    explain:
      "Chiến thắng năm 938 không phải một sự kiện đơn lẻ. Họ Khúc giành quyền tự chủ, Dương Đình Nghệ " +
      "giữ và nuôi lực lượng suốt sáu năm, Ngô Quyền kế thừa cả đội quân lẫn uy tín ấy rồi mới dứt " +
      "điểm được. Nhìn theo cả chuỗi mới hiểu vì sao năm 938 lại thành công trọn vẹn đến thế.",
  },
  {
    id: "Q13", cardId: "N03", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Khi bị Ngô Quyền đem quân từ Ái Châu ra hỏi tội, Kiều Công Tiễn đã làm gì?",
    choices: [
      "Rút quân về Ái Châu cố thủ",
      "Xin hàng Ngô Quyền và được tha tội",
      "Chạy sang Chiêm Thành lánh nạn",
      "Cầu cứu vua Nam Hán",
    ],
    answer: 3,
    explain:
      "Kiều Công Tiễn cầu cứu vua Nam Hán — chính lời cầu cứu này mở đường cho hạm đội xâm lược tiến " +
      "vào nước ta năm 938. Ái Châu là nơi Ngô Quyền xuất quân chứ không phải căn cứ của Kiều Công " +
      "Tiễn; ông ta ở thành Đại La và bị Ngô Quyền giết trước khi quân Nam Hán kịp tới.",
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
    id: "Q14", cardId: "N03", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao hành động cầu viện Nam Hán của Kiều Công Tiễn bị sử sách lên án nặng nề?",
    choices: [
      "Vì nó mở đường cho quân xâm lược tiến vào nước ta, đặt quyền lợi riêng lên trên vận mệnh dân tộc",
      "Vì ông từ chối chia quyền cho các hào trưởng địa phương sau khi đoạt ngôi",
      "Vì ông giết Dương Đình Nghệ đúng lúc quân Nam Hán đang vây thành Đại La",
      "Vì ông đã dâng thành Đại La cho hạm đội Nam Hán trước khi Ngô Quyền kéo ra",
    ],
    answer: 0,
    explain:
      "Giết chủ để đoạt quyền đã là tội, nhưng điều sử sách lên án nặng nhất là việc rước quân ngoại " +
      "bang vào nước để giữ ghế cho riêng mình. Hai phương án nhắc tới thành Đại La đều sai: năm 937 " +
      "không có cuộc vây thành nào, và Kiều Công Tiễn bị giết trước khi hạm đội Nam Hán kịp tới.",
  },
  {
    id: "Q15", cardId: "N03", topic: "bach-dang-938", level: "van-dung",
    stem: "Từ sự kiện Kiều Công Tiễn cầu viện Nam Hán, có thể rút ra bài học gì cho công cuộc giữ nước?",
    choices: [
      "Muốn giữ nước thì phải dựa vào sự bảo trợ của một nước lớn",
      "Mâu thuẫn nội bộ nếu không được giải quyết dễ trở thành cái cớ cho ngoại xâm",
      "Chỉ nên giao binh quyền cho người cùng dòng họ để tránh bị phản bội",
      "Nên tránh đặt trung tâm chính trị ở thành Đại La vì thành này khó phòng thủ",
    ],
    answer: 1,
    explain:
      "Bài học nằm ở mối quan hệ giữa 'thù trong' và 'giặc ngoài': một cuộc tranh giành quyền lực " +
      "trong nước đã kéo theo cả một cuộc xâm lược. Cũng vì hiểu điều đó mà Ngô Quyền dứt điểm Kiều " +
      "Công Tiễn trước, rồi mới dồn toàn lực ra cửa Bạch Đằng.",
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
    id: "Q16", cardId: "N04", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Đạo quân do Lưu Hoằng Tháo chỉ huy sang xâm lược nước ta năm 938 là lực lượng gì?",
    choices: [
      "Kỵ binh tiến qua biên giới phía Bắc",
      "Bộ binh theo đường Ái Châu đánh ra",
      "Thuỷ quân theo đường biển tiến vào cửa Bạch Đằng",
      "Bộ binh và kỵ binh phối hợp, tiến thẳng tới Cổ Loa",
    ],
    answer: 2,
    explain:
      "Lưu Hoằng Tháo được cử làm chủ soái đem thuỷ quân vượt biển vào cửa Bạch Đằng, còn vua cha " +
      "Lưu Nghiễm đóng quân ở biên giới để sẵn sàng tiếp ứng. Chính vì địch tiến bằng đường thuỷ mà " +
      "bãi cọc dưới lòng sông mới trở thành thứ vũ khí quyết định.",
  },
  {
    id: "Q17", cardId: "N04", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao hạm đội của Lưu Hoằng Tháo tuy mạnh hơn quân ta nhưng vẫn rơi vào bẫy?",
    choices: [
      "Vì địch không biết dưới lòng sông có bãi cọc và bị nhử vượt qua đúng lúc triều lên",
      "Vì thuyền Nam Hán quá nhỏ, không chịu nổi sóng gió ở cửa biển",
      "Vì quân Nam Hán bị chặn đánh ngay từ biên giới nên vào tới Bạch Đằng đã kiệt sức",
      "Vì Lưu Hoằng Tháo phải chia quân quay lại cứu vua cha đang bị vây",
    ],
    answer: 0,
    explain:
      "Ưu thế của địch nằm ở thuyền lớn và quân đông, nhưng ưu thế ấy chỉ phát huy khi họ nắm được " +
      "địa hình. Ngô Quyền giấu bãi cọc dưới nước triều lên rồi dùng thuyền nhẹ nhử địch vượt qua, " +
      "nên đến khi triều rút thì chính thuyền lớn lại thành điểm yếu chí mạng.",
  },
  {
    id: "Q18", cardId: "N04", topic: "bach-dang-938", level: "van-dung",
    stem:
      "Vì sao có thể nói thất bại của Lưu Hoằng Tháo năm 938 không chỉ là thua một trận, mà là sự phá sản của cả kế hoạch xâm lược?",
    choices: [
      "Vì ngay sau trận đánh, nhà Nam Hán bị nhà Tống thôn tính và sụp đổ",
      "Vì Nam Hán phải cắt đất và bồi thường chiến phí cho nước ta",
      "Vì toàn bộ cánh quân Nam Hán đóng ở biên giới đã ra hàng quân ta",
      "Vì chủ soái tử trận, hạm đội tan vỡ và Nam Hán từ bỏ hẳn ý đồ xâm lược nước ta",
    ],
    answer: 3,
    explain:
      "Nam Hán đã dốc sức cho cuộc xâm lược này: con vua cầm quân, vua cha đóng ở biên giới tiếp ứng. " +
      "Chủ soái tử trận và hạm đội tan vỡ khiến vua Nam Hán phải thu quân về, và từ đó họ không đem " +
      "quân sang nước ta lần nào nữa. Nhà Nam Hán còn tồn tại thêm hơn ba mươi năm rồi mới bị nhà Tống thôn tính.",
  },
  {
    id: "Q19", cardId: "D01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Sông Bạch Đằng ba lần trở thành nơi quyết chiến vào những năm nào?",
    choices: ["938, 1075 và 1288", "931, 938 và 981", "938, 981 và 1288", "938, 1258 và 1285"],
    answer: 2,
    explain:
      "Ba trận Bạch Đằng là năm 938 (Ngô Quyền đánh Nam Hán), năm 981 (Lê Hoàn đánh Tống) và năm 1288 " +
      "(Trần Hưng Đạo đánh Nguyên). Năm 1075 là cuộc tiến công của Lý Thường Kiệt sang đất Tống, còn " +
      "1258 và 1285 là hai lần kháng chiến chống Mông – Nguyên trước đó, đều không diễn ra ở Bạch Đằng.",
  },
  {
    id: "Q20", cardId: "D01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Trận Bạch Đằng năm 1288 — trận thứ ba trên dòng sông này — do ai chỉ huy?",
    choices: ["Ngô Quyền", "Lê Hoàn", "Lý Thường Kiệt", "Trần Hưng Đạo"],
    answer: 3,
    explain:
      "Trần Hưng Đạo chỉ huy trận Bạch Đằng năm 1288, tiêu diệt đoàn thuyền quân Nguyên. Ngô Quyền gắn " +
      "với trận năm 938 và Lê Hoàn với trận năm 981; Lý Thường Kiệt không đánh trận nào trên sông này. " +
      "Nhớ chắc ba mốc này là cách an toàn nhất để không nhầm lẫn khi làm bài.",
  },
  {
    id: "Q21", cardId: "D01", topic: "bach-dang-938", level: "thong-hieu",
    stem:
      "Vì sao sông Bạch Đằng trở thành cửa ngõ phòng thủ trọng yếu trước các cuộc tiến công bằng đường biển từ phương Bắc?",
    choices: [
      "Vì đây là ranh giới tự nhiên giữa nước ta và các triều đại phương Bắc",
      "Vì đây là đường thuỷ ngắn nhất để hạm đội phương Bắc tiến vào vùng đồng bằng sông Hồng",
      "Vì hai bên bờ sông là vách núi dựng đứng nên thuyền địch không thể cập bờ",
      "Vì mọi sứ bộ và thuyền buôn phương Bắc đều buộc phải đi theo đường sông này",
    ],
    answer: 1,
    explain:
      "Giữ được Bạch Đằng là chặn được lối vào nhanh nhất tới đồng bằng sông Hồng — nơi tập trung dân " +
      "cư, lúa gạo và trung tâm chính trị của cả nước. Địa thế ấy cộng với biên độ thuỷ triều lớn giải " +
      "thích vì sao cùng một dòng sông lại ba lần được chọn làm nơi quyết chiến.",
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
    id: "Q22", cardId: "S01", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Ngô Quyền đã chuẩn bị trận địa trên sông Bạch Đằng bằng cách nào?",
    choices: [
      "Đắp đê chặn dòng để bất ngờ tháo nước cuốn trôi thuyền địch",
      "Giăng xích sắt ngang sông để chặn đường tiến của hạm đội",
      "Đóng cọc gỗ bịt sắt xuống lòng sông ở khúc có biên độ thuỷ triều lớn",
      "Xây thành luỹ dọc hai bên bờ để bắn tên xuống thuyền địch",
    ],
    answer: 2,
    explain:
      "Cọc gỗ bịt sắt được đóng xuống lòng sông ở đoạn nước lên thì ngập kín, nước rút thì nhô lên. " +
      "Điểm tinh tế không nằm ở bản thân bãi cọc mà ở chỗ chọn đúng khúc sông có biên độ triều lớn: " +
      "không có thuỷ triều thì bãi cọc chỉ là vật cản lộ liễu, địch nhìn thấy là tránh.",
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
  {
    id: "Q23", cardId: "S01", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao thuyền lớn — vốn là ưu thế của quân Nam Hán — lại trở thành bất lợi trong trận Bạch Đằng năm 938?",
    choices: [
      "Vì thuyền lớn không thể đi ngược dòng sông Bạch Đằng",
      "Vì thuyền càng lớn càng dễ bị cọc đâm thủng và mắc cạn khi nước rút",
      "Vì thuyền lớn cần rất nhiều tay chèo mà quân Nam Hán lại thiếu người",
      "Vì thuyền lớn không chở được ngựa chiến nên địch mất hẳn kỵ binh",
    ],
    answer: 1,
    explain:
      "Thuyền lớn ăn nước sâu nên khi triều rút thì vướng cọc và mắc cạn, trong khi thuyền nhẹ của " +
      "quân ta vẫn cơ động được. Cùng một đặc điểm, ở ngoài biển là ưu thế nhưng trong lòng sông có " +
      "bẫy cọc lại thành điểm chết — đó chính là chỗ Ngô Quyền tính toán trước.",
  },
  {
    id: "Q24", cardId: "S01", topic: "bach-dang-938", level: "van-dung",
    // Đề tự mang theo dữ kiện về trận 1288, vì thẻ S01 không hề nhắc tới trận này.
    // Nguyên tắc: câu hỏi trên một thẻ phải trả lời được bằng chính thẻ đó — nếu cần
    // dữ kiện ở nơi khác thì đưa thẳng vào đề, đừng bắt học sinh đoán.
    stem:
      "Năm 1288, Trần Hưng Đạo cũng đánh tan đoàn thuyền quân Nguyên trên chính " +
      "sông Bạch Đằng. So với trận năm 938, điểm chung cơ bản về cách đánh là gì?",
    choices: [
      "Đều đóng cọc dưới lòng sông và lợi dụng quy luật thuỷ triều để tiêu diệt hạm đội địch",
      "Đều là trận chặn đánh đoàn thuyền địch đang trên đường rút chạy về nước",
      "Đều dựa vào lực lượng kỵ binh mai phục sẵn ở hai bên bờ sông",
      "Đều do một vị vua đang tại vị trực tiếp cầm quân",
    ],
    answer: 0,
    explain:
      "Cả hai trận đều lấy bãi cọc cộng với quy luật thuỷ triều làm cách đánh chủ đạo. Nhưng phải phân " +
      "biệt: năm 938 quân ta chặn hạm đội đang tiến vào xâm lược, còn năm 1288 quân ta tiêu diệt đoàn " +
      "thuyền quân Nguyên đang rút chạy — nên phương án 'đoàn thuyền rút chạy' chỉ đúng với trận 1288.",
  },
  // ── Phía Nam Hán: N05 Lưu Cung, N06 Tiêu Ích ────────────────────────────────
  {
    id: "Q25", cardId: "N05", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Ai là vua nhà Nam Hán đã sai con đem quân sang đánh nước ta năm 938?",
    choices: ["Lưu Hoằng Tháo", "Lưu Cung", "Tiêu Ích", "Kiều Công Tiễn"],
    answer: 1,
    explain:
      "Lưu Cung — sử sách còn gọi là Lưu Nghiễm — là vua khai quốc nhà Nam Hán và là " +
      "người ra quyết định xâm lược. Lưu Hoằng Tháo là con ông, người trực tiếp cầm " +
      "quân và tử trận ở Bạch Đằng.",
  },
  {
    id: "Q26", cardId: "N05", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao Lưu Cung quyết định đem quân sang đánh nước ta ngay sau khi Dương Đình Nghệ bị giết?",
    choices: [
      "Vì Ngô Quyền đã đem quân sang đánh Nam Hán trước",
      "Vì nhà Tống ép Nam Hán phải mở rộng lãnh thổ xuống phía nam",
      "Vì Dương Đình Nghệ trước đó đã hứa thần phục rồi nuốt lời",
      "Vì ông cho rằng Tĩnh Hải quân mất người cầm đầu thì không còn tướng giỏi để chống cự",
    ],
    answer: 3,
    explain:
      "Cái chết của Dương Đình Nghệ và cuộc tranh giành quyền lực sau đó khiến Lưu Cung " +
      "tin rằng thời cơ đã tới. Ông đánh giá sai một điều: người kế tục Dương Đình Nghệ " +
      "là Ngô Quyền.",
  },
  {
    id: "Q27", cardId: "N05", topic: "bach-dang-938", level: "van-dung",
    stem: "Việc vua Nam Hán tự đem quân đóng ở biên giới để tiếp ứng cho con nói lên điều gì về cuộc xâm lược năm 938?",
    choices: [
      "Nam Hán dốc sức cho một cuộc xâm lược quy mô lớn, có tính toán và có lực lượng dự phòng",
      "Đây chỉ là một cuộc cướp phá nhỏ ở vùng biên giới",
      "Vua Nam Hán sợ con làm phản nên phải đi theo giám sát",
      "Nam Hán không thật muốn đánh, chỉ đưa quân ra để thị uy",
    ],
    answer: 0,
    explain:
      "Con vua cầm quân, vua cha đóng ở biên giới sẵn sàng tiếp ứng — đó là cách một " +
      "triều đình dốc sức cho một chiến dịch lớn, không phải một cuộc cướp phá. Hiểu " +
      "được quy mô ấy mới thấy hết ý nghĩa của chiến thắng năm 938.",
  },
  {
    id: "Q28", cardId: "N06", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Tiêu Ích giữ vai trò gì bên cạnh vua Nam Hán Lưu Cung?",
    choices: [
      "Chủ soái hạm đội sang đánh nước ta",
      "Sứ giả được cử sang thương lượng với Ngô Quyền",
      "Mưu sĩ được vua hỏi kế trước khi xuất quân",
      "Người trông coi việc đóng thuyền chiến",
    ],
    answer: 2,
    explain:
      "Tiêu Ích giữ tước Sùng Văn hầu và được Lưu Cung hỏi kế trước cuộc xâm lược. " +
      "Người cầm quân là Lưu Hoằng Tháo, không phải ông.",
  },
  {
    id: "Q29", cardId: "N06", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Tiêu Ích khuyên vua Nam Hán nên đánh nước ta theo cách nào?",
    choices: [
      "Thăm dò kỹ đường đi, tích đủ lương thảo, tiến quân từ từ và chia nhiều đường thuỷ bộ",
      "Đánh nhanh thắng nhanh, dùng thuyền lớn tiến thẳng vào cửa sông",
      "Không nên đánh, mà nên dụ Ngô Quyền quy hàng",
      "Đem toàn bộ quân theo đường bộ, không dùng đến thuỷ quân",
    ],
    answer: 0,
    explain:
      "Tiêu Ích khuyên cách đánh chậm mà chắc: nắm rõ địa hình rồi mới tiến, chia " +
      "nhiều mũi để bao vây. Lưu Cung chọn ngược lại — đưa hạm đội tiến thẳng vào " +
      "một cửa sông mà quân mình chưa hề thông thuộc.",
  },
  {
    id: "Q30", cardId: "N06", topic: "bach-dang-938", level: "van-dung",
    stem: "Bài học rút ra từ việc Lưu Cung bỏ ngoài tai lời can của Tiêu Ích là gì?",
    choices: [
      "Người cầm quân không nên nghe ý kiến của quan văn",
      "Đánh chậm bao giờ cũng thắng đánh nhanh",
      "Mưu sĩ giỏi thì phải tự mình cầm quân mới thuyết phục được vua",
      "Chủ quan và coi thường đối thủ có thể làm hỏng cả một chiến dịch được chuẩn bị công phu",
    ],
    answer: 3,
    explain:
      "Nam Hán không thiếu quân, thiếu thuyền hay thiếu người bày mưu. Thứ họ thiếu là " +
      "sự thận trọng. Lưu ý phương án 'đánh chậm bao giờ cũng thắng' là sai: không có " +
      "cách đánh nào luôn đúng, điều quyết định là hiểu đúng đối thủ và địa hình.",
  },

  // ── Hai thẻ nhân vật hư cấu: câu hỏi bám vào phần sử CÓ THẬT và vào kỹ năng
  //    phân biệt sử liệu với hư cấu. Không hỏi về chi tiết bịa trong tiểu thuyết.
  {
    id: "Q31", cardId: "N07", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Vì sao thẻ Lý Long Câu được ghi rõ là nhân vật hư cấu?",
    choices: [
      "Vì ông là người nước ta chứ không phải người Nam Hán",
      "Vì ông sống ở thế kỷ XIII chứ không phải thế kỷ X",
      "Vì Đại Việt sử ký toàn thư và SGK đều không chép tên vị tướng này",
      "Vì tên ông chỉ còn thấy trên bia đá ở vùng Bạch Đằng",
    ],
    answer: 2,
    explain:
      "Cái tên này chỉ xuất hiện trong tiểu thuyết và dã sử. Sử sách chép về trận Bạch " +
      "Đằng năm 938 không có vị tướng nào tên như vậy, nên bộ bài ghi rõ để người chơi " +
      "không nhầm truyện thành sử.",
  },
  {
    id: "Q32", cardId: "N07", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao chính sử thường không chép tên các tướng cấp dưới trong một trận đánh?",
    choices: [
      "Vì các tướng cấp dưới không trực tiếp tham gia chiến đấu",
      "Vì chính sử phần nhiều chỉ chép người đứng đầu và những sự kiện lớn",
      "Vì tên họ đã bị người đời sau cố ý xoá đi",
      "Vì thời đó nước ta chưa có chữ viết để ghi chép",
    ],
    answer: 1,
    explain:
      "Sử biên niên ghi rất gọn: người cầm đầu, mốc thời gian, kết cục. Chi tiết về " +
      "từng người lính, từng viên tướng nhỏ phần lớn không được chép lại — đó là lý do " +
      "nhiều khoảng trống trong lịch sử sau này được tiểu thuyết lấp vào.",
  },
  {
    id: "Q33", cardId: "N07", topic: "bach-dang-938", level: "van-dung",
    stem: "Khi đọc một cuốn tiểu thuyết lịch sử về trận Bạch Đằng năm 938, em nên làm gì với những cái tên nhân vật trong đó?",
    choices: [
      "Tin hoàn toàn, vì tiểu thuyết lịch sử luôn dựa trên sử liệu",
      "Bỏ qua cuốn sách, vì tiểu thuyết không có giá trị với người học sử",
      "Chỉ tin những cái tên là người nước ta, còn tên người phương Bắc thì không",
      "Đối chiếu với sử liệu để biết tên nào có thật, tên nào do tác giả đặt ra",
    ],
    answer: 3,
    explain:
      "Tiểu thuyết lịch sử rất đáng đọc, nhưng nó có quyền hư cấu. Việc của người học " +
      "sử là biết ranh giới đó nằm ở đâu — chứ không phải tin tất cả, cũng không phải " +
      "gạt bỏ tất cả.",
  },
  {
    id: "Q34", cardId: "N08", topic: "bach-dang-938", level: "nhan-biet",
    stem: "Điều gì xảy ra với hạm đội Nam Hán khi nước triều rút ở Bạch Đằng năm 938?",
    choices: [
      "Bị dồn vào bãi cọc, thuyền vỡ và đắm, quân chết quá nửa",
      "Rút được an toàn ra biển rồi quay về nước",
      "Quay lại đánh chiếm thành Đại La",
      "Được cánh quân của vua cha từ biên giới cứu kịp",
    ],
    answer: 0,
    explain:
      "Triều rút là thời điểm quyết định: bãi cọc nhô lên, thuyền lớn của địch bị đâm " +
      "thủng và mắc cạn. Chủ soái Lưu Hoằng Tháo tử trận ngay trong trận này.",
  },
  {
    id: "Q35", cardId: "N08", topic: "bach-dang-938", level: "thong-hieu",
    stem: "Vì sao lớp thuyền đi sau của Nam Hán cũng không thoát được khỏi bãi cọc?",
    choices: [
      "Vì họ được lệnh ở lại chiến đấu đến người cuối cùng",
      "Vì quân ta đã giăng xích sắt chặn sẵn đường ra biển",
      "Vì nước triều rút xiết đẩy cả đoàn thuyền dồn vào bãi cọc, quay ra không kịp",
      "Vì thuyền của họ nhẹ hơn nên bị sóng đánh dạt vào bờ",
    ],
    answer: 2,
    explain:
      "Cả đoàn thuyền đã ở phía trong bãi cọc khi triều bắt đầu rút. Dòng nước rút " +
      "mạnh biến chính con sông thành thứ đẩy họ vào bẫy — không ai kịp trở đầu thuyền.",
  },
  {
    id: "Q36", cardId: "N08", topic: "bach-dang-938", level: "van-dung",
    stem: "Thẻ Lý Long Câu và thẻ Tô Phán đều ghi rõ là nhân vật hư cấu. Vì sao một bộ bài dạy lịch sử lại cần ghi như vậy?",
    choices: [
      "Để người chơi biết hai thẻ này yếu hơn các thẻ khác",
      "Để người học phân biệt được đâu là sử liệu, đâu là hư cấu — đó chính là một kỹ năng của người học sử",
      "Vì luật bản quyền bắt buộc phải ghi chú như vậy",
      "Vì hai thẻ đó sẽ bị loại khỏi trò chơi ở các bản sau",
    ],
    answer: 1,
    explain:
      "Một bộ bài có thể vừa hay vừa trung thực. Ghi rõ chỗ nào là hư cấu không làm " +
      "trò chơi kém đi, mà làm người chơi tin được phần còn lại.",
  },
];

export const LEVEL_LABEL = {
  "nhan-biet": "Nhận biết",
  "thong-hieu": "Thông hiểu",
  "van-dung": "Vận dụng",
};

export const XP_PER_CORRECT = { "nhan-biet": 10, "thong-hieu": 20, "van-dung": 30 };
