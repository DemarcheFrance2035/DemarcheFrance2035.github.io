import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const canonicalRoot = 'https://demarchefrance2035.github.io';
const contact = 'contact.france2035@gmail.com';
const indexNowKey = 'd0622eacb7de913630db4eb5c4f98226';
const letterSource = fs.readFileSync(path.resolve('content/lettre-v14.html'), 'utf8');

const letterBodySource = letterSource.slice(letterSource.indexOf('<h1 id='));

const letterIcons = {
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  telescope: '<path d="m10.1 12.5-6.2 1.3"/><path d="m13.6 11.7 4.3-.9"/><path d="M16 21l-3.1-6.2"/><path d="m16.6 3 1.2 5.5"/><path d="M21 2l-3.2.7"/><path d="m9.9 11.5 6.7-8.5"/><path d="M3 14l3.2-.7"/><path d="m6.2 13.3 1.2 5.6"/><path d="M7 21l3.1-6.2"/>',
  scale: '<path d="m16 16 3-8 3 8a5 5 0 0 1-6 0Z"/><path d="m2 16 3-8 3 8a5 5 0 0 1-6 0Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  factory: '<path d="M2 20h20"/><path d="M5 20V9l5 3V9l5 3V6l4 2v12"/><path d="M17 6V3h2v4"/>',
  workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/><path d="m9 12 2 2 4-4"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15h.01"/>',
  sunrise: '<path d="M12 2v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="M20 12h2"/><path d="m17.7 6.3 1.4-1.4"/><path d="M2 12h2"/><path d="M6.3 17.7A8 8 0 0 1 20 12H4a8 8 0 0 1 2.3-5.7"/><path d="M2 20h20"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3L15.5 9.5"/><path d="m18 11 1 1a1 1 0 1 0 3-3l-3.5-3.5a4 4 0 0 0-5 0l-1 1"/><path d="m6 15-2-2a1 1 0 0 1 0-1.4l5.6-5.6a4 4 0 0 1 5.7 0L16 6"/><path d="m8 13 2 2a1 1 0 1 1-3 3l-3-3"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.5 13 22H7l-1.4-7"/>',
};

function letterIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${letterIcons[name] || letterIcons.compass}</svg>`;
}

const letterChapters = [
  {id:'pourquoi-jai-entrepris-ce-travail', number:'01', icon:'compass', tone:'blue', image:'/assets/hero-france2035.webp', alt:'Paysage français réunissant agriculture, industrie, énergie et mobilité'},
  {id:'regarder-quinze-ans-devant', number:'02', icon:'telescope', tone:'cyan', image:'/assets/lettre-horizon-france.webp', alt:'Lever de soleil sur la Loire et le château de Montsoreau', source:'https://commons.wikimedia.org/wiki/File:Chateau_de_montsoreau_val_de_loire_lever_de_soleil.jpg', credit:'Suavemarimagno', license:'CC BY-SA 4.0', licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
  {id:'des-choix-difficiles-parce-que-le-temps-et-largent-manquent', number:'03', icon:'scale', tone:'gold'},
  {id:'un-effort-partagé-selon-les-possibilités-de-chacun', number:'04', icon:'users', tone:'red'},
  {id:'à-quoi-servira-leffort-demandé', number:'05', icon:'target', tone:'tricolor', image:'/assets/lettre-industrie-france.webp', alt:'Construction de fondations d’éoliennes sur le port du Havre', source:'https://commons.wikimedia.org/wiki/File:Chantier_des_%C3%A9oliennes_du_futur_parc_off-shore_de_F%C3%A9camp_sur_le_port_du_Havre.jpg', credit:'JunoSilfax', license:'CC BY 4.0', licenseUrl:'https://creativecommons.org/licenses/by/4.0/'},
  {id:'cinq-années-deffort-pas-un-prélèvement-sans-fin', number:'06', icon:'calendar', tone:'gold'},
  {id:'pourquoi-2035', number:'07', icon:'sunrise', tone:'cyan'},
  {id:'une-démarche-de-responsabilité-et-de-confiance', number:'08', icon:'handshake', tone:'green', image:'/assets/lettre-protection-france.webp', alt:'Poste de secours installé place Bellecour à Lyon', source:'https://commons.wikimedia.org/wiki/File:Lyon_2e_-_Poste_de_secours_place_Bellecour_(juin_2022).jpg', credit:'Sebleouf', license:'CC BY-SA 4.0', licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
  {id:'découvrir-et-contribuer', number:'09', icon:'megaphone', tone:'blue', image:'/assets/lettre-generations-france.webp', alt:'Jeunes réunis sur le parvis de la cathédrale Saint-Pierre de Montpellier', source:'https://commons.wikimedia.org/wiki/File:Parvis_de_la_Cath%C3%A9drale_Saint-Pierre_de_Montpellier.jpg', credit:'Christian Ferrer', license:'CC BY-SA 4.0', licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/'},
];

function decorateLetterContent(html, defaultIcon) {
  const signature = '<div class="letter-signature"><strong>Andy Sabria</strong><span>Architecte de Démarche France 2035</span></div>';
  const prepared = html.replace('<p><strong>Andy Sabria</strong></p>\n<p><em>Architecte de Démarche France 2035</em></p>', signature);
  return prepared.split(/(<h2 id="[^"]+">[\s\S]*?<\/h2>)/g).map((chunk) => {
    const heading = chunk.match(/^<h2 id="([^"]+)">([\s\S]*?)<\/h2>$/);
    if (heading) {
      return `<h3 class="letter-subheading" id="${heading[1]}">${heading[2]}</h3>`;
    }
    return chunk
      .replaceAll('<blockquote>', '<blockquote class="letter-actions">')
      .replace(/<p>([\s\S]*?)<\/p>/g, (_match, paragraph) => `<p class="letter-paragraph">${paragraph}</p>`);
  }).join('');
}

function renderLetterStory() {
  return letterBodySource.trim().split(/(?=<h1 id=")/).filter(Boolean).map((chapter, index) => {
    const heading = chapter.match(/^<h1 id="([^"]+)">([\s\S]*?)<\/h1>/);
    if (!heading) return chapter;
    const config = letterChapters.find((item) => item.id === heading[1]) || letterChapters[index];
    const body = decorateLetterContent(chapter.slice(heading[0].length), config.icon);
    const visual = index === 0 && config.image ? `<figure class="letter-chapter-photo"><img src="${config.image}" alt="${config.alt}" loading="lazy" decoding="async"></figure>` : '';
    return `<section class="letter-chapter tone-${config.tone}${visual ? ' has-visual' : ''}" aria-labelledby="${config.id}"><div class="container"><header class="letter-chapter-head"><div class="letter-chapter-number">${config.number}</div><div class="letter-chapter-title"><span>La démarche</span><h2 id="${config.id}">${heading[2]}</h2></div>${visual}</header><div class="letter-chapter-content">${body}</div><a class="back-to-index" href="#index-demarche">Retour à l’index ↑</a></div></section>`;
  }).join('');
}

const nav = [
  ['/la-demarche/', 'La démarche'],
  ['/programme/', 'Programme complet'],
  ['/budget/', 'Budget'],
  ['/simulations-impact/', 'Simulations d’impact'],
  ['/calendrier-execution/', 'Calendrier d’exécution'],
  ['/contribuer/', 'Contribuer'],
  ['/journal/', 'Journal'],
  ['/contact/', 'Contact'],
];

const programme = {
  produire: [
    ['1.1', 'Restaurer immédiatement la compétitivité productive', 'Rendre l’investissement productif à nouveau prévisible, compétitif et rapide sur le territoire français.'],
    ['1.2', 'Faire de l’énergie française un avantage industriel', 'Transformer la capacité énergétique française en visibilité de long terme pour les producteurs et les territoires.'],
    ['1.3', 'Diffuser la productivité et reconstruire les capacités stratégiques', 'Accompagner la modernisation des entreprises et rebâtir les chaînes de valeur jugées essentielles.'],
    ['1.4', 'Faire grandir les petites et moyennes entreprises (PME) en entreprises de taille intermédiaire (ETI) et financer l’investissement français', 'Mobiliser l’épargne et les outils de financement pour faire grandir davantage d’entreprises en France.'],
    ['1.5', 'Réaligner le travail et les compétences sur les besoins productifs', 'Relier formation, emploi et besoins réels des secteurs qui recrutent et produisent.'],
    ['1.6', 'Transformer la recherche française en innovations industrielles', 'Accélérer le passage de la recherche au prototype, puis du prototype à la production.'],
    ['1.7', 'Reconstruire une souveraineté agricole et alimentaire', 'Donner de la visibilité aux exploitations et consolider l’autonomie alimentaire du pays.'],
    ['1.8', 'Rétablir une concurrence commerciale loyale', 'Faire respecter des conditions de concurrence cohérentes avec les exigences imposées aux producteurs français.'],
    ['1.9', 'Développer la production et la souveraineté des outre-mer', 'Adapter la stratégie productive aux atouts, aux contraintes et aux besoins propres à chaque territoire ultramarin.'],
    ['1.10', 'Faire du patrimoine vivant un levier économique rural', 'Relier transmission des savoir-faire, restauration du patrimoine, activité locale et attractivité rurale.'],
  ],
  simplifier: [
    ['2.1', 'Construire une seule administration numérique, simple et résiliente', 'Unifier les démarches autour de services publics numériques compréhensibles, sécurisés et continus.'],
    ['2.2', 'Simplifier radicalement la vie administrative des entreprises', 'Réduire les ressaisies, les délais et les interlocuteurs multiples qui détournent du travail productif.'],
    ['2.3', 'Réduire le stock de normes et accélérer les décisions administratives', 'Faire de la réduction des obligations et de l’évaluation préalable une discipline permanente.'],
    ['2.4', 'Supprimer les doublons territoriaux et simplifier les financements locaux', 'Clarifier qui décide, qui finance et qui répond du résultat dans chaque politique territoriale.'],
    ['2.5', 'Réorganiser le travail de l’État sans affaiblir ses missions essentielles', 'Redéployer les moyens vers l’exécution et les services prioritaires, avec des responsabilités lisibles.'],
    ['2.6', 'Professionnaliser les achats publics et l’immobilier de l’État', 'Mieux acheter, mutualiser et piloter le patrimoine public sur la durée.'],
    ['2.7', 'Rationaliser les opérateurs, agences, commissions et subventions', 'Évaluer l’utilité, supprimer les recouvrements et mettre fin aux dispositifs sans résultat démontré.'],
    ['2.8', 'Simplifier les parcours de la vie quotidienne', 'Concevoir les démarches à partir des événements de vie plutôt qu’à partir des structures administratives.'],
    ['2.9', 'Rendre la haute administration ouverte, responsable et évaluée', 'Relier les responsabilités, les objectifs publiés et l’évaluation effective des résultats.'],
    ['2.10', 'Gouverner par l’exécution et les résultats', 'Suivre publiquement les engagements, les responsables, les échéances et les indicateurs de réalisation.'],
  ],
  proteger: [
    ['3.1', 'Santé, retraites et protection sociale soutenable', 'Protéger les personnes tout en organisant un financement durable des solidarités.'],
    ['3.2', 'École d’excellence, autorité et transmission', 'Recentrer l’école sur les savoirs, la transmission, la protection et la capacité de chacun à progresser.'],
    ['3.3', 'Sécurité, justice, prisons et réparation', 'Rendre la chaîne de sécurité et de justice plus rapide, plus lisible et pleinement exécutable.'],
    ['3.4', 'Défense, souveraineté et résilience nationale', 'Renforcer les capacités de défense, les stocks stratégiques et la continuité du pays face aux crises.'],
    ['3.5', 'Famille, natalité, jeunesse et logement', 'Donner aux familles et aux jeunes un cadre plus stable pour se projeter, se loger et construire leur avenir.'],
    ['3.6', 'Immigration maîtrisée et frontières tenues', 'Faire appliquer des règles claires, maîtriser les flux et rendre les décisions effectives.'],
    ['3.7', 'Climat, eau, mobilités et villes adaptées', 'Préparer les territoires aux risques climatiques et organiser les investissements d’adaptation.'],
    ['3.8', 'Outre-mer stratégiques', 'Traiter les outre-mer comme des territoires de souveraineté, d’innovation et de projection française.'],
    ['3.9', 'Patrimoine vivant et rural', 'Préserver les lieux, les métiers et les paysages qui structurent la vie des territoires.'],
    ['3.10', 'Europe et international', 'Inscrire l’action française dans une doctrine cohérente de souveraineté, d’alliances, de droit et de responsabilité.'],
  ],
};

const householdRows = [
  ['M01', 'Célibataire au SMIC, locataire', '−21 €', '−25 €', '+62 €', '−286 €'],
  ['M04', 'Parent isolé, 2 enfants, revenu modeste', '−27 €', '−25 €', '+85 €', '+549 €'],
  ['M06', 'Retraité seul modeste, affection longue durée', '−38 €', '−27 €', '−31 €', '−5 922 €'],
  ['M10', 'Chômeur de moins de 50 ans, chômage long', '−665 €', '−25 €', '−25 €', '−14 682 €'],
  ['M14', 'Couple, 2 SMIC, 1 enfant, locataire', '−38 €', '−27 €', '+147 €', '+3 019 €'],
  ['M15', 'Parent isolé, 1 enfant, temps partiel', '−19 €', '−25 €', '+46 €', '−987 €'],
  ['M17', 'Personne seule, salaire médian, locataire', '−61 €', '−25 €', '+114 €', '+35 €'],
  ['M18', 'Couple salaire médian + temps partiel, 2 enfants', '−44 €', '−27 €', '+188 €', '+4 805 €'],
  ['M19', 'Retraitée seule, pension intermédiaire, sans ALD', '−48 €', '−34 €', '−39 €', '−7 335 €'],
  ['M20', 'Couple, 1 SMIC + temps partiel', '−35 €', '−27 €', '+131 €', '+2 384 €'],
];

const companyRows = [
  ['E01', 'Micro-artisan, 1 salarié', '+475 €', '+700 €', '+739 €', '+10 458 €'],
  ['E02', 'Commerce, 6 salariés', '+2 100 €', '+3 000 €', '+3 156 €', '+44 831 €'],
  ['E07', 'Petite exploitation agricole', '+3 646 €', '+1 985 €', '+1 998 €', '+45 386 €'],
  ['E09', 'Jeune installation agricole', '+6 618 €', '+3 409 €', '+3 417 €', '+80 411 €'],
  ['E11', 'Profession libérale sans salarié', '+100 €', '+175 €', '+188 €', '+2 611 €'],
  ['E15', 'Micro-entrepreneur de services', '+40 €', '+70 €', '+75 €', '+1 044 €'],
  ['E16', 'Artisan indépendant', '+80 €', '+140 €', '+150 €', '+2 089 €'],
  ['E17', 'TPE de services, 2 salariés', '+590 €', '+770 €', '+801 €', '+11 516 €'],
  ['E18', 'Petit commerce, 3 salariés', '+1 025 €', '+1 400 €', '+1 465 €', '+20 930 €'],
  ['E19', 'Bâtiment, 5 salariés', '+1 950 €', '+2 625 €', '+2 742 €', '+39 248 €'],
  ['E20', 'Services à la personne, 8 salariés', '+2 100 €', '+2 625 €', '+2 716 €', '+39 277 €'],
];

const yearRows = [
  ['Année 1', '2028', '+0,6 %', '4,78 %'],
  ['Année 2', '2029', '+1,2 %', '4,80 %'],
  ['Année 3', '2030', '+1,8 %', '4,28 %'],
  ['Année 4', '2031', '+2,4 %', '3,67 %'],
  ['Année 5', '2032', '+3,0 %', '2,94 %'],
  ['Année 6', '2033', '+3,6 %', '2,99 %'],
];

const esc = (value) => String(value).replace(/[&<>\"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));
const slugId = (num) => `section-${num.replace('.', '-')}`;

function navHtml(active) {
  return nav.map(([href, label]) => `<a href="${href}"${active === href ? ' aria-current="page" class="active"' : ''}>${label}</a>`).join('');
}

function socialIcon(network) {
  const icons = {
    facebook: '<path d="M14.6 8.3h3.1V4.2c-.5-.1-2.3-.2-4.3-.2-4.2 0-7.1 2.6-7.1 7.3v4.1H1.5V20h4.8v12h5.9V20h4l.6-4.6h-4.6v-3.6c0-1.3.4-2.2 2.4-2.2Z"/>',
    instagram: '<rect x="3" y="3" width="26" height="26" rx="7"/><circle cx="16" cy="16" r="6"/><circle cx="24.2" cy="7.8" r="1.4" fill="currentColor" stroke="none"/>',
    x: '<path d="M5 4l20 24M26 4 7 28"/>',
    whatsapp: '<path d="M27.4 15.6A11.4 11.4 0 0 1 10.5 25.7L4 28l2.2-6.3A11.4 11.4 0 1 1 27.4 15.6Z"/><path d="M11.1 10.1c.4-.5.8-.5 1.2-.1l1.6 2.3c.3.4.2.9-.2 1.4l-1 1.1c1.1 2.3 2.8 4 5 5l1.1-1c.5-.4 1-.5 1.4-.2l2.3 1.6c.4.4.4.8-.1 1.2-1.2 1.1-2.5 1.5-4 1-4.9-1.6-8.8-5.5-10.4-10.4-.5-1.5 0-2.8 1.1-4Z"/>',
    linkedin: '<rect x="4" y="12" width="5" height="16"/><circle cx="6.5" cy="6.5" r="2.7" fill="currentColor" stroke="none"/><path d="M14 28V12h5v2.3c1.1-1.8 2.9-2.8 5.2-2.8 4 0 5.8 2.5 5.8 7.3V28h-5v-8.2c0-2.3-.8-3.8-2.8-3.8-2.2 0-3.2 1.6-3.2 4.5V28Z"/>',
    bluesky: '<path d="M7 6c3.6 2.7 7.5 8.1 9 11 1.5-2.9 5.4-8.3 9-11 2.6-2 6.8-3.5 6 1.4-.4 2.3-2.2 9.8-3.6 12.5-1.3 2.5-6 3.1-10.2 2.2 7.4 1.3 9.3 5.5 5.2 9.7-7.8 8-11.2-1.7-12.1-4-1 2.3-4.4 12-12.2 4-4.1-4.2-2.2-8.4 5.2-9.7-4.2.9-8.9.3-10.2-2.2C1.5 17.2-.3 9.7-.7 7.4-1.5 2.5 4.4 4 7 6Z" transform="translate(1 0) scale(.93)"/>',
    email: '<rect x="3" y="6" width="26" height="20" rx="3"/><path d="m5 9 11 9 11-9"/>',
    more: '<circle cx="7" cy="16" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/><circle cx="25" cy="16" r="2" fill="currentColor" stroke="none"/>',
  };
  return `<svg class="social-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[network] || icons.more}</svg>`;
}

