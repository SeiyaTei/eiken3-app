// ==========================================
// 英検3級 クロノ・オデッセイ 〜365日の時空冒険〜
// 過去問3年分相当・大増量拡張データパック (data_extra.js)
// [収録] 3級過去問文法・会話60問 / 長文読解15問 / リスニング＋可変パラレル生成 / ライティング・面接24問
// ==========================================

let isExtraDataRegistered = false;

// ==================== 1. 3級過去問準拠：大問1・大問2（短文空所・会話文）追加60問 ====================
const EXTRA_GRAMMAR_DATA = [
  // --- 大問1：3級過去問頻出・短文語句空所補充 ---
  { id: "gx_1", q: "My grandfather takes a walk in the park every morning ( ) rainy days.", sub: "【訳】祖父は雨の日を除いて、毎朝公園を散歩します。", opt: ["except", "without", "during", "until"], ans: 0, exp: "except 〜 で「〜を除いて、〜以外は」という3級頻出の前置詞です。" },
  { id: "gx_2", q: "The concert hall was ( ) of people who came to listen to the famous violinist.", sub: "【訳】コンサートホールは有名なバイオリニストを聴きに来た人々でいっぱいでした。", opt: ["full", "filled", "crowded", "many"], ans: 0, exp: "後ろに of があるため、be full of 〜（〜でいっぱいである）が正解です（filled や crowded の後ろは with になります）。" },
  { id: "gx_3", q: "A: I have a terrible headache today.\nB: You should take some ( ) and go to bed early.", sub: "【訳】A: 今日はひどい頭痛がするんだ。\nB: 薬を飲んで早く寝たほうがいいよ。", opt: ["medicine", "homework", "exercise", "trouble"], ans: 0, exp: "take medicine で「薬を飲む」という重要表現です。" },
  { id: "gx_4", q: "Ken was very tired, so he fell ( ) on the sofa while watching TV.", sub: "【訳】ケンはとても疲れていたので、テレビを見ている間にソファで眠ってしまいました。", opt: ["asleep", "sleep", "sleepy", "sleeping"], ans: 0, exp: "fall asleep で「眠り込む、寝てしまう」という3級頻出熟語です。" },
  { id: "gx_5", q: "This dictionary is very ( ) when you read English newspapers.", sub: "【訳】英語の新聞を読むとき、この辞書はとても役に立ちます。", opt: ["useful", "careful", "wonderful", "peaceful"], ans: 0, exp: "useful は「役に立つ、便利な」という意味の重要形容詞です。" },
  { id: "gx_6", q: "Please ( ) off your shoes before you enter this room.", sub: "【訳】この部屋に入る前に、靴を脱いでください。", opt: ["take", "put", "turn", "get"], ans: 0, exp: "take off 〜 で「（靴や服）を脱ぐ」を表します（着る・履くは put on です）。" },
  { id: "gx_7", q: "My sister is ( ) of dogs, so she always runs away when she sees one.", sub: "【訳】妹は犬を怖がっているので、見かけるといつも逃げ出します。", opt: ["afraid", "proud", "fond", "tired"], ans: 0, exp: "be afraid of 〜 で「〜を怖がる、恐れる」という重要熟語です。" },
  { id: "gx_8", q: "Could you speak a little more ( )? I can't hear you well.", sub: "【訳】もう少し大きな声で話していただけますか？よく聞こえません。", opt: ["loudly", "quietly", "quickly", "heavily"], ans: 0, exp: "「よく聞こえない」と言っているので、loudly（大きな声で）が正解です。" },
  { id: "gx_9", q: "We have to ( ) a decision by Friday about where to go for our class trip.", sub: "【訳】クラスの遠足でどこへ行くか、金曜日までに決定しなければなりません。", opt: ["make", "do", "take", "keep"], ans: 0, exp: "make a decision で「決定する、決心する」という3級頻出の連語です。" },
  { id: "gx_10", q: "Taro is the ( ) runner in his school. No one can run faster than him.", sub: "【訳】タロウは学校で一番速いランナーです。誰も彼より速く走れません。", opt: ["fastest", "faster", "fast", "most fast"], ans: 0, exp: "the ＋ 最上級 ＋ in 場所 で「〜の中で一番…だ」を表します。" },
  { id: "gx_11", q: "I lent my umbrella ( ) Yumi yesterday because it started to rain.", sub: "【訳】雨が降り始めたので、昨日ユミに私の傘を貸しました。", opt: ["to", "for", "from", "with"], ans: 0, exp: "lend A to B で「AをBに貸す」を表します。" },
  { id: "gx_12", q: "Many kinds of wild animals ( ) in the forests of Hokkaido.", sub: "【訳】北海道の森には多くの種類の野生動物が見られます（発見されます）。", opt: ["are found", "find", "found", "have found"], ans: 0, exp: "主語が「野生動物（wild animals）」なので、受動態 are found（見つけられる・生息している）にします。" },
  { id: "gx_13", q: "Do you know the name of the river ( ) runs through Paris?", sub: "【訳】パリを流れている川の名前を知っていますか？", opt: ["which", "who", "whose", "where"], ans: 0, exp: "前のことばが「モノ（the river）」で主語の働きをする関係代名詞 which です。" },
  { id: "gx_14", q: "My father stopped ( ) coffee at night because he couldn't sleep well.", sub: "【訳】父は夜よく眠れなかったので、夜にコーヒーを飲むのをやめました。", opt: ["drinking", "drink", "drank", "to drink"], ans: 0, exp: "stop 〜ing で「〜するのをやめる」を表します。" },
  { id: "gx_15", q: "Don't forget ( ) the lights when you leave the classroom.", sub: "【訳】教室を出るときに、電気を消すのを忘れないでください。", opt: ["to turn off", "turning off", "turn off", "turned off"], ans: 0, exp: "forget to ＋ 動詞の原形 で「（これから）〜するのを忘れる」を表します。" },
  { id: "gx_16", q: "The train was delayed ( ) the heavy snow this morning.", sub: "【訳】今朝は大雪のため、電車が遅れました。", opt: ["because of", "because", "instead of", "thanks to"], ans: 0, exp: "後ろが文ではなく名詞（the heavy snow）なので、前置詞句の because of 〜（〜が原因で）を使います。" },
  { id: "gx_17", q: "I haven't finished reading the book ( ) I borrowed from the library last week.", sub: "【訳】先週図書館から借りた本をまだ読み終えていません。", opt: ["that", "who", "whose", "what"], ans: 0, exp: "前のことばが「モノ（the book）」で目的格の関係代名詞 that（または which）です。" },
  { id: "gx_18", q: "A: How ( ) is it from this station to the art museum?\nB: It's about two kilometers.", sub: "【訳】A: この駅から美術館までどのくらいの距離ですか？\nB: 約2キロメートルです。", opt: ["far", "long", "many", "much"], ans: 0, exp: "距離（どのくらい遠いか）を尋ねるときは How far 〜? を使います。" },
  { id: "gx_19", q: "When I arrived at the station, the train had ( ) left.", sub: "【訳】駅に着いたとき、電車はすでに出発してしまっていました。", opt: ["already", "yet", "ever", "soon"], ans: 0, exp: "肯定文で「すでに」を表すのは already です。" },
  { id: "gx_20", q: "This cake tastes ( ) sweet for me to eat.", sub: "【訳】このケーキは私には甘すぎて食べられません。", opt: ["too", "so", "very", "enough"], ans: 0, exp: "too ＋ 形容詞 ＋ for 人 ＋ to 原形（〜すぎて人が…できない）の重要構文です。" },
  { id: "gx_21", q: "My brother is interested in ( ) old coins from foreign countries.", sub: "【訳】兄は外国の古い硬貨を集めることに興味があります。", opt: ["collecting", "collect", "collected", "to collect"], ans: 0, exp: "be interested in 〜ing（〜することに興味がある）の形にします。" },
  { id: "gx_22", q: "Please tell me ( ) you will come to the party or not.", sub: "【訳】パーティーに来るのかどうか教えてください。", opt: ["whether", "that", "what", "which"], ans: 0, exp: "whether 〜 or not（または if）で「〜かどうか」を表します。" },
  { id: "gx_23", q: "Our teacher told us to keep ( ) during the test.", sub: "【訳】先生は私たちに、テスト中は静かにしているように言いました。", opt: ["quiet", "quietly", "noise", "noisy"], ans: 0, exp: "keep ＋ 形容詞（quiet）で「〜の状態を保つ（静かにしている）」を表します。" },
  { id: "gx_24", q: "The bridge ( ) last year is the longest in this prefecture.", sub: "【訳】昨年建てられた橋は、この県で一番長いです。", opt: ["built", "building", "builds", "was built"], ans: 0, exp: "「昨年建てられた橋」と後ろから説明する過去分詞 built です（文全体の動詞は is です）。" },
  { id: "gx_25", q: "Let's hurry up, ( ) we will be late for the movie!", sub: "【訳】急ぎましょう、そうしないと映画に遅れてしまいますよ！", opt: ["or", "and", "but", "so"], ans: 0, exp: "命令文, or 〜 で「…しなさい、そうしないと〜だ」を表します。" },
  { id: "gx_26", q: "Study hard, ( ) you will pass the English test.", sub: "【訳】一生懸命勉強しなさい、そうすれば英語のテストに合格しますよ。", opt: ["and", "or", "but", "because"], ans: 0, exp: "命令文, and 〜 で「…しなさい、そうすれば〜だ」を表します。" },
  { id: "gx_27", q: "My mother goes to the supermarket ( ) a week to buy food.", sub: "【訳】母は食料品を買うために週に2回スーパーへ行きます。", opt: ["twice", "two", "second", "double"], ans: 0, exp: "「週に2回」は twice a week と表します（1回は once、3回は three times です）。" },
  { id: "gx_28", q: "This jacket is too small for me. Could you show me ( ) one?", sub: "【訳】このジャケットは私には小さすぎます。別のものを1つ見せていただけますか？", opt: ["another", "other", "others", "the others"], ans: 0, exp: "「（不特定の）もう1つの・別のもの」を表すときは another を使います。" },
  { id: "gx_29", q: "I have two dogs. One is white, and ( ) is black.", sub: "【訳】私は犬を2匹飼っています。1匹は白で、もう1匹は黒です。", opt: ["the other", "another", "others", "other"], ans: 0, exp: "2つあるうちの「1つは One、残りのもう1つは the other」と表す3級頻出構文です。" },
  { id: "gx_30", q: "Some people like summer, and ( ) like winter.", sub: "【訳】夏が好きな人もいれば、冬が好きな人もいます。", opt: ["others", "the other", "another", "other"], ans: 0, exp: "Some 〜, and others ... で「〜な人もいれば、…な人もいる」という重要表現です。" },
  { id: "gx_31", q: "It has been five years ( ) I last saw my cousin.", sub: "【訳】私が最後にいとこに会ってから5年になります。", opt: ["since", "for", "from", "until"], ans: 0, exp: "It has been 年数 since ＋ 過去形の文 で「〜してから…年になる」を表します。" },
  { id: "gx_32", q: "She is proud ( ) her son because he won the first prize.", sub: "【訳】息子が1等賞を取ったので、彼女は息子を誇りに思っています。", opt: ["of", "at", "in", "with"], ans: 0, exp: "be proud of 〜 で「〜を誇りに思う」という3級必須熟語です。" },
  { id: "gx_33", q: "Please put ( ) your toys before dinner.", sub: "【訳】夕食前におもちゃを片付けなさい。", opt: ["away", "off", "out", "up"], ans: 0, exp: "put away 〜 で「〜を片付ける、しまう」を表します。" },
  { id: "gx_34", q: "The fire was put ( ) by the firefighters in thirty minutes.", sub: "【訳】火は消防士たちによって30分で消し止められました。", opt: ["out", "off", "away", "down"], ans: 0, exp: "put out 〜 で「（火を）消す」という重要熟語です。" },
  { id: "gx_35", q: "I looked ( ) the word in my dictionary, but I couldn't find it.", sub: "【訳】辞書でその単語を調べましたが、見つけられませんでした。", opt: ["up", "for", "after", "into"], ans: 0, exp: "look up 〜 で「（辞書などで言葉）を調べる」を表します。" },
  { id: "gx_36", q: "Could you look ( ) my cat while I'm away on a trip?", sub: "【訳】私が旅行で留守の間、私の猫の世話をしてもらえますか？", opt: ["after", "for", "up", "at"], ans: 0, exp: "look after 〜（＝ take care of 〜）で「〜の世話をする」を表します。" },
  { id: "gx_37", q: "My father's car broke ( ) on the highway yesterday.", sub: "【訳】昨日、高速道路で父の車が故障しました。", opt: ["down", "up", "out", "off"], ans: 0, exp: "break down で「（車や機械が）故障する」という3級頻出熟語です。" },
  { id: "gx_38", q: "He wants to be a pilot when he grows ( ).", sub: "【訳】彼は大人になったらパイロットになりたがっています。", opt: ["up", "in", "on", "out"], ans: 0, exp: "grow up で「成長する、大人になる」を表します。" },
  { id: "gx_39", q: "We will take part ( ) the city marathon next month.", sub: "【訳】私たちは来月、市民マラソンに参加します。", opt: ["in", "on", "at", "to"], ans: 0, exp: "take part in 〜（＝ join 〜）で「〜に参加する」という超重要熟語です。" },
  { id: "gx_40", q: "You don't ( ) to bring your umbrella today. It will be sunny all day.", sub: "【訳】今日は傘を持ってくる必要はありません。一日中晴れるでしょう。", opt: ["have", "must", "should", "can"], ans: 0, exp: "don't have to ＋ 原形 で「〜する必要はない」を表します。" },

  // --- 大問2：3級過去問頻出・会話文空所補充 20問 ---
  { id: "gx_41", q: "A: Excuse me. How can I get to the City Library?\nB: ( ). Get off at the third stop.", sub: "【訳】A: すみません。市立図書館へはどう行けばいいですか？\nB: 5番のバスに乗ってください。3つ目のバス停で降りてください。", opt: ["Take Bus No. 5", "It takes ten minutes", "Yes, you can", "I've never been there"], ans: 0, exp: "後ろに「3つ目の停留所で降りてください（Get off at the third stop）」と続くため、バスに乗るよう案内する文が正解です。" },
  { id: "gx_42", q: "A: Hello. May I speak to Mr. Brown, please?\nB: I'm sorry, he is out right now. ( )?", sub: "【訳】A: もしもし。ブラウンさんをお願いできますか？\nB: 申し訳ありません、今外出しております。伝言を承りましょうか？", opt: ["Can I take a message", "Who is calling", "Where is he going", "Hold on, please"], ans: 0, exp: "電話で相手が不在のときに「伝言をお預かりしましょうか？（Can I take a message?）」と尋ねる定番表現です。" },
  { id: "gx_43", q: "A: What's the matter, Ken? You don't look well.\nB: ( ). I ate too much ice cream last night.", sub: "【訳】A: どうしたの、ケン？顔色がよくないわよ。\nB: おなかが痛いんだ。昨夜アイスクリームを食べすぎたよ。", opt: ["I have a stomachache", "I lost my textbook", "I passed the test", "I'm looking for my cap"], ans: 0, exp: "What's the matter?（どうしたの？）と聞かれ、後ろに「アイスを食べすぎた」とあるので I have a stomachache.（腹痛がする）が正解です。" },
  { id: "gx_44", q: "A: Thank you very much for helping me carry these boxes.\nB: ( ). Anytime.", sub: "【訳】A: 箱を運ぶのを手伝ってくれて本当にありがとう。\nB: どういたしまして。いつでもどうぞ。", opt: ["Don't mention it", "Never mind", "Certainly", "Here you are"], ans: 0, exp: "お礼（Thank you）に対する「どういたしまして」は You're welcome. や Don't mention it. を使います。" },
  { id: "gx_45", q: "A: Can I use your pen for a minute?\nB: ( ). Here you are.", sub: "【訳】A: ちょっとペンを借りてもいい？\nB: もちろんいいよ。はい、どうぞ。", opt: ["Go ahead", "Not yet", "I'm afraid not", "Thank you"], ans: 0, exp: "Go ahead. は許可を求められたときに「どうぞ」と快諾する重要会話表現です。" },
  { id: "gx_46", q: "A: How was your trip to Hokkaido last week?\nB: ( ). The food was delicious and the snow was beautiful.", sub: "【訳】A: 先週の北海道旅行はどうだった？\nB: 最高だったよ。食べ物はおいしかったし、雪もきれいだったよ。", opt: ["It was wonderful", "By airplane", "For three days", "With my family"], ans: 0, exp: "How was 〜?（〜はどうでしたか？）と感想を聞かれているので It was wonderful. が正解です。" },
  { id: "gx_47", q: "A: Shall we go to the new café after school today?\nB: ( ). Let's go there together!", sub: "【訳】A: 今日の放課後、新しいカフェに行かない？\nB: いいね！一緒に行こう！", opt: ["Sounds great", "That's too bad", "No, thank you", "I'm sorry to hear that"], ans: 0, exp: "誘い（Shall we 〜?）に対して「いいですね！（Sounds great! / Good idea!）」と賛成する表現です。" },
  { id: "gx_48", q: "A: My dog is sick, so I have to take him to the animal hospital.\nB: Oh, ( ). I hope he gets better soon.", sub: "【訳】A: 私の犬が病気で、動物病院に連れて行かなきゃいけないんだ。\nB: まあ、それはお気の毒に（大変だね）。早く良くなるといいね。", opt: ["I'm sorry to hear that", "congratulations", "that's a good idea", "you're welcome"], ans: 0, exp: "相手の良くない知らせを聞いたときは I'm sorry to hear that.（それは大変ですね・お気の毒に）と返します。" },
  { id: "gx_49", q: "A: I won the first prize in the English speech contest!\nB: Really? ( )! You practiced so hard.", sub: "【訳】A: 英語のスピーチコンテストで優勝したよ！\nB: 本当に？おめでとう！すごく一生懸命練習していたものね。", opt: ["Congratulations", "Do your best", "Good luck", "Never mind"], ans: 0, exp: "すでに優勝した・合格した相手を祝うときは Congratulations!（おめでとう！）を使います。" },
  { id: "gx_50", q: "A: Excuse me. May I sit next to you?\nB: ( ). Someone is sitting here.", sub: "【訳】A: すみません。隣に座ってもいいですか？\nB: すみません、ダメなんです。ここは他の人が座っています。", opt: ["I'm afraid not", "Not at all", "Sure, go ahead", "No problem"], ans: 0, exp: "後ろに「誰かがここに座っています」と断る理由があるため、I'm afraid not.（申し訳ありませんがダメです）が正解です。" },
  { id: "gx_51", q: "A: What size sweater are you looking for?\nB: ( ). Do you have this in blue?", sub: "【訳】A: どのサイズのセーターをお探しですか？\nB: Mサイズです。これの青色はありますか？", opt: ["A medium, please", "Twenty dollars", "In the fitting room", "By credit card"], ans: 0, exp: "What size 〜? とサイズを尋ねられているので A medium, please.（Mサイズをお願いします）が正解です。" },
  { id: "gx_52", q: "A: How would you like to pay, cash or credit card?\nB: ( ), please.", sub: "【訳】A: お支払いはいかがなさいますか、現金ですかクレジットカードですか？\nB: 現金でお願いします。", opt: ["In cash", "Two tickets", "Here is the menu", "At the register"], ans: 0, exp: "支払い方法を聞かれたときは In cash（現金で）または By credit card（カードで）と答えます。" },
  { id: "gx_53", q: "A: For here or to go?\nB: ( ). I'll eat it in the park.", sub: "【訳】A: 店内で召し上がりますか、それともお持ち帰りですか？\nB: 持ち帰りでお願いします。公園で食べますから。", opt: ["To go, please", "Yes, I will", "It's delicious", "I'd like a hamburger"], ans: 0, exp: "ファーストフード店などの定番表現で、「店内（For here）か持ち帰り（To go）か」に対し、公園で食べるので To go, please. が正解です。" },
  { id: "gx_54", q: "A: I can't find my English dictionary anywhere.\nB: ( )? I saw it there this morning.", sub: "【訳】A: 英語の辞書がどこにも見当たらないんだ。\nB: リビングのテーブルの上は見た？今朝そこにあるのを見たわよ。", opt: ["Did you look on the table", "When did you buy it", "Whose dictionary is it", "Can you lend it to me"], ans: 0, exp: "後ろに「今朝そこにあるのを見た」と続くため、場所を確認する Did you look on the table? が正解です。" },
  { id: "gx_55", q: "A: What time shall we meet at the station tomorrow?\nB: ( ). The train leaves at nine twenty.", sub: "【訳】A: 明日、駅で何時に待ち合わせようか？\nB: 9時はどう？電車は9時20分に出るよ。", opt: ["How about nine o'clock", "In front of the gate", "By bus", "For two hours"], ans: 0, exp: "What time 〜? に対して時間を提案する How about nine o'clock?（9時はどう？）が正解です。" },
  { id: "gx_56", q: "A: Have you decided what to order?\nB: Yes. ( ).", sub: "【訳】A: 何を注文するか決まりましたか？\nB: はい。サンドイッチとオレンジジュースにします。", opt: ["I'll have a sandwich and orange juice", "It was very delicious", "No, not yet", "Thank you for the meal"], ans: 0, exp: "注文を伝える表現 I'll have 〜（〜にします・〜をください）が正解です。" },
  { id: "gx_57", q: "A: Would you like another cup of tea?\nB: Yes, please. ( ).", sub: "【訳】A: 紅茶をもう1杯いかがですか？\nB: はい、お願いします。この紅茶はとてもおいしいですね。", opt: ["This tea is very good", "I'm full now", "I don't like tea", "No, thank you"], ans: 0, exp: "Yes, please. とお代わりをもらっているので、肯定的な感想 This tea is very good. がつながります。" },
  { id: "gx_58", q: "A: Why don't we go cycling this Saturday?\nB: That sounds fun, ( ). How about Sunday?", sub: "【訳】A: 今度の土曜日にサイクリングに行かない？\nB: 楽しそうだね、でも土曜日はピアノのレッスンがあるんだ。日曜日はどう？", opt: ["but I have a piano lesson on Saturday", "so let's meet at nine", "and I love cycling", "because it will be sunny"], ans: 0, exp: "後ろで「日曜日はどう？」と別の日を提案しているため、土曜日の都合が悪い理由を述べる文が正解です。" },
  { id: "gx_59", q: "A: Excuse me. Is this seat taken?\nB: ( ). Please sit down.", sub: "【訳】A: すみません。この席は空いていますか（誰か座っていますか）？\nB: いいえ、空いていますよ。どうぞ座ってください。", opt: ["No, it isn't", "Yes, it is", "I think so", "That's right"], ans: 0, exp: "Is this seat taken?（この席はふさがっていますか？）に対し、「いいえ（ふさがっていません＝空いています）、どうぞ座ってください」なので No, it isn't. が正解です。" },
  { id: "gx_60", q: "A: Could you tell me when the next bus comes?\nB: ( ). Let me check the timetable.", sub: "【訳】A: 次のバスがいつ来るか教えていただけますか？\nB: ちょっと待ってくださいね。時刻表を確認してみます。", opt: ["Just a moment", "Ten minutes ago", "At the bus stop", "You're welcome"], ans: 0, exp: "「時刻表を確認させてください」の前に置く「ちょっと待ってください（Just a moment.）」が正解です。" }
];

