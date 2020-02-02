import { formFieldValidator } from "admin/lib/form-helpers";
import { IRequestEntity } from "admin/store/modules/requests/state";
import { Component, Ref, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class AuthMixin extends Vue {
  readonly formRef = "form";
  readonly emailId = "email";
  isFormValid = false;
  isSuccess = false;
  isNavigatedAway = false;

  @Ref()
  readonly form!: HTMLFormElement;

  emailValidators: Array<() => string | boolean> = [];

  @Getter("requests")
  readonly requests!: Array<IRequestEntity>;

  mounted() {
    this.emailValidators = [formFieldValidator(this.emailId)];
  }

  beforeRouteLeave(...args: Array<any>) {
    const [, , next] = args;
    this.requests.forEach(({ cancelToken, timerId }: IRequestEntity) => {
      clearTimeout(timerId);
      cancelToken.cancel();
    });
    next();
  }

  get isSubmitDisabled() {
    return !this.isFormValid || this.isFormElementDisabled;
  }

  get isFormElementDisabled() {
    return (
      Boolean(this.requests.length) || this.isSuccess || this.isNavigatedAway
    );
  }

  onNavigateTo(navigateTo: { path: string; name: string }) {
    if (!this.isFormElementDisabled) {
      this.isNavigatedAway = true;
      this.$router.push(navigateTo);
    }
  }
}
