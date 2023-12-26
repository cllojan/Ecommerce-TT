import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Nombres y Apellidos</th>
            <th>Correco</th>
            <th>Productos</th>
            <th>Fecha</th>
			<th>Pagado</th>			
			<th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr key={order._id}>
			<td>{order.name}</td>
			<td>{order.email}</td>    
			<td>				
				<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
					<select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option selected>Lista de productos</option>
					{order.line_items.map(l => (                
						<option value="DE">{l.price_data?.product_data.name}</option>
						))}
				</select>

			</td>
				{/*
			<td>
              
            </td>
				*/}
			<td>{(new Date(order.createdAt)).toLocaleString()}</td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'YES' : 'NO'}
            </td>    
			
            
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  );
}
