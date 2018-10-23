![](docs/starter_splash.png)

Accelerated starter kit for building a quasar 0.17 SSR PWA Hybrid - with rigged and ready to extend GraphQL server and feathers authentication. Also possible to be used for SPA development or without SSR.

#### Compatiblity
This repository uses the latest known module resources known to work with:

```
  quasar-cli                    0.17.13
  quasar-framework              0.17.10
  @babel/insanity               7.0.0-beta.54
``` 

#### :fire: WARNING! :fire:
>Using this starter assumes familiarity with the command line, git, node, vue, quasar and for the love of your sanity if you do not understand HTML, CSS or JS - then this is going to be much too complicated for you.
 
## Preface
There are many ways to run with Quasar. One of the simplest is to use SSR, which is the way we have it setup by default. This means you will have a node server pre-hydrating your vue files and passing that to the browser. SSR, by nature, is complicated to use when you have to pass things like authentication tokens.

One way to pass these tokens is using feathers, which we have pre-rigged for you. Feathers uses websockets to communicate with the backend, and also provides you with a server for all of your static assets. However building your complete project each time you want to check something is rather time-consuming, which is why this starter is rigged for you to run a PWA dev server and use that to communicate with the feathers backend. Feathers is notoriously complicated to get working right, which is why we have provided extra unit tests to make sure it is working properly.

If you need more than just authentication - i.e. centralized data mutations, then you will probably be interested in looking into the schema based GraphQL and Prisma deployment. This is also available and can be used with or without feathers.

Our current (opinionated) recommendation if you want the whole kitchen sink, is to serve the PWA with feathers (that also provides authentication) and use GraphQL for your data. But you will have to uncomment lines 12 and 13 in quasar.conf.js - it is a lot to ask, and the rest of the setup is also slightly complicated, but anyway - you are a professional.
 
 
 **System prerequisites:**
- pretested on windows and mac
- linux will obviously work too
- node.js 8 LTS or 10 latest
- yarn > 1.9 (no guarantees if you prefer to use npm)
- nodemon for running the production SSR server 
- pm2 for deploying the SSR server in production
- ngrok if you want to share your work with colleagues

Clone this repo:
```bash
$ git clone git@github.com:nothingismagick/quasar-starter-ssr-pwa-jest-cypress.git example
$ cd example
$ yarn init:kitchensink
```

## Get to work
There are a number of scripts available in the `/package.json` file that should make your life a little easier when working. Of course normal CLI commands like `quasar dev` will still work, but power users of quasar swear by script invocation - especially if you plan to use a CI pipeline.

## Backend servers
We will maintain a number of branches in this repository that  allow you to choose the backend that you prefer:
- [x] SSR 
- [x] GraphQL with Prisma and Apollo
- [x] Feathers Server with Authentication
- [ ] Firebase (Coming Soon)
- [ ] hypertable (Help Wanted)
- [ ] pouchdb (Help Wanted)

