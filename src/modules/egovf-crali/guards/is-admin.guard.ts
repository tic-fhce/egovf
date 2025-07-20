import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useCookies } from '../utils/cookiesManager';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { isAdmin} = useCookies();
  // console.log(to)
  // console.log(from)

  isAdmin.value ? next() : next({ name: 'crali' });

};

export default isAdminGuard;
