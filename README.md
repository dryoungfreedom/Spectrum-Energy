# Spectrum Energy Research

**Open research into multi-band energy control — from gamma ray to electron flow.**

© 2026 David R. Young — Spectrum Energy Research Foundation

**→ [Read GETTING-STARTED.md first](GETTING-STARTED.md)** — Download instructions, AI setup guide, license terms, and ethical use provisions.

---

## The Question

Can we control gamma radiation as completely as we control electricity?

Electricity has conductors, insulators, resistors, converters, reflectors, and more — every control role filled. Most bands of the electromagnetic spectrum have the same coverage, until you reach gamma. There, key roles remain open. No conductor. No reflector. No channel. No polarizer.

This research maps every element, compound, and isotope across every energy band to find where those gaps are, why they exist, and what it would take to close them.

## The Core Principle

**Every energy band gets its own optimal conversion pathway.**

Current nuclear technology allows all fission energy to thermalize into heat, then converts roughly a third of that heat to electricity through a steam cycle — the rest is waste heat. The Spectrum Energy approach harvests each energy band — gamma, X-ray, neutron kinetic, thermal — through its own optimal conversion pathway before it becomes heat.

## What's Here

### Interactive Charts
| Chart | What It Shows |
|-------|--------------|
| [Energy Chart](spectrum-energy-chart.html) | 118 elements across 15 energy bands — general reference |
| [Control Chart](spectrum-control-chart.html) | Control analysis per band |
| [Structure Chart](spectrum-structure-chart.html) | Electron configuration vs. energy band behavior — why elements do what they do |
| [Compounds Chart](spectrum-compounds-chart.html) | 79 compounds across 11 categories with gap analysis |
| [Isotope Chart](spectrum-isotope-chart.html) | 34 isotopes — nuclear properties, decay sources, Mössbauer candidates |
| [Glossary](spectrum-glossary.html) | Interactive definitions for all research terms |

### Design Schematics
| Schematic | What It Shows |
|-----------|--------------|
| [Spectrum Energy Cell](spectrum-energy-cell.html) | Decay battery design — 8 concentric converter layers, 3 output modes |
| [Reactor Schematic](spectrum-schematic.html) | Fission reactor with active shielding that harvests waste-stream energy |
| [Active Shielding](spectrum-active-shielding.html) | Layer-by-layer shielding design — convert, don't just block |
| [Energy Budget](spectrum-energy-budget.html) | Where fission energy actually goes — and how much is currently wasted |

### Application Schematics
| Schematic | What It Shows |
|-----------|--------------|
| [Home Integration](spectrum-home-integration.html) | SE Cell powering a 2,000 sq ft Florida home — all utilities |
| [Waste Pipeline](spectrum-waste-pipeline.html) | Reactor spent fuel → processed isotope → completed SE Cell |

### Data & Documentation
| File | Purpose |
|------|---------|
| [GETTING-STARTED.md](GETTING-STARTED.md) | **Start here** — download, AI setup, license, ethical use |
| [spectrum-data.js](spectrum-data.js) | Single source of truth — 118 elements, 79 compounds, 34 isotopes, 15 bands |
| [Gamma Gap Roadmap](GAMMA-GAP-ROADMAP.md) | Research analysis of the five open gamma control roles |
| [Project Reference](PROJECT-REFERENCE.md) | Architecture decisions, physics rules, data structure |
| [Glossary](GLOSSARY.md) | All research terms and definitions (markdown) |

## Two Deliverables

**Warm Fission Reactor** — Critical fission at low temperature. Boron carbide control rods provide the on/off switch. Thin porous uranium coating on replaceable fuel rods allows fission fragments to escape into a selenium-sulfur semiconductor for direct electrical conversion. Heavy water provides neutron moderation and cooling. All energy bands are harvested through their optimal conversion pathways.

**Spectrum Energy Cell** — A decay battery with no fission, no moving parts, and no chain reaction. A sealed isotope source surrounded by concentric converter layers — each tuned to a specific energy band. Inner layers convert gamma and X-ray. Middle layers harvest thermal energy. The outer shell is radiologically safe. Three output modes: electrical, direct thermal, and direct light. The omnidirectional cell is the product. A directional variant — the Directed Cell — produces a beam for medical therapy, industrial radiography, and sterilization.

## Design Principles

1. **Never divert energy from a working conversion pathway to a less efficient one** — For conventional reactors: harvest from waste, never steal from thermal. For the Warm Fission Reactor: reduce thermal output by harvesting as much of the available spectrum as possible through dedicated converters. The SE Cell has no thermal cycle — all paths are active.
2. **Filter by layer, not by containment** — Convert dangerous bands in the inner layers, pass safe bands to the surface. Shielding IS the converter.
3. **Don't convert energy already in useful form** — If it's already heat, use it as heat. If it's already light, pipe it as light. Every conversion step has losses.
4. **Cascade, don't discard** — Decay is gradual. Step units down to smaller applications as power drops. End products are stable commodity metals, not waste.

