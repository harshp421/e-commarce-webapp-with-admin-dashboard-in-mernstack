import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState=useSelector((state)=>state?.auth?.orders?.orders);


 const updateorderstatue=(a,b)=>{
  dispatch(updateAOrder({id:a,status:b})) 
}
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPrice ,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderState[i]?.orderStatus}
           onChange={(e)=>updateorderstatue(orderState[i]._id,e.target.value)} className="form-control form-select" id="">
            <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">processed</option>
            <option value="shipped">Shipped</option>
            <option value="Out for Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered </option>
          </select>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
