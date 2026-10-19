// ==========================================
// 英検3級 クロノ・オデッセイ 〜365日の時空冒険〜
// コアゲームエンジン・ハイブリッド音声詠唱・長期育成システム (app.js)
// 【前半：セクション 1 〜 7】
// ==========================================

// ==================== 1. 音声合成エンジン (Android Chrome 安定化版) ====================
let voiceSpeed = 0.85;
let isDialogueSpeaking = false;
let dialogueNextTimer = null;
let activeUtterance = null;
let speechTimeoutId = null;
let speechInitTimerId = null;
let postAnswerTimerId = null;
let cachedVoices = [];

function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
}
if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function getBestEnglishVoice() {
  if (!cachedVoices || cachedVoices.length === 0) loadVoices();
  return cachedVoices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
         cachedVoices.find(v => v.lang === 'en-US') ||
         cachedVoices.find(v => v.lang && v.lang.startsWith('en')) || null;
}

function toggleVoiceSpeed() {
  voiceSpeed = (voiceSpeed === 0.85) ? 1.0 : 0.85;
  const el = document.getElementById('btnSpeedToggle');
  if (el) el.innerText = (voiceSpeed === 0.85) ? '🗣️ ゆっくり' : '🗣️ ふつう';
  speakText(voiceSpeed === 0.85 ? 'Slow speed' : 'Normal speed');
}

function cleanTextForSpeech(text) {
  if (!text) return '';
  return String(text)
    .replace(/<[^>]*>/g, '')
    .replace(/~/g, '')
    .replace(/〜/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function speakText(text, onCompleteCallback) {
  const cleanText = cleanTextForSpeech(text);
  if (!('speechSynthesis' in window) || !cleanText) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    clearTimeout(speechInitTimerId);
    clearTimeout(speechTimeoutId);

    speechInitTimerId = setTimeout(() => {
      const uttr = new SpeechSynthesisUtterance(cleanText);
      activeUtterance = uttr;
      uttr.lang = 'en-US';
      uttr.rate = voiceSpeed;

      const bestVoice = getBestEnglishVoice();
      if (bestVoice) uttr.voice = bestVoice;

      let called = false;
      const completeOnce = () => {
        if (!called) {
          called = true;
          clearTimeout(speechTimeoutId);
          activeUtterance = null;
          if (onCompleteCallback) onCompleteCallback();
        }
      };

      uttr.onend = completeOnce;
      uttr.onerror = completeOnce;

      const dynamicLimit = Math.max(5000, Math.round((cleanText.length * 110) / voiceSpeed) + 2500);
      speechTimeoutId = setTimeout(completeOnce, dynamicLimit);

      window.speechSynthesis.speak(uttr);
    }, 80);
  } catch (e) {
    if (onCompleteCallback) onCompleteCallback();
  }
}

function playDialogueSpeech(dialogueArray, onCompleteCallback) {
  if (!('speechSynthesis' in window) || !dialogueArray || dialogueArray.length === 0) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    clearTimeout(dialogueNextTimer);
    clearTimeout(speechTimeoutId);
    isDialogueSpeaking = true;
    let index = 0;

    function speakNextSegment() {
      if (!isDialogueSpeaking) return;
      if (index >= dialogueArray.length) {
        isDialogueSpeaking = false;
        activeUtterance = null;
        if (onCompleteCallback) onCompleteCallback();
        return;
      }
      const segment = dialogueArray[index];
      const segText = cleanTextForSpeech(segment.text);
      const uttr = new SpeechSynthesisUtterance(segText);
      activeUtterance = uttr;
      uttr.lang = 'en-US';
      uttr.rate = voiceSpeed;

      const bestVoice = getBestEnglishVoice();
      if (bestVoice) uttr.voice = bestVoice;

      if (segment.speaker === 'female') uttr.pitch = 1.22;
      else if (segment.speaker === 'male') uttr.pitch = 0.82;
      else uttr.pitch = 1.0;

      let segDone = false;
      const nextStep = () => {
        if (segDone || !isDialogueSpeaking) return;
        segDone = true;
        clearTimeout(speechTimeoutId);
        index++;
        dialogueNextTimer = setTimeout(speakNextSegment, 320);
      };

      uttr.onend = nextStep;
      uttr.onerror = nextStep;

      const segLimit = Math.max(4500, Math.round((segText.length * 110) / voiceSpeed) + 2000);
      speechTimeoutId = setTimeout(nextStep, segLimit);

      window.speechSynthesis.speak(uttr);
    }

    setTimeout(speakNextSegment, 80);
  } catch (e) {
    isDialogueSpeaking = false;
    if (onCompleteCallback) onCompleteCallback();
  }
}

function speakVocabByIndex(idx) {
  if (typeof RAW_VOCAB_DATA !== 'undefined' && RAW_VOCAB_DATA[idx]) {
    speakText(RAW_VOCAB_DATA[idx][0]);
  }
}

// ==================== 2. 新BGM & SE サウンドエンジン (クロノ・オデッセイ仕様) ====================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let actx = null;
let isBgmEnabled = false;
let bgmTimer = null;
let currentSequence = [];
let currentStep = 0;

const noteFreq = {
  'E3': 164.8, 'G3': 196.0, 'A3': 220.0, 'B3': 246.9,
  'C4': 261.6, 'D4': 293.7, 'E4': 329.6, 'F4': 349.2, 'F#4': 370.0, 'G4': 392.0, 'A4': 440.0, 'B4': 493.9,
  'C5': 523.3, 'D5': 587.3, 'E5': 659.3, 'F#5': 740.0, 'G5': 784.0, 'A5': 880.0, 'B5': 987.8,
  'C6': 1046.5, 'D6': 1174.7, 'E6': 1318.5
};

const BGM_DATA = {
  home: { seq: ['E4','B4','G4','F#4','E4','G4','B4','E5','D5','B4','G4','F#4'], speed: 250, type: 'triangle', vol: 0.03 },
  battle: { seq: ['E4','E4','G4','A4','B4','B4','D5','B4','A4','G4','F#4','D4'], speed: 155, type: 'square', vol: 0.022 },
  boss: { seq: ['E3','B3','E4','G4','F#4','E4','D4','B3','C4','G4','F#4','B3'], speed: 135, type: 'sawtooth', vol: 0.028 },
  fever: { seq: ['E5','G5','B5','E6','D6','B5','G5','B5','A5','F#5','D5','F#5'], speed: 105, type: 'sawtooth', vol: 0.032 },
  result: { seq: ['E5','F#5','G5','B5','E6',null,'B5','E6'], speed: 145, type: 'sine', vol: 0.04 },
  ending: { seq: ['G4','B4','D5','G5','F#5','D5','B4','G4','E4','G4','B4','E5'], speed: 210, type: 'sine', vol: 0.04 },
  trueEnding: { seq: ['E4','B4','E5','G5','B5','E6','D6','B5','G5','F#5','E5','B4'], speed: 150, type: 'triangle', vol: 0.045 }
};

function initAudio() {
  try {
    if (!actx && AudioContext) actx = new AudioContext();
    if (actx && actx.state === 'suspended') actx.resume();
  } catch (e) {}
}

function toggleBGM() {
  initAudio();
  isBgmEnabled = !isBgmEnabled;
  const btn = document.getElementById('btnBgmToggle');
  if (btn) {
    btn.innerHTML = isBgmEnabled ? '🎵 ON' : '🎵 OFF';
    btn.className = isBgmEnabled
      ? "bg-cyan-400 border border-cyan-300 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-black text-slate-950 transition shadow"
      : "bg-teal-900/90 border border-teal-600 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold text-slate-300 transition";
  }
  if (isBgmEnabled) playBGM(isBossMode ? 'boss' : 'home');
  else stopBGM();
}

function playBGM(scene) {
  if (!isBgmEnabled || !actx) return;
  stopBGM();
  const track = BGM_DATA[scene];
  if (!track) return;
  currentSequence = track.seq;
  currentStep = 0;

  function schedule() {
    if (isBgmEnabled && currentSequence.length > 0 && actx) {
      try {
        const note = currentSequence[currentStep % currentSequence.length];
        if (note && noteFreq[note]) {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.type = track.type;
          osc.frequency.value = noteFreq[note];
          osc.connect(gain);
          gain.connect(actx.destination);
          gain.gain.setValueAtTime(track.vol, actx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + (track.speed / 1000) * 0.82);
          osc.onended = () => {
            try { osc.disconnect(); gain.disconnect(); } catch (e) {}
          };
          osc.start(actx.currentTime);
          osc.stop(actx.currentTime + (track.speed / 1000));
        }
      } catch (e) {}
      currentStep++;
      bgmTimer = setTimeout(schedule, track.speed);
    }
  }
  schedule();
}

function stopBGM() {
  clearTimeout(bgmTimer);
  currentSequence = [];
}

function playSE(type) {
  if (!actx) return;
  try {
    const now = actx.currentTime;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.connect(gain);
    gain.connect(actx.destination);
    osc.onended = () => {
      try { osc.disconnect(); gain.disconnect(); } catch (e) {}
    };

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.3, now);
      osc.frequency.setValueAtTime(740.0, now + 0.08);
      osc.frequency.setValueAtTime(880.0, now + 0.16);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now); osc.stop(now + 0.35);
    } else if (type === 'critical') {
      osc.type = 'sawtooth';
      [587.3, 880.0, 1174.7, 1480.0, 1760.0].forEach((f, i) => {
        osc.frequency.setValueAtTime(f, now + i * 0.045);
      });
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
    } else if (type === 'slash') {
      osc.type = 'triangle';
      [523.3, 659.3, 784.0].forEach((f, i) => {
        osc.frequency.setValueAtTime(f, now + i * 0.035);
      });
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now); osc.stop(now + 0.18);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(185, now + 0.15);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
      osc.start(now); osc.stop(now + 0.32);
    } else if (type === 'levelup' || type === 'bonus' || type === 'chest') {
      osc.type = 'triangle';
      [587.3, 740.0, 880.0, 1174.7, 1480.0].forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.085);
      });
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.58);
      osc.start(now); osc.stop(now + 0.58);
    }
  } catch (e) {}
}

// ==================== 3. カスタム通知モーダル ====================
function showNoticeModal(title, icon, text, onConfirm) {
  showBossDialogueModal(title, icon, text, onConfirm);
}

function showBossDialogueModal(title, icon, text, onConfirm) {
  const modal = document.getElementById('modalBossDialogue');
  const titleEl = document.getElementById('bossDialogueTitle');
  const iconEl = document.getElementById('bossDialogueIcon');
  const textEl = document.getElementById('bossDialogueText');
  const btn = document.getElementById('btnBossDialogueNext');

  if (titleEl) titleEl.innerText = title;
  if (iconEl) iconEl.innerText = icon;
  if (textEl) textEl.innerText = text;
  if (modal) modal.classList.remove('hidden');

  if (btn) {
    let clicked = false;
    btn.onclick = () => {
      if (clicked) return;
      clicked = true;
      btn.onclick = null;
      if (modal) modal.classList.add('hidden');
      if (onConfirm) onConfirm();
    };
  }
}

// ==================== 4. ユーザーデータ管理 (MAX Lv.200・2027年10月目標) ====================
const STORAGE_KEY = 'eiken3_chrono_odyssey_v1';
let RAW_VOCAB_DATA = [];

let userData = {
  level: 1,
  exp: 0,
  gems: 50,
  streak: 1,
  bossTickets: 1,
  targetExamDate: '2027-10-03',
  lastLoginDate: getTodayString(),
  weakList: [],
  masteredList: [],
  weakStats: {},
  vocabBook: [],
  bossUnlockedLevel: 1,
  bossClearedLevels: [],
  bossSeenIntros: [],
  hasSeenEnding: false,
  hasSeenTrueEnding: false,
  questRotation: { vocab: false, grammar: false, listening: false },
  guildRotation: { reading: false, writing: false, speaking: false, trinity: false },
  dailyDone: { vocab: false, grammar: false, listening: false, allClaimed: false },
  inventory: { hint: 3, loupe: 3, potion: 1 },
  equipped: { hat: '', weapon: '', aura: '' },
  unlockedEquips: [],
  equipLevels: {},
  totalAnswered: 0,
  totalCorrect: 0
};

let currentShopTab = 'hat';
let currentWeakTab = 'active';
let isDailyCurrentSession = false;
let isBossMode = false;
let isFeverMode = false;
let currentBossStage = null;
let selectedNormalType = 'vocab';
let selectedNormalDiffLevel = 1;

let lastEarnedExp = 0;
let isPotionAlreadyUsedForCurrentResult = false;
let isMasterDataNormalized = false;

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function normalizeMasterData() {
  // 初回のみ実行し、2回目以降の呼び出しではメインスレッドのブロックを即座に回避
  if (isMasterDataNormalized && RAW_VOCAB_DATA.length > 0) return;

  const p1 = (typeof RAW_VOCAB_PART1 !== 'undefined') ? RAW_VOCAB_PART1 : [];
  const p2 = (typeof RAW_VOCAB_PART2 !== 'undefined') ? RAW_VOCAB_PART2 : [];
  if (p1.length > 0 || p2.length > 0) {
    const wordMap = new Map();
    const registerWord = (item) => {
      let word = String(item[0] || '').trim();
      if (!word) return;
      if (!word.includes(' ') && /^[A-Z][a-z]+$/.test(word)) {
        word = word.toLowerCase();
      }
      const meaning = String(item[1] || '').trim();
      const pos = item[2] || '';
      if (!wordMap.has(word)) {
        wordMap.set(word, [word, meaning, pos]);
      } else {
        const existing = wordMap.get(word);
        if (meaning && !existing[1].includes(meaning)) {
          existing[1] = `${existing[1]} ／ ${meaning}`;
        }
      }
    };

    p1.slice(0, 120).forEach(registerWord);
    p2.forEach(registerWord);
    p1.slice(120).forEach(registerWord);

    RAW_VOCAB_DATA = Array.from(wordMap.values()).slice(0, 800);
  }

  // 拡張データパック (data_extra.js) の自動マージ
  if (typeof registerExtraMasterData === 'function') {
    registerExtraMasterData();
  }

  if (typeof RAW_GRAMMAR_DATA !== 'undefined') {
    RAW_GRAMMAR_DATA.forEach((item, idx) => {
      if (!item.id) item.id = `g_${idx}`;
    });
  }
  if (typeof RAW_LISTENING_DATA !== 'undefined') {
    RAW_LISTENING_DATA.forEach((item, idx) => {
      if (!item.id) item.id = `l_${idx}`;
      item.explain = item.explain || item.exp || '';
      item.audio_complete = item.audio_complete || item.aud_complete || '';
    });
  }
  if (typeof ACTUAL_PAST_EXAM_DATA !== 'undefined') {
    ACTUAL_PAST_EXAM_DATA.forEach((item, idx) => {
      if (!item.id) item.id = `past_${idx + 1}`;
      item.explain = item.explain || item.exp || '';
      item.audio_complete = item.audio_complete || item.aud_complete || '';
    });
  }

  isMasterDataNormalized = true;
}

function sanitizeUserData() {
  if (typeof userData.level !== 'number' || userData.level < 1 || isNaN(userData.level)) userData.level = 1;
  if (userData.level > 200) userData.level = 200;
  if (typeof userData.exp !== 'number' || isNaN(userData.exp)) userData.exp = 0;
  if (typeof userData.gems !== 'number' || isNaN(userData.gems)) userData.gems = 50;
  if (typeof userData.streak !== 'number' || isNaN(userData.streak)) userData.streak = 1;
  if (typeof userData.bossTickets !== 'number' || isNaN(userData.bossTickets)) userData.bossTickets = 1;
  if (!userData.targetExamDate) userData.targetExamDate = '2027-10-03';

  if (!Array.isArray(userData.weakList)) userData.weakList = [];
  if (!Array.isArray(userData.masteredList)) userData.masteredList = [];
  userData.weakList = [...new Set(userData.weakList)];
  const activeWeakSet = new Set(userData.weakList);
  // 克服中リストにあるIDが殿堂入りリストに重複残留しないよう排他制御
  userData.masteredList = [...new Set(userData.masteredList)].filter(id => !activeWeakSet.has(id));

  if (!userData.weakStats || typeof userData.weakStats !== 'object') userData.weakStats = {};
  if (!Array.isArray(userData.vocabBook)) userData.vocabBook = [];
  if (RAW_VOCAB_DATA.length > 0) {
    const validWords = new Set(RAW_VOCAB_DATA.map(x => x[0]));
    userData.vocabBook = [...new Set(userData.vocabBook)].filter(w => validWords.has(w));
  }
  if (!Array.isArray(userData.unlockedEquips)) userData.unlockedEquips = [];
  if (!userData.equipLevels || typeof userData.equipLevels !== 'object') userData.equipLevels = {};

  if (typeof userData.bossUnlockedLevel !== 'number' || userData.bossUnlockedLevel < 1 || isNaN(userData.bossUnlockedLevel)) userData.bossUnlockedLevel = 1;
  if (!Array.isArray(userData.bossClearedLevels)) userData.bossClearedLevels = [];
  if (!Array.isArray(userData.bossSeenIntros)) userData.bossSeenIntros = [];
  if (typeof userData.hasSeenEnding !== 'boolean') userData.hasSeenEnding = false;
  if (typeof userData.hasSeenTrueEnding !== 'boolean') userData.hasSeenTrueEnding = false;

  if (!userData.questRotation || typeof userData.questRotation !== 'object') {
    userData.questRotation = { vocab: false, grammar: false, listening: false };
  }
  if (!userData.guildRotation || typeof userData.guildRotation !== 'object') {
    userData.guildRotation = { reading: false, writing: false, speaking: false, trinity: false };
  }
  if (!userData.inventory || typeof userData.inventory !== 'object') {
    userData.inventory = { hint: 3, loupe: 3, potion: 1 };
  }
  userData.inventory.hint = Number(userData.inventory.hint) || 0;
  userData.inventory.loupe = Number(userData.inventory.loupe) || 0;
  userData.inventory.potion = Number(userData.inventory.potion) || 0;

  if (!userData.equipped || typeof userData.equipped !== 'object') {
    userData.equipped = { hat: '', weapon: '', aura: '' };
  }
  if (!userData.dailyDone || typeof userData.dailyDone !== 'object') {
    userData.dailyDone = { vocab: false, grammar: false, listening: false, allClaimed: false };
  }
  if (typeof userData.totalAnswered !== 'number' || isNaN(userData.totalAnswered)) userData.totalAnswered = 0;
  if (typeof userData.totalCorrect !== 'number' || isNaN(userData.totalCorrect)) userData.totalCorrect = 0;
  if (!userData.lastLoginDate) userData.lastLoginDate = getTodayString();
}

