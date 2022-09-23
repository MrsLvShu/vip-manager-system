<template>
  <div>
    <el-form :inline="true" :model="staffQuery" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="staffQuery.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="staffQuery.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table class="mt-2" :data="staffList" height="380" border style="width: 100%">
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
  import { staffList } from '@/api/staff';
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      staffQuery: {
        name: "",
        username: ""
      },
      staffList: []
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
    }
  },
  created() {
    this.getStaffList()
  },
}
</script>

<style lang='scss' scoped>
    
</style>