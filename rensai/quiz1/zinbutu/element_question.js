(function ($) {
  'use strict';
 
  //合計出題問題数
  let $questionTotalNum = 1;
 
  // セキュリティクイズの問題文と選択肢（answer01が正答)------------------------------------------------------------------
  const prefecturalCapital = [
    {
      id: "01",
      question: "“Peace begins with a smile.”(「平和は微笑みから始まります」)という発言を残したオスマン帝国(現トルコ共和国)出身のカトリック教会の修道士は誰？",
      answer01: "マザー・テレサ",
      answer02: "ジョン・フィッツジェラルド・ケネディ",
      answer03: "マハトマ・ガンディー",
      answer04: "スリ・ジャヤワルダナプラ・コッテ",
    },
  ];
//  -----------------------------------------------------------------------------------------------------------------

  //問題のID一覧の配列 問題を追加したらIDを増やす
  let quizId = ["01"];
 
  //現在の質問数
  let $currentNum = 0;
 
  //1問正解で貰える得点の設定
  // 1問10点で計算
  let $pointPerCorrect = 10;
 
  let questionObject = (function () {
    let Obj = function ($target) {
 
      //質問の番号
      this.$questionNumber = $target.find('.quiz-question-number');
 
      //質問文
      this.$questionName = $target.find('.quiz-question');
 
      //選択肢ボタン
      this.$questionButton = $target.find('.quiz-button');
      this.$button01 = $target.find('.button01');
      this.$button02 = $target.find('.button02');
      this.$button03 = $target.find('.button03');
      this.$button04 = $target.find('.button04');
 
      //選択肢のテキスト
      this.$answer01 = $target.find('.quiz-text01');
      this.$answer02 = $target.find('.quiz-text02');
      this.$answer03 = $target.find('.quiz-text03');
      this.$answer04 = $target.find('.quiz-text04');
      
 
      //score
      this.$score = $target.find('.score-wrap .score');
 
      this.init();
    };
    Obj.prototype = {
      //初回設定
      init: function () {

        //イベント登録
        this.event();
      },
      event: function () {
        let _this = this;
        let score = 0;
 
        //ウインドウ読み込み時
        $(window).on('load', function () {
          //value取得
          let value = quizId[$currentNum]; //最初は0（1番目）
          //次の質問を取得
          let nextQuestion = _this.searchQuestion(value);
          //次の質問に切り替える
          _this.changeQuestion(nextQuestion);
          //回答のシャッフル
          _this.shuffleAnswer($('.quiz-answer'));
        });
 
        //button クリック
        this.$questionButton.on("click", function () {
 
          if ($(this).hasClass('button01')) {
            $(this).parents('.quiz-answer').addClass('is-correct');
            
            score = score + $pointPerCorrect;
          } else {
            $(this).parents('.quiz-answer').addClass('is-incorrect');
            $('.detail').addClass('is-show');
            //$('.score-wrap .score').text(score);
          }
 
          $(this).addClass('is-checked');
 
          if ($currentNum + 1 == $questionTotalNum) {
            setTimeout(function () {
              $('.finish').addClass('is-show');
              $('.score-wrap .score').text(score);
            }, 1000);
          } else {
            setTimeout(function () {
              //現在の数字の更新
              $currentNum = $currentNum + 1;
 
              //次の質問番号を取得
              let value = quizId[$currentNum];
 
              //次の質問を取得
              let nextQuestion = _this.searchQuestion(value);
 
              //次の質問に切り替える
              _this.changeQuestion(nextQuestion);
 
              //クラスを取る
              _this.$questionButton.removeClass('is-checked');
              $('.quiz-answer').removeClass('is-correct').removeClass('is-incorrect');
 
              //回答のシャッフル
              _this.shuffleAnswer($('.quiz-answer'));
 
            }, 1000);
          }
          return false;
        });
      },
      searchQuestion: function (questionId) {
        let nextQuestion = null;
        prefecturalCapital.forEach(function (item) {
          if (item.id == questionId) {
            nextQuestion = item;
          }
        });
        return nextQuestion;
      },
      changeQuestion: function (nextQuestion) {
        let _this = this;
 
        //質問文の入れ替え
        _this.$questionName.text(nextQuestion.question);
 
        //質問番号を1つ増やす
        let numPlusOne = $currentNum + 1;
        _this.$questionNumber.text('質問' + numPlusOne);
 
        //選択肢のテキストの入れ替え
        _this.$answer01.text(nextQuestion.answer01);
        _this.$answer02.text(nextQuestion.answer02);
        _this.$answer03.text(nextQuestion.answer03);
        _this.$answer04.text(nextQuestion.answer04);
      },
      shuffleAnswer: function (container) {
        let content = container.find("> *");
        let total = content.length;
        content.each(function () {
          content.eq(Math.floor(Math.random() * total)).prependTo(container);
        });
      },
    };
    return Obj;
  })();
 
  let quiz = $('.quiz');
  if (quiz[0]) {
    let queInstance = new questionObject(quiz);
  }
 
})(jQuery);