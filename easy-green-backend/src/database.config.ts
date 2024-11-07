import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {User} from "./user/entity/user.entity";

export const getDatabaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: "mysql",
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_SCHEMA'),
    synchronize: true,
    entities: [User],
    autoLoadEntities: true,
});