# fr1 — facial rollers, four verdict conditions

Modified replication of Study 4 in *Disconfirming but Convincing*, with a fourth cell the
manuscript does not contain. **One dependent variable.**

**Live:** https://terryresearch.github.io/consumer-opinion-studies/fr1/

## Design

Consent → short orientation page → article → the one question → four demographic items.

Four cells, between subjects. Every participant reads the same article about facial
rollers — same headline, same product photo, same manufacturers' claim ("Reduces facial
puffiness"). The cells differ only in what appears beneath that claim.

| cell | beneath the claim |
|---|---|
| `control` | nothing |
| `confirming` | one magazine's verdict: the claim **is** supported |
| `disconfirming` | one magazine's verdict: the claim is **not** supported |
| `mixed` | two magazines, one confirming and one disconfirming |

Each fictional publication carries its own accent colour (indigo / plum, neither
valence-loaded). Which publication delivers which verdict is counterbalanced, so colour is
counterbalanced against verdict for free; `theme_confirm` / `theme_disconfirm` record it.

## The measure

`dv_likelihood` — *How likely is it that facial rollers actually reduce facial puffiness?*
0–100 slider, 0 = Very unlikely, 100 = Very likely. No default thumb position: nothing is
recorded until the participant clicks or drags, so there is nothing to anchor on.

Demographics come after it: age, gender (woman / man / prefer not to say), prior
facial-roller use, familiarity.

## Randomisation

`assign()` hands out the least-filled cell under a per-study advisory lock — concurrent
sessions cannot collide, and it is idempotent per participant. Counterbalancing alternates
strictly inside each cell: single-verdict cells alternate which magazine carries the
verdict; the mixed cell alternates which verdict is shown first.

## Data

Supabase → SQL Editor:

    select * from fr1_data;     -- one row per participant, flat
    select * from fr1_balance;  -- assigned vs completed per cell, live

Exclude pilot rows with `where not is_test`.

## Recruitment

    https://terryresearch.github.io/consumer-opinion-studies/fr1/?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}

Append `&test=1` to flag a row as a pilot. On finish, participants see the debrief and are
returned to Prolific after 12 seconds (button to go now; code `CEKK0PFF` shown as fallback).
The return fires only after the response is written.

## Source

`index.html` is the deployed single file, built from `src/` by `build.py`:

    python3 build.py

- `src/config.js`   — endpoints, stimulus copy, magazine names and accents, completion settings
- `src/measures.js` — the measure and the demographics block
- `src/study.css`, `src/study.js`, `src/index.html`

Localhost only: `?preview=control|confirming|disconfirming|mixed` forces a cell and writes
nothing. Inert once deployed.

## Credits

Product photograph: "Face Roller" by jacobcariaga, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/),
[source](https://www.flickr.com/photos/190893163@N06/50556930426); cropped and rotated.
Shown to participants on the debrief screen.
