<template>
    <div>
        <el-form ref="form" :inline="true" :model="value" class="demo-form-inline">
            <template v-for="item in formItem" >
                <el-form-item v-if="item.type==='input'" :prop="item.prop">
                    <el-input v-model="value[item.prop]" :placeholder="item.placeholder"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.type==='select'" :label="item.label" :prop="item.prop" v-bind="item">
                    <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
                        <el-option v-for="(ele,index) in item.children" :key="index" :label="ele.name" :value="ele.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.type==='date'" v-bind="item" :label="item.label" :prop="item.prop">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" :type="item.type"
                        :placeholder="item.placeholder">
                    </el-date-picker>
                </el-form-item>
                <el-form-item v-else-if="item.type==='dialog'" :prop="item.prop">
                    <el-input v-model="value[item.prop]" :placeholder="item.placeholder" @focus="handleFocus"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.type==='slot'" :prop = "item.prop">
                    <slot :name="item.slot_name"></slot>
                </el-form-item>
                
                
            </template>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"bf",
    data() {
        return {

        }
    },
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        formItem: {
            type: Array,
            default:()=>[]
        }
    },
    methods: {
        handleResetForm() {
            this.$refs["form"].resetFields();
        },
        handleFocus() {
            this.$emit('handleFocus')
        }
    },
}
</script>

<style lang='scss' scoped>

</style>