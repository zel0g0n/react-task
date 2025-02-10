import PropTypes from 'prop-types'
import './rating-table-item.scss'
const RatingTableItem = ({data,id}) => {
  const isUser = Object.keys(data).includes('first_name')
  const count = Object.keys(data).includes('count')
  const userSum = Object.keys(data).includes('userTotalSum')
  return (
    <div className='rating__table-item'>
      {isUser ? (
        <div className="user">
          <div style={{backgroundColor: `${id%2?'#fff':'rgba(243, 247, 249, 1)'}`}} className="item__child">{data.id}</div>
          <div style={{backgroundColor: `${id%2?'#fff':'rgba(243, 247, 249, 1)'}`}}  className="user__info">
            {
              data.avatar ? (
                <div className="img-ave">
                  <img src={data.avatar} style={{width: '40px', height: '40px', borderRadius: '50%'}} alt="ave" />

                </div>

              ) : (
                data.first_name ? (
                  <div  className='not-ave'>
                    {(data.first_name.at(0)) + ' ' + (data.last_name.at(0))}
                  </div>
                ): ''
              )
            }

          
            <p  className="user__data">
              {data.first_name + ' ' + data.last_name}
            </p>
          </div>
      </div>
      ):''}
      {count ? (
        <div 
        style={
          {
            backgroundColor: `${id%2?'#fff':'rgba(243, 247, 249, 1)'}`,
            color: `${(data.count >= 0) ? 'rgba(37, 42, 59, 1)' : 'red'}`
          }}
            className="count__item">
          {data.count}
        </div>
      ): ''}
      {userSum ? (
        <div style={{backgroundColor: `${id%2?'#fff':'rgba(243, 247, 249, 1)'}`}} className="total-all">
          {data.userTotalSum}
        </div>
      ): ''}
      
    </div>
  )
}

RatingTableItem.propTypes = {
  data: PropTypes.object
}

export default RatingTableItem