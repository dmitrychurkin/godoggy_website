<template lang="pug">
  v-snackbar(
    v-model='isShowSnackbar'
    :color='currentNotification.color'
  )
    | {{currentNotification.text}}
    v-btn(
      text
      @click.stop.prevent='onClose'
    ) ok
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { Getter, Mutation } from "vuex-class";
  import {
    INotification,
    NotificationLevel
  } from "admin/store/modules/notifications/state";
  import { HIDE_NOTIFICATION } from "admin/store/modules/notifications/mutation-types";

  const COLORS = {
    [NotificationLevel.ERROR]: "error",
    [NotificationLevel.WARN]: "amber",
    [NotificationLevel.SUCCESS]: "success",
    [NotificationLevel.INFO]: "info"
  };

  @Component
  export default class AppNotificator extends Vue {
    /*
  // test case
  private mounted() {
    // begin create notifications
    const testNotifications: INotification[] = [
      {
        text: "Notification 1",
        type: NotificationLevel.ERROR
      },
      {
        text: "Notification 2",
        type: NotificationLevel.WARN
      },
      {
        text: "Notification 3",
        type: NotificationLevel.SUCCESS
      },
      {
        text: "Notification 4",
        type: NotificationLevel.INFO
      }
    ];
    setTimeout(() => {
      // begin test after 5s
      for (const { text, type } of testNotifications) {
        setTimeout(() => {
          // every second add 1 notification
          setNotification({
            subject: text,
            type
          });
        }, 1000);
      }
    }, 5000);
  }
*/

    @Getter("notifications")
    readonly appNotifications!: Array<INotification>;

    @Mutation(HIDE_NOTIFICATION)
    readonly hideNotification!: (id: number | string) => void;

    @Watch("appNotifications", { immediate: true })
    onAppNotificationsStateChange(
      notifications: Array<INotification>,
      oldValue: Array<INotification>
    ) {
      if (notifications.length > 0 && oldValue.length === 0) {
        this.isShowSnackbar = true;
      }
    }

    showShackbar = false;
    get isShowSnackbar() {
      return this.showShackbar;
    }

    set isShowSnackbar(value: boolean) {
      if (!value) {
        this.hideNotification(0);
        if (this.appNotifications.length > 0) {
          setTimeout(() => (this.isShowSnackbar = true), 1000);
        }
      }
      this.showShackbar = value;
    }

    get currentNotification() {
      const { type, text } = this.appNotifications[0] ?? {};
      return {
        text,
        color: COLORS[type]
      };
    }

    onClose() {
      this.isShowSnackbar = false;
    }
  }
</script>
