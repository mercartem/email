import getRandomAvatarNumber from "src/utils/utils";
import { Mail, Draft } from "src/stores/mails";

const server = "http://localhost:3333";

async function getIncomingEmails() {
  try {
    const response = await fetch(`${server}/incoming-mail/`);
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
    const response = await fetch(`${server}/letters/`);
    const data = await response.json();
    return data.sort((a: { id: number }, b: { id: number }) => b.id - a.id);
  } catch (error) {
    console.error(error);
  }
}

async function createSendMails(mail: Draft) {
  try {
    await fetch(`${server}/letters/`, {
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

async function deleteSendMails() {
  try {
    await fetch(`${server}/letters/`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteIncomingMails() {
  try {
    await fetch(`${server}/incoming-mail/`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}

export {
  getIncomingEmails,
  getSendEmails,
  createSendMails,
  deleteSendMails,
  deleteIncomingMails,
};
