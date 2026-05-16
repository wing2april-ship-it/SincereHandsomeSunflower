// ============ PROMPT GENERATOR + BACK TO TOP ============
(function() {

  var styles = [
    '.floating-buttons{position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:900}',
    '.fab{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:#1a1a1a;color:#f0ece4;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.5);opacity:0;transform:translateY(20px)}',
    '.fab.visible{opacity:1;transform:translateY(0)}',
    '.fab:hover{border-color:#e8c547;color:#e8c547}',
    '.fab-prompt{background:#e8c547;color:#000;border-color:#e8c547;font-size:1.3rem;opacity:1;transform:translateY(0)}',
    '.prompt-overlay{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}',
    '.prompt-overlay.open{opacity:1;pointer-events:all}',
    '.prompt-card{background:#1a1a1a;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:32px;max-width:680px;width:92%;max-height:90vh;overflow-y:auto;transform:translateY(20px);transition:transform .3s ease}',
    '.prompt-overlay.open .prompt-card{transform:translateY(0)}',
    '.prompt-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}',
    '.prompt-card-title{font-size:1.2rem;font-weight:600;color:#f0ece4}',
    '.prompt-close{background:none;border:none;color:#7a7570;font-size:1.5rem;cursor:pointer;padding:4px 8px}',
    '.prompt-textarea{width:100%;min-height:200px;background:#0d0d0d;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:16px;color:#f0ece4;font-family:monospace;font-size:.82rem;line-height:1.6;resize:vertical;outline:none}',
    '.prompt-textarea:focus{border-color:#e8c547}',
    '.prompt-copy-row{display:flex;align-items:center;gap:12px;margin:16px 0}',
    '.prompt-copy-btn{padding:10px 24px;background:#e8c547;color:#000;border:none;border-radius:8px;font-size:.85rem;font-weight:600;cursor:pointer}',
    '.prompt-copied{font-size:.8rem;color:#e8c547;opacity:0;transition:opacity .3s ease}',
    '.prompt-copied.show{opacity:1}',
    '.prompt-divider{border:none;border-top:1px solid rgba(255,255,255,.1);margin:20px 0}',
    '.prompt-ai-label{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:#7a7570;margin-bottom:12px}',
    '.prompt-ai-buttons{display:flex;flex-wrap:wrap;gap:10px}',
    '.prompt-ai-btn{padding:10px 20px;background:#0d0d0d;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#f0ece4;font-size:.85rem;text-decoration:none;transition:all .3s ease;cursor:pointer}',
    '.prompt-ai-btn:hover{border-color:#e8c547;color:#e8c547}'
  ];

  var s = document.createElement('style');
  s.textContent = styles.join('');
  document.head.appendChild(s);

  var CHART = '你係一個精通西洋占星同中國八字命理嘅資深分析師。以下係一個人嘅完整命盤數據。\n\n【出生資料】2002年1月11日 19:30 香港 男\n\n【星盤】ASC獅子12度 MC金牛9度\n太陽摩羯21度(6宮) 月亮射手26度(5宮) 水星水瓶10度(6宮)\n金星摩羯20度(6宮灼傷) 火星雙魚24度(8宮)\n木星巨蟹9度Rx(11宮曜升) 土星雙子8度Rx(10宮)\n互溶月亮木星 最tight土星三分海王星\n\n【八字】辛巳辛丑己卯癸酉 白蠟金\n己土身弱喜火土 食傷5次33% 正印1次(巳藏丙極弱)\n偏印正官正財完全缺席 三合金局巳酉丑 卯酉沖\n華蓋太極貴人童子將星金神文昌亢宿值日\n\n【大運】戊戌22至31歲全面幫身\n【法達】木大時主加太陽細限(2025.6至2027.3)\n【太陽弧】SA月亮合本命太陽0度28分\n【日返2026】7和12宮主飛入8宮';

  var PAGE_MAP = {
    'index.html': '請做整體命盤分析概覽。',
    'core.html': '請深入分析五大核心主題。',
    'gifts.html': '請分析三大天賦同三大陰影。',
    'domains.html': '請分析十大人生領域。',
    'timeline.html': '請分析時間線。',
    'map.html': '請做完整人生地圖策略。',
    'data.html': '請解讀原始數據。'
  };

  var page = location.pathname.split('/').pop() || 'index.html';
  var instruction = PAGE_MAP[page] || PAGE_MAP['index.html'];
  var promptText = CHART + '\n\n【分析要求】' + instruction;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'prompt-overlay';
  overlay.innerHTML = '<div class="prompt-card"><div class="prompt-card-header"><div class="prompt-card-title">提示詞已生成</div><button class="prompt-close">&times;</button></div><p style="font-size:0.85rem;color:#7a7570;margin-bottom:16px;">撳「複製」然後揀一個 AI 平台貼上去。</p><textarea class="prompt-textarea" readonly></textarea><div class="prompt-copy-row"><button class="prompt-copy-btn">複製提示詞</button><span class="prompt-copied">&#x2713; 已複製</span></div><hr class="prompt-divider"><div class="prompt-ai-label">貼去邊個 AI？</div><div class="prompt-ai-buttons"><a class="prompt-ai-btn" href="https://gemini.google.com" target="_blank">Gemini</a> <a class="prompt-ai-btn" href="https://chat.deepseek.com" target="_blank">DeepSeek</a> <a class="prompt-ai-btn" href="https://www.doubao.com" target="_blank">豆包</a> <a class="prompt-ai-btn" href="https://copilot.microsoft.com" target="_blank">Copilot</a> <a class="prompt-ai-btn" href="https://grok.com" target="_blank">Grok</a></div></div>';
  document.body.appendChild(overlay);

  var textarea = overlay.querySelector('.prompt-textarea');
  textarea.value = promptText;
  var copyBtn = overlay.querySelector('.prompt-copy-btn');
  var copiedEl = overlay.querySelector('.prompt-copied');

  function doCopy() {
    textarea.select();
    try { document.execCommand('copy'); } catch(e) {}
    copiedEl.classList.add('show');
    setTimeout(function() { copiedEl.classList.remove('show'); }, 2000);
  }

  function openPrompt() {
    overlay.classList.add('open');
    doCopy();
  }

  function closePrompt() {
    overlay.classList.remove('open');
  }

  overlay.querySelector('.prompt-close').addEventListener('click', closePrompt);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closePrompt(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closePrompt(); });
  copyBtn.addEventListener('click', doCopy);

  // Create floating buttons
  var container = document.createElement('div');
  container.className = 'floating-buttons';

  // Back to top
  var topBtn = document.createElement('button');
  topBtn.className = 'fab';
  topBtn.innerHTML = '&uarr;';
  topBtn.title = '回到頂部';
  topBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Prompt button
  var promptBtn = document.createElement('button');
  promptBtn.className = 'fab fab-prompt visible';
  promptBtn.innerHTML = '&#x2728;';
  promptBtn.title = '生成提示詞';
  promptBtn.addEventListener('click', openPrompt);

  container.appendChild(topBtn);
  container.appendChild(promptBtn);
  document.body.appendChild(container);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

})();
