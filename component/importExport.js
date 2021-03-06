const storage =require("../js/storage")
const coinUtil = require("../js/coinUtil")
module.exports=require("./importExport.html")({
  data:()=>({
    expJson:"",
    impJson:"",
    confirm:false,
    resetDialog:false,
    resetDialogConfirm:false,
    loading:false
  }),
  mounted(){
    storage.getAll().then(r=>{
      this.expJson = JSON.stringify(r)
    })
  },
  methods:{
    save(){
      this.confirm=false
      if(!this.impJson){
        return
      }
      storage.setAll(JSON.parse(this.impJson))
    },
    reset(){
      storage.setAll({}).then(()=>{
        this.$store.commit("deleteEntropy")
        this.$store.commit("setFinishNextPage",{page:require("./first.js"),infoId:"reset"})
        this.$emit("replace",require("./finished.js"))
      })
    },
    regenerateAddress(){
      this.loading=true
      coinUtil.shortWait()
        .then(()=>storage.set("addresses",{}))
        .then(()=>{
          this.$emit("replace",require("./login.js"))
        }).catch(()=>{
          this.loading=false
        })
    }
  }
})
