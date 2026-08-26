(function () {
  if (document.getElementById('guru-widget')) return;

  /* ── Styles ─────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    #guru-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #F47B5A; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(244,123,90,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
    }
    #guru-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(244,123,90,.55); }
    #guru-btn img { width: 34px; height: 34px; object-fit: contain; border-radius: 50%; background: #fff; }
    #guru-btn svg { display: none; }
    #guru-btn.open img { display: none; }
    #guru-btn.open svg { display: block; }

    #guru-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9998;
      width: 360px; max-width: calc(100vw - 32px);
      background: #111; border-radius: 16px;
      box-shadow: 0 16px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.07);
      display: flex; flex-direction: column;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      opacity: 0; transform: translateY(12px) scale(.97);
      pointer-events: none;
      transition: opacity .22s ease, transform .22s ease;
    }
    #guru-panel.open {
      opacity: 1; transform: translateY(0) scale(1); pointer-events: all;
    }

    #guru-header {
      background: #0A0A0A; padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
      border-bottom: 1px solid rgba(255,255,255,.07);
      flex-shrink: 0;
    }
    #guru-header img { width: 32px; height: 32px; object-fit: contain; border-radius: 50%; background: #fff; padding: 2px; }
    #guru-header-text { flex: 1; }
    #guru-header-name { font-size: .82rem; font-weight: 700; color: #F0EDE8; letter-spacing: .2px; }
    #guru-header-status { font-size: .72rem; color: rgba(240,237,232,.45); margin-top: 1px; }
    #guru-clear {
      background: none; border: none; cursor: pointer;
      color: rgba(240,237,232,.35); font-size: .72rem;
      font-family: 'Montserrat', sans-serif;
      padding: 4px 8px; border-radius: 4px;
      transition: color .15s;
    }
    #guru-clear:hover { color: rgba(240,237,232,.7); }

    #guru-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      min-height: 280px; max-height: 360px;
    }
    #guru-messages::-webkit-scrollbar { width: 4px; }
    #guru-messages::-webkit-scrollbar-track { background: transparent; }
    #guru-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }

    .guru-msg { display: flex; gap: 8px; align-items: flex-end; max-width: 100%; }
    .guru-msg.user { flex-direction: row-reverse; }
    .guru-msg-avatar { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; background: #fff; padding: 2px; object-fit: contain; }
    .guru-msg-bubble {
      padding: 9px 13px; border-radius: 14px;
      font-size: .82rem; line-height: 1.6; max-width: 82%;
      word-break: break-word;
    }
    .guru-msg.bot .guru-msg-bubble {
      background: #1C1C1C; color: #F0EDE8;
      border-bottom-left-radius: 4px;
    }
    .guru-msg.user .guru-msg-bubble {
      background: #F47B5A; color: #111;
      border-bottom-right-radius: 4px; font-weight: 500;
    }
    .guru-msg-bubble a { color: #F47B5A; }
    .guru-msg.user .guru-msg-bubble a { color: #111; text-decoration: underline; }

    .guru-typing span {
      display: inline-block; width: 6px; height: 6px;
      background: rgba(240,237,232,.4); border-radius: 50%; margin: 0 2px;
      animation: guru-bounce .9s infinite;
    }
    .guru-typing span:nth-child(2) { animation-delay: .15s; }
    .guru-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes guru-bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-5px); }
    }

    #guru-input-row {
      padding: 12px; border-top: 1px solid rgba(255,255,255,.07);
      display: flex; gap: 8px; flex-shrink: 0;
    }
    #guru-input {
      flex: 1; background: #1C1C1C; border: 1px solid rgba(255,255,255,.1);
      border-radius: 10px; padding: 9px 12px;
      color: #F0EDE8; font-family: 'Montserrat', sans-serif; font-size: .82rem;
      resize: none; outline: none; line-height: 1.5;
      transition: border-color .15s;
    }
    #guru-input::placeholder { color: rgba(240,237,232,.3); }
    #guru-input:focus { border-color: rgba(244,123,90,.5); }
    #guru-send {
      width: 38px; height: 38px; border-radius: 10px;
      background: #F47B5A; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity .15s; align-self: flex-end;
    }
    #guru-send:hover { opacity: .85; }
    #guru-send:disabled { opacity: .4; cursor: default; }
    #guru-send svg { width: 16px; height: 16px; fill: #111; }

    @media (max-width: 480px) {
      #guru-panel {
        bottom: 0; right: 0; left: 0; width: 100%;
        border-radius: 20px 20px 0 0; max-width: 100%;
      }
      #guru-btn { bottom: 16px; right: 16px; }
      #guru-messages { max-height: 45vh; }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ────────────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'guru-widget';
  root.innerHTML = `
    <div id="guru-panel" role="dialog" aria-label="Chat with Guru">
      <div id="guru-header">
        <img src="/images/logo.png" alt="Guru">
        <div id="guru-header-text">
          <div id="guru-header-name">Guru</div>
          <div id="guru-header-status">thegurucool.ai assistant</div>
        </div>
        <button id="guru-clear" title="Clear chat">Clear</button>
      </div>
      <div id="guru-messages"></div>
      <div id="guru-input-row">
        <textarea id="guru-input" rows="1" placeholder="Ask me anything…" aria-label="Message"></textarea>
        <button id="guru-send" aria-label="Send">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>

    <button id="guru-btn" aria-label="Chat with Guru">
      <img src="/images/logo.png" alt="Guru">
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  `;
  document.body.appendChild(root);

  /* ── State ───────────────────────────────────────────── */
  const GREETING = "Hi, I'm Guru. I can tell you about thegurucool, how it works, who it's for, and how to get started. What would you like to know?";
  let messages = [];
  let streaming = false;

  const panel = document.getElementById('guru-panel');
  const btn = document.getElementById('guru-btn');
  const messagesEl = document.getElementById('guru-messages');
  const input = document.getElementById('guru-input');
  const sendBtn = document.getElementById('guru-send');
  const clearBtn = document.getElementById('guru-clear');

  /* ── Helpers ─────────────────────────────────────────── */
  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderMessage(role, text) {
    const wrap = document.createElement('div');
    wrap.className = `guru-msg ${role}`;
    if (role === 'bot') {
      wrap.innerHTML = `<img class="guru-msg-avatar" src="/images/logo.png" alt="Guru"><div class="guru-msg-bubble"></div>`;
    } else {
      wrap.innerHTML = `<div class="guru-msg-bubble"></div>`;
    }
    messagesEl.appendChild(wrap);
    const bubble = wrap.querySelector('.guru-msg-bubble');
    bubble.innerHTML = linkify(text);
    scrollBottom();
    return bubble;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'guru-msg bot';
    wrap.id = 'guru-typing';
    wrap.innerHTML = `<img class="guru-msg-avatar" src="/images/logo.png" alt="Guru"><div class="guru-msg-bubble guru-typing"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function linkify(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, '<br>');
  }

  function setLoading(on) {
    streaming = on;
    sendBtn.disabled = on;
    input.disabled = on;
  }

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  }

  /* ── Send ────────────────────────────────────────────── */
  async function send() {
    const text = input.value.trim();
    if (!text || streaming) return;

    input.value = '';
    input.style.height = 'auto';
    messages.push({ role: 'user', content: text });
    renderMessage('user', text);
    setLoading(true);

    const typing = showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) throw new Error('Request failed');

      typing.remove();
      const bubble = renderMessage('bot', '');
      let reply = '';

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const chunk = JSON.parse(data);
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
              reply += delta;
              bubble.innerHTML = linkify(reply);
              scrollBottom();
            }
          } catch {}
        }
      }

      messages.push({ role: 'assistant', content: reply });
    } catch {
      typing.remove();
      renderMessage('bot', 'Sorry, something went wrong. Please try again or email admin@thegurucool.ai.');
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  /* ── Open / close ────────────────────────────────────── */
  function openPanel() {
    panel.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    if (messages.length === 0) renderMessage('bot', GREETING);
    setTimeout(() => input.focus(), 250);
  }

  function closePanel() {
    panel.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });

  clearBtn.addEventListener('click', () => {
    messages = [];
    messagesEl.innerHTML = '';
    renderMessage('bot', GREETING);
  });

  /* ── Input events ────────────────────────────────────── */
  input.addEventListener('input', autoResize);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  sendBtn.addEventListener('click', send);

  /* ── Keyboard close ──────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
})();
