<template>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      style="min-height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>E-mail App</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500">
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item to="/" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section> Inbox </q-item-section>

              <div class="q-pa-md q-gutter-md">
                <q-badge rounded color="primary" :label="incomingMailCounter" />
              </div>
            </q-item>

            <q-item to="/send" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>

              <div class="q-pa-md q-gutter-md">
                <q-badge rounded color="primary" :label="sendMailCounter" />
              </div>
            </q-item>

            <q-item to="/drafts" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Drafts </q-item-section>

              <div class="q-pa-md q-gutter-md">
                <q-badge rounded color="primary" :label="draftCounter" />
              </div>
            </q-item>
          </q-list>
          <div class="q-pa-md">
            <q-btn-group spread>
              <q-btn color="primary" label="Send" @click="sendAllDrafts" />
              <q-btn color="primary" label="Receive" @click="getAllIncoming" />
            </q-btn-group>
          </div>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <div class="q-pa-md q-gutter-sm row justify-end">
          <q-btn color="primary" label="Create" @click="medium = true" />
        </div>
        <keep-alive>
          <router-view />
        </keep-alive>
        <q-dialog v-model="medium">
          <q-card style="width: 700px; max-width: 80vw">
            <div class="q-pa-md">
              <q-form
                @submit.prevent="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  outlined
                  v-model="title"
                  label="Title"
                  :dense="dense"
                  :model-value="title"
                />

                <q-input
                  v-model="text"
                  filled
                  type="textarea"
                  :model-value="text"
                />

                <div>
                  <q-btn
                    label="Create"
                    type="submit"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </div>
          </q-card>
        </q-dialog>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useMailStore } from "../stores/mails";
import { getIncomingEmails, getSendEmails, createSendMails } from "../api/api";

export default {
  setup() {
    const title = ref(null);
    const text = ref(null);
    const mailStore = useMailStore();

    async function init() {
      const incomingEmails = await getIncomingEmails();
      const sentEmails = await getSendEmails();
      mailStore.setMails(incomingEmails);
      mailStore.setSend(sentEmails);
    }
    init();

    const incomingMailCounter = computed(() => {
      return mailStore.mails.length;
    });
    const draftCounter = computed(() => {
      return mailStore.draft.length;
    });
    const sendMailCounter = computed(() => {
      return mailStore.send.length;
    });

    function setDraft() {
      mailStore.setDraft([
        ...mailStore.draft,
        {
          title: title.value,
          text: text.value,
        },
      ]);
    }
    async function sendAllDrafts() {
      try {
        await Promise.all(
          mailStore.draft.map(async (mail) => {
            await createSendMails(mail);
          })
        );
        mailStore.setDraft([]);
        mailStore.setSend(await getSendEmails());
      } catch (error) {
        console.error(error);
      }
    }
    async function getAllIncoming() {
      mailStore.setMails(await getIncomingEmails());
    }

    return {
      incomingMailCounter,
      draftCounter,
      sendMailCounter,
      title,
      text,
      drawer: ref(false),
      medium: ref(false),
      onReset() {
        title.value = null;
        text.value = null;
      },
      onSubmit() {
        setDraft();
        title.value = null;
        text.value = null;
      },
      getAllIncoming,
      sendAllDrafts,
    };
  },
};
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
