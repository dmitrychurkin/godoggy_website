import Vue from 'vue';
import { ApiInstance } from 'admin/lib/api';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: ApiInstance<any>;
  }
}