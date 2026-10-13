/**
 * SUNITA MAHESHWARI YOGA & WELLNESS
 * Interactive UI Logic & Booking Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation & Scroll Spy ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- 3. Schedule Timetable Filters ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const scheduleCards = document.querySelectorAll('.schedule-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      scheduleCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 4. Pricing Switcher (Online Zoom vs Dubai In-Person) ---
  const pricingSwitchBtns = document.querySelectorAll('.switch-btn');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const usdEquivalents = document.querySelectorAll('.usd-equivalent');

  pricingSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pricingSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.getAttribute('data-type'); // 'online' or 'inperson'

      priceAmounts.forEach(el => {
        const newPrice = el.getAttribute(`data-${type}`);
        if (newPrice) {
          el.style.opacity = '0';
          setTimeout(() => {
            el.textContent = newPrice;
            el.style.opacity = '1';
          }, 150);
        }
      });

      usdEquivalents.forEach(el => {
        const newUsd = el.getAttribute(`data-${type}`);
        if (newUsd) {
          el.textContent = newUsd;
        }
      });
    });
  });

  // --- 5. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 6. Interactive Booking Modal System ---
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const openBookingBtns = document.querySelectorAll('.open-booking-btn');
  const modalProgramSelect = document.getElementById('modalProgramSelect');
  const modalForm = document.getElementById('bookingModalForm');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const bookingSummaryBox = document.getElementById('bookingSummaryBox');
  const directWhatsAppBtn = document.getElementById('directWhatsAppBtn');
  const successUserName = document.getElementById('successUserName');

  // Pre-fill tomorrow's date for modalDate
  const modalDateInput = document.getElementById('modalDate');
  if (modalDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    modalDateInput.value = tomorrow.toISOString().split('T')[0];
    modalDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Open modal
  const openModal = (programName) => {
    if (bookingModal) {
      bookingModal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Reset states
      modalForm.style.display = 'flex';
      modalSuccessState.style.display = 'none';

      if (programName && modalProgramSelect) {
        // Attempt to match program
        let matched = false;
        for (let option of modalProgramSelect.options) {
          if (option.value.toLowerCase().includes(programName.toLowerCase()) || 
              programName.toLowerCase().includes(option.value.toLowerCase())) {
            modalProgramSelect.value = option.value;
            matched = true;
            break;
          }
        }
        if (!matched && modalProgramSelect.options.length > 0) {
          modalProgramSelect.selectedIndex = 0;
        }
      }
    }
  };

  // Close modal
  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const program = btn.getAttribute('data-program') || 'First 2 Classes Free Trial';
      openModal(program);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Modal Form Submission
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const program = modalProgramSelect.value;
      const format = document.querySelector('input[name="modalFormat"]:checked')?.value || 'Online Live Zoom';
      const time = document.getElementById('modalPreferredTime').value;
      const date = document.getElementById('modalDate').value || 'Flexible';
      const fullName = document.getElementById('modalFullName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const notes = document.getElementById('modalNotes').value.trim();

      // Show user name in success screen
      if (successUserName) successUserName.textContent = fullName;

      // Populate summary
      if (bookingSummaryBox) {
        bookingSummaryBox.innerHTML = `
          <div><strong>Program:</strong> ${program}</div>
          <div><strong>Format:</strong> ${format}</div>
          <div><strong>Preferred Time:</strong> ${time}</div>
          <div><strong>Start Date:</strong> ${date}</div>
          <div><strong>Contact:</strong> ${phone}</div>
          ${notes ? `<div><strong>Notes:</strong> ${notes}</div>` : ''}
        `;
      }

      // Generate pre-filled WhatsApp message
      const waMessage = `Hello Sunita Maheshwari, I would like to book a yoga session from your website:
• Name: ${fullName}
• Program: ${program}
• Format: ${format}
• Preferred Time: ${time}
• Date: ${date}
• Phone: ${phone}
${notes ? `• Health Notes: ${notes}` : ''}
Please confirm my trial / session. Thank you!`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/971503560089?text=${encodedMessage}`;

      if (directWhatsAppBtn) {
        directWhatsAppBtn.href = waUrl;
      }

      // Swap to success screen
      modalForm.style.display = 'none';
      modalSuccessState.style.display = 'block';
    });
  }

  // --- 7. Main Contact Form Submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const program = document.getElementById('formProgram').value;
      const format = document.querySelector('input[name="format"]:checked')?.value || 'Online Zoom';
      const message = document.getElementById('formMessage').value.trim();

      const waMsg = `Hello Sunita, I sent an inquiry through your website:
• Name: ${name}
• WhatsApp/Phone: ${phone}
${email ? `• Email: ${email}\n` : ''}• Program: ${program}
• Format: ${format}
${message ? `• Message: ${message}` : ''}`;

      const waUrl = `https://wa.me/971503560089?text=${encodeURIComponent(waMsg)}`;

      // Confirmation alert & redirect to WhatsApp
      alert(`Thank you, ${name}! Your booking inquiry has been recorded. We are redirecting you to WhatsApp to connect with Sunita directly.`);
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

});
