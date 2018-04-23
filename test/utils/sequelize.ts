import {Sequelize} from "../../lib/models/Sequelize";
import * as OriginSequelize from "sequelize";
import {DefineOptions, Sequelize as SequelizeType} from "sequelize";
import {SequelizeConfig} from '../../lib/types/SequelizeConfig';

export function createSequelize(partialOptions: Partial<SequelizeConfig>): Sequelize;
export function createSequelize(useModelsInPath?: boolean,
                                define?: DefineOptions<any>): Sequelize;
export function createSequelize(useModelsInPathOrPartialOptions?: boolean | Partial<SequelizeConfig>,
                                define: DefineOptions<any> = {}): Sequelize {

  let useModelsInPath = true;
  let partialOptions = {};
  if (typeof useModelsInPathOrPartialOptions === 'object') {
    partialOptions = useModelsInPathOrPartialOptions;
  } else if (typeof useModelsInPathOrPartialOptions === 'boolean') {
    useModelsInPath = useModelsInPathOrPartialOptions;
  }

  return new Sequelize({
    database: '__',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    define,
    storage: ':memory:',
    logging: !('SEQ_SILENT' in process.env),
    modelPaths: useModelsInPath ? [__dirname + '/../models'] : [],
    ...partialOptions,
  });
}

export function createSequelizeValidationOnly(useModelsInPath: boolean = true): Sequelize {

  return new Sequelize({
    validateOnly: true,
    logging: !('SEQ_SILENT' in process.env),
    modelPaths: useModelsInPath ? [__dirname + '/../models'] : []
  });
}

export function createOriginSequelize(): SequelizeType {

  return new OriginSequelize('___', 'root', '', {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: !('SEQ_SILENT' in process.env)
  });
}
