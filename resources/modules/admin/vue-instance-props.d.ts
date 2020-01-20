import { Vue } from "vue-property-decorator";
import { ApiInstance } from "admin/lib/api";

declare module "vue/types/vue" {
  interface Vue {
    $axios: ApiInstance<any>;
  }
}
