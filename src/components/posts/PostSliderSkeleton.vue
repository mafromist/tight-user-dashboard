<template>
  <div class="tw-max-w-5xl tw-mx-auto">
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
      <div v-for="n in 3" :key="n" class="tw-relative">
        <div class="tw-border tw-rounded-lg tw-p-4">
          <Skeleton shape="circle" size="8rem" class="tw-mx-auto tw-mb-4" />
          <Skeleton height="1.5rem" class="tw-mb-2" />
          <Skeleton height="1rem" class="tw-mb-4" />
          <Skeleton height="1rem" class="tw-mb-4" width="80%" />

          <div class="tw-flex tw-justify-between tw-items-center tw-mt-4">
            <Skeleton shape="circle" size="2rem" />
            <Skeleton height="2rem" width="5rem" />
          </div>
        </div>
      </div>
    </div>

    <div class="tw-flex tw-justify-between tw-items-center tw-mt-4">
      <Skeleton height="1rem" width="10rem" />
      <div class="tw-flex tw-gap-2">
        <Skeleton shape="circle" size="2rem" />
        <Skeleton shape="circle" size="2rem" />
      </div>
      <Skeleton height="2rem" width="5rem" />
    </div>
  </div>
</template>
