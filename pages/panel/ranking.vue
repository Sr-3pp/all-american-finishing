<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});
const { data }: any = await useFetch("/api/rank");
const { data: ranks } = data.value;

const deleteRank = async (id: string) => {
  try {
    await $fetch("/api/rank", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    const idx = ranks.findIndex((rank: any) => rank._id === id);

    ranks.splice(idx, 1);
  } catch (error) {
    console.log(error);
  }
};

const runAction = ({ action, idx }: any) => {
  if (!confirm("Are you sure?")) return;

  if (action == "delete") {
    console.log("delete item");
    const rank = ranks[idx];
    deleteRank(rank._id);
  }
};
</script>

<template lang="pug">
.aff-ranks
  SrContainer(:with-padding="true")
    SrText(text="Rank List" class="title")
    AafTable(:data="ranks" :editable="true" :hide-buttons="['edit']" @action="runAction")
</template>

<style lang="scss" scoped>
.aff-ranks {
  .sr-container > * {
    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
  }
}
</style>
