// ============ CONFIG ============
const PASSWORD = 'LOVEYAN';
const THEME_KEY = 'life-map-theme';

// ============ NAV DATA ============
const NAV_ITEMS = [
  { href: 'core.html', label: '核心主題' },
  { href: 'gifts.html', label: '天賦陰影' },
  { href: 'domains.html', label: '十大領域' },
  { href: 'timeline.html', label: '時間線' },
  { href: 'map.html', label: '人生地圖' },
  { href: 'data.html', label: '原始數據' },
];

const MOBILE_NAV_ITEMS = [
  { href: 'index.html', label: '首頁' },
  { href: 'core.html', label: '核心主題' },
  { href: 'gifts.html', label: '天賦與陰影' },
  { href: 'domains.html', label: '十大領域' },
  { href: 'timeline.html', label: '時間線' },
  { href: 'map.html', label: '人生地圖' },
  { href: 'data.html', label: '原始數據' },
];

// ============ INJECT NAV ============
function injectNav() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const current = location.pathname.split('/').pop() || 'index.html';
    navLinks.innerHTML = NAV_ITEMS.map(item => {
      const active = item.href === current ? ' class="active"' : '';
      return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
    }).join('');
  }
  const mobileLinks = document.querySelector('.mobile-nav-links');
  if (mobileLinks) {
    const current = location.pathname.split('/').pop() || 'index.html';
    mobileLinks.innerHTML = MOBILE_NAV_ITEMS.map(item => {
      const active = item.href === current ? ' class="active"' : '';
      return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
    }).join('');
  }
}

// ============ STARFIELD ============
function createStarfield() {
  const container = document.querySelector('.starfield');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }
}

// ============ PASSWORD GATE ============
function initGate() {
  const gate = document.getElementById('gate');
  const gateInput = document.getElementById('gateInput');
  const gateBtn = document.getElementById('gateBtn');
  const gateError = document.getElementById('gateError');
  const wrapper = document.querySelector('.page-wrapper');
  if (!gate || !gateInput || !gateBtn) return;

  if (sessionStorage.getItem('life-map-unlocked') === 'true') {
    gate.style.display = 'none';
    if (wrapper) wrapper.classList.add('unlocked');
    return;
  }

  function tryUnlock() {
    if (gateInput.value === PASSWORD) {
      gate.classList.add('unlocking');
      setTimeout(() => {
        gate.style.display = 'none';
        if (wrapper) wrapper.classList.add('unlocked');
        sessionStorage.setItem('life-map-unlocked', 'true');
      }, 600);
    } else {
      gateError.textContent = '密碼唔啱';
      gateInput.value = '';
      gateInput.focus();
    }
  }

  gateBtn.addEventListener('click', tryUnlock);
  gateInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') tryUnlock();
  });
}

