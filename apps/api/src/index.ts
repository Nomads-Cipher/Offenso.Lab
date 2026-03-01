import { config } from "./config.js";
import { getApp } from "./createApp.js";

async function main() {
  const app = await getApp();

  app.listen(config.port, config.host, () => {
    // keep stdout clean for dev; a single line is enough
    console.log(`API listening on http://${config.host}:${config.port}`);
    console.log(`GraphQL ready at http://${config.host}:${config.port}/api/graphql`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

