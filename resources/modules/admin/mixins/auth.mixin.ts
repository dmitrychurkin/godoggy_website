import { Component, Vue, Ref } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { formFieldValidator } from 'admin/utils/form-helpers';
import { IRequestEntity } from 'admin/lib/api';

@Component
export default class AuthMixin extends Vue {
  protected readonly formRef = 'form';
  protected readonly emailId = 'email';
  protected isFormValid = false;
  protected isSuccess = false;
  protected isNavigatedAway = false;

  @Ref()
  protected readonly form!: HTMLFormElement;

  protected emailValidators: Array<() => string | boolean> = [];

  @Getter("requests")
  private requests!: Array<IRequestEntity>;

  mounted() {
    this.emailValidators = [formFieldValidator(this.emailId)];
  }

  beforeDestroy() {
    this.requests.forEach(({ cancelToken, timerId, id }) => {
      clearTimeout(timerId);
      cancelToken.cancel();
    });
  }

  protected get isSubmitDisabled() {
    return !this.isFormValid || this.isFormElementDisabled;
  }

  protected get isFormElementDisabled() {
    return (
      Boolean(this.requests.length) ||
      this.isSuccess ||
      this.isNavigatedAway
    );
  }

  protected onNavigateTo(e: Event, navigateTo: { path: string; name: string }) {
    if (this.isFormElementDisabled) {
      e.preventDefault();
    } else {
      this.isNavigatedAway = true;
      this.$router.push(navigateTo);
    }
  }
}
