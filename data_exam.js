// ==========================================
// 英検3級 クロノ・オデッセイ 〜365日の時空冒険〜
// マスターデータ定義ファイル③ (data_exam.js)
// [収録] リスニング25問 / 長文読解20問 / ライティング20問 / 二次面接16問 / 過去問ボス50問
// ==========================================

// ==================== 1. 英検3級 リスニング問題 (対話・アナウンス 全25問) ====================
const RAW_LISTENING_DATA = [
  {
    id: "l_0",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
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
    sub: "🎧 【第2部】対話リスニング",
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
    sub: "🎧 【第2部】対話リスニング",
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
    sub: "🎧 【第2部】対話リスニング",
    opt: ["Once a week.", "Twice a week.", "Three times a week.", "Every day."],
    ans: 1,
    explain: "【会話】\nGirl: You are very good at swimming, Ken. Do you practice every day?\nBoy: No. I go to the swimming club only on Tuesdays and Fridays.\n\n【訳】\n女子: ケンは水泳がとても上手ね。毎日練習しているの？\n男子: ううん。スイミングクラブに行くのは火曜日と金曜日だけだよ。\n\n【質問】How often does Ken go to the swimming club?（ケンはどのくらいの頻度でスイミングクラブに通っていますか？）\n【正解】2. 週に2回。",
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
    sub: "🎧 【第2部】対話リスニング",
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
    sub: "🎧 【第2部】対話リスニング",
    opt: ["By train.", "By bus.", "By bike.", "By car."],
    ans: 3,
    explain: "【会話】\nMan: Did you take the train to the concert last night, Lisa?\nGirl: I wanted to, but it was raining heavily, so my father drove me there.\n\n【訳】\n男性: リサ、昨夜は電車でコンサートに行ったのかい？\n女子: そうしたかったんだけど、雨が激しく降っていたから、お父さんが車で送ってくれたの。\n\n【質問】How did Lisa go to the concert?（リサはどうやってコンサートへ行きましたか？）\n【正解】4. 車で。",
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
    sub: "🎧 【第2部】対話リスニング",
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
    sub: "🎧 【第3部】短文・アナウンス",
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
    sub: "🎧 【第3部】短文・アナウンス",
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
    sub: "🎧 【第3部】短文・アナウンス",
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
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["Bring their own lunch.", "Wear school uniforms.", "Meet at the bus stop at 9:00.", "Pay 500 yen for the bus."],
    ans: 0,
    explain: "【英文】\nAttention, students. Tomorrow we will go hiking at Green Mountain. Please meet in front of the school gate at eight thirty. There are no restaurants on the mountain, so don't forget to bring your own lunch.\n\n【訳】\n生徒の皆さん。明日はグリーンマウンテンへハイキングに行きます。8時半に校門前に集合してください。山にはレストランがないので、必ず自分のお弁当を持ってきてください。\n\n【質問】What do the students have to do tomorrow?（生徒たちは明日何をしなければなりませんか？）\n【正解】1. 自分のお弁当を持参すること。",
    dialogue: [
      { speaker: 'male', text: "Attention, students. Tomorrow we will go hiking at Green Mountain. Please meet in front of the school gate at eight thirty. There are no restaurants on the mountain, so don't forget to bring your own lunch." },
      { speaker: 'narrator', text: "Question. What do the students have to do tomorrow?" }
    ],
    audio_complete: "What do the students have to do tomorrow? Bring their own lunch."
  },
  {
    id: "l_11",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
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
    sub: "🎧 【第2部】対話リスニング",
    opt: ["10 dollars.", "15 dollars.", "20 dollars.", "30 dollars."],
    ans: 1,
    explain: "【会話】\nBoy: Excuse me, how much is this blue cap?\nWoman: It is usually twenty dollars, but it's on sale today for fifteen dollars.\nBoy: Great! I'll take it.\n\n【訳】\n男子: すみません、この青い帽子はいくらですか？\n女性: 普段は20ドルですが、今日はセールで15ドルですよ。\n\n【質問】How much will the boy pay for the cap?（男の子は帽子にいくら払いますか？）\n【正解】2. 15ドル。",
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
    sub: "🎧 【第3部】短文・アナウンス",
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
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["A free drink.", "A special towel.", "A discount ticket.", "A music CD."],
    ans: 1,
    explain: "【英文】\nThank you for coming to the City Sports Festival! People who finish the five-kilometer run will receive a special sports towel at the goal gate.\n\n【訳】\nシティ・スポーツフェスティバルへようこそ！5キロランを完走した方には、ゴールゲートで特製スポーツタオルをプレゼントします。\n\n【質問】What will people get if they finish the run?（完走した人は何がもらえますか？）\n【正解】2. 特製タオル。",
    dialogue: [
      { speaker: 'female', text: "Thank you for coming to the City Sports Festival! People who finish the five-kilometer run will receive a special sports towel at the goal gate." },
      { speaker: 'narrator', text: "Question. What will people get if they finish the run?" }
    ],
    audio_complete: "What will people get if they finish the run? A special towel."
  },
  {
    id: "l_15",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
    opt: ["At the station.", "In front of the theater.", "At the coffee shop.", "At the bookstore."],
    ans: 3,
    explain: "【会話】\nBoy: Shall we meet in front of the movie theater at two, Anna?\nGirl: It's very cold outside today. Let's meet inside the bookstore next to the theater.\nBoy: OK, see you there.\n\n【質問】Where will they meet?（彼らはどこで待ち合わせますか？）\n【正解】4. 本屋の中で。",
    dialogue: [
      { speaker: 'male', text: "Shall we meet in front of the movie theater at two, Anna?" },
      { speaker: 'female', text: "It's very cold outside today. Let's meet inside the bookstore next to the theater." },
      { speaker: 'male', text: "OK, see you there." },
      { speaker: 'narrator', text: "Question. Where will they meet?" }
    ],
    audio_complete: "Where will they meet? At the bookstore."
  },
  {
    id: "l_16",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
    opt: ["Play tennis.", "Practice the guitar.", "Go to the dentist.", "Help his mother."],
    ans: 2,
    explain: "【会話】\nGirl: Can you stay after school to practice the guitar today, Mike?\nBoy: Sorry, I have an appointment with the dentist at four o'clock.\n\n【質問】What will Mike do after school today?（マイクは今日の放課後、何をしますか？）\n【正解】3. 歯医者へ行く。",
    dialogue: [
      { speaker: 'female', text: "Can you stay after school to practice the guitar today, Mike?" },
      { speaker: 'male', text: "Sorry, I have an appointment with the dentist at four o'clock." },
      { speaker: 'narrator', text: "Question. What will Mike do after school today?" }
    ],
    audio_complete: "What will Mike do after school today? Go to the dentist."
  },
  {
    id: "l_17",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
    opt: ["10 minutes.", "15 minutes.", "20 minutes.", "30 minutes."],
    ans: 1,
    explain: "【会話】\nWoman: How do you go to school every day, Ben?\nBoy: It takes thirty minutes on foot, so I usually ride my bicycle. It takes only fifteen minutes.\n\n【質問】How long does it take Ben to go to school by bicycle?（ベンが自転車で通学するのに何分かかりますか？）\n【正解】2. 15分。",
    dialogue: [
      { speaker: 'female', text: "How do you go to school every day, Ben?" },
      { speaker: 'male', text: "It takes thirty minutes on foot, so I usually ride my bicycle. It takes only fifteen minutes." },
      { speaker: 'narrator', text: "Question. How long does it take Ben to go to school by bicycle?" }
    ],
    audio_complete: "How long does it take Ben to go to school by bicycle? 15 minutes."
  },
  {
    id: "l_18",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
    opt: ["A sandwich.", "Spaghetti.", "Chicken curry.", "Beef steak."],
    ans: 2,
    explain: "【会話】\nMan: Are you ready to order?\nGirl: Yes. I'd like the spaghetti, please.\nMan: I'm sorry, we just ran out of spaghetti today.\nGirl: Oh, then I'll have the chicken curry.\n\n【質問】What will the girl eat?（女の子は何を食べますか？）\n【正解】3. チキンカレー（スパゲッティが品切れのため）。",
    dialogue: [
      { speaker: 'male', text: "Are you ready to order?" },
      { speaker: 'female', text: "Yes. I'd like the spaghetti, please." },
      { speaker: 'male', text: "I'm sorry, we just ran out of spaghetti today." },
      { speaker: 'female', text: "Oh, then I'll have the chicken curry." },
      { speaker: 'narrator', text: "Question. What will the girl eat?" }
    ],
    audio_complete: "What will the girl eat? Chicken curry."
  },
  {
    id: "l_19",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング",
    opt: ["His notebook.", "His dictionary.", "His textbook.", "His glasses."],
    ans: 3,
    explain: "【会話】\nBoy: Oh no! I can't see the blackboard clearly.\nGirl: Did you forget to bring your glasses again, Sam?\nBoy: Yes, I left them on my desk at home.\n\n【質問】What did Sam leave at home?（サムは家に何を忘れてきましたか？）\n【正解】4. メガネ（his glasses）。",
    dialogue: [
      { speaker: 'male', text: "Oh no! I can't see the blackboard clearly." },
      { speaker: 'female', text: "Did you forget to bring your glasses again, Sam?" },
      { speaker: 'male', text: "Yes, I left them on my desk at home." },
      { speaker: 'narrator', text: "Question. What did Sam leave at home?" }
    ],
    audio_complete: "What did Sam leave at home? His glasses."
  },
  {
    id: "l_20",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["In the morning.", "In the afternoon.", "In the evening.", "At night."],
    ans: 0,
    explain: "【英文】\nMany people like to run in the evening after work, but I always run in the park for thirty minutes before breakfast. The morning air feels great.\n\n【質問】When does the speaker always run?（話し手はいつもいつ走りますか？）\n【正解】1. 朝に（before breakfast）。",
    dialogue: [
      { speaker: 'male', text: "Many people like to run in the evening after work, but I always run in the park for thirty minutes before breakfast. The morning air feels great." },
      { speaker: 'narrator', text: "Question. When does the speaker always run?" }
    ],
    audio_complete: "When does the speaker always run? In the morning."
  },
  {
    id: "l_21",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["One.", "Two.", "Three.", "Four."],
    ans: 2,
    explain: "【英文】\nWelcome to Maple Library. Students can borrow up to three books at a time for two weeks. Magazines cannot be borrowed.\n\n【質問】How many books can a student borrow at a time?（生徒は一度に何冊まで本を借りられますか？）\n【正解】3. 3冊まで（up to three books）。",
    dialogue: [
      { speaker: 'female', text: "Welcome to Maple Library. Students can borrow up to three books at a time for two weeks. Magazines cannot be borrowed." },
      { speaker: 'narrator', text: "Question. How many books can a student borrow at a time?" }
    ],
    audio_complete: "How many books can a student borrow at a time? Three."
  },
  {
    id: "l_22",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["Cleaned the beach.", "Planted flowers.", "Visited a zoo.", "Went fishing."],
    ans: 0,
    explain: "【英文】\nLast Sunday, fifty students from our school went to Blue Beach. We picked up plastic bottles and garbage for two hours. Now the beach is very clean.\n\n【質問】What did the students do last Sunday?（生徒たちは先週の日曜日に何をしましたか？）\n【正解】1. ビーチを掃除した。",
    dialogue: [
      { speaker: 'female', text: "Last Sunday, fifty students from our school went to Blue Beach. We picked up plastic bottles and garbage for two hours. Now the beach is very clean." },
      { speaker: 'narrator', text: "Question. What did the students do last Sunday?" }
    ],
    audio_complete: "What did the students do last Sunday? Cleaned the beach."
  },
  {
    id: "l_23",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["Because the tickets were sold out.", "Because her sister got a fever.", "Because she had to work.", "Because the train stopped."],
    ans: 1,
    explain: "【英文】\nNancy was going to a pop concert with her little sister yesterday. However, her sister suddenly got a high fever in the afternoon, so Nancy stayed home and took care of her.\n\n【質問】Why didn't Nancy go to the concert?（なぜナンシーはコンサートに行きませんでしたか？）\n【正解】2. 妹が熱を出したから。",
    dialogue: [
      { speaker: 'male', text: "Nancy was going to a pop concert with her little sister yesterday. However, her sister suddenly got a high fever in the afternoon, so Nancy stayed home and took care of her." },
      { speaker: 'narrator', text: "Question. Why didn't Nancy go to the concert?" }
    ],
    audio_complete: "Why didn't Nancy go to the concert? Because her sister got a fever."
  },
  {
    id: "l_24",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文・アナウンス",
    opt: ["At 1:00 p.m.", "At 2:00 p.m.", "At 3:00 p.m.", "At 4:00 p.m."],
    ans: 1,
    explain: "【英文】\nAttention, visitors. The dolphin show usually starts at one o'clock, but today it has been delayed for one hour. So it will begin at two o'clock.\n\n【質問】What time will the dolphin show start today?（今日のイルカショーは何時に始まりますか？）\n【正解】2. 午後2時に。",
    dialogue: [
      { speaker: 'female', text: "Attention, visitors. The dolphin show usually starts at one o'clock, but today it has been delayed for one hour. So it will begin at two o'clock." },
      { speaker: 'narrator', text: "Question. What time will the dolphin show start today?" }
    ],
    audio_complete: "What time will the dolphin show start today? At 2:00 p.m."
  }
];

