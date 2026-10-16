// ==========================================
// 英検3級 合格クエスト 〜新たなる冒険〜
// マスターデータ定義ファイル② (data_exam.js)
// [収録] リスニング / 長文読解 / ライティング / 二次面接 / 過去問ボス
// ==========================================

// ==================== 1. 英検3級 リスニング問題 (対話・アナウンス 全15問) ====================
const RAW_LISTENING_DATA = [
  {
    id: "l_0",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["At 10:00.", "At 10:30.", "At 11:00.", "At 11:30."],
    ans: 2,
    explain: "【会話】\nBoy: Excuse me. Does the next bus to the city museum leave at ten thirty?\nWoman: No, that bus has already left. The next one leaves at eleven o'clock.\n\n【訳】\n男子: すみません。市立博物館行きの次のバスは10時半に出ますか？\n女性: いいえ、そのバスはもう出ました。次は11時に出発します。\n\n【質問】What time does the next bus leave?（次のバスは何時に出ますか？）\n【正解】3. 11時に。",
    dialogue: [
      { speaker: 'male', text: "Excuse me. Does the next bus to the city museum leave at ten thirty?" },
      { speaker: 'female', text: "No, that bus has already left. The next one leaves at eleven o'clock." },
      { speaker: 'narrator', text: "Question. What time does the next bus leave?" }
    ],
    audio_complete: "What time does the next bus leave? At 11:00."
  },
  {
    id: "l_1",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["Go to the movies.", "Study for a math test.", "Visit her grandmother.", "Clean her room."],
    ans: 1,
    explain: "【会話】\nBoy: Hi, Sarah. Would you like to go to the movies with me this Sunday?\nGirl: I'd love to, but I have a big math test on Monday. I have to study at home.\n\n【訳】\n男子: やあ、サラ。今度の日曜日に一緒に映画に行かない？\n女子: ぜひ行きたいんだけど、月曜日に大事な数学のテストがあるの。家で勉強しなきゃいけないわ。\n\n【質問】What will Sarah do this Sunday?（サラは今度の日曜日に何をしますか？）\n【正解】2. 数学のテストのために勉強する。",
    dialogue: [
      { speaker: 'male', text: "Hi, Sarah. Would you like to go to the movies with me this Sunday?" },
      { speaker: 'female', text: "I'd love to, but I have a big math test on Monday. I have to study at home." },
      { speaker: 'narrator', text: "Question. What will Sarah do this Sunday?" }
    ],
    audio_complete: "What will Sarah do this Sunday? Study for a math test."
  },
  {
    id: "l_2",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["A T-shirt.", "A wallet.", "A necktie.", "A coffee cup."],
    ans: 3,
    explain: "【会話】\nGirl: Dad's birthday is coming soon. Have you bought a present for him yet?\nBoy: Not yet. I was thinking of buying a necktie, but Mom said he wants a new coffee cup.\nGirl: Then let's buy that together!\n\n【訳】\n女子: お父さんの誕生日がもうすぐね。もうプレゼントは買った？\n男子: まだだよ。ネクタイを買おうと思っていたんだけど、お母さんが新しいコーヒーカップを欲しがっているって言っていたよ。\n女子: じゃあ、それを一緒に買いましょう！\n\n【質問】What are they going to buy for their father?（彼らは父に何を買う予定ですか？）\n【正解】4. コーヒーカップ。",
    dialogue: [
      { speaker: 'female', text: "Dad's birthday is coming soon. Have you bought a present for him yet?" },
      { speaker: 'male', text: "Not yet. I was thinking of buying a necktie, but Mom said he wants a new coffee cup." },
      { speaker: 'female', text: "Then let's buy that together!" },
      { speaker: 'narrator', text: "Question. What are they going to buy for their father?" }
    ],
    audio_complete: "What are they going to buy for their father? A coffee cup."
  },
  {
    id: "l_3",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["Once a week.", "Twice a week.", "Three times a week.", "Every day."],
    ans: 1,
    explain: "【会話】\nGirl: You are very good at swimming, Ken. Do you practice every day?\nBoy: No. I go to the swimming club only on Tuesdays and Fridays.\n\n【訳】\n女子: ケンは水泳がとても上手ね。毎日練習しているの？\n男子: ううん。スイミングクラブに行くのは火曜日と金曜日だけだよ。\n\n【質問】How often does Ken go to the swimming club?（ケンはどのくらいの頻度でスイミングクラブに通っていますか？）\n【正解】2. 週に2回（火曜と金曜）。",
    dialogue: [
      { speaker: 'female', text: "You are very good at swimming, Ken. Do you practice every day?" },
      { speaker: 'male', text: "No. I go to the swimming club only on Tuesdays and Fridays." },
      { speaker: 'narrator', text: "Question. How often does Ken go to the swimming club?" }
    ],
    audio_complete: "How often does Ken go to the swimming club? Twice a week."
  },
  {
    id: "l_4",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["In the classroom.", "In the library.", "In the gym.", "In the music room."],
    ans: 2,
    explain: "【会話】\nBoy: Are we going to have the school meeting in our classroom today?\nGirl: No. Our teacher said it will be held in the gym because a famous pianist will come and talk to us.\n\n【訳】\n男子: 今日の全校集会は教室であるのかな？\n女子: ううん。有名なピアニストが来てお話をしてくれるから、体育館で行われるって先生が言っていたよ。\n\n【質問】Where will the school meeting be held?（集会はどこで開かれますか？）\n【正解】3. 体育館で。",
    dialogue: [
      { speaker: 'male', text: "Are we going to have the school meeting in our classroom today?" },
      { speaker: 'female', text: "No. Our teacher said it will be held in the gym because a famous pianist will come and talk to us." },
      { speaker: 'narrator', text: "Question. Where will the school meeting be held?" }
    ],
    audio_complete: "Where will the school meeting be held? In the gym."
  },
  {
    id: "l_5",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["By train.", "By bus.", "By bike.", "By car."],
    ans: 3,
    explain: "【会話】\nMan: Did you take the train to the concert last night, Lisa?\nGirl: I wanted to, but it was raining heavily, so my father drove me there.\n\n【訳】\n男性: リサ、昨夜は電車でコンサートに行ったのかい？\n女子: そうしたかったんだけど、雨が激しく降っていたから、お父さんが車で送ってくれたの。\n\n【質問】How did Lisa go to the concert?（リサはどうやってコンサートへ行きましたか？）\n【正解】4. 車で（drove me there）。",
    dialogue: [
      { speaker: 'male', text: "Did you take the train to the concert last night, Lisa?" },
      { speaker: 'female', text: "I wanted to, but it was raining heavily, so my father drove me there." },
      { speaker: 'narrator', text: "Question. How did Lisa go to the concert?" }
    ],
    audio_complete: "How did Lisa go to the concert? By car."
  },
  {
    id: "l_6",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["For two years.", "For three years.", "For five years.", "For ten years."],
    ans: 2,
    explain: "【会話】\nBoy: Your dog is so cute, Meg! How long have you had him?\nGirl: We got him when I was ten, and I'm fifteen now. So we've had him for five years.\n\n【訳】\n男子: 君の犬はとても可愛いね、メグ！どのくらい飼っているの？\n女子: 私が10歳の時に飼い始めて、今は15歳よ。だから5年間飼っているわ。\n\n【質問】How long has Meg had her dog?（メグはどのくらい犬を飼っていますか？）\n【正解】3. 5年間。",
    dialogue: [
      { speaker: 'male', text: "Your dog is so cute, Meg! How long have you had him?" },
      { speaker: 'female', text: "We got him when I was ten, and I'm fifteen now. So we've had him for five years." },
      { speaker: 'narrator', text: "Question. How long has Meg had her dog?" }
    ],
    audio_complete: "How long has Meg had her dog? For five years."
  },
  {
    id: "l_7",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["A doctor.", "A chef.", "A pilot.", "A tour guide."],
    ans: 1,
    explain: "【英文】\nTom loves cooking for his family. After he graduates from high school, he wants to go to France to learn how to make French food and become a famous chef.\n\n【訳】\nトムは家族に料理を作るのが大好きです。高校を卒業したら、フランス料理の作り方を学んで有名なシェフになるためにフランスへ行きたいと思っています。\n\n【質問】What does Tom want to be in the future?（トムは将来何になりたいですか？）\n【正解】2. シェフ（料理人）。",
    dialogue: [
      { speaker: 'male', text: "Tom loves cooking for his family. After he graduates from high school, he wants to go to France to learn how to make French food and become a famous chef." },
      { speaker: 'narrator', text: "Question. What does Tom want to be in the future?" }
    ],
    audio_complete: "What does Tom want to be in the future? A chef."
  },
  {
    id: "l_8",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["On the first floor.", "On the second floor.", "On the third floor.", "On the fourth floor."],
    ans: 2,
    explain: "【英文】\nWelcome to Star Department Store. Today, we are having a big winter sale. Men's clothes are on the second floor, and children's toys are on the third floor.\n\n【訳】\nスターデパートへようこそ。本日は冬のビッグセールを開催中です。紳士服は2階、子供のおもちゃは3階にございます。\n\n【質問】Where can customers buy children's toys?（子供のおもちゃはどこで買えますか？）\n【正解】3. 3階で。",
    dialogue: [
      { speaker: 'female', text: "Welcome to Star Department Store. Today, we are having a big winter sale. Men's clothes are on the second floor, and children's toys are on the third floor." },
      { speaker: 'narrator', text: "Question. Where can customers buy children's toys?" }
    ],
    audio_complete: "Where can customers buy children's toys? On the third floor."
  },
  {
    id: "l_9",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["Because she lost her ticket.", "Because the train was delayed.", "Because she woke up late.", "Because she helped an old woman."],
    ans: 3,
    explain: "【英文】\nYesterday morning, Yumi left home early to catch the eight o'clock train. On her way to the station, she saw an old woman carrying a heavy bag, so Yumi helped her. Because of that, Yumi missed the train.\n\n【訳】\n昨日の朝、ユミは8時の電車に乗るため早く家を出ました。駅へ向かう途中、重い荷物を持ったおばあさんを見かけたので手伝いました。そのため、ユミは電車に乗り遅れました。\n\n【質問】Why did Yumi miss the train?（なぜユミは電車に乗り遅れましたか？）\n【正解】4. おばあさんを手伝ったから。",
    dialogue: [
      { speaker: 'female', text: "Yesterday morning, Yumi left home early to catch the eight o'clock train. On her way to the station, she saw an old woman carrying a heavy bag, so Yumi helped her. Because of that, Yumi missed the train." },
      { speaker: 'narrator', text: "Question. Why did Yumi miss the train?" }
    ],
    audio_complete: "Why did Yumi miss the train? Because she helped an old woman."
  },
  {
    id: "l_10",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["Bring their own lunch.", "Wear school uniforms.", "Meet at the bus stop at 9:00.", "Pay 500 yen for the bus."],
    ans: 0,
    explain: "【英文】\nAttention, students. Tomorrow we will go hiking at Green Mountain. Please meet in front of the school gate at eight thirty. There are no restaurants on the mountain, so don't forget to bring your own lunch.\n\n【訳】\n生徒の皆さん、聞いてください。明日はグリーンマウンテンへハイキングに行きます。8時半に校門の前に集合してください。山にはレストランがないので、必ず自分のお弁当を持ってきてください。\n\n【質問】What do the students have to do tomorrow?（生徒たちは明日何をしなければなりませんか？）\n【正解】1. 自分のお弁当を持参すること。",
    dialogue: [
      { speaker: 'male', text: "Attention, students. Tomorrow we will go hiking at Green Mountain. Please meet in front of the school gate at eight thirty. There are no restaurants on the mountain, so don't forget to bring your own lunch." },
      { speaker: 'narrator', text: "Question. What do the students have to do tomorrow?" }
    ],
    audio_complete: "What do the students have to do tomorrow? Bring their own lunch."
  },
  {
    id: "l_11",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["Playing video games.", "Taking pictures of birds.", "Climbing high mountains.", "Collecting old stamps."],
    ans: 1,
    explain: "【英文】\nWhen Mr. Green was young, he liked climbing mountains. However, he hurt his knee three years ago. Now, he enjoys walking in the park and taking pictures of wild birds.\n\n【訳】\nグリーンさんは若い頃、山登りが好きでした。しかし3年前に膝を痛めました。現在、彼は公園を歩いて野鳥の写真を撮ることを楽しんでいます。\n\n【質問】What does Mr. Green enjoy doing now?（グリーンさんは今、何をして楽しんでいますか？）\n【正解】2. 鳥の写真を撮ること。",
    dialogue: [
      { speaker: 'male', text: "When Mr. Green was young, he liked climbing mountains. However, he hurt his knee three years ago. Now, he enjoys walking in the park and taking pictures of wild birds." },
      { speaker: 'narrator', text: "Question. What does Mr. Green enjoy doing now?" }
    ],
    audio_complete: "What does Mr. Green enjoy doing now? Taking pictures of birds."
  },
  {
    id: "l_12",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第2部】対話リスニング",
    opt: ["10 dollars.", "15 dollars.", "20 dollars.", "30 dollars."],
    ans: 1,
    explain: "【会話】\nBoy: Excuse me, how much is this blue cap?\nWoman: It is usually twenty dollars, but it's on sale today for fifteen dollars.\nBoy: Great! I'll take it.\n\n【訳】\n男子: すみません、この青い帽子はいくらですか？\n女性: 普段は20ドルですが、今日はセールで15ドルですよ。\n男子: やった！それを買います。\n\n【質問】How much will the boy pay for the cap?（男の子は帽子にいくら払いますか？）\n【正解】2. 15ドル。",
    dialogue: [
      { speaker: 'male', text: "Excuse me, how much is this blue cap?" },
      { speaker: 'female', text: "It is usually twenty dollars, but it's on sale today for fifteen dollars." },
      { speaker: 'male', text: "Great! I'll take it." },
      { speaker: 'narrator', text: "Question. How much will the boy pay for the cap?" }
    ],
    audio_complete: "How much will the boy pay for the cap? 15 dollars."
  },
  {
    id: "l_13",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["On Monday.", "On Wednesday.", "On Friday.", "On Saturday."],
    ans: 2,
    explain: "【英文】\nHi, this is Kevin. I borrowed a science book from the library last Monday. I have to return it by this Friday, so I'm reading it every night.\n\n【訳】\nやあ、ケビンです。先週の月曜日に図書館から科学の本を借りました。今週の金曜日までに返さなければならないので、毎晩読んでいます。\n\n【質問】When does Kevin have to return the book?（ケビンはいつまでに本を返さなければなりませんか？）\n【正解】3. 金曜日に。",
    dialogue: [
      { speaker: 'male', text: "Hi, this is Kevin. I borrowed a science book from the library last Monday. I have to return it by this Friday, so I'm reading it every night." },
      { speaker: 'narrator', text: "Question. When does Kevin have to return the book?" }
    ],
    audio_complete: "When does Kevin have to return the book? On Friday."
  },
  {
    id: "l_14",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【3級 第3部】短文・アナウンス",
    opt: ["A free drink.", "A special towel.", "A discount ticket.", "A music CD."],
    ans: 1,
    explain: "【英文】\nThank you for coming to the City Sports Festival! People who finish the five-kilometer run will receive a special sports towel at the goal gate.\n\n【訳】\nシティ・スポーツフェスティバルへようこそ！5キロランを完走した方には、ゴールゲートで特製スポーツタオルをプレゼントします。\n\n【質問】What will people get if they finish the run?（完走した人は何がもらえますか？）\n【正解】2. 特製タオル。",
    dialogue: [
      { speaker: 'female', text: "Thank you for coming to the City Sports Festival! People who finish the five-kilometer run will receive a special sports towel at the goal gate." },
      { speaker: 'narrator', text: "Question. What will people get if they finish the run?" }
    ],
    audio_complete: "What will people get if they finish the run? A special towel."
  }
];

