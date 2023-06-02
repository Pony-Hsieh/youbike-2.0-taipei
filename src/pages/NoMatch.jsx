import "../styles/pages/noMatch.scss";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  const countSaver = useRef(5);
  const [countDownSeconds, setCountDownSeconds] = useState(countSaver.current);
  const [timer, setTimer] = useState(null);

  function goHomePageNow() {
    clearInterval(timer);
    navigate("/");
  }

  useEffect(() => {
    setTimer(
      setInterval(() => {
        if (countSaver.current === 0) {
          goHomePageNow();
          return;
        }
        countSaver.current = countSaver.current - 1;
        setCountDownSeconds(countSaver.current); //触发下一次渲染
        return;
      }, 1000)
    );
  }, []);

  return (
    <div className="noMatch">
      <h1>找不到您需要的頁面</h1>
      <p>{countDownSeconds} 秒後將回到首頁</p>
      <button
        type="button"
        onClick={() => {
          goHomePageNow();
        }}
      >
        立即前往
      </button>
    </div>
  );
}

export default NoMatch;
