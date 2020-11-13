<template>
    <div>
        <!-- 头部 -->
        <div class="header_container">
            <!-- 标题 -->
            <div class="title_container">
                <div class="title">购物车</div>
                <div @click="charge = !charge">管理</div>
            </div>
            <!-- 收货地址 -->
            <div class="addressInfo_container">
                <div class="goodsNum">共收到24件宝贝</div>
                <div class="addressInfo">收货地址:112233</div>
            </div>
        </div>
        <!-- main -->
        <div class="main_container">
            <div class="goodsList_container">
                <div
                    class="goodsItem"
                    v-for="(item, index) in goodsList"
                    :key="item.id"
                >
                    <div class="goodsFrom_wrap">
                        <input
                            class="checkbox"
                            :checked="item.checked"
                            type="checkbox"
                            @change="changeInpt(item.goods_id)"
                        />
                        <div class="iconfont icon-tianmao"></div>
                        <div class="fromName">{{ item.goods_from }} ></div>
                    </div>
                    <div class="goodsSale_wrap">
                        <span>跨店满减</span>
                        <span>11.11当天每满300减40,可跨店</span>
                        <span>凑单 ></span>
                    </div>
                    <div class="goodsInfro_wrap">
                        <div class="input">
                            <input
                                class="checkbox"
                                :checked="item.checked"
                                type="checkbox"
                                @change="changeInpt(item.goods_id)"
                            />
                        </div>
                        <div class="goodsImg">
                            <img :src="item.goods_img" alt="" />
                        </div>
                        <div class="goods_info_col">
                            <div class="goods_name">
                                <i class="iconfont icon-shuang"></i>
                                <span>{{ item.goods_name }}</span>
                            </div>
                            <div class="goods_type">
                                {{ item.goods_type }}
                                <i class="iconfont icon-xiajiantou"></i>
                            </div>
                            <div class="smallTip">
                                <span>每300减40</span>
                                <span>全程价保</span>
                            </div>
                            <div class="PriceNum_wrap">
                                <div class="goods_price">
                                    ￥{{ item.goods_price }}
                                </div>
                                <div class="goods_num_wrap">
                                    <div class="edit" @click="add(index, -1)">
                                        -
                                    </div>
                                    <div class="goods_num">
                                        {{ item.goods_num }}
                                    </div>
                                    <div class="edit" @click="add(index, 1)">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer -->
        <div class="footer_container">
            <div class="all_chk_wrap">
                <input
                    class="checkbox"
                    :checked="allChecked"
                    type="checkbox"
                    @change="changeAll"
                />
                <label>全选</label>
            </div>
            <template v-if="charge">
                <!-- 合计 -->
                <div class="total_price_wrap">
                    <div class="total_price">
                        合计：<span class="total_price_text">{{
                            totalPrice
                        }}</span>
                    </div>
                </div>
                <!-- 结算 -->
                <div class="order_pay_wrap">结算（{{ totalNum }}）</div>
            </template>
            <template v-else>
                <div class="cc">
                    <div class="clear">清理</div>
                    <div class="collect">移入收藏夹</div>
                </div>
                <div class="delect" @click="deleteCart">删除</div>
            </template>
        </div>
    </div>
</template>

