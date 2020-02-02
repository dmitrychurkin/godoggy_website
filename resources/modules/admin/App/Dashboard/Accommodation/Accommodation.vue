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
                                      ) {{accommodationModel.category.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-text-field(
                                    id='category'
                                    v-model.trim='accommodationModel.category.value'
                                    :rules='accommodationModel.category.rules'
                                    :maxlength='CATEGORY_MAX_LENGTH'
                                    :counter='CATEGORY_MAX_LENGTH'
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
                                      ) {{accommodationModel.description.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-textarea(
                                    v-model='accommodationModel.description.value'
                                    :counter='DESCRIPTION_MAX_LENGTH'
                                    auto-grow
                                    label='Description'
                                    rows='5'
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
                                      ) {{accommodationModel.count.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='auto'
                                )
                                  v-text-field(
                                    id='count'
                                    v-model.number='accommodationModel.count.value'
                                    :rules='accommodationModel.count.rules'
                                    :max='MAX_COUNT'
                                    label='Room count'
                                    type='number'
                                    min='1'
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
                                      ) {{`${accommodationModel.size.value} ${unitSystem.text}`}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='1'
                                )
                                  v-text-field(
                                    v-model.number='accommodationModel.size.value'
                                    :max='MAX_COUNT'
                                    label='Size'
                                    type='number'
                                    min='1'
                                    required
                                  )
                                v-col(
                                  cols='2'
                                )
                                  v-select(
                                    v-model='accommodationModel.size.unitSystem'
                                    :items='unitSystemItems'
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
                                      ) {{supportedBedTypes}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col(
                                  cols='12'
                                )
                                  v-combobox(
                                    id='bed'
                                    v-model='accommodationModel.bed.value'
                                    :items='[...bedTypeItems, ...accommodationModel.bed.value]'
                                    :rules='accommodationModel.bed.rules'
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
                                      ) {{booleanMappings[Number(accommodationModel.extraBed.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='1'
                                )
                                  v-switch(
                                    v-model='accommodationModel.extraBed.value'
                                    :label='booleanMappings[Number(accommodationModel.extraBed.value)]'
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
                                      ) {{maxOccupancy}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-slider.mt-7(
                                    v-model='accommodationModel.occupancy.value'
                                    :tick-labels='occupancyTypeItems'
                                    min='1'
                                    max='10'
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
                                      ) {{supportedMealPlans}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    id='meals'
                                    v-model='accommodationModel.meals.value'
                                    :items='[...mealTypeItems, ...accommodationModel.meals.value]'
                                    :rules='accommodationModel.meals.rules'
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
                                      ) {{roomTypeMappings[Number(accommodationModel.roomType.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='auto'
                                )
                                  v-radio-group(
                                    v-model='accommodationModel.roomType.value'
                                    row
                                  )
                                    v-radio(
                                      :label='roomTypeMappings[0].toUpperCase()'
                                      :value='0'
                                      color='primary'
                                    )
                                    v-radio(
                                      :label='roomTypeMappings[1].toUpperCase()'
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
                                      ) {{roomViews}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='accommodationModel.roomView.value'
                                    :items='accommodationModel.roomView.value'
                                    label='Room views'
                                    multiple
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
                                      ) {{accommodationModel.bathroom.value}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='accommodationModel.bathroom.value'
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
                                      ) {{booleanMappings[Number(accommodationModel.wifi.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.wifi.value'
                                    :label='booleanMappings[Number(accommodationModel.wifi.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.minibar.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.minibar.value'
                                    :label='booleanMappings[Number(accommodationModel.minibar.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.safe.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.safe.value'
                                    :label='booleanMappings[Number(accommodationModel.safe.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.phone.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.phone.value'
                                    :label='booleanMappings[Number(accommodationModel.phone.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.balcony.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.balcony.value'
                                    :label='booleanMappings[Number(accommodationModel.balcony.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.jacuzzi.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.jacuzzi.value'
                                    :label='booleanMappings[Number(accommodationModel.jacuzzi.value)]'
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
                                      ) {{booleanMappings[Number(accommodationModel.satellite.value)]}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-switch(
                                    v-model='accommodationModel.satellite.value'
                                    :label='booleanMappings[Number(accommodationModel.satellite.value)]'
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
                                      ) {{view}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-combobox(
                                    v-model='view'
                                    :items='[...viewTypeItems, accommodationModel.view.value]'
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
                                      ) {{(accommodationModel.features.value.length == 0) ? 'Specify additional features if any' : `${accommodationModel.features.value.length} features were added`}}
                            v-expansion-panel-content(
                              eager
                            )
                              v-row(
                                align='center'
                              )
                                v-item-group.shrink.mr-6(
                                  v-model='accommodationModel.features.activeFeature[selectedLocale]'
                                  mandatory
                                  tag='v-flex'
                                )
                                  v-item(
                                    v-for='item in accommodationModel.features.value'
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
                                    v-model='accommodationModel.features.activeFeature[selectedLocale]'
                                    vertical
                                  )
                                    v-window-item(
                                      v-for='(item, index) in accommodationModel.features.value'
                                      :key='item'
                                    )
                                      v-banner {{item}}
                                        template(
                                          v-slot:actions='{ dismiss }'
                                        )
                                          v-btn(
                                            text
                                            color='primary'
                                            @click.stop='removeFeature(accommodationModel.features, index, dismiss)'
                                          ) remove
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-textarea(
                                    v-model='feature'
                                    :counter='FEATURE_MAX_LENGTH'
                                    :maxlength='FEATURE_MAX_LENGTH'
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
                                    @click.stop='addFeature(accommodationModel.features)'
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
                                v-model='amenitiesTab'
                                center-active
                              )
                                v-tab(
                                  v-for='amenity in amenities'
                                  :key='amenity.type'
                                ) {{amenity.text}}
                                v-tabs-items(
                                  v-model='amenitiesTab'
                                )
                                  v-tab-item(
                                    v-for='amenity in amenities'
                                    :key='amenity.type'
                                  )
                                    v-row(
                                      align='center'
                                    )
                                      v-item-group.shrink.mr-6(
                                        v-model='accommodationModel.amenities[amenity.type].activeFeature[selectedLocale]'
                                        mandatory
                                        tag='v-flex'
                                      )
                                        v-item(
                                          v-for='item in accommodationModel.amenities[amenity.type].value'
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
                                          v-model='accommodationModel.amenities[amenity.type].activeFeature[selectedLocale]'
                                          vertical
                                        )
                                          v-window-item(
                                            v-for='(item, index) in accommodationModel.amenities[amenity.type].value'
                                            :key='item'
                                          )
                                            v-banner {{item}}
                                              template(
                                                v-slot:actions='{ dismiss }'
                                              )
                                                v-btn(
                                                  text
                                                  color='primary'
                                                  @click.stop='removeFeature(accommodationModel.amenities[amenity.type], index, dismiss)'
                                                ) remove
                              v-row
                                v-col.d-flex.align-center(
                                  cols='12'
                                )
                                  v-textarea(
                                    v-model='feature'
                                    :label='amenities[amenitiesTab].text'
                                    :counter='FEATURE_MAX_LENGTH'
                                    :maxlength='FEATURE_MAX_LENGTH'
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
                                    @click.stop='addFeature(accommodationModel.amenities[amenitiesTab])'
                                    color='success'
                                  ) add

</template>
<script lang="ts">
  import { Component, Vue, Ref } from "vue-property-decorator";
  import { mdiClose, mdiRulerSquareCompass, mdiRecord } from "@mdi/js";
  import LanguageMenu, { Locales } from "admin/App/common/LanguageMenu";
  import getAccommodationModel, {
    BedTypes,
    UnitSystems,
    OccupancyTypes,
    MealTypes,
    IFeatureField,
    Amenities
  } from "./accommodation-model";

  const CATEGORY_MAX_LENGTH = 1_000;
  const DESCRIPTION_MAX_LENGTH = 100_000;
  const MAX_COUNT = 1_000_000;
  const FEATURE_MAX_LENGTH = 1_000;

  @Component({
    components: {
      LanguageMenu
    }
  })
  export default class Accommodation extends Vue {
    // Probably this from server as a general template data;
    readonly CATEGORY_MAX_LENGTH = CATEGORY_MAX_LENGTH;
    readonly DESCRIPTION_MAX_LENGTH = DESCRIPTION_MAX_LENGTH;
    readonly MAX_COUNT = MAX_COUNT;
    readonly FEATURE_MAX_LENGTH = FEATURE_MAX_LENGTH;
    readonly mdiCloseIcon = mdiClose;
    readonly mdiRulerSquareCompassIcon = mdiRulerSquareCompass;
    readonly mdiRecordIcon = mdiRecord;
    // todo: take value of locale from vuex
    readonly locale = Locales.EN;
    // this is used for flags
    amendedLocalesCount = 0;
    sLocale = this.locale;
    get selectedLocale() {
      return this.sLocale;
    }
    set selectedLocale(locale: Locales) {
      this.sLocale = locale;
      this.amendedLocalesCount += 1;
      console.log("selectedLocale => ", locale);
    }
    isLanguageMenuOpen = false;
    dialog = true;
    contentLoaded = true;
    expansionModel: number | null = null;
    @Ref()
    readonly accommodationFormRef!: HTMLFormElement;
    readonly accommodationModel = getAccommodationModel(this.locale);
    readonly booleanMappings = ["No", "Yes"];
    readonly unitSystemItems = [
      { text: "SQ FT", value: UnitSystems.SQ_FT },
      { text: "SQ M", value: UnitSystems.SQ_M }
    ];
    readonly bedTypeItems = [
      // --> translated
      BedTypes.KING,
      BedTypes.TWIN,
      BedTypes.FRENCH
    ];
    readonly occupancyTypeItems = ["SGL", "DBL", "TPL", "QPL"];
    readonly mealTypeItems = [
      // --> translated
      MealTypes.BB,
      MealTypes.HB,
      MealTypes.HB_Plus,
      MealTypes.FB,
      MealTypes.AI
    ];
    readonly roomTypeMappings = ["Room", "Suite"];
    readonly viewTypeItems = [
      "Ocean",
      "Sea",
      "Mountain",
      "Lake",
      "City",
      "None"
    ];
    readonly amenities = [
      {
        type: Amenities.BATH_PERSONAL_CARE,
        text: "Bath personal care"
      },
      {
        type: Amenities.OFFICE_EQUIPMENT_STATIONERY,
        text: "Office equipment stationery"
      },
      {
        type: Amenities.MEDIA_ENTERTAINMENT,
        text: "Media entertainment"
      },
      {
        type: Amenities.REFRESHMENTS,
        text: "Refreshments"
      },
      {
        type: Amenities.OTHER,
        text: "Other"
      }
    ];
    get unitSystem() {
      return this.unitSystemItems.find(
        ({ value }) => value === this.accommodationModel.size.unitSystem
      );
    }
    get supportedBedTypes() {
      return this.accommodationModel.bed.value.join(" / ");
    }
    get maxOccupancy() {
      const { value } = this.accommodationModel.occupancy;
      if (value <= OccupancyTypes.QPL) {
        return this.occupancyTypeItems[value - 1];
      }
      return value;
    }
    get supportedMealPlans() {
      return this.accommodationModel.meals.value.join(" / ");
    }
    get roomViews() {
      return this.accommodationModel.roomView.value.join(", ");
    }

    get view() {
      return (
        this.accommodationModel.view.value || this.viewTypeItems.slice(-1)[0]
      );
    }
    set view(value: string) {
      this.accommodationModel.view.value = value;
    }
    feature = "";
    addFeature(feature: IFeatureField) {
      if (this.feature && !feature.value.includes(this.feature)) {
        const length = feature.value.push(
          this.feature.trim().slice(0, this.FEATURE_MAX_LENGTH)
        );
        this.feature = "";
        this.$nextTick(() => {
          feature.activeFeature[this.selectedLocale] = length - 1;
        });
      }
    }
    removeFeature(feature: IFeatureField, index: number, dismiss: Function) {
      dismiss();
      feature.value.splice(index, 1);
      this.$nextTick(() => {
        feature.activeFeature[this.selectedLocale] = index - 1;
      });
    }

    amenitiesTab = 1;
    toggleAmenitiesTab() {
      this.feature = "";
      if (this.amenitiesTab > 0) {
        setTimeout(() => {
          this.amenitiesTab = 0;
        });
      }
    }

    onLocaleClick() {
      console.log("Attempt to open");
      this.expansionModel = this.validateForm();
      if (this.expansionModel !== null) {
        return;
      }
      this.isLanguageMenuOpen = true;
      console.log(this.isLanguageMenuOpen, this.expansionModel);
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
      console.log(Locales.RU, this.bedTypeItems);
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

    validateForm() {
      if (!this.accommodationFormRef.validate()) {
        const { category, count, bed, meals } = this.accommodationModel;
        for (const { rules = [], expansionIndex = null } of [
          category,
          count,
          bed,
          meals
        ]) {
          for (const rule of rules) {
            if (rule() !== true) {
              return expansionIndex;
            }
          }
        }
      }
      return null;
    }
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
