<template>
  <h4>工单信息</h4>
  
  <div class="handle-box">
    <!-- <el-input  v-model="productionProcess" placeholder="名称" ></el-input> -->
    <!-- 监控input变化,filer(productionProcess) -->
    <!-- <el-input  v-model="productionProcess" placeholder="工序数" ></el-input>  -->
    <!-- <el-input v-model="machineName" placeholder="机台ID"></el-input> -->
    <el-select v-model="machineName" clearable placeholder="机台名称">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.machineName"
    />
  </el-select>
    <el-button type="primary" @click="filter(String(machineName))"
      >搜索</el-button
    >
  </div>

  <div class="reportwork"></div>

  <div class="workorder">
    <el-table :data="listData" style="width: 100%">
      <el-table-column fixed prop="orderNumber" label="工单号" />
      <el-table-column fixed prop="customerName" label="客户名称" />
      <el-table-column prop="machineID" label="机台ID" />
      <el-table-column prop="machineName" label="机台名称" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="partNumber" label="产品料号" />
      <el-table-column prop="requiredThroughput" label="需求工件数" />
      <el-table-column prop="standardProductionTime" label="已完成工件数" />
      <el-table-column label="工单进度" width="200"><el-progress :percentage="percentage" :color="customColors" /></el-table-column>
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
        const standardProductionTime =workOrderContent.standardProductionTime
        const productionProcess = workOrderContent.productionProcess;
        const machineID = workOrderContent.machineInfo.machineID;
        const machineName = workOrderContent.machineInfo.machineName;
        DataOrdList.push({
          orderNumber: orderNumber,
          customerName: customerName,
          productName: productName,
          partNumber: partNumber,
          requiredThroughput: requiredThroughput,
          standardProductionTime:standardProductionTime,
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
      listData: [], //展示数据数组
      productionProcess: "",
      machineID: "",
      // productionProcessList:[],
      Initiallist: [],
      machineName: "",
      options: [
        {
          machineName: "联聚-11",
          label: "联聚-11",
        },
        {
          machineName: "联聚-12",
          label: "联聚-12",
        },
        {
          machineName: "联聚-13",
          label: "联聚-13",
        },
        {
          machineName: "联聚-14",
          label: "联聚-14",
        },
        {
          machineName: "联聚-15",
          label: "联聚-15",
        },
        {
          machineName: "联聚-16",
          label: "联聚-16",
        },
        {
          machineName: "联聚-17",
          label: "联聚-17",
        },
        {
          machineName: "联聚-22",
          label: "联聚-22",
        },
        {
          machineName: "联聚-23",
          label: "联聚-23",
        },
        {
          machineName: "联聚-24",
          label: "联聚-24",
        },
        {
          machineName: "联聚-25",
          label: "联聚-25",
        },
        {
          machineName: "联聚-26",
          label: "联聚-26",
        },
        {
          machineName: "联聚-31",
          label: "联聚-31",
        },
        {
          machineName: "联聚-32",
          label: "联聚-32",
        },
        {
          machineName: "联聚-33",
          label: "联聚-33",
        },
        {
          machineName: "联聚-34",
          label: "联聚-34",
        },
        {
          machineName: "联聚-35",
          label: "联聚-35",
        },
        {
          machineName: "联聚-36",
          label: "联聚-36",
        },
        {
          machineName: "联聚-37",
          label: "联聚-37",
        },
        {
          machineName: "联聚-38",
          label: "联聚-38",
        },
        {
          machineName: "联聚-42",
          label: "联聚-42",
        },
        {
          machineName: "联聚-43",
          label: "联聚-43",
        },
        {
          machineName: "联聚-44",
          label: "联聚-44",
        },
        {
          machineName: "联聚-45",
          label: "联聚-45",
        },
        {
          machineName: "联聚-46",
          label: "联聚-46",
        },
        {
          machineName: "联聚-47",
          label: "联聚-47",
        },
      ],
      // DataOrdList: DataOrdList,
    };
  },

  //初始化列表
  beforeCreate() {
    axios
      .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
        // ProductNamePartNo: "",
        count: 200,
        // expectedStartDateEnd: 1669075200000,
        // expectedStartDateStart: 1653696000000,
        // lastModifyTimeEndDate: null,
        // lastModifyTimeStartDate: null,
        machineIDList: [],
        // multiSNSearch: "",
        productionProcessList: [],
        startIndex: 0,
      })
      .then((res) => {
        // console.log(res.data.content.orderList)

        this.Initiallist = maplist(res.data.content.orderList);

        this.listData = this.Initiallist;

        //maplist(res.data.content.orderList)
        console.log(this.listData);
      })
      .catch((err) => {
        alert(err);
      });
  },
  //1. 先区分筛选前的数据 初始 = []和筛选后的数据 listData = []
  //2. call api把值放入筛选前的数组
  //3. 写一个filer方法，把筛选后的值放入 listData()
  //4. 监控input变化,filer(productionProcess)，呼叫filer方法并传入productionProcess参数
  //5. render listData[]

  //1. 先区分筛选前的数据 初始 = []和筛选后的数据 listData = []
  //2. call api把值放入筛选前的数组
  //3. 写一个find方法，把值放入listData
  //4. 监控input变化,filer(productionProcess)，呼叫filer方法并传入productionProcess参数
  //5. render listData[]

  methods: {
    //根据机台名称筛选列表
    filter(machineName) {
      console.log("machineName", machineName);
      // console.log(this.Initiatllist)
      //filter((t)=>{return (条件)})
      this.listData = this.Initiallist.filter((temp) => {
        //console.log(temp.productionProcessList)
        //console.log(temp.machineIDList);
        //=== 严格比较
        return temp.machineName == machineName;
      });

      console.log("listData", this.listData);
      // console.log(productionProcess)
      find();
      //  console.log(this.listData)
    },
    find() {
      axios
        .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
          // ProductNamePartNo: "",
          count: 200,
          // expectedStartDateEnd: 1669075200000,
          // expectedStartDateStart: 1653696000000,
          // lastModifyTimeEndDate: null,
          // lastModifyTimeStartDate: null,
          machineIDList: [],
          // multiSNSearch: "",
          productionProcessList: [],
          startIndex: 0,
        })
        .then((res) => {
          // console.log(res.data.content.orderList);
          //this.Initiallist = ;
          this.listData = maplist(res.data.content.orderList);
          //console.log("datalist",this.listData)
        })
        .catch((err) => {
          alert(err);
        });
    },
   },
};
</script>
<style>
el-table-column {
  text-align: center;
}
</style>
