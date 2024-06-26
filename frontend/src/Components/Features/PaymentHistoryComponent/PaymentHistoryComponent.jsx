import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory, retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

const PaymentHistoryComponent = () => {
  const userData = useSelector((state) => state.login.userdata);
  const openSidebarBtn = useSelector((state) => state.login.openSidebar);
  const dispatch = useDispatch();

  const [paymentData, setPaymentData] = useState([]);

  React.useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    getPaymentHistory(userData?.email, setPaymentData);
  }, [userData?.email]);
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div>
        <HeaderComponent />
      </div>
      <div className="flex-1">
        <div>
          <h1 className="text-2xl font-semibold underline flex justify-center m-5">
            Purchase History
          </h1>
        </div>
        <div className="p-2 md:p-5 w-[100%] overflow-x-auto md:w-full">
          {paymentData.length === 0 ? (
            <h1 className="text-xl font-semibold flex justify-center  ">
              No Purchase History Available!
            </h1>
          ) : (
            <table className="border-2 border-black h-auto md:w-[100%] ">
              <tr>
                <th className="border-2 border-black">Id</th>
                <th className="border-2 border-black">Name</th>
                <th className="border-2 border-black">Email</th>
                <th className="border-2 border-black">Contact</th>
                <th className="border-2 border-black">Order Id</th>
                <th className="border-2 border-black">Payment Id</th>
                <th className="border-2 border-black">Amount</th>
                <th className="border-2 border-black">Date</th>
              </tr>
              {paymentData.map((data, index) => (
                <tr>
                  <td className="border-2 border-black">{index + 1}</td>
                  <td className="border-2 border-black text-center">
                    {data.name}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.email}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.contact}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.orderid}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.paymentid}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.amount}
                  </td>
                  <td className="border-2 border-black text-center">
                    {data.date}
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default PaymentHistoryComponent;
