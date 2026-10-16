// ==========================================
// 英検3級 合格クエスト 〜新たなる冒険〜
// マスターデータ定義ファイル① (data.js)
// [収録] 装備 / ボス / 進化 / 3級単語300 / 3級文法60 / 不規則動詞35
// ==========================================

// ==================== 1. 着せ替え・装備データベース (全33種) ====================
const SHOP_EQUIP_DATA = [
  // --- 👑 あたま (HP) ---
  { id: 'hat_grad', name: '3級チャレンジャー帽', type: 'hat', icon: '🎓', price: 25, rank: '🌟 ノーマル', val: 60, desc: 'HP +60 / 3級学習の第一歩' },
  { id: 'hat_cap', name: '冒険者のキャップ', type: 'hat', icon: '🧢', price: 45, rank: '🌟 ノーマル', val: 140, desc: 'HP +140 / 元気いっぱい' },
  { id: 'hat_ribbon', name: '勝利のリボン', type: 'hat', icon: '🎀', price: 80, rank: '🔵 レア', val: 350, desc: 'HP +350 / やる気UP' },
  { id: 'hat_cat', name: 'ネコミミフード', type: 'hat', icon: '🐱', price: 130, rank: '🔵 レア', val: 700, desc: 'HP +700 / リスニング集中力UP' },
  { id: 'hat_wizard', name: '大魔導士の帽子', type: 'hat', icon: '🧙', price: 220, rank: '🟣 スーパーレア', val: 1400, desc: 'HP +1400 / 完了形の魔力' },
  { id: 'hat_fox', name: '白狐の仮面', type: 'hat', icon: '🦊', price: 320, rank: '🟣 スーパーレア', val: 2300, desc: 'HP +2300 / 長文読解の極意' },
  { id: 'hat_crown', name: '黄金の王冠', type: 'hat', icon: '👑', price: 550, rank: '🟡 レジェンド', val: 4000, desc: 'HP +4000 / 3級知識の王者' },
  { id: 'hat_space', name: 'コズミックヘルム', type: 'hat', icon: '🪐', price: 800, rank: '🟡 レジェンド', val: 5800, desc: 'HP +5800 / 未知の英語領域' },
  { id: 'hat_tiara', name: '神話のダイヤティアラ', type: 'hat', icon: '💎', price: 1200, rank: '🌈 ゴッド', val: 9000, desc: 'HP +9000 / 一次・二次完全制覇' },
  { id: 'hat_dragon_crown', name: '竜王の覇冠', type: 'hat', icon: '🐉👑', price: 9999, rank: '🎁 ボス限定ドロップ', val: 14000, desc: 'HP +14000 / 竜王の加護 (Lv.60以上)', reqLv: 60 },
  { id: 'hat_genesis_crown', name: '創世神の王冠', type: 'hat', icon: '👑✨🌌', price: 99999, rank: '🌌 創世神話級', val: 28000, desc: 'HP +28000 / 全次元を統べる神の王冠 (Lv.60以上)', reqLv: 60, isSecret: true },

  // --- ⚔️ ぶき (攻撃力) ---
  { id: 'wp_pencil', name: '熟練のマーク鉛筆', type: 'weapon', icon: '✏️', price: 20, rank: '🌟 ノーマル', val: 25, desc: '攻撃 +25 / ライティングもバッチリ' },
  { id: 'wp_wand', name: '見習い魔導の杖', type: 'weapon', icon: '🪄', price: 50, rank: '🌟 ノーマル', val: 55, desc: '攻撃 +55 / 関係代名詞の魔法' },
  { id: 'wp_bow', name: '精霊の弓矢', type: 'weapon', icon: '🏹', price: 90, rank: '🔵 レア', val: 120, desc: '攻撃 +120 / 正解を射抜く' },
  { id: 'wp_sword', name: 'ナイトブレード', type: 'weapon', icon: '🗡️', price: 150, rank: '🔵 レア', val: 210, desc: '攻撃 +210 / 難問を断ち切る' },
  { id: 'wp_guitar', name: 'ソニックギター', type: 'weapon', icon: '🎸', price: 240, rank: '🟣 スーパーレア', val: 350, desc: '攻撃 +350 / スピーキングの響き' },
  { id: 'wp_axe', name: 'グランドアックス', type: 'weapon', icon: '🪓', price: 350, rank: '🟣 スーパーレア', val: 550, desc: '攻撃 +550 / 圧倒的粉砕力' },
  { id: 'wp_trident', name: '海神のトライデント', type: 'weapon', icon: '🔱', price: 600, rank: '🟡 レジェンド', val: 850, desc: '攻撃 +850 / 深い語彙力' },
  { id: 'wp_saber', name: '光線剣スターライト', type: 'weapon', icon: '🌌', price: 850, rank: '🟡 レジェンド', val: 1250, desc: '攻撃 +1250 / 閃光の一撃' },
  { id: 'wp_excalibur', name: '聖剣エクスカリバー', type: 'weapon', icon: '⚜️', price: 1500, rank: '🌈 ゴッド', val: 1900, desc: '攻撃 +1900 / 3級絶対合格の聖剣' },
  { id: 'wp_dark_blade', name: '漆黒の魔剣', type: 'weapon', icon: '🗡️🖤', price: 9999, rank: '🎁 ボス限定ドロップ', val: 2600, desc: '攻撃 +2600 / ボス討伐の覇気 (Lv.60以上)', reqLv: 60 },
  { id: 'wp_genesis_blade', name: '創世神の聖剣', type: 'weapon', icon: '⚔️🌟🔥', price: 99999, rank: '🌌 創世神話級', val: 4500, desc: '攻撃 +4500 / 万物を創造する究極剣 (Lv.60以上)', reqLv: 60, isSecret: true },

  // --- ✨ オーラ (速さ / 会心率) ---
  { id: 'aura_wind', name: '若葉のそよ風', type: 'aura', icon: '🍃', price: 30, rank: '🌟 ノーマル', val: 8, desc: '速さ +8 / 爽やかな風' },
  { id: 'aura_sakura', name: '合格の桜吹雪', type: 'aura', icon: '🌸', price: 80, rank: '🔵 レア', val: 18, desc: '速さ +18 / サクラサク' },
  { id: 'aura_angel', name: 'セラフィムウィング', type: 'aura', icon: '🪽', price: 180, rank: '🔵 レア', val: 35, desc: '速さ +35 / 3級への飛翔' },
  { id: 'aura_devil', name: 'ダークネスウィング', type: 'aura', icon: '🦇', price: 280, rank: '🟣 スーパーレア', val: 65, desc: '速さ +65 / 秘めたる魔力' },
  { id: 'aura_thunder', name: '迅雷のイナズマ', type: 'aura', icon: '⚡', price: 450, rank: '🟣 スーパーレア', val: 95, desc: '速さ +95 / 電光石火の即答' },
  { id: 'aura_fire', name: '紅蓮のドラゴンオーラ', type: 'aura', icon: '🔥', price: 700, rank: '🟡 レジェンド', val: 135, desc: '速さ +135 / 燃え上がる情熱' },
  { id: 'aura_rainbow', name: '奇跡のレインボー', type: 'aura', icon: '🌈', price: 950, rank: '🟡 レジェンド', val: 200, desc: '速さ +200 / 満点への架け橋' },
  { id: 'aura_cosmic', name: 'コズミックオーラ', type: 'aura', icon: '🌟', price: 1500, rank: '🌈 ゴッド', val: 280, desc: '速さ +280 / 全宇宙の叡智' },
  { id: 'aura_dragon_light', name: '神龍の天光', type: 'aura', icon: '🐉✨', price: 9999, rank: '🎁 ボス限定ドロップ', val: 390, desc: '速さ +390 / 神龍の加護 (Lv.60以上)', reqLv: 60 },
  { id: 'aura_genesis_light', name: '創世神の神光', type: 'aura', icon: '🌌✨👑', price: 99999, rank: '🌌 創世神話級', val: 550, desc: '速さ +550 / 時空を超越する輝き (Lv.60以上)', reqLv: 60, isSecret: true }
];

