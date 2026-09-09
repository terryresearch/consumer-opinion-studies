# Consumer opinion studies

Online studies for the DbC working paper. One folder per study; one shared Supabase backend.
The repository and every participant-facing page are deliberately named so that the paper's
title and hypothesis never appear in a URL or on screen.

| study | what it is | live page |
|---|---|---|
| `s1b` | news headlines with peer TRUE / FAKE labels (Study 1) | [`/s1b/`](https://terryresearch.github.io/consumer-opinion-studies/s1b/) |
| `fr1` | facial rollers, four verdict conditions, one DV | [`/fr1/`](https://terryresearch.github.io/consumer-opinion-studies/fr1/) |

## Backend

A single Supabase project (`disconfirming-but-convincing`) serves every study, keyed by
`study_id`. Tables live in the `study` schema, which PostgREST does not expose. The only
public surface is three `SECURITY DEFINER` functions — `assign`, `submit`, `log_event`.
The publishable key can call those and nothing else: it cannot read any table or view.

`assign` hands out the least-filled cell under a per-study advisory lock, so concurrent
sessions cannot collide, and it is idempotent per participant. An `alt` array on a cell
gives a nested counterbalance factor that alternates strictly within the cell.

**Free tier:** the project pauses after 7 days without traffic, and a paused project
refuses `assign` — participants would see the study's "could not start" message. Restore
it from the Supabase dashboard before recruiting, and keep an eye on it if recruitment
stalls for a week.

## Data

Supabase → SQL Editor:

    select * from fr1_data;     select * from fr1_balance;
    select * from s1b_data;     select * from s1b_balance;

## Adding a study

    insert into study.studies (study_id, name, target_n) values ('s2', 'Study 2', 400);
    insert into study.cells (study_id, cell, factors) values
      ('s2','a','{"condition":"a"}'), ('s2','b','{"condition":"b","alt":["x","y"]}');

Then copy a study folder, change `studyId` in its config, and create its `_data` and
`_balance` views.
