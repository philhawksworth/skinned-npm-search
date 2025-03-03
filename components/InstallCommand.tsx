
export default function InstallCommand(command: string) {
  return `
  <div class="deno-install">
    <img src="/deno-logo-dark-transparent.svg" alt="Deno Logo" />
    <code class="install">deno add ${command}</code>
  </div>
  `
}