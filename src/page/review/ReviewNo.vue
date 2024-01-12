<!-- <template>
    <div>
      <p>人工审核-未审核</p>
    </div>
  </template>
   -->
   <template>
    <div>
      <div style="margin-top:30px;margin-bottom: 15px">
        <el-button type="infor" style="margin-left: 10px">全部</el-button>
        <el-button type="infor" style="margin-left: 10px">已审核</el-button>
        <el-button type="primary" style="margin-left: 10px">待审核</el-button>
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
          <el-table-column style="width:300rpx;" label="操作">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
            <el-button type="warning">导出</el-button>
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
    }
  }
  </script>
  