// ==================== 2. ボスステージ (全11段階) ====================
const BOSS_STAGES = [
  {
    lv: 1, name: "翠緑のベビードラゴン", icon: "🐲", hp: 700, atk: 50, exp: 180, gems: 25,
    desc: "3級ダンジョンの門番。基礎力とスピードで突破しよう！",
    introMsg: "Grrr! Welcome to Grade 3! (ここからは英検3級の世界だ！ボクに勝てるかな！？)",
    defeatMsg: "Kyuun... You are strong! (強いや…！でも奥には完了形や受動態を操る竜がいるぞ！)"
  },
  {
    lv: 2, name: "黒曜石のガーゴイル", icon: "🦖", hp: 1900, atk: 95, exp: 380, gems: 35,
    desc: "硬い石の鎧を持つ魔獣。装備やガチャで攻撃力を高めよう！",
    introMsg: "My stone armor is unbreakable! (我が石の鎧、貴様の語彙力で砕けるか！)",
    defeatMsg: "Cracked...!? (鎧が砕かれただと…！？次は紅蓮のワイバーンが相手だ！)"
  },
  {
    lv: 3, name: "紅蓮のワイバーン", icon: "👺", hp: 4000, atk: 170, exp: 700, gems: 45,
    desc: "灼熱のブレスを吐く飛竜。即答クリティカルを狙え！",
    introMsg: "Have you ever seen such flames? (これほどの炎を見たことがあるか？現在完了の業火を受けよ！)",
    defeatMsg: "My fire was put out... (炎が消された…！だが嵐の魔竜が貴様を吹き飛ばす！)"
  },
  {
    lv: 4, name: "疾風のストームドラゴン", icon: "🌪️", hp: 7800, atk: 260, exp: 1200, gems: 55,
    desc: "暴風を纏う竜。あたま装備でHPを強化して挑もう！",
    introMsg: "The wind that blows here is deadly! (ここに吹く風は強烈だぞ！関係代名詞の嵐に耐えられるか！)",
    defeatMsg: "The storm has stopped... (嵐が止んだ…！冥府の門が開くぞ…！)"
  },
  {
    lv: 5, name: "冥府のデス・ドレイク", icon: "👿", hp: 13000, atk: 400, exp: 2000, gems: 75,
    desc: "【中ボス】強力な反撃を放つ。3ミス以内で撃破せよ！",
    introMsg: "Tell me what you want to do! (何がしたいか言ってみろ！間接疑問文の闇に沈むがいい！)",
    defeatMsg: "Impossible... Light in the underworld!? (バカな…冥府に光が差し込むだと！？)"
  },
  {
    lv: 6, name: "深淵のシャドウファング", icon: "🦹", hp: 20000, atk: 580, exp: 2600, gems: 90,
    desc: "影に潜む暗黒竜。スーパーレア以上の装備で挑もう。",
    introMsg: "This dungeon was built a thousand years ago! (千年前から続く受動態の迷宮で朽ち果てよ！)",
    defeatMsg: "The shadow is fading... (影が消えていく…！双頭竜が目覚めるぞ！)"
  },
  {
    lv: 7, name: "破滅のツイン・ヒュドラ", icon: "🐉", hp: 28000, atk: 820, exp: 3500, gems: 110,
    desc: "2つの頭で同時攻撃してくる凶竜。速さと会心がカギ！",
    introMsg: "Two heads, double power! (一次試験と二次試験、両方の牙で貴様を噛み砕く！)",
    defeatMsg: "Both heads defeated...!? (両方の首がやられただと…！？)"
  },
  {
    lv: 8, name: "業火のインフェルノ・レックス", icon: "🔥", hp: 38000, atk: 1150, exp: 4500, gems: 140,
    desc: "長文とリスニングの壁。レジェンド装備と即答で打ち破れ！",
    introMsg: "Everything will be burned to ashes! (すべてを灰にしてやる！長文読解の試練を乗り越えてみよ！)",
    defeatMsg: "Such incredible knowledge... (なんという英語力だ…！だが終焉の竜が待っているぞ！)"
  },
  {
    lv: 9, name: "終焉のカタストロフ・ドラゴン", icon: "⚡🐉", hp: 48000, atk: 1600, exp: 6000, gems: 190,
    desc: "世界を闇に包む古竜。2ミスが限界の極限バトル！",
    introMsg: "Show me all your courage and wisdom! (お前の勇気と3級の知識のすべてをぶつけてこい！)",
    defeatMsg: "Magnificent... Go to the final throne! (見事だ…！最後の玉座、オメガエデンのもとへ行くがいい！)"
  },
  {
    lv: 10, name: "覇天神龍・オメガエデン", icon: "👑🐉✨", hp: 60000, atk: 2300, exp: 8000, gems: 300,
    desc: "【表ラスボス】英検3級の頂点！全問正解と神速の解答で討伐せよ！",
    introMsg: "I am Omega Eden, the apex of Grade 3! (我が名はオメガエデン！英検3級の頂点として、君の全ての力を試そう！)",
    defeatMsg: "Bravo! You have mastered Grade 3! (あっぱれだ！君こそ真の英検3級マスターだ！)"
  },
  {
    lv: 11, name: "虚無を統べる終極神・ゼロインフィニティ", icon: "🌌👁️⚡", hp: 98000, atk: 4000, exp: 15000, gems: 500,
    desc: "【真・隠し裏ボス】創世神装備と極限の集中力で挑む最終試練！",
    isSecret: true,
    introMsg: "Beyond time and space... (時空を超えし神話の勇者よ、存在の限界を超えてみせよ！)",
    defeatMsg: "The universe is filled with your light... (虚無が光で満たされた…。全次元の覇者よ、永遠に輝け！)"
  }
];