// ==================== 2. 古代遺跡解読：長文読解ダンジョン (全20問) ====================
const RAW_READING_DATA = [
  {
    id: "r_0",
    passageTitle: "📜 【掲示】Summer Tennis Camp (夏のテニスキャンプ)",
    passage: "Do you want to improve your tennis skills this summer?\nJoin our Summer Tennis Camp at Green Park!\n\nDate: August 10th to August 12th\nTime: 9:00 a.m. – 12:00 p.m.\nFee: $30 for students ($20 if you sign up before July 20th)\n\nPlease bring your own racket, a towel, and a bottle of water. If it rains, we will practice in the city gym next to the park.",
    highlight: "$20 if you sign up before July 20th",
    q: "How much does a student pay if he or she signs up on July 15th?",
    sub: "【質問】7月15日に申し込んだ場合、生徒の参加費はいくらになりますか？（🔍真理のモノクルで根拠が光ります）",
    options: ["$10.", "$12.", "$20.", "$30."],
    ans: 2,
    explain: "【解説】本文に「$20 if you sign up before July 20th（7月20日前に申し込めば20ドル）」と書かれています。7月15日は20日より前なので $20 が正解です。",
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
    passageTitle: "📜 【説明文】The History of Potatoes (ジャガイモの歴史)",
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
    passageTitle: "📜 【説明文】The History of Potatoes (ジャガイモの歴史)",
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
  },
  {
    id: "r_12",
    passageTitle: "📜 【案内】Cooking Class for Beginners (初心者向け料理教室)",
    passage: "Would you like to learn how to cook Italian food? Chef Mario will teach you how to make delicious pasta and soup!\n\nDate: November 5th (Sunday)\nPlace: Community Center Cooking Room\nCost: $15 (includes all food materials)\n\nWe will prepare knives and pans, so you only need to bring an apron and a notebook.",
    highlight: "you only need to bring an apron and a notebook.",
    q: "What do participants need to bring to the cooking class?",
    sub: "【質問】料理教室の参加者は何を持参する必要がありますか？",
    options: ["Knives and pans.", "Food materials.", "An apron and a notebook.", "Pasta and soup."],
    ans: 2,
    explain: "【解説】最終文に「you only need to bring an apron and a notebook（エプロンとノートだけ持参すればよい）」と書かれています。",
    audio_complete: "What do participants need to bring to the cooking class? An apron and a notebook."
  },
  {
    id: "r_13",
    passageTitle: "📜 【Eメール】A New Bakery in Town (街の新しいパン屋さん)",
    passage: "Hi Lucy,\n\nDo you know the new bakery called \"Sunny Bread\" near the station? I went there this morning with my mother. It opened just three days ago, so it was very crowded.\n\nWe bought some apple pies and melon bread. If you show your student ID card, you can get a 10% discount! Let's go there together after school on Friday.\n\nBest,\nYuka",
    highlight: "If you show your student ID card, you can get a 10% discount!",
    q: "How can students get a discount at \"Sunny Bread\"?",
    sub: "【質問】生徒はどうすれば「Sunny Bread」で割引を受けられますか？",
    options: ["By going there in the morning.", "By showing their student ID card.", "By buying apple pies.", "By going with their parents."],
    ans: 1,
    explain: "【解説】第2段落に「If you show your student ID card, you can get a 10% discount!（学生証を見せれば10%割引になる）」とあります。",
    audio_complete: "How can students get a discount at Sunny Bread? By showing their student ID card."
  },
  {
    id: "r_14",
    passageTitle: "📜 【物語】 Grandpa's Old Camera (おじいちゃんの古いカメラ)",
    passage: "Last week, Taro found an old film camera in his grandfather's closet. Taro usually takes pictures with his smartphone, so he had never used a film camera before.\n\nHis grandfather taught Taro how to use it and bought some film for him. Yesterday, they walked around the old town and took twenty pictures together. Taro cannot see the photos right away, but he is very excited to see them next week.",
    highlight: "Taro usually takes pictures with his smartphone, so he had never used a film camera before.",
    q: "Why had Taro never used a film camera before?",
    sub: "【質問】なぜタロウはそれまで一度もフィルムカメラを使ったことがなかったのですか？",
    options: ["Because it was too heavy.", "Because he didn't like taking pictures.", "Because he usually takes pictures with his smartphone.", "Because his grandfather didn't allow him to use it."],
    ans: 2,
    explain: "【解説】第1段落に「Taro usually takes pictures with his smartphone（普段はスマートフォンで写真を撮るから）」と書かれています。",
    audio_complete: "Why had Taro never used a film camera before? Because he usually takes pictures with his smartphone."
  },
  {
    id: "r_15",
    passageTitle: "📜 【説明文】Why Do Flamingos Stand on One Leg? (フラミンゴが片足で立つ理由)",
    passage: "Have you ever seen flamingos at the zoo? They often stand in the water on just one leg, even when they are sleeping. For a long time, scientists did not know why.\n\nRecently, researchers found an important reason. Water takes heat away from a bird's body very quickly. By keeping one leg under their warm feathers, flamingos can save their body heat and stay warm in cold water.",
    highlight: "flamingos can save their body heat and stay warm in cold water.",
    q: "Why do flamingos stand on one leg in the water?",
    sub: "【質問】なぜフラミンゴは水の中で片足で立つのですか？",
    options: ["To catch fish more easily.", "To run away from danger quickly.", "To save their body heat and stay warm.", "To wash their feathers."],
    ans: 2,
    explain: "【解説】最後の文に「flamingos can save their body heat and stay warm in cold water（体温を保ち、冷たい水の中で暖かくいられるから）」とあります。",
    audio_complete: "Why do flamingos stand on one leg in the water? To save their body heat and stay warm."
  },
  {
    id: "r_16",
    passageTitle: "📜 【説明文】The Invention of Ice Cream Cones (アイスクリームコーンの発明)",
    passage: "Today, people love eating ice cream in crispy cones. Before 1904, however, ice cream was usually served in small glass dishes. Customers had to return the dishes after eating.\n\nAt a big fair in St. Louis in 1904, it was very hot, and an ice cream seller ran out of clean dishes. A man selling waffles next to him rolled up a warm waffle into a cone shape and put ice cream in it. Customers loved it because they could walk around and eat everything!",
    highlight: "an ice cream seller ran out of clean dishes.",
    q: "What problem did the ice cream seller have at the fair in 1904?",
    sub: "【質問】1904年の博覧会で、アイスクリーム売りはどんな問題に直面しましたか？",
    options: ["He ran out of ice cream.", "He ran out of clean dishes.", "The weather was too cold.", "No one came to his shop."],
    ans: 1,
    explain: "【解説】第2段落の最初に「an ice cream seller ran out of clean dishes（清潔な皿を使い果たしてしまった・切らしてしまった）」とあります。",
    audio_complete: "What problem did the ice cream seller have at the fair in 1904? He ran out of clean dishes."
  },
  {
    id: "r_17",
    passageTitle: "📜 【説明文】The Invention of Ice Cream Cones (アイスクリームコーンの発明)",
    passage: "Today, people love eating ice cream in crispy cones. Before 1904, however, ice cream was usually served in small glass dishes. Customers had to return the dishes after eating.\n\nAt a big fair in St. Louis in 1904, it was very hot, and an ice cream seller ran out of clean dishes. A man selling waffles next to him rolled up a warm waffle into a cone shape and put ice cream in it. Customers loved it because they could walk around and eat everything!",
    highlight: "A man selling waffles next to him rolled up a warm waffle into a cone shape",
    q: "Who helped the ice cream seller solve his problem?",
    sub: "【質問】誰がアイスクリーム売りの問題を解決するのを助けましたか？",
    options: ["A glass maker.", "A man selling waffles next to him.", "A young boy at the fair.", "A famous scientist."],
    ans: 1,
    explain: "【解説】「A man selling waffles next to him（隣でワッフルを売っていた男性）」が温かいワッフルを円錐形に巻いて器にしました。",
    audio_complete: "Who helped the ice cream seller solve his problem? A man selling waffles next to him."
  },
  {
    id: "r_18",
    passageTitle: "📜 【Eメール】Book Club Meeting (読書クラブの集まり)",
    passage: "Dear Book Club Members,\n\nOur next meeting will be on Thursday, May 18th. Usually, we meet in Room 204, but the drama club will use that room to practice for the school festival. So, we will meet in the computer room on the third floor.\n\nPlease bring the mystery novel we chose last month. We will talk about our favorite characters!\n\nMs. Clark",
    highlight: "we will meet in the computer room on the third floor.",
    q: "Where will the Book Club meet on May 18th?",
    sub: "【質問】読書クラブは5月18日にどこで集まりますか？",
    options: ["In Room 204.", "In the drama club room.", "In the computer room.", "In the school gym."],
    ans: 2,
    explain: "【解説】第1段落の最後に「So, we will meet in the computer room on the third floor.（3階のコンピュータ室で集まります）」と書かれています。",
    audio_complete: "Where will the Book Club meet on May 18th? In the computer room."
  },
  {
    id: "r_19",
    passageTitle: "📜 【説明文】 Guide Dogs for the Blind (盲導犬の働き)",
    passage: "Guide dogs help blind people walk safely in towns and cities. When a puppy is born, it lives with a volunteer family for about one year to learn how to live with humans and be friendly.\n\nAfter that, the dog goes to a special training center. There, it learns how to stop at street corners, avoid obstacles, and find doors or stairs. Only dogs that pass difficult tests can become guide dogs.",
    highlight: "it lives with a volunteer family for about one year to learn how to live with humans",
    q: "Why does a puppy live with a volunteer family for about one year?",
    sub: "【質問】なぜ子犬は約1年間、ボランティアの家族と暮らすのですか？",
    options: ["To learn how to live with humans and be friendly.", "To take difficult tests.", "To guard the family's house.", "To play with other guide dogs."],
    ans: 0,
    explain: "【解説】第1段落の最後に「to learn how to live with humans and be friendly（人間と暮らす方法や人懐っこさを学ぶため）」とあります。",
    audio_complete: "Why does a puppy live with a volunteer family for about one year? To learn how to live with humans and be friendly."
  }
];

