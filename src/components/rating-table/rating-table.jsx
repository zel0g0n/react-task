import './rating-table.scss'
import RatingTableItem from '../rating-table-item/rating-table-item'
const RatingTable = ({ratingData,id}) => {


  return (
    <div  className='rating__table'>
     
      {
        ratingData ? (
          ratingData.map((item,index) => (
            <RatingTableItem id={index+1} data={item} key={index}></RatingTableItem>
          ))
        ):''
      }
   
    </div>
  )
}

export default RatingTable