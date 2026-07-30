(function () {
  'use strict';

  /* =====================================================================
     СПИСОК ФОТО БЛОКА «ТЕСТ»
     Файлы в assets/images/: test-01.webp + test-01.jpg ... test-12.webp + test-12.jpg
  ===================================================================== */
  var BASE = 'https://imperatortigr.github.io/imperator_Tigr/assets/images/';
  var TEST_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) {
    var num = (n < 10 ? '0' : '') + n;
    return {
      id: String(n),
      thumbWebp: BASE + 'test-' + num + '.webp',
      thumbJpg:  BASE + 'test-' + num + '.jpg',
      full:        BASE + 'test-' + num + '.jpg',
      alt: 'Тест, фото ' + n
    };
  });

  var STORAGE_KEY = 'test-board-layout-v1';
  var viewport = document.getElementById('testViewport');
  var grid = document.getElementById('testGrid');
  var linesSvg = document.getElementById('testLines');
  var toggleButtons = document.querySelectorAll('.test-mode-toggle button');

  if (!viewport || !grid) {
    console.error('Test block: viewport or grid not found');
    return;
  }

  function renderGrid() {
    grid.innerHTML = TEST_PHOTOS.map(function (p) {
      return '<div class="test-card" data-id="' + p.id + '" data-full="' + p.full + '">' +
        '<picture>' +
          '<source srcset="' + p.thumbWebp + '" type="image/webp">' +
          '<img src="' + p.thumbJpg + '" alt="' + p.alt + '" loading="lazy" decoding="async">' +
        '</picture>' +
        '</div>';
    }).join('');
  }
  renderGrid();

  var photos = Array.prototype.slice.call(document.querySelectorAll('.test-card'));
  var boardInitialized = false;
  var order = photos.map(function (p) { return p.dataset.id; });

  function loadLayout() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLayout(layout) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch (e) {}
  }

  function randomScatter(index, total, bounds) {
    var cols = Math.ceil(Math.sqrt(total));
    var cellW = bounds.width / cols;
    var cellH = bounds.height / Math.ceil(total / cols);
    var col = index % cols;
    var row = Math.floor(index / cols);
    var jitterX = (Math.random() - .5) * cellW * .4;
    var jitterY = (Math.random() - .5) * cellH * .4;
    return {
      x: col * cellW + cellW / 2 - 95 + jitterX,
      y: row * cellH + cellH / 2 - 118 + jitterY,
      rot: (Math.random() - .5) * 14
    };
  }

  function applyTransform(photo, pos) {
    photo.style.left = pos.x + 'px';
    photo.style.top = pos.y + 'px';
    photo.style.transform = 'rotate(' + pos.rot + 'deg)';
    photo.dataset.x = pos.x;
    photo.dataset.y = pos.y;
    photo.dataset.rot = pos.rot;
  }

  function initBoard() {
    if (boardInitialized) return;
    boardInitialized = true;
    var bounds = { width: viewport.clientWidth, height: viewport.clientHeight };
    var saved = loadLayout();
    photos.forEach(function (photo, index) {
      var pos = (saved && saved[photo.dataset.id]) || randomScatter(index, photos.length, bounds);
      applyTransform(photo, pos);
      viewport.appendChild(photo);
    });
    drawLines();
  }

  function currentLayoutMap() {
    var map = {};
    photos.forEach(function (p) {
      map[p.dataset.id] = {
        x: parseFloat(p.dataset.x) || 0,
        y: parseFloat(p.dataset.y) || 0,
        rot: parseFloat(p.dataset.rot) || 0
      };
    });
    return map;
  }

  function drawLines() {
    var w = viewport.clientWidth, h = viewport.clientHeight;
    linesSvg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var pathParts = [];
    for (var i = 0; i < order.length - 1; i++) {
      var a = photos.find(function (p) { return p.dataset.id === order[i]; });
      var b = photos.find(function (p) { return p.dataset.id === order[i + 1]; });
      if (!a || !b) continue;
      var ax = parseFloat(a.dataset.x) + a.offsetWidth / 2;
      var ay = parseFloat(a.dataset.y) + a.offsetHeight / 2;
      var bx = parseFloat(b.dataset.x) + b.offsetWidth / 2;
      var by = parseFloat(b.dataset.y) + b.offsetHeight / 2;
      var mx = (ax + bx) / 2, my = (ay + by) / 2 - 30;
      pathParts.push('M ' + ax + ' ' + ay + ' Q ' + mx + ' ' + my + ' ' + bx + ' ' + by);
    }
    linesSvg.innerHTML = '<path d="' + pathParts.join(' ') + '"></path>';
  }

  var CLICK_THRESHOLD = 6;

  function attachDragHandlers() {
    photos.forEach(function (photo) {
      var dragging = false, moved = false, startX, startY, origX, origY;
      photo.addEventListener('pointerdown', function (e) {
        moved = false;
        photo.setPointerCapture(e.pointerId);
        startX = e.clientX;
        startY = e.clientY;
        origX = parseFloat(photo.dataset.x) || 0;
        origY = parseFloat(photo.dataset.y) || 0;
        dragging = viewport.classList.contains('mode-board');
        if (dragging) photo.classList.add('dragging');
      });
      photo.addEventListener('pointermove', function (e) {
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) moved = true;
        if (!dragging) return;
        var tilt = Math.max(-16, Math.min(16, dx * 0.15));
        var newX = origX + dx, newY = origY + dy;
        photo.style.left = newX + 'px';
        photo.style.top = newY + 'px';
        photo.style.transform = 'rotate(' + tilt + 'deg) scale(1.03)';
        photo.dataset.x = newX;
        photo.dataset.y = newY;
        photo.dataset.rot = tilt;
        drawLines();
      });
      function endDrag(e) {
        if (dragging) {
          dragging = false;
          photo.classList.remove('dragging');
          if (moved) {
            var restRot = (Math.random() - .5) * 6;
            photo.style.transform = 'rotate(' + restRot + 'deg)';
            photo.dataset.rot = restRot;
            saveLayout(currentLayoutMap());
            drawLines();
          }
        }
        if (!moved) {
          openLightbox(photo.dataset.id);
        }
      }
      photo.addEventListener('pointerup', endDrag);
      photo.addEventListener('pointercancel', function () { dragging = false; photo.classList.remove('dragging'); });
    });
  }

  /* ===== Лайтбокс ===== */
  var lightbox = document.getElementById('testLightbox');
  var lightboxFrame = document.getElementById('testLightboxFrame');
  var lightboxImg = document.getElementById('testLightboxImg');
  var lightboxClose = document.getElementById('testLightboxClose');
  var lightboxPrev = document.getElementById('testLightboxPrev');
  var lightboxNext = document.getElementById('testLightboxNext');

  var currentId = null;
  var zoom = 1, panX = 0, panY = 0;
  var ZOOM_STEP = 2.4;

  function photoIndexById(id) {
    return order.indexOf(id);
  }

  function openLightbox(id) {
    currentId = id;
    var srcPhoto = photos.find(function (p) { return p.dataset.id === id; });
    if (!srcPhoto) return;
    var img = srcPhoto.querySelector('img');
    lightboxImg.src = srcPhoto.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    resetZoom();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    resetZoom();
  }

  function resetZoom() {
    zoom = 1; panX = 0; panY = 0;
    lightboxFrame.classList.remove('zoomed');
    applyZoomTransform();
  }

  function applyZoomTransform() {
    lightboxImg.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoom + ')';
  }

  function toggleZoom(clientX, clientY) {
    if (zoom === 1) {
      var rect = lightboxImg.getBoundingClientRect();
      var offsetX = clientX - (rect.left + rect.width / 2);
      var offsetY = clientY - (rect.top + rect.height / 2);
      zoom = ZOOM_STEP;
      panX = -offsetX * (ZOOM_STEP - 1) / ZOOM_STEP;
      panY = -offsetY * (ZOOM_STEP - 1) / ZOOM_STEP;
      lightboxFrame.classList.add('zoomed');
    } else {
      resetZoom();
    }
    applyZoomTransform();
  }

  var panning = false, panStartX, panStartY, panOrigX, panOrigY, panJustHappened = false;

  lightboxFrame.addEventListener('click', function (e) {
    if (panJustHappened) { panJustHappened = false; return; }
    toggleZoom(e.clientX, e.clientY);
  });

  lightboxFrame.addEventListener('wheel', function (e) {
    e.preventDefault();
    var delta = e.deltaY < 0 ? 0.25 : -0.25;
    zoom = Math.min(4, Math.max(1, zoom + delta));
    if (zoom === 1) { panX = 0; panY = 0; lightboxFrame.classList.remove('zoomed'); }
    else lightboxFrame.classList.add('zoomed');
    applyZoomTransform();
  }, { passive: false });

  lightboxFrame.addEventListener('pointerdown', function (e) {
    if (zoom === 1) return;
    panning = true;
    lightboxFrame.classList.add('panning');
    lightboxFrame.setPointerCapture(e.pointerId);
    panStartX = e.clientX; panStartY = e.clientY;
    panOrigX = panX; panOrigY = panY;
  });

  lightboxFrame.addEventListener('pointermove', function (e) {
    if (!panning) return;
    panX = panOrigX + (e.clientX - panStartX);
    panY = panOrigY + (e.clientY - panStartY);
    applyZoomTransform();
  });

  function endPan(e) {
    if (!panning) return;
    panning = false;
    lightboxFrame.classList.remove('panning');
    if (Math.abs(e.clientX - panStartX) > 4 || Math.abs(e.clientY - panStartY) > 4) panJustHappened = true;
  }
  lightboxFrame.addEventListener('pointerup', endPan);
  lightboxFrame.addEventListener('pointercancel', endPan);

  function showNeighbor(step) {
    var idx = photoIndexById(currentId);
    var nextIdx = (idx + step + order.length) % order.length;
    openLightbox(order[nextIdx]);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); showNeighbor(-1); });
  lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); showNeighbor(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNeighbor(-1);
    if (e.key === 'ArrowRight') showNeighbor(1);
  });

  function setMode(mode) {
    toggleButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    viewport.classList.toggle('mode-board', mode === 'board');
    viewport.classList.toggle('mode-grid', mode === 'grid');
    if (mode === 'board') {
      initBoard();
    }
  }

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMode(btn.dataset.mode);
    });
  });

  window.addEventListener('resize', function () {
    if (boardInitialized) drawLines();
  });

  attachDragHandlers();
})();