// ==================== 2. 長文読解ダンジョン (古文書解読 全12問) ====================
const RAW_READING_DATA = [
  {
    id: "r_0",
    passageTitle: "📜 【掲示】Summer Tennis Camp (夏のテニスキャンプ)",
    passage: "Do you want to improve your tennis skills this summer?\nJoin our Summer Tennis Camp at Green Park!\n\nDate: August 10th to August 12th\nTime: 9:00 a.m. – 12:00 p.m.\nFee: $30 for students ($20 if you sign up before July 20th)\n\nPlease bring your own racket, a towel, and a bottle of water. If it rains, we will practice in the city gym next to the park.",
    highlight: "$20 if you sign up before July 20th",
    q: "How much does a student pay if he or she signs up on July 15th?",
    sub: "【質問】7月15日に申し込んだ場合、生徒の参加費はいくらになりますか？\n（🔍ルーペで答えの根拠が光ります！）",
    options: ["$10.", "$12.", "$20.", "$30."],
    ans: 2,
    explain: "【解説】本文に「$20 if you sign up before July 20th（7月20日前に申し込めば20ドル）」と書かれています。7月15日は7月20日より前なので $20 が正解です。",
    audio_complete: "How much does a student pay if he or she signs up on July 15th? 20 dollars."
  },
  {
    id: "r_1",
    passageTitle: "📜 【掲示】Summer Tennis Camp (夏のテニスキャンプ)",
    passage: "Do you want to improve your tennis skills this summer?\nJoin our Summer Tennis Camp at Green Park!\n\nDate: August 10th to August 12th\nTime: 9:00 a.m. – 12:00 p.m.\nFee: $30 for students ($20 if you sign up before July 20th)\n\nPlease bring your own racket, a towel, and a bottle of water. If it rains, we will practice in the city gym next to the park.",
    highlight: "If it rains, we will practice in the city gym next to the park.",
    q: "What will they do if it rains during the camp?",
    sub: "【質問】キャンプ中に雨が降った場合、どうしますか？",
    options: ["Cancel the camp.", "Practice in the city gym.", "Watch tennis videos.", "Change the date to August 20th."],
    ans: 1,
    explain: "【解説】最後の文に「If it rains, we will practice in the city gym next to the park.（雨なら公園の隣の市立体育館で練習します）」とあります。",
    audio_complete: "What will they do if it rains during the camp? Practice in the city gym."
  },
  {
    id: "r_2",
    passageTitle: "📜 【案内】City Library Renovation (市立図書館のお知らせ)",
    passage: "Notice to All Library Users\n\nMaple City Library will be closed from October 1st to October 15th because we will repair the roof and put in new computers. During this period, you cannot enter the building.\n\nIf you want to return books while the library is closed, please put them in the return box near the main entrance. The library will open again on October 16th at 9:30 a.m.",
    highlight: "because we will repair the roof and put in new computers.",
    q: "Why will Maple City Library be closed in October?",
    sub: "【質問】なぜメイプル市立図書館は10月に休館するのですか？",
    options: ["To buy more books.", "To repair the roof and put in new computers.", "To clean the return box.", "To move to a new building."],
    ans: 1,
    explain: "【解説】第1段落に「because we will repair the roof and put in new computers（屋根の修理と新しいコンピュータの導入を行うため）」とあります。",
    audio_complete: "Why will Maple City Library be closed in October? To repair the roof and put in new computers."
  },
  {
    id: "r_3",
    passageTitle: "📜 【Eメール】From: Becky / To: Aunt Kate",
    passage: "Dear Aunt Kate,\n\nThank you very much for the wonderful birthday present! The blue sweater you sent me is so warm and cute. I wore it to school yesterday, and my best friend Emma said it looked great on me.\n\nNext month, my parents and I are going to visit your town. I have not seen you since last Christmas, so I am really looking forward to seeing you again!\n\nBest wishes,\nBecky",
    highlight: "The blue sweater you sent me is so warm and cute.",
    q: "What did Aunt Kate send to Becky for her birthday?",
    sub: "【質問】ケイトおばさんはベッキーの誕生日に何を送りましたか？",
    options: ["A Christmas card.", "A blue sweater.", "A cute bag.", "A picture of Emma."],
    ans: 1,
    explain: "【解説】第1段落の2文目に「The blue sweater you sent me is so warm and cute.（あなたが送ってくれた青いセーターはとても暖かくて可愛いです）」と書かれています。",
    audio_complete: "What did Aunt Kate send to Becky for her birthday? A blue sweater."
  },
  {
    id: "r_4",
    passageTitle: "📜 【Eメール】From: Becky / To: Aunt Kate",
    passage: "Dear Aunt Kate,\n\nThank you very much for the wonderful birthday present! The blue sweater you sent me is so warm and cute. I wore it to school yesterday, and my best friend Emma said it looked great on me.\n\nNext month, my parents and I are going to visit your town. I have not seen you since last Christmas, so I am really looking forward to seeing you again!\n\nBest wishes,\nBecky",
    highlight: "Next month, my parents and I are going to visit your town.",
    q: "When will Becky visit Aunt Kate's town?",
    sub: "【質問】ベッキーはいつケイトおばさんの街を訪れる予定ですか？",
    options: ["Yesterday.", "This weekend.", "Next month.", "At Christmas."],
    ans: 2,
    explain: "【解説】第2段落の最初に「Next month, my parents and I are going to visit your town.（来月、両親と私はあなたの街を訪れる予定です）」とあります。",
    audio_complete: "When will Becky visit Aunt Kate's town? Next month."
  },
  {
    id: "r_5",
    passageTitle: "📜 【Eメール】School Science Fair (科学フェアの準備)",
    passage: "Hi David,\n\nHow is our poster for the School Science Fair going? I finished writing the report about solar energy last night. I printed some photos of solar panels at my uncle's house because our printer at home was broken.\n\nCan we meet at the school library after class tomorrow to put the photos on the poster?\n\nSee you,\nKen",
    highlight: "I printed some photos of solar panels at my uncle's house because our printer at home was broken.",
    q: "Why did Ken go to his uncle's house?",
    sub: "【質問】なぜケンはおじさんの家に行きましたか？",
    options: ["To take photos of solar panels.", "To use his uncle's printer.", "To ask his uncle about science.", "To borrow some books."],
    ans: 1,
    explain: "【解説】家のプリンターが壊れていたため、おじさんの家で写真を印刷した（printed some photos ... at my uncle's house）と述べています。",
    audio_complete: "Why did Ken go to his uncle's house? To use his uncle's printer."
  },
  {
    id: "r_6",
    passageTitle: "📜 【物語・説明文】The History of Potatoes (ジャガイモの歴史)",
    passage: "Today, potatoes are eaten all over the world. People enjoy them as french fries, potato chips, and in soups. However, when potatoes were first brought to Europe from South America in the 16th century, many Europeans were afraid to eat them.\n\nAt that time, some people believed that potatoes caused diseases. So, for a long time, potatoes were grown mostly as food for farm animals. Later, people learned that potatoes were safe, cheap, and nutritious. They became one of the most important foods in Europe.",
    highlight: "when potatoes were first brought to Europe from South America in the 16th century",
    q: "Where did potatoes come from before they were brought to Europe?",
    sub: "【質問】ジャガイモがヨーロッパに持ち込まれる前、どこから来ましたか？",
    options: ["North America.", "South America.", "Asia.", "Africa."],
    ans: 1,
    explain: "【解説】第1段落に「brought to Europe from South America（南米からヨーロッパへ持ち込まれた）」とあります。",
    audio_complete: "Where did potatoes come from before they were brought to Europe? South America."
  },
  {
    id: "r_7",
    passageTitle: "📜 【物語・説明文】The History of Potatoes (ジャガイモの歴史)",
    passage: "Today, potatoes are eaten all over the world. People enjoy them as french fries, potato chips, and in soups. However, when potatoes were first brought to Europe from South America in the 16th century, many Europeans were afraid to eat them.\n\nAt that time, some people believed that potatoes caused diseases. So, for a long time, potatoes were grown mostly as food for farm animals. Later, people learned that potatoes were safe, cheap, and nutritious. They became one of the most important foods in Europe.",
    highlight: "some people believed that potatoes caused diseases.",
    q: "Why were many Europeans afraid to eat potatoes at first?",
    sub: "【質問】なぜ当初、多くのヨーロッパ人はジャガイモを食べるのを恐れたのですか？",
    options: ["Because they were too expensive.", "Because they tasted very bad.", "Because some people thought they caused diseases.", "Because farm animals ate all of them."],
    ans: 2,
    explain: "【解説】第2段落の最初に「some people believed that potatoes caused diseases（ジャガイモが病気を引き起こすと信じる人々がいた）」と書かれています。",
    audio_complete: "Why were many Europeans afraid to eat potatoes at first? Because some people thought they caused diseases."
  },
  {
    id: "r_8",
    passageTitle: "📜 【説明文】A Special Floating School (水に浮かぶ学校)",
    passage: "In some parts of Bangladesh, heavy rain causes floods every year. During the rainy season, many roads are covered with water, and children cannot walk to school. Because of this problem, a man named Mohammed Rezwan had a great idea in 2002.\n\nHe built \"boat schools\" that float on the rivers. Each boat picks up students from their villages and becomes a classroom. The boats have solar panels on their roofs, so students can use computers and lights even on rainy days.",
    highlight: "many roads are covered with water, and children cannot walk to school.",
    q: "Why couldn't children go to school during the rainy season?",
    sub: "【質問】なぜ雨季の間、子供たちは学校へ行けなかったのですか？",
    options: ["Because there were no teachers.", "Because the schools were too far.", "Because many roads were covered with water.", "Because they had to work on boats."],
    ans: 2,
    explain: "【解説】第1段落に「many roads are covered with water, and children cannot walk to school（多くの道路が水に覆われ、歩いて通学できない）」とあります。",
    audio_complete: "Why couldn't children go to school during the rainy season? Because many roads were covered with water."
  },
  {
    id: "r_9",
    passageTitle: "📜 【説明文】A Special Floating School (水に浮かぶ学校)",
    passage: "In some parts of Bangladesh, heavy rain causes floods every year. During the rainy season, many roads are covered with water, and children cannot walk to school. Because of this problem, a man named Mohammed Rezwan had a great idea in 2002.\n\nHe built \"boat schools\" that float on the rivers. Each boat picks up students from their villages and becomes a classroom. The boats have solar panels on their roofs, so students can use computers and lights even on rainy days.",
    highlight: "The boats have solar panels on their roofs, so students can use computers and lights",
    q: "How do the boat schools get electricity for computers and lights?",
    sub: "【質問】ボートの学校はどのようにしてコンピュータや照明の電気を得ていますか？",
    options: ["From solar panels on their roofs.", "From the village stations.", "From wind power.", "From big batteries brought by students."],
    ans: 0,
    explain: "【解説】最終文に「The boats have solar panels on their roofs, so students can use computers and lights（屋根にソーラーパネルがあるのでコンピュータや照明が使える）」とあります。",
    audio_complete: "How do the boat schools get electricity for computers and lights? From solar panels on their roofs."
  },
  {
    id: "r_10",
    passageTitle: "📜 【物語】A Lost Violin (置き忘れたバイオリン)",
    passage: "Miki has played the violin since she was six years old. Last Sunday, she had a concert at the City Hall. She took a train to go there, but when she got off the train, she realized that she had left her violin on the train!\n\nShe hurried to the station office and talked to a station worker. The worker called the next station right away. Twenty minutes later, her violin was found! Thanks to the kind worker, Miki arrived at the hall in time and played very well.",
    highlight: "she realized that she had left her violin on the train!",
    q: "What happened to Miki when she got off the train?",
    sub: "【質問】ミキが電車を降りたとき、何が起きましたか？",
    options: ["She broke her violin.", "She realized she had left her violin on the train.", "She missed the concert.", "She lost her concert ticket."],
    ans: 1,
    explain: "【解説】第1段落の最後に「電車の中にバイオリンを置き忘れたことに気づいた（realized that she had left her violin on the train）」とあります。",
    audio_complete: "What happened to Miki when she got off the train? She realized she had left her violin on the train."
  },
  {
    id: "r_11",
    passageTitle: "📜 【掲示】Green Zoo Night Tour (夜の動物園ツアー)",
    passage: "Have you ever seen animals at night? Many animals sleep during the day and become active after sunset. Come and join our special Night Tour at Green Zoo!\n\nDates: Every Saturday in August\nTime: 7:00 p.m. – 9:00 p.m.\n\nA zoo guide will walk with your group and explain about lions, owls, and bats. Please do not use camera flashes because strong light is bad for the animals' eyes.",
    highlight: "Please do not use camera flashes because strong light is bad for the animals' eyes.",
    q: "What are visitors told NOT to do during the Night Tour?",
    sub: "【質問】ナイトツアーの参加者が「してはいけない」と言われていることは何ですか？",
    options: ["Ask questions to the guide.", "Walk with a group.", "Use camera flashes.", "Look at owls and bats."],
    ans: 2,
    explain: "【解説】最後の文に「Please do not use camera flashes because strong light is bad for the animals' eyes.（強い光は動物の目に悪いため、カメラのフラッシュを使わないでください）」とあります。",
    audio_complete: "What are visitors told NOT to do during the Night Tour? Use camera flashes."
  }
];

