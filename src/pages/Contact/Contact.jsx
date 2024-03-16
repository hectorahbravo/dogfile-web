import lorena from "../../assets/images/lorena.png";
import hector from "../../assets/images/hector.png";
import huma from "../../assets/images/huma.png";
import "./Contact.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <Link to={"/user"}>
        <FaArrowLeft className="exit-arrow exit-arrow-about" />
      </Link>
      <h1>Quiénes Somos</h1>
      <p>
        Somos unos apasionados del código, del desarrollo de apps y...¡de los
        perritos!. Por eso hemos querido desarrollar esta app para que todos los
        usuarios con perro tengan todas las facilidades para llevar un mejor
        control y cuidado de su compañero perruno.
      </p>
      <div className="images-container">
        <img className="img-developers" src={lorena} alt="lorena" />{" "}
        <img className="img-developers" src={hector} alt="hector" />
      </div>
      <h2>¿Por qué DogFile?</h2>
      <p>
        DogFile nace de nuestra necesidad de tener un espacio que nos ayude a
        controlar todo sobre nuestro perro: cuándo le toca la próxima vacuna,
        cuándo hay que cambiarle el collar parasitario, a qué hora le tenía que
        poner la crema para sus almohadillas...DogFile te ayuda un correcto
        cuidado de tu perro de formal fácil, sencilla y gratuita.
      </p>
      <div className="images-container">
        <img src={huma} className="img-developers" alt="huma" />
      </div>
      <h2>¡Con alertas y recomendaciones!</h2>
      <p>
        En nuestro apartado de mapa queríamos recoger, además de las
        recomendaciones de otros usuarios con perro de los mejores sitios para
        ir con nuestras mascotas, aquellas alertas que pueden suponer un peligro
        para nuestros amigos perrunos: zonas con petardos o fuergos
        artificiales, áreas de casos con orugas procesonarias, etc. ¡Entre todos
        nos ayudamos!
      </p>
    </div>
  );
};

export default AboutUs;
