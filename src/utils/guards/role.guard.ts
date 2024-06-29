import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  mixin,
  Type,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { UserDocument } from 'src/user/schema/user.schema';
import { RolePermissions, UserRole } from 'src/utils/enum/user.enum';

const RoleGuard = (
  allowedRoles: UserRole[],
  // requiredPermission?: RolePermissions,
): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(@Inject(I18nService) private readonly i18n: I18nService) {}

    /**
     * Determines if the user has the appropriate role and permission to access a route.
     * @param context The execution context containing the request and response.
     * @returns A boolean indicating whether the user can activate the route.
     * @throws ForbiddenException if the user does not have the required role or permission.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user as UserDocument;

      if (!user) {
        throw new ForbiddenException(this.i18n.t('auth.UserNotFound'));
      }

      if (!allowedRoles.includes(user.role)) {
        throw new ForbiddenException(this.i18n.t('auth.InvalidRole'));
      }

      // if (
      //   requiredPermission &&
      //   user.role === UserRole.Admin &&
      //   !user.permissions.includes(requiredPermission)
      // ) {
      //   throw new ForbiddenException(this.i18n.t('auth.InvalidPermissions'));
      // }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
