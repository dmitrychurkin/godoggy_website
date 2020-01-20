<template lang="pug">
  fragment
    v-row(
      justify='center'
      align='center'
    )
      v-col(
        cols='auto'
      )
        v-avatar(
          size=40
          color='accent'
        )
          v-icon(
            color='white'
          ) {{mdiAccountIcon}}
    v-row(
      justify='center'
      align='center'
    )
      v-col.pt-0(
        cols='auto'
      )
        .headline.font-weight-light Login
    v-row(
      justify='center'
      align='center'
    )
      v-col(
        cols=12
      )
        v-form(
          :ref='formRef'
          v-model='isFormValid'
          @submit.stop.prevent='onLogin'
        )
          v-text-field(
            v-model.trim='email'
            :id='emailId'
            :rules='emailValidators'
            type='email'
            label='Email Address *'
            name='email'
            outlined
            required
            maxlength='200'
            :disabled='isFormElementDisabled'
          )
          v-text-field(
            v-model.trim='password'
            :id='passwordId'
            :rules='passwordValidators'
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? visibilityOffIcon : visibilityIcon"
            label='Password *'
            name='password'
            outlined
            required
            minlength='8'
            maxlength='200'
            @click:append='showPassword = !showPassword'
            :disabled='isFormElementDisabled'
          )
          v-checkbox.mt-0(
            v-model='remember'
            label='Remember me'
            name='remember'
            color='primary'
            :disabled='isFormElementDisabled'
          )
          v-btn(
            :disabled='isSubmitDisabled'
            :loading='Boolean(requests.length)'
            type='submit'
            color='primary'
            block
          ) login
    v-row(
      justify='end'
    )
      v-col(
        cols='auto'
      )
        router-link(
          :to='resetPwdRoute'
          event=''
          @click.native.stop='onNavigateTo($event, resetPwdRoute)'
        ) Forgot password?
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";
import axios, { AxiosResponse } from "axios";
import { mdiAccount, mdiEye, mdiEyeOff } from "@mdi/js";
import { RESET_PWD_EMAIL, DASHBOARD_ROUTE } from "admin/constants";
import { formFieldValidator } from "admin/lib/form-helpers";
import { LOGIN_USER } from "admin/store/modules/auth/action-types";
import { UPDATE_EMAIL } from "admin/store/modules/auth/mutation-types";
import {
  NotificationLevel,
  setNotification
} from "admin/App/common/AppNotificator";
import AuthMixin from "../mixins/auth.mixin";
import { ILoginForm } from "./types";

const Auth = namespace("auth");

@Component
export default class LoginRoute extends Mixins(AuthMixin) {
  private readonly passwordId = "password";
  private readonly mdiAccountIcon = mdiAccount;
  private readonly visibilityIcon = mdiEye;
  private readonly visibilityOffIcon = mdiEyeOff;
  private readonly resetPwdRoute = RESET_PWD_EMAIL;

  private showPassword = false;

  private get email() {
    return this.userEmail;
  }
  private set email(str: string) {
    this.updateEmail(str);
  }

  private password = "";
  private remember = false;

  private passwordValidators: Array<() => string | boolean> = [];

  @Auth.Action(LOGIN_USER)
  private readonly loginUser!: (args: ILoginForm) => Promise<AxiosResponse>;
  @Auth.Getter("email")
  private readonly userEmail!: string;
  @Auth.Mutation(UPDATE_EMAIL)
  private readonly updateEmail!: (email: string) => void;
  @Getter("redirect")
  private readonly redirectTo!: string;

  mounted() {
    this.passwordValidators = [formFieldValidator(this.passwordId)];
  }

  private async onLogin() {
    if (!this.isSubmitDisabled) {
      try {
        await this.loginUser({
          email: this.email,
          password: this.password,
          remember: this.remember
        });
        this.isSuccess = true;
        this.isNavigatedAway = true;
        this.$router.replace(this.redirectTo || DASHBOARD_ROUTE.path);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setNotification({
            subject: err,
            type: NotificationLevel.ERROR
          });
        }
      } finally {
        this.form.reset();
      }
    }
  }
}
</script>