<template>
  <div>
    <el-form :inline="true" :model="goodsQuery" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="goodsQuery.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="goodsQuery.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="goodsQuery.supplierName" placeholder="选择供应商" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table class="mt-2" :data="goodsList" height="380" border style="width: 100%">
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
  import { goodsList } from '@/api/goods'
export default {
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
      goodsList: []
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
    }
  },
  created() {
    this.getGoodsList()
  },
}
</script>

<style lang='scss' scoped>

</style>