function loadData() {
  normalizeMasterData();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      userData = { ...userData, ...parsed };
      if (parsed.questRotation) userData.questRotation = { ...userData.questRotation, ...parsed.questRotation };
      if (parsed.guildRotation) userData.guildRotation = { ...userData.guildRotation, ...parsed.guildRotation };
      if (parsed.dailyDone) userData.dailyDone = { ...userData.dailyDone, ...parsed.dailyDone };
      if (parsed.inventory) userData.inventory = { ...userData.inventory, ...parsed.inventory };
      if (parsed.equipped) userData.equipped = { ...userData.equipped, ...parsed.equipped };
      if (parsed.weakStats) userData.weakStats = { ...userData.weakStats, ...parsed.weakStats };
      if (parsed.equipLevels) userData.equipLevels = { ...userData.equipLevels, ...parsed.equipLevels };
    }
  } catch (e) {}
  sanitizeUserData();
  checkDailyStreak();
  if (typeof BOSS_STAGES !== 'undefined') currentBossStage = BOSS_STAGES[0];
  updateUiState();
}

function saveData() {
  sanitizeUserData();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (e) {
    try {
      const weakBaseSet = new Set(
        userData.weakList.map(id => id.startsWith('v_ja_') ? id.replace('v_ja_', 'v_') : id)
      );
      Object.keys(userData.weakStats).forEach(k => {
        if (k.startsWith('v_ja_') && !userData.weakList.includes(k) && !weakBaseSet.has(k.replace('v_ja_', 'v_'))) {
          delete userData.weakStats[k];
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (e2) {}
  }
  updateUiState();
}

function checkDailyStreak() {
  try {
    const today = getTodayString();
    if (userData.lastLoginDate !== today) {
      const last = new Date(userData.lastLoginDate.replace(/-/g, '/'));
      const current = new Date(today.replace(/-/g, '/'));
      const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) userData.streak += 1;
      else if (diffDays > 1) userData.streak = 1;
      userData.lastLoginDate = today;
      userData.dailyDone = { vocab: false, grammar: false, listening: false, allClaimed: false };
    }
  } catch (e) {
    userData.lastLoginDate = getTodayString();
  }
}

function recordWeakStat(id, isCorrect) {
  if (!id) return;
  const baseId = id.startsWith('v_ja_') ? id.replace('v_ja_', 'v_') : id;
  const altId = baseId.startsWith('v_') ? baseId.replace('v_', 'v_ja_') : id;
  const targetIds = [...new Set([id, baseId])];

  targetIds.forEach(targetId => {
    if (!userData.weakStats[targetId]) {
      userData.weakStats[targetId] = { attempts: 0, cleared: 0, streak: 0, lastReviewed: 0 };
    }
    const st = userData.weakStats[targetId];
    st.attempts += 1;
    if (isCorrect) {
      st.cleared += 1;
      st.streak = (st.streak || 0) + 1;
    } else {
      st.streak = 0;
    }
    st.lastReviewed = Date.now();
  });

  // 2回連続正解したら、英和(v_)・和英(v_ja_)の双方の弱点リストから自動で殿堂入りへ昇格
  const baseSt = userData.weakStats[baseId];
  if (isCorrect && baseSt && baseSt.streak >= 2) {
    [id, baseId, altId].forEach(checkId => {
      if (userData.weakList.includes(checkId)) {
        userData.weakList = userData.weakList.filter(x => x !== checkId);
        if (!userData.masteredList.includes(checkId)) {
          userData.masteredList.push(checkId);
        }
      }
    });
  }
}

function getEquipRequiredLevel(equipObj) {
  if (!equipObj) return 1;
  if (equipObj.reqLv) return equipObj.reqLv;
  if (equipObj.rank.includes('ミシック')) return 110;
  if (equipObj.rank.includes('レジェンド')) return 70;
  if (equipObj.rank.includes('スーパーレア')) return 35;
  if (equipObj.rank.includes('レア')) return 12;
  return 1;
}

function getEquipBonusVal(equipObj) {
  if (!equipObj) return 0;
  const plusLv = Math.min(99, userData.equipLevels[equipObj.id] || 0);
  const rawVal = equipObj.val * (1 + plusLv * 0.18);
  // プレイヤーの現在レベルに応じた武具の同調率（オーバースペック装備による序盤のバランス崩壊を防止）
  const reqLv = getEquipRequiredLevel(equipObj);
  const syncRate = userData.level >= reqLv ? 1.0 : Math.max(0.08, userData.level / reqLv);
  return Math.round(rawVal * syncRate);
}

function calculatePlayerStats() {
  const baseAtk = 35 + (userData.level * 8);
  const baseHp = 150 + (userData.level * 22);
  const baseSpd = 8 + Math.floor(userData.level * 1.1);

  const eqHat = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.hat) : null;
  const eqWp = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.weapon) : null;
  const eqAura = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.aura) : null;

  const totalHp = Math.round(baseHp + getEquipBonusVal(eqHat));
  const totalAtk = Math.round(baseAtk + getEquipBonusVal(eqWp));
  const totalSpd = Math.round(baseSpd + getEquipBonusVal(eqAura));

  return { hp: totalHp, atk: totalAtk, spd: totalSpd };
}

function getExpNeededForLevel(lv) {
  return Math.round(110 + (lv * 38) + Math.pow(lv, 1.35) * 4);
}

function addExp(amount, onAfterLevelUp) {
  userData.exp += amount;
  let needed = getExpNeededForLevel(userData.level);
  let leveledUp = false;
  let prestigeCount = 0;

  while (userData.exp >= needed) {
    if (userData.level < 200) {
      userData.exp -= needed;
      userData.level += 1;
      needed = getExpNeededForLevel(userData.level);
      leveledUp = true;
    } else {
      // Lv.200到達後は溢れたEXPをマスターボーナス（💎+25）へ変換し、成長の楽しみを永続化
      userData.exp -= needed;
      userData.gems += 25;
      prestigeCount += 1;
    }
  }
  saveData();

  if (leveledUp) {
    playSE('levelup');
    const currentAvatar = (typeof AVATARS !== 'undefined')
      ? ([...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0])
      : { name: "クロノビット", rank: "星霊機獣・第1形態", emoji: "🤖" };
    showNoticeModal(
      `🎉 LEVEL UP! Lv.${userData.level} 到達！`,
      currentAvatar.emoji,
      `レベルが Lv.${userData.level} に上昇しました！\n現在の形態：【${currentAvatar.rank}】${currentAvatar.name}\n時空エネルギーにより攻撃力・防御HPが大幅に強化されました！`,
      onAfterLevelUp
    );
  } else if (prestigeCount > 0) {
    playSE('levelup');
    showNoticeModal(
      `👑 時空超越マスターボーナス！`,
      '💎',
      `Lv.200（最大レベル）の超過EXPが時空結晶へと変換されました！\n💎 クロノクリスタル +${prestigeCount * 25}個 を獲得！`,
      onAfterLevelUp
    );
  } else if (onAfterLevelUp) {
    onAfterLevelUp();
  }
}

function updateExamDate(val) {
  if (!val) return;
  userData.targetExamDate = val;
  saveData();
}

function updateUiState() {
  sanitizeUserData();
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  setText('headerLevel', `Lv.${userData.level}`);
  setText('levelLabel', `Lv.${userData.level}`);
  setText('streakCount', userData.streak);
  setText('gemCount', userData.gems);
  setText('ticketCount', userData.bossTickets || 0);
  setText('modalTicketCount', userData.bossTickets || 0);
  setText('hintStockCount', userData.inventory.hint || 0);
  setText('loupeStockCount', userData.inventory.loupe || 0);
  setText('shopHintCount', userData.inventory.hint || 0);
  setText('shopLoupeCount', userData.inventory.loupe || 0);
  setText('shopPotionCount', userData.inventory.potion || 0);
  setText('bossCurrentProgressBadge', `第${Math.min(15, userData.bossUnlockedLevel)}章 解放中`);

  setText('weakTabActiveCount', userData.weakList.length);
  setText('weakTabMasteredCount', userData.masteredList.length);
  setText('weakBookCountBadge', currentWeakTab === 'active' ? `${userData.weakList.length}問 克服中` : `${userData.masteredList.length}問 殿堂入り`);

  const stats = calculatePlayerStats();
  setText('statAtkVal', stats.atk.toLocaleString());
  setText('statHpVal', stats.hp.toLocaleString());
  setText('statSpdVal', stats.spd.toLocaleString());

  const needed = getExpNeededForLevel(userData.level);
  const pct = Math.min(100, Math.round((userData.exp / needed) * 100));
  const expBar = document.getElementById('expBar');
  if (expBar) expBar.style.width = `${pct}%`;
  setText('expText', `${userData.exp} / ${needed}`);

  if (typeof AVATARS !== 'undefined') {
    const currentAvatar = [...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0];
    setText('heroAvatar', currentAvatar.emoji);
    if (userData.hasSeenTrueEnding) {
      setText('heroRank', '🌌 時空超越・全知神');
      setText('heroName', `${currentAvatar.name}・Ω`);
    } else {
      setText('heroRank', currentAvatar.rank);
      setText('heroName', currentAvatar.name);
    }
  }

  if (typeof SHOP_EQUIP_DATA !== 'undefined') {
    const hatEquip = SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.hat);
    setText('equipHatIcon', hatEquip ? hatEquip.icon : '');
    const weaponEquip = SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.weapon);
    setText('equipWeaponIcon', weaponEquip ? weaponEquip.icon : '');
    const auraEquip = SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.aura);
    setText('equipAuraIcon', auraEquip ? auraEquip.icon : '');
  }

  try {
    const dateInput = document.getElementById('examDateInput');
    if (dateInput && dateInput.value !== userData.targetExamDate) {
      dateInput.value = userData.targetExamDate;
    }
    const parts = userData.targetExamDate.split('-');
    const examDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    setText('countdownDays', `あと ${daysLeft} 日`);
  } catch (e) {
    setText('countdownDays', 'あと -- 日');
  }

  const guerrillaBanner = document.getElementById('guerrillaBossBanner');
  if (guerrillaBanner) {
    if (userData.masteredList.length >= 3) guerrillaBanner.classList.remove('hidden');
    else guerrillaBanner.classList.add('hidden');
  }

  let doneCount = 0;
  if (userData.dailyDone.vocab) doneCount++;
  if (userData.dailyDone.grammar) doneCount++;
  if (userData.dailyDone.listening) doneCount++;
  setText('dailyProgressText', `${doneCount} / 3 完了`);

  const renderDailyBtn = (elId, isDone, type, count) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = isDone
      ? `<span class="w-full text-center bg-slate-900 text-emerald-400 font-black px-3 py-1.5 rounded-xl text-xs border border-emerald-600 whitespace-nowrap">✓ 達成済</span>`
      : `<button onclick="startDailyQuest('${type}', ${count})" class="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow transition active:scale-95 whitespace-nowrap">出撃 ⚔️</button>`;
  };

  renderDailyBtn('questActionVocab', userData.dailyDone.vocab, 'vocab', 6);
  renderDailyBtn('questActionGrammar', userData.dailyDone.grammar, 'grammar', 4);
  renderDailyBtn('questActionListening', userData.dailyDone.listening, 'listening', 3);

  const bonusArea = document.getElementById('dailyBonusArea');
  const bonusClaimedArea = document.getElementById('dailyBonusClaimedArea');
  if (bonusArea && bonusClaimedArea) {
    if (doneCount === 3 && !userData.dailyDone.allClaimed) {
      bonusArea.classList.remove('hidden');
      bonusClaimedArea.classList.add('hidden');
    } else if (doneCount === 3 && userData.dailyDone.allClaimed) {
      bonusArea.classList.add('hidden');
      bonusClaimedArea.classList.remove('hidden');
    } else {
      bonusArea.classList.add('hidden');
      bonusClaimedArea.classList.add('hidden');
    }
  }

  let rotCount = 0;
  if (userData.questRotation.vocab) rotCount++;
  if (userData.questRotation.grammar) rotCount++;
  if (userData.questRotation.listening) rotCount++;
  setText('rotationProgressBadge', `${rotCount}/3完了`);

  const updateRotBtn = (btnId, badgeId, isDone) => {
    const btn = document.getElementById(btnId);
    const badge = document.getElementById(badgeId);
    if (!btn || !badge) return;
    if (isDone) {
      badge.innerText = "✓ 制覇";
      badge.className = "text-[10px] font-bold bg-slate-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-600";
      btn.classList.add('opacity-65');
    } else {
      badge.innerText = "未制覇";
      badge.className = "text-[10px] font-bold bg-slate-950 text-cyan-200 px-1.5 py-0.5 rounded border border-teal-600";
      btn.classList.remove('opacity-65');
    }
  };

  updateRotBtn('btnRotVocab', 'badgeRotVocab', userData.questRotation.vocab);
  updateRotBtn('btnRotGrammar', 'badgeRotGrammar', userData.questRotation.grammar);
  updateRotBtn('btnRotListening', 'badgeRotListening', userData.questRotation.listening);

  let guildDoneCount = 0;
  if (userData.guildRotation.reading) guildDoneCount++;
  if (userData.guildRotation.writing) guildDoneCount++;
  if (userData.guildRotation.speaking) guildDoneCount++;
  if (userData.guildRotation.trinity) guildDoneCount++;
  setText('guildRotationBadge', `${guildDoneCount}/4制覇`);

  const updateGuildBtn = (btnId, badgeId, isDone, defaultLabel, defaultColorClass) => {
    const btn = document.getElementById(btnId);
    const badge = document.getElementById(badgeId);
    if (!btn || !badge) return;
    if (isDone) {
      badge.innerText = "✓ 制覇済";
      badge.className = "text-[9px] font-black bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-600";
      btn.classList.add('opacity-70');
    } else {
      badge.innerText = defaultLabel;
      badge.className = defaultColorClass;
      btn.classList.remove('opacity-70');
    }
  };

  updateGuildBtn('btnGuildReading', 'badgeGuildReading', userData.guildRotation.reading, '🌟特別報酬', 'text-[9px] font-black bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40');
  updateGuildBtn('btnGuildWriting', 'badgeGuildWriting', userData.guildRotation.writing, '🌟特別報酬', 'text-[9px] font-black bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/40');
  updateGuildBtn('btnGuildSpeaking', 'badgeGuildSpeaking', userData.guildRotation.speaking, '🌟特別報酬', 'text-[9px] font-black bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/40');
  updateGuildBtn('btnGuildTrinity', 'badgeGuildTrinity', userData.guildRotation.trinity, '🌟特別報酬', 'text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40');

  const btnWeak = document.getElementById('btnRotWeakBattle');
  const badgeWeak = document.getElementById('badgeRotWeak');
  if (btnWeak && badgeWeak) {
    if (rotCount === 3) {
      btnWeak.classList.remove('opacity-60');
      btnWeak.classList.add('glow-crimson');
      badgeWeak.innerText = "🔥 開放中";
      badgeWeak.className = "text-[10px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded animate-pulse";
    } else {
      btnWeak.classList.add('opacity-60');
      btnWeak.classList.remove('glow-crimson');
      badgeWeak.innerText = `🔒 あと${3 - rotCount}`;
      badgeWeak.className = "text-[10px] font-bold bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800";
    }
  }

  const totalV = RAW_VOCAB_DATA.length || 800;
  const vocabCount = userData.vocabBook.length;
  const maxBossCleared = userData.bossClearedLevels.length > 0 ? Math.max(...userData.bossClearedLevels) : 0;

  setText('statTotalAnswers', `${userData.totalAnswered}問`);
  setText('statVocabRate', `${vocabCount} / ${totalV}`);
  const acc = userData.totalAnswered > 0 ? Math.round((userData.totalCorrect / userData.totalAnswered) * 100) : 0;
  setText('statAccuracy', `(${acc}%)`);

  let passRate = `データ解析中（あと${Math.max(0, 50 - userData.totalAnswered)}問）`;
  if (userData.totalAnswered >= 50) {
    if (acc >= 80 && vocabCount >= 600 && maxBossCleared >= 12) {
      passRate = '👑 3級余裕合格圏 (SS判定)';
    } else if (acc >= 72 && vocabCount >= 400 && maxBossCleared >= 7) {
      passRate = '💮 3級合格圏内 (S判定)';
    } else if (acc >= 65 && vocabCount >= 200 && maxBossCleared >= 3) {
      passRate = '✨ 合格可能性大 (A判定)';
    } else if (acc >= 55 && vocabCount >= 80) {
      passRate = '📈 着実に成長中 (B判定)';
    } else {
      passRate = '🔥 基礎構築フェーズ (C判定)';
    }
  }
  setText('statPassRate', passRate);

  renderShopEquips();
}

