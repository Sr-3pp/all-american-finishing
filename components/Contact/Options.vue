<template lang="pug">
div.contact-options
    ul.contact-options-list(v-if="(!only_hours && !only_contact) || (only_contact && !only_hours)")
        li.contact-options-item(v-for="(item, i) in contact_list" :key="i")
            SrIcon.contact-options-icon(:name="item.icon")
            article.contact-options-info
                SrText(:text="item.title" class="title")
                SrText(:html="item.value" :class="{email: item.title == 'E mail'}")
    div.open-title(v-if="(!only_hours && !only_contact) || (only_hours && !only_contact)")
        SrIcon(name="clock-o")
        SrText(text="Opening Hours" class="title")
    ul.contact-options-schedule(v-if="(!only_hours && !only_contact) || (only_hours && !only_contact)")
        li.contact-options-hour(
            v-for="({day, hours}, i) in schedule"
            :key="i"
        )
            SrText(:text="day")
            SrText(:text="`${hours.open == '0' && hours.close == '0' ? 'Closed' : hours.open + '-' + hours.close}`")
</template>

<script lang="ts">
import { queryContent } from "~/assets/ts/content";

export default defineComponent({
  props: {
    only_contact: {
      type: Boolean,
      default: false,
    },
    only_hours: {
      type: Boolean,
      defalut: false,
    },
  },
  async setup() {
    const { address, tel, fax, cel, email, schedule } = await queryContent(
      "_config/contact"
    );

    const contact_list = [
      {
        icon: "pin-o",
        title: "Address",
        value: `${address.line_1}<br><span class="bold">${address.line_2}</span>`,
      },
      {
        icon: "tel-o",
        title: "Phone",
        value: tel,
      },
      {
        icon: "fax-o",
        title: "Fax",
        value: fax,
      },
      {
        icon: "cel-o",
        title: "Cel",
        value: cel,
      },
      {
        icon: "envelope-o",
        title: "E mail",
        value: email.join("<br>"),
      },
    ];

    return {
      schedule,
      contact_list,
    };
  },
});
</script>

<style lang="scss">
.contact-options {
  background-color: $color-aff-red;
  color: $color-white;
  width: 100%;
  border-radius: pxToRem(18);
  padding: pxToRem(40);
  display: flex;
  flex-direction: column;
  align-items: center;

  &-list {
    width: 100%;
    margin-bottom: pxToRem(40);
  }

  &-item {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: pxToRem(20);
    }
  }

  &-icon {
    width: pxToRem(40);
    height: pxToRem(40);
    margin-right: pxToRem(40);
    flex-shrink: 0;
  }

  &-info {
    .sr-text {
      &.title {
        font-size: pxToRem(30);
        margin-bottom: pxToRem(10);
        .sr-text-container {
          color: $color-white;
        }
      }
      &.email {
        --text-size: 90%;
      }
      &:not(.title) {
        font-size: pxToRem(18);
        &:not(:last-child) {
          margin-bottom: pxToRem(10);
        }
      }

      .bold {
        font-weight: bold;
        font-size: pxToRem(14);
      }
    }
  }

  .open-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: pxToRem(40);

    .sr-icon {
      width: pxToRem(40);
      height: pxToRem(40);
      margin-right: pxToRem(10);
    }

    .sr-text {
      &.title {
        color: $color-white;
      }
    }
  }

  &-schedule {
    width: 100%;
  }

  &-hour {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: pxToRem(16);
    }
  }
}
</style>
