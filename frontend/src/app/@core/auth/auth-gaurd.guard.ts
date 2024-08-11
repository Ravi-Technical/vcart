import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('sellerToken');
  if(token !=null){
  return true;
  }
  else {
    return false
  }
};

