import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useCookies } from '../utils/cookiesManager';

const isSuperAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { isSuperAdmin} = useCookies();
  // console.log(to)
  // console.log(from)

  isSuperAdmin.value ? next() : next({ name: 'crali' });

};

export default isSuperAdminGuard;
