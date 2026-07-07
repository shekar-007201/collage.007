// ============================================================
//  VIDYASAGAR COLLEGE — MAIN JAVASCRIPT
// ============================================================

// --- MOBILE MENU TOGGLE ---
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
    });
  });
});

// --- FACULTY FILTER ---
function filterFaculty(dept, btn) {
  const cards = document.querySelectorAll('.faculty-card');
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  cards.forEach(card => {
    if (dept === 'all' || card.dataset.dept === dept) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// --- NOTICE BOARD FILTER ---
function filterNotices(cat, btn) {
  const items = document.querySelectorAll('.notice-item');
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // also reset search
  const searchInput = document.getElementById('noticeSearch');
  if (searchInput) searchInput.value = '';

  let visible = 0;
  items.forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
      visible++;
    } else {
      item.style.display = 'none';
    }
  });

  const noNotices = document.getElementById('noNotices');
  if (noNotices) noNotices.style.display = visible === 0 ? 'block' : 'none';
}

// --- NOTICE SEARCH ---
function searchNotices() {
  const query = document.getElementById('noticeSearch').value.toLowerCase().trim();
  const items = document.querySelectorAll('.notice-item');

  // reset category buttons
  document.querySelectorAll('.filter-btn').forEach((b, i) => {
    b.classList.remove('active');
    if (i === 0) b.classList.add('active');
  });

  let visible = 0;
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(query)) {
      item.style.display = '';
      visible++;
    } else {
      item.style.display = 'none';
    }
  });

  const noNotices = document.getElementById('noNotices');
  if (noNotices) noNotices.style.display = visible === 0 ? 'block' : 'none';
}

// --- FEE TABLE TABS ---
function showFeeTable(type, btn) {
  document.querySelectorAll('.fee-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.fee-table-wrap').forEach(table => {
    table.style.display = 'none';
  });

  const target = document.getElementById('fee-' + type);
  if (target) target.style.display = 'block';
}

// --- PAYMENT FORM SUBMISSION ---
function submitPayment() {
  const name    = document.getElementById('payName')?.value.trim();
  const roll    = document.getElementById('payRoll')?.value.trim();
  const year    = document.getElementById('payYear')?.value;
  const dept    = document.getElementById('payDept')?.value;
  const feeType = document.getElementById('payFeeType')?.value;
  const amount  = document.getElementById('payAmount')?.value.trim();
  const txn     = document.getElementById('payTxn')?.value.trim();
  const errBox  = document.getElementById('payError');

  if (!name || !roll || !year || !dept || !feeType || !amount || !txn) {
    errBox.style.display = 'block';
    errBox.textContent = '⚠ Please fill all required fields before submitting.';
    return;
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    errBox.style.display = 'block';
    errBox.textContent = '⚠ Please enter a valid payment amount.';
    return;
  }

  errBox.style.display = 'none';

  // Generate receipt ID
  const receiptId = 'VCE-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000);
  document.getElementById('receiptId').textContent = receiptId;

  document.getElementById('payForm').style.display = 'none';
  document.getElementById('paySuccess').style.display = 'block';
}

function resetPayForm() {
  document.getElementById('payForm').style.display = 'block';
  document.getElementById('paySuccess').style.display = 'none';
  document.getElementById('payName').value = '';
  document.getElementById('payRoll').value = '';
  document.getElementById('payAmount').value = '';
  document.getElementById('payTxn').value = '';
  document.getElementById('payRemarks').value = '';
  document.getElementById('payYear').value = '';
  document.getElementById('payDept').value = '';
  document.getElementById('payFeeType').value = '';
  document.getElementById('payError').style.display = 'none';
}

// --- CONTACT FORM SUBMISSION ---
function submitContact() {
  const name    = document.getElementById('cName')?.value.trim();
  const email   = document.getElementById('cEmail')?.value.trim();
  const subject = document.getElementById('cSubject')?.value;
  const message = document.getElementById('cMessage')?.value.trim();
  const errBox  = document.getElementById('contactError');

  if (!name || !email || !subject || !message) {
    errBox.style.display = 'block';
    errBox.textContent = '⚠ Please fill all required fields.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errBox.style.display = 'block';
    errBox.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  errBox.style.display = 'none';
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
}

function resetContact() {
  document.getElementById('contactForm').style.display = 'block';
  document.getElementById('contactSuccess').style.display = 'none';
  ['cName', 'cEmail', 'cPhone', 'cMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const sel = document.getElementById('cSubject');
  if (sel) sel.value = '';
  const err = document.getElementById('contactError');
  if (err) err.style.display = 'none';
}

// --- SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatables = document.querySelectorAll(
    '.dept-card, .why-card, .faculty-card, .notice-home-item, .tl-content, .infra-card, .vm-card, .contact-card, .dept-contact-card'
  );

  animatables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
});
