<template>
    <div>
        <div class="analy-class-list" v-if="isFormList"  @click="formShow">
            <Card key="form_h">
                <h4>分析用户群: 
                    <Tag v-for="(item, i) in count" :key="i" :name="i" type="dot">{{item.name}}</Tag>
                </h4>
            </Card>
        </div>  
        <div v-if="!isFormList" >
            <add-contrast-list :count="count" v-on:callBack="contrastBack"></add-contrast-list>
        </div>
        <div class="filter-box">
            <div class="filter-list-box">
                <div class="filter-list">
                    <label for="">指标：</label>
                    <Select :value="filter_zhibiao[0]"  style="width:200px">
                        <Option v-for="(item, i) in filter_zhibiao" :key="i" :value="item">{{item}}</Option>
                    </Select>
                </div>
                <div class="filter-list" style="paddingLeft:20px;">
                    <label for="">按属性细分：</label>
                    <Select style="width:200px" clearable filterable>
                        <OptionGroup v-for="(items, k) in filter_attr" v-bind:key="k" v-bind:label="items.title">
                            <Option v-for="(item, i) in items.data" :value="item.text" :key="i">{{ item.text }}</Option>
                        </OptionGroup>
                    </Select>
                </div>
            </div>
            <AddFilterAttr :filterData="filter_attr" @changBack="filterAttrBack"></AddFilterAttr>
            <p style="width:100%;textAlign:right;padding:20px 20px 10px 0;"> <Button type="primary" v-on:click="formSubmit">查询</Button> </p>
        </div>
        <div class="chart-box">
            <div class="chart-title">
                <Select :value="timer[0]['value']"  style="width:200px">
                    <Option v-for="(item, i) in timer" :key="i" :value="item.value">{{item.label}}</Option>
                </Select>
                <span style="paddingLeft:10px;">
                    <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                </span>
            </div>
            <div class="chart-conent">
                <div id="chartbox"></div>
            </div>
        </div>
    </div>
</template>
<script>
import AddFilterAttr from '../widgets/AddFilterAttr';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import axios from 'axios';
let timer = [
    {label:'按小时', value: 'h'},
    {label:'按天', value: 'd'},
    {label:'按周', value: 'w'},
    {label:'按月', value: 'm'}
]
let filter_zhibiao = ["新增用户", "活跃用户", "访问次数", "平均使用时长", "使用时长分布"];

let filter_attr = [
    {
        title:"触发环境",
        data: [
            {icon:'',text:"版本"},
            {icon:'',text: "渠道"},
            {icon:'',text:"国家"},
            {icon:'',text: "省份"},
            {icon:'',text:"城市"},
            {icon:'',text: "网络"},
            {icon:'',text:"运营商"},
            {icon:'',text: "设备品牌"}
        ]
    },{
        title:"用户属性",
        data:[
            {icon:'',text:"名称"},
            {icon:'',text: "实名/匿名"},
            {icon:'',text:"诸葛ID"},
            {icon:'',text: "最后一次访问时间"},
            {icon:'',text:"近30天访问次数"},
            {icon:'',text: "国家"},
            {icon:'',text:"性别"},
            {icon:'',text: "年龄"}
        ]
    }
]
               
export default {
    data(){
        return {
            filter_zhibiao,
            filter_attr,
            count: [{
                value: '1',
                name: '所有用户'
            }],
            isFormList: true,
            timer,
            options2: {
                shortcuts: [
                    {
                        text: '1 week',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '1 month',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '3 months',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            }
        }
    },
    beforeMount(){
        //console.log(this.count, 'created')
        axios.get('./world.geo.json').then(mapData =>{
            console.log(mapData)
            mapData = mapData.data;
            var chart = new G2.Chart({
                container: 'chartbox',
                forceFit: true,
                padding: [55, 20]
            });
            chart.tooltip({
                showTitle: false
            });
            // 同步度量
            chart.scale({
                longitude: {
                sync: true
                },
                latitude: {
                sync: true
                }
            });
            chart.axis(false);
            chart.legend('trend', {
                position: 'left'
            });

            // 绘制世界地图背景
            var ds = new DataSet();
            var worldMap = ds.createView('back').source(mapData, {
                type: 'GeoJSON'
            });
            var worldMapView = chart.view();
            worldMapView.source(worldMap);
            worldMapView.tooltip(false);
            worldMapView.polygon().position('longitude*latitude').style({
                fill: '#fff',
                stroke: '#ccc',
                lineWidth: 1
            });

            // 可视化用户数据
            var userData = [{
                    name: 'Russia',
                    value: 86.8
                }, {
                    name: 'China',
                    value: 106.3
                }, {
                    name: 'Japan',
                    value: 94.7
                }, {
                    name: 'Mongolia',
                    value: 98
                }, {
                    name: 'Canada',
                    value: 98.4
                }, {
                    name: 'United Kingdom',
                    value: 97.2
                }, {
                    name: 'United States of America',
                    value: 98.3
                }, {
                    name: 'Brazil',
                    value: 96.7
                }, {
                    name: 'Argentina',
                    value: 95.8
                }, {
                    name: 'Algeria',
                    value: 101.3
                }, {
                    name: 'France',
                    value: 94.8
                }, {
                    name: 'Germany',
                    value: 96.6
                }, {
                    name: 'Ukraine',
                    value: 86.3
                }, {
                    name: 'Egypt',
                    value: 102.1
                }, {
                    name: 'South Africa',
                    value: 101.3
                }, {
                    name: 'India',
                    value: 107.6
                }, {
                    name: 'Australia',
                    value: 99.9
                }, {
                    name: 'Saudi Arabia',
                    value: 130.1
                }, {
                    name: 'Afghanistan',
                    value: 106.5
                }, {
                    name: 'Kazakhstan',
                    value: 93.4
                }, {
                    name: 'Indonesia',
                    value: 101.4
                }
            ];
            var userDv = ds.createView().source(userData).transform({
                geoDataView: worldMap,
                field: 'name',
                type: 'geo.region',
                as: ['longitude', 'latitude']
            }).transform({
                type: 'map',
                callback: function callback(obj) {
                obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
                return obj;
                }
            });
            var userView = chart.view();
            userView.source(userDv, {
                'trend': {
                alias: '每100位女性对应的男性数量'
                }
            });
            userView.polygon().position('longitude*latitude').color('trend', ['#F51D27', '#0A61D7']).opacity('value').tooltip('name*trend').animate({
                leave: {
                animation: 'fadeOut'
                }
            });
            chart.render();
        });
    },
    methods:{
        formShow(){
            this.isFormList = !this.isFormList;
        },
        contrastBack(is, counts){
            this.isFormList = is;
            this.count = counts;
            console.log(counts)
        },
        formSubmit(){

        },
        filterAttrBack(data){
            console.log(data,'filter back data');
        }
    },
    components: {
        AddFilterAttr
    }
}
</script>
<style scoped>
    .filter-box,.chart-box{
        border-radius: 3px;
        background: #e6e6e6;
        position: relative;
        margin-top:10px;
    }
    .filter-list-box{
        color: #565656;
        font-size: 14px;
        clear: both;
        padding: 10px 14px;
        position: relative;
        line-height: 32px;
    }
    .filter-list{
        display:inline-block;
    }
    .chart-title{
        padding: 8px 10px;
    }
    .chart-conent{
        background: #fff;
    }
</style>


