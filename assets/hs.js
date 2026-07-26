/* HubSpot — Ctrl Labs
   ─────────────────────────────────────────────────────────────
   Cole os 2 valores abaixo (os MESMOS nas 3 pastas: site, lp-ia, lp-software):
   • HS_HUB_ID    → ID da conta (numérico). Configurações → Conta e faturamento,
                    ou a URL: app.hubspot.com/contacts/SEU_ID/...
   • HS_FORM_GUID → GUID do formulário criado no HubSpot (1 form só para tudo).
                    Formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   Enquanto estiverem como placeholder, nada é enviado (fica dormente).
   ───────────────────────────────────────────────────────────── */
var HS_HUB_ID    = '51789178';
var HS_FORM_GUID = '7ceb06d3-6a99-4593-bdf2-29de7f45b5a1';

(function () {
  // Código de rastreamento do HubSpot (mostra a jornada de páginas do lead no CRM)
  if (HS_HUB_ID && HS_HUB_ID.indexOf('_ID') === -1) {
    var s = document.createElement('script');
    s.type = 'text/javascript'; s.id = 'hs-script-loader'; s.async = true; s.defer = true;
    s.src = '//js.hs-scripts.com/' + HS_HUB_ID + '.js';
    document.head.appendChild(s);
  }
})();

// Envio de lead ao CRM via API de Forms do HubSpot (mantém o SEU formulário/design).
window.hsSubmit = function (fields) {
  if (!HS_HUB_ID || HS_HUB_ID.indexOf('_ID') !== -1) return;         // dormente até configurar
  if (!HS_FORM_GUID || HS_FORM_GUID.indexOf('_GUID') !== -1) return;
  var arr = Object.keys(fields).filter(function (k) { return fields[k]; })
    .map(function (k) { return { name: k, value: String(fields[k]) }; });
  fetch('https://api.hsforms.com/submissions/v3/integration/submit/' + HS_HUB_ID + '/' + HS_FORM_GUID, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: arr,
      context: {
        pageUri: location.href,
        pageName: document.title,
        hutk: (document.cookie.match(/hubspotutk=([^;]+)/) || [])[1] // liga o lead à jornada de páginas
      }
    })
  }).catch(function () {});
};
