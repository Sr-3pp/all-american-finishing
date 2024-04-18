<script lang="ts" setup>
definePageMeta({
  layout: "panel",
});

import { queryContent } from "~/assets/ts/content";
import { fillForm } from "~/assets/ts/utilities";

const { content } = await queryContent("_jobs");
const { jobs } = content;

const modalJob = ref(null);
const currentJob: any = ref(null);
const jobForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          placeholder: "Title",
          name: "title",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Location",
          name: "location",
          required: true,
        },
      },
      {
        component: "SrFormInput",
        props: {
          placeholder: "Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      },
    ],
  },
]);

const updateJob = (data: any) => {
  Object.keys(data).forEach((key) => {
    currentJob.value[key] = data[key];
  });

  return sendJob();
};

const addJob = (data: any) => {
  jobs.push(data);
  return sendJob();
};

const submitHandler = async (data: any) => {
  if (currentJob.value) {
    return updateJob(data);
  }
  return addJob(data);
};

const sendJob = async () => {
  try {
    const job = await $fetch("/api/content", {
      method: "PUT",
      body: {
        path: "/_jobs",
        content: { jobs },
      },
    });

    (modalJob.value as any).toggle();
  } catch (error) {
    console.log(error);
  }
};

const openJobModal = () => {
  (modalJob.value as any).toggle();
};

const deleteJob = (idx: number) => {
  if (!confirm("Are you sure?")) return;
  jobs.splice(idx, 1);
  sendJob();
};

const runAction = ({ action, idx }: any) => {
  if (action == "delete") {
    deleteJob(idx);
  } else if (action == "edit") {
    currentJob.value = jobs[idx];
    fillForm(jobForm, jobs[idx]);
    (modalJob.value as any).toggle();
  }
};
</script>

<template lang="pug">
.aff-jobs
  SrContainer(:with-padding="true")
    .aff-jobs-header
      SrText(text="Jobs")
      button(@click="openJobModal") Add Job
    AafTable(:data="jobs" :editable="true" @action="runAction")

  SrModal(ref="modalJob")
    template(#body)
        SrForm(:fieldsets="jobForm" submit="Add position" @submit="submitHandler")
</template>

<style lang="scss" scoped></style>
