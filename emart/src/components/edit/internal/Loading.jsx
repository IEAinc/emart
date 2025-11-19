import iconLoading from '../../../assets/images/icon/ico_loading.svg';

const Loading = () => {
  return (
    <div className="loading-box-edit">
      <img
        src={iconLoading}
        className="loading-edit-img"
        alt="로딩 중..."
      />
    </div>
  )
}
export default Loading;