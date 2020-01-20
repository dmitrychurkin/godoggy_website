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
          ) {{mdiEmailNewsletterIcon}}
    v-row(
      justify='center'
      align='center'
    )
      v-col.pt-0(
        cols='auto'
      )
        .headline.font-weight-light Email password reset
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
          @submit.stop.prevent='onSendPasswordEmail'
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
          v-btn(
            :disabled='isSubmitDisabled'
            :loading='Boolean(requests.length)'
            type='submit'
            color='primary'
            block
          ) send
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
        ) Back to login
</template>
<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { mdiEmailNewsletter } from "@mdi/js";
import { namespace } from "vuex-class";
import { LOGIN_ROUTE } from "admin/constants";
import { UPDATE_EMAIL } from "admin/store/modules/auth/mutation-types";
import { EMAIL_PWD_RESET } from "admin/store/modules/auth/action-types";
import axios, { AxiosResponse } from "axios";
import {
  NotificationLevel,
  setNotification
} from "admin/App/common/AppNotificator";
import AuthMixin from "../mixins/auth.mixin";
import { IPasswordResetEmailForm } from "./types";

const Auth = namespace("auth");

@Component
export default class PasswordEmailRoute extends Mixins(AuthMixin) {
  private readonly mdiEmailNewsletterIcon = mdiEmailNewsletter;
  private readonly loginRoute = LOGIN_ROUTE;

  private get email() {
    return this.userEmail;
  }
  private set email(str: string) {
    this.updateEmail(str);
  }

  @Auth.Action(EMAIL_PWD_RESET)
  private readonly emailPasswordReset!: (
    args: IPasswordResetEmailForm
  ) => Promise<AxiosResponse>;
  @Auth.Getter("email")
  private readonly userEmail!: string;
  @Auth.Mutation(UPDATE_EMAIL)
  private readonly updateEmail!: (email: string) => void;

  private async onSendPasswordEmail() {
    if (!this.isSubmitDisabled) {
      try {
        const response = await this.emailPasswordReset({ email: this.email });
        this.isSuccess = true;
        this.isNavigatedAway = true;
        this.$router.push(LOGIN_ROUTE);
        setNotification({
          subject: response,
          type: NotificationLevel.WARN
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
      }
    }
  }
}
</script>