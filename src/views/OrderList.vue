<template>
  <h4>工单信息</h4>
  <div class="handle-box">
        <el-input v-model="searchProcess" placeholder="名称"  clearable @clear="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
    </div>

  <div class="reportwork"></div>

  <div class="workorder">
    <el-table :data="listData" style="width: 100%">
      <el-table-column fixed prop="orderNumber" label="工单号" />
      <el-table-column fixed prop="customerName" label="客户名称" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="partNumber" label="产品料号" />
      <el-table-column prop="requiredThroughput" label="需求工件数" />
      <el-table-column prop="productionProcess" label="工序" />
    </el-table>
  </div>

  <div class="workorderstatus"></div>
</template>

<script>
import axios from 'axios'

//查询操作
// const onSubmit = () => {
    
// }

//遍历API获取想要的字段
let DataOrdList=[]
const maplist =(parma)=> {
    parma.forEach(element => {
        const orderNumber=element.orderNumber?element.orderNumber:''
        const customerName=element.customerName
        element.productionOrderList.forEach((item)=>{
            const productName=item.productName
            const partNumber=item.partNumber
            item.workOrderContent.forEach((item1)=>{
                const requiredThroughput=item1.requiredThroughput
                const productionProcess=item1.productionProcess
                DataOrdList.push({"orderNumber":orderNumber,"customerName":customerName,"productName":productName,"partNumber":partNumber,"requiredThroughput":requiredThroughput,"productionProcess":productionProcess})
            })
        })
    });
    console.log(DataOrdList);
    return DataOrdList
}

export default {
    data() {
        return {
            listData:[],
            searchData:[],
            searchProcess:'',
            DataOrdList: DataOrdList
        };
    },
    beforeCreate(){
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
                    // console.log(res.data.content.orderList)
                    this.listData= maplist(res.data.content.orderList)

                    //maplist(res.data.content.orderList)
                    //console.log(this.listData.productionProcess);
                })
                .catch(err => {
                    alert(err)
                })  
    },
    methods: {
        search(){
            const testProcess = this.searchProcess,
            // this.listData.forEach(response => {
            //     if(testProcess === response.productionProcess){
            //         this.searchData.push(response)
            //         console.log('完成一次对比')
            //     }
            // });
            for (let list in this.listData) {
                if (this.searchProcess == list.productionProcess){
                    this.searchData.push(list)
                }
                    
            }
            console.log('搜索')
            console.log(this.searchData)
        }
    }
};
</script>
<style>
    el-table{
       text-align: center; 
    }
</style>
