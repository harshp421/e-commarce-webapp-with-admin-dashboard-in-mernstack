import React from "react";

const SizeComponent = (props) => {
  const {SizeData,setSize}=props;
  //console.log(props,"props");
  return (
    <>
      
      {
        SizeData && SizeData.map((item,index)=>{
          return(
            <span onClick={()=>setSize(item?._id)}  className="badge border border-1 bg-white text-dark border-secondary" key={index}>{item?.title}</span>
          )

        })
      }
      
    </>
  );
};

export default SizeComponent;
