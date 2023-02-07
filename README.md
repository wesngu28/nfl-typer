<div align="center">
  <h1>NFL Typer</h1>
A small little game where you have to type as many NFL players you can in 60 seconds, with filterable team and position.

<img src="/public/typer.png">

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82"> <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">

</div>

## About

NFL Typer is a game that challenges you to type as many NFL players in a configurable amount of time as you can. It also features the ability to change the team and position of the players to reduce the scope and test knowledge on certain teams and skill positions. You can also save your scores by using a magic link signup to track your high scores.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm run dev` to start the development server.
5. Visit `http://localhost:3000` in your web browser to view the application.

## 💻 Technologies

- Nuxt.js: a JavaScript framework for building server-rendered or statically-exported applications using Vue.
- Tailwind: a CSS utility class library to quicken and bootstrap development of appealing and accessible websites.
- Supabase: A backend as a service, providing features like a Postgres database and authentication with many OAuth providers.
- TypeScript: A typed superset of JavaScript, bringing type safety and runtime checking.

## Notes

Rather than use one big component for the game logic and passing many props down throughout the application, I chose to separate them into related sibling components and tightly couple them using a Pinia store. I find this works better for me in a small project like this.
