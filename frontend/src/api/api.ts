import getRandomAvatarNumber from "src/utils/utils";
import { Mail, Draft } from "src/stores/mails";

async function getIncomingEmails() {
  try {
    const response = await fetch("http://localhost:3333/incoming-mail/");
    const data = await response.json();
    const mails = data.map((mail: Mail) => ({
      ...mail,
      avatar: `https://cdn.quasar.dev/img/avatar${getRandomAvatarNumber()}.jpg`,
    }));
    return mails.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
  } catch (error) {
    console.error(error);
  }
}

async function getSendEmails() {
  try {
    const response = await fetch("http://localhost:3333/letters/");
    const data = await response.json();
    return data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
  } catch (error) {
    console.error(error);
  }
}

async function createSendMails(mail: Draft) {
  try {
    await fetch("http://localhost:3333/letters/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mail),
    });
  } catch (error) {
    console.error(error);
  }
}

export { getIncomingEmails, getSendEmails, createSendMails };
