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
          @click.native.prevent='onNavigateTo(resetPwdRoute)'
        ) Forgot password?
</template>
<script lang="ts">
  import { Component, Mixins } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { mdiAccount, mdiEye, mdiEyeOff } from "@mdi/js";
  import { RESET_PWD_EMAIL, DASHBOARD_ROUTE } from "admin/constants";
  import { formFieldValidator } from "admin/lib/form-helpers";
  import { LOGIN_USER } from "admin/store/modules/auth/action-types";
  import { UPDATE_EMAIL } from "admin/store/modules/auth/mutation-types";
  import AuthMixin from "../mixins/auth.mixin";
  import { ILoginForm } from "./types";
  import { UserResponse } from "admin/lib/api/schema/responses/auth";

  const Auth = namespace("auth");

  @Component
  export default class LoginRoute extends Mixins(AuthMixin) {
    readonly passwordId = "password";
    readonly mdiAccountIcon = mdiAccount;
    readonly visibilityIcon = mdiEye;
    readonly visibilityOffIcon = mdiEyeOff;
    readonly resetPwdRoute = RESET_PWD_EMAIL;

    showPassword = false;

    get email() {
      return this.userEmail;
    }
    set email(str: string) {
      this.updateEmail(str);
    }

    password = "";
    remember = false;

    passwordValidators: Array<() => string | boolean> = [];

    @Auth.Action(LOGIN_USER)
    readonly loginUser!: (args: ILoginForm) => Promise<UserResponse>;
    @Auth.Getter("email")
    readonly userEmail!: string;
    @Auth.Mutation(UPDATE_EMAIL)
    readonly updateEmail!: (email: string) => void;
    @Auth.Getter("redirect")
    readonly redirect!: string;

    mounted() {
      this.passwordValidators = [formFieldValidator(this.passwordId)];
    }

    async onLogin() {
      if (!this.isSubmitDisabled) {
        try {
          await this.loginUser({
            email: this.email,
            password: this.password,
            remember: this.remember
          });
          this.isSuccess = this.isNavigatedAway = true;
          this.$router.replace(this.redirect || DASHBOARD_ROUTE);
        } catch {
        } finally {
          this.form.reset();
        }
      }
    }
  }
</script>
