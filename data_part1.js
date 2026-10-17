// ==========================================
// 英検3級 クロノ・オデッセイ 〜365日の時空冒険〜
// マスターデータ定義ファイル① (data_part1.js)
// [収録] 新武具36種 / 全15章ボス / 15段階進化 / 不規則動詞50種 / 3級単語前半400語
// ==========================================

// ==================== 1. 時空武具・レリック格納庫 (完全新作・全36種) ====================
const SHOP_EQUIP_DATA = [
  // --- 🛡️ アーマー (防HP) 12種 ---
  { id: 'hat_1', name: 'ブロンズ・ギアメット', type: 'hat', icon: '⚙️', price: 30, rank: '🌱 ノーマル', val: 80, desc: '防HP +80 / 時空探索の基本装備' },
  { id: 'hat_2', name: '探求者のゴーグル', type: 'hat', icon: '🥽', price: 60, rank: '🌱 ノーマル', val: 180, desc: '防HP +180 / 遺跡の罠を見抜く' },
  { id: 'hat_3', name: 'アイアン・ガードナー', type: 'hat', icon: '🛡️', price: 110, rank: '🌊 レア', val: 420, desc: '防HP +420 / 堅牢な鋼鉄の盾' },
  { id: 'hat_4', name: 'サイバー・バイザー', type: 'hat', icon: '🕶️', price: 180, rank: '🌊 レア', val: 850, desc: '防HP +850 / 英語データを高速解析' },
  { id: 'hat_5', name: 'ミスリル・ヘルム', type: 'hat', icon: '🪖', price: 280, rank: '⚡ スーパーレア', val: 1600, desc: '防HP +1600 / 魔法銀の兜' },
  { id: 'hat_6', name: '蒼穹騎士のクレスト', type: 'hat', icon: '🦅', price: 420, rank: '⚡ スーパーレア', val: 2800, desc: '防HP +2800 / 空を統べる騎士の紋章' },
  { id: 'hat_7', name: 'オリハルコン・アーマー', type: 'hat', icon: '💎', price: 650, rank: '🔥 レジェンド', val: 4800, desc: '防HP +4800 / 古代帝国の超金属鎧' },
  { id: 'hat_8', name: 'フェニックス・メイル', type: 'hat', icon: '🔥', price: 950, rank: '🔥 レジェンド', val: 7500, desc: '防HP +7500 / 不死鳥の炎を宿す鎧' },
  { id: 'hat_9', name: 'イージス・フィールド', type: 'hat', icon: '🌐', price: 1400, rank: '🌈 ミシック', val: 12000, desc: '防HP +12000 / 絶対防御の光学障壁' },
  { id: 'hat_10', name: 'ヴァルハラ・クラウン', type: 'hat', icon: '👑', price: 2000, rank: '🌈 ミシック', val: 18000, desc: '防HP +18000 / 神々の聖域の王冠' },
  { id: 'hat_dragon_crown', name: 'バハムート・重装殻', type: 'hat', icon: '🐉🛡️', price: 9999, rank: '🎁 神殿ボス限定', val: 26000, desc: '防HP +26000 / 機甲竜の装甲 (Lv.80〜)', reqLv: 80 },
  { id: 'hat_genesis_crown', name: 'アカシック・イージス', type: 'hat', icon: '🌌🛡️✨', price: 99999, rank: '🌌 時空神話級', val: 55000, desc: '防HP +55000 / 全知の絶対防壁 (Lv.120〜)', reqLv: 120, isSecret: true },

  // --- ⚔️ ブレイド (攻撃力) 12種 ---
  { id: 'wp_1', name: 'クロノ・ダガー', type: 'weapon', icon: '🗡️', price: 25, rank: '🌱 ノーマル', val: 30, desc: '攻撃 +30 / 時計の針の短剣' },
  { id: 'wp_2', name: 'スチーム・ランス', type: 'weapon', icon: '🔱', price: 55, rank: '🌱 ノーマル', val: 70, desc: '攻撃 +70 / 蒸気機関の突撃槍' },
  { id: 'wp_3', name: 'ソニック・セイバー', type: 'weapon', icon: '⚔️', price: 100, rank: '🌊 レア', val: 150, desc: '攻撃 +150 / 音速の衝撃波を放つ剣' },
  { id: 'wp_4', name: 'ルーン・クロスボウ', type: 'weapon', icon: '🏹', price: 170, rank: '🌊 レア', val: 280, desc: '攻撃 +280 / 古代文字が光る魔導弓' },
  { id: 'wp_5', name: 'プラズマ・ハルバード', type: 'weapon', icon: '⚡', price: 260, rank: '⚡ スーパーレア', val: 480, desc: '攻撃 +480 / 紫電を纏う大斧槍' },
  { id: 'wp_6', name: 'クリムゾン・カタナ', type: 'weapon', icon: '🩸', price: 400, rank: '⚡ スーパーレア', val: 780, desc: '攻撃 +780 / 紅蓮の閃光を放つ名刀' },
  { id: 'wp_7', name: 'メテオ・スマッシャー', type: 'weapon', icon: '☄️', price: 620, rank: '🔥 レジェンド', val: 1250, desc: '攻撃 +1250 / 星砕きの重力ハンマー' },
  { id: 'wp_8', name: '神槍グングニル', type: 'weapon', icon: '🌠', price: 920, rank: '🔥 レジェンド', val: 1900, desc: '攻撃 +1900 / 必中の神話の槍' },
  { id: 'wp_9', name: '双聖剣デュランダル', type: 'weapon', icon: '⚜️', price: 1450, rank: '🌈 ミシック', val: 2900, desc: '攻撃 +2900 / 次元を切り裂く二刀流' },
  { id: 'wp_10', name: '銀河剣ラグナロク', type: 'weapon', icon: '🌌', price: 2100, rank: '🌈 ミシック', val: 4200, desc: '攻撃 +4200 / 神々の黄昏を呼ぶ大剣' },
  { id: 'wp_dark_blade', name: '機皇剣リヴァイアサン', type: 'weapon', icon: '🦈⚔️', price: 9999, rank: '🎁 神殿ボス限定', val: 6000, desc: '攻撃 +6000 / 深海機皇の魔剣 (Lv.80〜)', reqLv: 80 },
  { id: 'wp_genesis_blade', name: '時空聖剣クロノ・ブリンガー', type: 'weapon', icon: '⏳⚔️🌟', price: 99999, rank: '🌌 時空神話級', val: 12000, desc: '攻撃 +12000 / 歴史を紡ぐ究極聖剣 (Lv.120〜)', reqLv: 120, isSecret: true },

  // --- 💍 レリック (速さ・会心率) 12種 ---
  { id: 'aura_1', name: 'コンパス・チャーム', type: 'aura', icon: '🧭', price: 30, rank: '🌱 ノーマル', val: 10, desc: '速さ +10 / 迷いを払う羅針盤' },
  { id: 'aura_2', name: 'フェザー・ブーツ', type: 'aura', icon: '🪶', price: 70, rank: '🌱 ノーマル', val: 24, desc: '速さ +24 / 風のように駆ける靴' },
  { id: 'aura_3', name: 'アクア・クリスタル', type: 'aura', icon: '💧', price: 120, rank: '🌊 レア', val: 48, desc: '速さ +48 / 澄み切った思考の水晶' },
  { id: 'aura_4', name: 'ジェット・スラスター', type: 'aura', icon: '🚀', price: 200, rank: '🌊 レア', val: 85, desc: '速さ +85 / 加速する推進ユニット' },
  { id: 'aura_5', name: 'ライトニング・コア', type: 'aura', icon: '⚡', price: 310, rank: '⚡ スーパーレア', val: 135, desc: '速さ +135 / 稲妻の反射神経' },
  { id: 'aura_6', name: 'ヴァルキリー・ウィング', type: 'aura', icon: '🪽', price: 460, rank: '⚡ スーパーレア', val: 200, desc: '速さ +200 / 戦乙女の白銀の翼' },
  { id: 'aura_7', name: 'クロノ・ポケットウォッチ', type: 'aura', icon: '⏱️', price: 700, rank: '🔥 レジェンド', val: 290, desc: '速さ +290 / 解答時間を引き延ばす懐中時計' },
  { id: 'aura_8', name: 'アストラル・リング', type: 'aura', icon: '💍', price: 1000, rank: '🔥 レジェンド', val: 400, desc: '速さ +400 / 星々の導きの指輪' },
  { id: 'aura_9', name: 'セラフィム・ハロー', type: 'aura', icon: '😇', price: 1500, rank: '🌈 ミシック', val: 540, desc: '速さ +540 / 熾天使の後光' },
  { id: 'aura_10', name: 'クォンタム・ドライブ', type: 'aura', icon: '⚛️', price: 2200, rank: '🌈 ミシック', val: 720, desc: '速さ +720 / 量子跳躍エンジン' },
  { id: 'aura_dragon_light', name: 'オーディンの閃光輪', type: 'aura', icon: '⚡💍', price: 9999, rank: '🎁 神殿ボス限定', val: 950, desc: '速さ +950 / 主神の雷光 (Lv.80〜)', reqLv: 80 },
  { id: 'aura_genesis_light', name: '永劫のメビウスリング', type: 'aura', icon: '♾️✨👑', price: 99999, rank: '🌌 時空神話級', val: 1600, desc: '速さ +1600 / 時空を超越する神環 (Lv.120〜)', reqLv: 120, isSecret: true }
];

