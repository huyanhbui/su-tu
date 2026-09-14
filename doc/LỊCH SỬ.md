# BÁO CÁO TỔNG QUAN

### **TỔNG QUAN DỰ ÁN KHỞI NGHIỆP "SỬ TỰ \- KỲ HÙNG ĐẤT VIỆT"**

*(Học cụ Phygital EdTech môn Lịch sử — Chuẩn hóa theo Chương trình GDPT 2018\)*

#### **1\. Tuyên ngôn định vị sản phẩm**

**“Biến mỗi trận đánh lịch sử thành một ván cờ chiến thuật \- giúp học sinh THPT chinh phục điểm số môn Sử mà không cần học vẹt.”**

Dự án **Sử Tự \- Kỳ Hùng Đất Việt** là một hệ sinh thái giáo dục đổi mới sáng tạo, kết hợp hài hòa giữa **Bộ thẻ bài vật lý đấu trí sưu tầm (Smart TCG)** dành cho hoạt động tương tác offline giờ ra chơi tại trường học và **Nền tảng Web Game trắc nghiệm trực tuyến (Web Sử Tự)** hỗ trợ tự học, làm bài tập về nhà và ôn thi hiệu quả tại gia đình. 

---

#### **2\. Bối cảnh cấp thiết & "Nỗi đau" thị trường** 

##### **2.1. Áp lực từ chính sách đổi mới giáo dục (GDPT 2018\)**

* **Đối với học sinh:** Chương trình Giáo dục Phổ thông 2018 chính thức đưa Lịch sử trở thành môn học và môn học bắt buộc cấp THPT. Học sinh đối mặt với áp lực thi cử cực kỳ lớn (đặc biệt là kì thi tốt nghiệp THPT Quốc gia) nhưng vô cùng mệt mỏi, áp lực trước các phương pháp tiếp cận cũ (học vẹt, ghi nhớ máy móc hàng chục trang sự kiện khô khan).  
* **Đối với giáo viên:** Gánh vác chỉ tiêu đổi mới phương pháp sư phạm, ứng dụng công nghệ và chuyển đổi số trong tiết học 45 phút trên lớp từ Bộ GD&ĐT, nhưng thiếu hụt nghiêm trọng các bộ học cụ trực quan, sinh động và dễ triển khai.  
* **Đối với phụ huynh:** Luôn lo lắng, căng thẳng khi con cái lạm dụng điện thoại chơi game vô bổ (screen-time có hại), nhưng đồng thời vẫn phải tìm kiếm giải pháp học tập lành mạnh giúp con cải thiện điểm số thực tế trên lớp.

##### **2.2. Khoảng trống thị trường từ hạn chế của các giải pháp hiện hữu**

* **Board game lịch sử truyền thống:** Giá thành sản xuất và phân phối rất cao; nội dung thuần tính giải trí hoặc hư cấu thẩm mỹ; không chuẩn hóa học thuật và hoàn toàn không bám sát ma trận đề thi hay yêu cầu kiểm tra của Bộ GD&ĐT.  
* **Ứng dụng trắc nghiệm online thuần số (Kahoot, Quizizz, App ôn thi):** Gây cô lập xã hội, tăng thời gian bám màn hình của học sinh, dễ khiến các em xao nhãng sang mạng xã hội hay trò chơi điện tử trực tuyến khác.

##### **2.3. Giải pháp đột phá từ mô hình Lai (Phygital EdTech)**

**Kỳ Hùng Đất Việt** lấp đầy khoảng trống thị trường bằng cách kiến tạo một **Học cụ Phygital (Vật lý lai Số hóa) Chuẩn hóa**:

* **Trải nghiệm Vật lý (Offline tại trường):** Giúp học sinh cầm nắm, tương tác face-to-face lành mạnh cùng bạn bè trong giờ ra chơi, giảm sự phụ thuộc vào màn hình điện thoại.  
* **Trải nghiệm Số hóa (Online tại nhà):** Tự động hóa quá trình ôn tập trắc nghiệm, cập nhật ngân hàng đề thi liên tục trên đám mây bám sát 100% ma trận kiến thức Bộ GD&ĐT, đo lường năng lực và lấp lỗ hổng kiến thức để **nâng cao điểm số thực tế**.

---

#### **3\. Hệ thống sản phẩm chi tiết (Product Architecture)**

Hệ sinh thái sản phẩm được phân tách thành hai phần độc lập nhưng đồng bộ chặt chẽ với nhau thông qua điểm chạm công nghệ:

\[BỘ THẺ SMART TCG VẬT LÝ\] (Trường học)  
         │  
         ▼ (Điểm chạm: Mã QR độc bản dưới chân thẻ)  
         │  
\[WEB GAME SỬ TỰ TRỰC TUYẾN\] (Ở nhà)  
         │  
         ├─► Sơ đồ tư duy (Mindmap tóm tắt kiến thức)  
         ├─► Không gian 3D (Spline \- Trực quan địa lý chiến trường)  
         ├─► Trò chơi Đấu bài trắc nghiệm học Sử  
         └─► AI Sử quan (Phát hiện lỗ hổng & cá nhân hóa đề thi)

##### Để tối ưu hóa tính trực quan, dưới đây là bảng phân tách chi tiết vai trò và công nghệ áp dụng cho từng thành phần trong hệ thống:

| Thành phần | Môi trường vận hành | Vai trò cốt lõi | Công nghệ / Chất liệu áp dụng |
| ----- | ----- | ----- | ----- |
| Bộ thẻ bài vật lý (Smart TCG) | Ngoại tuyến (Trường học \- Giờ ra chơi) | Kích thích tương tác face-to-face, giảm screen-time; học sinh đấu trí nhanh qua chỉ số và Ngũ hành tương khắc. | Giấy Black Core 300-350gsm, công nghệ cán mờ, mã QR Code độc bản, bảo chứng mã ISBN xuất bản |
| Hệ thống Web Game Sử Tự | Trực tuyến (Điện thoại/Máy tính ở nhà) | Nơi lưu trữ tủ bài ảo, tổ chức các trận đấu trắc nghiệm ôn Sử, đồng bộ điểm số về cho giáo viên. | Web App Responsive, cơ sở dữ liệu đám mây mã hóa dữ liệu theo Nghị định 13/2023/NĐ-CP. |
| Sơ đồ tư duy (Mindmap) | Trực tuyến (Trên Web Sử Tự) | Khái quát hóa, hệ thống logic dòng thời gian và kiến thức trọng tâm của bài học. | Đồ họa vector phẳng phong cách Neo-Traditional Art, liên kết tương tác. |
| Không gian đa chiều (3D Space) | Trực tuyến (Trên Web Sử Tự) | Trực quan hóa địa lý chiến trường (như bẫy cọc Bạch Đằng 938\) giúp học sinh dễ hình dung bối cảnh. | Nền tảng thiết kế Spline 3D nhúng iframe trực tiếp lên Web, tương tác xoay/zoom 360 độ. |
| Trợ lý AI Sử Quan | Trực tuyến (Trên Web Sử Tự) | Cá nhân hóa lộ trình học, tự động phát hiện lỗ hổng kiến thức và biên soạn đề trắc nghiệm phù hợp. | Mô hình ngôn ngữ lớn (LLM) tích hợp công nghệ RAG (Retrieval-Augmented Generation) bám sát dữ liệu SGK. |

##### 

##### **3.1. Bộ Kit Vật lý: Thẻ bài Đấu trí Sưu tầm (Smart TCG)**

* **Mô tả vật lý:** Hệ thống thẻ bài nhân vật lịch sử, danh tướng, quân binh và kế sách được thiết kế đồ họa độc quyền theo phong cách **Neo-Traditional Art** (Cổ phong cách tân \- kết hợp tranh dân gian Đông Hồ, Hàng Trống với nét vẽ hiện đại). Thẻ được in offset sắc nét trên chất liệu giấy **Black Core 300-350gsm cán mờ** cao cấp chống nước.  
* **Quy cách đóng gói:** Thẻ bài được phân phối dạng **bao thư mù (Blind Pack/Blind Box)** tạo yếu tố bất ngờ, kích thích nhu cầu sưu tầm, trao đổi thẻ hiếm của học sinh.  
* **Gameplay Offline nhanh gọn (5-10 phút giờ ra chơi):** Học sinh không cần dùng điện thoại, không cần bày biện sa bàn cồng kềnh. Trò chơi vận hành trực tiếp trên các thông số in sẵn ở mặt trước thẻ bài:  
  * *So sánh chỉ số Sinh mệnh (Máu/HP)*.  
  * *Hệ Ngũ hành tương khắc:* Mỗi tướng mang một mệnh ngũ hành biểu tượng (**Kim, Mộc, Thủy, Hỏa, Thổ**) khắc chế lẫn nhau.  
  * *Ví dụ thực tế trận Bạch Đằng 938:* Thẻ tướng **Ngô Quyền** (Hệ Thủy \- 5 Máu) sẽ khắc chế mạnh mẽ thẻ tướng **Lưu Hoằng Tháo** (Hệ Thổ \- 4 Máu \- có điểm yếu chí tử bị trừ bài và mất máu khi triều rút dính cọc ngầm).

##### **3.2. Nền tảng số: Web Game Đấu bài Trắc nghiệm Độc lập (Sử Tự)**

Nền tảng Web đóng vai trò là "vũ trụ lịch sử số" được game hóa (Gamified Learning) với giao diện cổ phong. Học sinh sử dụng tại nhà để học tập và giải trí trực tuyến:

* **Cơ chế số hóa thẻ bài (Digitalization):** Dưới chân mỗi thẻ bài vật lý sở hữu một **mã QR độc bản**. Khi học sinh dùng camera điện thoại quét mã này, hệ thống Web Sử Tự lập tức nhận diện ID thẻ và đồng bộ hóa, "mở khóa" quân bài ảo tương ứng vào tài khoản (Tủ bài số) của học sinh.  
* **Art động 2D và Âm thanh nhập vai:** Khi thẻ được kích hoạt trên Web, hệ thống sẽ tự động truy xuất từ đám mây tệp **Art động 2D (Motion Graphics)** kèm hiệu ứng âm thanh trống trận, lời thoại lịch sử oai hùng để tăng tối đa cảm xúc nhập vai cho học sinh.  
* **Gameplay "Học \- Chơi kết hợp":** Học sinh tham gia các trận đấu bài trực tuyến đối kháng với bạn bè hoặc vượt ải thử thách từ **AI Sử Quan**.  
  * Để triệu hồi tướng hoặc thi triển thẻ trang bị, kế sách (Ví dụ: kế *Dụ địch tiến sâu*, *Cắm cọc gỗ nạm sắt*...), người chơi bắt buộc phải **giải đúng các câu đố trắc nghiệm lịch sử** tương ứng do hệ thống đưa ra.  
  * *Cơ chế thưởng/phạt:* Trả lời đúng giúp kích hoạt **100% sức mạnh và kỹ năng đặc biệt** của tướng (Ví dụ: chiêu *Hiệp kích hữu ngạn* của Ngô Xương Ngập cho phép rút thêm bài khi đồng minh gây sát thương). Trả lời sai khiến tướng bị phạt (giảm nửa lượng máu hoặc bị khóa kỹ năng đặc biệt).  
* **Hỗ trợ thị giác trực quan nâng cao:**  
  * **Sơ đồ tư duy (Mindmap):** Tổng hợp, hệ thống hóa logic toàn bộ dòng thời gian và kiến thức trọng tâm của bài học.  
  * **Không gian 3D (3D Space):** Trực quan hóa bối cảnh địa hình quân sự chiến trường (Ví dụ: mô phỏng 3D bãi cọc ngầm sông Bạch Đằng 938 bằng công cụ Spline) giúp học sinh dễ dàng xoay, phóng to thu nhỏ để thấu hiểu nhãn quan địa lý của cha ông.

---

#### **4\. Giải pháp thực chiến cho Giáo viên & Nhà trường (B2B School)**

Dự án giải quyết triệt để quy định nghiêm ngặt cấm học sinh sử dụng điện thoại di động trong giờ học bằng mô hình phân tách địa điểm vận hành thông minh:

* **Tại trường (Offline):** Học sinh tương tác hoàn toàn bằng thẻ bài giấy lành mạnh trong giờ ra chơi, nâng cao tinh thần kết nối nhóm. Giáo viên có thể dùng trực tiếp tài nguyên Sơ đồ tư duy và Mô hình 3D trên Web Sử Tự chiếu lên bảng để làm bài giảng trực quan sinh động trong 5-10 phút đầu/cuối tiết dạy.  
* **Tại nhà (Online):** Học sinh quét QR thẻ bài sưu tầm để làm **bài tập về nhà (BTVN)** dưới dạng các trận đấu bài trắc nghiệm lịch sử hào hứng.  
* **Teacher Dashboard (Bảng điều khiển cho Giáo viên):**  
  * Toàn bộ điểm số, tiến trình và kết quả tự luyện đề trắc nghiệm của học sinh tại nhà sẽ được tự động đồng bộ và gửi về tài khoản quản lý của giáo viên.  
  * Giáo viên dễ dàng theo dõi biểu đồ năng lực của cả lớp và sử dụng dữ liệu này để **tự động lấy điểm chuyên cần, điểm cộng hoặc điểm kiểm tra miệng/15 phút**. Giải pháp này giúp giảm tải hơn 80% công tác ra đề và chấm bài thủ công của giáo viên, đồng thời thúc đẩy chỉ tiêu Chuyển đổi số giáo dục.

---

#### **5\. Sự tương thích hoàn hảo với Cuộc thi Sáng tạo AI 2026 (Bảng B)**

##### Dự án Sử Tự \- Kỳ Hùng Đất Việt được thiết kế đáp ứng 100% các yêu cầu về mặt công nghệ, tính pháp lý và đạo đức AI quy định trong thể lệ Cuộc thi Sáng tạo AI Quốc gia năm 2026 dành cho học sinh THPT (Bảng B) \[1, 4\].