function claimDailyAllBonus() {
  initAudio();
  if (userData.dailyDone.allClaimed) return;
  userData.dailyDone.allClaimed = true;
  const bonusGems = 70;
  const bonusExp = 350;
  userData.gems += bonusGems;
  userData.bossTickets = (userData.bossTickets || 0) + 1;

  playSE('bonus');
  addExp(bonusExp, () => {
    showNoticeModal(
      '🎁 デイリーミッション完全制覇！',
      '🧭',
      `【コンプリート報酬】\n💎 クロノクリスタル +${bonusGems}個\n✨ 時空経験値 +${bonusExp} EXP\n🎫 時空神殿チケット +1枚\n\n日々の積み重ねが2027年10月の大勝利へ繋がるぞ！`
    );
  });
}

// ==================== 5. ハイブリッド問題生成 ＆ 忘却曲線スマート抽選エンジン ====================

// エビングハウス忘却曲線に基づく優先度スコアリング抽選
function selectSmartQuestions(masterArray, count, idPrefix = '') {
  if (!masterArray || masterArray.length === 0) return [];
  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;
  const intervals = [1, 3, 7, 14, 30];

  const weakBucket = [];
  const dueBucket = [];
  const unseenBucket = [];
  const recentBucket = [];

  masterArray.forEach((item, idx) => {
    let id = item.id;
    if (!id) {
      if (idPrefix === 'v_') id = `v_${item[0]}`;
      else if (idPrefix === 'tri_') id = `tri_${item.base}`;
      else id = `${idPrefix}${idx}`;
    }
    const jaId = (idPrefix === 'v_') ? `v_ja_${item[0]}` : null;
    const isWeak = userData.weakList.includes(id) || (jaId && userData.weakList.includes(jaId));
    const stat = userData.weakStats[id];

    if (isWeak) {
      weakBucket.push({ item, score: 100 + Math.random() * 20 });
    } else if (!stat || !stat.attempts) {
      unseenBucket.push({ item, score: 50 + Math.random() * 20 });
    } else {
      const daysSince = (now - (stat.lastReviewed || 0)) / DAY_MS;
      const targetDays = intervals[Math.min(stat.cleared, intervals.length - 1)];
      if (daysSince >= targetDays) {
        dueBucket.push({ item, score: 80 + Math.min(30, daysSince - targetDays) + Math.random() * 15 });
      } else {
        recentBucket.push({ item, score: daysSince + Math.random() * 10 });
      }
    }
  });

  weakBucket.sort((a, b) => b.score - a.score);
  dueBucket.sort((a, b) => b.score - a.score);
  unseenBucket.sort((a, b) => b.score - a.score);
  recentBucket.sort((a, b) => b.score - a.score);

  // 弱点・復習期限到来・未学習新規の3枠をバランス配分し、特定問題の固定化や新規問題の飢餓を防止
  const maxWeak = Math.max(1, Math.round(count * 0.35));
  const maxDue = Math.max(1, Math.round(count * 0.35));

  const picked = [];
  picked.push(...weakBucket.slice(0, maxWeak).map(x => x.item));
  picked.push(...dueBucket.slice(0, maxDue).map(x => x.item));

  const needFromUnseen = count - picked.length;
  if (needFromUnseen > 0) {
    picked.push(...unseenBucket.slice(0, needFromUnseen).map(x => x.item));
  }

  if (picked.length < count) {
    const fallbackPool = [
      ...dueBucket.slice(maxDue).map(x => x.item),
      ...weakBucket.slice(maxWeak).map(x => x.item),
      ...recentBucket.map(x => x.item)
    ];
    picked.push(...fallbackPool.slice(0, count - picked.length));
  }

  return shuffleArray(picked);
}

function inferVocabCategory(item) {
  if (item[2]) return item[2];
  const word = String(item[0] || '');
  const meaning = String(item[1] || '');
  if (word.includes(' ')) return 'idiom';
  if (meaning.endsWith('する') || meaning.endsWith('る') || meaning.endsWith('く') || meaning.endsWith('ぐ') || meaning.endsWith('す') || meaning.endsWith('つ') || meaning.endsWith('ぶ') || meaning.endsWith('む') || meaning.endsWith('う')) return 'verb';
  if (meaning.endsWith('な') || meaning.endsWith('い') || meaning.endsWith('の') || meaning.endsWith('に')) return 'adj';
  return 'noun';
}

function generateVocabQuiz(item, forceDirection) {
  const word = item[0];
  const meaning = item[1];
  const cat = inferVocabCategory(item);
  const isJaToEn = forceDirection ? (forceDirection === 'ja2en') : (Math.random() < 0.45);

  const sameCatPool = RAW_VOCAB_DATA.filter(x => x[0] !== word && inferVocabCategory(x) === cat);
  const candidatePool = sameCatPool.length >= 3 ? sameCatPool : RAW_VOCAB_DATA.filter(x => x[0] !== word);

  if (isJaToEn) {
    const otherWords = candidatePool.map(x => x[0]);
    const wrongThree = shuffleArray(otherWords).slice(0, 3);
    const options = shuffleArray([word, ...wrongThree]);
    return {
      id: 'v_ja_' + word,
      rawWord: word,
      type: 'vocab',
      q: `「${meaning}」`,
      sub: '📘 この日本語にあてはまる【英語】を選ぼう！',
      options: options,
      ans: options.indexOf(word),
      explain: `「${meaning}」を英語で表すと【${word}】です。`,
      audio_question: null,
      audio_complete: cleanTextForSpeech(word)
    };
  } else {
    const otherMeanings = candidatePool.filter(x => x[1] !== meaning).map(x => x[1]);
    const wrongThree = shuffleArray(otherMeanings).slice(0, 3);
    const options = shuffleArray([meaning, ...wrongThree]);
    return {
      id: 'v_' + word,
      rawWord: word,
      type: 'vocab',
      q: word,
      sub: '📘 この英語の正しい【日本語の意味】を選ぼう！',
      options: options,
      ans: options.indexOf(meaning),
      explain: `【${word}】の意味は「${meaning}」です。`,
      audio_question: cleanTextForSpeech(word),
      audio_complete: cleanTextForSpeech(word)
    };
  }
}

function generateGrammarQuiz(item) {
  const correctOption = item.opt[item.ans];
  const shuffledOptions = shuffleArray(item.opt);
  const newAnsIndex = shuffledOptions.indexOf(correctOption);
  const questionAudioText = item.q.replace(/\([^)]*\)/g, ' , ');
  const completeSentence = item.q.replace(/\([^)]*\)/g, correctOption);
  const translationText = item.sub ? `${item.sub}\n` : '';

  return {
    id: item.id,
    type: 'grammar',
    q: item.q,
    sub: '⚙️ 英文を読んで、空欄 ( ) に入る正しい英語を選ぼう！（💡ヒントで和訳表示）',
    translationHint: item.sub || '',
    options: shuffledOptions,
    ans: newAnsIndex,
    explain: `${translationText}${item.exp || item.explain || ''}\n\n【完成英文】\n${completeSentence}`,
    audio_question: questionAudioText,
    audio_complete: completeSentence
  };
}

function generateListeningQuiz(item) {
  const correctOption = item.opt[item.ans];
  const shuffledOptions = shuffleArray(item.opt);
  const newAnsIndex = shuffledOptions.indexOf(correctOption);
  return {
    id: item.id,
    type: 'listening',
    q: item.q,
    sub: item.sub || '🎧 音声を聞いて質問に答えよう',
    options: shuffledOptions,
    ans: newAnsIndex,
    explain: item.explain || item.exp || '',
    dialogue: item.dialogue,
    audio_complete: item.audio_complete || item.aud_complete || ''
  };
}

function generateReadingQuiz(item) {
  const correctOption = item.options[item.ans];
  const shuffledOptions = shuffleArray(item.options);
  return {
    id: item.id,
    type: 'reading',
    passageTitle: item.passageTitle || '📜 古代遺跡パッセージ',
    passage: item.passage,
    highlightSentence: item.highlight || '',
    q: item.q,
    sub: item.sub || '📜 本文を読んで質問に答えよう',
    options: shuffledOptions,
    ans: shuffledOptions.indexOf(correctOption),
    explain: item.explain || '',
    audio_question: item.q,
    audio_complete: item.audio_complete || item.q
  };
}

function getQuizDataById(id) {
  normalizeMasterData();
  if (!id) return null;
  if (id.startsWith('v_ja_')) {
    const word = id.replace('v_ja_', '');
    const found = RAW_VOCAB_DATA.find(x => x[0] === word);
    if (found) return generateVocabQuiz(found, 'ja2en');
  } else if (id.startsWith('v_')) {
    const word = id.replace('v_', '');
    const found = RAW_VOCAB_DATA.find(x => x[0] === word);
    if (found) return generateVocabQuiz(found, 'en2ja');
  } else if ((id.startsWith('g_') || id.startsWith('gx_')) && typeof RAW_GRAMMAR_DATA !== 'undefined') {
    const found = RAW_GRAMMAR_DATA.find(x => x.id === id);
    if (found) return generateGrammarQuiz(found);
  } else if ((id.startsWith('l_') || id.startsWith('lx_')) && typeof RAW_LISTENING_DATA !== 'undefined') {
    const found = RAW_LISTENING_DATA.find(x => x.id === id);
    if (found) return generateListeningQuiz(found);
  } else if ((id.startsWith('r_') || id.startsWith('rx_')) && typeof RAW_READING_DATA !== 'undefined') {
    const found = RAW_READING_DATA.find(x => x.id === id);
    if (found) return generateReadingQuiz(found);
  } else if ((id.startsWith('w_') || id.startsWith('wx_')) && typeof RAW_WRITING_DATA !== 'undefined') {
    const found = RAW_WRITING_DATA.find(x => x.id === id);
    if (found) {
      return {
        id: found.id,
        type: 'writing',
        passageTitle: found.passageTitle || null,
        passage: found.passage || null,
        q: found.q,
        sub: found.sub || '✍️ 質問に対する英作文（理由・Eメール）を合成しよう',
        words: found.words,
        explain: found.explain,
        audio_question: null, // 解答前の正解ネタバレ読み上げを防止
        audio_complete: found.words.join(' ')
      };
    }
  } else if ((id.startsWith('s_') || id.startsWith('sx_')) && typeof RAW_SPEAKING_DATA !== 'undefined') {
    const found = RAW_SPEAKING_DATA.find(x => x.id === id);
    if (found) {
      return {
        id: found.id,
        type: 'speaking',
        passageTitle: found.passageTitle || '🎙️ 二次面接カード',
        passage: found.passage || null,
        q: found.q,
        sub: found.sub || '🎙️ 声に出して魔石の英文を読み上げよう！',
        targetText: found.targetText,
        keywords: found.keywords || [],
        explain: found.explain,
        audio_question: found.q,
        audio_complete: found.targetText
      };
    }
  } else if (id.startsWith('tri_') && typeof RAW_IRREGULAR_VERBS !== 'undefined') {
    const baseWord = id.replace(/^tri_(\d+_)?/, '');
    const found = RAW_IRREGULAR_VERBS.find(x => x.base === baseWord);
    if (found) {
      return {
        id: `tri_${found.base}`,
        type: 'trinity',
        q: `「${found.meaning}」の3変化を順番に斬れ！`,
        sub: '⚡ ①原形 ➔ ②過去形 ➔ ③過去分詞 の順に3連タップ！',
        forms: [found.base, found.past, found.pp],
        pool: shuffleArray([found.base, found.past, found.pp, ...(found.dummies || ['played', 'went', 'gone']).slice(0, 3)]),
        explain: `【${found.meaning}】の3変化\n① 原形: ${found.base}\n② 過去形: ${found.past}\n③ 過去分詞: ${found.pp}`,
        audio_question: found.base,
        audio_complete: `${found.base}, ${found.past}, ${found.pp}`
      };
    }
  } else if (id.startsWith('past_') && typeof ACTUAL_PAST_EXAM_DATA !== 'undefined') {
    const found = ACTUAL_PAST_EXAM_DATA.find(x => x.id === id);
    if (found) {
      const correctOption = found.options[found.ans];
      const shuffledOptions = shuffleArray(found.options);
      return {
        id: found.id,
        type: found.type,
        passageTitle: found.passageTitle || null,
        passage: found.passage || null,
        highlightSentence: found.highlight || '',
        q: found.q,
        sub: found.sub,
        options: shuffledOptions,
        ans: shuffledOptions.indexOf(correctOption),
        explain: found.explain || found.exp || '',
        dialogue: found.dialogue || null,
        audio_question: found.audio_question || null,
        audio_complete: found.audio_complete || found.aud_complete || null
      };
    }
  }
  return null;
}

// ==================== 6. クエスト開始 ＆ 5段階難易度制御 ====================
function openNormalQuestSelect(type) {
  initAudio();
  stopBattleTimers();
  if (userData.questRotation[type]) {
    showNoticeModal(
      '✓ 制覇済みのエリアです',
      '🧭',
      'このエリアは現在の遠征サイクルで既に制覇済みです！\n3エリアすべてを制覇して「弱点ボス討伐」をクリアすると、🎫神殿チケットが手に入り全エリアが再解放されます！'
    );
    return;
  }
  selectedNormalType = type;
  const modal = document.getElementById('modalNormalSelect');
  const titleEl = document.getElementById('normalSelectTitle');
  if (titleEl) {
    if (type === 'vocab') titleEl.innerText = "📘 800語・熟語 遠征ランク選択 (10問)";
    if (type === 'grammar') titleEl.innerText = "⚙️ 3級文法120 遠征ランク選択 (6問)";
    if (type === 'listening') titleEl.innerText = "🎧 3級リスニング 遠征ランク選択 (4問)";
  }
  if (modal) modal.classList.remove('hidden');
}

function closeNormalQuestSelect() {
  const modal = document.getElementById('modalNormalSelect');
  if (modal) modal.classList.add('hidden');
}

function startNormalModeWithDiff(diffLevel) {
  closeNormalQuestSelect();
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  selectedNormalDiffLevel = diffLevel;
  const count = (selectedNormalType === 'vocab') ? 10 : (selectedNormalType === 'grammar' ? 6 : 4);
  startSessionInternal(selectedNormalType, count);
}

function startDailyQuest(type, count) {
  if (userData.dailyDone[type]) {
    showNoticeModal('✓ 本日達成済み', '⏳', '本日のこのミッションは達成済みです！時空遠征や4大ギルド訓練所に挑戦しよう！');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = true;
  isFeverMode = false;
  startSessionInternal(type, count);
}

function startSessionInternal(type, count) {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
  currentMode = type;

  if (type === 'vocab') {
    const selectedItems = selectSmartQuestions(RAW_VOCAB_DATA, count, 'v_');
    currentQueue = selectedItems.map(item => generateVocabQuiz(item));
  } else if (type === 'grammar') {
    const selected = selectSmartQuestions(RAW_GRAMMAR_DATA, count, 'g_');
    currentQueue = selected.map(item => generateGrammarQuiz(item));
  } else if (type === 'listening') {
    const selected = selectSmartQuestions(RAW_LISTENING_DATA, count, 'l_');
    currentQueue = selected.map(item => generateListeningQuiz(item));
  }
  startSession();
}

function startSingleWeakQuiz(id) {
  initAudio();
  stopBattleTimers();
  const qData = getQuizDataById(id);
  if (!qData) {
    showNoticeModal('エラー', '⚠️', '問題データの読み込みに失敗しました。');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'weakRetry';
  currentQueue = [qData];
  startSession();
}

function startWeakBattle() {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
  let rotCount = 0;
  if (userData.questRotation.vocab) rotCount++;
  if (userData.questRotation.grammar) rotCount++;
  if (userData.questRotation.listening) rotCount++;

  if (rotCount < 3) {
    showNoticeModal(
      '🔒 エリア未制覇',
      '👾',
      `単語・文法・リスニングの3エリアをすべて制覇すると「弱点ボス討伐」に挑戦できます！（あと ${3 - rotCount} エリア）`
    );
    return;
  }

  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'weakBattle';

  currentQueue = [];
  const usedIds = new Set();
  const pushUniqueQuiz = (q) => {
    if (!q) return;
    const baseKey = q.rawWord ? `v_${q.rawWord}` : q.id;
    if (!usedIds.has(baseKey)) {
      usedIds.add(baseKey);
      currentQueue.push(q);
    }
  };

  if (userData.weakList.length > 0) {
    shuffleArray(userData.weakList).forEach(id => {
      if (currentQueue.length < 5) pushUniqueQuiz(getQuizDataById(id));
    });
  }
  if (currentQueue.length < 5 && userData.masteredList.length > 0) {
    shuffleArray(userData.masteredList).forEach(id => {
      if (currentQueue.length < 5) pushUniqueQuiz(getQuizDataById(id));
    });
  }
  if (currentQueue.length < 5 && typeof RAW_GRAMMAR_DATA !== 'undefined') {
    shuffleArray(RAW_GRAMMAR_DATA).forEach(item => {
      if (currentQueue.length < 5) pushUniqueQuiz(generateGrammarQuiz(item));
    });
  }
  currentQueue = shuffleArray(currentQueue);
  startSession();
}

function startGuerrillaBattle() {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
  if (userData.masteredList.length === 0) return;

  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'guerrilla';

  currentQueue = [];
  const usedIds = new Set();
  const pushUniqueQuiz = (q) => {
    if (!q) return;
    const baseKey = q.rawWord ? `v_${q.rawWord}` : q.id;
    if (!usedIds.has(baseKey)) {
      usedIds.add(baseKey);
      currentQueue.push(q);
    }
  };

  shuffleArray(userData.masteredList).forEach(id => {
    if (currentQueue.length < 5) pushUniqueQuiz(getQuizDataById(id));
  });
  if (currentQueue.length < 5 && RAW_VOCAB_DATA.length > 0) {
    shuffleArray(RAW_VOCAB_DATA).forEach(item => {
      if (currentQueue.length < 5) pushUniqueQuiz(generateVocabQuiz(item));
    });
  }
  startSession();
}

// ==================== 7. 🌟 3級ギルド・4大特殊スキル訓練所 ====================

// ① 📜 古代遺跡解読（長文読解）
function startReadingDungeon() {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
  if (typeof RAW_READING_DATA === 'undefined' || RAW_READING_DATA.length === 0) return;
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'reading';

  const selected = selectSmartQuestions(RAW_READING_DATA, 3, 'r_');
  currentQueue = selected.map(item => generateReadingQuiz(item));
  startSession();
}

function useReadingLoupe() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  const btnLoupe = document.getElementById('btnUseLoupe');
  if (!q || !q.passage || !q.highlightSentence) {
    showNoticeModal('モノクル不要', '🔍', 'この問題では真理のモノクルは使用できません。');
    return;
  }
  if (btnLoupe && btnLoupe.dataset.used === 'true') return;
  if (userData.inventory.loupe <= 0) {
    showNoticeModal('モノクル不足', '🔍', '「真理のモノクル」がありません！工房ショップで交換できます。');
    return;
  }
  userData.inventory.loupe--;
  if (btnLoupe) {
    btnLoupe.dataset.used = 'true';
    btnLoupe.classList.add('opacity-40', 'pointer-events-none');
  }
  saveData();

  const passageEl = document.getElementById('readingPassageText');
  if (passageEl && q.passage.includes(q.highlightSentence)) {
    passageEl.innerHTML = q.passage.replace(
      q.highlightSentence,
      `<mark class="bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded shadow">${q.highlightSentence}</mark>`
    );
    playSE('chest');
  }
}

// ② ✍️ 魔導書クラフト（ライティング整序パズル）
let writingSelectedWords = [];
let writingPoolWords = [];

function startWritingCraft() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_WRITING_DATA === 'undefined' || RAW_WRITING_DATA.length === 0) return;
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'writing';

  const selected = selectSmartQuestions(RAW_WRITING_DATA, 3, 'w_');
  currentQueue = selected.map(item => ({
    id: item.id,
    type: 'writing',
    passageTitle: item.passageTitle || null,
    passage: item.passage || null,
    q: item.q,
    sub: item.sub || '✍️ 質問に対する英作文（理由・Eメール）を合成しよう',
    words: item.words,
    explain: item.explain,
    audio_question: null,
    audio_complete: item.words.join(' ')
  }));
  startSession();
}

