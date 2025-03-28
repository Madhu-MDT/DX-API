import Header from './Embedded/Header';
import Footer from './Embedded/Footer';
import ClaimsForm from './Embedded/ClaimsForm';

const AirlineClaimApp = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Welcome to the Airline Claim Application</h1>
        <ClaimsForm />
      </div>
      <Footer />
    </>
  );
};

export default AirlineClaimApp;