| Tiêu chí chấm điểm Bảng B | Yêu cầu của Ban Tổ Chức \[1\] | Giải pháp thực tế của "Kỳ Hùng Đất Việt" | Minh chứng đạt điểm tối đa |
| ----- | ----- | ----- | ----- |
| 1\. Tính Thực tiễn & Cấp thiết | Xác định rõ bài toán thực tế của cộng đồng, nhà trường; có khả năng áp dụng cao. | Giải quyết "nỗi đau" học vẹt môn Sử THPT theo chương trình GDPT 2018 bằng mô hình Gamification thực chiến. | Học sinh tự nguyện học Sử tại nhà để leo rank; giáo viên có học cụ dạy học trực quan 3D trong 5 phút. |
| 2\. Tư duy thiết kế giải pháp AI | Phối hợp thông minh các công cụ AI, mô hình có sẵn hoặc nền tảng low-code để giải quyết vấn đề. | Tích hợp đa hệ thống AI: LLM RAG cho AI Sử Quan, Computer Vision để quét QR số hóa thẻ, Generative AI thiết kế mỹ thuật. | Kiến trúc hệ thống phân tách rõ ràng; tự động hóa quá trình sinh đề trắc nghiệm cá nhân hóa để vá lỗ hổng kiến thức. |
| 3\. Tính Khả thi & Vận hành | Sản phẩm chạy ổn định trên internet; có phương án thương mại hóa thực tế. | Web Game vận hành trên nền tảng Cloud mượt mà. Chi phí sản xuất (COGS) thẻ giấy cực thấp, biên lợi nhuận gộp hấp dẫn. | Link deploy thực tế sẵn sàng hoạt động; kế hoạch Unit Economics và dòng tiền kinh doanh tối ưu chi phí vận hành. |
| 4\. Ý thức Đạo đức & Pháp lý | Kê khai minh bạch công cụ AI , bảo vệ dữ liệu cá nhân, an toàn sử liệu. | Cam kết cung cấp đầy đủ Prompt Log. Sử liệu chuẩn hóa bám sát SGK của Bộ GD&ĐT. Bảo mật dữ liệu học sinh theo Nghị định 13/2023/NĐ-CP. | Sách hướng dẫn có mã ISBN chính thống, thẻ đạt chuẩn an toàn đồ chơi QCVN 3:2019/BKHCN. Thư mục Prompt Log lưu sẵn trên Google Drive. |

##### 

##### **5.1. Ứng dụng công nghệ AI có chiều sâu và thực tiễn**

* **Trợ lý AI Sử Quan (Mô hình LLM kết hợp RAG):** Đóng vai trò là "Trọng tài kiêm Người dẫn chuyện số". AI tự động phân tích cơ sở dữ liệu tủ bài học sinh đang có, nhận diện lỗ hổng kiến thức qua các trận đấu để tự động biên soạn và cá nhân hóa đề trắc nghiệm ôn tập phù hợp cho từng cá nhân, đồng thời chấm điểm lập luận chiến thuật.  
* **Computer Vision (Thị giác máy tính):** Ứng dụng thuật toán quét và nhận diện hình ảnh/mã QR để số hóa nhanh chóng thẻ bài vật lý lên máy chủ đám mây.  
* **Generative AI (Tạo sinh thiết kế):** Nhóm thể hiện năng lực làm chủ công nghệ xuất sắc khi phối hợp các công cụ AI hiện đại (*Midjourney/Stable Diffusion* tạo sinh ảnh chân dung tướng, *Runway Gen-3/Luma Dream Machine* tạo sinh video chuyển động Art động cho thẻ bài ảo trên Web).

##### **5.2. Tuân thủ pháp lý & Bảo chứng học đường vững chắc**

* **Chứng nhận an toàn:** Đạt quy chuẩn kỹ thuật quốc gia **QCVN 3:2019/BKHCN** về an toàn đồ chơi trẻ em, đảm bảo điều kiện lưu hành an toàn trong trường học.  
* **Bảo chứng nội dung:** Liên kết xuất bản với các nhà xuất bản uy tín (NXB Trẻ, NXB Kim Đồng...) để cấp mã **ISBN chính thống** cho sách hướng dẫn và thẻ bài, khẳng định độ tin cậy tuyệt đối về mặt sử liệu.  
* **An toàn thông tin:** Cam kết bảo mật dữ liệu học tập và thông tin cá nhân của học sinh vị thành niên trên hệ thống đám mây theo đúng quy định của **Nghị định 13/2023/NĐ-CP**.  
* **Hồ sơ dự thi minh bạch:** Nhóm cam kết cung cấp đầy đủ **Báo cáo Lịch sử câu lệnh (Prompt Log)** trung thực lưu trên Google Drive cùng video thuyết trình 5 phút và video demo sản phẩm 3 phút đúng theo quy chế chấm thi.

# RULEBOOK

# **“KỲ HÙNG SỬ VIỆT” RULEBOOK**

## **I. BỐI CẢNH LỊCH SỬ**

Trò chơi cờ bàn chiến thuật “Kỳ Hùng Đất Việt” tái hiện sinh động toàn cảnh các trận đánh chống ngoại xâm lẫy lừng trong lịch sử dân tộc Việt Nam giai đoạn từ năm      938 \- 1945\. Người chơi bước vào ván cờ với vai trò là những nhà chiến lược, trực tiếp điều binh khiển tướng, kết hợp mưu lược quân sự với yếu tố địa hình nhằm bảo vệ giang sơn hoặc thực hiện mục tiêu chiến lược của phe mình. Mô hình trò chơi chuyển hóa bài học lịch sử khô khan thành các ván cờ đối kháng trí tuệ, tạo động lực tự học và khắc sâu tinh thần bất khuất của các danh tướng qua từng thời kỳ.  
Mỗi ván đấu mô phỏng một trận đánh lịch sử cụ thể trên sa bàn chiến trận. Người chơi không chỉ vận dụng các thẻ bài kỹ năng và mưu lược mà còn phải tính toán vị trí di chuyển, khoảng cách tấn công và sự phối hợp giữa Chủ tướng \- Phó tướng.

## **II. HỆ THỐNG THẺ BÀI**

Hệ thống trò chơi bao gồm 3 loại thẻ chính mà người chơi có thể phân biệt dựa vào lưng thẻ: **Thẻ Tướng, Thẻ Chơi, Thẻ Máu.**

| Loại thẻ bài | Số lượng Thẻ | Phân loại | Chức năng chính trong ván chơi |
| :---- | ----- | ----- | :---- |
| **Thẻ Tướng** | 12 thẻ | Chủ tướng (6 Thẻ)  Phó tướng (6 Thẻ) | Các nhân vật chính tham gia vào trận đấu. |
| **Thẻ Chơi** | 155 Thẻ | Thẻ bài đánh cơ bản(55 Thẻ) Thẻ Trang bị (29 Thẻ)Thẻ Chiến lược (27 Thẻ)Thẻ Sự kiện (5 Thẻ)Thẻ Kỹ năng tướng (27 Thẻ) | Người chơi có thể dùng để tương tác với nhau nhằm mục đích hoàn thành mục tiêu của trò chơi.   |
| **Thẻ Máu** | 6 Thẻ | Thẻ 6 Máu (3 Thẻ) Thẻ 7 Máu (3 Thẻ) | Đại diện cho chỉ số sinh mệnh và giới hạn cầm thẻ bài trên tay của người chơi. |

### **1\. Thẻ Tướng: Gồm 12 tướng/ trận**

Là những thẻ thẻ nhân vật mà người chơi có thể chọn để hóa thân vào trong trò chơi.   
Mỗi người chơi sẽ nắm một cặp tướng gồm 1 chủ tướng và 1 phó tướng trong trò chơi.  
▪ MỘT SỐ YẾU TỐ LƯU Ý CỦA THẺ TƯỚNG:  
\- Tên tướng   
\- Kỹ năng tướng  
\- Máu  
\- Mệnh   
\- Phe 

### **2\. Thẻ Chơi**

Thẻ Chơi là công cụ người chơi có thể dùng để tương tác với nhau nhằm hoàn thành mục tiêu của trò chơi.    
Thẻ Chơi gồm: 

1. Tên thẻ  
2. Loại thẻ  
3. Chức năng thẻ

PHÂN LOẠI THẺ CHƠI: GỒM 5 LOẠI THẺ CHÍNH

* ***Thẻ “BÀI ĐÁNH CƠ BẢN”*****:** Gồm 55 thẻ   
* **Đánh:** \-1 máu đối thủ trong tầm đánh của bạn.   
* **Né:** Dùng để vô hiệu hóa 1 đòn Đánh thường lên bạn.   
* **Thẻ Đánh Ngũ hành** (Đánh Sơn, Đánh Thủy, Đánh Thổ, Đánh Hỏa,   Đánh Độc): Gây sát thương x2 Đòn Đánh Thường.   
* **Thẻ Hồi**: \+1 máu máu vào tướng phe mình.   
* ***Thẻ “TRANG BỊ”*****: Gồm 29 thẻ**  
* **Ngựa chiến:** \-1 khoảng cách từ bạn đến người chơi khác (mở rộng phạm vi tấn công).  
* **Voi chiến**:  \+1 khoảng cách từ người chơi khác đến bạn (gia tăng khả năng phòng thủ)  
* **Tấn công:** Các vũ khí gây sát thương lên phe địch.  
* **Phòng thủ:** Các trang bị giúp chống lại các sát thương từ phe địch.   
* **Nhu yếu phẩm:** 

  \+ **Lúa nước**: Tăng 1 máu khi máu về 0

  \+ **Thuốc Nam**: Hóa giải 1 đòn Đánh Ngũ hành 

* ***Thẻ “CHIẾN LƯỢC”*****:** Gồm 27 thẻ 

Bao gồm các kế sách, mưu lược quân sự được người chơi sử dụng để chiến thắng trò chơi.   
 

* ***Thẻ “SỰ KIỆN”:** Gồm 5 thẻ*

Các biến cố lịch sử ngẫu nhiên tác động diện rộng lên toàn trò chơi. Khi rút phải thẻ sự kiện, người chơi bắt buộc phải kích hoạt ngay lập tức, sau đó rút bù 1 thẻ mới. 

### 

* **Thẻ “KỸ NĂNG TƯỚNG”:** Có 3 loại kỹ năng tướng **(Gồm 27 thẻ)**

* ***Kỹ năng thường*****:** Là loại Kỹ năng được thiết kế sẵn trong Thẻ tướng và người chơi có thể lựa chọn sử dụng hoặc không vào bất kỳ thời điểm nào thích hợp.  
* ***Kỹ năng nâng cấp***: Là loại Kỹ năng giúp **x2 sức mạnh Kỹ năng thường** nhưng chỉ được sử dụng đúng 1 lần duy nhất trong cả ván chơi.   
* ***Kỹ năng bổ sung*****:** Là loại Kỹ năng giúp đa dạng các kỹ năng cho tướng và được sử dụng bất kỳ tuy nhiên không được 2 lần liên tiếp. 

### **5\. Thẻ “MÁU”: Gồm 6 thẻ** 

\- Thẻ Máu tượng trưng cho chỉ số sinh mệnh hiện tại của Tướng. Người chơi nhận số thẻ Máu tương ứng với tướng của mình.   
\- Chỉ số Máu còn đại diện cho giới hạn thẻ bài Chơi tối đa người chơi được nắm giữ trên tay khi kết thúc lượt.   
\- Khi Máu giảm về 0, người chơi sẽ bị loại khỏi ván đấu nếu không có Thẻ Kỹ năng hoặc Thẻ Hồi kịp thời.

## **III. MỘT SỐ CHÚ THÍCH CƠ BẢN** 

1. ### **Các thuật ngữ**

* **Rút thẻ**: Là thao tác lấy thẻ từ trên chồng thẻ chơi.  
* **Tầm đánh:** Là khoảng cách kế bên của những người chơi với nhau  
* **Khoảng cách:** Khoảng cách mặc định giữa hai người chơi ngồi kế tiếp nhau là 1  
* **Dùng thẻ**: Thao tác đặt thẻ bài ra bàn chơi, tuyên bố tên thẻ và chỉ định mục tiêu chịu tác động.  
* **Đánh ra**: Thao tác đưa một thẻ bài ra bàn chơi không cần chỉ định mục tiêu, thường dùng để đáp lại các thẻ nhắm vào mình từ người chơi khác.  
* **Bỏ thẻ**: Thao tác đưa thẻ bài vào chồng thẻ bỏ. Người chơi chỉ bỏ thẻ khi số thẻ chơi trên tay vượt quá máu đang có hoặc bị người chơi khác dùng thẻ chơi để buộc bỏ đi thẻ trên tay.   
* **Mệnh:** Có 6 Mệnh (Kim Mộc Thủy Hỏa Thổ) có sẵn trong từg thẻ TướnTướng  
* **Phe trong Thẻ tướng:** Các vị tướng tương ứng với các phe khác nhau trong trò chơi  
* **Máu phe:** Tổng lượng máu của Chủ tướng và Phó tướng phe mình.   
* **Thẻ Đánh Ngũ Hành:** Áp dụng nguyên lý Tương khắc trong Ngũ hành. Thẻ này có tác dụng x2 sát thương lên những tướng tương khắc hệ hoặc cùng hệ người đánh

VD: Người chơi mệnh Thủy đánh người mệnh Hỏa/ Thủy thì x2 Sát thươn và sát thương như đòn đánh thường với những tướng mang các hệ còn lại

* **Đấu điểm**: Khi ván chơi bị giới hạn thời gian thì sau khi kết thúc thời gian người chơi so lượng máu phe với nhau, ai còn nhiều nhất là người chiến thắng.  
* **Thứ tự ưu tiên áp dụng luật:** 

         Kỹ năng Tướng (Bao gồm cả Kỹ năng bổ sung) \>\> tác dụng của Thẻ Chơi  

* **Chiều chơi:** Theo chiều ngược kim đồng hồ, bắt đầu từ người chơi hiện tại.  
* **Sát thương:** Lượng máu mất đi sau khi chịu các đòn đánh và thẻ chơi từ đối thủ.

