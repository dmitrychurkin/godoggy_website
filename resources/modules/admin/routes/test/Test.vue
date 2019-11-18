<template lang="pug">
  v-btn(
    @click.stop='apiTest'
  ) test api
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import axios from "axios";
import { api, IRequestEntity, retryDefaultConfig } from "admin/lib/api";

@Component
export default class Test extends Vue {
  @Getter("requests")
  private viewRequests!: IRequestEntity[];
  private async apiTest() {
    console.log("Test api");
    const $cancelTokenSource = axios.CancelToken.source();
    const self = this;
    // setTimeout(() =>
    //   $cancelTokenSource.cancel("Here we are canceling request1")
    // );
    try {
      const response = await api({
        url: "/test/400",
        $retryConfig: {
          ...retryDefaultConfig,
          retries: 5,
          isNeedRetry(...args) {
            console.log("Going to retry request => ", args);
            console.log("requests isNeedRetry => ", self.viewRequests);
            // $cancelTokenSource.cancel("Here we are canceling request2");
            return retryDefaultConfig.isNeedRetry.call(this, ...args);
          }
        },
        $cancelTokenSource
      });
      console.log("response => ", response);
      console.log("requests onResponse => ", self.viewRequests);
    } catch (err) {
      console.log("err => ", err);
      console.log("requests onErr => ", self.viewRequests);
    }
  }
}
</script>