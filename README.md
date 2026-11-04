# Ropeybot

A node-based BC bot based on the old bot-api. Its functionality is divided up into
'games' and you configure the bot to run one of them via its config file.

The repository also contains bc-bot, a typescript / javascript library for building
BC bots. This can be used in isolation in your own app if you just want the library.

Most code here is free to use (Apache licensed) but some is taken with
permission from the original bot hub (eg. kidnappers game, roleplay challenge).

We hope that this will be useful for people to make fun and interesting bots
for the club! You're also welcome to run the bots included yourself.

To make a new game, you can copy the 'petspa' game file and use that as a base, and add
your new file into bot.ts.

Usual club ettiquette applies, eg:

- Make sure people know your bot is a bot, not a real player
- Make sure people consent before your bot binds them / changes their clothing etc.
- Watch how many messages your bot sends. Even if it stays under the ratelimit, constantly
  sending messages will affect the server.
- Make bots fun / interesting / useful, rather than to just sit in rooms.

## Code layout

The code is laid out in a monorepo:

- **packages/bc-bot**: The bc-bot library
- **apps/ropeybot**: The bot application

Anything in apps/ropeybot/src/hub is from the original bot hub. This includes the 'kidnappers'
game and the roleplay challenge bot. These are copied in as they were, but with additions since.

Things in apps/ropeybot/src/games use a newer, more event-based API. If you write new bots,
they should probably look like the ones in here.

Some things are unfinished and imperfect, but there should be enough here to make working and
fun bots! Improvements and fixes are always welcome.

## Running

The bot can either be run locally or via the Docker image.

### Running Locally

- Get an environment with NodeJS, pnpm (https://pnpm.io/installation) and git
- Check out the bot's code:
  `git clone https://github.com/FriendsOfBC/ropeybot.git`
- Install dependencies:
  `pnpm install`
- Copy `config.sample.json` to `config.json` and customise it: you'll need to provide
  at least a username and password for an account that the bot can log in as. You can
  also choose what game the bot will run.
- Build the bot:
  `pnpm run -r build`
- Start the bot!
  `pnpm run -r start`

Building the app will automatically rebuild the bc-bot library too, so any changes
you make there will be reflected.

### Running with Docker

- Install docker
- Create a config file as in the steps for running locally
- Run the bot, mapping in the config file you just made:
  `docker run --rm -it -v ${PWD}/config.json:/bot/cfg/config.json ghcr.io/FriendsOfBC/ropeybot:main`
- Alternatively you can build the docker container yourself:
  `docker build --tag ropeybot .`
- And then run said container with the config file mapped in
  `docker run --rm -it -v ${PWD}/config.json:/bot/cfg/config.json ropeybot`

## Games

The bot comes with some built games. In brackets is the value to use for 'game' in the config
file to run that game.

### Dare Game ('dare')

A very simple game where players add dares and then draw them without knowing who added
each dare.
The dares added by players are stored in two files in the bot's working directory:
dares.json and unuseddares.json: delete both of these files to reset the dares.

### Pet Spa ('petspa')

This is an example of how to use the API to make an interactive map room, but also
applies to non map rooms. You can use this file as a base for things like how to react
when players enter areas on a map, adding restraints and setting their properties, sending
and reacting to messages.

### Kidnappers ('kidnappers')

From the original bot hub. Code is mostly unmodified from its original state.

### Roleplay challenge ('roleplay')

Also from the original bot hub.

### Maid's Party Night ('maidspartynight')

Also from the original bot hub, a single player adventure. Needs a second bot account
(user2 and password2 in the config). Probably buggy!
