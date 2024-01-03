import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const CategoriaForm = () => {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const data = {
            name,
            parentCategory,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(','),
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
    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }];
        });
    }
    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }
    return (
        <form onSubmit={saveCategory}>
            <div className="flex gap-1">
                <input
                    type="text"
                    placeholder={'Nombre categoria'}
                    onChange={ev => setName(ev.target.value)}
                    value={name} />
                <select
                    onChange={ev => setParentCategory(ev.target.value)}
                    value={parentCategory}>
                    <option value="">Seleccion categoria padre</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="block">Propiedad</label>
                <button
                    onClick={addProperty}
                    type="button"
                    className="btn-default text-sm mb-2">
                    Agregar una propiedad
                </button>
                {properties.length > 0 && properties.map((property, index) => (
                    <div key={property.name} className="flex gap-1 mb-2">
                        <input type="text"
                            value={property.name}
                            className="mb-0"
                            onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                            placeholder="Color de categoria" />
                        <input type="text"
                            className="mb-0"
                            onChange={ev =>
                                handlePropertyValuesChange(
                                    index,
                                    property, ev.target.value
                                )}
                            value={property.values}
                            placeholder="Valores separados por comas" />
                        <button
                            onClick={() => removeProperty(index)}
                            type="button"
                            className="btn-red">
                            Eliminar
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
                        className="btn-default">Cancelar</button>
                )}
                <button type="submit"
                    className="btn-primary py-1">
                    Guardar
                </button>
            </div>
        </form>
    )
}

export default CategoriaForm