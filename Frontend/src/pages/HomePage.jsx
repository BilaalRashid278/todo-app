import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import UseFetch from '../hooks/UseFetch';
import { IoCheckbox } from "react-icons/io5";
import { Button } from '@mui/material';
import ShowTodos from '../components/showTodos/ShowTodos';
import Context from '../context/Context';
import '../sass/home.scss';
const HomePage = () => {
  const [hitTodo, setHitTodo] = useState('hit1');
  // const [date, setDate] = useState('');
  const [todoTitle, setTitle] = useState('');
  const navigate = useNavigate();
  const calendarRef = useRef();
  useEffect(() => {
    UseFetch(`/auth/${localStorage.getItem('token')}`).then((res) => {
      return res.json();
    }).then((data) => {
      data?.isAuthicate === true ? '' : navigate('/login');
    })
      .catch((err) => console.log(err));
  }, []);
  const sendTodo = (data) => {
    UseFetch('/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: data
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success) {
        setDate('');
        setTitle('');
      }
    }).catch((err) => {
      console.log('todo created error')
    })
  };
  return (
    <Context.Provider value={{hitTodo,setHitTodo}}>
      <header id='head'>
        <div className="wrapper">
          <section className='logo'>
            <div>
              <IoCheckbox style={{ margin: '-0.1em 0' }} />
              <span style={{ textDecoration: 'underline' }}>MyTodo-s</span>
            </div>
          </section>
          <section className='add-todo'>
            <div className='todo-wrapper'>
              <input onChange={(e) => {
                setTitle(e.target.value);
                // console.log(todoTitle);
              }} value={todoTitle} type='text' placeholder='Add new...' />
              <div className='todo-Btn'>
                <input
                  style={{ color: 'rgb(59 113 203)' }}
                  ref={calendarRef}
                  type="date"
                  id="dateInput"
                />
                <Button onClick={() => {
                  if (todoTitle.length < 1) {
                    alert('Please enter a todo title');
                  } else {
                    const jsonData = JSON.stringify({
                      title: todoTitle,
                      status: 'pending',
                      dueDate: calendarRef?.current?.value
                    });
                    sendTodo(jsonData);
                    setTitle('');
                    hitTodo == 'hit1' ? setHitTodo('hit2') : setHitTodo('hit1');
                  }
                }} color='primary' variant='contained' size='small'>Add</Button>
              </div>
            </div>
          </section>
          <hr style={{ width: '94.5%', margin: '1em  auto', }} />
          <ShowTodos />
        </div>
      </header>
    </Context.Provider>
  )
}

export default HomePage
