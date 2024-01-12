

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

export default {
  components: { Splitpanes, Pane, VueOfficePdf,VueOfficeDocx,VueOfficeExcel},
  data() {
    return {
      src: '',
      pdfWidth: 'auto',
      pdfHeight: 'auto',
      uploadedFiles: [], // 用于存储上传的文件
      selectedComponent: null,
      selectedFileIndex: null,
      realID:null,
      initialFormData:null,
      tableData: [
        {
    //       view_id: '1',
    // itemNumber: 'ABC123',
    // specification_model: 'Sample Product A',
    // first_legal_quantity_unit: '2',
    // first_legal_quantity: '100.00',
    // second_legal_quantity_unit: null,
    // second_legal_quantity: '43434343.00',
    // unit_price: '10.00',
    // total_Price: '1000.00',
    // currency_code: 'USD',
    // origin: 'USA',
    // destination_country: 'Germany',
    // TaxExemption: 'Exempt'
      view_id: 1,
      itemNumber: null,
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
        },
        {
          view_id: 2,
          item_number: "ABC123",
      specification_model: "test|test|test|",
      first_legal_quantity_unit: null,
      first_legal_quantity: "100.00",
      second_legal_quantity_unit: null,
      second_legal_quantity: "200.00",
      unit_price: "10.00",
      total_Price: "1000.00",
      currency_code: "123",
      origin: "中国(CHN)",
      destination_country: "USA",
      TaxExemption: "照章征税",
      bgd_id: 1,
      item_number: 1,
      product_code: 1234,
      product_name: "spx",
      transaction_quantity: "10.00",
      total_price: "100.00",
      DomesticSourceOfGoods: null
        },
        {
          view_id: 3,
      itemNumber: "ABC123",
      specification_model: "test|test|test|",
      first_legal_quantity_unit: "100",
      first_legal_quantity: "100.00",
      second_legal_quantity_unit: "100",
      second_legal_quantity: "200.00",
      unit_price: "10.00",
      total_Price: "1000.00",
      currency_code: "123",
      origin: "中国(CHN)",
      destination_country: "USA",
      TaxExemption: "照章征税",
      bgd_id: 1,
      item_number: 1,
      product_code: 1234,
      product_name: "spx",
      transaction_quantity: "10.00",
      total_price: "100.00",
      DomesticSourceOfGoods: null
        }
      ],

      form: {
        // DomesticShipper: "qdn",
        // DestinationUnloadingPort: "海关",
        // exUnloadingPortDate: "",
        // declareDate: "",
        // recordNo: "123456789",
        // ArrivalCountry: "qqddnn",
        // transUnloadingPortMode: "",
        // VesselVoyage: "",
        // BillOfLading: "123456",
        // Manufacturer: "qdn公司",
        // supervisionMode: "",
        // TaxExemptionNature: "",
        // licenseNo: "123456",
        // contractNo: "123456",
        // CountryOfDeparture: "China",
        // ArrivalCountry: "first_legal_quantity_united States",
        // UnloadingPort: "China",
        // DeparturePort: "China",
        // packaging: "纸箱",
        // NumberOfPackage: 77,
        // GrossWeight: 17.5,
        // Netweight: 100.2,
        // TransactionMethod: "",
        // freight: 100.5,
        // insurance: 30.2,
        // miscellaneous: 10.0,
        // documents: "发票单",
        // remarks: ""
  //       DomesticShipper: "100000",
  // DestinationUnloadingPort: "test2",
  // exUnloadingPortDate: "", // 需要根据后端数据匹配日期格式
  // declareDate: "", // 需要根据后端数据匹配日期格式
  // recordNo: "123456789",
  // ArrivalCountry: "qqddnn",
  // transUnloadingPortMode: "", // 需要根据后端数据匹配
  // VesselVoyage: "test",
  // BillOfLading: "123456",
  // Manufacturer: "qdn公司",
  // supervisionMode: "", // 需要根据后端数据匹配
  // TaxExemptionNature: "", // 需要根据后端数据匹配
  // licenseNo: "123456",
  // contractNo: "123456",
  // CountryOfDeparture: "China",
  // ArrivalCountry: "first_legal_quantity_united States",
  // UnloadingPort: "China",
  // DeparturePort: "China",
  // packaging: "纸箱",
  // NumberOfPackage: 77,
  // GrossWeight: 17.5,
  // Netweight: 100.2,
  // TransactionMethod: "", // 需要根据后端数据匹配
  // freight: 100.5,
  // insurance: 30.2,
  // miscellaneous: 10.0,
  // documents: "发票单",
  // remarks: ""
  //后端数据库没有的几个字段：
    // CustomDeclarationId: 1,
  // ContractFormID: "1",
  // ContractTableID: 1,
  // InvoiceId: 1,
  // PackingListID: 1,
  // ProcessingRecord: 1,
  // PurchaseOrderId: 1,
  declareDate:"2023-12-16",
  exUnloadingPortDate: "2023-12-16",
  recordNo:null,
  ArrivalCountry: "USA",
  AttachedDocumentsAndNumbers: null,
  BillOfLading: "test",
  ContractNumber: "123",
  CountryOfDeparture: "CHN",
  DeparturePort: "青岛",
  DestinationPort: "qd",
  DomesticShipper: "11",
  DomesticSourceLocation: "test",//在view里
  Freight: null,
  GrossWeight: "300.00000",
  LicenseNumber: null,
  LoadingPort:"test",
  Manufacturer: "test",
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
    }
  },
  methods: {
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
        // console.log(formData.getAll('files'));
        const response = await api.post('upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 使用 multipart/form-data 类型
        }
      });

      
        console.log('Files uploaded successfully:', response);
        //获取后端返回的数据用于后续的变色比对
        // this.initialFormData = { bgd: {...response.data.bgd}, view: [...response.data.view] };
        this.realID = response.data.realID;
        console.log(this.realID);
        this.form = response.data.bgd;
      this.tableData = response.data.view.map((item) => ({ ...item }));
      } catch (error) {
        console.error('Error uploading files:', error);
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
      try {
      // 获取要发送的数据
      const dataToSend = {
        bgd: this.form,  // 从表格数据中获取
        view: this.tableData,      // 从表单数据中获取
      };
      console.log(this.tableData);
      // const recordId = this.$route.params.id;
      // const response_d = await api.get(`/detail/${recordId}`);
      // this.detailData = response.data;
      //暂存数据用于和人工审核对比
      // console.log(this.initialFormData);
      // if(this.realID !=null||this.mode=="edit"){
      //   this.markModifiedFields(dataToSend);
      // }
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

    } catch (error) {
      // 处理错误
      console.error('Error submitting form:', error);
      // 可以在这里添加处理错误的逻辑
    }
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
          // this.$set(this.form, key + 'Modified', true);
          // this.$refs[key + 'Input'].style['backgroundColor'] = '#ffeeba';

          // 在这里修改输入框的样式，例如修改背景色
         
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

//人工审核变色修改为：不用点击就变色，连接前后端，加进度条



  async machineReview(){
      var response = null;
      // 发送PUT请求到Django后端
      // const re_mode = this.$route.params.mode;
      if(this.mode == null){
        response = await api.put(`/detail/${this.realID}`, dataToSend);
      }
      else{
        const recordId = this.$route.params.id;
        response = await api.put(`/detail/${recordId}`, dataToSend);
      }
      for (const key in this.response.data.bgd) {
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
          // this.$set(this.form, key + 'Modified', true);
          // this.$refs[key + 'Input'].style['backgroundColor'] = '#ffeeba';

          // 在这里修改输入框的样式，例如修改背景色
         
        }
      }
    }

  },
  testAutoChangeColor(className){
    console.log("modified");
          const inputElement = document.querySelector(`.${className}`);
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




















    // getFileType(fileName) {
    //   const extension = fileName.split('.').pop().toLowerCase();
    //   if (extension === 'pdf') {
    //     return 'pdf';
    //   } else if (extension === 'docx' || extension === 'doc') {
    //     return 'docx';
    //   } else if (extension === 'xlsx' || extension === 'xls') {
    //     return 'xlsx';
    //   } else {
    //     return 'unknown';
    //   }
    // }
  }
}
</script>
<template>
    <div style="height: 100vh;">
      <!-- <splitpanes class="default-theme" style="height: 100%; width: 100% ; margin-bottom: 0px; margin-left: 0px;" :disable-sync="true"> -->
        <splitpanes class="default-theme" style="width: 100vw;display: flex;" :disable-sync="true">

        <pane style="width:200px;height: 100%;">
          <div style="float:left;height: 100vh;margin:5px; background-color: #f0f0f0; overflow-x: hidden;">
            <div
              class="drop-area"
              @dragover.prevent
              @dragenter.prevent
              @dragleave.prevent
              @drop="handleDrop"
            >
              <p style="font-size:15px;color:gray;">可将文件拖拽到此处</p>
            </div>
            <!-- <div>
              <input type="file" placeholder="点击上传文件" multiple @change="changeHandle"/>
            </div> -->
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="changeHandle"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              multiple
            />
            <div class="container">
              <!-- <button  @click="selectFiles">点击上传文件</button> -->
              <el-button type="primary" multiple @click="selectFiles">选择文件</el-button>
            </div>
            <div class="container" style="margin-top: 10px;">
            <el-button type="primary" @click="uploadFiles">上传文件</el-button>
          </div>
            <div class="btn">
              <el-button type="success" @click="review">人工审核</el-button>
              <el-button type="success" @click="machineReview">机器复核</el-button>
            </div>

            <!-- 显示文件列表 -->
            <!-- <div class="file-item" v-for="(file, index) in uploadedFiles" :key="index" @click="selectFile(file)">
              {{ file.name }}
            </div> -->
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
        <pane style="overflow-y: auto; overflow-x: hidden;"> 
          <component :is="selectedComponent" :src="src" style=" height: 100%;overflow-x: hidden;"/>   
        </pane>

        <pane style="width:50%; overflow-y: auto;overflow-x: auto;">
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
                  <el-form-item label="出口日期(无)">
                    <el-date-picker v-model="form.exUnloadingPortDate" type="date" @change="testAutoChangeColor('exUnloadingPortDate')" class="exUnloadingPortDate"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="申报日期(无)">
                    <el-date-picker v-model="form.declareDate" type="date" @change="testAutoChangeColor('declareDate')" class="declareDate"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="备案号(无)">
                    <el-input v-model="form.recordNo" @input="testAutoChangeColor('recordNo')" class="recordNo"></el-input>
                  </el-form-item>
                  <el-form-item label="境外收货人">
                    <el-input v-model="form.OverseasConsignee" @input="testAutoChangeColor('OverseasConsignee')" class="OverseasConsignee"></el-input>
                  </el-form-item>
                  <el-form-item label="运输方式(默认水路运输)">
                    <el-select v-model="form.TransportationMethod" @change="testAutoChangeColor('TransportationMethod')" class="TransportationMethod">
                      <el-option label="海路运输" value="Sea" ></el-option>
                      <el-option label="空运" value="Air"></el-option>
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
                  <el-form-item label="监管方式(默认一般贸易)">
                    <el-select v-model="form.SupervisionMethod" @change="testAutoChangeColor('SupervisionMethod')" class="SupervisionMethod">
                      <el-option label="一般监管" value="General"></el-option>
                      <el-option label="集中申报" value="Centralized"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="征免性质(一般征税)">
                    <el-select v-model="form.NatureOfTaxExemption" @change="testAutoChangeColor('NatureOfTaxExemption')" class="NatureOfTaxExemption">
                      <el-option label="非征免" value="Non-exempt"></el-option>
                      <el-option label="征税" value="Taxable"></el-option>
                      <el-option label="免税" value="Exempt"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="许可证号（没有）">
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
                    <el-input-number v-model="form.NumberOfPackages" min="1" @input="testAutoChangeColor('NumberOfPackages')" class="NumberOfPackages"></el-input-number>
                  </el-form-item>
                  <el-form-item label="毛重（千克）">
                    <el-input-number v-model="form.GrossWeight" min="0" :step="0.001" @input="testAutoChangeColor('GrossWeight')" class="GrossWeight"></el-input-number>
                  </el-form-item>
                  <el-form-item label="净重（千克）">
                    <el-input-number v-model="form.NetWeight" min="0" :step="0.001" @input="testAutoChangeColor('NetWeight')" class="NetWeight"></el-input-number>
                  </el-form-item>
                  <el-form-item label="成交方式">
                    <el-select v-model="form.TransactionMethod" @change="testAutoChangeColor('TransactionMethod')" class="TransactionMethod">
                      <el-option label="FOB" value="FOB"></el-option>
                      <el-option label="CIF" value="CIF"></el-option>
                      <el-option label="C&F" value="CF"></el-option>
                      <el-option label="其他" value="Other"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="运费(默认没有)">
                    <el-input-number v-model="form.Freight" min="0" :step="0.01" @input="testAutoChangeColor('Freight')" class="Freight"></el-input-number>
                  </el-form-item>
                  <el-form-item label="保费(没有)">
                    <el-input-number v-model="form.Premium" min="0" :step="0.01" @input="testAutoChangeColor('Premium')" class="Premium"></el-input-number>
                  </el-form-item>
                  <el-form-item label="杂费（没有）">
                    <el-input-number v-model="form.MiscellaneousCharges" min="0" :step="0.01" @input="testAutoChangeColor('MiscellaneousCharges')" class="MiscellaneousCharges"></el-input-number>
                  </el-form-item>
                  <el-form-item label="随附单证及编号（没有）">
                    <el-input v-model="form.RegistrationNumber" @input="testAutoChangeColor('RegistrationNumber')" class="RegistrationNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="标注唛码及备注（默认M/N ）" @input="testAutoChangeColor('MarkingCodeAndRemarks')">
                    <el-input v-model="form.MarkingCodeAndRemarks" class="MarkingCodeAndRemarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <el-table :data="tableData" style="max-width: 1500px">
              <el-table-column prop="item_number" label="项号" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.item_number" @input="testAutoChangeColor(`item_number-${row.view_id}`)" :class="`item_number-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="product_code" label="商品编号" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.product_code" @input="testAutoChangeColor(`product_code-${row.view_id}`)"  :class="`product_code-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="specification_model" label="商品名称及规格型号" style="min-width: 12%">
                <template v-slot="{ row }">
                  <el-input v-model="row.specification_model" @input="testAutoChangeColor(`specification_model-${row.view_id}`)" :class="`specification_model-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="first_legal_quantity_unit" label="第一单位" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.first_legal_quantity_unit" @input="testAutoChangeColor(`first_legal_quantity_unit-${row.view_id}`)" :class="`first_legal_quantity_unit-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="first_legal_quantity" label="第一数量" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.first_legal_quantity" @input="testAutoChangeColor(`first_legal_quantity-${row.view_id}`)" :class="`first_legal_quantity-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="second_legal_quantity_unit" label="第二单位" style="min-width: 8%">
              <template v-slot="{ row }">
                <el-input v-model="row.second_legal_quantity_unit" @input="testAutoChangeColor(`second_legal_quantity_unit-${row.view_id}`)" :class="`second_legal_quantity_unit-${row.view_id}`"></el-input>
              </template>
            </el-table-column>

              <el-table-column prop="second_legal_quantity" label="第二数量" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.second_legal_quantity" @input="testAutoChangeColor(`second_legal_quantity-${row.view_id}`)" :class="`second_legal_quantity-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="unit_price" label="单价" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.unit_price" @input="testAutoChangeColor(`unit_price-${row.view_id}`)"  :class="`unit_price-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="total_price" label="总价" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.total_price" @input="testAutoChangeColor(`total_price-${row.view_id}`)" :class="`total_price-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="currency_code" label="币制" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.currency_code" @input="testAutoChangeColor(`currency_code-${row.view_id}`)"  :class="`currency_code-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="origin" label="原产国（地区）" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.origin" @input="testAutoChangeColor(`origin-${row.view_id}`)" :class="`origin-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="destination_country" label="最终目的国（地区）" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.destination_country" @input="testAutoChangeColor(`destination_country-${row.view_id}`)" :class="`destination_country-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="DomesticSourceOfGoods" label="境内发货地" style="min-width: 8%" >
                <template v-slot="{ row }">
                  <el-input v-model="row.DomesticSourceOfGoods" @input="testAutoChangeColor(`DomesticSourceOfGoods-${row.view_id}`)"  :class="`DomesticSourceOfGoods-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="TaxExemption" label="征免" style="min-width: 8%">
                <template v-slot="{ row }">
                  <el-input v-model="row.TaxExemption"  @input="testAutoChangeColor(`TaxExemption-${row.view_id}`)"   :class="`TaxExemption-${row.view_id}`"></el-input>
                </template>
              </el-table-column>
            </el-table>

            


          </div>
        </pane>

      </splitpanes>

     
    </div>
    
</template>

<style >
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
  /* // .splitpanes__pane {
  //   box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
  //   justify-content: center;
  //   align-items: center;
  //   display: flex;
  //   position: relative;
  // } */

  /* // em.specs {
  //   font-size: 0.2em;
  //   line-height: 1;
  //   position: absolute;
  //   color: #bbb;
  //   bottom: 0.5em;
  //   left: 0;
  //   right: 0;
  //   text-align: center;
  // } */

/* 
  // // GENERAL STYLES.
  // html, body, #app {height: 100%;margin: 0;}
  // body {
  //   font-family: Helvetica, Arial, sans-serif;
  //   color: rgba(255, 255, 255, 0.6);
  //   font-size: 5em;
  // }

  // // documentation link.
  // p {
  //   position: absolute;
  //   bottom: 5px;
  //   right: 5px;
  //   color: #666;
  //   z-index: 10;
  //   font-size: 12px;
    
  //   a {color: inherit;}
  // } */

</style>