// ==================== 2. 全15章・時空神殿ガーディアン (1年間長期攻略ボス) ====================
const BOSS_STAGES = [
  {
    lv: 1, name: "時計塔の機兵・ギガース", icon: "⚙️", hp: 800, atk: 55, exp: 200, gems: 30,
    desc: "【第1章：始まりの時計塔】基礎の語彙とスピードで突破せよ！",
    introMsg: "TICK-TOCK... INTRUDER DETECTED! (カチコチ…侵入者を発見！時計塔の門番ギガースが相手だ！)",
    defeatMsg: "SYSTEM DOWN... (システム停止…！だが深海神殿の主は手強いぞ…！)"
  },
  {
    lv: 2, name: "深海神殿のクラーケン・ギア", icon: "🦑", hp: 2200, atk: 110, exp: 420, gems: 40,
    desc: "【第2章：海底遺跡】触手の連撃に注意！アーマー強化で挑もう。",
    introMsg: "Splash! You will sink into the deep sea! (海底の藻屑にしてやろう！3級の荒波を越えられるかな！？)",
    defeatMsg: "Glub glub... Defeated!? (まさかこの私が敗れるとは…！砂漠の覇者が目を覚ますぞ！)"
  },
  {
    lv: 3, name: "黄金砂漠のファラオ・スフィンクス", icon: "🦁", hp: 4800, atk: 190, exp: 780, gems: 55,
    desc: "【第3章：ピラミッド迷宮】謎かけの守護者。即答会心で装甲を貫け！",
    introMsg: "Answer my riddles if you want to pass! (通りたければ我が英語の謎かけに答えてみせよ！)",
    defeatMsg: "Your wisdom is real... (見事な知恵だ…！空中庭園への道をを開こう！)"
  },
  {
    lv: 4, name: "空中庭園のグリフォン・ロード", icon: "🦅", hp: 9000, atk: 290, exp: 1350, gems: 70,
    desc: "【第4章：浮遊大陸】音速の翼を持つ霊鳥。速さ(レリック)を高めよう！",
    introMsg: "Can you keep up with my speed in the sky!? (天空を駆ける我がスピードについてこられるか！)",
    defeatMsg: "My wings are heavy... (翼が折れたか…！だが永久凍土の狼が牙を研いでいるぞ！)"
  },
  {
    lv: 5, name: "永久凍土の機甲狼・フェンリル", icon: "🐺", hp: 15000, atk: 440, exp: 2200, gems: 90,
    desc: "【第5章：白銀の氷河】中盤の壁！強力な氷牙の反撃に耐え抜け！",
    introMsg: "Awoooo! Everything will be frozen! (凍てつく吹雪の中で、お前の知識も凍りつくがいい！)",
    defeatMsg: "The ice is melting...!? (氷が溶かされるほどの熱き情熱…！あっぱれだ！)"
  },
  {
    lv: 6, name: "紅蓮火山のイフリート・コア", icon: "🔥", hp: 24000, atk: 640, exp: 3200, gems: 110,
    desc: "【第6章：マグマ溶鉱炉】高火力ボス！ガチャで武具を+進化させて挑め！",
    introMsg: "Burn to ashes in my magma furnace! (灼熱の溶鉱炉へようこそ！生半可な英語力では蒸発するぞ！)",
    defeatMsg: "Cooled down...!? (我がマグマが鎮められただと…！？)"
  },
  {
    lv: 7, name: "雷雲城塞のトール・ヴァルキリー", icon: "⚡", hp: 36000, atk: 900, exp: 4500, gems: 135,
    desc: "【第7章：天空の雷帝城】完了形・受動態・関係代名詞の総合力が試される！",
    introMsg: "By the thunder of Valhalla, I will test your courage! (雷帝の名において、貴様の真の実力を試す！)",
    defeatMsg: "Magnificent strike! (見事な一撃！君はもはや一人前の時空騎士だ！)"
  },
  {
    lv: 8, name: "星屑回廊のアストラル・キマイラ", icon: "☄️", hp: 52000, atk: 1250, exp: 6000, gems: 160,
    desc: "【第8章：アストラル界】後半戦突入！長文とリスニングの複合攻撃を攻略せよ！",
    introMsg: "Roar from the stars! (星々の回廊から先へは行かせん！3つの獣の力を受けてみよ！)",
    defeatMsg: "Fading into stardust... (星屑へと還るのか…だが機械都市の機皇が待っているぞ！)"
  },
  {
    lv: 9, name: "機械都市の機皇・メカリヴァイアサン", icon: "🦈", hp: 72000, atk: 1650, exp: 8000, gems: 190,
    desc: "【第9章：サイバーメトロポリス】超重装甲！フィーバー突入で一気に削り切れ！",
    introMsg: "MAXIMUM LASER CHARGED! (最大出力レーザー充填完了！機械都市の防衛網を突破できるか！)",
    defeatMsg: "MAIN CORE DESTROYED...! (メインコア大破…！なんという攻撃力だ…！)"
  },
  {
    lv: 10, name: "幻影迷宮のオーディン・ナイト", icon: "🏇", hp: 98000, atk: 2150, exp: 10500, gems: 230,
    desc: "【第10章：神話の迷宮】神槍を振るう古の騎士王。2ミス以内の集中力が必要！",
    introMsg: "My spear Gungnir never misses its target! (我が神槍グングニルは決して的を外さん！いざ尋常に勝負！)",
    defeatMsg: "You have surpassed the gods' knight... (神の騎士すら超えてみせるか…！)"
  },
  {
    lv: 11, name: "太陽神殿のアポロン・フェニックス", icon: "🌅", hp: 130000, atk: 2800, exp: 13500, gems: 280,
    desc: "【第11章：ヘリオス神殿】太陽の輝きを持つ霊鳥。ミシック装備を揃えて挑もう！",
    introMsg: "Shine brighter than the sun if you seek victory! (勝利を望むなら、太陽よりも眩しく輝いてみせよ！)",
    defeatMsg: "A new sun has risen... (新たなる太陽が昇った…！宇宙要塞への扉を開こう！)"
  },
  {
    lv: 12, name: "銀河要塞のバハムート・ゼロ", icon: "🐲", hp: 170000, atk: 3600, exp: 17000, gems: 340,
    desc: "【第12章：ラグナロク宙域】超竜の咆哮。武具の限界突破（+強化）が勝利の鍵！",
    introMsg: "MEGA FLARE READY... (メガフレア発射準備完了…！銀河の果てで散るがいい！)",
    defeatMsg: "Impossible... Even Bahamut Zero fell!? (バハムート・ゼロすら撃墜するとは…！)"
  },
  {
    lv: 13, name: "次元断層のセラフィム・アーク", icon: "🪽", hp: 220000, atk: 4600, exp: 22000, gems: 420,
    desc: "【第13章：時空境界線】皇帝クロノスを守る最高位の守護天使。極限のスピード勝負！",
    introMsg: "Only the chosen master may enter the Emperor's throne! (選ばれし3級マスターのみが皇帝の玉座へ進める！)",
    defeatMsg: "The final gate is open. Go forth! (最後の門は開かれた。時空皇帝クロノスのもとへ進め！)"
  },
  {
    lv: 14, name: "時空皇帝・クロノス", icon: "⏳👑", hp: 280000, atk: 6000, exp: 30000, gems: 600,
    desc: "【第14章：表ラスボス】全時代の支配者！1年間の知識を結集して討伐せよ！",
    introMsg: "I am Chronos, the Emperor of Time! Show me everything you have learned! (我は時空皇帝クロノス！君が積み重ねたすべての努力と英語力をぶつけてこい！)",
    defeatMsg: "Magnificent! You have conquered time itself! (あっぱれだ！君は時間を超え、英検3級の頂点に立った！)"
  },
  {
    lv: 15, name: "全知の記録神・アカシックレコード", icon: "🌌👁️📖", hp: 450000, atk: 9000, exp: 50000, gems: 1000,
    desc: "【最終第15章：真・裏ボス】神話レリック＆極限レベルで挑む、全知全能の最終試練！",
    isSecret: true,
    introMsg: "I am the Akashic Record, the memory of the universe... (我は全宇宙の記憶『アカシックレコード』。真の3級完全制覇者の力、見届けよう！)",
    defeatMsg: "Your name is carved into eternity! Congratulations, Grand Master! (君の名は永遠の歴史に刻まれた！おめでとう、真の時空マスターよ！)"
  }
];

