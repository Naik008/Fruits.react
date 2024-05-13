import React, { useState, useEffect } from 'react';

//index.jsとダブってたのでコメントアウト
// import Clock from'./'

const Clock = () => {
  // 現在の時刻を保持する state
  const [currentTime, setCurrentTime] = useState(new Date());

  // コンポーネントがマウントされたときに時刻を更新する useEffect フック
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    // コンポーネントがアンマウントされたときにクリーンアップする
    return () => clearInterval(timerID);
  }, []);

  // 時刻を更新する関数
  const tick = () => {
    setCurrentTime(new Date());
  };

  // 時刻を表示する JSX
  return (
    <div>
      <h1>現在の時刻</h1>
      <h2>{currentTime.toLocaleTimeString()}</h2>
    </div>
  );
};

export default Clock;
