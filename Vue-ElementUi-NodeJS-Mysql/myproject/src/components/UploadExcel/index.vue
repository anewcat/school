<template>
  <div class="imp">
    <div class="upload">
      <el-button type="primary" @click="uploadExcel">点击上传</el-button>
      <input
        ref="inputRef"
        style="display: none"
        type="file"
        accept=".xlsx, .xls"
        @change="inputChange"
      />
    </div>
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragleave.stop.prevent="dropText = '拖拽一个文件'"
    >
      <span>{{ dropText }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow } from './utils'
const props = defineProps({
  beforeUpload: Function,
  uploadSuccess: Function
})
const inputRef = ref(null)
const dropText = ref('拖拽一个文件')
const loading = ref(false)
const uploadExcel = () => {
  inputRef.value.click()
}
const inputChange = (e) => {
  const files = e.target.files[0]
  if (!files) return
  uploadFun(files)
}
const uploadFun = (files) => {
  // 解决同一个文件第二次上传不触发问题
  inputRef.value.value = ''
  if (!props.beforeUpload) {
    readerData(files)
  }
  if (props.beforeUpload(files)) {
    readerData(files)
  } else {
    loading.value = false
    dropText.value = '拖拽一个文件'
  }
}
const readerData = (files) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 异步完成
      resolve()
      // 启动读取指定的 Blob 或 File 内容
    }
    reader.readAsArrayBuffer(files)
  })
}
const generateData = (excelData) => {
  console.log(excelData)
  loading.value = false
  dropText.value = '拖拽一个文件'
  props.uploadSuccess && props.uploadSuccess(excelData)
}

// 拖拽
/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中跳过
  if (loading.value) return
  dropText.value = '上传中'
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    dropText.value = '拖拽一个文件'
    loading.value = false
    return
  }
  const rawFile = files[0]
  // 触发上传事件
  uploadFun(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
  dropText.value = '可以放手了'
}
</script>

<style scoped lang="scss">
.drop {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 1px dashed #ccc;
}
.imp {
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  align-items: center;
}
</style>