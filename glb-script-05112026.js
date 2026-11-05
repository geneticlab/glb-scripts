(function() {
  if (sessionStorage.getItem('hideGlPromoBanner')) return;
  if (document.getElementById('site-custom-banner')) return;

  var b = document.createElement('div');
  b.id = 'site-custom-banner';

  b.style.cssText = [
    'position: fixed',
    'bottom: 0',
    'left: 0',
    'right: 0',
    'width: 100%',
    'background: linear-gradient(135deg, #091319 0%, #004d40 50%, #002b28 100%)',
    'color: #ffffff',
    'padding: 10px 16px',
    'z-index: 30',
    'box-sizing: border-box',
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    'font-size: 14px',
    'display: flex',
    'flex-wrap: wrap',
    'justify-content: center',
    'align-items: center',
    'gap: 12px',
    'box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.45)',
    'border-top: 1px solid rgba(0, 150, 136, 0.4)'
  ].join(';');

  b.innerHTML = [
    '<div style="display:flex; align-items:center; gap:10px; text-align:center; flex-wrap:wrap; justify-content:center;">',
      '<span style="background:rgba(255,255,255,0.12); padding:4px 10px; border-radius:9999px; font-weight:700; font-size:12px; letter-spacing:0.5px; border:1px solid rgba(255,255,255,0.25);">WHITE WEEKEND</span>',
      '<span>Reducere <strong>-20%</strong> la toate testele online.</span>',
      '<button id="gl-copy-voucher-btn" type="button" style="background:#ffffff; color:#000000; border:2px dashed #009688; padding:6px 14px; border-radius:8px; cursor:pointer; display:inline-flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.25); transition:all 0.2s ease; -webkit-tap-highlight-color:transparent;">',
        '<span style="font-weight:900; font-family:monospace; font-size:15px; letter-spacing:0.5px; color:#000000;">white-weekend20</span>',
        '<span id="gl-copy-hint" style="font-size:11px; font-weight:800; text-transform:uppercase; color:#000000; margin-top:2px;">(Apasă aici pentru a copia codul)</span>',
      '</button>',
    '</div>',
    '<button id="gl-close-banner-btn" aria-label="Închide banner" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.4); color:#ffffff; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:18px; line-height:1; cursor:pointer; padding:0; margin-left:6px; transition:transform 0.25s ease, background 0.2s ease, border-color 0.2s ease; box-shadow:0 2px 5px rgba(0,0,0,0.3);">&times;</button>'
  ].join('');

  document.body.appendChild(b);

  // Animatie hover / touch pe butonul rotund de inchidere
  var closeBtn = document.getElementById('gl-close-banner-btn');
  closeBtn.addEventListener('mouseenter', function() {
    closeBtn.style.transform = 'rotate(90deg) scale(1.1)';
    closeBtn.style.background = '#e11d48';
    closeBtn.style.borderColor = '#ffffff';
  });
  closeBtn.addEventListener('mouseleave', function() {
    closeBtn.style.transform = 'rotate(0deg) scale(1)';
    closeBtn.style.background = 'rgba(255,255,255,0.15)';
    closeBtn.style.borderColor = 'rgba(255,255,255,0.4)';
  });

  // Inchidere banner si salvare stare in sesiune
  closeBtn.addEventListener('click', function() {
    b.remove();
    sessionStorage.setItem('hideGlPromoBanner', 'true');
  });

  // Copiere cod in clipboard cu feedback vizual
  var copyBtn = document.getElementById('gl-copy-voucher-btn');
  var copyHint = document.getElementById('gl-copy-hint');
  var codeText = 'white-weekend20';

  copyBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(codeText);
    } else {
      var temp = document.createElement('input');
      temp.value = codeText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }

    copyBtn.style.background = '#80cbc4';
    copyHint.textContent = 'Cod copiat în clipboard!';

    setTimeout(function() {
      copyBtn.style.background = '#ffffff';
      copyHint.textContent = '(Apasă aici pentru a copia codul)';
    }, 2200);
  });
})();
