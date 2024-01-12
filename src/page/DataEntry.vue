<template>
    <div>
      <div
        class="drop-area"
        @dragover.prevent
        @dragenter.prevent
        @dragleave.prevent
        @drop="handleDrop"
      >
        <div class="upload">
            <img src="../assets/upload.png" alt=""/>
        </div>
        
        <p style="margin-top:50px;font-size:20px;color:gray;">可以将文件拖拽到此处</p>
      </div>

      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
        accept=".pdf,.doc,.docx"
      />
      <div class="container">
        <!-- <button  @click="selectFiles">点击上传文件</button> -->
        <el-button style="width:160px;height:40px" type="primary" @click="selectFiles">点击上传文件</el-button>
      </div>
      
      <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
  
      <div class="progressdiv" v-for="(file, index) in fileUploads" :key="index">
        <!-- <progress> 是HTML5中的元素，用于表示任务的完成进度。 -->
        
        <p class="progress">{{ file.name }} - {{ file.progress }}%</p>
        <!--  :value="file.progress" 绑定了 file.progress 的值到 <progress> 元素的 value 属性，以显示上传进度。 -->
        <progress style="width:100%" :value="file.progress" max="100"></progress>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: "",
        fileUploads: []
      };
    },
    methods: {
      handleDrop(event) {
        event.preventDefault();
        let dt = event.dataTransfer;
        let files = dt.files;
        this.uploadFiles(files);
      },
      handleFileChange(event) {
        let files = event.target.files;
        this.uploadFiles(files);
      },
      selectFiles() {
        this.$refs.fileInput.click();
      },
      async uploadFiles(files) {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let formData = new FormData();
          formData.append("file", file);
          
          // Simulating file upload progress (you will need to replace this with actual file upload logic using Axios or other library)
          let progress = 0;
          while (progress < 100) {
            await this.sleep(100); // Simulate delay
            progress += 10;
            this.updateFileProgress(file, progress);
          }
          // Clear file progress after upload is complete
          this.updateFileProgress(file, 100);
        }
      },
      updateFileProgress(file, progress) {
        let existingFile = this.fileUploads.find(f => f.name === file.name);
        if (existingFile) {
          existingFile.progress = progress;
        } else {
          this.fileUploads.push({ name: file.name, progress: progress });
        }
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  };
  </script>
  
  <style>
  .drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    height:270px;
    text-align: center;
  }
  .upload{
    text-align: center;
    /* z-index: 2; */
  }
  .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  /* text-align: center; */
  width:100%; /* 如果要垂直居中也可以设置父容器高度 */
}

  .progress{
    height:20px;
    font-size: 15px; 
    color:rgb(58, 98, 215);
    margin-top:20px; 

  }
  .progressdiv{
    margin: 0 auto;
    text-align: center;
    width: 50%;
  }
  </style>
  