// ==================== 3. 魔導書クラフト：ライティング＆Eメール (全20問) ====================
const RAW_WRITING_DATA = [
  {
    id: "w_0",
    q: "【QUESTION】Which do you like better, summer or winter?\n（夏と冬、どちらが好きですか？ ➔ 「夏の方が好き＋理由2つ」の導入文を作ろう）",
    sub: "✍️ 3級英作文の黄金テンプレート（主張＋理由が2つある宣言）",
    words: ["I", "like", "summer", "better", "than", "winter.", "I", "have", "two", "reasons."],
    explain: "【3級英作文の鉄則】最初に「I like A better than B.」と答え、続けて「I have two reasons.」と書くと語数も稼げて構成点が満点になります！",
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
    explain: "【解説】2つ目の理由は「Second, ~」で始めます。シンプルで文法ミスをしない文を書くのが高得点の秘訣です！",
    audio_question: "Second, we have a long summer vacation."
  },
  {
    id: "w_3",
    q: "【QUESTION】Do you want to visit foreign countries in the future?\n（将来、外国を訪れたいですか？ ➔ 理由：世界中にたくさんの友達を作りたいから）",
    sub: "✍️ First, と want to を使って理由を組み立てよう",
    words: ["First,", "I", "want", "to", "make", "many", "friends", "around", "the", "world."],
    explain: "【解説】「I want to ~（〜したい）」と「make friends（友達を作る）」はどんなトピックにも応用できる便利なフレーズです。",
    audio_question: "First, I want to make many friends around the world."
  },
  {
    id: "w_4",
    q: "【QUESTION】Do you like reading books?\n（本を読むのは好きですか？ ➔ 理由：本からたくさんの新しいことを学べるから）",
    sub: "✍️ どんなテーマにも使える最強理由フレーズ「多くのことを学べる」",
    words: ["First,", "I", "can", "learn", "many", "new", "things", "from", "books."],
    explain: "【解説】「I can learn many new things from ~（〜から多くの新しいことを学べる）」は、読書・旅行・歴史・インターネットなどあらゆる問題で使える魔法の文です！",
    audio_question: "First, I can learn many new things from books."
  },
  {
    id: "w_5",
    q: "【QUESTION】What is your favorite sport?\n（一番好きなスポーツは何ですか？ ➔ 理由：サッカーをすることは健康にとても良いから）",
    sub: "✍️ スポーツ・食べ物・早起きで使える万能理由「健康に良い」",
    words: ["Second,", "playing", "soccer", "is", "very", "good", "for", "my", "health."],
    explain: "【解説】「~ is good for my health.（〜は健康に良い）」も英検3級のライティングで大活躍する鉄板フレーズです！",
    audio_question: "Second, playing soccer is very good for my health."
  },
  {
    id: "w_6",
    q: "【QUESTION】Where do you want to go this weekend?\n（今週末どこへ行きたいですか？ ➔ 理由：そこで買い物をするのはとても便利だから）",
    sub: "✍️ 街・電車・スマホの話題で使える万能理由「とても便利だ」",
    words: ["Second,", "it", "is", "very", "convenient", "to", "go", "shopping", "there."],
    explain: "【解説】「It is convenient to ~（〜するのに便利だ）」を覚えておくと、場所や道具に関する英作文が簡単に書けます。",
    audio_question: "Second, it is very convenient to go shopping there."
  },
  {
    id: "w_7",
    q: "【Eメール問題】友達のAlexから「新しい自転車を買ったよ！」とメールが来ました。\nAlexに「その新しい自転車は何色ですか？」と質問する文を作ろう。",
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
    explain: "【Eメール対策】過去の出来事に対して「誰と行ったの？」と聞く「Who did you go ~ with?」はEメール問題で超頻出です！",
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
    q: "【QUESTION】Do you often help your parents at home?\n（家でよく親の手伝いをしますか？ ➔ 理由：いつも夕食後にお皿を洗うから）",
    sub: "✍️ 自分の普段の行動を説明する文を組み立てよう",
    words: ["First,", "I", "always", "wash", "the", "dishes", "after", "dinner."],
    explain: "【解説】お手伝いのトピックでは wash the dishes（皿を洗う）や clean my room（部屋を掃除する）が書きやすくておすすめです。",
    audio_question: "First, I always wash the dishes after dinner."
  },
  {
    id: "w_11",
    q: "【QUESTION】Which do you like better, reading books or watching movies?\n（読書と映画鑑賞、どちらが好き？ ➔ 理由：友達と映画について話すのは楽しいから）",
    sub: "✍️ It is fun to ~（〜するのは楽しい）を使った万能文",
    words: ["Second,", "it", "is", "fun", "to", "talk", "about", "movies", "with", "friends."],
    explain: "【解説】「It is fun to ~（〜するのは楽しい）」は、あらゆる趣味・スポーツ・イベントの理由に使える最強構文です！",
    audio_question: "Second, it is fun to talk about movies with friends."
  },
  {
    id: "w_12",
    q: "【Eメール問題】友達のTomが「昨日、新しいレストランで夕食を食べた」と書いています。\nTomに「そこで何を食べましたか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：食べたものを尋ねる疑問文",
    words: ["What", "did", "you", "eat", "at", "the", "restaurant?"],
    explain: "【Eメール対策】食事やパーティーの話題では「What did you eat there?（そこで何を食べたの？）」が鉄板の質問です！",
    audio_question: "What did you eat at the restaurant?"
  },
  {
    id: "w_13",
    q: "【Eメール問題】友達のLisaが「来週の日曜日にテニス大会がある」と書いています。\nLisaに「大会は何時に始まりますか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：開始時刻を尋ねる疑問文",
    words: ["What", "time", "will", "the", "tennis", "tournament", "start?"],
    explain: "【Eメール対策】未来のイベントや試合については「What time will it start?（何時に始まりますか？）」や「Where will it be held?」が抜群に使えます。",
    audio_question: "What time will the tennis tournament start?"
  },
  {
    id: "w_14",
    q: "【QUESTION】What is your favorite season?\n（一番好きな季節は何ですか？ ➔ 「春が一番好き：桜の花がとても美しいから」）",
    sub: "✍️ 季節のトピックの鉄板フレーズを組み立てよう",
    words: ["First,", "cherry", "blossoms", "are", "very", "beautiful", "in", "spring."],
    explain: "【解説】好きな季節では spring（cherry blossoms are beautiful）や summer（can swim in the sea）が理由を書きやすくておすすめです。",
    audio_question: "First, cherry blossoms are very beautiful in spring."
  },
  {
    id: "w_15",
    q: "【QUESTION】Do you like cooking?\n（料理をするのは好きですか？ ➔ 理由：私が料理をすると家族がとても喜んでくれるから）",
    sub: "✍️ 家族や友達が喜ぶ（make my family happy）を使った理由文",
    words: ["Second,", "cooking", "for", "my", "family", "makes", "them", "very", "happy."],
    explain: "【解説】「make + 人 + happy（人を幸せな気持ちにする）」は、料理や手伝い、プレゼントの話題で大活躍します！",
    audio_question: "Second, cooking for my family makes them very happy."
  },
  {
    id: "w_16",
    q: "【QUESTION】Which do you like better, studying alone or studying with friends?\n（一人で勉強するのと友達と勉強するの、どちらが好き？ ➔ 一人：静かな部屋で集中できるから）",
    sub: "✍️ 勉強場所や方法のトピックで使える理由文",
    words: ["First,", "I", "can", "concentrate", "on", "my", "studies", "in", "a", "quiet", "room."],
    explain: "【解説】concentrate on ~（〜に集中する）や study quietly（静かに勉強する）を使うと説得力のある英文になります。",
    audio_question: "First, I can concentrate on my studies in a quiet room."
  },
  {
    id: "w_17",
    q: "【QUESTION】Which do you like better, studying alone or studying with friends?\n（友達と勉強する方が好き ➔ 理由：難しい問題を一緒に助け合えるから）",
    sub: "✍️ 友達と協力するメリットを表す理由文",
    words: ["Second,", "we", "can", "help", "each", "other", "with", "difficult", "questions."],
    explain: "【解説】help each other（お互いを助け合う）は、部活や友達との学習のテーマで非常に使いやすい表現です。",
    audio_question: "Second, we can help each other with difficult questions."
  },
  {
    id: "w_18",
    q: "【QUESTION】What foreign country would you like to visit?\n（どの外国を訪れてみたいですか？ ➔ オーストラリア：コアラやカンガルーを見たいから）",
    sub: "✍️ 行きたい国とその理由を組み立てよう",
    words: ["First,", "I", "want", "to", "see", "koalas", "and", "kangaroos", "in", "Australia."],
    explain: "【解説】国名（Australia / America / France / Italy）と名物（animals / famous museums / delicious food）をセットで覚えておくと本番で迷いません！",
    audio_question: "First, I want to see koalas and kangaroos in Australia."
  },
  {
    id: "w_19",
    q: "【Eメール問題】友達のPaulから「あなたの誕生日にどんなプレゼントが欲しい？」と聞かれました。\n「新しい英語の辞書が欲しいです」と答える文を作ろう。",
    sub: "✍️ 3級新形式（Eメール返信）：相手からの質問に答える文",
    words: ["I", "would", "like", "a", "new", "English", "dictionary", "for", "my", "birthday."],
    explain: "【Eメール対策】相手からの質問に答えるときは I want ~ や I would like ~ を使って具体的に1〜2文で答えましょう。",
    audio_question: "I would like a new English dictionary for my birthday."
  }
];