// ==================== 2. 3級過去問準拠：長文読解（掲示・Eメール・説明文）追加15問 ====================
const EXTRA_READING_DATA = [
  {
    id: "rx_1",
    passageTitle: "📜 【掲示】City Swimming Pool Summer Rules (市民プールの案内)",
    passage: "Welcome to North City Swimming Pool!\n\nOpen: July 1st – August 31st\nHours: 9:30 a.m. – 5:00 p.m. (Closed on Mondays)\nTicket: $4 for adults / $2 for children under 15\n\n* Everyone must wear a swimming cap in the pool.\n* Children under 10 must come with an adult.\n* You can rent a towel for $1 at the front desk.",
    highlight: "Everyone must wear a swimming cap in the pool.",
    q: "What must everyone do in the swimming pool?",
    sub: "【質問】プールの中では、全員が何をしなければなりませんか？",
    options: ["Rent a towel at the front desk.", "Wear a swimming cap.", "Come with an adult.", "Leave before 4:00 p.m."],
    ans: 1,
    explain: "【解説】注意書きの1つ目に「Everyone must wear a swimming cap in the pool.（全員プール内では水泳帽をかぶらなければならない）」とあります。",
    audio_complete: "What must everyone do in the swimming pool? Wear a swimming cap."
  },
  {
    id: "rx_2",
    passageTitle: "📜 【掲示】City Swimming Pool Summer Rules (市民プールの案内)",
    passage: "Welcome to North City Swimming Pool!\n\nOpen: July 1st – August 31st\nHours: 9:30 a.m. – 5:00 p.m. (Closed on Mondays)\nTicket: $4 for adults / $2 for children under 15\n\n* Everyone must wear a swimming cap in the pool.\n* Children under 10 must come with an adult.\n* You can rent a towel for $1 at the front desk.",
    highlight: "Children under 10 must come with an adult.",
    q: "Who has to come to the pool with an adult?",
    sub: "【質問】大人と一緒にプールへ来なければならないのは誰ですか？",
    options: ["All high school students.", "Children under 10.", "People who cannot swim.", "People who visit on Mondays."],
    ans: 1,
    explain: "【解説】注意書きの2つ目に「Children under 10 must come with an adult.（10歳未満の子供は大人と一緒に来なければならない）」と書かれています。",
    audio_complete: "Who has to come to the pool with an adult? Children under 10."
  },
  {
    id: "rx_3",
    passageTitle: "📜 【掲示】School Art Contest (校内アートコンテスト)",
    passage: "Green Junior High School Art Contest\n\nTheme: \"My Favorite Place in Our Town\"\nBring your picture to the art room by Friday, October 20th. Please write your name and class number on the back of your picture.\n\nAll pictures will be shown in the school library from October 25th to November 5th. The winner will get a special set of 24 color pencils!",
    highlight: "write your name and class number on the back of your picture.",
    q: "What should students write on the back of their pictures?",
    sub: "【質問】生徒は絵の裏側に何を書く必要がありますか？",
    options: ["The date they painted it.", "The name of their favorite place.", "Their name and class number.", "A message to the art teacher."],
    ans: 2,
    explain: "【解説】第1段落の最後に「Please write your name and class number on the back of your picture.（絵の裏に名前とクラス番号を書いてください）」とあります。",
    audio_complete: "What should students write on the back of their pictures? Their name and class number."
  },
  {
    id: "rx_4",
    passageTitle: "📜 【掲示】School Art Contest (校内アートコンテスト)",
    passage: "Green Junior High School Art Contest\n\nTheme: \"My Favorite Place in Our Town\"\nBring your picture to the art room by Friday, October 20th. Please write your name and class number on the back of your picture.\n\nAll pictures will be shown in the school library from October 25th to November 5th. The winner will get a special set of 24 color pencils!",
    highlight: "All pictures will be shown in the school library",
    q: "Where can students see the pictures from October 25th?",
    sub: "【質問】10月25日から、生徒はどこでその絵を見ることができますか？",
    options: ["In the art room.", "In the school library.", "In the city museum.", "In the school gym."],
    ans: 1,
    explain: "【解説】第2段落に「All pictures will be shown in the school library（すべての絵は学校の図書室に展示されます）」とあります。",
    audio_complete: "Where can students see the pictures from October 25th? In the school library."
  },
  {
    id: "rx_5",
    passageTitle: "📜 【Eメール】From: Sam / To: Grandpa (祖父へのメール)",
    passage: "Dear Grandpa,\n\nHow are you doing? Last Saturday, my soccer team had an important game against West Junior High School. In the first half, the other team scored one goal. However, in the second half, I scored two goals and our team won the game!\n\nMy father took a video of the game with his new camera. When we visit your house next Sunday, I will show it to you!\n\nLove,\nSam",
    highlight: "I scored two goals and our team won the game!",
    q: "What happened in the second half of the soccer game?",
    sub: "【質問】サッカーの試合の後半（the second half）で何が起きましたか？",
    options: ["Sam hurt his leg.", "It started to rain heavily.", "Sam scored two goals and his team won.", "The other team scored two goals."],
    ans: 2,
    explain: "【解説】第1段落の最後に「in the second half, I scored two goals and our team won the game!（後半に私が2ゴールを決めてチームが勝った）」とあります。",
    audio_complete: "What happened in the second half of the soccer game? Sam scored two goals and his team won."
  },
  {
    id: "rx_6",
    passageTitle: "📜 【Eメール】From: Sam / To: Grandpa (祖父へのメール)",
    passage: "Dear Grandpa,\n\nHow are you doing? Last Saturday, my soccer team had an important game against West Junior High School. In the first half, the other team scored one goal. However, in the second half, I scored two goals and our team won the game!\n\nMy father took a video of the game with his new camera. When we visit your house next Sunday, I will show it to you!\n\nLove,\nSam",
    highlight: "When we visit your house next Sunday, I will show it to you!",
    q: "What will Sam do when he visits his grandfather's house?",
    sub: "【質問】サムはおじいちゃんの家を訪れたとき、何をする予定ですか？",
    options: ["Play soccer with his grandfather.", "Buy a new camera for his father.", "Show a video of the soccer game.", "Watch a professional soccer game on TV."],
    ans: 2,
    explain: "【解説】第2段落に「父が撮った試合のビデオ（it）を、来週の日曜日にあなたの家へ行ったときに見せます（I will show it to you）」とあります。",
    audio_complete: "What will Sam do when he visits his grandfather's house? Show a video of the soccer game."
  },
  {
    id: "rx_7",
    passageTitle: "📜 【Eメール】Strawberry Picking Trip (いちご狩りの誘い)",
    passage: "Hi Meg,\n\nNext Saturday, my family is going to go strawberry picking at Sunny Farm. My mother says you can come with us if you are free! We will leave our house by car at 8:30 a.m., so we can pick you up at your house at 8:40 a.m.\n\nAt the farm, we can eat as many strawberries as we want for one hour. After that, we will have lunch at a famous pizza restaurant near the farm.\n\nPlease let me know if you can come!\nKana",
    highlight: "we can pick you up at your house at 8:40 a.m.",
    q: "How will Meg go to Sunny Farm if she joins the trip?",
    sub: "【質問】もしメグが参加する場合、どうやってSunny Farmへ行きますか？",
    options: ["By train with Kana.", "By bus from the station.", "By car with Kana's family.", "By bicycle in the morning."],
    ans: 2,
    explain: "【解説】第1段落に「車で8時半に家を出て、8時40分にあなたの家に迎えに行けます（pick you up at your house）」とあります。",
    audio_complete: "How will Meg go to Sunny Farm if she joins the trip? By car with Kana's family."
  },
  {
    id: "rx_8",
    passageTitle: "📜 【Eメール】Strawberry Picking Trip (いちご狩りの誘い)",
    passage: "Hi Meg,\n\nNext Saturday, my family is going to go strawberry picking at Sunny Farm. My mother says you can come with us if you are free! We will leave our house by car at 8:30 a.m., so we can pick you up at your house at 8:40 a.m.\n\nAt the farm, we can eat as many strawberries as we want for one hour. After that, we will have lunch at a famous pizza restaurant near the farm.\n\nPlease let me know if you can come!\nKana",
    highlight: "After that, we will have lunch at a famous pizza restaurant near the farm.",
    q: "What will they do after strawberry picking?",
    sub: "【質問】いちご狩りのあと、彼女たちは何をしますか？",
    options: ["Make strawberry cake at Kana's house.", "Have lunch at a pizza restaurant.", "Go shopping near the station.", "Visit a zoo near the farm."],
    ans: 1,
    explain: "【解説】第2段落の2文目に「After that, we will have lunch at a famous pizza restaurant near the farm.（その後、農園近くの有名なピザレストランで昼食を食べます）」とあります。",
    audio_complete: "What will they do after strawberry picking? Have lunch at a pizza restaurant."
  },
  {
    id: "rx_9",
    passageTitle: "📜 【説明文】Why Do Dogs Wag Their Tails? (犬がしっぽを振る理由)",
    passage: "Most people know that dogs wag their tails when they are happy or excited. However, scientists have found that the direction of the tail is also important.\n\nWhen a dog sees someone it loves, such as its owner, it wags its tail more to the right side. On the other hand, when a dog sees a strange dog or feels nervous, it wags its tail more to the left side. So, watching a dog's tail carefully can help you understand its feelings!",
    highlight: "When a dog sees someone it loves, such as its owner, it wags its tail more to the right side.",
    q: "When does a dog wag its tail more to the right side?",
    sub: "【質問】犬がしっぽをより「右側」に振るのはどんなときですか？",
    options: ["When it is very hungry.", "When it sees someone it loves, like its owner.", "When it sees a strange dog.", "When it wants to sleep."],
    ans: 1,
    explain: "【解説】第2段落の第1文に「飼い主のような大好きな人を見たとき、しっぽをより右側に振る（wags its tail more to the right side）」と書かれています。",
    audio_complete: "When does a dog wag its tail more to the right side? When it sees someone it loves, like its owner."
  },
  {
    id: "rx_10",
    passageTitle: "📜 【説明文】Why Do Dogs Wag Their Tails? (犬がしっぽを振る理由)",
    passage: "Most people know that dogs wag their tails when they are happy or excited. However, scientists have found that the direction of the tail is also important.\n\nWhen a dog sees someone it loves, such as its owner, it wags its tail more to the right side. On the other hand, when a dog sees a strange dog or feels nervous, it wags its tail more to the left side. So, watching a dog's tail carefully can help you understand its feelings!",
    highlight: "when a dog sees a strange dog or feels nervous, it wags its tail more to the left side.",
    q: "How does a dog feel when it wags its tail more to the left side?",
    sub: "【質問】犬がしっぽをより「左側」に振っているとき、どのように感じていますか？",
    options: ["It feels very happy.", "It feels sleepy and tired.", "It feels nervous.", "It wants to play with its owner."],
    ans: 2,
    explain: "【解説】第2段落の2文目に「見知らぬ犬を見たり、緊張したりしているとき（feels nervous）は左側に振る」とあります。",
    audio_complete: "How does a dog feel when it wags its tail more to the left side? It feels nervous."
  },
  {
    id: "rx_11",
    passageTitle: "📜 【説明文】A Town Without Cars (車のない街：ツェルマット)",
    passage: "Zermatt is a beautiful mountain town in Switzerland. Every year, many tourists visit this town to see the famous mountain called the Matterhorn.\n\nTo keep the air clean and protect nature, regular cars using gasoline cannot enter Zermatt. Visitors must leave their cars at a parking lot in the next town and take a train to Zermatt. Inside the town, people walk, ride bicycles, or use small electric buses.",
    highlight: "To keep the air clean and protect nature, regular cars using gasoline cannot enter Zermatt.",
    q: "Why cannot regular cars enter the town of Zermatt?",
    sub: "【質問】なぜ普通のガソリン車はツェルマットの街に入ることができないのですか？",
    options: ["Because the roads are covered with snow all year.", "Because there are no bridges to the town.", "To keep the air clean and protect nature.", "To make more space for souvenir shops."],
    ans: 2,
    explain: "【解説】第2段落の最初に「To keep the air clean and protect nature（空気をきれいに保ち、自然を守るため）」と書かれています。",
    audio_complete: "Why cannot regular cars enter the town of Zermatt? To keep the air clean and protect nature."
  },
  {
    id: "rx_12",
    passageTitle: "📜 【説明文】A Town Without Cars (車のない街：ツェルマット)",
    passage: "Zermatt is a beautiful mountain town in Switzerland. Every year, many tourists visit this town to see the famous mountain called the Matterhorn.\n\nTo keep the air clean and protect nature, regular cars using gasoline cannot enter Zermatt. Visitors must leave their cars at a parking lot in the next town and take a train to Zermatt. Inside the town, people walk, ride bicycles, or use small electric buses.",
    highlight: "Visitors must leave their cars at a parking lot in the next town and take a train to Zermatt.",
    q: "How do visitors with cars go to Zermatt from the next town?",
    sub: "【質問】車で来た観光客は、隣の街からどうやってツェルマットへ行きますか？",
    options: ["By taking a train.", "By riding horses.", "By walking on the mountain road.", "By taking a boat."],
    ans: 0,
    explain: "【解説】第2段落の2文目に「隣の街の駐車場に車を置いて、電車に乗ってツェルマットへ行く（take a train to Zermatt）」とあります。",
    audio_complete: "How do visitors with cars go to Zermatt from the next town? By taking a train."
  },
  {
    id: "rx_13",
    passageTitle: "📜 【物語】The School Flea Market (学校のフリーマーケット)",
    passage: "Last Sunday, Riku's school held a flea market in the gym. Riku brought ten old storybooks that he used to read when he was an elementary school student. He sold each book for 100 yen.\n\nBy noon, all of his books were sold! With the 1,000 yen he earned, Riku bought a handmade key ring for his mother because her birthday was the next day. His mother was very pleased with the present.",
    highlight: "With the 1,000 yen he earned, Riku bought a handmade key ring for his mother",
    q: "What did Riku do with the money he earned at the flea market?",
    sub: "【質問】リクはフリーマーケットで得たお金で何をしましたか？",
    options: ["He bought new storybooks for himself.", "He bought a handmade key ring for his mother.", "He donated all the money to his school.", "He ate lunch with his friends."],
    ans: 1,
    explain: "【解説】第2段落に「得た1,000円で、翌日が誕生日だった母のために手作りのキーホルダーを買った（bought a handmade key ring for his mother）」とあります。",
    audio_complete: "What did Riku do with the money he earned at the flea market? He bought a handmade key ring for his mother."
  },
  {
    id: "rx_14",
    passageTitle: "📜 【説明文】The History of Umbrellas (傘の歴史)",
    passage: "Today, we use umbrellas on rainy days. However, when umbrellas were first invented thousands of years ago in ancient Egypt and China, they were not used for rain.\n\nIn those days, umbrellas were used to protect important people, such as kings and queens, from the strong sunlight. Later, in the 18th century, people in Europe started putting oil on umbrella cloth to keep water out, and umbrellas became popular for rainy days.",
    highlight: "umbrellas were used to protect important people, such as kings and queens, from the strong sunlight.",
    q: "Why did people use umbrellas in ancient Egypt and China?",
    sub: "【質問】古代エジプトや中国では、人々はなぜ傘を使っていましたか？",
    options: ["To protect important people from strong sunlight.", "To walk in the heavy rain.", "To carry water from rivers.", "To catch wild birds."],
    ans: 0,
    explain: "【解説】第2段落の第1文に「王や女王などの重要な人々を強い日差し（the strong sunlight）から守るために使われた」とあります。",
    audio_complete: "Why did people use umbrellas in ancient Egypt and China? To protect important people from strong sunlight."
  },
  {
    id: "rx_15",
    passageTitle: "📜 【説明文】The History of Umbrellas (傘の歴史)",
    passage: "Today, we use umbrellas on rainy days. However, when umbrellas were first invented thousands of years ago in ancient Egypt and China, they were not used for rain.\n\nIn those days, umbrellas were used to protect important people, such as kings and queens, from the strong sunlight. Later, in the 18th century, people in Europe started putting oil on umbrella cloth to keep water out, and umbrellas became popular for rainy days.",
    highlight: "people in Europe started putting oil on umbrella cloth to keep water out",
    q: "What did people in Europe put on umbrella cloth in the 18th century?",
    sub: "【質問】18世紀にヨーロッパの人々は、水をはじくために傘の布に何を塗りましたか？",
    options: ["Wax.", "Oil.", "Paint.", "Salt."],
    ans: 1,
    explain: "【解説】最後の文に「started putting oil on umbrella cloth to keep water out（水を防ぐために傘の布に油を塗り始めた）」とあります。",
    audio_complete: "What did people in Europe put on umbrella cloth in the 18th century? Oil."
  }
];

