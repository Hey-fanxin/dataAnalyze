<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1" @on-select="listToLink">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="/">
                            <Icon type="ios-navigate"></Icon>
                            home
                        </MenuItem>
                        <MenuItem name="/analyse">
                            <Icon type="ios-keypad"></Icon>
                            分析
                        </MenuItem>
                        <MenuItem name="/3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="/4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: boxHeight+'px'}">
               <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                boxHeight: 0,
            };
        },
        mounted() {
            let _this = this;
            function h_resize(){
                let h = document.documentElement.clientHeight || document.body.clientHeight;
                _this.boxHeight = h - 64 - 69 - 24 - 2;
            }
            h_resize();
            window.addEventListener('resize',h_resize);
        },
        beforeDestroy() {

        },
        methods: {
            listToLink(name){
                this.$router.push({
                    path: name,
                });
            }
        }
    };
</script>
<style scoped>
   .layout{
       position: relative;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-layout-header{
        position: fixed;
        width: 100%;
        z-index: 999;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
