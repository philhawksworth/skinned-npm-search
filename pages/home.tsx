import InstallCommand from "../components/InstallCommand.tsx";

const packages = [
  "astro",
  "chalk",
  "cheerio",
  "effect",
  "express",
  "moment",
  "solid-js",
  "netlify-cli",
  "zod"
]

export default function home() {
  return `
  <div class="subheader">
    <h2>Import over 2 million npm packages into your Deno project</h2>
    <a href="/package/react">${InstallCommand("react")}</a>  
  </div>

<h2>Just a few of the popular npm packages guaranteed to work with Deno</h2>
  ${packages.map(p => `<a href="/package/${p}" class="plain">${InstallCommand(p)}</a>`).join("")}

<h2>Importing in-line</h2>

<h2>Importing via deno.json</h2>

<h2>Importing via package.json</h2>

<h2>Run Node programs with Deno</h2>

<h2>Node/npm cheatsheet</h2>  

https://docs.deno.com/runtime/fundamentals/node/#node-to-deno-cheatsheet
  `;
}
