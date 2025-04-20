(function () {
    function removePoweredBy() {
      const link = Array.from(document.querySelectorAll('a'))
        .find(el => el.textContent.trim().toLowerCase().includes('powered by mintlify'));
      if (link) link.remove();
    }
  
    // Initial load
    window.addEventListener('DOMContentLoaded', removePoweredBy);
  
    // Re-run on back/forward navigation
    window.addEventListener('popstate', () => {
      setTimeout(removePoweredBy, 50);
    });
  
    // Patch pushState/replaceState once
    const patchHistory = fn => {
      const original = history[fn];
      if (!original._patched) {
        history[fn] = function () {
          const result = original.apply(this, arguments);
          setTimeout(removePoweredBy, 50);
          return result;
        };
        history[fn]._patched = true;
      }
    };
  
    patchHistory('pushState');
    patchHistory('replaceState');
  })();