// ==================== 3. 相棒の進化ツリー ====================
const AVATARS = [
  { minLv: 1, emoji: '🐣', rank: '見習いヒナ', name: 'タマゴン' },
  { minLv: 10, emoji: '🐥', rank: '3級チャレンジャー', name: 'ピヨナイト' },
  { minLv: 20, emoji: '🦅', rank: '疾風のファルコン', name: 'スカイホーク' },
  { minLv: 30, emoji: '⚡', rank: '雷鳴のグリフォン', name: 'サンダービーク' },
  { minLv: 40, emoji: '🔥', rank: '紅蓮のフェニックス', name: 'フレイムウィング' },
  { minLv: 50, emoji: '🛡️', rank: '聖銀のパラディン', name: 'イージスベア' },
  { minLv: 60, emoji: '🦊', rank: '九尾の仙狐', name: 'セレスティアルフォックス' },
  { minLv: 70, emoji: '🦖', rank: '蒼穹の飛竜', name: 'アズール・レックス' },
  { minLv: 80, emoji: '🐲', rank: '覇王の双頭竜', name: 'ツイン・ドラゴニクス' },
  { minLv: 90, emoji: '🦁', rank: '銀河の守護聖獣', name: 'コズミック・レオ' },
  { minLv: 100, emoji: '👑🐉', rank: '究極3級マスター', name: 'オメガ・セイバー' }
];

// ==================== 4. 不規則動詞3連撃 (トリニティ・スラッシュ用 35種) ====================
const RAW_IRREGULAR_VERBS = [
  { base: "write", past: "wrote", pp: "written", meaning: "書く", dummies: ["writed", "writing", "wroten"] },
  { base: "speak", past: "spoke", pp: "spoken", meaning: "話す", dummies: ["speaked", "speaking", "spoked"] },
  { base: "take", past: "took", pp: "taken", meaning: "取る・乗る", dummies: ["taked", "taking", "tooken"] },
  { base: "give", past: "gave", pp: "given", meaning: "与える", dummies: ["gived", "giving", "gaven"] },
  { base: "eat", past: "ate", pp: "eaten", meaning: "食べる", dummies: ["eated", "eating", "aten"] },
  { base: "see", past: "saw", pp: "seen", meaning: "見る・会う", dummies: ["seed", "seeing", "sawed"] },
  { base: "go", past: "went", pp: "gone", meaning: "行く", dummies: ["goed", "going", "wented"] },
  { base: "come", past: "came", pp: "come", meaning: "来る", dummies: ["comed", "camed", "coming"] },
  { base: "run", past: "ran", pp: "run", meaning: "走る", dummies: ["runned", "ranned", "running"] },
  { base: "become", past: "became", pp: "become", meaning: "〜になる", dummies: ["becomed", "becamed", "becoming"] },
  { base: "begin", past: "began", pp: "begun", meaning: "始める", dummies: ["begined", "beginning", "beganned"] },
  { base: "drink", past: "drank", pp: "drunk", meaning: "飲む", dummies: ["drinked", "drinking", "dranked"] },
  { base: "sing", past: "sang", pp: "sung", meaning: "歌う", dummies: ["singed", "singing", "sanged"] },
  { base: "swim", past: "swam", pp: "swum", meaning: "泳ぐ", dummies: ["swimmed", "swimming", "swammed"] },
  { base: "ring", past: "rang", pp: "rung", meaning: "（鐘が）鳴る", dummies: ["ringed", "ringing", "ranged"] },
  { base: "know", past: "knew", pp: "known", meaning: "知っている", dummies: ["knowed", "knowing", "knewed"] },
  { base: "grow", past: "grew", pp: "grown", meaning: "育つ・栽培する", dummies: ["growed", "growing", "grewed"] },
  { base: "fly", past: "flew", pp: "flown", meaning: "飛ぶ", dummies: ["flied", "flying", "flewed"] },
  { base: "throw", past: "threw", pp: "thrown", meaning: "投げる", dummies: ["throwed", "throwing", "threwed"] },
  { base: "draw", past: "drew", pp: "drawn", meaning: "描く・引く", dummies: ["drawed", "drawing", "drewed"] },
  { base: "break", past: "broke", pp: "broken", meaning: "壊す・折る", dummies: ["breaked", "breaking", "broked"] },
  { base: "choose", past: "chose", pp: "chosen", meaning: "選ぶ", dummies: ["choosed", "choosing", "chosed"] },
  { base: "forget", past: "forgot", pp: "forgotten", meaning: "忘れる", dummies: ["forgetted", "forgetting", "forgotted"] },
  { base: "wear", past: "wore", pp: "worn", meaning: "着ている", dummies: ["weared", "wearing", "wored"] },
  { base: "steal", past: "stole", pp: "stolen", meaning: "盗む", dummies: ["stealed", "stealing", "stoled"] },
  { base: "drive", past: "drove", pp: "driven", meaning: "運転する", dummies: ["drived", "driving", "droved"] },
  { base: "ride", past: "rode", pp: "ridden", meaning: "乗る", dummies: ["rided", "riding", "roded"] },
  { base: "fall", past: "fell", pp: "fallen", meaning: "落ちる・転ぶ", dummies: ["falled", "falling", "felled"] },
  { base: "buy", past: "bought", pp: "bought", meaning: "買う", dummies: ["buyed", "buying", "boughten"] },
  { base: "bring", past: "brought", pp: "brought", meaning: "持ってくる", dummies: ["bringed", "bringing", "brang"] },
  { base: "think", past: "thought", pp: "thought", meaning: "思う・考える", dummies: ["thinked", "thinking", "thank"] },
  { base: "teach", past: "taught", pp: "taught", meaning: "教える", dummies: ["teached", "teaching", "taughten"] },
  { base: "catch", past: "caught", pp: "caught", meaning: "捕まえる", dummies: ["catched", "catching", "caughten"] },
  { base: "make", past: "made", pp: "made", meaning: "作る", dummies: ["maked", "making", "maden"] },
  { base: "find", past: "found", pp: "found", meaning: "見つける", dummies: ["finded", "finding", "founded"] },
  { base: "build", past: "built", pp: "built", meaning: "建てる", dummies: ["builded", "building", "builted"] },
  { base: "send", past: "sent", pp: "sent", meaning: "送る", dummies: ["sended", "sending", "sented"] },
  { base: "spend", past: "spent", pp: "spent", meaning: "費やす・過ごす", dummies: ["spended", "spending", "spented"] },
  { base: "leave", past: "left", pp: "left", meaning: "出発する・残す", dummies: ["leaved", "leaving", "lefted"] },
  { base: "sell", past: "sold", pp: "sold", meaning: "売る", dummies: ["selled", "selling", "solded"] }
];

