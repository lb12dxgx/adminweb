import {mock,mockAxios,router,uuidv4} from '../api/head'


var dcontentjson=[
  {
    field:"shortTitle",
    name:"简短标题",
    type:"text",
    order:"1",
    default:"",
    option:[{
      value:"",
      name:""
    }
    ]
  },{
    field:"titleColor",
    name:"标题颜色",
    type:"select",
    order:"2",
    default:"",
    option:[{
      value:"#000000",
      name:"黑"
    },{
      value:"#FFFFFF",
      name:"白"
    },{
      value:"#EE0000",
      name:"红"
    }
    ]
  }
]

var defcontentjson=JSON.stringify(dcontentjson , null, 1);

let columnTree=[{
             columnId:"0",
             columnName:"首页管理",
             columnCode :"index",
             state:0, 
             login:0,
             contentjson:defcontentjson,
             children:[{ 
                columnId:"0-1",
                columnName:"新闻",
                columnCode:"new",
                 state:0, 
                 login:0,
                 contentjson:defcontentjson,
                children:[{
                   columnId:"0-1-1",
                   columnName:"综合",
                   columnCode:"zh",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-1-2",
                   columnName:"政策法规",
                   columnCode:"zcfg",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-1-3",
                   columnName:"市场",
                   columnCode:"sj",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-1-4",
                   columnName:"技术",
                   columnCode:"js",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-1-5", 
                   columnName:"国际",
                   columnCode:"gj",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                }
                ]
               },{
                columnId:"0-2",
                columnName:"知识库",
                columnCode:"zhishi",
                 state:0, 
                 login:0,
                 contentjson:defcontentjson,
                children:[{
                   columnId:"0-2-1",
                   columnName:"政策文件",
                   columnCode:"zcwj",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-2-2",
                   columnName:"法律法规",
                   columnCode:"flfg",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                },{
                   columnId:"0-2-3",
                   columnName:"标准规范",
                   columnCode:"bzfg",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                }
                ]
               },{
                columnId:"0-3",
                columnName:"企业",
                columnCode:"qy",
                 state:0, 
                 login:0,
                 contentjson:defcontentjson,
                children:[
                  {
                   columnId:"0-3-1",
                   columnName:"联盟企业",
                   columnCode:"lmqy",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-3-2",
                   columnName:"推荐单位",
                   columnCode:"tjdw",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-3-3",
                   columnName:"会员企业",
                   columnCode:"hyqy",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  }
                ]
               },{
                columnId:"0-4",
                columnName:"商业",
                columnCode:"sy",
                 state:0,
                 login:0, 
                contentjson:defcontentjson,
                children:[
                  {
                   columnId:"0-4-1",
                   columnName:"产品信息",
                   columnCode:"cpxx",
                    state:0, 
                    login:1,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-4-2",
                   columnName:"服务信息",
                   columnCode:"fwxx",
                    state:0, 
                    login:1,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-4-3",
                   columnName:"招标信息",
                   columnCode:"zbxx",
                    state:0, 
                    login:1,
                    contentjson:defcontentjson,
                  }
                ]
               },{
                columnId:"0-5", 
                columnName:"人才",
                columnCode:"rc",
                 state:0, 
                 login:0,
                 contentjson:defcontentjson,
                children:[
                  {
                   columnId:"0-5-1",
                   columnName:"专访",
                   columnCode:"zf",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-5-2",
                   columnName:"专家信息",
                   columnCode:"zjxx",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-5-3",
                   columnName:"招聘信息",
                   columnCode:"zpxx",
                    state:0, 
                    login:1,
                    contentjson:defcontentjson,
                  }
                ]
               },{
                columnId:"0-6",
                columnName:"专题",
                columnCode:"zt",
                 state:0,
                contentjson:defcontentjson,
                children:[
                {
                   columnId:"0-6-1",
                   columnName:"会展专题",
                   columnCode:"hzzt",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-6-2",
                   columnName:"市场专题",
                   columnCode:"sczt",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-6-3",
                   columnName:"技术专题",
                   columnCode:"jszt",
                    state:0, 
                    login:0,
                    contentjson:defcontentjson,
                  },{
                   columnId:"0-6-4",
                   columnName:"安全专题",
                   columnCode:"aqzt",
                    state:0,
                     login:0,
                    contentjson:defcontentjson,
                  }
                ]
               },
              ]
        }]

var conjson={
  level:10,
  pdate:"2017-12-18",
  creator:"管理员",
  num:100

}
let contentList=[
  {
    contentId:"1",
    contentTitle:"test",
    contentJson:conjson,
    content:"内测试",
    columnId:"0-1-1"
  },{
    contentId:"2",
    contentTitle:"test2",
    contentJson:conjson,
    content:"内测试2",
    columnId:"0-1-1"
  },{
    contentId:"3",
    contentTitle:"test3",
    contentJson:conjson,
    content:"内测试3",
    columnId:"0-1-1"
  }
]





mock.onPost("/system/column/tree.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/column/tree.do"+config);
 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
     resolve([200,{state:1,retData:{tree:columnTree}}])
    },500)
  })
})

mock.onPost("/system/column/update.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/column/save.do"+config);
  let columnJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:{node:columnJson}}])
    },500)
  })
})

mock.onPost("/system/column/save.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/column/save.do"+config);
  let columnJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      columnJson.columnId=uuidv4();
      resolve([200,{state:1,retData:{node:columnJson}}])
    },500)
  })
})

mock.onPost("/system/column/delete.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/column/delete.do"+config);
  let columnJson=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      resolve([200,{state:1,retData:1}])
    },500)
  })
})


mock.onPost("/system/content/list.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/content/list.do"+config.data);
  let {pageNum,columnId}=JSON.parse(config.data) 
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      if(pageNum==0){
        pageNum=1;
      }
     var l= contentList.filter(function(item){
        return item.columnId === columnId;
      });

      var l=l.slice((pageNum-1)*5,pageNum*5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":l.length}}])
    },500)
  })
})


mock.onPost("/system/content/save.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/content/save.do"+config);
  let content=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      content.contentId=uuidv4(); 
      contentList.push(content); 
      var l=contentList.slice(0,5)
      resolve([200,{state:1,retData:{"content":l,"totalElements":contentList.length}}])
    },500)
  })
})


mock.onPost("/system/content/update.do").reply(config=>{   //config是post传过来的参数
  console.log("/system/content/update.do"+config);
  let content=JSON.parse(config.data)
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
        for (var i = contentList.length - 1; i >= 0; i--) {
          if (contentList[i].contentId == content.contentId) {
              contentList[i]=content;
          }
      }
      resolve([200,{state:1,retData:content}])
    },500)
  })
})

mock.onPost("/system/content/delete.do").reply(config=>{   //config是post传过来的参数
 
  console.log(config.data);
  let {contentId}=JSON.parse(config.data);

  return new Promise((resolve,reject) => {
    setTimeout(()=>{
       for (var i = contentList.length - 1; i >= 0; i--) {
          if (contentList[i].contentId ==contentId) {
              contentList.splice(i, 1);
          }
      }
      resolve([200,{state:1,retData:1}])
    },500)
  })
})


export default mock 