<template>
  <div>
    <!-- <el-form ref="goodsForm" :inline="true" :model="goodsQuery" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="goodsQuery.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="goodsQuery.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input v-model="goodsQuery.supplierName" placeholder="选择供应商" @focus="handelChoose(0)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('goodsForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <base-form :formItem="formItem" ref="goodsForm" v-model.sync="goodsQuery" @handleFocus="handelChoose(0)">
      <template v-slot:query>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary" @click="handelOpenDialog">新增</el-button>
        <el-button @click="handleReset('goodsForm')">重置</el-button>
      </template>
    </base-form>
    <base-table @size="handleSizeChange" @num="handleCurrentChange" :List="goodsList" :columns="columns"
      :pagenum="pagenum" :pagesize="pagesize" :total="total">
      <template v-slot:action="scope">
        <el-button size="mini" @click="handelOpenDialog(scope.row.id)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </base-table>
    <!-- <el-table class="mt-2" :data="goodsList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" label="商品名称">
      </el-table-column>
      <el-table-column prop="code" label="商品编码">
      </el-table-column>
      <el-table-column prop="spec" label="商品规格">
      </el-table-column>
      <el-table-column prop="retailPrice" label="零售价">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价">
      </el-table-column>
      <el-table-column prop="storageNum" label="库存数量">
      </el-table-column>
      <el-table-column prop="supplierName" label="供应商">
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
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="dialogFormParams.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="dialogFormParams.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="dialogFormParams.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="dialogFormParams.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="dialogFormParams.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="dialogFormParams.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="dialogFormParams.supplierName" placeholder="选择供应商" @focus="handelChoose(1)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog> -->

    <base-dialog :title="dialogTitle" ref="dialogForm" :visible.sync="dialogFormVisible" :dialogItem="dialogItem"
      v-model.sync="dialogFormParams" @handleFocus="handelChoose(1)">
      <template v-slot:queryLog>
        <el-button @click="handleCancel('dialogForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('dialogForm')">确 定</el-button>
      </template>
    </base-dialog>

    <!-- 供应商选择弹框 -->
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="30%">
      <el-form :inline="true" :model="supplierForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="supplierForm.name" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" height="250" border style="width: 100%" @row-click="handleClick">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="供应商名称">
        </el-table-column>
        <el-table-column prop="linkman" label="联系人">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="num"
        :page-sizes="[10, 20, 30, 50]" :page-size="size" layout=" prev, pager, next" :total="tot">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, deleteGoods, addGoods, findGoods, editGoods } from '@/api/goods'
