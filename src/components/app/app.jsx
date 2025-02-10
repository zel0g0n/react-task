import  { useEffect, useState } from 'react'
import './app.scss'
import Header from '../header/header'
import Offer from '../offer/offer'
import Invite from '../invite/invite'
import Application from '../application/application'
import { service } from '../../service/service'
import Rating from '../rating/rating'
const App = () => {
  const [user, setUser] = useState([])
  const [count, setCount] = useState([])
  const [category, setCategory] = useState([])
  const [data,setData] = useState({user: [],count: [], category: []})
  const [ratingData, setRatingData] = useState({})
  const {getData} = service()
  useEffect(() => {
    let arr = []
    let filledCount = []

    for(let i=1; i<=category.length; i++) {
      let item = data.count.filter(item => item.category_id == i)
      const total = item.reduce((sum,current) => sum + current.count,0)
      arr.push(item)
      let sxx = []

      for (let j = 1; j <= 20; j++) {
        let foundItem = item.find(entry => entry.user_id === j);
        sxx.push(foundItem ? foundItem : { user_id: j, category_id: i, count: 0 });
      }
      filledCount.push([...sxx,{total}])

    }
    let totalCountUsers = []
    if(category.length > 0) {
      for(let i=1; i<=category.length; i++) {
        let item = count.filter(item => item.user_id == i)
        let total = item.length ? item.reduce((sum,current) => sum + current.count,0) : 0
        totalCountUsers.push({total})
      }
    }
    let userCountTotal = []
    let userCountTotalValue = 0
    if(filledCount.length) {
      for(let i=1; i<=20; i++) {
        let sum = 0
        filledCount.forEach((element) => {
          sum+=(sumCount(element,i))
        });
        userCountTotal.push({userTotalSum: sum})
      }
      userCountTotal.forEach(element => {
        userCountTotalValue+=element.userTotalSum
      });
      
    }
    
    if(data.user.length) {
      
      setRatingData({
        user: [...(Array.isArray(data.user) ? data.user : []), { content: 'Общее' }],
        counts: filledCount,
        userCountTotal: [...userCountTotal, {allTotal: userCountTotalValue}]
      });
    }
  },[data])

  const sortCount = (arr, id) => {
    let newData = [...ratingData.counts[id]].sort((a, b) => b.count - a.count);
    setRatingData((prev) => ({
      ...prev,
      counts: [...prev.counts.slice(0, id), newData, ...prev.counts.slice(id + 1)],
    }));
  };
  const sortTotal = () => {
    const newArr = [...ratingData.userCountTotal].sort((a,b) => (b.userTotalSum - a.userTotalSum))
    setRatingData(prev => ({...prev, userCountTotal: newArr}))
  }

  const sumCount = (arr,id) => {
    const data = arr.filter(item => item.user_id == id)
    return data[0].count
    
  }

  const updateCount = (cID, uID, count) => {
    let newData1 = ratingData.counts[cID - 1].map((item) => {
      if(item.user_id == uID) {
        console.log("DONE")
        return {...item, count}
      }else {
        return item
      }
    })
    setRatingData((prev) => ({
      ...prev,
      counts: [...prev.counts.slice(0, cID - 1), newData1, ...prev.counts.slice(cID)],
    }));
  };


  useEffect(() => {
    getData('https://python-api-task.onrender.com/categories')
      .then(res => {
        setCategory(res)
      })

    getData('https://python-api-task.onrender.com/users')
      .then( res => {
        setUser(res)

      })
    getData('https://python-api-task.onrender.com/counts')
      .then(res => {
        setCount(res)
      })

    
    
  },[])
  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      user,
      count,
      category
    }));
  }, [user, count, category]);

  return (
    <div className='app'>
      <Header></Header>
      <Offer></Offer>
      <Invite></Invite>
      <Application updateCount={updateCount} count={count}  category={category} user={user} ratingData={ratingData} ></Application>
      <Rating sortCount={sortCount} sortTotal={sortTotal} data={data} ratingData={ratingData} ></Rating>
    </div>
  )
}

export default App