// ==================== 3. ライティング魔導書クラフト (英作文＆Eメール 全12問) ====================
const RAW_WRITING_DATA = [
  {
    id: "w_0",
    q: "【QUESTION】Which do you like better, summer or winter?\n（夏と冬、どちらが好きですか？ ➔ 「夏の方が好き＋理由2つ」の導入文を作ろう）",
    sub: "✍️ 3級英作文の黄金テンプレート（主張＋理由が2つある宣言）",
    words: ["I", "like", "summer", "better", "than", "winter.", "I", "have", "two", "reasons."],
    explain: "【3級英作文の鉄則】\n最初に「I like A better than B.」と質問の単語を使って答え、続けて「I have two reasons.（理由は2つあります）」と書くと語数も稼げて構成が完璧になります！",
    audio_question: "Which do you like better, summer or winter?"
  },
  {
    id: "w_1",
    q: "【QUESTION】Why do you like summer?\n（なぜ夏が好きですか？ ➔ 1つ目の理由：家族と海で泳げるから）",
    sub: "✍️ First, を使って1つ目の理由を組み立てよう",
    words: ["First,", "I", "can", "enjoy", "swimming", "in", "the", "sea", "with", "my", "family."],
    explain: "【解説】1つ目の理由は「First, ~」で始めます。「enjoy + ~ing（〜して楽しむ）」は英作文で超使える万能表現です！",
    audio_question: "First, I can enjoy swimming in the sea with my family."
  },
  {
    id: "w_2",
    q: "【QUESTION】Why do you like summer?\n（なぜ夏が好きですか？ ➔ 2つ目の理由：長い夏休みがあるから）",
    sub: "✍️ Second, を使って2つ目の理由を組み立てよう",
    words: ["Second,", "we", "have", "a", "long", "summer", "vacation."],
    explain: "【解説】2つ目の理由は「Second, ~」で始めます。シンプルでミスをしない短文を書くのが高得点のコツです！",
    audio_question: "Second, we have a long summer vacation."
  },
  {
    id: "w_3",
    q: "【QUESTION】Do you want to visit foreign countries in the future?\n（将来、外国を訪れたいですか？ ➔ 「はい」の理由：たくさんの友達を作りたいから）",
    sub: "✍️ First, と want to を使って理由を組み立てよう",
    words: ["First,", "I", "want", "to", "make", "many", "friends", "around", "the", "world."],
    explain: "【解説】「I want to ~（〜したい）」と「make friends（友達を作る）」はどんなトピックにも応用できる便利なフレーズです。",
    audio_question: "First, I want to make many friends around the world."
  },
  {
    id: "w_4",
    q: "【QUESTION】Do you like reading books?\n（本を読むのは好きですか？ ➔ 理由：たくさんの新しいことを学べるから）",
    sub: "✍️ どんなテーマにも使える最強理由フレーズ「多くのことを学べる」",
    words: ["First,", "I", "can", "learn", "many", "new", "things", "from", "books."],
    explain: "【解説】「I can learn many things from ~（〜から多くのことを学べる）」は、読書・旅行・歴史・インターネットなどあらゆる問題で使える魔法の文です！",
    audio_question: "First, I can learn many new things from books."
  },
  {
    id: "w_5",
    q: "【QUESTION】What is your favorite sport?\n（一番好きなスポーツは何ですか？ ➔ 2つ目の理由：健康にとても良いから）",
    sub: "✍️ スポーツ・食べ物・早起きで使える万能理由「健康に良い」",
    words: ["Second,", "playing", "soccer", "is", "very", "good", "for", "my", "health."],
    explain: "【解説】「~ is good for my health.（〜は健康に良い）」も英検3級のライティングで大活躍する鉄板フレーズです！",
    audio_question: "Second, playing soccer is very good for my health."
  },
  {
    id: "w_6",
    q: "【QUESTION】Where do you want to go this weekend?\n（今週末どこへ行きたいですか？ ➔ 理由：買い物をするのにとても便利だから）",
    sub: "✍️ 街・電車・スマホの話題で使える万能理由「とても便利だ」",
    words: ["Second,", "it", "is", "very", "convenient", "to", "go", "shopping", "there."],
    explain: "【解説】「It is convenient to ~（〜するのに便利だ）」を覚えておくと、場所や道具に関する英作文が簡単に書けます。",
    audio_question: "Second, it is very convenient to go shopping there."
  },
  {
    id: "w_7",
    q: "【Eメール問題】友達のAlexから「新しい自転車を買ったよ！」とメールが来ました。\nAlexに「その自転車は何色ですか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：相手に質問する文を作ろう①",
    words: ["What", "color", "is", "your", "new", "bicycle?"],
    explain: "【Eメール対策】相手のメールの下線部について2つ質問する問題では、5W1H（What color / How much / Where / When など）を使ったシンプルな疑問文を作ります。",
    audio_question: "What color is your new bicycle?"
  },
  {
    id: "w_8",
    q: "【Eメール問題】友達のAlexが「自転車で公園へ行った」と書いています。\nAlexに「誰と一緒に公園へ行きましたか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：相手に質問する文を作ろう②",
    words: ["Who", "did", "you", "go", "to", "the", "park", "with?"],
    explain: "【Eメール対策】過去の出来事に対して「誰と行ったの？」と聞く「Who did you go ~ with?」や「How long did you stay there?」はEメール問題で超頻出です！",
    audio_question: "Who did you go to the park with?"
  },
  {
    id: "w_9",
    q: "【Eメール問題】友達のEmmaが「先週末、京都のお寺を訪れた」と書いています。\nEmmaに「どうやって京都へ行きましたか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：交通手段を尋ねる疑問文",
    words: ["How", "did", "you", "go", "to", "Kyoto?"],
    explain: "【Eメール対策】旅行や外出の話題では「How did you go there?（どうやってそこへ行ったの？）」が最も簡単で確実に満点が取れる質問です！",
    audio_question: "How did you go to Kyoto?"
  },
  {
    id: "w_10",
    q: "【QUESTION】Do you often help your parents at home?\n（家でよく親の手伝いをしますか？ ➔ 「はい」：夕食後にお皿を洗う）",
    sub: "✍️ 自分の普段の行動を説明する文を組み立てよう",
    words: ["First,", "I", "always", "wash", "the", "dishes", "after", "dinner."],
    explain: "【解説】お手伝いのトピックでは wash the dishes（皿を洗う）や clean my room（部屋を掃除する）が書きやすくておすすめです。",
    audio_question: "First, I always wash the dishes after dinner."
  },
  {
    id: "w_11",
    q: "【QUESTION】Which do you like better, reading books or watching movies?\n（読書と映画鑑賞、どちらが好き？ ➔ 映画が好き：友達と話すのが楽しいから）",
    sub: "✍️ It is fun to ~（〜するのは楽しい）を使った万能文",
    words: ["Second,", "it", "is", "fun", "to", "talk", "about", "movies", "with", "friends."],
    explain: "【解説】「It is fun to ~（〜するのは楽しい）」は、あらゆる趣味・スポーツ・イベントの理由に使える最強構文です！",
    audio_question: "Second, it is fun to talk about movies with friends."
  }
];

