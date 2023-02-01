import React from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,{
          headers : {
            authorization : `bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log("bookings", bookings);
  return (
    <div className="rounded-md">
      <div className="p-12">
        <h3 className="text-3xl pb-5">My Appointment</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="dark:text-black">
                <th></th>
                <th>Name</th>
                <th>Treatment</th>
                <th>Appointment Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <tr className="hover dark:text-black"
                key={i}
                >
                  <th>{i + 1}</th>
                  <td>{booking.patientName}</td>
                  <td>{booking.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
