<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerModel"
      floating
      absolute
      overflow
      app
    ></v-navigation-drawer>
    <v-toolbar color='light-blue' dark clipped-left app dense>
      <v-toolbar-side-icon

        @click.stop="drawerModel = !drawerModel"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Peace heaven</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card>
              <v-card-text>
                {{appState}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer inset app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { IAppState } from '../interfaces';
// const AppProps = Vue.extend({
//     props: {}
// });
@Component({
    components: {

    }
})
export default class Layout extends Vue {
    @Prop(Object) readonly appState!: IAppState;
    drawerModel = false;
}
</script>

