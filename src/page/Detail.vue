

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/docx/lib/index.css'
import api from "./login/api.js";
import { ref, shallowRef } from 'vue'
import { colProps } from 'element-plus'
import { ElLoading,ElMessage,ElButton } from 'element-plus'

export default {
  components: { Splitpanes, Pane, VueOfficePdf,VueOfficeDocx,VueOfficeExcel},
  data() {
    return {
      src:null,
      selectedRow:null,
      src: '',
      pdfWidth: 'auto',
      pdfHeight: 'auto',
      uploadedFiles: [], // 用于存储上传的文件
      selectedComponent: null,
      selectedFileIndex: null,
      realID:null,
      initialFormData:null,
      dlProgress:0,
      uploadProgress:0,
      dialogVisible: false,
      loadingText: '上传中...',
      loadingSpinner: 'el-icon-loading',
      loadingBackground: 'rgba(0, 0, 0, 0.7)',
      mode: '',
      isLoading:false,
      loading:false,
      tableData: [
        {
      view_id: 1,
      specification_model: null,
      first_legal_quantity_unit: null,
      first_legal_quantity: null,
      second_legal_quantity_unit: null,
      second_legal_quantity: null,
      unit_price: null,
      total_Price: null,
      currency_code:null,
      origin: null,
      destination_country: null,
      TaxExemption: null,
      bgd_id: 1,
      item_number: 1,
      product_code: 1234,
      product_name: null,
      transaction_quantity: null,
      total_price: null,
      DomesticSourceOfGoods: null
        }
      ],

      form: {
  CustomDeclarationId: 1,
  ContractFormID: "1",
  ContractTableID: 1,
  InvoiceId: 1,
  PackingListID: 1,
  ProcessingRecord: 1,
  PurchaseOrderId: 1,
  declareDate:"2023-12-16",
  exUnloadingPortDate: "2023-12-16",
  recordNo:null,
  ArrivalCountry: "USA",
  AttachedDocumentsAndNumbers: null,
  BillOfLading: null,
  ContractNumber: "123",
  CountryOfDeparture: "CHN",
  DeparturePort: "青岛",
  DestinationPort: "qd",
  DomesticShipper: "11",
  DomesticSourceLocation: "test",//在view里
  Freight: null,
  GrossWeight: "300.00000",
  LicenseNumber: null,
  LoadingPort:null,
  Manufacturer: null,
  MarkingCodeAndRemarks: "M/N",
  MiscellaneousCharges: null,
  NatureOfTaxExemption: "一般征税",
  NetWeight: "20.00000",
  NumberOfPackages: 1,
  PackagingType:"test",
  Premium: null,
  TransportationMethod: "水路运输",
  RegistrationNumber: null,
  SupervisionMethod: "一般贸易",
  TotalPrice: "100.00000",//view中
  TransactionMethod: "FOB",
  TransitPort_DestinationPort: "test",//没必要有
  UnloadingPort: "test",//报关单没有
  VesselVoyage: "test",
  OverseasConsignee:'test'
      },
    }
  },
  created(){
    this.mode = this.$route.params.mode;
    // this.id = this.$route.params.id;
    if (this.mode === 'edit') {
      // 根据 ID 获取编辑项的数据 
      // this.fetchDataForEdit(this.id);
    this.fetchData();
    this.fetchFiles();
    }
  },
  methods: {
    async fetchFiles() {
      const recordId = this.$route.params.id;
      const response = await api.get(`/getfile/${recordId}`);
      const filesData = response.data;

          // 遍历文件信息，将其添加到 uploadedFiles 数组中
          for (const name in filesData) {
            if (Object.hasOwnProperty.call(filesData, name)) {
              // 假设 data 是从后端获取的经过 Base64 编码的字符串
              var binaryString = window.atob(filesData[name]);
              var length = binaryString.length;
              var bytes = new Uint8Array(length);

              for (var i = 0; i < length; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
              }
              console.log(bytes.buffer);
              // 现在 byteArray 包含了原始的字节数据，可以用于进一步处理
              this.uploadedFiles.push({
                name: name,
                src: bytes.buffer,  // 这里可能需要处理 Base64 解码
                type: 'pdf',  // 根据实际情况调整
              });
            }
          }
      // const filesData = response.data;

      // // 遍历文件信息，将其添加到 uploadedFiles 数组中
      // for (const name in filesData) {
      //   if (Object.hasOwnProperty.call(filesData, name)) {
      //   this.uploadedFiles.push({
      //     name: name,
      //     src: filesData[name],  // 这里可能需要处理 Base64 解码
      //     type: 'file',  // 根据实际情况调整
      //   },
      // };
      // console.log('123');
      // const ID = 2001; // 替换为你的实际 ID

      // api({
      //   method: 'get',
      //   url: `http://localhost:8000/getfile/${ID}`,  // 替换为你的实际后端 API 地址
      // })
      //   .then(response => {
      //     // 解析 JSON 数据
      //     const filesData = response.data;

      //     // 遍历文件信息，将其添加到 uploadedFiles 数组中
      //     for (const name in filesData) {
      //       if (Object.hasOwnProperty.call(filesData, name)) {
      //         this.uploadedFiles.push({
      //           name: name,
      //           src: filesData[name],  // 这里可能需要处理 Base64 解码
      //           type: 'file',  // 根据实际情况调整
      //         });
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     console.error('获取文件信息时发生错误:', error);
      //   });
    },
    async fetchData(){
      const recordId = this.$route.params.id;
      const response = await api.get(`/detail/${recordId}`);
      // this.detailData = response.data;
      console.log(response.data);
      this.form = response.data.bgd;
      this.tableData = response.data.view.map((item) => ({ ...item }));
      this.initialFormData = { bgd: {...response.data.bgd}, view: [...response.data.view] };

    },
    // 拖拽上传
    handleDrop(event) {
        event.preventDefault();
        let dt = event.dataTransfer;
        let files = dt.files;
        // this.uploadFiles(files);

        for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();
        const fileType = this.getFileType(file.name);
        fileReader.onload = () => {
          // 将上传的文件记录到列表中
          this.uploadedFiles.push({
            name: file.name,
            src: fileReader.result,
            type:fileType
          });
        };

        fileReader.readAsArrayBuffer(file);
      }
    },

    async changeHandle(event) {
      const files = event.target.files;
      const formData = new FormData();
      this.uploadedFiles = [];//每次选择新文件则置空
      // 清空input元素的值
      // event.target.files = null;

      // 遍历文件列表
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();
        const fileType = this.getFileType(file.name);
        fileReader.onload = () => {
          // 将上传的文件记录到列表中
          this.uploadedFiles.push({
            name: file.name,
            src: fileReader.result,
            type:fileType
          });
          // formData.append(`files[${i}]`, fileReader.result);
          // console.log(formData.getAll('files'));
          // this.uploadFileToApi(fileReader.result, fileType);
        };
        formData.append('files', file);

        fileReader.readAsArrayBuffer(file);

      }
      

    },
    async uploadFiles(event) {
      const filesInput = this.$refs.fileInput;
      const files = filesInput.files;
      const formData = new FormData();
      
      if (files.length === 0) {
        // 没有选择文件时的处理，可以根据实际需求添加逻辑
        console.warn('请先选择文件');
        return;
      }
      // 遍历文件列表
      for (let i = 0; i < files.length; i++) {
              const file = files[i];
              formData.append('files', file);
      }
            try {
              this.dialogVisible = true;
              // const instance = this.$loading({
              //   target: '.el-dialog'
              // });
              const response = await api.post('upload/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // 使用 multipart/form-data 类型
              },
            });
            // instance.close();
              console.log('Files uploaded successfully:', response);
              this.isLoading = false;
              this.dialogVisible = false;
              this.realID = response.data.realID;
              console.log(this.realID);
              this.form = response.data.bgd;
            this.tableData = response.data.view.map((item) => ({ ...item }));

            var unuse = ["exUnloadingPortDate","declareDate","recordNo","LicenseNumber","Freight","Premium","RegistrationNumber",
            ,"AttachedDocumentsAndNumbers","TotalPrice","DomesticSourceLocation","TransitPort_DestinationPort","MiscellaneousCharges"];
            // 为空的且不为不需要的边框标红
            for (const key in this.form) {
              if (key) {
        if ((this.form[key]==null || this.form[key]=='')&& !unuse.includes(key)) {
          console.log(key,"modified");
          const inputElement = document.querySelector(`.${key}`);
          if (inputElement) {
            console.log("changeColor");
            // inputElement.style.backgroundColor = 'red';
            const innerElement = inputElement.querySelector('.el-input__wrapper');
            if(innerElement){
              innerElement.style.backgroundColor = 'rgba(255,0,0,0.3)';
            }else{
              console.error("没有找到内部控件");
            }
          } else {
            
            console.log('没有找到此控件:',key);
          }

        }
      }
    }
     // 处理 view 数据
     console.log("处理view");
  for (let i = 0; i < this.tableData.length; i++) {
    const initialView = this.tableData[i];
    console.log(initialView);
    
    for (const key in initialView) {
      if (key) {
        if (initialView[key] == null || initialView[key]=='') {
          console.log(key,"为空");
          this.$nextTick(() => {
          const inputElement = document.querySelector(`.${key}-${initialView["view_id"]}`);
          console.log(inputElement);
          if (inputElement) {
            console.log("changeColor");
            // inputElement.style.backgroundColor = 'red';
            const innerElement = inputElement.querySelector('.el-input__wrapper');
            if(innerElement){
              innerElement.style.backgroundColor = 'rgba(255,0,0,0.3)';
            }else{
              console.error("没有找到内部控件");
            }
          } else {
            console.error('没有找到此控件');
          }
        });
        }
      }
    }
  }
            } catch (error) {
              console.error('Error uploading files:', error);
            }finally {
        this.loading = false; // 无论成功或失败，都将加载状态设置为false
      }
    },


    async selectFiles() {
        this.$refs.fileInput.click();

      },

    selectFile(file,index) {
      this.selectedFileIndex = index;

      // 当点击列表中的文件时，更新预览的文件
      this.src = file.src;
      // 根据文件类型选择相应的组件

      // if (file.type === 'pdf') {
      //   this.selectedComponent = shallowRef(VueOfficePdf) ;
      // } else if (file.type === 'docx' || file.type === 'doc') {
      //   this.selectedComponent = shallowRef(VueOfficeDocx);
      // } else if (file.type === 'xlsx' || file.type === 'xls') {
      //   this.selectedComponent = shallowRef(VueOfficeExcel);
      // } else {
      //   this.selectedComponent = null;
      //}

      this.selectedComponent =file.type === 'pdf' ? shallowRef(VueOfficePdf) : 
                              file.type === 'docx'? shallowRef(VueOfficeDocx) :
                              file.type === 'xlsx'? shallowRef(VueOfficeExcel) : null;
    },

    handleResize(width, height) {
      // 在 resize 事件中更新 pdf 的大小
      this.pdfWidth = width + 'px';
      this.pdfHeight = height + 'px';
    },

    getFileType(fileName) {
      // 简单的根据文件名后缀判断文件类型的逻辑
      const extension = fileName.split('.').pop().toLowerCase();
      // return extension === 'pdf' ? 'pdf' : extension === 'docx' ? 'docx' : 'unknown';
      return extension === 'pdf' ? 'pdf' : 
             extension === 'docx' ? 'docx' : 
             extension === 'xlsx'? 'xlsx' : 'unknown';
    },
    async review(){
      this.dialogVisible = true;

      try {
      // 获取要发送的数据
      const dataToSend = {
        bgd: this.form,  // 从表格数据中获取
        view: this.tableData,      // 从表单数据中获取
      };
      console.log(this.tableData);
      var response = null;
      // 发送PUT请求到Django后端
      // const re_mode = this.$route.params.mode;
      if(this.mode == "new"){
        console.log("detail/new put");
        console.log(this.realID);
        response = await api.put(`/detail/${this.realID}`, dataToSend);

      }
      else{
        const recordId = this.$route.params.id;
        response = await api.put(`/detail/${recordId}`, dataToSend);

      }
      // 处理成功的响应
      console.log(response.data);
      // 可以在这里添加成功后的逻辑
      await this.sleep(500);
      this.dialogVisible = false;
    } catch (error) {
      // 处理错误
      console.error('Error submitting form:', error);
      // 可以在这里添加处理错误的逻辑
    }
    },
    sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
},

    // 添加新行
    addNewRow() {
      // 创建一条新的空数据行
      const newRow = {
        view_id:'',
        item_number: '',
        product_code: '',
        specification_model: '',
        first_legal_quantity_unit:'',
        first_legal_quantity:'',
        second_legal_quantity_unit:'',
        second_legal_quantity:'',
        unit_price:'',
        total_price:'',
        currency_code:'',
        origin:'',
        destination_country:'',
        DomesticSourceOfGoods:'',
        TaxExemption:''
        // 其他字段...
      };

          // 将新行添加到数据数组中
      this.tableData.push(newRow);

  // 提示用户可以编辑新行的数据
  ElMessage.success('请编辑新行的数据');

  // 遍历新行的字段，为每个字段添加监听事件
  Object.keys(newRow).forEach(field => {
    this.$nextTick(() => this.bindInputListener(field, this.tableData.length - 1));
  });
  },
  bindInputListener(field, index) {
  const className = `${field}-${index}`;
  console.log(className);
  const inputElement = document.querySelector(`.${className}`);
  if (inputElement) {
    console.log("find new");
    inputElement.addEventListener('input', () => {
      this.testAutoChangeColor(className);
    });
  }
  },

    deleteRow() {

      var id = this.selectedRow;

      // this.tableData = this.tableData.filter(item => item.selectedRow !== row.);

      // 提示用户可以编辑新行的数据
      ElMessage.success('请编辑新行的数据');
    },
