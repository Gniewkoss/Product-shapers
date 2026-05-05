import { getPayload } from "payload";

import config from "@payload-config";

const email = process.env.RESET_EMAIL?.trim();
const password = process.env.RESET_PASSWORD;

if (!email || !password) {
  console.error("Set RESET_EMAIL and RESET_PASSWORD (e.g. in cms/.env).");
  process.exit(1);
}

const payload = await getPayload({ config });

const result = await payload.update({
  collection: "users",
  where: { email: { equals: email } },
  data: { password },
});

if (!result.docs.length) {
  console.error(`No user matched email=${email}. Nothing was changed.`);
  process.exit(2);
}

console.log(`Hasło zmienione (zaktualizowano ${result.docs.length} użytkownika).`);
process.exit(0);