function shareDialog() {
  return `<dialog class="share-dialog" id="share-dialog" aria-labelledby="share-title">
    <div class="share-head"><div><span class="eyebrow">Faire connaître</span><h2 id="share-title">Partager la démarche</h2></div><button class="icon-button" data-close-share aria-label="Fermer">×</button></div>
    <p class="share-copy">Je soutiens la Démarche France 2035, une initiative citoyenne indépendante qui propose une vision forte de long terme, un programme complet et chiffré, des financements identifiés, des simulations d’impact et un calendrier d’exécution.</p>
    <button class="button button-primary share-native" data-share-native>Partager depuis mon appareil</button>
    <div class="share-grid" aria-label="Réseaux sociaux">
      <button data-share="facebook">${socialIcon('facebook')}Facebook</button>
      <button data-share="instagram">${socialIcon('instagram')}Instagram</button>
      <button data-share="x">${socialIcon('x')}X</button>
      <button data-share="linkedin">${socialIcon('linkedin')}LinkedIn</button>
      <button data-share="whatsapp">${socialIcon('whatsapp')}WhatsApp</button>
      <button data-share="bluesky">${socialIcon('bluesky')}Bluesky</button>
      <button data-share="email">${socialIcon('email')}Courriel</button>
    </div>
    <div class="share-tools">
      <button class="text-button" data-copy-message>Copier le message</button>
      <button class="text-button" data-copy-link>Copier le lien</button>
      <a class="text-button" href="/assets/og-france2035.png" download="demarche-france2035-partage.png">Télécharger le visuel pour Instagram</a>
    </div>
    <p class="share-status" data-share-status aria-live="polite"></p>
    <p class="fine-print">Vous pourrez modifier le message avant de le publier. Partager cette démarche ne signifie pas approuver chacune de ses propositions. Aucun réseau social n’est contacté avant votre clic.</p>
  </dialog>`;
}

function supportButtons() {
  return `<div class="support-share" aria-label="Soutenir et partager la démarche">
    <span class="support-label">Je soutiens et je partage</span>
    <div class="support-buttons">
      <button type="button" data-support-share="facebook" aria-label="Je soutiens sur Facebook">${socialIcon('facebook')}<span>Je soutiens</span><small>Facebook</small></button>
      <button type="button" data-support-share="instagram" aria-label="Je soutiens sur Instagram">${socialIcon('instagram')}<span>Je soutiens</span><small>Instagram</small></button>
      <button type="button" data-support-share="x" aria-label="Je soutiens sur X">${socialIcon('x')}<span>Je soutiens</span><small>X</small></button>
      <button type="button" data-support-share="whatsapp" aria-label="Je soutiens sur WhatsApp">${socialIcon('whatsapp')}<span>Je soutiens</span><small>WhatsApp</small></button>
      <button type="button" data-support-share="linkedin" aria-label="Je soutiens sur LinkedIn">${socialIcon('linkedin')}<span>Je soutiens</span><small>LinkedIn</small></button>
      <button type="button" data-support-share="more" aria-label="Je soutiens sur un autre réseau">${socialIcon('more')}<span>Je soutiens</span><small>Autres réseaux</small></button>
    </div>
    <p class="support-status" data-support-status aria-live="polite"></p>
  </div>`;
}

function layout({title, description, active='/', content, pathName='/', robots='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}) {
  const canonical = `${canonicalRoot}${pathName}`;
  const structuredData = JSON.stringify({
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'WebSite',
        '@id':`${canonicalRoot}/#website`,
        url:`${canonicalRoot}/`,
        name:'Démarche France 2035',
        inLanguage:'fr-FR',
        description:'Initiative citoyenne indépendante proposant un programme complet et chiffré pour le débat présidentiel de 2027.'
      },
      {
        '@type':'WebPage',
        '@id':`${canonical}#webpage`,
        url:canonical,
        name:title,
        description,
        inLanguage:'fr-FR',
        isPartOf:{'@id':`${canonicalRoot}/#website`}
      }
    ]
  }).replaceAll('<','\\u003c');
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#071c3f">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Démarche France 2035">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${canonicalRoot}/assets/og-france2035.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Démarche France 2035 — Le programme qui va jusqu’au bout pour redresser la France">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${canonicalRoot}/assets/og-france2035.png">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/assets/site.css">
  <title>${esc(title)} | Démarche France 2035</title>
  <script type="application/ld+json">${structuredData}</script>
</head>
<body>
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/" aria-label="Démarche France 2035 — revenir à l’accueil">
        <img src="/assets/logo-france2035-256.webp" width="76" height="76" alt="Démarche France 2035">
        <span class="brand-copy"><strong><span>Le programme qui va jusqu’au bout</span><span>pour redresser la France</span></strong></span>
      </a>
      <button class="menu-button" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><b>Menu</b></button>
      <nav id="main-nav" class="main-nav" aria-label="Navigation principale">${navHtml(active)}</nav>
    </div>
  </header>
  <main id="contenu">${content}</main>
  <footer class="site-footer">
    <div class="footer-grid">
      <div><img src="/assets/logo-france2035-256.webp" width="84" height="84" alt=""><p><strong>Démarche France 2035</strong><br>Initiative citoyenne indépendante, sans affiliation à un parti ni à un candidat.</p></div>
      <div><h2>Explorer</h2><a href="/la-demarche/">La démarche</a><a href="/programme/">Programme</a><a href="/budget/">Budget</a><a href="/simulations-impact/">Simulations</a><a href="/calendrier-execution/">Calendrier</a></div>
      <div><h2>Agir</h2><a href="/contribuer/">Contribuer</a><button class="footer-link" data-open-share>Partager</button><a href="mailto:${contact}">${contact}</a><a href="/mentions-legales/">Mentions & confidentialité</a></div>
    </div>
    <div class="footer-bottom"><span>© 2026 Démarche France 2035</span><span>Aucun don demandé • Aucun traceur publicitaire</span><span>Réutilisation des propositions autorisée avec citation de la source.</span></div>
  </footer>
  ${shareDialog()}
  <script src="/assets/site.js" defer></script>
