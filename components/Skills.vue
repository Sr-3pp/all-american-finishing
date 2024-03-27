<template lang="pug">
section.aff-skills
    SrContainer(:with_space="true")
        SrText(text="Skills" class="title")
    ul.aff-skills-list(ref="refList")
        li.aff-skills-item(v-for="(skill, i) in skills" :key="i")
            SrContainer
                SrText(:text="skill.name")
            progress(:value="skill.current" max="100")


</template>

<script lang="ts" setup>
const { y } = useWindowScroll();
const refList: Ref<any> = ref(null);
const skills = ref([
  {
    name: "welding",
    value: 90,
    current: 0,
  },
  {
    name: "planning",
    value: 80,
    current: 0,
  },
  {
    name: "Full Finish",
    value: 100,
    current: 0,
  },
]);

const increase = (idx: number) => {
  const skill = skills.value[idx];
  setInterval(() => {
    if (skill.current < skill.value) {
      skill.current++;
    }
  }, 40);
};
watch(y, () => {
  const isVisible = useElementVisibility(refList.value);
  if (isVisible.value) {
    skills.value.forEach((_, i) => {
      increase(i);
    });
  }
});
</script>

<style lang="scss">
.aff-skills {
  > .sr-container {
    margin-bottom: pxToRem(40);
  }
  &-list {
    margin-bottom: pxToRem(40);
  }
  &-item {
    .sr-container {
      margin-bottom: pxToRem(10);
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(40);
    }

    .sr-text {
      font-weight: bold;
      color: $color-aff-gray;
      text-transform: capitalize;
    }

    progress {
      width: 100%;
      appearance: none;
      &::-webkit-progress-bar {
        background-color: $color-aff-light-gray;
      }

      &::-webkit-progress-value {
        background-color: $color-aff-blue;
      }
    }
  }
}
</style>
