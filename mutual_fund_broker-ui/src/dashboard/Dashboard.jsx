import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const DashBoard = () => {
  const [fundData, setFundData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_BASE_URL + "funds/latest", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setFundData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "Data");
        alert("something went wrong");
        setLoading(false);
      });
  };

  const handleClick = (e, data) => {
    e.preventDefault();
    navigate("/portfolio", { state: data });
  };
  return (
    <>
      <Header />
      <div className="w-full shadow-md bg-white p-3">
        <h1 className="font-semibold p-4 text-4xl">Fund House</h1>
        <div className="grid grid-cols-4 gap-2 py-6 px-4">
          {fundData.length > 0 ? (
            fundData.map((item) => (
              <div
                key={item.Scheme_Code}
                className="shadow-2xl px-4 py-6 border-amber-300 border-2"
                role="button"
                tabIndex={-1}
                onClick={(e) => handleClick(e, item)}
              >
                <table>
                  <tr>
                    <th>Scheme Name</th>
                    <td>{item.Scheme_Name}</td>
                  </tr>
                  <tr>
                    <th>Net Asset Value</th>
                    <td>{item.Net_Asset_Value}</td>
                  </tr>
                  <tr>
                    <th>Scheme Category</th>
                    <td>{item.Scheme_Category}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{item.Date}</td>
                  </tr>
                  <tr>
                    <th>Mutual Fund Family</th>
                    <td>{item.Mutual_Fund_Family}</td>
                  </tr>
                </table>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center p-4 shadow-2xl">
              {loading ? "Loading..." : "No Data"}
            </p>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
