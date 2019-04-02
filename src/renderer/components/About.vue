<template>
  <v-layout>
    <v-flex>
      <v-card  flat>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Setup</h3>
            <div>
              <p>To get rolling, click "edit" and set your "Countdown Time" to your
              ability run time, and your "Notification Time" to the time that
              you would like to get notified that your ability's cooldown is almost up. </p>
              <p> For example, if I am using a turrent that stays active for 60 seconds,
              and I want to get notified 10 seconds before it de-spawns, I would set my
              "Countdown Time" to 60 and my "Notification Time" to 10.</p>
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

  const toHome = function toHome() {
    this.$router.push('/');
  };

  export default {
    name: 'about',
    methods: {
      toHome,
    },
  };
</script>
