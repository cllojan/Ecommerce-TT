import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [orderInfo,setOrderInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/orders?id='+id).then(response => {
      setOrderInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push('/ordenes');
  }
  async function deleteProduct() {
    await axios.delete('/api/orders?id='+id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Estas seguro que quieres eliminar la orden de 
        &quot;{orderInfo?.name}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="btn-red">Si</button>
        <button
          className="btn-default"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
