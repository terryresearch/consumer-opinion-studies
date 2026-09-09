/* =====================================================================
   MEASURES
   One dependent variable, asked in every condition, then demographics.
   ===================================================================== */

const ALL = ["control", "confirming", "disconfirming", "mixed"];

const MEASURES = [

  /* ---------- THE DV: belief in the claim (0-100) --------------------
     Anchored to the claim itself, not to the article, so it is
     comparable across all four cells including control. The slider has
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
