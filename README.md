# 技术使用：Vue 3 + Vite+element-plus
12.14
添加api.js (接口基础路由)

添加全局请求拦截（用于添加token到请求头）

修改login.vue，登录接口，存储token到session

main.vue添加表格列，修改prop属性，添加search接口连接

main.vue中编辑按钮，添加传递 ID 参数

修改index.js detail路由，url中加入ID

deatil页面使用created每次刷新时获取url中ID并连接后端API获取数据（url最后不能加/符号）


部分表格属性还没有添加或修改和后端返回的数据属性值对应