// ==================== 3. 丸暗記防止：パラレル可変リスニング＆追加リスニング (計40パターン以上) ====================
const EXTRA_LISTENING_DATA = [
  {
    id: "lx_1",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング（過去問頻出：天候の変化）",
    opt: ["Sunny.", "Rainy.", "Cloudy.", "Snowy."],
    ans: 1,
    explain: "【会話】\nGirl: Dad, is it going to be sunny tomorrow? I have a tennis game.\nMan: Well, the weather forecast says it will be sunny in the morning, but it will start raining in the afternoon.\n\n【質問】How will the weather be tomorrow afternoon?（明日の午後の天気はどうなりますか？）\n【正解】2. 雨（Rainy.）。",
    dialogue: [
      { speaker: 'female', text: "Dad, is it going to be sunny tomorrow? I have a tennis game." },
      { speaker: 'male', text: "Well, the weather forecast says it will be sunny in the morning, but it will start raining in the afternoon." },
      { speaker: 'narrator', text: "Question. How will the weather be tomorrow afternoon?" }
    ],
    audio_complete: "How will the weather be tomorrow afternoon? Rainy."
  },
  {
    id: "lx_2",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング（過去問頻出：忘れ物・探し物）",
    opt: ["On the kitchen table.", "In her school bag.", "On the sofa.", "In the car."],
    ans: 2,
    explain: "【会話】\nGirl: Mom, have you seen my English notebook? It's not on the kitchen table.\nWoman: Oh, I saw it on the sofa in the living room a few minutes ago.\n\n【質問】Where is the girl's notebook?（女の子のノートはどこにありますか？）\n【正解】3. ソファの上。",
    dialogue: [
      { speaker: 'female', text: "Mom, have you seen my English notebook? It's not on the kitchen table." },
      { speaker: 'female', text: "Oh, I saw it on the sofa in the living room a few minutes ago." },
      { speaker: 'narrator', text: "Question. Where is the girl's notebook?" }
    ],
    audio_complete: "Where is the girl's notebook? On the sofa."
  },
  {
    id: "lx_3",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第2部】対話リスニング（過去問頻出：休日の予定変更）",
    opt: ["Go fishing.", "Play soccer.", "Watch a movie.", "Clean the garden."],
    ans: 3,
    explain: "【会話】\nBoy: Are you going fishing with your father this Saturday, Bob?\nBoy 2: We wanted to, but my grandmother is coming to our house on Sunday, so we have to clean the garden on Saturday.\n\n【質問】What will Bob do this Saturday?（ボブは今度の土曜日に何をしますか？）\n【正解】4. 庭を掃除する。",
    dialogue: [
      { speaker: 'male', text: "Are you going fishing with your father this Saturday, Bob?" },
      { speaker: 'male', text: "We wanted to, but my grandmother is coming to our house on Sunday, so we have to clean the garden on Saturday." },
      { speaker: 'narrator', text: "Question. What will Bob do this Saturday?" }
    ],
    audio_complete: "What will Bob do this Saturday? Clean the garden."
  },
  {
    id: "lx_4",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】アナウンス（過去問頻出：電車の番線案内）",
    opt: ["Track 1.", "Track 2.", "Track 3.", "Track 4."],
    ans: 2,
    explain: "【英文】\nAttention, please. The express train for Green City usually leaves from Track 2, but today it will leave from Track 3 at ten fifteen.\n\n【質問】Which track will the express train leave from today?（今日、急行電車は何番線から出ますか？）\n【正解】3. 3番線（Track 3.）。",
    dialogue: [
      { speaker: 'female', text: "Attention, please. The express train for Green City usually leaves from Track 2, but today it will leave from Track 3 at ten fifteen." },
      { speaker: 'narrator', text: "Question. Which track will the express train leave from today?" }
    ],
    audio_complete: "Which track will the express train leave from today? Track 3."
  },
  {
    id: "lx_5",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】短文リスニング（過去問頻出：部活・習い事）",
    opt: ["The tennis club.", "The art club.", "The cooking club.", "The brass band."],
    ans: 3,
    explain: "【英文】\nWhen Kenta was in elementary school, he was in the soccer club. Now he is a junior high school student, and he joined the brass band because he wanted to play the trumpet.\n\n【質問】Which club did Kenta join in junior high school?（ケンタは中学校でどの部活に入りましたか？）\n【正解】4. 吹奏楽部（The brass band.）。",
    dialogue: [
      { speaker: 'male', text: "When Kenta was in elementary school, he was in the soccer club. Now he is a junior high school student, and he joined the brass band because he wanted to play the trumpet." },
      { speaker: 'narrator', text: "Question. Which club did Kenta join in junior high school?" }
    ],
    audio_complete: "Which club did Kenta join in junior high school? The brass band."
  },
  {
    id: "lx_6",
    q: "音声を聞いて、質問に答えよう。",
    sub: "🎧 【第3部】アナウンス（過去問頻出：美術館のルール）",
    opt: ["Take pictures on the first floor.", "Eat snacks in the hall.", "Use pens in the museum.", "Buy postcards at the shop."],
    ans: 3,
    explain: "【英文】\nWelcome to Star Art Museum. You cannot take pictures or use pens inside the exhibition rooms. If you want to buy postcards of the paintings, please visit our museum shop on the first floor.\n\n【質問】What can visitors do on the first floor?（来館者は1階で何ができますか？）\n【正解】4. ショップでポストカードを買う。",
    dialogue: [
      { speaker: 'female', text: "Welcome to Star Art Museum. You cannot take pictures or use pens inside the exhibition rooms. If you want to buy postcards of the paintings, please visit our museum shop on the first floor." },
      { speaker: 'narrator', text: "Question. What can visitors do on the first floor?" }
    ],
    audio_complete: "What can visitors do on the first floor? Buy postcards at the shop."
  }
];

