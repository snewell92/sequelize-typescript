import {Table, Model, Column,} from "../../../../index";

@Table
export default class PlayerDir extends Model<PlayerDir> {
  @Column
  name: string;
}
