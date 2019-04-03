<template>
  <v-list-tile-content>
    <v-list-tile-title class="title">
      <vue-countdown class="countdown" @end="reset" @progress="handleProgress" ref="countdown" :auto-start="false" :interval="100" :time="this.interval">
        <template slot-scope="props">
          <span class="timer">
            {{ props.minutes.toString().padStart(2, '0') }}:{{ props.seconds.toString().padStart(2, '0') }}.{{ (props.milliseconds / 100) }}
          </span>
        </template>
      </vue-countdown>
    </v-list-tile-title>
    <v-list-tile-sub-title>{{ ky.name.toUpperCase() }}</v-list-tile-sub-title>
  </v-list-tile-content>
</template>

<script>
  import VueCountdown from '@chenfengyuan/vue-countdown';
  import { Howl } from 'howler';
  import { mapGetters } from 'vuex';

  const { ipcRenderer } = require('electron');

  const keydown = function keydown(_event, keypress) {
    if (!this.iscode(keypress)) return;
    if (this.keyPressed !== 0) return;
    this.keyPressed = Date.now();
  };

  const keyup = function keyup(_event, keypress) {
    if (!this.iscode(keypress)) return;
    const ellapsed = Date.now() - this.keyPressed;
    this.keyPressed = 0;
    this.handleKey(ellapsed);
  };

  const handleKey = function handleKey(ellapsed) {
    console.log(`${ellapsed}`); // eslint-disable-line no-console

    if (!this.running) {
      this.$refs.countdown.start();
      this.running = true;
      return;
    }

    if (ellapsed > 200) {
      this.reset();
    }

    // short press while running
  };

  const reset = function reset() {
    this.$refs.countdown.abort();
    this.running = false;
    this.interval = 0;
    this.alerted = false;
    setTimeout(() => {
      this.interval = this.clonedInterval();
    }, 10);
  };

  const iscode = function iscode({ keycode }) {
    return keycode === this.ky.key && this.gameActive;
  };

  const clonedInterval = function clonedInterval() {
    return JSON.parse(JSON.stringify(this.ky.interval));
  };

  const handleProgress = function handleProgress({ totalSeconds }) {
    if (!this.alerted && totalSeconds < this.ky.notification / 1000) {
      this.alerted = true;
      this.sound.play();
    }
  };

  export default {
    props: ['ky'],
    data() {
      return {
        keyPressed: 0,
        running: false,
        interval: this.clonedInterval(),
        alerted: false,
        sound: null,
      };
    },
    name: 'keyListener',
    methods: {
      keyup,
      keydown,
      handleKey,
      iscode,
      clonedInterval,
      reset,
      handleProgress,

    },
    computed: {
      ...mapGetters('activeWindow', [
        'gameActive',
      ]),
    },
    created() {
      ipcRenderer.on('keyupEmitted', this.keyup);
      ipcRenderer.on('keydownEmitted', this.keydown);
      this.sound = new Howl({
        src: ['/static/notification.mp3'],
      });
    },
    components: {
      VueCountdown,
    },
    destroyed() {
      ipcRenderer.removeAllListeners('keyupEmitted');
      ipcRenderer.removeAllListeners('keydownEmitted');
    },
  };
</script>

<style>
 .ability {
   display: block;
 }

h3 {
  display: inline;
}

.title {
  height: 40px;
}

.countdown {
  line-height: 33px;
  font-size: 2em;
  margin-left: 1%;
}
</style>
