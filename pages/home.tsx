import InstallCommand from "../components/InstallCommand.tsx";

const packages = [
  "express",
  "chalk",
  "cheerio",
  "moment",
  "netlify-cli",
]

export default function home() {
  return `
  <p>You can use packages from npm in your deno projects</p>
  <ul class="no-bullets">
    ${packages.map(p => `<li> ${InstallCommand(p)} - <a href="/package/${p}">${p}</a></li>`).join("")}
  </ul>
  `;
}
