<template>
  <span>
    <v-form :key="ky.key" v-for="ky in keys">
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="ky.name"
              label="Label"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="ky.interval"
              mask="###"
              label="Ability Time (seconds)"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="ky.notification"
              mask="###"
              label="Notification Time (seconds)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-btn dark color="#ff6a13" @click="save">Save</v-btn>
    <v-btn dark color="grey" @click="cancel">Cancel</v-btn>
  </span>
</template>

<script>
  const currentWindow = require('electron').remote.getCurrentWindow();

  const save = function updating() {
    const numberified = this.keys.map(x => ({
      ...x,
      interval: (parseInt(x.interval, 10) * 1000),
      notification: (parseInt(x.notification, 10) * 1000),
    }));
    this.$store.commit('keyListeners/update', numberified);
    this.$store.commit('keyListeners/editing', false);
  };

  const cancel = function cancel() {
    this.$store.commit('keyListeners/editing', false);
  };

  export default {
    data() {
      return {
        keys: [],
      };
    },
    methods: {
      cancel,
      save,
    },
    created() {
      currentWindow.setSize(525, 340);
      this.keys = this.$store.state.keyListeners.keys.map(x => ({
        ...x,
        interval: x.interval / 1000,
        notification: x.notification / 1000,
      }));
    },
    destroyed() {
      currentWindow.setSize(340, 340);
    },
  };
</script>
