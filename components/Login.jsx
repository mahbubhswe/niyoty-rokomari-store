import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    if (userInfo.username == "alomgir" && userInfo.password == "12345") {
      localStorage.setItem("niyoty", JSON.stringify(userInfo));
      router.push("/dashboard");
    } else {
      setMsg("Sorry, username or password not matched");
    }
  };
  return (
    <>
      {" "}
      <div className="w-50 mt-5 container">
        <h1 className="text-center">Login System</h1>
        <div className="text-danger">{msg ? msg : null}</div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-info btn-block"
            disabled={!userInfo.username || !userInfo.password}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
