**Instructions for use**

**How can I use this tool in a participant-facing survey?**

For our original study, we integrated this music-matching tool in a participant-facing Qualtrics survey in order to investigate a particular music-evoked emotion. We did this using the javascript tools in Qualtrics.

You can do the same. For example, if you want participants to self-select songs that evoke a memory, and you’d like to present these songs and a collection of musically-matched algorithm-selected songs from SoundsLikeThis, you can follow the steps below.

1. Identify how you want your user-inputted and algorithm-outputted songs to be matched. For our work, we set the difference in Valence and Energy to no more than .15.

2. Download our original application (note, in order for this to work you will need to download Javascript and Node.js to your computer).
   a. Unzip the folder, and cd to the folder from your terminal
   b. Type “node index_BCI.js” into terminal
   c. Go to the website displayed in the terminal output
   d. Now the app is running and you may continue!

3. Create your Qualtrics survey. You may download a copy (a .QSF file) of a simplified example from our lab here. In this example, we asked participants to enter a “nostalgic song”, and then the goal was to find a musically-matched song that was unfamiliar. If a musically-matched song was rated as familiar, the survey would present the participant with another musically-matched song up to 10 more times. (See instructions on how to import a QSF file into Qualtrics here).

4. Click on the song input block, and navigate to the “ Javascript” menu.

5. Edit the Javascript as necessary. Specifically, you might want to edit the following sections:
   a. varAccessToken: replace with your unique access token from Spotify API
   b. min_ar, max_ar, min_val, max_val, min_pop. These are variables that indicate how you want to match your songs based on arousal, valence, and popularity. They are set in the example to .15 for valence and arousal and minimum of 80 for popularity. You can change these values here.
   c. Number of recommendations. If you want more or fewer recommendations than 10, you can edit this throughout the javascript block (e.g, rec_array.length)

6. Save your project and test thoroughly.
