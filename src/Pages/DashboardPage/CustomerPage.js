import React, { useEffect, useState } from 'react';
import './custom.css'
import { bookServ } from '../../service/appService';
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
    const nega = useNavigate()
    const [data, setData] = useState([]);
    useEffect(() => {
          bookServ
            .getProfile()
            .then((res) => {
              setData(res.data)
              nega('/')
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);

    const handleLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        nega('/');
    };
        
  return (
    <div className="content">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>BookShelf xin cảm ơn !</h1>
          <p>Người dùng : <strong>{data.userName}</strong></p>
          <p>Cảm ơn bạn vì đã quan tâm đến BookShelf, có bất cứ thay đổi nào chúng tôi sẽ cập nhật và gửi thông tin sớm nhất đến với khách hàng. Cảm ơn vì đã dùng ứng dụng của chúng tôi</p>
          <button onClick={handleLogout} className="go-home">Logout</button>
        </div>
      </div>
    </div>
  );
}