## **IV. CÁCH CHƠI** 

### **1\. Bốc Thẻ Tướng, Thẻ Kỹ năng và Thẻ Máu**: 

\- Xào chồng Thẻ tướng và phát cho mỗi người chơi bốc 3 thẻ Tướng, sau đó người chơi chọn giữ lại 2 trong 3 thẻ để chơi.  Người chơi sẽ cộng số Máu của 2 tướng lại sau đó lấy thẻ Máu. Đồng thời bốc ngẫu nhiên 2 Thẻ Kỹ Năng Bổ Sung cho từng Tướng.

### **2\. Các giai đoạn trong một lượt chơi**

\- Sau khi phân phát tướng, thẻ kỹ năng và Thẻ Máu xong thì lấy chồng Thẻ chơi xáo trộn và phát cho mỗi người chơi 4 thẻ khởi đầu. 

* **Giai đoạn Chuẩn bị:**   
  Kích hoạt các kỹ năng Tướng hoặc hiệu ứng thẻ bài được quy định xử lý ở đầu lượt.  
* **Giai đoạn Đầu lượt:**   
  Người chơi có quyền lựa chọn lật mở thẻ Phe, thẻ Tướng hoặc thẻ Kỹ năng bổ sung để công khai danh tính.   
* **Giai đoạn Rút thẻ:**   
  Người chơi rút 4 Thẻ từ chồng Thẻ Chơi. Nếu rút phải Thẻ Sự Kiện, phải lập tức đánh ra giữa bàn và rút bổ sung 1 thẻ khác. Khi chồng Thẻ Chơi bị rút hết, lấy toàn bộ chồng thẻ bỏ xáo trộn lại để tạo chồng bài mới.  
* **Giai đoạn Dùng thẻ:**   
  Người chơi được phép dùng các thẻ bài trên tay theo nhu cầu chiến thuật. Tuy nhiên, trong mỗi giai đoạn Đánh thẻ, người chơi chỉ được dùng tối đa 1 thẻ \[Đánh\] cơ bản (trừ khi có kỹ năng hoặc vũ khí cho phép đánh thêm).  
* **Giai đoạn Đánh ra**:   
  Đưa một thẻ bài ra bàn chơi không cần chỉ định mục tiêu, để phòng thủ và đáp lại các thẻ nhắm vào mình từ người chơi khác.  
* **Giai đoạn Bỏ thẻ:**   
  Khi không muốn hoặc không thể ra thẻ nữa, người chơi đếm số thẻ trên tay. Nếu số thẻ trên tay lớn hơn số Máu hiện tại, người chơi phải bỏ các thẻ thừa vào chồng thẻ bỏ.   
* **Giai đoạn kết thúc:**   
  Sau khi kết thúc lượt sẽ chuyển qua lượt của người kế tiếp theo chiều ngược kim đồng hồ.

## **V. THƯỞNG VÀ PHẠT**

* **Loại đối thủ**: 

Khi loại 1 vị tướng khác phe, người chơi được nhận lại toàn bộ kỹ năng cơ bản, Thẻ Máu và 2 Thẻ Kỹ Năng Bổ Sung của Tướng vừa bị loại. 

* **Loại cùng phe**: 

Nếu người chơi vô tình hoặc cố ý loại một người chơi thuộc cùng Phe với mình, người đó bị tính là phạm quy liên minh. Mức phạt bắt buộc là người chơi vi phạm phải bỏ ngay toàn bộ thẻ trên tay và toàn bộ thẻ trong Vùng trang bị vào chồng thẻ bỏ.

* **Tước quyền hành động**: Người chơi vi phạm nghiêm trọng quy tắc trò chơi có thể bị khóa kỹ năng Tướng hoặc bị tước lượt trong vòng chơi tiếp theo.

## **VI. KẾT THÚC VÁN CHƠI**

Trò chơi lập tức kết thúc khi trên bàn cờ chỉ còn duy nhất một Phe sống sót.

# MARKETING

| Chỉ số chiến lược  | Giá trị tái cấu trúc (Thực tế)  | Ý nghĩa vận hành & Tài chính  |
| :---- | :---- | :---- |
| Định vị sản phẩm  | Học cụ Phygital EdTech môn Sử GDPT 2018  | Kết hợp cờ bàn vật lý & Ứng dụng Sử Tự AI  |
| Mô hình gọi vốn Pre-seed  | 250.000.000 VNĐ (Hợp đồng SAFE)  | **Định giá trần 2,5 tỷ VNĐ, giữ tỷ lệ pha loãng \=\<10%**  |
| Doanh thu thuần Năm 1  | 342.000.000 VNĐ  | Tập trung kiểm chứng thị trường & tối ưu hóa vận hàn |
| Thời gian sống sót (Runway)  | 11,36 tháng  | Đảm bảo an toàn thanh khoản với định phí 22 triệu VNĐ/tháng  |
| Thời điểm hòa vốn  | Tháng 14 (Q2 / Năm 2\)  | Lộ trình tài chính vững chắc, phù hợp startup EdTech  |
| Tỷ lệ LTV/CAC (Khối Lớp 10\)  | \~5,65:1  | Đạt tiêu chuẩn thẩm định an toàn của các quỹ đầu tư VC  |

**1\.Bối Cảnh Thị Trường**  
**\-**Sự thay đổi về chính sách của Bộ Giáo dục & Đào tạo khi đưa Lịch sử 

| Tầng quy mô thị trường | Định nghĩa thị trường | Giá trị ước tính (VNĐ) |
| :---- | :---- | :---- |
| **TAM Toàn cả nước** | **Chi tiêu cho học cụ và EdTech môn Sử của toàn bộ học sinh THPT** | **731,9 tỷ** |
| **TAM Khả thi** | **Học sinh THPT có kết nối Internet & trường có hạ tầng tivi/máy chiếu** | **256,1 tỷ** |
| **SAM Việt Nam** | **Thị trường học đường & trực tuyến tiếp cận bằng mô hình Phygital** | **4,97 tỷ / năm** |
| **SOM (Năm 1–2)** | **Thị trường ngách (Wedge market): 10-15 trường thí điểm & D2C đô thị** | **0,35 – 0,76 tỷ** |

**Mô Hình Tài Chính & Kinh Tế Đơn Vị (Google Sheet: Financial\_Model)**

| Khoản mục | Tỷ lệ / Đơn vị | Số tiền (VNĐ) | Ghi chú vận hành thực tế |
| :---- | :---- | :---- | :---- |
| **Giá bán lẻ (RRP)** | **100%** | **245.000** | **Mức trần phân khúc quà tặng/đồ chơi giáo dục.** |
| **COGS Phần cứng** | **26,5%** | **65.000** | **Bàn cờ Canvas \+ 80 thẻ bài QR (chưa gồm sa bàn gỗ).** |
| **Phí sàn e-Com & Vận chuyển** | **15,0%** | **36.800** | **Phí cố định TikTok/Shopee, phí hoàn hàng và đóng gói.** |
| **Chi phí Hạ tầng Server/Cloud** | **4,9%** | **12.000** | **Băng thông 3D, duy trì tài khoản Web SỬ TỰ/năm.** |
| **Lợi Nhuận Gộp Thực Tế** | **53,6%** | **131.200** | **Ngân sách còn lại cho Marketing & Chi phí vận hành.** |
| **Ngưỡng CAC Tối Đa (Max CAC)** | **32,6%** | **80.000** | **Chi phí chi trả tối đa cho Quảng cáo/Affiliate để có 1 đơn.** |
| **Lợi Nhuận Ròng / Đơn vị** | **21,0%** | **51.200** | **Lãi ròng trước khi trừ chi phí cố định (Lương, R\&D).** |

**Kế Hoạch Vốn Lưu Động & Điểm Hòa Vốn** 

| Hạng mục Đầu tư | Khối lượng | Đơn giá (VNĐ) | Tổng chi phí (VNĐ) | Điểm hòa vốn (Sản phẩm) |
| :---- | :---- | :---- | :---- | :---- |
| **Sản xuất đợt 1 (MOQ)** | **1.000 bộ** | **65.000** | **65.000.000** | **Bán hết 496 bộ (ở mức CAC 80.000 VNĐ) để thu hồi 100% vốn sản xuất.** |
| **Đăng ký Mã ISBN & QCVN 3** | **1 gói** | **15.000.000** | **15.000.000** | **Bán thêm 115 bộ để bù chi phí pháp lý.** |
| **R\&D Web App & Server Phase 1** | **1 hệ thống** | **30.000.000** | **30.000.000** | **Bán thêm 229 bộ để bù chi phí công nghệ ban đầu.** |
| **TỔNG VỐN KHỞI CHẠY** | **\-** | **\-** | **110.000.000** | **TỔNG ĐIỂM HÒA VỐN: 840 bộ** |

**Ma Trận Triển Khai Marketing & GTM** 

| Giai đoạn | Kênh chính | Mục tiêu KPI | Ngân sách | Tác vụ trọng tâm (Action Items) |
| :---- | :---- | :---- | :---- | :---- |
| **Pha 1: Thấu hiểu & Pre-order *(T1 \- T3)*** | **Zalo Group Giáo viên, Crowdfunding** | **1.000 Data GV, 200 đơn Pre-order** | **10.000.000 VNĐ** | **• Tặng Slide 3D bài giảng cho giáo viên Lịch sử. • Mở đặt trước giá 199.000 VNĐ để gom vốn sản xuất.** |
| **Pha 2: B2B2C & KOC *(T4 \- T8)*** | **Affiliate TikTok, CLB Sử THPT** | **1.500 bộ bán ra, 50 CLB trường học** | **15% \- 20% commission/đơn** | **• Bán qua Creator dạy Sử (chỉ trả tiền khi phát sinh đơn). • Tài trợ 2 bộ cờ cho CLB Trường làm giải đấu ra chơi.** |
| **Pha 3: Chuyển đổi SaaS *(T9 trở đi)*** | **Web SỬ TỰ App, Email/Zalo OA** | **30% User mua gói Subscription** | **Tự cân đối từ ARR** | **• Khóa tính năng thi thử nâng cao & AI Companion. • Thu phí 19.000 VNĐ/tháng hoặc 149.000 VNĐ/năm.** |

**Thị trường \- pain point \- BUSINESS CONTEXT \-Business Problem**   
**COMMUNICATION TASK** 

* Market research và Product Analysis   
* Competitor Analysis   
* Target Audience   
* Big Idea và Key Message  
* IMC/Implementation plan (phải có đủ timeline, tuyến nội dung, event, KPI)  
* Finance (để chưng minh tính khả thi)

**Strategic Challenge:**   
**MARKET RESEARCH**   
**Market conclusion**   
**TARGET AUDIENCE : Demographic \- Psychographic**   
**INSIGHT**   
**TAM-SAM-SOM**

**SWOT**

**COMPETITOR- Market Gap**   
**STP-USP**

SMART Goals   
Action Plan & Budget 

Measurement & Optimization 

—-----------------------  
Dưới đây là kế hoạch chiến lược kinh doanh, marketing và tài chính toàn diện cho dự án **Kỳ Hùng Đất Việt**, được hệ thống hóa chi tiết theo từng bước cấu trúc theo đúng yêu cầu.

### **1\. BUSINESS CONTEXT, PAIN POINTS & BUSINESS PROBLEM**

#### **Business Context (Bối cảnh Kinh doanh)**

* Chương trình Giáo dục Phổ thông 2018 (GDPT 2018\) biến Lịch sử thành môn học bắt buộc cấp THPT.  
* Cả nước có gần 3 triệu học sinh THPT với gần 500.000 thí sinh chọn môn Sử trong các kỳ thi kiểm tra và Tốt nghiệp THPT Quốc gia.  
* Thị trường EdTech Việt Nam tăng trưởng bùng nổ (đạt quy mô xấp xỉ 5 tỷ USD) với nhu cầu cao về phương pháp học tập tương tác số.

#### **Pain Points (Nỗi đau 3 Bên)**

* **Học sinh:** Bị áp lực thi cử, phương pháp học thuộc lòng (học vẹt) khô khan, tẻ nhạt; dễ nản lòng và bị phạt điểm kém khi làm sai các bộ đề trắc nghiệm truyền thống.  
* **Phụ huynh:** Xung đột giữa việc muốn cấm con dùng điện thoại chơi game vô bổ và nhu cầu cho con ôn thi; thiếu giải pháp học tập kết hợp vận động \- tương tác lành mạnh.  
* **Nhà trường & Giáo viên:** Áp lực chỉ tiêu Chuyển đổi số và đổi mới tiết học 45 phút nhưng thiếu công cụ học cụ trực quan, định lượng được kết quả.

#### **Business Problem (Vấn đề Kinh doanh Core)**

* Các giải pháp hiện hữu bị chia rẽ: Trò chơi cờ bàn truyền thống thì thuần giải trí, không bám sát ma trận đề thi GDPT 2018; trong khi các ứng dụng trắc nghiệm online thuần số thì gây cô lập xã hội và nghiện màn hình.  
* Startup cần một mô hình kết hợp (Phygital) vừa giúp học sinh đạt điểm cao môn Sử, vừa tạo tương tác trực tiếp trên lớp học.

#### **Strategic Challenge (Thách thức Chiến lược)**

* Làm thế nào để phát triển một startup EdTech Phygital có cấu phần phần cứng mà không bị "vỡ đứt dòng tiền" bởi chi phí sản xuất ban đầu (MOQ), chi phí quảng cáo (CAC) tăng cao và chu kỳ duyệt mua B2B trường học kéo dài?

### **2\. MARKET RESEARCH, MARKET CONCLUSION & TAM-SAM-SOM**

#### **Market Research (Nghiên cứu Thị trường)**

* Lịch sử là môn thi tự chọn có số lượng đăng ký đông nhất (gần 500.000 thí sinh năm 2024).  
* Sự bùng nổ của Gen Z đòi hỏi phương pháp Gamification (Trò chơi hóa) và trực quan hóa 3D.

