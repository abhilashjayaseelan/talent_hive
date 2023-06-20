import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../features/redux/slices/userLoginAuthSlice";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState)=> state.userAuth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess());
    }
    // if (isLoggedIn === true) {
    //   navigate("/user/home");
    // }
  }, [isLoggedIn]);

  return (
    <div className="bg-slate-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            homePage
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
