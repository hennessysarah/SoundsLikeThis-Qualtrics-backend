require('dotenv').config();

// Add these debug lines
console.log('Environment variables loaded:');
console.log('SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID ? 'Present' : 'Missing');
console.log('SPOTIFY_CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET ? 'Present' : 'Missing');
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? 'Present' : 'Missing');

var SpotifyWebApi = require('spotify-web-api-node');
var GitHubPublisher = require('github-publish');
const express = require('express');

// This file is copied from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

// Use environment variables for sensitive credentials
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
   // redirectUri: 'http://localhost:8886/callback'
    redirectUri: 'http://127.0.0.1:8886/callback'

});

// Use environment variable for GitHub token
var publisher = new GitHubPublisher(process.env.GITHUB_TOKEN, 'greert', 'greert.github.io');

const app = express();

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            publisher.publish('files/key_lab.js', 'accessToken = \"'+access_token+'\";',{force: true})

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.send('Success! You can now close the window.');

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];
                publisher.publish('files/key_lab.js', 'accessToken = \"'+access_token+'\";',{force: true})

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

app.listen(8886, () =>
    console.log(
        'HTTP Server up. Now go to http://localhost:8886/login in your browser.'
    )
);



