# Consumer opinion studies

Online studies for the DbC working paper. One folder per study; one shared Supabase backend.
The repository and every participant-facing page are deliberately named so that the paper's
title and hypothesis never appear in a URL or on screen.

| study | what it is | live page |
|---|---|---|
| `s1a` | facial rollers, control vs both verdicts, plus purchase likelihood (Study 1a) | [`/s1a/`](https://terryresearch.github.io/consumer-opinion-studies/s1a/) |
| `s1b` | news headlines with peer TRUE / FAKE labels (Study 1) | [`/s1b/`](https://terryresearch.github.io/consumer-opinion-studies/s1b/) |
| `fr1` | facial rollers, four verdict conditions, one DV — closed | [`/fr1/`](https://terryresearch.github.io/consumer-opinion-studies/fr1/) |

## Backend

A single Supabase project (`disconfirming-but-convincing`) serves every study, keyed by
`study_id`. Tables live in the `study` schema, which PostgREST does not expose. Pages reach
the backend only through three `SECURITY DEFINER` functions — `assign`, `submit`,
`log_event` — and the publishable key cannot read any table or view. That last part is not
automatic: Supabase grants every new view in `public` to the publishable key, so each
study's `_data` and `_balance` views must have that access revoked when they are created
(see *Adding a study*).

`assign` hands out the least-filled cell under a per-study advisory lock, so concurrent
sessions cannot collide, and it is idempotent per participant. An `alt` array on a cell
gives a nested counterbalance factor that alternates strictly within the cell. Setting
`active = false` on a study's row in `study.studies` closes it to new participants.

**Free tier:** the project pauses after 7 days without traffic, and a paused project
refuses `assign` — participants would see the study's "could not start" message. Restore
it from the Supabase dashboard before recruiting, and keep an eye on it if recruitment
stalls for a week.

## Data

Supabase → SQL Editor:

    select * from s1a_data;     select * from s1a_balance;
    select * from fr1_data;     select * from fr1_balance;
    select * from s1b_data;     select * from s1b_balance;

## Adding a study

    insert into study.studies (study_id, name, target_n) values ('s2', 'Study 2', 400);
    insert into study.cells (study_id, cell, factors) values
      ('s2','a','{"condition":"a"}'), ('s2','b','{"condition":"b","alt":["x","y"]}');

Then copy a study folder, change `studyId` in its config, and create its `_data` and
`_balance` views. In the same migration, keep them to the SQL editor:

    revoke all on public.s2_data, public.s2_balance from anon, authenticated;
