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
  // Desktop nav
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const current = location.pathname.split('/').pop() || 'index.html';
    navLinks.innerHTML = NAV_ITEMS.map(item => {
      const active = item.href === current ? ' class="active"' : '';
      return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
    }).join('');
  }

  // Mobile nav
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
  const count = 80;
  for (let i = 0; i < count; i++) {
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

  // Check if already unlocked
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

  // Close on link click
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

      // Deactivate all tabs and panels in this group
      const tabs = btn.parentElement;
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

      const panelsContainer = tabs.nextElementSibling;
      if (panelsContainer) {
        panelsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      }

      // Activate clicked
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
      const expandable = trigger.parentElement;
      const isOpen = expandable.classList.contains('open');

      // Close all in same card (optional accordion)
      // expandable.parentElement.querySelectorAll('.expandable').forEach(e => e.classList.remove('open'));

      if (isOpen) {
        expandable.classList.remove('open');
      } else {
        expandable.classList.add('open');
      }
    });
  });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
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
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

// ============ AI ANSWERS ============
const AI_ANSWERS = {
  '性格': '你嘅命局寫咗幾樣嘢：己土日主孤立——你嘅「我」冇同伴冇保護，但你嘅食傷極旺（5次）代表你用不停產出嚟證明自己存在。你嘅大腦好快好深但好難停——風象35.7%＋固定大十字。你嘅表面同內在有落差——ASC獅子有氣勢但太陽尊貴只有1分。如果你想了解更深入，可以去「核心主題」同「天賦與陰影」嗰度睇。',
  '事業': '你嘅事業曲線係慢上坡——土星Rx 10宮＋MC金牛＝慢但穩。6宮主飛10宮代表每日工作建構事業。最適合你嘅方向係專業深耕型——靠考牌同累積資歷。2026丙午年係考試黃金年。33歲後丙申大運正印到位，事業開始上升。詳細可以去「十大領域」嘅事業部分同「時間線」睇。',
  '金錢': '你嘅賺錢模式係食傷生財——靠技能而唔靠投資。偏財透干時柱代表收入偏活水。正財缺席代表冇穩定積累模式——要靠人為建立定期儲蓄。你嘅金錢問題唔係冇錢而係hold唔住。詳細策略喺「人生地圖」嗰頁。',
  '愛情': '你嘅金星灼傷（距太陽0°43\'）代表接收愛嘅能力被自我意識遮蔽。正財缺席代表冇穩定嘅「被愛」模式。你愛人嘅方式係做嘢而唔係講嘢——你嘅愛全部藏喺行動入面。你接收愛嘅方式同一般人唔同——行動式關心你會收，語言式關心你會彈開。詳細喺「核心主題」嘅愛同「十大領域」嘅感情部分。',
  '健康': '你嘅體質基調係寒濕偏弱——己土生冬月＋身弱＋食傷洩身。最需要注意：脾胃消化（濕土困脾）、肝膽（卯被酉沖）、精神健康（食傷極旺＋酉酉自刑）。生活建議：偏暖食、戒凍飲、行山、暖光燈。詳細喺「十大領域」嘅健康部分。',
  '大運': '而家行緊丁酉大運（23–32歲）＝天干偏印保護vs地支食神消耗。下一大運丙申（33–42歲）＝正印到位，事業開始上升。第三大運乙未（43–52歲）＝殺印相生＋燥土幫身。第四大運甲午（53–62歲）＝金神成器，巔峰。你嘅事業曲線係慢上坡。詳細喺「時間線」。',
  '考試': '2026丙午年係你嘅考試黃金年——丙火正印到位＋午火偏印＋文昌。最佳溫書月份：2026年5月（甲午月）。最辛苦考試月：2026年8月（丁酉月＝三重酉）。考完抖氣月：2026年9月（戊戌月）。詳細喺「時間線」。',
  '天賦': '你有三大天賦：一、思維嘅深度同速度（風象35.7%＋食傷5次＋文昌詞館學堂）。二、喺壓力中成長嘅韌性（火星尊貴6分＋七殺帝旺＋斗宿）。三、獨特嘅精神世界（華蓋＋太極貴人＋童子）。詳細喺「天賦與陰影」。',
  '陰影': '你有三大陰影：一、用做嘢代替存在（食傷代替印星）。二、唔好麻煩人（食神透干＋海王星對分ASC）。三、喺最需要人嗰陣推開人（固定大十字＋金星灼傷）。天賦同陰影係同一枚銀幣嘅兩面。詳細喺「天賦與陰影」。'
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
      if (q.includes(key)) {
        answer = val;
        break;
      }
    }

    output.innerHTML = `
      <div class="ai-question">${q}</div>
      <div class="ai-answer">${answer}</div>
    `;
    input.value = '';
  }

  btn.addEventListener('click', ask);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') ask();
  });
}

// ============ DAILY FORTUNE ============
function initFortune() {
  const container = document.getElementById('dailyFortune');
  if (!container) return;

  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const fortuneIndex = seed % 5;

  const fortunes = [
    { energy: '火土旺', level: '▲▲▲▲', advice: '今日適合處理重要嘅工作項目。你嘅思維清晰度比平時高——把握呢個狀態做最需要腦力嘅嘢。', lucky: '橙色、啡色' },
    { energy: '金水旺', level: '▲▲', advice: '今日消耗會比平時大——唔好勉強自己做太多嘢。如果可以選擇，處理啲唔需要太多腦力嘅工作。', lucky: '紅色、紫色' },
    { energy: '木火齊到', level: '▲▲▲▲▲', advice: '今日係一個好好嘅日子。你嘅保護力比平時強——適合做一啲你平時唔敢做嘅嘢。', lucky: '綠色、紅色' },
    { energy: '土金平衡', level: '▲▲▲', advice: '今日能量中等。適合做例行工作同整理。唔好做大決定但可以做準備工作。', lucky: '白色、銀色' },
    { energy: '水木旺', level: '▲▲▲', advice: '今日思維特別活躍但身體可能比較攰。適合動腦唔適合動手嘅工作。', lucky: '藍色、綠色' },
  ];

  const f = fortunes[fortuneIndex];

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
      <div style="font-size:1.2rem; font-weight:600;">${today.toLocaleDateString('zh-Hant', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
    <div class="tag-row" style="margin-bottom:16px;">
      <span class="tag">${f.energy}</span>
      <span class="tag">能量 ${f.level}</span>
    </div>
    <p style="margin-bottom:16px;">${f.advice}</p>
    <p style="font-size:0.85rem; color:var(--text-muted);">今日幸運顏色：${f.lucky}</p>
  `;
}

// ============ PDF EXPORT ============
function initPDF() {
  const btn = document.getElementById('pdfBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.print();
  });
}

// ============ FORTUNE SCORE FOR TIMELINE ============
function initFortuneScores() {
  document.querySelectorAll('.fortune-score').forEach(el => {
    const score = el.getAttribute('data-score');
    if (!score) return;
    const filled = parseInt(score);
    const empty = 5 - filled;
    el.innerHTML = '★'.repeat(filled) + '<span style="opacity:0.3;">' + '★'.repeat(empty) + '</span>';
  });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
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
});
