import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// 한국어 로케일
import {ko} from 'date-fns/locale';
const CustomDatepicker = ({label,setDateRange,dateRange=[null, null]}) => {
  // 1. 날짜 선택범위
  const [startDate, endDate] = dateRange
  /* 시작 날짜 */
  const handleStartChange = (date) => {
    if(!endDate || date <= endDate) {
      setDateRange([date, endDate])
    } else {
      setDateRange([date, null]);
    }
  }
  /* 종료 날짜 */
  const handleEndChange = (date) => {
    if(!startDate || date >= startDate) {
      setDateRange([startDate, date])
    } else {
      setDateRange([null, date]);
    }
  }
  return (
    <div className="custom-datepicker-wrapper">
      <p className="custom-label">{label}</p>
      <div className="custom-datepicker-wrap">
        {/* 시작일자 */}
        <div className="custom-datepicker">
          <Datepicker
            id="startDate"
            selected={startDate}
            onChange={handleStartChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            isClearable
            showYearDropdown={true}
            showMonthYearDropdown={true}
            scrollableYearDropdown={true}
            locale={ko}
            placeholderText="시작 날짜"
            dateFormat="yyyy-MM-dd"
            autoComplete="off"
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div>
                {/* 전월 선택 */}
                <button
                  type="button"
                  className="custom-datepicker-prev"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                />
                <div>
                  {/* 연 선택 */}
                  <select
                    value={date.getFullYear()}
                    onChange={({target: {value}}) => changeYear(parseInt(value))}
                    className="custom-datepikcer-select"
                  >
                    {Array.from({length:20},(_,i) => {
                      const year = new Date().getFullYear() - 10 + i;// 현재 연도 기준 ±10년
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                  <span>년</span>
                  <select
                    value={date.getMonth()}
                    onChange={({target: {value}}) => changeMonth(parseInt(value))}
                    className="custom-datepikcer-select"
                  >
                    {Array.from({length:12},(_,i) => {
                      return (
                        <option key={i} value={i}>
                          {new Date(0, i).toLocaleString("default", { month: "long" })} {/* 월 이름 */}
                        </option>
                      )
                    })}
                  </select>
                  <span>월</span>
                </div>
                {/* 다음월 선택 */}
                <button
                  type="button"
                  className="custom-datepicker-next"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                />
              </div>
            )}
          />
        </div>
        <span>-</span>
        {/* 종료일자 */}
        <div className="custom-datepicker">
          <Datepicker
            id="endDate"
            selected={endDate}
            onChange={handleEndChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable
            showYearDropdown={true}
            showMonthYearDropdown={true}
            scrollableYearDropdown={true}
            locale={ko}
            placeholderText="종료 날짜"
            dateFormat="yyyy-MM-dd"
            autoComplete="off"
            renderCustomHeader={({
                                   date,
                                   changeYear,
                                   changeMonth,
                                   decreaseMonth,
                                   increaseMonth,
                                   prevMonthButtonDisabled,
                                   nextMonthButtonDisabled,
                                 }) => (
              <div>
                {/* 전월 선택 */}
                <button
                  type="button"
                  className="custom-datepicker-prev"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                />
                <div>
                  {/* 연 선택 */}
                  <select
                    value={date.getFullYear()}
                    onChange={({target: {value}}) => changeYear(parseInt(value))}
                    className="custom-datepikcer-select"
                  >
                    {Array.from({length:20},(_,i) => {
                      const year = new Date().getFullYear() - 10 + i;// 현재 연도 기준 ±10년
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                  <span>년</span>
                  <select
                    value={date.getMonth()}
                    onChange={({target: {value}}) => changeMonth(parseInt(value))}
                    className="custom-datepikcer-select"
                  >
                    {Array.from({length:12},(_,i) => {
                      return (
                        <option key={i} value={i}>
                          {new Date(0, i).toLocaleString("default", { month: "long" })} {/* 월 이름 */}
                        </option>
                      )
                    })}
                  </select>
                  <span>월</span>
                </div>
                {/* 다음월 선택 */}
                <button
                  type="button"
                  className="custom-datepicker-next"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                />
              </div>
            )}
          />
        </div>
      </div>

    </div>
  )
}
export default CustomDatepicker;