// ==================== 4. 言霊カラオケ詠唱：二次面接スピーキング (全16問) ====================
const RAW_SPEAKING_DATA = [
  {
    id: "s_0",
    passageTitle: "🎙️ 【音読パッセージ①】Cycling (サイクリング)",
    passage: "Cycling is a popular activity for many people.\nToday, many cities have special lanes for bicycles, so people can ride safely.\nAlso, riding a bicycle is very good for our health.",
    q: "Please read the passage aloud.",
    sub: "【音読】声に出して読むと単語が黄金に光り、60%以上で自動発動します！",
    targetText: "Cycling is a popular activity for many people. Today, many cities have special lanes for bicycles, so people can ride safely.",
    keywords: ["cycling", "popular", "bicycles", "safely"],
    explain: "【面接のコツ】タイトルから読み始め、ピリオド（.）やコンマ（,）でしっかり一息ついて、大きな声でゆっくり読むと満点（5点）がもらえます！"
  },
  {
    id: "s_1",
    passageTitle: "🎙️ 【No.1 パッセージ質問①】Cycling",
    passage: "Cycling is a popular activity for many people.\nToday, many cities have special lanes for bicycles, so people can ride safely.\nAlso, riding a bicycle is very good for our health.",
    q: "Question No.1: According to the passage, why can people ride bicycles safely today?",
    sub: "【No.1 質問】なぜ今日、人々は安全に自転車に乗れますか？（so の前の文を使って Because ~ で詠唱しよう！）",
    targetText: "Because many cities have special lanes for bicycles.",
    keywords: ["because", "cities", "special", "lanes", "bicycles"],
    explain: "【No.1 必勝法】Why ~? と聞かれたら、本文中の「so」の直前にある文を探し、文頭に「Because」をつけてそのまま読めば大正解です！"
  },
  {
    id: "s_2",
    passageTitle: "🎙️ 【音読パッセージ②】School Gardens (学校の菜園)",
    passage: "Many schools have their own gardens now.\nStudents grow vegetables such as tomatoes and carrots there.\nBy growing vegetables, students can learn about nature and food.",
    q: "Please read the passage aloud.",
    sub: "【音読】「such as ~（〜のような）」で区切ってリズムよく声に出そう！",
    targetText: "Many schools have their own gardens now. Students grow vegetables such as tomatoes and carrots there.",
    keywords: ["schools", "gardens", "vegetables", "tomatoes"],
    explain: "【面接のコツ】知らない単語があっても止まらずに、堂々とローマ字読みでも言い切る姿勢（アティチュード点）が大切です！"
  },
  {
    id: "s_3",
    passageTitle: "🎙️ 【No.1 パッセージ質問②】School Gardens",
    passage: "Many schools have their own gardens now.\nStudents grow vegetables such as tomatoes and carrots there.\nBy growing vegetables, students can learn about nature and food.",
    q: "Question No.1: According to the passage, how can students learn about nature and food?",
    sub: "【No.1 質問】生徒たちはどのようにして自然と食べ物について学べますか？",
    targetText: "By growing vegetables.",
    keywords: ["by", "growing", "vegetables"],
    explain: "【No.1 必勝法】「How can ~?（どうやって〜できますか？）」と聞かれたら、本文の「By ~ing（〜することによって）」の部分を抜き出して答えましょう！"
  },
  {
    id: "s_4",
    passageTitle: "🎙️ 【音読パッセージ③】City Libraries (市立図書館)",
    passage: "City libraries are very useful places for everyone.\nPeople can borrow not only books but also CDs for free.\nMany students go there on weekends because they can study quietly.",
    q: "Please read the passage aloud.",
    sub: "【音読】not only A but also B をはっきり発音して魔石を光らせよう！",
    targetText: "City libraries are very useful places for everyone. People can borrow not only books but also CDs for free.",
    keywords: ["libraries", "useful", "borrow", "books", "free"],
    explain: "【面接のコツ】not only A but also B の部分は A と B を少し強めに読むと、とても自然な英語に聞こえます！"
  },
  {
    id: "s_5",
    passageTitle: "🎙️ 【No.1 パッセージ質問③】City Libraries",
    passage: "City libraries are very useful places for everyone.\nPeople can borrow not only books but also CDs for free.\nMany students go there on weekends because they can study quietly.",
    q: "Question No.1: According to the passage, why do many students go to city libraries on weekends?",
    sub: "【No.1 質問】なぜ多くの生徒は週末に図書館へ行きますか？",
    targetText: "Because they can study quietly.",
    keywords: ["because", "study", "quietly"],
    explain: "【No.1 必勝法】本文中に because がある場合は、その because から後ろをそのまま抜き出して読めば満点です！"
  },
  {
    id: "s_6",
    passageTitle: "🎙️ 【No.2 イラスト描写①】公園の風景",
    passage: "【イラストの状況】\n公園のベンチで、男の子が本を読んでおり、女の子がリンゴを食べています。",
    q: "Question No.2: Look at the picture. What is the boy doing?",
    sub: "【No.2 質問】男の子は何をしていますか？（現在進行形 He is ~ing で詠唱しよう！）",
    targetText: "He is reading a book.",
    keywords: ["reading", "book"],
    explain: "【No.2 必勝法】イラストの人物が今している動作は、必ず現在進行形「He is ~ing. / She is ~ing. / They are ~ing.」で答えます！"
  },
  {
    id: "s_7",
    passageTitle: "🎙️ 【No.2 イラスト描写②】リビングの風景",
    passage: "【イラストの状況】\nリビングで、お父さんが新聞を読んでおり、お母さんがドアを開けようとしています。",
    q: "Question No.2: What is the woman going to do?",
    sub: "【No.2 質問】女性はこれから何をしようとしていますか？（She is going to ~ で詠唱しよう！）",
    targetText: "She is going to open the door.",
    keywords: ["going", "open", "door"],
    explain: "【No.2・3 必勝法】「What is he/she going to do?（これから何をしようとしていますか？）」には「She is going to ＋ 動詞の原形」で答えます！"
  },
  {
    id: "s_8",
    passageTitle: "🎙️ 【No.2 イラスト描写③】駅前の風景",
    passage: "【イラストの状況】\nバス停で、2人の女の子がバスを待っており、男の子が走っています。",
    q: "Question No.2: How many girls are waiting for the bus?",
    sub: "【No.2 質問】何人の女の子がバスを待っていますか？",
    targetText: "Two girls are waiting for the bus.",
    keywords: ["two", "girls", "waiting", "bus"],
    explain: "【解説】How many ~? と数を聞かれたら、「Two.」だけでも通じますが、文で「Two girls are waiting.」と答えるとより丁寧です！"
  },
  {
    id: "s_9",
    passageTitle: "🎙️ 【No.3 イラスト状況説明①】割れたコップ",
    passage: "【イラストの状況】\n男の子のコップがテーブルから落ちて割れてしまったため、男の子がホウキで床を掃除しようとしています。",
    q: "Question No.3: What is the boy going to do?",
    sub: "【No.3 質問】男の子はどうしようとしていますか？",
    targetText: "He is going to clean the floor.",
    keywords: ["going", "clean", "floor"],
    explain: "【解説】「clean the floor（床を掃除する）」「pick up ~（〜を拾う）」「close the window（窓を閉める）」は二次面接のイラスト問題で超頻出です！"
  },
  {
    id: "s_10",
    passageTitle: "🎙️ 【No.3 イラスト状況説明②】雨が降り始めた部屋",
    passage: "【イラストの状況】\n外で急に雨が降り始めたため、女の子が部屋の窓を閉めようとしています。",
    q: "Question No.3: What is the girl going to do?",
    sub: "【No.3 質問】女の子はどうしようとしていますか？",
    targetText: "She is going to close the window.",
    keywords: ["going", "close", "window"],
    explain: "【解説】雨が降ってきた➔窓を閉める（close the window）、傘をさす（open her umbrella）は定番パターンです！"
  },
  {
    id: "s_11",
    passageTitle: "🎙️ 【No.3 イラスト状況説明③】本棚の上の本",
    passage: "【イラストの状況】\n高い棚の上にある本に手が届かないため、男の子が椅子を使ってその本を取ろうとしています。",
    q: "Question No.3: How is the boy going to get the book?",
    sub: "【No.3 質問】男の子はどのようにして本を取ろうとしていますか？",
    targetText: "He is going to use a chair.",
    keywords: ["going", "use", "chair"],
    explain: "【解説】「How is he going to ~?」にも、シンプルに「He is going to use a chair.（椅子を使おうとしている）」と答えればバッチリです！"
  },
  {
    id: "s_12",
    passageTitle: "🎙️ 【No.4 あなた自身への質問①】週末の過ごし方",
    passage: "面接官がカードを伏せて、あなた自身について質問します。",
    q: "Question No.4: What do you like to do on weekends?",
    sub: "【No.4 質問】週末は何をするのが好きですか？",
    targetText: "I like to play soccer with my friends in the park.",
    keywords: ["like", "play", "soccer", "friends", "park"],
    explain: "【No.4 必勝法】「What do you like to do ~?」には「I like to ~」または「I enjoy ~ing」で元気に答えましょう！"
  },
  {
    id: "s_13",
    passageTitle: "🎙️ 【No.4 あなた自身への質問②】夏休みの予定",
    passage: "面接官があなた自身について質問します。",
    q: "Question No.4: Where would you like to go next summer?",
    sub: "【No.4 質問】来年の夏はどこへ行きたいですか？",
    targetText: "I would like to go to Okinawa to swim in the sea.",
    keywords: ["would", "like", "go", "okinawa", "swim"],
    explain: "【No.4 必勝法】「Where would you like to go?」には「I would like to go to 場所 ＋ to 動詞の原形」で答えると満点です！"
  },
  {
    id: "s_14",
    passageTitle: "🎙️ 【No.5 Yes/No質問①】海外旅行の経験",
    passage: "面接官が最後にYes/Noの質問をし、続けて Please tell me more. と尋ねます。",
    q: "Question No.5: Have you ever been to a foreign country? — Yes. Please tell me more.",
    sub: "【No.5 質問】外国へ行ったことはありますか？／もっと詳しく教えてください。",
    targetText: "Yes, I have. I went to Hawaii with my family last year.",
    keywords: ["yes", "have", "went", "hawaii", "family"],
    explain: "【No.5 必勝法】Have you ever ~? にはまず「Yes, I have. / No, I haven't.」と答え、続けて体験や希望を1文付け足しましょう！"
  },
  {
    id: "s_15",
    passageTitle: "🎙️ 【No.5 Yes/No質問②】スポーツ観戦",
    passage: "面接官があなたにYes/Noの質問をし、続けて Why? と尋ねます。",
    q: "Question No.5: Do you like watching sports on TV? — Yes. Why?",
    sub: "【No.5 質問】テレビでスポーツを見るのは好きですか？／なぜですか？",
    targetText: "Yes, I do. Watching baseball games is very exciting for me.",
    keywords: ["yes", "watching", "baseball", "exciting"],
    explain: "【No.5 必勝法】理由を聞かれたら「It is very exciting / fun / interesting.」を使うとどんな質問にも対応できます！"
  }
];

