// ==========================================
// 英検3級 合格クエスト 〜新たなる冒険〜
// ゲーム進行・3級新バトル・音声エンジン (app.js)
// ==========================================

// ==================== 音声読み上げエンジン (Android安定化版) ====================
let voiceSpeed = 0.85;
let isDialogueSpeaking = false;
let dialogueNextTimer = null;
let activeUtterance = null; // Android Chrome GC（ガベージコレクション）対策
let speechTimeoutId = null;
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

function speakText(text, onCompleteCallback) {
  if (!('speechSynthesis' in window) || !text) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    clearTimeout(speechTimeoutId);

    // Android対策: cancel() 直後の speak() 無視を防ぐため80ms待機
    setTimeout(() => {
      const cleanText = String(text).replace(/<[^>]*>/g, ''); // ハイライト用HTMLタグを除去
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

      // 文字数に応じた動的タイムアウト（長文でも途中で切れない）
      const dynamicLimit = Math.max(5000, Math.round((cleanText.length * 110) / voiceSpeed) + 2500);
      speechTimeoutId = setTimeout(completeOnce, dynamicLimit);

      window.speechSynthesis.speak(uttr);
    }, 80);
  } catch (e) {
    console.error('Speech error', e);
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
      const uttr = new SpeechSynthesisUtterance(segment.text);
      activeUtterance = uttr;
      uttr.lang = 'en-US';
      uttr.rate = voiceSpeed;

      const bestVoice = getBestEnglishVoice();
      if (bestVoice) uttr.voice = bestVoice;

      if (segment.speaker === 'female') {
        uttr.pitch = 1.25;
      } else if (segment.speaker === 'male') {
        uttr.pitch = 0.82;
      } else {
        uttr.pitch = 1.0;
      }

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

      const segLimit = Math.max(4500, Math.round((segment.text.length * 110) / voiceSpeed) + 2000);
      speechTimeoutId = setTimeout(nextStep, segLimit);

      window.speechSynthesis.speak(uttr);
    }

    setTimeout(speakNextSegment, 80);
  } catch (e) {
    console.error('Dialogue speech error', e);
    isDialogueSpeaking = false;
    if (onCompleteCallback) onCompleteCallback();
  }
}

function speakVocabByIndex(idx) {
  if (typeof RAW_VOCAB_DATA !== 'undefined' && RAW_VOCAB_DATA[idx]) {
    speakText(RAW_VOCAB_DATA[idx][0]);
  }
}

// ==================== BGM & SE エンジン ====================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let actx = null;
let isBgmEnabled = false;
let bgmTimer = null;
let currentSequence = [];
let currentStep = 0;

// E6(1318.5Hz)を追加して真エンディングBGMの音欠けを修正
const noteFreq = {
  'G3': 196.0, 'A3': 220.0, 'B3': 246.9,
  'C4': 261.6, 'D4': 293.7, 'E4': 329.6, 'F4': 349.2, 'G4': 392.0, 'A4': 440.0, 'B4': 493.9,
  'C5': 523.3, 'D5': 587.3, 'E5': 659.3, 'G5': 784.0,
  'C6': 1046.5, 'E6': 1318.5
};

const BGM_DATA = {
  home: { seq: ['C4',null,'E4',null,'G4',null,'C5',null,'G4',null,'E4',null], speed: 280, type: 'triangle', vol: 0.03 },
  battle: { seq: ['A3','A3','C4','E4','D4','D4','F4','G4'], speed: 170, type: 'square', vol: 0.02 },
  boss: { seq: ['A3','C4','D4','F4','E4','D4','C4','B3'], speed: 140, type: 'sawtooth', vol: 0.025 },
  fever: { seq: ['C5','E5','G5','C6','E5','G5','C6','G5'], speed: 110, type: 'sawtooth', vol: 0.03 },
  result: { seq: ['C5','D5','E5','G5','C6','G5','E5','D5'], speed: 150, type: 'sine', vol: 0.04 },
  ending: { seq: ['C4','E4','G4','C5','E5','G5','C6','G5','E5','C5','G4','E4'], speed: 220, type: 'sine', vol: 0.04 },
  trueEnding: { seq: ['C4','G4','C5','E5','G5','C6','E6','C6','G5','E5','G4','C4'], speed: 160, type: 'triangle', vol: 0.045 }
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
      ? "bg-amber-500 border border-amber-400 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-black text-slate-950 transition shadow"
      : "bg-indigo-900 border border-indigo-600 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold text-slate-300 transition";
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
          gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + (track.speed / 1000) * 0.8);
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

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now); osc.stop(now + 0.35);
    } else if (type === 'critical') {
      osc.type = 'sawtooth';
      [523, 783, 1046, 1318, 1567].forEach((f, i) => {
        osc.frequency.setValueAtTime(f, now + i * 0.05);
      });
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
    } else if (type === 'slash') {
      osc.type = 'triangle';
      [440, 554, 659].forEach((f, i) => {
        osc.frequency.setValueAtTime(f, now + i * 0.04);
      });
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(196, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'levelup' || type === 'bonus' || type === 'chest') {
      osc.type = 'triangle';
      [523, 659, 783, 1046, 1318].forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      });
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start(now); osc.stop(now + 0.6);
    }
  } catch (e) {}
}

// ==================== カスタム通知モーダル (alert代替) ====================
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
    btn.onclick = () => {
      if (modal) modal.classList.add('hidden');
      if (onConfirm) onConfirm();
    };
  }
}

// ==================== ユーザーデータ管理 ====================
const STORAGE_KEY = 'eiken3_quest_data_v1';
let userData = {
  level: 1,
  exp: 0,
  gems: 30,
  streak: 1,
  bossTickets: 1,
  targetExamDate: '2027-01-24',
  lastLoginDate: getTodayString(),
  weakList: [],
  masteredList: [],
  weakStats: {}, // { [id]: { attempts: 0, cleared: 0, lastReviewed: timestamp } }
  vocabBook: [],
  bossUnlockedLevel: 1,
  bossClearedLevels: [],
  bossSeenIntros: [],
  hasSeenEnding: false,
  hasSeenTrueEnding: false,
  questRotation: { vocab: false, grammar: false, listening: false },
  dailyDone: { vocab: false, grammar: false, listening: false, allClaimed: false },
  inventory: { hint: 2, loupe: 2, potion: 1 },
  equipped: { hat: '', weapon: '', aura: '' },
  unlockedEquips: [],
  equipLevels: {}, // ガチャ重複強化 { [equipId]: +値 }
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

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function sanitizeUserData() {
  if (typeof userData.level !== 'number' || userData.level < 1 || isNaN(userData.level)) userData.level = 1;
  if (typeof userData.exp !== 'number' || isNaN(userData.exp)) userData.exp = 0;
  if (typeof userData.gems !== 'number' || isNaN(userData.gems)) userData.gems = 30;
  if (typeof userData.streak !== 'number' || isNaN(userData.streak)) userData.streak = 1;
  if (typeof userData.bossTickets !== 'number' || isNaN(userData.bossTickets)) userData.bossTickets = 1;
  if (!userData.targetExamDate) userData.targetExamDate = '2027-01-24';

  if (!Array.isArray(userData.weakList)) userData.weakList = [];
  if (!Array.isArray(userData.masteredList)) userData.masteredList = [];
  if (!userData.weakStats || typeof userData.weakStats !== 'object') userData.weakStats = {};
  if (!Array.isArray(userData.vocabBook)) userData.vocabBook = [];
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

  if (!userData.inventory || typeof userData.inventory !== 'object') userData.inventory = { hint: 2, loupe: 2, potion: 1 };
  userData.inventory.hint = Number(userData.inventory.hint) || 0;
  userData.inventory.loupe = Number(userData.inventory.loupe) || 0;
  userData.inventory.potion = Number(userData.inventory.potion) || 0;

  if (!userData.equipped || typeof userData.equipped !== 'object') userData.equipped = { hat: '', weapon: '', aura: '' };
  if (typeof userData.equipped.hat !== 'string') userData.equipped.hat = '';
  if (typeof userData.equipped.weapon !== 'string') userData.equipped.weapon = '';
  if (typeof userData.equipped.aura !== 'string') userData.equipped.aura = '';

  if (!userData.dailyDone || typeof userData.dailyDone !== 'object') {
    userData.dailyDone = { vocab: false, grammar: false, listening: false, allClaimed: false };
  }
  if (typeof userData.dailyDone.allClaimed !== 'boolean') userData.dailyDone.allClaimed = false;

  if (typeof userData.totalAnswered !== 'number' || isNaN(userData.totalAnswered)) userData.totalAnswered = 0;
  if (typeof userData.totalCorrect !== 'number' || isNaN(userData.totalCorrect)) userData.totalCorrect = 0;
  if (!userData.lastLoginDate) userData.lastLoginDate = getTodayString();
}

function normalizeMasterData() {
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
}

function loadData() {
  normalizeMasterData();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      userData = { ...userData, ...parsed };
      if (parsed.questRotation) userData.questRotation = { ...userData.questRotation, ...parsed.questRotation };
      if (parsed.dailyDone) userData.dailyDone = { ...userData.dailyDone, ...parsed.dailyDone };
      if (parsed.inventory) userData.inventory = { ...userData.inventory, ...parsed.inventory };
      if (parsed.equipped) userData.equipped = { ...userData.equipped, ...parsed.equipped };
      if (parsed.weakStats) userData.weakStats = { ...userData.weakStats, ...parsed.weakStats };
      if (parsed.equipLevels) userData.equipLevels = { ...userData.equipLevels, ...parsed.equipLevels };
    }
  } catch (e) {
    console.error('Data load error:', e);
  }
  sanitizeUserData();
  checkDailyStreak();
  if (typeof BOSS_STAGES !== 'undefined') {
    currentBossStage = BOSS_STAGES[0];
  }
  updateUiState();
}