//






// 比较数据，标记发生变化的字段
markModifiedFields(updatedData) {
  console.log("test");
  // console.log(updatedData.bgd);
  // console.log(this.initialFormData);

    for (const key in this.initialFormData.bgd) {
      //console.log(key);
      // 确保 key 不为空且是 updatedData.bgd 的自有属性
      if (key) {
        // console.log(this.initialFormData.bgd[key]+"--"+updatedData.bgd[key]);
        if (this.initialFormData.bgd[key] !== updatedData.bgd[key]) {
          // 确保属性存在，并且值发生变化，将其标记为已修改
          console.log("modified");
          const inputElement = document.querySelector(`.${key}`);
          if (inputElement) {
            console.log("changeColor");
            inputElement.style.backgroundColor = 'red';

            const innerInputElement = inputElement.querySelector('.el-input__inner');
              if (innerInputElement) {
                innerInputElement.style.color = 'red';
              }else{
                console.error('没有找到内部控件');
              }
          } else {
            console.error('没有找到此控件');
          }

        }
      }
    }
     // 处理 view 数据
  for (let i = 0; i < this.initialFormData.view.length; i++) {
    const initialView = this.initialFormData.view[i];
    const updatedView = updatedData.view[i];
    for (const key in initialView) {
      if (key) {
        if (initialView[key] !== updatedView[key]) {
          console.log("modified view");
          const inputElement = document.querySelector(`.${key}-${initialView["view_id"]}`);
          // const inputElement = document.querySelector(`.item_number`);
          if (inputElement) {
            console.log("changeColor");
            inputElement.style.backgroundColor = 'red';
            const innerInputElement = inputElement.querySelector('.el-input__inner');
              if (innerInputElement) {
                innerInputElement.style.color = 'red';
              }else{
                console.error('没有找到内部控件');
              }
          } else {
            console.error('没有找到此控件');
          }
        }
      }
    }
  }
  },
  async machineReview(){
      var response = null;
      // 发送PUT请求到Django后端
      // const re_mode = this.$route.params.mode;
      this.dialogVisible = true;

      if(this.mode == "new"){
        // console.log("detail/new put");
        // console.log(this.realID);
        response = await api.get(`/check/${this.realID}`);
      }
      else{
        const recordId = this.$route.params.id;
        response = await api.get(`/check/${recordId}`);

      }
      for (const key in response.data.bgd) {
      //console.log(key);
      // 确保 key 不为空且是 updatedData.bgd 的自有属性
      if (key) {
        // console.log(this.initialFormData.bgd[key]+"--"+updatedData.bgd[key]);
        if (this.form[key] !== response.data.bgd[key] || response.data.bgd[key]=='-1') {
          // 确保属性存在，并且值发生变化，将其标记为已修改
          console.log(response.data);
          console.log("modified");
          const inputElement = document.querySelector(`.${key}`);
          if (inputElement) {
            console.log("changeColor");
            inputElement.style.backgroundColor = 'blue';

            const innerInputElement = inputElement.querySelector('.el-input__inner');
              if (innerInputElement) {
                innerInputElement.style.color = 'yellow';
              }else{
                console.error('没有找到内部控件');
              }
              const innerElement = inputElement.querySelector('.el-input__wrapper');
            if(innerElement){
              innerElement.style.backgroundColor = 'blue';
            }else{
              console.error("没有找到内部控件");
            }
          } else {
            console.error('没有找到此控件');
          }
        }
      }
    }
        // 处理 view 数据
  for (let i = 0; i < response.data.view.length; i++) {
    const initialView = response.data.view[i];
    console.log(this.tableData);
    const updatedView = this.tableData[i];

    for (const key in initialView) {
      if (key) {
        if (initialView[key] !== updatedView[key]|| response.data.bgd[key]=='-1') {
          console.log("modified view");
          const inputElement = document.querySelector(`.${key}-${initialView["view_id"]}`);

          // const inputElement = document.querySelector(`.item_number`);
          if (inputElement) {
            console.log("changeColor");
            inputElement.style.backgroundColor = 'blue';

            const innerInputElement = inputElement.querySelector('.el-input__inner');
            if (innerInputElement) {
                innerInputElement.style.color = 'yellow';
              }else{
                console.error('没有找到内部控件');
              }
              const innerElement = inputElement.querySelector('.el-input__wrapper');
            if(innerElement){
              innerElement.style.backgroundColor = 'blue';
            }else{
              console.error("没有找到内部控件");
            }
          } else {
            console.error('没有找到此控件');
          }
        }
      }
    }
  }
  await this.sleep(500);

  this.dialogVisible = false;


  },
  testAutoChangeColor(className){
    console.log(className);
          const inputElement = document.querySelector(`.${className}`);
          if (inputElement) {
            console.log("changeColor");
            // inputElement.style.backgroundColor = 'red';

            const innerInputElement = inputElement.querySelector('.el-input__inner');
              if (innerInputElement) {
                innerInputElement.style.color = 'red';
              }else{
                console.error('没有找到内部控件');
              }
          } else {
            console.error('没有找到此控件');
          }
  },
  handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(() => {
          done(); // Close the dialog
        })
        .catch(() => {
          // catch error
        });
    },

    handleRowClick(row) {
      this.selectedRow = row;
    },
    async deleteItem(row,index) {
      // 删除事件处理逻辑
      const selectedRowId = row.ProcessingRecord;
      console.log(index)
      // 弹出确认对话框
      const userConfirmed = window.confirm(`确定要删除记录: ${index+1} 吗？`);

      if (userConfirmed) {
         this.tableData.splice(index,1);
        console.log(this.tableData);
      } else {
          console.log('用户取消删除操作');
      }
    },
    newclick(){
      this.filedata=api.get('getfile/292');
      console.log('文件');

    },
    returnToList(){
    //this.$router.push({ path: '/home' })
    this.$router.back();

  }


  }
  
}
</script>
<template>
    <el-dialog
    v-model="dialogVisible"
    title="正在处理中" 
    :visible.sync="dialogVisible"
    :closeOnClickModal="false"
    class="custom-dialog"
    :show-close="false"
