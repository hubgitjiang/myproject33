<template>
    <div>
        <h1>我是 useElement.vue</h1>
        <h3>使用按钮</h3>
        <el-button type="success" round>成功按钮</el-button>
        <h3>使用开关</h3>
        {{ value }}
        <el-switch v-model="value" active-color="red" inactive-color="black">
        </el-switch>
        <h3>选择器</h3>
        {{ value1 }}
        <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
      value1: '',
      options: [
        { label: '上海', value: 'sh' },
        { label: '深圳', value: 'sz' },
        { label: '东莞', value: 'dg' },
        { label: '惠州', value: 'hz' }
      ]
    }
  }
}
</script>

<style>

</style>
