import * as cheerio from 'cheerio';
import page from "./templates/page.tsx";
import home from "./pages/home.tsx";
import InstallCommand from "./components/InstallCommand.tsx";
import { serveFile } from "@std/http/file-server";


// get a list of routes to local files we can serve
const routes: string[] = ["/"];
for await (const dirEntry of Deno.readDir("./www")) {
  routes.push(`/${dirEntry.name}`);
}



/**
 * @param {Request} request
 * @returns {Response}
 */
async function handleRequest(request: Request) {

  const url = new URL(request.url);
  const pathname = url.pathname;
  if (pathname === "/") {  
    const content = {
      title: "Deno and nopm",
      content: home()
    }
    return new Response(page(content), {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });

  } else if (routes.includes(pathname)) {
    // serve static files if we have 'em
    return await serveFile(request, `./www/${pathname}` );
  } else if (pathname.startsWith("/search")) {
    // serve our own search page wrapper
    url.hostname = "www.npmjs.com";
    url.port = "";
    console.log("serving search page wrapper for:", url.href);
    const $ = await cheerio.fromURL(url.href);
    
    // determine and append the deno install command for each package
    $("section").each(function() {
      const title = $(this).find("h3").text();
      $(this).find('p').before(InstallCommand(title));
    });
    const listing = $('section');
    
    const content = {
      title: "NPM Search",
      content: listing,
      install: "",
      searchStr: url.searchParams.get("q")
    }
    return new Response(page(content), {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });

  } else if (pathname.startsWith("/package")) {
    // serve our own search page wrapper
    url.hostname = "www.npmjs.com";
    url.port = "";
    console.log("serving package page wrapper for:", url.href);
    const $ = await cheerio.fromURL(url.href);
    const searchResults = $("#readme");
    const install = $("button[aria-label='Copy install command line']").prev().text().replace("npm i ", "deno add npm:");
    const packageName = $("h2:first").text();
    
    const content = {
      title: packageName,
      content: searchResults,
      install: install,
    }
    return new Response(page(content), {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });


  } else {
      // proxy all unsatisfies local requests to the npm domain
      url.hostname = "www.npmjs.com";
      url.port = "";
      return await fetch(url, { headers: request.headers });  
    }

}

Deno.serve(handleRequest);
