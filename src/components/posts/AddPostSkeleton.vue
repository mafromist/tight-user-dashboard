<template>
  <section class="add-post">
    <div class="card tw-p-4">
      <Skeleton height="2rem" class="tw-mb-4" />
      <Skeleton height="1rem" class="tw-mb-6" width="70%" />

      <div
        class="tw-flex tw-flex-col tw-mb-4 tw-p-4 tw-h-full lg:tw-h-[45vh] lg:tw-flex-row tw-gap-4"
      >
        <div class="tw-w-full lg:tw-w-1/4">
          <div
            class="tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-4"
          >
            <Skeleton shape="circle" size="4rem" class="tw-mb-4" />
            <Skeleton height="1.5rem" class="tw-mb-2" width="80%" />
            <Skeleton height="1rem" width="90%" />
          </div>
        </div>

        <div class="tw-w-full lg:tw-w-3/4 tw-flex tw-flex-col tw-gap-4">
          <div class="tw-p-4">
            <Skeleton height="1rem" class="tw-mb-2" width="30%" />
            <Skeleton height="2.5rem" />
          </div>

          <div class="tw-p-4 tw-flex-1">
            <Skeleton height="1rem" class="tw-mb-2" width="30%" />
            <Skeleton height="8rem" />
          </div>

          <div class="tw-flex tw-justify-end tw-p-4">
            <Skeleton height="2.5rem" width="6rem" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