<script>
import "@/lib/iconfont.css";
export default {
    data() {
        return {
            goodsList: [
                {
                    goods_id: 1,
                    goods_name: "黑色卫裤男哈伦裤收口直筒裤子",
                    goods_from: "吾先绅旗舰店",
                    goods_type: "黑色；M",
                    goods_price: 106,
                    goods_num: 1,
                    checked: true,
                    goods_img:
                        "http://image1.suning.cn/uimg/b2c/newcatentries/0070134290-000000000149003877_1_400x400.jpg",
                },
                {
                    goods_id: 2,
                    goods_name:
                        "美特斯邦威针织衫男士2017秋冬季新款条纹显瘦基本高领毛衣学生6019536488",
                    goods_from: "吾女士旗舰店",
                    goods_type: "标准款-橄榄绿；M",
                    goods_price: 85,
                    goods_num: 1,
                    checked: true,
                    goods_img:
                        "http://image5.suning.cn/uimg/b2c/newcatentries/0070160068-000000000681043886_2_400x400.jpg",
                },
                {
                    goods_id: 3,
                    goods_name:
                        "美特斯邦威针织衫男士2017秋冬季新款条纹显瘦基本高领毛衣学生6019536488",
                    goods_from: "吾女士旗舰店",
                    goods_type: "标准款-橄榄绿；M",
                    goods_price: 85,
                    goods_num: 2,
                    checked: true,
                    goods_img:
                        "http://image5.suning.cn/uimg/b2c/newcatentries/0070160068-000000000681043886_2_400x400.jpg",
                },
                {
                    goods_id: 4,
                    goods_name:
                        "美特斯邦威针织衫男士2017秋冬季新款条纹显瘦基本高领毛衣学生6019536488",
                    goods_from: "吾女士旗舰店",
                    goods_type: "标准款-橄榄绿；M",
                    goods_price: 85,
                    goods_num: 1,
                    checked: true,
                    goods_img:
                        "http://image5.suning.cn/uimg/b2c/newcatentries/0070160068-000000000681043886_2_400x400.jpg",
                },
            ],
            totalPrice: 0,
            totalNum: 0,
            allChecked: false,
            charge: true,
        };
    },
    created() {
        // let allChecked = this.goodsList.length?this.goodsList.every(v=>v.checked):false;
        // this.allChecked = allChecked;
        this.setCart();
    },
    methods: {
        changeInpt(e) {
            this.goodsList.forEach((item) => {
                item.checked =
                    item.goods_id === e ? !item.checked : item.checked;
            });
            this.setCart();
        },
        setCart() {
            let allChecked = true;
            let totalPrice = 0,
                totalNum = 0;
            this.goodsList.forEach((item) => {
                if (item.checked) {
                    totalPrice += item.goods_price * item.goods_num;
                    totalNum += item.goods_num;
                } else {
                    allChecked = false;
                }
            });
            allChecked = this.goodsList.length ? allChecked : false;
            this.totalPrice = totalPrice;
            this.totalNum = totalNum;
            this.allChecked = allChecked;
        },
        deleteCart(){
            if(this.allChecked){
                this.goodsList = [];
            }else{
                this.goodsList = this.goodsList.filter(item=>item.checked===false);
            }
        },
        //全选功能
        changeAll() {
            this.allChecked = !this.allChecked;
            this.goodsList.forEach((item) => {
                item.checked = this.allChecked;
            });
            this.setCart();
        },
        //增减功能
        add(index, b) {
            // let index = this.goodsList.findIndex(
            //     (item) => item.goods_id === id
            // );
            if (this.goodsList[index].goods_num === 1 && b === -1) {
                this.goodsList[index] = this.goodsList[
                    this.goodsList.length - 1
                ];
                this.goodsList.length--;
            } else {
                this.goodsList[index].goods_num += b;
            }
            this.setCart();
        },
    },
};
</script>

<style lang="less" scoped>
.header_container {
    background-color: rgb(254, 1, 55);
    color: white;
    height: 200px;
    padding: 30px 20px 0 20px;
    .title_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        .title {
            font-size: 24px;
            white-space: nowrap;
        }
    }
    .addressInfo_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .addressInfo {
            margin-left: 10px;
            padding: 20px 0;
        }
    }
}

