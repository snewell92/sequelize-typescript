import {IDummyConstructor} from "../../interfaces/IDummyConstructor";
import {BaseModel} from "../BaseModel";
import {Instance, Model as SeqModel} from 'sequelize';

const SeqInstance: IDummyConstructor = (Instance as any);
const SeqModelProto = (SeqModel as any).prototype;

// work around for fixing issue while model definition;
// 'length' get called on instances dataValues (which
// is undefined during this process) by lodash, which
// results in weird behaviour
SeqInstance.prototype.dataValues = {};

/**
 * Sequelize model for sequelize versions less than v4
 */
export const Model: any = (() => {

  const _Model = class extends SeqInstance {

    constructor(values: any,
                options?: any) {
      super(values, BaseModel.prepareInstantiationOptions(options, new.target));
    }
  };

  // Create proxies for static model, to forward any
  // static function calls to the "real" sequelize model,
  // which is referred in the property "Model";
  // e.g. "build" and "create"
  Object
    .keys(SeqModelProto)
    .forEach(key => {
      if (typeof SeqModelProto[key] === 'function') {

        _Model[key] = function(...args: any[]): any {

          let targetModel = this.Model;

          if (this.scoped !== undefined) {
            // Adds scope info to 'this' context
            targetModel = Object.create(targetModel);
            targetModel.$scope = this.$scope;
            targetModel.scoped = this.scoped;
          }

          return SeqModelProto[key].call(targetModel, ...args);
        };
      }
    });

  // 'scope' and 'unscoped' need to be called with 'this' context
  // instead of 'this.Model' context
  _Model['scope'] = _Model['unscoped'] = function(...args: any[]): any {
    return SeqModelProto.scope.call(this, ...args);
  };

  return _Model;
})();
