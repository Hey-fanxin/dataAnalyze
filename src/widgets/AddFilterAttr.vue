<template>
    <div class="filter-attr-box">
        <div class="filter-attr-list" v-for="(model, j) in modules" :key="j">
            <div>
                <label>筛选：</label>
                <Select v-model="model['name']" style="width:200px" clearable filterable>
                    <OptionGroup v-for="(items, k) in filter_attr" v-bind:key="k" v-bind:label="items.title">
                        <Option v-for="(item, i) in items.data" :value="item.text" :key="i">{{ item.text }}</Option>
                    </OptionGroup>
                </Select>
            </div>
            <div>
                <Select v-model="model['stes']" style="minWidth:100px;">
                    <Option v-for="(item, i) in stes" :value="item" :key="i">{{ item }}</Option>
                </Select>
            </div>
            <div>
                <Select v-model="model['options']" multiple style="minWidth:100px;">
                    <Option v-for="item in filter_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <Button size="small" shape="circle" icon="close" @click="moveFilterAttrList(j)"></Button>
        </div>
        <div v-if="isAddFilterBtn" class="add-filter-btn">
            <p style="padding:20px 20px 0 50px;"> <Button v-on:click="AddFilterAttrList">+ 添加筛选</Button> </p>
        </div>
    </div>
</template>
<script>
let stes = ["是","包含","不是","不包含","开头是","结尾是","开头不是","结尾不是","是空值","不是空值"];
let arr2 =["豌豆荚","360手机助手","合作渠道2","91助手","合作渠道1","安卓市场","UC应用商店"];
let filter_options = [
    {
        value: 'New York',
        label: 'New York'
    },
    {
        value: 'London',
        label: 'London'
    },
    {
        value: 'Sydney',
        label: 'Sydney'
    },
    {
        value: 'Ottawa',
        label: 'Ottawa'
    },
    {
        value: 'Paris',
        label: 'Paris'
    },
    {
        value: 'Canberra',
        label: 'Canberra'
    }
]
let modules = [
    {
        name: '',
        stes: '是',
        options: []
    }
]
export default {
    name: 'AddFilterAttr',
    props: ['filterData'],
    data(){
        return{
            isAddFilterBtn: true,
            modules,
            filter_attr: this.filterData,
            filter_options,
            stes,
            moduleList: 0
        }
    },
    methods: {
        AddFilterAttrList() {
            if(this.modules.length >= 4){
                this.isAddFilterBtn = false;
            }
            if(this.modules[this.moduleList].options.length != 0){
                this.modules.push({
                    name: '',
                    stes: '是',
                    options: []
                });
                this.moduleList += 1;
            }
        },
        moveFilterAttrList(i) {
            if(this.modules.length <= 1){
                return false;
            }
            this.isAddFilterBtn = true;
            this.modules.splice(i, 1);
            this.moduleList -= 1;
        }
    },
    watch: {
        modules: {
            handler: function(newV, oldV){
                this.$emit('changBack', newV)
            },
            deep: true 
        }
    }

}
</script>
<style scoped>
    .filter-attr-box{
        padding-top: 15px;
        padding-left: 325px;
    }
    .filter-attr-list{
        padding:10px 0;
    }
    .filter-attr-list>div{
        display: inline-block;
        padding-left:10px;
    }
    .ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small {
        font-size: 12px;
        margin-left: 10px;
    }
</style>