// ============ THEME TOGGLE ============
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// ============ TABS ============
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      const card = btn.closest('.card') || btn.closest('.main-content');
      if (!card) return;
      btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const panelsContainer = btn.parentElement.nextElementSibling;
      if (panelsContainer) {
        panelsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      }
      btn.classList.add('active');
      const panel = card.querySelector(`[data-panel="${tabId}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ============ EXPANDABLES ============
function initExpandables() {
  document.querySelectorAll('.expandable-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.parentElement.classList.toggle('open');
    });
  });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============ PROGRESS BAR ============
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
  });
}

// ============ AI Q&A ============
const AI_ANSWERS = {
  '性格': '你嘅命局寫咗幾樣嘢：己土日主孤立——你嘅「我」冇同伴冇保護，但你嘅食傷極旺（5次）代表你用不停產出嚟證明自己存在。你嘅大腦好快好深但好難停——風象40%＋變動模式40%。你嘅表面同內在有落差——ASC獅子有氣勢但太陽尊貴只有1分。如果你想了解更深入，可以去「核心主題」同「天賦與陰影」嗰度睇。',
  '事業': '你嘅事業曲線係慢上坡——土星Rx 10宮＋MC金牛＝慢但穩。6宮主飛10宮代表每日工作建構事業。最適合你嘅方向係專業深耕型——靠考牌同累積資歷。2026丙午年係考試黃金年。而家行緊戊戌大運全面幫身。詳細可以去「十大領域」同「時間線」睇。',
  '金錢': '你嘅賺錢模式係食傷生財——靠技能而唔靠投資。偏財透干時柱代表收入偏活水。正財缺席代表冇穩定積累模式——要靠人為建立定期儲蓄。詳細策略喺「人生地圖」嗰頁。',
  '愛情': '你嘅金星灼傷代表接收愛嘅能力被自我意識遮蔽。你愛人嘅方式係做嘢而唔係講嘢。你接收愛嘅方式同一般人唔同——行動式關心你會收，語言式關心你會彈開。詳細喺「核心主題」同「十大領域」。',
  '健康': '你嘅體質基調係寒濕偏弱——己土生冬月＋身弱＋食傷洩身。最需要注意脾胃、肝膽、精神健康。生活建議：偏暖食、戒凍飲、行山。詳細喺「十大領域」。',
  '大運': '而家行緊戊戌大運（22–31歲）＝天干地支都幫身。下一大運丁酉（32–41歲）＝有保護有消耗。丙申（42–51歲）＝正印到位。乙未（52–61歲）＝殺印相生。甲午（62–71歲）＝金神成器。詳細喺「時間線」。',
  '考試': '2026丙午年係考試黃金年——丙火正印＋火土大旺。最佳溫書月份：5月。最辛苦考試月：8月。考完抖氣月：9月。詳細喺「時間線」。',
  '天賦': '三大天賦：思維深度同速度、壓力中成長嘅韌性、獨特嘅精神世界。詳細喺「天賦與陰影」。',
  '陰影': '三大陰影：用做嘢代替存在、唔好麻煩人、喺最需要人嗰陣推開人。天賦同陰影係同一枚銀幣嘅兩面。詳細喺「天賦與陰影」。'
};

function initAI() {
  const input = document.getElementById('aiInput');
  const btn = document.getElementById('aiBtn');
  const output = document.getElementById('aiOutput');
  if (!input || !btn || !output) return;

  function ask() {
    const q = input.value.trim();
    if (!q) return;
    let answer = '你可以試下問：性格、事業、金錢、愛情、健康、大運、考試、天賦、陰影。每個關鍵詞我都會幫你搵到對應嘅分析。';
    for (const [key, val] of Object.entries(AI_ANSWERS)) {
      if (q.includes(key)) { answer = val; break; }
    }
    output.innerHTML = `<div class="ai-question">${q}</div><div class="ai-answer">${answer}</div>`;
    input.value = '';
  }

  btn.addEventListener('click', ask);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') ask(); });
}

// ============ DAILY FORTUNE ============
function initFortune() {
  const container = document.getElementById('dailyFortune');
  if (!container) return;
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const fortunes = [
    { energy: '火土旺', level: '▲▲▲▲', advice: '今日適合處理重要嘅工作項目。你嘅思維清晰度比平時高。', lucky: '橙色、啡色' },
    { energy: '金水旺', level: '▲▲', advice: '今日消耗會比平時大——唔好勉強自己做太多嘢。', lucky: '紅色、紫色' },
    { energy: '木火齊到', level: '▲▲▲▲▲', advice: '今日係一個好好嘅日子。你嘅保護力比平時強。', lucky: '綠色、紅色' },
    { energy: '土金平衡', level: '▲▲▲', advice: '今日能量中等。適合做例行工作同整理。', lucky: '白色、銀色' },
    { energy: '水木旺', level: '▲▲▲', advice: '今日思維特別活躍但身體可能比較攰。', lucky: '藍色、綠色' },
  ];
  const f = fortunes[seed % 5];
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <div style="font-size:1.1rem;font-weight:600;">${today.toLocaleDateString('zh-Hant', { year:'numeric', month:'long', day:'numeric' })}</div>
    </div>
    <div class="tag-row" style="margin-bottom:16px;">
      <span class="tag">${f.energy}</span>
      <span class="tag">能量 ${f.level}</span>
    </div>
    <p style="margin-bottom:16px;">${f.advice}</p>
    <p style="font-size:0.85rem;color:var(--text-muted);">今日幸運顏色：${f.lucky}</p>
  `;
}