</body>
</html>`;
}

function pageHero(kicker, title, intro, actions='') {
  return `<section class="page-hero"><div class="container"><span class="eyebrow light">${kicker}</span><h1>${title}</h1><p>${intro}</p>${actions ? `<div class="hero-actions">${actions}</div>` : ''}</div></section>`;
}

function downloadButton(file, label) {
  return `<a class="button button-light download" href="${file}" download>${label}<span aria-hidden="true">↓</span></a>`;
}

function shareButton(extra='button-ghost-light') {
  return `<button class="button ${extra}" data-open-share>Partager la démarche<span aria-hidden="true">↗</span></button>`;
}

function pdfViewer(file, title) {
  return `<section class="document-viewer section"><div class="container"><div class="section-heading"><span class="eyebrow">Document intégral</span><h2>${title}</h2><p>Le document ci-dessous peut être lu en plein écran, téléchargé ou imprimé.</p></div><object data="${file}#view=FitH" type="application/pdf" aria-label="${esc(title)}"><div class="pdf-fallback"><p>Votre navigateur ne peut pas afficher ce PDF directement.</p><a class="button button-primary" href="${file}">Ouvrir le PDF</a></div></object></div></section>`;
}

const home = layout({
  title: 'Programme présidentiel 2027 pour redresser la France',
  description: 'Démarche France 2035 présente un programme présidentiel citoyen, complet et chiffré, pour produire en France, simplifier l’État et mieux protéger.',
  pathName: '/',
  content: `
  <section class="home-hero">
    <img class="hero-image" src="/assets/hero-france2035.webp" width="1672" height="941" fetchpriority="high" alt="Territoire français réunissant agriculture, industrie moderne, énergie et train">
    <div class="hero-shade"></div>
    <div class="container hero-copy">
      <span class="eyebrow light">Programme citoyen pour le débat présidentiel de 2027</span>
      <h1 class="home-title"><span>Le programme qui va jusqu’au bout</span><span class="keep-together">pour redresser la France</span></h1>
      <p>Pour nourrir le débat présidentiel de 2027, France 2035 ne juxtapose pas des promesses. Le programme organise un même redressement : libérer les forces qui créent la richesse, reconstruire un État moderne et efficace, puis concentrer ses moyens sur ce qui change réellement la vie et protège le pays.</p>
      <div class="hero-actions"><a class="button button-light" href="#vision">Comprendre la vision<span>↓</span></a><a class="button button-ghost-light" href="/programme/">Lire le programme complet<span>→</span></a></div>
      ${supportButtons()}
    </div>
  </section>
  <section class="proof-strip" aria-label="Le cap de France 2035"><div class="container"><span>Créer plus de richesse en France</span><span>Faire gagner du temps à tous</span><span>Remettre les moyens sur le terrain</span></div></section>

  <section class="section fiscal-focus" aria-labelledby="cap-budgetaire"><div class="container fiscal-focus-grid"><div><span class="eyebrow">Trajectoire budgétaire</span><h2 id="cap-budgetaire">Sous 3 % en cinq ans.</h2><p class="lead">Dans le scénario chiffré publié, le déficit public revient à 2,94 % du PIB en année 5 et reste ensuite inférieur à 3 %.</p><p>Dès l’année 7, 2 milliards d’euros par an sont consacrés aux priorités nationales, en plus d’une provision budgétaire de sécurité de 2 milliards d’euros par an.</p><small>Scénario de travail non certifié — contre-expertise indépendante prévue.</small></div><div class="fiscal-focus-stats"><article><b>2,94 %</b><span>Déficit public en année 5</span></article><article><b>2 Md€/an</b><span>Priorités nationales dès l’année 7</span></article><article><b>2 Md€/an</b><span>Provision budgétaire de sécurité</span></article><a href="/budget/">Voir toute la trajectoire budgétaire →</a></div></div></section>

  <section class="section conviction-section" id="vision"><div class="container conviction-grid"><div><span class="eyebrow">La conviction centrale</span><h2>On ne protège durablement que ce que l’on est capable de financer.</h2></div><div><p class="manifesto">La France doit recommencer à produire davantage de richesses, de biens, de services utiles, de savoir-faire et de technologies. C’est ce qui permet de créer des emplois, de mieux rémunérer le travail, de rester maître de nos choix et de financer durablement notre modèle social.</p><p>La solidarité envers les plus fragiles reste un devoir. Mais pour la rendre forte, la France doit d’abord soutenir celles et ceux qui travaillent, entreprennent, investissent, innovent, forment, exportent et produisent sur son territoire.</p></div></div></section>

  <section class="section strategy-section"><div class="container"><div class="section-heading strategy-heading"><span class="eyebrow light">La stratégie</span><h2>Un seul projet de pays.<br>Trois transformations indissociables.</h2><p>Les mesures n’ont de sens que parce qu’elles servent cette architecture d’ensemble.</p></div><div class="strategy-grid">
    <article class="strategy-card strategy-produce"><div class="strategy-number">01</div><div><span class="strategy-verb">Produire</span><h3>Faire de la France un pays où il redevient possible et rentable de produire.</h3><p>Le programme agit en même temps sur les coûts fixes, le coût du travail productif, l’énergie, les délais d’autorisation, la modernisation des entreprises, l’agriculture, l’innovation et les compétences.</p><p class="strategy-result"><b>Le résultat recherché :</b> des entreprises plus solides, davantage d’investissements et d’emplois productifs, moins de dépendances et plus de richesse créée en France.</p><ul class="evidence-tags" aria-label="Principaux leviers de production"><li>−35 % d’impôts de production dès la 2e année</li><li>−3 Md€/an de cotisations patronales</li><li>Formations réorientées vers les métiers utiles</li><li>40 000 PME et ETI modernisées</li></ul><a href="/programme/#produire">Découvrir le pilier Produire →</a></div></article>
    <article class="strategy-card strategy-simplify"><div class="strategy-number">02</div><div><span class="strategy-verb">Simplifier</span><h3>Transformer l’appareil d’État pour qu’il aide au lieu de ralentir.</h3><p>Ce n’est pas une petite simplification de plus, mais un programme massif de modernisation et d’économies. France Administration, le compte citoyen et le portail Mon entreprise mettent fin aux documents réclamés plusieurs fois, aux circuits opaques et aux responsabilités dispersées. Les doublons, anciens logiciels, agences, commissions, achats et surfaces inutiles sont réduits.</p><p class="strategy-result"><b>Le résultat recherché :</b> moins de paperasse et de contrôles redondants, plus de décisions rapides, un accompagnement humain maintenu et des économies structurelles.</p><ul class="evidence-tags" aria-label="Principaux leviers de simplification"><li>Une donnée fournie une seule fois</li><li>Un dossier et un responsable identifiés</li><li>Priorité à la mise en conformité</li><li>9 000 fonctions administratives libérées</li></ul><a href="/programme/#simplifier">Découvrir le pilier Simplifier →</a></div></article>
    <article class="strategy-card strategy-protect"><div class="strategy-number">03</div><div><span class="strategy-verb">Protéger</span><h3>Concentrer l’État sur les services et les capacités qui protègent réellement.</h3><p>Les moyens libérés sont redirigés vers l’accès aux soins, l’école, la justice, la police, l’exécution des décisions, les prisons, la famille, la défense, la résilience et la protection des plus fragiles.</p><p class="strategy-result"><b>Le résultat recherché :</b> un système de santé mieux organisé, une école qui transmet, une justice plus rapide, davantage de forces sur le terrain et un pays préparé aux crises.</p><ul class="evidence-tags" aria-label="Principaux leviers de protection"><li>25 000 contrats d’assistants médicaux au total</li><li>12 000 renforts opérationnels dans la justice</li><li>5 000 capacités police-gendarmerie</li><li>100 000 places de prison visées</li></ul><a href="/programme/#proteger">Découvrir le pilier Protéger →</a></div></article>
  </div></div></section>

  <section class="section virtuous-section"><div class="container"><div class="section-heading"><span class="eyebrow">Le cercle du redressement</span><h2>Chaque pilier rend les deux autres possibles.</h2></div><div class="virtuous-flow" aria-label="Le cercle du redressement"><div><span>01</span><b>La production crée la richesse</b><p>Travail, entreprises, agriculture, industrie, innovation.</p></div><i aria-hidden="true">→</i><div><span>02</span><b>La simplification libère des moyens</b><p>Temps, argent public, agents, décisions et énergie collective.</p></div><i aria-hidden="true">→</i><div><span>03</span><b>La protection redevient efficace</b><p>Santé, école, sécurité, justice, solidarité et souveraineté.</p></div></div><p class="virtuous-conclusion">Une protection plus forte soutient à son tour la confiance, le travail et la capacité du pays à produire. France 2035 n’oppose donc pas l’économie et les services publics : il les remet dans le bon ordre.</p></div></section>

  <section class="section service-state-section"><div class="container state-grid"><div class="state-intro"><span class="eyebrow light">Un État qui change de rôle</span><h2>Moins de temps passé à embêter.<br>Plus de temps consacré à aider et agir.</h2><p>La simplification n’est pas un recul de l’État. C’est le passage d’un État dispersé et procédurier à un État présent, responsable et utile.</p></div><div class="state-shift"><div><small>Ce qui doit reculer</small><p>Les doubles saisies, les justificatifs répétés, les contrôles non coordonnés, les fonctions support redondantes, les délais sans responsable et les sanctions avant l’aide à la mise en conformité.</p></div><div><small>Ce qui doit progresser</small><p>L’accueil humain, les décisions dans un délai connu, l’aide aux particuliers et aux entreprises, les greffes, les enquêtes, l’exécution des peines, la sécurité de proximité et la continuité des services.</p></div></div><div class="redeployment"><b>4 500 capacités redéployées vers le terrain</b><span>2 500 vers la police et la gendarmerie • 2 000 vers la justice, après sélection et formation, en complément des recrutements nets.</span></div></div></section>

  <section class="section contract-section"><div class="container"><div class="section-heading"><span class="eyebrow">Le contrat du premier quinquennat</span><h2>Cinq ans pour changer la direction du pays.</h2><p>Les promesses qui ne commencent qu’après l’année 5 ne sont pas présentées comme des acquis du quinquennat.</p></div><div class="contract-grid"><article><span>01</span><h3>Déclencher le choc productif</h3><p>Baisser durablement les coûts de production, sécuriser l’énergie, accélérer les projets et remettre les formations au service des besoins réels.</p></article><article><span>02</span><h3>Moderniser l’État en profondeur</h3><p>Unifier les démarches, supprimer les doublons, rendre les responsables identifiables et mesurer les résultats plutôt que l’activité administrative.</p></article><article><span>03</span><h3>Renforcer les fonctions essentielles</h3><p>Faire monter en puissance la santé, l’école, la justice, la sécurité, les capacités pénitentiaires et la préparation aux crises.</p></article><article><span>04</span><h3>Rétablir la maîtrise des comptes</h3><p>Ramener le déficit public à 2,94 % en année 5, puis le maintenir sous 3 % tout en finançant les priorités nationales et une provision budgétaire de sécurité.</p></article></div><div class="budget-status"><strong>Transparence :</strong> les trajectoires budgétaires A1–A15 sont publiées comme le scénario chiffré du programme. Elles seront soumises à une contre-expertise indépendante et actualisées si celle-ci révèle un écart.</div></div></section>

  <section class="section method-section"><div class="container"><div class="section-heading"><span class="eyebrow">La preuve par l’exécution</span><h2>Une vision, mais aussi les moyens de la vérifier.</h2><p>Le détail vient après le cap : chaque choix est relié à son financement, son calendrier, ses effets attendus et ses limites.</p></div><div class="document-grid">
    <a href="/programme/"><b>70 pages</b><span>Le programme actualisé</span><small>30 chantiers • 436 mesures</small></a>
    <a href="/budget/"><b>15 ans</b><span>Le cadre budgétaire</span><small>Chiffres, hypothèses et état de certification</small></a>
    <a href="/simulations-impact/"><b>40 cas</b><span>Les simulations d’impact</span><small>20 ménages et 20 entreprises</small></a>
    <a href="/calendrier-execution/"><b>100 jours → 2042</b><span>Le calendrier d’exécution</span><small>Décisions, lois, déploiement et contrôle</small></a>
  </div></div></section>
  <section class="section founder-section"><div class="container founder-card"><div class="founder-mark"><img src="/assets/logo-france2035-256.webp" width="112" height="112" alt="Logo Démarche France 2035"></div><div><span class="eyebrow">Une démarche citoyenne indépendante</span><h2>Six mois et demi pour relier une vision, un programme, un budget et un calendrier.</h2><p class="lead">Andy Sabria, père de deux jeunes enfants, a entrepris ce travail sans commande d’un parti et sans intérêt financier.</p><p>La démarche ne soutient aujourd’hui aucun parti ni aucun candidat. Elle propose une architecture complète que les citoyens, spécialistes et responsables publics peuvent lire, discuter, corriger et enrichir.</p><a class="button button-primary" href="/la-demarche/">Comprendre l’origine de la démarche<span>→</span></a></div></div></section>
  <section class="section independent-section"><div class="container split"><div><span class="eyebrow">Libre et indépendante</span><h2>Un programme pour nourrir le débat, pas un appareil politique.</h2></div><div><p class="lead">La démarche ne soutient aujourd’hui aucun parti ni aucun candidat. Elle ne sollicite aucun don.</p><p>Elle invite citoyens, spécialistes, professionnels et responsables publics à lire, corriger, enrichir et faire connaître le travail. Tout candidat ou mouvement peut reprendre, adapter ou défendre les propositions, à condition de citer Démarche France 2035 comme source et d’indiquer ses modifications.</p><a class="button button-primary" href="/contribuer/">Contribuer à la démarche<span>→</span></a></div></div></section>
  <section class="section evidence-section"><div class="container evidence"><div class="big-stat">20<span>%</span></div><div><span class="eyebrow">Une exigence de méthode</span><h2>La confiance se reconstruit par des engagements vérifiables.</h2><p>En février 2026, seuls 20 % des Français considéraient que les responsables politiques essayaient de tenir leurs promesses. Démarche France 2035 répond par la publication simultanée du cap, du budget, des impacts et du calendrier — avec les limites et travaux encore en cours.</p><a class="source-link" href="https://www.sciencespo.fr/cevipof/fr/actualites/barometre-de-la-confiance-politique-cevipof-2026-la-confiance-s-effondre-en-politique-la-proximite-fait-figure-de-refuge/" target="_blank" rel="noopener">Source : CEVIPOF–OpinionWay, Baromètre 2026 ↗</a></div></div></section>
  <section class="closing-cta"><div class="container"><span class="eyebrow light">Faire circuler les idées</span><h2>Que chaque candidat soit confronté à une vision complète.</h2><p>Partagez la démarche sans engagement partisan : pour qu’elle soit lue, discutée et améliorée.</p><div class="hero-actions">${shareButton('button-light')}<a class="button button-ghost-light" href="/contact/">Nous écrire</a></div></div></section>`
});

const demarchePage = layout({
  title:'La démarche — Andy Sabria', active:'/la-demarche/', pathName:'/la-demarche/',
  description:'La démarche complète d’Andy Sabria, architecte de Démarche France 2035 : l’origine, la vision, les choix et l’appel à contribuer.',
  content:`<section class="letter-hero"><div class="container"><span class="eyebrow light">La démarche</span><h1><em>« Le redressement de la France ne se fera ni par des slogans ni par des demi-mesures, mais par une vision de long terme, forte et claire, traduite en choix cohérents et surtout financés. »</em></h1><p class="letter-hero-meta">Programme commencé le 15 février 2026 et achevé le 30 août 2026.</p><div class="hero-actions">${downloadButton('/downloads/lettre-presentation-demarche-france2035.pdf','Télécharger la lettre de présentation au format PDF')}</div></div></section>
  <section class="section letter-index" id="index-demarche"><div class="container"><div class="section-heading"><span class="eyebrow">Index</span><h2>Accéder directement à un chapitre.</h2></div><nav class="letter-index-grid" aria-label="Index des chapitres"><a href="#pourquoi-jai-entrepris-ce-travail"><span>01</span>Pourquoi j’ai entrepris ce travail</a><a href="#regarder-quinze-ans-devant"><span>02</span>Regarder quinze ans devant</a><a href="#des-choix-difficiles-parce-que-le-temps-et-largent-manquent"><span>03</span>Des choix difficiles</a><a href="#un-effort-partagé-selon-les-possibilités-de-chacun"><span>04</span>Un effort partagé</a><a href="#à-quoi-servira-leffort-demandé"><span>05</span>À quoi servira l’effort</a><a href="#cinq-années-deffort-pas-un-prélèvement-sans-fin"><span>06</span>Cinq années d’effort</a><a href="#pourquoi-2035"><span>07</span>Pourquoi 2035 ?</a><a href="#une-démarche-de-responsabilité-et-de-confiance"><span>08</span>Responsabilité et confiance</a><a href="#découvrir-et-contribuer"><span>09</span>Découvrir et contribuer</a></nav></div></section>
  <div class="letter-story" id="lettre-integrale">${renderLetterStory()}</div>
  <section class="contact-band"><div class="container"><div><span class="eyebrow">Échanger avec Andy Sabria</span><h2>${contact}</h2></div><a class="button button-primary" href="mailto:${contact}?subject=%C3%80%20propos%20de%20votre%20lettre%20de%20pr%C3%A9sentation">Écrire à Démarche France 2035<span>→</span></a></div></section>`
});

function programmeCards(items) {
  return items.map(([num,title,desc]) => `<article class="programme-card" id="${slugId(num)}"><span>${num}</span><div><h3>${title}</h3><p>${desc}</p></div><a href="#sommaire" aria-label="Retour au sommaire">↑</a></article>`).join('');
}

function tocColumn(id, label, items) {
  return `<div class="toc-column ${id}"><h3>${label}</h3>${items.map(([num,title]) => `<a href="#${slugId(num)}"><span>${num}</span>${title}</a>`).join('')}</div>`;
}

const programmePage = layout({
  title: 'Programme complet', active:'/programme/', pathName:'/programme/',
  description:'Le programme complet Démarche France 2035 : produire davantage en France, rendre l’État utile et protéger plus efficacement.',
  content: `${pageHero('Programme actualisé le 11 septembre 2026','Une transformation d’ensemble.<br>Trente chantiers pour la réaliser.','Le détail ne remplace pas la vision : chaque mesure doit aider la France à produire, libérer l’action ou renforcer une protection essentielle.',`${downloadButton('/downloads/programme-complet-france2035.pdf','Télécharger le programme complet — PDF, 70 pages')}${shareButton()}`)}
  <section class="status-note"><div class="container"><strong>Transparence budgétaire</strong><p>Les trajectoires des années 1 à 15 constituent le scénario chiffré publié du programme. Elles restent soumises à une contre-expertise indépendante et pourront être actualisées si celle-ci révèle un écart.</p></div></section>
  <section class="section programme-intro"><div class="container"><div class="programme-lens"><article><span>Le point de départ</span><h2>La richesse doit être créée avant d’être distribuée.</h2><p>Soutenir le travail, les entreprises, l’agriculture, l’industrie, l’innovation et les savoir-faire français donne au pays les moyens de financer son modèle social et sa souveraineté.</p></article><article><span>La transformation</span><h2>L’État doit devenir plus simple et plus utile.</h2><p>Le numérique commun, la fin des doublons et la responsabilisation de chaque service doivent libérer du temps, réaliser des économies et redéployer des agents vers les missions de terrain.</p></article><article><span>La finalité</span><h2>La protection doit redevenir concrète.</h2><p>Les moyens sont concentrés sur la santé, l’école, la justice, la sécurité, la famille, la défense, la résilience et les personnes qui ont réellement besoin de la solidarité nationale.</p></article></div><div class="programme-meta"><b>3 piliers indissociables</b><span>30 chantiers structurants</span><span>436 mesures détaillées</span><span>70 pages accessibles</span></div></div></section>
  <section class="section toc-section" id="sommaire"><div class="container"><div class="section-heading"><span class="eyebrow">Sommaire cliquable</span><h2>Aller directement à un chantier.</h2></div><div class="toc-grid">${tocColumn('produce','1. Produire',programme.produire)}${tocColumn('simplify','2. Simplifier',programme.simplifier)}${tocColumn('protect','3. Protéger',programme.proteger)}</div></div></section>
  <section class="programme-block produce-block" id="produire"><div class="container"><div class="block-title"><span>01</span><div><p>Créer de la richesse pour financer le modèle social et la souveraineté.</p><h2>Produire</h2></div></div>${programmeCards(programme.produire)}</div></section>
  <section class="programme-block simplify-block" id="simplifier"><div class="container"><div class="block-title"><span>02</span><div><p>Rendre l’action publique compréhensible, rapide et responsable.</p><h2>Simplifier</h2></div></div>${programmeCards(programme.simplifier)}</div></section>
  <section class="programme-block protect-block" id="proteger"><div class="container"><div class="block-title"><span>03</span><div><p>Consolider les capacités qui protègent les personnes et la nation.</p><h2>Protéger</h2></div></div>${programmeCards(programme.proteger)}</div></section>
  ${pdfViewer('/downloads/programme-complet-france2035.pdf','Lire le programme complet — 70 pages')}`
});

const budgetPage = layout({
  title:'Budget', active:'/budget/', pathName:'/budget/',
  description:'Le budget général Démarche France 2035, ses hypothèses, ses trajectoires et son état de certification.',
  content:`${pageHero('Budget général','Chiffrer avant de promettre.','Le budget rassemble la référence 2026 et les trajectoires des années 1 à 15. Son état de consolidation est affiché sans ambiguïté.',`${downloadButton('/downloads/budget-general-france2035.pdf','Télécharger le budget — PDF')}${shareButton()}`)}
  <section class="certification-warning"><div class="container"><div class="warning-icon">!</div><div><h2>Trajectoire budgétaire publiée — contre-expertise indépendante prévue</h2><p><b>Statut au 15 septembre 2026.</b> La trajectoire des années 1 à 15 constitue le scénario chiffré du programme. Les données de référence, les hypothèses et les calculs restent accessibles et pourront être actualisés après les contre-calculs prévus.</p></div></div></section>
  <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Lecture immédiate</span><h2>Huit repères documentés.</h2><p>Ces paramètres structurent le travail budgétaire. Leur présence ne vaut pas certification de l’équilibre d’ensemble.</p></div><div class="metric-grid"><div><small>Déficit public</small><b>2,94 % en année 5</b><span>puis maintenu sous 3 % jusqu’à l’année 15 dans le scénario publié</span></div><div><small>Priorités nationales</small><b>2 Md€/an dès l’année 7</b><span>18 Md€ intégrés sur les années 7 à 15</span></div><div><small>Provision budgétaire de sécurité</small><b>2 Md€/an</b><span>années 1 à 15, soit 30 Md€ cumulés</span></div><div><small>Impôts de production</small><b>−20 % en année 1</b><span>−35 % dès l’année 2 ; coût en euros à certifier</span></div><div><small>Fonds Santé</small><b>12,5 Md€</b><span>plafond visé à l’horizon de l’année 5</span></div><div><small>Productivité PME/ETI</small><b>4 Md€</b><span>redéployés sur les années 1 à 5 pour 40 000 entreprises</span></div><div><small>Contribution temporaire</small><b>1 / 5 / 9 %</b><span>années 1 à 5 ; cible de 26,3 Md€/an non microsimulée</span></div><div><small>Affectations des années 7 à 15</small><b>52,5 Md€</b><span>à rapprocher d’une marge de croissance non certifiée</span></div></div></div></section>
  <section class="section light-section"><div class="container split"><div><span class="eyebrow">Règle de lecture</span><h2>Ce que le budget doit permettre de vérifier.</h2></div><div class="check-list"><p><span>01</span>Le coût de chaque mesure et son budget parent unique.</p><p><span>02</span>L’absence de double comptage entre ministères et piliers.</p><p><span>03</span>La distinction entre crédits acquis, hypothèses et activations conditionnelles.</p><p><span>04</span>La cohérence annuelle entre dépenses, recettes, économies, dette et intérêts.</p><p><span>05</span>La publication d’une trajectoire certifiée avant toute accélération.</p></div></div></section>
  ${pdfViewer('/downloads/budget-general-france2035.pdf','Lire le budget général — référence 2026 et années 1 à 15')}`
});

const table = (headers, rows, caption) => `<div class="table-wrap" tabindex="0"><table><caption>${caption}</caption><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${cell}</th>`:`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const simulationsPage = layout({
  title:'Simulations d’impact', active:'/simulations-impact/', pathName:'/simulations-impact/',
  description:'Les simulations d’impact Démarche France 2035 : 20 profils de ménages et 20 profils d’entreprises, avec méthode et limites.',
  content:`${pageHero('40 cas types','Voir qui gagne, qui perd et quand.','Les simulations rendent visibles les effets directs sur 20 ménages et 20 entreprises, de l’année 1 à l’année 15.',`${downloadButton('/downloads/simulations-impact-france2035.pdf','Télécharger les simulations — PDF')}${shareButton()}`)}
  <section class="status-note"><div class="container"><strong>À lire avant les résultats</strong><p>Les cas sont indicatifs, non certifiés, non opposables et non extrapolables. Les valeurs à partir de l’année 6 restent provisoires et n’ont pas encore été intégralement remicrosimulées après l’actualisation de la trajectoire budgétaire.</p></div></section>
  <section class="section" id="sommaire"><div class="container"><div class="section-heading"><span class="eyebrow">Sommaire cliquable</span><h2>Lire les résultats dans leur contexte.</h2></div><div class="compact-toc"><a href="#reperes">Repères de cadrage</a><a href="#menages">Ménages courants et modestes</a><a href="#entreprises">Microentreprises et TPE</a><a href="#limites">Méthode et limites</a><a href="#document-integral">Document intégral</a></div></div></section>
  <section class="section light-section" id="reperes"><div class="container"><div class="section-heading"><span class="eyebrow">Repères de cadrage</span><h2>Une trajectoire de travail, pas une prévision garantie.</h2></div>${table(['Année','Calendrier','Potentiel cumulé*','Déficit public*'],yearRows,'Repères macroéconomiques affichés dans la source')}</div></section>
  <section class="section" id="menages"><div class="container"><div class="section-heading"><span class="eyebrow">Lecture prioritaire</span><h2>Dix profils de ménages.</h2><p>Impact direct mensuel en année 1, année 6 et année 15. Le cumul sur quinze ans correspond à la somme des impacts mensuels multipliés par douze.</p></div>${table(['Cas','Profil','Année 1 / mois','Année 6 / mois','Année 15 / mois','Cumul 15 ans'],householdRows,'Extrait prioritaire — ménages courants et modestes')}</div></section>
  <section class="section blue-section" id="entreprises"><div class="container"><div class="section-heading"><span class="eyebrow light">Lecture prioritaire</span><h2>Onze profils de microentreprises et TPE.</h2><p>Impact direct annuel. Les gains opérationnels valorisent du temps administratif : ils ne correspondent pas à un versement.</p></div>${table(['Cas','Profil','Année 1 / an','Année 6 / an','Année 15 / an','Cumul 15 ans'],companyRows,'Extrait prioritaire — microentreprises et TPE')}</div></section>
  <section class="section" id="limites"><div class="container"><div class="limit-grid"><div><span class="eyebrow">Méthode</span><h2>Interpréter avec prudence.</h2></div><div><p><b>Cas types.</b> Ils illustrent des situations définies ; ils ne remplacent pas une microsimulation nationale.</p><p><b>Effets directs.</b> Les montants ne préjugent pas des comportements, de l’inflation, des effets macroéconomiques ni des décisions futures.</p><p><b>État du modèle.</b> Le moteur de calcul indiqué est la version du 1er septembre 2026 (v5). Les hypothèses seront révisées avec la trajectoire budgétaire.</p><p><b>Lecture complète.</b> Le PDF présente les 40 cas, leur détail, les limites et les sources publiques de cadrage.</p></div></div></div></section>
  <div id="document-integral">${pdfViewer('/downloads/simulations-impact-france2035.pdf','Lire les simulations d’impact complètes')}</div>`
});

