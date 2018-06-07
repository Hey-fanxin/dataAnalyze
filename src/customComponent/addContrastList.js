import Vue from 'vue';
import _ from 'lodash';

Vue.component('add-contrast-list', {
    props: ['count'],
    data: function () {
        return {
            counts: this.count,
            stateType: false,               //  组件的显示开关
            isAddBtn: true,
            posts: [
                {
                    value: '1',
                    label: '所有用户'
                },
                {
                    value: 'London',
                    label: '360 手机助手'
                },
                {
                    value: 'Sydney',
                    label: '安卓市场'
                },
                {
                    value: 'Ottawa',
                    label: '次日留存用户'
                },
                {
                    value: 'Paris',
                    label: '次日流失用户群体'
                },
                {
                    value: 'Canberra',
                    label: '成功签到'
                }
            ],
        }
    },
    beforeCreate(){
        console.log(this.counts, 'beforeCreate')
    },
    created(){
        console.log(this.counts, 'created')
    },
    beforeMount(){
        console.log(this.counts, 'beforeMount')
    },
    methods:{
        isBtnShwo(){
            this.isAddBtn = this.counts.length > 3 ? !this.isAddBtn : this.isAddBtn;
        },
        addLiatTag(){
            this.counts.push({name:'请选择用户群'});
            this.isBtnShwo()
        },
        clearListTag(i){
            this.isBtnShwo();
            if(this.counts.length > 1){
               this.counts.splice(i,1); 
            }else{
                this.$Notice.warning({title: '最少保留一个条件'})
            }
        },
        selectChange(val,i){
            let o = {name: val.label, value: val.value}
            this.counts.splice(i,1,o);
        },
        formSubmit(){
            this.stateType = !this.stateType;
            let arr =  _.uniqWith(this.counts, _.isEqual);
            if(arr.length != this.counts.length){
                this.$Notice.warning({title: '不能选择重复的条件'})
            }else{
                let l = _.remove(arr, n => {
                    return n.name == "请选择用户群";
                });
                this.$emit('callBack', this.stateType, arr)
            }
        }
    },
    template: `
        <Card> 
            <Row  type="flex" justify="start" class="code-row-bg">
                <h4 style="padding:0 4px;height:32px;lineHeight:32px;">分析用户群:</h4>
                <Col v-for="(keys, i) in counts" :key="i"  style="width:230px">
                    <Select filterable label-in-value @on-change="(rs) => selectChange(rs,i)" v-bind:placeholder="keys.name" v-bind:label="keys.name"  style="width:180px;">
                        <Option v-for="item in posts" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <i class="ivu-icon ivu-icon-close" v-on:click="clearListTag(i)"></i>
                </Col>
                <Button v-if="isAddBtn" icon="ios-plus-empty" type="dashed" size="default" @click="addLiatTag">添加用户群做对比</Button>
            </Row>
            <p style="width:100%;textAlign:right;paddingTop:20px;"> <Button type="primary" v-on:click="formSubmit">确认</Button> </p>
        </Card>
    `,
})

var str = `所有用户
        360 手机助手
        安卓市场
        次日留存用户
        次日流失用户群体
        成功签到
        看过5次商品
        游客用户群
        评估者
        实名用户
        投资用户
        复购用户
        新投者用户
        已支付1次用户
        华夏银行客户
        开户成功用户
        360 渠道
        最近7天活跃用户`;

"http : //api.datacenter.com/event/time"
"http : //api.datacenter.com/event/dimensions"
"http : //api.datacenter.com/event/types"
"http : //api.datacenter.com/event/possible-value?dimension_sub=INFO_SOURCE"

"http://api.datacenter.com/dimension/view?value=INFO_SOURCE 代替 http://api.datacenter.com/event/possible-value?dimension_sub=INFO_SOURCE函数"
let post = {
    "time": {
        "gte": 1,
        "lte": 1525663079666,
        "interval": "1d"
    },
    "eventType": 1,
    "filters": [
        {
            "key": "INFO_SOURCE",
            "value": "微信",
            "operator": "equal",
            "type": "keyword"
        },
        {
            "key": "REMARK",
            "value": "",
            "operator": "not null",
            "type": "text"
        }
    ]
}
let post1 = {
    "time": {
        "gte": 1,
        "lte": 1525663079666,
        "interval": "1d"
    },
    "eventType": 1,
    "dimension_sub": "INFO_SOURCE",
    "filters": [
        {
            "key": "REMARK",
            "value": "糖尿病",
            "operator": "contain",
            "type": "text"
        }
    ]
}