function saveData() {
  sanitizeUserData();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (e) {
    console.error('Data save error:', e);
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
      if (diffDays === 1) {
        userData.streak += 1;
      } else if (diffDays > 1) {
        userData.streak = 1;
      }
      userData.lastLoginDate = today;
      userData.dailyDone = { vocab: false, grammar: false, listening: false, allClaimed: false };
    }
  } catch (e) {
    userData.lastLoginDate = getTodayString();
  }
}

function recordWeakStat(id, isCorrect) {
  if (!id) return;
  if (!userData.weakStats[id]) {
    userData.weakStats[id] = { attempts: 0, cleared: 0, lastReviewed: 0 };
  }
  userData.weakStats[id].attempts += 1;
  if (isCorrect) {
    userData.weakStats[id].cleared += 1;
  }
  userData.weakStats[id].lastReviewed = Date.now();
}

function getEquipBonusVal(equipObj) {
  if (!equipObj) return 0;
  const plusLv = userData.equipLevels[equipObj.id] || 0;
  // +1ごとに基本性能が15%ずつ上昇
  return Math.round(equipObj.val * (1 + plusLv * 0.15));
}

function calculatePlayerStats() {
  const baseAtk = 30 + (userData.level * 7);
  const baseHp = 140 + (userData.level * 18);
  const baseSpd = 6 + Math.floor(userData.level * 0.9);

  const eqHat = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.hat) : null;
  const eqWp = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.weapon) : null;
  const eqAura = (typeof SHOP_EQUIP_DATA !== 'undefined') ? SHOP_EQUIP_DATA.find(e => e.id === userData.equipped.aura) : null;

  const totalHp = Math.round(baseHp + getEquipBonusVal(eqHat));
  const totalAtk = Math.round(baseAtk + getEquipBonusVal(eqWp));
  const totalSpd = Math.round(baseSpd + getEquipBonusVal(eqAura));

  return { hp: totalHp, atk: totalAtk, spd: totalSpd };
}

function getExpNeededForLevel(lv) {
  return Math.round(120 + (lv * 45));
}

function addExp(amount, onAfterLevelUp) {
  userData.exp += amount;
  let needed = getExpNeededForLevel(userData.level);
  let leveledUp = false;
  while (userData.exp >= needed && userData.level < 100) {
    userData.exp -= needed;
    userData.level += 1;
    needed = getExpNeededForLevel(userData.level);
    leveledUp = true;
  }
  saveData();
  if (leveledUp) {
    playSE('levelup');
    const currentAvatar = (typeof AVATARS !== 'undefined')
      ? ([...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0])
      : { name: "タマゴン", rank: "見習いヒナ", emoji: "🐣" };
    showNoticeModal(
      `🎉 レベルアップ！ Lv.${userData.level}`,
      currentAvatar.emoji,
      `レベルが Lv.${userData.level} に上がりました！\n現在のランク：【${currentAvatar.rank}】${currentAvatar.name}\n攻撃力とHPが強化されました！`,
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
  setText('bossCurrentProgressBadge', `Lv.${userData.bossUnlockedLevel} 解放中`);

  setText('weakTabActiveCount', userData.weakList.length);
  setText('weakTabMasteredCount', userData.masteredList.length);
  setText('weakBookCountBadge', currentWeakTab === 'active' ? `${userData.weakList.length}問 克服中` : `${userData.masteredList.length}問 殿堂入り`);

  const stats = calculatePlayerStats();
  setText('statAtkVal', stats.atk);
  setText('statHpVal', stats.hp);
  setText('statSpdVal', stats.spd);

  const needed = getExpNeededForLevel(userData.level);
  const pct = Math.min(100, Math.round((userData.exp / needed) * 100));
  const expBar = document.getElementById('expBar');
  if (expBar) expBar.style.width = `${pct}%`;
  setText('expText', `${userData.exp} / ${needed}`);

  if (typeof AVATARS !== 'undefined') {
    const currentAvatar = [...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0];
    setText('heroAvatar', currentAvatar.emoji);
    if (userData.hasSeenTrueEnding) {
      setText('heroRank', '🌌 3級完全制覇神');
      setText('heroName', `${currentAvatar.name} (極)`);
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

  // 試験日カウントダウン
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
    setText('countdownDays', '-- 日');
  }

  // 忘却曲線ゲリラバトルの出現判定（殿堂入りが3問以上ある場合に出現）
  const guerrillaBanner = document.getElementById('guerrillaBossBanner');
  if (guerrillaBanner) {
    if (userData.masteredList.length >= 3) {
      guerrillaBanner.classList.remove('hidden');
    } else {
      guerrillaBanner.classList.add('hidden');
    }
  }

  // デイリークエスト進捗
  let doneCount = 0;
  if (userData.dailyDone.vocab) doneCount++;
  if (userData.dailyDone.grammar) doneCount++;
  if (userData.dailyDone.listening) doneCount++;
  setText('dailyProgressText', `${doneCount} / 3 完了`);

  const renderDailyBtn = (elId, isDone, type, count) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = isDone
      ? `<span class="w-full text-center bg-slate-900 text-emerald-400 font-black px-3 py-1.5 rounded-xl text-xs border border-emerald-600 whitespace-nowrap">✓ クリア済</span>`
      : `<button onclick="startDailyQuest('${type}', ${count})" class="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow transition active:scale-95 whitespace-nowrap">挑戦 ⚔️</button>`;
  };

  renderDailyBtn('questActionVocab', userData.dailyDone.vocab, 'vocab', 5);
  renderDailyBtn('questActionGrammar', userData.dailyDone.grammar, 'grammar', 3);
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

  // 特訓ローテーション
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
      badge.innerText = "✓ 済";
      badge.className = "text-[10px] font-bold bg-slate-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-600";
      btn.classList.add('opacity-65');
    } else {
      badge.innerText = "未挑戦";
      badge.className = "text-[10px] font-bold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded border border-indigo-600";
      btn.classList.remove('opacity-65');
    }
  };

  updateRotBtn('btnRotVocab', 'badgeRotVocab', userData.questRotation.vocab);
  updateRotBtn('btnRotGrammar', 'badgeRotGrammar', userData.questRotation.grammar);
  updateRotBtn('btnRotListening', 'badgeRotListening', userData.questRotation.listening);

  const btnWeak = document.getElementById('btnRotWeakBattle');
  const badgeWeak = document.getElementById('badgeRotWeak');
  if (btnWeak && badgeWeak) {
    if (rotCount === 3) {
      btnWeak.classList.remove('opacity-60');
      btnWeak.classList.add('glow-red');
      badgeWeak.innerText = "🔥 挑戦可能";
      badgeWeak.className = "text-[10px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded animate-pulse";
    } else {
      btnWeak.classList.add('opacity-60');
      btnWeak.classList.remove('glow-red');
      badgeWeak.innerText = `🔒 あと${3 - rotCount}`;
      badgeWeak.className = "text-[10px] font-bold bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800";
    }
  }

  setText('statTotalAnswers', `${userData.totalAnswered}問`);
  const acc = userData.totalAnswered > 0 ? Math.round((userData.totalCorrect / userData.totalAnswered) * 100) : 0;
  setText('statAccuracy', `(${acc}%)`);

  let passRate = 'データ収集中（15問〜）';
  if (userData.totalAnswered >= 15) {
    if (acc >= 75) passRate = '💮 3級合格圏内 (S判定)';
    else if (acc >= 65) passRate = '✨ 合格可能性大 (A判定)';
    else if (acc >= 50) passRate = '📈 あと一歩 (B判定)';
    else passRate = '🔥 基礎固め中 (C判定)';
  }
  setText('statPassRate', passRate);

  renderShopEquips();
}

function claimDailyAllBonus() {
  initAudio();
  if (userData.dailyDone.allClaimed) return;
  userData.dailyDone.allClaimed = true;
  const bonusGems = 60;
  const bonusExp = 300;
  userData.gems += bonusGems;
  userData.bossTickets = (userData.bossTickets || 0) + 1;

  playSE('bonus');
  addExp(bonusExp, () => {
    showNoticeModal(
      '🎁 3大デイリー完全制覇！',
      '🎉',
      `【コンプリート報酬】\n💎 ダイヤ +${bonusGems}個\n✨ 経験値 +${bonusExp} EXP\n🎫 ボス挑戦チケット +1枚\n\n毎日コツコツ続けられる君は本物の勇者だ！`
    );
  });
}

