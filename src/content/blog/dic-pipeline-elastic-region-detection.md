---
title: "Why I Stopped Using a Fixed Window to Find the Elastic Region"
date: 2026-03-02
category: "Research Notes"
tags: ["Python", "DIC", "Curve Fitting", "Mechanical Testing"]
excerpt: "A fixed-strain-window approach to finding the linear elastic region works fine until layer thickness and infill start changing the noise floor. Here's what replaced it."
draft: false
---

Every stress-strain reduction pipeline needs to decide where the "linear elastic region" ends. The obvious approach — fit a line to the first *N*% strain — works fine for one material tested one way. It stops working the moment you're running a full factorial design across layer thicknesses and infill densities, because the noise floor in the DIC strain signal changes with print geometry, and a fixed window either overshoots into the nonlinear region for some specimens or cuts off too early for others.

The fix was to make the elastic-region boundary a **fit-quality decision** rather than a fixed-strain decision: expand the fitting window outward from the origin and track R² as a function of window size, then take the boundary where R² starts dropping past a set threshold. It's a small change, but it's the difference between a pipeline that needs babysitting per-specimen and one that runs unattended across 18 factorial combinations.

The rest of the pipeline follows the same principle — isotonic regression to split the curve at peak stress (rather than assuming where the peak "should" be), and Brent's method to solve for the 0.2% offset yield strength directly rather than approximating it graphically.