// 3級リスニング「パラレル変奏ジェネレーター」（丸暗記防止のため時刻・値段・曜日・手段を組み替えて24問自動生成）
function buildParallelListeningQuestions() {
  const generated = [];

  // パターンA：出発時刻の聞き取り（ダミー時刻と正解時刻の組み合わせ6種）
  const timeSets = [
    { wrong: "nine o'clock", right: "nine thirty", opt: ["At 8:30.", "At 9:00.", "At 9:30.", "At 10:00."], ans: 2, place: "the aquarium" },
    { wrong: "one thirty", right: "two o'clock", opt: ["At 1:00.", "At 1:30.", "At 2:00.", "At 2:30."], ans: 2, place: "the science museum" },
    { wrong: "three o'clock", right: "three fifteen", opt: ["At 2:45.", "At 3:00.", "At 3:15.", "At 3:30."], ans: 2, place: "the central library" },
    { wrong: "ten o'clock", right: "ten twenty", opt: ["At 9:40.", "At 10:00.", "At 10:20.", "At 10:40."], ans: 2, place: "the airport" }
  ];
  timeSets.forEach((ts, idx) => {
    generated.push({
      id: `lx_time_${idx}`,
      q: "音声を聞いて、質問に答えよう。",
      sub: "🎧 【第2部】対話リスニング（時刻の聞き取り実践）",
      opt: ts.opt,
      ans: ts.ans,
      explain: `【会話のポイント】最初は ${ts.wrong} かと尋ねていますが、後半で「The next one leaves at ${ts.right}.（次は ${ts.opt[ts.ans]} に出ます）」と答えています。`,
      dialogue: [
        { speaker: 'male', text: `Excuse me. Does the bus to ${ts.place} leave at ${ts.wrong}?` },
        { speaker: 'female', text: `No, that bus has already left. The next one leaves at ${ts.right}.` },
        { speaker: 'narrator', text: "Question. What time does the next bus leave?" }
      ],
      audio_complete: `What time does the next bus leave? ${ts.opt[ts.ans]}`
    });
  });

  // パターンB：買い物・割引価格の聞き取り（4種）
  const priceSets = [
    { item: "red T-shirt", orig: "twenty dollars", sale: "twelve dollars", opt: ["$8.", "$10.", "$12.", "$20."], ans: 2 },
    { item: "sports bag", orig: "thirty dollars", sale: "twenty-five dollars", opt: ["$15.", "$20.", "$25.", "$30."], ans: 2 },
    { item: "tennis racket", orig: "fifty dollars", sale: "forty dollars", opt: ["$30.", "$35.", "$40.", "$50."], ans: 2 },
    { item: "winter jacket", orig: "sixty dollars", sale: "forty-five dollars", opt: ["$40.", "$45.", "$50.", "$60."], ans: 1 }
  ];
  priceSets.forEach((ps, idx) => {
    generated.push({
      id: `lx_price_${idx}`,
      q: "音声を聞いて、質問に答えよう。",
      sub: "🎧 【第2部】対話リスニング（値段・割引の聞き取り実践）",
      opt: ps.opt,
      ans: ps.ans,
      explain: `【会話のポイント】普段は ${ps.orig} ですが、「it's on sale today for ${ps.sale}（今日はセールで ${ps.opt[ps.ans]} です）」と言っています。`,
      dialogue: [
        { speaker: 'female', text: `Excuse me, how much is this ${ps.item}?` },
        { speaker: 'male', text: `It's usually ${ps.orig}, but it's on sale today for ${ps.sale}.` },
        { speaker: 'female', text: "Great! I'll buy it." },
        { speaker: 'narrator', text: `Question. How much will the girl pay for the ${ps.item}?` }
      ],
      audio_complete: `How much will the girl pay? ${ps.opt[ps.ans]}`
    });
  });

  // パターンC：曜日の変更・予定の聞き取り（4種）
  const daySets = [
    { event: "the piano lesson", wrongDay: "Tuesday", rightDay: "Thursday", opt: ["On Monday.", "On Tuesday.", "On Wednesday.", "On Thursday."], ans: 3 },
    { event: "the soccer practice", wrongDay: "Wednesday", rightDay: "Friday", opt: ["On Tuesday.", "On Wednesday.", "On Friday.", "On Saturday."], ans: 2 },
    { event: "the English test", wrongDay: "Monday", rightDay: "Wednesday", opt: ["On Monday.", "On Tuesday.", "On Wednesday.", "On Thursday."], ans: 2 },
    { event: "the cooking class", wrongDay: "Saturday", rightDay: "Sunday", opt: ["On木曜日.", "On Friday.", "On Saturday.", "On Sunday."].map(x => x.replace('木曜日', 'Thursday')), ans: 3 }
  ];
  daySets.forEach((ds, idx) => {
    generated.push({
      id: `lx_day_${idx}`,
      q: "音声を聞いて、質問に答えよう。",
      sub: "🎧 【第3部】アナウンス（曜日の聞き取り実践）",
      opt: ds.opt,
      ans: ds.ans,
      explain: `【聞き取りのポイント】普段は ${ds.wrongDay} ですが、今週は「it will be held on ${ds.rightDay}（${ds.opt[ds.ans]} に開催されます）」と案内しています。`,
      dialogue: [
        { speaker: 'male', text: `Hello, everyone. Usually we have ${ds.event} on ${ds.wrongDay}, but this week it will be held on ${ds.rightDay}. Please don't forget.` },
        { speaker: 'narrator', text: `Question. When will they have ${ds.event} this week?` }
      ],
      audio_complete: `When will they have ${ds.event} this week? ${ds.opt[ds.ans]}`
    });
  });

  return generated;
}

