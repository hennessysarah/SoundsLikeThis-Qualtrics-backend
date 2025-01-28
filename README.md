**Instructions for use**

**How can I use this tool in a participant-facing survey?**

For our original study, we integrated this music-matching tool in a participant-facing Qualtrics survey in order to investigate a particular music-evoked emotion. We did this using the [javascript tools]([url](https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/)) in Qualtrics.

You can do the same. For example, if you want participants to self-select songs that evoke a memory, and you’d like to present these songs and a collection of musically-matched algorithm-selected songs from SoundsLikeThis, you can follow the steps below.

1. Identify how you want your user-inputted and algorithm-outputted songs to be matched. For our work, we set the difference in Valence and Energy to no more than .15.

2. Download our original application here on github (note, in order for this to work you will need to download Javascript and Node.js to your computer).
   a. Unzip the folder, and cd to the folder from your terminal
   b. Go to https://github.com/academicpages/academicpages.github.io -> Use this template -> create a new repository -> repository name <your github username>/<your github username>.github.io -> (optional) set to Private 
   c. Go to your GitHub account → Settings → Developer Settings → Personal Access Tokens -> tokens (classic)
   d. Generate a new token and give it all repo permissions. Set the expiration to never
   e. In the github_token variable of .env file, paste the token you get from the result of step e.
   f. Type “node index_BCI.js” into terminal
   g. Go to the website displayed in the terminal output. Log in to your premium spotify account.
   h. Now the app is running and you may continue!

4. Create your Qualtrics survey. You may download a copy (a .QSF file) of a simplified example from our lab here on github. In this example, we asked participants to enter a “nostalgic song”, and then the goal was to find a musically-matched song that was unfamiliar. If a musically-matched song was rated as familiar, the survey would present the participant with another musically-matched song up to 10 more times. (See instructions on how to import a QSF file into Qualtrics [here]([url](https://www.qualtrics.com/support/survey-platform/survey-module/survey-tools/import-and-export-surveys/))).

5. Click on the song input block, and navigate to the “ Javascript” menu.

6. Edit the Javascript as necessary. Specifically, you might want to edit the following sections:
   a. min_ar, max_ar, min_val, max_val, min_pop. These are variables that indicate how you want to match your songs based on arousal, valence, and popularity. They are set in the example to .15 for valence and arousal and minimum of 80 for popularity. You can change these values here.
   b. Number of recommendations. If you want more or fewer recommendations than 10, you can edit this throughout the javascript block (e.g, rec_array.length)

7. Save your project and test thoroughly.


**Please cite the tool in your research publications**

Please cite the tool its self:

Hennessy, S., & Greer, T. (2024). SoundsLikeThis: A music matching tool for researchers and music-lovers [Computer software]. University of Southern California. SoundsLikeThis.us

and please cite our original paper:

Hennessy, S., Greer, T., Narayanan, S., Habibi, A., (2024). Unique affective profile of nostalgic music: An extension and conceptual replication of Barrett et al., 2010. Emotion.


