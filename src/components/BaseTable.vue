<template>
    <div>
        <el-table class="mt-2" :data="List" height="380" border style="width: 100%">
            <template v-for="(item,index) in columns">
                <el-table-column v-if="item.order" :type="item.type" :label="item.label" v-bind="item">
                </el-table-column>
                <el-table-column v-else-if="!item.type" :label="item.label" :prop="item.prop" v-bind="item">
                </el-table-column>
                <!-- <el-table-column v-else-if="item.type==='action'" :label="item.label" v-bind="item">
                    <template v-slot="scope">
                        <el-button size="mini" v-for="(ele,index) in item.actions" :key="index" :type="ele.type" @click="handleClick(scope.row,ele.text)">{{ele.text}}
                        </el-button>
                    </template>
                </el-table-column> -->
                <el-table-column v-else-if="item.type==='slot'" :label="item.label" v-bind="item">
                    <template v-slot="scope">
                        <slot :name="item.slot_name" :row="scope.row"></slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="pageSizes" :page-size="pagesize" :layout="layout" :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'basetable',
    props: {
        List: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        pagenum: {
            type: [Number, String],
            default:1
        },
        pageSizes: {
            type: Array,
            default:()=>[10,20,30,50]
        },
        pagesize: {
            type: [Number, String],
            default:10
        },
        layout: {
            type: String,
            default:'total, sizes, prev, pager, next, jumper'
        },
        total: {
            type: [Number, String],
            default:0
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('size',val)
         },
        handleCurrentChange(val) {
            this.$emit('num',val)
        },
        handleClick(e,t) {
            console.log(e, t);
            this.$emit('hanclick',{event:e,title:t})
        }
    },
}
</script>

<style lang='scss' scoped>

</style>