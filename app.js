const rowsData = {
  trending: [
    { id: 'fr-1', title: 'Frostbound', img: '/workspace/assets/posters/frostbound.jpg', badge: 'New' },
    { id: 'gl-2', title: 'Glacier Run', img: '/workspace/assets/posters/glacier-run.jpg', badge: 'HD' },
    { id: 'wh-3', title: 'Whiteout', img: '/workspace/assets/posters/whiteout.jpg', badge: 'Top 10' },
    { id: 'au-4', title: 'Aurora City', img: '/workspace/assets/posters/aurora-city.jpg', badge: '4K' },
    { id: 'sn-5', title: 'Snowpierce', img: '/workspace/assets/posters/snowpierce.jpg', badge: 'S' },
    { id: 'ic-6', title: 'Icebreaker', img: '/workspace/assets/posters/icebreaker.jpg', badge: 'HDR' },
    { id: 'mi-7', title: 'Midwinter', img: '/workspace/assets/posters/midwinter.jpg', badge: 'New' },
  ],
  topPicks: [
    { id: 'bl-1', title: 'Below Zero', img: '/workspace/assets/posters/below-zero.jpg', badge: '98% Match' },
    { id: 'sh-2', title: 'Snowhollow', img: '/workspace/assets/posters/snowhollow.jpg', badge: 'HD' },
    { id: 'ic-3', title: 'Icelands', img: '/workspace/assets/posters/icelands.jpg', badge: '4K' },
    { id: 'bl-4', title: 'Blizzard', img: '/workspace/assets/posters/blizzard.jpg', badge: 'Top 10' },
    { id: 'ch-5', title: 'Chill', img: '/workspace/assets/posters/chill.jpg', badge: 'HDR' },
    { id: 'si-6', title: 'Silent North', img: '/workspace/assets/posters/silent-north.jpg', badge: 'New' },
  ],
  originals: [
    { id: 'or-1', title: 'Permafrost', img: '/workspace/assets/posters/permafrost.jpg', badge: 'Original' },
    { id: 'or-2', title: 'The Drifts', img: '/workspace/assets/posters/the-drifts.jpg', badge: 'Original' },
    { id: 'or-3', title: 'Northern Lights', img: '/workspace/assets/posters/northern-lights.jpg', badge: 'Original' },
    { id: 'or-4', title: 'Polar Night', img: '/workspace/assets/posters/polar-night.jpg', badge: 'Original' },
  ],
  because: [
    { id: 'bc-1', title: 'Snowbound', img: '/workspace/assets/posters/snowbound.jpg', badge: '95% Match' },
    { id: 'bc-2', title: 'Floe', img: '/workspace/assets/posters/floe.jpg', badge: 'HD' },
    { id: 'bc-3', title: 'Ice Roads', img: '/workspace/assets/posters/ice-roads.jpg', badge: '4K' },
    { id: 'bc-4', title: 'Cold Front', img: '/workspace/assets/posters/cold-front.jpg', badge: 'Top 10' },
    { id: 'bc-5', title: 'Glacial', img: '/workspace/assets/posters/glacial.jpg', badge: 'New' },
  ],
};

function createCard(item) {
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='/workspace/assets/posters/placeholder.svg'" />
    <div class="card__meta">
      <span class="badge">${item.badge}</span>
      <div class="controls">
        <button class="ctrl-btn" aria-label="Add to list"><img src="/workspace/assets/icons/plus-snow.svg" alt="" /></button>
        <button class="ctrl-btn" aria-label="Like"><img src="/workspace/assets/icons/like-snow.svg" alt="" /></button>
        <button class="ctrl-btn" aria-label="More info"><img src="/workspace/assets/icons/chevron-snow.svg" alt="" /></button>
      </div>
    </div>
  `;
  return article;
}

function renderRows() {
  document.querySelectorAll('.row__scroller').forEach(scroller => {
    const key = scroller.dataset.key;
    const items = rowsData[key] || [];
    scroller.replaceChildren(...items.map(createCard));
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      mobileMenu.hidden = true;
    } else {
      mobileMenu.hidden = false;
    }
  });
}

function setupSnow() {
  const canvas = document.getElementById('snow-canvas');
  const ctx = canvas.getContext('2d');
  let flakes = [];
  let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initFlakes() {
    const count = Math.floor((width * height) / 14000);
    flakes = new Array(count).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 2.2,
      s: 0.3 + Math.random() * 0.9,
      w: 0.5 + Math.random() * 1.5,
      a: Math.random() * Math.PI * 2,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    flakes.forEach(f => {
      f.y += f.s;
      f.x += Math.sin(f.a) * f.w;
      f.a += 0.01;
      if (f.y > height + 5) { f.y = -5; f.x = Math.random() * width; }
      if (f.x > width + 5) { f.x = -5; }
      if (f.x < -5) { f.x = width + 5; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }

  const ro = new ResizeObserver(() => { resize(); initFlakes(); });
  ro.observe(canvas);
  resize();
  initFlakes();
  step();
}

function setupHeroControls() {
  const play = document.getElementById('playHero');
  const more = document.getElementById('moreInfoHero');
  play?.addEventListener('click', () => alert('Playing Frostbound…'));
  more?.addEventListener('click', () => alert('More info coming soon.'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderRows();
  setupMobileMenu();
  setupSnow();
  setupHeroControls();
});

