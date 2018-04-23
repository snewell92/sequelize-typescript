import 'reflect-metadata';
import {addScopeOptions} from "../services/scopes";
import {IScopeFindOptions} from "../interfaces/IScopeFindOptions";

/**
 * Sets default scope for annotated class
 */
export function DefaultScope(scope: IScopeFindOptions | Function): Function {

  return (target: any) => {

    addScopeOptions(target.prototype, {
      defaultScope: scope
    });
  };
}