#### **Market Conclusion (Kết luận Thị trường)**

Thị trường có cầu lớn nhưng cực kỳ nhạy cảm về giá phần cứng và rào cản phân phối. Chiến lược thành công phải dựa trên **Sản phẩm Tinh gọn (Lean MVP)**, tối ưu giá bán dưới 250.000 VNĐ và bán qua kênh liên kết (Affiliate) thay vì chạy Ads trả tiền trực tiếp.

#### **TAM \- SAM \- SOM**

| Tầng thị trường | Định nghĩa & Phạm vi | Giá trị ước tính (VNĐ) |
| :---- | :---- | :---- |
| **TAM (Total Addressable Market)** | Chi tiêu cho học cụ & EdTech môn Sử của toàn bộ học sinh THPT cả nước | 731,9 tỷ |
| **SAM (Serviceable Addressable Market)** | Thị trường THPT đô thị có kết nối Internet & nhu cầu Phygital EdTech | 4,97 tỷ / năm |
| **SOM (Serviceable Obtainable Market)** | Đặt mục tiêu Năm 1: 1.200 bộ B2C \+ 12 Gói B2B Học đường thử nghiệm | 342 triệu |

### **3\. COMPETITOR ANALYSIS, MARKET GAP & SWOT**

#### **Competitor Analysis (Phân tích Đối thủ)**

| Tiêu chí | Board Game truyền thống (Lạc, Rạng Rỡ VN) | App Trắc nghiệm Online (Kahoot, Quizizz) | Kỳ Hùng Đất Việt |
| :---: | :---: | :---: | :---: |
| **Bản chất** | Hàng tiêu dùng / Quà lưu niệm  | Phần mềm thuần số  | Phygital EdTech (Vật lý lai Số hóa)  |
| **Bám sát GDPT 2018** | Không bám sát đề thi  | Tùy biến cá nhân, thiếu chuẩn hóa  | Bám sát 100% ma trận đề thi Bộ GD&ĐT  |
| **Công nghệ** | Mã QR tra cứu tĩnh 1 chiều  | Tương tác màn hình thuần túy  | Web Sử Tự AI, 3D, Teacher Dashboard  |
| **Hạ tầng chi phí** | COGS phần cứng cao  | Chi phí Server thuần túy  | COGS tinh gọn 65.000 VNĐ, Đám mây  |

#### **Market Gap (Khoảng trống Thị trường)**

Một học cụ Phygital vừa có trải nghiệm cầm nắm tương tác nhóm trên lớp, vừa kết nối ngân hàng câu hỏi đề thi tự động cập nhật trên Cloud với giá thành bình dân.

#### **SWOT Analysis**

* **Strengths (Điểm mạnh):** Biên lợi nhuận phần cứng gộp cao (\>53%), gán mã QR độc bản chống học chui, cập nhật đề thi trên Cloud không tốn COGS, tích hợp Teacher Dashboard.  
* **Weaknesses (Điểm yếu):** Phụ thuộc vào sóng Wi-Fi/4G của trường học, dễ bị gián đoạn trải nghiệm nếu bắt quét QR quá nhiều.  
* **Opportunities (Cơ hội):** Chính sách đẩy mạnh chuyển đổi số của Bộ GD&ĐT, xu hướng phụ huynh muốn giảm screen-time độc hại cho con.  
* **Threats (Ta cơ):** Rủi ro kiểm duyệt nội dung lịch sử nghiêm ngặt, nạn in nhái phần cứng nếu không khóa bằng mã QR phần mềm.

### **4\. TARGET AUDIENCE, INSIGHT & STP \- USP**

#### **Target Audience (Khách hàng Mục tiêu)**

* **Demographic (Nhân khẩu học):** Học sinh THPT Lớp 10–12 (Trọng tâm Lớp 10–11 để tối ưu LTV), độ tuổi 15–18 tại các đô thị; Phụ huynh độ tuổi 38–48; Giáo viên Lịch sử độ tuổi 24–45.  
* **Psychographic (Tâm lý học):** Học sinh muốn đạt điểm cao ôn thi Tốt nghiệp THPT mà không phải học thuộc lòng; Phụ huynh tìm kiếm phương pháp học lành mạnh; Giáo viên muốn tiết học 45 phút sinh động.

#### **Insight (Thấu hiểu Khách hàng)**

*"Tôi muốn đạt điểm cao môn Sử để thi đỗ Đại học nhưng phát ốm vì những trang sách khô khan. Tôi ghét cảm giác bị trừng phạt bằng điểm kém khi giải sai đề thi, nhưng sẵn sàng thử lại nếu đó là một ván cờ chiến thuật thi đấu cùng bạn bè."*

#### **STP (Segmentation \- Targeting \- Positioning)**

* **Segmentation:** Phân đoạn thị trường học sinh ôn thi GDPT 2018 theo nhu cầu giải trí tương tác.  
* **Targeting:** Học sinh THPT Lớp 10–11 đô thị & Giáo viên Lịch sử năng động.  
* **Positioning:** Học cụ Phygital EdTech môn Lịch sử đầu tiên chuẩn hóa GDPT 2018 tại Việt Nam.

#### **USP (Unique Selling Proposition)**

**Bàn cờ chiến thuật vật lý kết hợp ứng dụng Sử Tự AI – Biến mỗi trận đánh lịch sử thành ván cờ tương tác 2 chiều.**

### **5\. PRODUCT ANALYSIS & COMMUNICATION TASK**

#### **Product Analysis (Phân tích Sản phẩm MVP)**

* **Phần cứng (Hardware MVP):** 01 Bàn cờ Canvas chống nước \+ 80 Thẻ bài QR độc bản (50 nhân vật, 30 sự kiện) \+ Sách hướng dẫn. (Sa bàn gỗ 3D tách thành gói B2B/Add-on).  
* **Phần mềm (Software MVP \- Sử Tự AI):** Thư viện 3D, sơ đồ tư duy, ngân hàng trắc nghiệm GDPT 2018, cơ chế Gamification tích điểm XP và Teacher Dashboard.

#### **Communication Task (Nhiệm vụ Truyền thông)**

Chuyển đổi nhận thức xã hội về môn Lịch sử từ *"Môn phụ học vẹt khô khan"* thành *"Trò chơi chiến thuật đấu trí hào hùng"*, đồng thời khẳng định độ tin cậy học thuật thông qua sự bảo chứng của Giáo viên và chứng nhận QCVN 3/ISBN.

### **6\. BIG IDEA & KEY MESSAGE**

* **Big Idea:** **XOAY CỤC DIỆN \- ĐỊNH SỬ VIỆT**  
* **Key Message:** *"Biến trận đánh lịch sử thành ván cờ chiến thuật – Học nhàn, điểm cao chuẩn GDPT 2018."*

### **7\. IMC / IMPLEMENTATION PLAN**

#### **Timeline & 3 Giai đoạn Triển khai**