import { supplierList } from '@/api/supplier'
import BaseTable from '@/components/BaseTable.vue'
export default {
  components: {
    BaseTable,
    BaseForm: () => import('../components/BaseForm.vue'),
    BaseDialog: () => import('../components/BaseDialog.vue')
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      goodsQuery: {
        code: "",
        name: "",
        supplierName: "",
      },
      goodsList: [],
      dialogTitle: "供应商新增",
      dialogFormVisible: false,
      dialogRules: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' },
        ],
        linkman: [
          { required: true, message: '商品编码不能为空', trigger: 'blur' },
        ],
        retailPrice: [
          { required: true, message: '零售价不能为空', trigger: 'blur' },
        ]
      },
      dialogFormParams: {
        code: "",
        name: "",
        supplierName: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: ""
      },
      dialogSupplierVisible: false,
      supplierForm: {
        name: ""
      },
      tableData: [],
      num: 1,
      size: 10,
      tot: 0,
      number: '',
      columns: [{
        label: '序号',
        type: 'index',
        width: '60',
        order: true
      }, {
        label: '商品名称',
        prop: "name",
      }, {
        label: '商品编码',
        prop: "code"
      },
      {
        label: '商品规格',
        prop: "spec"
      },
      {
        label: '零售价',
        prop: "retailPrice"
      },
      {
        label: '进货价',
        prop: "purchasePrice"
      },
      {
        label: '库存数量',
        prop: "storageNum"
      },
      {
        label: '供应商',
        prop: "supplierName",
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
          placeholder: '商品名称',
        },
        {
          type: 'input',
          prop: 'code',
          placeholder: '商品编号',
        },
        {
          type: 'dialog',
          prop: 'supplierName',
          placeholder: '选择供应商',
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
          label: '商品名称',
          rules: {
            required: true, message: '商品名称不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'code',
          label: '商品编码',
          rules: {
            required: true, message: '商品编码不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'spec',
          label: '商品规格'
        },
        {
          type: 'input',
          prop: 'retailPrice',
          label: '零售价',
          rules: {
            required: true, message: '零售价不能为空', trigger: 'blur'
          }
        },
        {
          type: 'input',
          prop: 'purchasePrice',
          label: '进货价'
        },
        {
          type: 'input',
          prop: 'storageNum',
          label: '库存数量'
        },
        {
          // type: 'input',
          prop: 'supplierName',
          label: '供应商',
          attr:'dialog'
        },
        {
          type: 'slot',
          slot_name: 'queryLog'
        }
      ]
    }
  },
  methods: {
    async getGoodsList() {
      const { rows, total } = await goodsList(this.pagenum, this.pagesize, this.goodsQuery)
      this.goodsList = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getGoodsList()
    },
    handleQuery() {
      this.pagenum = 1
      this.getGoodsList()
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
          const res = await deleteGoods(id)
          this.$message.success('删除成功')
          this.getGoodsList()
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
        this.dialogTitle = "商品编辑"
        this.handleFindGoods(id)
        return
      }
      this.dialogTitle = "商品新增"
      // this.handleReset('dialogForm')

    },
    // 弹窗提交事件
    handleSubmit(formName) {
      this.$refs[formName].handleSubmitForm()
      let result = this.$refs[formName].flag
      console.log(this.$refs[formName], 'result');
      console.log(this.dialogFormParams.id);
      if (result) {
        this.dialogFormParams.id ? this.handleEditGoods() : this.handleAddGoods()
        this.$refs[formName].flag=false
      }
    },
    //新增用户接口
    async handleAddGoods() {
      try {
        const res = await addGoods(this.dialogFormParams)
        this.dialogFormVisible = false
        this.$message.success('新增成功')
        this.handleReset('dialogForm')
        
        this.getGoodsList()
      } catch (error) {
        console.log(error.message);
      }
    },
    //查询单个会员接口
    async handleFindGoods(id) {
      try {
        const res = await findGoods(id)
        console.log(res, 'res');
        this.dialogFormParams = res
      } catch (e) {
        console.log(e.message);
      }
    },
    //编辑会员接口
    async handleEditGoods() {
      try {
        const res = await editGoods(this.dialogFormParams.id, this.dialogFormParams)
        console.log(res, 'res');
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.dialogFormParams.id = ''
        this.handleReset('dialogForm')
        this.getGoodsList()
      } catch (e) {
        console.log(e.message);
      }
    },
    //弹框取消事件
    handleCancel(formName) {
      this.handleReset(formName)
      this.dialogFormVisible = false
    },
    handelChoose(num) {
      this.dialogSupplierVisible = true
      this.number = num
      this.getSupplierList()
    },
    async getSupplierList() {
      const { rows, total } = await supplierList(this.num, this.size, this.supplierQuery)
      this.tableData = rows
      this.tot = total
    },
    handleSizeChange1(val) {
      this.size = val
      this.getSupplierList()
    },
    handleCurrentChange1(val) {
      this.num = val
      this.getSupplierList()
    },
    handleClick(row, column, event) {
      console.log(row, column, event)
      if (this.number == 0) {
        this.goodsQuery.supplierName = row.name
      } else if (this.number == 1) {
        this.dialogFormParams.supplierName = row.name
      }
      this.dialogSupplierVisible = false
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style lang='scss' scoped>

</style>