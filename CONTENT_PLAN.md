# Content plan

## Source of truth

The user confirmed the current CV and its dates during this redesign. Academic details, affiliations, role titles, and experience periods follow `../Yashav_Bhatnagar_CV.pdf` (created 15 September 2026), matching `D:\college\Resume\CV_research.tex`. The copy in `D:\college\Resume\Research\Yashav_Bhatnagar_CV.pdf` is byte-identical. This is the downloadable CV source; do not substitute the older repository PDF or SWE variant.

Source PDF SHA-256: `EEE4E4BDFB1ED4E2634C3C231F88B27569BDA182808AFA9E9A33F3942900D3D8`.

Project frontmatter records source locations for maintenance. Those paths are provenance metadata and must not appear on public pages. These notes may be committed to a public repository; no private research documents or client files are copied into the site.

## Inventory and disposition

| Material | Decision | Entry status / source |
| --- | --- | --- |
| Identity, B.Tech CSE, IIIT Hyderabad | Retain; rewrite introduction around current research and interests | Confirmed user brief and current CV |
| CGPA and experience | Update: 8.01; Precog April 2026–present; NJSecure January–May 2026; Smart City April 2025–January 2026 | Confirmed current CV; structured web résumé is a readable summary |
| Hardware Test Jig | Add substantial case study; featured | Implemented; current CV, `D:\college\SCRC\Hardware_Test_Jig\README.md`, `D:\college\SCRC\project_details.md` |
| V-JEPA2 probing | Add research overview; featured | Ongoing; current CV, `D:\college\Precog\VJEPA\vjepa_temporal_rule_probing.md`, `layerwise_probing_design.md`; methodology only, no claimed findings |
| MetaFam | Add project; featured | Implemented; current CV. Metrics explicitly scoped to project evaluation |
| Audio-Guided Microbot | Rewrite; distinguish personal work from team outcome | Implemented; CV plus `D:\college\Sem 3\Embedded Systems Workshop\final-codes-17_sensodyne\Report\report.md` and adjacent README |
| ORBIT Node | Add overview | Historical completed engineering work; current CV and July `../bigCV.pdf`; no public code, production deployment, or bank-adoption claim |
| xv6 | Add project | Implemented; CV plus `D:\college\Sem 3\Operating Systems and Networks\Resume_proj\xv6-kernel\README.md` |
| Network File System; C-Shell | Retain and rewrite | Implemented; current/July CV; shell README in local course project |
| Felicity event platform | Defer from first presentation | Supported by August SWE CV and September `D:\college\Resume\CV.tex`; scope prioritizes eight stronger representative entries |
| Articles and notes | Add only supportable explanatory writing; identify new editorial material | No previously published article manuscript was supplied. New explanatory material must not be backdated or presented as an existing publication |
| Leakage-aware evaluation note | Keep unfinished editorial material out of public build until reviewed | `leakage-aware-evaluation` may be related to MetaFam; related entries must use the same central draft filter as indexes |
| Quantum computing | Add topic organization and accurately framed learning interest | User brief; private curriculum `D:\college\Quantum\QUANTUM_CORE_CURRICULUM_v1.0.md` is a plan, not completed work. No current projects mislabeled quantum |
| Publications | Omit empty section | No verified entries available |
| Old contact page | Replace contact ceremony with useful direct contact links; preserve old URL | Existing `contact.html` |

## Reconciled historical discrepancies

- Old web résumé said CGPA 8.19 and Smart City February 2024–March 2026; older PDFs used February 2025–March 2026. Confirmed current CV supersedes these: 8.01 and April 2025–January 2026.
- Old materials describe a OneM2M demonstration in Spring 2025. Current CV records the Hardware Test Jig showcase in Spring 2026. Do not merge those into one event.
- Microbot report lists Team Sensodyne: Ayush, Pranav, Yashav, Raza. CV supports Yashav's keyword-spotting deployment and speech-gate work; avoid sole-creator wording for the whole robot.
- Microbot documentation calls approximately 102 ms both inference time and voice latency. Public copy uses voice-decision latency and states the measurement limitation. Accuracy above 93.87% is CV-reported; dataset conditions are not independently documented in inspected sources.
- ORBIT's older description specifies a simulated environment. Public copy does not imply live bank deployment.
- xv6 includes the default round-robin scheduler alongside added FCFS/CFS; do not attribute the original scheduler to Yashav.

## Editorial boundary and remaining facts

The user has confirmed current CV details and dates; these are resolved. No invented project start/end dates are supplied. General context dates are used only when supported.

Further detail would improve later updates: Microbot's exact team responsibility split and reproducible evaluation conditions; MetaFam's complete benchmark/split protocol; and which research results or client artifacts are approved for public release. Current copy avoids claims dependent on those answers.

Technical explanations drafted during this redesign are proposed editorial wording, not evidence of prior publication. Excluding a draft from the build does not make its tracked source private. Keep sensitive or unfinished research outside the repository.