### GraphQL
If you have never used GraphQL before, then we recommend that you [follow this entire tutorial](https://www.howtographql.com/graphql-js/0-introduction/). We are using the free service provided by Prisma to create a dynamic database proxy and running a local graphql-yoga server that is based on express and apollo.

#### Prisma Cloud Setup
To get this all up and running, you will first need to create a free account at Prisma Cloud: https://app.prisma.io/login (You can use your Github account to make it easier.) After you have logged in, go to the `settings` page and copy the "Slug" - you will need this for the `.env` file you are about to make.

Copy or rename the file `/server/.env.template` to `/server/.env` and replace `YOUR_ACCOUNT_SLUG` with the slug you were given by the prisma app.

Now you can initialise prisma with a login & deploy.
```bash
$ yarn db:prisma:init
```

It is really worthwhile to check out the playground, because you can actually modify your schema there!

#### Serve a graphql-yoga server with nodemon
```bash
$ yarn db:graphql:serve
```

#### Deploy a graphql-yoga server with pm2
```bash
$ yarn db:graphql:deploy
```

#### Important files
- server-graphql/database/datamodel.graphql
- server-graphql/database/seed.graphql
- src/layouts/MyLayout.vue

### Feathers
To get feathers up and running, you just need to:
```bash
$ yarn serve:feathers
```

Of course you don't have any users set up, so you will have to set them:
```
$ curl 'http://localhost:3030/usn' --data-binary '{ "email": "feathers@example.com", "password": "secret" }'
```

> When you restart feathers it will lose this state, so you will have to figure out a way to persist it. Why not GraphQL? Furthermore, this is not a production ready feathers instance. You will have to do a lot of tuning to get it ready for primetime. If you do improve upon it, why not make a PR?

#### Important files
- /config/dev.json
- /test/jest/server-feathers/services/users.test.js
- /test/jest/server-feathers/app.test.js

## Put it all together
To make an ssr version of this starter with hot-reloading webpack at `localhost:8000`, do this:
```bash
# choose your flavour
$ yarn dev:spa
$ yarn dev:pwa
$ yarn dev:ssr
```

Now start the feathers authentication server
```bash
$ yarn serve:feathers
# make a user
$ curl 'http://localhost:3030/usn' --data-binary '{ "email": "feathers@example.com", "password": "secret" }'
```

Now serve the GraphQL
```bash
$ yarn db:graphql:serve
```

### Meta Plugin

There is an example integration of the Quasar Meta Plugin available in `/src/layouts/MyLayout.vue`. It uses some of the examples from the quasar docs, most notably the `titleTemplate`.

### Linting and code style
This project assumes Standard style of JS. Also it uses an opinionated eslint caching and fixing strategy that you can change in `quasar.conf.js` if it becomes troublesome. There is also a helpful script that can sometimes save your life:
```bash
$ yarn lint:fix
```
If you are working with a colleague and encountering conditions where linting seems to change depending on OS or workstation, make sure that you don't have different versions of eslint installed globally and that your IDE's really are applying the right eslint settings.

### PUG Html Rendering
We decided to use PUG (formerly known as Jade) for writing the HTML part of the SFC's. There are a few subtle differences with PUG, notably that you are actually writing less code and using a YML indentation-type of tag closure as opposed the XML type. 

> Check out PUG [mixins](https://pugjs.org/language/mixins.html). Used properly, they are amazing!!! 

## Testing
So you can see the website in your browser, but are you sure everything is working? This starter kit comes pre-rigged with Jest and Cypress as well as a highly volatile `.babelrc` configuration that includes all of the necessary babel modules. So if something breaks in like ten days when Babel releases a new beta, you are wise to make sure your Babel is configured correctly!

#### Unit tests
The configuration of Jest is in `/jest.config.js`. Do not put configurations anywhere else! There is a very simple example of a Jest unit test at `/test/unit/components/QBtn.spec.js` that checks to make sure that Vue is instantiated and that quasar components are available. To run it in a way that will constantly watch your tested files for changes (and update your coverage):
```bash
$ yarn test:unit:watch
```
![jest screenshot placeholder](docs/jest.png)

#### Unit coverage
Coverage is set to run automatically at liberal high and low-water marks via the Jest config, and the lcov results can be found in the `/test/coverage` folder. See the "Serving" section below for a quick method to see your coverage results in the browser.

> We have noticed that there is a chance of Babel complaining that it can't find module './comments/inheritedLeadingComments'. Strangely it only happens once, on the first run of a coverage test and if you are using VS Code. Running the tests again will make the error disappear. To be on the safe side, we have added the `@babel/types` repo, which you can discover here: https://babeljs.io/docs/en/next/babel-types.html

#### e2e tests
The e2e we are using is Cypress, and the config is found at `/cypress.json`. There is a sample test called `init.spec.js`  that will run, but you obviously have to have the dev server running first.
```bash
$ yarn test:e2e
```
![cypress screenshot placeholder](docs/cypress.png)
If you are smart, you will want to use Vue Devtools with Cypress. To find out how, see this resolved [issue at the Cypress repo](https://github.com/cypress-io/cypress/issues/1742).

#### Lighthouse tests
Lighthouse checks the quality of your PWA app, and although you can run it in any browser, there is really a great deal that you can do with it programmatically. Do not run this on a dev server - it will make you sad!
```bash
$ yarn test:lighthouse:ssr
```
To see your results you will need to serve the generated artifact. To do that see the section below. These are the results that will make you happy:

![lighthouse screenshot placeholder](docs/lighthouse.png)

#### Webpack bundle
When you build your project, this starter will automatically run and build the webpack-bundle-analyzer that you can find at `http://localhost:8888` - in order to [modify its configuration](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin), you will need to create an appropriate object in `/quasar.conf.js` at `build.analyze`. If you want to turn it off, just comment out `analyze: true,`.

## Building
To build your SSR and PWA use this command. It places the artifacts at 
> `/dist/ssr-mat`
```bash
$ yarn build:ssr
```

## Serving
None of this means anything if you don't serve it to either your localhost (or the world). 

#### SSR & PWA
To serve your SSR node app and PWA, this starter kit assumes that you have **nodemon** preinstalled. You will find your site live at: 
> `localhost:3000`
```bash
$ yarn serve:ssr
```

#### Coverage
To keep track of your coverage, you can start a simple server with the `quasar serve` command that you can call with:
```bash
$ yarn serve:test:coverage
```
It will be available at `http://localhost:8788`

#### Lighthouse Results
To actually see the lighthouse results, you can start a simple server with the `quasar serve` command that you can call with:
```bash
$ yarn serve:test:lighthouse
```
It will be available at `http://localhost:8789`

#### NGROK Tunneling
Sometimes you may want someone at the other end of the office (or the planet) to be able to see the current state of what you are working on. This is what the free tool NGROK excels at. To serve the dev ssr version over ngrok, make sure that your dev server is running and use:
```bash
$ yarn serve:dev:ngrok
```

To serve the dist ssr version over ngrok, as above, make sure that you use:
```bash
$ yarn serve:dist:ngrok
```

> About NGROK: You may want to edit the command in the package.json in order to choose a server region closer to you [us, eu, au, ap]

## Deploy
Deployment is one of the trickiest things to get right, and is also why a lot of starter kits don't go into it. We'll try that here: 

#### Deploying with Now.sh
Deploying with [Now](https://zeit.co/now) is a breeze. All you need to do is to follow their [installation instructions](https://zeit.co/now#get-started). They recommend downloading "Now Desktop" but you can skip that and directly install the Now CLI:

```bash
$ yarn global add now
$ now login
$ yarn deploy:ssr-now
# And if you want to serve your graphql too:
$ yarn deploy:graphql-now
```

> You might want to use a "now alias" or connect your domain to Now - or even look into automatic deployment with [their Github integration](https://zeit.co/blog/now-for-github).

`Now.sh` will install the dependencies automatically then run `$ run start`. Your website will be up and running on an HTTPS connection in a matter of seconds!

### Deploying with Docker
Coming soon!
 
### Roll your own
Of course you can do this with your own VPS, on your LAN or even AWS. Setting up that kind of stuff goes beyond what we can cover here, but we have some set up a number of additional scripts here that will help you to deploy a pm2 managed instance of your SSR app. Please consult the pm2 documentation about the description of the individual commands. `pm2 examples` is a great way to find out more about it.

```yml
deploy:ssr-pm2
  pm2 start ./dist/ssr-mat/index.js --name quasar-ssr

deploy:ssr-pm2_clusterize
  pm2 start ./dist/ssr-mat/index.js --name quasar-ssr -i max
  
deploy:ssr-pm2_watch
  pm2 start ./dist/ssr-mat/index.js --name quasar-ssr --watch ./dist/ssr-mat

deploy:ssr-pm2_deep-monitoring
  pm2 start ./dist/ssr-mat/index.js --name quasar-ssr --deep-monitoring
  
deploy:ssr-pm2_restart
  pm2 restart quasar-ssr
  
deploy:ssr-pm2_stop
  pm2 stop quasar-ssr
  
deploy:ssr-pm2_monitor
  pm2 monitor quasar-ssr
  
deploy:ssr-pm2_unmonitor
  pm2 unmonitor quasar-ssr
  
deploy:ssr-pm2_kill
  pm2 kill  
```

## // TODO:
- [ ] vuex example binding
- [ ] docker setup for production use
- [ ] unify .env and feathers config
- [ ] cleanup

#### Final Notes:
Here is the redacted results of running `quasar info` in the project root at the time of the generation of this starter:
```
NodeJs                          8.11.3

Global packages                 
  NPM                           5.6.0
  yarn                          1.9.4
  quasar-cli                    0.17.13
  vue-cli                       2.9.6
  cordova                       8.0.0

Important local packages        
  quasar-cli                    0.17.13  
  quasar-framework              0.17.10  
  quasar-extras                 2.0.6   
  vue                           2.5.17 
  vue-router                    3.0.1   
  vuex                          3.0.1  
  @babel/core                   7.0.0-beta.54      
  webpack                       4.16.5  
  webpack-dev-server            3.1.5   
  workbox-webpack-plugin        3.4.1   
  register-service-worker       1.4.1   
```

#### Contributors
@nothingismagick (rigging, testing, docs) 
@kevinmarrec (graphql)
@borutjures (feathers-auth)
@adampurdy (firebase)

#### License
©2018 to Present - D.C. Thompson and Razvan Stoenescu

MIT
