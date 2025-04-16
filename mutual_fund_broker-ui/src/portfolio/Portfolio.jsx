import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

const Portfolio = () => {
  const { state } = useLocation();
  //   {
  //     "Scheme_Code": 119551,
  //     "ISIN_Div_Payout_ISIN_Growth": "INF209KA12Z1",
  //     "ISIN_Div_Reinvestment": "INF209KA13Z9",
  //     "Scheme_Name": "Aditya Birla Sun Life Banking & PSU Debt Fund  - DIRECT - IDCW",
  //     "Net_Asset_Value": 105.7166,
  //     "Date": "11-Apr-2025",
  //     "Scheme_Type": "Open Ended Schemes",
  //     "Scheme_Category": "Debt Scheme - Banking and PSU Fund",
  //     "Mutual_Fund_Family": "Aditya Birla Sun Life Mutual Fund"
  // }
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  useMemo(() => {
    if (qty > 0) {
      setAmount(state.Net_Asset_Value * qty);
    }
  }, [qty]);
  const handleClick = (e) => {
    e.preventDefault();
    let body = {
      user_id: JSON.parse(localStorage.getItem("user")).id,
      qty: Number(qty),
      amount: amount,
      fund_name: state.Scheme_Name,
      current_value: state.Net_Asset_Value,
    };
    axios
      .post(import.meta.env.VITE_API_BASE_URL + "investment/add", body, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        alert("Order Placed Successfully !!!");
        getPortfolio();
        setAmount(0);
        setQty(0);
      })
      .catch((err) => {
        console.log(err, "Data");
        alert("something went wrong");
      });
  };
  useEffect(() => {
    getPortfolio();
  }, []);
  const getPortfolio = () => {
    axios
      .get(
        import.meta.env.VITE_API_BASE_URL +
          `investment/portfolio?id=${
            JSON.parse(localStorage.getItem("user")).id
          }`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        setPortfolio(res.data);
      })
      .catch((err) => {
        console.log(err, "Data");
        alert("something went wrong");
      });
  };
  return (
    <>
      <Header />
      <div className="shadow-lg p-4 w-full ">
        <h1 className="text-3xl font-bold">PortFolio</h1>
        <div className="grid grid-cols-2 gap-2 shadow-2xs ">
          <div className="border-2 border-gray-400 p-4">
            <h3 className="text-2xl font-semibold py-2">Details</h3>
            <table>
              <tr>
                <th>Scheme Name</th>
                <td>{state.Scheme_Name}</td>
              </tr>
              <tr>
                <th>Net Asset Value</th>
                <td>{state.Net_Asset_Value}</td>
              </tr>
              <tr>
                <th>Scheme Category</th>
                <td>{state.Scheme_Category}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{state.Date}</td>
              </tr>
              <tr>
                <th>Mutual Fund Family</th>
                <td>{state.Mutual_Fund_Family}</td>
              </tr>
            </table>
          </div>
          <div className="border-2 border-gray-400  p-4">
            <h3 className="text-2xl font-semibold py-2">Buy</h3>
            <table>
              <tr>
                <th>Qty</th>
                <td>
                  <input
                    type="number"
                    className="p-1 m-1 border-2 border-black"
                    placeholder="Enter a qty to buy"
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                  />
                </td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>
                  <input
                    type="number"
                    className="p-1 m-1 border-2 border-black "
                    placeholder="Total Amount"
                    disabled={true}
                    value={amount}
                  />
                </td>
              </tr>
              <tr>
                <th>Confirm</th>
                <td>
                  <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white px-4  py-2 rounded-2xl ml-2"
                  >
                    Buy Order
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="p-6 mt-4 bg-white shadow-md rounded-xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Portfolio History
          </h1>

          {portfolio.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Fund Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Current Value
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors border-b"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {item.fund_name}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-medium">
                        ₹{item.amount}
                      </td>
                      <td className="px-6 py-4 text-blue-600 font-medium">
                        ₹{item.current_value}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg">No portfolio data found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
