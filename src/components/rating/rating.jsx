import './rating.scss'
import RatingTable from '../rating-table/rating-table'
import PropTypes from 'prop-types'
const Rating = ({ratingData, sortCount, sortTotal}) => {
  return (
    <div className='rating'>
      <h4 className="rating__title">Рейтинг участников</h4>
      <div className="rating__container">
        <div className="rating__user">
          <div className="head"></div>
          <RatingTable ratingData={ratingData.user} ></RatingTable>
          <div className="end">Общее</div>
        </div>
        {
          ratingData.counts ? (
            ratingData.counts.map((item,index) => (
              <div key={index} className='count__list'>
                <div onClick={() => sortCount(item,index)} className='head'>
                  Category {index+1}
                  <i className="fa-solid fa-arrow-up-wide-short"></i>  
                </div>
                <RatingTable id={index+1}  ratingData={item}></RatingTable>
                <div 
                  style={{color: `${(item.at(-1).total >= 0) ? 'rgba(37, 42, 59, 1)' : 'red'}`}}
                  className="end">{item.at(-1).total}</div>

              </div>
            ))
          ):''
        }
        <div className="rating__total">
          <div onClick={() => sortTotal()} className="head">
            Total
            <i className="fa-solid fa-arrow-up-wide-short"></i>  

          </div>
          <RatingTable ratingData={ratingData.userCountTotal} ></RatingTable>
          <div className='end'>
            {ratingData.userCountTotal ? (
              <p
                style={{color: `${(ratingData.userCountTotal.at(-1).allTotal >= 0) ? 'rgba(37, 42, 59, 1)' : 'red'}`}}

              >
                {ratingData.userCountTotal.at(-1).allTotal}
              </p>
            ):''}
          </div>
          


        </div>

      </div>
    </div>
  )
}
Rating.propTypes = {
  sortCount: PropTypes.func,
  sortTotal: PropTypes.func,
  ratingData: PropTypes.object
}

export default Rating