function setupWritingUI(q) {
  writingSelectedWords = [];
  writingPoolWords = shuffleArray(q.words.map((w, i) => ({ word: w, origIdx: i, used: false })));
  renderWritingSlots();
}

function renderWritingSlots() {
  const slotEl = document.getElementById('writingAnswerSlot');
  const poolEl = document.getElementById('writingWordPool');
  if (!slotEl || !poolEl) return;

  slotEl.innerHTML = '';
  if (writingSelectedWords.length === 0) {
    slotEl.innerHTML = `<span class="text-xs text-slate-500">下の魔石（単語）を順番にタップして英文を合成しよう...</span>`;
  } else {
    writingSelectedWords.forEach((item, idx) => {
      const chip = document.createElement('button');
      chip.className = "bg-cyan-400 text-slate-950 font-black px-2.5 py-1 rounded-xl text-xs md:text-sm shadow transition active:scale-95";
      chip.innerText = item.word;
      chip.onclick = () => {
        if (isAnswered) return;
        item.used = false;
        writingSelectedWords.splice(idx, 1);
        playSE('slash');
        renderWritingSlots();
      };
      slotEl.appendChild(chip);
    });
  }

  poolEl.innerHTML = '';
  writingPoolWords.forEach(item => {
    const btn = document.createElement('button');
    btn.disabled = item.used || isAnswered;
    btn.className = item.used
      ? "bg-slate-900 text-slate-600 border border-slate-800 px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold opacity-30"
      : "bg-teal-900 hover:bg-teal-800 text-cyan-200 border border-cyan-500/60 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black shadow transition active:scale-95";
    btn.innerText = item.word;
    btn.onclick = () => {
      if (item.used || isAnswered) return;
      item.used = true;
      writingSelectedWords.push(item);
      playSE('slash');
      renderWritingSlots();
    };
    poolEl.appendChild(btn);
  });
}

function resetWritingWords() {
  if (isAnswered) return;
  writingSelectedWords = [];
  writingPoolWords.forEach(item => { item.used = false; });
  renderWritingSlots();
}

function submitWritingCraft() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  const userSentence = writingSelectedWords.map(x => x.word).join(' ');
  const targetSentence = q.words.join(' ');
  processAnswerResult(userSentence === targetSentence, q);
}

// ③ 🎙️ 言霊カラオケ詠唱システム（Philips T7315対応：STT＋声量波形検知ハイブリッド版）
let recognitionInstance = null;
let isMicListening = false;
let karaokeTokens = [];
let fallbackTimerId = null;

let micStream = null;
let volumeCheckInterval = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordedAudioUrl = null;

function startSpeakingBattle() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_SPEAKING_DATA === 'undefined' || RAW_SPEAKING_DATA.length === 0) return;
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'speaking';

  const selected = selectSmartQuestions(RAW_SPEAKING_DATA, 3, 's_');
  currentQueue = selected.map(item => ({
    id: item.id,
    type: 'speaking',
    passageTitle: item.passageTitle || '🎙️ 二次面接カード',
    passage: item.passage || null,
    q: item.q,
    sub: item.sub || '🎙️ 声に出して魔石の英文を読み上げよう！（黄金に光ると自動発動！）',
    targetText: item.targetText,
    keywords: item.keywords || [],
    explain: item.explain,
    audio_question: item.q,
    audio_complete: item.targetText
  }));
  startSession();
}

function normalizeWordForMatch(w) {
  return String(w).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function setupSpeakingUI(q) {
  stopMicRecognition();
  clearTimeout(fallbackTimerId);
  if (recordedAudioUrl) {
    URL.revokeObjectURL(recordedAudioUrl);
    recordedAudioUrl = null;
  }

  const rawWords = q.targetText.split(/\s+/).filter(Boolean);
  karaokeTokens = rawWords.map(w => ({
    display: w,
    clean: normalizeWordForMatch(w),
    matched: false
  }));

  renderKaraokeTokens();
  updateSpeakingMeter();

  const recText = document.getElementById('speakingRecognizedText');
  const waveEl = document.getElementById('micWaveIndicator');
  const btnMic = document.getElementById('btnStartMic');
  const btnFallback = document.getElementById('btnSpeakingFallback');

  if (waveEl) waveEl.classList.add('hidden');
  if (btnFallback) btnFallback.classList.add('hidden');
  if (recText) recText.innerText = '🎙️「マイクON」を押して、上の単語を元気よく声に出して読もう！';
  if (btnMic) {
    btnMic.disabled = false;
    btnMic.className = "w-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:brightness-110 text-white font-black py-3.5 px-4 rounded-2xl text-sm md:text-base shadow-xl transition active:scale-95 flex items-center justify-center gap-2";
    btnMic.innerHTML = `<span class="text-xl">🎙️</span> <span>マイクON（声に出して自動発動！）</span>`;
  }
}

function renderKaraokeTokens() {
  const container = document.getElementById('speakingKaraokeWords');
  if (!container) return;
  container.innerHTML = '';

  karaokeTokens.forEach((tok, idx) => {
    const span = document.createElement('span');
    span.id = `karaokeWord_${idx}`;
    span.className = tok.matched
      ? "px-2.5 py-1 rounded-xl text-sm md:text-base font-black bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-950 shadow-lg scale-105 transition-all duration-200 border border-white"
      : "px-2.5 py-1 rounded-xl text-sm md:text-base font-bold bg-slate-900 text-slate-300 border border-rose-900/80 transition-all duration-200";
    span.innerText = tok.display;
    container.appendChild(span);
  });
}

function updateSpeakingMeter() {
  const total = Math.max(1, karaokeTokens.length);
  const matchedCount = karaokeTokens.filter(t => t.matched).length;
  const pct = Math.round((matchedCount / total) * 100);
  const meterEl = document.getElementById('speakingMatchMeter');
  if (meterEl) {
    meterEl.innerText = `魔力充填率: ${pct}% (${matchedCount}/${total}語)`;
    meterEl.className = pct >= 60
      ? "text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow animate-bounce"
      : "text-xs font-black bg-rose-950 text-amber-300 px-2.5 py-0.5 rounded-full border border-rose-500";
  }
  return pct;
}

function toggleSpeechRecognition() {
  if (isAnswered) return;
  if (isMicListening) {
    stopMicRecognition();
  } else {
    startMicRecognition();
  }
}

let audioSourceNode = null;
let audioAnalyserNode = null;
let isFallbackActivating = false;
let sttWatchdogTimerId = null;

function stopMicRecognition() {
  isMicListening = false;
  isFallbackActivating = false;
  clearTimeout(sttWatchdogTimerId);
  sttWatchdogTimerId = null;
  if (recognitionInstance) {
    try {
      recognitionInstance.onend = null;
      recognitionInstance.onerror = null;
      recognitionInstance.onresult = null;
      recognitionInstance.abort();
    } catch (e) {}
    recognitionInstance = null;
  }
  if (volumeCheckInterval) {
    clearInterval(volumeCheckInterval);
    volumeCheckInterval = null;
  }
  if (audioSourceNode) {
    try { audioSourceNode.disconnect(); } catch (e) {}
    audioSourceNode = null;
  }
  if (audioAnalyserNode) {
    try { audioAnalyserNode.disconnect(); } catch (e) {}
    audioAnalyserNode = null;
  }
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    try { mediaRecorder.stop(); } catch (e) {}
  }
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
  const waveEl = document.getElementById('micWaveIndicator');
  const btnMic = document.getElementById('btnStartMic');
  if (waveEl) waveEl.classList.add('hidden');
  if (btnMic && !isAnswered) {
    btnMic.innerHTML = `<span class="text-xl">🎙️</span> <span>マイク再開（続きを詠唱する）</span>`;
  }
}

async function startMicRecognition() {
  if (isAnswered) return;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  const recText = document.getElementById('speakingRecognizedText');
  const waveEl = document.getElementById('micWaveIndicator');
  const btnMic = document.getElementById('btnStartMic');
  const btnFallback = document.getElementById('btnSpeakingFallback');
  const q = currentQueue[currentIndex];

  clearTimeout(fallbackTimerId);
  fallbackTimerId = setTimeout(() => {
    if (!isAnswered && btnFallback) btnFallback.classList.remove('hidden');
  }, 6000);

  if (!window.isSecureContext) {
    if (recText) recText.innerText = '⚠️ HTTPSまたはlocalhostで開くとマイク機能が動作します。下のボタンで発動できます。';
    if (btnFallback) btnFallback.classList.remove('hidden');
    return;
  }

  try {
    const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    tempStream.getTracks().forEach(track => track.stop());
  } catch (err) {
    if (recText) recText.innerText = '⚠️ マイク権限がブロックされています。ブラウザ設定でマイクを許可してください。';
    if (btnFallback) btnFallback.classList.remove('hidden');
    return;
  }

  // 非同期待機中に解答済み、またはクイズ画面から離脱していた場合は即座に中断
  if (isAnswered || document.getElementById('viewQuiz')?.classList.contains('hidden')) return;

  isMicListening = true;
  if (waveEl) waveEl.classList.remove('hidden');
  if (btnMic) {
    btnMic.className = "w-full bg-rose-800 hover:bg-rose-700 border-2 border-amber-400 text-white font-black py-3.5 px-4 rounded-2xl text-sm md:text-base shadow-xl transition active:scale-95 flex items-center justify-center gap-2";
    btnMic.innerHTML = `<span class="animate-ping">🔴</span> <span>詠唱聞き取り中...（声に出して読もう！）</span>`;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    await activateVolumeFallback(q);
    return;
  }

  try {
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 3;

    if (recText) recText.innerText = '👂 リアルタイム聞き取り中... 光っていない単語を声に出そう！';

    let hasSttResponded = false;
    clearTimeout(sttWatchdogTimerId);
    sttWatchdogTimerId = setTimeout(() => {
      if (isMicListening && !hasSttResponded && !isAnswered) {
        if (recognitionInstance) {
          recognitionInstance.onend = null;
          try { recognitionInstance.abort(); } catch (e) {}
          recognitionInstance = null;
        }
        activateVolumeFallback(q);
      }
    }, 3500);

    recognitionInstance.onresult = (event) => {
      hasSttResponded = true;
      clearTimeout(sttWatchdogTimerId);
      if (isAnswered) return;

      let combinedTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          combinedTranscript += ' ' + event.results[i][j].transcript;
        }
      }

      const latestTranscript = event.results[event.results.length - 1][0].transcript || '';
      if (recText) recText.innerText = `🗣️ 認識中: "${latestTranscript.trim()}"`;

      const spokenWords = combinedTranscript.toLowerCase().split(/\s+/).map(normalizeWordForMatch).filter(Boolean);
      let newlyMatched = false;

      karaokeTokens.forEach(tok => {
        if (!tok.matched && tok.clean.length > 0) {
          const hit = spokenWords.some(sw =>
            sw === tok.clean ||
            (tok.clean.length >= 4 && sw.length >= 3 && (tok.clean.startsWith(sw) || sw.startsWith(tok.clean)))
          );
          if (hit) {
            tok.matched = true;
            newlyMatched = true;
          }
        }
      });

      if (newlyMatched) {
        playSE('slash');
        renderKaraokeTokens();
      }

      checkAndTriggerSpeakingClear(q, combinedTranscript);
    };

    recognitionInstance.onerror = () => {
      clearTimeout(sttWatchdogTimerId);
      if (recognitionInstance) {
        recognitionInstance.onend = null;
        try { recognitionInstance.abort(); } catch (e) {}
        recognitionInstance = null;
      }
      if (isMicListening && !isAnswered) {
        activateVolumeFallback(q);
      }
    };

    recognitionInstance.onend = () => {
      if (isMicListening && !isAnswered && !volumeCheckInterval && !isFallbackActivating && recognitionInstance) {
        setTimeout(() => {
          if (isMicListening && !isAnswered && !volumeCheckInterval && !isFallbackActivating && recognitionInstance) {
            try { recognitionInstance.start(); } catch (e) {
              activateVolumeFallback(q);
            }
          }
        }, 150);
      }
    };

    recognitionInstance.start();
  } catch (e) {
    await activateVolumeFallback(q);
  }
}

async function activateVolumeFallback(q) {
  if (!isMicListening || isAnswered || volumeCheckInterval || isFallbackActivating) return;
  isFallbackActivating = true;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    });
    if (!isMicListening || isAnswered || document.getElementById('viewQuiz')?.classList.contains('hidden')) {
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
      isFallbackActivating = false;
      return;
    }
    startVoiceRecording(micStream);
    startVolumeBasedKaraoke(micStream, q);
  } catch (e) {
    const btnFallback = document.getElementById('btnSpeakingFallback');
    if (btnFallback) btnFallback.classList.remove('hidden');
  } finally {
    isFallbackActivating = false;
  }
}

function startVolumeBasedKaraoke(stream, q) {
  initAudio();
  if (!actx || !stream) return;
  const recText = document.getElementById('speakingRecognizedText');
  if (recText) {
    recText.innerText = '🔥 言霊ボイスパワー感知モード！ 最後の単語まで元気よく声に出して読もう！';
  }

  try {
    audioSourceNode = actx.createMediaStreamSource(stream);
    audioAnalyserNode = actx.createAnalyser();
    audioAnalyserNode.fftSize = 256;
    audioSourceNode.connect(audioAnalyserNode);
    const dataArray = new Uint8Array(audioAnalyserNode.frequencyBinCount);

    let speakingTicks = 0;
    const ticksPerWord = 6; // 実際の音読スピードに合わせて1単語あたりの発声時間を適正化

    if (volumeCheckInterval) clearInterval(volumeCheckInterval);
    volumeCheckInterval = setInterval(() => {
      if (!isMicListening || isAnswered || !audioAnalyserNode) {
        clearInterval(volumeCheckInterval);
        volumeCheckInterval = null;
        return;
      }
      audioAnalyserNode.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 2; i < 40; i++) sum += dataArray[i];
      const avgVolume = sum / 38;

      if (avgVolume > 22) {
        speakingTicks++;
        if (speakingTicks >= ticksPerWord) {
          speakingTicks = 0;
          const nextUnmatched = karaokeTokens.find(t => !t.matched);
          if (nextUnmatched) {
            nextUnmatched.matched = true;
            playSE('slash');
            renderKaraokeTokens();
            checkAndTriggerSpeakingClear(q, '');
          }
        }
      }
    }, 90);
  } catch (e) {}
}

function checkAndTriggerSpeakingClear(q, transcript) {
  const pct = updateSpeakingMeter();
  const len = karaokeTokens.length;
  // 文末（最後の単語、または最後から2番目の単語）までしっかり到達しているかチェック
  const isEndReached = len > 0 && (
    karaokeTokens[len - 1].matched ||
    (len >= 3 && karaokeTokens[len - 2].matched && pct >= 85)
  );

  // 途中クリアを防止：全体の85%以上が光り、かつ文末まで読み切った場合（または100%到達時）のみ自動発動
  const isAutoClear = (pct >= 100) || (pct >= 85 && isEndReached);

  if (isAutoClear) {
    stopMicRecognition();
    karaokeTokens.forEach(t => { t.matched = true; });
    renderKaraokeTokens();
    updateSpeakingMeter();
    const recText = document.getElementById('speakingRecognizedText');
    if (recText) recText.innerText = `⚡ 言霊充填完了（100%）！ 最後まで見事に詠唱成功！！`;
    clearTimeout(postAnswerTimerId);
    postAnswerTimerId = setTimeout(() => {
      processAnswerResult(true, q);
    }, 450);
  }
}

let activeRecordedAudio = null;

