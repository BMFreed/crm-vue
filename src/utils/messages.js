export default function messages(page) {
  const messageList = {
    logout: "Вы вышли из системы"
  };
  if (messageList[page.$route.query.message]) {
    page.$message(messageList[page.$route.query.message]);
  }
}