// ==================== 3. 相棒ガーディアン 15段階進化ツリー (Lv.1〜Lv.200) ====================
const AVATARS = [
  { minLv: 1, emoji: '🤖', rank: '星霊機獣・第1形態', name: 'クロノビット' },
  { minLv: 10, emoji: '🐾', rank: '時空スカウト', name: 'パルスハウンド' },
  { minLv: 22, emoji: '🐺', rank: '疾風の機甲狼', name: 'サイバーフェンリル' },
  { minLv: 35, emoji: '🦅', rank: '蒼穹のストライカー', name: 'エアロファルコン' },
  { minLv: 50, emoji: '⚔️', rank: '時空聖騎士', name: 'クロノパラディン' },
  { minLv: 65, emoji: '🦁', rank: '黄金の獣王機', name: 'レグルス・ギア' },
  { minLv: 80, emoji: '⚡', rank: '雷帝ヴァルキリア', name: 'サンダー・ヴァルキリー' },
  { minLv: 95, emoji: '🔥', rank: '紅蓮の機神', name: 'イグニス・プライム' },
  { minLv: 110, emoji: '🪽', rank: '白銀の熾天使', name: 'セラフィム・ウィング' },
  { minLv: 125, emoji: '🦖', rank: '超重力機竜', name: 'グラビティ・レックス' },
  { minLv: 140, emoji: '🐲', rank: '星雲竜ドラグーン', name: 'ネビュラ・ドラゴニクス' },
  { minLv: 155, emoji: '🛸', rank: '次元航行戦艦', name: 'アーク・エクリプス' },
  { minLv: 170, emoji: '🐉✨', rank: '神話機甲竜', name: 'バハムート・ギア' },
  { minLv: 185, emoji: '⏳👑', rank: '時空統括王', name: 'クロノス・ロード' },
  { minLv: 200, emoji: '🌌👑', rank: '時空超越神', name: 'アーク・ノヴァ' }
];