// ==================== 5. 全15章・時空神殿ボス戦用 過去問総合データ (全50問) ====================
const ACTUAL_PAST_EXAM_DATA = [
  {
    id: "past_1", type: "grammar",
    q: "My sister has ( ) the piano since she was five years old.",
    sub: "🏛️ 3級神殿ボス (現在完了・継続)",
    options: ["played", "play", "plays", "playing"], ans: 0,
    explain: "【解説】since she was five（5歳の時からずっと）があるため現在完了形〈has ＋ 過去分詞〉にします。\n【訳】妹は5歳の時からずっとピアノを弾いています。",
    audio_question: "My sister has ... the piano since she was five years old.",
    audio_complete: "My sister has played the piano since she was five years old."
  },
  {
    id: "past_2", type: "grammar",
    q: "This famous novel was ( ) by a British writer in 1890.",
    sub: "🏛️ 3級神殿ボス (受動態)",
    options: ["written", "wrote", "write", "writing"], ans: 0,
    explain: "【解説】by a British writer（イギリスの作家によって）があるため受動態〈was ＋ 過去分詞〉にします。write の過去分詞は written です。",
    audio_question: "This famous novel was ... by a British writer in 1890.",
    audio_complete: "This famous novel was written by a British writer in 1890."
  },
  {
    id: "past_3", type: "grammar",
    q: "The man ( ) is standing near the gate is our new principal.",
    sub: "🏛️ 3級神殿ボス (関係代名詞)",
    options: ["who", "which", "whose", "whom"], ans: 0,
    explain: "【解説】先行詞が人（The man）で主語の働きをする主格の関係代名詞 who が正解です。\n【訳】門の近くに立っている男性は、私たちの新しい校長先生です。",
    audio_question: "The man ... is standing near the gate is our new principal.",
    audio_complete: "The man who is standing near the gate is our new principal."
  },
  {
    id: "past_4", type: "grammar",
    q: "Do you know what time ( ) tomorrow?",
    sub: "🏛️ 3級神殿ボス (間接疑問文)",
    options: ["the plane arrives", "does the plane arrive", "arrives the plane", "will the plane arrive"], ans: 0,
    explain: "【解説】間接疑問文では疑問詞（what time）の後ろは〈主語 ＋ 動詞〉の肯定文の語順（the plane arrives）になります。",
    audio_question: "Do you know what time ... tomorrow?",
    audio_complete: "Do you know what time the plane arrives tomorrow?"
  },
  {
    id: "past_5", type: "grammar",
    q: "The soccer game was put ( ) until next Sunday because of the typhoon.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["off", "on", "out", "up"], ans: 0,
    explain: "【解説】put off 〜 で「〜を延期する」という3級最重要熟語です。\n【訳】台風のため、サッカーの試合は次の日曜日まで延期されました。",
    audio_question: "The soccer game was put ... until next Sunday because of the typhoon.",
    audio_complete: "The soccer game was put off until next Sunday because of the typhoon."
  },
  {
    id: "past_6", type: "grammar",
    q: "A: Have you finished packing your bags yet?\nB: No, I haven't. I'll do it ( ) dinner.",
    sub: "🏛️ 3級神殿ボス (前置詞)",
    options: ["after", "since", "while", "during"], ans: 0,
    explain: "【解説】「夕食のあとに」を表す前置詞 after が正解です。",
    audio_question: "Have you finished packing your bags yet?",
    audio_complete: "No, I haven't. I'll do it after dinner."
  },
  {
    id: "past_7", type: "grammar",
    q: "This river is too dangerous for children ( ) in.",
    sub: "🏛️ 3級神殿ボス (too ... to 構文)",
    options: ["to swim", "swim", "swimming", "swam"], ans: 0,
    explain: "【解説】〈too ＋ 形容詞 ＋ for 人 ＋ to ＋ 動詞の原形〉で「〜すぎて（人が）…できない」を表します。",
    audio_question: "This river is too dangerous for children ... in.",
    audio_complete: "This river is too dangerous for children to swim in."
  },
  {
    id: "past_8", type: "grammar",
    q: "The dog ( ) under the bench belongs to Mr. Tanaka.",
    sub: "🏛️ 3級神殿ボス (現在分詞の後置修飾)",
    options: ["sleeping", "slept", "sleep", "sleeps"], ans: 0,
    explain: "【解説】「ベンチの下で眠っている犬」と名詞を後ろから修飾するため現在分詞 sleeping を使います。",
    audio_question: "The dog ... under the bench belongs to Mr. Tanaka.",
    audio_complete: "The dog sleeping under the bench belongs to Mr. Tanaka."
  },
  {
    id: "past_9", type: "grammar",
    q: "I bought a camera ( ) was made in Japan.",
    sub: "🏛️ 3級神殿ボス (関係代名詞)",
    options: ["which", "who", "whom", "what"], ans: 0,
    explain: "【解説】先行詞がモノ（a camera）なので主格の関係代名詞 which（または that）を使います。",
    audio_question: "I bought a camera ... was made in Japan.",
    audio_complete: "I bought a camera which was made in Japan."
  },
  {
    id: "past_10", type: "grammar",
    q: "My mother told me ( ) forget my umbrella.",
    sub: "🏛️ 3級神殿ボス (否定の不定詞)",
    options: ["not to", "to not", "don't", "never to"], ans: 0,
    explain: "【解説】〈tell ＋ 人 ＋ not to ＋ 動詞の原形〉で「人に〜しないように言う」を表します。",
    audio_question: "My mother told me ... forget my umbrella.",
    audio_complete: "My mother told me not to forget my umbrella."
  },
  {
    id: "past_11", type: "grammar",
    q: "We were very excited when our team ( ) the championship.",
    sub: "🏛️ 3級神殿ボス (動詞の語彙・過去形)",
    options: ["won", "beat", "joined", "passed"], ans: 0,
    explain: "【解説】「優勝を勝ち取った・試合に勝った」は win の過去形 won を使います。",
    audio_question: "We were very excited when our team ... the championship.",
    audio_complete: "We were very excited when our team won the championship."
  },
  {
    id: "past_12", type: "grammar",
    q: "The Olympic Games ( ) place every four years.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["take", "make", "hold", "have"], ans: 0,
    explain: "【解説】take place で「開催される・行われる」を表す重要熟語です。",
    audio_question: "The Olympic Games ... place every four years.",
    audio_complete: "The Olympic Games take place every four years."
  },
  {
    id: "past_13", type: "grammar",
    q: "Neither Ken ( ) his brother can speak French.",
    sub: "🏛️ 3級神殿ボス (接続詞の熟語)",
    options: ["nor", "or", "and", "but"], ans: 0,
    explain: "【解説】neither A nor B で「AもBも〜ない」を表します。\n【訳】ケンも彼の兄もフランス語を話せません。",
    audio_question: "Neither Ken ... his brother can speak French.",
    audio_complete: "Neither Ken nor his brother can speak French."
  },
  {
    id: "past_14", type: "grammar",
    q: "A: Do you mind if I sit here?\nB: ( ). Please go ahead.",
    sub: "🏛️ 3級神殿ボス (会話表現)",
    options: ["Not at all", "Yes, I mind", "I'm sorry", "Thank you"], ans: 0,
    explain: "【解説】Do you mind if ~?（〜しても構いませんか？）に対して快く許可する返答は Not at all.（全然気にしませんよ＝どうぞ）です。",
    audio_question: "Do you mind if I sit here?",
    audio_complete: "Not at all. Please go ahead."
  },
  {
    id: "past_15", type: "grammar",
    q: "I had a bad toothache, so I made an ( ) to see the dentist.",
    sub: "🏛️ 3級神殿ボス (名詞の語彙)",
    options: ["appointment", "advice", "accident", "activity"], ans: 0,
    explain: "【解説】make an appointment で「（病院などの）予約をとる」という3級頻出表現です。",
    audio_question: "I had a bad toothache, so I made an ... to see the dentist.",
    audio_complete: "I had a bad toothache, so I made an appointment to see the dentist."
  },
  {
    id: "past_16", type: "grammar",
    q: "My father ( ) to work at a bank, but now he teaches math at a high school.",
    sub: "🏛️ 3級神殿ボス (過去の習慣)",
    options: ["used", "tried", "enjoyed", "kept"], ans: 0,
    explain: "【解説】used to ＋ 動詞の原形 で「以前は〜していた（今はしていない）」を表します。",
    audio_question: "My father ... to work at a bank, but now he teaches math at a high school.",
    audio_complete: "My father used to work at a bank, but now he teaches math at a high school."
  },
  {
    id: "past_17", type: "grammar",
    q: "The movie was ( ) touching that many people in the theater cried.",
    sub: "🏛️ 3級神殿ボス (so ... that 構文)",
    options: ["so", "too", "very", "enough"], ans: 0,
    explain: "【解説】後ろに that 節が続くため〈so ＋ 形容詞 ＋ that ...〉（とても〜なので…だ）が正解です。",
    audio_question: "The movie was ... touching that many people in the theater cried.",
    audio_complete: "The movie was so touching that many people in the theater cried."
  },
  {
    id: "past_18", type: "grammar",
    q: "Kyoto is one of the most famous ( ) in the world.",
    sub: "🏛️ 3級神殿ボス (最上級の重要構文)",
    options: ["cities", "city", "a city", "the city"], ans: 0,
    explain: "【解説】one of the ＋ 最上級 ＋ 複数名詞（最も〜な…の一つ）の形になるため、複数形の cities が正解です。",
    audio_question: "Kyoto is one of the most famous ... in the world.",
    audio_complete: "Kyoto is one of the most famous cities in the world."
  },
  {
    id: "past_19", type: "grammar",
    q: "Please make ( ) that all the windows are locked before you leave.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["sure", "clear", "right", "safe"], ans: 0,
    explain: "【解説】make sure that ~ で「〜ということを確かめる・確認する」という重要熟語です。",
    audio_question: "Please make ... that all the windows are locked before you leave.",
    audio_complete: "Please make sure that all the windows are locked before you leave."
  },
  {
    id: "past_20", type: "grammar",
    q: "A: How long have you been waiting here?\nB: ( ) about twenty minutes.",
    sub: "🏛️ 3級神殿ボス (期間の前置詞)",
    options: ["For", "Since", "From", "During"], ans: 0,
    explain: "【解説】twenty minutes（20分間）という期間の長さを表すため For が正解です。",
    audio_question: "How long have you been waiting here?",
    audio_complete: "For about twenty minutes."
  },
  {
    id: "past_21", type: "reading",
    passageTitle: "📜 神殿ボス長文：School Recycling Campaign",
    passage: "Next week, South High School will hold a Recycling Campaign from Monday to Friday. Students can bring old newspapers, magazines, and plastic bottles to the box in front of the gym every morning before class.\n\nThe money we get from recycling will be used to buy new books for the school library.",
    highlight: "The money we get from recycling will be used to buy new books for the school library.",
    q: "How will the school use the money from the Recycling Campaign?",
    sub: "🏛️ 3級神殿ボス (長文読解)",
    options: ["To clean the school gym.", "To buy new books for the library.", "To help poor countries.", "To make school newspapers."],
    ans: 1,
    explain: "【解説】最後の文に「used to buy new books for the school library（学校図書館の新しい本を買うために使われます）」と書かれています。",
    audio_complete: "How will the school use the money from the Recycling Campaign? To buy new books for the library."
  },
  {
    id: "past_22", type: "reading",
    passageTitle: "📜 神殿ボス長文：A Cooking Lesson with Grandma",
    passage: "Last Sunday, Kenta visited his grandmother's house because he wanted to learn how to make apple pie. His grandmother is very good at baking sweets.\n\nFirst, they cut five big apples into small pieces and cooked them with sugar. Then, they baked the pie in the oven for forty minutes. Kenta took half of the pie home for his parents, and they loved it!",
    highlight: "because he wanted to learn how to make apple pie.",
    q: "Why did Kenta visit his grandmother's house last Sunday?",
    sub: "🏛️ 3級神殿ボス (長文読解)",
    options: ["To give her some apples.", "To learn how to make apple pie.", "To clean her kitchen.", "To fix her oven."],
    ans: 1,
    explain: "【解説】第1文に「because he wanted to learn how to make apple pie（アップルパイの作り方を習いたかったから）」とあります。",
    audio_complete: "Why did Kenta visit his grandmother's house last Sunday? To learn how to make apple pie."
  },
  {
    id: "past_23", type: "reading",
    passageTitle: "📜 神殿ボス長文：City Museum Special Ticket",
    passage: "Welcome to West City Museum!\nFrom this month, we have started selling a \"Family Weekend Pass.\" Usually, tickets are $10 for adults and $5 for students. However, with the Family Weekend Pass, two adults and up to two students can enter the museum for only $20 on Saturdays and Sundays!",
    highlight: "two adults and up to two students can enter the museum for only $20 on Saturdays and Sundays!",
    q: "When can visitors use the Family Weekend Pass?",
    sub: "🏛️ 3級神殿ボス (長文読解)",
    options: ["Every day.", "Only on Mondays.", "On Saturdays and Sundays.", "Only during summer vacation."],
    ans: 2,
    explain: "【解説】最後の文に「on Saturdays and Sundays（土曜日と日曜日に）」利用できると書かれています。",
    audio_complete: "When can visitors use the Family Weekend Pass? On Saturdays and Sundays."
  },
  {
    id: "past_24", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🏛️ 3級神殿ボス (対話リスニング)",
    options: ["At the bookstore.", "At the post office.", "At the flower shop.", "At the supermarket."],
    ans: 2,
    explain: "【会話】\nBoy: Mom, tomorrow is Mother's Day. I want to buy some red flowers for Grandma.\nWoman: That's a nice idea, Bob. Let's go to the flower shop near the station before we go to the supermarket.\n\n【質問】Where will they go first?（彼らは最初にどこへ行きますか？）\n【正解】3. 花屋へ。",
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
    sub: "🏛️ 3級神殿ボス (対話リスニング)",
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
    sub: "🏛️ 3級神殿ボス (アナウンスリスニング)",
    options: ["Gate 3.", "Gate 5.", "Gate 8.", "Gate 10."],
    ans: 2,
    explain: "【英文】\nAttention, passengers taking Flight 205 to London. The boarding gate has been changed from Gate 5 to Gate 8. Again, please go to Gate 8.\n\n【質問】Which gate should the passengers go to now?（乗客は今どのゲートへ行くべきですか？）\n【正解】3. 8番ゲート。",
    dialogue: [
      { speaker: 'female', text: "Attention, passengers taking Flight 205 to London. The boarding gate has been changed from Gate 5 to Gate 8. Again, please go to Gate 8." },
      { speaker: 'narrator', text: "Question. Which gate should the passengers go to now?" }
    ],
    audio_complete: "Which gate should the passengers go to now? Gate 8."
  },
  {
    id: "past_27", type: "grammar",
    q: "I haven't heard ( ) my uncle since he moved to Australia.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["from", "of", "to", "with"], ans: 0,
    explain: "【解説】hear from 〜 で「〜から便り（連絡）がある」という3級頻出熟語です。",
    audio_question: "I haven't heard ... my uncle since he moved to Australia.",
    audio_complete: "I haven't heard from my uncle since he moved to Australia."
  },
  {
    id: "past_28", type: "grammar",
    q: "We ran out ( ) milk this morning, so I went to the store to buy some.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["of", "from", "off", "away"], ans: 0,
    explain: "【解説】run out of 〜 で「〜を使い果たす・切らす」という重要熟語です。",
    audio_question: "We ran out ... milk this morning, so I went to the store to buy some.",
    audio_complete: "We ran out of milk this morning, so I went to the store to buy some."
  },
  {
    id: "past_29", type: "grammar",
    q: "The girl ( ) mother is a famous pianist won the music contest.",
    sub: "🏛️ 3級神殿ボス (関係代名詞の応用)",
    options: ["whose", "who", "which", "whom"], ans: 0,
    explain: "【解説】「その少女の母親（Her mother）」と所有格のつながりになるため、所有格の関係代名詞 whose が正解です。",
    audio_question: "The girl ... mother is a famous pianist won the music contest.",
    audio_complete: "The girl whose mother is a famous pianist won the music contest."
  },
  {
    id: "past_30", type: "grammar",
    q: "You don't have to hurry. We still have ( ) of time before the train leaves.",
    sub: "🏛️ 3級神殿ボス (数量表現)",
    options: ["plenty", "many", "number", "several"], ans: 0,
    explain: "【解説】plenty of 〜 で「たくさんの〜、十分な〜」を表します。",
    audio_question: "You don't have to hurry. We still have ... of time before the train leaves.",
    audio_complete: "You don't have to hurry. We still have plenty of time before the train leaves."
  },
  {
    id: "past_31", type: "grammar",
    q: "My bicycle was ( ) last night, so I had to walk to school today.",
    sub: "🏛️ 3級神殿ボス (受動態・不規則動詞)",
    options: ["stolen", "stole", "steal", "stealing"], ans: 0,
    explain: "【解説】「自転車が盗まれた（受動態）」なので steal の過去分詞 stolen が正解です。",
    audio_question: "My bicycle was ... last night, so I had to walk to school today.",
    audio_complete: "My bicycle was stolen last night, so I had to walk to school today."
  },
  {
    id: "past_32", type: "grammar",
    q: "A: Have you ever ( ) a shooting star?\nB: Yes, once when I went camping.",
    sub: "🏛️ 3級神殿ボス (現在完了・経験)",
    options: ["seen", "saw", "see", "seeing"], ans: 0,
    explain: "【解説】Have you ever ＋ 過去分詞（seen）で「今までに〜を見たことがありますか」となります。",
    audio_question: "Have you ever ... a shooting star?",
    audio_complete: "Have you ever seen a shooting star? Yes, once when I went camping."
  },
  {
    id: "past_33", type: "grammar",
    q: "Please turn ( ) the radio. The baby is sleeping in the next room.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["down", "up", "into", "over"], ans: 0,
    explain: "【解説】turn down 〜 で「（テレビやラジオの）音量を下げる」という重要熟語です。",
    audio_question: "Please turn ... the radio. The baby is sleeping in the next room.",
    audio_complete: "Please turn down the radio. The baby is sleeping in the next room."
  },
  {
    id: "past_34", type: "grammar",
    q: "I couldn't figure ( ) how to solve the math problem.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["out", "up", "on", "off"], ans: 0,
    explain: "【解説】figure out 〜 で「〜を理解する・解き明かす」という熟語です。",
    audio_question: "I couldn't figure ... how to solve the math problem.",
    audio_complete: "I couldn't figure out how to solve the math problem."
  },
  {
    id: "past_35", type: "grammar",
    q: "The teacher ( ) us clean the classroom before going home.",
    sub: "🏛️ 3級神殿ボス (使役動詞)",
    options: ["made", "told", "asked", "wanted"], ans: 0,
    explain: "【解説】後ろに us ＋ 動詞の原形（clean）が続いているため、〈make ＋ 人 ＋ 原形〉（人に〜させる）の過去形 made が正解です。",
    audio_question: "The teacher ... us clean the classroom before going home.",
    audio_complete: "The teacher made us clean the classroom before going home."
  },
  {
    id: "past_36", type: "grammar",
    q: "Do you know the boy ( ) is talking to our English teacher?",
    sub: "🏛️ 3級神殿ボス (関係代名詞)",
    options: ["who", "which", "whose", "whom"], ans: 0,
    explain: "【解説】先行詞が人（the boy）で直後に動詞 is talking が続くため、主格の関係代名詞 who です。",
    audio_question: "Do you know the boy ... is talking to our English teacher?",
    audio_complete: "Do you know the boy who is talking to our English teacher?"
  },
  {
    id: "past_37", type: "grammar",
    q: "Paper is made ( ) wood.",
    sub: "🏛️ 3級神殿ボス (受動態の熟語)",
    options: ["from", "of", "by", "in"], ans: 0,
    explain: "【解説】木（wood）から紙（paper）のように性質・見た目が変化する場合は be made from 〜 を使います。",
    audio_question: "Paper is made ... wood.",
    audio_complete: "Paper is made from wood."
  },
  {
    id: "past_38", type: "grammar",
    q: "A: How long does it take to get to the airport?\nB: It ( ) on the traffic.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["depends", "belongs", "decides", "agrees"], ans: 0,
    explain: "【解説】It depends on 〜 で「それは〜次第です（交通状況によります）」という3級頻出表現です。",
    audio_question: "How long does it take to get to the airport?",
    audio_complete: "It depends on the traffic."
  },
  {
    id: "past_39", type: "grammar",
    q: "I was taking a shower ( ) the telephone rang.",
    sub: "🏛️ 3級神殿ボス (接続詞)",
    options: ["when", "while", "because", "if"], ans: 0,
    explain: "【解説】「電話が鳴ったとき（when the telephone rang）、シャワーを浴びていた」となります。",
    audio_question: "I was taking a shower ... the telephone rang.",
    audio_complete: "I was taking a shower when the telephone rang."
  },
  {
    id: "past_40", type: "grammar",
    q: "Mount Everest is ( ) than any other mountain in the world.",
    sub: "🏛️ 3級神殿ボス (比較級による最上級表現)",
    options: ["higher", "high", "highest", "more high"], ans: 0,
    explain: "【解説】〈比較級 ＋ than any other ＋ 単数名詞〉で「他のどの…よりも〜だ」を表します。",
    audio_question: "Mount Everest is ... than any other mountain in the world.",
    audio_complete: "Mount Everest is higher than any other mountain in the world."
  },
  {
    id: "past_41", type: "grammar",
    q: "She went to France in ( ) to study art.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["order", "case", "fact", "time"], ans: 0,
    explain: "【解説】in order to ＋ 動詞の原形 で「〜するために」を表します。",
    audio_question: "She went to France in ... to study art.",
    audio_complete: "She went to France in order to study art."
  },
  {
    id: "past_42", type: "grammar",
    q: "A: Would you like some more coffee?\nB: No, thank you. I've had ( ).",
    sub: "🏛️ 3級神殿ボス (会話表現)",
    options: ["enough", "many", "little", "few"], ans: 0,
    explain: "【解説】I've had enough. で「もう十分いただきました」とお代わりを丁寧に断る表現です。",
    audio_question: "Would you like some more coffee?",
    audio_complete: "No, thank you. I've had enough."
  },
  {
    id: "past_43", type: "grammar",
    q: "Please don't throw ( ) these plastic bottles. We can recycle them.",
    sub: "🏛️ 3級神殿ボス (重要熟語)",
    options: ["away", "off", "down", "over"], ans: 0,
    explain: "【解説】throw away 〜 で「〜を捨てる」を表す重要熟語です。",
    audio_question: "Please don't throw ... these plastic bottles. We can recycle them.",
    audio_complete: "Please don't throw away these plastic bottles. We can recycle them."
  },
  {
    id: "past_44", type: "grammar",
    q: "He is saving money ( ) that he can buy a new guitar.",
    sub: "🏛️ 3級神殿ボス (接続詞の熟語)",
    options: ["so", "such", "as", "in"], ans: 0,
    explain: "【解説】so that 〜 can ... で「〜が…できるように（目的）」を表します。",
    audio_question: "He is saving money ... that he can buy a new guitar.",
    audio_complete: "He is saving money so that he can buy a new guitar."
  },
  {
    id: "past_45", type: "reading",
    passageTitle: "📜 神殿ボス長文：A Visit to an Aquarium",
    passage: "Last Saturday, Emi went to Blue Sea Aquarium with her cousin. They wanted to see the penguin parade at 11:00 a.m., but their train was delayed by thirty minutes. When they arrived at the aquarium at 11:30, the parade was already over.\n\nHowever, a kind staff member told them that there would be another penguin parade at 2:00 p.m. So they ate lunch at the aquarium restaurant first and enjoyed the parade in the afternoon!",
    highlight: "there would be another penguin parade at 2:00 p.m.",
    q: "What time did Emi and her cousin see the penguin parade?",
    sub: "🏛️ 3級神殿ボス (長文読解)",
    options: ["At 11:00 a.m.", "At 11:30 a.m.", "At 1:00 p.m.", "At 2:00 p.m."],
    ans: 3,
    explain: "【解説】11時のパレードには間に合いませんでしたが、午後2時（2:00 p.m.）にもう一度パレードがあると教えてもらい、午後に見ることができました。",
    audio_complete: "What time did Emi and her cousin see the penguin parade? At 2:00 p.m."
  },
  {
    id: "past_46", type: "reading",
    passageTitle: "📜 神殿ボス長文：School Flea Market",
    passage: "Notice: School Flea Market\n\nDate: Sunday, November 12th (10:00 a.m. – 3:00 p.m.)\nPlace: School Playground (In case of rain, it will be held in the gym.)\n\nIf you want to sell your old books, clothes, or toys, please write your name on the sheet in the student council room by November 3rd. Please do not bring video games or comic books.",
    highlight: "Please do not bring video games or comic books.",
    q: "Which of the following items CANNOT be sold at the flea market?",
    sub: "🏛️ 3級神殿ボス (長文読解)",
    options: ["Old clothes.", "Toys.", "Comic books.", "Storybooks."],
    ans: 2,
    explain: "【解説】最後の文に「Please do not bring video games or comic books.（テレビゲームや漫画本は持ってこないでください）」とあります。",
    audio_complete: "Which of the following items cannot be sold at the flea market? Comic books."
  },
  {
    id: "past_47", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🏛️ 3級神殿ボス (対話リスニング)",
    options: ["To the hospital.", "To the post office.", "To the bank.", "To the library."],
    ans: 1,
    explain: "【会話】\nGirl: Where are you going, Dad? To the bank?\nMan: No, I have to send this package to your uncle in Sapporo, so I'm going to the post office.\n\n【質問】Where is the man going now?（男性は今どこへ行きますか？）\n【正解】2. 郵便局へ。",
    dialogue: [
      { speaker: 'female', text: "Where are you going, Dad? To the bank?" },
      { speaker: 'male', text: "No, I have to send this package to your uncle in Sapporo, so I'm going to the post office." },
      { speaker: 'narrator', text: "Question. Where is the man going now?" }
    ],
    audio_complete: "Where is the man going now? To the post office."
  },
  {
    id: "past_48", type: "listening",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🏛️ 3級神殿ボス (アナウンスリスニング)",
    options: ["Take the elevator.", "Use the stairs.", "Wait at the entrance.", "Ask a staff member."],
    ans: 1,
    explain: "【英文】\nWelcome to City Tower. Today, the elevator is being repaired, so visitors going to the second-floor café must use the stairs. We apologize for the inconvenience.\n\n【質問】How can visitors go to the second-floor café today?（今日、来館者はどうやって2階のカフェへ行けますか？）\n【正解】2. 階段を使う。",
    dialogue: [
      { speaker: 'male', text: "Welcome to City Tower. Today, the elevator is being repaired, so visitors going to the second-floor café must use the stairs. We apologize for the inconvenience." },
      { speaker: 'narrator', text: "Question. How can visitors go to the second-floor café today?" }
    ],
    audio_complete: "How can visitors go to the second-floor café today? Use the stairs."
  },
  {
    id: "past_49", type: "grammar",
    q: "A: Could you tell me ( ) the museum is open on Mondays?\nB: Sorry, it's closed on Mondays.",
    sub: "🏛️ 3級神殿ボス (間接疑問文・if)",
    options: ["if", "that", "what", "which"], ans: 0,
    explain: "【解説】疑問詞のない疑問文を間接疑問文にするときは、if（または whether）を使って「〜かどうか（月曜日に開いているかどうか）」を表します。",
    audio_question: "Could you tell me ... the museum is open on Mondays?",
    audio_complete: "Could you tell me if the museum is open on Mondays?"
  },
  {
    id: "past_50", type: "grammar",
    q: "Not only the students ( ) also the teacher was surprised at the news.",
    sub: "🏛️ 3級神殿ボス (重要構文)",
    options: ["but", "and", "or", "so"], ans: 0,
    explain: "【解説】not only A but also B で「AだけでなくBも」を表します。\n【訳】生徒たちだけでなく先生もその知らせに驚きました。",
    audio_question: "Not only the students ... also the teacher was surprised at the news.",
    audio_complete: "Not only the students but also the teacher was surprised at the news."
  }
];
