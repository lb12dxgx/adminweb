<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  window.UEDITOR_HOME_URL = "/admin/static/UE/";
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setUEContent(msg) { // 获取内容方法
        return this.editor.setContent(msg)
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
