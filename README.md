# EU DPP Provider (eudppprovider.com)

> **Enterprise Digital Product Passport (DPP) Software Suite & Managed Compliance Data Vault**
> Fully compliant with the EU Battery Regulation (**Regulation EU 2023/1542**).

[![Astro](https://img.shields.io/badge/Framework-Astro_v4-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind_v3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![EU Regulation](https://img.shields.io/badge/Compliance-EU_2023%2F1542-10B981?style=flat)](https://www.eudppprovider.com/compliance/eu-battery-regulation-2023-1542)

---

## ⚡ Overview

**EU DPP Provider** is the high-performance digital product passport infrastructure designed for global battery manufacturers, electric vehicle (EV) automotive OEMs, energy storage system (BESS) integrators, and upstream cathode/anode material suppliers.

### Dual Business Delivery Model

1. **Enterprise DPP Software License**: On-premise or private cloud deployment for tier-1 manufacturers demanding 100% data sovereignty, custom ERP/MES/BMS integrations, and unlimited serialization with zero per-unit tax.
2. **Managed DPP Data Vault Hosting**: Turnkey SaaS hosting on EU-sovereign cloud infrastructure with **Zero-Knowledge Proofs (ZKP)** shielding supplier proprietary formulations.

---

## 🛠️ Tech Stack & Architecture

- **Static Engine**: Astro (Zero-JS by default, ultra-fast TTFB and 95+ Lighthouse score)
- **Styling**: Tailwind CSS (B2B Slate/Navy industrial tech aesthetic)
- **i18n & Localization**: Native multi-language routing (`/` EN, `/zh` 中文, `/de` Deutsch, `/fr` Français)
- **Identifiers**: GS1 Digital Link compliant 2D QR URI resolver
- **SEO & Structured Data**: Comprehensive Schema.org (`SoftwareApplication`, `Organization`, `FAQPage`, `BreadcrumbList`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18.17.0+` or `v20.0.0+`
- npm `v9+`

### Installation

```bash
# Clone the repository
git clone git@github.com:wwwin896-cpu/EUDPPProvider.git
cd EUDPPProvider

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Compile static output to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deployment (Cloudflare Pages)

- **Framework Preset**: `Astro`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Compatibility**: `NODE_VERSION: 20` or higher

---

## 📄 License & Contact

© 2026 EU DPP Provider ([eudppprovider.com](https://www.eudppprovider.com)). All rights reserved.  
Contact: `contact@eudppprovider.com`
