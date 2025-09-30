import { useNavigate } from 'react-router-dom';
import Heading from "../atoms/Heading";
import SubmitButton from "../atoms/SubmitButton";
import Paragraph from "../atoms/Paragraph";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg text-center">
      <Heading title="Access Denied" />
      <Paragraph text="You are not authorized to open this recipe."/>
      <SubmitButton type="submit" text="Go to Home" onClick={() => navigate('/')} className='sm:w-auto px-4 py-2'/>
    </div>
  );
};

export default NotAuthorized;
