<template>
  <h4>工单信息</h4>
  <div class="handle-box">
    <!-- <el-input  v-model="productionProcess" placeholder="名称" ></el-input> -->
    <!-- 监控input变化,filer(productionProcess) -->
    <el-input  v-model="productionProcess" placeholder="名称" ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
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
      <el-table-column prop="productionProcess" label="工序" />
    </el-table>
  </div>

  <div class="workorderstatus"></div>
</template>

<script>
import axios from "axios";

//遍历API获取想要的字段
//初始值不动
let DataOrdList = [];
//筛选值
let DataFilter = [];
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
      listData: [],
      productionProcess: '',
      productionProcessList:[]
     // DataOrdList: DataOrdList,
    };
  },
    //   setup() {
    //     let tryText = ref();
    //     function handelInput(e) {
    //       tryText.value = e.target.value; //ref定义的数据访问和修改需要通过.value
    //     }
    //     onMounted(()=>{console.log(tryText.value)});
    //     return{
    //             tryText,
    //             handelInput
    //         }
    //   },
  beforeCreate(a) {
    axios
      .post("api/v1/Private/SynFactory/ProductionPlan/Search", {
        // ProductNamePartNo: "",
        count: 200,
        // expectedStartDateEnd: 1669075200000,
        // expectedStartDateStart: 1653696000000,
        // lastModifyTimeEndDate: null,
        // lastModifyTimeStartDate: null,
        // machineIDList: [],
        // multiSNSearch: "",
        productionProcessList: [a],
        startIndex: 0,
      }
)
      .then((res) => {
        // console.log(res.data.content.orderList)

        //初始数组 = maplist(res.data.content.orderList);

        this.listData = 初始数组

        //maplist(res.data.content.orderList)
        //console.log(this.listData.productionProcess);
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
    filer(prop){
        this.listData = this.初始.filter(()=> { 初始.productionOrderList = prop })
        console.log();
    },
    find(prop){
        axios
        .then{
            this.listData = 初始数组

        }
    }
    
    // search(){
    //     //测试绑定输出
    //     this.productionProcessList.push(this.productionProcess)
    // }

    // search(){
    //     const testProcess = this.searchProcess,
    //     // this.listData.forEach(response => {
    //     //     if(testProcess === response.productionProcess){
    //     //         this.searchData.push(response)
    //     //         console.log('完成一次对比')
    //     //     }
    //     // });
    //     for (let list in this.listData) {
    //         if (this.searchProcess == list.productionProcess){
    //             this.searchData.push(list)
    //         }
    //     }
    //     console.log('搜索')
    //     console.log(this.searchData)
    // }
  },
};

//filter

</script>
<style>
el-table {
  text-align: center;
}
</style>
