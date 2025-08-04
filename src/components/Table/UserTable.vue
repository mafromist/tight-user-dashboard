<script setup>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
})
const filters = ref(null)
const loading = ref(null)

onBeforeMount(() => {
  setFilters()
})

const setFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  }
}

const clearFilter = () => {
  setFilters()
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
  filters.value.global.value = null
  filters.value.name.constraints[0].value = null
  filters.value.name.constraints[0].matchMode = FilterMatchMode.STARTS_WITH
  filters.value.name.operator = FilterOperator.AND
  filters.value.name.value = null
  filters.value.name.matchMode = FilterMatchMode.STARTS_WITH
  filters.value.name.constraints[0].value = null
}

const goToUserDetail = (id) => {
  router.push({ name: 'UserDetails', params: { locale: route.params.locale, id } })
}
</script>

<template>
  <div class="card">
    <DataTable
      :value="props.users"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      v-model:filters="filters"
      filterDisplay="menu"
      :loading="loading"
      :filters="filters"
    >
      <template #header>
        <div class="flex justify-end gap-2">
          <Button
            v-if="filters"
            type="button"
            icon="pi pi-filter-slash"
:label="$t('common.clear')"
            outlined
            @click="clearFilter()"
          />
        </div>
      </template>
      <template #empty> {{ $t('user.noUsersFound') }} </template>
      <template #loading> {{ $t('user.loadingData') }} </template>
      <Column field="name" :header="$t('user.name')" style="min-width: 10rem">
        <template #body="{ data }">
          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-flex tw-items-center">
              <OverlayBadge
                :value="data.postCount"
                severity="danger"
                class="tw-inline-flex"
                v-tooltip.bottom="{
                  value: `${data.name} has ${data.postCount} post${data.postCount > 1 ? 's' : ''}`,
                  autoHide: false,
                }"
              >
                <Avatar :label="data.name.charAt(0)" size="small" />
              </OverlayBadge>
              <h3 class="tw-m-6">{{ data.name }}</h3>
            </div>
            <Button
:label="$t('user.goToDetails')"
              class="p-button-text tw-bold"
              icon="pi pi-user"
              @click="goToUserDetail(data.id)"
            />
          </div>
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" :placeholder="$t('user.searchByName')" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
