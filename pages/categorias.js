import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name,setName] = useState('');
  const [parentCategory,setParentCategory] = useState('');
  const [categories,setCategories] = useState([]);
  const [properties,setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, [])
  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev){
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }
  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({name,values}) => ({
      name,
      values:values.join(',')
    }))
    );
  }
  function deleteCategory(category){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id);
        fetchCategories();
      }
    });
  }
  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'',values:''}];
    });
  }
  function handlePropertyNameChange(index,property,newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index,property,newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1>Lista Categoria</h1>
      <label>
        
      </label>
      {editedCategory
          ? <form onSubmit={saveCategory}>
            <label>
              Editar Categoria
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder={'Category name'}
              onChange={ev => setName(ev.target.value)}
              value={name}/>
            <select
                    onChange={ev => setParentCategory(ev.target.value)}
                    value={parentCategory}>
              <option value="">No parent category</option>
              {categories.length > 0 && categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Properties</label>
            <button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm mb-2">
              Add new property
            </button>
            {properties.length > 0 && properties.map((property,index) => (
              <div key={property.name} className="flex gap-1 mb-2">
                <input type="text"
                       value={property.name}
                       className="mb-0"
                       onChange={ev => handlePropertyNameChange(index,property,ev.target.value)}
                       placeholder="property name (example: color)"/>
                <input type="text"
                       className="mb-0"
                       onChange={ev =>
                         handlePropertyValuesChange(
                           index,
                           property,ev.target.value
                         )}
                       value={property.values}
                       placeholder="values, comma separated"/>
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setName('');
                  setParentCategory('');
                  setProperties([]);
                }}
                className="btn-default">Cancel</button>
            )}
            <button type="submit"
                    className="btn-primary py-1">
              Save
            </button>
          </div>
        </form>
          : ''}
      {!editedCategory && (
      
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nombre
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Propiedad
              </th>              
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Acciones
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
          {categories.length > 0 && categories.map(category => (
            <tr key={category._id}>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{category.name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{category?.parent?.name ? category.parent.name : "S/N" }</td>
              <td className="whitespace-nowrap px-4 py-2 flex justify-center align-center gap-1">
                <button
                  onClick={() => editCategory(category)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  Editar
                </button>
                <button
                  onClick={() => deleteCategory(category)}
                  className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Eliminar
                    </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      
      )}
    </Layout>
  );
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal} />
));
