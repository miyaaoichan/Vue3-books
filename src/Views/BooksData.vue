<template>
  <el-card>
    <v-chart :option="option_type" class="echarts" @click="clickEventType"></v-chart>
    <v-chart :option="option_best" class="echarts" @click="clickEventBest"></v-chart>
    <v-chart :option="option_personal" class="echarts"></v-chart>
    <v-chart :option="option_boxplot" class="echarts"></v-chart>
    <v-chart :option="option_goodAuthor" class="echarts"></v-chart>
  </el-card>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  SingleAxisComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";

import * as echarts from "echarts";
import { ref, onMounted, onUnmounted } from "vue";
import { useBookStore } from "../store/bookStore";
import { useRouter } from "vue-router";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  SingleAxisComponent,
  VisualMapComponent,
]);
let option_type = ref({});
let option_best = ref({});
let option_personal = ref({});
let option_boxplot = ref({});
let option_goodAuthor = ref({});
let books = ref([]);
let showbooks = ref([]);
let timer = undefined;
const bookStore = useBookStore();
const router = useRouter();

onMounted(async () => {
  if (!bookStore.bookList.length) {
    await bookStore.getAllBooks();
  }
  books.value = bookStore.bookList.slice();
  showbooks.value = books.value.slice(0, 20);
  option_type.value = {
    dataset: {
      dimensions: ["type", "count"],
      source: booksGroupByType(books.value),
    },
    title: {
      text: "类型分布",
      left: "center",
      top: 0,
    },
    legend: {
      orient: "vertical",
      top: 10,
      left: "left",
      textStyle: {
        fontSize: 20,
      },
    },
    series: {
      type: "pie",
      encode: {
        value: "count",
        itemName: "type",
      },
      radius: ["30%", "80%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
    },
    tooltip: {
      trigger: "item",
    },
  };
  option_best.value = {
    dataset: {
      source: showbooks.value.sort((a, b) => b.rate - a.rate).slice(0, 20),
    },
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "豆瓣分最高的书",
      left: "center",
      top: 10,
    },

    xAxis: {
      type: "value",
      axisTick: {
        alignWithLabel: true,
      },
      z: 10,
    },
    yAxis: {
      type: "category",
      axisLabel: {
        color: "#999",
        interval: 0,
        rotate: 30,
        fontSize: 9,
        fontWeight: 600,
      },
      axisTick: {
        alignWithLabel: true,
      },
      inverse: true,
    },
    visualMap: [
      {
        show: true,
        type: "continuous",
        min: 10,
        max: 0,
        range: [0, 10],
        dimension: 1,
        left: 0,
        top: 0,
        hoverLink: false,
      },
    ],
    series: [
      {
        type: "bar",
        encode: {
          x: "rate",
          y: "bookName",
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#eea2a4" },
            { offset: 0.5, color: "#f07c82" },
            { offset: 1, color: "#ed5a65" },
          ]),
        },
        label: {
          show: true,
          fontSize: 12,
          color: "black",
        },
      },
    ],
    grid: {
      x: 120,
      y: 100,
      x2: 100,
      y2: 100,
    },
  };
  option_personal.value = {
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "看多作品数最多的作者",
      top: 20,
    },
    legend: {
      top: "bottom",
    },
    grid: {
      x: 120,
      y: 100,
      x2: 100,
      y2: 100,
    },
    series: [
      {
        type: "pie",
        radius: [80, 200],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: getAuthorData(books.value)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map((book) => {
            return {
              value: book[1],
              name: book[0],
            };
          }),
      },
    ],
  };
  option_boxplot.value = {
    dataset: [
      {
        source: [
          books.value.map((book) => book.rate).filter((value) => value !== 0),
          books.value
            .filter((book) => book.type === "推理")
            .map((book) => book.rate)
            .filter((value) => value !== 0),
          books.value
            .filter((book) => book.type === "历史")
            .map((book) => book.rate)
            .filter((value) => value !== 0),
          books.value
            .filter((book) => book.type !== "历史" && book.type !== "推理")
            .map((book) => book.rate)
            .filter((value) => value !== 0),
        ],
      },
      {
        transform: {
          type: "boxplot",
          config: {
            itemNameFormatter: (params) => ["全部", "推理", "历史", "其他"][params.value],
            resultDimensions: [
              { name: "min", method: "min", from: "rate" },
              { name: "median", method: "median", from: "rate" },
              { name: "max", method: "max", from: "rate" },
            ],
          },
        },
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1,
      },
    ],
    title: {
      text: "分数箱线图",
      left: "center",
      top: 10,
    },
    series: [
      {
        name: "boxplot",
        type: "boxplot",
        datasetIndex: 1,
      },
      {
        name: "outlier",
        type: "scatter",
        datasetIndex: 2,
      },
    ],
    xAxis: {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      z: 10,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#999",
        interval: 0,
        rotate: 30,
        fontSize: 9,
        fontWeight: 600,
      },
      axisTick: {
        alignWithLabel: true,
      },
      inverse: true,
      min: 5,
      max: 10,
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
    },
  };
  option_goodAuthor.value = {
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "个人评价7分以上作品最多的作者",
      left: "center",
      top: 10,
    },
    series: [
      {
        type: "treemap",
        data: countAuthorInfo()
          .sort((a, b) => b[1] - a[1])
          .map((item) => {
            return {
              name: item[0],
              value: item[1],
            };
          }),
        roam: false,
        nodeClick: false,
      },
    ],
  };
  changeBookPerSecond();
});

const getAuthorData = (books) => {
  const countAuthor = new Map();
  for (let book of books) {
    if (!countAuthor.has(book.author)) {
      countAuthor.set(book.author, 1);
    } else {
      countAuthor.set(book.author, countAuthor.get(book.author) + 1);
    }
  }
  return [...countAuthor];
};
function booksGroupByType(books) {
  const res = {};
  books.forEach((book) => {
    if (res.hasOwnProperty(book.type)) {
      res[book.type]++;
    } else {
      res[book.type] = 1;
    }
  });
  return Object.entries(res);
}
function changeBookPerSecond() {
  let arr = books.value.slice(0, 20);
  let count = 20;
  timer = setInterval(() => {
    if (count === books.value.length) {
      count = 20;
      arr = books.value.slice(0, 20).sort((a, b) => b.rate - a.rate);
    } else {
      count++;
      arr = books.value
        .slice(0, count)
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 20);
    }
    option_best.value.dataset.source = arr;
  }, 1000);
}
function countAuthorInfo() {
  const obj = {};
  books.value.forEach((book) => {
    if (book.myScore >= 7) {
      if (obj.hasOwnProperty(book.author)) {
        obj[book.author] = obj[book.author] + 1;
      } else {
        obj[book.author] = 1;
      }
    }
  });
  return Object.entries(obj).filter((item) => item[1] > 1);
}

const clickEventType = (e) => {
  if (e.name === "推理") {
    router.push({ name: "detective" });
  } else if (e.name === "历史") {
    router.push({ name: "history" });
  } else {
    router.push({ name: "other" });
  }
};
const clickEventBest = (e) => {
  router.push({ name: "detail", params: { id: e.value.bookId } });
};
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.el-card {
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.echarts {
  width: 900px;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