// ==================== 5. 英検3級 必須英単語・熟語 (厳選300語) ====================
const RAW_VOCAB_DATA = [
  // --- 3級 最重要熟語・連語 (80語) ---
  ["take place", "行われる・開催される"], ["take part in ~", "〜に参加する"], ["take care of ~", "〜の世話をする"],
  ["look forward to ~", "〜を楽しみに待つ"], ["look like ~", "〜のように見える"], ["look for ~", "〜を探す"],
  ["look after ~", "〜の世話をする"], ["look up ~", "（辞書などで）〜を調べる"], ["be interested in ~", "〜に興味がある"],
  ["be surprised at ~", "〜に驚く"], ["be worried about ~", "〜を心配している"], ["be excited about ~", "〜にわくわくする"],
  ["be famous for ~", "〜で有名である"], ["be known for ~", "〜で知られている"], ["be proud of ~", "〜を誇りに思う"],
  ["be afraid of ~", "〜を恐れる・怖がる"], ["be full of ~", "〜でいっぱいである"], ["be filled with ~", "〜で満たされている"],
  ["be made of ~", "〜（材料）でできている"], ["be made from ~", "〜（原料）から作られる"], ["be covered with ~", "〜で覆われている"],
  ["be different from ~", "〜と異なる"], ["be similar to ~", "〜に似ている"], ["be popular with ~", "〜に人気がある"],
  ["be good for ~", "〜（健康など）に良い"], ["be bad for ~", "〜に悪い"], ["as soon as ~", "〜するとすぐに"],
  ["as ~ as possible", "できるだけ〜"], ["not ~ anymore", "もはや〜ない"], ["not only A but also B", "AだけでなくBも"],
  ["both A and B", "AとBの両方"], ["either A or B", "AかBのどちらか"], ["neither A nor B", "AもBも〜ない"],
  ["instead of ~", "〜の代わりに"], ["because of ~", "〜のために・原因で"], ["thanks to ~", "〜のおかげで"],
  ["according to ~", "〜によると"], ["in order to ~", "〜するために"], ["so that ~", "〜するために・〜するように"],
  ["even if ~", "たとえ〜だとしても"], ["depend on ~", "〜次第である・頼る"], ["belong to ~", "〜に属している"],
  ["hear from ~", "〜から便り（連絡）がある"], ["hear of ~", "〜のことを耳にする"], ["agree with ~", "〜に賛成する"],
  ["care about ~", "〜を気にかける"], ["complain about ~", "〜について文句を言う"], ["apologize for ~", "〜を謝る"],
  ["prepare for ~", "〜の準備をする"], ["graduate from ~", "〜を卒業する"], ["succeed in ~", "〜に成功する"],
  ["suffer from ~", "〜に苦しむ・患う"], ["concentrate on ~", "〜に集中する"], ["focus on ~", "〜に焦点を合わせる"],
  ["put off ~", "〜を延期する"], ["call off ~", "〜を中止する"], ["give up ~", "〜をあきらめる"],
  ["run out of ~", "〜を使い果たす"], ["throw away ~", "〜を捨てる"], ["put away ~", "〜を片付ける"],
  ["clean up ~", "〜をきれいに掃除する"], ["pick up ~", "〜を拾う・迎えに行く"], ["turn down ~", "（音量）を下げる・断る"],
  ["find out ~", "〜を見つけ出す・知る"], ["figure out ~", "〜を理解する・解決する"], ["carry out ~", "〜を実行する"],
  ["pass away", "亡くなる"], ["break down", "故障する"], ["stay up late", "夜更かしする"],
  ["keep in touch", "連絡を取り合う"], ["make friends with ~", "〜と友達になる"], ["make a mistake", "間違いをする"],
  ["make a decision", "決定する・決心する"], ["make sure", "確かめる"], ["make up one's mind", "決心する"],
  ["have a cold", "風邪をひいている"], ["have a fever", "熱がある"], ["in the future", "将来は"],
  ["on one's way to ~", "〜へ行く途中で"], ["by oneself", "ひとりで・自力で"], ["for the first time", "初めて"],
  ["at least", "少なくとも"], ["at first", "最初は"], ["at last", "ついに"], ["in fact", "実は・実際は"],
  ["on time", "時間通りに"], ["in time", "間に合って"], ["all of a sudden", "突然に"],

  // --- 3級 重要動詞 (80語) ---
  ["achieve", "達成する"], ["accept", "受け入れる"], ["advise", "忠告する・助言する"], ["allow", "許す・許可する"],
  ["announce", "発表する・知らせる"], ["apologize", "謝る"], ["appear", "現れる・〜のように見える"], ["attend", "出席する・通う"],
  ["avoid", "避ける"], ["bake", "（パン・菓子を）焼く"], ["Beat", "打ち負かす・打つ"], ["believe", "信じる"],
  ["Boil", "沸かす・ゆでる"], ["borrow", "借りる"], ["lend", "貸す"], ["breathe", "呼吸する"],
  ["build", "建てる"], ["burn", "燃える・焦がす"], ["cancel", "キャンセルする・中止する"], ["celebrate", "祝う"],
  ["change", "変える・変わる"], ["check", "確認する・調べる"], ["choose", "選ぶ"], ["collect", "集める"],
  ["communicate", "意思疎通する"], ["compare", "比較する"], ["complain", "不平を言う"], ["continue", "続ける"],
  ["control", "制御する・管理する"], ["cough", "咳をする"], ["create", "創り出す"], ["cross", "横切る・渡る"],
  ["cure", "治療する・治す"], ["damage", "損害を与える"], ["decide", "決める"], ["decrease", "減少する"],
  ["increase", "増加する"], ["deliver", "配達する"], ["describe", "描写する・説明する"], ["destroy", "破壊する"],
  ["develop", "発達する・開発する"], ["direct", "道案内する・監督する"], ["disappear", "消える"], ["discover", "発見する"],
  ["discuss", "議論する・話し合う"], ["divide", "分ける・分割する"], ["donate", "寄付する"], ["educate", "教育する"],
  ["encourage", "励ます・促す"], ["enter", "入る"], ["escape", "逃げる・脱出する"], ["examine", "調査する・診察する"],
  ["exchange", "交換する"], ["expect", "予期する・期待する"], ["experience", "経験する"], ["explain", "説明する"],
  ["express", "表現する"], ["fail", "失敗する・落ちる"], ["feed", "餌をやる"], ["fill", "満たす"],
  ["fix", "修理する・固定する"], ["follow", "従う・ついて行く"], ["forgive", "許す"], ["freeze", "凍る"],
  ["fry", "揚げる・炒める"], ["gather", "集まる・集める"], ["greet", "挨拶する"], ["guess", "推測する"],
  ["guide", "案内する"], ["happen", "起こる"], ["hide", "隠す・隠れる"], ["hit", "打つ・当たる"],
  ["hold", "開催する・握る"], ["hurt", "傷つける・痛む"], ["imagine", "想像する"], ["improve", "改善する・上達する"],
  ["include", "含む"], ["introduce", "紹介する"], ["invent", "発明する"], ["invite", "招待する"],
  ["join", "参加する・加わる"], ["judge", "判断する"], ["keep", "保つ・飼い続ける"], ["kill", "殺す"],
  ["knock", "ノックする"], ["land", "着陸する"], ["last", "（時間が）続く"], ["lead", "導く"],
  ["lift", "持ち上げる"], ["locate", "位置する"], ["lose", "失う・負ける"], ["manage", "なんとか成し遂げる"],
  ["Marry", "結婚する"], ["measure", "測る"], ["mention", "言及する・述べる"], ["mind", "気にする・嫌がる"],
  ["miss", "乗り遅れる・寂しく思う"], ["mix", "混ぜる"], ["move", "引っ越す・動かす"], ["notice", "気づく"],
  ["offer", "申し出る・提供する"], ["order", "注文する・命じる"], ["organize", "主催する・整理する"], ["pass", "合格する・通り過ぎる"],
  ["pay", "支払う"], ["perform", "演じる・演奏する"], ["plant", "植える"], ["pollute", "汚染する"],
  ["pour", "注ぐ"], ["practice", "練習する"], ["prefer", "〜の方を好む"], ["prepare", "準備する"],
  ["prevent", "防ぐ・妨げる"], ["produce", "生産する"], ["promise", "約束する"], ["protect", "守る・保護する"],
  ["provide", "提供する"], ["publish", "出版する"], ["pull", "引く"], ["push", "押す"],
  ["raise", "上げる・育てる・集める"], ["reach", "到着する・手が届く"], ["realize", "気づく・実現する"], ["receive", "受け取る"],
  ["recognize", "見覚えがある・認める"], ["recommend", "勧める・推薦する"], ["recycle", "リサイクルする"], ["reduce", "減らす"],
  ["refuse", "断る"], ["regret", "後悔する"], ["relax", "くつろぐ"], ["remain", "〜のままである・残る"],
  ["remember", "覚えている"], ["remind", "思い出させる"], ["remove", "取り除く"], ["repair", "修理する"],
  ["repeat", "繰り返す"], ["replace", "取り替える"], ["reply", "返事をする"], ["report", "報告する"],
  ["require", "必要とする"], ["rescue", "救助する"], ["respect", "尊敬する"], ["return", "戻る・返す"],
  ["review", "復習する"], ["rise", "昇る・上がる"], ["save", "救う・貯金する・節約する"], ["search", "捜索する"],
  ["select", "選ぶ"], ["serve", "（食事を）出す・仕える"], ["share", "共有する・分け合う"], ["shine", "輝く"],
  ["solve", "（問題を）解く・解決する"], ["spread", "広がる・広げる"], ["steal", "盗む"], ["suggest", "提案する"],
  ["support", "支持する・支える"], ["survive", "生き残る"], ["tie", "結ぶ"], ["translate", "翻訳する"],
  ["treat", "扱う・治療する"], ["trust", "信頼する"], ["warn", "警告する"], ["waste", "浪費する・無駄にする"],
  ["weigh", "重さがある"], ["wonder", "〜かなと思う"], ["worry", "心配する"], ["wrap", "包む"],

  // --- 3級 重要形容詞・副詞・名詞 (90語) ---
  ["abroad", "外国へ・海外で"], ["accident", "事故"], ["activity", "活動"], ["adult", "大人"],
  ["advantage", "利点・強み"], ["advertisement", "広告"], ["advice", "助言・アドバイス"], ["amount", "量"],
  ["ancient", "古代の"], ["anniversary", "記念日"], ["anxious", "心配して・不安な"], ["appointment", "予約・約束"],
  ["area", "地域・面積"], ["article", "記事・品物"], ["ashamed", "恥ずかしく思って"], ["astronaut", "宇宙飛行士"],
  ["atmosphere", "大気・雰囲気"], ["attention", "注意・注目"], ["audience", "観客・聴衆"], ["available", "利用可能な・手が空いている"],
  ["average", "平均（の）"], ["award", "賞"], ["awful", "ひどい・恐ろしい"], ["background", "背景"],
  ["behavior", "振る舞い・行動"], ["bill", "請求書・お札"], ["blanket", "毛布"], ["blood", "血液"],
  ["board", "板・掲示板"], ["bottom", "底"], ["branch", "枝・支店"], ["brave", "勇敢な"],
  ["bright", "明るい・賢い"], ["calm", "穏やかな・冷静な"], ["capital", "首都・大文字"], ["careful", "注意深い"],
  ["careless", "不注意な"], ["celebration", "お祝い"], ["century", "世紀（100年）"], ["ceremony", "式典・儀式"],
  ["certain", "確信して・ある〜"], ["ceramics", "陶芸"], ["chance", "機会・可能性"], ["character", "登場人物・性格・文字"],
  ["cheap", "安い"], ["chemical", "化学の・化学物質"], ["childhood", "子供時代"], ["choice", "選択"],
  ["citizen", "市民"], ["climate", "気候"], ["cloth", "布"], ["coast", "海岸"],
  ["comfortable", "快適な"], ["common", "共通の・普通の"], ["company", "会社・仲間"], ["competition", "競争・大会"],
  ["complete", "完全な"], ["completely", "完全に"], ["condition", "状態・条件"], ["confident", "自信がある"],
  ["convenient", "便利な"], ["conversation", "会話"], ["correct", "正しい"], ["cost", "費用・かかる"],
  ["countryside", "田舎"], ["couple", "カップル・2〜3の"], ["courage", "勇気"], ["polite", "礼儀正しい"],
  ["creature", "生き物"], ["crime", "犯罪"], ["crowd", "群衆・人混み"], ["crowded", "混雑した"],
  ["cultural", "文化的な"], ["culture", "文化"], ["curious", "好奇心の強い"], ["current", "現在の"],
  ["custom", "習慣・風習"], ["customer", "客・顧客"], ["daily", "毎日の"], ["damaged", "壊れた・損傷した"],
  ["dangerous", "危険な"], ["degree", "度（温度・角度）"], ["delicious", "おいしい"], ["department", "部門・売り場"],
  ["desert", "砂漠"], ["dessert", "デザート"], ["detail", "詳細"], ["diary", "日記"],
  ["dictionary", "辞書"], ["diet", "食事・ダイエット"], ["difference", "違い"], ["difficult", "難しい"],
  ["difficulty", "困難"], ["direction", "方向・方角"], ["director", "監督・責任者"], ["dirty", "汚い"],
  ["disappointed", "がっかりした"], ["disaster", "災害"], ["disease", "病気"], ["distance", "距離"],
  ["district", "地区"], ["double", "2倍の"], ["doubt", "疑い"], ["downtown", "繁華街へ"],
  ["duty", "義務"], ["earthquake", "地震"], ["education", "教育"], ["effect", "効果・影響"],
  ["effort", "努力"], ["electricity", "電気"], ["electronic", "電子の"], ["empty", "空っぽの"],
  ["energy", "エネルギー・活力"], ["engine", "エンジン"], ["engineer", "技師"], ["enormous", "巨大な"],
  ["enough", "十分な"], ["entrance", "入口・入学"], ["environment", "環境"], ["equipment", "設備・道具"],
  ["especially", "特に"], ["event", "出来事・行事"], ["exact", "正確な"], ["exactly", "正確に・まさにその通り"]
];