\[Tháng 1 \- 3: KHAI MỞ CHIẾN TRẬN\] (Seed & Pre-order B2C/GV)   
\--\> \[Tháng 4 \- 8: XOAY CỤC DIỆN\] (B2B2C & Viral Scale KOC)  
\--\> \[Tháng 9 \- 12: ĐỊNH SỬ VIỆT (SaaS Conversion VIP Sub) 

  (Seed & Pre-order B2C/GV)             (B2B2C & Viral Scale KOC)           (SaaS Conversion VIP Sub)

* **Pha 1: KHAI MỞ CHIẾN TRẬN (Tháng 1 \- 3):** Tập trung trao giá trị cho Giáo viên (Tặng Slide bài giảng 3D) và mở Pre-order giá 199.000 VNĐ để huy động tiền cọc sản xuất.  
* **Pha 2: XOAY CỤC DIỆN (Tháng 4 \- 8):** Đẩy mạnh Affiliate Marketing qua TikTok KOC Giáo dục; tài trợ bộ cờ cho CLB Lịch sử / Đoàn trường THPT làm giải đấu ra chơi.  
* **Pha 3: ĐỊNH SỬ VIỆT (Tháng 9 \- 12):** Chuyển đổi người dùng Web App sang gói thuê bao số VIP Subscription (19.000 VNĐ/tháng hoặc 149.000 VNĐ/năm) cho đợt ôn thi cấp tốc.

#### **Content Pillars (Tuyến Nội dung)**

1. **Pillar 1 (40%): Edu-tainment 3D Battle Recaps** – Video ngắn 3D tái hiện các trận đánh lịch sử gay cấn (Bạch Đằng, Chi Lăng, Điện Biên Phủ).  
2. **Pillar 2 (30%): Exam Hacks & Mindmaps** – Mẹo giải nhanh ma trận trắc nghiệm GDPT 2018 bằng sơ đồ tư duy.  
3. **Pillar 3 (20%): Social Proof & Classroom Gameplay** – Video thực tế học sinh thi đấu cờ trong 15 phút giờ ra chơi.  
4. **Pillar 4 (10%): Product Credentials** – Chứng nhận an toàn QCVN 3, mã xuất bản ISBN và đánh giá từ thầy cô giáo

#### **Experiential Event (Sự kiện Trải nghiệm)**

* **Giải đấu "Đấu Trường Kỳ Hùng":** Đồng hành cùng Đoàn trường THPT tổ chức giải thi đấu giải đố lịch sử trực tiếp trên bàn cờ vật lý và ứng dụng Sử Tự AI.

#### **IMC KPIs**

* 1.000.000+ Lượt xem tự nhiên (Organic views) trên TikTok/Reels.  
* 1.000 Data Giáo viên Lịch sử nhận bộ học liệu Slide 3D.  
* 1.200 Bộ cờ B2C bán ra & 12 Gói B2B Trường học.

### **8\. FINANCE & FEASIBILITY PROOF (Chứng minh Tính Khả thi)**

#### **Net Unit Economics (Kinh tế Đơn vị Ròng B2C)**

| Khoản mục | Giá trị (VNĐ) | Tỷ lệ / Giá bán | Ghi chú vận hành |
| :---- | :---- | :---: | :---- |
| **Giá bán lẻ (RRP)** | **245.000** | **100%** | Định giá phân khúc quà tặng / học cụ  |
| COGS Phần cứng | 65.000 | 26,5% | Bàn cờ Canvas \+ 80 thẻ QR \+ Hộp  |
| Phí sàn e-Com & Logistics | 36.800 | 15,0% | Phí sàn TikTok/Shopee, hoàn hàng |
| Chi phí Cloud Server | 12.000 | 4,9% | Duy trì tài khoản Web Sử Tự AI/năm  |
| **Lợi nhuận gộp thực tế (Net CM)** | **131.200** | **53,6%** | Ngân sách cho Marketing & Vận hành |
| **Trần CAC cho phép (Max CAC)** | **80.000** | **32,6%** | Giới hạn chi phí Affiliate/Quảng cáo |
| **Lãi ròng / Sản phẩm** | **51.200** | **21,0%** | Chưa trừ chi phí cố định (OpEx) |

#### 

#### **Quản trị Vốn lưu động & Chu kỳ Tiền mặt ($CCC$)**

* Áp dụng In kỹ thuật số phân kỳ lô nhỏ (POD 200 bộ/lần) combined với tiền cọc Pre-order.  
*   
* Chu kỳ tiền mặt tối ưu:  
* 

$$CCC \= DIO \+ DSO \- DPO \= 25 \+ 5 \- 15 \= 15 \\text{ ngày}$$

* $CCC \= 15$ ngày giúp vung vốn lưu động 24 lần/năm, triệt tiêu rủi ro đọng vốn.  
* 

#### **Báo cáo Dự phóng 3 Năm (Income Statement Forecast)**

| Chỉ số Tài chính | Năm 1 (VNĐ) | Năm 2 (VNĐ) | Năm 3 (VNĐ) |
| :---- | :---- | :---- | :---- |
| **Sản lượng (B2C / B2B / Sub)** | **1.200 / 12 / 400** | **3.500 / 40 / 1.500** | **8.000 / 120 / 5.000** |
| Doanh thu thuần | 342.000.000 | 1.051.000.000 | 2.663.000.000 |
| Biến phí thực tế | 132.840.000 | 398.200.000 | 973.800.000 |
| Lợi nhuận đóng góp gộp | 209.160.000 | 652.800.000 | 1.689.200.000 |
| Định phí vận hành (OpEx) | 264.000.000 | 380.000.000 | 580.000.000 |
| **Lợi nhuận ròng sau thuế** | **\-54.840.000** | **218.240.000** | **887.360.000** |

#### **Phân tích Điểm Hòa Vốn (Break-even Analysis)**

* **Tổng vốn khởi chạy ban đầu:** 110.000.000 VNĐ (65M sản xuất MOQ đợt 1, 30M R\&D App/Server, 15M Pháp lý QCVN 3 & ISBN).  
* **Điểm hòa vốn sản phẩm:** Bán hết **840 bộ cờ B2C** (ở mức CAC 80.000 VNĐ) để thu hồi 100% vốn đầu tư ban đầu.  
* **Thời điểm hòa vốn của toàn doanh nghiệp:** **Tháng thứ 14 (Q2/Năm 2\)**.

### **9\. SMART GOALS, ACTION PLAN & BUDGET**

#### **SMART Goals (Năm 1\)**

* **S (Specific):** Bán 1.200 bộ cờ B2C, 12 Gói Học đường B2B và thu hút 400 VIP Subscriptions.  
* **M (Measurable):** Doanh thu thuần 342.000.000 VNĐ.  
* **A (Achievable):** Thông qua kênh Affiliate KOC và mượn lực Giáo viên Lịch sử (B2B2C).  
* **R (Relevant):** Đạt điểm hòa vốn sản phẩm để tái đầu tư tính năng AI.  
* **T (Time-bound):** Hoàn thành trong 12 tháng hoạt động.

#### **Action Plan & Budget Allocation (110.000.000 VNĐ Vốn ban đầu)**

\[65.000.000 VNĐ: Sản xuất Lô cờ 1.000 bộ (MOQ)\]  
\[30.000.000 VNĐ: R\&D Web Sử Tự AI & Hạ tầng Cloud\]  
\[15.000.000 VNĐ: Kiểm định QCVN 3 & Mã xuất bản ISBN\]

* **Ngân sách Marketing chạy hàng ngày:** Trích trực tiếp 15% \- 20%hoa hồng trên mỗi đơn hàng phát sinh thực tế (Affiliate Model) thay vì chi tiền cố định cho quảng cáo.


### **10\. MEASUREMENT & OPTIMIZATION DASHBOARD**

#### **KPIs Dashboard Theo dõi**

* **Chỉ số LTV/CAC:** Duy trì tỷ lệ $LTV / CAC \\ge 3,0$ (LTV khối Lớp 10 đạt 480.700 VNĐ với CAC 85.000 VNĐ $\\rightarrow \\frac{LTV}{CAC} \\approx 5,65:1$).  
* ![][image1]  
* **Tỷ lệ kích hoạt (Activation Rate):** ≥ 70% người mua bộ cờ thực hiện quét QR tạo tài khoản trên Web Sử Tự AI.  
* **Tỷ lệ giữ chân (Retention Rate):** ≥ 25% học sinh quay lại Web App làm đề thi sau 30 ngày.

#### **Kế hoạch Dự phòng & Tối ưu (Contingency Strategy)**

* *Nếu CAC quảng cáo vượt quá 80.000 VNĐ/đơn:* Dừng 100% Ads trả tiền, chuyển sang mô hình CSR B2B2C (mời doanh nghiệp tài trợ bộ cờ cho trường học) và đẩy mạnh Affiliate cho học sinh/giáo viên.  
*   
* *Nếu tỷ lệ quét QR thấp:* tinh chỉnh gameplay, chỉ bắt buộc quét QR ở các mốc tính điểm quyết định ván cờ và bổ sung tính năng lưu dữ liệu offline (offline caching).

# TRẬN BĐ 938 REAL

### 

### **I. DANH SÁCH NHÂN VẬT HAI PHE (TRẬN BẠCH ĐẰNG 938\)**

Mỗi trận đánh tiêu chuẩn được thiết lập tối đa **12 Thẻ Tướng** chia đều cho 2 phe:

#### **1\. Phe Ta (Chính nghĩa \- Linh vật đại diện: Rồng Thời Lý)**

* **Ngô Quyền (Chủ Tướng \- 5 Máu \- Hệ Thủy):** Kỹ năng *Thống Lĩnh* (Phó tướng được \+1 khoảng cách tấn công và rút thêm 1 thẻ khởi đầu lượt).  
* **Kiều Công Hãn (Phó Tướng \- 3 Máu \- Hệ Mộc):** Kỹ năng *Chọn cửa hiểm* (Xem 2 thẻ trên cùng xấp bài rút, giữ 1, trả lại 1).  
* **Đỗ Cảnh Thạc (Phó Tướng \- 4 Máu \- Hệ Hỏa):** Kỹ năng *Đánh tạt hữu ngạn* (Khi gây sát thương, gây thêm 1 sát thương hoặc ép địch bỏ 1 lá).  
* **Phạm Bạch Hổ (Phó Tướng \- 3 Máu \- Hệ Thổ):** Kỹ năng *Dân binh bờ sông* (Giảm 1 sát thương nhận vào, sau đó rút 1 lá).  
* **Dương Tam Kha (Phó Tướng \- 4 Máu \- Hệ Kim):** Kỹ năng *Xạ kích tả ngạn* (Chọn 1 tướng địch phía đối diện sông: buộc họ bỏ 1 lá hoặc chịu 1 sát thương).  
* **Ngô Xương Ngập (Phó Tướng \- 3 Máu \- Hệ Thủy):** Kỹ năng *Hiệp kích hữu ngạn* (Khi đồng minh cùng phe gây sát thương: rút 1 lá).

#### **2\. Phe Địch (Xâm lược \- Linh vật đại diện: Thao Thiết)**

* **Lưu Cung (Chủ Tướng \- 5 Máu \- Hệ Hỏa):** Kỹ năng *Thanh viện Hải Môn* (Khi tướng phe mình còn 1 máu: cho rút 2 bỏ 1, hoặc \+1 khoảng cách tấn công).  
* **Lưu Hoằng Tháo (Phó Tướng \- 4 Máu \- Hệ Thổ):** Kỹ năng *Thủy quân tiến sâu* (Tiến thêm 1 ô và rút 1 lá. Nếu triều rút mà đang ở vùng cọc: bỏ 1 lá, mất 1 máu).  
* **Tiêu Ích (Phó Tướng \- 3 Máu \- Hệ Mộc):** Kỹ năng *Cảnh báo đường biển* (Xem 2 lá bài trên cùng, bỏ 1 lá lấy lá kia; nếu gặp thẻ "Nước rút" hoặc "Cọc" thì được rút thêm 1 lá).  
* **Kiều Công Tiễn (Phó Tướng \- 4 Máu \- Hệ Hỏa):** Kỹ năng *Cầu viện Nam Hán* (Một lần đầu trận cho 1 tướng phe địch rút 2 lá giữ 1; mất hiệu lực khi bị loại).

---

### **II. DANH MỤC THIẾT KẾ CẦN CÓ TRONG BỘ KIT VẬT LÝ (HARDWARE DESIGN CHECKLIST)**

Để bộ Kit có độ hoàn thiện cao, bám sát tiêu chuẩn thương mại và pháp lý, nhóm cần thiết kế các hạng mục sau:

#### **1\. Thiết kế Vỏ Hộp Giấy Cứng (Cán màng bảo vệ)**

* **Mặt trước:** Logo dự án "Kỳ Hùng Đất Việt" phong cách chữ cổ/dân gian, Tagline *"Biến mỗi trận đánh lịch sử thành một ván cờ chiến thuật"*.  
* **Mặt sau:**  
  * Đoạn tóm tắt giới thiệu game và cách chơi ngắn gọn.  
  * Hình ảnh minh họa gameplay (phải thể hiện được **bàn cờ bản đồ Việt Nam, các lá bài, vùng giao tranh**).  
  * Khung thông số sản phẩm: Số người chơi (3-6 người), Độ tuổi, Thời lượng, Thể loại (Chiến thuật \- Giáo dục Lịch sử).  
  * **Mã QR lớn tích hợp hướng dẫn quét kết nối trực tiếp với nền tảng Web Sử Tự**.  
  * Thông tin chứng nhận an toàn **QCVN 3:2019/BKHCN**, mã vạch Barcode và logo nhà xuất bản (bảo chứng cấp mã **ISBN**).

#### **2\. Thiết kế Bản Đồ Sa Bàn (Bàn cờ Canvas chống nước)**

* Thiết kế bản đồ sông nước **sông Bạch Đằng** — vùng sông cửa biển có chế độ thủy triều lên xuống mạnh.  
* Phân chia các vùng không gian rõ ràng cho người chơi: **Vùng Trang bị, Vùng Phán xét, Vùng Giao tranh và khu vực đặt Chồng bài rút**.  
* Bản đồ cần vẽ rõ luồng lách, cồn cát, bãi bồi ven sông để phục vụ cho các thẻ kế sách địa hình.

#### **3\. Thiết kế Hệ thống Thẻ Bài Vật Lý (In giấy Black Core 300-350gsm cán mờ)**

Toàn bộ thẻ bài có kích thước chuẩn, mặt trước chứa **Art phong cách Neo-Traditional** (chiếm 50-60% diện tích) và tích hợp **mã QR/Chip NFC độc bản** ở góc để quét kết nối app Sử Tự. Mặt sau thiết kế hoa văn linh vật tương ứng (Rồng Thời Lý cho phe Ta, Thao Thiết cho phe Địch, Cửu Vĩ Hồ cho phe Độc Lập).

Bộ thẻ bài cho trận này gồm:

* **12 Thẻ bài Tướng:** Chứa thông số Máu, Mệnh Ngũ Hành, Kỹ năng và phần Sử lược tóm tắt tiểu sử nhân vật ở chân thẻ.  
* **24 Thẻ Kỹ năng tướng bổ sung:** Thiết kế đồng bộ (gồm 12 thẻ kỹ năng nâng cấp và 12 thẻ kỹ năng ngẫu nhiên).  
* **Bộ Thẻ Chơi (Play Cards) đặc trưng cho trận Bạch Đằng 938:**  
  * *Thẻ Đánh cơ bản:* Đánh thường (21 lá), Đánh ngũ hành khắc hệ (Thủy, Hỏa, Kim, Mộc, Thổ \- mỗi hệ 2 lá), Né tránh (14 lá), Hồi máu (10 lá).  
  * *Thẻ Trang bị công thủ đặc chủng trận 938:*  
    * Phe Ta: **Cọc Gỗ Nạm Sắt**, **Thuyền Mảng Cảm Tử** (sát thương thuộc tính Lửa), **Đạn Đá Bắn Tàu** (bỏ qua phòng thủ), **Trường Mác Thủy Chiến**.  
    * Phe Địch: **Nỏ Liên Châu Nam Hán**, **Đao Lớn Trảm Mã**, **Móc Tàu Phá Trận**, **Giáp Sắt Bọc Thuyền** (tăng sát thương khi dính hỏa công), **Xích Sắt Khóa Thuyền** (tăng cự ly phòng thủ).  
    * Trang bị chung: Ngựa chiến (-1 khoảng cách tấn công), Voi chiến (+1 khoảng cách phòng thủ), Lúa nước, Thuốc Nam.  
  * *Thẻ Kế sách / Chiến lược mưu lược:* **Dụ Địch Tiến Sâu** (bắt đối thủ chịu trạng thái dính cọc ngầm), **Giả Vờ Tháo Chạy**, **Thủy Chiến Hỏa Công**, **Phá Thuyền Cắt Lương**, **Đột Kích Đoạt Soái**, **Thông Luồng Lạch**, **Hóa Giải Chiến Thuật**.  
  * *Thẻ Sự kiện thời tiết động:* Các thẻ kích hoạt hiệu ứng môi trường ngẫu nhiên như **Cắm Cọc Gỗ**, **Dụ Địch Theo Thủy Triều**, **Thủy Triều Rút Thần Tốc**, **Phản Công Toàn Tuyến**, **Tập Kích Soái Hạm**.

#### **4\. Các Phụ Kiện Hỗ Trợ Đi Kèm**

* **6 Thẻ Máu (HP):** Chứa các nấc vạch 4 Máu và 5 Máu để học sinh theo dõi sinh mệnh của tướng bằng kẹp đánh dấu.  
* **Khay định hình nhựa/giấy:** Để phân chia ngăn nắp các loại thẻ bài trong hộp.  
* **Sách hướng dẫn luật chơi (Rulebook):** Thiết kế khoảng 20-24 trang, in màu cổ phong bám sát ma trận luật chơi Phygital.

# TRẬN BẠCH ĐẰNG

**THẺ TƯỚNG**

| STT | Phe | Tên tướng | Máu | Mệnh Ngũ Hành | Kỹ năng và Công dụng |  | Sử lược |
| :---- | :---- | :---- | :---- | :---- | :---- | ----- | :---- |
| 1 | Ta | **Ngô Quyền** | 5 | Thủy | \- Thống Lĩnh: Tất cả các Phó tướng phe Ta được cộng thêm 1 khoảng cách tấn công và được rút thêm 1 thẻ bài khởi đầu lượt  |  | Bậc anh hùng tuấn kiệt xứ Đường Lâm, Châu mục Ái Châu, con rể Dương Đình Nghệ. Ông là Tổng chỉ huy tối cao của chiến dịch, người vạch ra đại chiến lược tiêu diệt Kiều Công Tiễn, xây dựng bẫy cọc ngầm và điều phối toàn bộ lực lượng thủy bộ Tĩnh Hải Quân |
| 2 | Ta | **Kiều Công Hãn** | 3 | Mộc  | \- Chọn cửa hiểm: Xem 2 thẻ chơi trên cùng, giữ 1 thẻ, đặt lại thẻ kia.  |  | Hào trưởng vùng châu Phong, mưu sĩ kiêm Tiên phong tướng quân. Ông là người đã phân tích điểm yếu thủy quân Nam Hán và hiến kế trực tiếp cho Ngô Quyền về việc bày trận đánh giặc ngay tại cửa sông Bạch Đằng, đồng thời chịu trách nhiệm dựng căn cứ tiền tiêu Lương Xâm |
| 3 | Ta | **Đỗ Cảnh Thạc** | 4 | Hỏa | \- Đánh tạt hữu ngạn: Sau khi tướng phe ta gây sát thương cho địch thì được gây thêm 1 sát thương hoặc buộc mục tiêu bỏ 1 lá.   |  | Võ tướng dũng mãnh, Thái úy võ quan triều Ngô, người Đánh cánh cùng Ngô Quyền hạ thành Đại La, sau đó chỉ huy cánh quân bộ binh và thủy quân chủ lực vây ráp tiêu diệt quân địch sa bẫy. |
| 4 | Ta | **Phạm Bạch Hổ** | 3 | Thổ  | Dân binh bờ sông : Giảm 1 sát thương, rồi rút 1 lá.  |  | Hào trưởng đất Đằng Châu, chỉ huy 5.000 quân tiên phong tiêu diệt Kiều Công Tiễn tại Đại La, sau đó trấn giữ và bọc lót cánh quân thủy bộ khu vực Hải Đông.  |
| 5 | Ta | **Dương Tam Kha** | 4 | Kim  | Xạ kích tả ngạn:  Chọn 1 tướng địch phía đối diện sông: bỏ 1 lá hoặc nhận 1 sát thương. |  | Em vợ Ngô Quyền, tướng chỉ huy trực tiếp lực lượng kỹ thuật và quân sĩ đốn cây, vót nhọn, bịt Đánh và cắm cọc ngầm dưới lòng sông Bạch Đằng |
| 6 | Ta | **Ngô Xương Ngập** | 3 | Thủy | Hiệp kích hữu ngạn: Khi đồng minh cùng phe gây sát thương: rút 1 lá. |  | Hoàng tử trưởng, người cùng tham gia hoạch định chi tiết vị trí đóng cọc ngầm và chỉ huy toán phục binh trên bờ sông |
| 7 | Địch  | **Lưu Cung** | 5 | Hỏa | Thanh viện Hải Môn Mỗi trận 1 lần, khi tướng phe địch còn 1 máu: cho tướng đó rút 2, bỏ 1; hoặc tăng 1 khoảng cách nếu đang ở tầm đánh  |  | Hoàng đế nhà Nam Hán, Tổng chỉ huy chiến lược đóng quân tại Hải Môn làm thanh viện, điều phối toàn bộ chiến dịch xâm lược Tĩnh Hải Quân.  |
| 8 | Địch  | **Lưu Hoằng Tháo** | 4 | Thổ | Thủy quân tiến sâu Tiến thêm 1 ô và rút 1\. Nếu triều rút và đang ở vùng cọc (tầm đánh): bỏ 1 lá, mất 1 máu. |  | Hoàng tử thứ chín nhà Nam Hán, Thống lĩnh hạm đội hơn 200 chiến thuyền trực tiếp vượt biển tiến vào Bạch Đằng.  |
| 9 | Địch  | **Lý Long Câu** | 3 | Kim  | Mở đường dò nước Mỗi trận 1 lần, Kiểm tra bí mật 1 ô sông. Nếu có cọc, đánh dấu và lùi 1 ô. |  | Tướng tiên phong thủy quân Nam Hán, chỉ huy đội thuyền hơn một trăm chiếc dẫn đầu hạm đội, trang bị sọt đạn đá và máy bắn đá cỡ lớn |
| 10 | Địch  | **Tô Phán** | 4 | Thủy | Giữ soái thuyền Mỗi trận 1 lần khi (tướng cùng phe) nhận sát thương từ vùng cọc (trận đánh): chịu thay 1 sát thương hoặc bỏ 2 lá để triệt tiêu. |  | Tướng chỉ huy đội trung quân gồm hơn một trăm hải thuyền hạng nặng, giương cờ hiệu bọc lót và bảo vệ soái thuyền của Lưu Hoằng Tháo |
| 11 | Địch  | **Tiêu Ích** | 3 | Mộc | Cảnh báo đường biển Mỗi trận 1 lần, cem 2 lá trên cùng: có thể bỏ 1 lá để thay bằng lá kia. Nếu gặp thẻ “nước rút” hoặc “cọc”, được rút 1 lá.  |  | Mưu sĩ cao cấp nhà Nam Hán, người đưa ra lời can ngăn sáng suốt về thời tiết mưa dầm, đường biển Ta hiểm và sự Ta hiểm của Ngô Quyền nhưng không được Lưu Cung chấp thuận |
| 12 | Địch  | **Kiều Công Tiễn** | 4 | Hỏa | Cầu viện Nam Hán Một lần đầu trận: cho 1 tướng phe địch rút 2 lá, giữ 1\. Sau khi Kiều Công Tiễn bị loại, không dùng lại. |  | Tiết độ sứ soán ngôi, kẻ phản chủ mưu Đánh Dương Đình Nghệ và rước quân Nam Hán sang xâm lược (đóng vai trò nhân vật sự kiện kích hoạt biến cố) |

## 

## 

## 

##  **THẺ TRANG BỊ ** 

|  STT |  Loại | Phe sử dụng | Tên vũ khí | SL |                                              Công dụng | Sử lược |
| :---: | ----- | ----- | ----- | :---: | ----- | ----- |
| **1** | **Tấn công** | **Phe Ta (Đại Việt)** | **Cọc Gỗ Nạm Sắt (Bạch Đằng Cọc Mộc)** | 2 | **Công kích tầm xa / Phá hủy:** Cho phép Tấn công ở cự ly \+2. Khi đòn Tấn công gây thương tổn, người chơi có thể chọn không gây thương tổn mà buộc mục tiêu phải loại bỏ (bỏ) toàn bộ thẻ Trang bị đang mang trên người. | Lấy cảm hứng từ hệ thống cọc gỗ đẽo nhọn đầu bọc sắt được Ngô Quyền cho cắm dưới lòng sông Bạch Đằng. Khi thủy triều rút, cọc đâm thủng đít thuyền địch, phá hủy hoàn toàn phương tiện chiến đấu.  |
| **2** | **Tấn công** | **Phe Ta (Đại Việt)** | **Thuyền Mảng Cảm Tử (Hỏa Thuyền Xung Kích)** | 1 | **Sát thương thuộc tính Lửa:** Chuyển hóa toàn bộ đòn Tấn công vật lý thông thường thành đòn Tấn công Mang thuộc tính Lửa. Nếu mục tiêu chịu sát thương Lửa và đang ở trạng thái Liên kết, sát thương sẽ lan sang các tướng đang liên kết. | Cường quân Việt sử dụng các thuyền nhỏ, mảng nhẹ chất đầy chất cháy (dầu, rơm khô) châm lửa rồi lao thẳng vào hạm đội thuyền lớn Nam Hán đang bị mắc kẹt trên sông.  |
| **3** | **Tấn công** | **Phe Ta (Đại Việt)** | **Đạn Đá Bắn Tàu (Cự Thạch Nổ)** | 1 | **Bỏ qua Phòng thủ:** Khi dùng đòn Tấn công nhắm vào tướng địch, nếu đòn tấn công bị Né tránh thành công, người chơi có thể bỏ 2 lá bài trên tay để cưỡng chế đòn Tấn công đó vẫn có hiệu lực gây thương tổn. | Quân ta bố trí các máy bắn đá hạng nặng trên vách núi hai bên bờ sông Bạch Đằng. Đạn đá đập vỡ mạn thuyền kiên cố của địch, dù đối phương có chống đỡ bằng khiên cũng không né tránh được sức công phá. |
| **4** | **Tấn công** | **Phe Ta (Đại Việt)** | **Trường Mác Thủy Chiến (Trường** | 1 | **Xung phong liên tiếp:** Người chơi có thể gom 2 lá bài bất kỳ trên tay để sử dụng tính như 1 lá Tấn công chuẩn. Cho phép linh hoạt chuyển | Loại giáo mác dài đặc chủng của quân dân vùng ven biển. Khi giáp chiến trên mạn thuyền, thương dài vừa đâm gạt hiệu quả vừa giúp chiến sĩ tận dụng |

|  |   |   | Thương Đoạn Thuyền) |   | đổi tài nguyên thành đòn tấn công dồn dập. | mọi đồ vật trên tay làm vũ khí giáp lá lánh.  |
| ----- | :---- | ----- | :---- | ----- | :---- | :---- |
| **5** | **Tấn công** | **Phe Địch (Nam Hán)** | **Nỏ Liên Châu Nam Hán (Thần Cơ Lực Nỏ)** | 1 | **Tấn công không giới hạn:** Bỏ qua quy tắc "Mỗi lượt chỉ được dùng 1 lá Tấn công". Tướng sở hữu nỏ này có thể dùng không giới hạn số lá Tấn công trong giai đoạn ra bài, miễn là có đủ bài trên tay. | Công nghệ nỏ bắn liên tiếp được nhà Nam Hán phát triển từ thời Lĩnh Nam, có khả năng bắn hàng loạt mũi tên sắt trong thời gian ngắn, áp đảo hỏa lực của quân Đại Việt ở cự ly xa. . |
| **6** | **Tấn công** | **Phe Địch (Nam Hán)** | **Đao Lớn Trảm Mã (Trảm Mạn Đại Đao)** | 1 | **Sát thương lan rộng:** Sau khi đòn Tấn công gây thương tổn thành công cho 1 mục tiêu, người chơi có thể bỏ 1 lá bài trên tay để gây ngay 1 sát thương cho 1 tướng khác nằm ở cự ly 1 so với mục tiêu ban đầu. | Vũ khí bộ binh nặng của kiêu binh Nam Hán dưới quyền Lưu H弘 Thao. Đao nặng lưỡi rộng dùng để chém đứt mạn thuyền và tiêu diệt nhiều binh sĩ Đại Việt đứng sát nhau khi tràn sang thuyền đối phương.  |
| **7** | **Tấn công** | **Phe Địch (Nam Hán)** | **Móc Tàu Phá Trận (Câu Lạc Thiết Trảo)** | 1 | **Đổi Thương tổn lấy Bài (Chấn áp):** Khi đòn Tấn công chuẩn bị gây thương tổn cho mục tiêu, người chơi có thể chọn hủy sát thương này để cưỡng chế rút 2 lá bài ngẫu nhiên từ tay hoặc khu vực trang bị của mục tiêu. | Dụng cụ móc sắt nối dây thừng dùng để kéo chặt thuyền nhỏ của Đại Việt vào hạm đội thuyền lớn. Vừa vô hiệu hóa sự cơ động của quân ta, vừa cho phép quân Hán cướp đoạt vũ khí, vật tư.  |
| **8** | **Phòng thủ** | **Phe Ta (Đại Việt)** | **Khiên Mây Trập Trùng (Đắp Mây Trụ Thủy)** | 1 | **Kháng Sát thương Đen:** Toàn bộ các đòn Tấn công có màu Đen (Bích, Tép) từ đối phương khi nhắm vào tướng mang Khiên Mây đều hoàn toàn vô hiệu, không gây sát thương và không kích hoạt hiệu ứng kèm theo. | Khiên làm từ mây rừng đan chặt, ngâm dầu thảo mộc vừa nhẹ float trên nước vừa dẻo dai. Khiên mây hấp thụ hoàn toàn lực cắm của các loại tên độc và giáo mác thông thường (đại diện bởi chất bài Đen).  |
| **9** | **Phòng thủ** | **Phe Ta (Đại Việt)** | **Trận Đồ Luồng Lách (Thủy Trận Bát Quái)** | 1 | **Phán định Né tránh:** Mỗi khi bị nhắm bởi 1 đòn Tấn công, người chơi có thể lật 1 lá bài phán định từ xấp bài chung. Nếu lá lật ra có màu Đỏ (Cơ, Rô), đòn Tấn công đó lập tức coi như đã bị Né tránh thành công. | Dựa trên hiểu biết sâu sắc về luồng lách, cồn cát và dòng chảy sông Bạch Đằng. Binh sĩ Việt di chuyển ẩn hiện trong sương mù và lạch sông, khiến quân địch đánh vào khoảng không.. |
| **10** | **Phòng thủ** | **Phe Ta (Đại Việt)** | **Mũ Rơm Bọc Đồng (Đồng Mạo Trường An)** | 1 | **Giảm bớt Sát thương lớn & Hồi sinh lực:** Giới hạn mọi nguồn sát thương nhận vào trong 1 lần tối đa chỉ là 1 điểm. Khi trang bị này bị hủy hoặc thay thế, tướng sở hữu được hồi ngay 1 điểm sinh lực. | Mũ kết bằng rơm nẹp dải đồng bảo vệ đầu binh sĩ trước mảnh vỡ đạn đá và tên bắn. Khi mũ bị phá hủy hoàn toàn, sức va đập giảm đi giúp binh sĩ thoát chết hy hữu và phục hồi sức lực. |
| **11** | **Phòng thủ** | **Phe Ta (Đại Việt)** | **Nối Dây Thuyền Nhẹ (Thần Tốc** | 2 | **Rút ngắn cự ly Tấn công:** Giảm khoảng cách tính từ bản thân đến tất cả các tướng khác đi 1 đơn vị. Cho phép người chơi dễ dàng tiếp cận và | Phương pháp nối các thuyền nhẹ bằng dây mây linh hoạt giúp quân Đại Việt di chuyển nhanh như gao dốc trên mặt nước, dễ dàng áp sát hạm đội cồng |

 

|   |   |   | Ngựa Tốt \- Tấn công) |   | tấn công các tướng địch ở cự ly xa hơn. | kềnh của địch. (Tương tự cơ chế Ngựa Tấn công \-1). |
| ----- | :---- | ----- | :---- | ----- | :---- | :---- |
| **12** | **Phòng thủ** | **Phe Địch (Nam Hán)** | **Giáp Sắt Bọc Thuyền (Đại Hạm Bọc Thép)** | 1 | **Miễn sát thương thường / Nhược điểm Lửa:** Miễn nhiễm hoàn toàn các đòn Tấn công thông thường và mưu lược đại trà. Tuy nhiên, nếu chịu sát thương thuộc tính Lửa, sát thương nhận vào sẽ tăng thêm 1 điểm. | Thuyền chiến lớn (Soái hạm) Nam Hán bọc giáp sắt kiên cố chống tên đạn. Nhưng chính giáp sắt và gỗ sến khiến thuyền nặng nề, dễ bị hỏa công thiêu rụi khi mắc kẹt trên bãi cọc.  |
| **13** | **Phòng thủ** | **Phe Địch (Nam Hán)** | **Xích Sắt Khóa Thuyền (Lực Lượng Phòng Thủ Từ Xa)** | 2 | **Nới rộng cự ly Phòng thủ:** Tăng khoảng cách tính từ các tướng khác đến bản thân thêm 1 đơn vị. Khiến đối phương khó vươn tới để thực hiện các đòn Tấn công hoặc mưu lược giới hạn tầm. | Nam Hán nối các thuyền lớn bằng xích sắt để tạo thành phòng tuyến kiên cố trên mặt nước. Khoảng cách an toàn do xích sắt tạo ra ngăn chặn các thuyền nhỏ quân Việt áp sát. (Tương tự cơ chế Ngựa Phòng thủ \+1). |
| **14** | **Phòng thủ** | **Phe Địch (Nam Hán)** | **Màng Phủ Xuyên Giáp (Tấm Chắn Xuyên Thấu)** | 1 | **Bỏ qua Hiệu ứng Giáp địch:** Khi tướng mang Màng Phủ sử dụng đòn Tấn công nhắm vào đối phương, toàn bộ hiệu ứng từ thẻ Trang bị phòng thủ (giáp/khiên) của đối phương bị hoàn toàn vô hiệu hóa. | Lực lượng cắm giáo tiền phong Nam Hán dùng các dải màng da trâu ngâm mỡ phủ lên đầu giáo, giúp đâm xuyên qua các lớp mây đan hoặc áo giáp thô thô của quân Đại Việt.  |
| **15** | **Tấn công** |  | Ngựa | 3 | Giảm khoảng cách bạn phải tính khi tấn công người khác đi 1\. |  |
| **16** | **Phòng thủ** |  | **Voi Chiến** | 3 | Tăng khoảng cách của người khác khi tính đến bạn lên 1 |  |
| **17** |  |  | **Lúa Nước** | 3 | Tăng 1 máu  |  |
| **18** |  |  | **Thuốc Nam** | 3 | Hóa giải 1 đòn đánh Ngũ hành  |  |

**BỘ THẺ CHƠI CƠ BẢN** 

| STT | Tên Thẻ Bài | Số Lượng | Loại / Icon | Nội Dung Văn Bản Trên Thẻ (Card Text) | Sử Lược (Footer Text) |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **1** | **Đánh Thường** | **21 lá** | ⚔️ Tấn công | Gây **1 sát thương** lên 1 Tướng đối phương trong Tầm đánh. Mục tiêu bắt buộc ra 1 lá Né, nếu không bị mất 1 Máu Tướng. | *Quân sĩ hai bên áp mạn chiến thuyền, dùng giáo thương và đao kiếm giáp lá bão quyết liệt trên sông Bạch Đằng.* |
| **2** | **Đánh Hệ Thủy** *(Thủy Chiến)* | **2 lá** | 💧 Thủy tấn công | Gây **1 sát thương** lên 1 Tướng trong Tầm đánh. • **Khắc hệ:** Nếu mục tiêu là Tướng hệ 🔥**Hỏa** (Kỵ binh / Hỏa lực), đòn đánh gây **2 sát thương**. | *Thuyền nhẹ Đại Việt lợi dụng luồng nước xoáy luồn lách qua sườn hạm đội địch.* |
| **3** | **Đánh Hệ Hỏa** *(Hỏa Cung)* | **2 lá** | 🔥 Hỏa tấn công | Gây **1 sát thương** lên 1 Tướng trong Tầm đánh. • **Khắc hệ:** Nếu mục tiêu là Tướng hệ 🛡️**Kim** (Giáp nặng / Thành trì), đòn đánh gây **2 sát thương**. | *Mưa tên lửa và hũ dầu cháy phóng sang làm bùng cháy các chiến thuyền bọc sắt.* |
| **4** | **Đánh Hệ Kim** *(Đao Binh)* | **2 lá** | 🛡️ Kim tấn công | Gây **1 sát thương** lên 1 Tướng trong Tầm đánh. • **Khắc hệ:** Nếu mục tiêu là Tướng hệ 🌿**Mộc** (Du kích / Rừng núi), đòn đánh gây **2 sát thương**. | *Lực lượng đao binh giáp nặng va chạm trực diện, phá vỡ tuyến phòng thủ du kích.* |
| **5** | **Đánh Hệ Mộc** *(Thổ Binh)* | **2 lá** | 🌿 Mộc tấn công | Gây **1 sát thương** lên 1 Tướng trong Tầm đánh. • **Khắc hệ:** Nếu mục tiêu là Tướng hệ ⛰️**Thổ**, đòn đánh gây **2 sát thương**. | *Cung thủ mai phục từ lùm cây ven bờ sông xả tên như mưa vào bộ chỉ huy đối phương.* |
| **6** | **Đánh Hệ Thổ** *(Địa Hình)* | **2 lá** | ⛰️ Thổ tấn công | Gây **1 sát thương** lên 1 Tướng trong Tầm đánh • **Khắc hệ:** Nếu mục tiêu là Tướng hệ 💧**Thủy** (Thủy quân), đòn đánh gây **2 sát thương**. | *Dựa vào bãi cồn cát và dòng chảy sông Bạch Đằng ép hạm đội địch sa lầy.* |
| **7** | **Né Tránh** *(Bẻ Lái)* | **14 lá** | 🌀 Phòng thủ | Sử dụng ngay khi bị nhắm bởi đòn Đánh hoặc Đánh Ngũ Hành. **Triệt tiêu hoàn toàn 1 đòn đánh đó**. | *Người chèo thuyền bẻ lái gấp, lách chiến thuyền khỏi mũi tên và đao giáo kẻ thù.* |
| **8** | **Hồi Máu** *(Cứu Thương)* | **10 lá** | 💚 Phục hồi | **Phục hồi 1 Máu Tướng** cho bản thân hoặc 1 Tướng đồng đội cùng phe (không vượt quá Máu tối đa). *(Không có tác dụng lên Máu Phe)*. | *Dân binh địa phương kịp thời cứu chữa, tiếp lương thảo giúp tướng sĩ tiếp tục chiến đấu.* |

**Thẻ Chiến Lược** 

| STT | Tên Thẻ Bài | Số Lượng | Nội Dung Văn Bản Trên Thẻ  | Sử Lược (Footer Text) |
| :---- | :---- | :---- | :---- | :---- |
| **1** | **Dụ Địch Tiến Sâu** | **2 lá** | Gán trạng thái **Bị Dụ Vào Cọc** lên 1 Tướng đối phương *(Tướng này bị tính là đang ở Vùng Cọc Ngầm ở lượt kế tiếp)*. Mục tiêu có thể bỏ 1 lá Né để hủy hiệu ứng này. | *Quân Đại Việt vừa đánh vừa lui, nhử hạm đội Nam Hán lọt vào trận địa cọc ngầm đã giăng sẵn.* |
| **2** | **Giả Vờ Tháo Chạy** | **2 lá** | Hóa giải 1 đòn Đánh đang nhắm vào bản thân và **rút ngay 2 lá bài** từ Chồng bài rút. | *Thuyền nhẹ Đại Việt vờ thua tháo chạy, tạo ảo tưởng chiến thắng khiến Lưu Hoằng Tháo hăng hái đuổi theo.* |
| **3** | **Thủy Chiến Hỏa Công** | **2 lá** | Bỏ 1 lá bài bất kỳ trên tay để **gây 1 sát thương hệ Hỏa** lên 1 Tướng đối phương bất kỳ trên Sa bàn. | *Nhiều thuyền nhỏ chở đầy chất cháy phóng thẳng vào hạm đội Nam Hán, biến sông Bạch Đằng thành biển lửa.* |
| **4** | **Phá Thuyền Cắt Lương** | **2 lá** | Ép 1 Tướng đối phương phải **bỏ 1 lá bài trên tay** hoặc **hủy 1 lá Trang Bị** đang mang trên người. | *Lực lượng mai phục hai bên bờ sông cướp phá thuyền lương, cắt đứt viện trợ của hạm đội xâm lược.* |
| **5** | **Đột Kích Đoạt Soái** | **2 lá** | **Lấy 1 lá bài trên tay** hoặc **1 lá Trang Bị** của 1 Tướng đối phương về tay mình. | *Tướng sĩ Đại Việt bơi giỏi lặn sâu, áp mạn soái thuyền cướp vũ khí và tiêu diệt bộ chỉ huy địch.* |
| **6** | **Thông Luồng Lạch** | **2 lá** | **Rút ngay 2 lá bài** từ Chồng bài rút. | *Am hiểu tường tận luồng lạch sông ngầm giúp quân Đại Việt liên tục điều động quân lương và viện binh.* |
| **7** | **Hóa Giải Chiến Thuật** | **3 lá** | Sử dụng ngay khi đối phương ra 1 lá Mưu Lược. **Vô hiệu hóa hoàn toàn lá Mưu Lược đó** (Bỏ cả 2 lá vào chồng bài bỏ). | *Ngô Quyền dự tính như thần, bắt bài và hóa giải mọi mưu đồ thám báo của quân Nam Hán.* |

| 1 | Cắm Cọc Gỗ | 3 | Đặt một lá bài Cọc Gỗ vào lòng sông (khu vực chiến trường). Khi quân địch tiến vào vùng nước có cọc, buộc quân địch phải bỏ 1 lá bài Phòng Thủ hoặc chịu 1 điểm sát thương Thủy chiến. |  *Năm 938, Ngô Quyền đoán trước quân Nam Hán sẽ tiến vào nước ta bằng đường biển qua sông Bạch Đằng. Ông đã cho quân dân đẽo gọt hàng ngàn cây gỗ nhọn, đầu bọc sắt, đem cắm ngầm dưới lòng sông ở những vị trí hiểm yếu gần cửa biển.* |
| :---: | :---- | :---: | :---- | :---- |
| **2** | **Dụ Địch Theo Thủy Triều** | **2** | Sử dụng thuyền nhẹ di chuyển đến vùng chiến trường. Buộc 1 đội thuyền địch phải di chuyển tiến lên 2 ô về phía bẫy cọc. Người dùng lá bài này được rút thêm 1 lá bài Mưu lược. | *Khi thủy triều dâng cao che lấp chiến địa cọc ngầm, Ngô Quyền sai Nguyễn Tất Tố dẫn một đội thuyền nhẹ ra cửa biển giả vờ thua trận, dụ toàn bộ hạm đội của Lưu Hoằng Thao đuổi theo sâu vào lòng sông Bạch Đằng.* |
| **3** | **Thủy Triều Rút Thần Tốc** | **2** | Kích hoạt hiệu ứng môi trường 'Triều Rút': Tất cả chiến thuyền lớn của đối phương bị giảm 50% khoảng cách di chuyển và nhận thêm 1 điểm sát thương từ mọi đòn tấn công Thủy chiến trong lượt này. |  *Đợi khi thủy triều đạt đỉnh và bắt đầu rút xuống rất nhanh, Ngô Quyền ra lệnh cho toàn quân quay đầu đánh quật lại. Quân Nam Hán hoảng loạn tháo chạy nhưng dòng nước rút nhanh khiến thuyền chiến bị mắc cạn.* |
| **4** | **Thuyền Nhẹ Luồn Lách** | **2** | Cho phép 1 đội thuyền của bạn di chuyển bỏ qua mọi chướng ngại vật hoặc hiệu ứng khóa đường của đối thủ. Ngoài ra, vô hiệu hóa 1 lá bài Tấn công tầm xa hướng vào thuyền này. |  *Quân Ta sử dụng các loại thuyền nhỏ, nhẹ, cơ động cao, dễ dàng luồn lách giữa các luồng lạch và bãi cọc ngầm. Trong khi đó, hạm đội Nam Hán dùng chiến thuyền lớn cồng kềnh nên hoàn toàn mất khả năng xoay xở khi nước rút.* |

| 5 | Phản Công Toàn Tuyến | 1 | Tất cả chiến thuyền của phe Ta đồng loạt gia tăng 1 điểm sát thương Tấn công. Nếu quân địch đang ở khu vực Bẫy Cọc, đòn tấn công gây đôi sát thương. |  *Khi quân địch rơi vào bẫy cọc và mắc kạn, Ngô Quyền hạ lệnh cho toàn bộ lực lượng phục kích từ hai bên bờ và các luồng lạch đồng loạt xông ra tấn công dồn dập, đập tan đội hình địch.* |
| :---: | :---- | :---: | :---- | :---- |
| **6** | **Phục Kích Hai Bờ** | **2** | Chỉ định 1 khu vực chiến trường. Khi thuyền địch di chuyển vào khu vực này, lập tức gây 2 điểm sát thương trực tiếp và buộc đối thủ phải bỏ 1 lá bài trên tay. | *Ngô Quyền đã bố trí các lực lượng bộ binh và cung thủ tinh nhuệ phục kích sẵn ở các vùng rừng rậm và ngã sông dọc hai bên bờ sông Bạch Đằng, sẵn sàng khép chặt vòng vây khi có hiệu lệnh.* |
| **7** | **Hỏa Công Thủy Chiến** | **2** | Gây 2 điểm sát thương Lửa cho 1 thuyền địch. Sát thương Lửa này sẽ lan sang 1 thuyền địch liền kề nếu thuyền đó đang bị mắc kẹt. |  *Trong trận Bạch Đằng, quân Ta đã sử dụng các thuyền chứa vật liệu dễ cháy phóng hỏa vào hạm đội thuyền gỗ cồng kềnh của Nam Hán, khiến lửa cháy dữ dội trên sông và làm quân địch vô cùng hoảng loạn.* |
| **8** | **Nắm Rõ Luồng Lạch** | **2** | Nhìn 3 lá bài đầu tiên của chồng bài rút, chọn 1 lá đưa vào tay và xếp 2 lá còn lại theo thứ tự tùy ý xuống đáy chồng bài. Hoặc xem 1 lá bài đang úp của đối thủ. | *Ngô Quyền và các tướng sĩ đã nghiên cứu rất kỹ quy luật thủy triều lên xuống cùng địa hình sông lạch hiểm yếu vùng cửa biển Bạch Đằng, biến lợi thế địa hình tự nhiên thành vũ khí chiến lược quyết định.* |
| **9** | **Chờ Thời Cơ** | **2** | Bỏ qua giai đoạn tấn công trong lượt này để rút thêm 2 lá bài. Đồng thời tăng 1 điểm phòng thủ cho toàn bộ chiến thuyền cho đến đầu lượt tiếp theo. | *Trước khi quân Nam Hán kéo đến, Ngô Quyền không vội vã nghênh chiến ngay mà kiên nhẫn tích trữ lương thảo, rèn đúc vũ khí, chuẩn bị trận địa cọc cẩn thận để chờ đúng thời điểm thủy triều dâng lên mới xuất kích.* |
| **10** | **Tập Kích Soái Hạm** | **1** | Tấn công trực tiếp vào tướng chỉ huy (Soái hạm) của đối phương. Nếu gây sát thương thành công, vô hiệu hóa toàn bộ kỹ năng tướng của đối thủ trong 1 lượt. | *Trong hỗn chiến, quân Ta tập trung lực lượng vây đánh và tiêu diệt chiến thuyền chỉ huy của Thái tử Lưu Hoằng Thao. Việc Hoằng Thao bị tử trận tại chỗ khiến toàn bộ quân Nam Hán đứt gãy chỉ huy và tan rã.* |

| 11 | Chia Cắt Đội Hình | 2 | Chọn 2 thuyền địch. Tách rời vị trí của chúng và vô hiệu hóa khả năng hỗ trợ hoặc dùng lá bài cứu trợ lẫn nhau giữa 2 thuyền này trong lượt hiện tại. | *Sự kết hợp giữa bãi cọc ngầm, dòng nước chảy xiết và đòn phản công bất ngờ đã xé lẻ hạm đội hàng trăm chiến thuyền lớn của Nam Hán thành nhiều nhóm nhỏ, mất liên lạc và không thể hỗ trợ lẫn nhau.* |
| :---: | :---- | :---: | :---- | :---- |
| **12** | **Giả Vờ Tháo Chạy** | **2** | Khi bị đối phương tấn công, có thể di chuyển lùi 1 ô để hủy bỏ hoàn toàn sát thương nhận vào, đồng thời kéo đối thủ tiến thêm 1 ô về phía trước. | *Tướng Nguyễn Tất Tố đã thực hiện xuất sắc chiến thuật giả thua: vừa giao chiến nhẹ đã vờ khiêu khích rồi quay đầu chạy tháo lui, khiến tướng địch Lưu Hoằng Thao chủ quan khinh địch hăm hở đuổi theo.* |
| **13** | **Đóng Cọc Đêm Tối** | **1** | Đặt bí mật 1 lá bài Bẫy Cọc úp mặt xuống khu vực lòng sông mà đối thủ không được nhìn. Bẫy sẽ tự động kích hoạt khi thuyền địch di chuyển qua. | *Việc đẽo gỗ và cắm hàng ngàn cọc lớn bọc sắt xuống lòng sông rộng lớn được quân dân ta bí mật triển khai gấp rút trong nhiều ngày đêm liên tục, khiến quân Nam Hán hoàn toàn không hay biết.* |
| **14** | **Truy Kích Tàn Quân** | **2** | Sử dụng ngay sau khi tiêu diệt 1 thuyền địch. Cho phép thực hiện thêm 1 đòn tấn công miễn phí vào 1 thuyền địch khác đang bị tổn thương. | *Sau khi Hoằng Thao tử trận và hạm đội địch đâm vào bãi cọc vỡ nát, quân Ta không ngừng nghỉ mà tiếp tục truy kích ráo riết, tiêu diệt và bắt sống hơn một nửa tàn quân Nam Hán trên sông.* |
| **15** | **Định Quốc An Dân** | **1** | Hồi phục 2 điểm thể lực cho tướng chỉ huy, đồng thời cho phép tất cả đồng minh rút 1 lá bài. Lá bài này loại bỏ toàn bộ trạng thái bất lợi trên bàn chơi. | *Chiến thắng Bạch Đằng năm 938 đã chấm dứt hoàn toàn hơn 1000 năm Bắc thuộc, mở ra thời kỳ độc lập tự chủ lâu dài cho dân tộc Việt Nam, đặt nền móng vững chắc cho nền quốc thống độc lập.* |

# DES HỘP

**Nội dung chứa đựng ở mặt sau hộp boardgame vật lý gồm có:**

| Khu vực | Nội dung đề xuất | Cách trình bày |
| ----- | ----- | ----- |
| **1\. Tiêu đề** | **KỲ HÙNG ĐẤT VIỆT**  Biến mỗi trận đánh lịch sử thành một ván cờ chiến thuật  | Đặt ở phía trên, chữ lớn, phong cách chữ cổ/dân gian Việt. |
| **2\. Giới thiệu game** | ***Kỳ Hùng Đất Việt***  là board game kết hợp chiến thuật và khám phá lịch sử, đưa người chơi bước vào hành trình xuyên qua những giai đoạn quan trọng của dân tộc Việt Nam. Người chơi đóng vai nhân vật, xây dựng lực lượng, sử dụng trang bị và chiến thuật để hoàn thành mục tiêu của phe mình. | Khoảng 4–5 dòng, chữ vừa phải, dễ đọc. |
| **3\. Cách chơi** | Trong mỗi lượt chơi, người chơi lần lượt thực hiện các bước chuẩn bị như xử lý Mưu lược, rút thẻ và triển khai các thẻ bài theo chiến thuật. Những cuộc giao tranh có thể thay đổi cục diện ván chơi, buộc người chơi phải tính toán chiến thuật và quan sát hành động của đối thủ. | Có thể đặt cạnh hình minh họa, không cần ghi toàn bộ luật. (sẽ tùy vào kích thước hộp mà xem xét có nên đưa tóm tắt cách chơi vào không, nếu hộp dạng nhỏ gọn thì có thể không thêm thông tin về luật chơi vào) |
| **4\. Hình ảnh gameplay** | Hình bàn cờ đang được chơi, có **bản đồ Việt Nam, bàn chơi thẻ bài vật lý, các tấm thẻ bài và khu vực giao tranh**. | Nên chiếm diện tích lớn nhất ở trung tâm mặt sau hoặc nằm về một góc luôn để góc còn lại để thông tin. |
| **5\. Điểm nổi bật (Có hay không cũng được)** | 🎴 Thẻ bài chiến thuật  📜 Lịch sử Việt Nam ⚔️ Giao tranh  📱 Kết nối nền tảng số | 4 icon nhỏ, giúp người mua hiểu nhanh giá trị game, kiểu là cho người chơi hiểu nhanh các đặc tính của game thông qua icon này sẽ dễ hiểu hơn. |
| **6\. Bộ sản phẩm gồm** | • Bàn chơi  • Bộ thẻ bài  • Sách hướng dẫn  • Mã QR kết nối website | Đặt trong một khung thông tin riêng, tương tự mẫu bạn gửi. |
| **7\. Thông tin sản phẩm** | **Thể loại:** Board game chiến thuật – giáo dục lịch sử  **Số người chơi:** 3 \- 6 người chơi\]  **Độ tuổi:**  **Thời lượng:**  **Ngôn ngữ:** Tiếng Việt | Đặt ở phần dưới, trình bày ngắn gọn. |
| **8\. Kết nối Website** | **Quét QR để bước vào thế giới lịch sử số** – khám phá bài học, nhiệm vụ và nội dung mở rộng. | Đặt QR ở góc dưới, kèm một câu hướng dẫn ngắn. |
| **9\. Logo / nhận diện** | Logo **Kỳ Hùng Đất Việt**, logo đơn vị phát triển, đồng hành cùng dự án nếu có. | Đặt ở chân hộp, không làm quá lớn. |
| **10\. Mã sản phẩm** | Barcode, QR, thông tin bản quyền, năm phát hành nếu cần. | Đặt ở khu vực chân hộp, giống cấu trúc hộp board game thương mại. |
| **11\. Tagline** | **“Mỗi lá bài – một câu chuyện. Mỗi trận đấu – một trang sử.”** | Có thể đặt nhỏ ở cuối cùng, tạo điểm nhấn thương hiệu. |

