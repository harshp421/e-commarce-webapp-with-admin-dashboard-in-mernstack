import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import {useDispatch,useSelector} from 'react-redux'
import { getMonthlyData, getOrders, getyearlyData } from "../features/auth/authSlice";
const columns = [

  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total price",
    dataIndex: "price",
  },
  {
    title: "Total price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const  dispatch=useDispatch();
  const monthDataState=useSelector((state)=>state?.auth?.monthlyData);
  const yearDataState=useSelector((state)=>state?.auth?.yearlyData);
 const orderState=useSelector((state)=>state?.auth?.orders?.orders);
    const [dataMonthley, setDataMonthley] = useState([])
    const [dataMonthleySales, setDataMonthleySales] = useState([])
    const [ordarData, setOrdarData] = useState([]);
  
  

  useEffect(() => {
    dispatch(getMonthlyData())
    dispatch(getyearlyData())
    dispatch(getOrders())
  }, [])
  

  useEffect(() => {
    const monthNames= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let data=[];
    let monthleyOrderCount=[];
    for (let index = 0; index < monthDataState?.length; index++) {
      const element = monthDataState[index];
      data.push({type:monthNames[element?._id?.month],income:element?.amount}) 
      monthleyOrderCount.push({type:monthNames[element?._id?.month],sales:element?.count}) 
      
    }
    //console.log(data,"datae");
    setDataMonthley(data);
    setDataMonthleySales(monthleyOrderCount);

    const data1 = [];
for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name: orderState[i]?.shippingInfo?.firstname +  orderState[i]?.shippingInfo?.lastname,
    product: orderState[i]?.orderItems?.length,
    price:orderState[i]?.totalPrice,
    dprice:orderState[i]?.totalPriceAfterDiscount
    ,
    status: orderState[i]?.orderStatus,
  });
}

  setOrdarData(data1)
  }, [monthDataState,yearDataState,orderState])
  

  //console.log(yearDataState,"yearDataState");

  const config = {
    data:dataMonthley,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data:dataMonthleySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">{yearDataState && yearDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0  desc">Sales in last Year from Today</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{  yearDataState && yearDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0  desc">Sales in last Year from Today</p>
          </div>
        </div>
       
      </div>
      <div className="d-flex justify-content-between gap-3">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={ordarData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
