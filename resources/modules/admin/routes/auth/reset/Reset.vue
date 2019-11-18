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
          ) {{mdiLockResetIcon}}
    v-row(
      justify='center'
      align='center'
    )
      v-col.pt-0(
        cols='auto'
      )
        .headline.font-weight-light Reset password
    v-row(
      justify='center'
      align='center'
    )
      v-col(
        cols=12
      )
        v-form(
          ref='form'
          v-model='isFormValid'
          @submit.stop.prevent='onPasswordReset'
        )
          v-text-field(
            v-model.trim='email'
            ref='emailField'
            :rules='emailValidators'
            type='email'
            label='Email Address *'
            name='email'
            outlined
            required
            maxlength='200'
            :disabled='Boolean(email) || isFormElementDisabled'
          )
          v-text-field(
            v-model.trim='password'
            ref='passwordField'
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
          v-text-field(
            v-model.trim='confirmPassword'
            ref='confirmPasswordField'
            :rules='confirmPasswordValidators'
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? visibilityOffIcon : visibilityIcon"
            label='Confirm password *'
            name='password_confirmation'
            outlined
            required
            minlength='8'
            maxlength='200'
            @click:append='showConfirmPassword = !showConfirmPassword'
            :disabled='isFormElementDisabled'
          )
          v-btn(
            :disabled='isSubmitDisabled'
            :loading='Boolean(requests.length)'
            type='submit'
            color='primary'
            block
          ) reset
    v-row(
      justify='end'
    )
      v-col(
        cols='auto'
      )
        router-link(
          :to='loginRoute'
          event=''
          @click.native.stop='onNavigateTo($event, loginRoute)'
        ) Go to login
</template>
<script lang="ts">
import { Component, Vue, Ref, Mixins } from "vue-property-decorator";
import { Getter, namespace, Action } from "vuex-class";
import { mdiLockReset, mdiEye, mdiEyeOff } from "@mdi/js";
import {
  LOGIN_ROUTE,
  NotificationLevel,
  DASHBOARD_ROUTE
} from "admin/constants";
import { formFieldValidator } from "admin/utils/form-helpers";
import { IRequestEntity } from "admin/lib/api";
import { PWD_RESET } from "admin/store/modules/auth/action-types";
import { IPasswordResetForm } from "admin/interfaces";
import axios, { AxiosResponse } from "axios";
import { setNotification } from "admin/lib/notificator";
import AuthMixin from "admin/mixins/auth.mixin";

const Auth = namespace("auth");

@Component
export default class PasswordResetRoute extends Mixins(AuthMixin) {
  private readonly mdiLockResetIcon = mdiLockReset;
  private readonly visibilityIcon = mdiEye;
  private readonly visibilityOffIcon = mdiEyeOff;
  private readonly loginRoute = LOGIN_ROUTE;
  private readonly searchParams = new URLSearchParams(window.location.search);

  private showPassword = false;
  private showConfirmPassword = false;

  private email = this.searchParams.get("email") || "";
  @Ref()
  private readonly passwordField!: Vue;
  private password = "";
  @Ref()
  private readonly confirmPasswordField!: Vue;
  private confirmPassword = "";

  @Auth.Action(PWD_RESET)
  private readonly passwordReset!: (
    args: IPasswordResetForm
  ) => Promise<AxiosResponse>;

  private passwordValidators: Array<() => string | boolean> = [];
  private confirmPasswordValidators: Array<() => string | boolean> = [];

  private equalityRule() {
    return () => {
      if (!this.password || !this.confirmPassword) {
        return true;
      }
      if (this.password.length == 0 || this.confirmPassword.length == 0) {
        return true;
      }
      return this.password === this.confirmPassword || "Passwords must match";
    };
  }

  mounted() {
    this.passwordValidators = [
      formFieldValidator(this.passwordField),
      this.equalityRule()
    ];
    this.confirmPasswordValidators = [
      formFieldValidator(this.confirmPasswordField),
      this.equalityRule()
    ];
  }

  private async onPasswordReset() {
    if (!this.isSubmitDisabled) {
      try {
        const response = await this.passwordReset({
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          token: this.$route.params.token
        });
        this.isSuccess = true;
        this.isNavigatedAway = true;
        this.$router.push(DASHBOARD_ROUTE);
        setNotification({
          subject: response,
          type: NotificationLevel.SUCCESS
        });
      } catch (err) {
        if (!axios.isCancel(err)) {
          setNotification({
            subject: err,
            type: NotificationLevel.ERROR
          });
        }
      } finally {
        this.form.reset();
        this.$nextTick(() => {
          this.email = this.searchParams.get("email") || "";
        });
      }
    }
  }
}
</script>