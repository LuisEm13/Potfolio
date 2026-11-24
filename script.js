'use strict';

// Social profile links. Empty values show a labeled placeholder.
const CONFIG = {
  github: 'https://github.com/LuisEm13',
  linkedin: 'https://www.linkedin.com/in/luis-emmanuel-reyes-44266440a/',
  contactEndpoint: '' // Optional HTTPS email-service endpoint accepting JSON.
};

const skillGroups = [
  ['code-2', 'Programming', ['Java', 'JavaScript', 'Python']],
  ['database', 'Database & Local Development', ['MongoDB', 'MySQL', 'XAMPP']],
  ['pencil-ruler', 'Development & Design Tools', ['GitHub', 'Figma', 'Visual Studio Code', 'NetBeans']],
  ['network', 'Networking', ['TCP/IP', 'DNS', 'DHCP', 'IPv4 & IPv6', 'Router & Switch Configuration', 'RJ-45 Crimping', 'Wi-Fi Setup', 'Subnetting', 'Cisco Packet Tracer']],
  ['wrench', 'Other Skills', ['System Documentation', 'Troubleshooting', 'Basic Networking', 'Agile Software Development']]
];
document.querySelector('#skills-grid').innerHTML = skillGroups.map(([icon, title, skills]) => `<article class="skill-card reveal"><span class="skill-icon"><i data-lucide="${icon}"></i></span><h3>${title}</h3><div class="tags">${skills.map(skill => `<span>${skill}</span>`).join('')}</div></article>`).join('');

const certificates = [
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'November 20, 2026', file: 'image/Certificate3.png' },
  { title: 'Programming Month 2025 – Machine Learning: Principles and Overview', issuer: 'ICPEP.SE – BulSU Meneses Campus', date: 'October 11, 2025', file: 'image/Certificate2.png' },
  { title: 'Malikhaing Pinoy Intellectual Property Registration Information Session', issuer: 'Department of Trade and Industry (DTI) & IPOPHL', date: 'October 22, 2025 · Online', file: 'image/Certificate1.png' }
];
document.querySelector('#cert-grid').innerHTML = certificates.map((cert, i) => `<article class="cert-card reveal"><button class="cert-thumbnail" data-certificate="${i}" aria-label="Preview ${cert.title}"><img src="${cert.file}" alt="${cert.title} certificate awarded to Luis Emmanuel Reyes" loading="lazy"></button><div class="cert-copy"><p class="eyebrow">${cert.date}</p><h3>${cert.title}</h3><p>${cert.issuer}</p><button class="text-button" data-certificate="${i}">View Certificate <i data-lucide="expand"></i></button></div></article>`).join('');

if (window.lucide) window.lucide.createIcons();
const menu = document.querySelector('#navigation');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }
menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  const navLinks = [...menu.querySelectorAll('a')];
  const sections = navLinks.map(link => document.querySelector(link.hash));
  let ticking = false;
  function updateActive() {
    const position = window.scrollY + 160;
    let current = sections[0];
    sections.forEach(section => { if (section.offsetTop <= position) current = section; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) current = sections[sections.length - 1];
    navLinks.forEach(link => { const active = link.hash === `#${current.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    ticking = false;
  }
  // Section order follows the document, even though About appears earlier in the menu.
  sections.sort((a, b) => a.offsetTop - b.offsetTop);
  window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(updateActive); ticking = true; } }, { passive: true });
  updateActive();
}

const dialog = document.querySelector('#preview-dialog');
let previewTrigger;
function openPreview(title, file, description = '', trigger) {
  previewTrigger = trigger;
  document.querySelector('#preview-title').textContent = title;
  const img = document.querySelector('#preview-image'); img.src = file; img.alt = title;
  document.querySelector('#preview-description').textContent = description;
  dialog.showModal(); document.body.style.overflow = 'hidden';
}
document.querySelectorAll('[data-certificate]').forEach(button => button.addEventListener('click', () => { const cert = certificates[Number(button.dataset.certificate)]; openPreview(cert.title, cert.file, `${cert.issuer} · ${cert.date}`, button); }));
document.querySelector('#network-preview').addEventListener('click', event => openPreview('Small Network Design and Configuration', 'image/Small Network Design and Configuration.png', 'Academic Networking Project · November 2026. Designed and simulated a small computer network using Cisco Packet Tracer. Configured routers, switches, and end devices, applied IP addressing and subnetting, tested connectivity, and performed basic troubleshooting.', event.currentTarget));
document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; previewTrigger?.focus(); });

let toastTimer;
document.querySelectorAll('[data-social]').forEach(button => {
  const type = button.dataset.social;
  if (CONFIG[type]) {
    const link = document.createElement('a'); link.className = button.className; link.href = CONFIG[type]; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.innerHTML = button.innerHTML; link.querySelector('small')?.remove(); link.setAttribute('aria-label', type === 'github' ? 'GitHub profile' : 'LinkedIn profile'); button.replaceWith(link);
  } else button.addEventListener('click', () => {
    const toast = document.querySelector('#toast'); toast.textContent = `${type === 'github' ? 'GitHub' : 'LinkedIn'} profile coming soon. You can reach me by email.`; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 4500);
  });
});

document.querySelector('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));
  const status = document.querySelector('#form-status');
  if (!CONFIG.contactEndpoint) {
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    const gmailUrl = new URL('https://mail.google.com/mail/');
    gmailUrl.search = new URLSearchParams({ view: 'cm', fs: '1', to: 'luisemmanuelreyes13@gmail.com', su: values.subject, body }).toString();
    window.open(gmailUrl.href, '_blank', 'noopener,noreferrer');
    status.textContent = 'Continue in Gmail to review and send your message. If the tab did not open, use the Gmail link below.';
    return;
  }
  const submit = form.querySelector('[type="submit"]'); submit.disabled = true; status.textContent = 'Sending your message…';
  try {
    const response = await fetch(CONFIG.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Thank you! Your message was sent.'; form.reset();
  } catch { status.textContent = 'Your message could not be sent. Please use the direct email link below.'; }
  finally { submit.disabled = false; }
});
