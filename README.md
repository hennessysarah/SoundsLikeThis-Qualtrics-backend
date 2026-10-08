**Instructions for use**

**How can I use this tool in a participant-facing survey?**

For our original study, we integrated this music-matching tool in a participant-facing Qualtrics survey in order to investigate a particular music-evoked emotion. We did this using the [JavaScript tools](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/) in Qualtrics.

You can do the same. Your survey connects to the SoundsLikeThis server (SoundsLikeThis.us), which looks up songs on Spotify and finds musically-matched songs. You do not need to download anything, install any software, or set up a Spotify or GitHub account.

For example, if you want participants to self-select songs that evoke a memory, and you'd like to present these songs and a collection of musically-matched algorithm-selected songs from SoundsLikeThis, you can follow the steps below.

1. **Decide how you want songs to be matched.** For our work, we set the difference in valence and energy to no more than .15.

2. **Import the example survey.** Download `Nostalgia_Project_Sample.qsf` from this repository and import it into Qualtrics (see instructions on how to import a QSF file [here](https://www.qualtrics.com/support/survey-platform/survey-module/survey-tools/import-and-export-surveys/)). In this example, we asked participants to enter a "nostalgic song," and then the goal was to find a musically-matched song that was unfamiliar. If a musically-matched song was rated as familiar, the survey would present the participant with another musically-matched song, up to 10 times.

3. **Open the song input question's JavaScript.** Click on the song input question ("Put in ONE song and artist..."), then open its JavaScript editor.

4. **Edit the settings at the top of the JavaScript** to fit your study:
   - `ENERGY_RANGE`: the largest allowed difference in energy (arousal) between the participant's song and matched songs. Default: 0.15.
   - `VALENCE_RANGE`: the largest allowed difference in valence. Default: 0.15.
   - `MIN_POPULARITY`: the minimum Spotify popularity (0-100) for matched songs. Default: 80.
   - `MAX_YEAR_DIFF`: matched songs must be released within this many years of the participant's song. Default: 5.
   - `NUM_RECS`: how many matched songs to save. Default: 10. If you change this, add or remove listening questions to match.
   - The messages shown to participants, which you can reword or translate.

5. **Save your survey and test it thoroughly** by previewing it and entering a few songs.

**What the survey saves**

For each participant, the song input question saves these fields as embedded data.

For the participant's song:
- `shortUri1`: a Spotify player link for the song
- `song1_name`, `song1_artists`: the song title and artists
- `pop1`, `rel_date1`: its Spotify popularity and release year
- `valence1`, `arousal1`: its valence and energy (kept for compatibility with earlier versions)
- `song1_<feature>`: every Spotify audio feature (listed below), e.g. `song1_danceability`

For each of the 10 matched songs (`rec11` to `rec19`, and `rec110`):
- `rec11`: a Spotify player link for the song
- `rec11_name`, `rec11_artists`: the song title and artists
- `rec11_popularity`, `rec11_release_year`: its Spotify popularity and release year
- `rec11_<feature>`: every Spotify audio feature, e.g. `rec11_tempo`

The audio features are: acousticness, danceability, energy, instrumentalness, key, liveness, loudness, mode, speechiness, tempo, time_signature, valence and duration_ms. See [Spotify's documentation](https://developer.spotify.com/documentation/web-api/reference/get-audio-features) for what each one means.

These fields are already set up in the example survey's Survey Flow. If you build your own survey, or change `NUM_RECS`, add the matching fields as embedded data in your Survey Flow, or Qualtrics will not save them.

**Good to know**

- If the server has not been used for a while, the first participant may wait up to a minute after clicking the button while it starts up.
- If no song is found, or there are not enough matched songs, the participant is asked to enter a different song.


**Please cite the tool in your research publications**

Please cite the tool itself:

Hennessy, S., & Greer, T. (2024). SoundsLikeThis: A music matching tool for researchers and music-lovers [Computer software]. University of Southern California. SoundsLikeThis.us

and please cite our original paper:

Hennessy, S., Greer, T., Narayanan, S., Habibi, A., (2024). Unique affective profile of nostalgic music: An extension and conceptual replication of Barrett et al., 2010. Emotion.
