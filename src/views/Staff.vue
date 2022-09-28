<template>
  <div>
    <!-- <el-form ref="staffForm" :inline="true" :model="staffQuery" class="demo-form-inline">
      <el-form-item prop="username">
        <el-input v-model="staffQuery.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="staffQuery.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button  @click="handleReset('staffForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <base-form :formItem="formItem" ref="staffForm" v-model.sync="staffQuery">
      <template v-slot:query>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('staffForm')">重置</el-button>
      </template>
    </base-form>

    <base-table @size="handleSizeChange" @num="handleCurrentChange" :List="staffList" :columns="columns" :pagenum="pagenum" :pagesize="pagesize" :total="total">
  <template v-slot:action="scope">
    <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
  </template>
  </base-table>
    <!-- <el-table class="mt-2" :data="staffList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="username" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="salary" label="薪酬">
      </el-table-column>
      <el-table-column prop="entryDate" label="入职时间">
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
    <!-- <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="dialogFormParams" ref="dialogForm" :rules="dialogRules" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="dialogFormParams.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogFormParams.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="dialogFormParams.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="dialogFormParams.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="dialogFormParams.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker value-format="yyyy-MM-dd" v-model="dialogFormParams.entryDate" type="date" placeholder="选择入职时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog> -->

    <base-dialog :title="dialogTitle" ref="dialogForm" :visible.sync="dialogFormVisible" :dialogItem="dialogItem"
      v-model.sync="dialogFormParams">
      <template v-slot:queryLog>
        <el-button @click="handleCancel('dialogForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('dialogForm')">确 定</el-button>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import { staffList, deleteStaff, addStaff, findStaff, editStaff } from '@/api/staff';
import BaseTable from '@/components/BaseTable.vue'
export default {
  name:'index',
  components: {
    BaseTable,
    BaseForm: () => import('../components/BaseForm.vue'),
    BaseDialog:()=>import('../components/BaseDialog.vue')
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      staffQuery: {
        name: "",
        username: ""
      },
      staffList: [],
      dialogTitle: "员工新增",
      dialogFormVisible: false,
      dialogFormParams: {
        name: "",
        username: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate:""
      },
      columns: [{
        label: '序号',
        type: 'index',
        width: '60',
        order:true
      }, {
        label: '账号',
        prop: "username"
      }, {
        label: '姓名',
        prop: "name"
      },
      {
        label: '年龄',
        prop: "age"
      },
      {
        label: '电话',
        prop: "mobile"
        },
        {
          label: '薪酬',
          prop: "salary"
        },
        {
          label: '入职时间',
          prop: "entryDate"
        },
      {
        label: '操作',
        type: 'slot',
        width: '180',
        slot_name:'action'
        }],
      formItem: [
        {
          type: 'input',
          placeholder: '账号',
          prop: 'username',
          rules: { required: true, message: '账号不能为空', trigger: 'blur' }
        },
        {
          type: 'input',
          placeholder: '姓名',
          prop: 'name',
          rules: { required: true, message: '姓名不能为空', trigger: 'blur' }
        },
        {
          type: 'slot',
          slot_name:'query'
        }
      ],
      dialogItem: [
        {
          type: 'input',
          prop: 'username',
          label: '账号',
          rules: {
            required: true, message: '账号不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          rules: {
            required: true, message: '姓名不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'age',
          label: '年龄'
        },
        {
          type: 'input',
          prop: 'mobile',
          label: '电话'
        },
        {
          type: 'input',
          prop: 'salary',
          label: '薪酬'
        },
        {
          type: 'date',
          prop: 'entryDate',
          label: '入职时间',
          placeholder:'选择入职时间'
        },
        {
          type: 'slot',
          slot_name: 'queryLog'
        }
      ]
    }
  },
  methods: {
    async getStaffList() {
      const { rows, total } = await staffList(this.pagenum, this.pagesize, this.staffQuery)
      this.staffList = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getStaffList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getStaffList()
    },
    handleQuery() {
      this.pagenum = 1
      this.getStaffList()
    },
    //重置
    handleReset(formName) {
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
          const res = await deleteStaff(id)
          this.$message.success('删除成功')
          this.getStaffList()
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
        this.dialogTitle = "员工编辑"
        this.handleFindStaff(id)
        return
      }
      this.dialogTitle = "员工新增"
      // this.handleReset('dialogForm')

    },
    // 弹窗提交事件
    handleSubmit(formName) {
      this.$refs[formName].handleSubmitForm()
      let result = this.$refs[formName].flag
      if (result) {
        this.dialogFormParams.id ? this.handleEditStaff() : this.handleAddStaff()
      }
    },
    //新增用户接口
    async handleAddStaff() {
      try {
        const res = await addStaff(this.dialogFormParams)
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('新增成功')
        this.getStaffList()
      } catch (error) {
        console.log(error.message);
      }
    },
    //查询单个会员接口
    async handleFindStaff(id) {
      try {
        const res = await findStaff(id)
        console.log(res, 'res');
        this.dialogFormParams = res
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑会员接口
    async handleEditStaff() {
      try {
        const res = await editStaff(this.dialogFormParams.id, this.dialogFormParams)
        console.log(res, 'res');
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.getStaffList()
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
    this.getStaffList()
  },
}
</script>

<style lang='scss' scoped>
    
</style>