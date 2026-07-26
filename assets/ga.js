/* Google Analytics 4 (GA4) — Ctrl Labs
   ─────────────────────────────────────────────────────────────
   1) Crie uma propriedade GA4 em analytics.google.com
   2) Admin → Fluxos de dados → Web → copie o "ID de métrica" (começa com G-)
   3) Cole abaixo no lugar de G-XXXXXXXXXX
   O MESMO ID pode ser usado no site e nas duas LPs — nos relatórios você
   separa por página/host. (Cada pasta tem a sua cópia deste arquivo.)
   ───────────────────────────────────────────────────────────── */
var GA_ID = 'G-XXXXXXXXXX';

(function () {
  if (!GA_ID || GA_ID.indexOf('XXXX') !== -1) return; // não dispara enquanto for placeholder
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

// Helper para eventos de conversão (usado em cliques de WhatsApp e envio de formulário)
window.gaEvent = function (name, params) {
  try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
};
