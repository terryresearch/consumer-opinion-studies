# s1a — Study 1a: facial rollers, control vs both verdicts

Revision of [`fr1`](../fr1/) for the empirical package: two conditions instead of four, a
purchase question after the belief question, and an orientation page that tells each condition
what its article contains. Everything else — consent, article, magazines, verdict cards,
demographics, completion — is carried over from `fr1` unchanged.

**Live:** https://terryresearch.github.io/consumer-opinion-studies/s1a/

## Design

Consent → short orientation page → article → two questions → four demographic items.
Desktop and laptop computers only: phones and tablets get a "please use a computer" page
before consent, are never assigned to a condition, and are logged as `blocked_device` in
`study.events`.

Two cells, between subjects. Every participant reads the same article about facial
rollers — same headline, same product photo, same manufacturers' claim ("Reduces facial
puffiness"). The article differs between cells only in what appears beneath that claim.

| cell | beneath the claim |
|---|---|
| `control` | nothing |
| `mixed` | two magazines, one confirming and one disconfirming |

In `mixed`, which verdict is shown first alternates strictly between participants
(`label_order`, `confirm_first`), and which magazine delivers which verdict is randomised
(`name_swap`). Each fictional publication carries its own accent colour (indigo / plum), so
colour is counterbalanced against verdict; `theme_confirm` / `theme_disconfirm` record it.
These columns describe the mixed cell only.

Outside the article, the cells differ in one sentence: the orientation page ("What you will be
doing") tells each cell what its own article contains (`STIMULUS.intro` in `src/config.js`).

| cell | orientation text |
|---|---|
| `control` | In a moment you will read a short article about a beauty product and what its manufacturers claim. Please read it carefully, then answer a few questions. |
| `mixed` | In a moment you will read a short article about a beauty product, what its manufacturers claim, and the results of independent product tests by two magazines. Please read it carefully, then answer a few questions. |

## Measures

The two questions share one screen, beside the article, and appear one at a time: when the
first is answered and the participant clicks Next, it stays in place, locked and greyed, and
the second appears beneath it. Both use the same slider at the same fixed width, with no
default thumb position: nothing is recorded until the participant clicks or drags, so there
is nothing to anchor on.

| field | question | scale |
|---|---|---|
| `dv_likelihood` | How likely is it that facial rollers actually reduce facial puffiness? | 0–100, Very unlikely → Very likely |
| `dv_purchase` | Imagine you wanted to reduce facial puffiness. How likely would you be to purchase a facial roller? | 0–100, Very unlikely → Very likely |

A third question — the most the participant would spend on a facial roller, $0–$100 — was
removed on 17 Sep 2026, before data collection.

Demographics come after them: age, gender (woman / man / prefer not to say), prior
facial-roller use, familiarity.

## Randomisation

`assign()` hands out the least-filled cell under a per-study advisory lock — concurrent
sessions cannot collide, and it is idempotent per participant.

## Data

Supabase → SQL Editor:

    select * from s1a_data;     -- one row per participant, flat
    select * from s1a_balance;  -- assigned vs completed per cell, live

Exclude pilot rows with `where not is_test`. Time on each screen is in `page_ms`
(`article_ms`, `t_likelihood`, `t_purchase`, `t_demographics`, all in ms).

## Recruitment

    https://terryresearch.github.io/consumer-opinion-studies/s1a/?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}

Append `&test=1` to flag a row as a pilot. On finish, participants see the debrief and are
returned to Prolific after 12 seconds (button to go now; code `CEKK0PFF` shown as fallback) —
the same completion link as `fr1`. The return fires only after the response is written.

## Source

`index.html` is the deployed single file, built from `src/` by `build.py`:

    python3 build.py

- `src/config.js`   — endpoints, stimulus copy, magazine names and accents, completion settings
- `src/measures.js` — the two questions and the demographics block
- `src/study.css`, `src/study.js`, `src/index.html`

Localhost only: `?preview=control|mixed` forces a cell and writes nothing (`&swap=1` puts the
disconfirming verdict first). Inert once deployed.

## Credits

Product photograph: "Face Roller" by jacobcariaga, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/),
[source](https://www.flickr.com/photos/190893163@N06/50556930426); cropped and rotated.
Shown to participants on the debrief screen.
