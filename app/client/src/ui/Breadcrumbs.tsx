import { NavLink, useMatches } from 'react-router-dom';
import arrowSvg from '../assets/arrow.svg';
import homeSvg from '../assets/home.svg';
import { BreadcrumbMatch } from '../types';

const Breadcrumbs = () => {
   const matches = useMatches() as BreadcrumbMatch[];
   if (matches.some(match => Object.keys(match.params).includes('*'))) {
      return <></>;
   }
   const crumbs = matches
      .filter(match => !!match.handle?.crumb)
      .map(match => ({ id: match.id, value: match.handle.crumb!(match.params), path: match.pathname }));
   return (
      <nav className="flex py-2 select-none breadcrumbs">
         <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {crumbs.map((crumb, index) => (
               <li key={crumb.id}>
                  <div className="flex items-center">
                     <img src={index ? arrowSvg : homeSvg} className="w-3 h-3 me-2.5" alt="" />
                     <span className="text-sm font-medium text-gray-700">
                        {index === crumbs.length - 1 ? (
                           <span className="text-blue-500">{crumb.value}</span>
                        ) : (
                           <NavLink to={crumb.path} className="hover:underline hover:text-blue-600">
                              {crumb.value}
                           </NavLink>
                        )}
                     </span>
                  </div>
               </li>
            ))}
         </ol>
      </nav>
   );
};

export default Breadcrumbs;