>
<div class="center-container">
    <img class="center-image" src="../assets/loading.gif" alt="Example Image">
  </div>
    </el-dialog>
    <div class="button-container">
      <!-- 按钮排列 -->
      <el-button type="primary" multiple @click="selectFiles">选择文件</el-button>
      <el-button type="primary" @click="uploadFiles">机器生成草单</el-button>
      <el-button type="success" @click="review">人工审核</el-button>
      <el-button type="success" @click="machineReview">机器复核</el-button>
      <el-button type="success" @click="returnToList">返回处理记录列表</el-button>
      <!-- <el-button type="success" @click="fetchFiles" >测试</el-button> -->

    </div>
    <div>
      <!-- <splitpanes class="default-theme" style="height: 100%; width: 100% ; margin-bottom: 0px; margin-left: 0px;" :disable-sync="true"> -->
      <splitpanes class="default-theme"  :disable-sync="true"  horizontal :push-other-panes="false" >

        <pane style="width:100%">
          <splitpanes :push-other-panes="false">
            <pane style="height: 100%;">
              <div style="float:left;height: 100vh;width:96%;padding:2%; background-color: #f0f0f0; overflow-x: hidden;">
                <div
                  class="drop-area"
                  @dragover.prevent
                  @dragenter.prevent
                  @dragleave.prevent
                  @drop="handleDrop"
                >
                  <!-- <p style="font-size:15px;color:gray;">可将文件拖拽到此处</p> -->
                </div>
                <!-- <div>
                  <input type="file" placeholder="点击上传文件" multiple @change="changeHandle"/>
                </div> -->
                <input
                  type="file"
                  ref="fileInput"
                  style="display: none"
                  @change="changeHandle"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  multiple
                />
              
                <div
                  class="file-item"
                  v-for="(file, index) in uploadedFiles"
                  :key="index"
                  :class="{ active: selectedFileIndex === index }"
                  @click="selectFile(file ,index)"
                >
                  {{ file.name }}
                </div>
              </div>
            </pane>

            <pane style=" height:100vh;overflow-y: hidden; overflow-x: auto;"> 
              <component :is="selectedComponent" :src="src" style=" height: 100%;overflow-x: hidden;"/>   
            </pane>

            <pane style="overflow-y: auto; overflow-x: auto;">
              <div class="form-wrapper" style="overflow-y: auto;">
                <el-form ref="form" :model="form" label-position="top">
                  <el-row :gutter="30">
                    <el-col :span="8">
                      <el-form-item label="境内发货人">
                        <el-input v-model="form.DomesticShipper" @input="testAutoChangeColor('DomesticShipper')" class="DomesticShipper"  ref="DomesticShipperInput"></el-input>
                      </el-form-item>
                      <el-form-item label="出境关别">
                        <el-input v-model="form.LoadingPort" class="LoadingPort" @input="testAutoChangeColor('LoadingPort')"></el-input>
                      </el-form-item>
                      <el-form-item label="出口日期">
                        <el-date-picker v-model="form.exUnloadingPortDate" type="date" @change="testAutoChangeColor('exUnloadingPortDate')" class="exUnloadingPortDate"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="申报日期">
                        <el-date-picker v-model="form.declareDate" type="date" @change="testAutoChangeColor('declareDate')" class="declareDate"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="备案号">
                        <el-input v-model="form.recordNo" @input="testAutoChangeColor('recordNo')" class="recordNo"></el-input>
                      </el-form-item>
                      <el-form-item label="境外收货人">
                        <el-input v-model="form.OverseasConsignee" @input="testAutoChangeColor('OverseasConsignee')" class="OverseasConsignee"></el-input>
                      </el-form-item>
                      <el-form-item label="运输方式">
                        <el-select v-model="form.TransportationMethod" @change="testAutoChangeColor('TransportationMethod')" class="TransportationMethod">
                          <el-option label="水路运输" value="水路运输" ></el-option>
                          <el-option label="航空运输" value="航空运输"></el-option>
                          <el-option label="铁路运输" value="铁路运输"></el-option>
                          <el-option label="公路运输" value="公路运输"></el-option>
                          <el-option label="邮件运输" value="邮件运输"></el-option>
                          <el-option label="其他运输" value="其他运输"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="运输工具名称及航次号">
                        <el-input v-model="form.VesselVoyage" @input="testAutoChangeColor('VesselVoyage')" class="VesselVoyage"></el-input>
                      </el-form-item>
                      <el-form-item label="提运单号">
                        <el-input v-model="form.BillOfLading" @input="testAutoChangeColor('BillOfLading')" class="BillOfLading"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="生产销售单位">
                        <el-input v-model="form.Manufacturer" @input="testAutoChangeColor('Manufacturer')" class="Manufacturer"></el-input>
                      </el-form-item>
                      <el-form-item label="监管方式">
                        <el-select v-model="form.SupervisionMethod" @change="testAutoChangeColor('SupervisionMethod')" class="SupervisionMethod">
                          <el-option label="一般监管" value="General"></el-option>
                          <el-option label="集中申报" value="Centralized"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="征免性质">
                        <el-select v-model="form.NatureOfTaxExemption" @change="testAutoChangeColor('NatureOfTaxExemption')" class="NatureOfTaxExemption">
                          <el-option label="一般征税" value="Taxable"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="许可证号">
                        <el-input v-model="form.LicenseNumber" @input="testAutoChangeColor('LicenseNumber')" class="LicenseNumber"></el-input>
                      </el-form-item>
                      <el-form-item label="合同协议号">
                        <el-input v-model="form.ContractNumber" @input="testAutoChangeColor('ContractNumber')" class="ContractNumber"></el-input>
                      </el-form-item>
                      <el-form-item label="贸易国(地区)">
                        <el-input v-model="form.CountryOfDeparture" @input="testAutoChangeColor('CountryOfDeparture')" class="CountryOfDeparture"></el-input>
                      </el-form-item>
                      <el-form-item label="运抵国（地区)">
                        <el-input v-model="form.ArrivalCountry" @input="testAutoChangeColor('ArrivalCountry')" class="ArrivalCountry"></el-input>
                      </el-form-item>
                      <el-form-item label="指运港">
                        <el-input v-model="form.DestinationPort" @input="testAutoChangeColor('DestinationPort')" class="DestinationPort"></el-input>
                      </el-form-item>
                      <el-form-item label="离境口岸">
                        <el-input v-model="form.DeparturePort" @input="testAutoChangeColor('DeparturePort')" class="DeparturePort"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="包装种类">
                        <el-input v-model="form.PackagingType" @input="testAutoChangeColor('PackagingType')" class="PackagingType"></el-input>
                      </el-form-item>
                      <el-form-item label="件数">
                        <el-input v-model="form.NumberOfPackages" @input="testAutoChangeColor('NumberOfPackages')" class="NumberOfPackages"></el-input>
                      </el-form-item>
                      <el-form-item label="毛重（千克）">
                        <el-input v-model="form.GrossWeight" @input="testAutoChangeColor('GrossWeight')" class="GrossWeight"></el-input>
                      </el-form-item>
                      <el-form-item label="净重（千克）">
                        <el-input v-model="form.NetWeight" @input="testAutoChangeColor('NetWeight')" class="NetWeight"></el-input>
                      </el-form-item>
                      <el-form-item label="成交方式">
                        <el-select v-model="form.TransactionMethod" @change="testAutoChangeColor('TransactionMethod')" class="TransactionMethod">
                          <el-option label="FOB" value="FOB"></el-option>
                          <el-option label="CIF" value="CIF"></el-option>
                          <el-option label="C&F" value="CF"></el-option>
                          <el-option label="其他" value="Other"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="运费">
                        <el-input v-model="form.Freight"  @input="testAutoChangeColor('Freight')" class="Freight"></el-input>
                      </el-form-item>
                      <el-form-item label="保费">
                        <el-input v-model="form.Premium"  @input="testAutoChangeColor('Premium')" class="Premium"></el-input>
                      </el-form-item>
                      <el-form-item label="杂费">
                        <el-input v-model="form.MiscellaneousCharges"  @input="testAutoChangeColor('MiscellaneousCharges')" class="MiscellaneousCharges"></el-input>
                      </el-form-item>
                      <el-form-item label="随附单证及编号">
                        <el-input v-model="form.RegistrationNumber" @input="testAutoChangeColor('RegistrationNumber')" class="RegistrationNumber"></el-input>
                      </el-form-item>
                      <el-form-item label="标注唛码及备注" @input="testAutoChangeColor('MarkingCodeAndRemarks')">
                        <el-input v-model="form.MarkingCodeAndRemarks" class="MarkingCodeAndRemarks"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

                

                
                


              </div>
            </pane>
          </splitpanes>
        </pane>

        <pane>
          <el-table :data="tableData"  @row-click="handleRowClick"  highlight-current-row>
                  <el-table-column label="序号"  width="auto" min-width="4%">
                    <template #default="{ $index }">
                      <span>{{ $index + 1  }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="item_number" label="项号"  width="auto" min-width="4%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.item_number" @input="testAutoChangeColor(`item_number-${row.view_id}`)" :class="`item_number-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_code" label="商品编号" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.product_code" @input="testAutoChangeColor(`product_code-${row.view_id}`)"  :class="`product_code-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="specification_model" label="商品名称及规格型号" width="auto" min-width="12%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.specification_model" @input="testAutoChangeColor(`specification_model-${row.view_id}`)" :class="`specification_model-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="first_legal_quantity_unit" label="第一单位" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.first_legal_quantity_unit" @input="testAutoChangeColor(`first_legal_quantity_unit-${row.view_id}`)" :class="`first_legal_quantity_unit-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="first_legal_quantity" label="第一数量" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.first_legal_quantity" @input="testAutoChangeColor(`first_legal_quantity-${row.view_id}`)" :class="`first_legal_quantity-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="second_legal_quantity_unit" label="第二单位" width="auto" min-width="7%">
                  <template v-slot="{ row }">
                    <el-input v-model="row.second_legal_quantity_unit" @input="testAutoChangeColor(`second_legal_quantity_unit-${row.view_id}`)" :class="`second_legal_quantity_unit-${row.view_id}`"></el-input>
                  </template>
                </el-table-column>

                  <el-table-column prop="second_legal_quantity" label="第二数量" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.second_legal_quantity" @input="testAutoChangeColor(`second_legal_quantity-${row.view_id}`)" :class="`second_legal_quantity-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unit_price" label="单价" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.unit_price" @input="testAutoChangeColor(`unit_price-${row.view_id}`)"  :class="`unit_price-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="total_price" label="总价" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.total_price" @input="testAutoChangeColor(`total_price-${row.view_id}`)" :class="`total_price-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currency_code" label="币制" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.currency_code" @input="testAutoChangeColor(`currency_code-${row.view_id}`)"  :class="`currency_code-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="origin" label="原产国（地区）" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.origin" @input="testAutoChangeColor(`origin-${row.view_id}`)" :class="`origin-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="destination_country" label="最终目的国（地区）" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.destination_country" @input="testAutoChangeColor(`destination_country-${row.view_id}`)" :class="`destination_country-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="DomesticSourceOfGoods" label="境内发货地" width="auto" min-width="7%" >
                    <template v-slot="{ row }">
                      <el-input v-model="row.DomesticSourceOfGoods" @input="testAutoChangeColor(`DomesticSourceOfGoods-${row.view_id}`)"  :class="`DomesticSourceOfGoods-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="TaxExemption" label="征免" width="auto" min-width="7%">
                    <template v-slot="{ row }">
                      <el-input v-model="row.TaxExemption"  @input="testAutoChangeColor(`TaxExemption-${row.view_id}`)"   :class="`TaxExemption-${row.view_id}`"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="auto" min-width="7%">
                    <template #default="{ row,$index }">
                      <!-- <el-button @click="editItem(row)" type="success">编辑</el-button> -->
                      <el-button @click="deleteItem(row,$index)" type="danger">删除</el-button>
                    </template>
                  </el-table-column>

                  
                  
                </el-table>

                <el-button type="primary" @click="addNewRow" style="margin-top:10px">
                  <!-- <img src="../../assets/login/party.png" alt=""/> -->
                  点击添加新项
                </el-button>
        </pane>
            

      </splitpanes>

     
    </div>
    
</template>

<style >
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* 设置高度，让图片垂直居中 */
}

.center-image {
  /* 可以添加一些样式，例如最大宽度 */
  max-width: 100%;
  max-height: 100%;
}
.el-dialog__headerbutton {
  display: none; 
}
/* 隐藏横向滚动条轨道 */

.pane > div {
  overflow-y: auto;
  overflow-x: hidden;
}
  html,body {
    width: 100%;
    overflow: scroll;
  }
  body {
    margin: 0;
    padding: 0px;
    margin-left: 0px;
  }
  html::-webkit-scrollbar,body::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  #app{
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    height:50px;
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    width:400px;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    /* text-align: center; */
    width:100%; /* 如果要垂直居中也可以设置父容器高度 */
  }

  /* 文件列表样式 */
  .file-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.file-item:hover {
  background-color: #4682B4;
  color:white
}
.file-item.active {
  background-color: #4682B4;
  color:white
}

.form-wrapper {
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
  }
  .modified-field {
    background-color: #ffeeba; /* 你想要的修改后的颜色 */
  }


</style>

