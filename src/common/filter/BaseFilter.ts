import { IsEnum, IsNotEmpty } from "class-validator";
import { SearchCondition } from "../enum/SearchCondition";

export abstract class BaseFilter {
  constructor(value: any, condition: SearchCondition) {
    this.value = value;
    this.condition = condition;
  }

  @IsEnum(SearchCondition)
  condition: SearchCondition;

  @IsNotEmpty()
  value: any;
}