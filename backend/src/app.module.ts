import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsModule } from './leads/leads.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const type = config.get<string>('DB_TYPE', 'mysql');
        if (type === 'sqlite') {
          return {
            type: 'sqlite',
            database: config.get<string>('DB_FILE', 'dev.sqlite'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: parseInt(config.get<string>('DB_PORT', '3306')),
          username: config.get<string>('DB_USER', 'root'),
          password: config.get<string>('DB_PASS', ''),
          database: config.get<string>('DB_NAME', 'InfoteliaITSolutions'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    LeadsModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

