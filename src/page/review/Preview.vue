<template>
    <div class="form-wrapper">
      <el-form ref="form" :model="form" label-position="top">
        <el-row :gutter="36">
          <el-col :span="8">
            <el-form-item label="境内发货人">
              <el-input v-model="form.sender"></el-input>
            </el-form-item>
            <el-form-item label="出境关别">
              <el-input v-model="form.customs"></el-input>
            </el-form-item>
            <el-form-item label="出口日期">
              <el-date-picker v-model="form.exportDate" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="申报日期">
              <el-date-picker v-model="form.declareDate" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="备案号">
              <el-input v-model="form.recordNo"></el-input>
            </el-form-item>
            <el-form-item label="境外收货人">
              <el-input v-model="form.receiver"></el-input>
            </el-form-item>
            <el-form-item label="运输方式">
              <el-select v-model="form.transportMode">
                <el-option label="海运" value="Sea"></el-option>
                <el-option label="空运" value="Air"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运输工具名称及航次号">
              <el-input v-model="form.shipName"></el-input>
            </el-form-item>
            <el-form-item label="提运单号">
              <el-input v-model="form.bolNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生产销售单位">
              <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="监管方式">
              <el-select v-model="form.supervisionMode">
                <el-option label="一般监管" value="General"></el-option>
                <el-option label="集中申报" value="Centralized"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="征免性质">
              <el-select v-model="form.exemptionNature">
                <el-option label="非征免" value="Non-exempt"></el-option>
                <el-option label="征税" value="Taxable"></el-option>
                <el-option label="免税" value="Exempt"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="许可证号">
              <el-input v-model="form.licenseNo"></el-input>
            </el-form-item>
            <el-form-item label="合同协议号">
              <el-input v-model="form.contractNo"></el-input>
            </el-form-item>
            <el-form-item label="贸易国(地区)">
              <el-input v-model="form.tradeCountry"></el-input>
            </el-form-item>
            <el-form-item label="运抵国（地区)">
              <el-input v-model="form.arrivalCountry"></el-input>
            </el-form-item>
            <el-form-item label="指运港">
              <el-input v-model="form.port"></el-input>
            </el-form-item>
            <el-form-item label="离境口岸">
              <el-input v-model="form.exitPort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包装种类">
              <el-input v-model="form.packaging"></el-input>
            </el-form-item>
            <el-form-item label="件数">
              <el-input-number v-model="form.packageCount" min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="毛重（千克）">
              <el-input-number v-model="form.grossWeight" min="0" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item label="净重（千克）">
              <el-input-number v-model="form.netWeight" min="0" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item label="成交方式">
              <el-select v-model="form.tradeMode">
                <el-option label="FOB" value="FOB"></el-option>
                <el-option label="CIF" value="CIF"></el-option>
                <el-option label="C&F" value="CF"></el-option>
                <el-option label="其他" value="Other"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运费">
              <el-input-number v-model="form.freight" min="0" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item label="保费">
              <el-input-number v-model="form.insurance" min="0" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item label="杂费">
              <el-input-number v-model="form.miscellaneous" min="0" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item label="随附单证及编号">
              <el-input v-model="form.documents"></el-input>
            </el-form-item>
            <el-form-item label="标注唛码及备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