function startVoiceRecording(stream) {
  if (!('MediaRecorder' in window) || !stream) return;
  try {
    recordedChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '');
    mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      if (recordedChunks.length > 0) {
        if (recordedAudioUrl) {
          try { URL.revokeObjectURL(recordedAudioUrl); } catch (e) {}
        }
        const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
        recordedAudioUrl = URL.createObjectURL(blob);
        const btnRec = document.getElementById('btnPlayRecordedVoice');
        if (btnRec) btnRec.classList.remove('hidden');
      }
    };
    mediaRecorder.start();
  } catch (e) {}
}

function playRecordedUserVoice() {
  if (!recordedAudioUrl) return;
  try {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (activeRecordedAudio) {
      activeRecordedAudio.pause();
      activeRecordedAudio.currentTime = 0;
    }
    activeRecordedAudio = new Audio(recordedAudioUrl);
    activeRecordedAudio.play();
  } catch (e) {}
}

function forceSpeakingClear() {
  if (isAnswered) return;
  stopMicRecognition();
  const q = currentQueue[currentIndex];
  processAnswerResult(true, q);
}

// ④ ⚡ 不規則動詞3連撃（トリニティ・スラッシュ 全50種対応）
let trinityCurrentStep = 0;

function startTrinitySlash() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_IRREGULAR_VERBS === 'undefined' || RAW_IRREGULAR_VERBS.length === 0) return;
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'trinity';

  const selected = selectSmartQuestions(RAW_IRREGULAR_VERBS, 5, 'tri_');
  currentQueue = selected.map((item) => ({
    id: `tri_${item.base}`,
    type: 'trinity',
    q: `「${item.meaning}」の3変化を順番に斬れ！`,
    sub: '⚡ ①原形 ➔ ②過去形 ➔ ③過去分詞 の順に3連タップ！',
    forms: [item.base, item.past, item.pp],
    pool: shuffleArray([item.base, item.past, item.pp, ...(item.dummies || ['played', 'went', 'gone']).slice(0, 3)]),
    explain: `【${item.meaning}】の3変化\n① 原形: ${item.base}\n② 過去形: ${item.past}\n③ 過去分詞: ${item.pp}`,
    audio_question: item.base,
    audio_complete: `${item.base}, ${item.past},${item.pp}`
  }));
  startSession();
}

function setupTrinityUI(q) {
  trinityCurrentStep = 0;
  const stepLabels = ['① 原形', '② 過去形', '③ 過去分詞'];
  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById(`triSlot${i}`);
    if (slot) {
      slot.innerText = stepLabels[i];
      slot.className = "p-1.5 rounded-xl bg-teal-950/60 text-slate-400 border border-teal-800";
    }
  }
  const badge = document.getElementById('trinityStepBadge');
  if (badge) badge.innerText = '1撃目：原形';

  const grid = document.getElementById('trinityOptionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  q.pool.forEach(word => {
    const btn = document.createElement('button');
    btn.className = "bg-teal-900 hover:bg-teal-800 border-2 border-emerald-500/60 text-white font-black py-2.5 px-2 rounded-2xl text-xs md:text-sm shadow transition active:scale-95";
    btn.innerText = word;
    btn.onclick = () => handleTrinityTap(word, btn, q);
    grid.appendChild(btn);
  });
}

function handleTrinityTap(word, btn, q) {
  if (isAnswered) return;
  const expected = q.forms[trinityCurrentStep];

  if (word === expected) {
    playSE('slash');
    speakText(word);
    const slot = document.getElementById(`triSlot${trinityCurrentStep}`);
    if (slot) {
      slot.innerText = `⚔️ ${word}`;
      slot.className = "p-1.5 rounded-xl bg-emerald-400 text-slate-950 font-black border border-white shadow";
    }
    btn.disabled = true;
    btn.classList.add('opacity-30');
    trinityCurrentStep += 1;

    const badge = document.getElementById('trinityStepBadge');
    if (trinityCurrentStep === 1 && badge) badge.innerText = '2撃目：過去形';
    if (trinityCurrentStep === 2 && badge) badge.innerText = '3撃目：過去分詞';

    if (trinityCurrentStep >= 3) {
      processAnswerResult(true, q);
    }
  } else {
    processAnswerResult(false, q);
  }
}
// ==========================================
// 英検3級 クロノ・オデッセイ 〜365日の時空冒険〜
// コアゲームエンジン・ハイブリッド音声詠唱・長期育成システム (app.js)
// 【後半：セクション 8 〜 13】
// ==========================================

