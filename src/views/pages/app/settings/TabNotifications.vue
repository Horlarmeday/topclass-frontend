<template>
  <vx-card no-shadow>

    <div class="mb-base">
      <h6 class="mb-4">Activity</h6>
      <div class="flex items-center mb-4">
        <vs-switch v-model="answer" />
        <span class="ml-4">Receive Email on system notifications</span>
      </div>
      <div class="flex items-center mb-4">
        <vs-switch v-model="follow" />
        <span class="ml-4">Receive Email on system update</span>
      </div>
    </div>

    <div>
      <h6 class="mb-4">Application</h6>

      <div class="flex items-center mb-4">
        <vs-switch v-model="news" />
        <span class="ml-4">Receive Notifications</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-base">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>

  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      answer: true,
      follow: false,
      news: false,
    }
  }
}
</script>
