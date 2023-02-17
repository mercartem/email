import { defineStore } from "pinia";

export interface Mail {
  id: number;
  sender: string;
  title: string;
  text: string;
  createdAt: string;
  avatar: string;
}

export interface Draft {
  title: string;
  text: string;
  createdAt?: string;
}

export const useMailStore = defineStore({
  id: "mail",
  state: () => ({
    mails: [] as Mail[],
    draft: [] as Draft[],
    send: [] as Draft[],
  }),
  actions: {
    setMails(mails: Mail[]) {
      this.mails = mails;
    },
    setDraft(draft: Draft[]) {
      this.draft = draft;
    },
    setSend(send: Draft[]) {
      this.send = send;
    },
  },
});