// ==================== 4. スピーキング召喚バトル (二次面接対策 全10問) ====================
const RAW_SPEAKING_DATA = [
  {
    id: "s_0",
    passageTitle: "🎙️ 【二次面接：音読パッセージ①】Cycling (サイクリング)",
    passage: "Cycling is a popular activity for many people.\nToday, many cities have special lanes for bicycles, so people can ride safely.\nAlso, riding a bicycle is very good for our health.",
    q: "Please read the passage aloud.",
    sub: "【音読】パッセージをゆっくり・はっきりと声に出して読もう！",
    targetText: "Cycling is a popular activity for many people. Today, many cities have special lanes for bicycles, so people can ride safely.",
    keywords: ["cycling", "popular", "bicycles", "safely", "health"],
    explain: "【面接のコツ】タイトルから読み始め、ピリオド（.）やコンマ（,）でしっかり区切って、大きな声でゆっくり読むと満点（5点）がもらえます！"
  },
  {
    id: "s_1",
    passageTitle: "🎙️ 【二次面接：No.1 パッセージについての質問】",
    passage: "Cycling is a popular activity for many people.\nToday, many cities have special lanes for bicycles, so people can ride safely.\nAlso, riding a bicycle is very good for our health.",
    q: "Question No.1: According to the passage, why can people ride bicycles safely today?",
    sub: "【No.1 質問】本文によると、なぜ今日人々は安全に自転車に乗ることができますか？（so の前の文を使って Because ~ で答えよう！）",
    targetText: "Because many cities have special lanes for bicycles.",
    keywords: ["because", "cities", "special", "lanes", "bicycles"],
    explain: "【No.1 必勝法】Why ~? と聞かれたら、本文中の「so」の直前にある文を探し、文頭に「Because」をつけてそのまま読めば大正解です！"
  },
  {
    id: "s_2",
    passageTitle: "🎙️ 【二次面接：音読パッセージ②】School Gardens (学校の菜園)",
    passage: "Many schools have their own gardens now.\nStudents grow vegetables such as tomatoes and carrots there.\nBy growing vegetables, students can learn about nature and food.",
    q: "Please read the passage aloud.",
    sub: "【音読】「such as ~（〜のような）」で一息ついてリズムよく読もう！",
    targetText: "Many schools have their own gardens now. Students grow vegetables such as tomatoes and carrots there.",
    keywords: ["schools", "gardens", "vegetables", "tomatoes", "nature"],
    explain: "【面接のコツ】知らない単語があっても止まらずに、堂々とローマ字読みでも言い切る姿勢（アティチュード点）が大切です！"
  },
  {
    id: "s_3",
    passageTitle: "🎙️ 【二次面接：No.1 パッセージについての質問】",
    passage: "Many schools have their own gardens now.\nStudents grow vegetables such as tomatoes and carrots there.\nBy growing vegetables, students can learn about nature and food.",
    q: "Question No.1: According to the passage, how can students learn about nature and food?",
    sub: "【No.1 質問】生徒たちはどのようにして自然と食べ物について学べますか？（By ~ing の部分を声に出そう！）",
    targetText: "By growing vegetables.",
    keywords: ["by", "growing", "vegetables"],
    explain: "【No.1 必勝法】「How can ~?（どうやって〜できますか？）」と聞かれたら、本文の「By ~ing（〜することによって）」の部分を抜き出して答えましょう！"
  },
  {
    id: "s_4",
    passageTitle: "🎙️ 【二次面接：No.2 イラストの人物の行動描写①】",
    passage: "【イラストの状況】\n公園のベンチで、男の子が本を読んでおり、女の子がリンゴを食べています。",
    q: "Question No.2: Look at the picture. What is the boy doing?",
    sub: "【No.2 質問】男の子は何をしていますか？（現在進行形 He is ~ing で答えよう！）",
    targetText: "He is reading a book.",
    keywords: ["reading", "book"],
    explain: "【No.2 必勝法】イラストの人物が今している動作は、必ず現在進行形「He is ~ing. / She is ~ing. / They are ~ing.」で答えます！"
  },
  {
    id: "s_5",
    passageTitle: "🎙️ 【二次面接：No.2 イラストの人物の行動描写②】",
    passage: "【イラストの状況】\nリビングで、お父さんが新聞を読んでおり、お母さんがドアを開けようとしています。",
    q: "Question No.2: What is the woman going to do?",
    sub: "【No.2 質問】女性はこれから何をしようとしていますか？（She is going to ~ で答えよう！）",
    targetText: "She is going to open the door.",
    keywords: ["going", "open", "door"],
    explain: "【No.2・3 必勝法】「What is he/she going to do?（これから何をしようとしていますか？）」には「She is going to ＋ 動詞の原形」で答えます！"
  },
  {
    id: "s_6",
    passageTitle: "🎙️ 【二次面接：No.3 イラストの状況説明】",
    passage: "【イラストの状況】\n男の子のコップがテーブルから落ちて割れてしまったため、男の子が掃除機（またはホウキ）で床を掃除しようとしています。",
    q: "Question No.3: What is the boy going to do?",
    sub: "【No.3 質問】男の子はどうしようとしていますか？（床を掃除しようとしている）",
    targetText: "He is going to clean the floor.",
    keywords: ["going", "clean", "floor"],
    explain: "【解説】「clean the floor（床を掃除する）」「pick up ~（〜を拾う）」「close the window（窓を閉める）」は二次面接のイラスト問題で超頻出です！"
  },
  {
    id: "s_7",
    passageTitle: "🎙️ 【二次面接：No.4 あなた自身への質問①】",
    passage: "面接官がカードを伏せて、あなた自身について質問します。",
    q: "Question No.4: What do you like to do on weekends?",
    sub: "【No.4 質問】週末は何をするのが好きですか？（お手本を声に出して読んでみよう！）",
    targetText: "I like to play soccer with my friends in the park.",
    keywords: ["like", "play", "soccer", "friends", "park"],
    explain: "【No.4 必勝法】「What do you like to do ~?」には「I like to ~」または「I enjoy ~ing」で答えます。2文目を付け足すとさらに高評価です！"
  },
  {
    id: "s_8",
    passageTitle: "🎙️ 【二次面接：No.4 あなた自身への質問②】",
    passage: "面接官があなた自身について質問します。",
    q: "Question No.4: Where would you like to go next summer?",
    sub: "【No.4 質問】来年の夏はどこへ行きたいですか？",
    targetText: "I would like to go to Okinawa to swim in the sea.",
    keywords: ["would", "like", "go", "okinawa", "swim"],
    explain: "【No.4 必勝法】「Where would you like to go?」には「I'd (I would) like to go to 場所 ＋ to 動詞の原形（〜するために）」で答えると完璧です！"
  },
  {
    id: "s_9",
    passageTitle: "🎙️ 【二次面接：No.5 Yes/Noで答える質問】",
    passage: "面接官が最後にあなたにYes/Noの質問をし、続けて Why? / Why not?（または Tell me more.）と尋ねます。",
    q: "Question No.5: Have you ever been to a foreign country? — Yes. Please tell me more.",
    sub: "【No.5 質問】外国へ行ったことはありますか？／もっと詳しく教えてください。",
    targetText: "Yes, I have. I went to Hawaii with my family last year.",
    keywords: ["yes", "have", "went", "hawaii", "family"],
    explain: "【No.5 必勝法】Have you ever ~? にはまず「Yes, I have. / No, I haven't.」と答え、そのあとに過去の体験や「I want to go to America in the future.」などを1文続けましょう！"
  }
];

