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
              label="Countdown Time (milliseconds)"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              label="Notification Time (milliseconds)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-btn dark color="#ff6a13" @click="updating">Cancel</v-btn>
  </span>
</template>

<script>
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
    },
    created() {
      this.keys = this.$store.state.keyListeners.keys.map(x => ({ ...x }));
    },
  };
</script>
