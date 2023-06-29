<script setup lang="ts">
import { PhPaperclip, PhPaperclipHorizontal, PhX } from '@phosphor-icons/vue';
import { getFileSize } from '@/utils';
import { ref } from 'vue';

const attachments = ref<Array<File>>([]);

const dataTransfer = new DataTransfer();

const addAttachments = (e: Event) => {
  const input = e.target as HTMLInputElement;

  if (!input) return;

  const files = input.files;

  if (!files || files.length === 0) {
    return;
  }

  for (const file of files) {
    dataTransfer.items.add(file);
    attachments.value.push(file);
  }

  input.files = dataTransfer.files;
};

const deleteFile = (index: number) => {
  for (const file of dataTransfer.items) {
    if (attachments.value[index].name === file.getAsFile()?.name) {
      dataTransfer.items.remove(index);
    }
  }

  attachments.value.splice(index, 1);
};
</script>

<template>
  <div
    class="file"
    v-for="(attachment, index) in attachments"
    :key="attachment.name"
  >
    <PhPaperclipHorizontal
      size="24"
      class="icon"
    />
    <div class="inner-wrapper">
      <span class="info">{{ attachment.name }} {{ getFileSize(attachment.size) }}</span>
      <div class="actions">
        <PhX
          size="28"
          class="delete"
          @click="deleteFile(index)"
        />
      </div>
    </div>
  </div>
  <label
    class="file-selector"
    for="file-input"
  >
    <div class="custom-file-selector">
      <ph-paperclip
        :size="32"
        color="var(--text-color)"
      />
      <span>Add attachment</span>
    </div>
    <input
      type="file"
      id="file-input"
      name="file-input"
      aria-label="Message attachments"
      multiple
      @change="addAttachments"
    />
  </label>
</template>

<style scoped lang="scss">
.file {
  min-height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: default;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition: 0.3s all;

  * {
    transition: inherit;
  }

  &:hover {
    background-color: rgba(var(--text-color-rgb), 0.05);

    .inner-wrapper .actions {
      opacity: 1;
    }
  }

  .inner-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .info {
      overflow: hidden;
      max-height: inherit;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .actions {
      opacity: 0;
      display: flex;
      align-items: center;
      gap: 1rem;

      .delete {
        cursor: pointer;
        padding: 5px;
        border-radius: 2px;

        &:hover {
          background-color: rgba(var(--text-color-rgb), 0.05);
        }
      }
    }
  }
}

.file-selector {
  display: block;
  position: relative;
  display: flex;
  align-items: center;
  color: $text-color;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-out;

  #file-input {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }

  .custom-file-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
