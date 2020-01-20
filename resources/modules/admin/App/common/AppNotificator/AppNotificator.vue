<template lang="pug">
  v-snackbar(
    v-model='isShowSnackbar'
    :color='currentNotification.colors.snackbar'
  )
    | {{currentNotification.text}}
    v-btn(
      text
      @click.stop.prevent='onClose'
    ) ok
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { removeNotification, setNotification } from "./util";
import { INotification, NotificationLevel } from "./types";

@Component
export default class AppNotificator extends Vue {
  private static colorMaps = {
    [NotificationLevel.ERROR]: {
      snackbar: "error"
    },
    [NotificationLevel.WARN]: {
      snackbar: "warning"
    },
    [NotificationLevel.SUCCESS]: {
      snackbar: "success"
    },
    [NotificationLevel.INFO]: {
      snackbar: "info"
    }
  };

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
  private readonly appNotifications!: Array<INotification>;

  @Watch("appNotifications", { immediate: true })
  private onAppNotificationsStateChange(
    notifications: Array<INotification>,
    oldValue: Array<INotification>
  ) {
    if (notifications.length > 0 && oldValue.length === 0) {
      this.isShowSnackbar = true;
    }
  }

  private showShackbar = false;
  private get isShowSnackbar() {
    return this.showShackbar;
  }

  private set isShowSnackbar(value: boolean) {
    if (!value) {
      removeNotification({ id: 0 });
      if (this.appNotifications.length > 0) {
        setTimeout(() => (this.isShowSnackbar = true), 1000);
      }
    }
    this.showShackbar = value;
  }

  private get currentNotification() {
    const notification = this.appNotifications[0] || {};
    return {
      ...notification,
      colors: {
        ...AppNotificator.colorMaps[notification.type]
      }
    };
  }

  private onClose() {
    this.isShowSnackbar = false;
  }
}
</script>
