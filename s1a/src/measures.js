/* =====================================================================
   MEASURES
   Two questions, asked one at a time in both conditions: belief in the
   claim, then purchase likelihood under a goal of reducing facial
   puffiness. Demographics follow.
   ===================================================================== */

const ALL = ["control", "mixed"];

const MEASURES = [

  /* ---------- DV 1: belief in the claim (0-100) ----------------------
     Anchored to the claim itself, not to the article, so it is
     comparable across both cells, including control. The slider has
     no default position, so there is nothing to anchor on. */
  {
    id: "likelihood",
    when: ALL,
    type: "slider100",
    eyebrow: "Your judgment",
    prompt: "How likely is it that facial rollers actually reduce facial puffiness?",
    help: "Drag the slider, or click anywhere on the line, to answer.",
    leftLabel: "Very unlikely",
    rightLabel: "Very likely",
    field: "dv_likelihood"
  },

  /* ---------- DV 2: purchase likelihood under the goal (0-100) ------- */
  {
    id: "purchase",
    when: ALL,
    type: "slider100",
    eyebrow: "Your judgment",
    prompt: "Imagine you wanted to reduce facial puffiness. How likely would you be to purchase a facial roller?",
    help: "Drag the slider, or click anywhere on the line, to answer.",
    leftLabel: "Very unlikely",
    rightLabel: "Very likely",
    field: "dv_purchase"
  }
];

/* ---------- Demographics (shown without the stimulus) --------------- */
const DEMOGRAPHICS = [
  { field: "age", type: "number", label: "What is your age?", min: 18, max: 110, suffix: "years" },
  {
    field: "gender", type: "radio", label: "What is your gender?",
    options: ["Woman", "Man", "Prefer not to say"]
  },
  {
    field: "prior_use", type: "radio", label: "Have you ever used a facial roller?",
    options: ["Never used one", "Tried one once or twice", "Use one occasionally", "Use one regularly"]
  },
  {
    field: "familiarity", type: "scale7", label: "Before today, how familiar were you with facial rollers?",
    left: "Not at all familiar", right: "Extremely familiar"
  }
];
