<template lang="pug">
  v-container
    v-card(
      min-height='300'
      outlined
    )
      v-card-title.justify-center General settings
      v-expansion-panels.py-4.px-3
        v-expansion-panel
          v-expansion-panel-header
            template(
              v-slot:default='{ open }'
            )
              v-row(
                no-gutters
              )
                v-col(
                  cols="4"
                ) Buisness name
                v-col.text--secondary(
                  cols="8"
                )
                  v-fade-transition(
                    leave-absolute
                  )
                    span(
                      v-if='open'
                      key='0'
                    ) Enter a business name
                    span(
                      v-else
                      key='1'
                    ) {{businessName}}
          v-expansion-panel-content
            v-row(
              no-gutters
            )
              v-text-field(
                v-model='businessName'
                placeholder='Caribbean Cruise'
              )
              v-divider.mx-4(
                vertical
              )
              v-card-actions
                v-spacer
                v-btn(
                  text
                  color='info'
                ) cancel
                v-btn(
                  text
                  color='primary'
                ) save
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class General extends Vue {
  private businessName = "";
}
</script>