.main_container {
    // background-color: #ccc;
    // height: calc(100vh - 200px);
    width: 100%;
    padding-bottom: 45px;
    position: relative;
    .goodsList_container {
        position: absolute;
        top: -75px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgb(240, 240, 240);
        width: 95%;
        border-radius: 10px;

        // padding: 10px;
        .goodsItem:last-child {
            margin-bottom: 110px;
        }
        .goodsItem {
            width: 100%;
            background-color: #fff;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;

            .goodsFrom_wrap {
                display: flex;
                align-items: center;
                padding: 10px 0;
                input {
                    width: 20px;
                    height: 22px;
                }
                .checkbox:checked {
                    background: #1673ff;
                }
                .checkbox {
                    width: 25px;
                    height: 25px;
                    background-color: #ffffff;
                    border: solid 1px #dddddd;
                    -webkit-border-radius: 50%;
                    border-radius: 50%;
                    font-size: 0.8rem;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    display: inline-block;
                    vertical-align: top;
                    cursor: default;
                    -webkit-appearance: none;
                    -webkit-user-select: none;
                    user-select: none;
                    -webkit-transition: background-color ease 0.1s;
                    transition: background-color ease 0.1s;
                }
                .checkbox:checked::after {
                    content: "";
                    top: 5px;
                    left: 5px;
                    position: absolute;
                    background: transparent;
                    border: #fff solid 2px;
                    border-top: none;
                    border-right: none;
                    height: 6px;
                    width: 10px;
                    -moz-transform: rotate(-45deg);
                    -ms-transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }
                .icon-tianmao {
                    color: rgb(255, 11, 73);
                    margin: 0 10px;
                    font-size: 20px;
                }
                .fromName {
                    font-weight: 600;
                }
            }
            .goodsSale_wrap {
                margin: 20px 0 20px 13px;
                font-size: 13px;

                span {
                    padding: 2px;
                }

                span:nth-child(1) {
                    font-size: 12px;
                    border: 1px solid red;
                    border-radius: 2px;
                    color: red;
                    margin-right: 4px;
                }
                span:last-child {
                    margin-left: 4px;
                    color: rgb(252, 103, 6);
                }
            }
            .goodsInfro_wrap {
                display: flex;
                justify-content: flex-start;
                .input {
                    margin-top: 30px;
                    input {
                        height: 22px;
                        width: 20px;
                        -webkit-appearance: radio;
                    }
                    .checkbox:checked {
                        background: #1673ff;
                    }
                    .checkbox {
                        width: 25px;
                        height: 25px;
                        background-color: #ffffff;
                        border: solid 1px #dddddd;
                        -webkit-border-radius: 50%;
                        border-radius: 50%;
                        font-size: 0.8rem;
                        margin: 0;
                        padding: 0;
                        position: relative;
                        display: inline-block;
                        vertical-align: top;
                        cursor: default;
                        -webkit-appearance: none;
                        -webkit-user-select: none;
                        user-select: none;
                        -webkit-transition: background-color ease 0.1s;
                        transition: background-color ease 0.1s;
                    }
                    .checkbox:checked::after {
                        content: "";
                        top: 5px;
                        left: 5px;
                        position: absolute;
                        background: transparent;
                        border: #fff solid 2px;
                        border-top: none;
                        border-right: none;
                        height: 6px;
                        width: 10px;
                        -moz-transform: rotate(-45deg);
                        -ms-transform: rotate(-45deg);
                        -webkit-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                    }
                }
                .goodsImg {
                    width: 90px;
                    height: 90px;
                    margin-left: 15px;
                    margin-right: 15px;
                    img {
                        width: 100%;
                        height: 100%;
                        background-color: #ccc;
                    }
                }
                .goods_info_col {
                    display: flex;
                    flex-direction: column;
                    .goods_name {
                        font-size: 12px;
                        .icon-shuang {
                            padding: 0 2px;
                            margin-right: 2px;
                            background-color: rgb(255, 2, 60);
                            color: white;
                        }
                    }
                    .goods_type {
                        height: 50px;
                        line-height: 50px;
                        color: #ccc;
                        font-size: 14px;
                        .icon-xiajiantou {
                            font-size: 5px !important;
                            vertical-align: middle;
                        }
                    }
                    .smallTip {
                        font-size: 12px;
                        color: red;
                        span {
                            border: 1px solid red;
                            margin-right: 3px;
                            border-radius: 2px;
                            padding: 0 2px;
                        }
                        span:nth-child(1) {
                            letter-spacing: 1px;
                        }
                    }
                    .PriceNum_wrap {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;
                        .goods_price {
                            color: rgb(252, 85, 5);
                            font-size: 15px;
                            font-weight: 600;
                        }
                        .goods_num_wrap {
                            display: flex;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            text-align: center;
                            line-height: 25px;
                            .edit {
                                width: 25px;
                            }
                            .goods_num {
                                border-left: 1px solid #ccc;
                                border-right: 1px solid #ccc;
                                width: 45px;
                                height: 25px;
                            }
                        }
                    }
                }
            }
        }
    }
}

.footer_container {
    display: flex;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 10px 12px;
    .all_chk_wrap {
        flex: 1;
        display: flex;
        align-items: center;
        .checkbox:checked {
            background: #1673ff;
        }
        .checkbox {
            width: 25px;
            height: 25px;
            background-color: #ffffff;
            border: solid 1px #dddddd;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            font-size: 0.8rem;
            margin: 0;
            padding: 0;
            position: relative;
            display: inline-block;
            vertical-align: top;
            cursor: default;
            -webkit-appearance: none;
            -webkit-user-select: none;
            user-select: none;
            -webkit-transition: background-color ease 0.1s;
            transition: background-color ease 0.1s;
        }
        .checkbox:checked::after {
            content: "";
            top: 5px;
            left: 5px;
            position: absolute;
            background: transparent;
            border: #fff solid 2px;
            border-top: none;
            border-right: none;
            height: 6px;
            width: 10px;
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
        label {
            font-size: 14px;
            margin-left: 10px;
        }
    }
    .total_price_wrap {
        flex: 2;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;

        .total_price_text {
            color: rgb(254, 132, 0);
        }
    }
    .order_pay_wrap {
        flex: 1;
        height: 40px;
        line-height: 40px;
        border-radius: 35px;
        text-align: center;
        padding-left: 5px;
        color: #fff;
        font-weight: 500;
        background: linear-gradient(
            rgb(247, 141, 6),
            rgb(251, 117, 6),
            rgb(251, 96, 4),
            rgb(252, 84, 7)
        );
    }
    .cc {
        flex: 3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 14px;

        .clear {
            font-size: 13px;
        }
        .collect {
            border: 1px solid rgb(190, 140, 32);
            border-radius: 15px;
            padding: 2px 5px;
            color: rgb(190, 140, 32);
            margin-left: 10px;
        }
    }
    .delect {
        flex: 1;
        border: 1px solid red;
        border-radius: 15px;
        padding: 2px 5px;
        color: red;
        margin: 6px 0 6.5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>