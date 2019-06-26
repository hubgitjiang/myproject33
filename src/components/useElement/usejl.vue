<template>
    <div>
        {{ value }}
        <el-cascader v-model="value" :options="options" :props="propsObj">
        </el-cascader>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 数据源
            options: [
                {
                    name: '一级1', id: '1', children: [
                        {
                            name: '二级1', id: '4', children: [
                                { name: '三级1', id: '7' },
                                { name: '三级2', id: '8' },
                            ]
                        },
                        { name: '二级2', id: '5' },
                        { name: '二级3', id: '6' },
                    ]
                },
                { name: '一级2', id: '2' },
                { name: '一级3', id: '3' }
            ],
            // 表单元素双向绑定的数据
            value: [],
            // 配置项
            propsObj: {
                expandTrigger: 'hover', // 触发子选项的条件
                label: 'name',
                value: 'id'
            }
        }
    }
}
</script>

<style>

</style>
