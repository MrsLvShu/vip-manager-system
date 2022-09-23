<template>
  <div>
    <el-form :inline="true" :model="supplierQuery" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="supplierQuery.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="supplierQuery.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="supplierQuery.mobile" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table class="mt-2" :data="supplierList" height="380" border style="width: 100%">
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
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[10, 20, 30, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { supplierList } from '@/api/supplier'
export default {
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
      supplierList:[]
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
    }
  },
  created() {
    this.getSupplierList()
  },
}
</script>

<style lang='scss' scoped>

</style>