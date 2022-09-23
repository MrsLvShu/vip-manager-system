<template>
  <div>
      <el-form :inline="true" :model="MemberQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="MemberQuery.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="MemberQuery.name" placeholder="会员名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="MemberQuery.payType" placeholder="支付类型">
            <el-option v-for="(item,index) in mpayType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker value-format="yyyy-MM-dd" v-model="MemberQuery.birthday" type="date" placeholder="出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="primary">新增</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>

      <el-table class="mt-2" :data="MemberList" height="380" border style="width: 100%">
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
import { memberList } from '@/api/member';
  import MemberPayTpye from '../Enum/member'
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      total:0,
      MemberQuery: {
        birthday: "",
        cardNum: "",
        name: "",
        payType: ""
      },
      MemberList: [],
      mpayType:MemberPayTpye
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
    async getMemberList() {
      const {rows,total} = await memberList(this.pagenum, this.pagesize, this.MemberQuery)
      
      this.MemberList = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getMemberList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getMemberList()
    },
    handleQuery() {
      this.pagenum = 1
      this.getMemberList()
    }
  },
  created() {
    this.getMemberList()
  },
}
</script>

<style lang='scss' scoped>

</style>