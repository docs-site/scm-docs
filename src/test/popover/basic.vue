<script lang="ts" setup>
import { MtPopover } from "vitepress-theme-mist";
</script>

<template>
  <div class="popover-base-box">
    <div class="row center">
      <MtPopover title="Title" content="Top Left prompts info" placement="top-start">
        <template #reference>
          <button>top-start</button>
        </template>
      </MtPopover>
      <MtPopover title="Title" content="Top Center prompts info" placement="top">
        <template #reference>
          <button>top</button>
        </template>
      </MtPopover>
      <MtPopover title="Title" content="Top Right prompts info" placement="top-end">
        <template #reference>
          <button>top-end</button>
        </template>
      </MtPopover>
    </div>
    <div class="row">
      <MtPopover title="Title" content="Left Top prompts info" placement="left-start">
        <template #reference>
          <button>left-start</button>
        </template>
      </MtPopover>
      <MtPopover title="Title" content="Right Top prompts info" placement="right-start">
        <template #reference>
          <button>right-start</button>
        </template>
      </MtPopover>
    </div>
    <div class="row">
      <MtPopover title="Title" content="Left Center prompts info" placement="left">
        <template #reference>
          <button class="mt-3 mb-3">left</button>
        </template>
      </MtPopover>
      <MtPopover title="Title" content="Right Center prompts info" placement="right">
        <template #reference>
          <button>right</button>
        </template>
      </MtPopover>
    </div>
    <div class="row">
      <MtPopover title="Title" content="Left Bottom prompts info" placement="left-end">
        <template #reference>
          <button>left-end</button>
        </template>
      </MtPopover>
      <MtPopover title="Title" content="Right Bottom prompts info" placement="right-end">
        <template #reference>
          <button>right-end</button>
        </template>
      </MtPopover>
    </div>
    <div class="row center">
      <MtPopover title="Title" content="Bottom Left prompts info" placement="bottom-start">
        <template #reference><button>bottom-start</button></template>
      </MtPopover>
      <MtPopover title="Title" content="Bottom Center prompts info" placement="bottom">
        <template #reference><button>bottom</button></template>
      </MtPopover>
      <MtPopover title="Title" content="Bottom Right prompts info" placement="bottom-end">
        <template #reference>
          <button>bottom-end</button>
        </template>
      </MtPopover>
    </div>
  </div>
</template>

<style lang="css" scoped>
.popover-base-box {
  width: 600px;
}

.popover-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.popover-base-box .center {
  justify-content: center;
  gap: 10px;
}

button {
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  border: 1px solid #dcdfe6;

  &:hover {
    background-color: var(--mt-fill-color-dark);
  }
}
</style>