# DES PHE

## **DESIGN:**

|  | des | nội dung thẻ | nội dung ghi trong luật chơi |
| :---- | :---- | :---- | :---- |
| PHE TA  | Rồng Thời Lý  | **KỸ NĂNG: Đồng Lòng:** Mỗi khi Máu Phe bị tổn thất, tất cả người chơi Phe Ta lập tức rút 1 lá bài tác chiến. | Công phá Máu Phe của Phe Địch về 0\. Bảo vệ Căn cứ Phe Ta không bị sụp đổ khi hết thời gian ván đấu |
| PHE ĐỊCH  | Thao Thiết  | **Áp Đảo:** Mọi đòn tấn công trực diện vào Căn cứ đối phương được cộng thêm \+1 điểm Sát thương.  | MỤC TIÊU THẮNG   Công phá Máu Phe của Phe Ta về 0\. Tiêu diệt toàn bộ Tướng của Phe Ta trên bàn cờ.  |
| PHE ĐỘC LẬP  | Cửu Vĩ Hồ  | **Biến Ảo:** Được phép liên minh tạm thời với phe có Máu Phe thấp hơn để cùng nhận hiệu ứng hỗ trợ.  | **MỤC TIÊU THẮNG:** *(Đạt 1 trong 2 điều kiện)* Tích lũy đủ **10 Điểm Chiến Công (VP)** từ việc chiếm căn cứ và giải đố lịch sử. Là người chơi duy nhất còn sống sót khi ván đấu kết thúc.  |

