<template>
  <v-layout>
    <v-flex>
      <v-card  flat>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Setup</h3>
            <div>
              <p>To get rolling, click "edit" and set your "Ability Time" to your
              ability run time, and your "Notification Time" to when
              you would like to get notified that your ability's duration is almost up. </p>
              <p> For example, if I am using a turrent that stays active for 60 seconds,
              and I want to get notified 10 seconds before it de-spawns, I would set my
              "Ability Time" to 60 and my "Notification Time" to 10.</p>
              <p> To disable a timer, set its "Ability Time" to 0.</p>
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn @click="toHome" dark color="grey">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  const currentWindow = require('electron').remote.getCurrentWindow();

  const toHome = function toHome() {
    this.$router.push('/');
  };

  export default {
    name: 'about',
    methods: {
      toHome,
    },
    created() {
      currentWindow.setSize(525, 340);
    },
    destroyed() {
      currentWindow.setSize(340, 340);
    },
  };
</script>
