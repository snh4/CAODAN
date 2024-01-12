<template>
  <div class="contain">
    
    <el-form :inline="true" :model="filter" class="demo-form-inline">
      <el-form-item label="审核人：">
        <el-input v-model="filter.auditor" placeholder="请输入审核人"></el-input>
      </el-form-item>
      <el-form-item label="审核时间：">
        <el-date-picker v-model="filter.auditTime" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="filter.state" placeholder="选择状态">
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="境内发货人：">
        <el-input v-model="filter.sender" placeholder="请输入境内发货人"></el-input>
      </el-form-item>
      <el-form-item label="境外收货人：">
        <el-input v-model="filter.receiver" placeholder="请输入境外收货人"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="button-group">
      <el-button @click="addNewItem" type="primary">新建</el-button>
      <!-- <el-button @click="editItem" type="success">编辑</el-button> -->
      <!--<el-button @click="deleteItem" type="danger">删除</el-button>-->
    </div>
    
    
    <el-table :data="pagedData" @row-click="handleRowClick" highlight-current-row>

      <!-- <el-table-column prop="ProcessingRecord" label="序号" sortable></el-table-column> -->
      <el-table-column label="序号">
        <template #default="{ $index }">
          <span>{{ $index + 1  }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="CompanyName" label="公司名称" sortable></el-table-column>

      <el-table-column prop="ManualReviewPersonnel" label="审核人" sortable></el-table-column>
      <!-- <el-table-column prop="number" label="预录入编号" sortable></el-table-column> -->

      
      
      <!-- <el-table-column prop="DragName" label="草单名称" sortable></el-table-column> -->
      <el-table-column prop="DomesticShipper" label="境内发货人" sortable></el-table-column>
      <el-table-column prop="OverseasConsignee" label="境外收货人" sortable></el-table-column>

      <el-table-column prop="DataEntryTime" label="数据录入时间" sortable></el-table-column>
      <el-table-column prop="ManualReviewTime" label="人工审核时间" sortable></el-table-column>
      <el-table-column prop="ReviewTime" label="机器复核时间" sortable></el-table-column>
      <el-table-column prop="ManualReviewStatus" label="审核状态" sortable></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row,$index }">
          <div>
            <el-button @click="editItem(row)" type="success">编辑</el-button>
            <el-button @click="deleteItem(row,$index)" type="danger">删除</el-button>
          </div>
          
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      ref="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="filteredData.length"
    ></el-pagination>
    
  </div>
</template>
<script>
import api from "./login/api.js";

export default {
  async created() {
  
    this.search();
   
  },
  // async activated(){
  //   // console.log(this.$route.meta.hasInitialized);
  //   if (this.load) {
  //     this.search();
  //   }

  //   // if (!this.$route.meta.hasInitialized) {
  //     console.log("activated search");
  //           // this.$route.meta.hasInitialized = true;
  //           // this.search();
  //       // }
  //   console.log("activated");
  // },
//   beforeRouteUpdate(to, from, next) {
//   const pageParam = to.query.page;
//   if (pageParam) {
//     // 如果存在页码参数，更新组件的 currentPage
//     this.currentPage = parseInt(pageParam);
//   }
//   // 继续路由更新
//   next();
// },
  beforeRouteEnter(to, from, next) {
 
    if (from && from.name === 'Detail') {
      next();
    } else {
      console.log("clear");
      next(vm => {
         // 在进入组件之前清空搜索条件缓存
      sessionStorage.removeItem('searchQuery');
      })
    }
  },

  data() {
    return {
      tableData: [
      ],
      hasInitialized: false,

      filteredData: [],
      selectedRow: null,
      filter: {
        auditor: '',
        auditTime: '',
        state: '',
        sender:'',
        receiver:'',
      },
      currentPage:1,
      pageSize:15,
    };
  },
  computed: {
    pagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredData.slice(start, end);
    },
  },
  methods: {
    
    addNewItem() {
      // 新建事件处理逻辑
      console.log('新建');
      // this.$router.push({ path: '/detail' })
      this.$router.push({ name: 'Detail', params: { mode: 'new' } });

    },
    editItem(row) {
    
      const selectedRowId = row.ProcessingRecord;
      // const selectedRowId = this.selectedRow.ProcessingRecord;
      console.log(selectedRowId);
      const detailApiUrl = `/api/detail/${selectedRowId}`;
      const queryParams = {
    auditor: this.filter.auditor,
    auditTime: this.filter.auditTime,
    state: this.filter.state,
    sender: this.filter.sender,
    receiver: this.filter.receiver,
  };
      // Navigate to the edit page and pass the ID as a parameter
      // this.$router.push({ name: 'Detail', params: { mode: 'edit', id: selectedRowId, page: this.currentPage } });
      sessionStorage.setItem('currentPage',this.currentPage);
      sessionStorage.setItem('searchQuery',JSON.stringify(queryParams));

      // this.$router.push({ name: 'Detail', params: { mode: 'edit', id: selectedRowId }, query: { page: this.currentPage } });

      this.$router.push({ name: 'Detail', params: { mode: 'edit', id: selectedRowId } });
    },
    async deleteItem(row,index) {
      // 删除事件处理逻辑
      const selectedRowId = row.ProcessingRecord;
      console.log(index)
      // 弹出确认对话框
      const userConfirmed = window.confirm(`确定要删除记录: ${index+1} 吗？`);

      if (userConfirmed) {
          try {
              const response = await api.delete(`/processlist/${selectedRowId}`);

              if (response.status === 200) {
                  console.log('记录删除成功');
                  // 删除成功后重新搜索，刷新记录列表
                  this.search();
              } else {
                  console.error('删除失败');
              }
          } catch (error) {
              console.error('发生错误', error);
          }
      } else {
          console.log('用户取消删除操作');
      }
    },

    handleRowClick(row) {
      this.selectedRow = row;
    },
    async search() {
      
      console.log("search");
      const token = sessionStorage.getItem('token');
      const savedSearchQuery = sessionStorage.getItem('searchQuery');
      console.log(savedSearchQuery);
  if (savedSearchQuery) {
    this.filter = JSON.parse(savedSearchQuery);
  }

      const queryParams = {
        manual_review_status: this.filter.state,
        manual_review_time: this.filter.auditTime,
        manual_review_personnel: this.filter.auditor,
        domestic_shipper: this.filter.sender,
        overseas_consignee: this.filter.receiver,
    };

      const response = await api.get('/processlist/', { params: queryParams });

      this.filteredData = response.data;
    // 处理响应
    this.currentPage = Number(sessionStorage.getItem('currentPage')) || 1;
    console.log(this.currentPage);
    this.$nextTick(() =>{
            this.$refs.pagination.internalCurrentPage = this.currentPage;
　　　 });
    console.log(response.data);
    sessionStorage.removeItem('searchQuery');

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    
  },
};
</script>
<style>
.contain {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-group {
  margin-bottom: 20px;
}
</style>