// ==================== 8. 全15章・時空神殿ボスバトル制御 ====================
function openBossSelectModal() {
  initAudio();
  stopBattleTimers();
  const modal = document.getElementById('modalBossSelect');
  const container = document.getElementById('bossStageList');
  if (!modal || !container || typeof BOSS_STAGES === 'undefined') return;
  container.innerHTML = '';

  const ticketBadge = document.getElementById('modalTicketCount');
  if (ticketBadge) ticketBadge.innerText = userData.bossTickets || 0;

  BOSS_STAGES.forEach(stage => {
    if (stage.isSecret && !userData.bossClearedLevels.includes(14)) return;

    const isUnlocked = (stage.lv <= userData.bossUnlockedLevel);
    const isCleared = userData.bossClearedLevels.includes(stage.lv);

    const card = document.createElement('div');
    card.className = `p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition ${
      stage.isSecret
        ? 'bg-gradient-to-r from-rose-950 via-black to-amber-950 border-amber-400 shadow-xl glow-gold'
        : (isUnlocked
            ? (isCleared ? 'bg-teal-900/90 border-cyan-400/80 shadow' : 'bg-gradient-to-r from-amber-950/90 to-teal-950 border-amber-500/80 shadow-md')
            : 'bg-slate-900/60 border-teal-900 opacity-60')
    }`;

    if (isUnlocked) {
      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-3xl flex-shrink-0">${stage.icon}</span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs md:text-sm font-black ${stage.isSecret ? 'text-amber-300' : 'text-cyan-300'} truncate">第${stage.lv}章 ${stage.name}</span>
              ${isCleared ? `<span class="text-[10px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.5 rounded">制覇済</span>` : `<span class="text-[10px] bg-rose-600 text-white font-black px-1.5 py-0.5 rounded">TARGET</span>`}
            </div>
            <div class="text-[11px] text-slate-200 leading-tight truncate mt-0.5">${stage.desc}</div>
            <div class="text-[11px] font-bold text-amber-300 mt-1">
              HP: <span class="text-white">${stage.hp.toLocaleString()}</span> / 攻: <span class="text-white">${stage.atk}</span>
              <span class="text-emerald-400 ml-1.5">+${stage.exp}EXP / 💎+${stage.gems}</span>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <button onclick="startBossBattleWithStage(${stage.lv})" class="bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-110 text-white font-black px-3 py-2 rounded-xl text-xs shadow transition active:scale-95 flex items-center gap-1">
            <span>進軍</span> <span class="text-[10px] bg-black/50 border border-amber-300 px-1.5 py-0.5 rounded">🎫1</span>
          </button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-3xl flex-shrink-0 opacity-50">🔒</span>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-black text-slate-400">第${stage.lv}章 ？？？？</div>
            <div class="text-[11px] text-teal-400 mt-0.5">第${stage.lv - 1}章のガーディアン撃破で解放！</div>
          </div>
        </div>
        <span class="text-xs bg-slate-950 border border-teal-800 text-teal-500 font-bold px-2.5 py-1 rounded-xl">未到達</span>
      `;
    }
    container.appendChild(card);
  });
  modal.classList.remove('hidden');
}

function closeBossSelectModal() {
  const modal = document.getElementById('modalBossSelect');
  if (modal) modal.classList.add('hidden');
}

function buildBossBattleQueue() {
  normalizeMasterData();
  const queue = [];

  // ① 文法＆語彙・会話（過去問＋拡張文法すべてから忘却曲線で3問選出）
  const pastGrammar = (typeof ACTUAL_PAST_EXAM_DATA !== 'undefined')
    ? ACTUAL_PAST_EXAM_DATA.filter(x => x.type === 'grammar')
    : [];
  const allGrammarPool = [...pastGrammar, ...(typeof RAW_GRAMMAR_DATA !== 'undefined' ? RAW_GRAMMAR_DATA : [])];
  selectSmartQuestions(allGrammarPool, 3, 'g_').forEach(item => {
    const q = getQuizDataById(item.id);
    if (q) {
      q.sub = '🏛️ 3級神殿ボス (文法・語彙・会話)';
      queue.push(q);
    }
  });

  // ② リスニング（過去問＋拡張リスニングすべてから忘却曲線で2問選出）
  const pastListening = (typeof ACTUAL_PAST_EXAM_DATA !== 'undefined')
    ? ACTUAL_PAST_EXAM_DATA.filter(x => x.type === 'listening')
    : [];
  const allListeningPool = [...pastListening, ...(typeof RAW_LISTENING_DATA !== 'undefined' ? RAW_LISTENING_DATA : [])];
  selectSmartQuestions(allListeningPool, 2, 'l_').forEach(item => {
    const q = getQuizDataById(item.id);
    if (q) {
      q.sub = '🏛️ 3級神殿ボス (対話・アナウンスリスニング)';
      queue.push(q);
    }
  });

  // ③ 長文読解（過去問長文＋遺跡長文から忘却曲線で2問選出：選んだ2問のみを生成）
  const pastReading = (typeof ACTUAL_PAST_EXAM_DATA !== 'undefined')
    ? ACTUAL_PAST_EXAM_DATA.filter(x => x.type === 'reading')
    : [];
  const allReadingPool = [...pastReading, ...(typeof RAW_READING_DATA !== 'undefined' ? RAW_READING_DATA : [])];
  selectSmartQuestions(allReadingPool, 2, 'r_').forEach(item => {
    const q = getQuizDataById(item.id);
    if (q) {
      q.sub = '🏛️ 3級神殿ボス (長文読解)';
      queue.push(q);
    }
  });

  // ④ ギルド技能：不規則動詞3連撃（忘却曲線で1問選出）
  if (typeof RAW_IRREGULAR_VERBS !== 'undefined' && RAW_IRREGULAR_VERBS.length > 0) {
    const selectedVerbs = selectSmartQuestions(RAW_IRREGULAR_VERBS, 1, 'tri_');
    if (selectedVerbs[0]) {
      const triQ = getQuizDataById(`tri_${selectedVerbs[0].base}`);
      if (triQ) {
        triQ.sub = '🏛️ 3級神殿ボス (不規則動詞3連撃)';
        queue.push(triQ);
      }
    }
  }

  // ⑤ ギルド技能：新形式ライティング（忘却曲線で1問選出）
  if (typeof RAW_WRITING_DATA !== 'undefined' && RAW_WRITING_DATA.length > 0) {
    const selectedWriting = selectSmartQuestions(RAW_WRITING_DATA, 1, 'w_');
    if (selectedWriting[0]) {
      const wQ = getQuizDataById(selectedWriting[0].id);
      if (wQ) {
        wQ.sub = '🏛️ 3級神殿ボス (ライティング魔導書合成)';
        queue.push(wQ);
      }
    }
  }

  // ⑥ 第10問（最終決戦）：二次面接スピーキング（忘却曲線で1問選出）
  if (typeof RAW_SPEAKING_DATA !== 'undefined' && RAW_SPEAKING_DATA.length > 0) {
    const selectedSpeaking = selectSmartQuestions(RAW_SPEAKING_DATA, 1, 's_');
    if (selectedSpeaking[0]) {
      const sQ = getQuizDataById(selectedSpeaking[0].id);
      if (sQ) {
        sQ.sub = '🏛️ 3級神殿ボス最終詠唱 (最後まで声に出してトドメを刺せ！)';
        queue.push(sQ);
      }
    }
  }

  return queue;
}

function startBossBattleWithStage(lv) {
  if (!userData.bossTickets || userData.bossTickets <= 0) {
    showNoticeModal(
      '🎫 神殿チケット不足',
      '🏛️',
      '【時空神殿チケット】がありません！\n時空遠征サイクル（3エリア制覇 ➔ 弱点ボス討伐）またはデイリーミッション全制覇でチケットを手に入れよう！'
    );
    return;
  }

  closeBossSelectModal();

  normalizeMasterData();
  const stage = BOSS_STAGES.find(s => s.lv === lv) || BOSS_STAGES[0];
  currentBossStage = stage;

  initAudio();
  stopBattleTimers();
  isBossMode = true;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'boss';

  // 文法・リスニング・長文・3連撃・英作文・面接詠唱のすべてが融合した全10問編成
  currentQueue = buildBossBattleQueue();

  if (!userData.bossSeenIntros.includes(stage.lv) && stage.introMsg) {
    userData.bossSeenIntros.push(stage.lv);
    saveData();
    showBossDialogueModal(`【第${stage.lv}章 ${stage.name}】降臨！`, stage.icon, stage.introMsg, () => {
      startSession();
    });
  } else {
    startSession();
  }
}

// ==================== 9. バトルセッション進行制御 ====================
let currentQueue = [];
let currentIndex = 0;
let currentMode = '';
let quizScore = 0;
let answeredQuestionsCount = 0;
let combo = 0;
let maxCombo = 0;
let isAnswered = false;
let isSessionFinishing = false;
let isBossTicketConsumedInSession = false;

let playerMaxHp = 150;
let playerCurHp = 150;
let enemyMaxHp = 100;
let enemyCurHp = 100;
let enemyAtk = 20;
let questionStartTime = 0;
let criticalLimitDuration = 4000;
let timerGaugeInterval = null;

const MONSTERS = ['⚙️', '🛸', '🗿', '🦂', '🦈', '🦅', '🔮', '⚔️'];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function stopBattleTimers() {
  if (timerGaugeInterval) {
    clearInterval(timerGaugeInterval);
    timerGaugeInterval = null;
  }
  isDialogueSpeaking = false;
  clearTimeout(dialogueNextTimer);
  clearTimeout(speechInitTimerId);
  clearTimeout(speechTimeoutId);
  clearTimeout(postAnswerTimerId);
  clearTimeout(fallbackTimerId);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (activeRecordedAudio) {
    try { activeRecordedAudio.pause(); } catch (e) {}
    activeRecordedAudio = null;
  }
  stopMicRecognition();
}

function startSession() {
  currentIndex = 0;
  quizScore = 0;
  answeredQuestionsCount = 0;
  combo = 0;
  maxCombo = 0;
  isFeverMode = false;
  isSessionFinishing = false;
  isBossTicketConsumedInSession = false;
window._isResultRewardGranted = false;

  const pStats = calculatePlayerStats();
  playerMaxHp = pStats.hp;
  playerCurHp = pStats.hp;

  const qLen = Math.max(1, currentQueue.length);

  if (isBossMode) {
    enemyMaxHp = currentBossStage.hp;
    enemyCurHp = currentBossStage.hp;
    enemyAtk = currentBossStage.atk;
  } else if (currentMode === 'weakRetry') {
    enemyMaxHp = 100;
    enemyCurHp = 100;
    enemyAtk = playerMaxHp;
  } else if (isDailyCurrentSession || ['weakBattle', 'guerrilla', 'reading', 'writing', 'speaking', 'trinity'].includes(currentMode)) {
    // 全問正解（クリティカル0回）でも100%確実に撃破できる 0.82 倍に設定
    enemyMaxHp = Math.round(pStats.atk * qLen * 0.82);
    enemyCurHp = enemyMaxHp;
    enemyAtk = Math.max(20, Math.round(playerMaxHp * 0.25));
  } else {
    // 5段階の遠征難易度（Lv.1から無理なく段階的に挑戦できるスムーズな設計）
    const diffMultipliers = [
      { reqAtk: 35, atk: 18 },   // Rank 1: 初期状態(Lv.1〜)で突破可能
      { reqAtk: 110, atk: 55 },  // Rank 2: Lv.15〜 または武器召喚で突破可能
      { reqAtk: 320, atk: 140 }, // Rank 3: Lv.45〜
      { reqAtk: 850, atk: 320 }, // Rank 4: Lv.90〜
      { reqAtk: 2200, atk: 680 } // Rank 5: Lv.140〜
    ];
    const diff = diffMultipliers[selectedNormalDiffLevel - 1] || diffMultipliers[0];
    enemyMaxHp = Math.round(diff.reqAtk * qLen);
    enemyAtk = diff.atk;
    enemyCurHp = enemyMaxHp;
  }

  hideAllViews();
  setNavigationVisibility(false); // Philips T7315向けにバトル中はヘッダーと下部ナビを隠して縦幅を確保
  document.getElementById('viewQuiz').classList.remove('hidden');

  const enemyBox = document.getElementById('enemyCardBox');
  const enemyNameEl = document.getElementById('battleEnemyName');

  if (isBossMode) {
    playBGM('boss');
    enemyBox.className = currentBossStage.isSecret
      ? "bg-gradient-to-b from-rose-950 via-black to-amber-950 border-2 border-amber-400 rounded-3xl p-4 shadow-2xl relative glow-gold overflow-hidden"
      : "bg-gradient-to-b from-amber-950 via-rose-950 to-slate-950 border-2 border-rose-500 rounded-3xl p-4 shadow-2xl relative glow-crimson overflow-hidden";
    enemyNameEl.innerText = `第${currentBossStage.lv}章 ${currentBossStage.name}`;
  } else {
    playBGM('battle');
    enemyBox.className = "bg-gradient-to-b from-teal-900/90 via-slate-900 to-slate-950 border-2 border-teal-600 rounded-3xl p-4 shadow-2xl relative overflow-hidden";
    const modeNames = {
      weakBattle: '👾 弱点アマルガム',
      weakRetry: '👾 弱点ミラージュ',
      guerrilla: '🕰️ 記憶喰らいのファントム',
      reading: '📜 古代遺跡のスフィンクス',
      writing: '✍️ 魔導書オートマタ',
      speaking: '🎙️ 言霊のヴァルキリー',
      trinity: '⚡ 三連剣のクロノナイト'
    };
    enemyNameEl.innerText = modeNames[currentMode] || '時空センチネル';
  }

  const avatarObj = (typeof AVATARS !== 'undefined')
    ? ([...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0])
    : { name: 'クロノビット' };
  document.getElementById('battleHeroName').innerText = avatarObj.name;
  updateBattleHpUi();
  renderQuestion();
}

function updateBattleHpUi() {
  const heroPct = Math.max(0, Math.min(100, Math.round((playerCurHp / playerMaxHp) * 100)));
  const enemyPct = Math.max(0, Math.min(100, Math.round((enemyCurHp / enemyMaxHp) * 100)));
  document.getElementById('battleHeroHpBar').style.width = `${heroPct}%`;
  document.getElementById('battleHeroHpText').innerText = `${playerCurHp.toLocaleString()}/${playerMaxHp.toLocaleString()}`;
  document.getElementById('battleEnemyHpBar').style.width = `${enemyPct}%`;
  document.getElementById('battleEnemyHpText').innerText = `${enemyCurHp.toLocaleString()}/${enemyMaxHp.toLocaleString()}`;
}

function startCriticalTimer() {
  questionStartTime = Date.now();
  const q = currentQueue[currentIndex];
  const pStats = calculatePlayerStats();

  let baseDuration = 4500;
  if (q.type === 'vocab') baseDuration = 4000;
  else if (q.type === 'grammar') baseDuration = 6000;
  else if (q.type === 'listening') baseDuration = 5500;
  else if (q.type === 'reading') baseDuration = 20000;
  else if (q.type === 'writing' || q.type === 'speaking' || q.type === 'trinity') baseDuration = 18000;

  const spdBonusMs = Math.min(4500, pStats.spd * 8);
  criticalLimitDuration = baseDuration + spdBonusMs;

  const gauge = document.getElementById('timerGauge');
  const timerText = document.getElementById('timerText');
  if (gauge) gauge.style.width = '100%';
  if (timerText) {
    const secStr = (criticalLimitDuration / 1000).toFixed(1);
    timerText.innerText = `⚡ ${secStr}秒以内クリアで時空クリティカル！`;
  }

  if (timerGaugeInterval) clearInterval(timerGaugeInterval);
  timerGaugeInterval = setInterval(() => {
    const elapsed = Date.now() - questionStartTime;
    const remainPct = Math.max(0, 100 - (elapsed / criticalLimitDuration) * 100);
    if (gauge) gauge.style.width = `${remainPct}%`;
    if (remainPct <= 0) {
      clearInterval(timerGaugeInterval);
      timerGaugeInterval = null;
      if (timerText) timerText.innerText = '⏱️ 落ち着いて正解を選ぼう';
    }
  }, 60);
}

function renderQuestion() {
  isAnswered = false;
  stopBattleTimers();

  const q = currentQueue[currentIndex];
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('quizProgress').innerText = `第 ${currentIndex + 1} / ${currentQueue.length} 問`;
  document.getElementById('comboCounter').innerText = `🔥 ${combo} 連撃`;

  const feverBanner = document.getElementById('feverBanner');
  if (isFeverMode) {
    feverBanner.classList.remove('hidden');
    document.getElementById('enemyCardBox').classList.add('fever-active');
  } else {
    feverBanner.classList.add('hidden');
    document.getElementById('enemyCardBox').classList.remove('fever-active');
  }

  if (isBossMode) {
    document.getElementById('enemyAvatar').innerText = currentBossStage.icon;
  } else {
    document.getElementById('enemyAvatar').innerText = MONSTERS[currentIndex % MONSTERS.length];
  }

  document.getElementById('quizQuestion').innerText = q.q;
  document.getElementById('quizSubText').innerText = q.sub || '';

  const passageBox = document.getElementById('readingPassageBox');
  const btnLoupe = document.getElementById('btnUseLoupe');
  if (btnLoupe) {
    btnLoupe.dataset.used = 'false';
    btnLoupe.classList.remove('opacity-40', 'pointer-events-none');
  }
  if (q.passage) {
    passageBox.classList.remove('hidden');
    document.getElementById('readingPassageTitle').innerText = q.passageTitle || '📜 パッセージ';
    document.getElementById('readingPassageText').innerText = q.passage;
    if (btnLoupe && q.highlightSentence) btnLoupe.classList.remove('hidden');
    else if (btnLoupe) btnLoupe.classList.add('hidden');
  } else {
    passageBox.classList.add('hidden');
    if (btnLoupe) btnLoupe.classList.add('hidden');
  }

  const optContainer = document.getElementById('quizOptions');
  const writingBox = document.getElementById('writingCraftBox');
  const speakingBox = document.getElementById('speakingBattleBox');
  const trinityBox = document.getElementById('trinitySlashBox');
  const btnHint = document.getElementById('btnUseHint');

  if (btnHint) {
    btnHint.dataset.used = 'false';
    btnHint.classList.remove('opacity-40', 'pointer-events-none');
    btnHint.classList.add('hidden');
  }

  optContainer.classList.add('hidden');
  writingBox.classList.add('hidden');
  speakingBox.classList.add('hidden');
  trinityBox.classList.add('hidden');

  if (q.type === 'writing') {
    writingBox.classList.remove('hidden');
    setupWritingUI(q);
  } else if (q.type === 'speaking') {
    speakingBox.classList.remove('hidden');
    setupSpeakingUI(q);
  } else if (q.type === 'trinity') {
    trinityBox.classList.remove('hidden');
    setupTrinityUI(q);
  } else {
    optContainer.classList.remove('hidden');
    if (btnHint) btnHint.classList.remove('hidden');
    optContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "w-full bg-teal-950/90 hover:bg-teal-800 border-2 border-teal-700 hover:border-cyan-400 p-3 md:p-3.5 rounded-2xl text-xs md:text-sm font-bold text-slate-100 text-left transition active:scale-98 flex items-center justify-between gap-2 shadow";
      btn.innerHTML = `<span class="flex-1 min-w-0 break-words leading-snug"><strong class="text-cyan-400 mr-2">${idx + 1}.</strong>${opt}</span> <span class="text-xs opacity-50 flex-shrink-0">⚔️</span>`;
      btn.onclick = () => handleAnswer(idx);
      optContainer.appendChild(btn);
    });
  }

  const audioBtnContainer = document.getElementById('audioBtnContainer');
  const timerText = document.getElementById('timerText');
  const hasPreAnswerAudio = Boolean(
    (q.type === 'listening' && q.dialogue) ||
    q.audio_question ||
    (q.type === 'speaking' && q.audio_complete)
  );

  if (hasPreAnswerAudio) {
    audioBtnContainer.classList.remove('hidden');
  } else {
    audioBtnContainer.classList.add('hidden');
  }

  if (q.type === 'listening' && q.dialogue) {
    if (timerText) timerText.innerText = '🎧 対話音声を再生中...';
    playDialogueSpeech(q.dialogue, () => startCriticalTimer());
  } else if (!isBossMode && q.audio_question) {
    if (timerText) timerText.innerText = '🗣️ 英文を読み上げ中...';
    speakText(q.audio_question, () => startCriticalTimer());
  } else {
    startCriticalTimer();
  }
}

function playCurrentAudio() {
  const q = currentQueue[currentIndex];
  if (!q) return;
  const ensureTimerCallback = (!isAnswered && !timerGaugeInterval) ? () => startCriticalTimer() : null;

  if ((isAnswered || q.type === 'speaking') && q.audio_complete) {
    speakText(q.audio_complete, ensureTimerCallback);
  } else if (q.type === 'listening' && q.dialogue) {
    playDialogueSpeech(q.dialogue, ensureTimerCallback);
  } else if (q.audio_question) {
    speakText(q.audio_question, ensureTimerCallback);
  }
}

function use5050Hint() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  const btnHint = document.getElementById('btnUseHint');
  if (!q || !q.options) return;
  if (btnHint && btnHint.dataset.used === 'true') return;

  if (userData.inventory.hint <= 0) {
    showNoticeModal('羅針盤不足', '💡', '「時空ヒントの羅針盤」がありません！工房ショップで交換できます。');
    return;
  }
  userData.inventory.hint--;
  if (btnHint) {
    btnHint.dataset.used = 'true';
    btnHint.classList.add('opacity-40', 'pointer-events-none');
  }
  saveData();

  const buttons = Array.from(document.getElementById('quizOptions').children);
  const wrongIndices = [];
  buttons.forEach((btn, idx) => {
    if (idx !== q.ans && !btn.disabled) wrongIndices.push(idx);
  });

  shuffleArray(wrongIndices).slice(0, 2).forEach(idx => {
    buttons[idx].disabled = true;
    buttons[idx].classList.add('opacity-25');
  });

  if (q.translationHint) {
    const subEl = document.getElementById('quizSubText');
    if (subEl) subEl.innerText = `💡 ヒント ${q.translationHint}`;
  }
  playSE('chest');
}

function showDamagePopup(text, isCritical, isEnemyDamage) {
  const area = document.getElementById('damageEffectArea');
  if (!area) return;
  const el = document.createElement('div');
  el.className = `damage-popup text-sm md:text-base font-black px-3 py-1 rounded-2xl shadow-xl ${
    isEnemyDamage
      ? (isCritical ? 'bg-gradient-to-r from-cyan-300 to-amber-300 text-slate-950 border-2 border-white scale-110' : 'bg-emerald-500 text-slate-950')
      : 'bg-rose-800 text-white border border-rose-400'
  }`;
  el.innerText = text;
  area.appendChild(el);
  setTimeout(() => el.remove(), 850);
}

function handleAnswer(selectedIdx) {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  const isCorrect = (selectedIdx === q.ans);

  Array.from(document.getElementById('quizOptions').children).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.ans) btn.classList.add('!bg-emerald-700', '!border-emerald-400');
    if (idx === selectedIdx && !isCorrect) btn.classList.add('!bg-rose-800', '!border-rose-500');
  });

  processAnswerResult(isCorrect, q);
}

function processAnswerResult(isCorrect, q) {
  if (isAnswered) return;
  isAnswered = true;
  stopBattleTimers();

  const answerDuration = Date.now() - questionStartTime;
  const isQuickAnswer = (answerDuration <= criticalLimitDuration);

  answeredQuestionsCount += 1;
  // ボス戦で最初の1問目に解答した時点でチケットを1枚確定消費（開始直後の誤タップ帰還は保護しつつ、敗北直前のリタイア逃げチートを防止）
  if (isBossMode && !isBossTicketConsumedInSession && userData.bossTickets > 0) {
    userData.bossTickets -= 1;
    isBossTicketConsumedInSession = true;
  }

  userData.totalAnswered += 1;
  recordWeakStat(q.id, isCorrect);

  const feedbackModal = document.getElementById('quizFeedback');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackExplain = document.getElementById('feedbackExplain');
  const btnRec = document.getElementById('btnPlayRecordedVoice');
  if (btnRec) {
    if (q.type === 'speaking' && recordedAudioUrl) btnRec.classList.remove('hidden');
    else btnRec.classList.add('hidden');
  }

  const pStats = calculatePlayerStats();

  if (isCorrect) {
    quizScore += 1;
    combo += 1;
    if (combo > maxCombo) maxCombo = combo;
    userData.totalCorrect += 1;

    if (combo >= 5 && !isFeverMode) {
      isFeverMode = true;
      playBGM('fever');
    }

    let dmg = 0;
    let isSpdCrit = false;
    const isPerfectFinalBlow = (quizScore === currentQueue.length && currentIndex === currentQueue.length - 1);

    if (currentMode === 'weakRetry' || (!isBossMode && isPerfectFinalBlow && enemyCurHp > 0)) {
      dmg = Math.max(enemyCurHp, pStats.atk);
      enemyCurHp = 0;
    } else {
      const baseDmg = Math.round(pStats.atk * (0.95 + Math.random() * 0.2));
      const critRate = Math.min(0.8, pStats.spd / 450);
      isSpdCrit = (Math.random() < critRate);

      let multi = 1.0;
      if (isQuickAnswer) multi += 0.5;
      if (isSpdCrit) multi += 1.0;
      if (isFeverMode) multi *= 1.5;

      dmg = Math.round(baseDmg * multi);
      enemyCurHp = Math.max(0, enemyCurHp - dmg);
    }
    updateBattleHpUi();

    const isOverkill = (enemyCurHp === 0 && currentMode !== 'weakRetry');
    const isFullCritical = (isQuickAnswer && isSpdCrit) || currentMode === 'weakRetry' || isPerfectFinalBlow;
    if (isFullCritical) {
      playSE('critical');
      showDamagePopup(isOverkill ? `💥 OVERKILL!! -${dmg.toLocaleString()} HP` : `💥 時空超会心!! -${dmg.toLocaleString()} HP`, true, true);
    } else if (isQuickAnswer || isSpdCrit) {
      playSE('critical');
      showDamagePopup(isOverkill ? `⚡ OVERKILL! -${dmg.toLocaleString()} HP` : `⚡ CRITICAL! -${dmg.toLocaleString()} HP`, true, true);
    } else {
      playSE('correct');
      showDamagePopup(isOverkill ? `⚔️ OVERKILL! -${dmg.toLocaleString()} HP` : `⚔️ -${dmg.toLocaleString()} HP`, false, true);
    }

    if (q.rawWord && !userData.vocabBook.includes(q.rawWord)) {
      userData.vocabBook.push(q.rawWord);
    }

    feedbackIcon.innerText = '⭕';
    feedbackTitle.innerText = isFullCritical
      ? `💥 時空アルティメット会心！ (${combo}連撃)`
      : (isQuickAnswer ? `⚡ 神速ブレイク！ (${combo}連撃)` : `正解！ (${combo}連撃)`);
    feedbackTitle.className = "text-sm md:text-base font-black text-cyan-300";

    if (q.audio_complete) {
      clearTimeout(postAnswerTimerId);
      postAnswerTimerId = setTimeout(() => speakText(q.audio_complete), 300);
    }
  } else {
    playSE('wrong');
    combo = 0;
    if (isFeverMode) {
      isFeverMode = false;
      playBGM(isBossMode ? 'boss' : 'battle');
    }

    if (enemyCurHp <= 0) {
      showDamagePopup(`🛡️ 撃破済み（被弾なし）`, false, false);
    } else {
      let enemyDmg = 0;
      if (currentMode === 'weakRetry') {
        enemyDmg = playerCurHp;
        playerCurHp = 0;
      } else {
        enemyDmg = Math.round(enemyAtk * (0.85 + Math.random() * 0.3));
        playerCurHp = Math.max(0, playerCurHp - enemyDmg);
      }
      updateBattleHpUi();
      showDamagePopup(`⚠️ 被弾! -${enemyDmg.toLocaleString()} HP`, false, false);
    }

    if (q.id) {
      if (!userData.weakList.includes(q.id)) {
        userData.weakList.push(q.id);
      }
      // 殿堂入りしていた問題を間違えた場合は、殿堂入りから外して克服中へ戻す
      userData.masteredList = userData.masteredList.filter(x => x !== q.id);
    }

    feedbackIcon.innerText = '❌';
    feedbackTitle.innerText = 'おしい！ 時空記録（解説）を確認しよう';
    feedbackTitle.className = "text-sm md:text-base font-black text-rose-400";
  }

  feedbackExplain.innerText = q.explain || '正解を確認して次へ進もう！';
  const audioBtnContainer = document.getElementById('audioBtnContainer');
  if (audioBtnContainer && (q.audio_complete || q.audio_question || q.dialogue)) {
    audioBtnContainer.classList.remove('hidden');
  }
  feedbackModal.classList.remove('hidden');
  setTimeout(() => {
    feedbackModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
  saveData();
}

function nextQuestion() {
  if (isSessionFinishing) return;
  document.getElementById('quizFeedback').classList.add('hidden');
  currentIndex += 1;
  // 強い武器で敵HPを0にした後も、予定された問題数（currentQueue.length）を最後まで学習させる
  const shouldContinue = (currentMode === 'weakRetry')
    ? (currentIndex < currentQueue.length && playerCurHp > 0 && enemyCurHp > 0)
    : (currentIndex < currentQueue.length && playerCurHp > 0);

  if (shouldContinue) {
    renderQuestion();
  } else {
    finishSession();
  }
}

// ==================== 10. リザルト ＆ 全15章エンディング分岐 ====================
function finishSession() {
  if (isSessionFinishing) return;
  isSessionFinishing = true;
  stopBattleTimers();
  const isEnemyDefeated = (enemyCurHp <= 0);

  if (isBossMode && isEnemyDefeated && !userData.bossClearedLevels.includes(currentBossStage.lv) && currentBossStage.defeatMsg) {
    showBossDialogueModal(`【第${currentBossStage.lv}章 ${currentBossStage.name}】討伐！`, currentBossStage.icon, currentBossStage.defeatMsg, () => {
      proceedFinishSession();
    });
  } else {
    proceedFinishSession();
  }
}

function proceedFinishSession() {
  if (window._isResultRewardGranted) return;
  window._isResultRewardGranted = true;
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('viewQuiz').classList.add('hidden');
  document.getElementById('viewResult').classList.remove('hidden');
  playBGM('result');

  let earnedExp = 0;
  let earnedGems = 0;
  const rareDropArea = document.getElementById('rareDropArea');
  rareDropArea.classList.add('hidden');

  const isPlayerDead = (playerCurHp <= 0);
  const isEnemyDefeated = (enemyCurHp <= 0);

  if (isPlayerDead) {
    document.getElementById('resultModeBadge').innerText = '💀 遠征失敗...';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-rose-700 text-white px-3 py-0.5 rounded-full inline-block mb-1';
    document.getElementById('resultEmoji').innerText = '🛡️';
    document.getElementById('resultTitle').innerText = 'シールドが限界に達した！';
    document.getElementById('resultComment').innerText = 'アーマー(防HP)の召喚強化や、弱点記録での復習で再挑戦しよう！';
    earnedExp = Math.max(15, quizScore * 6);
    earnedGems = 3;
  } else if (!isEnemyDefeated) {
    document.getElementById('resultModeBadge').innerText = '💨 ターゲット逃走 (時間切れ)';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-slate-700 text-slate-200 px-3 py-0.5 rounded-full inline-block mb-1';
    document.getElementById('resultEmoji').innerText = '⏳';
    document.getElementById('resultTitle').innerText = '時空の彼方へ逃げられた！';
    document.getElementById('resultComment').innerText = 'ブレイド(攻撃)の限界突破や即答クリティカルで撃破を目指そう！';
    earnedExp = isBossMode ? Math.round(currentBossStage.exp * 0.3) : Math.max(20, quizScore * 10);
    earnedGems = 5;
  } else if (isBossMode && isEnemyDefeated) {
    const isFirstClear = !userData.bossClearedLevels.includes(currentBossStage.lv);
    const baseBossExp = isFirstClear ? currentBossStage.exp : Math.round(currentBossStage.exp * 0.5);
    earnedExp = baseBossExp + (quizScore * 12);
    earnedGems = isFirstClear ? currentBossStage.gems : Math.max(8, Math.round(currentBossStage.gems * 0.35));

    if (isFirstClear) userData.bossClearedLevels.push(currentBossStage.lv);
    if (currentBossStage.lv >= userData.bossUnlockedLevel && userData.bossUnlockedLevel < 15) {
      userData.bossUnlockedLevel = currentBossStage.lv + 1;
    }

    if (currentBossStage.lv === 15 && !userData.hasSeenTrueEnding) {
      userData.hasSeenTrueEnding = true;
      userData.gems += 800;
      document.getElementById('viewResult').classList.add('hidden');
      addExp(25000, () => showTrueEndingModal());
      return;
    }

    if (currentBossStage.lv === 14 && !userData.hasSeenEnding) {
      ['hat_genesis_crown', 'wp_genesis_blade', 'aura_genesis_light'].forEach(id => {
        if (!userData.unlockedEquips.includes(id)) userData.unlockedEquips.push(id);
      });
      userData.hasSeenEnding = true;
      userData.bossUnlockedLevel = 15;
      userData.gems += earnedGems;
      document.getElementById('viewResult').classList.add('hidden');
      addExp(earnedExp, () => showEndingModal());
      return;
    }

    document.getElementById('resultModeBadge').innerText = `🏛️ 第${currentBossStage.lv}章 ガーディアン撃破！`;
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';
    document.getElementById('resultEmoji').innerText = currentBossStage.icon;
    document.getElementById('resultTitle').innerText = `【${currentBossStage.name}】完全制覇！`;
    document.getElementById('resultComment').innerText = isFirstClear
      ? '見事な英語力です！次の時空神殿（章）が解放されました！'
      : '再討伐達成！時空を超える確かな実力が身についています！';

    const dropChance = 0.45 + (currentBossStage.lv * 0.04);
    const bossDrops = ['hat_dragon_crown', 'wp_dark_blade', 'aura_dragon_light'];
    const availableDrops = bossDrops.filter(id => !userData.unlockedEquips.includes(id));
    if (availableDrops.length > 0 && Math.random() < dropChance) {
      const dropId = availableDrops[Math.floor(Math.random() * availableDrops.length)];
      userData.unlockedEquips.push(dropId);
      const dropEquip = SHOP_EQUIP_DATA.find(e => e.id === dropId);
      if (dropEquip) {
        document.getElementById('rareDropItemText').innerText = `【${dropEquip.name}】(${dropEquip.desc}) を入手！`;
        rareDropArea.classList.remove('hidden');
        playSE('chest');
      }
    }
  } else if (isDailyCurrentSession && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '⏳';
    document.getElementById('resultTitle').innerText = 'デイリーミッション達成！';
    document.getElementById('resultModeBadge').innerText = '🌟 クロノ・デイリー報酬！';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-cyan-400 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';

    if (currentMode === 'vocab') { userData.dailyDone.vocab = true; earnedExp = 90 + (quizScore * 12); earnedGems = 20; }
    else if (currentMode === 'grammar') { userData.dailyDone.grammar = true; earnedExp = 110 + (quizScore * 16); earnedGems = 25; }
    else if (currentMode === 'listening') { userData.dailyDone.listening = true; earnedExp = 130 + (quizScore * 20); earnedGems = 30; }
  } else if (currentMode === 'guerrilla' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🕰️';
    document.getElementById('resultTitle').innerText = '記憶喰らいのファントム撃退！';
    document.getElementById('resultModeBadge').innerText = '⚡ 時空防衛ボーナス（クリスタル2倍）';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-rose-500 text-white px-3 py-0.5 rounded-full inline-block mb-1 shadow';
    earnedExp = 220;
    earnedGems = 50;
  } else if (['reading', 'writing', 'speaking', 'trinity'].includes(currentMode) && isEnemyDefeated) {
    if (!userData.guildRotation || typeof userData.guildRotation !== 'object') {
      userData.guildRotation = { reading: false, writing: false, speaking: false, trinity: false };
    }
    const isAlreadyDoneInCycle = Boolean(userData.guildRotation[currentMode]);

    if (isAlreadyDoneInCycle) {
      // 同じ訓練ばかりを連続周回した場合は「自主練レート」に抑え、他分野の学習を促す
      const remainModes = [];
      if (!userData.guildRotation.reading) remainModes.push('📜長文解読');
      if (!userData.guildRotation.writing) remainModes.push('✍️魔導書クラフト');
      if (!userData.guildRotation.speaking) remainModes.push('🎙️カラオケ詠唱');
      if (!userData.guildRotation.trinity) remainModes.push('⚡3連撃スラッシュ');

      document.getElementById('resultEmoji').innerText = '⚔️';
      document.getElementById('resultTitle').innerText = 'ギルド自主練クリア！';
      document.getElementById('resultModeBadge').innerText = '📘 反復自主練モード';
      document.getElementById('resultModeBadge').className = 'text-xs font-black bg-teal-700 text-white px-3 py-0.5 rounded-full inline-block mb-1';
      document.getElementById('resultComment').innerText = `未制覇の訓練（${remainModes.join('・')}）をクリアするとギルド特別報酬が復活するぞ！`;
      earnedExp = 20 + (quizScore * 4);
      earnedGems = 3;
    } else {
      userData.guildRotation[currentMode] = true;
      const allFourDone = userData.guildRotation.reading && userData.guildRotation.writing && userData.guildRotation.speaking && userData.guildRotation.trinity;

      if (allFourDone) {
        // 4大ギルド訓練を1周コンプリート！
        userData.guildRotation = { reading: false, writing: false, speaking: false, trinity: false };
        document.getElementById('resultEmoji').innerText = '👑';
        document.getElementById('resultTitle').innerText = '4大ギルド訓練サイクル完全制覇！';
        document.getElementById('resultModeBadge').innerText = '🌟 4技能コンプリート大報酬！';
        document.getElementById('resultModeBadge').className = 'text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';
        document.getElementById('resultComment').innerText = '長文・英作文・面接・不規則動詞の4技能すべてを制覇！全ギルド訓練の特別報酬が再解放されました！';
        earnedExp = 180 + (quizScore * 15);
        earnedGems = 35;
      } else {
        const doneCnt = [userData.guildRotation.reading, userData.guildRotation.writing, userData.guildRotation.speaking, userData.guildRotation.trinity].filter(Boolean).length;
        document.getElementById('resultEmoji').innerText = '🛡️';
        document.getElementById('resultTitle').innerText = `ギルド特殊訓練クリア！(${doneCnt}/4制覇)`;
        document.getElementById('resultModeBadge').innerText = '🌟 3級ギルド特別報酬！';
        document.getElementById('resultModeBadge').className = 'text-xs font-black bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';
        document.getElementById('resultComment').innerText = `4つのギルド訓練をすべて制覇するとコンプリートボーナス獲得！（現在 ${doneCnt} / 4）`;
        earnedExp = 95 + (quizScore * 12);
        earnedGems = 15;
      }
    }
  } else if (currentMode === 'weakRetry' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🎯';
    document.getElementById('resultTitle').innerText = '弱点ミラージュ撃破！';
    document.getElementById('resultModeBadge').innerText = '✨ 一撃克服！';
    earnedExp = 55;
    earnedGems = 8;
  } else if (currentMode === 'weakBattle' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🎉';
    document.getElementById('resultTitle').innerText = '弱点ボス討伐完了！';
    document.getElementById('resultModeBadge').innerText = '🎫 時空神殿チケット +1枚獲得！';
    userData.bossTickets = (userData.bossTickets || 0) + 1;
    userData.questRotation = { vocab: false, grammar: false, listening: false };
    earnedExp = 240;
    earnedGems = 35;
  } else if (isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🧭';
    document.getElementById('resultTitle').innerText = '時空遠征エリア制覇！';
    document.getElementById('resultModeBadge').innerText = `⚔️ Rank ${selectedNormalDiffLevel} 遠征クリア`;
    if (selectedNormalType) userData.questRotation[selectedNormalType] = true;
    const diffMulti = [1.0, 1.8, 3.0, 5.0, 8.0][selectedNormalDiffLevel - 1] || 1.0;
    earnedExp = Math.round((quizScore * 14 + (maxCombo * 5)) * diffMulti);
    earnedGems = Math.max(6, Math.round((quizScore * 1.5) * diffMulti));
  }

  if (isFeverMode && isEnemyDefeated) {
    earnedExp *= 2;
    earnedGems *= 2;
  }

  lastEarnedExp = earnedExp;
  isPotionAlreadyUsedForCurrentResult = false;

  const totalDone = Math.max(1, answeredQuestionsCount);
  document.getElementById('resultScore').innerText = `${quizScore} / ${totalDone}`;
  document.getElementById('resultExp').innerText = isFeverMode && isEnemyDefeated ? `+${earnedExp.toLocaleString()} (🔥2倍!)` : `+${earnedExp.toLocaleString()}`;
  document.getElementById('resultGems').innerText = isFeverMode && isEnemyDefeated ? `💎+${earnedGems} (🔥2倍!)` : `💎+${earnedGems}`;

  renderResultPotionButton();
  userData.gems += earnedGems;
  addExp(earnedExp);
}

function renderResultPotionButton() {
  const btnPotion = document.getElementById('btnResultUsePotion');
  if (!btnPotion) return;

  if (userData.inventory.potion > 0 && !isPotionAlreadyUsedForCurrentResult && lastEarnedExp > 0) {
    btnPotion.classList.remove('hidden');
    btnPotion.innerHTML = `<span>🧪 クロノエリクサーを使う (所持: ${userData.inventory.potion})</span> <span class="bg-slate-950 px-2 py-0.5 rounded text-xs text-amber-300">+${lastEarnedExp.toLocaleString()} EXP</span>`;
    btnPotion.onclick = applyPotionToResult;
  } else {
    btnPotion.classList.add('hidden');
  }
}

function applyPotionToResult() {
  if (userData.inventory.potion <= 0 || isPotionAlreadyUsedForCurrentResult) return;
  userData.inventory.potion--;
  isPotionAlreadyUsedForCurrentResult = true;
  playSE('bonus');
  document.getElementById('resultExp').innerText = `+${(lastEarnedExp * 2).toLocaleString()} (🧪2倍!)`;
  renderResultPotionButton();
  addExp(lastEarnedExp, () => {
    showNoticeModal('🧪 クロノエリクサー発動！', '✨', `追加で +${lastEarnedExp.toLocaleString()} EXP を獲得しました！`);
  });
}

function confirmExitQuiz() {
  stopBattleTimers();
  showHome();
}

// ==================== 11. 弱点アーカイブ ＆ 800語大図鑑 ====================
function showWeakBook() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewWeakBook').classList.remove('hidden');
  stopBGM();
  updateNavHighlight('weak');
  switchWeakTab(currentWeakTab);
}

let weakBookRenderLimit = 40;

function switchWeakTab(tab) {
  currentWeakTab = tab;
  weakBookRenderLimit = 40;
  const tActive = document.getElementById('tabWeakActive');
  const tMastered = document.getElementById('tabWeakMastered');

  if (tActive && tMastered) {
    if (tab === 'active') {
      tActive.className = "flex-1 py-2 rounded-xl bg-rose-900 text-rose-100 shadow transition font-black";
      tMastered.className = "flex-1 py-2 rounded-xl text-teal-400 hover:text-white transition font-bold";
    } else {
      tActive.className = "flex-1 py-2 rounded-xl text-teal-400 hover:text-white transition font-bold";
      tMastered.className = "flex-1 py-2 rounded-xl bg-emerald-900 text-emerald-100 shadow transition font-black";
    }
  }
  renderWeakBookList();
}

function renderWeakBookList() {
  normalizeMasterData();
  const container = document.getElementById('weakBookItemList');
  if (!container) return;
  container.innerHTML = '';

  const targetList = (currentWeakTab === 'active') ? userData.weakList : userData.masteredList;

  if (targetList.length === 0) {
    container.innerHTML = `
      <div class="md:col-span-2 bg-teal-950/50 border border-teal-800 p-6 rounded-3xl text-center space-y-2">
        <span class="text-4xl">${currentWeakTab === 'active' ? '✨' : '💮'}</span>
        <div class="font-black text-sm text-cyan-300">${currentWeakTab === 'active' ? '現在、未克服の弱点はありません！' : 'まだ殿堂入りした記録はありません！'}</div>
        <div class="text-xs text-teal-200">${currentWeakTab === 'active' ? 'バトルで間違えた問題がここに自動アーカイブされます。' : '「克服中」の問題で2回連続正解するか「覚えた✓」を押すと殿堂入りします。'}</div>
      </div>
    `;
    return;
  }

  // 最新の記録から最大 weakBookRenderLimit 件ずつ描画し、数百件蓄積時のフリーズを防止
  const reversedList = [...targetList].reverse();
  const visibleSlice = reversedList.slice(0, weakBookRenderLimit);
  const fragment = document.createDocumentFragment();

  visibleSlice.forEach(id => {
    const qData = getQuizDataById(id);
    if (!qData) return;

    const stats = userData.weakStats[id] || { cleared: 0, attempts: 0 };
    const isMastered = (currentWeakTab === 'mastered');
    const card = document.createElement('div');
    card.className = isMastered
      ? "bg-emerald-950/40 border border-emerald-500/60 p-3.5 rounded-2xl space-y-2 shadow flex flex-col justify-between"
      : "bg-teal-950/80 border border-rose-500/50 p-3.5 rounded-2xl space-y-2 shadow flex flex-col justify-between";

    const correctText = qData.options ? qData.options[qData.ans] : (qData.audio_complete || '');
    card.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-black ${isMastered ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-800'} px-2 py-0.5 rounded">${isMastered ? '💮 殿堂入り' : (qData.sub || '要復習')}</span>
            <span class="text-[10px] font-bold bg-slate-950 px-2 py-0.5 rounded-full border border-teal-700 text-amber-300">
              🎯 ${stats.cleared} / ${stats.attempts} 回突破
            </span>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button onclick="startSingleWeakQuiz('${id}')" class="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 text-slate-950 font-black px-2.5 py-1 rounded-xl text-xs transition active:scale-95">
              再戦
            </button>
            ${isMastered ? `
              <button onclick="restoreWeakItem('${id}')" class="bg-slate-950 hover:bg-rose-950 text-rose-300 border border-rose-800 font-bold px-2 py-1 rounded-xl text-xs transition active:scale-95">
                戻す ↩️
              </button>
            ` : `
              <button onclick="removeWeakItem('${id}')" class="bg-slate-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold px-2.5 py-1 rounded-xl text-xs transition active:scale-95">
                覚えた ✓
              </button>
            `}
          </div>
        </div>
        <div class="font-black text-xs md:text-sm text-white leading-snug whitespace-pre-line break-words">${qData.q}</div>
      </div>
      <div class="bg-slate-950/85 p-2.5 rounded-xl border border-teal-800/80 text-xs space-y-1">
        <div class="font-bold text-cyan-300">【正解】 ${correctText}</div>
        <div class="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line break-words">${qData.explain || ''}</div>
      </div>
    `;
    fragment.appendChild(card);
  });

  if (reversedList.length > weakBookRenderLimit) {
    const moreBtn = document.createElement('button');
    moreBtn.className = "md:col-span-2 w-full bg-teal-900 hover:bg-teal-800 border border-cyan-500 text-cyan-200 font-black py-2.5 rounded-2xl text-xs shadow transition";
    moreBtn.innerText = `▼ さらに40件を表示する（残り ${reversedList.length - weakBookRenderLimit} 問）`;
    moreBtn.onclick = () => {
      weakBookRenderLimit += 40;
      renderWeakBookList();
    };
    fragment.appendChild(moreBtn);
  }

  container.appendChild(fragment);
}

function removeWeakItem(id) {
  const baseId = id.startsWith('v_ja_') ? id.replace('v_ja_', 'v_') : id;
  if (userData.weakStats[id]) userData.weakStats[id].streak = 2;
  if (userData.weakStats[baseId]) userData.weakStats[baseId].streak = 2;
  userData.weakList = userData.weakList.filter(item => item !== id);
  if (!userData.masteredList.includes(id)) userData.masteredList.push(id);
  saveData();
  renderWeakBookList();
}

function restoreWeakItem(id) {
  const baseId = id.startsWith('v_ja_') ? id.replace('v_ja_', 'v_') : id;
  if (userData.weakStats[id]) userData.weakStats[id].streak = 0;
  if (userData.weakStats[baseId]) userData.weakStats[baseId].streak = 0;
  userData.masteredList = userData.masteredList.filter(item => item !== id);
  if (!userData.weakList.includes(id)) userData.weakList.push(id);
  saveData();
  renderWeakBookList();
}

function showBook() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewBook').classList.remove('hidden');
  stopBGM();
  updateNavHighlight('book');
  renderVocabBook();
}

