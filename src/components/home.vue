<template>
    <div id="home">
        <v-banner></v-banner>
        <v-personalized></v-personalized>
        <v-dailyPush v-if="this.$store.state.isLogin!=0"></v-dailyPush>
        <!--榜单  -->
        <div class="title">
            <h2>今&emsp;日&emsp;风&emsp;云</h2>
        </div>
        <div class="rank">
            <v-rankingList :list="list1" :itemList="itemList1" ></v-rankingList>
            <v-rankingList :list="list2" :itemList="itemList2" ></v-rankingList>
            <v-rankingList :list="list3" :itemList="itemList3" ></v-rankingList>
            <v-rankingList :list="list4" :itemList="itemList4" ></v-rankingList>
        </div>

    </div>
</template>
<script>
    import vBanner from "./banner";
    import vPersonalized from "./personalized";
    import vDailyPush from "./dailyPush";    
    import vRankingList from './rankingList';
    export default{
        data(){
            return{
                // songsUrl:'',
                list1:[],
                itemList1:[],
                list2:[],
                itemList2:[],
                list3:[],
                itemList3:[],
                list4:[],
                itemList4:[],
                // musicTime:""
            }
        },
        components: {
            vBanner,
            vPersonalized,
            vDailyPush,
            vRankingList 
        },
        methods: { 
            // 获取榜单数据
            getData(idx,list,itemList){  
                this.$axios.get('http://118.24.90.238:3000/top/list?idx='+idx).then((res)=>{
                this[list] = res.data.playlist;                         
                this[itemList] = this[list].tracks.slice(0,10);                        
                }).catch((error)=>{
                    console.log(error);
                })      
            }
        },
        mounted () {
            // idx=>榜单
            this.getData(3,'list1','itemList1');
            this.getData(2,'list2','itemList2');
            this.getData(1,'list3','itemList3');
            this.getData(4,'list4','itemList4');
        }
    }
</script>
<style lang="scss" scoped>
     .title{
        height: 80px;
        font-size: 20px;
        margin-top: 30px;
        h2{
            text-align: center;
        }
    }
    .rank{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1040px;
    margin: 0 auto 30px auto;
  }
</style>