const timeline = [
  ['Jours 1 à 10','Installer le commandement de l’exécution','Nommer les responsables des dix objectifs, créer la cellule d’exécution auprès du Premier ministre, lancer les audits et publier les résultats attendus.'],
  ['Jours 11 à 30','Préparer les décisions budgétaires et sociales','Bâtir les cadres du PLF et du PLFSS 2028, préparer la baisse des impôts de production, les cotisations employeur et l’enveloppe stratégique.'],
  ['Jours 31 à 60','Déposer les grands textes','Déposer les lois de programmation productive, France Administration, simplification, école, justice-sécurité et les programmations souveraines.'],
  ['Jours 61 à 100','Passer aux pilotes et rendre compte','Adopter les premiers textes et décrets, ouvrir les services pilotes, engager les premières cohortes et publier un bilan au centième jour.'],
  ['Année 1 — 2028','Le choc de mise en œuvre','Baisse de 20 % des impôts de production, baisse annuelle de 3 Md€ des cotisations employeur, premiers services numériques, Fonds Santé à 5 Md€ et premiers renforts.'],
  ['Année 2 — 2029','Généraliser ce qui fonctionne','Baisse totale de 35 % des impôts de production, deuxième vague d’investissements, extension des services numériques et Fonds Santé à 8 Md€.'],
  ['Année 3 — 2030','Accélérer et évaluer','Accélération des filières, évaluation à mi-parcours, dossiers uniques, économies de simplification et Fonds Santé à 10 Md€.'],
  ['Année 4 — 2031','Livrer à l’échelle nationale','Industrialisation et rattrapage, couverture numérique nationale, réorganisations et Fonds Santé à 12,5 Md€.'],
  ['Année 5 — 2032','Clore le premier cycle','Objectif de 40 000 PME/ETI accompagnées, bilan des doublons et stabilisation du Fonds Santé à 12,5 Md€.'],
  ['Année 6 — 2033','Passer à la consolidation','Stabiliser le choc productif, empêcher la réapparition des doublons et ajuster les protections de long terme.'],
  ['Années 7 à 10 — 2034–2037','Conditionner les accélérations','Préparer les étapes fiscales et sociales suivantes sans les activer tant qu’une trajectoire certifiée et un financement explicite ne sont pas disponibles.'],
  ['Années 11 à 15 — 2038–2042','Évaluer, corriger, transmettre','Maintenir les capacités utiles, arrêter ce qui échoue, renouveler ce qui fonctionne et publier le bilan complet à quinze ans.'],
];

const calendarPage = layout({
  title:'Calendrier d’exécution', active:'/calendrier-execution/', pathName:'/calendrier-execution/',
  description:'Le calendrier d’exécution Démarche France 2035, des cent premiers jours jusqu’au bilan à quinze ans.',
  content:`${pageHero('100 jours • Années 1 à 15','Une date, un responsable, un résultat.','Le calendrier transforme le programme en séquence d’action : préparation en 2027, première année budgétaire complète en 2028, bilan à quinze ans en 2042.',`${downloadButton('/downloads/calendrier-execution-france2035.pdf','Télécharger le calendrier — PDF')}${shareButton()}`)}
  <section class="status-note"><div class="container"><strong>Garde-fou d’exécution</strong><p>L’année 1 correspond à 2028, l’année 10 à 2037 et l’année 15 à 2042. Pour les années 7 à 15, les activations conditionnelles restent subordonnées à la vérification des comptes et à la confirmation de leur financement.</p></div></section>
  <section class="section" id="sommaire"><div class="container"><div class="section-heading"><span class="eyebrow">Sommaire cliquable</span><h2>Parcourir le temps de l’action.</h2></div><div class="compact-toc"><a href="#jours-100">Les 100 premiers jours</a><a href="#annees-1-a-5">Années 1 à 5 — 2028 à 2032</a><a href="#annees-6-a-10">Années 6 à 10 — 2033 à 2037</a><a href="#annees-11-a-15">Années 11 à 15 — 2038 à 2042</a><a href="#textes">Les sept grands textes</a><a href="#document-integral">Document intégral</a></div></div></section>
  <section class="section light-section"><div class="container"><div class="section-heading"><span class="eyebrow">Trajectoire</span><h2>De l’installation au bilan.</h2></div><div class="timeline">${timeline.map((row,i)=>`<article${i===0?' id="jours-100"':i===4?' id="annees-1-a-5"':i===9?' id="annees-6-a-10"':i===11?' id="annees-11-a-15"':''}><div class="time-marker"><span>${String(i+1).padStart(2,'0')}</span></div><div><small>${row[0]}</small><h3>${row[1]}</h3><p>${row[2]}</p></div></article>`).join('')}</div></div></section>
  <section class="section" id="textes"><div class="container"><div class="section-heading"><span class="eyebrow">Architecture législative</span><h2>Sept ensembles de textes à préparer.</h2></div><ol class="law-grid"><li>Budget et redressement 2028</li><li>Loi de programmation productive</li><li>Loi France Administration</li><li>Loi de simplification et de responsabilité publique</li><li>Loi école, jeunesse et protection numérique</li><li>Loi justice, sécurité et responsabilité</li><li>Programmations souveraines et doctrine internationale</li></ol></div></section>
  <div id="document-integral">${pdfViewer('/downloads/calendrier-execution-france2035.pdf','Lire le calendrier d’exécution complet')}</div>`
});

