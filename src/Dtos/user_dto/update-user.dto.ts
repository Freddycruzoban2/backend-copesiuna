import { PartialType } from "@nestjs/mapped-types";
import { CreateUser_dto } from "./create-user.dto";

export class UpdateUser_Dto extends PartialType(CreateUser_dto) {}