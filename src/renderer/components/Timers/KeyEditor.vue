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
              :counter="10"
              label="Label"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="ky.interval"
              mask="##########"
              label="Countdown Time (milliseconds)"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="ky.notification"
              mask="##########"
              label="Notification Time (milliseconds)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-btn dark color="rgb(62, 156, 101)" @click="save">Save</v-btn>
    <v-btn dark color="#ff6a13" @click="updating">Cancel</v-btn>
  </span>
</template>

<script>
  const save = function updating() {
    const numberified = this.keys.map(x => ({
      ...x,
      interval: parseInt(x.interval, 10),
      notification: parseInt(x.notification, 10),
    }));
    this.$store.commit('keyListeners/update', numberified);
    this.$store.commit('keyListeners/editing', false);
  };

  const updating = function updating() {
    this.$store.commit('keyListeners/editing', false);
  };

  export default {
    data() {
      return {
        keys: [],
      };
    },
    methods: {
      updating,
      save,
    },
    created() {
      this.keys = this.$store.state.keyListeners.keys.map(x => ({ ...x }));
    },
  };
</script>
