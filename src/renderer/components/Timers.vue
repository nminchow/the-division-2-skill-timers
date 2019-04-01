<template>
  <div id="wrapper">
    <connected v-if="gameActive"/>
    <pending-connection v-else/>
    <span v-if="this.$store.state.keyListeners.editing">
      <key-editor />
    </span>
    <span v-else>
      <span :key="ky.name" v-for="ky in this.$store.state.keyListeners.keys">
        <key-listener :ky="ky" />
      </span>
      <v-btn dark color="#ff6a13" @click="updating">Edit</v-btn>
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { ipcRenderer } from 'electron';
  import KeyListener from './Timers/KeyListener';
  import KeyEditor from './Timers/KeyEditor';
  import PendingConnection from './Timers/PendingConnection';
  import Connected from './Timers/Connected';

  const updating = function updating() {
    this.$store.commit('keyListeners/editing', true);
  };

  export default {
    name: 'timers',
    created() {
      this.$store.dispatch('activeWindow/listenForActive');
      ipcRenderer.send('start-listener');
    },
    methods: {
      updating,
    },
    computed: {
      ...mapGetters('activeWindow', [
        'gameActive',
      ]),
    },
    components: {
      KeyListener,
      KeyEditor,
      PendingConnection,
      Connected,
    },
  };
</script>
