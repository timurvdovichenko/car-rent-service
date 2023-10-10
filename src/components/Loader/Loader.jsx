import { Oval } from 'react-loader-spinner';

export const Loader = () => (
  <Oval
    visible={true}
    height="100"
    width="100"
    ariaLabel="oval-loading"
    wrapperStyle={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: '0 auto',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '888',
    }}
    wrapperClass="Oval-wrapper"
    color="rgba(52, 112, 255, 1)"
    secondaryColor="rgba(239, 237, 232, 0.9)"
  />
);