function renderVocabBook() {
  normalizeMasterData();
  const container = document.getElementById('vocabBookList');
  if (!container || RAW_VOCAB_DATA.length === 0) return;
  container.innerHTML = '';

  const query = (document.getElementById('bookSearchInput')?.value || '').toLowerCase().trim();
  const totalVocabCount = RAW_VOCAB_DATA.length;
  const collectedCount = userData.vocabBook.length;
  const pct = totalVocabCount > 0 ? Math.round((collectedCount / totalVocabCount) * 100) : 0;

  document.getElementById('bookProgressText').innerText = `${collectedCount} / ${totalVocabCount} 語 (${pct}%)`;
  document.getElementById('bookProgressBar').style.width = `${pct}%`;

  RAW_VOCAB_DATA.forEach((item, idx) => {
    if (query && !item[0].toLowerCase().includes(query) && !item[1].includes(query)) return;

    const isCollected = userData.vocabBook.includes(item[0]);
    const card = document.createElement('div');
    card.className = `p-3 rounded-2xl border flex flex-col justify-between ${isCollected ? 'bg-teal-900/90 border-cyan-400/70 shadow' : 'bg-slate-900/60 border-teal-900 opacity-60'}`;
    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-[10px] font-bold text-teal-300">No.${idx + 1}</span>
          <span class="text-[10px] font-bold">${isCollected ? '💮 解析済' : '❓ 未解析'}</span>
        </div>
        <div class="font-black text-white text-xs md:text-sm mb-0.5 truncate">${isCollected ? item[0] : '？？？'}</div>
        <div class="text-[11px] text-amber-300 truncate">${isCollected ? item[1] : 'バトルで正解して解析！'}</div>
      </div>
      ${isCollected ? `
        <button onclick="speakVocabByIndex(${idx})" class="mt-2 bg-teal-800 hover:bg-teal-700 py-1 rounded-xl text-[11px] text-cyan-100 font-bold transition active:scale-95">
          🔊 発音再生
        </button>
      ` : ''}
    `;
    container.appendChild(card);
  });
}

// ==================== 12. 1回＆5連ガチャ ＆ 武具格納庫 ====================
function rollEquipGacha(times = 1) {
  initAudio();
  const cost = times * 50;
  if (userData.gems < cost) {
    showNoticeModal('💎 クリスタル不足', '🎰', `${times}回召喚には 💎${cost} クリスタルが必要です！（現在: 💎${userData.gems}）`);
    return;
  }
  if (typeof SHOP_EQUIP_DATA === 'undefined') return;

  userData.gems -= cost;
  const basePool = SHOP_EQUIP_DATA.filter(e => !e.isSecret && e.price < 9000);

  // レアリティ別の排出重みと解禁レベル（序盤で最終装備が出るのを防ぎ、1年間の成長に合わせて解禁）
  const getEquipWeight = (eq) => {
    if (eq.rank.includes('ミシック')) return userData.level >= 80 ? 2 : 0;        // Lv.80で解禁
    if (eq.rank.includes('レジェンド')) return userData.level >= 40 ? 8 : 1;      // 低確率、Lv.40で本格解禁
    if (eq.rank.includes('スーパーレア')) return userData.level >= 15 ? 25 : 5;   // Lv.15で本格解禁
    if (eq.rank.includes('レア')) return 60;
    return 120; // ノーマル
  };

  const results = [];
  for (let i = 0; i < times; i++) {
    // 既に +99 に達した武具をリアルタイムで排出対象から除外し、5連召喚中の上限到達にも対応
    const activePool = basePool.filter(e => !userData.unlockedEquips.includes(e.id) || (userData.equipLevels[e.id] || 0) < 99);

    if (activePool.length === 0) {
      userData.inventory.potion += 1;
      userData.inventory.hint += 2;
      userData.inventory.loupe += 2;
      results.push(`👑 全武具+99達成ボーナス：🧪エリクサー+1 / 💡ヒント+2 / 🔍モノクル+2`);
      continue;
    }

    const weightedPool = [];
    activePool.forEach(eq => {
      const w = getEquipWeight(eq);
      for (let k = 0; k < w; k++) weightedPool.push(eq);
    });

    const picked = weightedPool[Math.floor(Math.random() * weightedPool.length)] || activePool[0];
    if (!userData.unlockedEquips.includes(picked.id)) {
      userData.unlockedEquips.push(picked.id);
      results.push(`🆕 ${picked.icon}【${picked.name}】(${picked.rank}) 入手！`);
    } else {
      userData.equipLevels[picked.id] = Math.min(99, (userData.equipLevels[picked.id] || 0) + 1);
      const plusLv = userData.equipLevels[picked.id];
      results.push(`✨ ${picked.icon}【${picked.name} +${plusLv}】に覚醒進化！(同調補正:+${getEquipBonusVal(picked).toLocaleString()})`);
    }
  }

  playSE('chest');
  saveData();
  showNoticeModal(
    `🎰 時空レリック${times}回召喚結果！`,
    '🎁',
    results.join('\n')
  );
}

function switchEquipTab(tab) {
  currentShopTab = tab;
  const tHat = document.getElementById('tabEquipHat');
  const tWp = document.getElementById('tabEquipWeapon');
  const tAu = document.getElementById('tabEquipAura');
  [tHat, tWp, tAu].forEach(el => {
    if (el) el.className = "flex-1 py-1.5 rounded-xl text-slate-300 hover:text-white transition";
  });
  if (tab === 'hat' && tHat) tHat.className = "flex-1 py-1.5 rounded-xl bg-teal-800 text-cyan-300 shadow transition";
  if (tab === 'weapon' && tWp) tWp.className = "flex-1 py-1.5 rounded-xl bg-teal-800 text-cyan-300 shadow transition";
  if (tab === 'aura' && tAu) tAu.className = "flex-1 py-1.5 rounded-xl bg-teal-800 text-cyan-300 shadow transition";
  renderShopEquips();
}

function renderShopEquips() {
  const container = document.getElementById('equipShopList');
  if (!container || typeof SHOP_EQUIP_DATA === 'undefined') return;
  container.innerHTML = '';

  const items = SHOP_EQUIP_DATA.filter(e => e.type === currentShopTab);
  items.forEach(eq => {
    const isUnlocked = userData.unlockedEquips.includes(eq.id);
    const isEquipped = (userData.equipped[eq.type] === eq.id);
    const isLevelLocked = Boolean(eq.reqLv && userData.level < eq.reqLv);
    const plusLv = userData.equipLevels[eq.id] || 0;
    const plusBadge = plusLv > 0 ? ` +${plusLv}` : '';

    if (eq.isSecret && !isUnlocked) return;

    const card = document.createElement('div');
    card.className = `p-3 rounded-2xl border flex flex-col justify-between ${
      eq.isSecret
        ? (isEquipped ? 'bg-amber-950 border-amber-400 shadow-xl glow-gold' : 'bg-gradient-to-br from-amber-950 to-slate-950 border-amber-500')
        : (isEquipped ? 'bg-teal-800 border-cyan-400 shadow-md' : 'bg-slate-950/85 border-teal-800')
    }`;

    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-[10px] font-bold ${eq.isSecret ? 'text-amber-300' : 'text-teal-300'} truncate">${eq.rank}</span>
          <span class="text-xl flex-shrink-0">${eq.icon}</span>
        </div>
        <div class="font-black text-xs md:text-sm text-white truncate">${eq.name}${plusBadge}</div>
        <div class="text-[10px] text-amber-300 mt-0.5 leading-tight">${eq.desc} (現在:+${getEquipBonusVal(eq).toLocaleString()})</div>
      </div>
      <div class="mt-2.5 pt-1.5 border-t border-teal-800/80">
        ${isEquipped ? `
          <button onclick="unequipItem('${eq.type}')" class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-1.5 rounded-xl text-xs transition">
            解除する
          </button>
        ` : (isUnlocked ? (
          isLevelLocked ? `
            <button onclick="equipItem('${eq.id}', '${eq.type}')" class="w-full bg-slate-950 border border-rose-600/70 text-rose-300 font-bold py-1.5 rounded-xl text-[11px]">
              🔒 Lv.${eq.reqLv}〜
            </button>
          ` : `
            <button onclick="equipItem('${eq.id}', '${eq.type}')" class="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-1.5 rounded-xl text-xs transition active:scale-95 shadow">
              装着する
            </button>
          `
        ) : (eq.price > 9000 ? `
          <span class="block w-full text-center text-[11px] text-amber-300 font-bold bg-amber-950/80 border border-amber-800/60 py-1.5 rounded-xl">
            神殿ボス限定
          </span>
        ` : `
          <button onclick="buyEquip('${eq.id}',${eq.price})" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-1.5 rounded-xl text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow">
            <span>💎 ${eq.price}</span> <span>交換</span>
          </button>
        `))}
      </div>
    `;
    container.appendChild(card);
  });
}

