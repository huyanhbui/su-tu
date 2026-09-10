// Khởi tạo Firebase. Các khoá dưới đây là khoá CÔNG KHAI — Firebase thiết kế như vậy:
// chúng chỉ nói "đây là dự án nào", không cấp quyền gì cả. An toàn của dữ liệu nằm ở
// Security Rules (file firestore.rules), không nằm ở việc giấu khoá này.
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDBmS_3CJXROs2Za7Yqrsvb185ozkrOQHQ",
  authDomain: "ky-hung-dat-viet.firebaseapp.com",
  projectId: "ky-hung-dat-viet",
  storageBucket: "ky-hung-dat-viet.firebasestorage.app",
  messagingSenderId: "338158332730",
  appId: "1:338158332730:web:e6fc644b4fa723787a3e03",
};

export const app = initializeApp(config);

// persistentLocalCache: Firestore giữ một bản sao dữ liệu ngay trên máy học sinh.
// Nhờ đó ứng dụng vẫn chạy khi mất mạng và tự đồng bộ khi có mạng lại —
// đây là lớp phòng thủ cho tình huống wifi hội trường chập chờn hôm thi.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const auth = getAuth(app);

/** Đăng nhập ẩn danh: cấp một mã thiết bị ổn định, KHÔNG kèm thông tin cá nhân nào. */
export function ensureSignedIn() {
  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(
      auth,
      (user) => {
        if (user) { stop(); resolve(user.uid); }
        else signInAnonymously(auth).catch(reject);
      },
      reject
    );
  });
}

/**
 * Bỏ danh tính hiện tại, cấp một mã thiết bị hoàn toàn mới.
 *
 * Cần cho hai tình huống có thật: máy dùng chung để demo trước ban giám khảo,
 * và học sinh muốn làm lại từ đầu. Tài khoản ẩn danh cũ bị bỏ lại — không sao,
 * nó vốn không gắn với con người nào.
 */
export async function newAnonymousIdentity() {
  await signOut(auth);
  const { user } = await signInAnonymously(auth);
  return user.uid;
}
