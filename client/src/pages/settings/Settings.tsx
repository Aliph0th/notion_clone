import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import ChangePassword from './ChangePassword';
import GeneralSettings from './GeneralSettings';

const Settings = () => {
   const { user } = useContext(UserContext);
   return (
      <div className="flex justify-evenly">
         <GeneralSettings user={user} />

         <ChangePassword id={user.id} />
      </div>
   );
};

export default Settings;
