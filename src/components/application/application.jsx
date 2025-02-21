import PropTypes from 'prop-types'
import './application.scss'
import { useEffect, useState } from 'react'
const Application = ({category, updateCount,user,ratingData}) => {
  const [countC, setCountC] = useState('')
  const [arr,setArr] = useState({user_id: '',category_id: '',count: ''})
  const formHandler = (e) => {
    e.preventDefault()
    const form = document.querySelector('form')
    const formData = new FormData(form)
    const userData = {}
    formData.forEach((value,key) => {
      userData[key] = value
    })
    updateCount(arr.category_id,arr.user_id,countC)
  }
  const changeSelectHandler = (e) => {
    setArr(prev => ({...prev,[e.target.name]:e.target.value}))
      
  }

  const inputHandler = (e) => {
    setCountC(e.target.value)
  }
  useEffect(() => {
    if(arr.category_id!=='' && arr.user_id!=='') {
      const findedItem = ratingData.counts.filter(item => item[0].category_id == arr.category_id)
      const findedChild = findedItem[0].filter(item => item.user_id == arr.user_id)
      setCountC(findedChild[0].count)
    }
  },[arr])
  
  return (
    <div className='application'>
      <h4 className="application-title">
        Форма заявки
      </h4>
      <form onSubmit={e => formHandler(e)} action="">
        <select onChange={e => changeSelectHandler(e)} name="user_id" id="user_id" className="user form__select">
          <option value="user">User</option>
          {user.map(item => (
            <option key={item.id} value={item.id}>
              {item['first_name'] + ' ' + item['last_name']}
            </option>
          ))}
        </select>
        <select onChange={e => changeSelectHandler(e)} name="category_id" id="category_id" className="category form__select">
          <option value="category">Category</option>
          {category.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>

          ))}
        </select>
        <input required onChange={e => inputHandler(e)}  name='count' value={countC} type="number" placeholder='Count' className="form__inp" />
        <button className="form__btn">SET</button>
      </form>
      <div className="circle__shape"></div>
    </div>
  )
}
Application.propTypes = {
  category: PropTypes.array,
  user: PropTypes.array,
  count: PropTypes.array,
  updateCount: PropTypes.func,
  ratingData: PropTypes.object
}
export default Application