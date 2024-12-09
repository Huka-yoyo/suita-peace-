// フォームが送信されたときのイベントを処理
document.getElementById("answer-form").addEventListener("submit", function (e) {
    e.preventDefault(); // デフォルトのフォーム送信動作を防止
  
    const userInput = document.getElementById("answer-input").value.trim(); // ユーザー入力の値を取得
    const correctAnswer = "あんのんぶじ"; // 正解の文字
  
    // 結果表示エリア
    const resultMessage = document.getElementById("result-message");
    const correctMessage = resultMessage.querySelector(".correct");
    const incorrectMessage = resultMessage.querySelector(".incorrect");
  
    // 一旦結果メッセージを非表示
    correctMessage.classList.add("hidden");
    incorrectMessage.classList.add("hidden");
  
    // 入力された答えを判定
    if (userInput === correctAnswer) {
      correctMessage.classList.remove("hidden"); // 正解メッセージを表示
    } else {
      incorrectMessage.classList.remove("hidden"); // 不正解メッセージを表示
    }
  });
  
