import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";
import { uploadFile } from "@/pages/firebase/config";

export default function ProductForm({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice,
  images:existingImages,
  category:assignedCategory,
  properties:assignedProperties,
}) {
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [category,setCategory] = useState(assignedCategory || '');
  const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const [price,setPrice] = useState(existingPrice || '');
  const [images,setImages] = useState(existingImages || []);
  const [goToProducts,setGoToProducts] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [categories,setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,description,price,images,category,
      properties:productProperties
    };
    if (_id) {
      
      await axios.put('/api/products', {...data,_id});
    } else {
      
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/productos');
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    //const res = uploadFile(files);
    console.log(files);
    if (files?.length > 0) {
      setIsUploading(true);
      const data = [];
      for (const file of files) {
        const res = await uploadFile(file);
        data.push(res);
      }
      setImages(oldImages => {
        return [...oldImages,...data]
      })
      console.log(...data);
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
      <form onSubmit={saveProduct}>
          <label  className="block text-xs font-medium text-gray-700">
            Nombre del producto
          </label>
          <input
            type="text"
            placeholder="INTEL"  
            onChange={ev => setTitle(ev.target.value)}
            value={title}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        
        <label  className="block text-xs font-medium text-gray-700">
            Categoria
        </label>
        <select
          value={category}
          onChange={ev => setCategory(ev.target.value)}
          class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        >
          <option value="">Seleccione una categoria</option>
          {categories.length > 0 && categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        
        
        <label  className="block text-xs font-medium text-gray-700">
            Imagenes
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            
            setList={updateImagesOrder}>
            {!!images?.length && images.map(link => (
              <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="" className="rounded-lg"/>
              </div>
            ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              Add image
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>
        <label  className="block text-xs font-medium text-gray-700">
            Descripcion
        </label>
        <textarea
    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
    value={description}
    rows="3"
    onChange={ev => setDescription(ev.target.value)}
    ></textarea>        
         <label  className="block text-xs font-medium text-gray-700">
            Precio 
        </label>
        <input
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          type="number" placeholder="price"
          value={price}
          onChange={ev => setPrice(ev.target.value)}
        />
        <button
          type="submit"
          className="inline-block rounded bg-indigo-600  px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex"
          >
          Guardar
        </button>
      </form>
  );
}