const contributePage = layout({
  title:'Contribuer', active:'/contribuer/', pathName:'/contribuer/',
  description:'Contribuer bénévolement à Démarche France 2035 : relire, documenter, améliorer et faire connaître le programme, sans don.',
  content:`${pageHero('Participer','Aider par les idées, l’expertise et le relais.','Démarche France 2035 ne demande aucun don. Elle cherche des contributions utiles pour éprouver, corriger, enrichir et diffuser le programme.',`${shareButton('button-light')}<a class="button button-ghost-light" href="mailto:${contact}?subject=Je%20souhaite%20contribuer%20%C3%A0%20D%C3%A9marche%20France%202035">Écrire à l’équipe</a>`)}
  <section class="section"><div class="container split"><div><span class="eyebrow">Pourquoi participer ?</span><h2>Un programme sérieux gagne à être confronté au réel.</h2></div><div><p class="lead">Un document complet n’est jamais un document fermé. Il doit être relu par celles et ceux qui connaissent les métiers, les territoires, les services publics, le droit, l’économie et les contraintes d’exécution.</p><p>Votre contribution peut corriger une erreur, documenter une hypothèse, signaler un effet oublié, proposer une amélioration ou simplement aider le programme à atteindre des personnes capables d’en débattre.</p><p>La responsabilité éditoriale finale reste celle de Démarche France 2035 : chaque suggestion est examinée, comparée aux autres propositions et replacée dans la cohérence budgétaire et opérationnelle d’ensemble.</p></div></div></section>
  <section class="section light-section"><div class="container"><div class="section-heading"><span class="eyebrow">Contributions recherchées</span><h2>Quatre manières d’être utile.</h2></div><div class="contribute-grid">
    <a href="mailto:${contact}?subject=Correction%20%C3%A0%20signaler&body=Page%20ou%20section%20concern%C3%A9e%20%3A%0A%0ACorrection%20propos%C3%A9e%20%3A%0A%0ASource%20%3A"><span>01</span><h3>Signaler une erreur</h3><p>Indiquer la page, le passage, la correction proposée et sa source.</p></a>
    <a href="mailto:${contact}?subject=Proposition%20d%E2%80%99am%C3%A9lioration&body=Section%20concern%C3%A9e%20%3A%0A%0AProposition%20%3A%0A%0AImpact%20attendu%20%3A"><span>02</span><h3>Proposer une amélioration</h3><p>Décrire le changement, son objectif, son coût éventuel et ses effets.</p></a>
    <a href="mailto:${contact}?subject=Expertise%20ou%20source&body=Domaine%20d%E2%80%99expertise%20%3A%0A%0ASource%20ou%20analyse%20%3A"><span>03</span><h3>Apporter une expertise</h3><p>Partager une donnée, une expérience de terrain ou une source vérifiable.</p></a>
    <button data-open-share><span>04</span><h3>Faire connaître</h3><p>Partager la démarche pour qu’elle nourrisse le débat présidentiel.</p></button>
  </div></div></section>
  <section class="section reuse-section"><div class="container"><div class="reuse-card"><span class="eyebrow light">Aux responsables politiques</span><h2>Ce programme est fait pour circuler.</h2><p>Tout candidat, élu, parti ou mouvement peut reprendre, adapter, intégrer ou défendre tout ou partie des propositions, en citant clairement <b>Démarche France 2035</b> comme source et en signalant les modifications apportées.</p><p>Une reprise n’emporte ni soutien, ni ralliement, ni affiliation de la démarche. L’objectif est que les candidats à la présidentielle de 2027 soient confrontés à l’exigence d’un programme complet, chiffré, ambitieux, avec des financements identifiés et des hypothèses publiées, pensé sur dix à quinze ans.</p></div></div></section>
  <section class="contact-band"><div class="container"><div><span class="eyebrow">Votre contribution commence ici</span><h2>${contact}</h2></div><a class="button button-primary" href="mailto:${contact}?subject=Contribution%20%C3%A0%20D%C3%A9marche%20France%202035">Envoyer un courriel<span>→</span></a></div></section>`
});

const journalPage = layout({
  title:'Journal des évolutions', active:'/journal/', pathName:'/journal/',
  description:'Le journal public des mises à jour de Démarche France 2035 : documents, corrections, contributions et prochaines étapes.',
  content:`${pageHero('Journal des évolutions','Montrer ce qui change — et pourquoi.','Chaque mise à jour importante est datée. Le journal permet de suivre les ajouts, les corrections et l’état de consolidation du programme.',shareButton())}
  <section class="section"><div class="container journal"><article class="featured-post"><time datetime="2026-09-15">15 septembre 2026</time><span class="post-tag">Site</span><h2>Lancement du site</h2><p>Le programme, le budget, les simulations d’impact, le calendrier d’exécution, la lettre de présentation et l’espace de contribution sont désormais accessibles en ligne.</p></article>
  <article><time datetime="2026-08-30">30 août 2026</time><span class="post-tag">Programme</span><h2>Fin de l’élaboration du programme</h2><p>Achèvement de la première version complète de Démarche France 2035 après six mois et demi de travail.</p></article>
  </div></section>
  <section class="closing-cta"><div class="container"><span class="eyebrow light">Proposer une évolution</span><h2>Une remarque peut devenir une amélioration documentée.</h2><p>Indiquez la section concernée, le changement proposé et, si possible, une source.</p><a class="button button-light" href="mailto:${contact}?subject=Proposition%20pour%20le%20journal%20des%20%C3%A9volutions">Écrire à Démarche France 2035<span>→</span></a></div></section>`
});

const contactPage = layout({
  title:'Contact', active:'/contact/', pathName:'/contact/',
  description:'Contacter Démarche France 2035 pour une contribution, une question, une source, une correction ou une demande presse.',
  content:`${pageHero('Contact','Écrire simplement.','Une seule adresse pour contribuer, poser une question, signaler une erreur ou demander un échange.','')}
  <section class="section contact-section"><div class="container"><a class="email-card" href="mailto:${contact}"><span>Adresse de contact</span><strong>${contact}</strong><b>Ouvrir mon logiciel de messagerie →</b></a><div class="contact-topics"><a href="mailto:${contact}?subject=Contribution%20au%20programme"><span>01</span><h2>Contribution au programme</h2><p>Correction, proposition, source ou retour d’expérience.</p></a><a href="mailto:${contact}?subject=Question%20sur%20D%C3%A9marche%20France%202035"><span>02</span><h2>Question générale</h2><p>Comprendre la méthode, un document ou une proposition.</p></a><a href="mailto:${contact}?subject=Presse%20et%20entretien"><span>03</span><h2>Presse et entretien</h2><p>Demande d’information, d’échange ou de présentation.</p></a><a href="mailto:${contact}?subject=R%C3%A9utilisation%20du%20programme"><span>04</span><h2>Réutilisation politique</h2><p>Informer d’une reprise, d’une adaptation ou d’une intégration.</p></a></div></div></section>
  <section class="section light-section"><div class="container split"><div><span class="eyebrow">Données personnelles</span><h2>Un contact volontaire, sans formulaire ni fichier public.</h2></div><div><p>Le site ne collecte pas vos coordonnées et n’intègre pas de formulaire. Lorsque vous cliquez sur l’adresse, votre propre service de messagerie prend le relais.</p><p>N’envoyez que les informations nécessaires à votre demande. Vous pouvez demander la rectification ou la suppression d’un échange en écrivant à la même adresse.</p><a href="/mentions-legales/" class="source-link">Lire les mentions et la politique de confidentialité →</a></div></div></section>`
});

const legalPage = layout({
  title:'Mentions et confidentialité', active:'', pathName:'/mentions-legales/',
  description:'Mentions, indépendance, droits de réutilisation et politique de confidentialité du site Démarche France 2035.',
  content:`${pageHero('Informations','Mentions & confidentialité.','Les règles de publication, d’indépendance, de réutilisation et de protection des visiteurs.','')}
  <section class="section legal-copy"><div class="container"><h2>Édition du site</h2><p>Ce site est édité sous la responsabilité de Démarche France 2035, initiative citoyenne indépendante. Contact : <a href="mailto:${contact}">${contact}</a>.</p><h2>Indépendance</h2><p>Démarche France 2035 n’est actuellement affiliée à aucun parti, mouvement ou candidat. La mention d’un acteur politique ou la reprise d’une proposition ne vaut ni soutien, ni ralliement, ni partenariat.</p><h2>Réutilisation</h2><p>Les propositions, tableaux et analyses originales peuvent être repris, adaptés ou intégrés avec une citation visible de « Démarche France 2035 » et l’indication des modifications. Cette autorisation ne couvre pas les éléments appartenant à des tiers, ni le logo et l’identité visuelle.</p><h2>Données et traceurs</h2><p>Le site ne dépose aucun traceur publicitaire et n’embarque aucun module de réseau social. Les réseaux ne sont contactés qu’après un clic volontaire sur un lien de partage. Aucun formulaire ni outil de mesure d’audience tiers n’est utilisé dans cette version.</p><h2>Courriel</h2><p>Les messages sont traités uniquement pour répondre à la demande ou étudier la contribution. Vous pouvez demander l’accès, la rectification ou la suppression des données liées à votre échange à l’adresse de contact.</p><h2>Documents et limites</h2><p>Les documents sont publiés à titre de contribution au débat public. Les simulations sont indicatives, non opposables et non extrapolables. Les trajectoires budgétaires constituent le scénario chiffré du programme ; elles ne valent pas certification extérieure et peuvent être actualisées après contre-expertise.</p><h2>Sources</h2><p>Les sources externes sont citées dans les documents ou à proximité des données concernées. Le site distingue les résultats publiés, les hypothèses de travail et les propositions.</p></div></section>`
});

const notFound = layout({
  title:'Page introuvable', description:'La page demandée n’existe pas.', pathName:'/404.html', robots:'noindex,follow',
  content:`<section class="not-found"><div class="container"><span class="eyebrow light">Erreur 404</span><h1>Cette page n’existe pas.</h1><p>Revenez à la présentation ou consultez directement le programme.</p><div class="hero-actions"><a class="button button-light" href="/">Retour à l’accueil</a><a class="button button-ghost-light" href="/programme/">Voir le programme</a></div></div></section>`
});

