/**
 * GYMX Fitness — Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBmiCalculator();
  initTrialModal();
  initQuickAdmissionForm();
  initCapsuleSpy();
  initScrollReveal();
  initInteractive3DTilt();
  initAnimatedCounters();
  initDynamicEmbers();
});

/* ========================================================
   1. MOBILE MENU DRAWER
   ======================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const icon = btn.querySelector('i');
    if (drawer.classList.contains('open')) {
      icon.className = 'ri-close-line';
    } else {
      icon.className = 'ri-menu-4-line';
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'ri-menu-4-line';
    });
  });
}

/* ========================================================
   2. CAPSULE MENU ACTIVE SPY
   ======================================================== */
function initCapsuleSpy() {
  const links = document.querySelectorAll('.capsule-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ========================================================
   3. BMI CALCULATOR
   ======================================================== */
function initBmiCalculator() {
  const form = document.getElementById('bmiForm');
  const panel = document.getElementById('bmiResultPanel');
  const scoreEl = document.getElementById('bmiScoreText');
  const badgeEl = document.getElementById('bmiCategoryBadge');
  const adviceEl = document.getElementById('bmiAdviceText');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const heightCm = parseFloat(document.getElementById('calcHeight').value);
    const weightKg = parseFloat(document.getElementById('calcWeight').value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      alert('Please enter valid height and weight.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    if (scoreEl) scoreEl.textContent = bmi;

    let cat = '';
    let color = '';
    let advice = '';

    if (bmi < 18.5) {
      cat = 'Underweight';
      color = '#38bdf8';
      advice = 'We recommend our heavy Muscle Building routine with calorie surplus.';
    } else if (bmi >= 18.5 && bmi < 25) {
      cat = 'Healthy Range';
      color = '#34d399';
      advice = 'Optimal physique! Balance strength training with boxing & yoga.';
    } else if (bmi >= 25 && bmi < 30) {
      cat = 'Overweight';
      color = '#fbbf24';
      advice = 'Boost high-energy boxing and aerobics classes for fat loss.';
    } else {
      cat = 'Obesity Category';
      color = '#ef4444';
      advice = 'Start with trainer-guided cardio and conditioning routines.';
    }

    if (badgeEl) {
      badgeEl.textContent = cat;
      badgeEl.style.color = color;
    }
    if (adviceEl) adviceEl.textContent = advice;

    if (panel) panel.style.display = 'block';
  });
}

/* ========================================================
   3.5. QUICK ADMISSION & DIRECT WHATSAPP ENGINE (7307123761)
   ======================================================== */
function initQuickAdmissionForm() {
  const form = document.getElementById('fastAdmissionForm');
  const planSelect = document.getElementById('joinPlanSelect');
  const previewPlanName = document.getElementById('previewPlanName');
  const previewPlanPrice = document.getElementById('previewPlanPrice');
  const previewBox = document.getElementById('selectedPlanPreviewBox');
  const statusBox = document.getElementById('joinFormStatus');

  // Real-time Plan & Price Live Preview
  if (planSelect && previewPlanName && previewPlanPrice) {
    const updatePreview = () => {
      const selectedOption = planSelect.options[planSelect.selectedIndex];
      if (selectedOption) {
        const fullText = selectedOption.text.trim();
        const price = selectedOption.getAttribute('data-price') || '';
        // Extract clean plan name
        const cleanName = fullText.replace(/^[^\w\s]+/, '').split('—')[0].trim();
        previewPlanName.textContent = cleanName;
        previewPlanPrice.textContent = price;

        if (previewBox) {
          previewBox.style.transform = 'scale(1.02)';
          previewBox.style.borderColor = '#25d366';
          setTimeout(() => {
            previewBox.style.transform = 'scale(1)';
            previewBox.style.borderColor = 'rgba(255, 69, 0, 0.35)';
          }, 350);
        }
      }
    };

    planSelect.addEventListener('change', updatePreview);
    updatePreview();
  }

  // Handle Form Submission -> Direct WhatsApp (+91 7307123761)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('joinFullName');
      const phoneInput = document.getElementById('joinPhoneNumber');
      const planInput = document.getElementById('joinPlanSelect');
      const slotInput = document.getElementById('joinSlotSelect');
      const goalInput = document.getElementById('joinGoalSelect');
      const aboutInput = document.getElementById('joinAboutNotes');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const plan = planInput ? planInput.value.trim() : '';
      const slot = slotInput ? slotInput.value.trim() : '';
      const goal = goalInput ? goalInput.value.trim() : '';
      const about = aboutInput ? aboutInput.value.trim() : '';

      // Validate Name
      if (!name) {
        showStatus('Kripya apna pura naam darj karein (Please enter your name).', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      // Validate Phone Number
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        showStatus('Kripya 10-digit valid WhatsApp mobile number darj karein.', 'error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      showStatus('Submitting! Opening WhatsApp with Fire Ultimate Gym (+91 7307123761)...', 'success');

      // Structured WhatsApp Message
      const message = 
`*🔥 FIRE ULTIMATE GYM - ADMISSION & MEMBERSHIP ENQUIRY 🔥*
----------------------------------------------------
👤 *Full Name:* ${name}
📱 *Phone Number:* ${phone}
💳 *Selected Plan:* ${plan}
⏰ *Preferred Timing:* ${slot}
🎯 *Fitness Goal:* ${goal}
📝 *About / Notes:* ${about ? about : 'Standard membership enquiry'}
----------------------------------------------------
📍 *Gym Location:* Bargadi, Bakshi Ka Talab, Lucknow (UP 226201)
💬 *Sent via Fire Ultimate Gym Official Website*`;

      const whatsappUrl = `https://wa.me/917307123761?text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        form.reset();
        if (planSelect) {
          planSelect.selectedIndex = 0;
          planSelect.dispatchEvent(new Event('change'));
        }
      }, 500);
    });
  }

  function showStatus(msg, type) {
    if (!statusBox) return;
    statusBox.className = `form-status-box ${type}`;
    statusBox.innerHTML = type === 'success' 
      ? `<i class="ri-check-double-line"></i> ${msg}`
      : `<i class="ri-error-warning-line"></i> ${msg}`;
    statusBox.style.display = 'flex';
  }
}

/* ========================================================
   4. TRIAL PASS & WHATSAPP INTEGRATION (+91 7307123761)
   ======================================================== */
function initTrialModal() {
  const modal = document.getElementById('trialModal');
  const openButtons = document.querySelectorAll('.open-trial-modal');
  const form = document.getElementById('trialForm');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.dataset.plan;
      if (plan) {
        // Also sync with the main page join form if present
        const mainSelect = document.getElementById('joinPlanSelect');
        if (mainSelect) {
          for (let i = 0; i < mainSelect.options.length; i++) {
            if (mainSelect.options[i].value.toLowerCase().includes(plan.toLowerCase())) {
              mainSelect.selectedIndex = i;
              mainSelect.dispatchEvent(new Event('change'));
              break;
            }
          }
        }

        const select = document.getElementById('trialInterest');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(plan.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
      if (modal) modal.style.display = 'flex';
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('trialName').value.trim();
      const phone = document.getElementById('trialPhone').value.trim();
      const interest = document.getElementById('trialInterest').value;

      const text = `*🔥 FIRE ULTIMATE GYM (Bakshi Ka Talab, Lucknow)*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *WhatsApp:* ${phone}\n` +
        `🎯 *Interested In:* ${interest}\n` +
        `📍 *Location:* Bargadi, Bakshi Ka Talab, Lucknow (UP 226201)\n\n` +
        `Please share membership details and free 1-day pass!`;

      const url = `https://wa.me/917307123761?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      closeTrialModal();
      form.reset();
    });
  }
}

window.closeTrialModal = function() {
  const modal = document.getElementById('trialModal');
  if (modal) modal.style.display = 'none';
};

/* ========================================================
   5. LIGHTBOX
   ======================================================== */
window.openLightbox = function(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = src;
    img.alt = caption;
    if (cap) cap.textContent = caption;
    modal.style.display = 'flex';
  }
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.style.display = 'none';
};

// Keyboard escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeTrialModal();
  }
});

