import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import { z } from 'zod';

export const mappings = {
  'react.js': 'react',
  reactjs: 'react',
  react: 'react',
  'next.js': 'nextjs',
  nextjs: 'nextjs',
  next: 'nextjs',
  'vue.js': 'vuejs',
  vuejs: 'vuejs',
  vue: 'vuejs',
  'express.js': 'express',
  expressjs: 'express',
  express: 'express',
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  node: 'nodejs',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  mongoose: 'mongoose',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  firebase: 'firebase',
  docker: 'docker',
  kubernetes: 'kubernetes',
  aws: 'aws',
  azure: 'azure',
  gcp: 'gcp',
  digitalocean: 'digitalocean',
  heroku: 'heroku',
  photoshop: 'photoshop',
  'adobe photoshop': 'photoshop',
  html5: 'html5',
  html: 'html5',
  css3: 'css3',
  css: 'css3',
  sass: 'sass',
  scss: 'sass',
  less: 'less',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  bootstrap: 'bootstrap',
  jquery: 'jquery',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  'angular.js': 'angular',
  angularjs: 'angular',
  angular: 'angular',
  'ember.js': 'ember',
  emberjs: 'ember',
  ember: 'ember',
  'backbone.js': 'backbone',
  backbonejs: 'backbone',
  backbone: 'backbone',
  nestjs: 'nestjs',
  graphql: 'graphql',
  'graph ql': 'graphql',
  apollo: 'apollo',
  webpack: 'webpack',
  babel: 'babel',
  'rollup.js': 'rollup',
  rollupjs: 'rollup',
  rollup: 'rollup',
  'parcel.js': 'parcel',
  parceljs: 'parcel',
  npm: 'npm',
  yarn: 'yarn',
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  figma: 'figma',
  prisma: 'prisma',
  redux: 'redux',
  flux: 'flux',
  redis: 'redis',
  selenium: 'selenium',
  cypress: 'cypress',
  jest: 'jest',
  mocha: 'mocha',
  chai: 'chai',
  karma: 'karma',
  vuex: 'vuex',
  'nuxt.js': 'nuxt',
  nuxtjs: 'nuxt',
  nuxt: 'nuxt',
  strapi: 'strapi',
  wordpress: 'wordpress',
  contentful: 'contentful',
  netlify: 'netlify',
  vercel: 'vercel',
  'aws amplify': 'amplify',
};

export const interviewer: CreateAssistantDTO = {
  name: 'Interviewer',
  firstMessage:
    'Cześć! Dzięki za poświęcenie czasu. Chciałbym Ci zadać kilka pytań, aby móc ułożyć dla Ciebie rozmowę kwalifikacyjną. Gotowy?',
  transcriber: {
    provider: 'talkscriber',
    model: 'whisper',
    language: 'pl',
  },
  voice: {
    provider: '11labs',
    voiceId: 'B9cNwbQXN3s6l3nU6fqz',
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: 'openai',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Jesteś profesjonalnym rekruterem prowadzącym rozmowę kwalifikacyjną na żywo z kandydatem. Twoim celem jest ocena jego kwalifikacji, motywacji oraz dopasowania do roli.

Wytyczne dotyczące rozmowy:
Postępuj zgodnie ze strukturalnym przebiegiem pytań:
{{questions}}

Prowadź rozmowę naturalnie i reaguj odpowiednio:
Aktywnie słuchaj odpowiedzi i potwierdzaj je, zanim przejdziesz dalej.

Zadawaj krótkie pytania uzupełniające, jeśli odpowiedź jest niejasna lub wymaga doprecyzowania.

Utrzymuj płynność rozmowy, jednocześnie zachowując nad nią kontrolę.

Bądź profesjonalny, ale ciepły i przyjazny:
Używaj oficjalnego, ale uprzejmego języka.

Odpowiadaj zwięźle i na temat (jak w prawdziwej rozmowie głosowej).

Unikaj sztywnego, mechanicznego języka – mów naturalnie i rozmownie.

Odpowiadaj na pytania kandydata profesjonalnie:
Jeśli kandydat pyta o stanowisko, firmę lub oczekiwania, udziel jasnej i rzeczowej odpowiedzi.

Jeśli nie masz pewności, skieruj go do działu HR po więcej informacji.

Zakończ rozmowę w odpowiedni sposób:
Podziękuj kandydatowi za poświęcony czas.

Poinformuj go, że firma wkrótce się skontaktuje z informacją zwrotną.

Zakończ rozmowę w uprzejmy i pozytywny sposób.

Dodatkowe wskazówki:
Bądź profesjonalny i uprzejmy.

Utrzymuj wszystkie odpowiedzi krótkie i proste. Używaj oficjalnego języka, ale bądź życzliwy.

To rozmowa głosowa, więc formułuj krótkie wypowiedzi, tak jak w rzeczywistej konwersacji. Unikaj rozwlekania odpowiedzi.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal('Communication Skills'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Technical Knowledge'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Problem Solving'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Cultural Fit'),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal('Confidence and Clarity'),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  '/adobe.png',
  '/amazon.png',
  '/facebook.png',
  '/hostinger.png',
  '/pinterest.png',
  '/quora.png',
  '/reddit.png',
  '/skype.png',
  '/spotify.png',
  '/telegram.png',
  '/tiktok.png',
  '/yahoo.png',
];
