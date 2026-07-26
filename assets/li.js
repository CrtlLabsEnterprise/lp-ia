/* LinkedIn Insight Tag — Ctrl Labs
   ─────────────────────────────────────────────────────────────
   LI_PARTNER_ID já configurado. Para marcar o envio do formulário
   como CONVERSÃO, cole o conversion_id (Campaign Manager → Acompanhamento
   de conversões) em LI_CONVERSION_ID. Enquanto for placeholder, só a tag
   base roda (rastreio de visitas + público de remarketing).
   ───────────────────────────────────────────────────────────── */
var LI_PARTNER_ID   = '9405074';
var LI_CONVERSION_ID = 'CONVERSION_ID';

(function () {
  window._linkedin_partner_id = LI_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(LI_PARTNER_ID);
  if (!window.lintrk) {
    window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = [];
    var s = document.getElementsByTagName('script')[0];
    var b = document.createElement('script');
    b.type = 'text/javascript'; b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    s.parentNode.insertBefore(b, s);
  }
})();

// Dispara a conversão específica (chamado no envio do formulário da LP)
window.liConvert = function () {
  try {
    if (window.lintrk && LI_CONVERSION_ID && LI_CONVERSION_ID.indexOf('_ID') === -1) {
      lintrk('track', { conversion_id: Number(LI_CONVERSION_ID) });
    }
  } catch (e) {}
};
