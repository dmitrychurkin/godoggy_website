<template lang="pug">
  v-app#app
    v-content
      v-container.v-application--wrap(
        v-if='isShowAppLoader'
      )
        v-progress-circular.ma-auto(
          indeterminate
          size=50
          color='primary'
        )
      router-view(
        v-else
      )
    AppNotificator
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

// const Auth = namespace("auth");

@Component
export default class App extends Vue {
  @Getter("isShowAppLoader")
  private readonly isShowAppLoader!: boolean;
  // @Auth.Getter("isAuthenticated")
  // private readonly isAuthenticated!: boolean;

  // @Auth.Getter("getToken")
  // private readonly storageToken!: string | null;
}
</script>
