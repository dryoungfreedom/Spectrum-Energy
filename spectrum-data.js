/*
 * Spectrum Energy Research Framework — Shared Data
 * © 2026 David R. Young — Spectrum Energy Research Corp
 * All Rights Reserved
 *
 * Single source of truth for all Spectrum charts.
 * Edit element data here — all views update automatically.
 *
 * ═══════════════════════════════════════════════════════
 * DATA MANIFEST — If any section is missing, file is bad
 * ═══════════════════════════════════════════════════════
 * SECTION                  EXPECTED COUNT   DEPENDS ON
 * EM_BANDS                 8 bands          — radio thru gamma + magnetic
 * THERMAL_BANDS            1 band           — conductive heat
 * KINETIC_BANDS            6 bands          — electron, neutron (developed); alpha, proton, ion, muon (placeholders)
 * NON_EM_BANDS             (deprecated)     — backward compat alias for thermal + developed kinetic
 * ALL_BANDS                (computed)       — EM + thermal + developed kinetic
 * ROLES                    10 roles        — channel merged into conductor; transformer added for scintillators
 * ROLE_COLORS              10 entries      ROLES
 * CONTROL_GROUPS           4 groups         ROLES — START has no material roles (source only)
 * STRUCTURE_GROUPS         15 groups        ELEMENTS
 * ELEMENTS                 118 elements     Band keys: radio thru gamma + magnetic + thermal + electron + neutron
 * COMPOUND_CATEGORIES      11 categories    —
 * COMPOUNDS                79 compounds     Same band keys as ELEMENTS
 * ISOTOPE_CATEGORIES       6 categories     — mossbauer, nuclear_optical, fission, neutron, contrast, decay_source
 * ISOTOPES                 34 isotopes      ISOTOPE_CATEGORIES
 * ═══════════════════════════════════════════════════════
 *
 * THREE BAND CATEGORIES:
 *   EM Spectrum (8): radio, microwave, infrared, visible, ultraviolet, xray, gamma, magnetic
 *   Thermal (1): thermal
 *   Kinetic Particles (6): electron, neutron, alpha*, proton*, ion*, muon* (*=placeholder)
 *
 * COMPOUND CATEGORIES (11):
 *   scintillator(10) piezoelectric(6) nuclear(5)
 *   shielding(11) oxide(5) ferrite(4) semiconductor(7)
 *   thermoelectric(9) ceramic(8) polymer(6) alloy(8)
 *
 * ISOTOPE CATEGORIES (6):
 *   mossbauer(9) nuclear_optical(1) fission(4) neutron(5) contrast(6) decay_source(9)
 *
 * Self-validation runs at end of file — check browser
 * console for errors after loading.
 * Last verified: March 27, 2026
 */

const EM_BANDS = [
  { id:"radio", name:"Radio", wavelength:"> 1m", color:"#E63946", freq:"< 300 MHz" },
  { id:"microwave", name:"Microwave", wavelength:"1mm – 1m", color:"#E76F51", freq:"300 MHz – 300 GHz" },
  { id:"infrared", name:"Infrared", wavelength:"700nm – 1mm", color:"#F4A261", freq:"300 GHz – 430 THz" },
  { id:"visible", name:"Visible Light", wavelength:"400 – 700nm", color:"#E9C46A", freq:"430 – 750 THz" },
  { id:"ultraviolet", name:"Ultraviolet", wavelength:"10 – 400nm", color:"#2A9D8F", freq:"750 THz – 30 PHz" },
  { id:"xray", name:"X-Ray", wavelength:"0.01 – 10nm", color:"#264653", freq:"30 PHz – 30 EHz" },
  { id:"gamma", name:"Gamma Ray", wavelength:"< 0.01nm", color:"#6A0572", freq:"> 30 EHz" },
  { id:"magnetic", name:"Magnetic", color:"#9B59B6", desc:"Magnetic field interaction — the 'M' in electromagnetic" },
];

const THERMAL_BANDS = [
  { id:"thermal", name:"Thermal", color:"#FF6B35", desc:"Conductive heat transfer — kinetic at atomic level, transferred through EM interactions" },
];

const KINETIC_BANDS = [
  { id:"electron", name:"Electron Flow", color:"#4A90D9", desc:"EM field guided by electron flow through conductor (monorail model)", developed:true },
  { id:"neutron", name:"Neutron Flow", color:"#1ABC9C", desc:"Nuclear trigger carrier — propagates chain reactions between fission events", developed:true },
  { id:"alpha", name:"Alpha Flow", color:"#D35400", desc:"Helium nuclei emitted from heavy element decay — short range, high energy", developed:false },
  { id:"proton", name:"Proton Flow", color:"#7F8C8D", desc:"Proton beams — medical therapy, cosmic rays. Exists, not explored.", developed:false },
  { id:"ion", name:"Ion Flow", color:"#95A5A6", desc:"Charged atoms in motion — plasma, ion beams. Exists, not explored.", developed:false },
  { id:"muon", name:"Muon Flow", color:"#BDC3C7", desc:"Short-lived lepton — cosmic ray secondary, muon tomography. Exists, not explored.", developed:false },
];

/* Backward compatibility + convenience */
const NON_EM_BANDS = [...THERMAL_BANDS, ...KINETIC_BANDS.filter(b=>b.developed)]; // deprecated — use category arrays
const ALL_BANDS = [...EM_BANDS, ...THERMAL_BANDS, ...KINETIC_BANDS.filter(b=>b.developed)];

const ROLES = [
  { id:"conductor", name:"Conductor", desc:"Guides energy from one point to another — the medium that controls direction (electrons for electricity, crystals for gamma, waveguides for radio)", icon:"→", group:"change" },
  { id:"reflector", name:"Reflector", desc:"Bounces / redirects this energy", icon:"↩", group:"change" },
  { id:"refractor", name:"Refractor", desc:"Bends / slows energy through a medium", icon:"◠", group:"change" },
  { id:"resistor", name:"Resistor", desc:"Reduces intensity without full block", icon:"≋", group:"change" },
  { id:"polarizer", name:"Polarizer", desc:"Filters wave orientation", icon:"⫽", group:"change" },
  { id:"converter", name:"Converter", desc:"Transforms into another energy form", icon:"⚡", group:"change" },
  { id:"transformer", name:"Transformer", desc:"Steps photon frequency up or down (photon in → photon out at different energy level) — like electrical voltage transformer", icon:"⇅", group:"change" },
  { id:"insulator", name:"Insulator", desc:"Blocks / stops this energy", icon:"⊘", group:"stop" },
  { id:"absorber", name:"Absorber", desc:"Captures / absorbs this energy", icon:"●", group:"stop" },
  { id:"transparent", name:"Transparent", desc:"Energy passes through unchanged", icon:"◇", group:"other" },
];

const ROLE_COLORS = {
  conductor: { bg:"#1a5276", text:"#AED6F1" },
  reflector: { bg:"#1E8449", text:"#A9DFBF" },
  refractor: { bg:"#117A65", text:"#A2D9CE" },
  resistor:  { bg:"#784212", text:"#F0C987" },
  polarizer: { bg:"#4A235A", text:"#C39BD3" },
  converter: { bg:"#B7950B", text:"#F9E79F" },
  transformer:{ bg:"#0E6655", text:"#A3E4D7" },
  insulator: { bg:"#7B241C", text:"#F5B7B1" },
  absorber:  { bg:"#6C3483", text:"#D7BDE2" },
  transparent:{ bg:"#2E4053", text:"#AEB6BF" },
};

const CONTROL_GROUPS = [
  { id:"start", label:"START", color:"#AED6F1", desc:"The source — the mechanism that initiates energy flow (reactor, decay isotope, generator, sun)", roles:[] },
  { id:"change", label:"CHANGE", color:"#A9DFBF", desc:"Direct, redirect, modify, attenuate, filter, or transform energy in transit", roles:["conductor","reflector","refractor","resistor","polarizer","converter","transformer"] },
  { id:"stop", label:"STOP", color:"#F5B7B1", desc:"Block or capture energy", roles:["insulator","absorber"] },
  { id:"other", label:"PASSIVE", color:"#AEB6BF", desc:"No interaction with this energy", roles:["transparent"] },
];

const STRUCTURE_GROUPS = [
  { id:"s1", name:"Single s electron", shell:"s¹", desc:"One electron in outermost s orbital — lowest ionization, strongest metallic character", elements:["H","Li","Na","K","Rb","Cs","Fr","Cu","Ag","Au","Cr","Mo","Nb"] },
  { id:"s2", name:"Filled s orbital", shell:"s²", desc:"Two electrons in outermost s orbital — alkaline earth metals and closed-shell metals", elements:["He","Be","Mg","Ca","Sr","Ba","Ra","Zn","Cd","Yb","No"] },
  { id:"d_half", name:"Half-filled d shell", shell:"d⁵", desc:"Maximum exchange stabilization — high stability, often reflective", elements:["Cr","Mn","Mo","Tc","Re"] },
  { id:"d_full", name:"Filled d shell", shell:"d¹⁰", desc:"Complete d orbital — excellent conductors, high reflectivity", elements:["Cu","Zn","Ag","Cd","Au","Hg","Pd","Ni","Pt","Rg","Cn","Ds"] },
  { id:"d_partial", name:"Partial d shell", shell:"d¹⁻⁹", desc:"Unfilled d orbitals — variable oxidation states, strong absorbers", elements:["Sc","Ti","V","Fe","Co","Ni","Y","Zr","Nb","Ru","Rh","Pd","Hf","Ta","W","Re","Os","Ir","Pt","Mn","Mo","Tc","La","Lu","Ac","Rf","Db","Sg","Bh","Hs","Mt"] },
  { id:"f_partial", name:"Partial f shell", shell:"f¹⁻¹³", desc:"Lanthanide/actinide f electrons — sharp absorption bands, phosphorescence, strong converters", elements:["Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md"] },
  { id:"f_full", name:"Filled f shell", shell:"f¹⁴", desc:"Complete f orbital — properties revert toward d-block behavior", elements:["Yb","No","Lu","Lr","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"] },
  { id:"p1", name:"One p electron", shell:"p¹", desc:"Single p electron — amphoteric metals, semiconductor precursors", elements:["B","Al","Ga","In","Tl","Nh"] },
  { id:"p2", name:"Two p electrons", shell:"p²", desc:"Two p electrons — semiconductors, metalloids with band-gap properties", elements:["C","Si","Ge","Sn","Pb","Fl"] },
  { id:"p3", name:"Three p electrons", shell:"p³", desc:"Half-filled p shell — semimetals, pnictogens", elements:["N","P","As","Sb","Bi","Mc"] },
  { id:"p4", name:"Four p electrons", shell:"p⁴", desc:"Four p electrons — chalcogens, strong converters and photoconductors", elements:["O","S","Se","Te","Po","Lv"] },
  { id:"p5", name:"Five p electrons", shell:"p⁵", desc:"Near-complete p shell — halogens, strongest electron affinity, powerful oxidizers", elements:["F","Cl","Br","I","At","Ts"] },
  { id:"p6", name:"Complete p shell", shell:"p⁶", desc:"Noble gas configuration — closed shell, minimal reactivity, gas-phase transparency", elements:["Ne","Ar","Kr","Xe","Rn","Og"] },
  { id:"ferro", name:"Ferromagnetic", shell:"3d⁶⁻⁸", desc:"Unpaired 3d electrons with strong exchange coupling — Fe/Co/Ni triad", elements:["Fe","Co","Ni","Gd"] },
  { id:"supercon", name:"Superconducting elements", shell:"various", desc:"Elements that superconduct below critical temperature — Meissner effect (magnetic insulator)", elements:["Nb","V","Ta","Pb","Sn","In","Hg","La","Tc","Re","Tl","Zr","Ti","Ru","Os","Zn","Mo","Ga","Al","Ir","Cd","Rh","W","U","Th","Pa","Am"] },
];

// p: 0 = documented, 1 = predicted/inferred from atomic structure