// ==================== 5. 3級過去問ボスバトル用 総合問題 (全30問) ====================
const ACTUAL_PAST_EXAM_DATA = [
  {
    id: "past_1", type: "grammar",
    q: "My sister has ( ) the piano since she was five years old.",
    sub: "👑 3級過去問ボス (現在完了・継続)",
    options: ["played", "play", "plays", "playing"], ans: 0,
    explain: "【解説】since she was five（5歳の時からずっと）があるため現在完了形〈has ＋ 過去分詞〉にします。\n【訳】妹は5歳の時からずっとピアノを弾いています。",
    audio_question: "My sister has ... the piano since she was five years old.",
    audio_complete: "My sister has played the piano since she was five years old."
  },
  {
    id: "past_2", type: "grammar",
    q: "This famous novel was ( ) by a British writer in 1890.",
    sub: "👑 3級過去問ボス (受動態)",
    options: ["written", "wrote", "write", "writing"], ans: 0,
    explain: "【解説】by a British writer（イギリスの作家によって）があるため受動態〈was ＋ 過去分詞〉にします。write の過去分詞は written です。",
    audio_question: "This famous novel was ... by a British writer in 1890.",
    audio_complete: "This famous novel was written by a British writer in 1890."
  },
  {
    id: "past_3", type: "grammar",
    q: "The man ( ) is standing near the gate is our new principal.",
    sub: "👑 3級過去問ボス (関係代名詞)",
    options: ["who", "which", "whose", "whom"], ans: 0,
    explain: "【解説】先行詞が人（The man）で主語の働きをする主格の関係代名詞 who が正解です。\n【訳】門の近くに立っている男性は、私たちの新しい校長先生です。",
    audio_question: "The man ... is standing near the gate is our new principal.",
    audio_complete: "The man who is standing near the gate is our new principal."
  },
  {
    id: "past_4", type: "grammar",
    q: "Do you know what time ( ) tomorrow?",
    sub: "👑 3級過去問ボス (間接疑問文)",
    options: ["the plane arrives", "does the plane arrive", "arrives the plane", "will the plane arrive"], ans: 0,
    explain: "【解説】間接疑問文では疑問詞（what time）の後ろは〈主語 ＋ 動詞〉の肯定文の語順（the plane arrives）になります。",
    audio_question: "Do you know what time ... tomorrow?",
    audio_complete: "Do you know what time the plane arrives tomorrow?"
  },
  {
    id: "past_5", type: "grammar",
    q: "The soccer game was put ( ) until next Sunday because of the typhoon.",
    sub: "👑 3級過去問ボス (重要熟語)",
    options: ["off", "on", "out", "up"], ans: 0,
    explain: "【解説】put off 〜 で「〜を延期する」という3級最重要熟語です。\n【訳】台風のため、サッカーの試合は次の日曜日まで延期されました。",
    audio_question: "The soccer game was put ... until next Sunday because of the typhoon.",
    audio_complete: "The soccer game was put off until next Sunday because of the typhoon."
  },
  {
    id: "past_6", type: "grammar",
    q: "A: Have you finished packing your bags yet?\nB: No, I haven't. I'll do it ( ) dinner.",
    sub: "👑 3級過去問ボス (前置詞)",
    options: ["after", "since", "while", "during"], ans: 0,
    explain: "【解説】「夕食のあとに」を表す前置詞 after が正解です。",
    audio_question: "Have you finished packing your bags yet?",
    audio_complete: "No, I haven't. I'll do it after dinner."
  },
  {
    id: "past_7", type: "grammar",
    q: "This river is too dangerous for children ( ) in.",
    sub: "👑 3級過去問ボス (too ... to 構文)",
    options: ["to swim", "swim", "swimming", "swam"], ans: 0,
    explain: "【解説】〈too ＋ 形容詞 ＋ for 人 ＋ to ＋ 動詞の原形〉で「〜すぎて（人が）…できない」を表します。",
    audio_question: "This river is too dangerous for children ... in.",
    audio_complete: "This river is too dangerous for children to swim in."
  },
  {
    id: "past_8", type: "grammar",
    q: "The dog ( ) under the bench belongs to Mr. Tanaka.",
    sub: "👑 3級過去問ボス (現在分詞の後置修飾)",
    options: ["sleeping", "slept", "sleep", "sleeps"], ans: 0,
    explain: "【解説】「ベンチの下で眠っている犬」と名詞を後ろから修飾するため現在分詞 sleeping を使います。",
    audio_question: "The dog ... under the bench belongs to Mr. Tanaka.",
    audio_complete: "The dog sleeping under the bench belongs to Mr. Tanaka."
  },
  {
    id: "past_9", type: "grammar",
    q: "I bought a camera ( ) was made in Japan.",
    sub: "👑 3級過去問ボス (関係代名詞)",
    options: ["which", "who", "whom", "what"], ans: 0,
    explain: "【解説】先行詞がモノ（a camera）なので主格の関係代名詞 which（または that）を使います。",
    audio_question: "I bought a camera ... was made in Japan.",
    audio_complete: "I bought a camera which was made in Japan."
  },
  {
    id: "past_10", type: "grammar",
    q: "My mother told me ( ) forget my umbrella.",
    sub: "👑 3級過去問ボス (否定の不定詞)",
    options: ["not to", "to not", "don't", "never to"], ans: 0,
    explain: "【解説】〈tell ＋ 人 ＋ not to ＋ 動詞の原形〉で「人に〜しないように言う」を表します。",
    audio_question: "My mother told me ... forget my umbrella.",
    audio_complete: "My mother told me not to forget my umbrella."
  },
  {
    id: "past_11", type: "grammar",
    q: "We were very excited when our team ( ) the championship.",
    sub: "👑 3級過去問ボス (動詞の語彙・過去形)",
    options: ["won", "beat", "joined", "passed"], ans: 0,
    explain: "【解説】「優勝を勝ち取った・試合に勝った」は win の過去形 won を使います。",
    audio_question: "We were very excited when our team ... the championship.",
    audio_complete: "We were very excited when our team won the championship."
  },
  {
    id: "past_12", type: "grammar",
    q: "The Olympic Games ( ) place every four years.",
    sub: "👑 3級過去問ボス (重要熟語)",
    options: ["take", "make", "hold", "have"], ans: 0,
    explain: "【解説】take place で「開催される・行われる」を表す重要熟語です。",
    audio_question: "The Olympic Games ... place every four years.",
    audio_complete: "The Olympic Games take place every four years."
  },
  {
    id: "past_13", type: "grammar",
    q: "Neither Ken ( ) his brother can speak French.",
    sub: "👑 3級過去問ボス (接続詞の熟語)",
    options: ["nor", "or", "and", "but"], ans: 0,
    explain: "【解説】neither A nor B で「AもBも〜ない」を表します。\n【訳】ケンも彼の兄もフランス語を話せません。",
    audio_question: "Neither Ken ... his brother can speak French.",
    audio_complete: "Neither Ken nor his brother can speak French."
  },
  {
    id: "past_14", type: "grammar",
    q: "A: Do you mind if I sit here?\nB: ( ). Please go ahead.",
    sub: "👑 3級過去問ボス (会話表現)",
    options: ["Not at all", "Yes, I mind", "I'm sorry", "Thank you"], ans: 0,
    explain: "【解説】Do you mind if ~?（〜しても構いませんか？）に対して快く許可する返答は Not at all.（全然気にしませんよ＝どうぞ）です。",
    audio_question: "Do you mind if I sit here?",
    audio_complete: "Not at all. Please go ahead."
  },
  {
    id: "past_15", type: "grammar",
    q: "I had a bad toothache, so I made an ( ) to see the dentist.",
    sub: "👑 3級過去問ボス (名詞の語彙)",
    options: ["appointment", "advice", "accident", "activity"], ans: 0,
    explain: "【解説】make an appointment で「（病院などの）予約をとる」という3級頻出表現です。",
    audio_question: "I had a bad toothache, so I made an ... to see the dentist.",
    audio_complete: "I had a bad toothache, so I made an appointment to see the dentist."
  },
  {
    id: "past_16", type: "grammar",
    q: "My father ( ) to work at a bank, but now he teaches math at a high school.",
    sub: "👑 3級過去問ボス (過去の習慣)",
    options: ["used", "tried", "Enjoyed", "kept"], ans: 0,
    explain: "【解説】used to ＋ 動詞の原形 で「以前は〜していた（今はしていない）」を表します。",
    audio_question: "My father ... to work at a bank, but now he teaches math at a high school.",
    audio_complete: "My father used to work at a bank, but now he teaches math at a high school."
  },
  {
    id: "past_17", type: "grammar",
    q: "The movie was ( ) touching that many people in the theater cried.",
    sub: "👑 3級過去問ボス (so ... that 構文)",
    options: ["so", "too", "very", "enough"], ans: 0,
    explain: "【解説】後ろに that 節が続くため〈so ＋ 形容詞 ＋ that ...〉（とても〜なので…だ）が正解です。",
    audio_question: "The movie was ... touching that many people in the theater cried.",
    audio_complete: "The movie was so touching that many people in the theater cried."
  },
  {
    id: "past_18", type: "grammar",
    q: "Kyoto is one of the most famous ( ) in the world.",
    sub: "👑 3級過去問ボス (最上級の重要構文)",
    options: ["cities", "city", "a city", "the city"], ans: 0,
    explain: "【解説】one of the ＋ 最上級 ＋ 複数名詞（最も〜な…の一つ）の形になるため、複数形の cities が正解です。",
    audio_question: "Kyoto is one of the most famous ... in the world.",
    audio_complete: "Kyoto is one of the most famous cities in the world."
  },
  {
    id: "past_19", type: "grammar",
    q: "Please make ( ) that all the windows are locked before you leave.",
    sub: "👑 3級過去問ボス (重要熟語)",
    options: ["sure", "clear", "right", "safe"], ans: 0,
    explain: "【解説】make sure that ~ で「〜ということを確かめる・確認する」という重要熟語です。",
    audio_question: "Please make ... that all the windows are locked before you leave.",
    audio_complete: "Please make sure that all the windows are locked before you leave."
  },
  {
    id: "past_20", type: "grammar",
    q: "A: How long have you been waiting here?\nB: ( ) about twenty minutes.",
    sub: "👑 3級過去問ボス (期間の前置詞)",
    options: ["For", "Since", "From", "During"], ans: 0,
    explain: "【解説】twenty minutes（20分間）という期間の長さを表すため For が正解です。",
    audio_question: "How long have you been waiting here?",
    audio_complete: "For about twenty minutes."
  },
  {
    id: "past_21", type: "reading",
    passageTitle: "📜 過去問ボス長文：School Recycling Campaign",
    passage: "Next week, South High School will hold a Recycling Campaign from Monday to Friday. Students can bring old newspapers, magazines, and plastic bottles to the box in front of the gym every morning before class.\n\nThe money we get from recycling will be used to buy new books for the school library.",
    highlight: "The money we get from recycling will be used to buy new books for the school library.",
    q: "How will the school use the money from the Recycling Campaign?",
    sub: "👑 3級過去問ボス (長文読解)",
    options: ["To clean the school gym.", "To buy new books for the library.", "To help poor countries.", "To make school newspapers."],
    ans: 1,
    explain: "【解説】最後の文に「used to buy new books for the school library（学校図書館の新しい本を買うために使われます）」と書かれています。",
    audio_complete: "How will the school use the money from the Recycling Campaign? To buy new books for the library."
  },
  {
    id: "past_22", type: "reading",
    passageTitle: "📜 過去問ボス長文：A Cooking Lesson with Grandma",
    passage: "Last Sunday, Kenta visited his grandmother's house because he wanted to learn how to make apple pie. His grandmother is very good at baking sweets.\n\nFirst, they cut five big apples into small pieces and cooked them with sugar. Then, they baked the pie in the oven for forty minutes. Kenta took half of the pie home for his parents, and they loved it!",
    highlight: "because he wanted to learn how to make apple pie.",
    q: "Why did Kenta visit his grandmother's house last Sunday?",
    sub: "👑 3級過去問ボス (長文読解)",
    options: ["To give her some apples.", "To learn how to make apple pie.", "To clean her kitchen.", "To fix her oven."],
    ans: 1,
    explain: "【解説】第1文に「because he wanted to learn how to make apple pie（アップルパイの作り方を習いたかったから）」とあります。",
    audio_complete: "Why did Kenta visit his grandmother's house last Sunday? To learn how to make apple pie."
  },
  {
    id: "past_23", type: "reading",
    passageTitle: "📜 過去問ボス長文：City Museum Special Ticket",
    passage: "Welcome to West City Museum!\nFrom this month, we have started selling a \"Family Weekend Pass.\" Usually, tickets are $10 for adults and $5 for students. However, with the Family Weekend Pass, two adults and up to two students can enter the museum for only $20 on Saturdays and Sundays!",
    highlight: "two adults and up to two students can enter the museum for only $20 on Saturdays and Sundays!",
    q: "When can visitors use the Family Weekend Pass?",
    sub: "👑 3級過去問ボス (長文読解)",
    options: ["Every day.", "Only on Mondays.", "On Saturdays and Sundays.", "Only during summer vacation."],
    ans: 2,
    explain: "【解説】最後の文に「on Saturdays and Sundays（土曜日と日曜日に）」利用できると書かれています。",
    audio_complete: "When can visitors use the Family Weekend Pass? On Saturdays and Sundays."
  },
  {
    id: "past_24", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "👑 3級過去問ボス (対話リスニング)",
    options: ["At the bookstore.", "At the post office.", "At the flower shop.", "At the supermarket."],
    ans: 2,
    explain: "【会話】\nBoy: Mom, tomorrow is Mother's Day. I want to buy some red flowers for Grandma.\nWoman: That's a nice idea, Bob. Let's go to the flower shop near the station before we go to the supermarket.\n\n【質問】Where will they go first?（彼らは最初にどこへ行きますか？）\n【正解】3. 花屋へ（before we go to the supermarket とあるため）。",
    dialogue: [
      { speaker: 'male', text: "Mom, tomorrow is Mother's Day. I want to buy some red flowers for Grandma." },
      { speaker: 'female', text: "That's a nice idea, Bob. Let's go to the flower shop near the station before we go to the supermarket." },
      { speaker: 'narrator', text: "Question. Where will they go first?" }
    ],
    audio_complete: "Where will they go first? At the flower shop."
  },
  {
    id: "past_25", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "👑 3級過去問ボス (対話リスニング)",
    options: ["Take a bus.", "Walk to the library.", "Borrow her brother's bike.", "Stay at home."],
    ans: 0,
    explain: "【会話】\nGirl: Dad, my bike has a flat tire. Can you drive me to the library?\nMan: Sorry, I have to clean the garage now. Why don't you take a bus?\nGirl: OK, I'll do that.\n\n【質問】How will the girl go to the library?（女の子はどうやって図書館へ行きますか？）\n【正解】1. バスに乗る。",
    dialogue: [
      { speaker: 'female', text: "Dad, my bike has a flat tire. Can you drive me to the library?" },
      { speaker: 'male', text: "Sorry, I have to clean the garage now. Why don't you take a bus?" },
      { speaker: 'female', text: "OK, I'll do that." },
      { speaker: 'narrator', text: "Question. How will the girl go to the library?" }
    ],
    audio_complete: "How will the girl go to the library? Take a bus."
  },
  {
    id: "past_26", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "👑 3級過去問ボス (アナウンスリスニング)",
    options: ["Gate 3.", "Gate 5.", "Gate 8.", "Gate 10."],
    ans: 2,
    explain: "【英文】\nAttention, passengers taking Flight 205 to London. The boarding gate has been changed from Gate 5 to Gate 8. Again, please go to Gate 8.\n\n【質問】Which gate should the passengers go to now?（乗客は今どのゲートへ行くべきですか？）\n【正解】3. 8番ゲート（from Gate 5 to Gate 8）。",
    dialogue: [
      { speaker: 'female', text: "Attention, passengers taking Flight 205 to London. The boarding gate has been changed from Gate 5 to Gate 8. Again, please go to Gate 8." },
      { speaker: 'narrator', text: "Question. Which gate should the passengers go to now?" }
    ],
    audio_complete: "Which gate should the passengers go to now? Gate 8."
  },
  {
    id: "past_27", type: "grammar",
    q: "I haven't heard ( ) my uncle since he moved to Australia.",
    sub: "👑 3級過去問ボス (重要熟語)",
    options: ["from", "of", "to", "with"], ans: 0,
    explain: "【解説】hear from 〜 で「〜から便り（連絡）がある」という3級頻出熟語です。\n【訳】おじがオーストラリアに引っ越して以来、おじから連絡がありません。",
    audio_question: "I haven't heard ... my uncle since he moved to Australia.",
    audio_complete: "I haven't heard from my uncle since he moved to Australia."
  },
  {
    id: "past_28", type: "grammar",
    q: "We ran out ( ) milk this morning, so I went to the store to buy some.",
    sub: "👑 3級過去問ボス (重要熟語)",
    options: ["of", "from", "off", "away"], ans: 0,
    explain: "【解説】run out of 〜 で「〜を使い果たす・切らす」という重要熟語です。",
    audio_question: "We ran out ... milk this morning, so I went to the store to buy some.",
    audio_complete: "We ran out of milk this morning, so I went to the store to buy some."
  },
  {
    id: "past_29", type: "grammar",
    q: "The girl ( ) mother is a famous pianist won the music contest.",
    sub: "👑 3級過去問ボス (関係代名詞の応用)",
    options: ["whose", "who", "which", "whom"], ans: 0,
    explain: "【解説】「その少女の母親（Her mother）」と所有格のつながりになるため、所有格の関係代名詞 whose が正解です。",
    audio_question: "The girl ... mother is a famous pianist won the music contest.",
    audio_complete: "The girl whose mother is a famous pianist won the music contest."
  },
  {
    id: "past_30", type: "grammar",
    q: "You don't have to hurry. We still have ( ) of time before the train leaves.",
    sub: "👑 3級過去問ボス (数量表現)",
    options: ["plenty", "many", "number", "several"], ans: 0,
    explain: "【解説】plenty of 〜 で「たくさんの〜、十分な〜」を表します。\n【訳】急ぐ必要はありませんよ。電車が出るまでまだたっぷり時間があります。",
    audio_question: "You don't have to hurry. We still have ... of time before the train leaves.",
    audio_complete: "You don't have to hurry. We still have plenty of time before the train leaves."
  }
];
