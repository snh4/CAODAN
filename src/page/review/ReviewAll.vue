<!-- <template>
  <div>
    <p>人工审核-全部</p>
  </div>
</template> -->
<template>
  <div>
    <div style="margin-top:30px;margin-bottom: 15px">
      <el-button type="primary" style="margin-left: 10px">全部</el-button>
      <el-button type="infor" style="margin-left: 10px">已审核</el-button>
      <el-button type="infor" style="margin-left: 10px">待审核</el-button>
    </div>
    <div style="margin-bottom: 15px">
      <el-input v-model="input" style="width: 200px" placeholder="请输入内容"></el-input>
      <el-button type="warning" style="margin-left: 10px">查询</el-button>
      <el-button type="infor" style="margin-left: 10px">重置</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="序号"></el-table-column>
        <el-table-column prop="preentry" label="预录入编号"></el-table-column>
        <el-table-column prop="identification" label="标识"></el-table-column>
        <el-table-column prop="auditor" label="审核人"></el-table-column>
        <el-table-column prop="time" label="审核时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column style="width:1000px;display: flex; align-items: center;" label="操作">
          <!-- <el-button style="margin-right: 10px;" type="primary">编辑</el-button>
          <el-button style="margin-right: 10px;" type="danger">删除</el-button>
          <el-button style="margin-right: 10px;" type="warning">导出</el-button> -->
          <template v-slot="scope">
              <el-button-group>
                <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="warning" @click="handleExport(scope.row)">导出</el-button>
              </el-button-group>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 50px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next"
          :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      tableData: [{
        number: '001',
        preentry: '123456789',
        identification: '标识',
        auditor: '张三',
        time: '2016-05-02',
        status: '已审核'
      }, {
        number: '001',
        preentry: '123456789',
        identification: '标识',
        auditor: '张三',
        time: '2016-05-02',
        status: '已审核'
      },
      {
        number: '001',
        preentry: '123456789',
        identification: '标识',
        auditor: '张三',
        time: '2016-05-02',
        status: '已审核'
      },
      {
        number: '001',
        preentry: '123456789',
        identification: '标识',
        auditor: '张三',
        time: '2016-05-02',
        status: '已审核'
      },]
    }
  },
  methods: {
    handleEdit(row) {
    // 点击编辑按钮跳转到编辑页面，传入对应的参数
    //   this.$router.push({ path: '/preview', query: { id: row.id } })
        this.$router.push({ path: '/preview' })
    },
    handleDelete(row) {
      // 点击删除按钮执行删除操作
      // 你可以在这里执行删除数据的逻辑
    },
    handleExport(row) {
      // 点击导出按钮执行导出操作
      // 你可以在这里执行导出数据的逻辑
    }
  }
};
</script>

