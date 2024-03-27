<script lang="ts" setup>
import type { Project } from "~/types";
definePageMeta({
  layout: "panel",
});
import { fillForm, resetForm } from "~/assets/ts/utilities";

const { data } = await useFetch("/api/project");

const { data: projects }: any = data.value || [];

const projectModal = ref(false);
const thumbs: Ref<Array<string>> = ref([]);
const thumbsFiles: Ref<Array<any>> = ref([]);
const currentProject: Ref<Project> = ref(null);

const projectForm = ref([
  {
    fields: [
      {
        component: "SrFormInput",
        props: {
          placeholder: "Name",
          name: "name",
          required: true,
        },
      },
    ],
  },
]);

const createFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key.includes("thumb")) {
      const keyName = key.split("_")[0];
      data[keyName].forEach((file: any, idx: number) => {
        formData.append(`${keyName}_${idx}`, file);
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

const updateProject = async (data: any) => {
  data.thumbs = currentProject.value.thumbs.filter(
    (thumb: string) => !thumb.includes("data:")
  );
  const formData = createFormData(data);

  formData.append("_id", currentProject.value._id);

  const { data: project }: any = await $fetch("/api/project", {
    method: "PUT",
    body: formData,
  });

  const idx = projects.findIndex((p: any) => p._id === project._id);
  projects[idx] = project;

  projectModal.value = false;
  resetForm(projectForm);
};

const addProject = async (data: any) => {
  const formData = createFormData(data);

  const { data: project }: any = await $fetch("/api/project", {
    method: "POST",
    body: formData,
  });

  projects.push(project);
  projectModal.value = false;
  resetForm(projectForm);
  thumbs.value = [];
};

const submitHandler = (data: any) => {
  if (thumbsFiles.value.length) {
    data.thumbFiles = thumbsFiles.value;
  }
  if (currentProject.value) {
    return updateProject(data);
  }

  return addProject(data);
};

const newProject = () => {
  currentProject.value = null;
  thumbs.value = [];
  thumbsFiles.value = [];
  resetForm(projectForm);
  projectModal.value = true;
};

const editProject = (project: any) => {
  currentProject.value = project;
  fillForm(projectForm, project);
  projectModal.value = true;
};

const deleteProject = async (idx: number) => {
  if (!confirm("Are you sure?")) return;
  await $fetch("/api/project", {
    method: "DELETE",
    body: {
      _id: projects[idx]._id,
    },
  });

  projects.splice(idx, 1);
};

const deleteThumb = (index: number) => {
  if (currentProject.value) {
    currentProject.value.thumbs.splice(index, 1);
  } else {
    thumbs.value.splice(index, 1);
  }
};

const previewThumbs = (event: any) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (currentProject.value) {
        currentProject.value.thumbs.push(e.target?.result as string);
      } else {
        thumbs.value.push(e.target?.result as string);
      }
      thumbsFiles.value.push(files[i] as any);
    };
    reader.readAsDataURL(files[i]);
  }
};
</script>

<template lang="pug">
.aff-projects
  SrContainer(:with-padding="true")
    .aff-projects-header
      SrText(text="Projects" class="title")
      button(@click="newProject") Add Project
    SrGrid.aff-projects-list(tag="ul")
      SrGridColumn.aff-projects-list-item(v-for="(project, i) in projects" tag="li" :key="i" :size="{mobile: '1', sm: '1/4'}") 
        button(@click="editProject(project)")
          SrText(:text="project.name")
          SrPicture(:src="project.thumbs[0]")
        button(@click="deleteProject(i)") Delete

  SrModal(:active="projectModal" @close="projectModal = false")
    template(#body)
      .sr-modal-body
        SrForm(:fieldsets="projectForm" submit="Add Project" @submit="submitHandler")
          template(#legal)
            SrGrid.aff-projects-thumbs(tag="ul")
              SrGridColumn.aff-projects-thumb(tag="li")
                label
                  input(type="file" @change="previewThumbs" multiple)
                  span Add Picture
              SrGridColumn.aff-projects-thumb(v-for="(thumb, i) in currentProject ? currentProject.thumbs : thumbs" tag="li" :size="{mobile: '1/2', sm: '1/4'}" :key="i")
                SrPicture(:src="thumb")
                button(@click="deleteThumb(i)" type="button") Delete
</template>

<style scoped></style>
