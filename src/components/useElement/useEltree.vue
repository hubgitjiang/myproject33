<template>
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <!-- treeKey： 给当前元素设置唯一标识 -->
        <!-- parentKey: 给当前元素设置父元素 -->
        <!-- levelKey: 给元素设置级别 -->
        <el-table-tree-column levelKey="level" parentKey="parantid" file-icon="icon icon-file" folder-icon="icon icon-folder" treeKey="id" prop="name" label="分类名称" width="220">
        </el-table-tree-column>
        <el-table-column property="level" label="分类级别" width="120">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    id: 1, name: '零食', level: '0', parantid: 0, children: [
                        {
                            id: 3, name: '巧克力', level: '1', parantid: 1, children: [
                                { id: 7, name: '德芙', level: '2', parantid: 3 }
                            ]
                        },
                        { id: 4, name: '面包', level: '1', parantid: 1 }
                    ]
                },
                {
                    id: 2, name: '家电', level: '0', parantid: 0, children: [
                        { id: 5, name: '冰箱', level: '1', parantid: 2 },
                        { id: 6, name: '空调', level: '1', parantid: 2 }
                    ]
                }
            ]
        }
    }
}
</script>

<style>

</style>
