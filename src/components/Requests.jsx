import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1>Connection not found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-xl">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="m-4 p-4 bg-base-200 flex justify-between items-center w-2/3 mx-auto"
          >
            <div>
              <img src={photoUrl} className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-5">
              <h2 className="font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn mx-2 btn-primary text-white"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn mx-2 btn-secondary text-white"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
