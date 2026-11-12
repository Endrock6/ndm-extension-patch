document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);

  // ---- load saved values ----
  chrome.storage.local.get(['ignoreDomains', 'blockedExtensions'], (result) => {
    $('domains').value = (result.ignoreDomains || []).join('\n');
    $('extensions').value = (result.blockedExtensions || []).join('\n');
  });

  function parseLines(text) {
    return text.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  }

  function flash(el, msg) {
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 2000);
  }

  // ---- save / reset: domains ----
  $('saveDomains').addEventListener('click', () => {
    chrome.storage.local.set({ ignoreDomains: parseLines($('domains').value) }, () => {
      flash($('domainStatus'), 'Saved!');
    });
  });
  $('resetDomains').addEventListener('click', () => {
    chrome.storage.local.remove(['ignoreDomains'], () => {
      $('domains').value = '';
      flash($('domainStatus'), 'Reset to defaults.');
    });
  });

  // ---- save / reset: file types ----
  $('saveExtensions').addEventListener('click', () => {
    chrome.storage.local.set({ blockedExtensions: parseLines($('extensions').value) }, () => {
      flash($('extensionStatus'), 'Saved!');
    });
  });
  $('resetExtensions').addEventListener('click', () => {
    chrome.storage.local.remove(['blockedExtensions'], () => {
      $('extensions').value = '';
      flash($('extensionStatus'), 'Reset to defaults.');
    });
  });
});
