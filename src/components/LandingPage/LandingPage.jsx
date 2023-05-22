import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../LoginAndRegister/Register/RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          Cupcake ipsum dolor sit amet. Icing croissant gummies chocolate marzipan
          cookie shortbread jujubes tart. Croissant cake chupa chups chocolate pudding
          lollipop carrot cake jelly. Caramels icing macaroon cheesecake cotton candy
          jelly wafer bear claw. Chocolate cake chocolate bar ice cream cake macaroon
          pastry shortbread lollipop. Dessert tootsie roll jujubes gummi bears cupcake
          lemon drops tiramisu muffin dragée. Jelly beans pastry dragée sweet roll
          cupcake shortbread cotton candy danish sesame snaps. Chocolate bar fruitcake
          chocolate bar tiramisu shortbread muffin. Ice cream carrot cake tiramisu
          chocolate marzipan. Danish wafer candy canes jelly biscuit dragée. Cookie sweet
          carrot cake pudding marshmallow jelly beans tootsie roll chocolate cake. Pastry
          chocolate cake croissant toffee pastry powder soufflé oat cake tart.
          </p>

          <p>
          Brownie tiramisu sweet roll halvah sweet roll. Oat cake dessert gingerbread
          cookie pie. Bonbon tart dessert cake fruitcake oat cake lemon drops. Candy
          muffin jujubes jujubes cupcake apple pie candy donut tootsie roll. Sesame
          snaps bear claw wafer wafer powder. Jujubes pie apple pie chocolate bar jelly
          beans. Sugar plum toffee cookie sweet roll biscuit bear claw dragée cake.
          Soufflé jelly beans cake dessert gummies gummies cake. Jelly beans bonbon
          chocolate bar tiramisu liquorice liquorice marzipan sesame snaps lollipop.
          Chocolate cake carrot cake danish macaroon apple pie wafer sesame snaps cupcake.
          Tiramisu bonbon bonbon biscuit chocolate bar jujubes. Chocolate sugar plum chupa
          chups halvah bear claw candy icing chocolate bar.
          </p>

          <p>
          Tiramisu cheesecake chocolate jelly cake ice cream muffin. Carrot cake cupcake
          cookie dessert gingerbread chupa chups tiramisu. Danish wafer sweet roll cake
          gingerbread gummi bears. Wafer cheesecake croissant sesame snaps macaroon
          shortbread toffee marshmallow. Topping lemon drops cheesecake candy canes
          chocolate. Apple pie liquorice sweet roll wafer chocolate bar chocolate. Chupa
          chups liquorice cupcake gummi bears ice cream sugar plum sugar plum. Gingerbread
          marzipan soufflé brownie muffin brownie. Chocolate bar pastry candy canes jujubes
          sesame snaps candy jelly-o chupa chups. Croissant cake tootsie roll sesame snaps
          sugar plum. Apple pie cake biscuit jelly-o cake tart chocolate jelly beans
          shortbread. Sesame snaps powder halvah sugar plum liquorice gummi bears liquorice.
          Sweet tart sugar plum lemon drops halvah. Sesame snaps cotton candy cheesecake
          sugar plum sesame snaps chocolate bar.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