// ==================== 6. 英検3級 重要文法・会話問題 (全60問) ====================
const RAW_GRAMMAR_DATA = [
  // --- 現在完了形 (経験・継続・完了) ---
  { id: "g_0", q: "I have ( ) to Okinawa three times.", sub: "【訳】私は沖縄に3回行ったことがあります。", opt: ["been", "gone", "went", "go"], ans: 0, exp: "「〜へ行ったことがある（経験）」は have been to 〜 で表します。" },
  { id: "g_1", q: "Have you ( ) seen a real panda?", sub: "【訳】あなたは今までに本物のパンダを見たことがありますか？", opt: ["ever", "never", "yet", "already"], ans: 0, exp: "現在完了の疑問文で「今までに〜したことがありますか」と聞くときは ever を使います。" },
  { id: "g_2", q: "Mr. Brown has lived in Japan ( ) ten years.", sub: "【訳】ブラウンさんは10年間日本に住んでいます。", opt: ["for", "since", "during", "from"], ans: 0, exp: "「10年間」という期間の長さを表すときは前置詞 for を使います。" },
  { id: "g_3", q: "She has been sick ( ) last Tuesday.", sub: "【訳】彼女は先週の火曜日からずっと寝込んでいます。", opt: ["since", "for", "from", "until"], ans: 0, exp: "「〜以来、〜からずっと（起点）」を表すときは since を使います。" },
  { id: "g_4", q: "I have just ( ) reading this history book.", sub: "【訳】私はちょうどこの歴史の本を読み終えたところです。", opt: ["finished", "finish", "finishes", "finishing"], ans: 0, exp: "現在完了形は〈have / has ＋ 過去分詞〉です。finish の過去分詞は finished です。" },
  { id: "g_5", q: "A: Have you done your homework ( )?\nB: No, not yet.", sub: "【訳】A: もう宿題は終わりましたか？\nB: いいえ、まだです。", opt: ["yet", "already", "ever", "just"], ans: 0, exp: "現在完了の疑問文の文末で「もう〜しましたか」と聞くときは yet を使います。" },
  { id: "g_6", q: "My brother has ( ) out. He isn't at home now.", sub: "【訳】兄は出かけてしまいました。今、家にいません。", opt: ["gone", "been", "went", "going"], ans: 0, exp: "has gone out で「外出してしまって（ここにいない）」という完了・結果を表します。" },
  { id: "g_7", q: "How ( ) have you known each other?", sub: "【訳】あなたたちはお互いを知り合ってどのくらいになりますか？", opt: ["long", "often", "many", "much"], ans: 0, exp: "現在完了の継続期間「どのくらいの間〜していますか」は How long 〜? で尋ねます。" },
  { id: "g_8", q: "I have ( ) eaten such a delicious cake!", sub: "【訳】私はこんなにおいしいケーキを一度も食べたことがありません！", opt: ["never", "ever", "yet", "ago"], ans: 0, exp: "「一度も〜ない（経験の否定）」は have never ＋ 過去分詞 で表します。" },
  { id: "g_9", q: "The train has ( ) arrived at the station.", sub: "【訳】電車はすでに駅に到着しました。", opt: ["already", "yet", "ever", "still"], ans: 0, exp: "肯定文で「すでに〜した」を表すときは already を使います。" },

  // --- 受動態 (be動詞 + 過去分詞) ---
  { id: "g_10", q: "This castle was ( ) about three hundred years ago.", sub: "【訳】このお城は約300年前に建てられました。", opt: ["built", "build", "builds", "building"], ans: 0, exp: "「建てられた（受動態）」は〈be動詞 ＋ 過去分詞〉です。build の過去分詞は built です。" },
  { id: "g_11", q: "French is ( ) in Canada, too.", sub: "【訳】フランス語はカナダでも話されています。", opt: ["spoken", "spoke", "speak", "speaking"], ans: 0, exp: "speak（話す）の過去分詞 spoken を使って受動態「話されている」を作ります。" },
  { id: "g_12", q: "Many pictures were ( ) by the students.", sub: "【訳】たくさんの絵が生徒たちによって描かれました。", opt: ["painted", "paint", "paints", "painting"], ans: 0, exp: "by the students（生徒たちによって）があるので受動態〈were ＋ 過去分詞〉にします。" },
  { id: "g_13", q: "This song is loved ( ) people all over the world.", sub: "【訳】この歌は世界中の人々によって愛されています。", opt: ["by", "to", "with", "of"], ans: 0, exp: "受動態で「〜によって（動作主）」を表すときは前置詞 by を使います。" },
  { id: "g_14", q: "Butter and cheese are made ( ) milk.", sub: "【訳】バターとチーズは牛乳から作られます。", opt: ["from", "of", "by", "in"], ans: 0, exp: "見た目が変わる原料（牛乳➔チーズ）には be made from 〜 を使います。" },
  { id: "g_15", q: "This desk is made ( ) wood.", sub: "【訳】この机は木でできています。", opt: ["of", "from", "by", "with"], ans: 0, exp: "見た目でわかる材料（木➔机）には be made of 〜 を使います。" },
  { id: "g_16", q: "The mountain was covered ( ) white snow.", sub: "【訳】その山は白い雪で覆われていました。", opt: ["with", "by", "of", "to"], ans: 0, exp: "「〜で覆われている」は熟語 be covered with 〜 を使います。" },
  { id: "g_17", q: "We were very ( ) at the news.", sub: "【訳】私たちはその知らせにとても驚きました。", opt: ["surprised", "surprise", "surprising", "surprises"], ans: 0, exp: "「〜に驚く」は be surprised at 〜 です。" },
  { id: "g_18", q: "When ( ) this museum opened?", sub: "【訳】この博物館はいつ開館されたのですか？", opt: ["was", "did", "is", "has"], ans: 0, exp: "過去の受動態の疑問文なので When was 〜 ＋ 過去分詞? となります。" },
  { id: "g_19", q: "The window was ( ) by the strong wind last night.", sub: "【訳】昨夜、強い風によって窓が割られました。", opt: ["broken", "broke", "break", "breaking"], ans: 0, exp: "break（壊す・割る）の過去分詞は broken です。" },

  // --- 関係代名詞 (who / which / that) & 分詞の後置修飾 ---
  { id: "g_20", q: "I have a friend ( ) lives in London.", sub: "【訳】私にはロンドンに住んでいる友達がいます。", opt: ["who", "which", "whose", "whom"], ans: 0, exp: "先行詞が人（a friend）で、後ろに動詞 lives が続くため主格の who が正解です。" },
  { id: "g_21", q: "This is the bus ( ) goes to the airport.", sub: "【訳】これは空港へ行くバスです。", opt: ["which", "who", "whom", "whose"], ans: 0, exp: "先行詞がモノ（the bus）なので関係代名詞 which を使います。" },
  { id: "g_22", q: "The cake ( ) my mother made yesterday was delicious.", sub: "【訳】母が昨日作ったケーキはとてもおいしかったです。", opt: ["that", "who", "whose", "what"], ans: 0, exp: "先行詞がモノ（The cake）で目的格の関係代名詞 that（または which）が入ります。" },
  { id: "g_23", q: "Look at the boy ( ) under the tree.", sub: "【訳】木の下を走っている男の子を見てごらん。", opt: ["running", "run", "ran", "runs"], ans: 0, exp: "名詞 the boy を後ろから修飾する現在分詞 running（走っている〜）です。" },
  { id: "g_24", q: "This is a book ( ) in simple English.", sub: "【訳】これはやさしい英語で書かれた本です。", opt: ["written", "wrote", "write", "writing"], ans: 0, exp: "「書かれた本」と受動の意味で修飾するため、過去分詞 written を使います。" },
  { id: "g_25", q: "Do you know the girl ( ) talking with Mr. Smith?", sub: "【訳】スミス先生と話している女の子を知っていますか？", opt: ["who is", "which is", "whose", "whom"], ans: 0, exp: "the girl who is talking 〜（話している女の子）の形になります。" },
  { id: "g_26", q: "She is a singer ( ) is very popular among young people.", sub: "【訳】彼女は若者の間でとても人気がある歌手です。", opt: ["who", "which", "what", "where"], ans: 0, exp: "先行詞が人（a singer）なので主格の関係代名詞 who です。" },
  { id: "g_27", q: "The language ( ) in Brazil is Portuguese.", sub: "【訳】ブラジルで話されている言語はポルトガル語です。", opt: ["spoken", "speaking", "spoke", "speaks"], ans: 0, exp: "「ブラジルで話されている言語」なので過去分詞 spoken で後ろから修飾します。" },

  // --- 間接疑問文・疑問詞 + to 不定詞・構文 ---
  { id: "g_28", q: "Do you know where ( )?", sub: "【訳】彼がどこに住んでいるか知っていますか？", opt: ["he lives", "does he live", "lives he", "he live"], ans: 0, exp: "間接疑問文は〈疑問詞 ＋ 主語 ＋ 動詞〉の語順（he lives）になります。" },
  { id: "g_29", q: "Please tell me what time ( ).", sub: "【訳】映画が何時に始まるか教えてください。", opt: ["the movie starts", "does the movie start", "starts the movie", "the movie start"], ans: 0, exp: "文の中に疑問詞節が入る間接疑問文なので〈主語 ＋ 動詞〉の順になります。" },
  { id: "g_30", q: "I don't know ( ) to buy for my father's birthday.", sub: "【訳】父の誕生日に何を買えばよいかわかりません。", opt: ["what", "how", "where", "when"], ans: 0, exp: "「何を買うべきか」は what to buy で表します。" },
  { id: "g_31", q: "Could you tell me ( ) to get to the city library?", sub: "【訳】市立図書館への行き方を教えていただけますか？", opt: ["how", "what", "who", "which"], ans: 0, exp: "「〜への行き方（どうやって行くか）」は how to get to 〜 です。" },
  { id: "g_32", q: "This bag is ( ) heavy for me to carry.", sub: "【訳】このかばんは私には重すぎて運べません。", opt: ["too", "so", "very", "enough"], ans: 0, exp: "〈too ＋ 形容詞 ＋ to ＋ 原形〉で「〜すぎて…できない」を表します。" },
  { id: "g_33", q: "The box was ( ) heavy that I couldn't lift it.", sub: "【訳】その箱はとても重かったので、私は持ち上げられませんでした。", opt: ["so", "too", "very", "such"], ans: 0, exp: "後ろに that 節があるので〈so ＋ 形容詞 ＋ that ...〉（とても〜なので…）の構文です。" },
  { id: "g_34", q: "It is important for us ( ) the environment.", sub: "【訳】私たちにとって環境を守ることは大切です。", opt: ["to protect", "protect", "protected", "protecting"], ans: 0, exp: "〈It is ＋ 形容詞 ＋ for 人 ＋ to ＋ 原形〉の構文です。" },
  { id: "g_35", q: "My mother made me ( ) my shoes.", sub: "【訳】母は私に自分の靴を洗わせました。", opt: ["wash", "to wash", "washed", "washing"], ans: 0, exp: "使役動詞 make（〜に…させる）は〈make ＋ 人 ＋ 動詞の原形〉をとります。" },
  { id: "g_36", q: "Let me ( ) your dictionary for a moment.", sub: "【訳】ちょっとあなたの辞書を使わせてください。", opt: ["use", "to use", "using", "used"], ans: 0, exp: "〈Let me ＋ 動詞の原形〉で「私に〜させてください」を表します。" },
  { id: "g_37", q: "I want you ( ) me with this project.", sub: "【訳】私はあなたにこの課題を手伝ってほしいです。", opt: ["to help", "help", "helping", "helped"], ans: 0, exp: "〈want ＋ 人 ＋ to ＋ 原形〉で「人に〜してほしい」を表します。" },
  { id: "g_38", q: "She told her son ( ) play video games too much.", sub: "【訳】彼女は息子にテレビゲームをしすぎないように言いました。", opt: ["not to", "to not", "don't", "never"], ans: 0, exp: "〈tell ＋ 人 ＋ not to ＋ 原形〉で「人に〜しないように言う」です。" },
  { id: "g_39", q: "Have you decided where ( ) during the vacation?", sub: "【訳】休暇中にどこへ行くかもう決めましたか？", opt: ["to go", "going", "went", "go"], ans: 0, exp: "where to go で「どこへ行くべきか」を表します。" },

  // --- 比較・接続詞・前置詞・助動詞の応用 ---
  { id: "g_40", q: "China is much ( ) than Japan.", sub: "【訳】中国は日本よりもずっと大きいです。", opt: ["larger", "large", "largest", "more large"], ans: 0, exp: "比較級を強める much の後ろで、than があるので比較級 larger です。" },
  { id: "g_41", q: "No other mountain in Japan is as ( ) as Mt. Fuji.", sub: "【訳】日本の他のどの山も、富士山ほど高くありません。", opt: ["high", "higher", "highest", "highly"], ans: 0, exp: "〈as ＋ 原級 ＋ as〉の間には形容詞の原級 high が入ります。" },
  { id: "g_42", q: "Soccer is one of the most popular ( ) in the world.", sub: "【訳】サッカーは世界で最も人気のあるスポーツの一つです。", opt: ["sports", "sport", "a sport", "sporting"], ans: 0, exp: "〈one of the ＋ 最上級 ＋ 複数名詞〉で「最も〜な…の一つ」となるため複数形 sports です。" },
  { id: "g_43", q: "The weather became ( ) and warmer in April.", sub: "【訳】4月になり、天気はだんだん暖かくなりました。", opt: ["warmer", "warm", "warmest", "more warm"], ans: 0, exp: "〈比較級 ＋ and ＋ 比較級〉で「だんだん〜になる」を表します。" },
  { id: "g_44", q: "I will call you as soon as I ( ) at the airport.", sub: "【訳】空港に着いたらすぐにあなたに電話します。", opt: ["arrive", "will arrive", "arrived", "arriving"], ans: 0, exp: "時を表す接続詞（as soon as 〜）の節内では未来のことでも現在形 arrive を使います。" },
  { id: "g_45", q: "( ) it was raining hard, they continued the soccer game.", sub: "【訳】激しい雨が降っていたけれども、彼らはサッカーの試合を続けました。", opt: ["Although", "Because", "So", "If"], ans: 0, exp: "「〜だけれども（譲歩）」を表す接続詞 Although が正解です。" },
  { id: "g_46", q: "Take your umbrella with you ( ) case it rains.", sub: "【訳】雨が降るといけないので、傘を持って行きなさい。", opt: ["in", "on", "at", "by"], ans: 0, exp: "in case 〜 で「〜といけないから、万一〜の場合に備えて」という表現です。" },
  { id: "g_47", q: "You had ( ) go see a doctor right away.", sub: "【訳】今すぐ病院に行って診てもらったほうがよいですよ。", opt: ["better", "good", "best", "well"], ans: 0, exp: "〈had better ＋ 動詞の原形〉で「〜したほうがよい」という強い忠告を表します。" },
  { id: "g_48", q: "That tall boy ( ) be Ken's brother. They look very similar.", sub: "【訳】あの背の高い少年はケンの兄に違いありません。よく似ていますから。", opt: ["must", "may not", "cannot", "shouldn't"], ans: 0, exp: "must be 〜 で「〜に違いない（強い推量）」を表します。" },
  { id: "g_49", q: "I used ( ) play the violin when I was a child.", sub: "【訳】私は子供の頃、よくバイオリンを弾いたものでした。", opt: ["to", "for", "with", "at"], ans: 0, exp: "〈used to ＋ 動詞の原形〉で「以前はよく〜したものだ」という過去の習慣を表します。" },

  // --- 英検3級 頻出の対話・会話表現 ---
  { id: "g_50", q: "A: Do you mind if I open the window?\nB: ( ). It's a little hot in here.", sub: "【訳】A: 窓を開けても構いませんか？\nB: ええ、どうぞ（気にしませんよ）。ここは少し暑いですから。", opt: ["Not at all", "Yes, I do", "I'm sorry", "Never mind"], ans: 0, exp: "Do you mind 〜?（気にしますか？）に対して「どうぞ（全く気にしません）」と許可する返答は Not at all. や Of course not. です。" },
  { id: "g_51", q: "A: Would you like to join our tennis club?\nB: ( ), but I'm already in the art club.", sub: "【訳】A: 私たちのテニス部に入りませんか？\nB: ぜひ入りたいのですが、すでに美術部に入っているんです。", opt: ["I'd love to", "No, thank you", "You're welcome", "That's right"], ans: 0, exp: "I'd love to, but ... で「ぜひそうしたいのですが、あいにく…」と丁寧に断る定番表現です。" },
  { id: "g_52", q: "A: I broke your favorite cup. I'm really sorry.\nB: ( ). I have another one.", sub: "【訳】A: お気に入りのコップを割ってしまいました。本当にごめんなさい。\nB: 気にしないで。もう一つ持っているから。", opt: ["Never mind", "You're welcome", "Me, too", "Good luck"], ans: 0, exp: "謝罪に対して「気にしないで、大丈夫だよ」と慰める表現は Never mind. や That's all right. です。" },
  { id: "g_53", q: "A: How do you like your new school, Emma?\nB: ( ). Everyone is very kind.", sub: "【訳】A: 新しい学校はどうですか、エマ？\nB: とても気に入っています。みんなとても親切です。", opt: ["I like it very much", "Yes, I do", "By bus", "For two years"], ans: 0, exp: "How do you like 〜? は「〜はどうですか（感想）」を尋ねる表現です。" },
  { id: "g_54", q: "A: Could you take a picture of us?\nB: ( ). Smile!", sub: "【訳】A: 私たちの写真を撮っていただけますか？\nB: もちろんいいですよ。笑って！", opt: ["Certainly", "No, I couldn't", "Not yet", "Pardon me"], ans: 0, exp: "依頼に対して「かしこまりました・もちろん」と快諾する表現は Certainly. や Sure. です。" },
  { id: "g_55", q: "A: What do you do on weekends?\nB: ( ).", sub: "【訳】A: 週末は普段何をしていますか？\nB: たいてい友達とハイキングに行きます。", opt: ["I usually go hiking", "I am studying", "It was fun", "Yes, I did"], ans: 0, exp: "普段の習慣（What do you do 〜?）を聞かれているので現在形で答えます。" },
  { id: "g_56", q: "A: May I leave a message for Mr. Carter?\nB: Sure. ( ) get a pen.", sub: "【訳】A: カーターさんに伝言を残してもよろしいですか？\nB: もちろんです。ペンを取ってきますね。", opt: ["Let me", "Make me", "Help you", "Tell you"], ans: 0, exp: "電話応対で「ペンを取ってきます（私に取らせてください）」は Let me get a pen. と言います。" },
  { id: "g_57", q: "A: Are you ready to order, sir?\nB: ( ). Just a few more minutes, please.", sub: "【訳】A: ご注文はお決まりですか？\nB: いいえ、まだです。あともう数分待ってください。", opt: ["Not yet", "No problem", "Here you are", "Help yourself"], ans: 0, exp: "「まだ決まっていません」は Not yet. です。" },
  { id: "g_58", q: "A: Please ( ) yourself to the cookies on the table.\nB: Thank you! They look delicious.", sub: "【訳】A: テーブルの上のクッキーをご自由に召し上がってください。\nB: ありがとう！おいしそうですね。", opt: ["help", "make", "take", "eat"], ans: 0, exp: "Please help yourself to 〜 で「〜をご自由に取って召し上がってください」という重要表現です。" },
  { id: "g_59", q: "A: I have a speech contest tomorrow. I'm so nervous.\nB: Don't worry. ( )!", sub: "【訳】A: 明日スピーチコンテストがあるんだ。すごく緊張するよ。\nB: 心配しないで。全力を尽くして（頑張って）ね！", opt: ["Do your best", "Congratulations", "Same to you", "Take your time"], ans: 0, exp: "これから本番に臨む相手を励ますときは Do your best!（ベストを尽くしてね！）や Good luck! を使います。" }
];