// ==================== 4. ライティング（新形式Eメール・英作文）＆ 二次面接 追加24問 ====================
const EXTRA_WRITING_DATA = [
  {
    id: "wx_1",
    passageTitle: "📧 【新形式Eメール】友達のMiaからのメール",
    passage: "Hi!\nYesterday, I made a [chocolate cake] for my mother's birthday. We ate it after dinner, and she was very happy!\nWhere do you usually buy birthday presents for your family?\nBest, Mia",
    q: "下線部 [chocolate cake] について、Miaに「ケーキを作るのにどのくらい時間がかかりましたか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール）：かかった時間を尋ねる How long ~? の疑問文",
    words: ["How", "long", "did", "it", "take", "to", "make", "the", "cake?"],
    explain: "【Eメール対策】料理や移動、宿題の話題で「どのくらい時間がかかりましたか？」と聞く「How long did it take to ~?」は非常に応用が利く質問です！",
    audio_question: "How long did it take to make the cake?"
  },
  {
    id: "wx_2",
    passageTitle: "📧 【新形式Eメール】友達のMiaからの質問への返信",
    passage: "Hi!\nYesterday, I made a [chocolate cake] for my mother's birthday. We ate it after dinner, and she was very happy!\nWhere do you usually buy birthday presents for your family?\nBest, Mia",
    q: "Miaからの質問（Where do you usually buy birthday presents...?）に対して「たいてい駅近くのデパートで買います」と答える文を作ろう。",
    sub: "✍️ 3級新形式（Eメール）：場所の質問（Where ~?）に対する返信文",
    words: ["I", "usually", "buy", "them", "at", "a", "department", "store", "near", "the", "station."],
    explain: "【Eメール対策】Where do you usually buy ~? には「I usually buy them at ＋ 場所.」で答えると自然で減点されません。",
    audio_question: "I usually buy them at a department store near the station."
  },
  {
    id: "wx_3",
    passageTitle: "📧 【新形式Eメール】友達のJackからのメール",
    passage: "Hello!\nLast weekend, I went [camping] in the mountains with my uncle. We saw many beautiful stars at night!\nWhat do you like to do outdoors?\nYour friend, Jack",
    q: "下線部 [camping] について、Jackに「何日間キャンプに行きましたか？」と質問する文を作ろう。",
    sub: "✍️ 3級新形式（Eメール）：日数を尋ねる How many days ~? の疑問文",
    words: ["How", "many", "days", "did", "you", "go", "camping?"],
    explain: "【Eメール対策】旅行やキャンプの下線部に対しては「How many days ~?（何日間）」や「Where did you go ~?（どこへ）」が鉄板の質問です！",
    audio_question: "How many days did you go camping?"
  },
  {
    id: "wx_4",
    passageTitle: "📧 【新形式Eメール】友達のJackからのメール",
    passage: "Hello!\nLast weekend, I went [camping] in the mountains with my uncle. We saw many beautiful stars at night!\nWhat do you like to do outdoors?\nYour friend, Jack",
    q: "Jackからの質問（What do you like to do outdoors?）に「公園で友達とバドミントンをするのが好きです」と答える文を作ろう。",
    sub: "✍️ 3級新形式（Eメール）：好きなアウトドア活動を答える文",
    words: ["I", "like", "to", "play", "badminton", "with", "my", "friends", "in", "the", "park."],
    explain: "【解説】What do you like to do ~? にはそのまま「I like to ＋ 動詞の原形 ~」で答えるのが最も確実です。",
    audio_question: "I like to play badminton with my friends in the park."
  },
  {
    id: "wx_5",
    q: "【英作文】What is the best place to visit in your town?\n（あなたの街で訪れるのに一番良い場所は？ ➔ 市立図書館が一番良い場所だ）",
    sub: "✍️ 場所をおすすめする英作文の導入文を作ろう",
    words: ["I", "think", "the", "city", "library", "is", "the", "best", "place", "to", "visit."],
    explain: "【英作文のコツ】What is the best place ~? には「I think [場所] is the best place to visit.」と質問文の単語をそのまま使って書き始めましょう！",
    audio_question: "I think the city library is the best place to visit."
  },
  {
    id: "wx_6",
    q: "【英作文】Why is the city library the best place?\n（理由：無料でたくさんの面白い本を読むことができるから）",
    sub: "✍️ for free（無料で）を使った理由文を作ろう",
    words: ["First,", "we", "can", "read", "many", "interesting", "books", "for", "free."],
    explain: "【解説】「for free（無料で）」は図書館や公園、博物館の良さを説明する英作文で非常に使いやすい表現です！",
    audio_question: "First, we can read many interesting books for free."
  },
  {
    id: "wx_7",
    q: "【英作文】Do you like eating breakfast at home?\n（家で朝食を食べるのは好きですか？ ➔ 理由：母が毎朝おいしいパンと卵を作ってくれるから）",
    sub: "✍️ 食事トピックの理由文を作ろう",
    words: ["First,", "my", "mother", "makes", "delicious", "bread", "and", "eggs", "every", "morning."],
    explain: "【解説】食べ物や食事のテーマでは my mother makes delicious ~（母がおいしい〜を作ってくれる）が書きやすくておすすめです。",
    audio_question: "First, my mother makes delicious bread and eggs every morning."
  },
  {
    id: "wx_8",
    q: "【英作文】Do you like eating breakfast at home?\n（2つ目の理由：朝食を食べることは私にたくさんのエネルギーをくれるから）",
    sub: "✍️ give me energy（元気・エネルギーをくれる）を使った理由文",
    words: ["Second,", "eating", "breakfast", "gives", "me", "a", "lot", "of", "energy."],
    explain: "【解説】「~ gives me a lot of energy.（〜は私にたくさんのエネルギーをくれる）」は朝食・睡眠・音楽・スポーツの理由として幅広く使えます！",
    audio_question: "Second, eating breakfast gives me a lot of energy."
  },
  {
    id: "wx_9",
    q: "【英作文】Which do you like better, trains or buses?\n（電車とバス、どちらが好きですか？ ➔ 電車：バスよりも速くて時間通りに来るから）",
    sub: "✍️ 乗り物比較の理由文を作ろう",
    words: ["First,", "trains", "are", "faster", "than", "buses", "and", "come", "on", "time."],
    explain: "【解説】乗り物の比較では faster than ~（〜より速い）や come on time（時間通りに来る）が鉄板フレーズです！",
    audio_question: "First, trains are faster than buses and come on time."
  },
  {
    id: "wx_10",
    q: "【英作文】What do you want to do this winter vacation?\n（今年の冬休みに何をしたいですか？ ➔ 北海道へ行って家族とスキーを楽しみたい）",
    sub: "✍️ 冬休みの計画についての英作文を作ろう",
    words: ["I", "want", "to", "go", "to", "Hokkaido", "and", "enjoy", "skiing", "with", "my", "family."],
    explain: "【解説】go to 場所 and enjoy ~ing（場所へ行って〜を楽しむ）の形にすると、1文でしっかり語数を稼げます。",
    audio_question: "I want to go to Hokkaido and enjoy skiing with my family."
  },
  {
    id: "wx_11",
    q: "【英作文】Do you often use a computer?\n（よくコンピュータを使いますか？ ➔ 理由：学校の宿題のためにインターネットで情報を調べられるから）",
    sub: "✍️ パソコン・スマホのトピックで使える理由文",
    words: ["First,", "I", "can", "look", "for", "information", "on", "the", "Internet."],
    explain: "【解説】look for information on the Internet（インターネットで情報を探す）は、パソコンやスマホの英作文で満点が狙える表現です！",
    audio_question: "First, I can look for information on the Internet."
  },
  {
    id: "wx_12",
    q: "【英作文】Do you often use a computer?\n（2つ目の理由：英語の動画を観て英語の勉強ができるから）",
    sub: "✍️ 動画や映画のメリットを表す理由文",
    words: ["Second,", "I", "can", "study", "English", "by", "watching", "English", "videos."],
    explain: "【解説】by ~ing（〜することによって）を使うと、3級らしいレベルの高い英作文になります！",
    audio_question: "Second, I can study English by watching English videos."
  }
];