const css = `
:root{--navy:#071c3f;--navy-2:#0b2c5f;--blue:#0b61c9;--cyan:#11a7b8;--red:#ef3340;--green:#67a82f;--gold:#f1a51d;--ink:#10213b;--muted:#5d687a;--cream:#f6f3ec;--paper:#fff;--line:#dce2ea;--shadow:0 20px 55px rgba(7,28,63,.12);--radius:18px;--container:min(1180px,calc(100% - 40px))}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:112px}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.62 Arial,Helvetica,sans-serif}img{max-width:100%}a{color:inherit}.container{width:var(--container);margin-inline:auto}.skip-link{position:fixed;z-index:999;left:1rem;top:-5rem;background:#fff;color:#000;padding:.8rem 1rem;border-radius:8px}.skip-link:focus{top:1rem}h1,h2,h3,p{margin-top:0}h1,h2,h3{line-height:1.08;letter-spacing:-.035em}h1{font-size:clamp(2.8rem,7vw,6.4rem)}h2{font-size:clamp(2rem,4vw,4rem)}h3{font-size:1.35rem}.lead{font-size:1.35rem;line-height:1.5}.eyebrow{display:inline-block;text-transform:uppercase;letter-spacing:.15em;font-weight:800;font-size:.74rem;color:var(--blue);margin-bottom:1rem}.eyebrow.light{color:#b8d8ff}.button{display:inline-flex;align-items:center;justify-content:center;gap:.75rem;min-height:50px;padding:.8rem 1.15rem;border:1px solid transparent;border-radius:7px;font-weight:800;text-decoration:none;cursor:pointer;font:inherit;font-weight:800;transition:.2s ease}.button:hover{transform:translateY(-2px)}.button:focus-visible,a:focus-visible,button:focus-visible{outline:3px solid #ffcc4d;outline-offset:3px}.button-primary{background:var(--blue);color:#fff}.button-light{background:#fff;color:var(--navy)}.button-ghost-light{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.5);color:#fff}.site-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.header-inner{width:min(1420px,calc(100% - 30px));min-height:94px;margin:auto;display:flex;align-items:center;gap:24px}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;flex-shrink:0}.brand img{width:70px;height:70px;object-fit:contain}.brand-copy{display:flex;flex-direction:column;max-width:245px}.brand-copy strong{font-size:.98rem;line-height:1.2}.brand-copy small{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:6px}.main-nav{display:flex;align-items:center;justify-content:flex-end;gap:2px;margin-left:auto}.main-nav a{font-size:.75rem;font-weight:800;text-decoration:none;padding:.62rem .55rem;border-radius:6px;white-space:nowrap}.main-nav a:hover,.main-nav a.active{color:var(--blue);background:#eef5ff}.menu-button{display:none;background:none;border:0}.section{padding:100px 0}.section-heading{max-width:770px;margin-bottom:42px}.section-heading h2{margin-bottom:14px}.section-heading p{font-size:1.1rem;color:var(--muted)}.home-hero{min-height:670px;position:relative;display:flex;align-items:center;overflow:hidden;background:var(--navy)}.hero-image,.hero-shade{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.hero-shade{background:linear-gradient(90deg,rgba(3,20,48,.96) 0%,rgba(3,20,48,.78) 42%,rgba(3,20,48,.12) 72%,rgba(3,20,48,.05))}.hero-copy{position:relative;color:#fff;padding-block:80px}.hero-copy h1{max-width:820px;margin-bottom:24px}.hero-copy p{max-width:690px;font-size:1.28rem;color:#e4edf8}.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.proof-strip{background:var(--navy);color:#fff;border-top:1px solid rgba(255,255,255,.15)}.proof-strip .container{display:flex;justify-content:center;flex-wrap:wrap}.proof-strip span{padding:18px 24px;font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.proof-strip span+span{border-left:1px solid rgba(255,255,255,.18)}.split{display:grid;grid-template-columns:.9fr 1.1fr;gap:9vw;align-items:start}.split h2{margin-bottom:0}.pillar-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.pillar{min-height:390px;padding:34px;border-radius:var(--radius);text-decoration:none;color:#fff;display:flex;flex-direction:column;box-shadow:var(--shadow);transition:.25s}.pillar:hover{transform:translateY(-6px)}.pillar-number{font-size:.8rem;letter-spacing:.16em;font-weight:800;opacity:.7}.pillar h3{font-size:3.1rem;margin:75px 0 18px}.pillar p{font-size:1.08rem}.card-link{margin-top:auto;font-weight:800}.produce{background:linear-gradient(145deg,#0957bb,#0a83bc)}.simplify{background:linear-gradient(145deg,#f07822,#ef3340)}.protect{background:linear-gradient(145deg,#397a28,#78ad2c)}.method-section,.light-section{background:var(--cream)}.document-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.document-grid a{background:#fff;padding:28px;border-top:4px solid var(--blue);text-decoration:none;box-shadow:0 10px 30px rgba(7,28,63,.06);transition:.2s}.document-grid a:hover{transform:translateY(-4px);box-shadow:var(--shadow)}.document-grid b{display:block;font-size:2rem;color:var(--navy)}.document-grid span,.document-grid small{display:block}.document-grid span{font-weight:800;margin:8px 0}.document-grid small{color:var(--muted)}.evidence-section{background:#eef4fb}.evidence{display:grid;grid-template-columns:300px 1fr;gap:70px;align-items:center}.big-stat{font-size:9rem;font-weight:900;line-height:1;color:var(--blue);letter-spacing:-.09em}.big-stat span{font-size:3rem}.source-link{color:var(--blue);font-weight:800;text-decoration-thickness:1px;text-underline-offset:4px}.independent-section{border-top:8px solid transparent;border-image:linear-gradient(90deg,var(--blue) 33%,#fff 33% 66%,var(--red) 66%) 1}.closing-cta{padding:95px 0;background:linear-gradient(135deg,var(--navy),#0b3d76);color:#fff}.closing-cta .container{max-width:900px;text-align:center}.closing-cta p{font-size:1.2rem;color:#dce7f6}.closing-cta .hero-actions{justify-content:center}.page-hero{background:radial-gradient(circle at 85% 20%,#145ea0 0,transparent 33%),linear-gradient(135deg,var(--navy),#0b2d60);color:#fff;padding:100px 0 90px}.page-hero h1{font-size:clamp(3rem,7vw,6rem);max-width:1000px}.page-hero p{font-size:1.28rem;max-width:780px;color:#dce7f6}.status-note{background:#eaf3ff;border-bottom:1px solid #c4d9ef}.status-note .container{display:grid;grid-template-columns:210px 1fr;gap:32px;padding-block:24px}.status-note strong{color:var(--navy)}.status-note p{margin:0}.facts-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.facts-grid>div{padding:26px;border:1px solid var(--line);border-radius:12px}.facts-grid b{display:block;font-size:2.8rem;color:var(--blue)}.facts-grid span{font-weight:700}.verified-examples{margin-top:55px}.verified-examples>div{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.verified-examples p{border-top:3px solid var(--red);padding-top:18px}.toc-section{background:var(--cream)}.toc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.toc-column{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 12px 34px rgba(7,28,63,.07)}.toc-column h3{color:#fff;margin:0;padding:22px 24px}.toc-column.produce h3{background:var(--blue)}.toc-column.simplify h3{background:var(--red)}.toc-column.protect h3{background:var(--green)}.toc-column a{display:grid;grid-template-columns:42px 1fr;gap:8px;text-decoration:none;padding:14px 18px;border-bottom:1px solid var(--line);font-size:.91rem;line-height:1.35}.toc-column a:hover{background:#f4f7fb}.toc-column a span{font-weight:900;color:var(--blue)}.programme-block{padding:95px 0}.programme-block+.programme-block{border-top:1px solid var(--line)}.produce-block{background:#f4f8fd}.simplify-block{background:#fff7f4}.protect-block{background:#f6faef}.block-title{display:flex;align-items:flex-end;gap:26px;margin-bottom:38px}.block-title>span{font-size:6rem;line-height:.8;font-weight:900;color:rgba(7,28,63,.12)}.block-title p{margin:0;color:var(--muted)}.block-title h2{font-size:4.5rem;margin:4px 0 0}.programme-card{display:grid;grid-template-columns:70px 1fr 30px;gap:22px;padding:26px 0;border-top:1px solid rgba(7,28,63,.16)}.programme-card>span{font-weight:900;color:var(--blue)}.programme-card h3{margin-bottom:8px}.programme-card p{margin:0;color:var(--muted)}.programme-card>a{text-decoration:none;font-size:1.3rem}.document-viewer{background:#e9edf2}.document-viewer object{width:100%;height:min(82vh,920px);min-height:620px;background:#fff;border:1px solid #c8d0da;border-radius:12px;box-shadow:var(--shadow)}.pdf-fallback{padding:50px;text-align:center}.certification-warning{background:#fff0d7;border-bottom:1px solid #f0c36c}.certification-warning .container{display:grid;grid-template-columns:60px 1fr;gap:22px;padding-block:28px}.warning-icon{width:52px;height:52px;display:grid;place-items:center;border-radius:50%;background:#a84c00;color:#fff;font-size:1.7rem;font-weight:900}.certification-warning h2{font-size:1.35rem;margin-bottom:8px}.certification-warning p{margin:0}.metric-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.metric-grid>div{padding:28px;background:#f5f8fc;border-left:4px solid var(--blue)}.metric-grid small{display:block;color:var(--muted);font-weight:700}.metric-grid b{display:block;font-size:2.2rem;margin-top:8px}.check-list p{display:grid;grid-template-columns:50px 1fr;gap:18px;padding:18px 0;border-top:1px solid #d7d1c7;margin:0}.check-list span{color:var(--blue);font-weight:900}.compact-toc{display:flex;flex-wrap:wrap;gap:10px}.compact-toc a{padding:10px 14px;background:#f0f4f9;border-radius:999px;text-decoration:none;font-weight:800;font-size:.9rem}.compact-toc a:hover{background:var(--blue);color:#fff}.table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:#fff}.table-wrap:focus{outline:3px solid #ffcc4d}table{width:100%;border-collapse:collapse;min-width:820px}caption{text-align:left;padding:18px 20px;font-weight:800;background:#edf3fb}th,td{padding:14px 16px;text-align:right;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums}th:nth-child(2),td:nth-child(2){text-align:left}th:first-child,td:first-child{text-align:left}thead th{background:var(--navy);color:#fff;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}tbody th{color:var(--blue)}tbody tr:hover{background:#f7faff}.blue-section{background:var(--navy);color:#fff}.blue-section .section-heading p{color:#dce7f6}.blue-section .table-wrap{color:var(--ink)}.limit-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:8vw}.limit-grid>div:last-child{border-left:1px solid var(--line);padding-left:40px}.timeline{max-width:900px}.timeline article{display:grid;grid-template-columns:74px 1fr;gap:26px;position:relative;padding-bottom:42px}.timeline article:not(:last-child):before{content:"";position:absolute;left:28px;top:55px;bottom:0;width:2px;background:#b8c5d6}.time-marker span{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:var(--navy);color:#fff;font-weight:900}.timeline small{color:var(--blue);font-weight:900;text-transform:uppercase;letter-spacing:.09em}.timeline h3{font-size:1.8rem;margin:4px 0 10px}.timeline p{color:var(--muted)}.law-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;counter-reset:law;list-style:none;padding:0}.law-grid li{counter-increment:law;background:#f4f7fb;padding:22px 24px;border-left:4px solid var(--blue);font-weight:800}.law-grid li:before{content:counter(law,decimal-leading-zero);color:var(--blue);margin-right:14px}.contribute-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.contribute-grid>a,.contribute-grid>button{background:#fff;border:1px solid var(--line);padding:26px;text-align:left;text-decoration:none;color:var(--ink);font:inherit;cursor:pointer;transition:.2s}.contribute-grid>a:hover,.contribute-grid>button:hover{transform:translateY(-4px);box-shadow:var(--shadow)}.contribute-grid span{color:var(--blue);font-weight:900}.reuse-section{background:var(--navy)}.reuse-card{color:#fff;max-width:980px}.reuse-card p{font-size:1.18rem;color:#dce7f6}.contact-band{padding:65px 0;background:#eaf3ff}.contact-band .container{display:flex;justify-content:space-between;align-items:center;gap:30px}.contact-band h2{font-size:clamp(1.7rem,3.6vw,3rem);margin:0}.journal{max-width:900px}.journal article{position:relative;padding:0 0 52px 170px;border-bottom:1px solid var(--line);margin-bottom:50px}.journal time{position:absolute;left:0;top:4px;font-weight:900;color:var(--blue)}.post-tag{display:inline-block;background:#e9f2ff;color:var(--blue);padding:4px 9px;border-radius:999px;font-size:.72rem;text-transform:uppercase;letter-spacing:.09em;font-weight:900}.journal h2{font-size:2rem;margin:12px 0}.email-card{display:block;background:var(--navy);color:#fff;padding:50px;border-radius:var(--radius);text-decoration:none;margin-bottom:28px}.email-card span,.email-card strong,.email-card b{display:block}.email-card strong{font-size:clamp(1.5rem,4vw,3.2rem);margin:10px 0}.email-card b{color:#b8d8ff}.contact-topics{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.contact-topics a{border:1px solid var(--line);padding:28px;text-decoration:none}.contact-topics span{font-weight:900;color:var(--blue)}.contact-topics h2{font-size:1.5rem;margin:24px 0 8px}.legal-copy .container{max-width:850px}.legal-copy h2{font-size:1.7rem;margin-top:45px}.not-found{min-height:65vh;display:flex;align-items:center;background:var(--navy);color:#fff;padding:100px 0}.site-footer{background:#04142e;color:#fff;padding:72px 0 24px}.footer-grid{width:var(--container);margin:auto;display:grid;grid-template-columns:2fr 1fr 1.5fr;gap:55px}.footer-grid>div:first-child{display:grid;grid-template-columns:84px 1fr;gap:18px;align-items:start}.footer-grid img{background:#fff;border-radius:9px}.footer-grid p{color:#c9d5e5}.footer-grid h2{font-size:.8rem;text-transform:uppercase;letter-spacing:.12em;color:#8fbce9}.footer-grid a,.footer-link{display:block;color:#fff;text-decoration:none;margin:.55rem 0;background:none;border:0;padding:0;font:inherit;cursor:pointer;text-align:left}.footer-grid a:hover,.footer-link:hover{text-decoration:underline}.footer-bottom{width:var(--container);margin:55px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,.15);display:flex;flex-wrap:wrap;gap:18px;justify-content:space-between;color:#9babc0;font-size:.75rem}.share-dialog{width:min(720px,calc(100% - 28px));border:0;border-radius:18px;padding:30px;box-shadow:0 30px 100px rgba(0,0,0,.4)}.share-dialog::backdrop{background:rgba(1,12,30,.75);backdrop-filter:blur(5px)}.share-head{display:flex;justify-content:space-between;align-items:flex-start}.share-head h2{font-size:2.2rem}.icon-button{border:0;background:#eef2f7;width:42px;height:42px;border-radius:50%;font-size:1.8rem;cursor:pointer}.share-copy{background:#f4f7fb;padding:18px;border-left:4px solid var(--blue)}.share-native{width:100%;margin:8px 0 14px}.share-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.share-grid button{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);padding:10px;border-radius:8px;font-weight:800;cursor:pointer}.share-grid span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--navy);color:#fff;font-size:.72rem}.share-tools{display:flex;flex-wrap:wrap;gap:9px;margin-top:16px}.text-button{border:0;background:#e9f2ff;color:var(--blue);padding:9px 12px;border-radius:6px;font:inherit;font-weight:800;text-decoration:none;cursor:pointer}.share-status{min-height:24px;color:#176b2c;font-weight:800}.fine-print{font-size:.78rem;color:var(--muted);margin-bottom:0}
.header-inner{width:min(1460px,calc(100% - 30px));gap:20px}.brand-copy{max-width:330px}.brand-copy strong{font-size:.9rem;line-height:1.18}.brand-copy small{font-size:.69rem}.main-nav{gap:1px}.main-nav a{font-size:.7rem;padding:.62rem .46rem}.hero-shade{background:linear-gradient(90deg,rgba(3,20,48,.96) 0%,rgba(3,20,48,.78) 46%,rgba(3,20,48,.12) 78%,rgba(3,20,48,.05))}.hero-copy h1{max-width:1040px;font-size:clamp(2.8rem,6.2vw,5.8rem)}.hero-copy p{max-width:720px}.founder-section{background:#eef4fb}.founder-profile{background:#fff}.founder-card{display:grid;grid-template-columns:230px 1fr;gap:7vw;align-items:center}.founder-mark{align-self:stretch;min-height:250px;padding:30px;background:linear-gradient(145deg,var(--navy),#0b3d76);color:#fff;border-radius:var(--radius);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:var(--shadow)}.founder-mark img{background:#fff;border-radius:14px;margin-bottom:20px}.founder-mark span{font-size:1.25rem;font-weight:900}.founder-mark small{color:#cfe2f6;margin-top:6px}.letter-context{background:#fff0d7;border-block:1px solid #f0c36c}.letter-context .container{padding-block:26px;display:grid;grid-template-columns:240px 1fr;gap:18px 32px}.letter-context strong{color:#783b00}.letter-context p{margin:0}.letter-context p:last-child{grid-column:2}.letter-toc{background:var(--cream);padding-bottom:65px}.letter-section{background:#e9edf2;padding-top:70px}.letter-body{max-width:920px;margin:auto;background:#fff;padding:clamp(30px,7vw,80px);box-shadow:0 20px 60px rgba(7,28,63,.12);border-top:8px solid var(--blue)}.letter-logo{text-align:center;margin-bottom:22px}.letter-logo img{border-radius:14px}.letter-body>p:nth-of-type(-n+3){text-align:center}.letter-body>p:first-of-type{font-size:1.45rem;margin-bottom:8px}.letter-body>p:nth-of-type(2){color:var(--blue);font-size:1.08rem}.letter-body h2{font-size:clamp(2rem,4vw,3.2rem);margin:70px 0 24px;padding-top:18px;border-top:1px solid var(--line);scroll-margin-top:125px}.letter-body h3{font-size:1.55rem;margin:42px 0 18px;color:var(--blue);scroll-margin-top:125px}.letter-body p{font-size:1.06rem}.letter-body blockquote{margin:32px 0;padding:22px 26px;background:#eef4fb;border-left:5px solid var(--blue)}.letter-body blockquote p:last-child{margin-bottom:0}.notation-note{margin-top:18px;padding:14px 16px;background:#fff;border-left:4px solid var(--blue);font-size:.92rem!important}.contact-band h2{overflow-wrap:anywhere}.metric-grid span{display:block;color:var(--muted);font-size:.85rem;line-height:1.4;margin-top:6px}
@media(max-width:1160px){.brand-copy{display:none}.header-inner{min-height:82px}.brand img{width:62px;height:62px}.main-nav a{font-size:.7rem;padding:.6rem .45rem}.document-grid{grid-template-columns:repeat(2,1fr)}.contribute-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:1100px){.menu-button{display:flex;width:62px;height:48px;flex-direction:column;justify-content:center;align-items:center;gap:5px;margin-left:auto;border:1px solid var(--line);border-radius:7px}.menu-button span{width:22px;height:2px;background:var(--navy)}.menu-button b{font-size:.62rem}.main-nav{display:none;position:absolute;left:0;right:0;top:82px;background:#fff;padding:12px 20px 24px;border-bottom:1px solid var(--line);box-shadow:0 20px 30px rgba(7,28,63,.12)}.main-nav.open{display:grid;grid-template-columns:1fr 1fr}.main-nav a{font-size:.9rem;padding:.75rem}.home-hero{min-height:620px}.hero-shade{background:linear-gradient(90deg,rgba(3,20,48,.94),rgba(3,20,48,.58))}.pillar-grid,.toc-grid{grid-template-columns:1fr}.pillar{min-height:300px}.pillar h3{margin-top:45px}.split,.evidence,.limit-grid{grid-template-columns:1fr;gap:35px}.big-stat{font-size:7rem}.facts-grid,.verified-examples>div,.metric-grid{grid-template-columns:repeat(2,1fr)}.contact-band .container{display:block}.contact-band .button{margin-top:24px}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:1/-1}}
@media(max-width:620px){:root{--container:min(100% - 28px,1180px)}body{font-size:15.8px}.section{padding:70px 0}.page-hero{padding:70px 0}.home-hero{min-height:620px}.hero-copy h1{font-size:3.25rem}.hero-copy p,.page-hero p{font-size:1.08rem}.hero-actions{flex-direction:column}.hero-actions .button{width:100%}.proof-strip .container{display:grid;grid-template-columns:1fr 1fr}.proof-strip span{padding:14px 8px;font-size:.64rem;text-align:center}.proof-strip span+span{border-left:0}.pillar h3{font-size:2.7rem}.document-grid,.facts-grid,.verified-examples>div,.metric-grid,.contribute-grid,.contact-topics,.law-grid{grid-template-columns:1fr}.status-note .container,.certification-warning .container{grid-template-columns:1fr;gap:8px}.block-title>span{font-size:4rem}.block-title h2{font-size:3rem}.programme-card{grid-template-columns:52px 1fr}.programme-card>a{display:none}.document-viewer object{min-height:480px}.limit-grid>div:last-child{border-left:0;border-top:1px solid var(--line);padding:28px 0 0}.journal article{padding-left:0}.journal time{position:static;display:block;margin-bottom:8px}.email-card{padding:28px}.email-card strong{font-size:1.35rem;overflow-wrap:anywhere}.footer-grid{grid-template-columns:1fr}.footer-grid>div:first-child{grid-column:auto}.share-grid{grid-template-columns:1fr 1fr}.share-dialog{padding:20px}.main-nav.open{grid-template-columns:1fr}.table-wrap:after{content:"Faites glisser le tableau horizontalement →";display:block;padding:9px;font-size:.75rem;color:var(--muted)}}
@media(max-width:1280px){.brand-copy{display:flex;max-width:210px}.brand-copy strong{font-size:.82rem}.brand-copy small{font-size:.61rem}.header-inner{min-height:82px}.brand img{width:62px;height:62px}}
@media(max-width:900px){.home-hero{min-height:660px}.split,.evidence,.limit-grid,.founder-card{grid-template-columns:1fr;gap:35px}.founder-mark{min-height:220px}.letter-context .container{grid-template-columns:1fr}.letter-context p:last-child{grid-column:auto}}
@media(max-width:620px){.home-hero{min-height:680px}.hero-copy h1{font-size:2.9rem}.letter-body{padding:28px 22px}.letter-body h2{font-size:2rem}.letter-body h3{font-size:1.35rem}.letter-body p{font-size:1rem}}
@media(max-width:360px){.header-inner{gap:10px}.brand{gap:8px}.brand img{width:50px;height:50px}.brand-copy{max-width:136px}.brand-copy strong{font-size:.65rem}.brand-copy small{display:none}.menu-button{width:52px;height:44px}}
.fiscal-focus{background:linear-gradient(135deg,#eef5fd,#fff);border-block:1px solid var(--line)}
.fiscal-focus-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:7vw;align-items:center}
.fiscal-focus h2{font-size:clamp(2.8rem,5vw,5.2rem);margin:0 0 18px;color:var(--navy)}
.fiscal-focus .lead{font-size:1.3rem;font-weight:800;color:var(--navy)}
.fiscal-focus small{display:block;margin-top:24px;color:var(--muted);font-weight:700}
.fiscal-focus-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.fiscal-focus-stats article{padding:24px;background:#fff;border:1px solid var(--line);border-top:5px solid var(--blue);box-shadow:0 10px 26px rgba(7,28,63,.07)}
.fiscal-focus-stats article:nth-child(2){border-color:var(--red)}
.fiscal-focus-stats article:nth-child(3){grid-column:1/-1;border-color:var(--gold)}
.fiscal-focus-stats b,.fiscal-focus-stats span{display:block}
.fiscal-focus-stats b{font-size:2rem;color:var(--navy)}
.fiscal-focus-stats span{margin-top:6px;color:var(--muted)}
.fiscal-focus-stats>a{grid-column:1/-1;color:var(--blue);font-weight:900;text-underline-offset:4px}
@media(max-width:900px){.fiscal-focus-grid{grid-template-columns:1fr;gap:38px}}
@media(max-width:620px){.fiscal-focus-stats{grid-template-columns:1fr}.fiscal-focus-stats article:nth-child(3),.fiscal-focus-stats>a{grid-column:auto}}

/* Accueil — la vision avant le catalogue de mesures */
.hero-copy h1{max-width:940px;font-size:clamp(3rem,6.4vw,6.2rem)}
.hero-copy h1 span{display:block}
.hero-copy h1 span:nth-child(2){color:#c8e0ff}
.hero-copy h1 span:nth-child(3){color:#fff}
.hero-copy p{max-width:820px;font-size:1.25rem;line-height:1.55}
.proof-strip .container{display:grid;grid-template-columns:repeat(3,1fr);max-width:1180px}
.proof-strip span{text-align:center;padding:20px 26px;font-size:.8rem}
.conviction-section{background:#fff}
.conviction-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:8vw;align-items:start}
.conviction-grid h2{font-size:clamp(2.5rem,4.6vw,4.6rem);margin:0}
.conviction-grid .manifesto{font-size:1.45rem;line-height:1.5;font-weight:700;color:var(--navy)}
.strategy-section{position:relative;overflow:hidden;background:linear-gradient(145deg,#05152f 0%,#0a326a 100%);color:#fff}
.strategy-section:before{content:"";position:absolute;width:520px;height:520px;border:1px solid rgba(255,255,255,.08);border-radius:50%;right:-260px;top:-220px}
.strategy-heading{position:relative;max-width:900px}
.strategy-heading p{color:#c9d9eb}
.strategy-grid{position:relative;display:grid;gap:20px}
.strategy-card{display:grid;grid-template-columns:92px 1fr;gap:28px;padding:38px 42px;background:rgba(255,255,255,.98);color:var(--ink);border-radius:14px;box-shadow:0 22px 55px rgba(0,0,0,.2)}
.strategy-card.strategy-produce{border-left:7px solid var(--blue)}
.strategy-card.strategy-simplify{border-left:7px solid var(--red)}
.strategy-card.strategy-protect{border-left:7px solid var(--green)}
.strategy-number{font-size:3.2rem;line-height:1;font-weight:900;color:#c6ced9;letter-spacing:-.08em}
.strategy-verb{display:block;text-transform:uppercase;letter-spacing:.16em;font-size:.74rem;font-weight:900;color:var(--blue);margin-bottom:8px}
.strategy-simplify .strategy-verb{color:#c42f39}
.strategy-protect .strategy-verb{color:#397a28}
.strategy-card h3{font-size:clamp(1.75rem,3vw,2.7rem);max-width:930px;margin-bottom:18px}
.strategy-card p{max-width:980px;font-size:1.05rem}
.strategy-result{padding:16px 18px;background:#f1f5f9;border-radius:8px}
.evidence-tags{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:20px 0}
.evidence-tags li{padding:8px 11px;border:1px solid #ccd7e4;border-radius:999px;font-size:.82rem;font-weight:800;background:#fff}
.strategy-card>a{display:inline-block;color:var(--blue);font-weight:900;text-underline-offset:4px}
.virtuous-section{background:#eef4fb}
.virtuous-flow{display:grid;grid-template-columns:1fr 34px 1fr 34px 1fr;align-items:stretch;gap:12px}
.virtuous-flow>div{background:#fff;padding:28px;border-top:5px solid var(--blue);box-shadow:0 12px 28px rgba(7,28,63,.07)}
.virtuous-flow>div:nth-of-type(2){border-color:var(--red)}
.virtuous-flow>div:nth-of-type(3){border-color:var(--green)}
.virtuous-flow span{display:block;color:var(--blue);font-size:.75rem;font-weight:900;letter-spacing:.14em;margin-bottom:28px}
.virtuous-flow b{display:block;font-size:1.35rem;line-height:1.2}
.virtuous-flow p{margin:12px 0 0;color:var(--muted)}
.virtuous-flow i{display:grid;place-items:center;color:var(--navy);font-size:1.8rem;font-style:normal;font-weight:900}
.virtuous-conclusion{max-width:900px;margin:35px auto 0;text-align:center;font-size:1.2rem;font-weight:700;color:var(--navy)}
.service-state-section{background:linear-gradient(135deg,#071c3f,#0b2d60);color:#fff}
.state-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:36px 7vw;align-items:start}
.state-intro p{font-size:1.15rem;color:#cbd9ea}
.state-shift{display:grid;gap:12px}
.state-shift>div{padding:24px 26px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:10px}
.state-shift>div:last-child{background:#fff;color:var(--ink)}
.state-shift small{display:block;text-transform:uppercase;letter-spacing:.12em;font-weight:900;color:#9fc8f1;margin-bottom:8px}
.state-shift>div:last-child small{color:var(--blue)}
.state-shift p{margin:0}
.redeployment{grid-column:1/-1;display:grid;grid-template-columns:minmax(280px,.65fr) 1.35fr;gap:24px;align-items:center;padding:26px 30px;background:#fff;color:var(--ink);border-left:6px solid var(--red)}
.redeployment b{font-size:1.5rem;line-height:1.2}
.redeployment span{color:var(--muted)}
.contract-section{background:#fff}
.contract-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.contract-grid article{padding:28px 30px;background:#f5f8fc;border-bottom:4px solid var(--blue)}
.contract-grid article:nth-child(2){border-color:var(--red)}
.contract-grid article:nth-child(3){border-color:var(--green)}
.contract-grid article:nth-child(4){border-color:var(--gold)}
.contract-grid article>span{display:block;color:var(--blue);font-size:.72rem;font-weight:900;letter-spacing:.14em;margin-bottom:22px}
.contract-grid h3{font-size:1.55rem;margin-bottom:12px}
.contract-grid p{margin:0;color:var(--muted)}
.budget-status{margin-top:18px;padding:18px 22px;background:#fff0d7;border-left:5px solid #a84c00;color:#5f3300}
.programme-lens{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.programme-lens article{padding:30px;background:#f5f8fc;border-top:5px solid var(--blue)}
.programme-lens article:nth-child(2){border-color:var(--red)}
.programme-lens article:nth-child(3){border-color:var(--green)}
.programme-lens span{display:block;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;font-weight:900;color:var(--blue);margin-bottom:22px}
.programme-lens h2{font-size:1.75rem;margin-bottom:14px}
.programme-lens p{margin:0;color:var(--muted)}
.programme-meta{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px;margin-top:28px;color:var(--muted)}
.programme-meta b{color:var(--navy)}
/* Lettre de présentation — récit intégré à la page */
.brand-copy{max-width:none;min-width:285px}
.brand-copy strong{font-size:.91rem;line-height:1.28;letter-spacing:-.01em}
.brand-copy strong>span{display:block;white-space:nowrap}
.home-title .keep-together{white-space:nowrap}
.home-title .keep-together{font-size:clamp(2.2rem,5.2vw,4.9rem);letter-spacing:-.05em}
.support-share{max-width:1040px;margin-top:30px;padding-top:24px;border-top:1px solid rgba(255,255,255,.28)}
.support-label{display:block;margin-bottom:12px;color:#fff;font-size:.79rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
.support-buttons{display:flex;flex-wrap:wrap;gap:9px}
.support-buttons button{display:grid;grid-template-columns:30px auto;grid-template-rows:auto auto;column-gap:9px;align-items:center;min-width:142px;padding:9px 13px;border:1px solid rgba(255,255,255,.5);border-radius:9px;background:rgba(3,20,48,.66);color:#fff;font:inherit;text-align:left;cursor:pointer;transition:.2s ease}
.support-buttons button:hover{transform:translateY(-2px);background:#fff;color:var(--navy)}
.support-buttons .social-icon{grid-row:1/3;width:27px;height:27px}
.support-buttons button span{font-size:.88rem;font-weight:900;line-height:1.1}
.support-buttons button small{font-size:.66rem;line-height:1.1;opacity:.78}
.support-status{min-height:22px;margin:10px 0 0;color:#d9ecff;font-size:.8rem;font-weight:800}
.share-grid .social-icon{width:28px;height:28px;color:var(--navy)}
.share-grid button{min-height:48px}
.share-grid button[data-share="facebook"] .social-icon,.share-grid button[data-share="bluesky"] .social-icon,.support-buttons button[data-support-share="facebook"] .social-icon,.support-buttons button[data-support-share="bluesky"] .social-icon{fill:currentColor;stroke:none}
.letter-hero{position:relative;overflow:hidden;padding:clamp(88px,10vw,150px) 0;background:radial-gradient(circle at 85% 8%,rgba(31,115,203,.42),transparent 34%),linear-gradient(135deg,#03132e 0%,#082c60 72%,#0a4f89 100%);color:#fff}
.letter-hero:before{content:"";position:absolute;right:-180px;bottom:-300px;width:720px;height:720px;border:1px solid rgba(255,255,255,.12);border-radius:50%}
.letter-hero .container{position:relative}
.letter-hero h1{max-width:1000px;font-size:clamp(1.7rem,2.5vw,2.65rem);line-height:1.26;margin:0}
.letter-hero h1 em{font-style:italic}
.letter-hero-meta{max-width:820px;margin:32px 0 0;color:#d6e5f6;font-size:1.06rem}
.letter-hero .button-light{box-shadow:0 16px 35px rgba(0,0,0,.18)}
.letter-index{background:var(--cream);padding-block:85px}
.letter-index .section-heading{margin-bottom:30px}
.letter-index-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0 34px}
.letter-index-grid a{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:start;padding:18px 0;border-top:1px solid #cfc9bd;text-decoration:none;font-weight:800;line-height:1.35}
.letter-index-grid a:hover{color:var(--blue)}
.letter-index-grid a span{font-size:.76rem;letter-spacing:.12em;color:var(--blue);padding-top:3px}
.letter-chapter{--chapter-accent:var(--blue);--chapter-wash:#f3f7fc;padding:clamp(78px,9vw,125px) 0;background:var(--chapter-wash);border-top:1px solid rgba(7,28,63,.1);scroll-margin-top:82px}
.letter-chapter.tone-cyan{--chapter-accent:#087e91;--chapter-wash:#f0f8f9}
.letter-chapter.tone-gold{--chapter-accent:#a56200;--chapter-wash:#fbf7ec}
.letter-chapter.tone-red{--chapter-accent:#c22b36;--chapter-wash:#fff5f4}
.letter-chapter.tone-tricolor{--chapter-accent:#0b61c9;--chapter-wash:#f8f7f4}
.letter-chapter.tone-green{--chapter-accent:#4f812a;--chapter-wash:#f4f8ef}
.letter-chapter-head{display:grid;grid-template-columns:110px minmax(0,1fr);gap:28px;align-items:center;margin-bottom:54px}
.letter-chapter.has-visual .letter-chapter-head{grid-template-columns:110px minmax(0,1fr) minmax(280px,390px)}
.letter-chapter-number{align-self:start;color:var(--chapter-accent);font-size:clamp(4.8rem,8vw,8.2rem);font-weight:900;line-height:.8;letter-spacing:-.09em;opacity:.16}
.letter-chapter-title>span{display:block;margin-bottom:13px;color:var(--chapter-accent);font-size:.73rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
.letter-chapter-title h2{max-width:690px;margin:0;font-size:clamp(2.35rem,4.5vw,4.5rem);scroll-margin-top:112px}
.letter-chapter-photo{margin:0}
.letter-chapter-photo img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;box-shadow:0 20px 44px rgba(7,28,63,.16)}
.letter-chapter-photo figcaption{margin-top:8px;color:var(--muted);font-size:.68rem;line-height:1.35}
.letter-chapter-photo figcaption a{text-underline-offset:2px}
.letter-chapter-content{max-width:940px;margin-left:138px}
.letter-paragraph{margin:0 0 2em;padding:0;border:0;font-size:1.08rem;line-height:1.76}
.letter-paragraph strong{color:var(--navy)}
.letter-subheading{display:block;margin:74px 0 24px;color:var(--chapter-accent);font-size:clamp(1.75rem,3.3vw,2.8rem);scroll-margin-top:112px}
.letter-actions{margin:2.2em 0;padding:0;border:0;background:transparent}
.letter-signature{display:flex;flex-direction:column;align-items:flex-end;margin:52px 0 14px;padding-top:0;border:0}
.letter-signature strong{font-size:1.55rem;color:var(--navy)}
.letter-signature span{color:var(--muted)}
.back-to-index{display:block;width:max-content;margin:48px 0 0 auto;color:var(--chapter-accent);font-size:.78rem;font-weight:900;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}
.back-to-index:hover{text-decoration:underline;text-underline-offset:4px}
@media(max-width:900px){.conviction-grid,.state-grid{grid-template-columns:1fr;gap:32px}.strategy-card{grid-template-columns:64px 1fr;padding:30px}.virtuous-flow{grid-template-columns:1fr}.virtuous-flow i{transform:rotate(90deg);min-height:24px}.redeployment{grid-template-columns:1fr}.programme-lens{grid-template-columns:1fr}}
@media(max-width:980px){.letter-index-grid{grid-template-columns:repeat(2,1fr)}.letter-chapter-head,.letter-chapter.has-visual .letter-chapter-head{grid-template-columns:82px minmax(0,1fr)}.letter-chapter-photo{grid-column:2}.letter-chapter-photo img{aspect-ratio:16/8}.letter-chapter-content{margin-left:110px}}
@media(max-width:620px){.hero-copy h1{font-size:clamp(2.55rem,13vw,3.4rem)}.hero-copy p{font-size:1.05rem}.proof-strip .container{grid-template-columns:1fr}.proof-strip span+span{border-left:0;border-top:1px solid rgba(255,255,255,.16)}.conviction-grid .manifesto{font-size:1.2rem}.strategy-card{grid-template-columns:1fr;padding:26px 22px}.strategy-number{font-size:2.25rem}.evidence-tags{display:grid}.evidence-tags li{border-radius:7px}.contract-grid{grid-template-columns:1fr}.programme-meta{display:grid;gap:8px;text-align:center}}
@media(max-width:620px){.home-title .keep-together{font-size:clamp(1.45rem,7.3vw,2.25rem)}.letter-hero{padding:74px 0 82px}.letter-hero h1{font-size:clamp(1.55rem,6.6vw,2.15rem);line-height:1.28}.letter-hero-meta{font-size:.94rem}.letter-index{padding-block:64px}.letter-index-grid{grid-template-columns:1fr}.letter-chapter{padding:72px 0}.letter-chapter-head,.letter-chapter.has-visual .letter-chapter-head{grid-template-columns:1fr;gap:18px;margin-bottom:38px}.letter-chapter-number{font-size:4.7rem}.letter-chapter-photo{grid-column:auto}.letter-chapter-photo img{aspect-ratio:4/3}.letter-chapter-content{margin-left:0}.letter-paragraph{margin-bottom:2em;font-size:1rem;line-height:1.72}.letter-subheading{margin-top:58px}.letter-actions{padding:0}.letter-signature{align-items:flex-start}.back-to-index{margin-top:36px}.support-share{margin-top:24px}.support-buttons{display:grid;grid-template-columns:1fr 1fr}.support-buttons button{min-width:0}.support-status{font-size:.74rem}.share-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.share-grid button{min-width:0}}
@media(max-width:1240px){.menu-button{display:flex;width:62px;height:48px;flex-direction:column;justify-content:center;align-items:center;gap:5px;margin-left:auto;border:1px solid var(--line);border-radius:7px}.menu-button span{width:22px;height:2px;background:var(--navy)}.menu-button b{font-size:.62rem}.main-nav{display:none;position:absolute;left:0;right:0;top:82px;background:#fff;padding:12px 20px 24px;border-bottom:1px solid var(--line);box-shadow:0 20px 30px rgba(7,28,63,.12)}.main-nav.open{display:grid;grid-template-columns:1fr 1fr}.main-nav a{font-size:.9rem;padding:.75rem}.brand-copy{display:flex;min-width:250px;max-width:none}.brand-copy strong{font-size:.79rem}}
@media(max-width:520px){.brand-copy{min-width:0;max-width:205px}.brand-copy strong{font-size:.64rem}.header-inner{gap:12px}.brand{gap:9px}.brand img{width:54px;height:54px}.menu-button{width:54px;height:44px}}
@media(max-width:360px){.brand-copy{max-width:175px}.brand-copy strong{font-size:.54rem}.brand-copy strong>span:last-child{font-size:.63rem}}
@media(max-width:350px){.share-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition:none!important}}
`;

