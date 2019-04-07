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
        <v-btn @click="quit" dark small color="grey">
          Quit
        </v-btn>
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

  const quit = function quit() {
    ipcRenderer.send('quit');
  };

  const updating = function updating() {
    this.$store.commit('keyListeners/editing', true);
  };

  const getGamepadData = function getGamepadData() {
    const gamepads = navigator.getGamepads();
    const pressedButtons = Array.from({ length: gamepads.length })
      .map((x, i) => gamepads[i]).filter(x => x !== null)
      .map(gamePad => gamePad.buttons.reduce((accumulator, element, index) => {
        if (element.pressed) {
          accumulator.push(index);
        }

        return accumulator;
      }, []));

    pressedButtons.forEach((controller, index) => {
      const newlyPressed = controller
        .filter(x => !(this.currentlyPressedButtons[index] || []).includes(x));
      newlyPressed.forEach(pressed => ipcRenderer.send('bounce', 'keydownEmitted', {
        keycode: `gp-${pressed}`,
      }));

      const released = (this.currentlyPressedButtons[index] || [])
        .filter(x => !controller.includes(x));
      released.forEach(pressed => ipcRenderer.send('bounce', 'keyupEmitted', {
        keycode: `gp-${pressed}`,
      }));
    });

    this.currentlyPressedButtons = pressedButtons;
  };

  export default {
    name: 'timers',
    data() {
      return {
        gamepadPoller: null,
        currentlyPressedButtons: [],
      };
    },
    created() {
      this.gamepadPoller = setInterval(this.getGamepadData, 25);
      this.$store.dispatch('activeWindow/listenForActive');
      console.log(navigator); // eslint-disable-line no-console
      ipcRenderer.send('start-listener', navigator.getGamepads);
    },
    destroyed() {
      clearInterval(this.gamepadPoller);
    },
    methods: {
      toAbout,
      quit,
      updating,
      getGamepadData,
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

