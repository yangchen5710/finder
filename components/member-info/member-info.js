Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userInfo:{
            type: Object,
            value: {},
            observer(newVal, oldVal) {
                this.setData({
                    personalInfo: newVal,
                    avatar: newVal.avatarUrl,
                    recharge: newVal.recharge
                })
            }
        },
        member_level_img:{
            type: String,
            value: "",
            observer(newVal, oldVal) {
                this.setData({
                    member_level_img: newVal
                })
            }
        },
        qrcodeURL:{
            type: String,
            value: "",
            observer(newVal, oldVal) {
                this.setData({
                    qrcode: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        personalInfo: {},
        qrcode: "",
        avatar: "",
        recharge: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeMember() {
            this.triggerEvent('closeMember')
        }
    }
})