const js = `
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
const dialog=document.getElementById('share-dialog');
const shareText='Je soutiens la Démarche France 2035, une initiative citoyenne indépendante qui propose une vision forte de long terme, un programme complet et chiffré, des financements identifiés, des simulations d’impact et un calendrier d’exécution.';
const previewHost=document.documentElement.dataset.offlinePreview==='true'||location.hostname==='localhost'||location.hostname==='127.0.0.1'||location.hostname.endsWith('.oaiusercontent.com')||location.hostname==='chatgpt.com';
const shareUrl=!previewHost&&location.protocol==='https:'?new URL('/',location.href).href:'${canonicalRoot}/';
const status=dialog?.querySelector('[data-share-status]');
const supportStatus=document.querySelector('[data-support-status]');
let trigger=null;
function setStatus(message){if(status)status.textContent=message;if(supportStatus)supportStatus.textContent=message}
function openShare(event){trigger=event.currentTarget;dialog?.showModal();setStatus('')}
function closeShare(){dialog?.close();trigger?.focus()}
document.querySelectorAll('[data-open-share]').forEach(button=>button.addEventListener('click',openShare));
dialog?.querySelector('[data-close-share]')?.addEventListener('click',closeShare);
dialog?.addEventListener('click',event=>{if(event.target===dialog)closeShare()});
async function copy(value,message){try{await navigator.clipboard.writeText(value);setStatus(message);return true}catch{const area=document.createElement('textarea');area.value=value;document.body.append(area);area.select();document.execCommand('copy');area.remove();setStatus(message);return true}}
async function shareNative(){if(navigator.share){try{await navigator.share({title:'Démarche France 2035',text:shareText,url:shareUrl});setStatus('Merci pour votre partage.')}catch(error){if(error.name!=='AbortError')setStatus('Le partage n’a pas pu être ouvert.')}}else{await copy(shareText+' '+shareUrl,'Message et lien copiés.')}}
async function shareOn(network,button){
  if(network==='more'){trigger=button;dialog?.showModal();setStatus('');return}
  if(network==='instagram'){
    if(navigator.share){await shareNative();return}
    await copy(shareText+' '+shareUrl,'Instagram : message et lien copiés. Téléchargez aussi le visuel proposé.');
    if(dialog&&!dialog.open){trigger=button;dialog.showModal()}
    return
  }
  let url='';
  if(network==='facebook'){void copy(shareText,'Message copié — collez-le dans votre publication Facebook.');url='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(shareUrl)}
  if(network==='linkedin'){void copy(shareText,'Message copié — collez-le dans votre publication LinkedIn.');url='https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(shareUrl)}
  if(network==='x')url='https://x.com/intent/tweet?text='+encodeURIComponent(shareText)+'&url='+encodeURIComponent(shareUrl);
  if(network==='whatsapp')url='https://wa.me/?text='+encodeURIComponent(shareText+' '+shareUrl);
  if(network==='bluesky')url='https://bsky.app/intent/compose?text='+encodeURIComponent(shareText+' '+shareUrl);
  if(network==='email')url='mailto:?subject='+encodeURIComponent('Je soutiens la Démarche France 2035')+'&body='+encodeURIComponent(shareText+'\\n\\n'+shareUrl);
  if(url)window.open(url,'_blank','noopener,noreferrer')
}
dialog?.querySelector('[data-copy-message]')?.addEventListener('click',()=>copy(shareText,'Message copié.'));
dialog?.querySelector('[data-copy-link]')?.addEventListener('click',()=>copy(shareUrl,'Lien copié.'));
dialog?.querySelector('[data-share-native]')?.addEventListener('click',shareNative);
dialog?.querySelectorAll('[data-share]').forEach(button=>button.addEventListener('click',()=>shareOn(button.dataset.share,button)));
document.querySelectorAll('[data-support-share]').forEach(button=>button.addEventListener('click',()=>shareOn(button.dataset.supportShare,button)));
`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#fff"/><g transform="translate(32 32)"><path d="M0-25c10 0 17 5 20 13-8-5-15-4-21 2-5-5-5-10 1-15Z" fill="#0868c7"/><path d="M22-10c5 9 4 17-2 23 1-9-3-15-11-17 2-7 6-9 13-6Z" fill="#15aab8"/><path d="M18 15c-5 8-13 12-21 10 8-4 11-10 9-18 7-1 11 2 12 8Z" fill="#79b82a"/><path d="M-5 25c-10 0-17-5-20-13 8 5 15 4 21-2 5 5 5 10-1 15Z" fill="#f58220"/><path d="M-23 8c-4-9-2-17 5-22-2 9 2 15 10 18-3 6-8 8-15 4Z" fill="#e3273f"/></g></svg>`;