## 

## 

## 

## 

## 

## 

## 

## 

## 

## **TỔNG HỢP LINH VẬT ĐẠI DIỆN 3 PHE**

LẤY CHẤT LIỆU PHÁP LAM HUẾ ĐỂ LÀM THẺ PHE \=\> lÀM NHƯ KIỂU THẺ BÀI 

| Phe | Linh Vật Đại Diện | Nguồn Gốc & Bản Chất Văn Hóa | Đặc Tính Chiến Thuật Trong Game |
| :---- | :---- | :---- | :---- |
| **Phe Ta** (Cái thiện) | **Rồng Thời Lý** *(Thiên Long Bất Khuất)* | GS. Trần Quốc Vượng, Mỹ thuật thời Lý: Thần sông nước, hiền hòa, nhân từ, bảo vệ cội nguồn | Thiên về **Phòng thủ, Hồi phục, Tăng cường sức mạnh liên kết** quân lính |
| **Phe Địch** (Cái ác) | **Thao Thiết** *(饕餮 \- Tứ Đại Hung Thú)* | *Sơn Hải Kinh*, *Tả Truyện*: Biểu tượng của tham vọng, cuồng bạo, nuốt chửng | Thiên về **Tấn công dồn dập, Cướp bóc tài nguyên/trang bị** |
| **Phe Độc Lập** (2 mặt) | **Cửu Vĩ Hồ** *(Linh Cáo Biến Ảo)* | *Lĩnh Nam Trích Quái*, Từ điển Biểu tượng Đông Á: Mưu trí, biến ảo, khó lường, vì lợi ích riêng | Thiên về **Lật mặt, Giả dạng, Bẫy mưu lược, Đổi phe có điều kiện** |

