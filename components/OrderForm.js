import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";
import { uploadFile } from "@/pages/firebase/config";
import Link from "next/link";
export default function OrderForm({
	
  _id,
  line_items:existingLineItems
  ,name:existingName
  ,email:existingEmail
  ,cellphone:existingCellPhone
  ,parish:existingParish
  ,canton:existingCanton
  ,streetAddress:existingStreetAddress
  ,province:existingProvince
  ,paid:existingPaid
}) {
  const [lineItems,setLineItems] = useState(existingLineItems || []);
  const [name,setName] = useState(existingName || '');
  const [email,setEmail] = useState(existingEmail|| '');
  const [cellphone, setCellphone] = useState(existingCellPhone || "");
  const [parish,setParish] = useState(existingParish|| "");
  const [canton,setCanton] = useState(existingCanton || '');
  const [streetAddress,setStreetAdress] = useState(existingStreetAddress || "");
  const [province,setProvince] = useState(existingProvince );
  const [isPaid,setIsPaid] = useState(existingPaid);  
  const router = useRouter();
  
  async function saveProduct(ev) {
    //ev.preventDefault();
	
	let paid = isPaid? false:true;	
    const data = {
      lineItems,name,cellphone,email,city,postalCode,streetAddress,country,paid
    };
	console.log(data)
	
    if (_id) {      
      await axios.put('/api/orders', {...data,_id});
    } else {
      
      await axios.post('/api/orders', data);
    }
    //setGoToProducts(true);
  }
 
  return (
      <form onSubmit={saveProduct}>
          <label  className="block text-xs font-medium text-gray-700">
            Nombre y Apellido
          </label>
          <input
            type="text"
            placeholder="INTEL"  
            onChange={ev => setTitle(ev.target.value)}
            value={name}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
			disabled
          />
		<label  className="block text-xs font-medium text-gray-700">
            Correo Electronico
        </label>
		<input
            type="text"
            placeholder="INTEL"  
            onChange={ev => setTitle(ev.target.value)}
            value={email}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          disabled
		  />
		<label  className="block text-xs font-medium text-gray-700">
			Numero celular
        </label>
        <input
            type="number"
			disabled
            placeholder="INTEL"  
            onChange={ev => setTitle(ev.target.value)}
            value={cellphone}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
		<div className="whitespace-nowrap grid  grid-cols-2 gap-1">
		<div>
			<label  className="block  text-xs font-medium text-gray-700">
				Provincia
			</label>
			<input
			className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
			  type="text" placeholder="price"
			  value={province}
			  onChange={ev => setPrice(ev.target.value)}
			  disabled
			/>
		</div>
		<div>
			<label  className="block text-xs font-medium text-gray-700">
				Canton
			</label>
			<input
			
			className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
			  type="text" placeholder="price"
			  value={canton}
			  onChange={ev => setPrice(ev.target.value)}
			  disabled
			/>
		</div>
		</div>
		<label  className="block text-xs font-medium text-gray-700">
            Parroquia
        </label>
        <input
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          type="text" placeholder="price"
		  disabled
          value={parish}
          onChange={ev => setPrice(ev.target.value)}
        />
		<label  className="block text-xs font-medium text-gray-700">
            Direccion
        </label>
        <input
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          type="text" placeholder="price"
          value={streetAddress}
          onChange={ev => setPrice(ev.target.value)}
		  disabled
        />
		<label  className="block text-xs font-medium text-gray-700">
            Pagado
		</label>
		<button
          type="submit"
		  href={"a"}
          className={isPaid ? "inline-block rounded w-20 mb-2 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex bg-indigo-600": "inline-block rounded w-20 mb-2 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex bg-red-600" }
          >
          {isPaid ? "Pagado" : "Pendiente"}
        </button>
		<label  className="block text-xs font-medium text-gray-700">
            Lista de productos 
		</label>
		<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
			<th>Nombre</th>			
			<th>Cantidad</th>
			<th>Precio</th>
          </tr>
        </thead>
        <tbody  className="divide-y divide-gray-200 text-center">       
		{lineItems.map((elm, idx)=> (
			
		<tr key={idx}>		
			<td>{elm.price_data.product_data.name}</td>			
			<td>{elm.quantity}</td>
			<td>{elm.price_data.unit_amount}</td>
          </tr>
		))}             
        </tbody>
      </table>
		<button
          type="submit"
          className="inline-block rounded bg-indigo-600  px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex"
          >
          Guardar
        </button>
      </form>
  );
}