const manifest = JSON.stringify({name:'Démarche France 2035',short_name:'France 2035',start_url:'/',display:'standalone',background_color:'#ffffff',theme_color:'#071c3f',icons:[{src:'/assets/logo-france2035.png',sizes:'1252x1252',type:'image/png'}]},null,2);
const sitemapEntries = [
  ['/', '2026-09-15'],
  ['/la-demarche/', '2026-09-15'],
  ['/programme/', '2026-09-15'],
  ['/budget/', '2026-09-15'],
  ['/simulations-impact/', '2026-09-12'],
  ['/calendrier-execution/', '2026-09-15'],
  ['/contribuer/', '2026-09-12'],
  ['/journal/', '2026-09-15'],
  ['/contact/', '2026-09-12'],
  ['/mentions-legales/', '2026-09-12'],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries.map(([p,lastmod])=>`<url><loc>${canonicalRoot}${p}</loc><lastmod>${lastmod}</lastmod></url>`).join('')}</urlset>`;

const files = {
  'index.html': home,
  'la-demarche/index.html': demarchePage,
  'programme/index.html': programmePage,
  'budget/index.html': budgetPage,
  'simulations-impact/index.html': simulationsPage,
  'calendrier-execution/index.html': calendarPage,
  'contribuer/index.html': contributePage,
  'journal/index.html': journalPage,
  'contact/index.html': contactPage,
  'mentions-legales/index.html': legalPage,
  '404.html': notFound,
  'assets/site.css': css,
  'assets/site.js': js,
  'favicon.svg': favicon,
  'site.webmanifest': manifest,
  'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${canonicalRoot}/sitemap.xml\n`,
  'sitemap.xml': sitemap,
  'indexnow-key.txt': `${indexNowKey}\n`,
};

for (const [relative, data] of Object.entries(files)) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.writeFileSync(target, data, 'utf8');
}

console.log(`Generated ${Object.keys(files).length} files in ${root}`);