// ==================== クイズデータ検索・生成エンジン ====================
function generateVocabQuiz(item) {
  const word = item[0];
  const correctMeaning = item[1];
  const otherMeanings = RAW_VOCAB_DATA.filter(x => x[1] !== correctMeaning).map(x => x[1]);
  const wrongThree = shuffleArray(otherMeanings).slice(0, 3);
  const options = shuffleArray([correctMeaning, ...wrongThree]);
  return {
    id: 'v_' + word,
    rawWord: word,
    type: 'vocab',
    q: word,
    sub: '📖 正しい日本語の意味を選ぼう',
    options: options,
    ans: options.indexOf(correctMeaning),
    explain: `【${word}】の意味は「${correctMeaning}」です。`,
    audio_question: word,
    audio_complete: word
  };
}

function generateGrammarQuiz(item) {
  const correctOption = item.opt[item.ans];
  const shuffledOptions = shuffleArray(item.opt);
  const newAnsIndex = shuffledOptions.indexOf(correctOption);
  const questionAudioText = item.q.replace(/\([^)]*\)/g, ' , ');
  const completeSentence = item.q.replace(/\([^)]*\)/g, correctOption);

  return {
    id: item.id,
    type: 'grammar',
    q: item.q,
    sub: item.sub || '🪄 空欄に入る正しい英語を選ぼう',
    options: shuffledOptions,
    ans: newAnsIndex,
    explain: (item.exp || item.explain || '') + `\n\n【完成文】\n${completeSentence}`,
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
    passageTitle: item.passageTitle || '📜 3級 長文パッセージ',
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
  if (!id) return null;
  if (id.startsWith('v_')) {
    const word = id.replace('v_', '');
    const found = (typeof RAW_VOCAB_DATA !== 'undefined') ? RAW_VOCAB_DATA.find(x => x[0] === word) : null;
    if (found) return generateVocabQuiz(found);
  } else if (id.startsWith('g_')) {
    const found = (typeof RAW_GRAMMAR_DATA !== 'undefined') ? RAW_GRAMMAR_DATA.find(x => x.id === id) : null;
    if (found) return generateGrammarQuiz(found);
  } else if (id.startsWith('l_')) {
    const found = (typeof RAW_LISTENING_DATA !== 'undefined') ? RAW_LISTENING_DATA.find(x => x.id === id) : null;
    if (found) return generateListeningQuiz(found);
  } else if (id.startsWith('r_') && typeof RAW_READING_DATA !== 'undefined') {
    const found = RAW_READING_DATA.find(x => x.id === id);
    if (found) return generateReadingQuiz(found);
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

// ==================== 通常クエスト ＆ 忘却ゲリラ ＆ にがて討伐 ====================
function openNormalQuestSelect(type) {
  initAudio();
  stopBattleTimers();
  if (userData.questRotation[type]) {
    showNoticeModal(
      '✓ クリア済みの分野です',
      '⚔️',
      'この分野は現在のサイクルで既にクリア済みです！\n残りの分野をクリアして「にがて討伐」を突破すると、🎫ボスチケットが手に入り全分野に再挑戦できます！'
    );
    return;
  }
  selectedNormalType = type;
  const modal = document.getElementById('modalNormalSelect');
  const titleEl = document.getElementById('normalSelectTitle');
  if (titleEl) {
    if (type === 'vocab') titleEl.innerText = "📚 3級単語・熟語 難易度選択 (10問)";
    if (type === 'grammar') titleEl.innerText = "🪄 3級文法・会話 難易度選択 (5問)";
    if (type === 'listening') titleEl.innerText = "🎧 3級リスニング 難易度選択 (3問)";
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
  const count = (selectedNormalType === 'vocab') ? 10 : (selectedNormalType === 'grammar' ? 5 : 3);
  startSessionInternal(selectedNormalType, count);
}

function startDailyQuest(type, count) {
  if (userData.dailyDone[type]) {
    showNoticeModal('✓ 本日クリア済み', '📜', '本日のこのデイリークエストはクリア済みです！基礎特訓や3級スペシャル訓練所に挑戦しよう！');
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
    const selectedItems = shuffleArray(RAW_VOCAB_DATA).slice(0, count);
    currentQueue = selectedItems.map(item => generateVocabQuiz(item));
  } else if (type === 'grammar') {
    const selected = shuffleArray(RAW_GRAMMAR_DATA).slice(0, count);
    currentQueue = selected.map(item => generateGrammarQuiz(item));
  } else if (type === 'listening') {
    const selected = shuffleArray(RAW_LISTENING_DATA).slice(0, count);
    currentQueue = selected.map(item => generateListeningQuiz(item));
  }
  startSession();
}

function startSingleWeakQuiz(id) {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
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
      '🔒 ロック中',
      '👾',
      `単語・文法・リスニングの3分野をすべて1回ずつクリアすると「にがて討伐バトル」に挑戦できます！（あと ${3 - rotCount} 分野）`
    );
    return;
  }

  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'weakBattle';

  currentQueue = [];
  if (userData.weakList.length > 0) {
    shuffleArray(userData.weakList).slice(0, 5).forEach(id => {
      const q = getQuizDataById(id);
      if (q) currentQueue.push(q);
    });
  }
  if (currentQueue.length < 5 && userData.masteredList.length > 0) {
    shuffleArray(userData.masteredList).slice(0, 5 - currentQueue.length).forEach(id => {
      const q = getQuizDataById(id);
      if (q) currentQueue.push(q);
    });
  }
  while (currentQueue.length < 5 && typeof RAW_GRAMMAR_DATA !== 'undefined') {
    const randItem = RAW_GRAMMAR_DATA[Math.floor(Math.random() * RAW_GRAMMAR_DATA.length)];
    currentQueue.push(generateGrammarQuiz(randItem));
  }
  currentQueue = shuffleArray(currentQueue);
  startSession();
}

// 忘却曲線ゲリラバトル（殿堂入り問題からランダム5問出題・ダイヤ2倍）
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
  shuffleArray(userData.masteredList).slice(0, 5).forEach(id => {
    const q = getQuizDataById(id);
    if (q) currentQueue.push(q);
  });
  while (currentQueue.length < 5 && typeof RAW_VOCAB_DATA !== 'undefined') {
    const randV = RAW_VOCAB_DATA[Math.floor(Math.random() * RAW_VOCAB_DATA.length)];
    currentQueue.push(generateVocabQuiz(randV));
  }
  startSession();
}

// ==================== 🌟 英検3級 4大スペシャル訓練所 ====================

// ① 📜 長文読解ダンジョン（古文書解読）
function startReadingDungeon() {
  initAudio();
  stopBattleTimers();
  normalizeMasterData();
  if (typeof RAW_READING_DATA === 'undefined' || RAW_READING_DATA.length === 0) {
    showNoticeModal('準備中', '📜', '長文読解データ（data_exam.js）が見つかりません。');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'reading';

  const selected = shuffleArray(RAW_READING_DATA).slice(0, 3);
  currentQueue = selected.map(item => generateReadingQuiz(item));
  startSession();
}

function useReadingLoupe() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  if (!q || !q.passage || !q.highlightSentence) {
    showNoticeModal('ルーペ不要', '🔍', 'この問題では真実のルーペは使えません。');
    return;
  }
  if (userData.inventory.loupe <= 0) {
    showNoticeModal('ルーペ切れ', '🔍', '「真実のルーペ」がありません！ショップで購入できます。');
    return;
  }
  userData.inventory.loupe--;
  updateUiState();

  const passageEl = document.getElementById('readingPassageText');
  if (passageEl && q.passage.includes(q.highlightSentence)) {
    const highlighted = q.passage.replace(
      q.highlightSentence,
      `<mark class="bg-amber-400 text-slate-950 font-black px-1 rounded shadow">${q.highlightSentence}</mark>`
    );
    passageEl.innerHTML = highlighted;
    playSE('chest');
  }
}

// ② ✍️ ライティング魔導書クラフト（語順整序パズル）
let writingSelectedWords = [];
let writingPoolWords = [];