<div style="height:200px">
    <el-table :data="tableData" style="width: 80%">
      <el-table-column label="项号" prop="itemNumber">
        <template slot-scope="scope">
          <el-input v-model="scope.row.itemNumber" />
        </template>
        <!-- <el-input v-model="scope.row.itemNumber" /> -->
      </el-table-column>
      <el-table-column label="商品编号" prop="productCode">
        <template slot-scope="scope">
          <el-input v-model="scope.row.productCode" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称及规格型号" prop="productDetails">
        <template slot-scope="scope">
          <el-input v-model="scope.row.productDetails" />
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="quantity">
        <template slot-scope="scope">
          <el-input v-model="scope.row.quantity" />
        </template>
      </el-table-column>
      <el-table-column label="单价" prop="unitPrice">
        <template slot-scope="scope">
          <el-input v-model="scope.row.unitPrice" />
        </template>
      </el-table-column>
      <el-table-column label="总价" prop="totalPrice">
        <template slot-scope="scope">
          <el-input v-model="scope.row.totalPrice" />
        </template>
      </el-table-column>
      <el-table-column label="币制" prop="currency">
        <template slot-scope="scope">
          <el-input v-model="scope.row.currency" />
        </template>
      </el-table-column>
      <el-table-column label="原产国(地区)" prop="originCountry">
        <template slot-scope="scope">
          <el-input v-model="scope.row.originCountry" />
        </template>
      </el-table-column>
      <el-table-column label="终目的国(地区)" prop="destinationCountry">
        <template slot-scope="scope">
          <el-input v-model="scope.row.destinationCountry" />
        </template>
      </el-table-column>
      <el-table-column label="境内发货地" prop="shippingLocation">
        <template slot-scope="scope">
          <el-input v-model="scope.row.shippingLocation" />
        </template>
      </el-table-column>
      <el-table-column label="征免" prop="taxExemption">
        <template slot-scope="scope">
          <el-input v-model="scope.row.taxExemption" />
        </template>
      </el-table-column>
      <el-table-column label="境内发货人" prop="domesticShipper">
        <template slot-scope="scope">
          <el-input v-model="scope.row.domesticShipper" />
        </template>
      </el-table-column>
      <el-table-column label="境外发货人" prop="overseasShipper">
        <template slot-scope="scope">
          <el-input v-model="scope.row.overseasShipper" />
        </template>
      </el-table-column>
      <el-table-column label="出口日期" prop="exportDate">
        <template slot-scope="scope">
          <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.exportDate" />
        </template>
      </el-table-column>
      <el-table-column label="生产单位" prop="productionUnit">
        <template slot-scope="scope">
          <el-input v-model="scope.row.productionUnit" />
        </template>
      </el-table-column>
    </el-table>
</div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          sender: "qdn",
          customs: "海关",
          exportDate: "",
          declareDate: "",
          recordNo: "123456789",
          receiver: "qqddnn",
          transportMode: "",
          shipName: "",
          bolNo: "123456",
          unit: "qdn公司",
          supervisionMode: "",
          exemptionNature: "",
          licenseNo: "123456",
          contractNo: "123456",
          tradeCountry: "China",
          arrivalCountry: "United States",
          port: "China",
          exitPort: "China",
          packaging: "纸箱",
          packageCount: 77,
          grossWeight: 17.5,
          netWeight: 100.2,
          tradeMode: "",
          freight: 100.5,
          insurance: 30.2,
          miscellaneous: 10.0,
          documents: "发票单",
          remarks: ""
        },

        // 商品明细数据
        tableData: [
            {
                itemNumber: '1',
                productCode: 'P12345',
                productDetails: 'Product A - Size 10',
                quantity: '10',
                unitPrice: '100',
                totalPrice: '1000',
                currency: 'USD',
                originCountry: 'China',
                destinationCountry: 'USA',
                shippingLocation: 'Shanghai',
                taxExemption: 'Yes',
                domesticShipper: 'ABC Company',
                overseasShipper: 'XYZ Corporation',
                exportDate: '2022-03-15',
                productionUnit: 'Company XYZ',
            },
            {
                itemNumber: '2',
                productCode: 'P67890',
                productDetails: 'Product B - Size 20',
                quantity: '5',
                unitPrice: '50',
                totalPrice: '250',
                currency: 'EUR',
                originCountry: 'Germany',
                destinationCountry: 'France',
                shippingLocation: 'Berlin',
                taxExemption: 'No',
                domesticShipper: 'DEF Ltd.',
                overseasShipper: 'PQR Co.',
                exportDate: '2022-03-20',
                productionUnit: 'Company ABC',
            },

        ],
      };
    }
  };
  </script>
  
  <style scoped>
  .form-wrapper {
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
  }
  
</style>