const ELEMENTS = [
{symbol:"H",name:"Hydrogen",Z:1,config:"1s¹",p:0,bands:{electron:["insulator"],radio:["transparent"],microwave:["transparent"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator","absorber"],magnetic:["resistor"],neutron:["transparent","refractor"]}},
{symbol:"He",name:"Helium",Z:2,config:"1s²",p:0,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"Li",name:"Lithium",Z:3,config:"1s² 2s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["transparent","refractor"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Be",name:"Beryllium",Z:4,config:"1s² 2s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["transparent","conductor","refractor"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["resistor"],neutron:["transparent","reflector","refractor"]}},
{symbol:"B",name:"Boron",Z:5,config:"[He] 2s² 2p¹",p:0,bands:{electron:["resistor"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],thermal:["resistor","absorber"],magnetic:["resistor"],neutron:["absorber"]}},
{symbol:"C",name:"Carbon",Z:6,config:"[He] 2s² 2p²",p:0,bands:{electron:["resistor"],radio:["insulator","resistor"],microwave:["absorber","converter","resistor"],infrared:["absorber"],visible:["absorber","refractor"],ultraviolet:["absorber"],xray:["transparent","conductor","refractor","polarizer"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["resistor"],neutron:["transparent","reflector","refractor"]}},
{symbol:"N",name:"Nitrogen",Z:7,config:"[He] 2s² 2p³",p:0,bands:{electron:["insulator"],radio:["transparent"],microwave:["transparent"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator","absorber"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"O",name:"Oxygen",Z:8,config:"[He] 2s² 2p⁴",p:0,bands:{electron:["insulator"],radio:["transparent"],microwave:["transparent"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator","absorber"],magnetic:["absorber"],neutron:["transparent","refractor"]}},
{symbol:"F",name:"Fluorine",Z:9,config:"[He] 2s² 2p⁵",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},
{symbol:"Ne",name:"Neon",Z:10,config:"[He] 2s² 2p⁶",p:0,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent","converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"Na",name:"Sodium",Z:11,config:"[Ne] 3s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["absorber"],visible:["converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Mg",name:"Magnesium",Z:12,config:"[Ne] 3s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["reflector","conductor","refractor"],xray:["transparent"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Al",name:"Aluminum",Z:13,config:"[Ne] 3s² 3p¹",p:0,bands:{electron:["conductor"],radio:["conductor","reflector","polarizer"],microwave:["reflector","conductor","polarizer"],infrared:["reflector","conductor","polarizer"],visible:["reflector","conductor"],ultraviolet:["reflector","conductor","resistor","refractor","polarizer"],xray:["absorber","resistor"],gamma:["transparent","resistor"],thermal:["conductor","absorber"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Si",name:"Silicon",Z:14,config:"[Ne] 3s² 3p²",p:0,bands:{electron:["resistor"],radio:["insulator","converter","resistor","refractor"],microwave:["transparent","converter","resistor","refractor"],infrared:["transparent","converter","resistor","refractor"],visible:["absorber","converter","resistor","refractor"],ultraviolet:["absorber","resistor"],xray:["transparent","conductor","refractor","polarizer"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["resistor"],neutron:["transparent"]}},
{symbol:"P",name:"Phosphorus",Z:15,config:"[Ne] 3s² 3p³",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent","refractor"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["insulator","absorber"],magnetic:["resistor"],neutron:["transparent"]}},
{symbol:"S",name:"Sulfur",Z:16,config:"[Ne] 3s² 3p⁴",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["transparent","absorber","refractor"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},
{symbol:"Cl",name:"Chlorine",Z:17,config:"[Ne] 3s² 3p⁵",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Ar",name:"Argon",Z:18,config:"[Ne] 3s² 3p⁶",p:0,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent","converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"K",name:"Potassium",Z:19,config:"[Ar] 4s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["absorber"],visible:["converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["conductor","absorber"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ca",name:"Calcium",Z:20,config:"[Ar] 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber","converter","refractor"],xray:["absorber"],gamma:["transparent"],thermal:["conductor"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Sc",name:"Scandium",Z:21,config:"[Ar] 3d¹ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber","converter"],xray:["absorber"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ti",name:"Titanium",Z:22,config:"[Ar] 3d² 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector","converter"],ultraviolet:["absorber","reflector","converter"],xray:["absorber"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"V",name:"Vanadium",Z:23,config:"[Ar] 3d³ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","reflector"],ultraviolet:["absorber","converter"],xray:["absorber"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Cr",name:"Chromium",Z:24,config:"[Ar] 3d⁵ 4s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector","resistor"],ultraviolet:["reflector","conductor"],xray:["absorber"],gamma:["transparent"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Mn",name:"Manganese",Z:25,config:"[Ar] 3d⁵ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber","reflector","converter"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Fe",name:"Iron",Z:26,config:"[Ar] 3d⁶ 4s²",p:0,bands:{electron:["conductor"],radio:["absorber","conductor","converter","resistor","polarizer"],microwave:["absorber","converter","resistor","polarizer"],infrared:["absorber","converter"],visible:["absorber","reflector"],ultraviolet:["absorber","resistor"],xray:["absorber","resistor","converter"],gamma:["absorber","resistor","converter"],thermal:["conductor"],magnetic:["conductor"],neutron:["resistor","reflector"]}},
{symbol:"Co",name:"Cobalt",Z:27,config:"[Ar] 3d⁷ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor","absorber","converter"],microwave:["absorber","converter","resistor"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["conductor"],neutron:["resistor"]}},
{symbol:"Ni",name:"Nickel",Z:28,config:"[Ar] 3d⁸ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor","absorber","converter","resistor"],microwave:["absorber","reflector","converter","resistor"],infrared:["reflector","absorber"],visible:["reflector"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["conductor"],neutron:["resistor","reflector"]}},
{symbol:"Cu",name:"Copper",Z:29,config:"[Ar] 3d¹⁰ 4s¹",p:0,bands:{electron:["conductor"],radio:["conductor","polarizer"],microwave:["conductor","reflector","polarizer"],infrared:["reflector","absorber","polarizer"],visible:["reflector","absorber"],ultraviolet:["absorber","converter"],xray:["absorber","resistor"],gamma:["transparent","resistor"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor","reflector"]}},
{symbol:"Zn",name:"Zinc",Z:30,config:"[Ar] 3d¹⁰ 4s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector","absorber"],ultraviolet:["absorber","converter"],xray:["absorber"],gamma:["transparent"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Ga",name:"Gallium",Z:31,config:"[Ar] 3d¹⁰ 4s² 4p¹",p:0,bands:{electron:["conductor"],radio:["conductor","converter"],microwave:["conductor"],infrared:["absorber","converter"],visible:["absorber","reflector","converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Ge",name:"Germanium",Z:32,config:"[Ar] 3d¹⁰ 4s² 4p²",p:0,bands:{electron:["resistor"],radio:["insulator","converter","resistor"],microwave:["transparent","converter","refractor"],infrared:["transparent","converter","resistor","refractor"],visible:["absorber","converter","resistor","refractor"],ultraviolet:["absorber"],xray:["transparent","conductor","polarizer"],gamma:["transparent"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"As",name:"Arsenic",Z:33,config:"[Ar] 3d¹⁰ 4s² 4p³",p:0,bands:{electron:["resistor"],radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber","reflector","converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Se",name:"Selenium",Z:34,config:"[Ar] 3d¹⁰ 4s² 4p⁴",p:0,bands:{electron:["resistor"],radio:["insulator","converter"],microwave:["insulator"],infrared:["converter","refractor"],visible:["converter","absorber","refractor"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Br",name:"Bromine",Z:35,config:"[Ar] 3d¹⁰ 4s² 4p⁵",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Kr",name:"Krypton",Z:36,config:"[Ar] 3d¹⁰ 4s² 4p⁶",p:0,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent","converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"Rb",name:"Rubidium",Z:37,config:"[Kr] 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["converter"],visible:["converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["conductor"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Sr",name:"Strontium",Z:38,config:"[Kr] 5s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber","converter"],xray:["absorber"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Y",name:"Yttrium",Z:39,config:"[Kr] 4d¹ 5s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Zr",name:"Zirconium",Z:40,config:"[Kr] 4d² 5s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],thermal:["resistor"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Nb",name:"Niobium",Z:41,config:"[Kr] 4d⁴ 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Mo",name:"Molybdenum",Z:42,config:"[Kr] 4d⁵ 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["converter","resistor"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Tc",name:"Technetium",Z:43,config:"[Kr] 4d⁵ 5s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ru",name:"Ruthenium",Z:44,config:"[Kr] 4d⁷ 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Rh",name:"Rhodium",Z:45,config:"[Kr] 4d⁸ 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber","reflector"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Pd",name:"Palladium",Z:46,config:"[Kr] 4d¹⁰",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector","absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ag",name:"Silver",Z:47,config:"[Kr] 4d¹⁰ 5s¹",p:0,bands:{electron:["conductor"],radio:["conductor","polarizer"],microwave:["conductor","reflector","polarizer"],infrared:["reflector","conductor","resistor","polarizer"],visible:["reflector","conductor","resistor"],ultraviolet:["reflector","converter","conductor"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Cd",name:"Cadmium",Z:48,config:"[Kr] 4d¹⁰ 5s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector","converter"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["insulator"]}},
{symbol:"In",name:"Indium",Z:49,config:"[Kr] 4d¹⁰ 5s² 5p¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["transparent","conductor","converter"],visible:["transparent","conductor"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Sn",name:"Tin",Z:50,config:"[Kr] 4d¹⁰ 5s² 5p²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","resistor","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["transparent"]}},
{symbol:"Sb",name:"Antimony",Z:51,config:"[Kr] 4d¹⁰ 5s² 5p³",p:0,bands:{electron:["resistor"],radio:["insulator"],microwave:["insulator"],infrared:["absorber","reflector","converter"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Te",name:"Tellurium",Z:52,config:"[Kr] 4d¹⁰ 5s² 5p⁴",p:0,bands:{electron:["resistor"],radio:["insulator"],microwave:["insulator"],infrared:["converter","transparent","refractor"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["transparent","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"I",name:"Iodine",Z:53,config:"[Kr] 4d¹⁰ 5s² 5p⁵",p:0,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber","converter"],xray:["transparent","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Xe",name:"Xenon",Z:54,config:"[Kr] 4d¹⁰ 5s² 5p⁶",p:0,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent","converter"],visible:["transparent","converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"Cs",name:"Cesium",Z:55,config:"[Xe] 6s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["converter"],visible:["converter"],ultraviolet:["converter"],xray:["transparent","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ba",name:"Barium",Z:56,config:"[Xe] 6s²",p:0,bands:{electron:["conductor"],radio:["insulator"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"La",name:"Lanthanum",Z:57,config:"[Xe] 5d¹ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ce",name:"Cerium",Z:58,config:"[Xe] 4f¹ 5d¹ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"Pr",name:"Praseodymium",Z:59,config:"[Xe] 4f³ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Nd",name:"Neodymium",Z:60,config:"[Xe] 4f⁴ 6s²",p:0,bands:{electron:["conductor"],radio:["absorber"],microwave:["absorber","converter"],infrared:["converter","absorber"],visible:["converter","absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Pm",name:"Promethium",Z:61,config:"[Xe] 4f⁵ 6s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Sm",name:"Samarium",Z:62,config:"[Xe] 4f⁶ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["insulator"]}},
{symbol:"Eu",name:"Europium",Z:63,config:"[Xe] 4f⁷ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["converter","absorber"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["insulator"]}},
{symbol:"Gd",name:"Gadolinium",Z:64,config:"[Xe] 4f⁷ 5d¹ 6s²",p:0,bands:{electron:["conductor"],radio:["absorber"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","insulator","converter"],thermal:["resistor"],magnetic:["conductor"],neutron:["insulator"]}},
{symbol:"Tb",name:"Terbium",Z:65,config:"[Xe] 4f⁹ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["converter","absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Dy",name:"Dysprosium",Z:66,config:"[Xe] 4f¹⁰ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor","absorber"],microwave:["absorber","converter"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Ho",name:"Holmium",Z:67,config:"[Xe] 4f¹¹ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Er",name:"Erbium",Z:68,config:"[Xe] 4f¹² 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["converter","absorber"],visible:["converter","absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Tm",name:"Thulium",Z:69,config:"[Xe] 4f¹³ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["converter","absorber"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Yb",name:"Ytterbium",Z:70,config:"[Xe] 4f¹⁴ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Lu",name:"Lutetium",Z:71,config:"[Xe] 4f¹⁴ 5d¹ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Hf",name:"Hafnium",Z:72,config:"[Xe] 4f¹⁴ 5d² 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Ta",name:"Tantalum",Z:73,config:"[Xe] 4f¹⁴ 5d³ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","resistor","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"W",name:"Tungsten",Z:74,config:"[Xe] 4f¹⁴ 5d⁴ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["converter","absorber"],visible:["converter","absorber"],ultraviolet:["absorber"],xray:["converter","absorber"],gamma:["absorber","resistor","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Re",name:"Rhenium",Z:75,config:"[Xe] 4f¹⁴ 5d⁵ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Os",name:"Osmium",Z:76,config:"[Xe] 4f¹⁴ 5d⁶ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ir",name:"Iridium",Z:77,config:"[Xe] 4f¹⁴ 5d⁷ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["reflector","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Pt",name:"Platinum",Z:78,config:"[Xe] 4f¹⁴ 5d⁹ 6s¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector","absorber"],visible:["reflector"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Au",name:"Gold",Z:79,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹",p:0,bands:{electron:["conductor"],radio:["conductor","polarizer"],microwave:["conductor","reflector","polarizer"],infrared:["reflector","conductor","resistor","polarizer"],visible:["reflector","absorber","conductor","resistor","polarizer"],ultraviolet:["absorber"],xray:["reflector","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Hg",name:"Mercury",Z:80,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["converter"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber"]}},
{symbol:"Tl",name:"Thallium",Z:81,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Pb",name:"Lead",Z:82,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["insulator","absorber","converter"],gamma:["insulator","absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent","reflector"]}},
{symbol:"Bi",name:"Bismuth",Z:83,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",p:0,bands:{electron:["conductor"],radio:["insulator"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent","reflector"]}},
{symbol:"Po",name:"Polonium",Z:84,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["transparent"]}},
{symbol:"At",name:"Astatine",Z:85,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",p:1,bands:{electron:["insulator"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Rn",name:"Radon",Z:86,config:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",p:1,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}},
{symbol:"Fr",name:"Francium",Z:87,config:"[Rn] 7s¹",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor"],infrared:["converter"],visible:["converter"],ultraviolet:["absorber"],xray:["transparent","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ra",name:"Radium",Z:88,config:"[Rn] 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ac",name:"Actinium",Z:89,config:"[Rn] 6d¹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Th",name:"Thorium",Z:90,config:"[Rn] 6d² 7s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor","converter"]}},
{symbol:"Pa",name:"Protactinium",Z:91,config:"[Rn] 5f² 6d¹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"U",name:"Uranium",Z:92,config:"[Rn] 5f³ 6d¹ 7s²",p:0,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor","converter"]}},
{symbol:"Np",name:"Neptunium",Z:93,config:"[Rn] 5f⁴ 6d¹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["absorber"],neutron:["absorber","converter"]}},
{symbol:"Pu",name:"Plutonium",Z:94,config:"[Rn] 5f⁶ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["absorber"],neutron:["insulator","converter"]}},
{symbol:"Am",name:"Americium",Z:95,config:"[Rn] 5f⁷ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor","converter"]}},
{symbol:"Cm",name:"Curium",Z:96,config:"[Rn] 5f⁷ 6d¹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor","converter"]}},
{symbol:"Bk",name:"Berkelium",Z:97,config:"[Rn] 5f⁹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber","converter"]}},
{symbol:"Cf",name:"Californium",Z:98,config:"[Rn] 5f¹⁰ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["insulator","converter"]}},
{symbol:"Es",name:"Einsteinium",Z:99,config:"[Rn] 5f¹¹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["absorber"]}},
{symbol:"Fm",name:"Fermium",Z:100,config:"[Rn] 5f¹² 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Md",name:"Mendelevium",Z:101,config:"[Rn] 5f¹³ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"No",name:"Nobelium",Z:102,config:"[Rn] 5f¹⁴ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Lr",name:"Lawrencium",Z:103,config:"[Rn] 5f¹⁴ 7s² 7p¹",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Rf",name:"Rutherfordium",Z:104,config:"[Rn] 5f¹⁴ 6d² 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Db",name:"Dubnium",Z:105,config:"[Rn] 5f¹⁴ 6d³ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber","reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Sg",name:"Seaborgium",Z:106,config:"[Rn] 5f¹⁴ 6d⁴ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Bh",name:"Bohrium",Z:107,config:"[Rn] 5f¹⁴ 6d⁵ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Hs",name:"Hassium",Z:108,config:"[Rn] 5f¹⁴ 6d⁶ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Mt",name:"Meitnerium",Z:109,config:"[Rn] 5f¹⁴ 6d⁷ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Ds",name:"Darmstadtium",Z:110,config:"[Rn] 5f¹⁴ 6d⁸ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Rg",name:"Roentgenium",Z:111,config:"[Rn] 5f¹⁴ 6d⁹ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["conductor","reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
{symbol:"Cn",name:"Copernicium",Z:112,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s²",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Nh",name:"Nihonium",Z:113,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Fl",name:"Flerovium",Z:114,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",p:1,bands:{electron:["conductor"],radio:["insulator"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Mc",name:"Moscovium",Z:115,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",p:1,bands:{electron:["conductor"],radio:["insulator"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Lv",name:"Livermorium",Z:116,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",p:1,bands:{electron:["conductor"],radio:["conductor"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Ts",name:"Tennessine",Z:117,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",p:1,bands:{electron:["resistor"],radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},
{symbol:"Og",name:"Oganesson",Z:118,config:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",p:1,bands:{electron:["transparent"],radio:["transparent"],microwave:["transparent"],infrared:["transparent"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],thermal:["transparent"],magnetic:["transparent"],neutron:["transparent"]}}
];

// ── Phase 3: Chemical Compounds ──────────────────────────────────────────

const COMPOUND_CATEGORIES = [{ id:"scintillator",name:"Scintillators",desc:"Convert high-energy radiation (gamma,X-ray) into visible or UV light",color:"#D4AF37" },{ id:"piezoelectric",name:"Piezoelectric / Ferroelectric",desc:"Convert between mechanical,electrical,and optical energy via crystal structure",color:"#5B8DEE" },{ id:"nuclear",name:"Nuclear Ceramics",desc:"Fission fuel,neutron control,and reactor structural materials",color:"#E63946" },{ id:"shielding",name:"Radiation & Field Shielding",desc:"Materials that block,attenuate,or moderate radiation (gamma,X-ray,neutron) and electromagnetic fields — the STOP layer of reactor and SE Cell designs",color:"#9B59B6" },{ id:"oxide",name:"Oxide Insulators / Dielectrics",desc:"Thermal and electrical insulators,IR/visible windows,structural ceramics",color:"#1ABC9C" },{ id:"ferrite",name:"Magnetic Ceramics (Ferrites)",desc:"Absorb,conduct,or block magnetic and radio/microwave energy",color:"#E67E22" },{ id:"semiconductor",name:"Semiconductors",desc:"Direct radiation detectors,photovoltaic converters,and radiation-hard electronics for the gamma→light→electricity chain. SiC also listed under Nuclear Ceramics.",color:"#00BCD4" },{ id:"thermoelectric",name:"Thermoelectrics",desc:"Convert thermal gradients directly to electricity via Seebeck effect — thermal band converters for SE Cell surfaces and reactor waste-heat recovery",color:"#EC407A" },{ id:"ceramic",name:"Structural / Thermal Ceramics",desc:"High-temperature structural,thermal management,and neutron-control ceramics for reactor and SE Cell environments — distinct from piezoelectrics,oxides,and nuclear fuel ceramics",color:"#8BC34A" },{ id:"polymer",name:"Polymers / Plastics",desc:"Radiation-hard organic compounds for electrical insulation,neutron detection,beta/neutron→visible conversion,flexible thermal management,and structural roles in radiation environments",color:"#26C6DA" },{ id:"alloy",name:"Alloys",desc:"Engineered metal alloys for reactor structure,and energy conversion — only alloys with distinct energy control properties vs. their parent elements",color:"#FF8A65" },];

/*
 * Compound data structure:
 *   id         — unique short key
 *   formula    — chemical formula as displayed
 *   name       — common name
 *   category   — matches COMPOUND_CATEGORIES id
 *   density    — g/cm³
 *   elements   — component element symbols (dopants noted in notes)
 *   p          — 0 = documented, 1 = predicted/inferred
 *   notes      — key properties, emission wavelength, light yield, applications
 *   bands      — same role system as elements: roles per EM band
 *
 * Scintillator role logic:
 *   gamma/xray  → "converter" (transforms to visible/UV light) + "absorber" (captures energy)
 *   visible     → "transparent" (must transmit own scintillation light to function)
 *   radio/micro → "insulator" (ionic/oxide crystals, non-conductive)
 *   infrared    → "absorber" (lattice vibrations) except IR-transparent window materials
 *   ultraviolet → "absorber" in most; "transparent" where crystal transmits deep UV
 *
 * Dense, high-Z compounds may also be gamma/xray "insulator" (shielding-grade stopping power).
 */

const COMPOUNDS = [
// ── Scintillators ────────────────────────────────────────────────────────
{id:"nai",formula:"NaI(Tl)",name:"Sodium Iodide",category:"scintillator",density:3.67,elements:["Na","I"],p:0,
  notes:"Most widely used gamma scintillator. Tl-doped. Hygroscopic. Emits 415 nm (blue-violet). ~40,000 ph/MeV. 230 ns decay. Energy resolution ~7% at 662 keV.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"bgo",formula:"Bi₄Ge₃O₁₂",name:"Bismuth Germanate (BGO)",category:"scintillator",density:7.13,elements:["Bi","Ge","O"],p:0,
  notes:"Very high density & Zeff (~75). Non-hygroscopic. Emits 480 nm (green). ~9,000 ph/MeV. 300 ns decay. High stopping power — PET standard before LYSO. Low afterglow.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"lyso",formula:"Lu₁.₈Y₀.₂SiO₅(Ce)",name:"LYSO:Ce",category:"scintillator",density:7.1,elements:["Lu","Y","Si","O"],p:0,
  notes:"Current PET scanner standard. Ce-doped. Non-hygroscopic. Emits 420 nm (blue-violet). ~33,200 ph/MeV. 36 ns decay — 8× faster than BGO. Density rivals BGO.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"labr3",formula:"LaBr₃(Ce)",name:"Lanthanum Bromide",category:"scintillator",density:5.08,elements:["La","Br"],p:0,
  notes:"Best energy resolution of any scintillator. Ce-doped. Hygroscopic. Emits 380 nm (UV-violet). ~63,000 ph/MeV — highest light yield. 16 ns decay — fastest halide.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"csi",formula:"CsI(Tl)",name:"Cesium Iodide",category:"scintillator",density:4.51,elements:["Cs","I"],p:0,
  notes:"Rugged, non-hygroscopic. Tl-doped. Emits 550 nm (green). ~54,000 ph/MeV — very high light yield. 1000 ns decay (slow). No cleavage — mechanically robust.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"baf2",formula:"BaF₂",name:"Barium Fluoride",category:"scintillator",density:4.89,elements:["Ba","F"],p:0,
  notes:"Fastest inorganic scintillator — 0.7 ns UV component at 220 nm. Slow component at 310 nm, 630 ns. Slightly hygroscopic. Transmits UV through mid-IR. Used for fast timing research.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["transparent"],ultraviolet:["transparent"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"pbwo4",formula:"PbWO₄",name:"Lead Tungstate",category:"scintillator",density:8.28,elements:["Pb","W","O"],p:0,
  notes:"Densest oxide scintillator (8.28 g/cm³). Used in CERN CMS calorimeter. Low light yield (~200 ph/MeV) but ultrafast. Radiation-hard. Short radiation length (0.9 cm). Cherenkov radiator.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","insulator","transformer"],gamma:["absorber","insulator","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"cdwo4",formula:"CdWO₄",name:"Cadmium Tungstate",category:"scintillator",density:7.9,elements:["Cd","W","O"],p:0,
  notes:"Very low afterglow — ideal for CT scanners. High density. Radiation-hard. Moderate light yield. Used for DC X-ray measurements and photodiode readout.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["insulator"]}},

{id:"gos",formula:"Gd₂O₂S(Tb)",name:"Gadolinium Oxysulfide",category:"scintillator",density:7.32,elements:["Gd","O","S"],p:0,
  notes:"Primary X-ray phosphor screen material. Tb-doped. High density (7.32 g/cm³). Good light output. Used in X-ray imaging, CT screens, and radiography. Also detects gamma.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["insulator"]}},

{id:"cebr3",formula:"CeBr₃",name:"Cerium Bromide",category:"scintillator",density:5.1,elements:["Ce","Br"],p:0,
  notes:"No intrinsic radioactive background (unlike LaBr₃). Hygroscopic. 20 ns decay. ~4% energy resolution at 662 keV. Sub-nanosecond timing possible. Ideal for low-background gamma spectroscopy.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["absorber","transformer"],gamma:["absorber","transformer"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["transparent"]}},

// ── Piezoelectric / Ferroelectric Ceramics ───────────────────────────────
{id:"batio3",formula:"BaTiO₃",name:"Barium Titanate",category:"piezoelectric",density:6.02,elements:["Ba","Ti","O"],p:0,
  notes:"First discovered ferroelectric ceramic (1940s). Piezoelectric, pyroelectric, photorefractive. Dielectric constant up to 7,000–15,000. Bandgap 3.2 eV. Used in capacitors, transducers, microwave absorbers. Converts mechanical↔electrical energy. Non-toxic PZT alternative.",
  bands:{radio:["insulator","converter"],microwave:["absorber","converter"],infrared:["absorber","refractor"],visible:["transparent","refractor"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["insulator","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"pzt",formula:"Pb(Zr,Ti)O₃",name:"Lead Zirconate Titanate (PZT)",category:"piezoelectric",density:7.5,elements:["Pb","Zr","Ti","O"],p:0,
  notes:"Highest piezoelectric coefficients of any ceramic. d₃₃ up to 600 pC/N. Ferroelectric. Converts mechanical↔electrical with highest efficiency. Used in sonar, ultrasonic transducers, actuators, sensors. Pb content makes it radiation-dense. Curie temp ~350°C.",
  bands:{radio:["insulator","converter"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["insulator","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"linbo3",formula:"LiNbO₃",name:"Lithium Niobate",category:"piezoelectric",density:4.65,elements:["Li","Nb","O"],p:0,
  notes:"'The silicon of photonics.' Transparent 350–5200 nm. Largest electro-optic coefficients. Frequency doubler (1064nm→532nm green). Nonlinear optical, piezoelectric, pyroelectric, photorefractive. Used in optical modulators, SAW filters, Q-switches. Non-hygroscopic.",
  bands:{radio:["insulator","converter"],microwave:["absorber","converter"],infrared:["transparent","refractor","converter","polarizer"],visible:["transparent","refractor","converter","polarizer"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["insulator","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"litao3",formula:"LiTaO₃",name:"Lithium Tantalate",category:"piezoelectric",density:7.46,elements:["Li","Ta","O"],p:0,
  notes:"Pyroelectric IR detector material. Transparent 280–5500 nm — wider UV window than LiNbO₃. Ferroelectric, piezoelectric. Used in thermal IR sensors, SAW filters, electro-optic modulators. Higher damage threshold than LiNbO₃. Curie temp 620°C.",
  bands:{radio:["insulator","converter"],microwave:["absorber","converter"],infrared:["transparent","refractor","converter"],visible:["transparent","refractor","converter"],ultraviolet:["transparent","absorber"],xray:["absorber"],gamma:["absorber"],electron:["insulator","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"aln",formula:"AlN",name:"Aluminum Nitride",category:"piezoelectric",density:3.26,elements:["Al","N"],p:0,
  notes:"Piezoelectric semiconductor. Bandgap 6.2 eV — transparent deep into UV (~200 nm). Excellent thermal conductor (170–285 W/mK) despite being electrical insulator. Used in MEMS, BAW/FBAR filters for 5G, UV-C LEDs. Lead-free. Radiation-hard.",
  bands:{radio:["insulator"],microwave:["insulator","converter"],infrared:["transparent","absorber"],visible:["transparent"],ultraviolet:["transparent","converter"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["conductor"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"zno",formula:"ZnO",name:"Zinc Oxide",category:"piezoelectric",density:5.61,elements:["Zn","O"],p:0,
  notes:"Piezoelectric semiconductor. Bandgap 3.37 eV. Strong UV absorption/emission — used in UV LEDs, varistors, sunscreen. Transparent in visible. Converts UV→visible (phosphor). Photocatalytic. Used in SAW devices, gas sensors, transparent electrodes.",
  bands:{radio:["insulator","converter"],microwave:["absorber"],infrared:["absorber","transparent"],visible:["transparent","refractor"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent"]}},

// ── Nuclear Ceramics ─────────────────────────────────────────────────────
{id:"uo2",formula:"UO₂",name:"Uranium Dioxide",category:"nuclear",density:10.97,elements:["U","O"],p:0,
  notes:"Primary nuclear reactor fuel worldwide. Ceramic, melting point 2865°C. Semiconductor (bandgap ~2 eV). Very low thermal conductivity — a key reactor limitation. Fission source: converts neutron absorption into heat + radiation. Radiation-hard. Also used as gamma shielding (depleted).",
  bands:{radio:["insulator"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber","insulator","converter"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["absorber","converter"]}},

{id:"b4c",formula:"B₄C",name:"Boron Carbide",category:"nuclear",density:2.52,elements:["B","C"],p:0,
  notes:"Premier neutron absorber — ¹⁰B cross-section ~3840 barns. Used in reactor control rods, spent fuel storage, shielding. Third hardest material known (after diamond, cubic BN). Melting point 2763°C. Low density. Chemically inert. Radiation-stable.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["resistor"],thermal:["resistor"],magnetic:["resistor"],neutron:["insulator"]}},

{id:"d2o",formula:"D₂O",name:"Heavy Water",category:"nuclear",density:1.11,elements:["H","O"],p:0,
  notes:"Deuterium oxide — neutron moderator in CANDU reactors. Slows fast neutrons to thermal energies without absorbing them (low capture cross-section). Transparent in visible. Absorbs IR strongly. Enables natural uranium fuel cycle. Also used as neutron source medium.",
  bands:{radio:["transparent"],microwave:["absorber"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent","refractor"]}},

{id:"zro2",formula:"ZrO₂",name:"Zirconia",category:"nuclear",density:5.68,elements:["Zr","O"],p:0,
  notes:"Reactor cladding material (as Zircaloy). Very low neutron absorption — 'transparent' to neutrons. Melting point 2715°C. Thermal insulator. Used in thermal barrier coatings, oxygen sensors, dental ceramics. Transforms between monoclinic/tetragonal/cubic phases.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","resistor"],visible:["transparent","refractor"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"sic",formula:"SiC",name:"Silicon Carbide",category:"nuclear",density:3.21,elements:["Si","C"],p:0,
  notes:"Next-gen accident-tolerant fuel cladding. Exceptional thermal conductor (490 W/mK). Extremely radiation-hard. Bandgap 3.26 eV — wide-bandgap semiconductor. Operates to 1600°C. Also used in power electronics, EV inverters, LED substrates. Transparent in IR.",
  bands:{radio:["insulator","resistor"],microwave:["absorber","resistor"],infrared:["transparent","absorber"],visible:["absorber","transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["transparent"]}},

// ── Radiation Shielding ──────────────────────────────────────────────────
{id:"leadglass",formula:"PbO·SiO₂",name:"Lead Glass",category:"shielding",density:5.2,elements:["Pb","Si","O"],p:0,
  notes:"X-ray/gamma shielding glass. ~65% PbO by weight. Transparent in visible (~88% light transmission) while blocking gamma/X-ray. Density 4.8–6.2 g/cm³ depending on Pb content. Used in medical imaging windows, hot cells, nuclear facilities. Does NOT shield neutrons, RF, or MRI.",
  bands:{radio:["transparent"],microwave:["transparent"],infrared:["absorber"],visible:["transparent","refractor"],ultraviolet:["absorber"],xray:["insulator","absorber"],gamma:["insulator","absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"baso4",formula:"BaSO₄",name:"Barium Sulfate",category:"shielding",density:4.49,elements:["Ba","S","O"],p:0,
  notes:"Added to plaster/concrete for X-ray room walls. Dense, non-toxic, inexpensive. Used in medical barium swallows (GI imaging contrast). Absorbs X-rays well due to Ba (Z=56). White powder — reflects visible light. Also used as white pigment.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["reflector"],ultraviolet:["absorber","reflector"],xray:["absorber","insulator"],gamma:["absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"bi2o3",formula:"Bi₂O₃",name:"Bismuth Oxide",category:"shielding",density:8.9,elements:["Bi","O"],p:0,
  notes:"Non-toxic lead substitute for gamma/X-ray shielding. Highest Zeff among non-toxic oxides (Bi Z=83). Added to glass, concrete, polymers for shielding. Yellow-white powder. Used in varistors, solid oxide fuel cells, catalysis. Density rivals lead compounds.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["insulator","absorber"],gamma:["insulator","absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"borosilicate",formula:"B₂O₃·SiO₂",name:"Borosilicate Glass",category:"shielding",density:2.23,elements:["B","Si","O"],p:0,
  notes:"Pyrex/Schott type glass. Low thermal expansion. Transparent in visible and near-IR. Boron content provides some neutron absorption. Used in lab glassware, reactor viewports, telescope mirrors. Radiation-resistant. Low density limits gamma shielding.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","absorber"],visible:["transparent","refractor"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent","resistor"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber"]}},

{id:"hdpe",formula:"(C₂H₄)ₙ",name:"High-Density Polyethylene (HDPE)",category:"shielding",density:0.97,elements:["C","H"],p:0,
  notes:"Premier neutron moderator/shield — highest hydrogen density of any solid (~0.13 g H/cm³). Slows fast neutrons to thermal energies via elastic scattering off hydrogen nuclei. Used in spent fuel storage, neutron radiography shielding, spacecraft radiation protection. Transparent to gamma (low Z). Absorbs IR strongly (C-H stretch bands). Melts at 130°C — limits reactor proximity. The outer neutron shield layer in layered reactor shielding designs.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["refractor"]}},

{id:"bor_hdpe",formula:"(C₂H₄)ₙ + B₄C",name:"Borated Polyethylene",category:"shielding",density:1.12,elements:["C","H","B"],p:0,
  notes:"HDPE loaded with 5–30% B₄C powder. Two-step neutron shield: hydrogen moderates fast→thermal, then ¹⁰B captures thermal neutrons cleanly (α + ⁷Li, minimal gamma). Solves HDPE's weakness — plain HDPE thermalizes neutrons but doesn't capture them, creating a thermal neutron field. Standard in nuclear medicine, spent fuel casks, accelerator shielding. Still gamma-transparent — must be paired with high-Z layers for complete shielding.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["insulator","refractor"]}},

{id:"gd2o3",formula:"Gd₂O₃",name:"Gadolinium Oxide",category:"shielding",density:7.41,elements:["Gd","O"],p:0,
  notes:"Extreme neutron absorber — Gd-157 has the highest thermal neutron cross-section of any stable isotope (259,000 barns). Unlike B₄C which captures cleanly, Gd capture emits secondary gamma rays — it's a neutron→gamma CONVERTER at the nuclear level. Also a gamma absorber (Gd Z=64, density 7.41 g/cm³). Used as burnable poison in reactor fuel, MRI contrast agent (Gd³⁺ chelates), neutron imaging screens. Dual nuclear function: absorbs neutrons AND absorbs gamma.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["insulator","converter"]}},

{id:"lih",formula:"LiH",name:"Lithium Hydride",category:"shielding",density:0.78,elements:["Li","H"],p:0,
  notes:"Lightest neutron shield — density only 0.78 g/cm³. Combines hydrogen (neutron moderator) with ⁶Li (neutron absorber, 940 barns). Used in space reactor shielding (SNAP program) where mass is the critical constraint. Melting point 688°C — survives closer to reactor core than HDPE. Reactive with moisture. In the SE Cell: lightweight neutron shielding for portable/space applications. The mass-optimized neutron shield.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber","refractor"]}},

{id:"densimet",formula:"W-Ni-Fe",name:"Tungsten Heavy Alloy (Densimet)",category:"shielding",density:17.5,elements:["W","Ni","Fe"],p:0,
  notes:"Non-toxic lead replacement for gamma shielding. 17.0–18.5 g/cm³ (denser than lead at 11.3). 90–97% tungsten with Ni-Fe binder. Machinable, non-brittle (unlike pure W). Used in medical collimators, aerospace counterweights, radioactive source containers, and hot cell windows. W (Z=74) gives excellent gamma attenuation. The reactor-grade structural gamma shield — carries mechanical loads while stopping gamma. More expensive than lead but no toxicity or creep.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber","insulator"],electron:["conductor"],thermal:["conductor"],magnetic:["conductor"],neutron:["resistor"]}},

{id:"baryte_concrete",formula:"BaSO₄ + CaSiO₃",name:"Baryte Concrete",category:"shielding",density:3.5,elements:["Ba","S","O","Ca","Si","Fe"],p:0,
  notes:"High-density concrete using baryte aggregate (BaSO₄) instead of limestone. 3.2–3.8 g/cm³ vs 2.3 for normal concrete. THE biological shield around every power reactor — typically 1.5–2.5 m thick. Ba (Z=56) and Fe provide gamma attenuation; hydrogen in water content moderates neutrons. Combined gamma + neutron shield in one pourable structural material. Also used in medical linear accelerator vaults and hot cells. Cheap, permanent, structural.",
  bands:{radio:["insulator"],microwave:["absorber"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber","resistor"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor","refractor"]}},

{id:"mumetal",formula:"Ni₇₇Fe₁₆Cu₅Mo₂",name:"Mu-Metal",category:"shielding",density:8.75,elements:["Ni","Fe","Cu","Mo"],p:0,
  notes:"THE magnetic shielding alloy — permeability up to 100,000 (vs ~5,000 for pure iron). Redirects magnetic field lines around the shielded volume. Used to protect CRT tubes, sensitive electronics, MRI rooms, SQUID detectors, photomultiplier tubes. Does NOT block EM radiation — it provides a low-reluctance path for magnetic flux to bypass the interior. In the reactor: shields sensitive gamma detectors and electronics from stray magnetic fields produced by pumps, motors, and ferromagnetic structural components.",
  bands:{radio:["absorber","conductor"],microwave:["absorber","reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["conductor"],thermal:["resistor"],magnetic:["conductor"],neutron:["resistor"]}},

// ── Oxide Insulators / Dielectrics ───────────────────────────────────────
{id:"al2o3",formula:"Al₂O₃",name:"Alumina (Sapphire)",category:"oxide",density:3.99,elements:["Al","O"],p:0,
  notes:"Most widely used structural ceramic. Single crystal = sapphire. Transparent 150 nm – 5.5 μm (UV through mid-IR). Extremely hard (9 Mohs). Electrical insulator. Excellent thermal conductor for a ceramic. Used as laser host (ruby = Cr-doped), IR windows, substrates.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","refractor"],visible:["transparent","refractor"],ultraviolet:["transparent"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"mgo",formula:"MgO",name:"Magnesium Oxide",category:"oxide",density:3.58,elements:["Mg","O"],p:0,
  notes:"Refractory oxide, melting point 2852°C. Transparent in visible and IR (0.3–8 μm). Excellent electrical insulator. Used as furnace lining, thermal insulator, IR window, and substrate. Low-Z — transparent to X-rays and gamma. Reflective powder (white).",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","refractor"],visible:["transparent","refractor","reflector"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"sio2",formula:"SiO₂",name:"Silica (Quartz)",category:"oxide",density:2.65,elements:["Si","O"],p:0,
  notes:"Foundation of glass and fiber optics. Crystalline quartz is piezoelectric. Transparent 160 nm – 4 μm (deep UV to mid-IR). Used in optical fibers (IR conductor), UV windows, frequency standards. Amorphous form = fused silica. Extremely low thermal expansion.",
  bands:{radio:["insulator"],microwave:["insulator","transparent"],infrared:["transparent","refractor"],visible:["transparent","refractor"],ultraviolet:["transparent","refractor"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"tio2",formula:"TiO₂",name:"Titanium Dioxide",category:"oxide",density:4.23,elements:["Ti","O"],p:0,
  notes:"Highest refractive index of any common oxide (n=2.6). Bandgap 3.0–3.2 eV. Photocatalytic — breaks down organics under UV. Used as white pigment, sunscreen (UV absorber), photocatalyst, dielectric coating. Converts UV to heat.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["reflector","refractor"],ultraviolet:["absorber","converter"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"caf2",formula:"CaF₂",name:"Calcium Fluoride",category:"oxide",density:3.18,elements:["Ca","F"],p:0,
  notes:"Optical window material. Transparent 125 nm – 10 μm — broadest window of any common material (VUV through long-wave IR). Used in UV lithography optics, IR spectroscopy, telescope lenses. Low refractive index (1.43). Slightly soluble in water.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","refractor"],visible:["transparent","refractor"],ultraviolet:["transparent","refractor"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

// ── Magnetic Ceramics (Ferrites) ─────────────────────────────────────────
{id:"mnzn_ferrite",formula:"(Mn,Zn)Fe₂O₄",name:"MnZn Ferrite",category:"ferrite",density:4.8,elements:["Mn","Zn","Fe","O"],p:0,
  notes:"Soft ferrite — high permeability, low coercivity. Primary transformer core material for frequencies up to ~1 MHz. Strong microwave/radio absorber. Used in EMI suppression, inductors, power electronics. Electrically resistive (unlike metal cores).",
  bands:{radio:["absorber","conductor"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["resistor"],thermal:["insulator"],magnetic:["conductor"],neutron:["resistor"]}},

{id:"nizn_ferrite",formula:"(Ni,Zn)Fe₂O₄",name:"NiZn Ferrite",category:"ferrite",density:4.5,elements:["Ni","Zn","Fe","O"],p:0,
  notes:"Soft ferrite — higher resistivity than MnZn. Operates at higher frequencies (1–500 MHz). Primary material for RF chokes, antenna cores, EMI filters. Very high radio/microwave absorption. Electrically insulating — no eddy currents at RF.",
  bands:{radio:["absorber","conductor","insulator"],microwave:["absorber","converter"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["conductor"],neutron:["resistor"]}},

{id:"ba_ferrite",formula:"BaFe₁₂O₁₉",name:"Barium Ferrite",category:"ferrite",density:5.3,elements:["Ba","Fe","O"],p:0,
  notes:"Hard ferrite — permanent magnet material. Hexagonal crystal structure. High coercivity, moderate remanence. Used in permanent magnets, magnetic recording media, microwave absorbers. Very inexpensive. Chemically stable. Absorbs microwaves strongly.",
  bands:{radio:["absorber","resistor"],microwave:["absorber","converter","resistor"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["conductor"],neutron:["transparent"]}},

{id:"sr_ferrite",formula:"SrFe₁₂O₁₉",name:"Strontium Ferrite",category:"ferrite",density:5.1,elements:["Sr","Fe","O"],p:0,
  notes:"Hard ferrite — similar to barium ferrite but slightly higher coercivity. Used in refrigerator magnets, loudspeakers, motors, magnetic separators. Very low cost. Permanent magnet. Strong microwave absorption.",
  bands:{radio:["absorber","resistor"],microwave:["absorber","converter","resistor"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["conductor"],neutron:["transparent"]}},

// ── Semiconductors — Gamma→Light→Electricity Conversion Chain ────────────
// Tier 1: Direct gamma/xray detectors (skip scintillator step)
{id:"cdte",formula:"CdTe",name:"Cadmium Telluride",category:"semiconductor",density:5.85,elements:["Cd","Te"],p:0,
  notes:"Room-temperature gamma/X-ray detector. Bandgap 1.44 eV (860nm). Direct conversion — no scintillator needed. CdTe solar cells are also the dominant thin-film PV technology. Medium-high Z gives good stopping power for gamma.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","converter"],visible:["absorber","converter"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],electron:["resistor","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["insulator"]}},

{id:"czt",formula:"Cd₀.₉Zn₀.₁Te",name:"Cadmium Zinc Telluride (CZT)",category:"semiconductor",density:5.78,elements:["Cd","Zn","Te"],p:0,
  notes:"Improved CdTe — Zn addition increases resistivity and bandgap (1.57 eV, tunable). Best energy resolution of room-temperature gamma detectors. Used in medical imaging (SPECT), nuclear security, astrophysics. Higher cost than CdTe but superior spectral performance.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["absorber","converter"],ultraviolet:["absorber","converter"],xray:["absorber","converter"],gamma:["absorber","converter"],electron:["resistor"],thermal:["insulator"],magnetic:["resistor"],neutron:["insulator"]}},

{id:"hgi2",formula:"HgI₂",name:"Mercuric Iodide",category:"semiconductor",density:6.36,elements:["Hg","I"],p:0,
  notes:"Highest stopping power of any room-temperature semiconductor detector. Z: Hg=80, I=53. Bandgap 2.13 eV (582nm). Fragile layered crystal — research-grade, not widely deployed. Red crystal, absorbs blue/green, transmits red/yellow. Excellent gamma energy resolution but difficult to grow large crystals.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["absorber","converter","transparent"],ultraviolet:["absorber"],xray:["absorber","converter"],gamma:["absorber","converter"],electron:["resistor"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber"]}},

// Tier 2: Scintillator-to-PV bridge (gamma→light→electricity)
{id:"gaas",formula:"GaAs",name:"Gallium Arsenide",category:"semiconductor",density:5.32,elements:["Ga","As"],p:0,
  notes:"Direct bandgap 1.42 eV (873nm) — highest single-junction solar efficiency. THE microwave semiconductor (MMICs, radar, satellite comms). High electron mobility. Space-grade radiation tolerance. In the gamma chain: converts scintillator visible/near-IR output to electricity.",
  bands:{radio:["insulator","converter"],microwave:["converter","resistor"],infrared:["transparent","converter"],visible:["absorber","converter"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["resistor"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"ingap",formula:"InGaP",name:"Indium Gallium Phosphide",category:"semiconductor",density:4.47,elements:["In","Ga","P"],p:0,
  notes:"Bandgap ~1.9 eV (653nm) — optimized for green/yellow photon conversion. Top cell in multi-junction solar stacks (InGaP/GaAs/Ge). Matches emission wavelength of NaI(Tl) (415nm) and LYSO:Ce (420nm) scintillators. Lattice-matched to GaAs. In the gamma chain: captures scintillator output at peak efficiency.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["absorber","converter"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber"]}},

{id:"gap",formula:"GaP",name:"Gallium Phosphide",category:"semiconductor",density:4.14,elements:["Ga","P"],p:0,
  notes:"Bandgap 2.26 eV (549nm) — green wavelength. Indirect bandgap limits absorption efficiency but matches green-emitting scintillators. Used in green/yellow LEDs. Transparent to red and IR. In the gamma chain: alternative PV converter for green scintillator output.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent"],visible:["converter","transparent"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],electron:["resistor"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},

// Tier 3: Radiation-hard (survives in gamma environment)
{id:"gan",formula:"GaN",name:"Gallium Nitride",category:"semiconductor",density:6.15,elements:["Ga","N"],p:0,
  notes:"Wide bandgap 3.4 eV (365nm) — UV converter and detector. Extremely radiation hard. High-power microwave amplifiers (GaN HEMTs replacing GaAs in radar/5G). Blue/UV LED and laser source. Operates at high temperature. In the gamma chain: power electronics that survive the reactor environment + UV detection.",
  bands:{radio:["insulator"],microwave:["converter","resistor"],infrared:["transparent"],visible:["transparent"],ultraviolet:["absorber","converter"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},

// ── Thermoelectrics — Thermal→Electric Conversion (Seebeck Effect) ───────
// Role logic:
//   These are narrow-to-mid bandgap semiconductors. Their PRIMARY function
//   (thermal→electric via Seebeck effect) operates in the non-EM thermal domain.
//   EM band classifications reflect what each material does with photons:
//   - IR "converter" = documented IR photodetector/photoconductor (not all qualify)
//   - High-Z compounds (Bi, Pb, Sb, Sn, Te) absorb gamma per Z>40 rule
//   - Low-Z compounds (Si, Ge, Mg) are gamma/X-ray transparent
//   Notes field documents thermoelectric properties (ZT, temp range, Seebeck coeff).

{id:"bi2te3",formula:"Bi₂Te₃",name:"Bismuth Telluride",category:"thermoelectric",density:7.86,elements:["Bi","Te"],p:0,
  notes:"THE reference thermoelectric. ZT~1 near 300 K. Seebeck coefficient ~200 μV/K. Used in Peltier coolers and waste-heat generators since the 1950s. Narrow bandgap 0.15 eV. Layered van der Waals crystal — cleavable like mica. Also a topological insulator (surface states conduct without backscattering). High-Z (Bi=83, Te=52) makes it a gamma/X-ray absorber — dual-purpose: thermal conversion + radiation absorption. Primary SE Cell thermal converter at low-to-moderate temperatures.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"pbte",formula:"PbTe",name:"Lead Telluride",category:"thermoelectric",density:8.16,elements:["Pb","Te"],p:0,
  notes:"Mid-temperature thermoelectric (500–900 K). ZT~1.5+ with nanostructuring. Bandgap 0.32 eV. Also a sensitive IR photodetector (3–30 μm). Used in RTGs for space missions alongside SiGe. Highest-Z common thermoelectric (Pb=82, Te=52). Rock-salt crystal structure. 8.16 g/cm³ density provides substantial gamma/X-ray shielding — dual-purpose thermal converter + radiation shield. Powers deep-space probes.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"sige",formula:"SiGe",name:"Silicon Germanium",category:"thermoelectric",density:3.5,elements:["Si","Ge"],p:0,
  notes:"THE high-temperature thermoelectric (>900 K). Powers Voyager, Curiosity, and Perseverance RTGs — proven 40+ year space heritage in nuclear-decay-powered devices (Pu-238). ZT~0.9 at 1300 K. Bandgap ~0.7–1.1 eV (tunable with Si:Ge ratio). Radiation hard. Low density (3.5 g/cm³). Abundant elements. The only thermoelectric proven in a radioisotope thermal generator — directly relevant to both SE Cell and reactor waste-heat recovery at the highest temperatures.",
  bands:{radio:["insulator","resistor"],microwave:["resistor"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["resistor","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"cosb3",formula:"CoSb₃",name:"Cobalt Antimonide (Skutterudite)",category:"thermoelectric",density:7.64,elements:["Co","Sb"],p:0,
  notes:"Skutterudite crystal structure — open cage that can be 'filled' with rare-earth atoms (La, Ce, Yb) to scatter phonons and boost ZT from ~0.5 to ~1.7. Mid-temperature range (500–800 K). The cage-filling mechanism is unique: guest atoms rattle inside voids, disrupting heat conduction without affecting electrical conduction. Represents an engineered approach — tuning thermal properties by inserting atoms into a crystal cage.",
  bands:{radio:["insulator"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"snse",formula:"SnSe",name:"Tin Selenide",category:"thermoelectric",density:6.18,elements:["Sn","Se"],p:0,
  notes:"Record-breaking ZT~2.6 in single crystals at 923 K (2014, Zhao et al.). Earth-abundant, non-toxic. Layered orthorhombic crystal. Ultra-low thermal conductivity from strong anharmonic bonding — phonons scatter against each other rather than carrying heat. Bandgap ~0.86 eV. Also an IR photodetector. Represents a different physics mechanism (anharmonicity) than traditional thermoelectrics. Promising for next-gen SE Cell designs.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"bi2se3",formula:"Bi₂Se₃",name:"Bismuth Selenide",category:"thermoelectric",density:6.82,elements:["Bi","Se"],p:0,
  notes:"Thermoelectric AND topological insulator — surface states conduct electricity without backscattering, protected by time-reversal symmetry. Bandgap 0.3 eV. ZT~0.5–1.0. Layered crystal like Bi₂Te₃ but with wider bandgap. High Z (Bi=83) gives gamma absorption. The topological surface states create dissipationless conduction channels that may enable new energy conversion mechanisms beyond conventional Seebeck effect.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"mg2si",formula:"Mg₂Si",name:"Magnesium Silicide",category:"thermoelectric",density:1.99,elements:["Mg","Si"],p:0,
  notes:"Lightest thermoelectric — density only 1.99 g/cm³. Made entirely from earth-abundant, non-toxic elements. ZT~1.0 at 500–800 K. Antifluorite crystal structure. Bandgap 0.78 eV. Best power-to-weight ratio of any thermoelectric. Low Z (Mg=12, Si=14) means X-ray and gamma transparent — not a shielding material, but lightweight for portable or space-constrained SE Cell designs where mass matters more than shielding.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"gete",formula:"GeTe",name:"Germanium Telluride",category:"thermoelectric",density:6.14,elements:["Ge","Te"],p:0,
  notes:"High-temperature thermoelectric, ZT~2.0+ at 700 K in GeTe-based alloys. Also a phase-change material — reversible crystal↔amorphous transitions alter all optical and electrical properties. Used in optical data storage and PCM memory. Ferroelectric below 700 K. Bandgap ~0.6 eV. Dual-purpose: thermal conversion + switchable material properties. The phase-change capability means a single material can be toggled between transparent and absorbing states.",
  bands:{radio:["insulator"],microwave:["insulator","resistor"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"tinisn",formula:"TiNiSn",name:"Titanium Nickel Tin (Half-Heusler)",category:"thermoelectric",density:7.15,elements:["Ti","Ni","Sn"],p:0,
  notes:"Half-Heusler intermetallic — ordered crystal with natural atomic vacancies that scatter phonons. ZT~1.0–1.5 at 500–900 K. Mechanically robust (unlike layered chalcogenides). Radiation hard. High melting point (~1500 K). Bandgap ~0.5 eV. The structural class has half its atomic sites empty, creating built-in phonon scattering. Survives harsh reactor environments where fragile Bi₂Te₃ or SnSe would fail. The reactor-grade thermoelectric.",
  bands:{radio:["insulator"],microwave:["absorber"],infrared:["absorber","converter"],visible:["absorber"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["resistor","converter"],thermal:["insulator","converter"],magnetic:["absorber"],neutron:["resistor"]}},

// ── Structural / Thermal Ceramics — Reactor & SE Cell Infrastructure ─────
// These are the structural bones and thermal plumbing of both designs.
// Role logic:
//   Electrically insulating ceramics → radio/microwave insulator (unless conductive like WC)
//   Optical windows → visible/IR/UV transparent + refractor where documented
//   High-Z ceramics (W, Hf, Ba) → gamma/xray absorber per Z>40 rule
//   Low-Z ceramics (Be, B, Si, Mg, Al) → gamma/xray transparent
//   Neutron behavior noted in notes (not an EM band but critical for reactor design)

{id:"beo",formula:"BeO",name:"Beryllium Oxide",category:"ceramic",density:3.01,elements:["Be","O"],p:0,
  notes:"Exceptional thermal conductor for a ceramic (330 W/mK — rivals metals) while being an electrical insulator. Used as neutron moderator/reflector in research reactors (Be reflects neutrons efficiently). Transparent 200 nm – 8 μm (deep UV through mid-IR). Bandgap 10.6 eV. Microwave window material. Used in high-power electronics substrates and reactor neutron reflectors. TOXIC as dust — handling requires controls. Triple role: thermal conductor + electrical insulator + neutron moderator.",
  bands:{radio:["insulator"],microwave:["transparent"],infrared:["transparent","refractor"],visible:["transparent","refractor"],ultraviolet:["transparent"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["conductor"],magnetic:["resistor"],neutron:["transparent","reflector","refractor"]}},

{id:"hbn",formula:"h-BN",name:"Hexagonal Boron Nitride",category:"ceramic",density:2.1,elements:["B","N"],p:0,
  notes:"'White graphite' — layered crystal with extreme anisotropy. In-plane thermal conductivity up to 400 W/mK (rivals copper); through-plane ~30 W/mK. Electrical insulator in all directions. Neutron absorber via ¹⁰B content. Lubricant to 900°C in air, 2000°C in inert atmosphere. Bandgap ~6 eV. Transparent to microwave. Cubic phase (c-BN) is the second hardest material after diamond. In the reactor: thermal conductor that also absorbs stray neutrons — dual function.",
  bands:{radio:["insulator"],microwave:["transparent"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["resistor"],neutron:["absorber"]}},

{id:"si3n4",formula:"Si₃N₄",name:"Silicon Nitride",category:"ceramic",density:3.17,elements:["Si","N"],p:0,
  notes:"Premier structural ceramic for extreme environments. Exceptional thermal shock resistance (survives rapid heating/cooling that shatters Al₂O₃). Fracture toughness 6–8 MPa·m½ — toughest non-composite ceramic. Low thermal expansion (3.3 ppm/K). Used in turbine blades, bearings, cutting tools, engine components. Bandgap ~5 eV. Transparent to near-IR in thin films. Low-Z = radiation-transparent. The reactor structural material where thermal shock is the dominant failure mode.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"yag",formula:"Y₃Al₅O₁₂",name:"Yttrium Aluminum Garnet (YAG)",category:"ceramic",density:4.56,elements:["Y","Al","O"],p:0,
  notes:"THE laser host crystal. Nd:YAG converts pump light (808 nm) to coherent 1064 nm IR — the most widely used solid-state laser. Ce:YAG converts blue (460 nm) to broadband yellow — the phosphor in white LEDs. Undoped: transparent 210 nm – 5.5 μm. Garnet crystal structure = mechanically tough, thermally stable. Used in laser surgery, industrial cutting, defense, LED lighting. The material that makes lasers work. In the SE framework: optical-band converter host.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","refractor","converter"],visible:["transparent","refractor","converter"],ultraviolet:["transparent"],xray:["absorber"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["absorber"],neutron:["transparent"]}},

{id:"wc",formula:"WC",name:"Tungsten Carbide",category:"ceramic",density:15.63,elements:["W","C"],p:0,
  notes:"Densest common engineering ceramic (15.63 g/cm³ — denser than uranium metal). Electrically conductive (metallic behavior). Extremely hard (9–9.5 Mohs). Melting point 2870°C. W (Z=74) gives powerful gamma/X-ray absorption — comparable stopping power to lead at half the toxicity. Used in cutting tools, armor-piercing rounds, drilling. In the reactor: structural gamma shielding that carries mechanical loads — shielding and structure in one material.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber"],electron:["conductor"],thermal:["conductor"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"hfo2",formula:"HfO₂",name:"Hafnium Oxide (Hafnia)",category:"ceramic",density:9.68,elements:["Hf","O"],p:0,
  notes:"Hafnium: the reactor control element. Hf thermal neutron capture cross-section ~104 barns — used in Navy submarine reactor control rods. HfO₂ melting point 2758°C. Bandgap 5.7 eV — transparent in visible, used as high-refractive-index optical coating (n≈2.0). Highest dielectric constant of any binary oxide (high-k gate dielectric in every modern CPU). Density 9.68 g/cm³. In the reactor: neutron absorber + gamma absorber (Z=72) + thermal barrier. Triple nuclear function.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent","refractor"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["absorber"]}},

{id:"zrb2",formula:"ZrB₂",name:"Zirconium Diboride",category:"ceramic",density:6.09,elements:["Zr","B"],p:0,
  notes:"Ultra-high temperature ceramic (UHTC) — melting point 3246°C, highest of any boride. Electrically conductive (metallic). Oxidation resistant at extreme temperatures. Used in hypersonic vehicle leading edges, rocket nozzles, next-gen nuclear thermal protection. Combines Zr (neutron-transparent) with B (neutron-absorbing via ¹⁰B). Very hard. Low thermal expansion. In the reactor: extreme-temperature structural ceramic for regions near the core where nothing else survives.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["conductor"],thermal:["conductor"],magnetic:["absorber"],neutron:["absorber"]}},

{id:"spinel",formula:"MgAl₂O₄",name:"Magnesium Aluminate Spinel",category:"ceramic",density:3.58,elements:["Mg","Al","O"],p:0,
  notes:"Transparent ceramic armor — ballistic protection while allowing optical transmission. Transparent 200 nm – 5.5 μm (UV through mid-IR). Harder than glass, tougher than sapphire. Cubic crystal = optically isotropic (no birefringence). Used in military vehicle windows, spacecraft optics, IR domes. Radiation hard — maintains transparency under neutron and gamma irradiation. Low-Z = X-ray/gamma transparent. In the SE Cell: optical window material that survives the radiation environment without darkening.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["transparent","refractor"],visible:["transparent","refractor"],ultraviolet:["transparent"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["resistor"],magnetic:["resistor"],neutron:["transparent"]}},

// ── Polymers / Plastics — Radiation-Environment Organic Materials ─────────
// Role logic:
//   Polymers are electrical insulators (radio/MW insulator) unless conductive.
//   Most are IR absorbers (C-H, C-O, C-N stretch bands) unless specifically IR-transparent.
//   All are low-Z → gamma and X-ray transparent (except when very thick).
//   Key value: flexible, lightweight, conformable shapes that ceramics/metals can't achieve.
//   FILTER: only polymers with distinct energy control roles in radiation environments.
//   PTFE/Teflon deliberately excluded — degrades rapidly under gamma irradiation.

{id:"kapton",formula:"C₂₂H₁₀N₂O₅",name:"Kapton (Polyimide Film)",category:"polymer",density:1.42,elements:["C","H","N","O"],p:0,
  notes:"THE radiation-hard polymer — survives >10 MGy (10,000× typical polymer limit). Flexible electrical insulator from -269°C to +400°C. Used in every nuclear and space application requiring flexible wiring insulation, circuit substrates, thermal blankets. Amber-colored = absorbs blue/UV, transmits yellow-red. Thermal conductivity only 0.12 W/mK — excellent thermal insulator. In the SE Cell: flexible wiring insulation and circuit substrate that survives the radiation environment indefinitely. In the reactor: instrument wiring insulation.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent","absorber"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor","refractor"]}},

{id:"peek",formula:"C₁₉H₁₂O₃",name:"PEEK (Polyether Ether Ketone)",category:"polymer",density:1.30,elements:["C","H","O"],p:0,
  notes:"Highest-performance engineering thermoplastic. Continuous service to 260°C. Radiation resistant to ~1 MGy. Mechanically strong (tensile 100 MPa), self-lubricating, chemically inert. Replaces metal in bearings, seals, structural bushings in radiation environments. Semi-crystalline — properties degrade gracefully rather than catastrophically under radiation. In the reactor: structural seals, valve seats, bearing surfaces where metal-on-metal friction generates particles that contaminate coolant.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor","refractor"]}},

{id:"pvt_scint",formula:"C₉H₁₀ + fluors",name:"Plastic Scintillator (PVT)",category:"polymer",density:1.03,elements:["C","H"],p:0,
  notes:"Polyvinyltoluene base + wavelength-shifting fluors. Converts beta particles and fast neutrons to visible light (typically 425 nm blue). Response time 2–3 ns — fastest scintillator class. Can be cast into any shape: sheets, fibers, large-area panels. Fiber form pipes scintillation light via total internal reflection to remote photovoltaics. Used in portal monitors, neutrino detectors, health physics. Low-Z means gamma-transparent (poor gamma detection) — but excellent for beta and fast neutrons. In the SE Cell: beta→visible converter layer.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent","converter"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["refractor"]}},

{id:"pvdf",formula:"(CH₂CF₂)ₙ",name:"PVDF (Polyvinylidene Fluoride)",category:"polymer",density:1.78,elements:["C","H","F"],p:0,
  notes:"Piezoelectric polymer — d₃₃ ~30 pC/N (lower than PZT's 600 but flexible). Converts mechanical stress↔electricity and thermal changes→electricity (pyroelectric). Can be formed into thin flexible films, coatings, fibers. Used in hydrophones, ultrasonic transducers, vibration energy harvesters, IR motion sensors. The flexible version of BaTiO₃ — wraps around curved surfaces where ceramics crack. Moderate radiation tolerance. In the SE Cell: flexible thermal→electrical converter film on non-flat surfaces.",
  bands:{radio:["insulator","converter"],microwave:["insulator"],infrared:["absorber","converter"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator","converter"],thermal:["insulator"],magnetic:["resistor"],neutron:["transparent"]}},

{id:"silicone",formula:"(SiO(CH₃)₂)ₙ",name:"Silicone Rubber (PDMS)",category:"polymer",density:1.15,elements:["Si","O","C","H"],p:0,
  notes:"Flexible thermal insulator and sealant, -60°C to +300°C. Si-O backbone more radiation-resistant than C-C polymers (~1 MGy). Used in reactor gaskets, O-rings, electrical potting, conformal coatings, flexible thermal insulation. Optically transparent to visible and near-IR when unfilled. Thermal conductivity 0.15–0.30 W/mK. Conforms to complex geometries. In the reactor: flexible seals that maintain integrity under radiation. In the SE Cell: encapsulant and thermal management layer between conversion surfaces.",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["resistor","refractor"]}},

{id:"parylene",formula:"(C₈H₈)ₙ",name:"Parylene (Poly-p-xylylene)",category:"polymer",density:1.11,elements:["C","H"],p:0,
  notes:"Vapor-deposited conformal coating — coats every surface uniformly including inside crevices, sharp edges, and porous substrates. Pinhole-free at 1 μm thickness. Excellent moisture barrier, electrical insulator, chemical inert. Radiation tolerant to ~10 MGy (rivals Kapton). Used to protect sensitive electronics, MEMS, implanted medical devices, and detector assemblies from corrosion and moisture. In the SE Cell: protects photovoltaic and semiconductor surfaces from environmental degradation without blocking incoming radiation (thin enough to be transparent to gamma, X-ray, and most visible light).",
  bands:{radio:["insulator"],microwave:["insulator"],infrared:["absorber"],visible:["transparent"],ultraviolet:["absorber"],xray:["transparent"],gamma:["transparent"],electron:["insulator"],thermal:["insulator"],magnetic:["resistor"],neutron:["refractor"]}},

// ── Alloys — Engineered Metals for Reactor & SE Cell ─────────────────────
// Role logic:
//   Metals are radio conductors (unless high resistivity → resistor).
//   Polished alloys reflect MW/IR/Vis. Oxidized or dark alloys absorb.
//   Gamma: follows dominant constituent element's Z behavior.
//   FILTER: only alloys where the combination creates energy control properties
//   that the parent elements alone don't provide. Generic steel excluded.
//   Densimet (W-Ni-Fe) and Mu-Metal already in Shielding category.

{id:"zircaloy",formula:"Zr-Sn-Fe-Cr",name:"Zircaloy-4",category:"alloy",density:6.56,elements:["Zr","Sn","Fe","Cr"],p:0,
  notes:"THE nuclear fuel cladding alloy — chosen specifically for its near-transparency to thermal neutrons (Zr σ = 0.18 barns). Contains 98.2% Zr + small Sn/Fe/Cr additions for corrosion resistance. Melts at 1850°C. Every commercial light water reactor in the world wraps its fuel in Zircaloy. The neutron economy depends on it — if cladding absorbed neutrons, the chain reaction would require more enrichment. In the reactor: the layer between UO₂ fuel and coolant water. Gamma-transparent at Z≈40.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["transparent"],electron:["conductor"],thermal:["resistor"],magnetic:["absorber"],neutron:["transparent"]}},

{id:"ss316l",formula:"Fe-Cr₁₇-Ni₁₂-Mo₂",name:"Stainless Steel 316L",category:"alloy",density:8.0,elements:["Fe","Cr","Ni","Mo"],p:0,
  notes:"Standard austenitic stainless for reactor pressure vessels, piping, and structural internals. Low carbon (L) prevents sensitization under radiation. Excellent corrosion resistance in water, acids, and high-temperature steam. Non-magnetic (austenitic). Survives neutron fluences >10²² n/cm². Weldable. In the reactor: pressure boundary, coolant piping, internal structure. Not chosen for energy conversion — chosen because everything else corrodes, cracks, or activates. The reactor's skeleton.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector","absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber","resistor"],electron:["conductor"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"inconel718",formula:"Ni₅₃-Cr₁₉-Fe₁₈-Mo₃-Nb₅",name:"Inconel 718",category:"alloy",density:8.19,elements:["Ni","Cr","Fe","Mo","Nb"],p:0,
  notes:"Superalloy — maintains strength to 700°C where stainless steel fails. Precipitation-hardened (γ' and γ'' phases). Used in reactor vessel bolting, core barrel, jet engine turbine disks, nuclear waste containers. Creep-resistant under radiation at elevated temperatures. More expensive than SS316L but required where thermal cycling and high stress combine. In the reactor: fasteners, springs, and structural members in the hottest zones. In the SE Cell: structural frame for high-temperature variants.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["conductor"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"nichrome",formula:"Ni₈₀Cr₂₀",name:"Nichrome",category:"alloy",density:8.4,elements:["Ni","Cr"],p:0,
  notes:"THE resistive heating alloy — converts electricity→thermal energy at any desired power level. Resistivity 1.1 μΩ·m (60× copper). Survives continuous operation at 1200°C in air. Forms stable Cr₂O₃ protective oxide. Used in heating elements, resistors, thermocouples. In the framework: a dedicated electrical→thermal CONVERTER — the reverse direction of thermoelectrics. Combined with thermoelectrics, creates a bidirectional thermal↔electrical bridge. Not a reactor structural material — an energy conversion tool.",
  bands:{radio:["conductor","resistor"],microwave:["reflector","resistor"],infrared:["absorber","converter"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["conductor","converter"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"nitinol",formula:"NiTi",name:"Nitinol (Shape Memory Alloy)",category:"alloy",density:6.45,elements:["Ni","Ti"],p:0,
  notes:"Shape memory effect: deforms below transition temperature, snaps back to original shape when heated past it (50–80°C, tunable). Converts thermal energy→mechanical motion directly with no external power source. Also superelastic — 8% recoverable strain (10× steel). Used in medical stents, actuators, satellite deployment mechanisms, thermal valves. In the SE Cell: passive thermal→mechanical actuator for self-regulating louvers, thermal switches, and deployment mechanisms. Operates without electronics — pure thermal control.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["conductor"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},

{id:"cuw",formula:"Cu-W",name:"Copper Tungsten Composite",category:"alloy",density:15.5,elements:["Cu","W"],p:0,
  notes:"Not a true alloy — Cu and W are immiscible. Made by sintering/infiltrating W skeleton with molten Cu. Combines Cu thermal conductivity (400 W/mK) with W gamma shielding (Z=74) and high melting point. Density 14–17 g/cm³ (tunable by Cu:W ratio). Used in electrical contacts, EDM electrodes, heat sinks, plasma-facing components. In the reactor: thermal conductor THROUGH a gamma shield layer — solves the problem of extracting waste heat from shielding without creating a radiation leak. The bridge material between the shield and the thermoelectric converter.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["reflector","conductor"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber","insulator"],gamma:["absorber","insulator"],electron:["conductor"],thermal:["conductor"],magnetic:["resistor"],neutron:["resistor"]}},

{id:"invar",formula:"Fe₆₄Ni₃₆",name:"Invar (FeNi36)",category:"alloy",density:8.05,elements:["Fe","Ni"],p:0,
  notes:"Near-zero thermal expansion (1.2 ppm/K vs 12 for steel) from 0–230°C. Critical where dimensional stability matters under temperature changes: precision laser mounts, telescope structures, shadow masks, bimetallic strip components. In the SE Cell: structural frame that holds optical converters in precise alignment as temperature fluctuates. If the scintillator-to-PV gap shifts by microns due to thermal expansion, conversion efficiency drops. Invar prevents that.",
  bands:{radio:["conductor"],microwave:["reflector","absorber"],infrared:["absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber","resistor"],electron:["conductor"],thermal:["resistor"],magnetic:["conductor"],neutron:["resistor"]}},

{id:"hastelloy",formula:"Ni₅₇-Mo₁₆-Cr₁₅-W₄-Fe₅",name:"Hastelloy C-276",category:"alloy",density:8.89,elements:["Ni","Mo","Cr","W","Fe"],p:0,
  notes:"THE molten salt reactor alloy — resists corrosion by fluoride and chloride salts at 700°C+. Originally developed for MSRE (Oak Ridge, 1960s). Also resists sulfuric, hydrochloric, and nitric acids. Used in chemical processing, flue gas desulfurization, and next-gen nuclear (MSR, LFTR). W content (4%) adds some gamma attenuation beyond pure Ni alloys. In the reactor: primary loop piping and vessel for molten salt designs. The material that makes Gen IV reactors possible.",
  bands:{radio:["conductor"],microwave:["reflector"],infrared:["absorber"],visible:["reflector"],ultraviolet:["absorber"],xray:["absorber"],gamma:["absorber"],electron:["conductor"],thermal:["resistor"],magnetic:["absorber"],neutron:["resistor"]}},
];

// ── Phase 4: Isotope Data ────────────────────────────────────────────────

const ISOTOPE_CATEGORIES = [
  { id:"mossbauer", name:"Mössbauer Active", desc:"Nuclear resonance absorption/emission — potential gamma reflectors/refractors", color:"#E9C46A" },
  { id:"nuclear_optical", name:"Nuclear Optical", desc:"Nuclear transitions accessible to optical/UV photonics — the bridge between electronic and nuclear control", color:"#00CED1" },
  { id:"fission", name:"Fission / Fertile", desc:"Fissile or fertile isotopes — gamma source and neutron interaction", color:"#E63946" },
  { id:"neutron", name:"Neutron Active", desc:"Exceptionally high or low neutron capture cross-section", color:"#2A9D8F" },
  { id:"contrast", name:"Contrasting Pairs", desc:"Same element, different isotope — dramatically different nuclear behavior", color:"#7B68EE" },
  { id:"decay_source", name:"Decay Sources", desc:"Radioisotopes selected for energy output profile — SE Cell fuel candidates", color:"#E76F51" },
];

/*
 * Isotope data structure:
 *   symbol     — element symbol
 *   A          — mass number (protons + neutrons)
 *   Z          — atomic number (protons)
 *   N          — neutron count (A - Z, computed)
 *   name       — display name e.g. "Iron-57"
 *   halfLife    — "stable" or duration string
 *   spin       — ground state nuclear spin (e.g. "1/2", "0", "5/2")
 *   category   — matches ISOTOPE_CATEGORIES id (primary reason for inclusion)
 *   mossbauer  — if Mössbauer active: { energy: keV, linewidth: description }
 *   decay      — if decay source: { type, specificPower (W/g), emittedBands[], production }
 *   neutronXS  — thermal neutron capture cross-section in barns (σ)
 *   abundance  — natural abundance % (0 if synthetic/radioactive)
 *   gammaRole  — how this isotope interacts with gamma: "resonant", "absorber", "transparent", "emitter", "converter"
 *   notes      — key properties and why this isotope matters
 */

const ISOTOPES = [
// ── Mössbauer Active — Nuclear Resonance (proto-gamma reflectors) ────────
{symbol:"Fe",A:57,Z:26,name:"Iron-57",halfLife:"stable",spin:"1/2",category:"mossbauer",
  mossbauer:{energy:14.4,note:"Strongest known Mössbauer effect. Recoil-free fraction ~0.92 at room temp."},
  neutronXS:2.48,abundance:2.12,gammaRole:"resonant",
  notes:"THE Mössbauer isotope. Absorbs and coherently re-emits 14.4 keV gamma with extreme energy precision (~5 neV linewidth). This IS nuclear-level gamma reflection at one specific energy. 2.12% natural abundance. Source: Co-57 decay. The resonant cross-section (σ₀ = 2.57×10⁻¹⁸ cm²) is 100× larger than the atomic electron cross-section — the nucleus dominates the interaction."},

{symbol:"Sn",A:119,Z:50,name:"Tin-119",halfLife:"stable",spin:"1/2",category:"mossbauer",
  mossbauer:{energy:23.9,note:"Second most-used Mössbauer isotope. Studies oxidation states of tin."},
  neutronXS:2.2,abundance:8.59,gammaRole:"resonant",
  notes:"Second most commonly studied Mössbauer isotope after Fe-57. Resonance at 23.9 keV. Higher natural abundance (8.59%) than Fe-57. Used to study tin chemistry, superconductors, and tin-containing minerals."},

{symbol:"Ir",A:193,Z:77,name:"Iridium-193",halfLife:"stable",spin:"3/2",category:"mossbauer",
  mossbauer:{energy:73.0,note:"Higher-energy Mössbauer. Rudolf Mössbauer's original discovery was in Ir-191."},
  neutronXS:111,abundance:62.7,gammaRole:"resonant",
  notes:"Historically significant — Mössbauer discovered the effect in Ir-191 (also Mössbauer active at 129 keV). Ir-193 resonance at 73 keV is closer to fission-relevant gamma energies than Fe-57's 14.4 keV. High Z (77) means strong electron-level gamma interaction too."},

{symbol:"Au",A:197,Z:79,name:"Gold-197",halfLife:"stable",spin:"3/2",category:"mossbauer",
  mossbauer:{energy:77.3,note:"Only stable gold isotope. Mössbauer resonance at 77.3 keV."},
  neutronXS:98.65,abundance:100,gammaRole:"resonant",
  notes:"100% natural abundance (monoisotopic). Mössbauer resonance at 77.3 keV — well into the gamma range relevant to nuclear applications. Au is already an X-ray reflector; nuclear resonance adds a gamma-specific interaction channel."},

{symbol:"W",A:182,Z:74,name:"Tungsten-182",halfLife:"stable",spin:"0",category:"mossbauer",
  mossbauer:{energy:100.1,note:"Highest-energy commonly studied Mössbauer transition."},
  neutronXS:20.7,abundance:26.5,gammaRole:"resonant",
  notes:"Mössbauer resonance at 100.1 keV — the highest energy among commonly studied isotopes, approaching low-end fission gamma energies. W is already used for gamma shielding (very high density, 19.3 g/cm³). Nuclear resonance at this energy is significant for gamma optics research."},

{symbol:"Eu",A:151,Z:63,name:"Europium-151",halfLife:"stable",spin:"5/2",category:"mossbauer",
  mossbauer:{energy:21.5,note:"Used for studying rare-earth compounds and magnetic ordering."},
  neutronXS:9200,abundance:47.8,gammaRole:"resonant",
  notes:"Mössbauer active at 21.5 keV. Also has an exceptionally high neutron capture cross-section (9,200 barns). Dual nuclear interaction: resonant with specific gamma AND strong neutron absorber. Used in nuclear control and Mössbauer studies of magnetic materials."},

{symbol:"Gd",A:155,Z:64,name:"Gadolinium-155",halfLife:"stable",spin:"3/2",category:"mossbauer",
  mossbauer:{energy:86.5,note:"Mössbauer active at 86.5 keV AND 105 keV — two resonances."},
  neutronXS:61000,abundance:14.8,gammaRole:"resonant",
  notes:"Remarkable isotope: Mössbauer active at 86.5 keV (and 105 keV) — higher gamma energies — AND one of the strongest neutron absorbers known (61,000 barns). Sits at the intersection of gamma resonance and neutron control. Dual nuclear interaction capability."},

{symbol:"Dy",A:161,Z:66,name:"Dysprosium-161",halfLife:"stable",spin:"5/2",category:"mossbauer",
  mossbauer:{energy:25.7,note:"Mössbauer active. Dy has highest magnetic moment of any element."},
  neutronXS:600,abundance:18.9,gammaRole:"resonant",
  notes:"Mössbauer active at 25.7 keV. Dysprosium has the highest magnetic susceptibility of any element. High neutron capture cross-section. The combination of nuclear resonance and extreme magnetic properties is unique."},

{symbol:"Pt",A:195,Z:78,name:"Platinum-195",halfLife:"stable",spin:"1/2",category:"mossbauer",
  mossbauer:{energy:98.8,note:"High-energy Mössbauer. Used to study catalytic surfaces."},
  neutronXS:27.5,abundance:33.8,gammaRole:"resonant",
  notes:"Mössbauer resonance at 98.8 keV — near W-182 territory, approaching fission gamma range. Spin-1/2 gives simpler spectra. Used to study surface chemistry and catalysis. High Z (78) provides strong electron-level gamma absorption too."},

// ── Nuclear Optical — Bridge Between Electronic and Nuclear Control ───────
{symbol:"Th",A:229,Z:90,name:"Thorium-229",halfLife:"7,917 yr",spin:"5/2",category:"nuclear_optical",
  nuclearOptical:{energy:8.355733554021,wavelength:148.382,unit:"eV",note:"Lowest-energy nuclear transition known. First laser-controlled nuclear state (April 2024)."},
  neutronXS:54,abundance:0,gammaRole:"bridge",
  notes:"THE bridge isotope. Nuclear transition at only 8.36 eV (~148 nm UV) — a million times lower than typical nuclear transitions. In April 2024, researchers at PTB/TU Vienna excited this transition with a UV laser, achieving the first-ever laser control of a nuclear state. Solid-state nuclear clock demonstrated in CaF₂ crystal with 1 second accuracy over 300 billion years. This proves nuclear states CAN be controlled with the same tools we use for electrons. Produced from U-233 decay. Key difference from Mössbauer isotopes: those require synchrotrons or radioactive sources; Th-229 responds to tabletop lasers."},

// ── Fission / Fertile — Gamma Source Isotopes ────────────────────────────
{symbol:"U",A:235,Z:92,name:"Uranium-235",halfLife:"7.04×10⁸ yr",spin:"7/2",category:"fission",
  mossbauer:null,neutronXS:680.9,abundance:0.72,gammaRole:"emitter",
  notes:"THE fissile isotope. Thermal neutron fission cross-section ~585 barns. Fission produces 2-3 neutrons + fission fragments in excited nuclear states that emit gamma rays across a wide energy spectrum (prompt gamma: 0.1–10 MeV, average ~1 MeV). This is the primary gamma source the framework aims to control."},

{symbol:"U",A:238,Z:92,name:"Uranium-238",halfLife:"4.47×10⁹ yr",spin:"0",category:"fission",
  mossbauer:null,neutronXS:2.68,abundance:99.27,gammaRole:"absorber",
  notes:"Fertile isotope — does NOT fission with thermal neutrons (unlike U-235). Can capture fast neutrons to breed Pu-239. 99.27% of natural uranium. Spin-0 ground state = very different nuclear structure from U-235 despite only 3 fewer neutrons. Gamma absorber through electron interaction (Z=92) but not a gamma emitter in the same way as U-235."},

{symbol:"Pu",A:239,Z:94,name:"Plutonium-239",halfLife:"2.41×10⁴ yr",spin:"1/2",category:"fission",
  mossbauer:null,neutronXS:1017.3,abundance:0,gammaRole:"emitter",
  notes:"Fissile isotope — bred from U-238 by neutron capture. Higher fission cross-section than U-235 (747 barns). Produces gamma spectrum similar to U-235 fission but with different energy distribution. Entirely synthetic (abundance 0%). Key isotope in breeder reactor and weapons programs."},

{symbol:"Th",A:232,Z:90,name:"Thorium-232",halfLife:"1.40×10¹⁰ yr",spin:"0",category:"fission",
  mossbauer:null,neutronXS:7.37,abundance:100,gammaRole:"absorber",
  notes:"Fertile isotope — captures neutrons to breed U-233 (fissile). 100% natural abundance (monoisotopic). Thorium fuel cycle is an alternative to uranium. Spin-0 ground state like U-238. Lower gamma emission than fissile isotopes. High Z (90) makes it a gamma absorber through electron interaction."},

// ── Neutron Active — Extreme Cross-Sections ──────────────────────────────
{symbol:"B",A:10,Z:5,name:"Boron-10",halfLife:"stable",spin:"3",category:"neutron",
  mossbauer:null,neutronXS:3840,abundance:19.9,gammaRole:"transparent",
  notes:"Premier neutron absorber. ¹⁰B + n → ⁷Li + α (no gamma in 94% of reactions — clean absorption). Used in reactor control rods (as B₄C), boric acid in coolant, neutron detectors. TRANSPARENT to gamma — this is the critical distinction. Neutron absorber ≠ gamma absorber."},

{symbol:"B",A:11,Z:5,name:"Boron-11",halfLife:"stable",spin:"3/2",category:"contrast",
  mossbauer:null,neutronXS:0.005,abundance:80.1,gammaRole:"transparent",
  notes:"CONTRAST with B-10: same element, one extra neutron, neutron capture cross-section drops from 3,840 to 0.005 barns — a factor of 768,000×. Both are gamma-transparent. This is the most dramatic isotope contrast in the periodic table and demonstrates how neutron count transforms nuclear behavior."},

{symbol:"Gd",A:157,Z:64,name:"Gadolinium-157",halfLife:"stable",spin:"3/2",category:"neutron",
  mossbauer:null,neutronXS:259000,abundance:15.7,gammaRole:"absorber",
  notes:"HIGHEST thermal neutron capture cross-section of ANY stable isotope: 259,000 barns. 4× higher than its neighbor Gd-155 (61,000 barns) despite having only 2 more neutrons. Used in neutron imaging, MRI contrast agents, reactor burnable poisons. The neutron absorption produces gamma rays — it's a neutron→gamma CONVERTER at the nuclear level."},

{symbol:"Cd",A:113,Z:48,name:"Cadmium-113",halfLife:"stable",spin:"1/2",category:"neutron",
  mossbauer:null,neutronXS:20600,abundance:12.2,gammaRole:"absorber",
  notes:"Very high neutron absorber (20,600 barns). Used in reactor control rods and neutron shielding. 'Cadmium cutoff' (~0.5 eV) is a standard reference in neutron physics — Cd absorbs thermal neutrons almost completely but passes epithermal neutrons. Natural energy-selective neutron filter."},

{symbol:"Xe",A:135,Z:54,name:"Xenon-135",halfLife:"9.14 hr",spin:"3/2",category:"neutron",
  mossbauer:null,neutronXS:2650000,abundance:0,gammaRole:"transparent",
  notes:"Highest neutron capture cross-section known: 2.65 MILLION barns. Produced as fission product in reactors. The 'reactor poison' — if Xe-135 builds up faster than it's burned off, it can shut down a reactor (caused the Chernobyl disaster sequence). Radioactive, 9.14 hr half-life. Demonstrates how a single isotope's nuclear properties can dominate an entire reactor's behavior."},

{symbol:"Sm",A:149,Z:62,name:"Samarium-149",halfLife:"stable",spin:"7/2",category:"neutron",
  mossbauer:null,neutronXS:40100,abundance:13.8,gammaRole:"absorber",
  notes:"Very high neutron absorber (40,100 barns). Stable — accumulates permanently in reactor fuel as a fission product (unlike Xe-135 which decays). Called a 'reactor poison' that reaches equilibrium. Used in reactor control. Important for understanding fuel burnup."},

// ── Contrasting Pairs — Same Element, Different Gamma Behavior ───────────
{symbol:"Fe",A:56,Z:26,name:"Iron-56",halfLife:"stable",spin:"0",category:"contrast",
  mossbauer:null,neutronXS:2.59,abundance:91.75,gammaRole:"absorber",
  notes:"CONTRAST with Fe-57: most abundant iron isotope (91.75%). Spin-0 ground state — NO Mössbauer effect, no nuclear resonance with gamma. Absorbs gamma only through electron interaction (photoelectric, Compton). Fe-57 (spin-1/2) resonantly absorbs AND re-emits 14.4 keV gamma. One neutron difference transforms the nuclear gamma interaction completely."},

{symbol:"Sn",A:118,Z:50,name:"Tin-118",halfLife:"stable",spin:"0",category:"contrast",
  mossbauer:null,neutronXS:2.21,abundance:24.22,gammaRole:"absorber",
  notes:"CONTRAST with Sn-119: most abundant tin isotope (24.22%). Spin-0 — no Mössbauer effect. Sn-119 (spin-1/2, one more neutron) has nuclear resonance at 23.9 keV. Same element, adjacent mass numbers, completely different nuclear gamma interaction. The extra neutron creates the excited state that enables resonance."},

{symbol:"H",A:1,Z:1,name:"Hydrogen-1 (Protium)",halfLife:"stable",spin:"1/2",category:"contrast",
  mossbauer:null,neutronXS:0.332,abundance:99.98,gammaRole:"transparent",
  notes:"CONTRAST with H-2 and H-3. Zero neutrons. Excellent neutron moderator (light water) but absorbs more neutrons than deuterium. Gamma transparent (Z=1, minimal electron interaction). The simplest nucleus — one proton, no neutrons."},

{symbol:"H",A:2,Z:1,name:"Hydrogen-2 (Deuterium)",halfLife:"stable",spin:"1",category:"contrast",
  mossbauer:null,neutronXS:0.000519,abundance:0.02,gammaRole:"transparent",
  notes:"CONTRAST with H-1: one neutron added. Neutron capture cross-section drops from 0.332 to 0.000519 barns — 640× lower. This is WHY heavy water (D₂O) enables natural uranium reactors — it moderates neutrons without absorbing them. Gamma transparent like H-1. The single extra neutron changes reactor physics entirely."},

{symbol:"H",A:3,Z:1,name:"Hydrogen-3 (Tritium)",halfLife:"12.32 yr",spin:"1/2",category:"contrast",
  mossbauer:null,neutronXS:0,abundance:0,gammaRole:"emitter",
  notes:"CONTRAST with H-1 and H-2: two neutrons. RADIOACTIVE — decays by beta emission (no gamma, but produces bremsstrahlung X-rays). Fusion fuel (D-T reaction). Two extra neutrons transform stable hydrogen into a radioactive isotope. The neutron-to-proton ratio (2:1) exceeds stability limits for Z=1."},

// ── Decay Sources — SE Cell Fuel Candidates ──────────────────────────────
{symbol:"Co",A:60,Z:27,name:"Cobalt-60",halfLife:"5.27 yr",spin:"5+",category:"decay_source",
  mossbauer:null,decay:{type:"β⁻ + γ",specificPower:17.5,emittedBands:["infrared","xray","gamma","electron"],production:"Reactor: Co-59(n,γ)→Co-60"},
  neutronXS:2.0,abundance:0,gammaRole:"emitter",
  notes:"THE gamma emitter. Two strong gamma lines at 1.173 and 1.332 MeV accompany every beta decay. Highest specific power of practical gamma sources (17.5 W/g). Beta→bremsstrahlung produces continuous X-ray spectrum. Produced by single neutron capture on stable Co-59 — simple reactor production. SE Cell profile: strong gamma + X-ray + thermal. Medical/industrial gamma standard."},

{symbol:"Sr",A:90,Z:38,name:"Strontium-90",halfLife:"28.8 yr",spin:"0+",category:"decay_source",
  mossbauer:null,decay:{type:"β⁻ (→Y-90→β⁻)",specificPower:0.46,emittedBands:["infrared","xray","electron"],production:"Fission product (high yield ~5.7%)"},
  neutronXS:0.42,abundance:0,gammaRole:"transparent",
  notes:"Pure beta emitter — no direct gamma. Daughter Y-90 emits 2.28 MeV beta (one of the highest energy betas available). Bremsstrahlung X-rays from beta deceleration in shielding. Abundant fission product (5.7% yield). SE Cell profile: thermal + X-ray only — simpler converter chain, no gamma shielding needed. 28.8 yr half-life suits multi-decade deployment. Soviet RTGs used Sr-90 extensively."},

{symbol:"Cs",A:137,Z:55,name:"Cesium-137",halfLife:"30.17 yr",spin:"7/2+",category:"decay_source",
  mossbauer:null,decay:{type:"β⁻ + γ",specificPower:0.42,emittedBands:["infrared","xray","gamma","electron"],production:"Fission product (high yield ~6.1%)"},
  neutronXS:0.25,abundance:0,gammaRole:"emitter",
  notes:"Most abundant gamma-emitting fission product (6.1% yield). Single gamma line at 662 keV via metastable Ba-137m daughter (94.6% of decays). Beta + gamma mixed emission. SE Cell profile: moderate gamma + X-ray + thermal. 30.17 yr half-life matches Sr-90 for paired deployment. Easier to produce than actinides — separated from spent fuel."},

{symbol:"Pu",A:238,Z:94,name:"Plutonium-238",halfLife:"87.7 yr",spin:"0+",category:"decay_source",
  mossbauer:null,decay:{type:"α",specificPower:0.57,emittedBands:["infrared","xray","gamma","thermal"],production:"Reactor: Np-237(n,γ)→Np-238→β⁻→Pu-238"},
  neutronXS:540,abundance:0,gammaRole:"emitter",
  notes:"THE RTG isotope. Alpha decay deposits 5.593 MeV as kinetic energy → thermal. Weak but measurable gamma (43 keV from U-234 daughter) and L-shell X-rays from internal conversion. 87.7 yr half-life gives decades of steady output. SE Cell profile: primarily thermal/infrared with minor X-ray and gamma — ideal for thermoelectric conversion. Powers Voyager, Curiosity, Perseverance. Produced via Np-237 irradiation."},

{symbol:"Am",A:241,Z:95,name:"Americium-241",halfLife:"432.2 yr",spin:"5/2-",category:"decay_source",
  mossbauer:null,decay:{type:"α + γ",specificPower:0.115,emittedBands:["infrared","xray","gamma","thermal"],production:"Reactor byproduct: Pu-241→β⁻→Am-241"},
  neutronXS:587,abundance:0,gammaRole:"emitter",
  notes:"Alpha emitter with a strong 59.5 keV gamma line (35.9% yield). Longest useful half-life of practical decay sources (432 yr). Lower specific power than Pu-238 but far longer service life. SE Cell profile: thermal + X-ray + gamma across centuries — the multi-generational power source. Accumulates in spent fuel as Pu-241 decays. Smoke detector isotope (microgram quantities)."},

{symbol:"Ni",A:63,Z:28,name:"Nickel-63",halfLife:"100.1 yr",spin:"1/2-",category:"decay_source",
  mossbauer:null,decay:{type:"β⁻ (low energy)",specificPower:0.006,emittedBands:["infrared","electron"],production:"Reactor: Ni-62(n,γ)→Ni-63"},
  neutronXS:22.5,abundance:0,gammaRole:"transparent",
  notes:"Pure low-energy beta emitter (Emax 67 keV, avg 17 keV). No gamma, negligible bremsstrahlung. THE betavoltaic isotope — beta particles directly generate electron-hole pairs in semiconductors without radiation shielding. SE Cell profile: direct electrical conversion only — the simplest possible energy chain. 100 yr half-life. Very low power density but zero shielding requirement makes it ideal for micro-scale SE Cells (sensors, implants, IoT)."},

{symbol:"Po",A:210,Z:84,name:"Polonium-210",halfLife:"138.4 d",spin:"0+",category:"decay_source",
  mossbauer:null,decay:{type:"α",specificPower:141,emittedBands:["infrared","thermal"],production:"Reactor: Bi-209(n,γ)→Bi-210→β⁻→Po-210"},
  neutronXS:0.03,abundance:0,gammaRole:"transparent",
  notes:"Highest specific power of any practical radioisotope (141 W/g). Pure alpha — virtually no gamma (0.001% branch). Extreme power density but short half-life (138 days) limits applications to missions needing burst power. SE Cell profile: pure thermal — maximum watts per gram, minimum shielding complexity. Soviet Lunokhod rovers used Po-210 RTGs. Produced by neutron irradiation of bismuth."},

{symbol:"Cm",A:244,Z:96,name:"Curium-244",halfLife:"18.1 yr",spin:"0+",category:"decay_source",
  mossbauer:null,decay:{type:"α + SF",specificPower:2.83,emittedBands:["infrared","gamma","thermal"],production:"Reactor: Am-243(n,γ)→Am-244→β⁻→Cm-244"},
  neutronXS:15.2,abundance:0,gammaRole:"emitter",
  notes:"Alpha emitter with significant spontaneous fission rate (1.37×10⁷ SF/s/g) producing neutrons. 5× the specific power of Pu-238 with reasonable half-life (18.1 yr). SE Cell profile: thermal + gamma + neutron — the most complex emission spectrum of any single isotope. The neutron output adds a band that other decay sources don't provide. Higher radiation hazard but higher energy density. Used in early space RTGs (SNAP-11)."},

{symbol:"Pm",A:147,Z:61,name:"Promethium-147",halfLife:"2.62 yr",spin:"7/2+",category:"decay_source",
  mossbauer:null,decay:{type:"β⁻ (low energy)",specificPower:0.33,emittedBands:["infrared","xray","electron"],production:"Fission product (yield ~2.3%)"},
  neutronXS:168,abundance:0,gammaRole:"transparent",
  notes:"Low-energy beta emitter (Emax 225 keV). No significant gamma — weak bremsstrahlung X-rays only. Fission product, moderate yield. SE Cell profile: thermal + weak X-ray. Shorter half-life (2.62 yr) limits long-term use but adequate for disposable or replaceable power sources. Used in early nuclear batteries (1960s). Only naturally-absent rare earth — every atom is reactor-made."},
];

// ═══════════════════════════════════════════════════════════════════════════
// SELF-VALIDATION — Runs on load. Check browser console (F12) for errors.
// ═══════════════════════════════════════════════════════════════════════════
(function validateSpectrumData(){
  const EXPECTED = {
    EM_BANDS:              { type:'array', min:8 },
    THERMAL_BANDS:         { type:'array', min:1 },
    KINETIC_BANDS:         { type:'array', min:6 },
    ALL_BANDS:             { type:'array', min:11 },
    ROLES:                 { type:'array', min:10 },
    ROLE_COLORS:           { type:'object', min:10 },
    CONTROL_GROUPS:        { type:'array', min:4 },
    STRUCTURE_GROUPS:      { type:'array', min:15 },
    ELEMENTS:              { type:'array', min:118 },
    COMPOUND_CATEGORIES:   { type:'array', min:11 },
    COMPOUNDS:             { type:'array', min:79 },
    ISOTOPE_CATEGORIES:    { type:'array', min:6 },
    ISOTOPES:              { type:'array', min:34 },
  };
  let pass=0, fail=0;
  const errors=[];
  Object.entries(EXPECTED).forEach(([name, rule])=>{
    try {
      const val = eval(name);
      if(val===undefined||val===null) throw 'undefined';
      const count = rule.type==='array' ? val.length : Object.keys(val).length;
      if(count < rule.min){
        errors.push('⚠ '+name+': expected ≥'+rule.min+', got '+count);
        fail++;
      } else { pass++; }
    } catch(e){
      errors.push('✗ '+name+': MISSING — file is truncated or corrupted');
      fail++;
    }
  });
  // Compound category audit
  if(typeof COMPOUNDS!=='undefined' && typeof COMPOUND_CATEGORIES!=='undefined'){
    const catCounts={};
    COMPOUNDS.forEach(c=>{catCounts[c.category]=(catCounts[c.category]||0)+1;});
    const EXPECTED_CATS = {scintillator:10,piezoelectric:6,nuclear:5,shielding:11,oxide:5,ferrite:4,semiconductor:7,thermoelectric:9,ceramic:8,polymer:6,alloy:8};
    Object.entries(EXPECTED_CATS).forEach(([cat,min])=>{
      const actual=catCounts[cat]||0;
      if(actual<min){
        errors.push('⚠ Compounds.'+cat+': expected ≥'+min+', got '+actual);
        fail++;
      }
    });
  }
  const tag = 'spectrum-data.js';
  if(fail===0){
    console.log('%c✓ '+tag+': ALL '+pass+' checks passed ('+ELEMENTS.length+'E, '+COMPOUNDS.length+'C, '+ISOTOPES.length+'I, '+STRUCTURE_GROUPS.length+'SG)', 'color:#2A9D8F;font-weight:bold');
  } else {
    console.error('✗ '+tag+': '+fail+' FAILED, '+pass+' passed:');
    errors.forEach(e=>console.error('  '+e));
  }
})();