const EXTRA_SPEAKING_DATA = [
  {
    id: "sx_1",
    passageTitle: "🎙️ 【音読パッセージ④】Morning Markets (朝市)",
    passage: "Morning markets are held in many towns on Sundays.\nPeople can buy fresh vegetables and fruit directly from farmers.\nMany visitors enjoy talking with the farmers there.",
    q: "Please read the passage aloud.",
    sub: "【音読】ピリオドまで最後までしっかり声に出して読もう！",
    targetText: "Morning markets are held in many towns on Sundays. People can buy fresh vegetables and fruit directly from farmers.",
    keywords: ["morning", "markets", "vegetables", "farmers"],
    explain: "【面接のコツ】held in many towns や directly from farmers のつながりを意識して、最後までハッキリ読み切りましょう！"
  },
  {
    id: "sx_2",
    passageTitle: "🎙️ 【No.1 パッセージ質問④】Morning Markets",
    passage: "Morning markets are held in many towns on Sundays.\nPeople can buy fresh vegetables and fruit directly from farmers.\nMany visitors enjoy talking with the farmers there.",
    q: "Question No.1: According to the passage, what can people buy at morning markets?",
    sub: "【No.1 質問】朝市で人々は何を買うことができますか？",
    targetText: "They can buy fresh vegetables and fruit.",
    keywords: ["buy", "fresh", "vegetables", "fruit"],
    explain: "【No.1 必勝法】What can people buy ~? と聞かれたら、本文の buy の後ろにある fresh vegetables and fruit をそのまま使って答えましょう！"
  },
  {
    id: "sx_3",
    passageTitle: "🎙️ 【音読パッセージ⑤】Indoor Sports (室内スポーツ)",
    passage: "Indoor sports such as basketball and table tennis are very popular.\nPeople can enjoy them even on rainy or snowy days.\nSo, many community centers have gyms for indoor sports.",
    q: "Please read the passage aloud.",
    sub: "【音読】basketball や table tennis をリズムよく発音しよう！",
    targetText: "Indoor sports such as basketball and table tennis are very popular. People can enjoy them even on rainy or snowy days.",
    keywords: ["indoor", "sports", "basketball", "popular", "rainy"],
    explain: "【面接のコツ】even on rainy or snowy days（雨や雪の日でさえ）の部分も落ち着いて最後まで声に出しましょう！"
  },
  {
    id: "sx_4",
    passageTitle: "🎙️ 【No.1 パッセージ質問⑤】Indoor Sports",
    passage: "Indoor sports such as basketball and table tennis are very popular.\nPeople can enjoy them even on rainy or snowy days.\nSo, many community centers have gyms for indoor sports.",
    q: "Question No.1: According to the passage, why do many community centers have gyms for indoor sports?",
    sub: "【No.1 質問】なぜ多くのコミュニティセンターには室内スポーツ用の体育館がありますか？（So の前の文に Because をつけよう！）",
    targetText: "Because people can enjoy them even on rainy or snowy days.",
    keywords: ["because", "people", "enjoy", "rainy", "snowy", "days"],
    explain: "【No.1 必勝法】本文の3文目が So, で始まっているため、そのすぐ前の2文目の文頭に Because をつけて読めば完璧な正解になります！"
  },
  {
    id: "sx_5",
    passageTitle: "🎙️ 【音読パッセージ⑥】 Flea Markets (フリーマーケット)",
    passage: "Flea markets are great places to find useful things at low prices.\nPeople bring clothes and books that they do not use anymore.\nUsing old things again is very good for the environment.",
    q: "Please read the passage aloud.",
    sub: "【音読】environment（環境）の発音に気をつけて最後まで詠唱しよう！",
    targetText: "Flea markets are great places to find useful things at low prices. People bring clothes and books that they do not use anymore.",
    keywords: ["markets", "great", "places", "useful", "prices", "clothes"],
    explain: "【面接のコツ】at low prices（安い値段で）や not ~ anymore（もはや〜ない）は音読でも長文でも頻出の重要表現です！"
  },
  {
    id: "sx_6",
    passageTitle: "🎙️ 【No.1 パッセージ質問⑥】Flea Markets",
    passage: "Flea markets are great places to find useful things at low prices.\nPeople bring clothes and books that they do not use anymore.\nUsing old things again is very good for the environment.",
    q: "Question No.1: According to the passage, what is very good for the environment?",
    sub: "【No.1 質問】本文によると、何が環境にとても良いですか？",
    targetText: "Using old things again is very good for the environment.",
    keywords: ["using", "old", "things", "again", "environment"],
    explain: "【解説】第3文の主語「Using old things again（古いものを再び使うこと）」をそのまま抜き出して読めば満点です！"
  },
  {
    id: "sx_7",
    passageTitle: "🎙️ 【No.2 イラスト描写④】図書館の風景",
    passage: "【イラストの状況】\n図書館で、女性の司書（係の人）が男の子に本を手渡しています。",
    q: "Question No.2: Look at the picture. What is the woman doing?",
    sub: "【No.2 質問】女性は何をしていますか？（She is giving ~ で詠唱しよう！）",
    targetText: "She is giving a book to the boy.",
    keywords: ["she", "giving", "book", "boy"],
    explain: "【No.2 必勝法】物を渡している場面では「She is giving [物] to [人].」または「She is handing [物] to [人].」が鉄板です！"
  },
  {
    id: "sx_8",
    passageTitle: "🎙️ 【No.2 イラスト描写⑤】キッチンでの料理",
    passage: "【イラストの状況】\nキッチンで、女の子がテーブルを拭いており、男の子がお皿を洗っています。",
    q: "Question No.2: Look at the picture. What is the boy doing?",
    sub: "【No.2 質問】男の子は何をしていますか？",
    targetText: "He is washing the dishes.",
    keywords: ["he", "washing", "dishes"],
    explain: "【解説】wash the dishes（皿を洗う）、clean the table（テーブルを拭く）、cook dinner（夕食を作る）はイラスト問題で超頻出です！"
  },
  {
    id: "sx_9",
    passageTitle: "🎙️ 【No.3 イラスト状況説明④】荷物が重そうな女性",
    passage: "【イラストの状況】\n階段の前で大きなスーツケースを持っている女性が困っており、男の子がそれを手伝おうとしています。",
    q: "Question No.3: What is the boy going to do?",
    sub: "【No.3 質問】男の子はこれから何をしようとしていますか？",
    targetText: "He is going to carry the bag for the woman.",
    keywords: ["going", "carry", "bag", "woman"],
    explain: "【解説】「He is going to help the woman.」や「He is going to carry the bag.」のようにシンプルに表現しましょう！"
  },
  {
    id: "sx_10",
    passageTitle: "🎙️ 【No.4 あなた自身への質問③】学校の教科",
    passage: "面接官がカードを伏せて、あなた自身について質問します。",
    q: "Question No.4: What subject do you like the best at school?",
    sub: "【No.4 質問】学校でどの教科が一番好きですか？",
    targetText: "I like English the best because talking in English is fun.",
    keywords: ["like", "english", "best", "talking", "fun"],
    explain: "【No.4 必勝法】1文だけでなく because ~ を付けて2文相当で答えると、積極性（アティチュード）と内容点がどちらも高評価になります！"
  },
  {
    id: "sx_11",
    passageTitle: "🎙️ 【No.4 あなた自身への質問④】誕生日プレゼント",
    passage: "面接官があなた自身について質問します。",
    q: "Question No.4: What do you want for your next birthday?",
    sub: "【No.4 質問】次の誕生日に何が欲しいですか？",
    targetText: "I want a new watch because my old one is broken.",
    keywords: ["want", "new", "watch", "broken"],
    explain: "【解説】I want a new [物] because ~ のパターンを持っておくと、買い物やプレゼントの質問に即答できます！"
  },
  {
    id: "sx_12",
    passageTitle: "🎙️ 【No.5 Yes/No質問③】朝ごはんの習慣",
    passage: "面接官があなたにYes/Noの質問をし、続けて Please tell me more. と尋ねます。",
    q: "Question No.5: Do you always eat breakfast every morning? — Yes. Please tell me more.",
    sub: "【No.5 質問】毎朝かならず朝食を食べますか？／もっと詳しく教えてください。",
    targetText: "Yes, I do. I usually eat toast and eggs with my family.",
    keywords: ["yes", "usually", "eat", "toast", "eggs", "family"],
    explain: "【No.5 必勝法】Please tell me more. と聞かれたら、「いつも何を食べるか（I usually eat ~）」「誰と食べるか（with my family）」を1文で答えれば満点です！"
  }
];

