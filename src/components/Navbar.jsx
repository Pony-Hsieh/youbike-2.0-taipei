import "../styles/components/navbar.scss";
import { MdClose, MdMenu } from "react-icons/md";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


function Navbar() {
  const [navShow, setNavShow] = useState(false);
  const [isPC, setIsPC] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsPC(true);
    }
  }, []);
  const linkList = [
    {
      name: "使用說明",
      link: "/directions",
    },
    {
      name: "收費方式",
      link: "/charge",
    },
    {
      name: "站點資訊",
      link: "/",
    },
    {
      name: "最新消息",
      link: "/news",
    },
    {
      name: "活動專區",
      link: "/activity",
    },
  ];

  return (
    <nav className={`navBar ${isPC || navShow ? "active" : ""}`}>
      <div className="logo-and-control-wrapper">
        <NavLink to="/" className="logo"></NavLink>
        <button
          type="button"
          className={`control ${navShow ? "active" : ""}`}
          onClick={() => {
            setNavShow(!navShow);
          }}
        >
          {navShow ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      <ul className={`main-nav ${navShow ? "active" : ""}`}>
        {linkList.map((eachLink) => (
          <li key={eachLink.name}>
            <NavLink
              to={eachLink.link}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => {
                setNavShow(false);
              }}
            >
              {eachLink.name}
            </NavLink>
          </li>
        ))}
        <button
          type="button"
          className="login"
          onClick={() => {
            alert("目前尚無登入功能");
          }}
        >
          登入
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;
