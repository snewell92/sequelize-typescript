import {expect, use} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {Table} from '../../../lib/annotations/Table';
import {Model} from '../../../lib/models/Model';
import {createSequelize} from '../../utils/sequelize';
import {HasMany} from '../../../lib/annotations/association/HasMany';

use(chaiAsPromised);

// tslint:disable:max-classes-per-file
describe('HasMany', () => {

  const as = 'babies';
  const sequelize = createSequelize(false);

  @Table
  class Player extends Model<Player> {}

  @Table
  class Team extends Model<Team> {

    @HasMany(() => Player, {
      as,
      foreignKey: 'teamId'
    })
    players: Player[];
  }

  sequelize.addModels([Team, Player]);

  it('should pass as options to sequelize association', () => {
    expect(Team['associations']).to.have.property(as);
  });

});
