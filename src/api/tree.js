export const getNode=function (node,id,idName){

    if(node[idName]==id){
      return node;
    }else{
      let nodes=node.children;
      if(nodes!=undefined)
      for(var n of nodes){
        if(n[idName]==id){
          return n;
        }else{
          getNode(n,id,idName);
        }
      }
    }

}


export const delNode=function (node,id,idName){
     let nodes=node.children;
      if(nodes!=undefined)
      for (var i = nodes.length - 1; i >= 0; i--) {
          if (nodes[i][idName]==id) {
              console.log("del");
              nodes.splice(i, 1);
              console.log(nodes);
              return nodes;
          }else{
             delNode(nodes[i],id,idName);
          }
      }
    

}

export const getParentNode=function (pnode,n,idName){
      var nodes=pnode.children;
      if(nodes!=undefined)
      for(var node of nodes){
        if(node[idName]==n[idName]){
          console.log("pnode==");
          console.log(pnode);
          console.log("pnode==");
          return pnode;
         
        }else{
          console.log(node.menuName);
          var r=getParentNode(node,n,idName);
          if(r!=undefined){
            return r;
           }
        }
       
    }
}

export const addNode=function (node,id,idName,aNode){
   let cnode=getNode(node,id,idName);
    cnode.children.push(aNode);
}