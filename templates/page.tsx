import InstallCommand from "../components/InstallCommand.tsx";

interface PageProps {
  title: string;
  content?: string;
  install: string;
  searchStr?: string;
}

export default function page({ title, content, install, searchStr }: PageProps) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>NPM Package</title>
       <link rel="stylesheet" href="https://static-production.npmjs.com/styles.3c3ef91f073352bb91e7.css" />
       <link rel="stylesheet" href="/styles.css" />
       <title>${title? title: "NPM Package"}</title>
    </head>
    <body>
      <header>
        <div class="nav-bar">
          <img src="/deno-wordmark-dark-transparent.svg" class="deno-logo" alt="Deno Logo" />
          <a href="/">npm and node</a>
        </div>
        <h1>Deno and npm</h1>
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Find npm packages to install with deno" value="${searchStr ? searchStr : ""}" />
          <button type="submit">Search</button>
        </form>
      </header>
      ${install ? `<div class="subheader"><h1>${title}</h1><p><a href="https://docs.deno.com/runtime/fundamentals/node/#using-npm-packages">Install and manage</a> ${title} as a dependency using Deno</p>${InstallCommand(title)}</div>` : ""}
      <main>
      <div class="readme">
          ${content}
        </div>
      </main>
    </body>
  </html>
  `;
}