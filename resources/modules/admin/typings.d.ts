declare module "vue-fragment";
declare module "*.vue" {
  import { Vue } from "vue-property-decorator";
  export default Vue;
}