function equipItem(id, type) {
  const eq = SHOP_EQUIP_DATA.find(e => e.id === id);
  if (eq && eq.reqLv && userData.level < eq.reqLv) {
    showNoticeModal('🔒 レベル制限', eq.icon, `この神話レリックは【Lv.${eq.reqLv}】以上で装着可能です！（現在: Lv.${userData.level}）`);
    return;
  }
  userData.equipped[type] = id;
  playSE('levelup');
  saveData();
}

function unequipItem(type) {
  userData.equipped[type] = '';
  playSE('wrong');
  saveData();
}

function buyEquip(id, price) {
  if (userData.gems < price) {
    showNoticeModal('💎 クリスタル不足', '🛒', 'クリスタルが足りません！ミッションや遠征で集めよう！');
    return;
  }
  userData.gems -= price;
  if (!userData.unlockedEquips.includes(id)) userData.unlockedEquips.push(id);
  playSE('chest');
  saveData();
}

function buyItem(type, price) {
  if (userData.gems < price) {
    showNoticeModal('💎 クリスタル不足', '🛒', 'クリスタルが足りません！');
    return;
  }
  userData.gems -= price;
  if (type === 'hint') userData.inventory.hint += 1;
  if (type === 'loupe') userData.inventory.loupe += 1;
  if (type === 'potion') userData.inventory.potion += 1;
  playSE('chest');
  saveData();
}

// ==================== 13. エンディング演出 ＆ 画面遷移 ====================
function showEndingModal() {
  hideAllViews();
  playBGM('ending');

  const avatarObj = (typeof AVATARS !== 'undefined' && AVATARS.length > 0)
    ? ([...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0])
    : { emoji: '🤖', name: 'クロノビット' };

  const emojiEl = document.getElementById('endingHeroEmoji');
  const nameEl = document.getElementById('endingHeroName');
  if (emojiEl) emojiEl.innerText = avatarObj.emoji;
  if (nameEl) nameEl.innerText = avatarObj.name;

  const p1 = document.getElementById('endingPhase1');
  const p2 = document.getElementById('endingPhase2');
  const modal = document.getElementById('modalEnding');
  if (p1) p1.classList.remove('hidden');
  if (p2) p2.classList.add('hidden');
  if (modal) modal.classList.remove('hidden');
}

function triggerEndingTeaser() {
  const container = document.getElementById('endingContainer');
  if (container) container.classList.add('animate-shake');
  playSE('wrong');
  setTimeout(() => {
    if (container) container.classList.remove('animate-shake');
    const p1 = document.getElementById('endingPhase1');
    const p2 = document.getElementById('endingPhase2');
    if (p1) p1.classList.add('hidden');
    if (p2) p2.classList.remove('hidden');
  }, 900);
}

function finishEndingSequence() {
  const modal = document.getElementById('modalEnding');
  if (modal) modal.classList.add('hidden');
  saveData();
  showHome();
}

function showTrueEndingModal() {
  hideAllViews();
  playBGM('trueEnding');
  const acc = userData.totalAnswered > 0
    ? Math.round((userData.totalCorrect / userData.totalAnswered) * 100)
    : 100;
  showNoticeModal(
    '🌌 TRUE GRAND ENDING - 全知全能の時空神！',
    '👑',
    `最終第15章【全知の記録神・アカシックレコード】を討ち破り、英検3級の全領域（800語・120文法・長文・英作文・面接）を完全制覇しました！\n\n【時空殿堂マスター記録】\n・総解答数：${userData.totalAnswered}問\n・通算正解率：${acc}%\n・授与称号：【🌌 時空超越・全知神】\n\nエグゼクティブ・プロデューサー：鄭 聖也（パパ）`,
    () => showHome()
  );
}

function setNavigationVisibility(isVisible) {
  const headerEl = document.querySelector('header');
  const navEl = document.querySelector('nav');
  if (headerEl) headerEl.classList.toggle('hidden', !isVisible);
  if (navEl) navEl.classList.toggle('hidden', !isVisible);
  document.body.classList.toggle('pb-24', isVisible);
  document.body.classList.toggle('pb-4', !isVisible);
}

function hideAllViews() {
  if (recordedAudioUrl) {
    try { URL.revokeObjectURL(recordedAudioUrl); } catch (e) {}
    recordedAudioUrl = null;
  }
  [
    'viewHome', 'viewQuiz', 'viewResult', 'viewShop',
    'viewParent', 'viewBook', 'viewWeakBook',
    'modalBossSelect', 'modalNormalSelect', 'modalBossDialogue', 'quizFeedback'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  setNavigationVisibility(true);
}

function showHome() {
  stopBattleTimers();
  hideAllViews();
  const el = document.getElementById('viewHome');
  if (el) el.classList.remove('hidden');
  playBGM('home');
  updateNavHighlight('home');
}

function showShop() {
  stopBattleTimers();
  hideAllViews();
  const el = document.getElementById('viewShop');
  if (el) el.classList.remove('hidden');
  stopBGM();
  updateNavHighlight('shop');
  renderShopEquips();
}

function showParent() {
  stopBattleTimers();
  hideAllViews();
  const el = document.getElementById('viewParent');
  if (el) el.classList.remove('hidden');
  stopBGM();
  updateNavHighlight('parent');
}

function updateNavHighlight(active) {
  ['Home', 'Book', 'Weak', 'Shop', 'Parent'].forEach(name => {
    const btn = document.getElementById('nav' + name);
    if (btn) btn.className = "flex flex-col items-center gap-0.5 text-teal-400 hover:text-cyan-200";
  });
  const keyMap = { home: 'navHome', book: 'navBook', weak: 'navWeak', shop: 'navShop', parent: 'navParent' };
  const target = document.getElementById(keyMap[active]);
  if (target) target.className = "flex flex-col items-center gap-0.5 text-cyan-300 font-black";
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `eiken3_chrono_backup_${getTodayString()}.json`);
  dlAnchor.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported || typeof imported !== 'object') throw new Error('Invalid JSON');
      userData = {
        ...userData,
        ...imported,
        questRotation: { ...userData.questRotation, ...(imported.questRotation || {}) },
        guildRotation: { ...userData.guildRotation, ...(imported.guildRotation || {}) },
        dailyDone: { ...userData.dailyDone, ...(imported.dailyDone || {}) },
        inventory: { ...userData.inventory, ...(imported.inventory || {}) },
        equipped: { ...userData.equipped, ...(imported.equipped || {}) },
        weakStats: { ...userData.weakStats, ...(imported.weakStats || {}) },
        equipLevels: { ...userData.equipLevels, ...(imported.equipLevels || {}) }
      };
      sanitizeUserData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      updateUiState();
      showNoticeModal('復元完了', '📥', 'セーブデータの復元が完了しました！', () => location.reload());
    } catch (err) {
      showNoticeModal('エラー', '⚠️', '有効なバックアップファイルではありません。');
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

function resetAllProgress() {
  if (confirm('すべての学習記録、レベル、獲得クリスタルを初期化しますか？')) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    location.reload();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadData();
});

// タップのたびに AudioContext のスリープ解除と日付またぎ（デイリーミッション更新）を保証
document.addEventListener('pointerdown', () => {
  initAudio();
  if (userData.lastLoginDate !== getTodayString()) {
    checkDailyStreak();
    saveData();
  }
}, { passive: true });

// タブレットの画面オフ（スリープ）や別アプリ切り替え時のライフサイクル管理
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(bgmTimer);
    isDialogueSpeaking = false;
    clearTimeout(dialogueNextTimer);
    clearTimeout(speechInitTimerId);
    clearTimeout(speechTimeoutId);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (activeRecordedAudio) {
      try { activeRecordedAudio.pause(); } catch (e) {}
    }
    if (isMicListening) stopMicRecognition();
    if (actx && actx.state === 'running') {
      try { actx.suspend(); } catch (e) {}
    }
  } else {
    if (userData.lastLoginDate !== getTodayString()) {
      checkDailyStreak();
      saveData();
    }
    if (actx && actx.state === 'suspended') {
      try { actx.resume(); } catch (e) {}
    }
    const isQuizVisible = !document.getElementById('viewQuiz')?.classList.contains('hidden');
    const isResultVisible = !document.getElementById('viewResult')?.classList.contains('hidden');

    // バトル中の音声読み上げ待機中にスリープした場合、復帰時に制限時間タイマーが停止したままになるのを防止
    if (isQuizVisible && !isAnswered && !timerGaugeInterval && currentQueue.length > 0) {
      startCriticalTimer();
    }

    if (isBgmEnabled) {
      if (isQuizVisible) playBGM(isBossMode ? 'boss' : (isFeverMode ? 'fever' : 'battle'));
      else if (isResultVisible) playBGM('result');
      else playBGM('home');
    }
  }
});

// 長押し時のブラウザ標準コンテキストメニュー表示を封印（検索入力欄などは除外）
document.addEventListener('contextmenu', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  e.preventDefault();
});
