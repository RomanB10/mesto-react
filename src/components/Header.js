import headerLogo from "../images/logo.svg"; //Мы импортировали файл изображения logo.svg в компонент строчкой кода

function Header() {
  return (
    <header className="header root__section">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Здесь должно быть изображение Лого"
      />
    </header>
  );
}

export default Header;
