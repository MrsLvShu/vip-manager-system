<template>
  <div>
    <!-- <el-form ref="memberForm" :inline="true" :model="MemberQuery" class="demo-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="MemberQuery.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="MemberQuery.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="MemberQuery.payType" placeholder="支付类型">
          <el-option v-for="(item,index) in mpayType" :key="index" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="MemberQuery.birthday" type="date" placeholder="出生日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('memberForm')">重置</el-button>
      </el-form-item>
    </el-form> -->

    <base-form :formItem="formItem" ref="memberForm" v-model.sync="MemberQuery">
      <template v-slot:query>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('memberForm')">重置</el-button>
      </template>
    </base-form>
    <!-- 表格 -->
    <base-table @size="handleSizeChange" @num="handleCurrentChange" :List="MemberList" :columns="columns" :pagenum="pagenum" :pagesize="pagesize" :total="total">
      <template v-slot:action="scope">
        <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
  </base-table>
    <!-- <el-table class="mt-2" :data="MemberList" height="380" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="cardNum" label="会员卡号" width="160">
        </el-table-column>
        <el-table-column prop="name" label="会员姓名">
        </el-table-column>
        <el-table-column prop="birthday" label="会员生日">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码">
        </el-table-column>
        <el-table-column prop="integral" label="可用积分">
        </el-table-column>
        <el-table-column prop="money" label="开卡金额">
        </el-table-column>
        <el-table-column prop="payType" label="支付类型">
          <template slot-scope="scope">
            {{scope.row.payType |payType}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="会员地址" width="200">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table> -->
    <!-- 分页 -->
    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[10, 20, 30, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
    <!-- 弹出框 -->
    <!-- <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="dialogFormParams" ref="dialogForm" :rules="dialogRules" label-width="80px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="dialogFormParams.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="dialogFormParams.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="dialogFormParams.birthday" type="date" placeholder="会员生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="dialogFormParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="dialogFormParams.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="dialogFormParams.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogFormParams.payType" placeholder="支付类型">
            <el-option v-for="(item,index) in mpayType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="dialogFormParams.address"></el-input>
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
import { memberList, deleteMember, addMember, findMember, editMember } from '@/api/member';
import MemberPayTpye from '../Enum/member'
import BaseTable from '@/components/BaseTable.vue'
let payType = {
  "1": "现金",
  "2": "微信",
  "3": "支付宝",
  "4":"银行卡"
}
export default {
  components: {
    BaseTable,
    BaseDialog: () => import('../components/BaseDialog.vue'),
    BaseForm:()=>import("../components/BaseForm.vue")
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      MemberQuery: {
        birthday: "",
        cardNum: "",
        name: "",
        payType: ""
      },
      MemberList: [],
      mpayType: MemberPayTpye,
      dialogTitle: "会员新增",
      dialogFormVisible: false,
      dialogRules: {
        cardNum: [
          { required: true, message: '卡号不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        payType: [
          { required: true, message: '支付类型不能为空', trigger: 'change' }
        ],
      },
      dialogFormParams: {
        address: "",
        birthday: "",
        cardNum: "",
        integral: "",
        money: "",
        name: "",
        payType: "",
        phone: "",
      },
      columns: [{
        label: '序号',
        type: 'index',
        width: '60',
        order:true
      }, {
        label: '会员卡号',
        prop: "cardNum",
        width:'160',
      }, {
        label: '会员姓名',
        prop: "name"
      },
      {
        label: '会员生日',
        prop: "birthday"
      },
      {
        label: '手机号码',
        prop: "phone"
      },
      {
        label: '可用积分',
        prop: "integral"
      },
      {
        label: '开卡金额',
        prop: "money"
      },
      {
        label: '支付类型',
        prop: "payType",
        formatter: (cellValue) => {
          console.log(cellValue.payType);
          return payType[cellValue.payType]
        }
      },
      {
        label: '会员地址',
        prop: "address",
        width:'200'
      }, {
        label: '操作',
        type: 'slot',
        width: '180',
        slot_name:'action'
      }],
      dialogItem: [
        {
          type: 'input',
          prop: 'cardNum',
          label: '会员卡号',
          rules: {
            required: true, message: '会员卡号不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'name',
          label: '会员姓名',
          rules: {
            required: true, message: '会员姓名不能为空', trigger: 'blur'
          }
        },
        {
          type: 'date',
          prop: 'birthday',
          label: '会员生日'
        },
        {
          type: 'input',
          prop: 'phone',
          label: '手机号码'
        },
        {
          type: 'input',
          prop: 'money',
          label: '开卡金额'
        },
        {
          type: 'input',
          prop: 'integral',
          label: '可用积分'
        },
        {
          type: 'select',
          prop: 'payType',
          label: '支付类型',
          rules: {
            required: true, message: '支付类型不能为空', trigger: 'blur'
          },
          children: [
            {
              type: "1",
              name: "现金"
            },
            {
              type: "2",
              name: "微信"
            },
            {
              type: "3",
              name: "支付宝"
            },
            {
              type: "4",
              name: "银行卡"
            }
          ]
        },
        {
          type: 'textarea',
          prop: 'address',
          label: '会员地址'
        },
        {
          type: 'slot',
          slot_name: 'queryLog'
        }
      ],
      formItem: [
        {
          type: 'input',
          prop: 'cardNum',
          placeholder: '会员卡号',
        },
        {
          type: 'input',
          prop: 'name',
          placeholder: '会员名字',

        },
        {
          type: 'select',
          prop: 'payType',
          placeholder: '支付类型',
          children: [
            {
              type: "1",
              name: "现金"
            },
            {
              type: "2",
              name: "微信"
            },
            {
              type: "3",
              name: "支付宝"
            },
            {
              type: "4",
              name: "银行卡"
            }
          ]
        },
        {
          type: 'date',
          prop: 'birthday',
          placeholder: '会员生日'
        },
        {
          type: 'slot',
          slot_name: 'query'
        }
      ],
    }
  },
  filters: {
    payType(val) {
      console.log(val);
      const type = MemberPayTpye.find(item => item.type == val)
      console.log(type);
      return type.name
    }
  },
  methods: {
    //获取会员列表
    async getMemberList() {
      const { rows, total } = await memberList(this.pagenum, this.pagesize, this.MemberQuery)

      this.MemberList = rows
      this.total = total
    },
    //分页每页条数改变
    handleSizeChange(val) {
      this.pagesize = val
      this.getMemberList()
    },
    //分页每个页码改变
    handleCurrentChange(val) {
      this.pagenum = val
      this.getMemberList()
    },
    //查询
    handleQuery() {
      this.pagenum = 1
      this.getMemberList()
    },
    //重置
    handleReset(formName) {
      console.log(formName, 'formname');
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
          const res = await deleteMember(id)
          this.$message.success('删除成功')
          this.getMemberList()
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
        this.dialogTitle = "会员编辑"
        this.handleFindMember(id)
      } else {
        this.dialogTitle = "会员新增"
        this.handleReset('dialogForm')
      }
    },
    // 弹窗提交事件
    handleSubmit() {
      this.$refs[formName].handleSubmitForm()
      let result = this.$refs[formName].flag
      console.log(this.$refs[formName], 'result');
      if (result) {
        this.dialogFormParams.id ? this.handleEditSupplier() : this.handleAddSupplier()
      }
    },
    //新增用户接口
    async handleAddMember() {
      try {
        const res = await addMember(this.dialogFormParams)
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('新增成功')
        this.getMemberList()
      } catch (error) {
        console.log(error.message);
      }
    },
    //查询单个会员接口
    async handleFindMember(id) {
      try {
        const res = await findMember(id)
        console.log(res, 'res');
        this.dialogFormParams = res
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑会员接口
    async handleEditMember() {
      try {
        const res = await editMember(this.dialogFormParams.id, this.dialogFormParams)
        console.log(res, 'res');
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.getMemberList()
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
    this.getMemberList()
  },
}
</script>

<style lang='scss' scoped>

</style>