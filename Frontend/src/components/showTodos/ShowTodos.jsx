import React, { useEffect, useCallback, useContext, useState } from 'react'
import './style.scss';
// import TodoTable from './TodoTable';
import { Switch } from '@mui/material/';
import Context from '../../context/Context';
import UseFetch from '../../hooks/UseFetch';
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";
const ShowTodos = () => {
    let edit = false
    const { hitTodo, setHitTodo } = useContext(Context);
    let [mydata, setData] = React.useState([]);
    const [EditTodoValue, setEditValue] = React.useState('');
    const [EditText,setEditText] = React.useState(false);
    const [completed, setCompleted] = React.useState('pending');
    const EditValueRef = React.useRef();
    const updateData = (id, data) => {
        console.log(id)
        UseFetch(`/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }).catch((err) => console.log(err))
    };
    React.useEffect(() => {
        callApi();
    }, [completed, hitTodo]);
    const callApi = useCallback(() => {
        UseFetch('/?skip=1&limit=100', {
            method: 'GET',
        }).then((res) => {
            return res.json();
        }).then((resData) => {
           const data =  resData?.data?.map((data,index) => {
                return {
                    ...data,
                    isEdit : false
                }
            })
            setData(data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const delteTodo = useCallback((id) => {
        UseFetch(`/remove/${id}`, {
            method: 'Delete',
        }).then(() => {
            console.log('Todo delete successfully');
        }).then((resData) => {
            console.log(resData);
        }).catch((err) => {
            alert('Todo not delete');
        });
    }, []);

    const EditingValueOfTodo = (index,isEnable) => {
        setData((pre) => {
            pre[index].isEdit = isEnable
            return [...pre]
        })
    };
    return (
        <main className='container'>
            <div className="filters">
                {/* <button onClick={() => {
                    localStorage.removeItem('token');
                }}>Remove Token</button> */}
                <input type="search" style={{ display: 'none' }} />
            </div>
            <div className='todo-container' style={{ overflowY: 'auto', textAlign: `${mydata?.length < 1 ? 'center' : ""}` }}>
                {mydata?.length > 0 ? (<>
                    {mydata?.map((item, index) => {
                        const dateString = item?.dueDate
                        const dateObject = new Date(dateString);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        const formattedDate = dateObject.toLocaleDateString('en-PK', options);
                        return (
                            <div className='todo' style={{ margin: '10px 0' }} key={index}>

                                <section className='todo-title'>
                                    <Switch onChange={(e) => {
                                        const isComplete = e?.target?.checked ? 'completed' : 'pending';
                                        completed == 'pending' ? setCompleted('completed') : setCompleted('pending');
                                        updateData(item?._id, {
                                            status: isComplete
                                        });
                                    }} defaultChecked={item?.status == 'completed' ? true : false} />
                                    {item?.isEdit ?
                                        (<input value={`${EditTodoValue}`} ref={EditValueRef} onChange={(e) => setEditValue(e.target.value)} onKeyUp={(e) => {
                                            if (e?.key == "Enter") {
                                                updateData(item?._id,{title : EditTodoValue});
                                                setEditValue('');
                                                EditingValueOfTodo(index,false);
                                                hitTodo == 'hit1' ? setHitTodo('hit2') : setHitTodo('hit1');
                                            }
                                        }} type='text' />) : (<div className='titleText'>
                                            {item?.status == 'completed' ? <del style={{ fontWeight: 'bold' }}>{item?.title}</del> : <div style={{ fontWeight: 'bold' }}>{item?.title}</div>}
                                        </div>)}
                                </section>

                                <section className='todo-dates'>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                        <span>
                                            <FaPencil color='lightblue' onClick={() => {
                                                setEditValue(item?.title);
                                                EditingValueOfTodo(index,true);
                                            }} style={{ cursor: 'pointer' }} />
                                        </span>
                                        <span>
                                            <RiDeleteBinFill color='pink' style={{ cursor: 'pointer' }} onClick={() => {
                                                delteTodo(item?._id);
                                                hitTodo == 'hit1' ? setHitTodo('hit2') : setHitTodo('hit1');
                                                // console.log(hitTodo);
                                            }} />
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: 'gray' }}>
                                        {item?.dueDate !== null ? formattedDate : <em style={{ opacity: 0.5 }}>no deadline</em>}
                                    </div>
                                </section>
                            </div>
                        )
                    })}</>) : (<em>No Todo available</em>)}
            </div>
        </main>
    )
}

export default ShowTodos
