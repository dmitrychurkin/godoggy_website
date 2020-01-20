<template lang="pug">
  .body-1.font-weight-thin.grey--text.text--lighten-1 Copyright ©
    |
    |
    a.grey--text.text--lighten-1(
      :href='location.origin'
    ) {{location.host}}
    |
    | {{year}}.
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Copyright extends Vue {
  private readonly location = window.location;
  private year = this.getYear();
  private timerId!: number;

  private created() {
    this.timerId = window.setInterval(() => {
      this.year = this.getYear();
    }, 1000);
  }

  private beforeDestroy() {
    window.clearInterval(this.timerId);
  }

  private getYear() {
    return new Date().getFullYear();
  }
}
</script>
