<template lang="pug">
  fragment
    v-app-bar(
      clipped-left
      fade-img-on-scroll
      prominent
      app
      color='primary'
      dark
      shrink-on-scroll
      src='//picsum.photos/1920/1080?random'
    )
      template(
        v-slot:img='{ props }'
      )
        v-img(
          v-bind='props'
          gradient='to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)'
        )
      v-toolbar-title Site Title
      v-spacer
      v-menu(
        bottom
        left
      )
        template(
          v-slot:activator='{ on }'
        )
          v-btn(
            icon
            v-on='on'
          )
            v-icon {{mdiDotsVerticalIcon}}
        v-list
          v-list-item(
            v-for='item in dropDownMenu'
            :key='item.title'
            @click='item.action'
            dense
          )
            v-list-item-icon
              v-icon {{item.icon}}
            v-list-item-title {{item.title}}
    v-navigation-drawer(
      :mini-variant.sync='isMini'
      permanent
      clipped
      app
    )
      v-list-item
        v-list-item-avatar
          v-img(
            src='//randomuser.me/api/portraits/men/85.jpg'
          )
        v-list-item-title John Leider
        v-btn(
          icon
          @click.stop="isMini = !isMini"
        )
          v-icon {{mdiChevronLeftIcon}}
      v-divider
      v-list(
        nav
        dense
        shaped
      )
        template(
          v-for='drawerItem in drawerMenu'
        )
          template(
            v-if='Array.isArray(drawerItem.sub)'
          )
            v-list-group(
              :prepend-icon='drawerItem.icon'
              :group='drawerItem.group'
              no-action
            )
              template(
                v-slot:activator
              )
                v-list-item-content
                  v-list-item-title {{drawerItem.title}}
              v-list-item(
                v-for='subItem in drawerItem.sub'
                link
                exact
                :key='subItem.title'
                :to='subItem.to'
              )
                v-list-item-content
                  v-list-item-title {{subItem.title}}
          v-list-item(
            v-else
            link
            exact
            color='primary'
            :to='drawerItem.to'
          )
            v-list-item-icon
              v-icon {{drawerItem.icon}}
            v-list-item-content
              v-list-item-title {{drawerItem.title}}
    router-view
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {
  mdiChevronLeft,
  mdiHomeCity,
  mdiSettings,
  mdiAccountGroupOutline,
  mdiLogout,
  mdiDotsVertical
} from "@mdi/js";
import { LOGOUT_USER } from "admin/store/modules/auth/action-types";
import { AxiosResponse } from "axios";
import { retryDefaultConfig } from "admin/lib/api";
import { DASHBOARD_ROUTE, CUSTOMIZE_ROUTES } from "admin/constants";

const Auth = namespace("auth");

@Component
export default class Dashboard extends Vue {
  private readonly mdiChevronLeftIcon = mdiChevronLeft;
  private readonly mdiDotsVerticalIcon = mdiDotsVertical;

  @Auth.Action(LOGOUT_USER)
  private readonly logout!: () => Promise<AxiosResponse>;
  private readonly drawerMenu = [
    {
      title: "Home",
      icon: mdiHomeCity,
      to: DASHBOARD_ROUTE
    },
    {
      title: "Customize",
      icon: mdiSettings,
      // isActive: false,
      group: CUSTOMIZE_ROUTES.self.path,
      sub: [
        {
          title: "General Settings",
          to: CUSTOMIZE_ROUTES.child.GENERAL
        },
        {
          title: "Accommodation",
          to: CUSTOMIZE_ROUTES.child.ACCOMMODATION
        },
        { title: "Personalize" },
        { title: "Site Settings" }
      ]
    },
    { title: "Users", icon: mdiAccountGroupOutline }
  ];
  private readonly dropDownMenu = [
    { title: "Logout", icon: mdiLogout, action: () => this.logout() }
  ];
  private isMini = false;

  /* private beforeRouteEnter(to: any, from: any, next: any) {
    console.log("BEFORE ROUTE DASHBOARD ENTER => ", to, from, next);
    next((vm: Vue) => console.log("vm => ", vm.$store));
  }
  // testing case
  private async testSendRequest() {
    try {
      const testResponse = await this.$axios({
        $blockUntilResolved: true,
        url: "/test/400",
        // $isRetry: true
        $retryConfig: {
          ...retryDefaultConfig,
          retries: 5,
          retryDelay: () => 1000
        }
      });
    } catch (err) {
      console.log(err);
    }
  } */
}
</script>