// ==================== 4. 不規則動詞3連撃 (トリニティ・スラッシュ 全50種・150活用) ====================
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
  { base: "break", past: "broke", pp: "broken", meaning: "壊す・割る", dummies: ["breaked", "breaking", "broked"] },
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
  { base: "sell", past: "sold", pp: "sold", meaning: "売る", dummies: ["selled", "selling", "solded"] },
  { base: "tell", past: "told", pp: "told", meaning: "伝える・話す", dummies: ["telled", "telling", "tolded"] },
  { base: "hear", past: "heard", pp: "heard", meaning: "聞く・聞こえる", dummies: ["heared", "hearing", "hearden"] },
  { base: "feel", past: "felt", pp: "felt", meaning: "感じる", dummies: ["feeled", "feeling", "felted"] },
  { base: "keep", past: "kept", pp: "kept", meaning: "保つ・続ける", dummies: ["keeped", "keeping", "kepted"] },
  { base: "sleep", past: "slept", pp: "slept", meaning: "眠る", dummies: ["sleeped", "sleeping", "slepted"] },
  { base: "meet", past: "met", pp: "met", meaning: "会う", dummies: ["meeted", "meeting", "metted"] },
  { base: "win", past: "won", pp: "won", meaning: "勝つ", dummies: ["winned", "winning", "woned"] },
  { base: "lose", past: "lost", pp: "lost", meaning: "失う・負ける", dummies: ["losed", "losing", "losted"] },
  { base: "pay", past: "paid", pp: "paid", meaning: "支払う", dummies: ["payed", "paying", "paided"] },
  { base: "stand", past: "stood", pp: "stood", meaning: "立つ", dummies: ["standed", "standing", "stooded"] }
];

