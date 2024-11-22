import { useUser } from '../../hooks';
import ChangePassword from './ChangePassword';
import GeneralSettings from './GeneralSettings';

const Settings = () => {
   const { user } = useUser();
   return (
      <div className="flex justify-evenly">
         <GeneralSettings user={user} />

         <ChangePassword userID={user.id} />
      </div>
   );
};

export default Settings;
