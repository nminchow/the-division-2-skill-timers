<template>
  <div id="wrapper">
    <div class="loader">
      <transition name="fade" mode="out-in">
        <connected v-if="gameActive"/>
        <pending-connection v-else/>
      </transition>
    </div>
    <transition name="component-fade" mode="out-in">
      <span v-if="this.$store.state.keyListeners.editing">
        <key-editor />
      </span>
      <span v-else>
        <v-list two-line>
            <v-list-tile avatar :key="ky.name" v-for="ky in this.$store.state.keyListeners.keys">
              <key-listener :ky="ky" />
            </v-list-tile>
          </v-list>
        <v-btn dark color="#ff6a13" @click="updating">Edit</v-btn>
        <br>
        <br>
        <v-btn @click="toAbout" dark small color="grey">
          help/about
        </v-btn>
      </span>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { ipcRenderer } from 'electron';
  import KeyListener from './Timers/KeyListener';
  import KeyEditor from './Timers/KeyEditor';
  import PendingConnection from './Timers/PendingConnection';
  import Connected from './Timers/Connected';

  const toAbout = function toAbout() {
    this.$router.push('about');
  };

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
      toAbout,
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
<style>
.loader {
  margin: .5em 0 0 .5em;
  height: 60px
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

