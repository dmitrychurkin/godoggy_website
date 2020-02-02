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
          :ref='formRef'
          v-model='isFormValid'
          @submit.stop.prevent='onPasswordReset'
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
            :disabled='Boolean(email) || isFormElementDisabled'
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
          v-text-field(
            v-model.trim='confirmPassword'
            :id='confirmPasswordId'
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
          @click.native.prevent='onNavigateTo(loginRoute)'
        ) Go to login
</template>
<script lang="ts">
  import { Component, Mixins } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { mdiLockReset, mdiEye, mdiEyeOff } from "@mdi/js";
  import { LOGIN_ROUTE } from "admin/constants";
  import { formFieldValidator } from "admin/lib/form-helpers";
  import { PWD_RESET } from "admin/store/modules/auth/action-types";
  // import {
  //   NotificationLevel,
  //   setNotification
  // } from "admin/App/common/AppNotificator";
  import AuthMixin from "../mixins/auth.mixin";
  import { IPasswordResetForm } from "./types";
  import { ResetPasswordResponse } from "admin/lib/api/schema/responses/auth";

  const Auth = namespace("auth");

  @Component
  export default class PasswordResetRoute extends Mixins(AuthMixin) {
    readonly passwordId = "password";
    readonly confirmPasswordId = "confirmPassword";
    readonly mdiLockResetIcon = mdiLockReset;
    readonly visibilityIcon = mdiEye;
    readonly visibilityOffIcon = mdiEyeOff;
    readonly loginRoute = LOGIN_ROUTE;
    readonly searchParams = new URLSearchParams(window.location.search);

    showPassword = false;
    showConfirmPassword = false;

    email = this.searchParams.get("email") || "";

    password = "";
    confirmPassword = "";

    @Auth.Action(PWD_RESET)
    readonly passwordReset!: (
      args: IPasswordResetForm
    ) => Promise<ResetPasswordResponse>;

    passwordValidators: Array<() => string | boolean> = [];
    confirmPasswordValidators: Array<() => string | boolean> = [];

    equalityRule() {
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
        formFieldValidator(this.passwordId),
        this.equalityRule()
      ];
      this.confirmPasswordValidators = [
        formFieldValidator(this.confirmPasswordId),
        this.equalityRule()
      ];
    }

    async onPasswordReset() {
      if (!this.isSubmitDisabled) {
        try {
          // TODO: finish here
          // const result =
          await this.passwordReset({
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
            token: this.$route.params.token
          });
          // if (!result) {
          this.isSuccess = true;
          this.isNavigatedAway = true;
          // this.$router.push(DASHBOARD_ROUTE);
          // return;
          // }
          console.log("Something went wrong, while resetting a password => ");
          // setNotification({
          //   subject: response,
          //   type: NotificationLevel.SUCCESS
          // });
        } catch (err) {
          // if (!axios.isCancel(err)) {
          //   setNotification({
          //     subject: err,
          //     type: NotificationLevel.ERROR
          //   });
          // }
          console.log("Error occured, while resetting a password => ", err);
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