## **PHÂN TÍCH CHI TIẾT TỪNG LINH VẬT**

### **1\. Phe Ta: RỒNG THỜI LÝ (Thiên Long Bảo Hộ)**

![][image2]

* **Ứng dụng vào Thẻ Bài & Lối chơi (Game Mechanics):**  
  * **Thần thái minh họa:** Hào quang vàng đồng/xanh lam, uốn lượn trên nền sóng nước Bạch Đằng hoặc mây trời Chi Lăng.  
  * **Kỹ năng phe:** *Bảo Vệ Cội Nguồn* — Giúp các thẻ Tướng và Quân lính (Bộ binh, Thủy binh) tăng sức phòng thủ, phục hồi sinh lực (Thẻ Hồi máu) và vô hiệu hóa đòn đánh tàn bạo từ địch.

### **2\. Phe Địch: THAO THIẾT (Hung Thú Thôn Tính)**

![][image3]

* **Ứng dụng vào Thẻ Bài & Lối chơi (Game Mechanics):**  
  * **Thần thái minh họa:** Mắt đỏ quạnh, miệng rộng tàn bạo, tông màu đen hung tợn kết hợp đỏ máu.  
  * **Kỹ năng phe:** *Nuốt Chửng & Càn Quét* — Cho phép người chơi Phe Địch tung ra các đòn đánh sát thương cao, cướp bóc Trang bị (Vũ khí, Lương thực) của đối phương. Tuy nhiên, nếu không dứt điểm nhanh, Thao Thiết sẽ tự chịu tác dụng phụ từ sự "háo chiến" của chính mình.

### **3\. Phe Độc Lập: CỬU VĨ HỒ (Linh Cáo Biến Ảo / 2 Mặt)**

![][image4]

* **Ứng dụng vào Thẻ Bài & Lối chơi (Game Mechanics):**  
  * **Thần thái minh họa:** Nét vẽ bí ẩn, 9 chiếc đuôi lấp lánh như sương khói, tông màu tím huyền ảo hoặc bạc nắng.  
  * **Kỹ năng phe:** *Mưu Lược & Biến Hình* — Cho phép người chơi tráo đổi vị trí thẻ bài, giả dạng đồng minh, đặt bẫy Mưu lược, hoặc "quay xe" bắt tay với phe yếu hơn để duy trì thế cân bằng trên bàn cờ, mưu cầu chiến thắng đơn độc.

*(Phương án dự phòng cho Phe Độc Lập: **Thần Kim Quy** — Đại diện cho Quy luật khách quan/Thiên mệnh: giúp dựng thành \[bên Thiện\] nhưng sẵn sàng trảm Mị Châu \[trừng phạt sai lầm\] rồi rút về biển sâu).*

## **ĐỊNH HƯỚNG MỸ THUẬT & TÍNH ĐỒNG BỘ THẺ BÀI** 

Để bộ Thẻ Phe tương thích hoàn hảo với thiết kế đồ họa thuần Việt và mã QR số hóa trên hệ thống *SỬ TỰ*:

* **Màu sắc nhận diện thẻ:**  
  * **Phe Ta:** Tông vàng kim / xanh lam sông núi (*Mộc / Thủy*) — Tạo cảm giác chính thống, bền vững, bao la.  
  * **Phe Địch:** Tông đỏ thẫm / xám đen (*Hỏa / Thổ*) — Tạo cảm giác áp đảo, cuồng bạo, chiến tranh.  
  * **Phe Độc Lập:** Tông tím thạch anh / bạc huyền ảo (*Kim / Khí*) — Tạo cảm giác bí ẩn, khó đoán, khó lường.  
* **Khung viền thẻ bài (Border Design):** Sử dụng hoa văn mây sóng thời Lý-Trần cho Phe Ta, hoa văn hung thú đao thương cho Phe Địch, và hoa văn sương khói ma mị cho Phe Độc Lập.