// ==================== 5. 英検3級 必須英単語・熟語 前半400語 (No.1〜No.400) ====================
const RAW_VOCAB_PART1 = [
  // --- A. 3級 最重要熟語・連語 120語 (No.1〜120) ---
  ["take place", "行われる・開催される"], ["take part in ~", "〜に参加する"], ["take care of ~", "〜の世話をする"],
  ["take a seat", "席に着く・座る"], ["take a rest", "ひと休みする"], ["take a trip", "旅行をする"],
  ["take notes", "メモをとる"], ["take off ~", "〜を脱ぐ・離陸する"], ["take out ~", "〜を取り出す"],
  ["take time", "時間がかかる"], ["look forward to ~", "〜を楽しみに待つ"], ["look like ~", "〜のように見える"],
  ["look for ~", "〜を探す"], ["look after ~", "〜の世話をする"], ["look up ~", "（辞書などで）〜を調べる"],
  ["look around ~", "〜を見回す"], ["look into ~", "〜を調査する"], ["look out", "気をつける・用心する"],
  ["be interested in ~", "〜に興味がある"], ["be surprised at ~", "〜に驚く"], ["be worried about ~", "〜を心配している"],
  ["be excited about ~", "〜にわくわくする"], ["be famous for ~", "〜で有名である"], ["be known for ~", "〜で知られている"],
  ["be known as ~", "〜として知られている"], ["be proud of ~", "〜を誇りに思う"], ["be afraid of ~", "〜を恐れる・怖がる"],
  ["be full of ~", "〜でいっぱいである"], ["be filled with ~", "〜で満たされている"], ["be made of ~", "〜（材料）でできている"],
  ["be made from ~", "〜（原料）から作られる"], ["be covered with ~", "〜で覆われている"], ["be crowded with ~", "〜で混雑している"],
  ["be different from ~", "〜と異なる"], ["be similar to ~", "〜に似ている"], ["be popular with ~", "〜に人気がある"],
  ["be good at ~", "〜が得意である"], ["be poor at ~", "〜が苦手である"], ["be good for ~", "〜（健康など）に良い"],
  ["be bad for ~", "〜に悪い"], ["be late for ~", "〜に遅刻する"], ["be absent from ~", "〜を欠席する"],
  ["be ready for ~", "〜の準備ができている"], ["be tired of ~", "〜に飽きる・うんざりする"], ["be tired from ~", "〜で疲れている"],
  ["be pleased with ~", "〜を喜ぶ・満足する"], ["be satisfied with ~", "〜に満足している"], ["be angry with ~", "（人）に怒っている"],
  ["be kind to ~", "〜に親切である"], ["be nice to ~", "〜に優しくする"], ["be married to ~", "〜と結婚している"],
  ["be born in ~", "〜で生まれる"], ["be fond of ~", "〜が好きである"], ["be sure of ~", "〜を確信している"],
  ["as soon as ~", "〜するとすぐに"], ["as ~ as possible", "できるだけ〜"], ["as ~ as one can", "できるだけ〜"],
  ["as usual", "いつものように"], ["as a result", "結果として"], ["as well", "〜もまた・同様に"],
  ["not ~ anymore", "もはや〜ない"], ["not ~ at all", "全く〜ない"], ["not only A but also B", "AだけでなくBも"],
  ["both A and B", "AとBの両方"], ["either A or B", "AかBのどちらか"], ["neither A nor B", "AもBも〜ない"],
  ["between A and B", "AとBの間に"], ["from A to B", "AからBまで"], ["instead of ~", "〜の代わりに"],
  ["because of ~", "〜のために・原因で"], ["thanks to ~", "〜のおかげで"], ["according to ~", "〜によると"],
  ["in order to ~", "〜するために"], ["so that ~", "〜するために・〜するように"], ["even if ~", "たとえ〜だとしても"],
  ["depend on ~", "〜次第である・頼る"], ["belong to ~", "〜に属している"], ["hear from ~", "〜から連絡がある"],
  ["hear of ~", "〜のことを耳にする"], ["agree with ~", "〜に賛成する"], ["care about ~", "〜を気にかける"],
  ["talk about ~", "〜について話す"], ["think of ~", "〜を思いつく・考える"], ["apologize for ~", "〜を謝る"],
  ["prepare for ~", "〜の準備をする"], ["wait for ~", "〜を待つ"], ["ask for ~", "〜を求める"],
  ["pay for ~", "〜の代金を払う"], ["graduate from ~", "〜を卒業する"], ["protect ~ from ...", "〜を…から守る"],
  ["succeed in ~", "〜に成功する"], ["believe in ~", "〜の存在を信じる"], ["arrive at ~", "（駅・小地点）に到着する"],
  ["arrive in ~", "（大都市・国）に到着する"], ["get to ~", "〜に到着する"], ["get on ~", "（乗り物）に乗る"],
  ["get off ~", "（乗り物）を降りる"], ["get over ~", "（病気・困難）を乗り越える"], ["get along with ~", "〜と仲良くやる"],
  ["put on ~", "〜を着る・身につける"], ["put off ~", "〜を延期する"], ["put out ~", "（火を）消す"],
  ["put away ~", "〜を片付ける"], ["call off ~", "〜を中止する"], ["give up ~", "〜をあきらめる"],
  ["run out of ~", "〜を使い果たす"], ["throw away ~", "〜を捨てる"], ["clean up ~", "〜をきれいに掃除する"],
  ["pick up ~", "〜を拾う・迎えに行く"], ["turn on ~", "〜のスイッチを入れる"], ["turn off ~", "〜のスイッチを切る"],
  ["turn up ~", "（音量）を上げる・現れる"], ["turn down ~", "（音量）を下げる・断る"], ["find out ~", "〜を見つけ出す・知る"],
  ["figure out ~", "〜を理解する・解決する"], ["carry out ~", "〜を実行する"], ["break down", "故障する"],
  ["grow up", "成長する・大人になる"], ["stay up late", "夜更かしする"], ["keep in touch", "連絡を取り合う"],

  // --- B. 3級 必須動詞 140語 (No.121〜260) ---
  ["achieve", "達成する"], ["accept", "受け入れる"], ["add", "加える・足す"], ["admire", "感心する・称賛する"],
  ["admit", "認める"], ["advise", "忠告する・助言する"], ["affect", "影響を与える"], ["afford", "〜する余裕がある"],
  ["allow", "許す・許可する"], ["amaze", "驚かせる"], ["announce", "発表する・知らせる"], ["apologize", "謝る"],
  ["appear", "現れる・〜のように見える"], ["apply", "申し込む・応募する"], ["appreciate", "感謝する・鑑賞する"], ["approach", "近づく"],
  ["argue", "口論する・主張する"], ["arrange", "手配する・整える"], ["attack", "攻撃する"], ["attend", "出席する・通う"],
  ["attract", "引きつける"], ["avoid", "避ける"], ["bake", "（パン・菓子を）焼く"], ["bark", "（犬が）吠える"],
  ["beat", "打ち負かす・打つ"], ["beg", "頼む・請う"], ["behave", "振る舞う"], ["believe", "信じる"],
  ["bite", "噛む"], ["blame", "責める"], ["blow", "（風が）吹く"], ["boil", "沸かす・ゆでる"],
  ["borrow", "（無料で）借りる"], ["bother", "困らせる・邪魔する"], ["breathe", "呼吸する"], ["broadcast", "放送する"],
  ["build", "建てる"], ["burn", "燃える・焦がす"], ["bury", "埋める"], ["camp", "キャンプをする"],
  ["cancel", "キャンセルする・中止する"], ["celebrate", "祝う"], ["challenge", "挑戦する"], ["change", "変える・変わる"],
  ["charge", "請求する・充電する"], ["chase", "追いかける"], ["chat", "おしゃべりする"], ["check", "確認する・調べる"],
  ["cheer", "応援する・元気づける"], ["choose", "選ぶ"], ["clap", "拍手する"], ["climb", "登る"],
  ["collect", "集める"], ["combine", "結合する・合わせる"], ["comfort", "慰める"], ["communicate", "意思疎通する"],
  ["compare", "比較する"], ["compete", "競う"], ["complain", "不平を言う"], ["complete", "完成させる"],
  ["concentrate", "集中する"], ["concern", "関係する・心配させる"], ["confirm", "確認する"], ["connect", "つなぐ・接続する"],
  ["consider", "よく考える"], ["consist", "成り立つ"], ["contact", "連絡をとる"], ["contain", "含む・入っている"],
  ["continue", "続ける"], ["control", "制御する・管理する"], ["Cough", "咳をする"], ["count", "数える"],
  ["cover", "覆う・カバーする"], ["crash", "衝突する"], ["create", "創り出す"], ["cross", "横切る・渡る"],
  ["cure", "治療する・治す"], ["damage", "損害を与える"], ["deal", "扱う・対処する"], ["decide", "決める"],
  ["decorate", "飾る"], ["decrease", "減少する"], ["increase", "増加する"], ["defend", "守る・防御する"],
  ["delay", "遅らせる"], ["deliver", "配達する"], ["demand", "要求する"], ["describe", "描写する・説明する"],
  ["design", "設計する・デザインする"], ["destroy", "破壊する"], ["develop", "発達する・開発する"], ["die", "死ぬ・枯れる"],
  ["dig", "掘る"], ["direct", "道案内する・監督する"], ["disagree", "反対する"], ["disappear", "消える"],
  ["disappoint", "がっかりさせる"], ["discover", "発見する"], ["discuss", "議論する・話し合う"], ["divide", "分ける・分割する"],
  ["donate", "寄付する"], ["doubt", "疑う"], ["drop", "落とす・落ちる"], ["dry", "乾かす・乾く"],
  ["earn", "（お金を）稼ぐ"], ["educate", "教育する"], ["employ", "雇う"], ["encourage", "励ます・促す"],
  ["enter", "入る"], ["escape", "逃げる・脱出する"], ["establish", "設立する"], ["examine", "調査する・診察する"],
  ["exchange", "交換する"], ["excite", "わくわくさせる"], ["excuse", "許す"], ["exercise", "運動する"],
  ["exist", "存在する"], ["expect", "予期する・期待する"], ["experience", "経験する"], ["explain", "説明する"],
  ["explore", "探検する"], ["export", "輸出する"], ["import", "輸入する"], ["express", "表現する"],
  ["fail", "失敗する・不合格になる"], ["Fear", "恐れる"], ["feed", "餌をやる"], ["fight", "戦う・けんかする"],
  ["fill", "満たす"], ["fix", "修理する・固定する"], ["float", "浮く・浮かぶ"], ["flow", "流れる"],
  ["focus", "焦点を合わせる"], ["fold", "折りたたむ"], ["follow", "従う・ついて行く"], ["force", "強制する"],
  ["forgive", "許す"], ["form", "形成する・作る"], ["freeze", "凍る"], ["frighten", "怖がらせる"],

  // --- C. 3級 必須形容詞・副詞 140語 (No.261〜400) ---
  ["abroad", "外国へ・海外で"], ["absent", "欠席して"], ["actual", "実際の"], ["actually", "実は・実際に"],
  ["afraid", "恐れて・怖がって"], ["alive", "生きていて"], ["alone", "ひとりで"], ["aloud", "声に出して"],
  ["already", "すでに・もう"], ["ancient", "古代の"], ["angry", "怒って"], ["annual", "年に1度の・例年の"],
  ["another", "もうひとつの・別の"], ["anxious", "心配して・不安な"], ["anyway", "とにかく"], ["anywhere", "どこでも"],
  ["apart", "離れて"], ["asleep", "眠って"], ["available", "利用可能な・手が空いている"], ["average", "平均の"],
  ["awake", "目が覚めて"], ["awful", "ひどい・恐ろしい"], ["badly", "ひどく・下手な"], ["basic", "基本的な"],
  ["beautiful", "美しい"], ["blind", "目の見えない"], ["boiling", "沸騰した"], ["bored", "退屈した"],
  ["boring", "退屈させる・つまらない"], ["both", "両方の"], ["brave", "勇敢な"], ["brief", "短い・簡潔な"],
  ["bright", "明るい・賢い"], ["broad", "幅の広い"], ["broken", "壊れた"], ["busy", "忙しい"],
  ["calm", "穏やかな・冷静な"], ["careful", "注意深い"], ["carefully", "注意深く"], ["careless", "不注意な"],
  ["central", "中心の・中央の"], ["certain", "確信して・ある〜"], ["certainly", "確かに・もちろん"], ["cheap", "安い"],
  ["cheerful", "陽気な・明るい"], ["chemical", "化学の"], ["classic", "古典的な・一流の"], ["clear", "晴れた・明白な"],
  ["clearly", "はっきりと"], ["clever", "賢い・利口な"], ["close", "近い・親しい"], ["closely", "密接に・注意深く"],
  ["cloudy", "曇った"], ["comfortable", "快適な・心地よい"], ["common", "共通の・普通の"], ["complete", "完全な"],
  ["completely", "完全に"], ["complex", "複雑な"], ["confident", "自信がある"], ["confused", "混乱した"],
  ["convenient", "便利な"], ["cool", "涼しい・かっこいい"], ["correct", "正しい"], ["crazy", "夢中な・正気でない"],
  ["creative", "創造的な"], ["crowded", "混雑した"], ["cruel", "残酷な"], ["cultural", "文化的な"],
  ["curious", "好奇心の強い"], ["current", "現在の"], ["cute", "可愛い"], ["daily", "毎日の・日常の"],
  ["damaged", "損傷した"], ["dangerous", "危険な"], ["dark", "暗い"], ["dead", "死んだ"],
  ["deaf", "耳が聞こえない"], ["dear", "親愛なる・高価な"], ["deep", "深い"], ["deeply", "深く"],
  ["delicious", "おいしい"], ["different", "異なる・違った"], ["difficult", "難しい"], ["direct", "直接の"],
  ["directly", "直接に・まっすぐに"], ["dirty", "汚い"], ["disappointed", "がっかりした"], ["distant", "遠い"],
  ["double", "2倍の"], ["downtown", "繁華街へ"], ["dry", "乾いた"], ["dull", "退屈な・鈍い"],
  ["eager", "熱望して"], ["early", "早い・早く"], ["eastern", "東部の"], ["easy", "簡単な"],
  ["easily", "簡単に"], ["electric", "電気の"], ["electronic", "電子の"], ["elementary", "初歩の・小学校の"],
  ["empty", "空っぽの"], ["enormous", "巨大な"], ["enough", "十分な・十分に"], ["entire", "全体の・全部の"],
  ["equal", "平等の・等しい"], ["especially", "特に"], ["essential", "不可欠な"], ["eternal", "永遠の"],
  ["even", "〜でさえ・互角の"], ["ever", "今までに"], ["everyday", "日常の"], ["exact", "正確な"],
  ["exactly", "正確に・まさにその通り"], ["excellent", "優秀な・素晴らしい"], ["excited", "わくわくした"], ["exciting", "わくわくさせる"],
  ["expensive", "高価な・値段が高い"], ["extra", "余分の・追加の"], ["extreme", "極端な"], ["extremely", "極めて・非常に"],
  ["fair", "公平な・晴れた"], ["false", "誤った・偽の"], ["familiar", "よく知られた・親しい"], ["famous", "有名な"],
  ["far", "遠い・はるかに"], ["fast", "速い・速く"], ["fat", "太った"], ["favorite", "お気に入りの"],
  ["female", "女性の・メスの"], ["male", "男性の・オスの"], ["final", "最終の"], ["finally", "ついに・最後に"],
  ["fine", "元気な・晴れた・立派な"], ["flat", "平らな・パンクした"], ["fluent", "流暢な"], ["foreign", "外国の"],
  ["Forever", "永遠に"], ["formal", "正式な"], ["former", "前の・前者の"], ["fortunate", "幸運な"]
];