## The Gamma Gap

The research frontier. Five gamma control roles remain open:

| Role | Status | Priority | Path Forward |
|------|--------|----------|-------------|
| Reflector | OPEN | Highest | Three approaches under investigation: (1) **Crystal diffraction** — Laue/Bragg diffraction in silicon and germanium crystals, nuclear resonance scattering in Mössbauer isotopes, extreme grazing-incidence optics. (2) **Photon-on-photon interaction** — ATLAS/LHC confirmed light-by-light scattering in 2017 (γγ → γγ); Delbrück scattering measured at gamma energies below 7 GeV; SLAC E-144 demonstrated gamma-range photons interacting with laser fields (1997). (3) **Laser-engineered quantum states** — Washington State University (2025) used laser pulses to create a Bose-Einstein condensate that accelerates opposite to an applied force (negative effective mass); if applicable at gamma frequencies, this could enable steerable reflection by modifying a medium's response to incoming energy. |
| Refractor | OPEN | Low | No known material refracts gamma. However, photon-on-photon scattering and laser-engineered quantum states (see Reflector) suggest energy-based approaches may achieve deflection at arbitrary angles without requiring a refractive material. Research also indicates the refractive index of polarized vacuum does not depend on wavelength — intense fields may make the vacuum itself refractive at gamma frequencies. |
| Channel | OPEN | Medium | Depends on solving reflection or refraction first |
| Polarizer | OPEN | Medium | Compton scattering polarimetry, crystal diffraction |
| Conductor | OPEN | Exploratory | Requires entirely new mechanism — most speculative |

Five roles are filled: absorber, converter, resistor, insulator, transformer.

## How to Use

**See [GETTING-STARTED.md](GETTING-STARTED.md) for complete instructions**, including:
- Download options (ZIP or Git clone)
- Setting up a Claude AI project for research exploration
- License agreement and ethical use provisions

**Quick start:**
1. Download or clone this repository
2. Open `index.html` in any modern browser
3. All charts load `spectrum-data.js` from the same folder — keep all files together

No build step. No server. No dependencies. Just HTML, JavaScript, and a browser.

## The Data

`spectrum-data.js` contains all element, compound, and isotope data in one file. Every chart reads from it. The file includes a self-validation block that checks data integrity on load.

**15 energy bands** in three categories:
- **EM Spectrum (8):** Radio, Microwave, Infrared, Visible Light, Ultraviolet, X-ray, Gamma, Magnetic
- **Thermal (1):** Conductive heat transfer
- **Kinetic Particles (6):** Electron flow, Neutron flow (+ 4 placeholders: Alpha, Proton, Ion, Muon)

**11 control roles** in three groups:
- **Change (8):** Conductor, Reflector, Refractor, Diffractor, Resistor, Polarizer, Converter, Transformer
- **Stop (2):** Insulator, Absorber
- **Passive (1):** Transparent (no interaction)

## Origin

This research grew from a question asked over forty years ago: *what if we treated every energy band from a nuclear reaction the way we treat electricity — with dedicated materials for every control function?*

The origin story — *Sunshine on a Bad Nuclear Day* — is a short work of fiction that illustrates the Spectrum Energy concept through narrative. Set in a future where a nuclear plant disaster exposes the fragility of conventional reactor design, it follows a researcher whose ideas about multi-band energy control are brought to life by a team that has been quietly building the technology. It is available on the website.

## Contributing

This is open research. If you have data, corrections, or insights — especially regarding the gamma gap — contributions are welcome. The research uses a quality control process: every addition must specify which energy bands it interacts with and what control roles it fills.

See [PROJECT-REFERENCE.md](PROJECT-REFERENCE.md) for data architecture and physics decisions.

## Regulatory Notice

The Warm Fission Reactor and Spectrum Energy Cell involve regulated nuclear materials. Development, possession, and deployment of fissile materials and isotope sources require compliance with NRC, DOE, and applicable international regulations. This is a research tool — it does not constitute authorization to handle nuclear materials.

## License & Ethical Use

**By downloading or using this research, you agree to the license terms and ethical use provisions in [GETTING-STARTED.md](GETTING-STARTED.md).**

This work is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** ([CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)).

- ✓ **Free** for research, education, and non-commercial use with attribution
- ✓ **Share alike** — derivatives must use the same license
- ✗ **Commercial use** requires a separate license from Spectrum Energy Research Foundation

**Ethical use:** This research exists to advance peaceful energy development for the benefit of mankind. Use for weapons development or any purpose that harms people is expressly prohibited.

**"Sunshine on a Bad Nuclear Day"** is a separate literary work by David R. Young. All rights reserved.

## Citation

When referencing this research in publications:

> Young, D. R. (2026). *Spectrum Energy Research*. Spectrum Energy Research Foundation. https://spectrumenergy.one

## Contact

Questions, collaboration ideas, or licensing inquiries: **secharts@proton.me**

Visit [spectrumenergy.one](https://spectrumenergy.one) for the full interactive experience.
