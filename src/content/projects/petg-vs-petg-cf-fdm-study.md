---
title: "FDM PETG vs. PETG-CF: A Full Factorial Mechanical & DIC Study"
summary: "Does carbon fiber change how PETG fails, or just how much load it takes? A full factorial FDM study with DIC strain mapping and SEM fractography."
date: 2026-01-15
category: ["Research", "Materials", "3D Printing"]
status: "In Progress"
tools: ["Bambu Lab P1S", "Digital Image Correlation (DIC)", "SEM", "Python"]
technologies: ["ASTM D638", "Design of Experiments (DOE)", "Cubic smoothing splines", "Brent's method"]
github: "https://github.com/yourusername/petg-petg-cf-doe"
featured: true
lessonsLearned: "R²-based elastic-region detection is far more robust than a fixed-window fit once layer thickness and infill start changing local noise in the strain signal."
futureImprovements: "Extend the design to a third material (PETG-GF) and correlate fracture surface features quantitatively with local strain concentration from the DIC field."
---

## The question

Carbon-fiber-reinforced filaments are marketed almost entirely on stiffness and strength numbers. The more interesting question, mechanistically, is whether adding chopped carbon fiber to PETG **changes the deformation and failure mechanism** — or whether it simply scales the same PETG behavior up and down.

## Design

A full factorial design: **2 materials × 3 layer thicknesses × 3 infill densities**, printed on a Bambu Lab P1S and tested per **ASTM D638**. Each specimen is imaged throughout the test for **Digital Image Correlation (DIC)**, giving full-field strain data rather than just an extensometer trace, and post-mortem fracture surfaces are examined under **SEM**.

## Analysis pipeline

The stress-strain reduction pipeline is fully custom in Python:

- R²-based detection of the linear elastic region (rather than a fixed strain window)
- Isotonic regression to split the curve cleanly at peak stress
- Cubic smoothing splines fitted to the post-elastic region
- Brent's method to solve for the 0.2% offset yield strength

Figures are generated to publication spec (Times New Roman, inward ticks, 600 dpi, strain reported in percent, fitted curve only — no raw scatter) for direct use in the manuscript.

## Status

Data collection and DIC processing are complete; statistical analysis (ANOVA on the factorial design) and the SEM fractography write-up are in progress. Target journals include *Progress in Additive Manufacturing* and *Journal of Manufacturing Processes*.
