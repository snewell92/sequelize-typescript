import 'reflect-metadata';
import {addScopeOptions} from "../services/scopes";
import {IDefineScopeOptions} from "../interfaces/IDefineScopeOptions";

/**
 * Sets scopes for annotated class
 */
export function Scopes(scopes: IDefineScopeOptions): Function {

  return (target: any) => {

    addScopeOptions(target.prototype, scopes);
  };
}
