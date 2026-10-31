// Add the supplied hero video URL here when the video file is available.
const HERO_VIDEO = 'assets/VideoBanner.mp4';
if (HERO_VIDEO) {
  document.getElementById('hero-video').src = HERO_VIDEO;
}
const outlets = [
  'Gombak',
  'Maxim Baru',
  'Sri Rampai',
  'Razak City',
  'Batu Caves',
  'Shah Alam',
  'Cyberjaya',
  'Eco Grandeur',
  'Sentosa Square',
  'Batang Kali'
];
document.getElementById('outlet-list').innerHTML = outlets.map((name, i) => `<a class="outlet" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Ayam Gepuk Ori Selayang '+name)}" target="_blank" rel="noopener"><small>${String(i+1).padStart(2,'0')}</small><span>${name}</span>${i===9?'<span class="hq">HQ</span>':''}<span class="arrow">view</span></a>`).join('');
const sets = [
  ['A', 'The original favourite', 'Nasi + ayam gepuk + timun & kubis.'],
  ['B', 'A little extra comfort', 'Nasi + ayam gepuk + timun + kubis + tempe.'],
  ['C', 'For the hearty appetite', 'Nasi + ayam gepuk + timun + kubis + tauhu + pedal ayam.'],
  ['D', 'The full Ori experience', 'Nasi + ayam gepuk + timun + kubis goreng + tauhu + tempe + hati + pedal ayam.']
];
document.getElementById('sets').innerHTML = sets.map(([letter, tag, desc], i) => `<article class="set"><div class="set-copy"><span class="set-number">0${i+1} / ${tag}</span><h3>ORI SET <em>${letter}</em></h3><p>${desc}</p><p class="sambal-note">+ Sambal Gajus & Sambal Biasa</p></div><div class="board"><img class="peel" src="assets/WoodPizzaPeel.png" alt="" loading="lazy"><img class="meal" src="assets/OriSet${letter}.png" alt="Ori Set ${letter}" loading="lazy"><img class="sambal gajus" src="assets/SambalGajus.png" alt="Sambal Gajus" loading="lazy"><img class="sambal biasa" src="assets/SambalBiasa.png" alt="Sambal Biasa" loading="lazy"></div></article>`).join('');
const groups = {
  'classic-items': [
    ['LimauAis',
      'Limau Ais'],
    ['SirapAis',
      'Sirap Ais'],
    ['TehO',
      'Teh O']
  ],
  'exclusive-items': [
    ['CarrotSusu',
      'Carrot Susu'],
    ['cendol',
      'Cendol'],
    ['ABC',
      'ABC'],
    ['JusEpal',
      'Jus Epal'],
    ['JusOren',
      'Jus Oren']
  ],
  'side-items': [
    ['kubisgoreng',
      'Kubis Goreng'],
    ['Tauhu',
      'Tauhu'],
    ['tempe',
      'Tempe'],
    ['HatiAyam',
      'Hati Ayam'],
    ['PedalAyam',
      'Pedal Ayam']
  ]
};
Object.entries(groups).forEach(([id, items]) => {
  document.getElementById(id).innerHTML = items.map(([file,
    name]) => `<article class="product"><img src="assets/${file}.png" alt="${name}" loading="lazy"><h3>${name}</h3></article>`).join('')
});
const states = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Kuala Lumpur',
  'Labuan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Putrajaya',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'Outside Malaysia'
];
const roles = [
  'Service crew (Full Time)',
  'Service crew (Part Time)',
  'Service crew (Casual)',
  'Kitchen Helper (Full Time)',
  'Kitchen Helper (Part Time)',
  'Kitchen Helper (Casual)',
  'Kitchen Leader',
  'Outlet Supervisor',
  'Outlet Manager',
  'Franchisee Manager',
  'Operations & Supply',
  'Accountant',
  'Social Media Manager',
  'Board Of Leaders and Founders',
  'Personal Assistant'
];
for (const [id, list] of [
  ['residing', states],
  ['role', roles]
]) {
  for (const value of list) {
    const o = document.createElement('option');
    o.value = value;
    o.textContent = value;
    document.getElementById(id).append(o)
  }
}
const form = document.getElementById('inquiry-form'), receipt = document.getElementById('receipt');
form.addEventListener('change', () => {
  const selected = form.querySelector('[name=inquiry]:checked')?.value;
  for (const [id,
    enabled] of [
    ['role',
      selected === 'Join Ori Selayang’s Team'],
    ['other',
      selected === 'Others']
  ]) {
    const field = document.getElementById(id);
    field.disabled = !enabled;
    field.required = enabled;
    if (!enabled) field.value = '';
  }
});
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const details = [
    ['Name',
      data.get('name')],
    ['Phone no.',
      data.get('phone')],
    ['Email',
      data.get('email')],
    ['Residing',
      data.get('residing')],
    ['Purpose',
      data.get('inquiry')]
  ];
  if (data.get('role')) details.push(['Role',
    data.get('role')]);
  if (data.get('other')) details.push(['Other inquiry',
    data.get('other')]);
  if (data.get('description')) details.push(['Description',
    data.get('description')]);
  const dl = document.getElementById('receipt-details');
  dl.replaceChildren();
  details.forEach(([label,
    value]) => {
    const dt = document.createElement('dt'),
    dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    dl.append(dt,
    dd)
  });
  document.getElementById('send-email').href = 'mailto:oriselayang@gmail.com?subject=' + encodeURIComponent('Website inquiry: ' + data.get('inquiry')) + '&body=' + encodeURIComponent(details.map(([k,
    v]) => k + ': ' + v).join('\n\n'));
  form.hidden = true;
  receipt.hidden = false;
  receipt.tabIndex = -1;
  receipt.focus();
  receipt.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});
document.getElementById('edit-inquiry').addEventListener('click', () => {
  receipt.hidden = true;
  form.hidden = false;
  form.elements.name.focus()
});
function route() {
  const hash = location.hash.slice(1) || 'home';
  const page = ['menu',
    'main-gepuk',
    'classics',
    'semenyih',
    'sides'].includes(hash) ? 'menu': hash === 'contact' ? 'contact': 'home';
  document.querySelectorAll('.page').forEach(p => p.hidden = p.id !== page);
  document.body.classList.toggle('inner',
  page !== 'home');
  document.querySelectorAll('nav a').forEach((a,
  i) => {
    if (a.dataset.page === page) {
      a.setAttribute('aria-current',
      'page');
      document.querySelector('.nav-slider').style.transform = `translateX(${i*100}%)`
    }
    else a.removeAttribute('aria-current')
  });
  document.title = (page === 'home' ? '': page === 'menu' ? 'Our Menu | ': 'Contact Us | ') + 'Ayam Gepuk Ori Selayang';
  requestAnimationFrame(() => {
    if (['home',
      'menu',
      'contact'].includes(hash)) window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    else document.getElementById(hash)?.scrollIntoView()
  })
}
window.addEventListener('hashchange', route);
route();
document.getElementById('year').textContent = new Date().getFullYear();
