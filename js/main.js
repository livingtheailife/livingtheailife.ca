/* ============================================================
   Living the AI Life — main.js
   ============================================================ */

'use strict';

/* ---------- Nav scroll effect ---------- */
(function () {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Mobile nav toggle ---------- */
(function () {
  var btn    = document.getElementById('nav-toggle');
  var mobile = document.getElementById('nav-mobile');
  if (!btn || !mobile) return;
  btn.addEventListener('click', function () {
    var open = mobile.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  // close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !mobile.contains(e.target)) {
      mobile.classList.remove('open');
    }
  });
})();

/* ---------- Fade-up on scroll ---------- */
(function () {
  var els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { observer.observe(el); });
})();

/* ---------- Contact form ---------- */
(function () {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.classList.add('visible');
        }
      } else {
        alert('There was an issue. Please try again.');
      }
    })
    .catch(function () {
      alert('Network error. Please try again.');
    });
  });
})();

/* ---------- Affirmation Shuffle ---------- */
(function () {
  var btn  = document.getElementById('shuffle-affirmations');
  var grid = document.getElementById('affirmation-grid');
  if (!btn || !grid) return;
  btn.addEventListener('click', function () {
    var cards = Array.from(grid.children);
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      grid.appendChild(cards[j]);
      cards.splice(j, 1);
    }
    // re-append remaining
    cards.forEach(function (c) { grid.appendChild(c); });
  });
})();

/* ================================================================
   BREATHING TIMER
================================================================ */
(function () {
  var timerEl   = document.getElementById('breathing-timer');
  if (!timerEl) return;

  var startBtn  = document.getElementById('breath-start');
  var stopBtn   = document.getElementById('breath-stop');
  var countEl   = timerEl.querySelector('.breath-count');
  var phaseEl   = timerEl.querySelector('.breath-phase');
  var labelEl   = timerEl.querySelector('.breath-label');
  var circleBg  = timerEl.querySelector('.breath-circle-bg');
  var patBtns   = timerEl.querySelectorAll('.breath-pattern-btn');

  if (!startBtn || !stopBtn || !countEl || !phaseEl || !circleBg) return;

  /* patterns: array of [phaseName, seconds] */
  var patterns = {
    '4-4-4':   [['Inhale',4],['Hold',4],['Exhale',4]],
    '4-7-8':   [['Inhale',4],['Hold',7],['Exhale',8]],
    '4-4-4-4': [['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]],
    '5-5':     [['Inhale',5],['Exhale',5]]
  };

  var currentPattern = '4-4-4';
  var timer = null;
  var phaseIndex = 0;
  var secondsLeft = 0;

  /* select pattern buttons */
  patBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (timer) return; // don't change while running
      patBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      currentPattern = b.dataset.pattern;
    });
  });
  if (patBtns.length) patBtns[0].classList.add('active');

  function getPhases() { return patterns[currentPattern] || patterns['4-4-4']; }

  function applyPhase(name, duration) {
    if (phaseEl) phaseEl.textContent = name;
    if (labelEl) labelEl.textContent = name === 'Inhale' ? 'Breathe In' : name === 'Exhale' ? 'Breathe Out' : 'Hold';
    // animate circle
    if (circleBg) {
      if (name === 'Inhale') {
        circleBg.style.transform = 'scale(1.3)';
        circleBg.style.background = 'radial-gradient(ellipse at center, rgba(157,141,241,0.22) 0%, transparent 70%)';
        circleBg.style.borderColor = 'rgba(157,141,241,0.6)';
        circleBg.style.transition  = 'all ' + duration + 's ease';
      } else if (name === 'Exhale') {
        circleBg.style.transform = 'scale(0.85)';
        circleBg.style.background = 'radial-gradient(ellipse at center, rgba(143,185,168,0.12) 0%, transparent 70%)';
        circleBg.style.borderColor = 'rgba(143,185,168,0.5)';
        circleBg.style.transition  = 'all ' + duration + 's ease';
      } else {
        circleBg.style.transition = 'none';
      }
    }
  }

  function tick() {
    var phases = getPhases();
    var phase  = phases[phaseIndex];
    applyPhase(phase[0], phase[1]);
    secondsLeft = phase[1];
    if (countEl) countEl.textContent = secondsLeft;

    timer = setInterval(function () {
      secondsLeft--;
      if (countEl) countEl.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timer);
        timer = null;
        phaseIndex = (phaseIndex + 1) % phases.length;
        tick();
      }
    }, 1000);
  }

  startBtn.addEventListener('click', function () {
    if (timer) return;
    phaseIndex = 0;
    startBtn.style.display = 'none';
    stopBtn.style.display  = 'inline-flex';
    tick();
  });

  stopBtn.addEventListener('click', function () {
    if (timer) { clearInterval(timer); timer = null; }
    startBtn.style.display = 'inline-flex';
    stopBtn.style.display  = 'none';
    if (countEl) countEl.textContent = '—';
    if (phaseEl) phaseEl.textContent = '';
    if (labelEl) labelEl.textContent = 'Ready';
    if (circleBg) {
      circleBg.style.transform  = 'scale(1)';
      circleBg.style.transition = 'all 1s ease';
      circleBg.style.background = 'radial-gradient(ellipse at center, rgba(157,141,241,0.08) 0%, transparent 70%)';
      circleBg.style.borderColor = 'rgba(157,141,241,0.18)';
    }
  });
})();

/* ================================================================
   AUDIO PLAYERS
================================================================ */
(function () {
  var cards = document.querySelectorAll('.audio-card');
  cards.forEach(function (card) {
    var playBtn = card.querySelector('.audio-play-btn');
    var fill    = card.querySelector('.audio-fill');
    var timeEl  = card.querySelector('.audio-time');
    var audio   = card.querySelector('audio');
    var track   = card.querySelector('.audio-track');
    if (!playBtn || !audio) return;

    var isPlaying = false;

    function formatTime(s) {
      if (isNaN(s)) return '0:00';
      var m = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    playBtn.addEventListener('click', function () {
      isPlaying = !isPlaying;
      if (isPlaying) {
        audio.play().catch(function () {});
        playBtn.innerHTML = '&#9646;&#9646;';
      } else {
        audio.pause();
        playBtn.innerHTML = '&#9654;';
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (!audio.duration) return;
      var pct = (audio.currentTime / audio.duration) * 100;
      if (fill) fill.style.width = pct + '%';
      if (timeEl) timeEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
    });

    audio.addEventListener('ended', function () {
      isPlaying = false;
      playBtn.innerHTML = '&#9654;';
      if (fill) fill.style.width = '0%';
    });

    if (track) {
      track.addEventListener('click', function (e) {
        if (!audio.duration) return;
        var rect = track.getBoundingClientRect();
        var pct  = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
      });
    }
  });
})();

/* ================================================================
   COPY PROMPT BUTTON (for homepage)
================================================================ */
function copyPrompt(button) {
  const promptText = button.previousElementSibling.innerText;
  navigator.clipboard.writeText(promptText).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy Prompt', 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    alert('Press Ctrl+C to copy the prompt manually.');
  });
}
