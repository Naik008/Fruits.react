import React, { useState, useEffect } from 'react';
import './Fruits.css';

function Fruits() {
  // dataには何が入る？
  // setDataの呼び出し箇所に注目（※１）
  const [data, setData] = useState([]);
    /* 1)ここに初期値。無しだとundefinedになる */

    // 2)フルーツデータを格納する状態変数 `data` と
    // その更新関数 `setData` を定義
  
  useEffect(() => {
    fetchFruitData();
  }, []);
  // 最初のレンダリング時に果物データを取得する

  useEffect(() => {
    console.log("call useEffect START");
    fetch('http://localhost:8080/fruits').then(response=>{
      // fetchでサーバーからフルーツデータを取得
      response.json().then(value=>{
        // ※２
        console.log(value);
        setData(value);
         // フルーツデータをvalueにセット
      })
      // catchを入れることで、
      //サーバに接続できなくなったときに画面にエラーを出す代わりにコンソールに出す
    })
    .catch(error => {
      console.log(error);
      setData([]);
      // エラーが発生した場合、([])で空の配列を出す
    });

    console.log("call useEffect END");
    return () => {};
  }, []);

  const fruitData = data && data.map((item, index) => {
    // フルーツデータをテーブルの行として入れる
    return (<tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.stock}</td>

      <td><button onClick={() =>
        handleDelete(item.id)}>削除</button></td> 
         {/* 削除ボタンを追加 */}

      </tr>);
  })

  // 在庫情報を追加する関数
  const addStock = (formData) => {
    fetch('http://localhost:8080/fruits/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        // 在庫情報が正常に追加された場合、フルーツデータを再取得して更新する
        return fetchFruitData();
      } else {
        // エラーメッセージを表示するなどの処理を行う
        console.error('Failed to add stock');
      }
    })
    .catch(error => {
      console.error('Error adding stock:', error);
    });
  }

  // フルーツデータを再取得する関数
  const fetchFruitData = () => {
    fetch('http://localhost:8080/fruits')
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error('Error fetching fruit data:', error);
      setData([]);
    });
  }

  // フルーツデータを削除する
  const handleDelete = (id) => {

const updatedData = data.filter(item => item.id !== id);
// 削除された果物を除いた新しいデータをローカルで生成する
  
  setData(updatedData);
// ローカルで更新したデータをセットする

    fetch(`http://localhost:8080/fruits/delete/${id}`, 
    { method: 'DELETE' })
      .then(response => {

    // ifによってデータの再取得の成功と失敗例を分ける
    if (!response.ok) {
      fetchFruitData();
      // 削除が成功したらフルーツデータを再取得して更新する
    } else {
      console.error('Failed to delete fruit');
      // 削除が失敗したらエラーを出す
    }
})
      .catch(error => {
        console.error('Error deleting fruit:', error);
      });
}

  // フォームから送信された際の処理
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStock = {
      name: formData.get('name'),
      price: parseInt(formData.get('price')),
      stock: parseInt(formData.get('stock'))
    };
    addStock(newStock);
    // 在庫情報を追加する関数を呼び出す
  };


 // フルーツデータを表示するためのJSX
 const fruitData2 = data.map((item, index) => (
   // 各果物の情報を表形式に整形する場所
  <tr key={item.id}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.price}</td>
    <td>{item.stock}</td>
    <td>
      <button className="delete-button" onClick={() => handleDelete(item.id)}>削除</button>
       {/* 果物を削除するためのボタン */}
      </td>

  </tr>
));

  return (
    <div>
      <h3>フルーツ在庫情報</h3>
      <table border="2">
        <thead>
          <tr>
            <th>商品コード</th>
            <th>商品名</th>
            <th>単価</th>
            <th>在庫数</th>
            <th>操作</th> 
            {/* この中に削除の操作を含む */}
          </tr>
        </thead>
        <tbody>
          {fruitData}
        </tbody>
      </table>
      <h3>在庫情報追加</h3>
      <form onSubmit={handleSubmit}>
        <label>
          商品名:
          <input type="text" name="name" required />
        </label>
        <label>
          単価:
          <input type="number" name="price" required />
        </label>
        <label>
          在庫数:
          <input type="number" name="stock" required />
        </label>
        <button type="submit">追加</button>
      </form>
    </div>
  );
}

export default Fruits;
