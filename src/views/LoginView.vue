<template>
    <h4>获取数据</h4>
    <div>
        <div>
            <div ref="roll" style="height: 110px;overflow: hidden;margin:20px;">
                <div v-for="item in listData"  :key="item.id">
                    <span>{{item.machineID}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="reportwork"></div>
    <div class="workorder"></div>
    
    <div class="workorderstatus"></div>

</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
// axios.defaults.baseURL = '/api'
//  let state =reactive({
//         listData:[]
//     })
let listData = ref([])
 
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
            workOrderList: ["20220818000102001", "20220818000202001", "20220818000301001", "20220818000401001"]
            // startIndex: 0
        };
    },
    methods: {
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
                "expectedStartDateEnd": 1668902400000,
                "expectedStartDateStart": 1653523200000,
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
<style>
</style>