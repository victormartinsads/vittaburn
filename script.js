/* ==========================================================================
   VITTABURN INTERACTIVE & URGENCY JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initStockCounter();
  initFaqAccordion();
  initSaleToasts();
  initAffiliateLinksCheck();
});

/* --------------------------------------------------------------------------
   1. COUNTDOWN TIMER (15 Minutes Urgency Loop)
   -------------------------------------------------------------------------- */
function initCountdown() {
  const timerElement = document.getElementById('countdown-timer');
  if (!timerElement) return;

  let totalSeconds = 14 * 60 + 52; // 14 mins 52 secs

  const interval = setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 15 * 60; // reset
    } else {
      totalSeconds--;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMins = String(minutes).padStart(2, '0');
    const formattedSecs = String(seconds).padStart(2, '0');

    timerElement.textContent = `${formattedMins}:${formattedSecs}`;
  }, 1000);
}

/* --------------------------------------------------------------------------
   2. DYNAMIC STOCK DECREASE COUNTER
   -------------------------------------------------------------------------- */
function initStockCounter() {
  const stockElement = document.getElementById('stock-count');
  if (!stockElement) return;

  let stock = 14;

  const stockInterval = setInterval(() => {
    if (stock > 4) {
      stock--;
      stockElement.textContent = stock;
    } else {
      clearInterval(stockInterval);
    }
  }, 25000); // decreases every 25 seconds down to 4
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION INTERACTION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. LIVE RECENT SALE TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
const recentSales = [
  { name: 'Sarah M.', location: 'Austin, TX', package: '6 Bottles Package (Best Value)', time: '1 min ago' },
  { name: 'Michael K.', location: 'Miami, FL', package: '6 Bottles Package', time: '3 mins ago' },
  { name: 'Amanda P.', location: 'Denver, CO', package: '3 Bottles Package', time: '5 mins ago' },
  { name: 'David L.', location: 'Phoenix, AZ', package: '6 Bottles Package (Best Value)', time: '2 mins ago' },
  { name: 'Rachel B.', location: 'Seattle, WA', package: '6 Bottles Package', time: '4 mins ago' }
];

function initSaleToasts() {
  const toastContainer = document.getElementById('sale-toast');
  if (!toastContainer) return;

  let index = 0;

  function showNextToast() {
    const sale = recentSales[index];
    document.getElementById('toast-buyer').textContent = sale.name;
    document.getElementById('toast-loc').textContent = sale.location;
    document.getElementById('toast-pkg').textContent = sale.package;
    document.getElementById('toast-time').textContent = sale.time;

    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 5000);

    index = (index + 1) % recentSales.length;
  }

  // Initial delay 4s, then repeat every 18s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 18000);
  }, 4000);
}

/* --------------------------------------------------------------------------
   5. STRICT AFFILIATE PARAMETER CHECK
   Ensures aff_id=151798 is always present on every buy click
   -------------------------------------------------------------------------- */
function initAffiliateLinksCheck() {
  const buyLinks = document.querySelectorAll('a[href*="buygoods.com"]');
  buyLinks.forEach(link => {
    let href = link.getAttribute('href');
    if (href && !href.includes('aff_id=')) {
      const separator = href.includes('?') ? '&' : '?';
      link.setAttribute('href', `${href}${separator}aff_id=151798`);
    }

    // Google Ads Checkout Event Tracking
    link.addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'begin_checkout', {
          'send_to': 'AW-18349502774'
        });
      }
    });
  });
}
