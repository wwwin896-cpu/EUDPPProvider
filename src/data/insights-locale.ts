export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
  code?: string;
};

export type InsightFaq = { question: string; answer: string };

export type InsightArticle = {
  slug: string;
  badge: string;
  date: string;
  readTime: string;
  title: string;
  metaTitle: string;
  description: string;
  headline: string;
  author: string;
  about: string[];
  excerpt: string;
  sections: InsightSection[];
  faqs?: InsightFaq[];
  actionLabel: string;
  backLabel: string;
};

export type InsightLocalePack = {
  hubTitle: string;
  hubMetaTitle: string;
  hubDescription: string;
  hubEyebrow: string;
  hubH1: string;
  hubLead: string;
  readLabel: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  breadcrumbHome: string;
  breadcrumbHub: string;
  relatedDownloads: string;
  simulatorLabel: string;
  articles: InsightArticle[];
};

const GS1_URI = 'https://eudppprovider.com/01/04012345999991/21/BP-2027-EU-88902/';

export const insightsLocale: Record<'de' | 'fr' | 'nl', InsightLocalePack> = {
  de: {
    hubTitle: 'EU-Batteriepass: Compliance-Einblicke & Normen',
    hubMetaTitle: 'EU-Batteriepass Compliance & Normen | Einblicke',
    hubDescription:
      'Fachliche Analysen zu Verordnung (EU) 2023/1542, ESPR (EU 2024/1781), CO2-Fußabdruck-Klassen A-E sowie CEN/CENELEC EN 18220 und EN 18219.',
    hubEyebrow: 'Regulatorische Analyse & technische Normen',
    hubH1: 'Compliance-Einblicke & technische Normen',
    hubLead:
      'Technische Leitfäden, Normenanalysen und regulatorische Updates von europäischen Compliance-Ingenieuren und Software-Architekten.',
    readLabel: 'Vollständige Analyse lesen',
    ctaTitle: 'Individuelle Gap-Analyse für Ihr Produktportfolio?',
    ctaLead:
      'Laden Sie die 71-Punkte-Checkliste nach Anhang XIII herunter oder vereinbaren Sie ein Architektur-Scoping mit unserem Compliance-Team.',
    ctaPrimary: '71-Punkte-Checkliste (.xlsx)',
    ctaSecondary: 'Technisches Scoping anfragen →',
    breadcrumbHome: 'Startseite',
    breadcrumbHub: 'Einblicke',
    relatedDownloads: '71-Punkte-Checkliste herunterladen (.xlsx)',
    simulatorLabel: 'Live-Simulator testen →',
    articles: [
      {
        slug: 'eu-battery-carbon-footprint-classes-a-e',
        badge: 'VO (EU) 2023/1542 · Art. 7',
        date: '2026-11-24',
        readTime: '6 Min.',
        title: 'CO2-Fußabdruck-Klassen A–E: Regeln und Fristen 2026',
        metaTitle: 'CO2-Fußabdruck Batterien A-E: Regeln 2026',
        description:
          'Erklärung der CO2-Fußabdruck-Erklärung nach Verordnung (EU) 2023/1542: ISO 14067 Methodik, Klassen A-E und die Frist vom 18. August 2026.',
        headline: 'CO2-Fußabdruck von Batterien: Klassen A-E, Methodik und Fristen',
        author: 'EU DPP Regulatory Research Team',
        about: ['Verordnung (EU) 2023/1542', 'CO2-Fußabdruck', 'ISO 14067', 'PEFCR'],
        excerpt:
          'Welche Lebenszyklusphasen zählen, wie die Klassen A-E vergeben werden und welche Nachweise ab dem 18. August 2026 für EV-Batterien verpflichtend sind.',
        sections: [
          {
            heading: '1. Drei Stufen der Umsetzung',
            paragraphs: [
              'Die Verordnung (EU) 2023/1542 führt die CO2-Fußabdruck-Erklärung stufenweise ein, damit Lieferketten ihre Datenerhebung systematisch aufbauen können.',
            ],
            table: {
              head: ['Datum', 'Pflicht', 'Geltungsbereich'],
              rows: [
                ['18.08.2026', 'CO2-Fußabdruck-Erklärung (kg CO2e/kWh) inkl. Verifizierung durch Dritte', 'EV-Batterien, LMT (≤25 kg), Industriebatterien (>2 kWh)'],
                ['18.02.2027', 'Batteriepass per QR-Code nach Anhang XIII', 'Alle EV-, LMT- und Industriebatterien'],
                ['18.02.2028', 'Höchstwerte für den CO2-Fußabdruck (Marktzutrittsverbot bei Überschreitung)', 'EU-weit'],
              ],
            },
          },
          {
            heading: '2. Vier verpflichtende Lebenszyklusphasen',
            bullets: [
              'Rohstoffgewinnung und Vorverarbeitung: Abbau, Raffinerie, Vorprodukte für Nickel, Kobalt, Lithium, Grafit.',
              'Hauptfertigung: Zellproduktion, Formation, Modul- und Packmontage.',
              'Distribution und Transport: See-, Luft- und Landlogistik bis zum Montagewerk in der EU.',
              'End of Life: Recyclinggutschriften nach den Regeln der Kreislaufwirtschaft.',
            ],
          },
          {
            heading: '3. Wie wir die Erklärung automatisieren',
            paragraphs: [
              'Unsere Plattform übernimmt die Berechnungslogik direkt aus ERP- und MES-Daten, erzeugt verifizierbare JSON-LD-Datensätze, eIDAS-2.0-Signaturen und den GS1-konformen QR-Einstieg in den Batteriepass.',
            ],
          },
        ],
        actionLabel: 'Zurück zu allen Einblicken',
        backLabel: 'Zurück zu allen Einblicken',
      },
      {
        slug: 'en-18220-en-18219-gs1-digital-link-standards',
        badge: 'CEN/CENELEC JTC24 · EN 18220 / EN 18219',
        date: '2026-11-20',
        readTime: '7 Min.',
        title: 'EN 18220 & EN 18219: GS1 Digital Link Syntax',
        metaTitle: 'EN 18220 & EN 18219: GS1-Syntax erklärt',
        description:
          'Technischer Leitfaden zu den harmonisierten Normen: EN 18220 Syntax für 2D-Datenträger, EN 18219 UPI-Vergabe und eIDAS-2.0-QSeal-Prüfung.',
        headline: 'CEN/CENELEC EN 18220 und EN 18219: GS1-Syntax und UPI-Architektur',
        author: 'Chief Systems Architect',
        about: ['EN 18220', 'EN 18219', 'GS1 Digital Link', 'eIDAS 2.0'],
        excerpt:
          'Wie der 2D-Code auf dem Batteriegehäuse aufgebaut sein muss, welche Resolver-Rollen die Norm fordert und wie die UPI im DG-GROW-Register registriert wird.',
        sections: [
          {
            heading: '1. Standardisierte GS1-Digital-Link-Syntax',
            paragraphs: [
              'Jeder Batteriepack trägt einen dauerhaft angebrachten 2D-Code, der auf einen konformen Endpunkt nach folgendem Muster verweist:',
            ],
            code: GS1_URI,
          },
          {
            heading: '2. Drei Rollen im Resolver',
            bullets: [
              'Öffentliche Ansicht: technische Kennwerte, CO2-Klasse, Garantie und Sicherheitshinweise.',
              'Zoll und Marktaufsicht: CE-Konformitätserklärung, Prüfberichte notifizierter Stellen, eIDAS-Siegel.',
              'Zertifizierte Recycler: Demontageanleitung, Rückgewinnung kritischer Rohstoffe, Gefahrstoffpositionen.',
            ],
          },
          {
            heading: '3. Registrierung und Signatur',
            paragraphs: [
              'Die UPI-Vergabe nach EN 18219 erfolgt vor der Serienfreigabe. Jeder Datensatz wird mit einem qualifizierten elektronischen Siegel (QSeal) versehen, damit Änderungen nachvollziehbar bleiben.',
            ],
          },
        ],
        actionLabel: 'Live-Resolver ansehen →',
        backLabel: 'Zurück zu allen Einblicken',
      },
      {
        slug: 'sovereign-data-vault-zkp-privacy-guide',
        badge: 'ESPR · Zero-Knowledge-Proofs',
        date: '2026-11-18',
        readTime: '5 Min.',
        title: 'Souveräner Datensafe & ZKP für Batteriepässe',
        metaTitle: 'Datensafe & ZKP für Batteriepässe',
        description:
          'Wie Hersteller die Transparenzpflichten aus ESPR und Verordnung (EU) 2023/1542 erfüllen und dabei Kathodenrezepturen, BOM-Kosten und Lieferanten Konditionen schützen.',
        headline: 'ESPR und Batteriepass: Datensouveränität ohne Preisgabe von Lieferkettengeheimnissen',
        author: 'Security & Cryptography Lab',
        about: ['ESPR (EU) 2024/1781', 'Zero-Knowledge-Proofs', 'DSGVO', 'Geheimnisschutz'],
        excerpt:
          'Zero-Knowledge-Proofs belegen Mindestquoten und Grenzwerte, ohne Rezeptur, Einkaufspreise oder Lieferanten offenzulegen – rechtssicher und prüfbar.',
        sections: [
          {
            heading: '1. Prüfbare Vertraulichkeit',
            paragraphs: [
              'Zero-Knowledge-Verfahren erlauben den Nachweis, dass eine Aussage zutrifft, ohne die zugrunde liegenden Daten zu übertragen. Beispiel: „Dieser Pack enthält mindestens 16 % recyceltes Kobalt und liegt unter dem CO2-Grenzwert.“',
            ],
            bullets: [
              'Klassischer Ansatz: vollständige Stücklisten und Einkaufskonditionen werden hochgeladen – hohes Risiko.',
              'ZKP-Ansatz: Berechnung erfolgt in der kontrollierten Umgebung des Herstellers, in den Pass gelangt nur der kryptografische Nachweis.',
            ],
          },
          {
            heading: '2. Zehn Jahre Nachweispflicht',
            paragraphs: [
              'Die Daten müssen nach dem Inverkehrbringen zehn Jahre verfügbar bleiben. Wir betreiben dafür einen dedizierten, DSGVO-konformen Speicherbereich in Frankfurt am Main mit definierter Verfügbarkeitszusage.',
            ],
          },
        ],
        actionLabel: 'Architektur-Scoping anfragen →',
        backLabel: 'Zurück zu allen Einblicken',
      },
    ],
  },
  fr: {
    hubTitle: 'Passeport batterie UE : analyses & normes',
    hubMetaTitle: 'Conformité passeport batterie UE | Analyses',
    hubDescription:
      'Analyses techniques du règlement (UE) 2023/1542, du règlement ESPR (UE 2024/1781), des classes A-E d’empreinte carbone et des normes CEN/CENELEC EN 18220 / EN 18219.',
    hubEyebrow: 'Veille réglementaire & normes techniques',
    hubH1: 'Analyses de conformité & normes techniques',
    hubLead:
      'Guides techniques, analyses de normes et mises à jour réglementaires rédigés par des ingénieurs conformité et architectes logiciels européens.',
    readLabel: 'Lire l’analyse complète',
    ctaTitle: 'Besoin d’une analyse d’écart sur votre portefeuille ?',
    ctaLead:
      'Téléchargez la liste des 71 exigences de l’annexe XIII ou planifiez une session de cadrage avec notre équipe conformité.',
    ctaPrimary: 'Liste des 71 points (.xlsx)',
    ctaSecondary: 'Demander un cadrage technique →',
    breadcrumbHome: 'Accueil',
    breadcrumbHub: 'Analyses',
    relatedDownloads: 'Télécharger la liste des 71 points (.xlsx)',
    simulatorLabel: 'Tester le simulateur →',
    articles: [
      {
        slug: 'eu-battery-carbon-footprint-classes-a-e',
        badge: 'Règlement (UE) 2023/1542 · Art. 7',
        date: '2026-11-24',
        readTime: '6 min',
        title: 'Empreinte carbone classes A-E : règles 2026',
        metaTitle: 'Empreinte carbone batteries A-E : règles',
        description:
          'Déclaration d’empreinte carbone selon le règlement (UE) 2023/1542 : méthodologie ISO 14067, classes A-E et échéance du 18 août 2026.',
        headline: 'Empreinte carbone des batteries : classes A-E, méthodologie et échéances',
        author: 'EU DPP Regulatory Research Team',
        about: ['Règlement (UE) 2023/1542', 'Empreinte carbone', 'ISO 14067', 'PEFCR'],
        excerpt:
          'Quelles phases du cycle de vie compter, comment les classes A-E sont attribuées et quelles preuves sont exigées dès le 18 août 2026 pour les batteries de véhicules électriques.',
        sections: [
          {
            heading: '1. Trois étapes de mise en œuvre',
            paragraphs: [
              'Le règlement (UE) 2023/1542 introduit la déclaration d’empreinte carbone par étapes afin que les chaînes d’approvisionnement puissent structurer leur collecte de données.',
            ],
            table: {
              head: ['Date', 'Obligation', 'Périmètre'],
              rows: [
                ['18/08/2026', 'Déclaration d’empreinte carbone (kg CO2e/kWh) avec vérification par un tiers', 'Batteries VE, LMT (≤25 kg), industrielles (>2 kWh)'],
                ['18/02/2027', 'Passeport batterie via QR code (annexe XIII)', 'Toutes les batteries VE, LMT et industrielles'],
                ['18/02/2028', 'Seuils maximaux d’empreinte carbone (interdiction de mise sur le marché)', 'Toute l’UE'],
              ],
            },
          },
          {
            heading: '2. Quatre phases obligatoires',
            bullets: [
              'Extraction et pré-traitement des matières premières : mines, raffinage, précurseurs nickel, cobalt, lithium, graphite.',
              'Fabrication principale : production de cellules, formation, assemblage modules et packs.',
              'Distribution et transport : logistique maritime, aérienne et routière jusqu’au site d’assemblage européen.',
              'Fin de vie : crédits de recyclage selon les règles de l’économie circulaire.',
            ],
          },
          {
            heading: '3. Automatisation de la déclaration',
            paragraphs: [
              'Notre plateforme applique la logique de calcul directement aux données ERP et MES, génère des jeux JSON-LD vérifiables, des sceaux eIDAS 2.0 et l’accès QR conforme GS1 au passeport.',
            ],
          },
        ],
        actionLabel: 'Retour aux analyses',
        backLabel: 'Retour aux analyses',
      },
      {
        slug: 'en-18220-en-18219-gs1-digital-link-standards',
        badge: 'CEN/CENELEC JTC24 · EN 18220 / EN 18219',
        date: '2026-11-20',
        readTime: '7 min',
        title: 'EN 18220 & EN 18219 : syntaxe GS1 Digital Link',
        metaTitle: 'EN 18220 & EN 18219 : GS1 Digital Link',
        description:
          'Guide technique des normes harmonisées : syntaxe du support 2D EN 18220, attribution de l’UPI EN 18219 et vérification du sceau eIDAS 2.0.',
        headline: 'CEN/CENELEC EN 18220 et EN 18219 : syntaxe GS1 et architecture UPI',
        author: 'Chief Systems Architect',
        about: ['EN 18220', 'EN 18219', 'GS1 Digital Link', 'eIDAS 2.0'],
        excerpt:
          'Comment structurer le code 2D apposé sur le pack, quels rôles de résolution la norme impose et comment enregistrer l’UPI auprès du registre DG GROW.',
        sections: [
          {
            heading: '1. Syntaxe GS1 Digital Link normalisée',
            paragraphs: [
              'Chaque pack porte un code 2D durable renvoyant vers un point de résolution conforme au format suivant :',
            ],
            code: GS1_URI,
          },
          {
            heading: '2. Trois rôles de résolution',
            bullets: [
              'Vue publique : caractéristiques techniques, classe carbone, garantie et consignes de sécurité.',
              'Douanes et surveillance du marché : déclaration CE de conformité, rapports d’organismes notifiés, sceaux eIDAS.',
              'Recycleurs agréés : instructions de démontage, récupération des matières critiques, localisation des substances dangereuses.',
            ],
          },
          {
            heading: '3. Enregistrement et signature',
            paragraphs: [
              'L’UPI est attribué selon EN 18219 avant le lancement en série. Chaque jeu de données est scellé par un sceau électronique qualifié (QSeal) afin de garantir la traçabilité des modifications.',
            ],
          },
        ],
        actionLabel: 'Voir le résolveur en direct →',
        backLabel: 'Retour aux analyses',
      },
      {
        slug: 'sovereign-data-vault-zkp-privacy-guide',
        badge: 'ESPR · Preuves à divulgation nulle',
        date: '2026-11-18',
        readTime: '5 min',
        title: 'Coffre-fort souverain & ZKP pour passeports',
        metaTitle: 'Coffre-fort & ZKP pour passeports batterie',
        description:
          'Comment les fabricants respectent les obligations de transparence ESPR et (UE) 2023/1542 tout en protégeant les formulations de cathode, les coûts BOM et les conditions fournisseurs.',
        headline: 'ESPR et passeport batterie : souveraineté des données sans divulguer les secrets industriels',
        author: 'Security & Cryptography Lab',
        about: ['ESPR (UE) 2024/1781', 'Preuves à divulgation nulle', 'RGPD', 'Secret des affaires'],
        excerpt:
          'Les preuves à divulgation nulle démontrent le respect des quotas et seuils sans révéler la formulation, les prix d’achat ou l’identité des fournisseurs.',
        sections: [
          {
            heading: '1. Confidentialité vérifiable',
            paragraphs: [
              'Une preuve à divulgation nulle permet d’établir qu’une affirmation est vraie sans transmettre les données sous-jacentes. Exemple : « ce pack contient au moins 16 % de cobalt recyclé et respecte le seuil carbone ».',
            ],
            bullets: [
              'Approche classique : téléversement des nomenclatures et conditions d’achat – risque élevé.',
              'Approche ZKP : le calcul reste dans l’environnement contrôlé du fabricant, seul le justificatif cryptographique est publié.',
            ],
          },
          {
            heading: '2. Dix ans de conservation',
            paragraphs: [
              'Les données doivent rester disponibles dix ans après la mise sur le marché. Nous exploitons à cet effet un espace de stockage dédié conforme au RGPD à Francfort, avec engagement de disponibilité.',
            ],
          },
        ],
        actionLabel: 'Demander un cadrage →',
        backLabel: 'Retour aux analyses',
      },
    ],
  },
  nl: {
    hubTitle: 'EU-batterijpaspoort: inzichten & normen',
    hubMetaTitle: 'EU-batterijpaspoort compliance | Inzichten',
    hubDescription:
      'Technische analyses van Verordening (EU) 2023/1542, ESPR (EU 2024/1781), CO2-voetafdruklassen A-E en CEN/CENELEC EN 18220 / EN 18219.',
    hubEyebrow: 'Regelgeving & technische normen',
    hubH1: 'Compliance-inzichten & technische normen',
    hubLead:
      'Technische handleidingen, normanalyses en regelgevingsupdates van Europese compliance-engineers en software-architecten.',
    readLabel: 'Volledige analyse lezen',
    ctaTitle: 'Een gap-analyse nodig voor uw portfolio?',
    ctaLead:
      'Download de 71-puntenchecklist uit bijlage XIII of plan een architectuursessie met ons compliance-team.',
    ctaPrimary: '71-puntenchecklist (.xlsx)',
    ctaSecondary: 'Technische scoping aanvragen →',
    breadcrumbHome: 'Home',
    breadcrumbHub: 'Inzichten',
    relatedDownloads: 'Download de 71-puntenchecklist (.xlsx)',
    simulatorLabel: 'Simulator bekijken →',
    articles: [
      {
        slug: 'eu-battery-carbon-footprint-classes-a-e',
        badge: 'Verordening (EU) 2023/1542 · Art. 7',
        date: '2026-11-24',
        readTime: '6 min',
        title: 'CO2-voetafdruk klassen A-E: regels 2026',
        metaTitle: 'CO2-voetafdruk batterijen A-E: regels',
        description:
          'CO2-voetafdrukverklaring volgens Verordening (EU) 2023/1542: ISO 14067-methodiek, klassen A-E en de deadline van 18 augustus 2026.',
        headline: 'CO2-voetafdruk van batterijen: klassen A-E, methodiek en deadlines',
        author: 'EU DPP Regulatory Research Team',
        about: ['Verordening (EU) 2023/1542', 'CO2-voetafdruk', 'ISO 14067', 'PEFCR'],
        excerpt:
          'Welke levenscyclusfasen meetellen, hoe klassen A-E worden toegekend en welk bewijs vanaf 18 augustus 2026 verplicht is voor EV-batterijen.',
        sections: [
          {
            heading: '1. Drie implementatiefasen',
            paragraphs: [
              'Verordening (EU) 2023/1542 voert de CO2-voetafdrukverklaring gefaseerd in, zodat toeleveringsketens hun dataverzameling systematisch kunnen opbouwen.',
            ],
            table: {
              head: ['Datum', 'Verplichting', 'Toepassingsgebied'],
              rows: [
                ['18-08-2026', 'CO2-voetafdrukverklaring (kg CO2e/kWh) met verificatie door derden', 'EV-batterijen, LMT (≤25 kg), industriële batterijen (>2 kWh)'],
                ['18-02-2027', 'Batterijpaspoort via QR-code (bijlage XIII)', 'Alle EV-, LMT- en industriële batterijen'],
                ['18-02-2028', 'Maximale CO2-drempels (markttoegangsverbod bij overschrijding)', 'Heel de EU'],
              ],
            },
          },
          {
            heading: '2. Vier verplichte levenscyclusfasen',
            bullets: [
              'Grondstofwinning en voorbewerking: mijnbouw, raffinage, precursoren voor nikkel, kobalt, lithium en grafiet.',
              'Hoofdproductie: celproductie, formatie, module- en packassemblage.',
              'Distributie en transport: zee-, lucht- en weglogistiek naar de Europese assemblagefabriek.',
              'End of life: recyclingkredieten volgens de regels van de circulaire economie.',
            ],
          },
          {
            heading: '3. Automatisering van de verklaring',
            paragraphs: [
              'Ons platform past de rekenlogica rechtstreeks toe op ERP- en MES-data en genereert verifieerbare JSON-LD-datasets, eIDAS 2.0-sigillen en de GS1-conforme QR-toegang tot het paspoort.',
            ],
          },
        ],
        actionLabel: 'Terug naar alle inzichten',
        backLabel: 'Terug naar alle inzichten',
      },
      {
        slug: 'en-18220-en-18219-gs1-digital-link-standards',
        badge: 'CEN/CENELEC JTC24 · EN 18220 / EN 18219',
        date: '2026-11-20',
        readTime: '7 min',
        title: 'EN 18220 & EN 18219: GS1 Digital Link-syntax',
        metaTitle: 'EN 18220 & EN 18219: GS1-syntax uitgelegd',
        description:
          'Technische gids over de geharmoniseerde normen: EN 18220-syntax voor 2D-dragers, EN 18219 UPI-toekenning en eIDAS 2.0 QSeal-verificatie.',
        headline: 'CEN/CENELEC EN 18220 en EN 18219: GS1-syntax en UPI-architectuur',
        author: 'Chief Systems Architect',
        about: ['EN 18220', 'EN 18219', 'GS1 Digital Link', 'eIDAS 2.0'],
        excerpt:
          'Hoe de 2D-code op de behuizing is opgebouwd, welke resolverrollen de norm vereist en hoe de UPI bij het DG GROW-register wordt geregistreerd.',
        sections: [
          {
            heading: '1. Gestandaardiseerde GS1 Digital Link-syntax',
            paragraphs: [
              'Elke batterijpack draagt een permanent aangebrachte 2D-code die verwijst naar een conform eindpunt volgens dit patroon:',
            ],
            code: GS1_URI,
          },
          {
            heading: '2. Drie resolverrollen',
            bullets: [
              'Publieke weergave: technische kenmerken, CO2-klasse, garantie en veiligheidsinstructies.',
              'Douane en markttoezicht: CE-conformiteitsverklaring, rapporten van aangemelde instanties, eIDAS-sigillen.',
              'Erkende recyclers: demontage-instructies, terugwinning van kritieke grondstoffen, locatie van gevaarlijke stoffen.',
            ],
          },
          {
            heading: '3. Registratie en signatuur',
            paragraphs: [
              'De UPI wordt volgens EN 18219 toegekend vóór serieproductie. Elke dataset wordt voorzien van een gekwalificeerd elektronisch sigill (QSeal) zodat wijzigingen traceerbaar blijven.',
            ],
          },
        ],
        actionLabel: 'Live resolver bekijken →',
        backLabel: 'Terug naar alle inzichten',
      },
      {
        slug: 'sovereign-data-vault-zkp-privacy-guide',
        badge: 'ESPR · Zero-knowledge proofs',
        date: '2026-11-18',
        readTime: '5 min',
        title: 'Soevereine datakluis & ZKP voor paspoorten',
        metaTitle: 'Datakluis & ZKP voor batterijpaspoorten',
        description:
          'Hoe fabrikanten voldoen aan ESPR en Verordening (EU) 2023/1542 en tegelijk kathoderecepturen, BOM-kosten en leveranciersvoorwaarden beschermen.',
        headline: 'ESPR en batterijpaspoort: datasoevereiniteit zonder leveranciersgeheimen prijs te geven',
        author: 'Security & Cryptography Lab',
        about: ['ESPR (EU) 2024/1781', 'Zero-knowledge proofs', 'AVG/GDPR', 'Geheimhouding'],
        excerpt:
          'Zero-knowledge proofs tonen quota en drempelwaarden aan zonder receptuur, inkoopprijzen of leveranciers te onthullen.',
        sections: [
          {
            heading: '1. Verifieerbare vertrouwelijkheid',
            paragraphs: [
              'Een zero-knowledge proof toont aan dat een uitspraak klopt zonder de onderliggende data over te dragen. Voorbeeld: „deze pack bevat minstens 16% gerecycleerd kobalt en blijft onder de CO2-drempel“.',
            ],
            bullets: [
              'Klassieke aanpak: volledige stuklijsten en inkoopvoorwaarden uploaden – hoog risico.',
              'ZKP-aanpak: berekening blijft in de gecontroleerde omgeving van de fabrikant, alleen het cryptografische bewijs komt in het paspoort.',
            ],
          },
          {
            heading: '2. Tien jaar bewaarplicht',
            paragraphs: [
              'Gegevens moeten tien jaar na het in de handel brengen beschikbaar blijven. Wij voorzien daarvoor een dedicated, AVG-conforme opslagomgeving in Frankfurt met beschikbaarheidsgarantie.',
            ],
          },
        ],
         actionLabel: 'Architectuurscoping aanvragen →',
         backLabel: 'Terug naar alle inzichten',
       },
     ],
   },
};

