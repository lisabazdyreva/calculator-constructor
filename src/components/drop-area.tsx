const DropArea = () => {
  return (
    <div className="calculator__info">
      <svg
        className="calculator__drop-icon"
        width="20"
        height="20"
        aria-hidden="true"
      >
        <use xlinkHref="#drop-icon"></use>
      </svg>

      <p className="calculator__text">
        Перетащите сюда
        <span className="calculator__text-light">
          любой элемент <br /> из левой панели
        </span>
      </p>
    </div>
  );
};

export default DropArea;
