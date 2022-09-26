<template>
  <div>
    <el-form ref="goodsForm" :inline="true" :model="goodsQuery" class="demo-form-inline">
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
    </el-form>
    
    <base-table @size="handleSizeChange" @hanclick="buttonClick" @num="handleCurrentChange" :List="goodsList" :columns="columns" :pagenum="pagenum" :pagesize="pagesize" :total="total"></base-table>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
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
    </el-dialog>
    <!-- 供应商选择弹框 -->
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="30%">
      <el-form :inline="true" :model="supplierForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="supplierForm.name" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
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
    BaseTable
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
        storageNum:""
      },
      dialogSupplierVisible: false,
      supplierForm: {
        name:""
      },
      tableData: [],
      num: 1,
      size: 10,
      tot: 0,
      number: '',
      columns: [{
        label: '序号',
        type: 'index',
        width: '60'
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
        type: 'action',
        width: '180',
        actions: [{
          text: "编辑",
        },
        {
          text: "删除",
          type: 'danger'
        }]
      }]
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
      this.$refs[formName].resetFields();
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
    handleSubmit() {
      this.$refs['dialogForm'].validate((valid) => {
        if (!valid) return
        this.dialogFormParams.id ? this.handleEditGoods() : this.handleAddGoods()
      })
    },
    //新增用户接口
    async handleAddGoods() {
      try {
        const res = await addGoods(this.dialogFormParams)
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('新增成功')
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
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.getGoodsList()
      } catch (e) {
        console.log(e.message);
      }
    },
    //弹框取消事件
    handleCancel() {
      this.handleReset('dialogForm')
      this.dialogFormVisible = false
    },
    handelChoose(num) {
      this.dialogSupplierVisible = true
      this.number =num
      this.getSupplierList()
    },
    async getSupplierList() {
      const { rows, total } = await supplierList(this.num, this.size, this.supplierQuery)
      this.tableData = rows
      this.tot=total
    },
    handleSizeChange1(val) {
      this.size = val
      this.getSupplierList()
    },
    handleCurrentChange1(val) {
      this.num = val
      this.getSupplierList()
    },
    handleClick(row, column,event) {
      console.log(row, column, event);
      if (this.number == 0) {
        this.goodsQuery.supplierName = row.name
      } else if (this.number == 1) {
        this.dialogFormParams.supplierName=row.name
      }
      this.dialogSupplierVisible = false
    },
    buttonClick(val) {
      if (val.title == '编辑') {
        this.handelOpenDialog(val.event.id)
      } else {
        this.handleDelete(val.event.id)
      }
    }
  },
  created() {
    this.getGoodsList()
  },
}
</script>

<style lang='scss' scoped>

</style>