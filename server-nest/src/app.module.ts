import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CustomerModule } from './modules/customer/customer.module';
import { LocationModule } from './modules/location/location.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProductModule } from './modules/product/product.module';
import { ResourceModule } from './modules/resource/resource.module';
import { RoleModule } from './modules/role/role.module';
// modules
import { UserModule } from './modules/user/user.module';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    // Postgres DB Connection
    TypeOrmModule.forRoot(configService.postgresConfig),
    AuthModule,
    UserModule,
    BlogModule,
    ProductModule,
    PermissionModule,
    RoleModule,
    ResourceModule,
    LocationModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