/* ========================================================
   6. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
   ======================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ========================================================
   7. INTERACTIVE 3D MOUSE PARALLAX & TILT ENGINE
   ======================================================== */
function initInteractive3DTilt() {
  const cards = document.querySelectorAll(
    '.service-trio-card, .rate-card, .review-box, .fac-card, .stat-capsule-card, .loc-card-3d, .video-card-main, .video-mini-card'
  );

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  cards.forEach(card => {
    if (!card.querySelector('.card-parallax-sheen')) {
      const sheen = document.createElement('div');
      sheen.className = 'card-parallax-sheen';
      card.appendChild(sheen);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6.5;
      const rotateY = ((x - centerX) / centerX) * 6.5;

      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

/* ========================================================
   8. ANIMATED STAT COUNTERS ENGINE
   ======================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.count-up');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const isDecimal = el.dataset.decimal === 'true';
        const duration = parseInt(el.dataset.duration) || 1600;
        
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = target * easeProgress;
          
          el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target}${suffix}`;
          }
        };
        
        window.requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* ========================================================
   9. DYNAMIC BACKGROUND FIRE EMBERS INJECTION
   ======================================================== */
function initDynamicEmbers() {
  const container = document.querySelector('.fire-embers-layer');
  if (!container) return;

  for (let i = 7; i <= 16; i++) {
    const ember = document.createElement('div');
    ember.className = `ember e${i}`;
    const size = Math.floor(Math.random() * 4) + 3;
    const left = Math.floor(Math.random() * 92) + 4;
    const duration = (Math.random() * 7 + 8).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);
    
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.left = `${left}%`;
    ember.style.bottom = '-20px';
    ember.style.animationDuration = `${duration}s`;
    ember.style.animationDelay = `${delay}s`;
    
    container.appendChild(ember);
  }
}

