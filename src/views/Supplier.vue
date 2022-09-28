<template>
  <div>
    <!-- <el-form ref="supplierForm" :inline="true" :model="supplierQuery" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="supplierQuery.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item  prop="linkman">
        <el-input v-model="supplierQuery.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="supplierQuery.mobile" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('supplierForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <base-form :formItem="formItem" ref="supplierForm" v-model.sync="supplierQuery">
      <template v-slot:query>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('supplierForm')">重置</el-button>
      </template>
    </base-form>

    <base-table @size="handleSizeChange" @num="handleCurrentChange" :List="supplierList" :columns="columns"
      :pagenum="pagenum" :pagesize="pagesize" :total="total">
      <template v-slot:action="scope">
        <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </base-table>
    <!-- <el-table class="mt-2" :data="supplierList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[10, 20, 30, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination> -->
    <!-- 弹出框 -->
    <!-- 弹出框 -->
    <base-dialog :title="dialogTitle" ref="dialogForm" :visible.sync="dialogFormVisible" :dialogItem="dialogItem"
      v-model.sync="dialogFormParams">
      <template v-slot:queryLog>
        <el-button @click="handleCancel('dialogForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('dialogForm')">确 定</el-button>
      </template>
    </base-dialog>
    <!-- <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="dialogFormParams" ref="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="dialogFormParams.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="dialogFormParams.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="dialogFormParams.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="dialogFormParams.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { supplierList, deleteSupplier, addSupplier, findSupplier, editSupplier } from '@/api/supplier'
import BaseTable from '@/components/BaseTable.vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseDialog from '@/components/BaseDialog.vue'
export default {
  components: {
    BaseTable,
    BaseForm,
    BaseDialog
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      supplierQuery: {
        linkman: "",
        mobile: "",
        name: "",
      },
      supplierList: [],
      dialogTitle: "供应商新增",
      dialogFormVisible: false,
      dialogFormParams: {
        linkman: "",
        mobile: "",
        name: "",
        remark: ""
      },
      columns: [{
        label: '序号',
        type: 'index',
        width: '60',
        order: true
      }, {
        label: '供应商名称',
        prop: "name",
      }, {
        label: '联系人',
        prop: "linkman"
      },
      {
        label: '联系电话',
        prop: "mobile"
      },
      {
        label: '备注',
        prop: "remark"
      },
      {
        label: '操作',
        type: 'slot',
        width: '180',
        slot_name: 'action'
      }],
      formItem: [
        {
          type: 'input',
          prop: 'name',
          placeholder: '供应商名称',
        },
        {
          type: 'input',
          prop: 'linkman',
          placeholder: '联系人',

        },
        {
          type: 'input',
          prop: 'mobile',
          placeholder: '联系电话'
        },
        {
          type: 'slot',
          slot_name: 'query'
        }
      ],
      dialogItem: [
        {
          type: 'input',
          prop: 'name',
          label: '供应商名称',
          rules: {
            required: true, message: '供应商不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'linkman',
          label: '联系人',
          rules: {
            required: true, message: '联系人不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'mobile',
          label: '联系电话'
        },
        {
          type: 'textarea',
          prop: 'remark',
          label: '备注'
        },
        {
          type: 'slot',
          slot_name: 'queryLog'
        }
      ]
    }
  },
  methods: {
    async getSupplierList() {
      const { rows, total } = await supplierList(this.pagenum, this.pagesize, this.supplierQuery)

      this.supplierList = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getSupplierList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getSupplierList()
    },
    handleQuery() {
      this.pagenum = 1
      this.getSupplierList()
    },
    //重置
    handleReset(formName) {
      console.log(formName,'formname');
      this.$refs[formName].handleResetForm();
    },
    //删除
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteSupplier(id)
          this.$message.success('删除成功')
          this.getSupplierList()
        } catch (error) {
          console.log(error.message);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 打开弹窗事件
    handelOpenDialog(id) {
      console.log(id, '弹');
      this.dialogFormVisible = true
      if (typeof id === 'number') {
        this.dialogTitle = "供应商编辑"
        this.handleFindSupplier(id)
        return
      }
      this.dialogTitle = "供应商新增"
      // this.handleReset('dialogForm')

    },
    // 弹窗提交事件
    handleSubmit(formName) {
      this.$refs[formName].handleSubmitForm()
      let result = this.$refs[formName].flag
      console.log(this.$refs[formName],'result');
      if (result) {
        this.dialogFormParams.id ? this.handleEditSupplier() : this.handleAddSupplier()
      }
    },
    //新增用户接口
    async handleAddSupplier() {
      try {
        const res = await addSupplier(this.dialogFormParams)
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('新增成功')
        this.getSupplierList()
      } catch (error) {
        console.log(error.message);
      }
    },
    //查询单个会员接口
    async handleFindSupplier(id) {
      try {
        const res = await findSupplier(id)
        console.log(res, 'res');
        this.dialogFormParams = res
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑会员接口
    async handleEditSupplier() {
      try {
        const res = await editSupplier(this.dialogFormParams.id, this.dialogFormParams)
        console.log(res, 'res');
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.getSupplierList()
      } catch (e) {
        console.log(e.message);
      }
    },
    //弹框取消事件
    handleCancel(formName) {
      this.handleReset(formName)
      this.dialogFormVisible = false
    }
  },
  created() {
    this.getSupplierList()
  },
}
</script>

<style lang='scss' scoped>

</style>