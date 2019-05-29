# the-division-2-skill-timers

> Skill timer assistant for \"the division 2\"

[Executable Download](https://github.com/nminchow/the-division-2-skill-timers/raw/master/build/ISAC%2B%200.0.1.exe)

This app aims to help remind you to recall your skills in "The Division 2" before their timers are up. It does this by listening for "Q" or "E" keyboard (or gamepad) events, and starting a timer when pressed. When you should recall the skill, an audio queue is played.

The length of your timers is totally configurable via the "edit" menu.

# Contributing

## Development Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# lint all JS/Vue component files in `src/`
npm run lint
```

**Note:** The app will only respond to key commands when it detects a window open called "Tom Clancy's The Division 2". You can either disable that check [here](https://github.com/nminchow/the-division-2-skill-timers/blob/master/src/renderer/store/modules/activeWindow.js#L8), or create a window with that title. On Windows, a notepad window's title is the name of the file, so creating a file called "Tom Clancy's The Division 2" will simulate the game being open.

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