// ==================== 5. 既存マスタデータ＆ボス戦過去問プールへの自動統合関数 ====================
function registerExtraMasterData() {
  if (isExtraDataRegistered) return;
  isExtraDataRegistered = true;

  // 1. 文法・会話データの追加
  if (typeof RAW_GRAMMAR_DATA !== 'undefined') {
    const existingIds = new Set(RAW_GRAMMAR_DATA.map(x => x.id));
    EXTRA_GRAMMAR_DATA.forEach(item => {
      if (!existingIds.has(item.id)) RAW_GRAMMAR_DATA.push(item);
    });
  }

  // 2. 長文読解データの追加
  if (typeof RAW_READING_DATA !== 'undefined') {
    const existingIds = new Set(RAW_READING_DATA.map(x => x.id));
    EXTRA_READING_DATA.forEach(item => {
      if (!existingIds.has(item.id)) RAW_READING_DATA.push(item);
    });
  }

  // 3. リスニングデータ（固定＋パラレル生成）の追加
  const parallelListeners = buildParallelListeningQuestions();
  const allNewListening = [...EXTRA_LISTENING_DATA, ...parallelListeners];
  if (typeof RAW_LISTENING_DATA !== 'undefined') {
    const existingIds = new Set(RAW_LISTENING_DATA.map(x => x.id));
    allNewListening.forEach(item => {
      if (!existingIds.has(item.id)) RAW_LISTENING_DATA.push(item);
    });
  }

  // 4. ライティングデータの追加
  if (typeof RAW_WRITING_DATA !== 'undefined') {
    const existingIds = new Set(RAW_WRITING_DATA.map(x => x.id));
    EXTRA_WRITING_DATA.forEach(item => {
      if (!existingIds.has(item.id)) RAW_WRITING_DATA.push(item);
    });
  }

  // 5. スピーキングデータの追加
  if (typeof RAW_SPEAKING_DATA !== 'undefined') {
    const existingIds = new Set(RAW_SPEAKING_DATA.map(x => x.id));
    EXTRA_SPEAKING_DATA.forEach(item => {
      if (!existingIds.has(item.id)) RAW_SPEAKING_DATA.push(item);
    });
  }
}