// ============ PDF ============
function initPDF() {
  const btn = document.getElementById('pdfBtn');
  if (!btn) return;
  btn.addEventListener('click', () => window.print());
}

// ============ FORTUNE SCORES ============
function initFortuneScores() {
  document.querySelectorAll('.fortune-score').forEach(el => {
    const score = el.getAttribute('data-score');
    if (!score) return;
    el.innerHTML = '★'.repeat(parseInt(score)) + '<span style="opacity:0.3;">' + '★'.repeat(5 - parseInt(score)) + '</span>';
  });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ============ PROMPT GENERATOR ============
const CHART_CONTEXT = `你係一個精通西洋占星同中國八字命理嘅資深分析師。以下係一個人嘅完整命盤數據，請根據呢啲數據進行分析。

【出生資料】2002年1月11日 19:30 香港 · 男

【星盤】ASC獅子12°16' / MC金牛9°53'
太陽摩羯21°4'(6宮) / 月亮射手26°54'(5宮) / 水星水瓶10°3'(6宮)
金星摩羯20°21'(6宮·灼傷) / 火星雙魚24°33'(8宮)
木星巨蟹9°16'Rx(11宮·曜升) / 土星雙子8°44'Rx(10宮)
互溶：月亮⟷木星 / 最tight相位：土星三分海王星(0°55')

【八字】四柱：辛巳·辛丑·己卯·癸酉 · 納音白蠟金
日主己土身弱喜火土 / 食傷5次(33%) / 正印1次(巳藏丙·極弱)
偏印·正官·正財完全缺席 / 三合金局巳酉丑 / 卯酉沖
神煞：華蓋·太極貴人·童子·將星·金神·文昌·亢宿(值日)

【而家嘅位置】
大運：戊戌(22–31歲·全面幫身) / 法達盤：木>太(木星時主＋太陽細限)
太陽弧：SA月亮合本命太陽(0°28') / 次限太陽水瓶~16°
2026日返盤：7/12宮主飛入8宮 = 深層轉化年份`;

const PAGE_PROMPTS = {
  'index.html': '請做一個整體命盤分析概覽，包括性格特質、天賦、陰影、事業方向、感情模式、同最重要嘅人生課題。',
  'core.html': '請深入分析五大核心主題：身份認同（我係邊個）、消耗模式（點解我咁攰）、保護機制（邊個照顧我）、時間節奏（點解好事咁慢嚟）、愛嘅模式（我點樣愛人同被人愛）。每個主題都要結合星盤同八字數據。',
  'gifts.html': '請分析三大天賦同三大陰影：天賦包括思維深度同速度、喺壓力中成長嘅韌性、獨特嘅精神世界。陰影包括用做嘢代替存在、唔好麻煩人、喺最需要人嗰陣推開人。分析佢哋嘅根源同關係。',
  'domains.html': '請分析十大人生領域：身份認同、金錢與資源、愛情與親密關係、事業與副業、家庭與原生模式、健康與身體管理、社交與貴人、學習與表達、靈性與人生信念、深層轉化。每個領域要有星盤同八字依據同實際建議。',
  'timeline.html': '請分析時間線：22–31歲戊戌大運逐年拆解、2026–2027年18個月預測、大運總覽。要結合八字大運、法達盤（木>太）、日返盤（2026年8宮集中）、太陽弧、次限嚟交叉驗證。重點分析2026丙午年同2027丁未年。',
  'map.html': '請做一個完整嘅人生地圖策略：金錢策略、感情策略、事業策略、同行動時間線（而家、3個月、1年、3年）。要結合所有命理系統嚟提供實際建議。',
  'data.html': '以下係完整嘅命理原始數據。請解讀最重要嘅模式、最值得留意嘅相位、八字同星盤嘅交叉驗證、同埋命局核心特質。指出任何可能忽略嘅細節。'
};

function initPromptGenerator() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const pageInstruction = PAGE_PROMPTS[currentPage] || PAGE_PROMPTS['index.html'];
  const fullPrompt = CHART_CONTEXT + '\n\n【分析要求】' + pageInstruction;

  // Create modal
  const overlay = document.createElement('div');
  overlay.className = 'prompt-overlay';
  overlay.innerHTML = `
    <div class="prompt-card">
      <div class="prompt-card-header">
        <div class="prompt-card-title">提示詞已生成</div>
        <button class="prompt-close">&times;</button>
      </div>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">提示詞已自動複製。揀一個 AI 平台貼上去就得。</p>
      <textarea class="prompt-textarea" readonly></textarea>
      <div class="prompt-copy-row">
        <button class="prompt-copy-btn">複製提示詞</button>
        <span class="prompt-copied">&#x2713; 已複製！</span>
      </div>
      <hr class="prompt-divider">
      <div class="prompt-ai-label">貼去邊個 AI？</div>
      <div class="prompt-ai-buttons">
        <a class="prompt-ai-btn" href="https://gemini.google.com" target="_blank" rel="noopener">Gemini</a>
        <a class="prompt-ai-btn" href="https://chat.deepseek.com" target="_blank" rel="noopener">DeepSeek</a>
        <a class="prompt-ai-btn" href="https://www.doubao.com" target="_blank" rel="noopener">豆包</a>
        <a class="prompt-ai-btn" href="https://copilot.microsoft.com" target="_blank" rel="noopener">Copilot</a>
        <a class="prompt-ai-btn" href="https://grok.com" target="_blank" rel="noopener">Grok</a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const textarea = overlay.querySelector('.prompt-textarea');
  textarea.value = fullPrompt;

  const copyBtn = overlay.querySelector('.prompt-copy-btn');
  const copiedEl = overlay.querySelector('.prompt-copied');

  function doCopy() {
    textarea.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value).then(showCopied).catch(() => {
        document.execCommand('copy');
        showCopied();
      });
    } else {
      document.execCommand('copy');
      showCopied();
    }
  }

  function showCopied() {
    copiedEl.classList.add('show');
    setTimeout(() => copiedEl.classList.remove('show'), 2000);
  }

  function open() {
    overlay.classList.add('open');
    doCopy();
  }

  function close() {
    overlay.classList.remove('open');
  }

  overlay.querySelector('.prompt-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  copyBtn.addEventListener('click', doCopy);

  return open;
}

// ============ BACK TO TOP ============
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'fab';
  btn.innerHTML = '&#x2191;';
  btn.title = '回到頂部';
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
}

// ============ FLOATING BUTTONS ============
function initFloatingButtons() {
  const container = document.createElement('div');
  container.className = 'floating-buttons';

  const topBtn = initBackToTop();
  const openPrompt = initPromptGenerator();

  const promptFab = document.createElement('button');
  promptFab.className = 'fab fab-prompt visible';
  promptFab.innerHTML = '&#x2728;';
  promptFab.title = '生成提示詞';
  promptFab.addEventListener('click', openPrompt);

  container.appendChild(topBtn);
  container.appendChild(promptFab);
  document.body.appendChild(container);

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 300);
  });
}

// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  createStarfield();
  initGate();
  initTheme();
  initMobileMenu();
  initTabs();
  initExpandables();
  initScrollReveal();
  initProgressBar();
  initAI();
  initFortune();
  initPDF();
  initFortuneScores();
  initSmoothScroll();
  initFloatingButtons();
});