/**
 * Locale-specific FAQ pairs used to emit FAQPage structured data on the
 * translated insight articles. Kept separate from the article bodies so the
 * schema payload can be reviewed and corrected independently of the prose.
 */
export const insightsFaqs: Record<'de' | 'fr' | 'nl', Record<string, InsightFaq[]>> = {
  de: {
    'eu-battery-carbon-footprint-classes-a-e': [
      {
        question: 'Ab wann ist die CO2-Fußabdruck-Erklärung für Batterien verpflichtend?',
        answer:
          'Die Erklärung inklusive Verifizierung durch eine unabhängige Stelle gilt ab dem 18. August 2026 für EV-Batterien, LMT-Batterien bis 25 kg und Industriebatterien über 2 kWh.',
      },
      {
        question: 'Welche Lebenszyklusphasen muss die Berechnung abdecken?',
        answer:
          'Vier Phasen nach ISO 14067 und PEFCR: Rohstoffgewinnung und Vorverarbeitung, Hauptfertigung, Distribution und Transport sowie End of Life inklusive Recyclinggutschriften.',
      },
    ],
    'en-18220-en-18219-gs1-digital-link-standards': [
      {
        question: 'Welche Syntax schreibt EN 18220 für den Batteriepass vor?',
        answer:
          'GS1 Digital Link im Format /01/{GTIN}/21/{Seriennummer}, übertragen über einen zweidimensionalen Datenträger auf dem Batteriegehäuse.',
      },
      {
        question: 'Was regelt EN 18219?',
        answer:
          'EN 18219 definiert Vergabe und Interoperabilität des Unique Product Identifier (UPI) sowie die Anbindung an das zentrale DPP-Register der EU.',
      },
    ],
    'sovereign-data-vault-zkp-privacy-guide': [
      {
        question: 'Wie schützt Zero-Knowledge-Proof die Rezeptur vor Offenlegung?',
        answer:
          'Die Berechnung erfolgt im eigenen Datenraum. In das Register geht nur ein kryptografischer Nachweis, dass Grenzwerte erfüllt sind — nicht die Kathodenrezeptur, Lieferantenpreise oder Stücklisten.',
      },
      {
        question: 'Wie lange müssen Batteriepass-Daten verfügbar bleiben?',
        answer:
          'Gemäß Artikel 77 der Verordnung (EU) 2023/1542 zehn Jahre nach dem Inverkehrbringen der Batterie.',
      },
    ],
  },
  fr: {
    'eu-battery-carbon-footprint-classes-a-e': [
      {
        question: "À partir de quand la déclaration d'empreinte carbone est-elle obligatoire ?",
        answer:
          "Depuis le 18 août 2026 pour les batteries de véhicules électriques, les batteries LMT jusqu'à 25 kg et les batteries industrielles de plus de 2 kWh, vérification par un tiers incluse.",
      },
      {
        question: 'Quelles étapes du cycle de vie la méthode couvre-t-elle ?',
        answer:
          "Quatre étapes selon ISO 14067 et le PEFCR : matières premières, fabrication principale, distribution et transport, puis fin de vie avec les crédits de recyclage.",
      },
    ],
    'en-18220-en-18219-gs1-digital-link-standards': [
      {
        question: 'Quelle syntaxe EN 18220 est exigée pour le passeport batterie ?',
        answer:
          'Le GS1 Digital Link au format /01/{GTIN}/21/{numéro de série}, porté par un code 2D apposé sur le boîtier de la batterie.',
      },
      {
        question: "Que couvre la norme EN 18219 ?",
        answer:
          "L'attribution et l'interopérabilité de l'identifiant unique de produit (UPI), ainsi que le raccordement au registre DPP central de l'Union européenne.",
      },
    ],
    'sovereign-data-vault-zkp-privacy-guide': [
      {
        question: 'Comment la preuve à divulgation nulle protège-t-elle les formulations ?',
        answer:
          "Le calcul reste dans votre environnement. Seule une preuve cryptographique de conformité est publiée, jamais la chimie de la cathode, les prix fournisseurs ni la nomenclature.",
      },
      {
        question: 'Combien de temps les données doivent-elles rester disponibles ?',
        answer:
          "Dix ans après la mise sur le marché, conformément à l'article 77 du règlement (UE) 2023/1542.",
      },
    ],
  },
  nl: {
    'eu-battery-carbon-footprint-classes-a-e': [
      {
        question: 'Vanaf wanneer is de CO2-voetafdrukverklaring verplicht?',
        answer:
          'Vanaf 18 augustus 2026 voor EV-batterijen, LMT-batterijen tot 25 kg en industriële batterijen boven 2 kWh, inclusief verificatie door een onafhankelijke instantie.',
      },
      {
        question: 'Welke levenscyclusfasen moet de berekening omvatten?',
        answer:
          'Vier fasen volgens ISO 14067 en PEFCR: winning van grondstoffen, hoofdproductie, distributie en transport, en end-of-life met recyclingkredieten.',
      },
    ],
    'en-18220-en-18219-gs1-digital-link-standards': [
      {
        question: 'Welke EN 18220-syntax is vereist voor het batterijpaspoort?',
        answer:
          'GS1 Digital Link in de vorm /01/{GTIN}/21/{serienummer}, gedragen door een 2D-code op de batterijbehuizing.',
      },
      {
        question: 'Wat regelt EN 18219?',
        answer:
          'De toekenning en interoperabiliteit van de unieke productidentificatie (UPI) en de aansluiting op het centrale DPP-register van de EU.',
      },
    ],
    'sovereign-data-vault-zkp-privacy-guide': [
      {
        question: 'Hoe beschermt zero-knowledge-proof de receptuur?',
        answer:
          'De berekening blijft in uw eigen omgeving. Alleen een cryptografisch bewijs van conformiteit wordt gepubliceerd, nooit de kathodereceptuur, leveranciersprijzen of stuklijst.',
      },
      {
        question: 'Hoe lang moeten gegevens beschikbaar blijven?',
        answer:
          'Tien jaar na het in de handel brengen, conform artikel 77 van Verordening (EU) 2023/1542.',
      },
    ],
  },
};