function startWritingCraft() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_WRITING_DATA === 'undefined' || RAW_WRITING_DATA.length === 0) {
    showNoticeModal('準備中', '✍️', 'ライティングデータ（data_exam.js）が見つかりません。');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'writing';

  const selected = shuffleArray(RAW_WRITING_DATA).slice(0, 3);
  currentQueue = selected.map(item => ({
    id: item.id,
    type: 'writing',
    q: item.q,
    sub: item.sub || '✍️ 質問に対する英作文（理由・返信）を組み立てよう',
    words: item.words, // 正しい語順の配列
    explain: item.explain,
    audio_question: item.audio_question || item.words.join(' '),
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
    slotEl.innerHTML = `<span class="text-xs text-slate-500">下の魔石（単語）を順番にタップして英文を作ろう...</span>`;
  } else {
    writingSelectedWords.forEach((item, idx) => {
      const chip = document.createElement('button');
      chip.className = "bg-cyan-500 text-slate-950 font-black px-2.5 py-1 rounded-xl text-xs md:text-sm shadow transition active:scale-95";
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
      : "bg-indigo-900 hover:bg-indigo-800 text-cyan-200 border border-cyan-500/60 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black shadow transition active:scale-95";
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
  const isCorrect = (userSentence === targetSentence);
  processAnswerResult(isCorrect, q);
}

// ③ 🎙️ スピーキング召喚バトル（二次面接・Web Speech Recognition）
let recognitionInstance = null;

function startSpeakingBattle() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_SPEAKING_DATA === 'undefined' || RAW_SPEAKING_DATA.length === 0) {
    showNoticeModal('準備中', '🎙️', 'スピーキング面接データ（data_exam.js）が見つかりません。');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'speaking';

  const selected = shuffleArray(RAW_SPEAKING_DATA).slice(0, 3);
  currentQueue = selected.map(item => ({
    id: item.id,
    type: 'speaking',
    passageTitle: item.passageTitle || '🎙️ 二次面接カード',
    passage: item.passage || null,
    q: item.q,
    sub: item.sub || '🎙️ 面接官の質問に声に出して答えよう！',
    targetText: item.targetText,
    keywords: item.keywords || [],
    explain: item.explain,
    audio_question: item.q,
    audio_complete: item.targetText
  }));
  startSession();
}

function setupSpeakingUI(q) {
  const targetBox = document.getElementById('speakingTargetBox');
  const recText = document.getElementById('speakingRecognizedText');
  const btnMic = document.getElementById('btnStartMic');
  if (targetBox) targetBox.innerText = `【お手本詠唱】\n${q.targetText}`;
  if (recText) {
    recText.innerText = '🎙️「声に出して詠唱開始！」を押して英語を話そう！';
    recText.className = "min-h-[40px] bg-slate-950/70 p-2 rounded-xl border border-indigo-800 text-xs md:text-sm text-emerald-300 font-bold flex items-center justify-center";
  }
  if (btnMic) {
    btnMic.disabled = false;
    btnMic.innerHTML = `<span class="text-lg">🎙️</span> <span>声に出して詠唱開始！</span>`;
  }
}

function startSpeechRecognition() {
  if (isAnswered) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recText = document.getElementById('speakingRecognizedText');
  const btnMic = document.getElementById('btnStartMic');
  const q = currentQueue[currentIndex];

  if (!SpeechRecognition) {
    if (recText) recText.innerText = '⚠️ このブラウザは音声認識非対応です。右の「声に出して読めた！」ボタンで進もう！';
    return;
  }

  try {
    if (recognitionInstance) recognitionInstance.abort();
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;

    if (recText) recText.innerText = '👂 聞き取り中... 英語を声に出して読んでみよう！';
    if (btnMic) btnMic.innerHTML = `<span class="animate-ping">🔴</span> <span>聞き取り中...</span>`;

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript || '';
      if (recText) recText.innerText = `🗣️ 認識結果: "${transcript}"`;

      const cleanTranscript = transcript.toLowerCase();
      const matched = q.keywords.some(kw => cleanTranscript.includes(kw.toLowerCase())) || cleanTranscript.length >= 5;

      if (matched) {
        processAnswerResult(true, q);
      } else {
        if (recText) recText.innerText = `🗣️ "${transcript}" ➔ もう一度はっきり読むか、右の手動クリアボタンを押してね！`;
        if (btnMic) btnMic.innerHTML = `<span class="text-lg">🎙️</span> <span>もう一度詠唱する</span>`;
      }
    };

    recognitionInstance.onerror = () => {
      if (recText) recText.innerText = '💡 マイクが聞き取れませんでした。もう一度押すか「声に出して読めた！」で進もう！';
      if (btnMic) btnMic.innerHTML = `<span class="text-lg">🎙️</span> <span>もう一度詠唱する</span>`;
    };

    recognitionInstance.start();
  } catch (e) {
    if (recText) recText.innerText = '💡 右の「声に出して読めた！」ボタンを押して攻撃しよう！';
  }
}

function completeSpeakingSelfCheck() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  processAnswerResult(true, q);
}

// ④ ⚡ 不規則動詞トリニティ・スラッシュ（原形-過去形-過去分詞 3連撃）
let trinityCurrentStep = 0;

function startTrinitySlash() {
  initAudio();
  stopBattleTimers();
  if (typeof RAW_IRREGULAR_VERBS === 'undefined' || RAW_IRREGULAR_VERBS.length === 0) {
    showNoticeModal('準備中', '⚡', '不規則動詞データ（data.js）が見つかりません。');
    return;
  }
  isBossMode = false;
  isDailyCurrentSession = false;
  isFeverMode = false;
  currentMode = 'trinity';

  const selected = shuffleArray(RAW_IRREGULAR_VERBS).slice(0, 5);
  currentQueue = selected.map((item, idx) => ({
    id: `tri_${idx}_${item.base}`,
    type: 'trinity',
    q: `「${item.meaning}」の3変化を順番に斬れ！`,
    sub: '⚡ ①原形 ➔ ②過去形 ➔ ③過去分詞 の順にタップ！',
    forms: [item.base, item.past, item.pp],
    pool: shuffleArray([item.base, item.past, item.pp, ...(item.dummies || ['played', 'went', 'gone']).slice(0, 3)]),
    explain: `【${item.meaning}】の活用は\n① 原形: ${item.base}\n② 過去形: ${item.past}\n③ 過去分詞: ${item.pp}`,
    audio_question: item.base,
    audio_complete: `${item.base}, ${item.past}, ${item.pp}`
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
      slot.className = "p-1.5 rounded-xl bg-indigo-950/60 text-slate-400 border border-indigo-800";
    }
  }
  const badge = document.getElementById('trinityStepBadge');
  if (badge) badge.innerText = '1撃目：原形';

  const grid = document.getElementById('trinityOptionsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  q.pool.forEach(word => {
    const btn = document.createElement('button');
    btn.className = "bg-indigo-900 hover:bg-indigo-800 border-2 border-emerald-500/60 text-white font-black py-2.5 px-2 rounded-2xl text-xs md:text-sm shadow transition active:scale-95";
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
      slot.className = "p-1.5 rounded-xl bg-emerald-600 text-slate-950 font-black border border-emerald-300 shadow";
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

// ==================== ボス選択 & バトル開始 ====================
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
    if (stage.isSecret && !userData.bossClearedLevels.includes(10)) return;

    const isUnlocked = (stage.lv <= userData.bossUnlockedLevel);
    const isCleared = userData.bossClearedLevels.includes(stage.lv);

    const card = document.createElement('div');
    card.className = `p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition ${
      stage.isSecret
        ? 'bg-gradient-to-r from-purple-950 via-black to-red-950 border-purple-500 shadow-xl glow-red'
        : (isUnlocked
            ? (isCleared ? 'bg-indigo-900/90 border-amber-400/80 shadow' : 'bg-gradient-to-r from-red-950 to-indigo-950 border-red-500/80 shadow-md')
            : 'bg-slate-900/60 border-indigo-900 opacity-60')
    }`;

    if (isUnlocked) {
      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-3xl flex-shrink-0">${stage.icon}</span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-xs md:text-sm font-black ${stage.isSecret ? 'text-purple-300' : 'text-amber-300'} truncate">Lv.${stage.lv} ${stage.name}</span>
              ${isCleared ? `<span class="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">討伐済</span>` : `<span class="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded">TARGET</span>`}
            </div>
            <div class="text-[11px] text-slate-300 leading-tight truncate mt-0.5">${stage.desc}</div>
            <div class="text-[11px] font-bold text-rose-300 mt-1">
              HP: <span class="text-white">${stage.hp.toLocaleString()}</span> / 攻: <span class="text-white">${stage.atk}</span>
              <span class="text-emerald-400 ml-1.5">+${stage.exp}EXP / 💎+${stage.gems}</span>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <button onclick="startBossBattleWithStage(${stage.lv})" class="bg-gradient-to-r from-red-500 to-amber-500 hover:brightness-110 text-white font-black px-3 py-2 rounded-xl text-xs shadow transition active:scale-95 flex items-center gap-1">
            <span>出撃</span> <span class="text-[10px] bg-red-950/80 border border-red-400 px-1.5 py-0.5 rounded">🎫1</span>
          </button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <span class="text-3xl flex-shrink-0 opacity-50">❓</span>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-black text-slate-400">Lv.${stage.lv} ？？？？</div>
            <div class="text-[11px] text-indigo-400 mt-0.5">Lv.${stage.lv - 1} 撃破で解放！</div>
          </div>
        </div>
        <span class="text-xs bg-slate-950 border border-indigo-800 text-indigo-400 font-bold px-2.5 py-1 rounded-xl">🔒 封印</span>
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

function startBossBattleWithStage(lv) {
  if (!userData.bossTickets || userData.bossTickets <= 0) {
    showNoticeModal(
      '🎫 チケット不足',
      '🔒',
      '【ボス挑戦チケット】がありません！\n基礎特訓サイクル（単語・文法・リスニング ➔ にがて討伐）またはデイリークエスト全制覇でチケットを手に入れよう！'
    );
    return;
  }

  userData.bossTickets -= 1;
  saveData();
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

  const shuffledPastExams = shuffleArray(ACTUAL_PAST_EXAM_DATA).slice(0, 10);
  currentQueue = shuffledPastExams.map(item => getQuizDataById(item.id)).filter(Boolean);

  if (!userData.bossSeenIntros.includes(stage.lv) && stage.introMsg) {
    userData.bossSeenIntros.push(stage.lv);
    saveData();
    showBossDialogueModal(`【Lv.${stage.lv} ${stage.name}】出現！`, stage.icon, stage.introMsg, () => {
      startSession();
    });
  } else {
    startSession();
  }
}

// ==================== バトルセッション共通制御 ====================
let currentQueue = [];
let currentIndex = 0;
let currentMode = '';
let quizScore = 0;
let answeredQuestionsCount = 0;
let combo = 0;
let maxCombo = 0;
let isAnswered = false;

let playerMaxHp = 100;
let playerCurHp = 100;
let enemyMaxHp = 100;
let enemyCurHp = 100;
let enemyAtk = 20;
let questionStartTime = 0;
let criticalLimitDuration = 4000;
let timerGaugeInterval = null;

const MONSTERS = ['👹', '👾', '🐉', '🎃', '🐺', '🦇'];

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
  clearTimeout(speechTimeoutId);
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (recognitionInstance) {
    try { recognitionInstance.abort(); } catch (e) {}
  }
}

function startSession() {
  currentIndex = 0;
  quizScore = 0;
  answeredQuestionsCount = 0;
  combo = 0;
  maxCombo = 0;
  isFeverMode = false;

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
    enemyMaxHp = Math.round(pStats.atk * qLen * 1.15);
    enemyCurHp = enemyMaxHp;
    enemyAtk = Math.max(25, Math.round(playerMaxHp * 0.32));
  } else {
    const diffMultipliers = [
      { reqAtk: 60, atk: 18 },
      { reqAtk: 400, atk: 60 },
      { reqAtk: 1400, atk: 150 },
      { reqAtk: 3500, atk: 350 }
    ];
    const diff = diffMultipliers[selectedNormalDiffLevel - 1] || diffMultipliers[0];
    enemyMaxHp = Math.round(diff.reqAtk * qLen);
    enemyAtk = diff.atk;
    enemyCurHp = enemyMaxHp;
  }

  hideAllViews();
  document.getElementById('viewQuiz').classList.remove('hidden');

  const enemyBox = document.getElementById('enemyCardBox');
  const enemyNameEl = document.getElementById('battleEnemyName');

  if (isBossMode) {
    playBGM('boss');
    enemyBox.className = currentBossStage.isSecret
      ? "bg-gradient-to-b from-purple-950 via-black to-red-950 border-2 border-purple-500 rounded-3xl p-4 shadow-2xl relative glow-red overflow-hidden"
      : "bg-gradient-to-b from-red-950 via-purple-950 to-slate-950 border-2 border-red-500 rounded-3xl p-4 shadow-2xl relative glow-red overflow-hidden";
    enemyNameEl.innerText = `Lv.${currentBossStage.lv} ${currentBossStage.name}`;
  } else {
    playBGM('battle');
    enemyBox.className = "bg-gradient-to-b from-indigo-900 to-slate-950 border-2 border-indigo-700 rounded-3xl p-4 shadow-2xl relative overflow-hidden";
    const modeNames = {
      weakBattle: '👾 にがてマスター',
      weakRetry: '👾 にがてモンスター',
      guerrilla: '⚡ 忘却の復習モンスター',
      reading: '📜 古文書のガーディアン',
      writing: '✍️ 魔導書ゴーレム',
      speaking: '🎙️ 音霊のスフィンクス',
      trinity: '⚡ 三連剣のナイト'
    };
    enemyNameEl.innerText = modeNames[currentMode] || '3級モンスター';
  }

  const avatarObj = (typeof AVATARS !== 'undefined')
    ? ([...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0])
    : { name: 'タマゴン' };
  document.getElementById('battleHeroName').innerText = avatarObj.name;
  updateBattleHpUi();
  renderQuestion();
}

function updateBattleHpUi() {
  const heroPct = Math.max(0, Math.min(100, Math.round((playerCurHp / playerMaxHp) * 100)));
  const enemyPct = Math.max(0, Math.min(100, Math.round((enemyCurHp / enemyMaxHp) * 100)));
  document.getElementById('battleHeroHpBar').style.width = `${heroPct}%`;
  document.getElementById('battleHeroHpText').innerText = `${playerCurHp}/${playerMaxHp}`;
  document.getElementById('battleEnemyHpBar').style.width = `${enemyPct}%`;
  document.getElementById('battleEnemyHpText').innerText = `${enemyCurHp}/${enemyMaxHp}`;
}

function startCriticalTimer() {
  questionStartTime = Date.now();
  const q = currentQueue[currentIndex];
  const pStats = calculatePlayerStats();

  let baseDuration = 4000;
  if (q.type === 'vocab') baseDuration = 3500;
  else if (q.type === 'grammar') baseDuration = 5500;
  else if (q.type === 'listening') baseDuration = 5000;
  else if (q.type === 'reading') baseDuration = 18000;
  else if (q.type === 'writing' || q.type === 'speaking' || q.type === 'trinity') baseDuration = 15000;

  const spdBonusMs = Math.min(4000, pStats.spd * 10);
  criticalLimitDuration = baseDuration + spdBonusMs;

  const gauge = document.getElementById('timerGauge');
  const timerText = document.getElementById('timerText');
  if (gauge) gauge.style.width = '100%';
  if (timerText) {
    const secStr = (criticalLimitDuration / 1000).toFixed(1);
    timerText.innerText = `⚡ ${secStr}秒以内クリアで会心ボーナス！`;
  }

  if (timerGaugeInterval) clearInterval(timerGaugeInterval);
  timerGaugeInterval = setInterval(() => {
    const elapsed = Date.now() - questionStartTime;
    const remainPct = Math.max(0, 100 - (elapsed / criticalLimitDuration) * 100);
    if (gauge) gauge.style.width = `${remainPct}%`;
    if (remainPct <= 0) {
      clearInterval(timerGaugeInterval);
      timerGaugeInterval = null;
      if (timerText) timerText.innerText = '⏱️ じっくり考えて答えよう';
    }
  }, 60);
}

function renderQuestion() {
  isAnswered = false;
  stopBattleTimers();

  const q = currentQueue[currentIndex];
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('quizProgress').innerText = `第 ${currentIndex + 1} / ${currentQueue.length} 問`;
  document.getElementById('comboCounter').innerText = `🔥 ${combo} 連続`;

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

  // 長文パッセージ表示切替
  const passageBox = document.getElementById('readingPassageBox');
  const btnLoupe = document.getElementById('btnUseLoupe');
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

  // バトルモード別UIパネルの切替
  const optContainer = document.getElementById('quizOptions');
  const writingBox = document.getElementById('writingCraftBox');
  const speakingBox = document.getElementById('speakingBattleBox');
  const trinityBox = document.getElementById('trinitySlashBox');
  const btnHint = document.getElementById('btnUseHint');

  optContainer.classList.add('hidden');
  writingBox.classList.add('hidden');
  speakingBox.classList.add('hidden');
  trinityBox.classList.add('hidden');
  if (btnHint) btnHint.classList.add('hidden');

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
      btn.className = "w-full bg-indigo-950/90 hover:bg-indigo-800 border-2 border-indigo-700 hover:border-amber-400 p-3 md:p-3.5 rounded-2xl text-xs md:text-sm font-bold text-slate-100 text-left transition active:scale-98 flex items-center justify-between gap-2 shadow";
      btn.innerHTML = `<span class="flex-1 min-w-0 break-words leading-snug"><strong class="text-amber-400 mr-2">${idx + 1}.</strong>${opt}</span> <span class="text-xs opacity-50 flex-shrink-0">⚔️</span>`;
      btn.onclick = () => handleAnswer(idx);
      optContainer.appendChild(btn);
    });
  }

  // 音声再生＆タイマー開始
  const audioBtnContainer = document.getElementById('audioBtnContainer');
  const timerText = document.getElementById('timerText');

  if (q.type === 'listening' && q.dialogue) {
    audioBtnContainer.classList.remove('hidden');
    if (timerText) timerText.innerText = '🎧 対話音声を再生中...';
    playDialogueSpeech(q.dialogue, () => startCriticalTimer());
  } else if (!isBossMode && q.audio_question) {
    audioBtnContainer.classList.remove('hidden');
    if (timerText) timerText.innerText = '🗣️ 英文を読み上げ中...';
    speakText(q.audio_question, () => startCriticalTimer());
  } else {
    audioBtnContainer.classList.add('hidden');
    startCriticalTimer();
  }
}

function playCurrentAudio() {
  const q = currentQueue[currentIndex];
  if (!q) return;
  if (isAnswered && q.audio_complete) speakText(q.audio_complete);
  else if (q.type === 'listening' && q.dialogue) playDialogueSpeech(q.dialogue);
  else if (q.audio_question) speakText(q.audio_question);
}

function use5050Hint() {
  if (isAnswered) return;
  const q = currentQueue[currentIndex];
  if (!q || !q.options) return;

  if (userData.inventory.hint <= 0) {
    showNoticeModal('ヒント切れ', '💡', '「ヒントの書」がありません！ショップで購入できます。');
    return;
  }
  userData.inventory.hint--;
  updateUiState();

  const buttons = Array.from(document.getElementById('quizOptions').children);
  const wrongIndices = [];
  buttons.forEach((btn, idx) => {
    if (idx !== q.ans && !btn.disabled) wrongIndices.push(idx);
  });

  shuffleArray(wrongIndices).slice(0, 2).forEach(idx => {
    buttons[idx].disabled = true;
    buttons[idx].classList.add('opacity-30');
  });
  playSE('chest');
}

function showDamagePopup(text, isCritical, isEnemyDamage) {
  const area = document.getElementById('damageEffectArea');
  if (!area) return;
  const el = document.createElement('div');
  el.className = `damage-popup text-sm md:text-base font-black px-3 py-1 rounded-2xl shadow-xl ${
    isEnemyDamage
      ? (isCritical ? 'bg-amber-400 text-slate-950 border-2 border-white scale-110' : 'bg-rose-600 text-white')
      : 'bg-red-800 text-white border border-red-400'
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
  userData.totalAnswered += 1;
  recordWeakStat(q.id, isCorrect);

  const feedbackModal = document.getElementById('quizFeedback');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackExplain = document.getElementById('feedbackExplain');
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

    if (currentMode === 'weakRetry') {
      dmg = enemyCurHp;
      enemyCurHp = 0;
    } else {
      const baseDmg = Math.round(pStats.atk * (0.95 + Math.random() * 0.2));
      const critRate = Math.min(0.75, pStats.spd / 400);
      isSpdCrit = (Math.random() < critRate);

      let multi = 1.0;
      if (isQuickAnswer) multi += 0.5;
      if (isSpdCrit) multi += 1.0;
      if (isFeverMode) multi *= 1.5;

      dmg = Math.round(baseDmg * multi);
      enemyCurHp = Math.max(0, enemyCurHp - dmg);
    }
    updateBattleHpUi();

    const isFullCritical = (isQuickAnswer && isSpdCrit) || currentMode === 'weakRetry';
    if (isFullCritical) {
      playSE('critical');
      showDamagePopup(`💥 超会心撃!! -${dmg} HP`, true, true);
    } else if (isQuickAnswer || isSpdCrit) {
      playSE('critical');
      showDamagePopup(`⚡ CRITICAL! -${dmg} HP`, true, true);
    } else {
      playSE('correct');
      showDamagePopup(`⚔️ -${dmg} HP`, false, true);
    }

    if (q.rawWord && !userData.vocabBook.includes(q.rawWord)) {
      userData.vocabBook.push(q.rawWord);
    }

    feedbackIcon.innerText = '⭕';
    feedbackTitle.innerText = isFullCritical
      ? `💥 超絶会心！ Excellent! (${combo}連続)`
      : (isQuickAnswer ? `⚡ 即答撃破！ Great! (${combo}連続)` : `正解！ (${combo}連続)`);
    feedbackTitle.className = "text-sm md:text-base font-black text-amber-400";

    if (q.audio_complete) {
      setTimeout(() => speakText(q.audio_complete), 300);
    }
  } else {
    playSE('wrong');
    combo = 0;
    if (isFeverMode) {
      isFeverMode = false;
      playBGM(isBossMode ? 'boss' : 'battle');
    }

    let enemyDmg = 0;
    if (currentMode === 'weakRetry') {
      enemyDmg = playerCurHp;
      playerCurHp = 0;
    } else {
      enemyDmg = Math.round(enemyAtk * (0.85 + Math.random() * 0.3));
      playerCurHp = Math.max(0, playerCurHp - enemyDmg);
    }
    updateBattleHpUi();
    showDamagePopup(`⚠️ 反撃被弾! -${enemyDmg} HP`, false, false);

    if (q.id && !q.id.startsWith('tri_') && !userData.weakList.includes(q.id)) {
      userData.weakList.push(q.id);
    }

    feedbackIcon.innerText = '❌';
    feedbackTitle.innerText = 'おしい！ 解説を読んで復習しよう';
    feedbackTitle.className = "text-sm md:text-base font-black text-rose-400";
  }

  feedbackExplain.innerText = q.explain || '正解を確認して次へ進もう！';
  feedbackModal.classList.remove('hidden');
  saveData();
}

function nextQuestion() {
  document.getElementById('quizFeedback').classList.add('hidden');
  currentIndex += 1;
  if (currentIndex < currentQueue.length && playerCurHp > 0 && enemyCurHp > 0) {
    renderQuestion();
  } else {
    finishSession();
  }
}

// ==================== リザルト ＆ 報酬計算 ====================
function finishSession() {
  stopBattleTimers();
  const isEnemyDefeated = (enemyCurHp <= 0);

  if (isBossMode && isEnemyDefeated && !userData.bossClearedLevels.includes(currentBossStage.lv) && currentBossStage.defeatMsg) {
    showBossDialogueModal(`【Lv.${currentBossStage.lv} ${currentBossStage.name}】撃破！`, currentBossStage.icon, currentBossStage.defeatMsg, () => {
      proceedFinishSession();
    });
  } else {
    proceedFinishSession();
  }
}

function proceedFinishSession() {
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
    document.getElementById('resultModeBadge').innerText = '💀 クエスト失敗...';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-rose-700 text-white px-3 py-0.5 rounded-full inline-block mb-1';
    document.getElementById('resultEmoji').innerText = '🪦';
    document.getElementById('resultTitle').innerText = '力尽きてしまった！';
    document.getElementById('resultComment').innerText = 'あたま装備(HP)の強化や、にがて帳での復習でリベンジしよう！';
    earnedExp = Math.max(10, quizScore * 5);
    earnedGems = 2;
  } else if (!isEnemyDefeated) {
    document.getElementById('resultModeBadge').innerText = '💨 討伐失敗 (時間切れ)';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-slate-700 text-slate-200 px-3 py-0.5 rounded-full inline-block mb-1';
    document.getElementById('resultEmoji').innerText = '💨';
    document.getElementById('resultTitle').innerText = '敵が逃げてしまった！';
    document.getElementById('resultComment').innerText = '出題数内にHPを削りきれなかった！武器の強化や即答クリティカルを狙おう！';
    earnedExp = isBossMode ? Math.round(currentBossStage.exp * 0.25) : Math.max(15, quizScore * 8);
    earnedGems = 3;
  } else if (isBossMode && isEnemyDefeated) {
    const isFirstClear = !userData.bossClearedLevels.includes(currentBossStage.lv);
    const baseBossExp = isFirstClear ? currentBossStage.exp : Math.round(currentBossStage.exp * 0.45);
    earnedExp = baseBossExp + (quizScore * 8);
    earnedGems = isFirstClear ? currentBossStage.gems : Math.max(5, Math.round(currentBossStage.gems * 0.3));

    if (isFirstClear) userData.bossClearedLevels.push(currentBossStage.lv);
    if (currentBossStage.lv >= userData.bossUnlockedLevel && userData.bossUnlockedLevel < 11) {
      userData.bossUnlockedLevel = currentBossStage.lv + 1;
    }

    if (currentBossStage.lv === 11 && !userData.hasSeenTrueEnding) {
      userData.hasSeenTrueEnding = true;
      userData.gems += 500;
      addExp(15000, () => showTrueEndingModal());
      return;
    }

    if (currentBossStage.lv === 10 && !userData.hasSeenEnding) {
      ['hat_genesis_crown', 'wp_genesis_blade', 'aura_genesis_light'].forEach(id => {
        if (!userData.unlockedEquips.includes(id)) userData.unlockedEquips.push(id);
      });
      userData.hasSeenEnding = true;
      userData.bossUnlockedLevel = 11;
      userData.gems += earnedGems;
      addExp(earnedExp, () => showEndingModal());
      return;
    }

    document.getElementById('resultModeBadge').innerText = `👑 Lv.${currentBossStage.lv} BOSS 討伐成功！`;
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-red-600 text-white px-3 py-0.5 rounded-full inline-block mb-1 shadow';
    document.getElementById('resultEmoji').innerText = currentBossStage.icon;
    document.getElementById('resultTitle').innerText = `【${currentBossStage.name}】を完全撃破！`;
    document.getElementById('resultComment').innerText = isFirstClear
      ? '見事な英語力です！次のボスレベルが解放されました！'
      : '再討伐お見事！確かな3級の実力が身についています！';

    const dropChance = 0.4 + (currentBossStage.lv * 0.06);
    const bossDrops = ['hat_dragon_crown', 'wp_dark_blade', 'aura_dragon_light'];
    const availableDrops = bossDrops.filter(id => !userData.unlockedEquips.includes(id));
    if (availableDrops.length > 0 && Math.random() < dropChance) {
      const dropId = availableDrops[Math.floor(Math.random() * availableDrops.length)];
      userData.unlockedEquips.push(dropId);
      const dropEquip = SHOP_EQUIP_DATA.find(e => e.id === dropId);
      if (dropEquip) {
        document.getElementById('rareDropItemText').innerText = `【${dropEquip.name}】(${dropEquip.desc}) を獲得！`;
        rareDropArea.classList.remove('hidden');
        playSE('chest');
      }
    }
  } else if (isDailyCurrentSession && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🏆';
    document.getElementById('resultTitle').innerText = 'デイリークエスト完了！';
    document.getElementById('resultModeBadge').innerText = '🌟 デイリー限定ボーナス！';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';

    if (currentMode === 'vocab') { userData.dailyDone.vocab = true; earnedExp = 80 + (quizScore * 10); earnedGems = 15; }
    else if (currentMode === 'grammar') { userData.dailyDone.grammar = true; earnedExp = 100 + (quizScore * 15); earnedGems = 20; }
    else if (currentMode === 'listening') { userData.dailyDone.listening = true; earnedExp = 120 + (quizScore * 18); earnedGems = 25; }
  } else if (currentMode === 'guerrilla' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '💎';
    document.getElementById('resultTitle').innerText = '忘却モンスター撃退！';
    document.getElementById('resultModeBadge').innerText = '⚡ 記憶定着ボーナス（ダイヤ2倍）';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-rose-500 text-white px-3 py-0.5 rounded-full inline-block mb-1 shadow';
    earnedExp = 180;
    earnedGems = 40;
  } else if (['reading', 'writing', 'speaking', 'trinity'].includes(currentMode) && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🛡️';
    document.getElementById('resultTitle').innerText = '3級特別訓練クリア！';
    document.getElementById('resultModeBadge').innerText = '🌟 3級スペシャル報酬！';
    document.getElementById('resultModeBadge').className = 'text-xs font-black bg-emerald-400 text-slate-950 px-3 py-0.5 rounded-full inline-block mb-1 shadow';
    earnedExp = 160 + (quizScore * 20);
    earnedGems = 25;
  } else if (currentMode === 'weakRetry' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🎯';
    document.getElementById('resultTitle').innerText = '苦手克服クリア！';
    document.getElementById('resultModeBadge').innerText = '✨ 一撃粉砕！';
    earnedExp = 45;
    earnedGems = 5;
  } else if (currentMode === 'weakBattle' && isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🎉';
    document.getElementById('resultTitle').innerText = 'にがて討伐完了！';
    document.getElementById('resultModeBadge').innerText = '🎫 ボスチケット +1枚獲得！';
    userData.bossTickets = (userData.bossTickets || 0) + 1;
    userData.questRotation = { vocab: false, grammar: false, listening: false };
    earnedExp = 180;
    earnedGems = 25;
  } else if (isEnemyDefeated) {
    document.getElementById('resultEmoji').innerText = '🏆';
    document.getElementById('resultTitle').innerText = 'モンスター討伐完了！';
    document.getElementById('resultModeBadge').innerText = '⚔️ 基礎特訓クリア';
    if (selectedNormalType) userData.questRotation[selectedNormalType] = true;
    const diffMulti = [1.0, 1.6, 2.5, 4.0][selectedNormalDiffLevel - 1] || 1.0;
    earnedExp = Math.round((quizScore * 12 + (maxCombo * 4)) * diffMulti);
    earnedGems = Math.max(4, Math.round((quizScore * 1.2) * diffMulti));
  }

  // フィーバータイム達成時はバナー表記通りEXP＆ダイヤ2倍ボーナス！
  if (isFeverMode && isEnemyDefeated) {
    earnedExp *= 2;
    earnedGems *= 2;
  }

  lastEarnedExp = earnedExp;
  isPotionAlreadyUsedForCurrentResult = false;

  const totalDone = Math.max(1, answeredQuestionsCount);
  document.getElementById('resultScore').innerText = `${quizScore} / ${totalDone}`;
  document.getElementById('resultExp').innerText = isFeverMode && isEnemyDefeated ? `+${earnedExp} (🔥2倍!)` : `+${earnedExp}`;
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
    btnPotion.innerHTML = `<span>🧪 EXPの秘薬を使う (所持: ${userData.inventory.potion})</span> <span class="bg-slate-950 px-2 py-0.5 rounded text-xs text-amber-300">+${lastEarnedExp} EXP</span>`;
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
  document.getElementById('resultExp').innerText = `+${lastEarnedExp * 2} (🧪秘薬2倍!)`;
  renderResultPotionButton();
  addExp(lastEarnedExp, () => {
    showNoticeModal('🧪 EXPの秘薬を使用！', '✨', `追加で +${lastEarnedExp} EXP を獲得しました！`);
  });
}

function confirmExitQuiz() {
  stopBattleTimers();
  showHome();
}

// ==================== にがて帳 ＆ 単語図鑑 ====================
function showWeakBook() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewWeakBook').classList.remove('hidden');
  stopBGM();
  updateNavHighlight('weak');
  switchWeakTab(currentWeakTab);
}

function switchWeakTab(tab) {
  currentWeakTab = tab;
  const tActive = document.getElementById('tabWeakActive');
  const tMastered = document.getElementById('tabWeakMastered');

  if (tActive && tMastered) {
    if (tab === 'active') {
      tActive.className = "flex-1 py-2 rounded-xl bg-rose-900 text-rose-100 shadow transition font-black";
      tMastered.className = "flex-1 py-2 rounded-xl text-indigo-400 hover:text-white transition font-bold";
    } else {
      tActive.className = "flex-1 py-2 rounded-xl text-indigo-400 hover:text-white transition font-bold";
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
      <div class="md:col-span-2 bg-indigo-950/50 border border-indigo-800 p-6 rounded-3xl text-center space-y-2">
        <span class="text-4xl">${currentWeakTab === 'active' ? '✨' : '💮'}</span>
        <div class="font-black text-sm text-amber-300">${currentWeakTab === 'active' ? '現在、苦手な問題はありません！' : 'まだ殿堂入りした問題はありません！'}</div>
        <div class="text-xs text-indigo-300">${currentWeakTab === 'active' ? 'バトルで間違えた問題がここに自動記録されます。' : '「克服中」の問題で「覚えた✓」を押すとここに移動します。'}</div>
      </div>
    `;
    return;
  }

  targetList.forEach(id => {
    const qData = getQuizDataById(id);
    if (!qData) return;

    const stats = userData.weakStats[id] || { cleared: 0, attempts: 0 };
    const isMastered = (currentWeakTab === 'mastered');
    const card = document.createElement('div');
    card.className = isMastered
      ? "bg-emerald-950/40 border border-emerald-500/60 p-3.5 rounded-2xl space-y-2 shadow flex flex-col justify-between"
      : "bg-indigo-950/80 border border-rose-500/50 p-3.5 rounded-2xl space-y-2 shadow flex flex-col justify-between";

    const correctText = qData.options ? qData.options[qData.ans] : (qData.audio_complete || '');
    card.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex justify-between items-start gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-black ${isMastered ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-800'} px-2 py-0.5 rounded">${isMastered ? '💮 殿堂入り' : (qData.sub || '要復習')}</span>
            <span class="text-[10px] font-bold bg-slate-950 px-2 py-0.5 rounded-full border border-indigo-700 text-amber-300">
              🎯 ${stats.cleared} / ${stats.attempts} 回正解
            </span>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button onclick="startSingleWeakQuiz('${id}')" class="bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-black px-2.5 py-1 rounded-xl text-xs transition active:scale-95">
              再挑戦
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
      <div class="bg-slate-950/80 p-2.5 rounded-xl border border-indigo-800/80 text-xs space-y-1">
        <div class="font-bold text-emerald-400">【正解】 ${correctText}</div>
        <div class="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line break-words">${qData.explain || ''}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function removeWeakItem(id) {
  userData.weakList = userData.weakList.filter(item => item !== id);
  if (!userData.masteredList.includes(id)) userData.masteredList.push(id);
  saveData();
  renderWeakBookList();
}

function restoreWeakItem(id) {
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
  const container = document.getElementById('vocabBookList');
  if (!container || typeof RAW_VOCAB_DATA === 'undefined') return;
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
    card.className = `p-3 rounded-2xl border flex flex-col justify-between ${isCollected ? 'bg-indigo-900/90 border-amber-400/70 shadow' : 'bg-slate-900/60 border-indigo-900 opacity-60'}`;
    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-[10px] font-bold text-indigo-300">No.${idx + 1}</span>
          <span class="text-[10px] font-bold">${isCollected ? '💮 発見済' : '❓ 未発見'}</span>
        </div>
        <div class="font-black text-white text-xs md:text-sm mb-0.5 truncate">${isCollected ? item[0] : '？？？'}</div>
        <div class="text-[11px] text-amber-300 truncate">${isCollected ? item[1] : '問題に正解して解放！'}</div>
      </div>
      ${isCollected ? `
        <button onclick="speakVocabByIndex(${idx})" class="mt-2 bg-indigo-800 hover:bg-indigo-700 py-1 rounded-xl text-[11px] text-indigo-100 font-bold transition active:scale-95">
          🔊 はつおん
        </button>
      ` : ''}
    `;
    container.appendChild(card);
  });
}

// ==================== ショップ ＆ 装備ガチャ（重複＋強化） ====================
function rollEquipGacha() {
  initAudio();
  const GACHA_COST = 50;
  if (userData.gems < GACHA_COST) {
    showNoticeModal('💎 ダイヤ不足', '🎰', `伝説の装備ガチャを引くには 💎${GACHA_COST} ダイヤが必要です！（現在: 💎${userData.gems}）`);
    return;
  }
  if (typeof SHOP_EQUIP_DATA === 'undefined') return;

  userData.gems -= GACHA_COST;
  const gachaPool = SHOP_EQUIP_DATA.filter(e => !e.isSecret && e.price < 9000);
  const picked = gachaPool[Math.floor(Math.random() * gachaPool.length)];

  let resultMsg = '';
  if (!userData.unlockedEquips.includes(picked.id)) {
    userData.unlockedEquips.push(picked.id);
    resultMsg = `🆕 新装備【${picked.name}】を獲得しました！\n(${picked.desc})`;
  } else {
    userData.equipLevels[picked.id] = (userData.equipLevels[picked.id] || 0) + 1;
    const plusLv = userData.equipLevels[picked.id];
    const boostedVal = getEquipBonusVal(picked);
    resultMsg = `✨ 限界突破！【${picked.name} +${plusLv}】に進化しました！\nステータス上昇値: +${boostedVal}`;
  }

  playSE('chest');
  saveData();
  showNoticeModal('🎰 宝箱ガチャ結果！', picked.icon, resultMsg);
}

function switchEquipTab(tab) {
  currentShopTab = tab;
  const tHat = document.getElementById('tabEquipHat');
  const tWp = document.getElementById('tabEquipWeapon');
  const tAu = document.getElementById('tabEquipAura');
  [tHat, tWp, tAu].forEach(el => {
    if (el) el.className = "flex-1 py-1.5 rounded-xl text-slate-300 hover:text-white transition";
  });
  if (tab === 'hat' && tHat) tHat.className = "flex-1 py-1.5 rounded-xl bg-indigo-800 text-amber-300 shadow transition";
  if (tab === 'weapon' && tWp) tWp.className = "flex-1 py-1.5 rounded-xl bg-indigo-800 text-amber-300 shadow transition";
  if (tab === 'aura' && tAu) tAu.className = "flex-1 py-1.5 rounded-xl bg-indigo-800 text-amber-300 shadow transition";
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
        ? (isEquipped ? 'bg-purple-900 border-amber-400 shadow-xl glow-gold' : 'bg-gradient-to-br from-purple-950 to-slate-950 border-purple-500')
        : (isEquipped ? 'bg-indigo-800 border-amber-400 shadow-md' : 'bg-slate-950/85 border-indigo-800')
    }`;

    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-[10px] font-bold ${eq.isSecret ? 'text-amber-300' : 'text-indigo-300'} truncate">${eq.rank}</span>
          <span class="text-xl flex-shrink-0">${eq.icon}</span>
        </div>
        <div class="font-black text-xs md:text-sm text-white truncate">${eq.name}${plusBadge}</div>
        <div class="text-[10px] text-amber-300 mt-0.5 leading-tight">${eq.desc} (現在:+${getEquipBonusVal(eq)})</div>
      </div>
      <div class="mt-2.5 pt-1.5 border-t border-indigo-800/80">
        ${isEquipped ? `
          <button onclick="unequipItem('${eq.type}')" class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-1.5 rounded-xl text-xs transition">
            はずす
          </button>
        ` : (isUnlocked ? (
          isLevelLocked ? `
            <button onclick="equipItem('${eq.id}', '${eq.type}')" class="w-full bg-slate-950 border border-rose-600/70 text-rose-300 font-bold py-1.5 rounded-xl text-[11px]">
              🔒 Lv.${eq.reqLv}〜
            </button>
          ` : `
            <button onclick="equipItem('${eq.id}', '${eq.type}')" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-1.5 rounded-xl text-xs transition active:scale-95 shadow">
              そうび
            </button>
          `
        ) : (eq.price > 9000 ? `
          <span class="block w-full text-center text-[11px] text-rose-300 font-bold bg-rose-950/80 border border-rose-800/60 py-1.5 rounded-xl">
            ボス限定ドロップ
          </span>
        ` : `
          <button onclick="buyEquip('${eq.id}',${eq.price})" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-1.5 rounded-xl text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow">
            <span>💎 ${eq.price}</span> <span>購入</span>
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
    showNoticeModal('🔒 レベル不足', eq.icon, `この装備は【Lv.${eq.reqLv}】以上で装備できます！（現在: Lv.${userData.level}）`);
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
    showNoticeModal('💎 ダイヤ不足', '🛒', 'ダイヤが足りません！クエストをクリアしてダイヤを集めよう！');
    return;
  }
  userData.gems -= price;
  if (!userData.unlockedEquips.includes(id)) userData.unlockedEquips.push(id);
  playSE('chest');
  saveData();
}

function buyItem(type, price) {
  if (userData.gems < price) {
    showNoticeModal('💎 ダイヤ不足', '🛒', 'ダイヤが足りません！');
    return;
  }
  userData.gems -= price;
  if (type === 'hint') userData.inventory.hint += 1;
  if (type === 'loupe') userData.inventory.loupe += 1;
  if (type === 'potion') userData.inventory.potion += 1;
  playSE('chest');
  saveData();
}

// ==================== エンディング演出 ====================
function showEndingModal() {
  hideAllViews();
  playBGM('ending');

  const avatarObj = [...AVATARS].reverse().find(a => userData.level >= a.minLv) || AVATARS[0];
  document.getElementById('endingHeroEmoji').innerText = avatarObj.emoji;
  document.getElementById('endingHeroName').innerText = avatarObj.name;

  document.getElementById('endingPhase1').classList.remove('hidden');
  document.getElementById('endingPhase2').classList.add('hidden');
  document.getElementById('modalEnding').classList.remove('hidden');
}

function triggerEndingTeaser() {
  const container = document.getElementById('endingContainer');
  if (container) container.classList.add('animate-shake');
  playSE('wrong');
  setTimeout(() => {
    if (container) container.classList.remove('animate-shake');
    document.getElementById('endingPhase1').classList.add('hidden');
    document.getElementById('endingPhase2').classList.remove('hidden');
  }, 900);
}

function finishEndingSequence() {
  document.getElementById('modalEnding').classList.add('hidden');
  saveData();
  showHome();
}

function showTrueEndingModal() {
  hideAllViews();
  playBGM('trueEnding');
  const acc = userData.totalAnswered > 0 ? Math.round((userData.totalCorrect / userData.totalAnswered) * 100) : 100;
  showNoticeModal(
    '🌌 TRUE GRAND ENDING - 全次元制覇！',
    '👑',
    `虚無の支配者【ゼロインフィニティ】を討ち破り、英検3級の全領域を完全制覇しました！\n\n【殿堂入りマスター記録】\n・総解答数：${userData.totalAnswered}問\n・通算正解率：${acc}%\n・授与称号：【🌌 3級完全制覇神】\n\nプロデュース＆最大サポーター：鄭 聖也（パパ）`,
    () => showHome()
  );
}

// ==================== 画面表示切替 ＆ バックアップ ====================
function hideAllViews() {
  ['viewHome', 'viewQuiz', 'viewResult', 'viewShop', 'viewParent', 'viewBook', 'viewWeakBook', 'modalBossSelect', 'modalNormalSelect', 'modalBossDialogue', 'quizFeedback'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
}

function showHome() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewHome').classList.remove('hidden');
  playBGM('home');
  updateNavHighlight('home');
}

function showShop() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewShop').classList.remove('hidden');
  stopBGM();
  updateNavHighlight('shop');
  renderShopEquips();
}

function showParent() {
  stopBattleTimers();
  hideAllViews();
  document.getElementById('viewParent').classList.remove('hidden');
  stopBGM();
  updateNavHighlight('parent');
}

function updateNavHighlight(active) {
  ['Home', 'Book', 'Weak', 'Shop', 'Parent'].forEach(name => {
    const btn = document.getElementById('nav' + name);
    if (btn) btn.className = "flex flex-col items-center gap-0.5 text-indigo-400 hover:text-indigo-200";
  });
  const keyMap = { home: 'navHome', book: 'navBook', weak: 'navWeak', shop: 'navShop', parent: 'navParent' };
  const target = document.getElementById(keyMap[active]);
  if (target) target.className = "flex flex-col items-center gap-0.5 text-amber-400 font-black";
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `eiken3_backup_${getTodayString()}.json`);
  dlAnchor.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      userData = { ...userData, ...imported };
      sanitizeUserData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      updateUiState();
      showNoticeModal('復元完了', '📥', 'セーブデータの復元が完了しました！', () => location.reload());
    } catch (err) {
      showNoticeModal('エラー', '⚠️', '有効なバックアップファイルではありません。');
    }
  };
  reader.readAsText(file);
}

function resetAllProgress() {
  if (confirm('すべての学習記録、レベル、獲得ダイヤを初期化しますか？')) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    location.reload();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadData();
});
document.body.addEventListener('click', initAudio, { once: true });
