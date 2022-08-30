<template>
    <h4>工单信息</h4>
    <div class="handle-box">
      <el-input  v-model="machineID" placeholder="工序数" ></el-input>   
      <!-- <el-input  v-model="machineID" placeholder="机台ID"></el-input>   -->
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    </div>
  
    <div class="reportwork"></div>
  
    <div class="workorder">
      <el-table :data="listData" style="width: 100%">
        <el-table-column fixed prop="orderNumber" label="工单号" ></el-table-column>
        <el-table-column fixed prop="customerName" label="客户名称" />
        <el-table-column prop="machineID" label="机台ID" />
        <el-table-column prop="machineName" label="机台名称" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="partNumber" label="产品料号" />
        <el-table-column prop="requiredThroughput" label="需求工件数" />
        <el-table-column prop="productionProcess" label="工序" />
      </el-table>
    </div>
  
    <div class="workorderstatus"></div>
  </template>
  
  <script>
  import axios from "axios";
  
  //遍历API获取想要的字段
  let DataOrdList = [];
  const maplist = (parma) => {
    parma.forEach((orderList) => {
      const orderNumber = orderList.orderNumber ? orderList.orderNumber : "";
      const customerName = orderList.customerName ? orderList.customerName : "";
      orderList.productionOrderList.forEach((productionOrderList) => {
        const productName = productionOrderList.productName;
        const partNumber = productionOrderList.partNumber;
        productionOrderList.workOrderContent.forEach((workOrderContent) => {
          const requiredThroughput = workOrderContent.requiredThroughput;
          const productionProcess = workOrderContent.productionProcess;
          const machineID = workOrderContent.machineInfo.machineID;
          const machineName = workOrderContent.machineInfo.machineName;
          DataOrdList.push({
            orderNumber: orderNumber,
            customerName: customerName,
            productName: productName,
            partNumber: partNumber,
            requiredThroughput: requiredThroughput,
            productionProcess: productionProcess,
            machineID: machineID,
            machineName: machineName,
          });
        });
      });
    });
    console.log("DataOrdList", DataOrdList);
    return DataOrdList;
  };
  
  export default {
    data() {
      return {
        listData: [],//展示数据数组
        productionProcess: '',
        machineID:'',
      };
    },
      
//     beforeCreate() {
//         console.log("beforeCreate");
//       axios
//         .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
//           // ProductNamePartNo: "",
//           count: 200,
//           // expectedStartDateEnd: 1669075200000,
//           // expectedStartDateStart: 1653696000000,
//           // lastModifyTimeEndDate: null,
//           // lastModifyTimeStartDate: null,
//            machineIDList: [],
//           // multiSNSearch: "",
//           productionProcessList: [],
//           startIndex: 0,
//         }
//   )
//         .then((res) => {
//           //console.log(res.data.content.orderList)
         
//           this.listData  = maplist(res.data.content.orderList);
  
//           //console.log(this.listData);
//         })
//         .catch((err) => {
//           alert(err);
//         });
  
//     },
       
    methods: {
        search(){
             console.log(this.productionProcess,this.machineID);
    axios
        .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
        //  ProductNamePartNo: "",
          count: 200,
        //  expectedStartDateEnd: 1669075200000,
        //  expectedStartDateStart: 1653696000000,
        // lastModifyTimeEndDate: null,
        //  lastModifyTimeStartDate: null,
          machineIDList: [this.machineID],
        //  multiSNSearch: "",
          productionProcessList: [],
          startIndex: 0,
        }
  )
        .then((res) => {
          console.log(res.data.content.orderList)
          this.listData  = maplist(res.data.content.orderList);
  
          console.log(this.listData);
        })
        .catch((err) => {
          alert(err);
        });
        } 
    }
  };
  
  </script>
  <style>
  
  el-table-column {
    text-align: center;
  }
  </style>
  