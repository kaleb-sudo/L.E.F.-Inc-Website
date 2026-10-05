(function () {
  var isSubpage = /\/services\//.test(window.location.pathname);
  var root = isSubpage ? '../' : '';

  /* ── Inject CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    'nav.site-nav{',
      'position:fixed;top:0;left:0;right:0;z-index:500;',
      'display:grid;grid-template-columns:1fr auto 1fr;align-items:center;',
      'padding:18px 52px;',
      'background:rgba(14,14,13,0.97);',
      'border-bottom:1px solid rgba(37,37,32,0.7);',
    '}',
    '.nav-logo{display:flex;align-items:center;gap:11px;text-decoration:none;flex-shrink:0;}',
    '.nav-logo-spark{height:42px;width:42px;object-fit:contain;flex-shrink:0;filter:hue-rotate(22deg) saturate(1.1);display:block;}',
    '.nav-logo-text{display:flex;flex-direction:column;gap:2px;}',
    '.nav-logo-name{font-family:"Bebas Neue",sans-serif;font-size:26px;color:#F0EDE8;letter-spacing:0.12em;line-height:1;}',
    '.nav-logo-sub{font-family:"DM Mono",monospace;font-size:9px;color:#78786F;letter-spacing:0.22em;text-transform:uppercase;line-height:1;}',

    '.nav-pill{display:flex;align-items:center;gap:2px;',
      'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);',
      'border-radius:100px;padding:5px;}',

    '.nav-pill-link{',
      'font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;',
      'color:#78786F;text-decoration:none;',
      'padding:9px 20px;border-radius:100px;',
      'border:none;background:none;cursor:pointer;',
      'font-family:"DM Sans",sans-serif;',
      'display:flex;align-items:center;gap:6px;',
      'transition:color 0.2s,background 0.2s;white-space:nowrap;',
    '}',
    '.nav-pill-link:hover{color:#F0EDE8;background:rgba(255,255,255,0.06);}',
    '.nav-pill-link:focus-visible{outline:2px solid #FF6B1A;outline-offset:2px;}',

    '.nav-pill-divider{width:1px;height:16px;background:rgba(255,255,255,0.1);flex-shrink:0;margin:0 2px;}',

    '.nav-dropdown{position:relative;}',
    '.nav-dropdown-menu{display:none;position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:16px;z-index:600;}',
    '.nav-dropdown-menu-inner{background:#1C1C1A;border:1px solid #252520;border-radius:12px;padding:8px;min-width:240px;',
      'box-shadow:0 20px 60px rgba(0,0,0,0.65),0 4px 16px rgba(0,0,0,0.4);}',
    '.nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu{display:block;}',
    '.nav-dropdown-item{',
      'display:flex;align-items:center;gap:10px;',
      'padding:10px 14px;border-radius:8px;',
      'font-size:13px;font-weight:400;color:#78786F;text-decoration:none;',
      'letter-spacing:0.04em;transition:color 0.18s,background 0.18s;',
    '}',
    '.nav-dropdown-item:hover{color:#F0EDE8;background:rgba(255,107,26,0.08);}',
    '.nav-dropdown-dot{width:5px;height:5px;border-radius:50%;background:#FF6B1A;opacity:0.4;flex-shrink:0;transition:opacity 0.18s;}',
    '.nav-dropdown-item:hover .nav-dropdown-dot{opacity:1;}',

    '.nav-right{display:flex;align-items:center;justify-content:flex-end;gap:10px;}',

    '.nav-cta{',
      'display:inline-flex;align-items:center;gap:8px;',
      'font-family:"DM Sans",sans-serif;font-weight:600;',
      'font-size:12px;letter-spacing:0.1em;text-transform:uppercase;',
      'text-decoration:none;cursor:pointer;border:none;',
      'background:#FF6B1A;color:#0C0C0B;',
      'padding:11px 22px;',
      'position:relative;overflow:hidden;',
      'transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1);',
    '}',
    '.nav-cta:hover{transform:translateY(-2px) scale(1.02);}',
    '.nav-cta:focus-visible{outline:2px solid #F0EDE8;outline-offset:4px;}',
    '.nav-cta:active{transform:scale(0.985);}',

    /* Hamburger button */
    '.nav-hamburger{',
      'display:none;flex-direction:column;justify-content:center;align-items:center;',
      'width:44px;height:44px;gap:5px;',
      'background:none;border:1px solid rgba(255,255,255,0.1);',
      'cursor:pointer;padding:0;border-radius:4px;',
    '}',
    '.nav-hamburger:focus-visible{outline:2px solid #FF6B1A;outline-offset:2px;}',
    '.nav-hamburger span{display:block;width:20px;height:1.5px;background:#F0EDE8;',
      'transition:transform 0.3s cubic-bezier(0.16,1,0.3,1),opacity 0.2s;}',
    '.nav-hamburger[aria-expanded="true"] span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}',
    '.nav-hamburger[aria-expanded="true"] span:nth-child(2){opacity:0;transform:scaleX(0);}',
    '.nav-hamburger[aria-expanded="true"] span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}',

    /* Mobile menu overlay */
    '.nav-mobile-menu{',
      'display:none;',
      'position:fixed;top:0;left:0;right:0;bottom:0;',
      'background:rgba(12,12,11,0.99);',
      'z-index:490;',
      'padding-top:80px;',
      'flex-direction:column;',
      'overflow-y:auto;',
    '}',
    '.nav-mobile-menu.open{display:flex;}',

    '.nav-mobile-menu-inner{padding:24px 24px 64px;display:flex;flex-direction:column;gap:0;}',

    '.nav-mobile-services-toggle{',
      'display:flex;align-items:center;justify-content:space-between;',
      'font-family:"Bebas Neue",sans-serif;font-size:42px;letter-spacing:0.04em;line-height:1.1;',
      'color:#F0EDE8;',
      'border:none;border-bottom:1px solid #252520;',
      'padding:16px 0;',
      'background:none;width:100%;cursor:pointer;',
      'transition:color 0.2s;',
    '}',
    '.nav-mobile-services-toggle:hover{color:#FF6B1A;}',
    '.nav-mobile-services-toggle svg{transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;}',
    '.nav-mobile-services-toggle[aria-expanded="true"] svg{transform:rotate(180deg);}',

    '.nav-mobile-submenu{display:none;flex-direction:column;padding-left:16px;border-bottom:1px solid #252520;}',
    '.nav-mobile-submenu.open{display:flex;}',
    '.nav-mobile-sublink{',
      'font-size:15px;font-family:"DM Sans",sans-serif;font-weight:400;letter-spacing:0.04em;',
      'color:#78786F;text-decoration:none;',
      'padding:13px 0;border-bottom:1px solid rgba(37,37,32,0.5);',
      'transition:color 0.2s;',
    '}',
    '.nav-mobile-sublink:last-child{border-bottom:none;}',
    '.nav-mobile-sublink:hover{color:#FF6B1A;}',

    '.nav-mobile-link{',
      'font-family:"Bebas Neue",sans-serif;font-size:42px;letter-spacing:0.04em;line-height:1.1;',
      'color:#F0EDE8;text-decoration:none;',
      'border-bottom:1px solid #252520;padding:16px 0;',
      'transition:color 0.2s;display:block;',
    '}',
    '.nav-mobile-link:hover{color:#FF6B1A;}',

    '.nav-mobile-cta{',
      'margin-top:36px;',
      'display:flex;align-items:center;justify-content:center;gap:10px;',
      'font-family:"DM Sans",sans-serif;font-weight:600;',
      'font-size:13px;letter-spacing:0.1em;text-transform:uppercase;',
      'text-decoration:none;',
      'background:#FF6B1A;color:#0C0C0B;',
      'padding:18px 32px;',
      'transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1);',
    '}',
    '.nav-mobile-cta:hover{transform:translateY(-2px);}',

    /* Responsive */
    '@media (max-width:960px){',
      'nav.site-nav{grid-template-columns:1fr auto;padding:14px 20px;}',
      '.nav-pill{display:none;}',
      '.nav-cta{display:none;}',
      '.nav-hamburger{display:flex;}',
    '}',
    '@media (min-width:961px){',
      '.nav-mobile-menu{display:none!important;}',
    '}',

    /* ── Site footer (shared by every page) ── */
    'footer.site-footer{',
      'display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:24px;',
      'padding:28px 52px;margin:0;',
      'background:#0C0C0B;border-top:1px solid #252520;',
    '}',
    '.site-footer-logo{display:flex;flex-shrink:0;border-radius:4px;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s;}',
    '.site-footer-logo img{height:40px;width:40px;object-fit:contain;display:block;filter:hue-rotate(22deg) saturate(1.1);}',
    '.site-footer-logo:hover{transform:rotate(-8deg) scale(1.06);}',
    '.site-footer-logo:focus-visible{outline:2px solid #FF6B1A;outline-offset:4px;}',
    '.site-footer-logo:active{transform:scale(0.94);}',
    '.site-footer-copy{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:0.08em;color:#78786F;margin:0;}',
    '.site-footer-links{display:flex;gap:32px;margin-left:auto;}',
    '.site-footer-links a{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#78786F;text-decoration:none;white-space:nowrap;transition:color 0.2s;}',
    '.site-footer-links a:hover{color:#F0EDE8;}',
    '.site-footer-links a:focus-visible{outline:2px solid #FF6B1A;outline-offset:4px;color:#F0EDE8;}',
    '.site-footer-links a:active{color:#FF6B1A;}',
    '@media (max-width:640px){',
      /* Logo and links across from each other, copyright on its own line below */
      'footer.site-footer{flex-wrap:wrap;justify-content:space-between;gap:20px 16px;padding:32px 16px 28px;}',
      '.site-footer-links{margin-left:auto;gap:24px;order:2;}',
      '.site-footer-copy{order:3;flex-basis:100%;font-size:10px;text-align:center;}',
    '}',
    '@media (max-width:360px){',
      '.site-footer-links{gap:16px;}',
      '.site-footer-links a{letter-spacing:0.1em;}',
    '}'
  ].join('');
  document.head.appendChild(style);

  /* Determine quote link — home page anchors to #quote, subpages go to index */
  var quoteLink = isSubpage ? root + 'index.html#quote' : '#quote';

  /* ── Build nav HTML ── */
  var navEl = document.createElement('nav');
  navEl.className = 'site-nav';
  navEl.setAttribute('aria-label', 'Site navigation');
  navEl.innerHTML =
    '<a href="' + root + 'index.html" class="nav-logo" aria-label="L.E.F., INC. home">' +
      '<img src="' + root + 'brand_assets/Logo/1.png" alt="" class="nav-logo-spark" aria-hidden="true">' +
      '<div class="nav-logo-text">' +
        '<span class="nav-logo-name">L.E.F., Inc.</span>' +
        '<span class="nav-logo-sub">Laser Cutting &amp; Metal Fabrication</span>' +
      '</div>' +
    '</a>' +
    '<div class="nav-pill">' +
      '<a href="' + root + 'about.html" class="nav-pill-link">About Us</a>' +
      '<div class="nav-pill-divider" aria-hidden="true"></div>' +
      '<div class="nav-dropdown">' +
        '<button class="nav-pill-link" aria-haspopup="true" aria-expanded="false">' +
          'Services' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<div class="nav-dropdown-menu" role="menu">' +
          '<div class="nav-dropdown-menu-inner">' +
            '<a href="' + root + 'services/laser-cutting.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Laser Cutting</a>' +
            '<a href="' + root + 'services/press-brake.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Press Brake &amp; Forming</a>' +
            '<a href="' + root + 'services/machining.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>CNC Machining</a>' +
            '<a href="' + root + 'services/welding.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Welding &amp; Assembly</a>' +
            '<a href="' + root + 'services/laser-marking.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Laser Marking</a>' +
            '<a href="' + root + 'services/powder-coating.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Powder Coating</a>' +
            '<a href="' + root + 'services/wet-paint.html" class="nav-dropdown-item" role="menuitem"><span class="nav-dropdown-dot"></span>Wet Paint</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="nav-pill-divider" aria-hidden="true"></div>' +
      '<a href="' + root + 'gallery.html" class="nav-pill-link">Gallery</a>' +
    '</div>' +
    '<div class="nav-right">' +
      '<a href="' + quoteLink + '" class="nav-cta">Start a Quote</a>' +
      '<button class="nav-hamburger" aria-label="Open navigation" aria-expanded="false" aria-controls="nav-mobile-menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>';

  /* Insert nav at the very start of body */
  var script = document.currentScript;
  if (script && script.parentNode) {
    script.parentNode.insertBefore(navEl, script);
  } else {
    document.body.insertBefore(navEl, document.body.firstChild);
  }

  /* ── Build mobile menu (appended after DOM ready) ── */
  var mobileMenu = document.createElement('div');
  mobileMenu.id = 'nav-mobile-menu';
  mobileMenu.className = 'nav-mobile-menu';
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-label', 'Mobile navigation');
  mobileMenu.innerHTML =
    '<div class="nav-mobile-menu-inner">' +
      '<a href="' + root + 'about.html" class="nav-mobile-link">About Us</a>' +
      '<button class="nav-mobile-services-toggle" aria-expanded="false" aria-controls="nav-mobile-submenu">' +
        'Services' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '<div class="nav-mobile-submenu" id="nav-mobile-submenu">' +
        '<a href="' + root + 'services/laser-cutting.html" class="nav-mobile-sublink">Laser Cutting</a>' +
        '<a href="' + root + 'services/press-brake.html" class="nav-mobile-sublink">Press Brake &amp; Forming</a>' +
        '<a href="' + root + 'services/machining.html" class="nav-mobile-sublink">CNC Machining</a>' +
        '<a href="' + root + 'services/welding.html" class="nav-mobile-sublink">Welding &amp; Assembly</a>' +
        '<a href="' + root + 'services/laser-marking.html" class="nav-mobile-sublink">Laser Marking</a>' +
        '<a href="' + root + 'services/powder-coating.html" class="nav-mobile-sublink">Powder Coating</a>' +
        '<a href="' + root + 'services/wet-paint.html" class="nav-mobile-sublink">Wet Paint</a>' +
      '</div>' +
      '<a href="' + root + 'gallery.html" class="nav-mobile-link">Gallery</a>' +
      '<a href="' + quoteLink + '" class="nav-mobile-cta">Start a Quote</a>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(mobileMenu);

    var hamburger = navEl.querySelector('.nav-hamburger');
    var servicesTgl = mobileMenu.querySelector('.nav-mobile-services-toggle');
    var submenu = mobileMenu.querySelector('.nav-mobile-submenu');

    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    servicesTgl.addEventListener('click', function () {
      var expanded = servicesTgl.getAttribute('aria-expanded') === 'true';
      servicesTgl.setAttribute('aria-expanded', String(!expanded));
      submenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation');
        document.body.style.overflow = '';
      });
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  });
})();
