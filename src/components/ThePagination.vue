<template>
  <div class="page">
    <div class="icon">
      <Icon
        size="20"
        @click="changeCurrentPage(bookStore.currentPage - 1)"
        v-if="bookStore.currentPage !== 1"
      >
        <ArrowBackOutline />
      </Icon>
      <Icon size="20" v-else>
        <Close />
      </Icon>
    </div>
    <ul>
      <li v-for="p in pageList" :key="p">
        <button
          @click="changeCurrentPage(p)"
          :class="{ onPage: p === bookStore.currentPage }"
        >
          {{ p }}
        </button>
      </li>
    </ul>
    <div class="icon">
      <Icon
        size="20"
        @click="changeCurrentPage(bookStore.currentPage + 1)"
        v-if="bookStore.currentPage !== Math.ceil(length / itemsAPage)"
      >
        <ArrowForwardOutline />
      </Icon>
      <Icon size="20" v-else>
        <Close />
      </Icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBookStore } from "../store/bookStore";
import { Icon } from "@vicons/utils";
import { ArrowBackOutline, ArrowForwardOutline, Close } from "@vicons/ionicons5";
const props = defineProps({
  pageList: {
    type: Array,
  },
  length: {
    type: Number,
  },
  itemsAPage: {
    type: Number,
  },
});

const emit = defineEmits(["changePage"]);

const bookStore = useBookStore();
const width = computed(() => 40 * props.pageList.length + "px");

function changeCurrentPage(page) {
  emit("changePage", page);
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page ul {
  width: v-bind(width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 30px;
}

ul li button {
  background-color: #fff;
  border: none;
  color: rgba(45, 135, 240, 1);
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

ul li button:hover {
  transform: scale(1.5);
  color: rgba(45, 135, 240, 0.5);
}

.onPage {
  transform: translateY(2px) scale(1.2);
  text-decoration: underline;
}

.icon {
  cursor: pointer;
}
</style>
