// Navigation menu toggle on small screens
const toggleButton = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Smooth scrolling
const navLinks = document.querySelectorAll('header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Tabbed content
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabs.forEach(tab => {
  tab.addEventListener('click', changeTabPanel);
});

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);

  targetTab.setAttribute('aria-selected', true);
  
  mainContainer
    .querySelectorAll('[role="tabpanel"]')
    .forEach(panel => panel.setAttribute('hidden', true));
  
  mainContainer.querySelector([`#${targetPanel}`])
    .removeAttribute('hidden');
}

// Accordion 
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const accordionContent = button.nextElementSibling;
    
    button.classList.toggle('active');
    if(button.classList.contains('active')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});

// Modal dialogs
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalTarget = document.querySelector(button.dataset.modalTarget);
    openModal(modalTarget);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalTarget = button.closest('.modal');
    closeModal(modalTarget);
  });
});

function openModal(modal) {
  if(modal == null) return;
  modal.classList.add('active');
}

function closeModal(modal) {
  if(modal == null) return;
  modal.classList.remove('active');  
}

// Contact form validation
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  if(nameInput.value.trim() === '') {
    alert('Please enter your name');
    return;
  }
  
  if(emailInput.value.trim() === '') {
    alert('Please enter your email');
    return;
  }
  
  if(!isValidEmail(emailInput.value)) {
    alert('Please enter a valid email');
    return;
  }
  
  if(messageInput.value.trim() === '') {
    alert('Please enter a message');
    return;
  }
  
  // Form is valid
  form.submit();
  
});

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email); 
}

// Auto-resize textarea
const textarea = document.querySelector('textarea');

textarea.addEventListener('input', autoResize);

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}

// Image gallery
const gallery = document.querySelector('#gallery');
const galleryItems = gallery.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', e => {
    const imgSrc = item.querySelector('img').src;
    showFullImage(imgSrc);
  });
});

function showFullImage(imgSrc) {
  const modal = document.querySelector('#gallery-modal');
  modal.querySelector('img').src = imgSrc;
  modal.style.display = 'flex';
  
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

// Fetch and display student testimonials
getTestimonials();

async function getTestimonials() {
  const response = await fetch('testimonials.json');
  const data = await response.json();

  displayTestimonials(data);
}

function displayTestimonials(testimonials) {
  const container = document.querySelector('#testimonials');

  testimonials.forEach(testimonial => {
    const div = document.createElement('div');
    div.classList.add('testimonial');

    div.innerHTML = `
      <blockquote>${testimonial.quote}</blockquote>
      <p>${testimonial.name}, ${testimonial.program}</p>
    `;

    container.appendChild(div);
  });
}