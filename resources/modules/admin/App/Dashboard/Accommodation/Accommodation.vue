<template lang="pug">
   v-container(
     fluid
   )
    v-card(
      outlined
      ref='huilo'
    )
      v-card-title.justify-center Accommodation
      v-skeleton-loader(
        :loading='isContentLoading'
        type='article'
      )
        fragment
          v-card-text.text-center.display-4.font-weight-thin.my-10.text--secondary Nothing here yet...
          v-card-actions.justify-center.pb-10
            v-dialog(
              v-model='dialog'
              fullscreen
              hide-overlay
              transition='dialog-bottom-transition'
            )
              template(
                v-slot:activator='{ on }'
              )
                v-btn(
                  color='primary'
                  large
                  v-on='on'
                ) get started
              v-card(
                color='grey lighten-1'
              )
                v-form(
                  ref='accommodationFormRef'
                )
                  v-toolbar(
                    dark
                    color='primary'
                  )
                    v-btn(
                      icon
                      @click.stop='dialog = false'
                    )
                      v-icon {{mdiCloseIcon}}
                    v-toolbar-title Add room type
                    v-spacer
                    v-badge(
                      color='error'
                      left
                      overlap
                    )
                      template(
                        v-slot:badge
                      )
                        span(
                          v-if='amendedLocalesCount > 0'
                        ) {{amendedLocalesCount}}
                      LanguageMenu(
                        v-model='selectedLocale'
                        :isOpen.sync='isLanguageMenuOpen'
                        @request-open='onLocaleClick'
                      )
                    v-toolbar-items
                      v-btn(
                        text
                        dark
                        @click.stop='validateForm'
                      ) save
                  v-list(
                    three-line
                    subheader
                    color='grey lighten-1'
                  )
                    //- v-subheader.white--text.font-weight-bold Category
                    v-list-item
                      v-list-item-content.px-3
                        v-expansion-panels(
                          v-model='expansionModel'
                        )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Category name
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Enter a room category name
                                      span(
                                        v-else
                                        key='1'
                                      ) {{category[locale].value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-text-field(
                                    id='category'
                                    v-model.trim='category[locale].value'
                                    :rules='category.rules'
                                    :maxlength='category.schema.maxlength'
                                    :counter='category.schema.maxlength'
                                    required
                                    placeholder='Superior Ocean View'
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Room description
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Description of room
                                      span(
                                        v-else
                                        key='1'
                                      ) {{description[locale].value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-textarea(
                                    id='description'
                                    v-model.trim='description[locale].value'
                                    :counter='description.schema.maxlength'
                                    auto-grow
                                    label='Description'
                                    rows='5'
                                    :maxlength='description.schema.maxlength'
                                    :rules='description.rules'
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Category room count
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Number of rooms in this category
                                      span(
                                        v-else
                                        key='1'
                                      ) {{count.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-text-field(
                                    id='count'
                                    v-model.number='count.value'
                                    :rules='count.rules'
                                    :max='count.schema.max'
                                    :min='count.schema.min'
                                    label='Room count'
                                    type='number'
                                    required
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Size of room
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Room size
                                      span(
                                        v-else
                                        key='1'
                                      ) {{`${size.value} ${unitSystem.items[unitSystem.value].text}`}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='1'
                                )
                                  v-text-field(
                                    v-model.number='size.value'
                                    :max='size.schema.max'
                                    :min='size.schema.min'
                                    label='Size'
                                    type='number'
                                    required
                                  )
                                v-col(
                                  cols='2'
                                )
                                  v-select(
                                    v-model='unitSystem.value'
                                    :items='unitSystem.items'
                                    :prepend-icon='mdiRulerSquareCompassIcon'
                                    menu-props='auto'
                                    chips
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Bed Types
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Possible bed types
                                      span(
                                        v-else
                                        key='1'
                                      ) {{bed[locale].value.join(' / ')}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-combobox(
                                    id='bed'
                                    v-model='bed[locale].value'
                                    :items='[...bedTypeItems, ...bedTypeItems]'
                                    :rules='bed.rules'
                                    label='Select possible bed types'
                                    multiple
                                    chips
                                    required
                                  )
                                    template(
                                      v-slot:selection='data'
                                    )
                                      v-chip(
                                        :key='JSON.stringify(data.item)'
                                        v-bind='data.attrs'
                                        :input-value='data.selected'
                                        :disabled='data.disabled'
                                        close
                                        @click:close='data.parent.selectItem(data.item)'
                                      )
                                        v-avatar.primary.white--text(
                                          left
                                          v-text='data.item.slice(0, 1).toUpperCase()'
                                        )
                                        | {{data.item}}
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Extra bed
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[extraBed.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='1'
                                )
                                  v-switch(
                                    v-model='extraBed.value'
                                    :label='booleanItems[extraBed.value]'
                                    inset
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Occupancy
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Specify max occupancy
                                      span(
                                        v-else
                                        key='1'
                                      ) {{occupancy.items[occupancy.value-1] || occupancy.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-slider.mt-7(
                                    v-model='occupancy.value'
                                    :tick-labels='occupancy.items'
                                    :min='occupancy.schema.min'
                                    :max='occupancy.schema.max'
                                    step='1'
                                    ticks='always'
                                    tick-size='4'
                                    thumb-label='always'
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Meals
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Specify possible meal plans
                                      span(
                                        v-else
                                        key='1'
                                      ) {{meals[locale].value.join(' / ')}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    id='meals'
                                    v-model='meals[locale].value'
                                    :items='[...mealTypeItems, ...meals[locale].value]'
                                    :rules='meals.rules'
                                    label='Specify meal plans'
                                    multiple
                                    chips
                                    required
                                  )
                                    template(
                                      v-slot:selection='data'
                                    )
                                      v-chip(
                                        :key='JSON.stringify(data.item)'
                                        v-bind='data.attrs'
                                        :input-value='data.selected'
                                        :disabled='data.disabled'
                                        close
                                        @click:close='data.parent.selectItem(data.item)'
                                      )
                                        v-avatar.primary.white--text(
                                          left
                                          v-text='data.item.slice(0, 1).toUpperCase()'
                                        )
                                        | {{data.item}}
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Room Types
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Specify room type
                                      span(
                                        v-else
                                        key='1'
                                      ) {{roomType.items[roomType.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='auto'
                                )
                                  v-radio-group(
                                    v-model='roomType.value'
                                    row
                                  )
                                    v-radio(
                                      :label='roomType.items[0].toUpperCase()'
                                      :value='0'
                                      color='primary'
                                    )
                                    v-radio(
                                      :label='roomType.items[1].toUpperCase()'
                                      :value='1'
                                      color='primary'
                                    )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Room View
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) All room views
                                      span(
                                        v-else
                                        key='1'
                                      ) {{roomView[locale].value.join(", ")}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='roomView[locale].value'
                                    label='Room views'
                                    multiple
                                    chips
                                    deletable-chips
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Bathroom
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) Bathroom type
                                      span(
                                        v-else
                                        key='1'
                                      ) {{bathroom[locale].value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='bathroom[locale].value'
                                    label='Bathroom'
                                    chips
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Wifi
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[wifi.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='wifi.value'
                                    :label='booleanItems[wifi.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Minibar
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[minibar.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='minibar.value'
                                    :label='booleanItems[minibar.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Safe
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[safe.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='safe.value'
                                    :label='booleanItems[safe.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Phone / IDD Calls
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[phone.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='phone.value'
                                    :label='booleanItems[phone.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Balcony
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[balcony.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='balcony.value'
                                    :label='booleanItems[balcony.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Jacuzzi
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[jacuzzi.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='jacuzzi.value'
                                    :label='booleanItems[jacuzzi.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Satellite TV
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{booleanItems[satellite.value]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='satellite.value'
                                    :label='booleanItems[satellite.value]'
                                    inset
                                  )
                          v-expansion-panel
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) View
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='open'
                                        key='0'
                                      ) View type
                                      span(
                                        v-else
                                        key='1'
                                      ) {{view[locale].value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='view[locale].value'
                                    :items='[...view.items, view[locale].value]'
                                    label='Room view'
                                    chips
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-card-actions
                                    v-btn(
                                      text
                                      color='info'
                                    ) cancel
                                    v-btn(
                                      text
                                      color='primary'
                                    ) ok
                          v-expansion-panel(
                            @click.stop='feature = ""'
                          )
                            v-expansion-panel-header
                              template(
                                v-slot:default='{ open }'
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Features
                                  v-col.text--secondary(
                                    cols='9'
                                  )
                                    v-fade-transition(
                                      leave-absolute
                                    )
                                      span(
                                        v-if='!open'
                                        key='0'
                                      ) {{(features[locale].value.length == 0) ? 'Specify additional features if any' : `${features[locale].value.length} features were added`}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row(
                                align='center'
                              )
                                v-item-group.shrink.mr-6(
                                  v-model='features[locale].activeFeature'
                                  mandatory
                                  tag='v-flex'
                                )
                                  v-item(
                                    v-for='item in features[locale].value'
                                    :key='item'
                                    v-slot:default='{ active, toggle }'
                                  )
                                    div
                                      v-btn(
                                        :input-value='active'
                                        icon
                                        @click.stop='toggle'
                                      )
                                        v-icon {{mdiRecordIcon}}
                                v-col
                                  v-window(
                                    v-model='features[locale].activeFeature'
                                    vertical
                                  )
                                    v-window-item(
                                      v-for='(item, index) in features[locale].value'
                                      :key='item'
                                    )
                                      v-banner {{item}}
                                        template(
                                          v-slot:actions='{ dismiss }'
                                        )
                                          v-btn(
                                            text
                                            color='primary'
                                            @click.stop='removeFeature(features[locale], index, dismiss)'
                                          ) remove
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-textarea(
                                    v-model='feature'
                                    :counter='features.schema.maxlength'
                                    :maxlength='features.schema.maxlength'
                                    rows='1'
                                    clearable
                                    auto-grow
                                    shaped
                                    filled
                                    label='Additional feature'
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-btn(
                                    @click.stop='addFeature(features[locale])'
                                    color='success'
                                  ) add
                          v-expansion-panel(
                            @click.stop='toggleAmenitiesTab'
                          )
                            v-expansion-panel-header
                              template(
                                v-slot:default
                              )
                                v-row
                                  v-col(
                                    cols='2'
                                  ) Amenities
                            v-expansion-panel-content(
                              eager
                            )
                              v-tabs(
                                v-model='amenityTab'
                                center-active
                              )
                                v-tab(
                                  v-for='amenity in amenities.items'
                                  :key='amenity'
                                ) {{amenity}}
                                v-tabs-items(
                                  v-model='amenityTab'
                                )
                                  v-tab-item(
                                    v-for='(_, index) in 5'
                                    :key='amenities.items[index]'
                                  )
                                    v-row(
                                      align='center'
                                    )
                                      v-item-group.shrink.mr-6(
                                        v-model='amenities[index][locale].activeFeature'
                                        mandatory
                                        tag='v-flex'
                                      )
                                        v-item(
                                          v-for='item in amenities[index][locale].value'
                                          :key='item'
                                          v-slot:default='{ active, toggle }'
                                        )
                                          div
                                            v-btn(
                                              :input-value='active'
                                              icon
                                              @click.stop='toggle'
                                            )
                                              v-icon {{mdiRecordIcon}}
                                      v-col
                                        v-window(
                                          v-model='amenities[index][locale].activeFeature'
                                          vertical
                                        )
                                          v-window-item(
                                            v-for='(item, itemIndex) in amenities[index][locale].value'
                                            :key='item'
                                          )
                                            v-banner {{item}}
                                              template(
                                                v-slot:actions='{ dismiss }'
                                              )
                                                v-btn(
                                                  text
                                                  color='primary'
                                                  @click.stop='removeFeature(amenities[index][locale], itemIndex, dismiss)'
                                                ) remove
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-textarea(
                                    v-model='feature'
                                    :label='amenities.items[amenityTab]'
                                    :counter='amenities.schema.maxlength'
                                    :maxlength='amenities.schema.maxlength'
                                    rows='1'
                                    clearable
                                    auto-grow
                                    shaped
                                    filled
                                  )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-btn(
                                    @click.stop='addFeature(amenities[amenityTab][locale])'
                                    color='success'
                                  ) add

</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { mdiClose, mdiRulerSquareCompass, mdiRecord } from "@mdi/js";
import LanguageMenu, { Locales } from "admin/App/common/LanguageMenu";
import {
  validationSchema,
  fieldValidation,
  IFeature,
  Amenities
} from "./model-with-helpers";
// import { formFieldValidator } from "admin/lib/form-helpers";
/* import getAccommodationModel, {
  BedTypes,
  UnitSystems,
  OccupancyTypes,
  MealTypes,
  IFeatureField,
  Amenities
} from "./accommodation-model"; */

// const CATEGORY_MAX_LENGTH = 1_000;
// const DESCRIPTION_MAX_LENGTH = 100_000;
// const MAX_COUNT = 1_000_000;
// const FEATURE_MAX_LENGTH = 1_000;

@Component({
  components: {
    LanguageMenu
  }
})
export default class Accommodation extends Vue {
  // Probably this from server as a general template data;
  // readonly CATEGORY_MAX_LENGTH = CATEGORY_MAX_LENGTH;
  // readonly DESCRIPTION_MAX_LENGTH = DESCRIPTION_MAX_LENGTH;
  // readonly MAX_COUNT = MAX_COUNT;
  // readonly FEATURE_MAX_LENGTH = FEATURE_MAX_LENGTH;
  readonly mdiCloseIcon = mdiClose;
  readonly mdiRulerSquareCompassIcon = mdiRulerSquareCompass;
  readonly mdiRecordIcon = mdiRecord;
  // todo: take value of locale from vuex
  locale = Locales.EN;
  // this is used for flags
  amendedLocalesCount = 0;
  // sLocale = this.locale;
  get selectedLocale() {
    // return this.sLocale;
    return this.locale;
  }
  set selectedLocale(locale: Locales) {
    // this.sLocale = locale;
    this.locale = locale;
    this.amendedLocalesCount += 1;
    console.log("selectedLocale => ", locale);
  }
  isLanguageMenuOpen = false;
  dialog = true;
  contentLoaded = true;
  expansionModel: number | null = null;
  @Ref()
  readonly accommodationFormRef!: HTMLFormElement;
  readonly booleanItems = {
    true: "Yes",
    false: "No"
  };

  readonly category = {
    [this.locale]: {
      value: ""
    },
    expansionIndex: 0,
    schema: validationSchema.category,
    rules: [fieldValidation("category", validationSchema.category)]
  };

  readonly description = {
    [this.locale]: {
      value: ""
    },
    expansionIndex: 1,
    schema: validationSchema.description,
    rules: [fieldValidation("description", validationSchema.description)]
  };

  readonly count = {
    value: 0,
    expansionIndex: 2,
    schema: validationSchema.count,
    rules: [fieldValidation("count", validationSchema.count)]
  };

  readonly size = {
    value: 0,
    expansionIndex: 3,
    schema: validationSchema.size,
    rules: [fieldValidation("size", validationSchema.size)]
  };

  readonly unitSystem = {
    value: 0,
    items: [
      { text: "SQ M", value: 0 },
      { text: "SQ FT", value: 1 }
    ]
  };

  readonly bedTypeItems = ["KING", "TWIN", "FRENCH"];
  readonly bed = {
    [this.locale]: {
      value: [...this.bedTypeItems.slice(0, 2)]
    },
    expansionIndex: 4,
    schema: validationSchema.bed,
    rules: [fieldValidation("bed", validationSchema.bed)]
  };

  readonly extraBed = {
    value: true,
    expansionIndex: 5
  };

  readonly occupancy = {
    value: 3,
    expansionIndex: 6,
    schema: validationSchema.occupancy,
    items: ["SGL", "DBL", "TPL", "QPL"]
  };

  readonly mealTypeItems = ["BB", "HB", "HB+", "FB", "AI"];
  readonly meals = {
    [this.locale]: {
      value: [
        this.mealTypeItems[0],
        this.mealTypeItems[1],
        this.mealTypeItems[3]
      ]
    },
    expansionIndex: 7,
    schema: validationSchema.meals,
    rules: [fieldValidation("meals", validationSchema.meals)]
  };

  readonly roomType = {
    value: 0,
    expansionIndex: 8,
    items: ["Room", "Suite"]
  };

  readonly roomView = {
    [this.locale]: {
      value: []
    },
    expansionIndex: 9
  };

  readonly bathroom = {
    [this.locale]: {
      value: ""
    },
    expansionIndex: 10
  };

  readonly wifi = {
    value: true,
    expansionIndex: 11
  };

  readonly minibar = {
    value: true,
    expansionIndex: 12
  };

  readonly safe = {
    value: true,
    expansionIndex: 13
  };

  readonly phone = {
    value: true,
    expansionIndex: 14
  };

  readonly balcony = {
    value: false,
    expansionIndex: 15
  };

  readonly jacuzzi = {
    value: false,
    expansionIndex: 16
  };

  readonly satellite = {
    value: true,
    expansionIndex: 17
  };

  readonly view = {
    [this.locale]: {
      value: ""
    },
    expansionIndex: 18,
    items: ["Ocean", "Sea", "Mountain", "Lake", "City", "None"]
  };

  readonly features = {
    [this.locale]: {
      value: [],
      activeFeature: 0
    },
    expansionIndex: 19,
    schema: validationSchema.feature
  };

  feature = "";
  addFeature(f: IFeature) {
    if (this.feature && !f.value.includes(this.feature)) {
      const length = f.value.push(
        this.feature.trim().slice(0, this.features.schema.maxlength)
      );
      this.feature = "";
      this.$nextTick(() => {
        f.activeFeature = length - 1;
      });
    }
  }
  removeFeature(feature: IFeature, index: number, dismiss: Function) {
    dismiss();
    feature.value.splice(index, 1);
    this.$nextTick(() => {
      feature.activeFeature = index - 1;
    });
  }

  readonly amenities = {
    ...[
      Amenities.BATH_PERSONAL_CARE,
      Amenities.OFFICE_EQUIPMENT_STATIONERY,
      Amenities.MEDIA_ENTERTAINMENT,
      Amenities.REFRESHMENTS,
      Amenities.OTHER
    ].reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: {
          [this.locale]: {
            value: [],
            activeFeature: 0
          }
        }
      }),
      {}
    ),
    expansionIndex: 20,
    schema: validationSchema.feature,
    items: [
      "Bath personal care",
      "Office equipment stationery",
      "Media entertainment",
      "Refreshments",
      "Other"
    ]
  };
  amenityTab = 1;
  toggleAmenitiesTab() {
    this.feature = "";
    if (this.amenityTab > 0) {
      setImmediate(() => {
        this.amenityTab = 0;
      });
    }
  }
  // readonly accommodationModel = getAccommodationModel(this.locale);
  // readonly unitSystemItems = [
  //   { text: "SQ FT", value: UnitSystems.SQ_FT },
  //   { text: "SQ M", value: UnitSystems.SQ_M }
  // ];

  // readonly occupancyTypeItems = ["SGL", "DBL", "TPL", "QPL"];
  // readonly mealTypeItems = [
  //   // --> translated
  //   MealTypes.BB,
  //   MealTypes.HB,
  //   MealTypes.HB_Plus,
  //   MealTypes.FB,
  //   MealTypes.AI
  // ];

  // readonly viewTypeItems = ["Ocean", "Sea", "Mountain", "Lake", "City", "None"];
  // readonly amenities = [
  //   {
  //     type: Amenities.BATH_PERSONAL_CARE,
  //     text: "Bath personal care"
  //   },
  //   {
  //     type: Amenities.OFFICE_EQUIPMENT_STATIONERY,
  //     text: "Office equipment stationery"
  //   },
  //   {
  //     type: Amenities.MEDIA_ENTERTAINMENT,
  //     text: "Media entertainment"
  //   },
  //   {
  //     type: Amenities.REFRESHMENTS,
  //     text: "Refreshments"
  //   },
  //   {
  //     type: Amenities.OTHER,
  //     text: "Other"
  //   }
  // ];
  // get unitSystem() {
  //   return this.unitSystemItems.find(
  //     ({ value }) => value === this.accommodationModel.size.unitSystem
  //   );
  // }
  // get supportedBedTypes() {
  //   return this.accommodationModel.bed.value.join(" / ");
  // }
  // get maxOccupancy() {
  //   const { value } = this.accommodationModel.occupancy;
  //   if (value <= OccupancyTypes.QPL) {
  //     return this.occupancyTypeItems[value - 1];
  //   }
  //   return value;
  // }
  // get supportedMealPlans() {
  //   return this.accommodationModel.meals.value.join(" / ");
  // }
  // get roomViews() {
  //   return this.accommodationModel.roomView.value.join(", ");
  // }

  // get view() {
  //   return (
  //     this.accommodationModel.view.value || this.viewTypeItems.slice(-1)[0]
  //   );
  // }
  // set view(value: string) {
  //   this.accommodationModel.view.value = value;
  // }

  onLocaleClick() {
    // console.log("Attempt to open");
    // this.expansionModel = this.validateForm();
    // if (this.expansionModel !== null) {
    //   return;
    // }
    // this.isLanguageMenuOpen = true;
    // console.log(this.isLanguageMenuOpen, this.expansionModel);
  }

  /*{
    categoryRoomCount: {
      order: 1,
      initialValue: 1,
      value: 1,
      hasError: false,
      rules: [
        () => {
          const categoryRoomCountEl = document.getElementById(
            "categoryRoomCountField"
          ) as HTMLInputElement;
          const validationResult = checkValidity(categoryRoomCountEl);
          this.accommodationFormModel.categoryRoomCount.hasError = Boolean(
            validationResult
          );
          return validationResult;
        }
      ]
    }
  };
  private readonly accommodationFormModelLocalized = {
    categoryName: {
      order: 0,
      initialValue: "",
      value: "",
      hasError: false,
      rules: [
        () => {
          const categoryNameEl = document.getElementById(
            "categoryNameField"
          ) as HTMLInputElement;
          const validationResult = checkValidity(categoryNameEl);
          this.accommodationFormModelLocalized.categoryName.hasError = Boolean(
            validationResult
          );
          return validationResult;
        }
      ]
    }
  };*/
  // todo: need to take data from vuex

  // private categoryName = "";
  // private categoryNameValidators: Array<() => string | boolean> = [];

  // private categoryRoomCount = 1;
  // private categoryRoomCountValidators: Array<() => string | boolean> = [];
  mounted() {
    // console.log(Locales.RU, this.bedTypeItems);
    // setTimeout(() => {
    //   this.contentLoaded = true;
    // }, 7000);
    // this.categoryNameValidators = [
    //   formFieldValidator(
    //     () => document.getElementById("categoryNameField") as HTMLInputElement
    //   )
    // ];
    // this.categoryRoomCountValidators = [
    //   formFieldValidator(
    //     () =>
    //       document.getElementById("categoryRoomCountField") as HTMLInputElement
    //   )
    // ];
  }

  // validateForm() {
  //   if (!this.accommodationFormRef.validate()) {
  //     const { category, count, bed, meals } = this.accommodationModel;
  //     for (const { rules = [], expansionIndex = null } of [
  //       category,
  //       count,
  //       bed,
  //       meals
  //     ]) {
  //       for (const rule of rules) {
  //         if (rule() !== true) {
  //           return expansionIndex;
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }
  /* private validateForm() {
    console.log("validateForm", this.accommodationFormRef);
    if (this.accommodationFormRef && this.accommodationFormRef.validate()) {
      console.log("form valid", this.expansionModel);
      this.expansionModel = 0;
      setTimeout(() => {
        this.accommodationFormRef.validate();
      }, 1000);
    } else {
      console.log("form invalid", this.expansionModel);
      this.expansionModel = [
        ...Object.values(this.accommodationFormModel),
        ...Object.values(this.accommodationFormModelLocalized)
      ]
        .sort((a, b) => a.order - b.order)
        // .findIndex(({ hasError }) => hasError);
        .findIndex(({ rules }) => {
          for (const rule of rules) {
            console.log(rule());
            if (rule() !== true) {
              return true;
            }
          }
          return false;
        });
      console.log("this.expansionModel => ", this.expansionModel);
    }
  } */
  get isContentLoading() {
    return !this.contentLoaded;
  }
  // private rooms = [];
}
</script>
