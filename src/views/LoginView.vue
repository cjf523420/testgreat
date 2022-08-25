<template>
  <h4>获取数据</h4>
  <div>
    <div>
      <div ref="roll" style="height: 110px; overflow: hidden; margin: 20px">
        <div v-for="item in listData" :key="item.id">
          <span>{{ item.machineID }}</span>
        </div>
      </div>
    </div>
  </div>
  <el-button type="primary" @click="search()">查询</el-button>
  <div class="reportwork"></div>

  <div class="workorder">
    <el-table :data="listData" style="width: 100%">
      <el-table-column fixed prop="orderNumber" label="工单号" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="partNumber" label="产品料号" />
      <el-table-column prop="productionProcess" label="工序" />
      <el-table-column prop="requiredThroughput" label="需求工件数" />
      <el-table-column prop="zip" label="工单状态" />
    </el-table>
  </div>

  <div class="workorderstatus"></div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
// axios.defaults.baseURL = '/api'
//  let state =reactive({
//         listData:[]
//     })
// let listData = ref([])
let Alldata=[]
const maplist =(parma)=> {
    parma.forEach(element => {
        const  customerName=element.customerName
        element.productionOrderList.forEach((item)=>{
            const craftPath=item.craftPath
            Alldata.push({"customerName":customerName,"craftPath":craftPath})
        })
    
    });
    console.log("Alldata",Alldata)
    return Alldata
}

export default {
    data() {
        return {
            count: 200,
            softwareSN: "",
            startIndex: 0,
            ProductNamePartNo: "",
            expectedStartDateEnd: 1668902400000,
            expectedStartDateStart: 1653523200000,
            lastModifyTimeEndDate: null,
            lastModifyTimeStartDate: null,
            machineIDList: [],
            multiSNSearch: "",
            productionProcessList: [],
            listData:[],
            workOrderList: ["20220818000102001", "20220818000202001", "20220818000301001", "20220818000401001"],
            // startIndex: 0
            tableData:[],
            Alldata:Alldata
        };
    },
    methods: {
        search(){
            axios.post('api/v1/Private/SynFactory/ProductionPlan/Search', {
                "ProductNamePartNo": "",
                "count": 200,
                "expectedStartDateEnd": 1669075200000,
                "expectedStartDateStart": 1653696000000,
                "lastModifyTimeEndDate": null,
                "lastModifyTimeStartDate": null,
                "machineIDList": [],
                "multiSNSearch": "",
                "productionProcessList": [],
                "startIndex": 0
            })
                .then(res => {
                    console.log('-----------------')
                    console.log(res.data.content.orderList)
                    this.listData=res.data.content.orderList
                    maplist(res.data.content.orderList)
                    //this.listData=res.data.content.orderList.
                })
                .catch(err => {
                    alert(err)
                })
            // const tableData = [
            // {
            //     orderNumber: '2016-05-03',
            //     productName: 'Tom',
            //     partNumber: 'California',
            //     productionProcess: 'Los Angeles',
            //     requiredThroughput: 'No. 189, Grove St, Los Angeles',
            //     zip: 'CA 90036',
            //     tag: 'Home',
            // },
            // {
            //    orderNumber: '2016-05-03',
            //     productName: 'Tom',
            //     partNumber: 'California',
            //     productionProcess: 'Los Angeles',
            //     requiredThroughput: 'No. 189, Grove St, Los Angeles',
            //     zip: 'CA 90036',
            //     tag: 'Office',
            // },
            // {
            //    orderNumber: '2016-05-03',
            //     productName: 'Tom',
            //     partNumber: 'California',
            //     productionProcess: 'Los Angeles',
            //     requiredThroughput: 'No. 189, Grove St, Los Angeles',
            //     zip: 'CA 90036',
            //     tag: 'Home',
            // },
            // {
            //    orderNumber: '2016-05-03',
            //     productName: 'Tom',
            //     partNumber: 'California',
            //     productionProcess: 'Los Angeles',
            //     requiredThroughput: 'No. 189, Grove St, Los Angeles',
            //     zip: 'CA 90036',
            //     tag: 'Office',
            // },
            // ]
            // this.tableData =tableData
        }
    },
    beforeCreate() {
        axios.post('api/v1/Private/SynFactory/MachineList', {
                "count": 200,
                "softwareSN": "",
                "startIndex": 0
            })
                .then(res => {
                    console.log(res.data.content.machineList)
                this.listData=res.data.content.machineList
                })
                .catch(err => {
                    alert(err)
                })
        axios.post('api/v1/Private/SynFactory/ProductionPlan/Search', {
                "ProductNamePartNo": "",
                "count": 200,
                "expectedStartDateEnd": 1669075200000,
                "expectedStartDateStart": 1653696000000,
                "lastModifyTimeEndDate": null,
                "lastModifyTimeStartDate": null,
                "machineIDList": [],
                "multiSNSearch": "",
                "productionProcessList": [],
                "startIndex": 0
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    alert(err)
                })
        axios.post('api/v1/Private/SynFactory/ProductionPlan/Progress', {
                "workOrderList": ["20220818000102001", "20220818000202001", "20220818000301001", "20220818000401001"]
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    alert(err)
                })

        },

};
</script>
<style></style>
