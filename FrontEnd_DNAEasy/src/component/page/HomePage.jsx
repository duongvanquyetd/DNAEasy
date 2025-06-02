import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../component/image/logo/logo.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h2>Login successfully</h2>
      <button
        onClick={() => navigate('/user/login')}
        className="btn btn-primary m-2"
      >
        Go to Login
      </button>
      <button
        onClick={() => navigate('/user/profile')}
        className="btn btn-success m-2"
      >
        Go to User Profile
      </button>
    </div>
  );
}

export default Home;


// export default Home;

// import React from 'react';
// import Logo from '../../component/image/logo/logo.jpg';

// function Home() {
//   return (
//     <div>
//       Login successsfully
//     </div>
//   );
// }

// export default Home;
