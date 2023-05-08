import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Modal from "../components/Modal";

interface DataUser {
  nama: string;
  id: number;
  email: string;
  status: string;
}

const index = () => {
  const [data, setData] = useState<DataUser[]>([]);
  const [id, setid] = useState<number>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [idIsCheck, setIdIsCheck] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function isChecked(e: any) {
    const { value } = e.target;
    if (idIsCheck.includes(value)) {
      setIdIsCheck(idIsCheck.filter((checked_name) => checked_name != value));
    } else {
      idIsCheck.push(value);
      setIdIsCheck([...idIsCheck]);
    }
  }
  console.log("cek: ", idIsCheck);

function updateActive(){
  data.forEach(element => {
    if(idIsCheck.includes(String(element.id))){
      element.status = "active"
    }
  });

  setData([...data])
  localStorage.setItem("UserList", JSON.stringify(data));
}

  function fetchData() {
    const getUser = localStorage.getItem("UserList");
    if (getUser) {
      setData(JSON.parse(getUser));
    }
  }

  function submitUser() {
    const user = JSON.parse(localStorage.getItem("UserList") || "[]") || [];
    const newUser = {
      id: id,
      nama: name,
      email: email,
      status: status,
    };
    user.push(newUser);
    localStorage.setItem("UserList", JSON.stringify(user));
    navigate(0);
  }

  return (
    <Layout>
      <div className="px-14 py-10">
        <p className="text-black my-5 text-xl mb-10 font-bold">
          Tambahkan User Pada List
        </p>
        <label
          htmlFor="my-modal-1"
          className="btn capitalize bg-blue-500 text-white border-none"
        >
          + Tambah user
        </label>
        <Modal no="1" titleModal="Tambah User">
          <div className="flex items-center justify-center w-full mb-5">
            <p className="w-1/4 text-black">No</p>
            <input
              type="number"
              className="input input-bordered bg-white w-3/4 border-black"
              min={0}
              required
              value={id}
              onChange={(e) => setid(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex items-center justify-center w-full mb-5">
            <p className="w-1/4 text-black">Nama</p>
            <input
              type="text"
              className="input input-bordered bg-white w-3/4 border-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full mb-5">
            <p className="w-1/4 text-black">Email</p>
            <input
              type="email"
              className="input input-bordered bg-white w-3/4 border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full mb-5">
            <p className="w-1/4 text-black">Status</p>
            <div className="form-control w-3/4">
              <label className="radio cursor-pointer mb-2">
                <input
                  type="radio"
                  className="radio"
                  value={"active"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                active
              </label>
              <label className="radio cursor-pointer">
                <input
                  type="radio"
                  className="radio"
                  value={"inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                inactive
              </label>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-1"
              className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
            >
              Cancel
            </label>
            <button
              onClick={submitUser}
              className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
            >
              Submit
            </button>
          </div>
        </Modal>
        <table className="table table-zebra w-full my-7 ">
          {/* head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center text-lg capitalize">No</th>
              <th className="text-lg capitalize">Nama</th>
              <th className="text-lg capitalize">Email</th>
              <th className="text-lg capitalize">Status</th>
              <th className="text-lg capitalize">Action</th>
              <th className="text-lg capitalize">Add</th>
            </tr>
          </thead>
          <tbody>
            <>
              {data.map((data) => (
                <tr>
                  <th className="text-center">{data.id}</th>
                  <td>{data.nama}</td>
                  <td>{data.email}</td>
                  <td>{data.status}</td>
                  <td>
                    <button
                      // onClick={}
                      className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) => isChecked(e)}
                      value={data.id}
                    />
                  </td>
                </tr>
              ))}
            </>
            <button
              onClick={()=>updateActive()}
              className="  text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
            >
              Update Multiple Active
            </button>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default index;
