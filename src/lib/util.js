


// const serverUrl= 'https://appapibeta.cuco.cn';
const serverUrl = 'https://callphone.cuco.cn'
var token = '';

const url = {
    getCarTypeSearchList: '/car/list/filterCondition', // 搜索车型列表
    getCarTypeList: '/car/list/byFilterCondition', // 通过筛选条件查找
    getCarTypeDetail: '/findCarInfoByCarTypeId',// 车辆详情
    getParkList: '/member/park/list', // 车库列,
    getcarBrand: '/car/list/carBrand',// 车库品牌
    byCategory:  '/car/v2/list/all/byCategory', // 车辆列表
    deletePark:   '/member/park/delete', // 删除车库
    addPark:      '/member/park/add', // 添加
    memberPackageList: '/cityPackage/list', //  个人 企业  定制 套餐列表 
    wechatPay: '/wechat/pay/payment', // 微信支付
    getPackageInfo: '/rightsAndInterests/getCarMessByInterestAndBrand', // 套餐详情
    couponList: '/personal/member/coupon/list',  // 卡券
    memberDeposit: '/personal/member/cashDeposit/consume/detail',  // 违损保证金
    orderListApi:'/personal/member/order/list', //订单列表
    violationList: '/violation/list', //违章列表
    violationDetail: '/violation/detail', // 违章详情
    getOpenId: '/wechat/getOpenId', // 获取openid
    cardCouponRecordPage: '/personal/member/coupon/detail', // 折返卡流水
    getPhoneNumber: '/wechat/getPhoneNumber',// 获取手机号
    cancelConfirm: '/order/cancelConfirm',// 是否有待支付订单
    launchCarUsed:'/order/launchCarUsed',// 发起用车 operatorType: 0
    updateCarUsed:'/order/updateCarUsed',// 修改用车  operatorType:1

    cancelOrder:  '/order/cancelCarUsed',// 取消用车
    carUserDetail: '/order/getCarUsedDetails',// 订单详情
    ppoeDial: '/ppoe/provideVirtualNumber', // 虚拟拨号
    couponAllPage: '/personal/member/coupon/listPage',// 全部卡券
    memberLogin: '/member/login', // 登陆
    myPackageBanner: '/personal/member/package/list', // 我的套餐
    myPackageDetailList: '/personal/member/package/detail', // 套餐详情
    getMemberInfo: '/wechat/getMemberInfoByXcxOpenId',  //保存手机号
    getCodeSms: '/member/send/code', // 获取验证码
    usedCarPayment: '/order/usedCarPayment',// 余额支付
    postponeConfirm: '/order/postponeConfirm',// 选择天次验证是否延期
    uploadFrontIdCard: '/personal/member/uploadFrontIdCard', // 上传身份证正面
    uploadBackIdCard: '/personal/member/uploadBackIdCard', //  身份证反面
    saveMemberInfo: '/personal/member/info/uploadMemberInfo', // 保存身份证 & 驾驶证
    uploadDrivingLicense: '/personal/member/info/uploadDrivingLicenseOriginal', // 驾驶证正面
    uploadDrivingLicenseCopy: '/personal/member/info/uploadDrivingLicenseCopy', // 驾驶证反面
    authSubmit: '/personal/member/authentication/submit', // 提交认证
    memberCardIdInfo: '/personal/member/info', // 身份证 & 驾驶证 信息回显
    listCarList: '/order/listByCarTypeId', // 车库订单列表
    isFences: '/city/isFences',
    rightsInterestsSeek: '/rightsAndInterests/createOrderForMemberBuyDaysRightsInterests', //销售意向提交
    openCityList: '/city/openCityList', // 城市列表
    getListAndStock: '/car/carlist/getListAndStock', //无库存列表 
    depositValid: '/memberDepositValid',
    sendMessage: '/member/sendMessageToSaler', //发送短信
    onceUsedCar: '/car/list/onceIsOpenCarTypeList', //今日体验
    onceIsOpenCarTypeList: '/car/list/onceIsOpenCarTypeList', // 单日体验车型列表
    onceUsedCarNotice: '/car/oncePackage/onceUsedCarNotice', // 今日体验页面体验车型说明
    subscribe: '/car/subscribe', // 服务器约车时间

    getGiveCard: '/rightsAndInterests/getCarMessByInterestAndBrand',
    

}

import wepy from 'wepy';


// import Toast from '../components/vant/toast/toast';


const setStorageSync = (key, value) => {
    try {
       return  wx.setStorageSync(key, value)
    } catch(e) {
        console.log(e)
    }
}

const getStorageSync = (key) => {
    try {
        return wx.getStorageInfoSync();
    } catch(e) {
        console.log(e)
    }
    
}

const getRequest = function(url, method, data) {
    // console.log(getStorageSync())
    // console.log(wx.getStorageInfoSync('token'))
    return new Promise(function (resolve, reject) { 
        wepy.request({
            url: serverUrl +url,
            method: method,
            data: data,
            header: {
            'Content-Type': 'application/json',
            'token': getStorageSync('token') || ''
            },
            success: function (res) {
                 // Toast({
                 //     duration: 100000,
                 //     message: res.data.message
                 // })
                if (res.data.code == '1000' && res.data.message == '账号未登录') {
                    wx.navigateTo({
                        url: './login'
                    })
                }
                if(res.data.code !== '0000') {
                    wx.showToast({
                        title: res.data.message || '接口请求失败',
                        icon: 'loading',
                        duration: 5000
                    })
                }  
                resolve(res.data)
 
            },
            fail: function (res) {
                reject(res)
                console.log("failed");
            }
         })
        
   })
}

const formatTime = function(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

 /*
    * 倒计时
    *
    * countTime 剩余支付秒数
    * callback  回调
    *
    * */
   // 防抖
   function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    function throttle(func, gapTime){
    if(typeof func !== 'function') {
        throw new TypeError('need a function');
    }
    gapTime = +gapTime || 0;
    let lastTime = 0;
    
    return function() {
        let time = + new Date();
        if(time - lastTime > gapTime || !lastTime) {
            func();
            lastTime = time;
        }
    }
}
   function getCountTime(countTime, callback) {
        
        let self = this,
            countDownTime = 0,
            countNumber = countTime,
            m = Math.floor(countNumber / 60),
            s = Math.floor(countNumber % 60);

        if (m < 10) {
            m = "0" + m
        }
        if (s < 10) {
            s = "0" + s
        }

        countDownTime = m + ' : ' + s;

        // if(countNumber <= 0) {
        //     return false;
        // }
        var timer = setInterval(() => {
            countNumber--;

            m = Math.floor(countNumber / 60);
            s = Math.floor(countNumber % 60);
            if (m < 10) {
                m = "0" + m
            }
            if (s < 10) {
                s = "0" + s
            }
        
            countDownTime = m + " : " + s;
            
            if (countNumber <= 0) {
                clearInterval(timer);
            }
            // countNumber 秒数
            // countDownTime 倒计时 格式--：--
            return callback(countNumber, countDownTime, timer);

        }, 1000)

    }

    
    
    export   {
        url, // api url
        getRequest,   // ajax
        formatTime,   // format
        getCountTime, // 倒计时
        setStorageSync,   // set data
        getStorageSync,   // get data
        serverUrl,
        debounce
    }




