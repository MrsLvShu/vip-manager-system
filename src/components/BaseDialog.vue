<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
            <el-form :model="value" ref="form" label-width="100px" style="text-align: right;">
                <template v-for="item in dialogItem">
                    <el-form-item v-if="item.type=='input'" v-bind="item" :label="item.label" :prop="item.prop">
                        <el-input :type="item.type" v-model="value[item.prop]"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.type=='textarea'" v-bind="item" :label="item.label" :prop="item.prop">
                        <el-input :type="item.type" v-model="value[item.prop]"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.type=='select'" :label="item.label" :prop="item.prop" v-bind="item" style="text-align: left;">
                        <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
                            <el-option v-for="(ele,index) in item.children" :key="index" :label="ele.name" :value="ele.type"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-else-if="item.attr=='dialog'" v-bind="item" :label="item.label" :prop="item.prop">
                        <el-input :type="item.type" v-model="value[item.prop]"  @focus="handleFocus"></el-input>
                    </el-form-item>
                    <el-form-item v-else-if="item.type==='date'" v-bind="item" :label="item.label" :prop="item.prop"  style="text-align: left;">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder">
                        </el-date-picker>
                    </el-form-item>
                    <slot :name="item.slot_name"></slot>
                </template>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'basedialog',
    data() {
        return {
            flag:false
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '供应商新增'
        },
        value: {
            type: Object,
            default: () => { }
        },
        dialogItem: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleResetForm() {
            this.$refs['form'].resetFields();
        },
        handleSubmitForm() {
            this.$refs['form'].validate((valid) => {
                console.log(valid,'valid');
                if (!valid) return
                this.flag=valid
            })
        },
        handleFocus() {
            this.$emit('handleFocus')
        }
    },
    computed : {
        dialogVisible : {
				get(){
					return this.visible
				},
				set(val){
					this.$emit("update:visible",val)
				}
			}
		}
}
</script>

<style lang='scss' scoped>

</style>