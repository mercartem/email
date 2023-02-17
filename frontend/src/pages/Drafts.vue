<template>
  <div class="q-pa-md q-gutter-md">
    <q-list separator bordered class="rounded-borders">
      <q-item-label header>Draft</q-item-label>

      <q-item
        v-for="mail in draft"
        :key="mail.title"
        clickable
        v-ripple
        @click="
          selectedMail = mail;
          medium = true;
        "
      >
        <q-item-section>
          <q-item-label lines="1">{{ mail.title }}</q-item-label>
          <q-item-label caption lines="2">
            {{ mail.text }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{ selectedMail.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ selectedMail.text }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useMailStore } from "../stores/mails";

export default defineComponent({
  setup() {
    const selectedMail = ref(null);
    const mailStore = useMailStore();
    const draft = computed(() => {
      return mailStore.draft;
    });
    return {
      medium: ref(false),
      draft,
      selectedMail,
    };
  },
});
</script>
